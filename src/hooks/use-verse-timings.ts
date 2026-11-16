import { useSyncExternalStore } from 'react';

import type { LanguageType } from '../data/hymns';
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
  const { [file]: _lines, ...otherLines } = markedLines;
  saveLines(otherLines);
  save(rest);
}

// When each line starts (marked line by line in Learn), per verse, with the language whose lines they are: lines
// don't line up between languages the way verses do, so another language's lines are timed from its verse's share
export type LineTimes = { language: LanguageType; lines: number[][] };
const LINES_KEY = 'alhan-line-timings';
let markedLines: Record<string, LineTimes> = (() => {
  try {
    const raw = readSetting(LINES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
})();
const saveLines = (next: Record<string, LineTimes>) => {
  markedLines = next;
  try {
    writeSetting(LINES_KEY, JSON.stringify(markedLines));
  } catch {
    // marks still apply for this session
  }
};

// Saves the line starts, and each verse's start (its first line) as the verse times
export function saveLineTimings(file: string, language: LanguageType, lines: number[][]) {
  const verses = lines.filter((l) => l.length > 0);
  if (!verses.length) return;
  saveLines({ ...markedLines, [file]: { language, lines: verses } });
  save({ ...marked, [file]: verses.map((l) => l[0]) });
}

export function useLineTimings(file: string | null | undefined): LineTimes | null {
  useSyncExternalStore(subscribe, () => marked, () => marked);
  return file ? (markedLines[file] ?? null) : null;
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
