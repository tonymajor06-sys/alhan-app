import { useSyncExternalStore } from 'react';

import { readSetting, writeSetting } from './settings-storage';

// My hymns to learn: the hymns marked "Learning" or "I know it", with when each was added and last practised.
// A few Learning hymns come back each day for review, the ones practised longest ago first.
export type LearnStatus = 'learning' | 'known';
export interface LearnEntry {
  status: LearnStatus;
  added: number;
  // Last day it was practised (a day number, see dayNumber), never when it has not been yet
  practised?: number;
}
export type LearnList = Record<string, LearnEntry>;

const STORAGE_KEY = 'alhan-learning';
export const REVIEW_PER_DAY = 3;

// Days since 1970 in the phone's own time zone, so "today" turns over at local midnight
export const dayNumber = (date = new Date()) => Math.floor((date.getTime() - date.getTimezoneOffset() * 60000) / 86400000);

let list: LearnList = (() => {
  try {
    const saved = JSON.parse(readSetting(STORAGE_KEY) ?? '{}');
    return saved && typeof saved === 'object' && !Array.isArray(saved) ? (saved as LearnList) : {};
  } catch {
    return {};
  }
})();
const listeners = new Set<() => void>();

const save = (next: LearnList) => {
  list = next;
  try {
    writeSetting(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // it still applies for this session
  }
  listeners.forEach((l) => l());
};

// Mark a hymn Learning or I know it, or take it off the list (null)
export function setLearnStatus(hymnId: string, status: LearnStatus | null) {
  const { [hymnId]: old, ...rest } = list;
  save(status ? { ...rest, [hymnId]: { ...old, added: old?.added ?? Date.now(), status } } : rest);
}

// Practising a Learning hymn (playing its recording, recording oneself) counts as today's review of it
export function markPractised(hymnId: string, day = dayNumber()) {
  const entry = list[hymnId];
  if (entry?.status === 'learning' && entry.practised !== day) save({ ...list, [hymnId]: { ...entry, practised: day } });
}

// Today's review: Learning hymns not yet practised today, never-practised first, then the longest ago;
// the ones already practised today stay in it (ticked) so the day's review doesn't change under the user
export function todaysReview(entries: LearnList, day = dayNumber(), count = REVIEW_PER_DAY): { hymnId: string; done: boolean }[] {
  const learning = Object.entries(entries).filter(([, e]) => e.status === 'learning');
  const done = learning.filter(([, e]) => e.practised === day);
  const waiting = learning
    .filter(([, e]) => e.practised !== day)
    .sort(([, a], [, b]) => (a.practised ?? -1) - (b.practised ?? -1) || a.added - b.added);
  return [...done.map(([id]) => ({ hymnId: id, done: true })), ...waiting.map(([id]) => ({ hymnId: id, done: false }))].slice(
    0,
    Math.max(count, done.length)
  );
}

// The list's hymns of one kind, newest first
export const hymnsWithStatus = (entries: LearnList, status: LearnStatus) =>
  Object.entries(entries)
    .filter(([, e]) => e.status === status)
    .sort(([, a], [, b]) => b.added - a.added)
    .map(([id]) => id);

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export function useLearning(): LearnList {
  return useSyncExternalStore(subscribe, () => list, () => list);
}
