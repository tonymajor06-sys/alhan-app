import type { AppLanguage } from '@/hooks/use-settings';

// All dates are handled as Julian Day Numbers (whole days) so there are no
// time-zone or DST surprises: a JDN is simply "which calendar day".

export interface CopticDate {
  year: number;
  month: number; // 1–13 (13 = Nasie, the short month)
  day: number;
}

export type EventKind = 'feast' | 'fast' | 'season';

export interface ChurchEvent {
  key: string;
  // Id of the matching season in hymns.ts, if the app has hymns for it
  seasonId?: string;
  kind: EventKind;
  name: Record<AppLanguage, string>;
  start: number; // JDN, inclusive
  end: number; // JDN, inclusive
  // When ranges overlap the highest priority wins (e.g. Kiahk over Nativity Fast)
  priority: number;
  // Names the days it covers but stays out of "Coming up" and reminders, because a day of its own
  // (e.g. "1st Day of the Nativity Fast") announces it, as in Spirit & Truth's list
  hidden?: boolean;
}

// Coptic year 1, Thout 1 (29 Aug 284 AD Julian)
const COPTIC_EPOCH = 1825030;

export const copticMonths: Record<AppLanguage, string[]> = {
  en: [
    // Spelled as Spirit & Truth spells them
    'Tout', 'Babah', 'Hatour', 'Kiahk', 'Tubah', 'Amshir', 'Baramhat',
    'Baramoudah', 'Bashans', 'Baounah', 'Abib', 'Misra', 'Nasie',
  ],
  ar: [
    'توت', 'بابه', 'هاتور', 'كيهك', 'طوبه', 'أمشير', 'برمهات',
    'برموده', 'بشنس', 'بؤونه', 'أبيب', 'مسرى', 'النسيء',
  ],
};

const gregorianMonths: Record<AppLanguage, string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
};

export const toArabicDigits = (n: string | number) =>
  String(n).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]);

const num = (n: number, lang: AppLanguage) => (lang === 'ar' ? toArabicDigits(n) : String(n));

// ---------- Day-number conversions ----------

export function gregorianToJdn(year: number, month: number, day: number): number {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return (
    day + Math.floor((153 * m + 2) / 5) + 365 * y +
    Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045
  );
}

function julianToJdn(year: number, month: number, day: number): number {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083;
}

export function jdnToGregorian(jdn: number): { year: number; month: number; day: number } {
  const a = jdn + 32044;
  const b = Math.floor((4 * a + 3) / 146097);
  const c = a - Math.floor((146097 * b) / 4);
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * d) / 4);
  const m = Math.floor((5 * e + 2) / 153);
  return {
    day: e - Math.floor((153 * m + 2) / 5) + 1,
    month: m + 3 - 12 * Math.floor(m / 10),
    year: 100 * b + d - 4800 + Math.floor(m / 10),
  };
}

export function copticToJdn(year: number, month: number, day: number): number {
  return COPTIC_EPOCH - 1 + 365 * (year - 1) + Math.floor(year / 4) + 30 * (month - 1) + day;
}

export function jdnToCoptic(jdn: number): CopticDate {
  const year = Math.floor((4 * (jdn - COPTIC_EPOCH) + 1463) / 1461);
  const month = Math.floor((jdn - copticToJdn(year, 1, 1)) / 30) + 1;
  const day = jdn - copticToJdn(year, month, 1) + 1;
  return { year, month, day };
}

export const dateToJdn = (date: Date) =>
  gregorianToJdn(date.getFullYear(), date.getMonth() + 1, date.getDate());

export const jdnToDate = (jdn: number) => {
  const g = jdnToGregorian(jdn);
  return new Date(g.year, g.month - 1, g.day);
};

