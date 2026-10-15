import { AppLanguage } from '@/hooks/use-settings';

import { dateToJdn, getSeasonInfo, jdnToCoptic, jdnToGregorian, paschaJdn } from './coptic-calendar';
import { flattenHymns, Hymn, Season, seasons, Service } from './hymns';
import { hymnAcrossSeasons } from './search';
import { kiahkWeekdayOrder } from './kiahk-weekday-order';
import { stFullSeasons } from './st-full-seasons';

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

// Hymns Spirit & Truth sings in every night's Midnight Praises that the app keeps in other lists
let anywhere: Map<string, Hymn> | null = null;
const hymnById = (id: string): Hymn | undefined => {
  if (!anywhere) {
    anywhere = new Map();
    for (const season of seasons)
      for (const service of season.services)
        for (const hymn of flattenHymns(service.hymns)) if (!anywhere.has(hymn.id.split('@')[0])) anywhere.set(hymn.id.split('@')[0], hymn);
    for (const full of stFullSeasons)
      for (const item of full.items) if ('hymn' in item && !anywhere.has(item.hymn.id)) anywhere.set(item.hymn.id, item.hymn);
  }
  return anywhere.get(id);
};
// Readings and prayers in a service's list: following along shows only the hymns
const notSung = /-(gospel-according-to-st-luke|luke-\d[-\d]*|our-father|the-short-blessing|concluding-prayer|the-orthodox-creed)$/;
// The doxologies, one after another, become one entry that opens to show them all
export const doxologyGroupId = 'follow-doxologies';
const isDoxology = (h: Hymn) => /-doxology-/.test(h.id.split('@')[0]);
function withDoxologyGroup(list: Hymn[]): Hymn[] {
  const first = list.findIndex(isDoxology);
  if (first < 0) return list;
  let end = first;
  while (end < list.length && isDoxology(list[end])) end++;
  const doxologies = list.slice(first, end);
  if (doxologies.length < 2) return list;
  return [...list.slice(0, first), { id: doxologyGroupId, title: 'Doxologies', versions: [], children: doxologies }, ...list.slice(end)];
}
// Tonight's hymns one by one (the doxologies inside their entry), for Next / Previous and Play All
const flatten = (sections: FollowSection[]) => sections.flatMap((s) => s.hymns.flatMap((h) => h.children ?? [h]));
const shared = (...ids: string[]) => ids.map(hymnById).filter((h): h is Hymn => !!h);
// Hymns that stand in for a part already in the list (sung in another tune), so reading straight through skips them
const alternates = /-(esmou-epchois-melismatic|arihoo-chasf|sunday-psali-adam-lord-jesus)$/;
// The part of the Sunday Theotokia sung on weekdays after the First Canticle's Lobsh
const weekdaySundayParts = /-(sunday-theotokion-[789]|semouti-ero-dikeos)$/;
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
  if (own) return { season, own };
  // A minor feast without its own Midnight Praises (Thomas Sunday, say) keeps the season around it
  if (season.id === 'minor-feasts') {
    const around = seasons.find((s) => s.id === getSeasonInfo(jdn + 1, 0).current?.seasonId && s.id !== 'minor-feasts');
    const aroundOwn = around && serviceOf(around, '-midnight');
    if (around && aroundOwn) return { season: around, own: aroundOwn };
  }
  return { season: annual() };
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
function withSeason(sections: FollowSection[], season: Season, own: Service, weekday: number, addOwn: boolean): FollowSection[] {
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
  // (seasons whose Psalis Spirit & Truth places by rule, below, only swap in their own versions)
  const after = new Map<string | null, Hymn[]>();
  if (!addOwn) return replaced;
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
    hymns: section.hymns.flatMap((h) => [h, ...(after.get(h.id) ?? [])]),
  }));
}

