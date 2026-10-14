import { saintSortKey, saintSortLetter, saintsByAlphabet, saints } from '../saints';

describe('saints sorting and alphabetization', () => {
  it('strips liturgical English prefixes and titles', () => {
    expect(saintSortKey('The Departure of St. Anthony the Great', 'en')).toBe('Anthony the Great');
    expect(saintSortKey('The Martyrdom of St. George', 'en')).toBe('George');
    expect(saintSortKey('The Commemoration of Archangel Michael', 'en')).toBe('Michael');
    expect(saintSortKey('Pope Athanasius the Apostolic', 'en')).toBe('Athanasius the Apostolic');
    expect(saintSortKey('St. Mary', 'en')).toBe('Mary');
  });

  it('strips liturgical Arabic prefixes and titles', () => {
    expect(saintSortKey('نياحة الأنبا أنطونيوس أب الرهبان', 'ar')).toBe('انطونيوس أب الرهبان');
    expect(saintSortKey('استشهاد القديس مار جرجس', 'ar')).toBe('جرجس');
    expect(saintSortKey('تذكار رئيس الملائكة ميخائيل', 'ar')).toBe('ميخائيل');
    expect(saintSortKey('البابا أثناسيوس الرسولي', 'ar')).toBe('اثناسيوس الرسولي');
  });

  it('extracts correct sort letters in English and Arabic', () => {
    const stGeorge = saints.find((s) => s.name.en.includes('George'))!;
    expect(stGeorge).toBeDefined();
    expect(saintSortLetter(stGeorge, 'en')).toBe('G');
    expect(saintSortLetter(stGeorge, 'ar')).toBe('ج');
  });

  it('groups all saints into alphabet groups covering all saints', () => {
    const enGroups = saintsByAlphabet('en');
    expect(enGroups.length).toBeGreaterThan(15);
    const totalEn = enGroups.reduce((acc, g) => acc + g.saints.length, 0);
    expect(totalEn).toBe(saints.length);

    const arGroups = saintsByAlphabet('ar');
    expect(arGroups.length).toBeGreaterThan(15);
    const totalAr = arGroups.reduce((acc, g) => acc + g.saints.length, 0);
    expect(totalAr).toBe(saints.length);
  });
});
