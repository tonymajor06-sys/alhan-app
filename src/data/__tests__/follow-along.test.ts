import { followAlong, doxologyGroupId } from '../follow-along';
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
});
