// The phones' player (audio-engine.native.ts) against a stand-in for react-native-nitro-player that keeps its
// playlists in memory, as the native player does.
import type { EngineEvents, EngineTrack } from '../audio-engine-types';

type Item = { id: string; title: string; url: string; extraPayload?: Record<string, unknown> };

const mockNitro = (() => {
  let n = 0;
  const playlists = new Map<string, { id: string; name: string; tracks: Item[] }>();
  const listeners: Record<string, ((...args: any[]) => void)[]> = {};
  const player = { playlistId: null as string | null, index: 0, state: 'paused', volume: 100, repeat: 'off' };
  const on = (name: string) => (cb: (...args: any[]) => void) => void (listeners[name] = [...(listeners[name] ?? []), cb]);
  const current = () => (player.playlistId ? (playlists.get(player.playlistId)?.tracks[player.index] ?? null) : null);
  const PlayerQueue = {
    createPlaylist: jest.fn(async (name: string) => {
      const id = `p${++n}`;
      playlists.set(id, { id, name, tracks: [] });
      return id;
    }),
    getPlaylist: (id: string) => playlists.get(id) ?? null,
    getCurrentPlaylistId: () => player.playlistId,
    updatePlaylist: jest.fn(async (id: string, name: string) => void (playlists.get(id)!.name = name)),
    deletePlaylist: jest.fn(async (id: string) => void playlists.delete(id)),
    addTracksToPlaylist: jest.fn(async (id: string, items: Item[], index?: number) => {
      const list = playlists.get(id)!;
      list.tracks.splice(index ?? list.tracks.length, 0, ...items);
    }),
    addTrackToPlaylist: jest.fn(async (id: string, item: Item, index?: number) => {
      const list = playlists.get(id)!;
      const playing = id === player.playlistId ? current()?.id : undefined;
      list.tracks.splice(index ?? list.tracks.length, 0, item);
      if (playing) player.index = list.tracks.findIndex((t) => t.id === playing);
    }),
    removeTracksFromPlaylist: jest.fn(async (id: string, ids: string[]) => {
      const list = playlists.get(id)!;
      const playing = id === player.playlistId ? current()?.id : undefined;
      list.tracks = list.tracks.filter((t) => !ids.includes(t.id));
      if (playing) player.index = Math.max(0, list.tracks.findIndex((t) => t.id === playing));
    }),
    reorderTrackInPlaylist: jest.fn(async (id: string, trackId: string, newIndex: number) => {
      const list = playlists.get(id)!;
      const playing = id === player.playlistId ? current()?.id : undefined;
      const item = list.tracks.find((t) => t.id === trackId)!;
      list.tracks = list.tracks.filter((t) => t.id !== trackId);
      list.tracks.splice(newIndex, 0, item);
      if (playing) player.index = list.tracks.findIndex((t) => t.id === playing);
    }),
    loadPlaylist: jest.fn(async (id: string, index = 0) => {
      player.playlistId = id;
      player.index = index;
    }),
  };
  const TrackPlayer = {
    getRepeatMode: () => player.repeat,
    configure: jest.fn(async () => {}),
    getState: jest.fn(async () => ({
      currentTrack: current(),
      currentPosition: 0,
      totalDuration: 0,
      currentState: player.state,
      currentPlaylistId: player.playlistId,
      currentIndex: player.index,
    })),
    play: jest.fn(async () => void (player.state = 'playing')),
    pause: jest.fn(async () => void (player.state = 'paused')),
    seek: jest.fn(async () => {}),
    skipToIndex: jest.fn(async (index: number) => {
      player.index = index;
      return true;
    }),
    setRepeatMode: jest.fn(async (mode: string) => void (player.repeat = mode)),
    setPlaybackSpeed: jest.fn(async () => {}),
    setVolume: jest.fn(async (v: number) => void (player.volume = v)),
    onChangeTrack: on('changeTrack'),
    onPlaybackStateChange: on('state'),
    onPlaybackProgressChange: on('progress'),
  };
  const AndroidAutoMediaLibraryHelper = { isAvailable: () => true, set: jest.fn() };
  // A recording ends and the native player moves on by itself
  const advance = () => {
    player.index++;
    listeners.changeTrack?.forEach((cb) => cb(current(), 'end'));
  };
  // The car starts a playlist
  const carPlays = (playlistId: string, index: number) => {
    player.playlistId = playlistId;
    player.index = index;
    listeners.changeTrack?.forEach((cb) => cb(current(), 'user_action'));
  };
  return { PlayerQueue, TrackPlayer, AndroidAutoMediaLibraryHelper, player, playlists, advance, carPlays, current };
})();

jest.mock('react-native-nitro-player', () => mockNitro);
jest.mock('react-native', () => ({ Platform: { OS: 'android' } }));
jest.mock('expo-sqlite/kv-store', () => {
  const store = new Map<string, string>();
  return {
    getItemSync: (key: string) => store.get(key) ?? null,
    setItemSync: (key: string, value: string) => store.set(key, value),
  };
});
jest.mock('expo-audio', () => ({ createAudioPlayer: jest.fn(), setAudioModeAsync: jest.fn() }));

