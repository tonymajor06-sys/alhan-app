import { followAlong, doxologyGroupId, praiseJdnFor, weekdayOf } from '../follow-along';
import { gregorianToJdn } from '../coptic-calendar';

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
