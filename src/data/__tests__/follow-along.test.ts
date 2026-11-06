import { followAlong, doxologyGroupId, praiseJdnFor, weekdayOf } from '../follow-along';
import { gregorianToJdn } from '../coptic-calendar';
import { bookParts, isPraisesBook, partKind, serviceBook, withoutHidden } from '../service-book';

describe('follow-along praise service builder', () => {
  it('builds Midnight Praises for a weekday', () => {
    // 2026-10-14 is a Wednesday (JDN 2461328)
    const jdn = gregorianToJdn(2026, 10, 14);
    const plan = followAlong('midnight', jdn);
    expect(plan.kind).toBe('midnight');
    expect(plan.sections.length).toBeGreaterThan(0);
    expect(plan.hymns.length).toBeGreaterThan(0);

    // Doxologies are grouped under doxologyGroupId
    const doxGroup = plan.sections.flatMap((s) => s.hymns).find((h) => h.id === doxologyGroupId);
    expect(doxGroup).toBeDefined();
    expect(doxGroup?.children?.length).toBeGreaterThan(0);
  });

  it('builds Vesper Praises', () => {
    const jdn = gregorianToJdn(2026, 10, 14);
    const plan = followAlong('vesper', jdn);
    expect(plan.kind).toBe('vesper');
    expect(plan.sections.length).toBeGreaterThan(0);
  });

  it('builds Kiahk weekday Midnight Praises', () => {
    // 2026-12-16 is a Wednesday in Kiahk (4 Kiahk)
    const jdn = gregorianToJdn(2026, 12, 16);
    const plan = followAlong('midnight', jdn);
    expect(plan.season.id).toBe('kiahk');
    expect(plan.hymns.length).toBeGreaterThan(20);
    // Every hymn should have versions
    for (const h of plan.hymns) {
      expect(h.versions.length).toBeGreaterThan(0);
    }
  });

  it('resolves correct weekday jdn using praiseJdnFor', () => {
    const wednesdayJdn = gregorianToJdn(2026, 10, 14);
    // Sunday group:
    const sundayGroup = { id: 'annual-midnight-sunday', title: 'Sunday', versions: [] };
    const sundayTarget = praiseJdnFor(sundayGroup, undefined, wednesdayJdn);
    expect(weekdayOf(sundayTarget)).toBe(0); // 0 = Sunday

    // Friday group:
    const fridayGroup = { id: 'annual-vesper-praises-friday', title: 'Friday', versions: [] };
    const fridayTarget = praiseJdnFor(fridayGroup, undefined, wednesdayJdn);
    expect(weekdayOf(fridayTarget)).toBe(5); // 5 = Friday

    // Item inside Tuesday group:
    const item = { id: 'annual-midnight-tuesday-theotokia-part-1', title: 'Part 1', versions: [] };
    const tuesdayGroup = { id: 'annual-midnight-tuesday', title: 'Tuesday', versions: [] };
    const tuesdayTarget = praiseJdnFor(item, tuesdayGroup, wednesdayJdn);
    expect(weekdayOf(tuesdayTarget)).toBe(2); // 2 = Tuesday
  });
});

describe("Follow along: hiding parts of Midnight and Vesper Praises", () => {
  const jdn = gregorianToJdn(2026, 11, 6);
  const tonight = followAlong('midnight', jdn).hymns;
  const book = serviceBook(tonight[0].id, tonight);
  const ids = (b: typeof book) => bookParts(b).map((h) => h.id);

  it('is offered only for Midnight and Vesper Praises', () => {
    expect(isPraisesBook(tonight[0].id, tonight)).toBe(true);
    expect(isPraisesBook('d-annual-liturgy-faithful-reconciliation')).toBe(false);
  });

  it('hides every doxology and their conclusion, but keeps the rest', () => {
    const hidden = withoutHidden(book, ['doxologies'], tonight[0].id);
    expect(ids(hidden).some((id) => /doxology/.test(id))).toBe(false);
    expect(ids(hidden)).toContain('annual-midnight-fourth-canticle');
  });

  it('hides single doxologies, and the conclusion only when all are hidden', () => {
    const one = withoutHidden(book, ['annual-midnight-doxology-st-mark'], tonight[0].id);
    expect(ids(one)).not.toContain('annual-midnight-doxology-st-mark');
    expect(ids(one)).toContain('annual-midnight-doxology-virgin-mary');
    expect(ids(one)).toContain('annual-midnight-doxology-conclusion');
    const all = bookParts(book)
      .filter((h) => partKind(h) === 'doxologies' && !/conclusion/.test(h.id))
      .map((h) => h.id);
    expect(ids(withoutHidden(book, all, tonight[0].id))).not.toContain('annual-midnight-doxology-conclusion');
  });

  it('always keeps the hymn that was opened', () => {
    expect(ids(withoutHidden(book, ['doxologies'], 'annual-midnight-doxology-st-mark'))).toContain('annual-midnight-doxology-st-mark');
  });
});
