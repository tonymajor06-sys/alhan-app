import { normalizeForSearch, searchHymns } from '../search';

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

  it('finds a hymn by its Arabic title', () => {
    expect(searchHymns('أرباع الناقوس').some((r) => r.hymn.id === 'annual-matins-verse-of-cymbals')).toBe(true);
  });

  it('finds words inside the text, ignoring tashkeel, and says which language matched', () => {
    const result = searchHymns('الحي الذي لا يموت').find((r) => r.hymn.id === 'annual-liturgy-agios');
    expect(result?.language).toBe('arabic');
    expect(result?.snippet).toContain('الحي');
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

  it('never returns section headers', () => {
    expect(searchHymns('doxologies').every((r) => !r.hymn.isSectionHeader)).toBe(true);
  });

  it('respects the result limit', () => {
    expect(searchHymns('response', 5)).toHaveLength(5);
  });
});
