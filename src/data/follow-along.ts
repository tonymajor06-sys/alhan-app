import { AppLanguage } from '@/hooks/use-settings';

import { dateToJdn, getSeasonInfo, jdnToCoptic } from './coptic-calendar';
import { flattenHymns, Hymn, Season, seasons, Service } from './hymns';
import { hymnAcrossSeasons } from './search';

// Midnight Praises and Vesper Praises read straight through in the order they are prayed tonight:
// Midnight's general hymns, then tonight's Psali and Theotokia after the Fourth Canticle, then the conclusion.
// The church's day begins in the evening, so Saturday night is Sunday's Psali and Theotokia.

export type PraiseKind = 'midnight' | 'vesper';
export const praiseKinds: PraiseKind[] = ['midnight', 'vesper'];

export const weekdayNames: Record<AppLanguage, string[]> = {
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  ar: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
};
const weekdayIds = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const anyWeekday = /\b(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)\b/;

// JDN 0 was a Monday, so (jdn + 1) % 7 gives 0 = Sunday
export const weekdayOf = (jdn: number) => (jdn + 1) % 7;

// The day whose praises are prayed tonight: from 5 in the morning on, that is tomorrow
// (Saturday evening and Saturday night are Sunday's); in the small hours it is still today
export function tonightJdn(now = new Date()): number {
  return dateToJdn(now) + (now.getHours() >= 5 ? 1 : 0);
}

// The next day from `from` that falls on `weekday`
export const nextWeekday = (from: number, weekday: number) => from + ((weekday - weekdayOf(from) + 7) % 7);

export interface FollowSection {
  key: 'praises' | 'day' | 'conclusion';
  hymns: Hymn[];
}

export interface FollowAlong {
  kind: PraiseKind;
  jdn: number;
  weekday: number;
  season: Season;
  service: Service;
  sections: FollowSection[];
  hymns: Hymn[];
}

const hasContent = (h: Hymn) => h.versions.some((v) => v.text.trim() || v.audio);
const annual = () => seasons.find((s) => s.id === 'annual')!;
const serviceOf = (season: Season | undefined, suffix: string) => season?.services.find((s) => s.id.endsWith(suffix));

// The season whose hymns are sung on `jdn`; a minor feast only counts when it has its own Midnight Praises
function seasonFor(jdn: number, kind: PraiseKind): { season: Season; own?: Service } {
  const current = getSeasonInfo(jdn, 0).current;
  const season = seasons.find((s) => s.id === current?.seasonId);
  if (!season || kind === 'vesper') return { season: annual() };
  const own =
    season.id === 'minor-feasts'
      ? season.services.find((s) => s.title.startsWith(`${current!.name.en}:`) && s.id.endsWith('-midnight'))
      : serviceOf(season, '-midnight');
  return own ? { season, own } : { season: annual() };
}

// A day's group of the structured Midnight / Vesper Praises (General, Sunday, Monday, ...)
const group = (service: Service, key: string) => service.hymns.find((h) => h.id === `${service.id}-${key}`);

// Which weekday each hymn of Annual Midnight Praises' weekday groups belongs to (seasons copy them as <id>@<service>)
let annualDays: Map<string, number> | null = null;
const annualDayOf = (id: string) => {
  if (!annualDays) {
    const midnight = serviceOf(annual(), '-midnight')!;
    annualDays = new Map(weekdayIds.flatMap((d, i) => flattenHymns(group(midnight, d)?.children ?? []).map((h) => [h.id, i] as const)));
  }
  return annualDays.get(id.split('@')[0]);
};

// Splits a whole night's list into the praises, the Psali and Theotokia after the Fourth Canticle, and the conclusion
function splitNight(list: Hymn[]): FollowSection[] {
  const fourth = list.findIndex((h) => /^(The Fourth Canticle|.*\(The Fourth Canticle\))$/.test(h.title));
  const end = list.findIndex((h, i) => i > fourth && /Conclusion of the Midnight Psalmody|^Concluding/.test(h.title));
  const cut = end > fourth ? end : list.length;
  return [
    { key: 'praises', hymns: list.slice(0, fourth + 1) },
    { key: 'day', hymns: list.slice(fourth + 1, cut) },
    { key: 'conclusion', hymns: list.slice(cut) },
  ];
}

// Kiahk's weekday Psalis before that day's Theotokia (from the Combined Kiahk Praises)
function kiahkPsalis(weekday: number): Hymn[] {
  const combined = serviceOf(seasons.find((s) => s.id === 'kiahk'), '-combined-midnight');
  const name = weekdayNames.en[weekday];
  const list = combined?.hymns ?? [];
  const header = list.findIndex((h) => h.isSectionHeader && h.title === `The ${name} Theotokia`);
  const previous = list.slice(0, Math.max(header, 0)).map((h) => h.isSectionHeader).lastIndexOf(true);
  return header < 0 ? [] : list.slice(previous + 1, header).filter((h) => !h.isSectionHeader && h.title.includes(name));
}

