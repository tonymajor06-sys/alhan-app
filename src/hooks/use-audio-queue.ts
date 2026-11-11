import type { AudioSource, AudioStatus } from 'expo-audio';
import { Asset } from 'expo-asset';
import * as Network from 'expo-network';
import { useSyncExternalStore } from 'react';
import { Alert, AppState, Platform } from 'react-native';

import { audioLoudness } from '../data/audio-loudness';
import { LanguageType } from '../data/hymns';
import { createAudioEngine } from './audio-engine';
import type { AudioEngine, EngineStatus, EngineTrack } from './audio-engine-types';
import { readSetting, writeSetting } from './settings-storage';
import { getSettings } from './use-settings';

export interface QueueTrack {
  hymnId: string;
  language: LanguageType;
  title: string;
  source: AudioSource;
  // Which recording, when a hymn has more than one in this language
  file?: string;
  // This entry's place in the queue, given when it is queued (a hymn can be in the queue twice)
  uid?: string;
}

export type RepeatMode = 'none' | 'one' | 'all';

export interface QueueState {
  tracks: QueueTrack[];
  index: number;
  // 'playlist' when the queue was started from the saved playlist, so the playlist screen can highlight it
  origin: 'single' | 'playlist';
  repeat: RepeatMode;
  // Shuffle: the tracks still to come were put in a random order; `unshuffled` keeps the order to go back to
  shuffle: boolean;
  unshuffled: QueueTrack[] | null;
  // Playback speed (learning mode slows recordings down); 1 = normal
  rate: number;
  // Night listening (see playNight)
  night: boolean;
  // Where a long recording was picked up from, where it was left last time (null when it started from the beginning)
  resumedFrom: number | null;
  // isBuffering: waiting for the recording to load or stream in, so the play button can show it is working
  status: Pick<AudioStatus, 'playing' | 'currentTime' | 'duration' | 'isBuffering'>;
}

// The last hymn played, for the home screen's "Continue" shortcut
export const LAST_PLAYED_KEY = 'lastPlayed';
// Shown on the lock screen and in the car; served from the website's public folder
const LOCK_SCREEN_ARTWORK = 'https://copticpsalmody.com/artwork.png';
const ARTIST = 'Coptic Psalmody';

export const trackKey = (t: { hymnId: string; language: LanguageType }) => `${t.hymnId}:${t.language}`;

let state: QueueState = {
  tracks: [],
  index: 0,
  origin: 'single',
  repeat: 'none',
  shuffle: false,
  unshuffled: null,
  rate: 1,
  night: false,
  resumedFrom: null,
  status: { playing: false, currentTime: 0, duration: 0, isBuffering: false },
};
const listeners = new Set<() => void>();

const notify = () => listeners.forEach((l) => l());

const setState = (patch: Partial<QueueState>) => {
  state = { ...state, ...patch };
  notify();
};

// In another app (or with the screen locked) nobody sees the position, so the position updates are kept
// without redrawing the screens. Redrawing them in the background made the phone close the app after a while.
let inBackground = AppState.currentState === 'background';
AppState.addEventListener('change', (next) => {
  const wasInBackground = inBackground;
  inBackground = next === 'background';
  // Back in the app: show where the recording is now
  if (wasInBackground && !inBackground) notify();
});

// Night listening, for falling asleep to a playlist: it plays all night, and no hymn comes in louder than the one
// before: the loud recordings are brought down to the usual loudness (src/data/audio-loudness.ts), and each one
// fades in instead of starting at full volume (and fades out at its end). Otherwise it is as loud as the phone is set.
// The usual loudness: the middle of all the recordings' (dB below full scale; most are -23 to -12)
const NIGHT_REFERENCE_DB = (() => {
  const levels = Object.values(audioLoudness)
    .filter((db) => db > -50)
    .sort((a, b) => a - b);
  return levels.length ? levels[Math.floor(levels.length / 2)] : -17;
})();
const NIGHT_FADE_IN = 8;
const NIGHT_FADE_OUT = 6;

