import { useEffect } from 'react';

import { strings } from './alhan-ui';
import { hymnTracks } from './hymn-tracks';
import { playlistTracks } from './playlist-tracks';
import { Hymn } from '../data/hymns';
import { useAudioDownloads } from '../hooks/use-audio-downloads';
import { setCarLibrary } from '../hooks/use-audio-queue';
import { useFavorites } from '../hooks/use-favorites';
import { findHymn, usePlaylists } from '../hooks/use-playlist';
import { AppLanguage } from '../hooks/use-settings';

// The user's Favorites and playlists in the car's library (Android Auto), kept up to date as they change. Downloaded recordings
// play from the phone, so the library is written again when a download finishes.
export function useCarLibrary(language: AppLanguage) {
  const lists = usePlaylists();
  const favorites = useFavorites();
  const { downloaded } = useAudioDownloads();
  useEffect(() => {
    const favoriteTracks = hymnTracks(
      favorites.map(findHymn).filter((h): h is Hymn => !!h),
      language
    );
    setCarLibrary([
      ...(favoriteTracks.length ? [{ id: 'favorites', name: strings[language].favoritesTitle, tracks: favoriteTracks }] : []),
      ...lists.map((list) => ({ id: list.id, name: list.name, tracks: playlistTracks(list, language) })),
    ]);
  }, [lists, favorites, language, downloaded]);
}