// A season whose Midnight Praises is one list (as Spirit & Truth gives it for one day of the season):
// each of tonight's hymns becomes the season's own version when it has one, and the season's other hymns
// come in where its list has them, leaving out those for other days of the week
function withSeason(sections: FollowSection[], season: Season, own: Service, weekday: number): FollowSection[] {
  const list = flattenHymns(own.hymns);
  const inOwn = new Set(list.map((h) => h.id));
  const used = new Set<string>();
  const replaced = sections.map((section) => ({
    ...section,
    hymns: section.hymns.map((hymn) => {
      const match = hymnAcrossSeasons(hymn.id).find((m) => m.season.id === season.id && inOwn.has(m.hymn.id) && !used.has(m.hymn.id));
      if (!match) return hymn;
      used.add(match.hymn.id);
      return match.hymn;
    }),
  }));
  // The season's own hymns, each after the last of the season's hymns before it that is already in tonight's order
  const after = new Map<string | null, Hymn[]>();
  let anchor: string | null = null;
  for (const hymn of list) {
    if (used.has(hymn.id)) {
      anchor = hymn.id;
      continue;
    }
    const day = hymn.title.match(anyWeekday)?.[1];
    if (day && day !== weekdayNames.en[weekday]) continue;
    const annualDay = annualDayOf(hymn.id);
    if (annualDay !== undefined && annualDay !== weekday) continue;
    after.set(anchor, [...(after.get(anchor) ?? []), hymn]);
  }
  return replaced.map((section, i) => ({
    ...section,
    hymns: [...(i === 0 ? (after.get(null) ?? []) : []), ...section.hymns.flatMap((h) => [h, ...(after.get(h.id) ?? [])])],
  }));
}

export function followAlong(kind: PraiseKind, jdn: number): FollowAlong {
  const weekday = weekdayOf(jdn);
  const copticDay = jdnToCoptic(jdn).day;
  const day = weekdayIds[weekday];

  if (kind === 'vesper') {
    const service = serviceOf(annual(), '-vesper-praises')!;
    const hymns = flattenHymns(group(service, day)?.children ?? []).filter(
      (h) => hasContent(h) && (!/psali-29th$/.test(h.id) || copticDay === 29)
    );
    return { kind, jdn, weekday, season: annual(), service, sections: [{ key: 'day', hymns }], hymns };
  }

  const { season, own } = seasonFor(jdn, kind);
  // Kiahk's Saturday night is its own long Tasbeha, with the Sunday Theotokia and its explanations
  if (season.id === 'kiahk' && own && weekday === 0) {
    const forSunday = (h: Hymn) => !anyWeekday.test(h.title) || /Sunday/.test(h.title);
    const sections = splitNight(flattenHymns(own.hymns).filter((h) => hasContent(h) && forSunday(h))).filter((s) => s.hymns.length);
    return { kind, jdn, weekday, season, service: own, sections, hymns: sections.flatMap((s) => s.hymns) };
  }
  // Great Lent's Midnight Praises has the same General and weekday groups as the Annual one
  const structured = own && group(own, 'general') ? own : serviceOf(annual(), '-midnight')!;
  const general = flattenHymns(group(structured, 'general')?.children ?? []);
  const fourth = general.findIndex((h) => /-fourth-canticle$/.test(h.id));
  const before = general.slice(0, fourth + 1);
  const rest = general.slice(fourth + 1);
  // The Psali for the Virgin Mary on the 21st of the Coptic month comes right after the Fourth Canticle
  const on21st = rest.filter((h) => /21st/.test(h.id) && copticDay === 21);
  const conclusion = rest.filter((h) => !/21st/.test(h.id));
  const dayHymns = [
    ...on21st,
    ...(season.id === 'kiahk' ? kiahkPsalis(weekday) : []),
    ...flattenHymns(group(structured, day)?.children ?? []),
  ];

  let sections: FollowSection[] = [
    { key: 'praises', hymns: before },
    { key: 'day', hymns: dayHymns },
    { key: 'conclusion', hymns: conclusion },
  ];
  if (own && structured !== own && season.id !== 'kiahk') sections = withSeason(sections, season, own, weekday);
  sections = sections.map((s) => ({ ...s, hymns: s.hymns.filter(hasContent) })).filter((s) => s.hymns.length);
  const service = own ?? structured;
  return { kind, jdn, weekday, season, service, sections, hymns: sections.flatMap((s) => s.hymns) };
}

// Tonight's order for a hymn page opened from the follow-along list (?follow=midnight&night=<jdn>)
export function followSequence(kind: string | undefined, night: string | undefined): Hymn[] | null {
  if (!kind || !praiseKinds.includes(kind as PraiseKind)) return null;
  const jdn = Number(night);
  return followAlong(kind as PraiseKind, Number.isFinite(jdn) && jdn > 0 ? jdn : tonightJdn()).hymns;
}
