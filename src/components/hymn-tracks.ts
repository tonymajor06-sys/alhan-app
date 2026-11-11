import { recordingTitle } from './alhan-ui';
import { titleLines } from '../data/hymn-titles';
import { Hymn, LanguageType } from '../data/hymns';
import { audioSourceFor } from '../hooks/use-audio-downloads';
import { QueueTrack } from '../hooks/use-audio-queue';
import { AppLanguage } from '../hooks/use-settings';

// A hymn's recording as a track for the player, in the first of `preferred` it has a recording in (Coptic first by
// default: the hymns are sung in Coptic), or null when it has none
export function hymnTrack(hymn: Hymn, lang: AppLanguage, preferred: LanguageType[] = ['coptic', lang === 'ar' ? 'arabic' : 'english', 'arabic', 'english']): QueueTrack | null {
  const version = preferred.map((l) => hymn.versions.find((v) => v.language === l && v.audio)).find(Boolean) ?? hymn.versions.find((v) => v.audio);
  const source = version?.audio ? audioSourceFor(version.audio) : null;
  return version?.audio && source
    ? { hymnId: hymn.id, language: version.language, title: recordingTitle(titleLines(hymn, lang).main, version.audio, version.language, lang), source, file: version.audio }
    : null;
}

export const hymnTracks = (hymns: Hymn[], lang: AppLanguage): QueueTrack[] =>
  hymns.map((h) => hymnTrack(h, lang)).filter((t): t is QueueTrack => t !== null);
