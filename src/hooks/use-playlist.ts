import { useSyncExternalStore } from 'react';

import { deaconCategories, Hymn, LanguageType, seasons } from '../data/hymns';
import { readSetting, writeSetting } from './settings-storage';

export interface PlaylistItem {
  hymnId: string;
  language: LanguageType;
}

const STORAGE_KEY = 'alhan-playlist';

const hymnsById = new Map<string, Hymn>(
  [...seasons, ...deaconCategories].flatMap((group) =>
    group.services.flatMap((service) => service.hymns.map((h) => [h.id, h] as const))
  )
);

export const findHymn = (id: string): Hymn | undefined => hymnsById.get(id);

export const audioFor = (item: PlaylistItem) =>
  findHymn(item.hymnId)?.versions.find((v) => v.language === item.language)?.audio;

const loadPlaylist = (): PlaylistItem[] => {
  try {
    const raw = readSetting(STORAGE_KEY);
    const parsed: PlaylistItem[] = raw ? JSON.parse(raw) : [];
    // Drop anything whose recording has since been removed from the app
    return parsed.filter((item) => audioFor(item));
  } catch {
    return [];
  }
};

let playlist = loadPlaylist();
const listeners = new Set<() => void>();

const save = (next: PlaylistItem[]) => {
  playlist = next;
  try {
    writeSetting(STORAGE_KEY, JSON.stringify(playlist));
  } catch {
    // playlist still applies for this session
  }
  listeners.forEach((l) => l());
};

const sameItem = (a: PlaylistItem, b: PlaylistItem) => a.hymnId === b.hymnId && a.language === b.language;

export const isInPlaylist = (items: PlaylistItem[], item: PlaylistItem) => items.some((i) => sameItem(i, item));

export function togglePlaylistItem(item: PlaylistItem) {
  save(isInPlaylist(playlist, item) ? playlist.filter((i) => !sameItem(i, item)) : [...playlist, item]);
}

export function removePlaylistItem(index: number) {
  save(playlist.filter((_, i) => i !== index));
}

export function movePlaylistItem(index: number, direction: 1 | -1) {
  const target = index + direction;
  if (target < 0 || target >= playlist.length) return;
  const next = [...playlist];
  [next[index], next[target]] = [next[target], next[index]];
  save(next);
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export function usePlaylist(): PlaylistItem[] {
  return useSyncExternalStore(subscribe, () => playlist);
}
