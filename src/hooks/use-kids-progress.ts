import { useSyncExternalStore } from 'react';

import { readSetting, writeSetting } from './settings-storage';

// Kids Corner: the stories finished on this device (a star each) and their best quiz score
const STORAGE_KEY = 'alhan-kids-done';

export interface KidStoryDone {
  right: number;
  total: number;
}

const load = (): Record<string, KidStoryDone> => {
  try {
    const raw = readSetting(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

let done = load();
const listeners = new Set<() => void>();

// A better score replaces the old one
export function recordKidStoryDone(storyId: string, right: number, total: number) {
  const old = done[storyId];
  if (old && old.right / old.total >= right / total) return;
  done = { ...done, [storyId]: { right, total } };
  try {
    writeSetting(STORAGE_KEY, JSON.stringify(done));
  } catch {
    // still counts for this session
  }
  listeners.forEach((l) => l());
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export function useKidsProgress(): Record<string, KidStoryDone> {
  return useSyncExternalStore(subscribe, () => done, () => done);
}
