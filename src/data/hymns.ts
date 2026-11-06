import { copticToArabic } from './arabic-coptic';
import { englishToArabic } from './arabic-english';
import { openingArabicTitles } from './arabic-titles';
import type { DeaconCategory, MainCategory, Season } from './hymn-types';
import { fromSnapshot, HymnsData } from './hymns-snapshot';
import { copticToTasbeha } from './tasbeha-coptic';

export * from './hymn-types';

// Every hymn and deacon response. They are built from their sources in hymns-build.ts (every change to them is made
// there). Building them took the app most of a second while it opened, more on a phone (2026-11-06), so the phone
// app's release loads them as they were built when it was made: metro.config.js runs
// scripts/hymns-snapshot.mjs, which saves them to hymns-snapshot.generated.js (not kept in git). While developing, or if
// that file is missing, they are built as before.
declare const __DEV__: boolean | undefined;

const load = (): HymnsData => {
  if (typeof __DEV__ !== 'undefined' && !__DEV__) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const json: string | Record<string, never> = require('./hymns-snapshot.generated');
      // (an empty module on the website, which builds them: see metro.config.js)
      if (typeof json === 'string') return fromSnapshot(json, { englishCoptic: copticToTasbeha, arabicCoptic: copticToArabic, arabicEnglish: englishToArabic });
    } catch {
      // no snapshot: build them
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const built: typeof import('./hymns-build') = require('./hymns-build');
  return { seasons: built.seasons, deaconCategories: built.deaconCategories, openingArabicTitles: {} };
};

const loaded = load();
Object.assign(openingArabicTitles, loaded.openingArabicTitles);

export const seasons: Season[] = loaded.seasons;
export const deaconCategories: DeaconCategory[] = loaded.deaconCategories;
export const mainCategories: MainCategory[] = [
  {
    id: 'responses',
    title: 'Deacon / Altar Responses',
    description: 'Common responses, litanies, and dialogue between the Priest and the Congregation/Deacons.',
    deaconCategories,
  },
  {
    id: 'hymns',
    title: 'Hymns',
    description: 'Complete collection of hymns categorized by liturgical seasons, fasts, and feasts.',
    seasons,
  },
];
