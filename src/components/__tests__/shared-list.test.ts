import { listWebUrl, parseListItems } from '../../constants/site';

jest.mock('../../data/search', () => ({ hymnSlug: (id: string) => id.replace(/\s+/g, '-') }));

describe('shared list links', () => {
  it('reads back the hymns and languages it was made from', () => {
    const items = [
      { hymnId: 'annual-vespers-blessed-is-he@annual-vesper-praises-sunday', language: 'coptic' as const },
      { hymnId: 'kiahk-psali', language: 'englishCoptic' as const },
    ];
    const url = new URL(listWebUrl('Choir: week 3', items));
    expect(url.searchParams.get('n')).toBe('Choir: week 3');
    expect(parseListItems(url.searchParams.get('h') ?? '')).toEqual([
      { slug: items[0].hymnId, language: 'coptic' },
      { slug: items[1].hymnId, language: 'englishCoptic' },
    ]);
  });
  it('leaves out parts it cannot read', () => {
    expect(parseListItems('good-hymn.e,broken,other.zz')).toEqual([{ slug: 'good-hymn', language: 'english' }]);
  });
});
