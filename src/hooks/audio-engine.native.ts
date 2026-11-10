// The phones' player: react-native-nitro-player. It keeps the whole queue natively, so a recording ending, the lock
// screen, headphones and the car (Android Auto) move through it even while JavaScript is asleep, and the car can
// browse the user's playlists. The queue itself is still decided in use-audio-queue.ts; this mirrors it.
//
// The queue is played from one of two native playlists, used in turn: a new queue is written into the one not
// playing and then loaded, so the recording playing is never disturbed while it is written. The user's playlists are
// copied into native playlists of their own for the car (setLibrary).
// Falls back to expo-audio (audio-engine-expo.ts) on a build without the native player.
import { Platform } from 'react-native';

import type { AudioEngine, EngineEvents, EngineRepeat, EngineTrack } from './audio-engine-types';
import { createExpoEngine } from './audio-engine-expo';
import { readSetting, writeSetting } from './settings-storage';

type Nitro = typeof import('react-native-nitro-player');
type TrackItem = import('react-native-nitro-player').TrackItem;

const loadNitro = (): Nitro | null => {
  try {
    // Required here, not imported, so a build without the native player falls back instead of failing to start
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const nitro: Nitro = require('react-native-nitro-player');
    // Throws when the native module is not in this build
    nitro.TrackPlayer.getRepeatMode();
    return nitro;
  } catch {
    return null;
  }
};

// Native playlist ids, kept between launches (native playlists are saved on the phone)
const QUEUE_KEY = 'nativeQueuePlaylists';
const LIBRARY_KEY = 'nativeLibraryPlaylists';
const readJson = <T>(key: string, fallback: T): T => {
  try {
    const saved = readSetting(key);
    return saved ? (JSON.parse(saved) as T) : fallback;
  } catch {
    return fallback;
  }
};
const writeJson = (key: string, value: unknown) => {
  try {
    writeSetting(key, JSON.stringify(value));
  } catch {
    // made again next launch
  }
};

// iOS plays a downloaded file from its path; Android takes the file:// address
const playableUrl = (url: string) =>
  Platform.OS === 'ios' && url.startsWith('file://') ? decodeURIComponent(url.slice('file://'.length)) : url;

const toItem = (t: EngineTrack): TrackItem => ({
  id: t.id,
  title: t.title,
  artist: t.artist,
  album: 'Coptic Psalmody',
  duration: 0,
  url: playableUrl(t.url),
  artwork: t.artwork,
  extraPayload: { hymnId: t.hymnId, language: t.language, file: t.file ?? '', url: t.url },
});

const fromItem = (item: TrackItem): EngineTrack | null => {
  const p = (item.extraPayload ?? {}) as Record<string, unknown>;
  if (typeof p.hymnId !== 'string' || typeof p.language !== 'string') return null;
  return {
    id: item.id,
    url: typeof p.url === 'string' ? p.url : item.url,
    title: item.title,
    artist: item.artist,
    artwork: typeof item.artwork === 'string' ? item.artwork : '',
    hymnId: p.hymnId,
    language: p.language as EngineTrack['language'],
    file: typeof p.file === 'string' && p.file ? p.file : undefined,
  };
};

const NITRO_REPEAT = { none: 'off', all: 'Playlist', one: 'track' } as const;

