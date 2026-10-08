import { useSyncExternalStore } from 'react';

import { readSetting, writeSetting } from './settings-storage';

// The best score on each quiz level, kept on the device
export interface LevelScore {
  right: number;
  total: number;
}

const STORAGE_KEY = 'alhan-quiz-best';

const load = (): Record<string, LevelScore> => {
  try {
    const raw = readSetting(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

let best = load();
const listeners = new Set<() => void>();

// Keeps the score only when it beats the one already saved
export function recordQuizScore(levelId: string, right: number, total: number) {
  const old = best[levelId];
  if (old && old.right / old.total >= right / total) return;
  best = { ...best, [levelId]: { right, total } };
  try {
    writeSetting(STORAGE_KEY, JSON.stringify(best));
  } catch {
    // the score still shows for this session
  }
  listeners.forEach((l) => l());
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export function useQuizBest(): Record<string, LevelScore> {
  return useSyncExternalStore(subscribe, () => best, () => best);
}
