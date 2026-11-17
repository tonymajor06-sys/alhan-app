import type { AppLanguage } from '@/hooks/use-settings';

import type { Hymn } from './hymns';
import { Saint, saints } from './saints';
import { stSaints, stSaintTabs } from './st-saints';

// What the Coptic calendar shows for a day: the saints remembered on it (those with a story in the app), and the
// hymns sung for its saints from Hymns > Other (Veneration, Other Doxologies, Intercessions, Praxis and Gospel
// Responses, Verses of the Cymbals), as Spirit & Truth's Saint Selection has them.

// What each of those lists is called next to a hymn from it
export const saintHymnKind: Record<string, Record<AppLanguage, string>> = {
  veneration: { en: 'Veneration', ar: 'التمجيد' },
  'other-doxologies': { en: 'Doxology', ar: 'ذكصولوجية' },
  'other-intercessions': { en: 'Intercessions', ar: 'الهيتنيات' },
  'other-praxis-responses': { en: 'Praxis Response', ar: 'مرد الإبركسيس' },
  'other-gospel-responses': { en: 'Gospel Response', ar: 'مرد الإنجيل' },
  'other-cymbals': { en: 'Verses of the Cymbals', ar: 'أرباع الناقوس' },
};

const dayKey = (month: number, day: number) => `${month}-${day}`;

// The saints with a story, by day
const storySaintsByDay = new Map<string, Saint[]>();
for (const saint of saints) {
  const key = dayKey(saint.month, saint.day);
  storySaintsByDay.set(key, [...(storySaintsByDay.get(key) ?? []), saint]);
}

// Spirit & Truth's saints (keys of stSaints), by day; not the Four Incorporeal Creatures (the owner, 2026-11-17)
const NOT_ON_CALENDAR = new Set(['four-creatures']);
const stSaintsByDay = new Map<string, string[]>();
for (const [id, saint] of Object.entries(stSaints)) {
  if (NOT_ON_CALENDAR.has(id)) continue;
  for (const [month, day] of saint.days) {
    const key = dayKey(month, day);
    stSaintsByDay.set(key, [...(stSaintsByDay.get(key) ?? []), id]);
  }
}

export const storySaintsOn = (month: number, day: number): Saint[] => storySaintsByDay.get(dayKey(month, day)) ?? [];

export interface SaintHymn {
  hymn: Hymn;
  // The list it is in (a key of saintHymnKind)
  tab: string;
  saint: Record<AppLanguage, string>;
}

// The hymns for the day's saints, list by list in the order of Hymns > Other
export function saintHymnsOn(month: number, day: number): SaintHymn[] {
  const ids = new Set(stSaintsByDay.get(dayKey(month, day)) ?? []);
  if (!ids.size) return [];
  return stSaintTabs.flatMap((tab) =>
    tab.hymns.flatMap((hymn) => {
      const saintId = tab.saintOf[hymn.id];
      return saintId && ids.has(saintId) ? [{ hymn, tab: tab.id, saint: stSaints[saintId].name }] : [];
    })
  );
}

// Whether a day remembers a saint (the calendar marks it with a dot)
export const hasSaints = (month: number, day: number) =>
  storySaintsByDay.has(dayKey(month, day)) || stSaintsByDay.has(dayKey(month, day));