const nightVolume = (file: string | undefined, currentTime: number, duration: number) => {
  const db = file ? audioLoudness[file] : undefined;
  // Unknown or nearly silent: as it is
  const leveled = db === undefined || db < -50 ? 1 : Math.min(1, 10 ** ((NIGHT_REFERENCE_DB - db) / 20));
  const fadeIn = Math.min(1, currentTime / NIGHT_FADE_IN);
  const fadeOut = duration > 0 ? Math.min(1, (duration - currentTime) / NIGHT_FADE_OUT) : 1;
  return Math.max(0, Math.min(1, leveled * Math.min(fadeIn, fadeOut)));
};

const volumeAt = (currentTime: number, duration: number) =>
  state.night ? nightVolume(state.tracks[state.index]?.file, currentTime, duration) : 1;

// Every queued entry gets its own id, which the player uses to say which one is playing
let nextUid = 0;
const withUids = (tracks: QueueTrack[]): QueueTrack[] => tracks.map((t) => (t.uid ? t : { ...t, uid: `q${++nextUid}` }));

const sourceUrl = (source: AudioSource): string => {
  if (typeof source === 'number') {
    const asset = Asset.fromModule(source);
    return asset.localUri ?? asset.uri;
  }
  return typeof source === 'string' ? source : (source?.uri ?? '');
};

export const toEngineTrack = (t: QueueTrack, id = t.uid ?? trackKey(t)): EngineTrack => ({
  id,
  url: sourceUrl(t.source),
  title: t.title,
  artist: ARTIST,
  artwork: LOCK_SCREEN_ARTWORK,
  hymnId: t.hymnId,
  language: t.language,
  file: t.file,
});

const rememberLastPlayed = (track: QueueTrack) => {
  try {
    writeSetting(LAST_PLAYED_KEY, JSON.stringify({ hymnId: track.hymnId, language: track.language }));
  } catch {
    // only the shortcut is lost
  }
};

// Long recordings (the Midnight Praises, a whole liturgy) carry on where they were left, like a podcast: the place
// is saved every few seconds and on pause, and forgotten once the recording is finished
const POSITIONS_KEY = 'audioPositions';
const RESUME_MIN_DURATION = 240;
// Not worth resuming in the first or last half minute
const RESUME_MARGIN = 30;
const MAX_POSITIONS = 60;
let positions: Record<string, number> = (() => {
  try {
    return JSON.parse(readSetting(POSITIONS_KEY) ?? '{}') as Record<string, number>;
  } catch {
    return {};
  }
})();
let lastSaved = 0;
const savePosition = (file: string | undefined, currentTime: number, duration: number) => {
  if (!file || !(duration >= RESUME_MIN_DURATION)) return;
  const finished = currentTime < RESUME_MARGIN || currentTime > duration - RESUME_MARGIN;
  if (finished ? positions[file] === undefined : Math.abs((positions[file] ?? -1) - currentTime) < 1) return;
  const { [file]: _old, ...rest } = positions;
  // The newest last, so the oldest are dropped first
  positions = finished ? rest : { ...rest, [file]: Math.round(currentTime) };
  const keys = Object.keys(positions);
  if (keys.length > MAX_POSITIONS) positions = Object.fromEntries(keys.slice(-MAX_POSITIONS).map((k) => [k, positions[k]]));
  try {
    writeSetting(POSITIONS_KEY, JSON.stringify(positions));
  } catch {
    // only the place is lost
  }
};
const saveCurrentPosition = () => savePosition(state.tracks[state.index]?.file, state.status.currentTime, state.status.duration);
// Waiting for the recording to load to jump to where it was left
let pendingResume: { uid: string | undefined; at: number } | null = null;