// eslint-disable-next-line import/first
import { createAudioEngine } from '../audio-engine.native';

const track = (id: string): EngineTrack => ({
  id,
  url: `https://example.com/${id}.m4a`,
  title: id,
  artist: 'Coptic Psalmody',
  artwork: '',
  hymnId: `hymn-${id}`,
  language: 'coptic',
  file: `${id}.m4a`,
});

// The native commands run one after another on promises; let them all finish
const settle = async () => {
  for (let i = 0; i < 50; i++) await Promise.resolve();
};

const nativeIds = () => mockNitro.playlists.get(mockNitro.player.playlistId!)!.tracks.map((t) => t.id);

describe('the phones’ player', () => {
  const events: jest.Mocked<EngineEvents> = {
    status: jest.fn(),
    trackChanged: jest.fn(),
    queueEnded: jest.fn(),
    queueReplaced: jest.fn(),
  };
  const engine = createAudioEngine(events);

  it('is the native player, set up for Android Auto', async () => {
    await settle();
    expect(mockNitro.TrackPlayer.configure).toHaveBeenCalledWith(expect.objectContaining({ androidAutoEnabled: true }));
  });

  it('plays a new queue from the chosen track', async () => {
    engine.load([track('a'), track('b'), track('c')], 1, true);
    await settle();
    expect(nativeIds()).toEqual(['a', 'b', 'c']);
    expect(mockNitro.current()?.id).toBe('b');
    expect(mockNitro.player.state).toBe('playing');
  });

  it('writes the next queue into the other playlist, leaving the playing one alone', async () => {
    const first = mockNitro.player.playlistId;
    engine.load([track('d'), track('e')], 0, true);
    await settle();
    expect(mockNitro.player.playlistId).not.toBe(first);
    expect(nativeIds()).toEqual(['d', 'e']);
    // and back to the first one next time, so only two are ever made
    engine.load([track('f')], 0, true);
    await settle();
    expect(mockNitro.player.playlistId).toBe(first);
  });

  it('reorders, adds and removes without stopping the recording playing', async () => {
    engine.load([track('a'), track('b'), track('c'), track('d')], 1, true);
    await settle();
    mockNitro.PlayerQueue.loadPlaylist.mockClear();
    const playlist = mockNitro.player.playlistId;
    // shuffled, with c taken out and e added
    engine.update([track('b'), track('d'), track('e'), track('a')]);
    await settle();
    expect(mockNitro.player.playlistId).toBe(playlist);
    expect(nativeIds()).toEqual(['b', 'd', 'e', 'a']);
    expect(mockNitro.current()?.id).toBe('b');
    expect(mockNitro.PlayerQueue.loadPlaylist).not.toHaveBeenCalled();
  });

  it('tells the queue when a recording ends and the next one starts', async () => {
    engine.load([track('a'), track('b')], 0, true);
    await settle();
    events.trackChanged.mockClear();
    mockNitro.advance();
    await settle();
    expect(events.trackChanged).toHaveBeenCalledWith('b');
  });

  it('turns repeat, speed and volume into the native player’s terms', async () => {
    mockNitro.TrackPlayer.setVolume.mockClear();
    engine.setRepeat('all');
    engine.setRate(0.75);
    engine.setVolume(0.3);
    await settle();
    expect(mockNitro.TrackPlayer.setRepeatMode).toHaveBeenCalledWith('Playlist');
    expect(mockNitro.TrackPlayer.setPlaybackSpeed).toHaveBeenCalledWith(0.75);
    expect(mockNitro.TrackPlayer.setVolume).toHaveBeenCalledWith(30);
    // the same volume again is not sent twice (Night listening sets it on every update)
    engine.setVolume(0.3);
    expect(mockNitro.TrackPlayer.setVolume).toHaveBeenCalledTimes(1);
  });

  it('puts the user’s playlists in the car, and a playlist the car plays becomes the queue', async () => {
    engine.setLibrary([{ id: 'mine', name: 'Kiahk', tracks: [track('lib-mine-0'), track('lib-mine-1')] }]);
    await settle();
    const [root] = mockNitro.AndroidAutoMediaLibraryHelper.set.mock.calls[0][0].rootItems;
    expect(root.title).toBe('Kiahk');
    expect(mockNitro.playlists.get(root.playlistId)!.tracks.map((t) => t.id)).toEqual(['lib-mine-0', 'lib-mine-1']);

    mockNitro.carPlays(root.playlistId, 1);
    await settle();
    expect(events.queueReplaced).toHaveBeenCalledWith(
      [expect.objectContaining({ id: 'lib-mine-0', hymnId: 'hymn-lib-mine-0' }), expect.objectContaining({ id: 'lib-mine-1' })],
      1
    );
  });

  it('plays a downloaded recording from its file', async () => {
    engine.load([{ ...track('a'), url: 'file:///data/audio/Hymn%20of%20joy.m4a' }], 0, true);
    await settle();
    expect(mockNitro.current()?.url).toBe('file:///data/audio/Hymn%20of%20joy.m4a');
  });
});
