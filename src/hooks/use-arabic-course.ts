import { useSyncExternalStore } from 'react';

import { readSetting, writeSetting } from './settings-storage';

// Learn Arabic > Letter by Letter: the stars won in each lesson (best kept) and how often each letter was missed
// (Review brings those back first), kept on the device
export interface ArabicCourseProgress {
  stars: Record<string, number>;
  misses: Record<string, number>;
}

const STORAGE_KEY = 'alhan-arabic-course';

const load = (): ArabicCourseProgress => {
  try {
    const raw = readSetting(STORAGE_KEY);
    const saved = raw ? JSON.parse(raw) : {};
    return { stars: saved.stars ?? {}, misses: saved.misses ?? {} };
  } catch {
    return { stars: {}, misses: {} };
  }
};

let progress = load();
const listeners = new Set<() => void>();

const save = (next: ArabicCourseProgress) => {
  progress = next;
  try {
    writeSetting(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // still counts for this session
  }
  listeners.forEach((l) => l());
};

// A lesson finished: its stars (the best kept) and the letters missed on the way (those got right count down)
export function recordArabicLesson(unitId: string | null, stars: number, missed: string[], right: string[]) {
  const misses = { ...progress.misses };
  for (const l of missed) misses[l] = (misses[l] ?? 0) + 1;
  for (const l of right) if (misses[l]) misses[l] = Math.max(0, misses[l] - 1);
  save({
    stars: unitId ? { ...progress.stars, [unitId]: Math.max(stars, progress.stars[unitId] ?? 0) } : progress.stars,
    misses,
  });
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export function useArabicCourse(): ArabicCourseProgress {
  return useSyncExternalStore(subscribe, () => progress, () => progress);
}
