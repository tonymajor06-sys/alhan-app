import { copticToJdn, gregorianToJdn } from '../coptic-calendar';
import { flattenHymns, seasons } from '../hymns';
import { nextFeast } from '../saints';
import { stSaints, stSaintTabs } from '../st-saints';

describe('saint tabs', () => {
  it('come after the Minor Feasts of the Lord, with the Verses of the Cymbals last', () => {
    const ids = seasons.map((s) => s.id);
    expect(ids[ids.indexOf('minor-feasts') + 1]).toBe('veneration');
    expect(ids[ids.length - 1]).toBe('other-cymbals');
  });

  it('name a known saint for each hymn, and have words', () => {
    for (const tab of stSaintTabs) {
      for (const saint of Object.values(tab.saintOf)) expect(stSaints[saint]).toBeDefined();
      for (const hymn of flattenHymns(tab.hymns)) expect(hymn.versions.find((v) => v.language === 'english')?.text).toBeTruthy();
    }
  });

  it('find the next feast, rolling into next year once it has passed', () => {
    const today = gregorianToJdn(2026, 11, 2);
    expect(nextFeast(stSaints.michael.days, today)?.jdn).toBe(gregorianToJdn(2026, 11, 21));
    expect(nextFeast(stSaints.luke.days, today)?.jdn).toBe(copticToJdn(1744, 2, 22));
    expect(nextFeast([], today)).toBeNull();
  });
});
