import { readSetting, writeSetting } from './settings-storage';
import { useSyncExternalStore } from 'react';

export type AppLanguage = 'en' | 'ar';

export interface Settings {
  language: AppLanguage;
  textScale: number;
}

const STORAGE_KEY = 'alhan-settings';
export const TEXT_SCALE_MIN = 0.85;
export const TEXT_SCALE_MAX = 1.9;

const loadSettings = (): Settings => {
  const defaults: Settings = { language: 'en', textScale: 1 };
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
  return useSyncExternalStore(subscribe, () => settings);
}
