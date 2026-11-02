import { copticToJdn, gregorianToJdn } from '../coptic-calendar';
import { flattenHymns, seasons } from '../hymns';
import { nextFeast } from '../saints';
import { searchHymns } from '../search';
import { stSaints, stSaintTabs } from '../st-saints';

describe('saint tabs', () => {
  it('sit in one Other tab after the Minor Feasts of the Lord, Veneration first and the Verses of the Cymbals last', () => {
    expect(seasons.map((s) => s.id).slice(-2)).toEqual(['minor-feasts', 'other']);
    const lists = seasons[seasons.length - 1].services.map((s) => s.id);
    expect(lists[0]).toBe('veneration');
    expect(lists[lists.length - 1]).toBe('other-cymbals');
  });

  it("keep only the saints' melodies in Veneration", () => {
    const veneration = stSaintTabs[0];
    expect(veneration.hymns.every((hymn) => veneration.saintOf[hymn.id])).toBe(true);
    expect(veneration.hymns.map((h) => h.title)).not.toContain('Conclusion');
  });

  it('name a known saint for each hymn, and have words', () => {
    for (const tab of stSaintTabs) {
      for (const saint of Object.values(tab.saintOf)) expect(stSaints[saint]).toBeDefined();
      for (const hymn of flattenHymns(tab.hymns)) {
        expect(hymn.versions.find((v) => v.language === 'english')?.text).toBeTruthy();
        const arabic = hymn.versions.find((v) => v.language === 'arabic')?.text;
        const letters = hymn.versions.find((v) => v.language === 'englishArabic')?.text;
        expect(letters?.split('\n\n').length).toBe(arabic?.split('\n\n').length);
        expect(letters ?? '').not.toMatch(/j/i);
      }
    }
  });

  it('can be searched on their own', () => {
    const found = searchHymns('marina', 50, 'other');
    expect(found.length).toBeGreaterThan(3);
    expect(found.every((r) => r.location.group.id === 'other')).toBe(true);
    const doxologies = searchHymns('marina', 50, 'other-doxologies');
    expect(doxologies.length).toBeGreaterThan(0);
    expect(doxologies.every((r) => r.location.service.id === 'other-doxologies')).toBe(true);
  });

  it('find the next feast, rolling into next year once it has passed', () => {
    const today = gregorianToJdn(2026, 11, 2);
    expect(nextFeast(stSaints.michael.days, today)?.jdn).toBe(gregorianToJdn(2026, 11, 21));
    expect(nextFeast(stSaints.luke.days, today)?.jdn).toBe(copticToJdn(1744, 2, 22));
    expect(nextFeast([], today)).toBeNull();
  });
});