// Coptic (Orthodox) Pascha: Julian computus, converted via the day number
export function paschaJdn(gregorianYear: number): number {
  const a = gregorianYear % 4;
  const b = gregorianYear % 7;
  const c = gregorianYear % 19;
  const d = (19 * c + 15) % 30;
  const e = (2 * a + 4 * b - d + 34) % 7;
  const month = Math.floor((d + e + 114) / 31);
  const day = ((d + e + 114) % 31) + 1;
  return julianToJdn(gregorianYear, month, day);
}

// ---------- Formatting ----------

export function formatCopticDate(jdn: number, lang: AppLanguage): string {
  const c = jdnToCoptic(jdn);
  const month = copticMonths[lang][c.month - 1];
  return lang === 'ar'
    ? `${num(c.day, lang)} ${month} ${num(c.year, lang)} للشهداء`
    : `${c.day} ${month} ${c.year} A.M.`;
}

export function formatGregorianDate(jdn: number, lang: AppLanguage, withYear = false): string {
  const g = jdnToGregorian(jdn);
  const month = gregorianMonths[lang][g.month - 1];
  const base = `${num(g.day, lang)} ${month}`;
  return withYear ? `${base} ${num(g.year, lang)}` : base;
}

export function formatDaysUntil(days: number, lang: AppLanguage): string {
  if (lang === 'ar') {
    if (days <= 0) return 'اليوم';
    if (days === 1) return 'غداً';
    if (days === 2) return 'بعد يومين';
    return `بعد ${toArabicDigits(days)} ${days <= 10 ? 'أيام' : 'يوماً'}`;
  }
  if (days <= 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  return `In ${days} days`;
}

// ---------- Church year ----------

const ordinals: Record<AppLanguage, string[]> = {
  en: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th'],
  ar: ['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع'],
};

// Every fast, feast and season whose dates are anchored to one Pascha (spring of `year`) and the
// Coptic year that begins in September of `year - 1`, named and listed as Spirit & Truth's calendar has them.
function eventsForYear(year: number): ChurchEvent[] {
  const pascha = paschaJdn(year);
  const cy = year - 284; // Coptic year beginning in September of `year - 1`
  const cop = (month: number, day: number, copticYear = cy) => copticToJdn(copticYear, month, day);
  // The Church keeps Nativity on 7 January (Kiahk 29, or Kiahk 28 in the year after a Coptic leap year)
  const nativity = gregorianToJdn(year, 1, 7);
  // Kiahk's Sundays are the Sundays of the month (the first falls on Kiahk 1–7)
  const kiahkSunday1 = cop(4, 1) + ((7 - ((cop(4, 1) + 1) % 7)) % 7);

  const e = (
    key: string,
    seasonId: string | undefined,
    kind: EventKind,
    en: string,
    ar: string,
    start: number,
    end: number,
    priority: number,
    hidden?: boolean
  ): ChurchEvent => ({
    key: `${key}-${year}`,
    seasonId,
    kind,
    name: { en, ar },
    start,
    end,
    priority,
    ...(hidden ? { hidden } : {}),
  });

  const sundays = (
    key: string,
    seasonId: string,
    kind: EventKind,
    en: string,
    ar: string,
    first: number,
    numbers: number[]
  ) =>
    numbers.map((n) =>
      e(`${key}-${n}`, seasonId, kind, `${ordinals.en[n - 1]} Sunday of ${en}`, `الأحد ${ordinals.ar[n - 1]} من ${ar}`,
        first + 7 * (n - numbers[0]), first + 7 * (n - numbers[0]), 70)
    );

  return [
    // Autumn / winter (Coptic year starts the previous September)
    e('nayrouz', 'nayrouz', 'feast', 'Coptic New Year', 'عيد النيروز (رأس السنة القبطية)', cop(1, 1), cop(1, 1), 85),
    e('nayrouz-days', 'nayrouz', 'season', 'Days of Nayrouz', 'أيام النيروز', cop(1, 1), cop(1, 16), 80, true),
    e('cross', 'cross', 'feast', 'Feast of the Cross', 'عيد الصليب', cop(1, 17), cop(1, 19), 90),
    e('nativity-fast-start', 'nativity-fast', 'fast', '1st Day of the Nativity Fast', 'أول أيام صوم الميلاد',
      gregorianToJdn(year - 1, 11, 25), gregorianToJdn(year - 1, 11, 25), 45),
    e('nativity-fast', 'nativity-fast', 'fast', 'Nativity Fast', 'صوم الميلاد', gregorianToJdn(year - 1, 11, 25), nativity - 1, 40, true),
    e('kiahk', 'kiahk', 'season', 'Month of Kiahk', 'شهر كيهك', cop(4, 1), nativity - 1, 50, true),
    ...sundays('kiahk-sunday', 'kiahk', 'season', 'Kiahk', 'كيهك', kiahkSunday1, [1, 2, 3, 4]).filter((ev) => ev.start < nativity - 1),
    e('nativity-paramoun', 'nativity', 'fast', 'Nativity Paramoun', 'برامون الميلاد', nativity - 1, nativity - 1, 85),
    e('nativity', 'nativity', 'feast', 'Feast of Nativity', 'عيد الميلاد المجيد', nativity, nativity, 90),
    e('nativity-2', 'nativity', 'feast', '2nd Day of the Nativity', 'ثاني أيام عيد الميلاد', nativity + 1, nativity + 1, 90),
    e('nativity-days', 'nativity', 'feast', 'Days of the Nativity', 'أيام عيد الميلاد', nativity, nativity + 6, 80, true),
    e('circumcision', 'minor-feasts', 'feast', 'Feast of Circumcision', 'عيد الختان', nativity + 7, nativity + 7, 70),
    e('theophany-paramoun', 'theophany', 'fast', 'Theophany Paramoun', 'برامون الغطاس', nativity + 11, nativity + 11, 85),
    e('theophany', 'theophany', 'feast', 'Feast of Theophany', 'عيد الغطاس المجيد', nativity + 12, nativity + 12, 90),
    e('theophany-2', 'theophany', 'feast', '2nd Day of the Theophany', 'ثاني أيام عيد الغطاس', nativity + 13, nativity + 13, 90),
    e('cana', 'minor-feasts', 'feast', 'Wedding at Cana of Galilee', 'عرس قانا الجليل', nativity + 14, nativity + 14, 70),
    e('entrance-temple', 'minor-feasts', 'feast', 'Presentation of the Lord in the Temple', 'دخول المسيح الهيكل', cop(6, 8), cop(6, 8), 70),

    // Pascha cycle
    e('jonah', 'jonah', 'fast', 'Fast of Nineveh', 'صوم أهل نينوى', pascha - 69, pascha - 67, 50),
    e('jonah-passover', 'jonah', 'feast', 'Feast of Nineveh', 'فصح يونان', pascha - 66, pascha - 66, 60),
    e('before-lent', 'great-lent', 'season', 'Saturday before the Great Lent', 'السبت السابق للصوم الكبير', pascha - 57, pascha - 57, 70),
    e('preparation-sunday', 'great-lent', 'season', 'Preparation Sunday', 'أحد الاستعداد', pascha - 56, pascha - 56, 70),
    e('great-lent-start', 'great-lent', 'fast', '1st Monday of Great Lent', 'الاثنين الأول من الصوم الكبير', pascha - 55, pascha - 55, 55),
    e('great-lent', 'great-lent', 'fast', 'Great Lent', 'الصوم الكبير', pascha - 55, pascha - 9, 50, true),
    ...sundays('great-lent-sunday', 'great-lent', 'fast', 'Great Lent', 'الصوم الكبير', pascha - 49, [1, 2, 3, 4, 5, 6]),
    e('annunciation', 'minor-feasts', 'feast', 'Feast of Annunciation', 'عيد البشارة', cop(7, 29), cop(7, 29), 75),
    e('last-friday', 'great-lent', 'fast', 'Last Friday of Great Lent', 'جمعة ختام الصوم', pascha - 9, pascha - 9, 70),
    e('lazarus', 'palm-sunday', 'feast', 'Lazarus Saturday', 'سبت لعازر', pascha - 8, pascha - 8, 95),
    e('palm-sunday', 'palm-sunday', 'feast', 'Palm Sunday', 'أحد الشعانين', pascha - 7, pascha - 7, 100),
    e('holy-week', 'holy-week', 'fast', 'Holy Week (Pascha)', 'أسبوع الآلام', pascha - 6, pascha - 1, 100),
    e('covenant-thursday', 'holy-week', 'fast', 'Covenant Thursday', 'خميس العهد', pascha - 3, pascha - 3, 105),
    e('great-friday', 'holy-week', 'fast', 'Great Friday', 'الجمعة العظيمة', pascha - 2, pascha - 2, 105),
    e('bright-saturday', 'holy-week', 'fast', 'Bright Saturday', 'سبت النور', pascha - 1, pascha - 1, 105),
    e('resurrection', 'pentecost', 'feast', 'Feast of Resurrection', 'عيد القيامة المجيد', pascha, pascha, 100),
    e('fifty-days', 'pentecost', 'season', 'Holy Fifty Days', 'الخماسين المقدسة', pascha + 1, pascha + 48, 60, true),
    e('thomas-sunday', 'minor-feasts', 'feast', 'Thomas Sunday', 'أحد توما', pascha + 7, pascha + 7, 70),
    ...sundays('pentecost-sunday', 'pentecost', 'season', 'Pentecost', 'الخماسين', pascha + 14, [2, 3, 4, 5, 6]),
    e('ascension', 'pentecost', 'feast', 'Feast of the Ascension', 'عيد الصعود', pascha + 39, pascha + 39, 90),
    e('pentecost', 'pentecost', 'feast', 'Feast of Pentecost', 'عيد العنصرة', pascha + 49, pascha + 49, 90),
    e('apostles-fast-start', 'apostles-fast', 'fast', "1st Day of Apostles' Fast", 'أول أيام صوم الرسل', pascha + 50, pascha + 50, 55),
    e('apostles-fast', 'apostles-fast', 'fast', "Apostles' Fast", 'صوم الرسل', pascha + 50, cop(11, 4), 50, true),
    e('entry-egypt', 'minor-feasts', 'feast', 'Entry of Christ into Egypt', 'دخول المسيح أرض مصر', cop(9, 24), cop(9, 24), 70),
    e('apostles-feast', 'apostles-fast', 'feast', 'Apostles Feast', 'عيد الرسل', cop(11, 5), cop(11, 5), 85),

    // Summer (end of the Coptic year)
    e('st-mary-fast-start', 'st-mary', 'fast', "1st Day of St. Mary's Fast", 'أول أيام صوم السيدة العذراء', cop(12, 1), cop(12, 1), 55),
    e('st-mary-fast', 'st-mary', 'fast', 'Fast of St. Mary', 'صوم السيدة العذراء', cop(12, 1), cop(12, 15), 50, true),
    e('transfiguration', 'minor-feasts', 'feast', 'Feast of Transfiguration', 'عيد التجلي', cop(12, 13), cop(12, 13), 70),
    e('assumption', 'st-mary', 'feast', 'Assumption of St. Mary', 'عيد صعود جسد العذراء', cop(12, 16), cop(12, 16), 85),
  ].filter((ev) => ev.end >= ev.start);
}

// What Spirit & Truth calls a day that no feast or named day of its own covers: the week of Great Lent,
// Kiahk or the Holy Fifty Days, or for Kiahk and ordinary days the Sunday of the Coptic month
function weekName(jdn: number, current: ChurchEvent | null): Record<AppLanguage, string> | null {
  const { year } = jdnToGregorian(jdn);
  const pascha = paschaJdn(year);
  const sunday = (jdn + 1) % 7 === 0;
  const week = (en: string, ar: string, n: number) =>
    n >= 1 && n <= 7 ? { en: `${ordinals.en[n - 1]} Week of ${en}`, ar: `الأسبوع ${ordinals.ar[n - 1]} من ${ar}` } : null;

  const key = current?.key.replace(/-\d+$/, '');
  if (key === 'great-lent') return week('Great Lent', 'الصوم الكبير', Math.floor((jdn - (pascha - 55)) / 7) + 1);
  if (key === 'fifty-days') return week('Pentecost', 'الخماسين', Math.floor((jdn - pascha) / 7) + 1);

  const c = jdnToCoptic(jdn);
  if (key === 'kiahk' && c.month === 4) {
    // Days after the nth Sunday of Kiahk are its nth week; days before the first are still just Kiahk
    const kiahk1 = jdn - (c.day - 1);
    const firstSunday = kiahk1 + ((7 - ((kiahk1 + 1) % 7)) % 7);
    return jdn > firstSunday ? week('Kiahk', 'كيهك', Math.floor((jdn - firstSunday) / 7) + 1) : null;
  }
  if (!current && sunday) {
    const n = Math.ceil(c.day / 7);
    return { en: `${ordinals.en[n - 1]} Sunday of ${copticMonths.en[c.month - 1]}`, ar: `الأحد ${ordinals.ar[n - 1]} من ${copticMonths.ar[c.month - 1]}` };
  }
  return null;
}

// Events covering roughly the year before and after `jdn`, in date order
export function eventsAround(jdn: number): ChurchEvent[] {
  const { year } = jdnToGregorian(jdn);
  return [year - 1, year, year + 1, year + 2]
    .flatMap(eventsForYear)
    .sort((a, b) => a.start - b.start || b.priority - a.priority);
}

export interface SeasonInfo {
  today: number;
  current: ChurchEvent | null; // null = ordinary (annual) days
  // The day's own name in Spirit & Truth when it is a week or Sunday of its season (e.g. "2nd Week of Great Lent")
  weekName: Record<AppLanguage, string> | null;
  // Adam tunes Sunday–Tuesday, Watos tunes Wednesday–Saturday
  tune: 'adam' | 'watos';
  upcoming: (ChurchEvent & { daysUntil: number })[];
}

export function getSeasonInfo(jdn: number, upcomingCount = 8): SeasonInfo {
  const events = eventsAround(jdn);
  const current =
    events
      .filter((ev) => ev.start <= jdn && jdn <= ev.end)
      .sort((a, b) => b.priority - a.priority)[0] ?? null;
  // JDN 0 was a Monday, so (jdn + 1) % 7 gives 0 = Sunday
  const weekday = (jdn + 1) % 7;

  return {
    today: jdn,
    current,
    weekName: weekName(jdn, current),
    tune: weekday <= 2 ? 'adam' : 'watos',
    upcoming: events
      .filter((ev) => ev.start > jdn && !ev.hidden)
      .slice(0, upcomingCount)
      .map((ev) => ({ ...ev, daysUntil: ev.start - jdn })),
  };
}

export const annualSeasonName: Record<AppLanguage, string> = {
  en: 'Annual (ordinary days)',
  ar: 'الأيام السنوية',
};

export const tuneName: Record<AppLanguage, Record<SeasonInfo['tune'], string>> = {
  en: { adam: 'Adam tune', watos: 'Watos tune' },
  ar: { adam: 'اللحن الآدام', watos: 'اللحن الواطس' },
};

export const kindName: Record<AppLanguage, Record<EventKind, string>> = {
  en: { feast: 'Feast', fast: 'Fast', season: 'Season' },
  ar: { feast: 'عيد', fast: 'صوم', season: 'موسم' },
};

export function currentSeasonName(info: SeasonInfo, lang: AppLanguage): string {
  return info.weekName?.[lang] ?? info.current?.name[lang] ?? annualSeasonName[lang];
}
