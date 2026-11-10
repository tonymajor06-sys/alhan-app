import { useEffect } from 'react';

import { playlistTracks } from './playlist-tracks';
import { useAudioDownloads } from '../hooks/use-audio-downloads';
import { setCarLibrary } from '../hooks/use-audio-queue';
import { usePlaylists } from '../hooks/use-playlist';
import { AppLanguage } from '../hooks/use-settings';

// The user's playlists in the car's library (Android Auto), kept up to date as they change. Downloaded recordings
// play from the phone, so the library is written again when a download finishes.
export function useCarLibrary(language: AppLanguage) {
  const lists = usePlaylists();
  const { downloaded } = useAudioDownloads();
  useEffect(() => {
    setCarLibrary(lists.map((list) => ({ id: list.id, name: list.name, tracks: playlistTracks(list, language) })));
  }, [lists, language, downloaded]);
}
