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

describe('Kiahk Praises & Season > Midnight Praises', () => {
  const service = seasons.find((s) => s.id === 'kiahk')!.services.find((s) => s.id === 'kiahk-midnight')!;

  it('lists the 87 titles of the service, in order, with no placeholders left', () => {
    expect(service.hymns).toHaveLength(87);
    expect(service.hymns[0].title).toBe('Holy God');
    expect(service.hymns[86].title).toBe('Conclusion in the presence of the Pope or a Bishop');
    expect(new Set(service.hymns.map((h) => h.id)).size).toBe(87);
    expect(service.hymns.some((h) => /Hymn #\d+$/.test(h.title))).toBe(false);
  });

  it('leaves out the prayers that are not hymns', () => {
    const titles = service.hymns.map((h) => h.title);
    for (const title of ['Antiphonary', 'Introduction To The Creed', 'The Orthodox Creed', 'Holy Holy Holy', 'Our Father', 'The Short Blessing', 'Priest Absolution']) {
      expect(titles).not.toContain(title);
    }
  });

  it('has the same lyrics as Annual Midnight Praises for the hymns that are in both', () => {
    const annual = seasons.find((s) => s.id === 'annual')!.services.find((s) => s.id === 'annual-midnight')!;
    const annualHymns = flattenHymns(annual.hymns);
    const text = (h: Hymn, language: string) => h.versions.find((v) => v.language === language)?.text;
    const pairs: [string, string][] = [
      ['The Second Canticle', 'annual-midnight-second-canticle'],
      ['The Sunday Theotokion (3)', 'annual-midnight-sunday-theotokia-part-3'],
      ['Concluding Hymn', 'annual-midnight-concluding-hymn'],
    ];
    for (const [title, annualId] of pairs) {
      const kiahk = service.hymns.find((h) => h.title === title)!;
      const original = annualHymns.find((h) => h.id === annualId)!;
      expect(text(kiahk, 'coptic')).toBeTruthy();
      expect(text(kiahk, 'coptic')).toBe(text(original, 'coptic'));
      expect(text(kiahk, 'english')).toBe(text(original, 'english'));
      expect(text(kiahk, 'arabic')).toBe(text(original, 'arabic'));
    }
    // the two Theotokion (7)s are different hymns
    const sevens = service.hymns.filter((h) => h.title === 'The Sunday Theotokion (7)');
    expect(sevens).toHaveLength(2);
    expect(text(sevens[0], 'coptic')).not.toBe(text(sevens[1], 'coptic'));
    // a hymn that has no lyrics yet is left for later
    expect(service.hymns.find((h) => h.title === 'Antiphonary')).toBeUndefined();
    expect(service.hymns.find((h) => h.title === 'The First Explanation')?.versions).toEqual([]);
  });

  it('has the lyrics of Holy God, 53 verses in English and in Arabic', () => {
    const holyGod = service.hymns.find((h) => h.title === 'Holy God')!;
    const verses = (language: string) => holyGod.versions.find((v) => v.language === language)!.text.split(/\n\s*\n/);
    expect(verses('english')).toHaveLength(53);
    expect(verses('arabic')).toHaveLength(53);
    expect(verses('english')[0]).toBe('(1/53) Holy God / Holy Mighty / Holy Immortal / Amen Alleluia');
    expect(verses('arabic')[52]).toContain('(٥٣/٥٣)');
    expect(holyGod.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
  });

  it('has the lyrics of Psali Adam on First Canticle, 26 verses in English and in Arabic', () => {
    expect(service.hymns[1].title).toBe('Psali Adam on First Canticle');
    const verses = (language: string) => service.hymns[1].versions.find((v) => v.language === language)!.text.split(/\n\s*\n/);
    expect(verses('english')).toHaveLength(26);
    expect(verses('arabic')).toHaveLength(26);
    expect(verses('english')[0]).toContain('The Lord has reigned');
    expect(service.hymns[1].versions.every((v) => !v.text.includes('\\n'))).toBe(true);
  });

  it('has the lyrics of Hymn after First Canticle, 33 verses in English and in Arabic', () => {
    const hymn = service.hymns[4];
    expect(hymn.title).toBe('Hymn after First Canticle');
    const verses = (language: string) => hymn.versions.find((v) => v.language === language)!.text.split(/\n\s*\n/);
    expect(verses('english')).toHaveLength(33);
    expect(verses('arabic')).toHaveLength(33);
    expect(verses('english')[0]).toContain('The Lord said to Moses');
    expect(hymn.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
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
