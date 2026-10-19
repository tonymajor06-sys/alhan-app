import { displayTitle } from './arabic-titles';
import { copticToEnglish } from './english-coptic';
import { splitTitle } from './hymn-titles';
import { deaconCategories, flattenHymns, Hymn, LanguageType, Season, seasons, Service } from './hymns';

// Marks people rarely type: Latin accents, Coptic overlines and jinkims, Arabic tashkeel and tatweel
const IGNORED_MARKS = /[̀-ͯ҃-҉ً-ٰٟۖ-ۭـ⳯-⳱︠-︯]/g;

const foldChar = (ch: string) =>
  ch
    .normalize('NFD')
    .replace(IGNORED_MARKS, '')
    .replace(/[ٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .toLowerCase();

export const normalizeForSearch = (text: string) => [...text].map(foldChar).join('');

// Normalized text plus, for each of its characters, where it came from in the original (to cut snippets)
function normalizeWithMap(text: string): { folded: string; origin: number[] } {
  let folded = '';
  const origin: number[] = [];
  let i = 0;
  for (const ch of text) {
    const f = foldChar(ch);
    folded += f;
    for (let k = 0; k < f.length; k++) origin.push(i);
    i += ch.length;
  }
  return { folded, origin };
}

export interface HymnLocation {
  // Season or deacon category, then service
  group: { id: string; title: string };
  service: Service;
  kind: 'hymns' | 'responses';
}

export interface SearchResult {
  hymn: Hymn;
  location: HymnLocation;
  // Language whose text matched; null when the title matched
  language: LanguageType | null;
  snippet: string;
}

interface IndexEntry {
  hymn: Hymn;
  location: HymnLocation;
  titles: string[];
  // the first words of each text (after a speaker's name), where a hymn is known by its opening
  openings: string[];
  versions: { language: LanguageType; text: string; folded: string; origin: number[] }[];
}

let index: IndexEntry[] | null = null;
let locations: Map<string, { hymn: Hymn; location: HymnLocation }> | null = null;

// A hymn's id as it appears in links: a few generated ids contain spaces, which become dashes
export const hymnSlug = (id: string) => id.replace(/\s+/g, '-');

// Every hymn's slug, once each: the hymn and projector pages are built for each one on the website
export const allHymnSlugs = (): string[] =>
  [
    ...new Set(
      [...seasons, ...deaconCategories].flatMap((group) =>
        group.services.flatMap((service) => flattenHymns(service.hymns).map((h) => hymnSlug(h.id)))
      )
    ),
  ];

// Where a hymn lives (season or category, then service), found by its id or its link slug
export function locateHymn(id: string): { hymn: Hymn; location: HymnLocation } | undefined {
  if (!locations) {
    locations = new Map();
    for (const { group, kind } of [
      ...seasons.map((g) => ({ group: g, kind: 'hymns' as const })),
      ...deaconCategories.map((g) => ({ group: g, kind: 'responses' as const })),
    ]) {
      for (const service of group.services) {
        for (const hymn of flattenHymns(service.hymns)) {
          const entry = { hymn, location: { group, service, kind } };
          locations.set(hymn.id, entry);
          if (!locations.has(hymnSlug(hymn.id))) locations.set(hymnSlug(hymn.id), entry);
        }
      }
    }
  }
  return locations.get(id);
}

// The hymns just before and after this one in its service, in reading order (across groups,
// so the last part of a Theotokia leads on to the hymn after it)
export function neighborHymns(id: string): { previous?: Hymn; next?: Hymn } {
  const found = locateHymn(id);
  if (!found) return {};
  const order = flattenHymns(found.location.service.hymns);
  const i = order.findIndex((h) => h.id === found.hymn.id);
  return { previous: order[i - 1], next: order[i + 1] };
}

// ---- The same hymn in other seasons ----
// Matched by its English name, without a season's note ("Gospel Response (Coptic New Year)" is a Gospel Response)
const sameHymnKey = (title: string) =>
  (splitTitle(title).english ?? title)
    .toLowerCase()
    .replace(/\s*\((feast of [^)]*|[^)]*kiahk[^)]*|coptic new year|[^)]*sunday[^)]*|[^)]*lent[^)]*|nativity|theophany|vespers|matins)\)$/, '')
    .replace(/,\s*(vespers|matins|midnight praises)$/, '')
    .replace(/^(the|a) /, '')
    .replace(/^verses of the cymbals$/, 'verse of the cymbals')
    .replace(/^doxology intro$/, 'introduction to the doxologies')
    .trim();
