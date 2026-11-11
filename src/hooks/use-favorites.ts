import { useSyncExternalStore } from 'react';

import { readSetting, writeSetting } from './settings-storage';

// The hymns marked with ♥ (any hymn, with a recording or not), newest first; listed on the Playlists tab
const STORAGE_KEY = 'favorites';

let favorites: string[] = (() => {
  try {
    const saved = JSON.parse(readSetting(STORAGE_KEY) ?? '[]');
    return Array.isArray(saved) ? saved.filter((id): id is string => typeof id === 'string') : [];
  } catch {
    return [];
  }
})();
const listeners = new Set<() => void>();

const save = (next: string[]) => {
  favorites = next;
  try {
    writeSetting(STORAGE_KEY, JSON.stringify(favorites));
  } catch {
    // they still apply for this session
  }
  listeners.forEach((l) => l());
};

export const isFavorite = (list: string[], hymnId: string) => list.includes(hymnId);

export function toggleFavorite(hymnId: string) {
  save(favorites.includes(hymnId) ? favorites.filter((id) => id !== hymnId) : [hymnId, ...favorites]);
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export function useFavorites(): string[] {
  return useSyncExternalStore(subscribe, () => favorites, () => favorites);
}
