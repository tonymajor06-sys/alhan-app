import { titleLines } from '../data/hymn-titles';
import { audioSourceFor } from '../hooks/use-audio-downloads';
import { QueueTrack } from '../hooks/use-audio-queue';
import { audioFor, findHymn, Playlist, PlaylistItem } from '../hooks/use-playlist';
import { AppLanguage } from '../hooks/use-settings';

// A playlist hymn as a track for the player (null when its recording is no longer in the app)
export const playlistTrack = (item: PlaylistItem, lang: AppLanguage): QueueTrack | null => {
  const hymn = findHymn(item.hymnId);
  const file = audioFor(item);
  const source = file ? audioSourceFor(file) : null;
  return hymn && source ? { ...item, title: titleLines(hymn, lang).main, source } : null;
};

export const playlistTracks = (list: Playlist, lang: AppLanguage): QueueTrack[] =>
  list.items.map((item) => playlistTrack(item, lang)).filter((track): track is QueueTrack => track !== null);
