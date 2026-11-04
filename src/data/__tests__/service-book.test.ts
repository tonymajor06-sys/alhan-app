import { bookParts, serviceBook } from '../service-book';
import { seasons } from '../hymns';

describe('Follow along book', () => {
  it("is the hymn's whole service, in order, with its sections", () => {
    const book = serviceBook('d-annual-liturgy-faithful-let-us-attend');
    const ids = bookParts(book).map((h) => h.id);
    expect(ids).toContain('d-annual-liturgy-faithful-stand-up-for-prayer');
    expect(ids.indexOf('d-annual-liturgy-faithful-look-towards-the-east')).toBe(ids.indexOf('d-annual-liturgy-faithful-let-us-attend') - 1);
    expect(book.some((e) => e.kind === 'header')).toBe(true);
  });

  it("is only the day's group in a service made of groups (Midnight Praises)", () => {
    const midnight = seasons.find((s) => s.id === 'annual')!.services.find((s) => s.id.endsWith('-midnight'))!;
    const groups = midnight.hymns.filter((h) => h.children);
    const [first, second] = groups;
    const hymn = bookParts(serviceBook(first.children!.find((h) => !h.children && !h.isSectionHeader)!.id));
    expect(hymn.length).toBeGreaterThan(0);
    const secondIds = new Set(bookParts(serviceBook(second.children!.find((h) => !h.children && !h.isSectionHeader)!.id)).map((h) => h.id));
    expect(hymn.some((h) => secondIds.has(h.id))).toBe(false);
  });
});