// The queue moved to another track: show it from its start (or where it was left)
const showTrack = (index: number, playing: boolean) => {
  const track = state.tracks[index];
  if (!track) return;
  saveCurrentPosition();
  const saved = track.file ? positions[track.file] : undefined;
  // Night listening always starts a recording from the beginning, to fade it in
  pendingResume = saved !== undefined && !state.night ? { uid: track.uid, at: saved } : null;
  setState({ index, resumedFrom: null, status: { playing, currentTime: 0, duration: 0, isBuffering: playing } });
  rememberLastPlayed(track);
  // Night listening starts each recording silent and fades it in
  getEngine().setVolume(volumeAt(0, 0));
};

const onStatus = (s: EngineStatus) => {
  if (state.night) getEngine().setVolume(volumeAt(s.currentTime, s.duration));
  const track = state.tracks[state.index];
  // The recording has loaded (a fresh status near its start): jump to where it was left
  if (pendingResume && pendingResume.uid === track?.uid && s.duration > 0 && s.currentTime < 5) {
    const { at } = pendingResume;
    pendingResume = null;
    if (s.duration >= RESUME_MIN_DURATION && at > RESUME_MARGIN && at < s.duration - RESUME_MARGIN) {
      getEngine().seekTo(at);
      return setState({ resumedFrom: at, status: { ...s, currentTime: at } });
    }
  }
  if (Math.abs(s.currentTime - lastSaved) >= 10) {
    lastSaved = s.currentTime;
    savePosition(track?.file, s.currentTime, s.duration);
  }
  // In the background only play/pause is passed on (the screens catch up on the position when the app opens)
  if (inBackground && s.playing === state.status.playing) {
    state = { ...state, status: s };
    return;
  }
  setState({ status: s });
};

// One player for the whole app, so audio keeps going when screens change or the app is in the background.
// On the website it is made on first use, because the web player needs `Audio`, which doesn't exist during static
// rendering; on phones it is made right away, so a hymn the car started shows in the app as soon as it opens.
let engine: AudioEngine | null = null;
function getEngine(): AudioEngine {
  if (engine) return engine;
  engine = createAudioEngine({
    status: onStatus,
    trackChanged(id) {
      const index = state.tracks.findIndex((t) => t.uid === id);
      if (index >= 0 && index !== state.index) showTrack(index, true);
    },
    queueEnded() {
      setState({ status: { ...state.status, playing: false, isBuffering: false } });
    },
    queueReplaced(tracks, index) {
      // The car started one of the user's playlists: it becomes the queue
      setState({
        tracks: tracks.map((t) => ({ hymnId: t.hymnId, language: t.language, title: t.title, source: { uri: t.url }, file: t.file, uid: t.id })),
        origin: 'playlist',
        shuffle: false,
        unshuffled: null,
        night: false,
      });
      showTrack(index, true);
    },
  });
  engine.setRepeat(state.repeat);
  engine.setRate(state.rate);
  return engine;
}
if (Platform.OS !== 'web') getEngine();

const syncQueue = () => getEngine().update(state.tracks.map((t) => toEngineTrack(t)));

