import { AudioPlayer, AudioSource, AudioStatus, createAudioPlayer, setAudioModeAsync } from 'expo-audio';
import { useSyncExternalStore } from 'react';

import { LanguageType } from '../data/hymns';
import { writeSetting } from './settings-storage';

export interface QueueTrack {
  hymnId: string;
  language: LanguageType;
  title: string;
  source: AudioSource;
  // Which recording, when a hymn has more than one in this language
  file?: string;
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
  // isBuffering: waiting for the recording to load or stream in, so the play button can show it is working
  status: Pick<AudioStatus, 'playing' | 'currentTime' | 'duration' | 'isBuffering'>;
}

// The last hymn played, for the home screen's "Continue" shortcut
export const LAST_PLAYED_KEY = 'lastPlayed';
// Shown on the lock screen; served from the website's public folder
const LOCK_SCREEN_ARTWORK = 'https://copticpsalmody.com/artwork.png';

export const trackKey = (t: { hymnId: string; language: LanguageType }) => `${t.hymnId}:${t.language}`;

// One player for the whole app, so audio keeps going when screens change or the app is in the background.
// It is never released: it lives as long as the app does. Created on first use because the web
// player needs `Audio`, which doesn't exist during static rendering.
let player: AudioPlayer | null = null;

const getPlayer = (): AudioPlayer => {
  if (player) return player;
  player = createAudioPlayer(null, { updateInterval: 500 });
  player.addListener('playbackStatusUpdate', onStatus);
  // Next/previous on the lock screen, in the car or on headphones (added to expo-audio in patches/)
  player.addListener('remoteCommand', ({ command }) => skip(command === 'next' ? 1 : -1));
  // On web expo-audio drops the promise from <audio>.play(), so a recording that can't load (not online yet,
  // or no internet) becomes an "Uncaught Error". Give every play() a handler; the player already shows it as stopped.
  if (typeof HTMLMediaElement !== 'undefined' && !(HTMLMediaElement.prototype as { alhanSafePlay?: boolean }).alhanSafePlay) {
    const play = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = function (this: HTMLMediaElement) {
      const result = play.call(this);
      result?.catch?.(() => {});
      return result;
    };
    (HTMLMediaElement.prototype as { alhanSafePlay?: boolean }).alhanSafePlay = true;
  }
  setAudioModeAsync({
    playsInSilentMode: true,
    shouldPlayInBackground: true,
    // Lock screen controls require exclusive audio focus
    interruptionMode: 'doNotMix',
  }).catch(() => {
    // audio still plays in the foreground
  });
  return player;
};

let state: QueueState = {
  tracks: [],
  index: 0,
  origin: 'single',
  repeat: 'none',
  shuffle: false,
  unshuffled: null,
  rate: 1,
  status: { playing: false, currentTime: 0, duration: 0, isBuffering: false },
};
const listeners = new Set<() => void>();

const setState = (patch: Partial<QueueState>) => {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
};

const applyRate = (p: AudioPlayer) => {
  try {
    // Pitch correction keeps a slowed-down chant at its real pitch
    p.setPlaybackRate(state.rate, 'high');
  } catch {
    // speed control is unavailable on this platform
  }
};

const loadTrack = (index: number, autoplay: boolean) => {
  const track = state.tracks[index];
  if (!track) return;
  setState({ index, status: { playing: autoplay, currentTime: 0, duration: 0, isBuffering: autoplay } });
  try {
    writeSetting(LAST_PLAYED_KEY, JSON.stringify({ hymnId: track.hymnId, language: track.language }));
  } catch {
    // only the shortcut is lost
  }
  const player = getPlayer();
  player.replace(track.source);
  player.loop = state.repeat === 'one';
  applyRate(player);
  if (autoplay) player.play();
  try {
    // Also keeps Android's foreground service alive; without it background audio stops after ~3 minutes
    player.setActiveForLockScreen(
      true,
      { title: track.title, artist: 'Coptic Psalmody', artworkUrl: LOCK_SCREEN_ARTWORK },
      // Next/previous hymn instead of 10-second jumps, so the car's skip buttons move through the queue
      { showPreviousTrack: true, showNextTrack: true }
    );
  } catch {
    // lock screen controls are unavailable on this platform
  }
};

