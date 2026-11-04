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
