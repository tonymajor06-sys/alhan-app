import { AppLanguage } from '@/hooks/use-settings';

import { copticMonths, copticToJdn, jdnToCoptic, toArabicDigits } from './coptic-calendar';
import { saintsData } from './saints-data';
import { normalizeForSearch } from './search';

// Every saint of the Synaxarium, day by day through the Coptic year, each with a short story
// (summarized for the app from the Synaxarium readings in Spirit & Truth)

export interface Saint {
  id: string;
  month: number;
  day: number;
  name: Record<AppLanguage, string>;
  story: Record<AppLanguage, string>;
}

export const saints: Saint[] = saintsData.map(([month, day, index, nameEn, nameAr, storyEn, storyAr]) => ({
  id: `${month}-${day}-${index}`,
  month,
  day,
  name: { en: nameEn, ar: nameAr },
  story: { en: storyEn, ar: storyAr },
}));

export const saintById = (id: string) => saints.find((s) => s.id === id);
export const saintsOn = (month: number, day: number) => saints.filter((s) => s.month === month && s.day === day);

// "4 Babah" / "٤ بابه"
export const copticDayName = (month: number, day: number, lang: AppLanguage) =>
  `${lang === 'ar' ? toArabicDigits(day) : day} ${copticMonths[lang][month - 1]}`;

// That Coptic day in the church year around `today`
export const saintJdn = (month: number, day: number, today: number) => copticToJdn(jdnToCoptic(today).year, month, day);

// Names first, then stories; every word of the search has to be there
export function searchSaints(query: string): Saint[] {
  const words = normalizeForSearch(query.trim().toLowerCase()).split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const has = (text: string) => {
    const folded = normalizeForSearch(text.toLowerCase());
    return words.every((w) => folded.includes(w));
  };
  const byName = saints.filter((s) => has(`${s.name.en} ${s.name.ar}`));
  const byStory = saints.filter((s) => !byName.includes(s) && has(`${s.story.en} ${s.story.ar}`));
  return [...byName, ...byStory];
}

export const saintsStrings = {
  en: {
    title: 'Saints',
    subtitle: 'The Synaxarium: every saint of the year, with a short story',
    today: 'Today',
    search: 'Search saints by name or story',
    noResults: 'No saints found',
    byMonth: 'Browse by month',
    alsoToday: 'Also on this day',
    results: (n: number) => `${n} ${n === 1 ? 'saint' : 'saints'}`,
    none: 'No commemoration for this day yet',
  },
  ar: {
    title: 'القديسون',
    subtitle: 'السنكسار: كل قديسي السنة مع قصة قصيرة',
    today: 'اليوم',
    search: 'ابحث عن قديس بالاسم أو القصة',
    noResults: 'لا يوجد قديسون بهذا البحث',
    byMonth: 'تصفح حسب الشهر',
    alsoToday: 'وأيضاً في هذا اليوم',
    results: (n: number) => `${toArabicDigits(n)} ${n === 1 ? 'قديس' : 'قديسين'}`,
    none: 'لا يوجد تذكار لهذا اليوم بعد',
  },
};
