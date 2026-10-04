import { copticToArabic } from '../arabic-coptic';
import { deaconCategories, flattenHymns, Hymn, seasons } from '../hymns';

const allHymns = (): Hymn[] =>
  [...seasons, ...deaconCategories].flatMap((group) => group.services.flatMap((service) => flattenHymns(service.hymns)));

describe('copticToArabic', () => {
  it('writes Coptic words in Arabic letters', () => {
    expect(copticToArabic('Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ')).toBe('ألّيلويا');
    expect(copticToArabic('ⲛ̀ⲧⲉ')).toBe('إنتِ');
    expect(copticToArabic('ⲙ̀Ⲫ̀ⲓⲱⲧ')).toBe('إمإفيوت');
    expect(copticToArabic('ⲉ̀ⲃⲟⲗ')).toBe('إڤُل');
  });

  it('writes shortened holy names out in full', () => {
    expect(copticToArabic('Ⲡⲉⲛⲟ̅ⲥ̅')).toBe(copticToArabic('Ⲡⲉⲛϭⲟⲓⲥ'));
    expect(copticToArabic('Ⲓⲏ̅ⲥ̅')).toBe(copticToArabic('Ⲓⲏⲥⲟⲩⲥ'));
  });

  it('keeps punctuation, line breaks and non-Coptic text where they are', () => {
    expect(copticToArabic('ⲁⲙⲏⲛ: (ⲛⲓⲙ) ___\n\nⲁⲙⲏⲛ.')).toBe('أمين: (نيم) ___\n\nأمين.');
  });
});

describe('Coptic in Arabic letters for every hymn', () => {
  const real = allHymns().filter((h) => {
    const coptic = h.versions.find((v) => v.language === 'coptic');
    return coptic && !/Coptic Text\)/.test(coptic.text);
  });

  it('is added to every hymn that has real Coptic text', () => {
    expect(real.length).toBeGreaterThan(100);
    for (const hymn of real) {
      const coptic = hymn.versions.find((v) => v.language === 'coptic')!;
      const converted = hymn.versions.find((v) => v.language === 'arabicCoptic');
      expect(converted?.text).toBeTruthy();
      // the same number of verses as the Coptic
      expect(converted!.text.split(/\n\s*\n/).length).toBe(coptic.text.split(/\n\s*\n/).length);
      // no Coptic letters left over
      expect(converted!.text).not.toMatch(/[Ⲁ-⳿Ϣ-ϯ]/);
    }
  });

  it('is not added to placeholders, and has the same recording as the Coptic', () => {
    const placeholder = allHymns().find((h) => h.versions.some((v) => v.language === 'coptic' && /Coptic Text\)/.test(v.text)));
    expect(placeholder?.versions.some((v) => v.language === 'arabicCoptic')).toBe(false);
    const withAudio = real.find((h) => h.versions.some((v) => v.language === 'coptic' && v.audio))!;
    const coptic = withAudio.versions.find((v) => v.language === 'coptic')!;
    expect(withAudio.versions.find((v) => v.language === 'arabicCoptic')?.audio).toBe(coptic.audio);
  });
});

describe('Kiahk Praises & Season > Distribution', () => {
  const service = seasons.find((s) => s.id === 'kiahk')!.services.find((s) => s.id === 'kiahk-distribution')!;

  it('lists only the hymns that are in use, in order', () => {
    expect(service.hymns.map((h) => h.id.replace('kiahk-distribution-hymn-', ''))).toEqual(['1', '2', '3', '4', '6', '7', '8']);
    expect(service.hymns.map((h) => h.title)).not.toContain(
      'The Prayer of the Laying-on of the Hands After the Distribution of the Holy Mysteries'
    );
  });

  it('has Melodies as a group with one melody for each week of Kiahk', () => {
    const melodies = service.hymns.find((h) => h.title === 'Melodies');
    expect(melodies?.children?.map((h) => h.title)).toEqual([
      'Melody for First Week of Kiahk',
      'Melody for Second Week of Kiahk',
      'Melody for Third Week of Kiahk',
      'Melody for Fourth Week of Kiahk',
    ]);
  });

  it('has the lyrics of each melody, with the same number of verses in every version', () => {
    const melodies = service.hymns.find((h) => h.title === 'Melodies')!.children!;
    expect(melodies.map((m) => m.versions.map((v) => v.language))).toEqual(
      melodies.map(() => ['english', 'englishArabic', 'arabic', 'arabicEnglish'])
    );
    // a verse is a paragraph; the melodies have 24, 28, 53 and 26
    expect(melodies.map((m) => m.versions[0].text.split(/\n\s*\n/).length)).toEqual([24, 28, 53, 26]);
    for (const melody of melodies) {
      const counts = melody.versions.map((v) => v.text.split(/\n\s*\n/).length);
      expect(new Set(counts).size).toBe(1);
      // the verses are real paragraphs, not a literal backslash-n
      expect(melody.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    }
  });
});

describe('copticToArabic: Ⲭⲉⲣⲉ', () => {
  it('writes Ⲭⲉⲣⲉ with ش, as it is said', () => {
    expect(copticToArabic('Ⲭⲉⲣⲉ').startsWith('ش')).toBe(true);
    expect(copticToArabic('ⲭⲉⲣⲉ ⲛⲉ').startsWith('ش')).toBe(true);
  });
});
