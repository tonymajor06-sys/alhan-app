import { displayTitle } from './arabic-titles';
import { deaconCategories, flattenHymns, Hymn, LanguageType, seasons, Service } from './hymns';

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

const cleanText = (text: string) => text.replace(/(?:\\n)+/g, '\n\n');

function buildIndex(): IndexEntry[] {
  const groups = [
    ...seasons.map((g) => ({ group: g, kind: 'hymns' as const })),
    ...deaconCategories.map((g) => ({ group: g, kind: 'responses' as const })),
  ];
  return groups.flatMap(({ group, kind }) =>
    group.services.flatMap((service) =>
      flattenHymns(service.hymns).map((hymn) => ({
        hymn,
        location: { group, service, kind },
        titles: [normalizeForSearch(hymn.title), normalizeForSearch(displayTitle(hymn, 'ar'))],
        versions: hymn.versions
          .filter((v) => v.text)
          .map((v) => {
            const text = cleanText(v.text);
            return { language: v.language, text, ...normalizeWithMap(text) };
          }),
      }))
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
// Title matches come first, then texts containing the words as a phrase, then the rest.
export function searchHymns(query: string, limit = 50): SearchResult[] {
  const words = normalizeForSearch(query).split(/\s+/).filter(Boolean);
  if (words.length === 0 || words.join('').length < 2) return [];
  index ??= buildIndex();
  // The words in order, allowing punctuation between them ("holy god" finds "Holy God,")
  const phrase = new RegExp(words.map(escapeRegExp).join('[\\s\\p{P}]+'), 'u');

  const titleMatches: SearchResult[] = [];
  const phraseMatches: SearchResult[] = [];
  const wordMatches: SearchResult[] = [];
  for (const entry of index) {
    if (entry.titles.some((t) => words.every((w) => t.includes(w)))) {
      const first = entry.versions[0];
      titleMatches.push({
        hymn: entry.hymn,
        location: entry.location,
        language: null,
        snippet: first ? snippetAround(first.text, 0, 0) : '',
      });
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
      (withPhrase ? phraseMatches : wordMatches).push({
        hymn: entry.hymn,
        location: entry.location,
        language: version.language,
        snippet: snippetAround(version.text, start, end + 1),
      });
    }
  }
  return [...titleMatches, ...phraseMatches, ...wordMatches].slice(0, limit);
}
