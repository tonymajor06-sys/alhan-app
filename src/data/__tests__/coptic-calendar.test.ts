import {
  copticToJdn,
  formatCopticDate,
  getSeasonInfo,
  gregorianToJdn,
  jdnToCoptic,
  jdnToGregorian,
  paschaJdn,
} from '../coptic-calendar';

const day = (year: number, month: number, d: number) => gregorianToJdn(year, month, d);

describe('day numbers', () => {
  it('matches the standard Julian Day Number for 1 January 2000', () => {
    expect(gregorianToJdn(2000, 1, 1)).toBe(2451545);
  });

  it('round-trips Gregorian dates, including leap days', () => {
    for (const [y, m, d] of [
      [2024, 2, 29],
      [2026, 9, 30],
      [1999, 12, 31],
      [2100, 3, 1],
    ]) {
      expect(jdnToGregorian(gregorianToJdn(y, m, d))).toEqual({ year: y, month: m, day: d });
    }
  });
});

describe('Coptic dates', () => {
  it('starts the Coptic year on Nayrouz: 11 September, or 12 September before a Gregorian leap year', () => {
    expect(jdnToCoptic(day(2025, 9, 11))).toEqual({ year: 1742, month: 1, day: 1 });
    expect(jdnToCoptic(day(2026, 9, 11))).toEqual({ year: 1743, month: 1, day: 1 });
    expect(jdnToCoptic(day(2027, 9, 12))).toEqual({ year: 1744, month: 1, day: 1 });
  });

  it('gives Nasie six days in a Coptic leap year and five otherwise', () => {
    expect(jdnToCoptic(day(2027, 9, 11))).toEqual({ year: 1743, month: 13, day: 6 });
    expect(jdnToCoptic(day(2026, 9, 10))).toEqual({ year: 1742, month: 13, day: 5 });
  });

  it('puts Nativity (7 January) on Kiahk 29, or Kiahk 28 after a Coptic leap year', () => {
    expect(jdnToCoptic(day(2027, 1, 7))).toEqual({ year: 1743, month: 4, day: 29 });
    expect(jdnToCoptic(day(2028, 1, 7))).toEqual({ year: 1744, month: 4, day: 28 });
  });

  it('round-trips every day across several years', () => {
    for (let jdn = day(2024, 1, 1); jdn < day(2029, 1, 1); jdn++) {
      const c = jdnToCoptic(jdn);
      expect(copticToJdn(c.year, c.month, c.day)).toBe(jdn);
    }
  });

  it('formats in English and Arabic', () => {
    expect(formatCopticDate(day(2026, 9, 30), 'en')).toBe('20 Thout 1743 A.M.');
    expect(formatCopticDate(day(2026, 9, 30), 'ar')).toContain('للشهداء');
  });
});

describe('Pascha (Coptic Easter)', () => {
  it.each([
    [2024, 5, 5],
    [2025, 4, 20],
    [2026, 4, 12],
    [2027, 5, 2],
    [2028, 4, 16],
  ])('falls on the right Sunday in %i', (year, month, d) => {
    expect(paschaJdn(year)).toBe(day(year, month, d));
    expect((paschaJdn(year) + 1) % 7).toBe(0);
  });
});

describe('seasons', () => {
  const seasonOn = (y: number, m: number, d: number) => getSeasonInfo(day(y, m, d)).current?.seasonId ?? 'annual';

  it('finds the season for a given day', () => {
    expect(seasonOn(2026, 9, 11)).toBe('nayrouz');
    expect(seasonOn(2026, 9, 28)).toBe('cross');
    expect(seasonOn(2026, 9, 30)).toBe('annual');
    expect(seasonOn(2026, 2, 16)).toBe('great-lent');
    expect(seasonOn(2026, 4, 5)).toBe('palm-sunday');
    expect(seasonOn(2026, 4, 8)).toBe('holy-week');
    expect(seasonOn(2026, 4, 12)).toBe('pentecost');
    expect(seasonOn(2027, 1, 7)).toBe('nativity');
  });

  it('lets Kiahk take over the Nativity Fast', () => {
    expect(seasonOn(2026, 12, 1)).toBe('nativity-fast');
    expect(seasonOn(2026, 12, 20)).toBe('kiahk');
  });

  it('uses Adam tunes Sunday to Tuesday and Watos tunes Wednesday to Saturday', () => {
    expect(getSeasonInfo(day(2026, 9, 27)).tune).toBe('adam'); // Sunday
    expect(getSeasonInfo(day(2026, 9, 29)).tune).toBe('adam'); // Tuesday
    expect(getSeasonInfo(day(2026, 9, 30)).tune).toBe('watos'); // Wednesday
    expect(getSeasonInfo(day(2026, 10, 3)).tune).toBe('watos'); // Saturday
  });

  it('lists upcoming events in date order, all in the future', () => {
    const today = day(2026, 9, 30);
    const { upcoming } = getSeasonInfo(today, 8);
    expect(upcoming).toHaveLength(8);
    upcoming.forEach((ev, i) => {
      expect(ev.daysUntil).toBe(ev.start - today);
      expect(ev.daysUntil).toBeGreaterThan(0);
      if (i > 0) expect(ev.start).toBeGreaterThanOrEqual(upcoming[i - 1].start);
    });
  });
});
