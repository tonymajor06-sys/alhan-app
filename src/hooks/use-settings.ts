import { readSetting, writeSetting } from './settings-storage';
import { useSyncExternalStore } from 'react';

import type { LanguageType } from '../data/hymns';

export type AppLanguage = 'en' | 'ar';
// How hymn names show: the name with its Coptic words in small type below, the name only, or the Coptic words only
export type TitleStyle = 'both' | 'english' | 'coptic';
export type ThemeChoice = 'system' | 'light' | 'dark';

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
  titleStyle: TitleStyle;
  theme: ThemeChoice;
  // The language a hymn opens in; null follows the app language (Coptic in English, Arabic in Arabic)
  hymnLanguage: LanguageType | null;
  // Follow along: the hymn reader shows the whole service on one page, as in Spirit & Truth (see service-book.tsx)
  followAlong: boolean;
  // Follow along's third column (with Side by Side's two), or null for two
  thirdLanguage: LanguageType | null;
  // What Follow along leaves out of Midnight and Vesper Praises: whole kinds ('doxologies', 'psalis', 'lobsh',
  // 'expositions') and single doxologies by id (see service-book.ts)
  followHidden: string[];
  // Kids mode: a simpler Home with Kids Corner (Bible stories and quizzes for children) and fewer settings
  kidMode: boolean;
}

const STORAGE_KEY = 'alhan-settings';
export const TEXT_SCALE_MIN = 0.85;
export const TEXT_SCALE_MAX = 1.9;

const loadSettings = (): Settings => {
  const defaults: Settings = {
    language: 'en',
    textScale: 1,
    sideBySide: false,
    compareLanguage: null,
    feastReminders: false,
    playNext: true,
    titleStyle: 'both',
    theme: 'system',
    hymnLanguage: null,
    followAlong: false,
    thirdLanguage: null,
    followHidden: [],
    kidMode: false,
  };
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

// The settings outside a screen (e.g. the player's messages)
export const getSettings = (): Settings => settings;

export function useSettings(): Settings {
  return useSyncExternalStore(subscribe, () => settings, () => settings);
}
