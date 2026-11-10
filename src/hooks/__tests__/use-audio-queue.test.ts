// The queue (use-audio-queue.ts) on top of a stand-in player, as on a phone
import type { EngineEvents, EngineTrack } from '../audio-engine-types';

// Made inside the mock: the queue makes its player as soon as it loads, before this file's own variables exist
jest.mock('../audio-engine', () => {
  const engine = {
    events: null as unknown,
    load: jest.fn(),
    update: jest.fn(),
    skipTo: jest.fn(),
    play: jest.fn(),
    pause: jest.fn(),
    seekTo: jest.fn(),
    setRepeat: jest.fn(),
    setRate: jest.fn(),
    setVolume: jest.fn(),
    stop: jest.fn(),
    setLibrary: jest.fn(),
  };
  return {
    mockEngine: engine,
    createAudioEngine: (events: unknown) => {
      engine.events = events;
      return engine;
    },
  };
});
jest.mock('react-native', () => {
  const listeners: ((s: string) => void)[] = [];
  return {
    Platform: { OS: 'ios' },
    AppState: {
      currentState: 'active',
      addEventListener: (_: string, cb: (s: string) => void) => listeners.push(cb),
      mockChange: (s: string) => listeners.forEach((cb) => cb(s)),
    },
  };
});
jest.mock('expo-asset', () => ({ Asset: { fromModule: () => ({ uri: '' }) } }));
jest.mock('expo-sqlite/kv-store', () => {
  const store = new Map<string, string>();
  return {
    getItemSync: (key: string) => store.get(key) ?? null,
    setItemSync: (key: string, value: string) => store.set(key, value),
  };
});
jest.mock('../../data/audio-loudness', () => ({ audioLoudness: { 'loud.m4a': -11, 'quiet.m4a': -23 } }));

/* eslint-disable import/first */
import { AppState } from 'react-native';
import {
  addToQueue,
  currentTrack,
  jumpTo,
  NIGHT_LEVELS,
  playNight,
  playQueue,
  QueueTrack,
  removeFromQueue,
  seekTo,
  setCarLibrary,
  setShuffle,
  skip,
  stopNight,
  useAudioQueue,
} from '../use-audio-queue';
/* eslint-enable import/first */

const { mockEngine } = jest.requireMock('../audio-engine') as {
  mockEngine: Record<'load' | 'update' | 'skipTo' | 'seekTo' | 'setVolume' | 'setLibrary', jest.Mock> & { events: EngineEvents | null };
};

// Reads the queue's state outside React: the hook's store read straight away
jest.mock('react', () => ({
  useSyncExternalStore: (_: unknown, get: () => unknown) => get(),
}));
const readQueue = useAudioQueue;
const snapshot = () => readQueue();

const hymn = (id: string, file = `${id}.m4a`): QueueTrack => ({
  hymnId: id,
  language: 'coptic',
  title: id,
  source: { uri: `https://example.com/${file}` },
  file,
});
const loaded = (): EngineTrack[] => mockEngine.load.mock.calls.at(-1)![0];
const updated = (): EngineTrack[] => mockEngine.update.mock.calls.at(-1)![0];
const status = (currentTime: number, duration: number, playing = true) =>
  mockEngine.events!.status({ playing, currentTime, duration, isBuffering: false });
const lastVolume = () => mockEngine.setVolume.mock.calls.at(-1)![0];

beforeEach(() => jest.clearAllMocks());

