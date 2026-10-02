import type { LanguageType } from '../data/hymns';
import { hymnSlug } from '../data/search';

// The public web version's address, e.g. 'https://alhan.expo.app' (no trailing slash).
// Once it is set, "Share" on a hymn sends a link to that hymn's page; while it is empty,
// sharing sends the hymn's words instead.
export const WEB_BASE_URL = '';

// Store pages, shown as "Get the app" on the web version once the app is published
export const APP_STORE_URL = '';
export const PLAY_STORE_URL = '';

export const hymnWebUrl = (id: string, language?: LanguageType): string | null =>
  WEB_BASE_URL ? `${WEB_BASE_URL}/hymn/${encodeURIComponent(hymnSlug(id))}${language ? `?lang=${language}` : ''}` : null;
