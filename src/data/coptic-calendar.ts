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
}

// Coptic year 1, Thout 1 (29 Aug 284 AD Julian)
const COPTIC_EPOCH = 1825030;

export const copticMonths: Record<AppLanguage, string[]> = {
  en: [
    'Thout', 'Paopi', 'Hathor', 'Kiahk', 'Tobi', 'Amshir', 'Paremhat',
    'Parmouti', 'Pashons', 'Paoni', 'Epip', 'Mesori', 'Nasie',
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

// Every fast, feast and season whose dates are anchored to one Pascha
// (spring of `year`) and the Coptic year that begins in September of `year - 1`.
function eventsForYear(year: number): ChurchEvent[] {
  const pascha = paschaJdn(year);
  const cy = year - 284; // Coptic year beginning in September of `year - 1`
  const cop = (month: number, day: number, copticYear = cy) => copticToJdn(copticYear, month, day);
  // The Church keeps Nativity on 7 January (Kiahk 29, or Kiahk 28 in the year after a Coptic leap year)
  const nativity = gregorianToJdn(year, 1, 7);

  const e = (
    key: string,
    seasonId: string | undefined,
    kind: EventKind,
    en: string,
    ar: string,
    start: number,
    end: number,
    priority: number
  ): ChurchEvent => ({ key: `${key}-${year}`, seasonId, kind, name: { en, ar }, start, end, priority });

  return [
    // Autumn / winter (Coptic year starts the previous September)
    e('nayrouz', 'nayrouz', 'feast', 'Nayrouz (Coptic New Year)', 'عيد النيروز', cop(1, 1), cop(1, 16), 80),
    e('cross', 'cross', 'feast', 'Feast of the Cross', 'عيد الصليب', cop(1, 17), cop(1, 19), 90),
    e('nativity-fast', 'nativity-fast', 'fast', 'Nativity Fast', 'صوم الميلاد', gregorianToJdn(year - 1, 11, 25), nativity - 1, 40),
    e('kiahk', 'kiahk', 'season', 'Month of Kiahk', 'شهر كيهك', cop(4, 1), nativity - 1, 50),
    e('nativity', 'nativity', 'feast', 'Feast of the Nativity', 'عيد الميلاد المجيد', nativity, nativity + 6, 90),
    e('circumcision', 'minor-feasts', 'feast', 'Feast of the Circumcision', 'عيد الختان', nativity + 7, nativity + 7, 70),
    e('theophany', 'theophany', 'feast', 'Feast of Theophany', 'عيد الغطاس المجيد', nativity + 12, nativity + 13, 90),
    e('cana', 'minor-feasts', 'feast', 'Wedding at Cana', 'عرس قانا الجليل', nativity + 14, nativity + 14, 70),
    e('entrance-temple', 'minor-feasts', 'feast', 'Entrance into the Temple', 'دخول المسيح الهيكل', cop(6, 8), cop(6, 8), 70),

    // Pascha cycle
    e('jonah', 'jonah', 'fast', "Jonah's Fast", 'صوم يونان', pascha - 69, pascha - 67, 50),
    e('jonah-passover', 'jonah', 'feast', "Jonah's Passover", 'فصح يونان', pascha - 66, pascha - 66, 60),
    e('great-lent', 'great-lent', 'fast', 'Great Lent', 'الصوم الكبير', pascha - 55, pascha - 9, 50),
    e('annunciation', undefined, 'feast', 'Feast of the Annunciation', 'عيد البشارة', cop(7, 29), cop(7, 29), 75),
    e('lazarus', 'palm-sunday', 'feast', 'Lazarus Saturday', 'سبت لعازر', pascha - 8, pascha - 8, 95),
    e('palm-sunday', 'palm-sunday', 'feast', 'Palm Sunday', 'أحد الشعانين', pascha - 7, pascha - 7, 100),
    e('holy-week', 'holy-week', 'fast', 'Holy Week (Pascha)', 'أسبوع الآلام', pascha - 6, pascha - 1, 100),
    e('resurrection', 'pentecost', 'feast', 'Feast of the Resurrection', 'عيد القيامة المجيد', pascha, pascha, 100),
    e('fifty-days', 'pentecost', 'season', 'Holy Fifty Days', 'الخماسين المقدسة', pascha + 1, pascha + 48, 60),
    e('thomas-sunday', 'minor-feasts', 'feast', 'Thomas Sunday', 'أحد توما', pascha + 7, pascha + 7, 70),
    e('ascension', 'pentecost', 'feast', 'Feast of the Ascension', 'عيد الصعود', pascha + 39, pascha + 39, 90),
    e('pentecost', 'pentecost', 'feast', 'Feast of Pentecost', 'عيد العنصرة', pascha + 49, pascha + 49, 90),
    e('apostles-fast', 'apostles-fast', 'fast', "Apostles' Fast", 'صوم الرسل', pascha + 50, cop(11, 4), 50),
    e('entry-egypt', 'minor-feasts', 'feast', 'Entry of Christ into Egypt', 'دخول المسيح أرض مصر', cop(9, 24), cop(9, 24), 70),
    e('apostles-feast', 'apostles-fast', 'feast', "Feast of the Apostles", 'عيد الرسل', cop(11, 5), cop(11, 5), 85),

    // Summer (end of the Coptic year)
    e('st-mary-fast', 'st-mary', 'fast', "St. Mary's Fast", 'صوم السيدة العذراء', cop(12, 1), cop(12, 15), 50),
    e('transfiguration', 'minor-feasts', 'feast', 'Feast of the Transfiguration', 'عيد التجلي', cop(12, 13), cop(12, 13), 70),
    e('assumption', 'st-mary', 'feast', 'Assumption of St. Mary', 'عيد صعود جسد العذراء', cop(12, 16), cop(12, 16), 85),
  ].filter((ev) => ev.end >= ev.start);
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
    tune: weekday <= 2 ? 'adam' : 'watos',
    upcoming: events
      .filter((ev) => ev.start > jdn)
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
  return info.current ? info.current.name[lang] : annualSeasonName[lang];
}
