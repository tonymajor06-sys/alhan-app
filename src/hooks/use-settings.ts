import { readSetting, writeSetting } from './settings-storage';
import { useSyncExternalStore } from 'react';

import type { LanguageType } from '../data/hymns';

export type AppLanguage = 'en' | 'ar';

export interface Settings {
  language: AppLanguage;
  textScale: number;
  // Hymn reader shows a second language next to the first, verse by verse
  sideBySide: boolean;
  compareLanguage: LanguageType | null;
  // A notification the evening before each feast and fast (phone apps only)
  feastReminders: boolean;
  // When a hymn's recording ends, play the next hymn in the service that has one and open its words
  playNext: boolean;
}

const STORAGE_KEY = 'alhan-settings';
export const TEXT_SCALE_MIN = 0.85;
export const TEXT_SCALE_MAX = 1.9;

const loadSettings = (): Settings => {
  const defaults: Settings = { language: 'en', textScale: 1, sideBySide: false, compareLanguage: null, feastReminders: false, playNext: true };
  try {
    const raw = readSetting(STORAGE_KEY);
    return raw ? { ...defaults, ...JSON.parse(raw) } : defaults;
  } catch {
    return defaults;
  }
};

let settings = loadSettings();
const listeners = new Set<() => void>();

export function updateSettings(patch: Partial<Settings>) {
  settings = { ...settings, ...patch };
  try {
    writeSetting(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // settings still apply for this session
  }
  listeners.forEach((l) => l());
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export function useSettings(): Settings {
  return useSyncExternalStore(subscribe, () => settings, () => settings);
}
