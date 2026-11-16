import type { LanguageType } from '../data/hymns';
import { hymnSlug } from '../data/search';

// The public web version's address, e.g. 'https://alhan.expo.app' (no trailing slash).
// Once it is set, "Share" on a hymn sends a link to that hymn's page; while it is empty,
// sharing sends the hymn's words instead.
export const WEB_BASE_URL = 'https://copticpsalmody.com';

// Store pages, shown as "Get the app" on the web version once the app is published
export const APP_STORE_URL = '';
export const PLAY_STORE_URL = '';

export const hymnWebUrl = (id: string, language?: LanguageType): string | null =>
  WEB_BASE_URL ? `${WEB_BASE_URL}/hymn/${encodeURIComponent(hymnSlug(id))}${language ? `?lang=${language}` : ''}` : null;

// A playlist sent as a link (a choir's or Sunday school's hymns for the week): its name and its hymns, each as
// "<hymn page name>.<language>", e.g. /list?n=Choir&h=annual-vespers-blessed-is-he.c,kiahk-....e
// Hymn page names use only letters, digits, - and @, so "." and "," can't be mistaken for part of one.
const languageCodes: Record<LanguageType, string> = {
  coptic: 'c',
  englishCoptic: 'ec',
  arabicCoptic: 'ac',
  english: 'e',
  arabicEnglish: 'ae',
  englishArabic: 'ea',
  arabic: 'a',
};

export const listWebUrl = (name: string, items: { hymnId: string; language: LanguageType }[]): string =>
  `${WEB_BASE_URL}/list?n=${encodeURIComponent(name)}&h=${items.map((i) => `${hymnSlug(i.hymnId)}.${languageCodes[i.language]}`).join(',')}`;

// The hymns of a shared list's "h", as page names and languages (anything unreadable is left out)
export const parseListItems = (h: string | undefined): { slug: string; language: LanguageType }[] =>
  (h ?? '')
    .split(',')
    .map((part) => {
      const dot = part.lastIndexOf('.');
      const language = (Object.keys(languageCodes) as LanguageType[]).find((l) => languageCodes[l] === part.slice(dot + 1));
      return dot > 0 && language ? { slug: part.slice(0, dot), language } : null;
    })
    .filter((x): x is { slug: string; language: LanguageType } => !!x);
