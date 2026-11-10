// What the queue (use-audio-queue.ts) asks of the player underneath it. Two players fit it:
// - audio-engine-expo.ts: expo-audio, on the website (and on a phone build that is missing the native player)
// - audio-engine.native.ts: react-native-nitro-player on phones, which keeps the whole queue natively, so the lock
//   screen, headphones and the car (Android Auto) move through it even while JavaScript is asleep
import type { LanguageType } from '../data/hymns';

export type EngineRepeat = 'none' | 'one' | 'all';

export interface EngineTrack {
  // Unique in the queue, even when a hymn is in it twice
  id: string;
  // A web address, or a downloaded file's file:// address
  url: string;
  title: string;
  artist: string;
  artwork: string;
  // To make a queue track again from a track the car started
  hymnId: string;
  language: LanguageType;
  file?: string;
}

export interface EngineStatus {
  playing: boolean;
  currentTime: number;
  duration: number;
  isBuffering: boolean;
}

export interface EngineEvents {
  status(status: EngineStatus): void;
  // The player moved to another track of the queue by itself (a recording ended, or next/previous on the lock
  // screen, headphones or in the car)
  trackChanged(id: string): void;
  // The last recording ended (repeat off)
  queueEnded(): void;
  // Something outside the app (the car's library) started a different list
  queueReplaced(tracks: EngineTrack[], index: number): void;
}

export interface AudioEngine {
  // Play a new queue from `index`
  load(tracks: EngineTrack[], index: number, autoplay: boolean): void;
  // The same queue in another order, or with tracks added or taken out; the playing track keeps playing
  update(tracks: EngineTrack[]): void;
  skipTo(index: number, autoplay: boolean): void;
  play(): void;
  pause(): void;
  seekTo(seconds: number): void;
  setRepeat(repeat: EngineRepeat): void;
  setRate(rate: number): void;
  // 0 to 1, under the phone's own volume
  setVolume(volume: number): void;
  stop(): void;
  // The user's playlists, for the car's library (phones only)
  setLibrary(playlists: { id: string; name: string; tracks: EngineTrack[] }[]): void;
}
