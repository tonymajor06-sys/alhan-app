import { searchSaints } from '../saints';
import { neighborHymns, normalizeForSearch, searchHymns } from '../search';

describe('normalizeForSearch', () => {
  it('ignores case and accents', () => {
    expect(normalizeForSearch('Ⲁⲅⲓⲟⲥ')).toBe(normalizeForSearch('ⲁⲅⲓⲟⲥ'));
    expect(normalizeForSearch('Café')).toBe('cafe');
  });

  it('ignores Coptic overlines and jinkims', () => {
    expect(normalizeForSearch('ⲡⲉⲛⲟ̅ⲥ̅')).toBe('ⲡⲉⲛⲟⲥ');
    expect(normalizeForSearch('ⲁ̀ⲅⲓⲟⲥ')).toBe('ⲁⲅⲓⲟⲥ');
  });

  it('ignores Arabic diacritics and folds letter variants', () => {
    expect(normalizeForSearch('قدوسُ')).toBe('قدوس');
    expect(normalizeForSearch('أإآ')).toBe('ااا');
    expect(normalizeForSearch('مدينة على')).toBe('مدينه علي');
  });
});

describe('searchHymns', () => {
  it('needs at least two letters', () => {
    expect(searchHymns('')).toEqual([]);
    expect(searchHymns('a')).toEqual([]);
  });

  it('finds a hymn by its English title', () => {
    const results = searchHymns('morning doxology');
    expect(results[0]?.hymn.title).toContain('Morning Doxology');
    expect(results[0]?.language).toBeNull();
  });

  it('puts the hymn named what was typed first, even typed in English letters', () => {
    expect(searchHymns('pouro')[0]?.hymn.id).toBe('annual-veneration-hymn-of-joy');
    expect(searchHymns('Ⲡⲟⲩⲣⲟ')[0]?.hymn.id).toBe('annual-veneration-hymn-of-joy');
    expect(searchHymns('hymn of joy')[0]?.hymn.id).toBe('annual-veneration-hymn-of-joy');
  });

  it('finds a hymn by its Arabic title', () => {
    // (Matins' Verses of the Cymbals is the same hymn as Vespers', so it is one result for both)
    expect(searchHymns('أرباع الناقوس').some((r) => /verses? of the cymbals/i.test(r.hymn.title))).toBe(true);
  });

  it('finds words inside the text, ignoring tashkeel, and says which language matched', () => {
    const result = searchHymns('الحي الذي لا يموت').find((r) => r.hymn.id === 'annual-liturgy-agios');
    expect(result?.language).toBe('arabic');
    expect(result?.snippet?.replace(/[\u064B-\u0652]/g, '')).toMatch(/الح[يى]/);
  });

  it('matches Coptic text typed without overlines or in a different case', () => {
    const result = searchHymns('ⲁⲅⲓⲟⲥ ⲓⲥⲭⲩⲣⲟⲥ').find((r) => r.hymn.id === 'annual-liturgy-agios');
    expect(result).toBeDefined();
  });

  it('ranks texts with the exact phrase above texts that only contain the words', () => {
    const results = searchHymns('holy god');
    const agios = results.findIndex((r) => r.hymn.id === 'annual-liturgy-agios');
    const morningDoxology = results.findIndex((r) => r.hymn.title.includes('Morning Doxology'));
    expect(agios).toBeGreaterThanOrEqual(0);
    if (morningDoxology >= 0) expect(agios).toBeLessThan(morningDoxology);
  });

  it('finds hymns inside groups, like Midnight Praises > General > Doxologies', () => {
    expect(searchHymns('three holy children').some((r) => r.hymn.id === 'annual-midnight-three-holy-children')).toBe(true);
    expect(searchHymns('ذكصولوجية مار جرجس').some((r) => /St George/.test(r.hymn.title))).toBe(true);
    expect(searchHymns('doxologies').every((r) => !r.hymn.children)).toBe(true);
  });

  it('never returns section headers', () => {
    expect(searchHymns('doxologies').every((r) => !r.hymn.isSectionHeader)).toBe(true);
  });

  it('respects the result limit', () => {
    expect(searchHymns('response', 5)).toHaveLength(5);
  });
});

describe('a smarter search (2026-11-12)', () => {
  const philopater = (q: string) => searchHymns(q, 5).every((r) => /Philopater/.test(r.hymn.title));

  it('finds a saint however his name is written', () => {
    for (const q of ['philo', 'filopater', 'philopateer', 'abu sifein', 'abusefein', 'فيلوباتير', 'ابو سيفين']) expect(philopater(q)).toBe(true);
    expect(searchHymns('mar girgis', 3).every((r) => /George/.test(r.hymn.title))).toBe(true);
    expect(searchHymns('marmina', 3).every((r) => /Mena/.test(r.hymn.title))).toBe(true);
    expect(searchHymns('abanoub', 3).every((r) => /Apanoub/.test(r.hymn.title))).toBe(true);
  });

  it('shows a hymn sung in many places once, saying how many more have it', () => {
    const results = searchHymns('philo');
    const doxology = results.filter((r) => r.hymn.title === 'Ⲫⲓⲗⲟⲡⲁⲧⲏⲣ Ⲙⲉⲣⲕⲟⲩⲣⲓⲟⲥ (Doxology for St Philopater Mercurius)');
    expect(doxology.length).toBeLessThanOrEqual(2);
    expect(doxology[0].alsoIn).toBeGreaterThan(5);
  });

  it('matches words from their start, not inside other words', () => {
    expect(searchSaints('philo').map((s) => s.name.en)).not.toContain('St. Catherine of Alexandria');
    expect(searchSaints('abu sefein')[0]?.name.en).toBe('St. Mercurius (Abu Sefein)');
  });
});

describe('neighborHymns', () => {
  it('steps through the parts of a Theotokia', () => {
    const { previous, next } = neighborHymns('annual-midnight-saturday-theotokia-part-2');
    expect(previous?.id).toBe('annual-midnight-saturday-theotokia-part-1');
    expect(next?.id).toBe('annual-midnight-saturday-theotokia-part-3');
  });

  it('leads from the last part on to the next hymn', () => {
    expect(neighborHymns('annual-midnight-saturday-theotokia-part-9').next?.id).toBe(
      'annual-midnight-saturday-watos-lobsh-1'
    );
  });

  it('has nothing before the first hymn of a service', () => {
    expect(neighborHymns('annual-midnight-arise-o-children').previous).toBeUndefined();
  });
});