export function createAudioEngine(events: EngineEvents): AudioEngine {
  const nitro = loadNitro();
  if (!nitro) return createExpoEngine(events);
  const { TrackPlayer, PlayerQueue, AndroidAutoMediaLibraryHelper } = nitro;

  // The native commands run one after another, in the order the app gave them
  let chain: Promise<unknown> = Promise.resolve();
  let busy = 0;
  // A track change that came during a command: checked once the command is done, in case a recording ended meanwhile
  let missedChange = false;
  const run = (task: () => Promise<unknown>) => {
    chain = chain
      .then(async () => {
        busy++;
        try {
          await task();
        } finally {
          busy--;
        }
        if (busy === 0 && missedChange) {
          missedChange = false;
          const current = (await TrackPlayer.getState()).currentTrack;
          if (current) await reconcile(current.id);
        }
      })
      .catch(() => {
        // one failed command must not stop the ones after it
      });
  };

  let tracks: EngineTrack[] = [];
  // The native playlist playing the queue, and the order of its tracks there
  let active: string | null = null;
  let nativeOrder: string[] = [];
  let playing = false;
  let buffering = false;
  let lastVolume = -1;
  let library = readJson<Record<string, string>>(LIBRARY_KEY, {});

  // The two queue playlists, made once and kept
  const queuePlaylists = async (): Promise<[string, string]> => {
    const saved = readJson<string[]>(QUEUE_KEY, []);
    const ids: string[] = [];
    for (let i = 0; i < 2; i++) {
      const id = saved[i];
      ids.push(id && PlayerQueue.getPlaylist(id) ? id : await PlayerQueue.createPlaylist('Now playing'));
    }
    writeJson(QUEUE_KEY, ids);
    return [ids[0], ids[1]];
  };

  const replaceTracks = async (playlistId: string, items: TrackItem[]) => {
    const old = PlayerQueue.getPlaylist(playlistId)?.tracks ?? [];
    if (old.length) await PlayerQueue.removeTracksFromPlaylist(playlistId, old.map((t) => t.id));
    if (items.length) await PlayerQueue.addTracksToPlaylist(playlistId, items);
  };

  const pushVolume = (next: number) => {
    const percent = Math.round(Math.max(0, Math.min(1, next)) * 100);
    if (percent === lastVolume) return;
    lastVolume = percent;
    TrackPlayer.setVolume(percent).catch(() => {});
  };

  const emitStatus = (currentTime: number, duration: number) =>
    events.status({ playing, currentTime, duration, isBuffering: buffering });

  // The playing track changed natively, or the app opened while something was already playing
  const reconcile = async (trackId: string) => {
    if (tracks.some((t) => t.id === trackId)) return events.trackChanged(trackId);
    // A list started outside the app (the car's library): it becomes the queue
    const playlistId = PlayerQueue.getCurrentPlaylistId();
    const playlist = playlistId ? PlayerQueue.getPlaylist(playlistId) : null;
    if (!playlist) return;
    const next = playlist.tracks.map(fromItem).filter((t): t is EngineTrack => t !== null);
    const at = next.findIndex((t) => t.id === trackId);
    if (at < 0) return;
    tracks = next;
    active = playlist.id;
    nativeOrder = playlist.tracks.map((t) => t.id);
    events.queueReplaced(next, at);
  };

  TrackPlayer.onChangeTrack((track) => {
    // Mid-command changes are the app's own doing; the queue already knows
    if (busy === 0) reconcile(track.id);
    else missedChange = true;
  });
  TrackPlayer.onPlaybackStateChange((state, reason) => {
    playing = state === 'playing' || (state === 'buffering' && playing);
    buffering = state === 'buffering';
    TrackPlayer.getState()
      .then((s) => emitStatus(s.currentPosition, s.totalDuration))
      .catch(() => {});
    if (state === 'stopped' && reason === 'end') events.queueEnded();
  });
  TrackPlayer.onPlaybackProgressChange((position, duration) => {
    if (buffering && position > 0) buffering = false;
    emitStatus(position, duration);
  });

  run(async () => {
    await TrackPlayer.configure({
      androidAutoEnabled: true,
      showInNotification: true,
      remoteSkipForwardInterval: 15,
      remoteSkipBackwardInterval: 15,
      // Load the next recording ahead, so the next hymn starts without a gap
      lookaheadCount: 2,
      // Pause for a phone call or another app's audio, and carry on after
      androidAudioFocus: 'pause',
    });
    // Something already playing (the app was reopened, or the car started it): show it
    const s = await TrackPlayer.getState();
    if (s.currentTrack) {
      playing = s.currentState === 'playing';
      await reconcile(s.currentTrack.id);
      emitStatus(s.currentPosition, s.totalDuration);
    }
  });

  return {
    load(next, at, autoplay) {
      tracks = next;
      buffering = autoplay;
      playing = autoplay;
      run(async () => {
        const [a, b] = await queuePlaylists();
        // Write into the playlist that is not playing, then switch to it
        const target = active === a ? b : a;
        const items = next.map(toItem);
        await replaceTracks(target, items);
        await PlayerQueue.loadPlaylist(target, at);
        active = target;
        nativeOrder = items.map((t) => t.id);
        if (autoplay) await TrackPlayer.play();
        else await TrackPlayer.pause();
      });
    },
    update(next) {
      tracks = next;
      run(async () => {
        if (!active) return;
        const playlistId = active;
        const wanted = next.map((t) => t.id);
        const playingId = (await TrackPlayer.getState()).currentTrack?.id;
        // Take out what left the queue (never the recording playing), add what is new, then put everything in order
        const gone = nativeOrder.filter((id) => !wanted.includes(id) && id !== playingId);
        if (gone.length) await PlayerQueue.removeTracksFromPlaylist(playlistId, gone);
        let order = nativeOrder.filter((id) => !gone.includes(id));
        for (let i = 0; i < next.length; i++) {
          if (!order.includes(next[i].id)) {
            const position = Math.min(i, order.length);
            await PlayerQueue.addTrackToPlaylist(playlistId, toItem(next[i]), position);
            order.splice(position, 0, next[i].id);
          }
        }
        for (let i = 0; i < wanted.length; i++) {
          if (order[i] !== wanted[i]) {
            await PlayerQueue.reorderTrackInPlaylist(playlistId, wanted[i], i);
            order = order.filter((id) => id !== wanted[i]);
            order.splice(i, 0, wanted[i]);
          }
        }
        nativeOrder = order;
      });
    },
    skipTo(at, autoplay) {
      buffering = autoplay;
      run(async () => {
        await TrackPlayer.skipToIndex(at);
        if (autoplay) await TrackPlayer.play();
        else await TrackPlayer.pause();
      });
    },
    play: () => run(() => TrackPlayer.play()),
    pause: () => run(() => TrackPlayer.pause()),
    seekTo: (seconds) => run(() => TrackPlayer.seek(seconds)),
    setRepeat: (repeat: EngineRepeat) => run(() => TrackPlayer.setRepeatMode(NITRO_REPEAT[repeat])),
    setRate: (rate) => run(() => TrackPlayer.setPlaybackSpeed(rate)),
    setVolume: pushVolume,
    stop: () => run(() => TrackPlayer.pause()),
    setLibrary(playlists) {
      run(async () => {
        const kept: Record<string, string> = {};
        for (const list of playlists) {
          let id = library[list.id];
          if (!id || !PlayerQueue.getPlaylist(id)) id = await PlayerQueue.createPlaylist(list.name);
          kept[list.id] = id;
          const native = PlayerQueue.getPlaylist(id);
          if (native && native.name !== list.name) await PlayerQueue.updatePlaylist(id, list.name);
          // The playlist the car is playing is left alone until it stops
          if (id === active) continue;
          const items = list.tracks.map(toItem);
          const same =
            native &&
            native.tracks.length === items.length &&
            native.tracks.every((t, i) => t.id === items[i].id && t.url === items[i].url);
          if (!same) await replaceTracks(id, items);
        }
        for (const [appId, id] of Object.entries(library))
          if (!kept[appId] && id !== active) await PlayerQueue.deletePlaylist(id).catch(() => {});
        library = kept;
        writeJson(LIBRARY_KEY, kept);
        // The car shows the user's playlists, not the app's two queue playlists
        if (Platform.OS === 'android' && AndroidAutoMediaLibraryHelper.isAvailable())
          AndroidAutoMediaLibraryHelper.set({
            layoutType: 'list',
            rootItems: playlists.map((list) => ({
              id: `playlist-${list.id}`,
              title: list.name,
              subtitle: `${list.tracks.length} ${list.tracks.length === 1 ? 'hymn' : 'hymns'}`,
              mediaType: 'playlist',
              playlistId: kept[list.id],
              isPlayable: false,
            })),
          });
      });
    },
  };
}
