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

  it('has the lyrics of Exposition on the First Canticle, 15 paragraphs in English and in Arabic', () => {
    const hymn = service.hymns[5];
    expect(hymn.title).toBe('Exposition on the First Canticle');
    const verses = (language: string) => hymn.versions.find((v) => v.language === language)!.text.split(/\n\s*\n/);
    expect(verses('english')).toHaveLength(15);
    expect(verses('arabic')).toHaveLength(15);
    expect(hymn.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
  });

  it('has the lyrics of Adam Psali on the Second Canticle, 29 verses in Coptic, English and Arabic', () => {
    const hymn = service.hymns[6];
    expect(hymn.title).toContain('Adam Psali on the Second Canticle');
    const verses = (language: string) => hymn.versions.find((v) => v.language === language)!.text.split(/\n\s*\n/);
    for (const language of ['coptic', 'english', 'arabic', 'arabicCoptic']) expect(verses(language)).toHaveLength(29);
    expect(verses('english')[28]).toBe('(29/29) O our Master remember us / In Your heavenly kingdom / O Holy Trinity / have mercy upon us.');
    expect(verses('arabic')[0].startsWith('(٢٩/١)')).toBe(true);
    // every verse ends with the same refrain line
    expect(verses('coptic').every((v) => v.endsWith('ⲁ̀ⲅⲓⲁ̀ ⲧ̀ⲣⲓⲁⲥ: ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ ⲏ̀ⲙⲁⲥ.'))).toBe(true);
    expect(hymn.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
  });

  it('has the lyrics of Hymn After Second Canticle, 26 verses in English and in Arabic', () => {
    const hymn = service.hymns[9];
    expect(hymn.title).toBe('Hymn After Second Canticle');
    const verses = (language: string) => hymn.versions.find((v) => v.language === language)!.text.split(/\n\s*\n/);
    expect(verses('english')).toHaveLength(26);
    expect(verses('arabic')).toHaveLength(26);
    expect(verses('english').every((v) => v.endsWith('His mercy endures forever.'))).toBe(true);
    expect(verses('arabic')[25].startsWith('(٢٦/٢٦)')).toBe(true);
    expect(hymn.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
  });

  it('has the lyrics of Exposition on the Second Canticle, 17 paragraphs in English and in Arabic', () => {
    const hymn = service.hymns[10];
    expect(hymn.title).toBe('Exposition on the Second Canticle');
    const verses = (language: string) => hymn.versions.find((v) => v.language === language)!.text.split(/\n\s*\n/);
    expect(verses('english')).toHaveLength(17);
    expect(verses('arabic')).toHaveLength(17);
    expect(verses('english')[16]).toContain('forgiveness of our sins');
    expect(hymn.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
  });

  it('has the lyrics of Adam Psali on Third Canticle, 20 verses in Coptic, English and Arabic', () => {
    const hymn = service.hymns[11];
    expect(hymn.title).toBe('Adam Psali on Third Canticle');
    const verses = (language: string) => hymn.versions.find((v) => v.language === language)!.text.split(/\n\s*\n/);
    for (const language of ['coptic', 'english', 'arabic', 'arabicCoptic']) expect(verses(language)).toHaveLength(20);
    expect(verses('english').every((v) => v.includes('I thank You, O God of Israel: '))).toBe(true);
    expect(verses('coptic')[0]).toContain('Ⲫ̀ⲛⲟⲩϯ');
    expect(verses('coptic')[1]).toContain('Ⲫ̀ϯ');
    expect(verses('arabic')[19].startsWith('(٢٠/٢٠)')).toBe(true);
    expect(hymn.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
  });

  it('has the lyrics of Adam Psali on Third Canticle (English Revised), 20 verses in Coptic, English and Arabic', () => {
    const hymn = service.hymns[12];
    expect(hymn.title).toBe('Adam Psali on Third Canticle (English Revised)');
    const verses = (language: string) => hymn.versions.find((v) => v.language === language)!.text.split(/\n\s*\n/);
    for (const language of ['coptic', 'english', 'arabic', 'arabicCoptic']) expect(verses(language)).toHaveLength(20);
    expect(verses('english').every((v) => v.includes('I thank You O God, of Israel, '))).toBe(true);
    // the overlines are Avva Shenouda's own (U+0305), not U+FE26
    expect(hymn.versions.find((v) => v.language === 'coptic')!.text).not.toContain('︦');
    expect(verses('coptic')[0]).toContain('ⲡⲓⲥ̅ⲗ̅');
    expect(verses('arabic')[19].startsWith('(٢٠/٢٠)')).toBe(true);
    expect(hymn.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
  });

  it('has the lyrics of Kiahk Praise for the Holy Trinity, 20 verses in English and in Arabic', () => {
    const hymn = service.hymns[13];
    expect(hymn.title).toBe('Kiahk Praise for the Holy Trinity');
    const verses = (language: string) => hymn.versions.find((v) => v.language === language)!.text.split(/\n\s*\n/);
    expect(verses('english')).toHaveLength(20);
    expect(verses('arabic')).toHaveLength(20);
    expect(verses('english')[0].startsWith('(1/20) Worship befits the Holy Trinity')).toBe(true);
    expect(verses('arabic')[19].startsWith('(٢٠/٢٠)')).toBe(true);
    expect(hymn.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
  });

  it('has the lyrics of Kiahk Praise for the Holy Trinity (English Revised), with the same Arabic as the first', () => {
    const first = service.hymns[13];
    const hymn = service.hymns[14];
    expect(hymn.title).toBe('Kiahk Praise for the Holy Trinity (English Revised)');
    const text = (h: Hymn, language: string) => h.versions.find((v) => v.language === language)!.text;
    expect(text(hymn, 'english').split(/\n\s*\n/)).toHaveLength(20);
    expect(text(hymn, 'arabic')).toBe(text(first, 'arabic'));
    expect(text(hymn, 'english')).not.toBe(text(first, 'english'));
    // number 18, Hymn After Praise of the Three Young Men: 36 verses, each ending with the same refrain line
    const youths = service.hymns[17];
    expect(youths.title).toBe('Hymn After Praise of the Three Young Men');
    expect(text(youths, 'english').split(/\n\s*\n/)).toHaveLength(36);
    expect(text(youths, 'arabic').split(/\n\s*\n/)).toHaveLength(36);
    expect(text(youths, 'english').split(/\n\s*\n/).every((v) => v.endsWith('Praise Him and exalt Him above all'))).toBe(true);
    expect(text(youths, 'arabic').split(/\n\s*\n/).every((v) => v.endsWith('هوس ايروف آرى هوؤو تشاسف'))).toBe(true);
    expect(youths.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // number 22, Exposition on the Third Canticle: 16 paragraphs in English and in Arabic
    const exposition = service.hymns[21];
    expect(exposition.title).toBe('Exposition on the Third Canticle');
    expect(text(exposition, 'english').split(/\n\s*\n/)).toHaveLength(16);
    expect(text(exposition, 'arabic').split(/\n\s*\n/)).toHaveLength(16);
    expect(text(exposition, 'english')).toContain('King Nebuchadnezzar');
    expect(exposition.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // number 24, Praise for St. Anthony the Great: 21 verses in English and in Arabic
    const anthony = service.hymns[23];
    expect(anthony.title).toBe('Praise for St. Anthony the Great');
    expect(text(anthony, 'english').split(/\n\s*\n/)).toHaveLength(21);
    expect(text(anthony, 'arabic').split(/\n\s*\n/)).toHaveLength(21);
    expect(text(anthony, 'english').split(/\n\s*\n/).every((v) => v.endsWith('Our Father Abba Anthony'))).toBe(true);
    expect(anthony.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // number 25, Praise for St. Maximos and St. Dometios: 18 verses in English and in Arabic
    const maximos = service.hymns[24];
    expect(maximos.title).toBe('Praise for St. Maximos and St. Dometios');
    expect(text(maximos, 'english').split(/\n\s*\n/)).toHaveLength(18);
    expect(text(maximos, 'arabic').split(/\n\s*\n/)).toHaveLength(18);
    expect(text(maximos, 'english')).toContain('Maximos and Dometios');
    expect(maximos.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // number 26, Praise for St. Moses The Strong: 42 verses in English and in Arabic
    const moses = service.hymns[25];
    expect(moses.title).toBe('Praise for St. Moses The Strong');
    expect(text(moses, 'english').split(/\n\s*\n/)).toHaveLength(42);
    expect(text(moses, 'arabic').split(/\n\s*\n/)).toHaveLength(42);
    expect(text(moses, 'english').split(/\n\s*\n/)[41].startsWith('(42/42) The mention of your name')).toBe(true);
    expect(moses.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // number 27, Praise for St. Samuel the Confessor: 30 verses in English and in Arabic
    const samuel = service.hymns[26];
    expect(samuel.title).toBe('Praise for St. Samuel the Confessor');
    expect(text(samuel, 'english').split(/\n\s*\n/)).toHaveLength(30);
    expect(text(samuel, 'arabic').split(/\n\s*\n/)).toHaveLength(30);
    expect(text(samuel, 'english').split(/\n\s*\n/)[29]).toContain('Through the prayers of Abba Samuel');
    expect(samuel.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // number 29, Exposition on the Commemoration of the Saints: 21 paragraphs in English and in Arabic
    const commemoration = service.hymns[28];
    expect(commemoration.title).toBe('Exposition on the Commemoration of the Saints');
    expect(text(commemoration, 'english').split(/\n\s*\n/)).toHaveLength(21);
    expect(text(commemoration, 'arabic').split(/\n\s*\n/)).toHaveLength(21);
    expect(text(commemoration, 'english').endsWith('forever. Amen.')).toBe(true);
    expect(commemoration.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // number 19 was pasted with exactly the same text as number 18
    const another = service.hymns[18];
    expect(another.title).toBe('Another Hymn After Praise of the Three Young Men');
    expect(text(another, 'english')).toBe(text(youths, 'english'));
    expect(text(another, 'arabic')).toBe(text(youths, 'arabic'));
    expect(text(hymn, 'english').split(/\n\s*\n/)[0]).toBe(
      '(1/20) Worship befits the Holy Trinity, • Father, Son, and Holy Spirit. • We worship, praise, and sanctify • the one God, creator of souls. •'
    );
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