function onStatus(s: AudioStatus) {
  if (s.didJustFinish && state.repeat !== 'one') {
    const nextIndex = state.index + 1;
    if (nextIndex < state.tracks.length) return loadTrack(nextIndex, true);
    if (state.repeat === 'all' && state.tracks.length > 0) return loadTrack(0, true);
    // End of the queue: rewind so Play starts the last track again
    getPlayer().seekTo(0);
    return setState({ status: { playing: false, currentTime: 0, duration: s.duration, isBuffering: false } });
  }
  setState({ status: { playing: s.playing, currentTime: s.currentTime, duration: s.duration, isBuffering: s.isBuffering || (s.playing && !s.isLoaded) } });
}

const shuffled = <T>(list: T[]): T[] => {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

// `shuffle` starts the list in a random order (and turns Shuffle on); otherwise the queue keeps the Shuffle setting
export function playQueue(tracks: QueueTrack[], startIndex = 0, origin: QueueState['origin'] = 'single', shuffle?: boolean) {
  if (tracks.length === 0) return;
  const on = shuffle ?? state.shuffle;
  if (on) {
    const start = shuffle ? Math.floor(Math.random() * tracks.length) : Math.min(Math.max(0, startIndex), tracks.length - 1);
    const first = tracks[start];
    setState({ tracks: [first, ...shuffled(tracks.filter((_, i) => i !== start))], unshuffled: tracks, shuffle: true, origin });
    return loadTrack(0, true);
  }
  setState({ tracks, origin, unshuffled: null, shuffle: false });
  loadTrack(Math.min(Math.max(0, startIndex), tracks.length - 1), true);
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
    const at = original.findIndex((t) => trackKey(t) === trackKey(current) && t.file === current.file);
    setState({ shuffle: false, unshuffled: null, tracks: original, index: Math.max(0, at) });
  }
}

// Jump straight to a track in the queue (the Up Next list)
export function jumpTo(index: number) {
  if (index >= 0 && index < state.tracks.length) loadTrack(index, true);
}

// Take a track that is still to come out of the queue
export function removeFromQueue(index: number) {
  if (index <= state.index || index >= state.tracks.length) return;
  setState({ tracks: state.tracks.filter((_, i) => i !== index) });
}

// Add hymns to the end of the queue (or start playing them when nothing is playing)
export function addToQueue(tracks: QueueTrack[]) {
  if (state.tracks.length === 0) return playQueue(tracks);
  setState({ tracks: [...state.tracks, ...tracks] });
}

// Off, then the whole queue, then this one track, like most music players
export function cycleRepeat() {
  setRepeat(state.repeat === 'none' ? 'all' : state.repeat === 'all' ? 'one' : 'none');
}

// Play next: add hymns after the current one, or drop the ones still waiting
export function queueAfterCurrent(tracks: QueueTrack[]) {
  if (state.tracks.length === 0) return;
  setState({ tracks: [...state.tracks.slice(0, state.index + 1), ...tracks] });
}

export function togglePlay() {
  if (state.tracks.length === 0) return;
  if (state.status.playing) getPlayer().pause();
  else getPlayer().play();
}

export function seekBy(seconds: number) {
  const { currentTime, duration } = state.status;
  getPlayer().seekTo(Math.min(Math.max(0, currentTime + seconds), duration || currentTime + seconds));
}

export function seekTo(seconds: number) {
  if (state.tracks.length === 0) return;
  getPlayer().seekTo(Math.max(0, seconds));
  setState({ status: { ...state.status, currentTime: Math.max(0, seconds) } });
}

export function setPlaybackRate(rate: number) {
  setState({ rate });
  if (player) applyRate(player);
}

export function skip(direction: 1 | -1) {
  // "Previous" restarts the current track first, like most music players
  if (direction === -1 && state.status.currentTime > 3) return getPlayer().seekTo(0);
  const target = state.index + direction;
  if (target >= 0 && target < state.tracks.length) loadTrack(target, state.status.playing);
  else if (state.repeat === 'all' && state.tracks.length > 0)
    loadTrack((target + state.tracks.length) % state.tracks.length, state.status.playing);
}

export function setRepeat(repeat: RepeatMode) {
  if (player) player.loop = repeat === 'one';
  setState({ repeat });
}

export function stopQueue() {
  if (!player) return;
  player.pause();
  try {
    player.clearLockScreenControls();
  } catch {
    // nothing to clear
  }
  setState({ tracks: [], index: 0, origin: 'single', unshuffled: null, status: { playing: false, currentTime: 0, duration: 0, isBuffering: false } });
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export function useAudioQueue(): QueueState {
  return useSyncExternalStore(subscribe, () => state, () => state);
}

export const currentTrack = (q: QueueState): QueueTrack | null => q.tracks[q.index] ?? null;