// The Holy Fifty Days and the Apostles' Fast as Spirit & Truth sings them: the season's Psali (Adam on Sunday,
// Monday and Tuesday, Watos from Wednesday to Saturday) either stands in for the day's own Psali (the Fifty Days,
// whose weekdays also end their Theotokia with the last three parts of Sunday's) or comes before it (the fast).
// On Thomas Sunday the Fifty Days' Psali follows the one for Thomas Sunday.
interface SeasonPsalis {
  adam: RegExp;
  watos: RegExp;
  replaces: boolean;
  thomas?: RegExp;
}
const seasonPsalis: Record<string, SeasonPsalis> = {
  pentecost: { adam: /-psali-adam-for-the-holy-fifty-days$/, watos: /-psali-watos-for-the-holy-fifty-days$/, replaces: true, thomas: /-adam-psali-for-thomas-sunday$/ },
  'apostles-fast': { adam: /-adam-psali-for-the-apostles-fast$/, watos: /-watos-psali-for-the-apostles-fast$/, replaces: false },
};
const dayPsali = /-(sunday|monday|tuesday|wednesday|thursday|friday|saturday)-(watos-)?psali$/;
function withSeasonPsalis(sections: FollowSection[], own: Service, weekday: number, rule: SeasonPsalis, jdn: number): FollowSection[] {
  const list = flattenHymns(own.hymns);
  const byTitle = (re: RegExp) => list.find((h) => re.test(h.id));
  const psali = byTitle(weekday <= 2 ? rule.adam : rule.watos);
  const year = jdnToGregorian(jdn).year;
  const thomas = rule.thomas && weekday === 0 && jdn === paschaJdn(year) + 7 ? byTitle(rule.thomas) : undefined;
  const ownIds = new Set(list.map((h) => h.id));
  return sections.map((section) => {
    if (section.key !== 'day') return section;
    // the season's other Psalis (for its feasts) are not sung on an ordinary day
    let hymns = section.hymns.filter((h) => !(ownIds.has(h.id) && h.id.startsWith(own.id) && /psali/i.test(h.title)));
    hymns = hymns.flatMap((h) => {
      if (!dayPsali.test(h.id.split('@')[0]) || !psali) return [h];
      const seasonal = [...(thomas ? [thomas] : []), psali];
      return rule.replaces ? seasonal : [...seasonal, h];
    });
    if (rule.replaces && weekday !== 0) {
      const last = hymns.map((h) => /-theotokia-part-\d+$/.test(h.id.split('@')[0])).lastIndexOf(true);
      const sundayEnd = [16, 17, 18].map((n) => hymnById(`annual-midnight-sunday-theotokia-part-${n}`)).filter((h): h is Hymn => !!h);
      if (last >= 0) hymns.splice(last + 1, 0, ...sundayEnd);
    }
    return { ...section, hymns };
  });
}