const servicePart = (serviceId: string) => serviceId.match(/(vesper-praises|vespers|morning-praises|matins|liturgy|distribution|midnight)$/)?.[1] ?? '';

let bySameKey: Map<string, { season: Season; service: Service; hymn: Hymn }[]> | null = null;

// One version of this hymn in each season that has it, in the seasons' order; this hymn's own season included.
// Within a season, a copy of this very hymn wins, then the one in the same service (Vespers, Matins, ...).
export function hymnAcrossSeasons(id: string): { season: Season; hymn: Hymn }[] {
  const found = locateHymn(id);
  if (!found || found.location.kind !== 'hymns') return [];
  if (!bySameKey) {
    bySameKey = new Map();
    for (const season of seasons)
      for (const service of season.services)
        for (const hymn of flattenHymns(service.hymns)) {
          const key = sameHymnKey(hymn.title);
          bySameKey.set(key, [...(bySameKey.get(key) ?? []), { season, service, hymn }]);
        }
  }
  const matches = bySameKey.get(sameHymnKey(found.hymn.title)) ?? [];
  const part = servicePart(found.location.service.id);
  const base = (hymnId: string) => hymnId.split('@')[0];
  return seasons.flatMap((season) => {
    if (season.id === found.location.group.id) return [{ season, hymn: found.hymn }];
    const inSeason = matches.filter((m) => m.season === season);
    const best =
      inSeason.find((m) => base(m.hymn.id) === base(found.hymn.id)) ??
      inSeason.find((m) => servicePart(m.service.id) === part) ??
      inSeason[0];
    return best ? [{ season, hymn: best.hymn }] : [];
  });
}

const cleanText = (text: string) => text.replace(/(?:\\n)+/g, '\n\n');

// "Ⲡⲓⲗⲁⲟⲥ:", "People:", "الشعب:" and the like, alone on the first line
const SPEAKER_LINE = /^\s*\(?[^\n:]{1,30}\)?:\s*\n+/;
const openingOf = (text: string) => normalizeForSearch(text.replace(SPEAKER_LINE, '').slice(0, 80));

function titleVariants(coptic: string): string[] {
  const base = copticToEnglish(coptic);
  const variants = [base];

  // Split after common Coptic demonstratives / articles (Ⲧⲁⲓ, Ϯ, Ⲡⲓ, Ⲧⲓ, Ⲛⲓ, Ⲫⲁⲓ)
  const prefixMatch = coptic.match(/^(Ⲧⲁⲓ|Ϯ|Ⲡⲓ|Ⲧⲓ|Ⲛⲓ|Ⲫⲁⲓ|ⲧⲁⲓ|ϯ|ⲡⲓ|ⲧⲓ|ⲛⲓ|ⲫⲁⲓ)(.+)$/);
  if (prefixMatch) {
    const p = copticToEnglish(prefixMatch[1]);
    const rest = copticToEnglish(prefixMatch[2]);
    variants.push(`${p} ${rest}`);
  }

  // Common vowel variants in English transliteration (ē -> i/e, ou -> o)
  for (const v of [...variants]) {
    variants.push(v.replace(/ē/g, 'i'));
    variants.push(v.replace(/ē/g, 'e'));
    variants.push(v.replace(/ou/g, 'o'));
    variants.push(v.replace(/ē/g, 'i').replace(/ou/g, 'o'));
  }

  return [...new Set(variants)];
}

