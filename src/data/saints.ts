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

// Strips liturgical prefixes ("The Departure of", "The Martyrdom of", "استشهاد", "نياحة", etc.)
// and titles ("St.", "Pope", "القديس", "البابا") so saints can be sorted and browsed by their actual name
export function saintSortKey(title: string, lang: AppLanguage): string {
  if (lang === 'ar') {
    let s = title.replace(/[\u064B-\u065F\u0670]/g, '').trim();
    s = s.replace(/^[أإآ]/, 'ا');
    s = s.replace(/^(نياحة|استشهاد|تذكار|ظهور|تدشين|تكريس|نقل|معجزة|عيد|عودة|حضور|مجمع|اجتماع|دخول)\s+/, '');
    s = s.replace(/^(كنيسة\s+|دير\s+|مغارة\s+|رفات\s+|جسد\s+|رأس\s+|أعضاء\s+|شفاء\s+)/, '');
    let prev = '';
    while (prev !== s) {
      prev = s;
      s = s.replace(/^(القديس[ةين]*|الشهيد[ةين]*|الأنبا|البابا|أبونا|رئيس الملائكة|النبي|الصدّيق[ة]*|الاب|الأب|مار\s*|المكرم[ة]*|العظيم[ة]*)\s*/, '');
    }
    s = s.replace(/^[أإآ]/, 'ا');
    return s.trim();
  }
  let s = title.trim();
  let prev = '';
  while (prev !== s) {
    prev = s;
    s = s.replace(/^(the\s+)?(departure|martyrdom|commemoration|apparition|consecration|relocation|appearance|feast|miracle|translation|return|discovery|assembly|memorial|healing|entry)\s+(of\s+)?(the\s+)?/i, '');
    s = s.replace(/^(church\s+of\s+|relics\s+of\s+|body\s+of\s+|head\s+of\s+)/i, '');
    s = s.replace(/^(the\s+)?(holy\s+|great\s+|blessed\s+|honored\s+|righteous\s+)/i, '');
    s = s.replace(/^(sts?\.|saints?\b|pope\b|anba\b|abba\b|father\b|fr\.\b|prophet\b|archangel\b|righteous\b)\s*/i, '');
  }
  s = s.replace(/^["'\u2018\u2019]/, '');
  return s.trim();
}

export function saintSortLetter(saint: Saint, lang: AppLanguage): string {
  const key = saintSortKey(saint.name[lang], lang);
  const first = key.charAt(0);
  if (lang === 'ar') {
    if (/[أإآا]/.test(first)) return 'ا';
    return first || 'ا';
  }
  const upper = first.toUpperCase();
  return /[A-Z]/.test(upper) ? upper : '#';
}

export interface SaintLetterGroup {
  letter: string;
  saints: Saint[];
}

export function saintsByAlphabet(lang: AppLanguage): SaintLetterGroup[] {
  const map = new Map<string, Saint[]>();
  const sorted = [...saints].sort((a, b) =>
    saintSortKey(a.name[lang], lang).localeCompare(saintSortKey(b.name[lang], lang), lang === 'ar' ? 'ar' : 'en')
  );
  for (const s of sorted) {
    const letter = saintSortLetter(s, lang);
    if (!map.has(letter)) map.set(letter, []);
    map.get(letter)!.push(s);
  }
  return [...map.entries()].map(([letter, group]) => ({ letter, saints: group }));
}

export const saintsStrings = {
  en: {
    title: 'Saints',
    subtitle: 'The Synaxarium: every saint with a short story',
    today: 'Today',
    todayFeast: "Today's Feast",
    readStory: 'Read commemoration ›',
    search: 'Search saints by name or story',
    noResults: 'No saints found',
    alphabetical: 'All Saints (A–Z)',
    allLetters: 'All',
    alsoToday: 'Also on this day',
    results: (n: number) => `${n} ${n === 1 ? 'saint' : 'saints'}`,
    none: 'No commemoration for this day yet',
    clear: 'Clear',
  },
  ar: {
    title: 'القديسون',
    subtitle: 'السنكسار: كل قديس مع قصة قصيرة',
    today: 'اليوم',
    todayFeast: 'تذكار اليوم',
    readStory: 'اقرأ التذكار ‹',
    search: 'ابحث عن قديس بالاسم أو القصة',
    noResults: 'لا يوجد قديسون بهذا البحث',
    alphabetical: 'جميع القديسين (أبجدياً)',
    allLetters: 'الكل',
    alsoToday: 'وأيضاً في هذا اليوم',
    results: (n: number) => `${toArabicDigits(n)} ${n === 1 ? 'قديس' : 'قديسين'}`,
    none: 'لا يوجد تذكار لهذا اليوم بعد',
    clear: 'مسح',
  },
};