// Great Lent as Spirit & Truth sings it. On a weekday the Lent Psali (Adam on Monday and Tuesday, Watos from
// Wednesday to Saturday) stands in for the day's own Psali, and the weekday part of the Sunday Theotokia and the
// Lent Psalis on the canticles are left out. On Sunday those Psalis stay; the Psali Adam on the Sunday Theotokia
// stands in for the Sunday Psali, and the Psali Watos on its eighth part comes before that part.
// On 10 Baramhat, the Feast of the Cross in the fast, there is no Lent Ode and the Cross's Psali is sung instead.
const lentSundayPsalis = /-(psali-(adam|watos)-on-.*|watos-psali-on-great-lent-doxology)$/;
const lentPsalis = /-(adam-psali-great-lent|watos-psali-for-great-lent)$/;
function forLent(sections: FollowSection[], weekday: number, feastOfCross: boolean): FollowSection[] {
  const all = sections.flatMap((s) => s.hymns);
  const find = (re: RegExp) => all.find((h) => re.test(h.id.split('@')[0]));
  const eighth = find(/-psali-watos-on-eighth-part-of-sunday-theotokia$/);
  const onSundayTheotokia = find(/-psali-adam-on-sunday-theotokia$/);
  const lentPsali = feastOfCross
    ? hymnById(weekday <= 2 ? 'cross-midnight-adam-psali-for-feast-of-the-cross' : 'cross-midnight-watos-psali-for-feast-of-the-cross')
    : find(weekday <= 2 ? /-adam-psali-great-lent$/ : /-watos-psali-for-great-lent$/);
  return sections.map((section) => {
    let hymns = section.hymns.filter(
      (h) => !lentPsalis.test(h.id) && h !== onSundayTheotokia && h !== eighth && !(feastOfCross && /-great-lent-ode$/.test(h.id))
    );
    if (weekday !== 0) hymns = hymns.filter((h) => !weekdaySundayParts.test(h.id) && !lentSundayPsalis.test(h.id));
    if (section.key === 'day') {
      hymns = hymns.flatMap((h) => {
        const base = h.id.split('@')[0];
        if (/-(sunday|monday|tuesday|wednesday|thursday|friday|saturday)-psali$/.test(base))
          return weekday === 0 ? (onSundayTheotokia ? [onSundayTheotokia] : [h]) : lentPsali ? [lentPsali] : [h];
        if (weekday === 0 && eighth && /-sunday-theotokia-part-8$/.test(base)) return [eighth, h];
        return [h];
      });
    }
    return { ...section, hymns };
  });
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
    const sections = splitNight(flattenHymns(own.hymns).filter((h) => hasContent(h) && forSunday(h) && !notSung.test(h.id.split('@')[0]) && !/\(English Revised\)$/.test(h.title)))
      .map((s) => ({ ...s, hymns: withDoxologyGroup(s.hymns) }))
      .filter((s) => s.hymns.length);
    return { kind, jdn, weekday, season, service: own, sections, hymns: flatten(sections) };
  }
  // Kiahk's weekday nights are their own long Tasbeha too, in the order Spirit & Truth gives for each day
  const kiahkOrder = season.id === 'kiahk' && own ? kiahkWeekdayOrder[weekday] : undefined;
  if (kiahkOrder) {
    const inKiahk = new Map(season.services.flatMap((s) => flattenHymns(s.hymns)).map((h) => [h.id.split('@')[0], h] as const));
    const list = kiahkOrder.map((id) => inKiahk.get(id) ?? hymnById(id)).filter((h): h is Hymn => !!h && hasContent(h));
    const fourth = list.findIndex((h) => h.title === 'Exposition on the Fourth Canticle');
    const end = list.findIndex((h) => /-introduction-to-the-creed$/.test(h.id.split('@')[0]));
    const cut = end > fourth ? end : list.length;
    const sections = [
      { key: 'praises' as const, hymns: list.slice(0, fourth + 1) },
      { key: 'day' as const, hymns: list.slice(fourth + 1, cut) },
      { key: 'conclusion' as const, hymns: list.slice(cut) },
    ].filter((s) => s.hymns.length);
    return { kind, jdn, weekday, season, service: own!, sections, hymns: flatten(sections) };
  }
  // Great Lent's Midnight Praises has the same General and weekday groups as the Annual one
  const structured = own && group(own, 'general') ? own : serviceOf(annual(), '-midnight')!;
  const general = flattenHymns(group(structured, 'general')?.children ?? []).filter((h) => !alternates.test(h.id));
  const fourth = general.findIndex((h) => /-fourth-canticle$/.test(h.id));
  // As Spirit & Truth sings it: on weekdays Sunday Theotokia 7-9 follow the First Canticle's Lobsh;
  // on Sunday they are in their place inside the whole Sunday Theotokia
  const before = general.slice(0, fourth + 1).filter((h) => weekday !== 0 || !weekdaySundayParts.test(h.id));
  // A Sunday outside the fasts begins with the Hymn of the Resurrection, after "Arise, O children of the light"
  if (weekday === 0 && !['great-lent', 'kiahk'].includes(season.id) && !before.some((h) => /the-hymn-of-the-resurrection$/.test(h.id.split('@')[0]))) {
    const arise = before.findIndex((h) => /-arise-o-children$/.test(h.id));
    before.splice(arise + 1, 0, ...shared('annual-midnight-the-hymn-of-the-resurrection'));
  }
  const rest = general.slice(fourth + 1);
  // The Psali for the Virgin Mary on the 21st of the Coptic month comes right after the Fourth Canticle
  const on21st = rest.filter((h) => /21st/.test(h.id) && copticDay === 21);
  // The end, as Spirit & Truth has it, with only what is sung (no Creed, prayers or blessing):
  // the Introduction to the Creed, then Holy Holy Holy and the Concluding Hymn
  const conclusion = [...shared('palmsunday-vespers-introduction-to-the-creed'), ...rest.filter((h) => !/21st/.test(h.id))];
  const dayHymns = [
    ...on21st,
    ...(season.id === 'kiahk' ? kiahkPsalis(weekday) : []),
    ...flattenHymns(group(structured, day)?.children ?? []).filter((h) => !alternates.test(h.id)),
  ];

  let sections: FollowSection[] = [
    { key: 'praises', hymns: before },
    { key: 'day', hymns: dayHymns },
    { key: 'conclusion', hymns: conclusion },
  ];
  if (season.id === 'great-lent') sections = forLent(sections, weekday, jdnToCoptic(jdn).month === 7 && copticDay === 10);
  if (own && structured !== own && season.id !== 'kiahk')
    sections = withSeason(sections, season, own, weekday, !(season.id in seasonPsalis) && season.id !== 'nativity-fast');
  if (own && season.id in seasonPsalis) sections = withSeasonPsalis(sections, own, weekday, seasonPsalis[season.id], jdn);
  sections = sections
    .map((s) => ({ ...s, hymns: withDoxologyGroup(s.hymns.filter((h) => hasContent(h) && !notSung.test(h.id.split('@')[0]))) }))
    .filter((s) => s.hymns.length);
  const service = own ?? structured;
  return { kind, jdn, weekday, season, service, sections, hymns: flatten(sections) };
}

// Tonight's order for a hymn page opened from the follow-along list (?follow=midnight&night=<jdn>)
export function followSequence(kind: string | undefined, night: string | undefined): Hymn[] | null {
  if (!kind || !praiseKinds.includes(kind as PraiseKind)) return null;
  const jdn = Number(night);
  return followAlong(kind as PraiseKind, Number.isFinite(jdn) && jdn > 0 ? jdn : tonightJdn()).hymns;
}
