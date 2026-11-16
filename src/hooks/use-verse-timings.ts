import { useSyncExternalStore } from 'react';

import { verseTimings as bundledTimings } from '../data/verse-timings';
import { readSetting, writeSetting } from './settings-storage';

// When each verse starts in a recording (seconds, one entry per verse), keyed by audio file.
// Marks made on this phone take the place of the ones shipped with the app.
type Timings = Record<string, number[]>;

const STORAGE_KEY = 'alhan-verse-timings';

const load = (): Timings => {
  try {
    const raw = readSetting(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

let marked = load();
const listeners = new Set<() => void>();

const save = (next: Timings) => {
  marked = next;
  try {
    writeSetting(STORAGE_KEY, JSON.stringify(marked));
  } catch {
    // marks still apply for this session
  }
  listeners.forEach((l) => l());
};

export function saveVerseTimings(file: string, times: number[]) {
  save({ ...marked, [file]: times });
}

export function clearVerseTimings(file: string) {
  const { [file]: _removed, ...rest } = marked;
  save(rest);
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export function useVerseTimings(file: string | null | undefined): number[] | null {
  const all = useSyncExternalStore(subscribe, () => marked, () => marked);
  if (!file) return null;
  return all[file] ?? bundledTimings[file] ?? null;
}

// Index of the verse being sung at `time`, or -1 before the first verse starts
export function verseAt(times: number[], time: number): number {
  let current = -1;
  for (let i = 0; i < times.length; i++) {
    if (times[i] <= time + 0.05) current = i;
    else break;
  }
  return current;
}

// How far into its verse the recording is, from 0 to just under 1 (verse times mark only where each verse starts)
export function verseProgress(times: number[], verse: number, time: number, duration: number): number {
  const start = times[verse];
  const end = times[verse + 1] ?? duration;
  if (start === undefined || !(end > start)) return 0;
  return Math.min(0.999, Math.max(0, (time - start) / (end - start)));
}

// The line of a verse being sung `progress` of the way through it. Lines are only timed by their verse, so each line
// gets a share of the verse's time as long as its letters (a long line takes longer to sing than a short one).
export function lineAt(lines: string[], progress: number): number {
  const weights = lines.map((l) => Math.max(1, l.replace(/\s/g, '').length));
  const total = weights.reduce((a, b) => a + b, 0);
  let reached = 0;
  for (let i = 0; i < lines.length; i++) {
    reached += weights[i];
    if (progress * total < reached) return i;
  }
  return lines.length - 1;
}