function buildIndex(): IndexEntry[] {
  const groups = [
    ...seasons.map((g) => ({ group: g, kind: 'hymns' as const })),
    ...deaconCategories.map((g) => ({ group: g, kind: 'responses' as const })),
  ];
  return groups.flatMap(({ group, kind }) =>
    group.services.flatMap((service) =>
      flattenHymns(service.hymns).map((hymn) => {
        const versions = [...hymn.versions, ...(hymn.bishop ?? [])].filter((v) => v.text);
        const { coptic } = splitTitle(hymn.title);
        return {
          hymn,
          location: { group, service, kind },
          // the title as written, in Arabic, and its Coptic words in English letters ("Ⲡⲟⲩⲣⲟ" is found by "pouro")
          titles: [hymn.title, displayTitle(hymn, 'ar'), ...(coptic ? titleVariants(coptic) : [])].map(normalizeForSearch),
          openings: hymn.versions.filter((v) => v.text).map((v) => openingOf(cleanText(v.text))),
          // the words said in the presence of the Pope or a bishop are found too
          versions: versions.map((v) => {
            const text = cleanText(v.text);
            return { language: v.language, text, ...normalizeWithMap(text) };
          }),
        };
      })
    )
  );
}

function snippetAround(text: string, start: number, end: number): string {
  const from = Math.max(0, start - 40);
  const to = Math.min(text.length, end + 80);
  const body = text.slice(from, to).replace(/\s+/g, ' ').trim();
  return `${from > 0 ? '…' : ''}${body}${to < text.length ? '…' : ''}`;
}

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Every word of the query must appear (in any order) in the title or in one language's text.
// The hymn whose name is what was typed comes first: titles that start with it, then titles that contain it,
// then hymns that open with those words, then texts containing them as a phrase, then the rest.
// Within each, the hymn in its own place comes before its copies in other services.
export function searchHymns(query: string, limit = 50): SearchResult[] {
  const words = normalizeForSearch(query).split(/\s+/).filter(Boolean);
  if (words.length === 0 || words.join('').length < 2) return [];
  index ??= buildIndex();
  // The words in order, allowing punctuation between them ("holy god" finds "Holy God,")
  const phrase = new RegExp(words.map(escapeRegExp).join('[\\s\\p{P}]+'), 'u');
  // ...and at the very start, or right after an opening bracket ("Ⲡⲟⲩⲣⲟ (Hymn of Joy)" for "hymn of joy")
  const atStart = new RegExp(`(^|\\()[\\s\\p{P}]*${words.map(escapeRegExp).join('[\\s\\p{P}]+')}`, 'u');

  const tiers: SearchResult[][] = [[], [], [], [], []];
  for (const entry of index) {
    const add = (tier: number, language: LanguageType | null, snippet: string) =>
      tiers[tier].push({ hymn: entry.hymn, location: entry.location, language, snippet });
    const titleStarts = entry.titles.some((t) => atStart.test(t));
    if (titleStarts || entry.titles.some((t) => words.every((w) => t.includes(w)))) {
      const first = entry.versions[0];
      add(titleStarts ? 0 : 1, null, first ? snippetAround(first.text, 0, 0) : '');
      continue;
    }
    const withPhrase = entry.versions.find((v) => phrase.test(v.folded));
    const version = withPhrase ?? entry.versions.find((v) => words.every((w) => v.folded.includes(w)));
    if (version) {
      const found = withPhrase ? phrase.exec(version.folded) : null;
      const at = found ? found.index : version.folded.indexOf(words[0]);
      const length = found ? found[0].length : words[0].length;
      const start = version.origin[at] ?? 0;
      const end = version.origin[at + length - 1] ?? start;
      const opens = entry.openings.some((o) => phrase.test(o) && phrase.exec(o)!.index === o.search(/\S/));
      add(opens ? 2 : withPhrase ? 3 : 4, version.language, snippetAround(version.text, start, end + 1));
    }
  }
  const isCopy = (r: SearchResult) => (r.hymn.id.includes('@') ? 1 : 0);
  return tiers.flatMap((tier) => tier.sort((a, b) => isCopy(a) - isCopy(b))).slice(0, limit);
}
