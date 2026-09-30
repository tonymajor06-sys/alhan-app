import { AudioPlayer, AudioSource, AudioStatus, createAudioPlayer, setAudioModeAsync } from 'expo-audio';
import { useSyncExternalStore } from 'react';

import { LanguageType } from '../data/hymns';

export interface QueueTrack {
  hymnId: string;
  language: LanguageType;
  title: string;
  source: AudioSource;
}

export type RepeatMode = 'none' | 'one' | 'all';

export interface QueueState {
  tracks: QueueTrack[];
  index: number;
  // 'playlist' when the queue was started from the saved playlist, so the playlist screen can highlight it
  origin: 'single' | 'playlist';
  repeat: RepeatMode;
  status: Pick<AudioStatus, 'playing' | 'currentTime' | 'duration'>;
}

export const trackKey = (t: { hymnId: string; language: LanguageType }) => `${t.hymnId}:${t.language}`;

// One player for the whole app, so audio keeps going when screens change or the app is in the background.
// It is never released: it lives as long as the app does. Created on first use because the web
// player needs `Audio`, which doesn't exist during static rendering.
let player: AudioPlayer | null = null;

const getPlayer = (): AudioPlayer => {
  if (player) return player;
  player = createAudioPlayer(null, { updateInterval: 500 });
  player.addListener('playbackStatusUpdate', onStatus);
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
  status: { playing: false, currentTime: 0, duration: 0 },
};
const listeners = new Set<() => void>();

const setState = (patch: Partial<QueueState>) => {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
};

const loadTrack = (index: number, autoplay: boolean) => {
  const track = state.tracks[index];
  if (!track) return;
  setState({ index, status: { playing: autoplay, currentTime: 0, duration: 0 } });
  const player = getPlayer();
  player.replace(track.source);
  player.loop = state.repeat === 'one';
  if (autoplay) player.play();
  try {
    // Also keeps Android's foreground service alive; without it background audio stops after ~3 minutes
    player.setActiveForLockScreen(
      true,
      { title: track.title, artist: 'Alhan' },
      { showSeekBackward: true, showSeekForward: true }
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
    return setState({ status: { playing: false, currentTime: 0, duration: s.duration } });
  }
  setState({ status: { playing: s.playing, currentTime: s.currentTime, duration: s.duration } });
}

export function playQueue(tracks: QueueTrack[], startIndex = 0, origin: QueueState['origin'] = 'single') {
  if (tracks.length === 0) return;
  setState({ tracks, origin });
  loadTrack(Math.min(Math.max(0, startIndex), tracks.length - 1), true);
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
  setState({ tracks: [], index: 0, origin: 'single', status: { playing: false, currentTime: 0, duration: 0 } });
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export function useAudioQueue(): QueueState {
  return useSyncExternalStore(subscribe, () => state);
}

export const currentTrack = (q: QueueState): QueueTrack | null => q.tracks[q.index] ?? null;