describe('the queue', () => {
  it('gives the player every hymn, each with its own id, even a hymn queued twice', () => {
    playQueue([hymn('a'), hymn('b'), hymn('a')], 1);
    const tracks = loaded();
    expect(tracks.map((t) => t.hymnId)).toEqual(['a', 'b', 'a']);
    expect(new Set(tracks.map((t) => t.id)).size).toBe(3);
    expect(mockEngine.load.mock.calls[0][1]).toBe(1);
    expect(currentTrack(snapshot())?.hymnId).toBe('b');
  });

  it('follows the player when a recording ends and the next one starts', () => {
    playQueue([hymn('a'), hymn('b')]);
    mockEngine.events!.trackChanged(loaded()[1].id);
    expect(snapshot().index).toBe(1);
  });

  it('shuffles what is still to come, keeping the hymn playing first', () => {
    playQueue([hymn('a'), hymn('b'), hymn('c'), hymn('d')], 2);
    const playing = loaded()[2].id;
    setShuffle(true);
    expect(updated()[0].id).toBe(playing);
    expect(updated()).toHaveLength(4);
    setShuffle(false);
    expect(updated().map((t) => t.hymnId)).toEqual(['a', 'b', 'c', 'd']);
    expect(snapshot().index).toBe(2);
  });

  it('adds and takes out hymns without restarting the one playing', () => {
    playQueue([hymn('a'), hymn('b'), hymn('c')]);
    addToQueue([hymn('d')]);
    expect(updated().map((t) => t.hymnId)).toEqual(['a', 'b', 'c', 'd']);
    removeFromQueue(1);
    expect(updated().map((t) => t.hymnId)).toEqual(['a', 'c', 'd']);
    expect(mockEngine.load).toHaveBeenCalledTimes(1);
  });

  it('skips and jumps through the player', () => {
    playQueue([hymn('a'), hymn('b'), hymn('c')]);
    status(1, 100);
    skip(1);
    expect(mockEngine.skipTo).toHaveBeenLastCalledWith(1, true);
    jumpTo(2);
    expect(mockEngine.skipTo).toHaveBeenLastCalledWith(2, true);
    // "Previous" more than 3 seconds in restarts the hymn instead
    status(30, 100);
    skip(-1);
    expect(mockEngine.seekTo).toHaveBeenLastCalledWith(0);
    seekTo(42);
    expect(mockEngine.seekTo).toHaveBeenLastCalledWith(42);
  });

  it('keeps the position without redrawing the screens while the app is in the background', () => {
    playQueue([hymn('a')]);
    status(1, 100);
    const before = snapshot();
    (AppState as unknown as { mockChange: (s: string) => void }).mockChange('background');
    status(50, 100);
    expect(snapshot().status.currentTime).toBe(50);
    expect(snapshot()).not.toBe(before);
    (AppState as unknown as { mockChange: (s: string) => void }).mockChange('active');
  });

  it('puts the user’s playlists in the car', () => {
    setCarLibrary([{ id: 'mine', name: 'Kiahk', tracks: [hymn('a'), hymn('b')] }]);
    const [list] = mockEngine.setLibrary.mock.calls[0][0];
    expect(list.name).toBe('Kiahk');
    expect(list.tracks.map((t: EngineTrack) => t.id)).toEqual(['lib-mine-0', 'lib-mine-1']);
  });

  it('shows a playlist the car started as the queue', () => {
    mockEngine.events!.queueReplaced(
      [
        { id: 'lib-mine-0', url: 'https://example.com/a.m4a', title: 'a', artist: '', artwork: '', hymnId: 'a', language: 'coptic', file: 'a.m4a' },
        { id: 'lib-mine-1', url: 'https://example.com/b.m4a', title: 'b', artist: '', artwork: '', hymnId: 'b', language: 'coptic', file: 'b.m4a' },
      ],
      1
    );
    expect(snapshot().origin).toBe('playlist');
    expect(currentTrack(snapshot())?.hymnId).toBe('b');
    // and the queue follows the car from there
    mockEngine.events!.trackChanged('lib-mine-0');
    expect(snapshot().index).toBe(0);
  });
});

describe('Night listening', () => {
  it('plays all night, starting each hymn silent and fading it in', () => {
    playNight([hymn('quiet', 'quiet.m4a')], NIGHT_LEVELS.softer);
    expect(snapshot().repeat).toBe('all');
    expect(lastVolume()).toBe(0);
    status(4, 300);
    const halfway = lastVolume();
    status(20, 300);
    expect(halfway).toBeGreaterThan(0);
    expect(lastVolume()).toBeCloseTo(NIGHT_LEVELS.softer, 2);
    // and fades out at the end
    status(297, 300);
    expect(lastVolume()).toBeLessThan(NIGHT_LEVELS.softer);
  });

  it('plays a loud recording as softly as a quiet one', () => {
    playNight([hymn('quiet', 'quiet.m4a'), hymn('loud', 'loud.m4a')], NIGHT_LEVELS.softer);
    status(20, 300);
    const quiet = lastVolume();
    mockEngine.events!.trackChanged(loaded()[1].id);
    status(20, 300);
    // 12 dB louder, so played at a quarter of the volume
    expect(lastVolume()).toBeCloseTo(quiet / 10 ** (12 / 20), 3);
  });

  it('goes back to full volume when turned off, and any other playing turns it off', () => {
    playNight([hymn('quiet', 'quiet.m4a')], NIGHT_LEVELS.soft);
    stopNight();
    expect(lastVolume()).toBe(1);
    playNight([hymn('quiet', 'quiet.m4a')], NIGHT_LEVELS.soft);
    playQueue([hymn('a')]);
    expect(snapshot().night).toBeNull();
    status(1, 100);
    expect(lastVolume()).toBe(1);
  });
});
