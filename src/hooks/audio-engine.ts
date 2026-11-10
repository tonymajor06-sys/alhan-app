// The website's player (phones use audio-engine.native.ts)
import type { AudioEngine, EngineEvents } from './audio-engine-types';
import { createExpoEngine } from './audio-engine-expo';

export const createAudioEngine = (events: EngineEvents): AudioEngine => createExpoEngine(events);
