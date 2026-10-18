import { useSyncExternalStore } from 'react';

import { deaconCategories, flattenHymns, Hymn, LanguageType, seasons } from '../data/hymns';
import { readSetting, writeSetting } from './settings-storage';

export interface PlaylistItem {
  hymnId: string;
  language: LanguageType;
}

// A named list of recordings, played in order (or shuffled)
export interface Playlist {
  id: string;
  name: string;
  items: PlaylistItem[];
}

const STORAGE_KEY = 'alhan-playlists';
// The single playlist from before there could be several; it becomes "My Playlist"
const OLD_STORAGE_KEY = 'alhan-playlist';
export const DEFAULT_PLAYLIST_NAME = { en: 'My Playlist', ar: 'قائمتي' };

const hymnsById = new Map<string, Hymn>(
  [...seasons, ...deaconCategories].flatMap((group) =>
    group.services.flatMap((service) => flattenHymns(service.hymns).map((h) => [h.id, h] as const))
  )
);

export const findHymn = (id: string): Hymn | undefined => hymnsById.get(id);

export const audioFor = (item: PlaylistItem) =>
  findHymn(item.hymnId)?.versions.find((v) => v.language === item.language)?.audio;

const newId = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

const parse = <T>(raw: string | null | undefined, fallback: T): T => {
  try {
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const loadPlaylists = (): Playlist[] => {
  let lists: Playlist[];
  try {
    lists = parse<Playlist[]>(readSetting(STORAGE_KEY), []);
    if (!lists.length) {
      const old = parse<PlaylistItem[]>(readSetting(OLD_STORAGE_KEY), []);
      if (old.length) lists = [{ id: newId(), name: DEFAULT_PLAYLIST_NAME.en, items: old }];
    }
  } catch {
    lists = [];
  }
  // Drop anything whose recording has since been removed from the app
  return lists.map((list) => ({ ...list, items: list.items.filter((item) => audioFor(item)) }));
};

let playlists = loadPlaylists();
const listeners = new Set<() => void>();

const save = (next: Playlist[]) => {
  playlists = next;
  try {
    writeSetting(STORAGE_KEY, JSON.stringify(playlists));
  } catch {
    // the playlists still apply for this session
  }
  listeners.forEach((l) => l());
};

const update = (id: string, change: (list: Playlist) => Playlist) => save(playlists.map((l) => (l.id === id ? change(l) : l)));

const sameItem = (a: PlaylistItem, b: PlaylistItem) => a.hymnId === b.hymnId && a.language === b.language;

export const isInPlaylist = (items: PlaylistItem[], item: PlaylistItem) => items.some((i) => sameItem(i, item));
export const isInAnyPlaylist = (lists: Playlist[], item: PlaylistItem) => lists.some((l) => isInPlaylist(l.items, item));
export const playlistById = (lists: Playlist[], id: string | undefined) => lists.find((l) => l.id === id);

// A new playlist, optionally with its first hymn; returns its id
export function createPlaylist(name: string, first?: PlaylistItem): string {
  const id = newId();
  save([...playlists, { id, name: name.trim() || DEFAULT_PLAYLIST_NAME.en, items: first ? [first] : [] }]);
  return id;
}

export function renamePlaylist(id: string, name: string) {
  if (name.trim()) update(id, (l) => ({ ...l, name: name.trim() }));
}

export function deletePlaylist(id: string) {
  save(playlists.filter((l) => l.id !== id));
}

// Adds the hymn to that playlist, or takes it out if it is already there
export function togglePlaylistItem(id: string, item: PlaylistItem) {
  update(id, (l) => ({ ...l, items: isInPlaylist(l.items, item) ? l.items.filter((i) => !sameItem(i, item)) : [...l.items, item] }));
}

export function removePlaylistItem(id: string, index: number) {
  update(id, (l) => ({ ...l, items: l.items.filter((_, i) => i !== index) }));
}

export function movePlaylistItem(id: string, index: number, direction: 1 | -1) {
  update(id, (l) => {
    const target = index + direction;
    if (target < 0 || target >= l.items.length) return l;
    const items = [...l.items];
    [items[index], items[target]] = [items[target], items[index]];
    return { ...l, items };
  });
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export function usePlaylists(): Playlist[] {
  return useSyncExternalStore(subscribe, () => playlists, () => playlists);
}
