import { Hymn } from './hymns';
import { locateHymn } from './search';

// Follow along (the switch in the hymn reader): the hymn opened out into the book it belongs to, every part one after
// another as in Spirit & Truth. The book is the hymn's service, with its groups opened in place under their names.
// A service that is only a collection of groups (Midnight Praises: General, Sunday, Monday...) is not read straight
// through, so there the book is the group the hymn is in. Tonight's Midnight or Vesper Praises are read in tonight's order.

export type BookEntry = { kind: 'header'; id: string; title: Hymn } | { kind: 'part'; hymn: Hymn };

const contains = (item: Hymn, id: string): boolean => item.id === id || !!item.children?.some((c) => contains(c, id));

function expand(list: Hymn[]): BookEntry[] {
  return list.flatMap((h): BookEntry[] =>
    h.isSectionHeader
      ? [{ kind: 'header', id: h.id, title: h }]
      : h.children
        ? [{ kind: 'header', id: h.id, title: h }, ...expand(h.children)]
        : [{ kind: 'part', hymn: h }]
  );
}

export function serviceBook(hymnId: string, tonight?: Hymn[] | null): BookEntry[] {
  if (tonight?.some((h) => h.id === hymnId)) return tonight.map((hymn) => ({ kind: 'part', hymn }));
  const service = locateHymn(hymnId)?.location.service;
  if (!service) return [];
  const readable = service.hymns.filter((h) => !h.isSectionHeader);
  const groups = readable.filter((h) => h.children);
  const collection = groups.length > 1 && groups.length * 2 >= readable.length;
  const own = collection ? service.hymns.find((h) => h.children && contains(h, hymnId)) : undefined;
  return expand(own?.children ?? service.hymns);
}

export const bookParts = (book: BookEntry[]) => book.flatMap((e) => (e.kind === 'part' ? [e.hymn] : []));

// ---- Hiding parts of Midnight and Vesper Praises (Follow along's Contents: Doxologies, Psalis, Lobsh, Expositions) ----
// A kind can be hidden whole, and each doxology on its own (its id, without the "@service" of a copy). The Conclusion of
// the Doxologies goes when every doxology does. The hymn that was opened is always shown.
export type PartKind = 'doxologies' | 'psalis' | 'lobsh' | 'expositions';
export const partKinds: PartKind[] = ['doxologies', 'psalis', 'lobsh', 'expositions'];

const baseId = (id: string) => id.split('@')[0];
const englishName = (hymn: Hymn) => hymn.title.match(/\(([^()]*(?:\([^()]*\))?[^()]*)\)\s*$/)?.[1] ?? hymn.title;

export const isDoxologyConclusion = (hymn: Hymn) => /doxolog/i.test(baseId(hymn.id)) && /conclusion/i.test(`${baseId(hymn.id)} ${englishName(hymn)}`);

export function partKind(hymn: Hymn): PartKind | null {
  const text = `${baseId(hymn.id)} ${englishName(hymn)}`;
  if (/doxolog/i.test(text)) return 'doxologies';
  if (/expositi|explanation/i.test(text)) return 'expositions';
  if (/lobsh/i.test(text)) return 'lobsh';
  if (/psali/i.test(text)) return 'psalis';
  return null;
}

// Whether a book is Midnight or Vesper Praises (the only books whose parts can be hidden)
export const isPraisesBook = (hymnId: string, tonight?: Hymn[] | null) =>
  !!tonight?.some((h) => h.id === hymnId) || /(^|-)(midnight|vesper-praises)(-|$)/.test(locateHymn(hymnId)?.location.service.id ?? '');

export function hiddenInBook(hymn: Hymn, hidden: readonly string[], book: BookEntry[]): boolean {
  const kind = partKind(hymn);
  if (!kind) return false;
  if (hidden.includes(kind)) return true;
  if (kind !== 'doxologies') return false;
  if (!isDoxologyConclusion(hymn)) return hidden.includes(baseId(hymn.id));
  // The conclusion goes with the last doxology
  const doxologies = bookParts(book).filter((h) => partKind(h) === 'doxologies' && !isDoxologyConclusion(h));
  return doxologies.length > 0 && doxologies.every((h) => hidden.includes(baseId(h.id)));
}

export function withoutHidden(book: BookEntry[], hidden: readonly string[], keepId: string): BookEntry[] {
  if (!hidden.length) return book;
  const kept = book.filter((e) => e.kind === 'header' || e.hymn.id === keepId || !hiddenInBook(e.hymn, hidden, book));
  // A heading with nothing left under it goes too
  return kept.filter((e, i) => e.kind === 'part' || (kept[i + 1] !== undefined && kept[i + 1].kind === 'part'));
}

export const doxologyId = (hymn: Hymn) => baseId(hymn.id);
