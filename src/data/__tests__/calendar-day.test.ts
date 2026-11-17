import { hasSaints, saintHymnsOn, storySaintsOn, venerationsOn } from '../calendar-day';

describe("the calendar's day", () => {
  it('finds the saints remembered on a day, and their hymns', () => {
    expect(storySaintsOn(3, 12).map((s) => s.name.en)).toContain('Archangel Michael');
    const hymns = saintHymnsOn(3, 12);
    expect(hymns.some((h) => h.tab === 'veneration' && /michael/i.test(h.hymn.id))).toBe(true);
    expect(hymns.every((h) => h.saint.en)).toBe(true);
    expect(hasSaints(3, 12)).toBe(true);
  });

  it("gives the morning reminder each saint's Veneration once, and not the Four Incorporeal Creatures", () => {
    const mina = venerationsOn(3, 15);
    expect(mina.map((v) => v.hymnId)).toEqual(['veneration-melody-for-st-mena-the-wonderworker']);
    expect(saintHymnsOn(3, 8).some((h) => h.saint.en === 'Four Incorporeal Creatures')).toBe(false);
  });
});
