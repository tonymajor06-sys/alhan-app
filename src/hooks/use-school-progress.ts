import { useSyncExternalStore } from 'react';

import type { LessonDone } from '@/data/theology-school';

import { readSetting, writeSetting } from './settings-storage';

// The Theology School lessons finished on this device: the day each was finished and its best quiz score
const STORAGE_KEY = 'alhan-school-done';

const load = (): Record<string, LessonDone> => {
  try {
    const raw = readSetting(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

let done = load();
const listeners = new Set<() => void>();

// The first finish keeps its day (so the streak counts the day it was learned); a better score replaces the old one
export function recordLessonDone(lessonId: string, day: number, right: number, total: number) {
  const old = done[lessonId];
  if (old && old.right / old.total >= right / total) return;
  done = { ...done, [lessonId]: { day: old?.day ?? day, right, total } };
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

export function useSchoolProgress(): Record<string, LessonDone> {
  return useSyncExternalStore(subscribe, () => done, () => done);
}