const shuffled = <T>(list: T[]): T[] => {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

// `shuffle` starts the list in a random order (and turns Shuffle on); otherwise the queue keeps the Shuffle setting.
// Anything played this way turns Night listening off; `playNight` turns it on.
export function playQueue(tracks: QueueTrack[], startIndex = 0, origin: QueueState['origin'] = 'single', shuffle?: boolean) {
  if (tracks.length === 0) return;
  setState({ night: false });
  startQueue(tracks, startIndex, origin, shuffle);
}

// Night listening: the whole list, over and over until it is stopped, no hymn louder than the one before
export function playNight(tracks: QueueTrack[], origin: QueueState['origin'] = 'playlist', shuffle?: boolean) {
  if (tracks.length === 0) return;
  setRepeat('all');
  setState({ night: true });
  startQueue(tracks, 0, origin, shuffle);
}

// Night listening off: back to full volume, the recording keeps playing
export function stopNight() {
  setState({ night: false });
  getEngine().setVolume(1);
}

// A recording that is not downloaded streams; with no internet, say so instead of a play button that does nothing
const streams = (t: QueueTrack | undefined) => !!t && /^https?:/.test(sourceUrl(t.source));
const offlineStrings = {
  en: {
    title: 'No internet connection',
    message: (name: string) =>
      `“${name}” isn’t downloaded, so it needs the internet to play. When you’re back online, tap Download on its page (or Download all on a playlist) to keep it for listening offline.`,
  },
  ar: {
    title: 'لا يوجد اتصال بالإنترنت',
    message: (name: string) =>
      `«${name}» غير منزَّل، لذلك يحتاج إلى الإنترنت لتشغيله. عندما تتصل بالإنترنت مرة أخرى، اضغط تنزيل في صفحته (أو تنزيل الكل في قائمة التشغيل) لتستمع إليه بدون إنترنت.`,
  },
};
// Kept up to date as the connection comes and goes, so playing never waits for a check (unknown counts as online)
let offline = false;
try {
  const apply = (net: Network.NetworkState | undefined) => {
    offline = net?.isConnected === false || net?.isInternetReachable === false;
  };
  Network.getNetworkStateAsync().then(apply, () => {});
  Network.addNetworkStateListener(apply);
} catch {
  // no connection information on this platform: always try to play
}
const warnOffline = (track: QueueTrack) => {
  const t = offlineStrings[getSettings().language] ?? offlineStrings.en;
  if (Platform.OS === 'web') globalThis.alert?.(`${t.title}\n\n${t.message(track.title)}`);
  else Alert.alert(t.title, t.message(track.title));
};
// Runs `go` unless `track` streams and there is no internet
const whenPlayable = (track: QueueTrack | undefined, go: () => void) => {
  if (offline && track && streams(track)) return warnOffline(track);
  go();
};

function startQueue(tracks: QueueTrack[], startIndex: number, origin: QueueState['origin'], shuffle?: boolean) {
  const first = shuffle ? undefined : tracks[Math.min(Math.max(0, startIndex), tracks.length - 1)];
  whenPlayable(first, () => loadQueue(tracks, startIndex, origin, shuffle));
}

function loadQueue(tracks: QueueTrack[], startIndex: number, origin: QueueState['origin'], shuffle?: boolean) {
  const on = shuffle ?? state.shuffle;
  const all = withUids(tracks);
  let index = Math.min(Math.max(0, startIndex), all.length - 1);
  if (on) {
    const start = shuffle ? Math.floor(Math.random() * all.length) : index;
    setState({ tracks: [all[start], ...shuffled(all.filter((_, i) => i !== start))], unshuffled: all, shuffle: true, origin });
    index = 0;
  } else setState({ tracks: all, origin, unshuffled: null, shuffle: false });
  showTrack(index, true);
  getEngine().load(
    state.tracks.map((t) => toEngineTrack(t)),
    index,
    true
  );
}

// Shuffle on: what is still to come plays in a random order. Off: back to the original order, from the current track
export function setShuffle(on: boolean) {
  const current = state.tracks[state.index];
  if (!current) return setState({ shuffle: on });
  if (on) {
    const rest = state.tracks.filter((_, i) => i !== state.index);
    setState({ shuffle: true, unshuffled: state.unshuffled ?? state.tracks, tracks: [current, ...shuffled(rest)], index: 0 });
  } else {
    const original = state.unshuffled ?? state.tracks;
    const at = original.findIndex((t) => t.uid === current.uid);
    setState({ shuffle: false, unshuffled: null, tracks: original, index: Math.max(0, at) });
  }
  syncQueue();
}

const goTo = (index: number, autoplay: boolean) =>
  whenPlayable(state.tracks[index], () => {
    showTrack(index, autoplay);
    getEngine().skipTo(index, autoplay);
  });

// Jump straight to a track in the queue (the Up Next list)
export function jumpTo(index: number) {
  if (index >= 0 && index < state.tracks.length) goTo(index, true);
}

// Take a track that is still to come out of the queue
export function removeFromQueue(index: number) {
  if (index <= state.index || index >= state.tracks.length) return;
  const gone = state.tracks[index];
  setState({
    tracks: state.tracks.filter((_, i) => i !== index),
    unshuffled: state.unshuffled?.filter((t) => t.uid !== gone.uid) ?? null,
  });
  syncQueue();
}

// Add hymns to the end of the queue (or start playing them when nothing is playing)
export function addToQueue(tracks: QueueTrack[]) {
  if (state.tracks.length === 0) return playQueue(tracks);
  const added = withUids(tracks);
  setState({ tracks: [...state.tracks, ...added], unshuffled: state.unshuffled ? [...state.unshuffled, ...added] : null });
  syncQueue();
}

// Off, then the whole queue, then this one track, like most music players
export function cycleRepeat() {
  setRepeat(state.repeat === 'none' ? 'all' : state.repeat === 'all' ? 'one' : 'none');
}

// Play next: add hymns after the current one, or drop the ones still waiting
export function queueAfterCurrent(tracks: QueueTrack[]) {
  if (state.tracks.length === 0) return;
  setState({ tracks: [...state.tracks.slice(0, state.index + 1), ...withUids(tracks)] });
  syncQueue();
}

export function togglePlay() {
  if (state.tracks.length === 0) return;
  if (state.status.playing) {
    saveCurrentPosition();
    getEngine().pause();
    setState({ status: { ...state.status, playing: false } });
  } else {
    getEngine().play();
    setState({ status: { ...state.status, playing: true } });
  }
}

export function seekBy(seconds: number) {
  const { currentTime, duration } = state.status;
  seekTo(Math.min(Math.max(0, currentTime + seconds), duration || currentTime + seconds));
}

export function seekTo(seconds: number) {
  if (state.tracks.length === 0) return;
  pendingResume = null;
  getEngine().seekTo(Math.max(0, seconds));
  setState({ resumedFrom: null, status: { ...state.status, currentTime: Math.max(0, seconds) } });
}

export function setPlaybackRate(rate: number) {
  setState({ rate });
  getEngine().setRate(rate);
}

export function skip(direction: 1 | -1) {
  // "Previous" restarts the current track first, like most music players
  if (direction === -1 && state.status.currentTime > 3) return seekTo(0);
  const target = state.index + direction;
  if (target >= 0 && target < state.tracks.length) goTo(target, state.status.playing);
  else if (state.repeat === 'all' && state.tracks.length > 0)
    goTo((target + state.tracks.length) % state.tracks.length, state.status.playing);
}

export function setRepeat(repeat: RepeatMode) {
  setState({ repeat });
  getEngine().setRepeat(repeat);
}

export function stopQueue() {
  if (!engine) return;
  saveCurrentPosition();
  engine.stop();
  setState({ tracks: [], index: 0, origin: 'single', unshuffled: null, night: false, status: { playing: false, currentTime: 0, duration: 0, isBuffering: false } });
}

// The user's playlists, for the car's library
export function setCarLibrary(playlists: { id: string; name: string; tracks: QueueTrack[] }[]) {
  if (Platform.OS === 'web') return;
  getEngine().setLibrary(
    playlists.map((list) => ({
      id: list.id,
      name: list.name,
      tracks: list.tracks.map((t, i) => toEngineTrack(t, `lib-${list.id}-${i}`)),
    }))
  );
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export function useAudioQueue(): QueueState {
  return useSyncExternalStore(subscribe, () => state, () => state);
}

// Only part of the queue (e.g. `currentTrack`): the screen redraws when that part changes, not on every position update.
// `select` must return a value from the queue or a primitive, not a new object each time.
export function useAudioQueueSelect<T>(select: (q: QueueState) => T): T {
  return useSyncExternalStore(subscribe, () => select(state), () => select(state));
}

export const currentTrack = (q: QueueState): QueueTrack | null => q.tracks[q.index] ?? null;
