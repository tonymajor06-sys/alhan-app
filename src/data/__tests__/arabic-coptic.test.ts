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

  it('lists the 80 titles of the service, in order, with no placeholders left', () => {
    expect(service.hymns).toHaveLength(80);
    expect(service.hymns[0].title).toBe('Holy God');
    expect(service.hymns[79].title).toBe('Conclusion in the presence of the Pope or a Bishop');
    expect(new Set(service.hymns.map((h) => h.id)).size).toBe(80);
    expect(service.hymns.some((h) => /Hymn #\d+$/.test(h.title))).toBe(false);
  });

  it('leaves out the prayers that are not hymns', () => {
    const titles = service.hymns.map((h) => h.title);
    for (const title of ['Antiphonary', 'Introduction To The Creed', 'The Orthodox Creed', 'Holy Holy Holy', 'Our Father', 'The Short Blessing', 'Priest Absolution', 'The Sunday Theotokia']) {
      expect(titles).not.toContain(title);
    }
  });

  it('gives every hymn that has Coptic a Coptic-English and Coptic-Arabic version, and every hymn that has English an Arabic-English one', () => {
    for (const hymn of service.hymns) {
      const languages = hymn.versions.map((v) => v.language);
      if (languages.includes('coptic')) {
        expect([hymn.title, languages.includes('englishCoptic')]).toEqual([hymn.title, true]);
        expect([hymn.title, languages.includes('arabicCoptic')]).toEqual([hymn.title, true]);
        const paragraphs = (language: string) => hymn.versions.find((v) => v.language === language)!.text.split(/\n\s*\n/).length;
        expect([hymn.title, paragraphs('englishCoptic')]).toEqual([hymn.title, paragraphs('coptic')]);
      }
      if (languages.includes('english')) expect([hymn.title, languages.includes('arabicEnglish')]).toEqual([hymn.title, true]);
    }
  });

  it('plays the recording of "I Open my Mouth with Praise" on its English and Arabic versions (and English in Arabic letters)', () => {
    const hymn = service.hymns.find((h) => h.title === 'I Open my Mouth with Praise')!;
    const file = 'kiahk-midnight-i-open-my-mouth-with-praise.mp3';
    expect(hymn.versions.map((v) => [v.language, v.audio])).toEqual([
      ['english', file],
      ['arabic', file],
      ['arabicEnglish', file],
    ]);
    // the recording is in the repo, so it can stream from GitHub once it is pushed
    const nodeFs = jest.requireActual('fs') as { statSync(file: string): { size: number } };
    expect(nodeFs.statSync('assets/audio/' + file).size).toBeGreaterThan(1000000);
    // no other Kiahk Midnight hymn got this recording
    const withThisFile = flattenHymns(service.hymns).filter((h) => h.versions.some((v) => v.audio === file));
    expect(withThisFile.map((h) => h.title)).toEqual(['I Open my Mouth with Praise']);
  });

  it('has the same lyrics as Annual Midnight Praises for the hymns that are in both', () => {
    const annual = seasons.find((s) => s.id === 'annual')!.services.find((s) => s.id === 'annual-midnight')!;
    const annualHymns = flattenHymns(annual.hymns);
    const text = (h: Hymn, language: string) => h.versions.find((v) => v.language === language)?.text;
    const pairs: [string, string][] = [
      ['The Second Canticle', 'annual-midnight-second-canticle'],
      ['The Sunday Theotokion (3)', 'annual-midnight-sunday-theotokia-part-3'],
      ['The Sunday Theotokion (4)', 'annual-midnight-sunday-theotokia-part-4'],
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
    expect(service.hymns.find((h) => h.title === 'Concluding Prayer')?.versions).toEqual([]);
    expect(service.hymns.find((h) => h.title === 'Luke 1: 46-50')).toBeUndefined();
    expect(service.hymns.find((h) => h.title === 'Luke 1:51-55')).toBeUndefined();
    for (const gone of ['Luke 1:68-72', 'Luke 1:73-77', 'Luke 1:78-79', 'Gospel According to St. Luke']) {
      expect(service.hymns.find((h) => h.title === gone)).toBeUndefined();
    }
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

  it('has the lyrics of Exposition on the First Canticle, 14 paragraphs with each English paragraph beside its own Arabic', () => {
    const hymn = service.hymns[5];
    expect(hymn.title).toBe('Exposition on the First Canticle');
    const verses = (language: string) => hymn.versions.find((v) => v.language === language)!.text.split(/\n\s*\n/);
    const english = verses('english');
    const arabic = verses('arabic');
    expect(english).toHaveLength(14);
    expect(arabic).toHaveLength(14);
    // the sentences that were out of step in the paste now sit together
    expect(english[6]).toContain('the waters returned and drowned the Egyptians');
    expect(arabic[6]).toContain('فرجع الماء');
    expect(arabic[6]).toContain('وغرق الجميع');
    expect(english[7]).toContain('walked on the dry land');
    expect(arabic[7]).toContain('يمشون على اليبس');
    expect(english[8]).toContain('like a barrier');
    expect(arabic[8]).toContain('مثل السور');
    expect(english[9]).toContain('When Israel saw this great wonder');
    expect(arabic[9]).toContain('فلما رأي إسرائيل');
    expect(english[10]).toContain('The entire congregation feared the Lord');
    expect(english[10]).toContain('all the people feared the Lord');
    expect(arabic[10]).toContain('فخاف الرب جميع الشعب');
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
    // number 30, Adam Psali on the Fourth Canticle: 24 verses in English and in Arabic
    const fourthCanticlePsali = service.hymns[29];
    expect(fourthCanticlePsali.title).toBe('Adam Psali on the Fourth Canticle (You bore tribulation for me...)');
    expect(text(fourthCanticlePsali, 'english').split(/\n\s*\n/)).toHaveLength(24);
    expect(text(fourthCanticlePsali, 'arabic').split(/\n\s*\n/)).toHaveLength(24);
    expect(text(fourthCanticlePsali, 'english').startsWith('(1/24) You bore tribulation for me')).toBe(true);
    expect(text(fourthCanticlePsali, 'english')).not.toBe(text(commemoration, 'english'));
    expect(fourthCanticlePsali.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // number 40 is now The First Explanation (number 39, The Sunday Theotokia, was removed): 16 verses in English and in Arabic
    const firstExplanation = service.hymns[39];
    expect(firstExplanation.title).toBe('The First Explanation');
    expect(service.hymns[38].title).toBe('The Sunday Theotokion (1)');
    expect(text(firstExplanation, 'english').split(/\n\s*\n/)).toHaveLength(16);
    expect(text(firstExplanation, 'arabic').split(/\n\s*\n/)).toHaveLength(16);
    expect(text(firstExplanation, 'english').startsWith('(1/16) In the Name of God')).toBe(true);
    expect(firstExplanation.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // Conclusion of the Midnight Psalmody: 17 stanzas in Coptic, Coptic-English, English and Arabic
    const psalmodyConclusion = service.hymns.find((h) => h.title === 'Conclusion of the Midnight Psalmody')!;
    for (const language of ['coptic', 'englishCoptic', 'english', 'arabic']) {
      expect(text(psalmodyConclusion, language).split(/\n\s*\n/)).toHaveLength(17);
    }
    expect(text(psalmodyConclusion, 'coptic').startsWith('Ⲁ̀ⲙⲏⲛ.')).toBe(true);
    expect(text(psalmodyConclusion, 'english').startsWith('Amen.')).toBe(true);
    expect(text(psalmodyConclusion, 'coptic')).toContain('Ⲕⲩⲣⲓⲉ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ (ⲅ︦)');
    expect(text(psalmodyConclusion, 'englishCoptic')).toContain('Kurie ele-ēson (3)');
    // the number under the line (ⲅ︦) is written as a number in Arabic letters too, not as the letter gamma
    expect(text(psalmodyConclusion, 'arabicCoptic')).toContain('(٣)');
    expect(text(psalmodyConclusion, 'arabicCoptic')).not.toContain('(ج)');
    expect(psalmodyConclusion.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // Conclusion to the Exposition of the Laborers: one stanza in Coptic, Coptic-English, English and Arabic
    const laborersConclusion = service.hymns.find((h) => h.title === 'Conclusion to the Exposition of the Laborers')!;
    for (const language of ['coptic', 'englishCoptic', 'english', 'arabic']) {
      expect(text(laborersConclusion, language).split(/\n\s*\n/)).toHaveLength(1);
    }
    expect(text(laborersConclusion, 'coptic').startsWith('Ⲡⲭ︦ⲥ︦ ⲡⲉⲛⲥ︦ⲱ︦ⲣ︦')).toBe(true);
    expect(text(laborersConclusion, 'englishCoptic').startsWith('Pi-ekhristos pensōtēr')).toBe(true);
    expect(text(laborersConclusion, 'english').startsWith('O Christ our Savior')).toBe(true);
    // Your Mercies O My God: its own 16 verses
    const yourMercies = service.hymns.find((h) => h.title === 'Your Mercies O My God')!;
    expect(text(yourMercies, 'english').split(/\n\s*\n/)).toHaveLength(16);
    expect(text(yourMercies, 'arabic').split(/\n\s*\n/)).toHaveLength(16);
    expect(text(yourMercies, 'english').startsWith('(1/16) Your mercies O my God')).toBe(true);
    expect(yourMercies.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // Exposition on "Your Mercies, O my God": 17 paragraphs
    const mercyExposition = service.hymns.find((h) => h.title === 'Exposition on "Your Mercies, O my God"')!;
    expect(text(mercyExposition, 'english').split(/\n\s*\n/)).toHaveLength(17);
    expect(text(mercyExposition, 'arabic').split(/\n\s*\n/)).toHaveLength(17);
    expect(text(mercyExposition, 'english').startsWith('Your mercies, O my God, are countless.')).toBe(true);
    expect(mercyExposition.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // Exposition of the Laborers: its own 22 verses
    const laborers = service.hymns.find((h) => h.title === 'Exposition of the Laborers')!;
    expect(text(laborers, 'english').split(/\n\s*\n/)).toHaveLength(22);
    expect(text(laborers, 'arabic').split(/\n\s*\n/)).toHaveLength(22);
    expect(text(laborers, 'english').startsWith('(1/22) The Master of the vineyard')).toBe(true);
    expect(laborers.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // The Sunday Theotokion (14): the pasted text (14 stanzas in Coptic, English and Arabic), not the Annual Midnight copy
    const theotokion14 = service.hymns.find((h) => h.title === 'The Sunday Theotokion (14)')!;
    for (const language of ['coptic', 'english', 'arabic']) {
      expect(text(theotokion14, language).split(/\n\s*\n/)).toHaveLength(14);
    }
    expect(text(theotokion14, 'coptic').startsWith('Ⲁⲕⲥⲟⲗⲥⲉⲗ')).toBe(true);
    expect(text(theotokion14, 'english').startsWith('You decorated our souls')).toBe(true);
    expect(theotokion14.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // The Sunday Theotokion (13): the pasted text (7 stanzas in Coptic, English and Arabic), not the Annual Midnight copy
    const theotokion13 = service.hymns.find((h) => h.title === 'The Sunday Theotokion (13)')!;
    for (const language of ['coptic', 'english', 'arabic']) {
      expect(text(theotokion13, language).split(/\n\s*\n/)).toHaveLength(7);
    }
    expect(text(theotokion13, 'coptic').startsWith('Ⲟⲩⲥ̀ⲕⲏⲛⲏ ⲙ̀ⲙⲏⲓ')).toBe(true);
    expect(text(theotokion13, 'english').startsWith('A true tabernacle')).toBe(true);
    expect(theotokion13.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // The Sunday Theotokion (12): the pasted text (5 stanzas in Coptic, English and Arabic), not the Annual Midnight copy
    const theotokion12 = service.hymns.find((h) => h.title === 'The Sunday Theotokion (12)')!;
    for (const language of ['coptic', 'english', 'arabic']) {
      expect(text(theotokion12, language).split(/\n\s*\n/)).toHaveLength(5);
    }
    expect(text(theotokion12, 'coptic').startsWith('Ⲡⲉⲱ̀ⲟⲩ Ⲙⲁⲣⲓⲁ')).toBe(true);
    expect(text(theotokion12, 'english').startsWith('Your glory O Mary')).toBe(true);
    expect(theotokion12.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // The Sunday Theotokion (11): the pasted text (4 stanzas in Coptic, English and Arabic), not the Annual Midnight copy
    const theotokion11 = service.hymns.find((h) => h.title === 'The Sunday Theotokion (11)')!;
    for (const language of ['coptic', 'english', 'arabic']) {
      expect(text(theotokion11, language).split(/\n\s*\n/)).toHaveLength(4);
    }
    expect(text(theotokion11, 'coptic').startsWith('Ⲣⲁⲛ ⲛⲓⲃⲉⲛ ⲉⲧϭⲟⲥⲓ')).toBe(true);
    expect(text(theotokion11, 'english').startsWith('All the high names')).toBe(true);
    expect(text(theotokion11, 'arabic')).not.toContain('+');
    expect(theotokion11.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // The Sunday Theotokion (10): 6 stanzas in Coptic, English and Arabic
    const theotokion10 = service.hymns.find((h) => h.title === 'The Sunday Theotokion (10)')!;
    for (const language of ['coptic', 'english', 'arabic']) {
      expect(text(theotokion10, language).split(/\n\s*\n/)).toHaveLength(6);
    }
    expect(text(theotokion10, 'coptic').startsWith('Ⲧⲉⲟⲓ ⲛ̀ϩⲓⲕⲁⲛⲟⲥ')).toBe(true);
    expect(text(theotokion10, 'english').startsWith('You are more worthy')).toBe(true);
    expect(theotokion10.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // I Praise the Virgin: its own 33 verses (every few verses the refrain comes back)
    const praiseVirgin = service.hymns.find((h) => h.title === 'I Praise the Virgin')!;
    expect(text(praiseVirgin, 'english').split(/\n\s*\n/)).toHaveLength(33);
    expect(text(praiseVirgin, 'arabic').split(/\n\s*\n/)).toHaveLength(33);
    expect(text(praiseVirgin, 'english').startsWith('(1/33) I praise the Virgin')).toBe(true);
    expect(praiseVirgin.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // You are Worthy: its own 24 verses
    const youAreWorthy = service.hymns.find((h) => h.title === 'You are Worthy')!;
    expect(text(youAreWorthy, 'english').split(/\n\s*\n/)).toHaveLength(24);
    expect(text(youAreWorthy, 'arabic').split(/\n\s*\n/)).toHaveLength(24);
    expect(text(youAreWorthy, 'english').startsWith('(1/24) I praise with power')).toBe(true);
    expect(youAreWorthy.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // Exposition on You are Called: 7 paragraphs (Rejoice litany)
    const youAreCalledExposition = service.hymns.find((h) => h.title === 'Exposition on You are Called')!;
    expect(text(youAreCalledExposition, 'english').split(/\n\s*\n/)).toHaveLength(7);
    expect(text(youAreCalledExposition, 'arabic').split(/\n\s*\n/)).toHaveLength(7);
    expect(text(youAreCalledExposition, 'english').startsWith('My weak and sinful tongue')).toBe(true);
    expect(youAreCalledExposition.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // O Daughter of David: its own 56 verses
    const daughterOfDavid = service.hymns.find((h) => h.title === 'O Daughter of David')!;
    expect(text(daughterOfDavid, 'english').split(/\n\s*\n/)).toHaveLength(56);
    expect(text(daughterOfDavid, 'arabic').split(/\n\s*\n/)).toHaveLength(56);
    expect(text(daughterOfDavid, 'english').startsWith('(1/56) O daughter of David')).toBe(true);
    expect(daughterOfDavid.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // O Mary: its own 24 verses (the English carries the (n/24) numbers, the Arabic has none)
    const oMary = service.hymns.find((h) => h.title === 'O Mary')!;
    expect(text(oMary, 'english').split(/\n\s*\n/)).toHaveLength(24);
    expect(text(oMary, 'arabic').split(/\n\s*\n/)).toHaveLength(24);
    expect(text(oMary, 'english').startsWith('(1/24) O Mary / Lady of virgins')).toBe(true);
    expect(oMary.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // Rejoice O Mary: its own 15 verses
    const rejoiceOMary = service.hymns.find((h) => h.title === 'Rejoice O Mary')!;
    expect(text(rejoiceOMary, 'english').split(/\n\s*\n/)).toHaveLength(15);
    expect(text(rejoiceOMary, 'arabic').split(/\n\s*\n/)).toHaveLength(15);
    expect(text(rejoiceOMary, 'english').startsWith('(1/15) Rejoice O Mary: Adam became')).toBe(true);
    expect(rejoiceOMary.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // Exposition on Seven Times Every Day: 12 paragraphs (Hail to you, O Mary litany)
    const sevenTimes = service.hymns.find((h) => h.title === 'Exposition on Seven Times Every Day')!;
    expect(text(sevenTimes, 'english').split(/\n\s*\n/)).toHaveLength(12);
    expect(text(sevenTimes, 'arabic').split(/\n\s*\n/)).toHaveLength(12);
    expect(text(sevenTimes, 'english').startsWith('Come, O faithful, to praise Christ')).toBe(true);
    expect(sevenTimes.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // Kiahk Melody on Eighth Part of Sunday Theotokia: its own 24 verses (Hail to you Mary)
    const eighthMelody = service.hymns.find((h) => h.title === 'Kiahk Melody on Eighth Part of Sunday Theotokia')!;
    expect(text(eighthMelody, 'english').split(/\n\s*\n/)).toHaveLength(24);
    expect(text(eighthMelody, 'arabic').split(/\n\s*\n/)).toHaveLength(24);
    expect(text(eighthMelody, 'english').startsWith('(1/24) Hail to you Mary: I start my praise')).toBe(true);
    expect(eighthMelody.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // The Seventh Explanation: its own 14 verses (Moses' dome, the golden vessel)
    const seventhExplanation = service.hymns.find((h) => h.title === 'The Seventh Explanation')!;
    expect(text(seventhExplanation, 'english').split(/\n\s*\n/)).toHaveLength(14);
    expect(text(seventhExplanation, 'arabic').split(/\n\s*\n/)).toHaveLength(14);
    expect(text(seventhExplanation, 'english').startsWith('(1/14) O Theotokos')).toBe(true);
    expect(seventhExplanation.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // Exposition on the Second "You are Called": 8 paragraphs (Rejoice litany)
    const youAreCalledSecond = service.hymns.find((h) => h.title === 'Exposition on the Second "You are Called"')!;
    expect(text(youAreCalledSecond, 'english').split(/\n\s*\n/)).toHaveLength(8);
    expect(text(youAreCalledSecond, 'arabic').split(/\n\s*\n/)).toHaveLength(8);
    expect(text(youAreCalledSecond, 'english').startsWith('Blessed are You, O Mary the Virgin')).toBe(true);
    expect(youAreCalledSecond.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // Exposition on First "You are Called": 8 paragraphs (second dome, censer)
    const youAreCalledFirst = service.hymns.find((h) => h.title === 'Exposition on First "You are Called"')!;
    expect(text(youAreCalledFirst, 'english').split(/\n\s*\n/)).toHaveLength(8);
    expect(text(youAreCalledFirst, 'arabic').split(/\n\s*\n/)).toHaveLength(8);
    expect(text(youAreCalledFirst, 'english').startsWith('You are called, O Virgin Mary, the second dome')).toBe(true);
    expect(youAreCalledFirst.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // The Sixth Explanation: its own 16 verses (the censer)
    const sixthExplanation = service.hymns.find((h) => h.title === 'The Sixth Explanation')!;
    expect(text(sixthExplanation, 'english').split(/\n\s*\n/)).toHaveLength(16);
    expect(text(sixthExplanation, 'arabic').split(/\n\s*\n/)).toHaveLength(16);
    expect(text(sixthExplanation, 'english').startsWith('(1/16) The aroma spread')).toBe(true);
    expect(sixthExplanation.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // The Fifth Explanation: its own 16 verses (the lampstand)
    const fifthExplanation = service.hymns.find((h) => h.title === 'The Fifth Explanation')!;
    expect(text(fifthExplanation, 'english').split(/\n\s*\n/)).toHaveLength(16);
    expect(text(fifthExplanation, 'arabic').split(/\n\s*\n/)).toHaveLength(16);
    expect(text(fifthExplanation, 'english').startsWith('(1/16) God spoke to Moses')).toBe(true);
    expect(fifthExplanation.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // The Fourth Explanation: its own 16 verses (the golden vessel)
    const fourthExplanation = service.hymns.find((h) => h.title === 'The Fourth Explanation')!;
    expect(text(fourthExplanation, 'english').split(/\n\s*\n/)).toHaveLength(16);
    expect(text(fourthExplanation, 'arabic').split(/\n\s*\n/)).toHaveLength(16);
    expect(text(fourthExplanation, 'english').startsWith('(1/16) O golden vessel')).toBe(true);
    expect(fourthExplanation.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // The Third Explanation: its own 16 verses (Mary as the altar and table of showbread)
    const thirdExplanation = service.hymns.find((h) => h.title === 'The Third Explanation')!;
    // number 45 before "Luke 1:51-55" (number 43) was removed, so number 44 now
    expect(service.hymns[43]).toBe(thirdExplanation);
    expect(text(thirdExplanation, 'english').split(/\n\s*\n/)).toHaveLength(16);
    expect(text(thirdExplanation, 'arabic').split(/\n\s*\n/)).toHaveLength(16);
    expect(text(thirdExplanation, 'english').startsWith('(1/16) Mary you became')).toBe(true);
    expect(thirdExplanation.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // The Second Explanation: its own 16 verses (the ark of the covenant), different from The First Explanation
    const secondExplanation = service.hymns.find((h) => h.title === 'The Second Explanation')!;
    expect(text(secondExplanation, 'english').split(/\n\s*\n/)).toHaveLength(16);
    expect(text(secondExplanation, 'arabic').split(/\n\s*\n/)).toHaveLength(16);
    expect(text(secondExplanation, 'english').startsWith('(1/16) The Lord told Moses')).toBe(true);
    expect(text(secondExplanation, 'english')).not.toBe(text(firstExplanation, 'english'));
    expect(secondExplanation.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // number 37, Adam Psali on "You are Called": 24 verses, each ending with the same refrain line
    const youAreCalled = service.hymns[36];
    expect(youAreCalled.title).toContain('You are Called');
    expect(text(youAreCalled, 'english').split(/\n\s*\n/)).toHaveLength(24);
    expect(text(youAreCalled, 'arabic').split(/\n\s*\n/)).toHaveLength(24);
    expect(text(youAreCalled, 'english').split(/\n\s*\n/).every((v) => v.endsWith('Mary the Virgin.'))).toBe(true);
    expect(text(youAreCalled, 'arabic').split(/\n\s*\n/).every((v) => v.endsWith('مريم العذراء.'))).toBe(true);
    expect(youAreCalled.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // number 36, I Open my Mouth with Praise: 52 verses in English and in Arabic
    const openMouth = service.hymns[35];
    expect(openMouth.title).toBe('I Open my Mouth with Praise');
    expect(text(openMouth, 'english').split(/\n\s*\n/)).toHaveLength(52);
    expect(text(openMouth, 'arabic').split(/\n\s*\n/)).toHaveLength(52);
    expect(text(openMouth, 'english').split(/\n\s*\n/)[51].startsWith('(52/52) We ask You O Our King')).toBe(true);
    expect(openMouth.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // number 34, Adam Praise on Sunday Psali Aikoti: 29 verses, each ending with the same refrain line
    const aikotiPraise = service.hymns[33];
    expect(aikotiPraise.title).toBe('Adam Praise on Sunday Psali Aikoti');
    expect(text(aikotiPraise, 'english').split(/\n\s*\n/)).toHaveLength(29);
    expect(text(aikotiPraise, 'arabic').split(/\n\s*\n/)).toHaveLength(29);
    expect(text(aikotiPraise, 'english').split(/\n\s*\n/).every((v) => v.endsWith('Hail to you O Mary'))).toBe(true);
    expect(text(aikotiPraise, 'arabic').split(/\n\s*\n/).every((v) => v.endsWith('السلام لك يا مريم'))).toBe(true);
    expect(aikotiPraise.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // number 33, Adam Psali before Aikotee: 32 verses in English and in Arabic
    const aikotee = service.hymns[32];
    expect(aikotee.title).toBe('Adam Psali before Aikotee');
    expect(text(aikotee, 'english').split(/\n\s*\n/)).toHaveLength(32);
    expect(text(aikotee, 'arabic').split(/\n\s*\n/)).toHaveLength(32);
    expect(text(aikotee, 'english').startsWith('(1/32) I sought after You')).toBe(true);
    expect(aikotee.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // number 32, Exposition on the Fourth Canticle: 6 paragraphs in English and in Arabic
    const fourthCanticleExposition = service.hymns[31];
    expect(fourthCanticleExposition.title).toBe('Exposition on the Fourth Canticle');
    expect(text(fourthCanticleExposition, 'english').split(/\n\s*\n/)).toHaveLength(6);
    expect(text(fourthCanticleExposition, 'arabic').split(/\n\s*\n/)).toHaveLength(6);
    expect(text(fourthCanticleExposition, 'english')).toContain('ten stringed harp of David');
    expect(text(fourthCanticleExposition, 'english')).not.toBe(text(commemoration, 'english'));
    expect(fourthCanticleExposition.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    // number 19, Another Hymn After Praise of the Three Young Men: 36 English verses (no Arabic given yet)
    const another = service.hymns[18];
    expect(another.title).toBe('Another Hymn After Praise of the Three Young Men');
    expect(text(another, 'english').split(/\n\s*\n/)).toHaveLength(36);
    expect(text(another, 'english').split(/\n\s*\n/).every((v) => v.endsWith('Praise Him and exalt Him above all.'))).toBe(true);
    expect(text(another, 'english')).not.toBe(text(youths, 'english'));
    expect(another.versions.some((v) => v.language === 'arabic')).toBe(false);
    expect(another.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    expect(text(hymn, 'english').split(/\n\s*\n/)[0]).toBe(
      '(1/20) Worship befits the Holy Trinity, • Father, Son, and Holy Spirit. • We worship, praise, and sanctify • the one God, creator of souls. •'
    );
    expect(hymn.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
  });
});

describe('Kiahk Praises & Season > Matins', () => {
  const service = seasons.find((s) => s.id === 'kiahk')!.services.find((s) => s.id === 'kiahk-matins')!;

  it('lists only the titles, in order, with the Doxologies as a divider and no lyrics yet', () => {
    expect(service.hymns.map((h) => h.title)).toEqual([
      'Verses of the Cymbals',
      'Doxologies',
      'Ϧⲉⲛ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ (Introduction to the Doxologies)',
      'Ⲕⲉ ⲅⲁⲣ ⲁⲓϣⲁⲛⲥⲁϫⲓ (First Doxology for Kiahk)',
      'Ⲉ̀ⲣⲉ ⲡ̀ⲥⲟⲗⲥⲉⲗ ⲛ̀Ϯⲡⲁⲣⲑⲉⲛⲟⲥ (Second Doxology for Kiahk)',
      'Ⲅⲁⲃⲓⲣⲏⲗ ⲡⲓⲁⲅⲅⲉⲗⲟⲥ (Third Doxology for Kiahk)',
      'Ϧⲉⲛ ⲡⲓⲁ̀ⲃⲟⲧ (Fourth Doxology for Kiahk)',
      'Ⲉ̀ⲧⲁ ⲡⲓⲱⲡ (Fifth Doxology for Kiahk)',
      'Ϥ̀ⲉⲙⲡ̀ϣⲁ ⲅⲁⲣ (Sixth Doxology for Kiahk)',
      'Ⲛ̀ⲑⲟⲕ ⲟⲩⲛⲓϣϯ (Kiahk Doxology for Archangel Gabriel)',
      'Ϣⲱⲡⲓ Ⲛ̀ⲑⲟ (The Conclusion of the Doxologies)',
      '',
      'Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ',
      'Ⲥⲱⲧⲉⲙ ⲧⲁϣⲉⲣⲓ (Psalm Trailer)',
      'Ⲧⲉⲛϯ ⲛⲉ ⲙ̀ⲡⲓⲭⲉⲣⲉⲧⲓⲥⲙⲟⲥ (Gospel Response)',
      'Ⲧⲉⲛϭⲓⲥⲓ ⲙ̀ⲙⲟ ϧⲉⲛ ⲟⲩⲉⲙⲡ̀ϣⲁ (Gospel Response)',
      'Concluding Hymn',
    ]);
    // two dividers: "Doxologies" and a blank one after the Conclusion of the Doxologies
    expect(service.hymns.filter((h) => h.isSectionHeader).map((h) => h.title)).toEqual(['Doxologies', '']);
    const dividers = service.hymns.map((h, i) => (h.isSectionHeader ? i : -1)).filter((i) => i >= 0);
    expect(dividers).toEqual([1, 11]);
    // the Verses of the Cymbals open a list of two titles
    expect(service.hymns[0].children?.map((h) => h.title)).toEqual(['Ⲧⲉⲛⲟⲩⲱϣⲧ ⲙ̀Ⲫⲓⲱⲧ ⲛⲉⲙ Ⲡϣⲏⲣⲓ', 'Ⲁⲙⲱⲓⲛⲓ ⲙⲁⲣⲉⲛⲟⲩⲱϣⲧ']);
    const [fatherSon, come] = service.hymns[0].children!;
    const text = (h: Hymn, language: string) => h.versions.find((v) => v.language === language)?.text ?? '';
    const stanzasOf = (h: Hymn, language: string) => text(h, language).split(/\n\s*\n/);
    for (const [hymn, count] of [[fatherSon, 19], [come, 21]] as [Hymn, number][]) {
      for (const language of ['coptic', 'englishCoptic', 'english', 'arabic', 'arabicCoptic', 'arabicEnglish']) {
        expect([hymn.title, language, stanzasOf(hymn, language).length]).toEqual([hymn.title, language, count]);
      }
      expect(hymn.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    }
    expect(stanzasOf(fatherSon, 'coptic').slice(0, 2)).toEqual([
      'Ⲕⲩⲣⲓⲉ ⲉ̀ⲗⲉⲏ̀ⲥⲟⲛ.',
      'Ⲧⲉⲛⲟⲩⲱϣⲧ ⲙ̀Ⲫⲓⲱⲧ ⲛⲉⲙ Ⲡϣⲏⲣⲓ: ⲛⲉⲙ Ⲡⲓⲡ̀ⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ: Ϯⲧⲣⲓⲁⲥ ⲉⲑⲟⲩⲁⲃ: ⲛ̀ⲟ̀ⲙⲟⲟⲩⲥⲓⲟⲥ.',
    ]);
    expect(stanzasOf(fatherSon, 'english')[1]).toBe('We worship the Father and the Son, and the Holy Spirit, the holy and co-essential, Trinity.');
    expect(stanzasOf(come, 'english')[1]).toBe('O come let us worship, the Holy Trinity, the Father and the Son, and the Holy Spirit.');
    // the last 16 stanzas, from "Hail to you O Mary, the beautiful dove" on, are the same in both hymns
    for (const language of ['coptic', 'english', 'arabic']) {
      expect(stanzasOf(fatherSon, language).slice(-16)).toEqual(stanzasOf(come, language).slice(-16));
    }
    // the shortened "my Lord" (ⲡⲁⲟ︦ⲥ︦) is written out in English and Arabic letters
    expect(text(fatherSon, 'englishCoptic')).toContain('patshois epouro Ge-ōrgios');
    expect(text(fatherSon, 'arabicCoptic')).toContain('پاتشُيس إپورُ');
    expect(new Set(service.hymns.map((h) => h.id)).size).toBe(service.hymns.length);
    // the Introduction and the Conclusion of the Doxologies are copied from Annual Matins, the first two Kiahk doxologies have their own lyrics
    const writtenHere = [
      'Ⲕⲉ ⲅⲁⲣ ⲁⲓϣⲁⲛⲥⲁϫⲓ (First Doxology for Kiahk)',
      'Ⲉ̀ⲣⲉ ⲡ̀ⲥⲟⲗⲥⲉⲗ ⲛ̀Ϯⲡⲁⲣⲑⲉⲛⲟⲥ (Second Doxology for Kiahk)',
      'Ⲅⲁⲃⲓⲣⲏⲗ ⲡⲓⲁⲅⲅⲉⲗⲟⲥ (Third Doxology for Kiahk)',
      'Ϧⲉⲛ ⲡⲓⲁ̀ⲃⲟⲧ (Fourth Doxology for Kiahk)',
      'Ⲉ̀ⲧⲁ ⲡⲓⲱⲡ (Fifth Doxology for Kiahk)',
      'Ϥ̀ⲉⲙⲡ̀ϣⲁ ⲅⲁⲣ (Sixth Doxology for Kiahk)',
      'Ⲛ̀ⲑⲟⲕ ⲟⲩⲛⲓϣϯ (Kiahk Doxology for Archangel Gabriel)',
      'Ⲥⲱⲧⲉⲙ ⲧⲁϣⲉⲣⲓ (Psalm Trailer)',
      'Ⲧⲉⲛϯ ⲛⲉ ⲙ̀ⲡⲓⲭⲉⲣⲉⲧⲓⲥⲙⲟⲥ (Gospel Response)',
      'Concluding Hymn',
      'Ⲧⲉⲛϭⲓⲥⲓ ⲙ̀ⲙⲟ ϧⲉⲛ ⲟⲩⲉⲙⲡ̀ϣⲁ (Gospel Response)',
    ];
    const copied = ['Ϧⲉⲛ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ (Introduction to the Doxologies)', 'Ϣⲱⲡⲓ Ⲛ̀ⲑⲟ (The Conclusion of the Doxologies)'];
    for (const hymn of service.hymns) {
      if (copied.includes(hymn.title) || writtenHere.includes(hymn.title)) expect(hymn.versions.length).toBeGreaterThan(0);
      else expect([hymn.title, hymn.versions.length]).toEqual([hymn.title, 0]);
    }
    const annualMatins = seasons.find((s) => s.id === 'annual')!.services.find((s) => s.id === 'annual-matins')!;
    const baseLanguages = ['coptic', 'englishCoptic', 'english', 'arabic'];
    for (const [title, annualId] of [[copied[0], 'annual-matins-intro-doxologies'], [copied[1], 'annual-matins-doxology-conclusion']]) {
      const kiahk = service.hymns.find((h) => h.title === title)!;
      const original = annualMatins.hymns.find((h) => h.id === annualId)!;
      for (const language of baseLanguages) {
        const text = (h: Hymn) => h.versions.find((v) => v.language === language)?.text;
        expect([title, language, text(kiahk)]).toEqual([title, language, text(original)]);
        expect(text(kiahk)).toBeTruthy();
      }
      expect(kiahk.versions.some((v) => v.language === 'arabicCoptic')).toBe(true);
      expect(kiahk.versions.some((v) => v.language === 'arabicEnglish')).toBe(true);
    }
    // the First and Second Doxology for Kiahk: Coptic, Coptic-English, English and Arabic, in stanzas
    const doxText = (h: Hymn, language: string) => h.versions.find((v) => v.language === language)?.text ?? '';
    const firstDoxology = service.hymns.find((h) => h.title === writtenHere[0])!;
    const secondDoxology = service.hymns.find((h) => h.title === writtenHere[1])!;
    const [thirdDoxology, fourthDoxology, fifthDoxology] = [2, 3, 4].map((i) => service.hymns.find((h) => h.title === writtenHere[i])!);
    const [sixthDoxology, gabrielDoxology, psalmTrailer, gospelResponse, concludingHymn, gospelResponseTwo] = [5, 6, 7, 8, 9, 10].map(
      (i) => service.hymns.find((h) => h.title === writtenHere[i])!
    );
    const doxologies = [
      [firstDoxology, 12],
      [secondDoxology, 8],
      [thirdDoxology, 12],
      [fourthDoxology, 6],
      [fifthDoxology, 12],
      [sixthDoxology, 36],
      [gabrielDoxology, 6],
      [psalmTrailer, 1],
      [gospelResponse, 3],
      [concludingHymn, 3],
      [gospelResponseTwo, 3],
    ] as [Hymn, number][];
    for (const [hymn, count] of doxologies) {
      for (const language of ['coptic', 'englishCoptic', 'english', 'arabic', 'arabicCoptic', 'arabicEnglish']) {
        expect([hymn.title, language, doxText(hymn, language).split(/\n\s*\n/).length]).toEqual([hymn.title, language, count]);
      }
      expect(hymn.versions.every((v) => !v.text.includes('\\n'))).toBe(true);
    }
    expect(doxText(firstDoxology, 'english').startsWith('For when I speak about you')).toBe(true);
    expect(doxText(firstDoxology, 'coptic').startsWith('Ⲕⲉ ⲅⲁⲣ ⲁⲓϣⲁⲛⲥⲁϫⲓ ⲉⲑⲃⲏϯ')).toBe(true);
    expect(doxText(secondDoxology, 'english').startsWith('The adornment of the Virgin')).toBe(true);
    expect(doxText(secondDoxology, 'coptic').startsWith('Ⲉ̀ⲣⲉ ⲡ̀ⲥⲟⲗⲥⲉⲗ ⲛ̀Ϯⲡⲁⲣⲑⲉⲛⲟⲥ')).toBe(true);
    expect(doxText(thirdDoxology, 'english').startsWith('Gabriel the angel: announced to the Virgin')).toBe(true);
    expect(doxText(thirdDoxology, 'coptic').startsWith('Ⲅⲁⲃⲓⲣⲏⲗ ⲡⲓⲁⲅⲅⲉⲗⲟⲥ')).toBe(true);
    expect(doxText(fourthDoxology, 'english').startsWith('On the sixth month')).toBe(true);
    expect(doxText(fourthDoxology, 'coptic').startsWith('Ϧⲉⲛ ⲡⲓⲁ̀ⲃⲟⲧ')).toBe(true);
    expect(doxText(fifthDoxology, 'english').startsWith('When the lot fell on Zacharias')).toBe(true);
    expect(doxText(fifthDoxology, 'coptic').startsWith('Ⲉ̀ⲧⲁ ⲡⲓⲱⲡ')).toBe(true);
    expect(doxText(sixthDoxology, 'english').startsWith('For truly it is: meet and right')).toBe(true);
    expect(doxText(sixthDoxology, 'coptic').startsWith('Ϥ̀ⲉⲙⲡ̀ϣⲁ ⲅⲁⲣ')).toBe(true);
    expect(doxText(gabrielDoxology, 'english').startsWith('You are truly great')).toBe(true);
    expect(doxText(gabrielDoxology, 'coptic').startsWith('Ⲛ̀ⲑⲟⲕ ⲟⲩⲛⲓϣϯ')).toBe(true);
    // the Psalm Trailer is one stanza (Psalm 45: Listen, O daughter)
    expect(doxText(psalmTrailer, 'english').startsWith('Listen, O daughter, behold, and incline your ear')).toBe(true);
    expect(doxText(psalmTrailer, 'coptic').startsWith('Ⲥⲱⲧⲉⲙ ⲧⲁϣⲉⲣⲓ ⲁ̀ⲛⲁⲩ ⲣⲉⲕ ⲡⲉⲙⲁϣϫ')).toBe(true);
    expect(doxText(psalmTrailer, 'arabic').startsWith('اسمعي يا ابنتي وانظري')).toBe(true);
    expect(doxText(psalmTrailer, 'english')).not.toBe(doxText(gospelResponse, 'english'));
    expect(doxText(gospelResponse, 'english').startsWith('We send you greetings, with Gabriel the angel')).toBe(true);
    expect(doxText(gospelResponse, 'coptic').startsWith('Ⲧⲉⲛϯ ⲛⲉ ⲙ̀ⲡⲓⲭⲉⲣⲉⲧⲓⲥⲙⲟⲥ')).toBe(true);
    // the second Gospel Response comes right after the first; its last two stanzas are the same as the first one's
    const matinsTitles = service.hymns.map((h) => h.title);
    expect(matinsTitles.indexOf(writtenHere[10])).toBe(matinsTitles.indexOf(writtenHere[8]) + 1);
    expect(doxText(gospelResponseTwo, 'english').startsWith('We exalt you worthily, with Elizabeth your cousin')).toBe(true);
    expect(doxText(gospelResponseTwo, 'coptic').startsWith('Ⲧⲉⲛϭⲓⲥⲓ ⲙ̀ⲙⲟ ϧⲉⲛ ⲟⲩⲉⲙⲡ̀ϣⲁ')).toBe(true);
    for (const language of ['coptic', 'english', 'arabic']) {
      expect(doxText(gospelResponseTwo, language).split(/\n\s*\n/).slice(1)).toEqual(doxText(gospelResponse, language).split(/\n\s*\n/).slice(1));
    }
    // the Concluding Hymn: Amen Alleluia / We proclaim and say / Lord have mercy, with "our Lord Jesus Christ" written out
    expect(doxText(concludingHymn, 'english').startsWith('Amen. Allelluia. Glory to the Father')).toBe(true);
    expect(doxText(concludingHymn, 'coptic').startsWith('Ⲁⲙⲏⲛ: ⲁⲗⲗⲏⲗⲟⲩⲓⲁ ⲇⲟⲝⲁ')).toBe(true);
    expect(doxText(concludingHymn, 'englishCoptic')).toContain('ō Pentshois Iēsous Pi-ekhristos');
    expect(doxText(concludingHymn, 'english').split(/\n\s*\n/)[2]).toBe(
      'Lord have mercy. Lord have mercy. Lord bless us. Amen. Bless me, bless me. Behold, my repentance. Forgive me. Say the blessing.'
    );
    // the shortened words in the Sixth Doxology (ⲡⲟ︦ⲥ︦, ⲛ̀ⲛⲏⲉⲑ︦ⲩ︦, Ⲡⲡ︦ⲛ︦ⲁ) are written out in English and Arabic letters
    expect(doxText(sixthDoxology, 'englishCoptic')).toContain('Eptshois fēetshop khen tfe');
    expect(doxText(sixthDoxology, 'englishCoptic')).toContain('ennēethouab');
    expect(doxText(sixthDoxology, 'arabicCoptic')).toContain('خِن روو إنّيإثواب');
    // there are no recordings in Kiahk Matins, not even on the copied Introduction and Conclusion
    for (const hymn of flattenHymns(service.hymns)) {
      for (const version of hymn.versions) expect([hymn.title, version.language, version.audio]).toEqual([hymn.title, version.language, undefined]);
    }
  });
});

describe('Kiahk Praises & Season > Vespers', () => {
  const season = seasons.find((s) => s.id === 'kiahk')!;
  const matins = season.services.find((s) => s.id === 'kiahk-matins')!;
  const vespers = season.services.find((s) => s.id === 'kiahk-vespers')!;
  const isPsalmTrailer = (h: Hymn) => h.title.endsWith('(Psalm Trailer)');

  it('has every title of Matins in the same order, except the Psalm Trailer', () => {
    expect(matins.hymns.some(isPsalmTrailer)).toBe(true);
    // Vespers has a Psalm Trailer of its own instead, right after the Alleluia
    const vespersOwn = vespers.hymns.filter(isPsalmTrailer);
    expect(vespersOwn.map((h) => h.title)).toEqual(['Ⲡϭⲟⲓⲥ ⲁⲓⲟϣ ⲟⲩⲃⲏⲕ ⲥⲱⲧⲉⲙ ⲉ̀ⲣⲟⲓ (Psalm Trailer)']);
    const vespersTitles = vespers.hymns.map((h) => h.title);
    expect(vespersTitles.indexOf(vespersOwn[0].title)).toBe(vespersTitles.indexOf('Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ') + 1);
    expect(vespersTitles.indexOf(vespersOwn[0].title) + 1).toBe(vespersTitles.indexOf('Ⲧⲉⲛϯ ⲛⲉ ⲙ̀ⲡⲓⲭⲉⲣⲉⲧⲓⲥⲙⲟⲥ (Gospel Response)'));
    const others = vespers.hymns.filter((h) => !isPsalmTrailer(h));
    expect(others.map((h) => h.title)).toEqual(matins.hymns.filter((h) => !isPsalmTrailer(h)).map((h) => h.title));
    expect(others.map((h) => !!h.isSectionHeader)).toEqual(matins.hymns.filter((h) => !isPsalmTrailer(h)).map((h) => !!h.isSectionHeader));
    // its lyrics: Psalm 141, two stanzas in Coptic, Coptic-English, English and Arabic
    const trailer = vespersOwn[0];
    const trailerStanzas = (language: string) => (trailer.versions.find((v) => v.language === language)?.text ?? '').split(/\n\s*\n/);
    for (const language of ['coptic', 'englishCoptic', 'english', 'arabic', 'arabicCoptic', 'arabicEnglish']) {
      expect([language, trailerStanzas(language).length]).toEqual([language, 2]);
    }
    expect(trailerStanzas('english')[0]).toBe('Lord, I cry out to You; make haste to me! Give ear to my voice when I cry out to You.');
    expect(trailerStanzas('coptic')[0].startsWith('Ⲡϭⲟⲓⲥ ⲁⲓⲟϣ ⲟⲩⲃⲏⲕ ⲥⲱⲧⲉⲙ ⲉ̀ⲣⲟⲓ')).toBe(true);
    expect(trailerStanzas('arabic')[0].startsWith('يَا رَبُّ إِلَيْكَ دَعَوْتُ')).toBe(true);
  });

  it('has its own ids, and no placeholders left', () => {
    const idsOf = (hymns: Hymn[]): string[] => hymns.flatMap((h) => [h.id, ...idsOf(h.children ?? [])]);
    const everyId = idsOf(vespers.hymns);
    expect(new Set(everyId).size).toBe(everyId.length);
    for (const id of everyId) expect(id.startsWith('kiahk-vespers-')).toBe(true);
    expect(vespers.hymns.some((h) => /Vespers Hymn #/.test(h.title))).toBe(false);
  });

  it('has the same lyrics as Matins, in every language, including inside the Verses of the Cymbals', () => {
    const texts = (h: Hymn) => h.versions.map((v) => [v.language, v.text, v.audio]);
    const matinsHymns = flattenHymns(matins.hymns).filter((h) => !isPsalmTrailer(h));
    const vespersHymns = flattenHymns(vespers.hymns).filter((h) => !isPsalmTrailer(h));
    expect(vespersHymns.map((h) => h.title)).toEqual(matinsHymns.map((h) => h.title));
    matinsHymns.forEach((h, i) => expect([h.title, texts(vespersHymns[i])]).toEqual([h.title, texts(h)]));
    expect(vespersHymns.some((h) => h.versions.length > 0)).toBe(true);
    // copies, not the same objects, so the two services can change on their own later
    expect(vespers.hymns[0]).not.toBe(matins.hymns[0]);
    expect(vespers.hymns[0].children?.[0]).not.toBe(matins.hymns[0].children?.[0]);
    expect(vespers.hymns[0].children?.map((h) => h.title)).toEqual(matins.hymns[0].children?.map((h) => h.title));
  });
});

describe('Kiahk Praises & Season > Liturgy', () => {
  const service = seasons.find((s) => s.id === 'kiahk')!.services.find((s) => s.id === 'kiahk-liturgy')!;

  it('lists only the Liturgy of the Word and the Liturgy of the Faithful, titles only', () => {
    expect(service.hymns.map((h) => h.title)).toEqual([
      'Liturgy of the Word',
      'Ϩⲓⲧⲉⲛ ⲛⲓⲡ̀ⲣⲉⲥⲃⲓⲁ (Hymn of the Intercessions)',
      'Ⲡⲓϩ̀ⲙⲟⲧ ⲅⲁⲣ (Conclusion to the Coptic Pauline Epistle)',
      'Ⲡⲓϩ̀ⲙⲟⲧ ⲅⲁⲣ ⲙ̀ⲡⲉⲛⲟ︦ⲥ︦ Ⲓⲏ︦ⲥ︦ Ⲡⲭ︦ⲥ︦ (Response to the Pauline Epistle)',
      'Ⲡⲓϩ̀ⲙⲟⲧ ⲅⲁⲣ ⲙ̀Ⲫ̀ⲛⲟⲩϯ (Great Response to the Pauline Epistle)',
      'Ⲏ̀ ⲁ̀ⲅⲁⲡⲏ (Alternate Response to the Pauline Epistle)',
      'Ϯⲙⲏⲧ ⲥ̀ⲛⲟⲩϯ (Hymn of the Virtues)',
      'Ⲧⲟⲩ ⲙⲁⲕⲁⲣⲓⲱ (The Blessed)',
      'Ⲁ̀ ⲡⲉⲧϫⲏⲕ (Perfect is the Blessing)',
      'Ⲕⲁⲑⲟⲗⲓⲕⲟⲛ (Introduction to the Coptic Catholic Epistle)',
      'Ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ (Praxis Response)',
      'Ⲡⲁϭⲟⲓⲥ (Paralex)',
      'Ⲁⲅⲓⲟⲥ ⲟ̀ Ⲑⲉⲟⲥ (Trisagion)',
      'Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ (Psalm Chant)',
      'Ⲙⲁⲣⲟⲩϭⲁⲥϥ (Psalm Trailer for the Pope or a Bishop)',
      'Liturgy of the Faithful',
      'Ⲧⲉⲛϯ ⲛⲉ ⲙ̀ⲡⲓⲭⲉⲣⲉⲧⲓⲥⲙⲟⲥ (Gospel Response)',
      'Ⲧⲉⲛϭⲓⲥⲓ ⲙ̀ⲙⲟ ϧⲉⲛ ⲟⲩⲉⲙⲡ̀ϣⲁ (Gospel Response)',
      'Ⲍⲁⲭⲁⲣⲓⲁⲥ (Adam Aspasmos (Zechariah))',
      'Ⲟⲩⲛⲟϥ ⲙ̀ⲙⲟ (Standard Adam Aspasmos (Rejoice))',
      'Ⲁ̀ⲣⲓⲁⲥⲡⲁⲍⲉⲥⲑⲉ (A Second Standard Adam Aspasmos (Greet With))',
      'Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲡⲉⲛⲥⲱⲧⲏⲣ (A Third Standard Adam Aspasmos (O Christ Our Savior))',
      'Ⲅⲁⲃⲣⲓⲏⲗ (Watos Aspasmos (Gabriel))',
      'Ⲡ̀ϭⲟⲓⲥ Ⲫ̀ⲛⲟⲩϯ (Standard Watos Aspasmos, O Lord God)',
      'Ⲙⲁⲣⲉⲛϩⲱⲥ (A Second Standard Watos Aspasmos (Let Us Praise))',
      'Ⲙⲁⲣⲓⲁ ϯϭⲣⲟⲙⲡⲓ (A Third Standard Watos Aspasmos (Mary the Beautiful Dove))',
    ]);
    expect(service.hymns.filter((h) => h.isSectionHeader).map((h) => h.title)).toEqual(['Liturgy of the Word', 'Liturgy of the Faithful']);
    expect(service.hymns.map((h, i) => (h.isSectionHeader ? i : -1)).filter((i) => i >= 0)).toEqual([0, 15]);
    // the Psalm Chant is a group: it opens a list of four Sundays of Kiahk, titles only for now
    const psalmChant = service.hymns.find((h) => h.title === 'Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ (Psalm Chant)')!;
    expect(psalmChant.versions).toEqual([]);
    expect(psalmChant.children?.map((h) => h.title)).toEqual([
      'First Sunday of Kiahk',
      'Second Sunday of Kiahk',
      'Third Sunday of Kiahk',
      'Fourth Sunday of Kiahk',
    ]);
    // each Sunday is one stanza in Coptic, Coptic-English, English and Arabic, ending with the Alleluia
    const chantText = (h: Hymn, language: string) => h.versions.find((v) => v.language === language)?.text ?? '';
    const sundayStarts = ['You will arise and have mercy on Zion', 'Hear, O daughter, and see', 'Mercy and truth are met together', 'You Who sits upon the cherubim'];
    psalmChant.children!.forEach((sunday, i) => {
      for (const language of ['coptic', 'englishCoptic', 'english', 'arabic', 'arabicCoptic', 'arabicEnglish']) {
        expect([sunday.title, language, chantText(sunday, language).split(/\n\s*\n/).length]).toEqual([sunday.title, language, 1]);
      }
      expect(chantText(sunday, 'english').startsWith(sundayStarts[i])).toBe(true);
      expect(chantText(sunday, 'english').endsWith('Alleluia')).toBe(true);
      expect(chantText(sunday, 'coptic').endsWith('ⲁ︦ⲗ︦.')).toBe(true);
      expect(chantText(sunday, 'englishCoptic').endsWith('allēlouia.')).toBe(true);
      expect(chantText(sunday, 'coptic')).not.toContain('⳪');
      expect(sunday.versions.every((v) => v.audio === undefined)).toBe(true);
    });
    expect(chantText(psalmChant.children![0], 'coptic')).toContain('ϫⲉ Ⲡ̀ϭⲟⲓⲥ ⲉϥⲉ̀ⲕⲱⲧ ⲛ̀Ⲥⲓⲱⲛ');
    expect(chantText(psalmChant.children![1], 'arabic').startsWith('إسمعي يا إبنتي')).toBe(true);
    expect(chantText(psalmChant.children![3], 'coptic').startsWith('Ⲫⲏⲉⲧϩⲉⲙⲥⲓ ϩⲓϫⲉⲛ Ⲛⲓϣⲉⲣⲟⲩⲃⲓⲙ')).toBe(true);
    expect(service.hymns.some((h) => h.title === 'Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ (Psalm Trailer)')).toBe(false);
    expect(new Set(service.hymns.map((h) => h.id)).size).toBe(service.hymns.length);
    // the first eleven hymns of the Liturgy of the Word, the Trisagion and the Psalm Trailer for the Pope or a Bishop have lyrics so far
    const withLyrics = [
      'Ϩⲓⲧⲉⲛ ⲛⲓⲡ̀ⲣⲉⲥⲃⲓⲁ (Hymn of the Intercessions)',
      'Ⲡⲓϩ̀ⲙⲟⲧ ⲅⲁⲣ (Conclusion to the Coptic Pauline Epistle)',
      'Ⲡⲓϩ̀ⲙⲟⲧ ⲅⲁⲣ ⲙ̀ⲡⲉⲛⲟ︦ⲥ︦ Ⲓⲏ︦ⲥ︦ Ⲡⲭ︦ⲥ︦ (Response to the Pauline Epistle)',
      'Ⲡⲓϩ̀ⲙⲟⲧ ⲅⲁⲣ ⲙ̀Ⲫ̀ⲛⲟⲩϯ (Great Response to the Pauline Epistle)',
      'Ⲏ̀ ⲁ̀ⲅⲁⲡⲏ (Alternate Response to the Pauline Epistle)',
      'Ϯⲙⲏⲧ ⲥ̀ⲛⲟⲩϯ (Hymn of the Virtues)',
      'Ⲧⲟⲩ ⲙⲁⲕⲁⲣⲓⲱ (The Blessed)',
      'Ⲁ̀ ⲡⲉⲧϫⲏⲕ (Perfect is the Blessing)',
      'Ⲕⲁⲑⲟⲗⲓⲕⲟⲛ (Introduction to the Coptic Catholic Epistle)',
      'Ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ (Praxis Response)',
      'Ⲡⲁϭⲟⲓⲥ (Paralex)',
      'Ⲁⲅⲓⲟⲥ ⲟ̀ Ⲑⲉⲟⲥ (Trisagion)',
      'Ⲙⲁⲣⲟⲩϭⲁⲥϥ (Psalm Trailer for the Pope or a Bishop)',
      'Ⲧⲉⲛϯ ⲛⲉ ⲙ̀ⲡⲓⲭⲉⲣⲉⲧⲓⲥⲙⲟⲥ (Gospel Response)',
      'Ⲧⲉⲛϭⲓⲥⲓ ⲙ̀ⲙⲟ ϧⲉⲛ ⲟⲩⲉⲙⲡ̀ϣⲁ (Gospel Response)',
      'Ⲍⲁⲭⲁⲣⲓⲁⲥ (Adam Aspasmos (Zechariah))',
      'Ⲟⲩⲛⲟϥ ⲙ̀ⲙⲟ (Standard Adam Aspasmos (Rejoice))',
      'Ⲁ̀ⲣⲓⲁⲥⲡⲁⲍⲉⲥⲑⲉ (A Second Standard Adam Aspasmos (Greet With))',
      'Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲡⲉⲛⲥⲱⲧⲏⲣ (A Third Standard Adam Aspasmos (O Christ Our Savior))',
      'Ⲅⲁⲃⲣⲓⲏⲗ (Watos Aspasmos (Gabriel))',
      'Ⲡ̀ϭⲟⲓⲥ Ⲫ̀ⲛⲟⲩϯ (Standard Watos Aspasmos, O Lord God)',
      'Ⲙⲁⲣⲉⲛϩⲱⲥ (A Second Standard Watos Aspasmos (Let Us Praise))',
      'Ⲙⲁⲣⲓⲁ ϯϭⲣⲟⲙⲡⲓ (A Third Standard Watos Aspasmos (Mary the Beautiful Dove))',
    ];
    for (const hymn of service.hymns) {
      if (withLyrics.includes(hymn.title)) expect(hymn.versions.length).toBeGreaterThan(0);
      else expect([hymn.title, hymn.versions.length]).toEqual([hymn.title, 0]);
    }
  });

  it('has the lyrics of the Hymn of the Intercessions and the Conclusion to the Coptic Pauline Epistle', () => {
    const text = (h: Hymn, language: string) => h.versions.find((v) => v.language === language)?.text ?? '';
    const stanzas = (h: Hymn, language: string) => text(h, language).split(/\n\s*\n/);
    const withLyricsTitles = [
      'Ϩⲓⲧⲉⲛ ⲛⲓⲡ̀ⲣⲉⲥⲃⲓⲁ (Hymn of the Intercessions)',
      'Ⲡⲓϩ̀ⲙⲟⲧ ⲅⲁⲣ (Conclusion to the Coptic Pauline Epistle)',
      'Ⲡⲓϩ̀ⲙⲟⲧ ⲅⲁⲣ ⲙ̀ⲡⲉⲛⲟ︦ⲥ︦ Ⲓⲏ︦ⲥ︦ Ⲡⲭ︦ⲥ︦ (Response to the Pauline Epistle)',
      'Ⲡⲓϩ̀ⲙⲟⲧ ⲅⲁⲣ ⲙ̀Ⲫ̀ⲛⲟⲩϯ (Great Response to the Pauline Epistle)',
      'Ⲏ̀ ⲁ̀ⲅⲁⲡⲏ (Alternate Response to the Pauline Epistle)',
      'Ϯⲙⲏⲧ ⲥ̀ⲛⲟⲩϯ (Hymn of the Virtues)',
      'Ⲧⲟⲩ ⲙⲁⲕⲁⲣⲓⲱ (The Blessed)',
      'Ⲁ̀ ⲡⲉⲧϫⲏⲕ (Perfect is the Blessing)',
      'Ⲕⲁⲑⲟⲗⲓⲕⲟⲛ (Introduction to the Coptic Catholic Epistle)',
      'Ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ (Praxis Response)',
      'Ⲡⲁϭⲟⲓⲥ (Paralex)',
    ];
    const intercessions = service.hymns.find((h) => h.title === withLyricsTitles[0])!;
    const conclusion = service.hymns.find((h) => h.title === withLyricsTitles[1])!;
    for (const [hymn, count] of [[intercessions, 14], [conclusion, 1]] as [Hymn, number][]) {
      for (const language of ['coptic', 'englishCoptic', 'english', 'arabic', 'arabicCoptic', 'arabicEnglish']) {
        expect([hymn.title, language, stanzas(hymn, language).length]).toEqual([hymn.title, language, count]);
      }
      expect(hymn.versions.every((v) => !v.text.includes('\\n') && v.audio === undefined)).toBe(true);
    }
    // the Response and the Great Response to the Pauline Epistle
    const response = service.hymns.find((h) => h.title === withLyricsTitles[2])!;
    const greatResponse = service.hymns.find((h) => h.title === withLyricsTitles[3])!;
    for (const [hymn, count] of [[response, 4], [greatResponse, 9]] as [Hymn, number][]) {
      for (const language of ['coptic', 'englishCoptic', 'english', 'arabic', 'arabicCoptic', 'arabicEnglish']) {
        expect([hymn.title, language, stanzas(hymn, language).length]).toEqual([hymn.title, language, count]);
      }
      expect(hymn.versions.every((v) => !v.text.includes('\\n') && v.audio === undefined)).toBe(true);
    }
    expect(stanzas(response, 'english')[0]).toBe(
      'The grace of our Lord Jesus Christ, be with your saintly spirit, my lord the honored father the high priest Pope Abba (...).'
    );
    expect(stanzas(response, 'englishCoptic')[0].startsWith('Pi-ehmot gar empentshois Iēsous Pi-ekhristos')).toBe(true);
    expect(stanzas(greatResponse, 'english')[0]).toBe('The grace of God, the Father, the Pantocrator,');
    expect(stanzas(greatResponse, 'coptic')[0]).toBe('Ⲡⲓϩ̀ⲙⲟⲧ ⲅⲁⲣ ⲙ̀Ⲫ̀ⲛⲟⲩϯ Ⲫ̀ⲓⲱⲧ Ⲡⲓⲡⲁⲛⲧⲟⲕⲣⲁⲧⲱⲣ.');
    expect(stanzas(greatResponse, 'englishCoptic')[7].startsWith('Tōbh e-Pi-ekhristos')).toBe(true);
    // the Alternate Response: three stanzas, without the line 'If a Bishop is present:' in English and Arabic
    const alternate = service.hymns.find((h) => h.title === withLyricsTitles[4])!;
    for (const language of ['coptic', 'englishCoptic', 'english', 'arabic', 'arabicCoptic', 'arabicEnglish']) {
      expect([language, stanzas(alternate, language).length]).toEqual([language, 3]);
    }
    expect(text(alternate, 'english')).not.toMatch(/bishop is present/i);
    expect(text(alternate, 'arabic')).not.toContain('في حضور أسقف');
    expect(stanzas(alternate, 'english')[0].startsWith('The love of God the Father, and the grace of His only-begotten Son')).toBe(true);
    expect(stanzas(alternate, 'english')[1].startsWith('And our holy, blessed, and most honored father, Abba (...)')).toBe(true);
    expect(stanzas(alternate, 'coptic')[0].startsWith('Ⲏ̀ ⲁ̀ⲅⲁⲡⲏ ⲧⲟⲩ Ⲑⲉⲟⲩ Ⲡⲁⲧⲣⲟⲥ')).toBe(true);
    expect(stanzas(alternate, 'arabic')[1].startsWith('والقديس المغبوط')).toBe(true);
    expect(alternate.versions.every((v) => !v.text.includes('\\n') && v.audio === undefined)).toBe(true);
    // the Hymn of the Virtues: 21 stanzas, without the line 'If a Bishop is present:' in English and Arabic
    const virtues = service.hymns.find((h) => h.title === withLyricsTitles[5])!;
    for (const language of ['coptic', 'englishCoptic', 'english', 'arabic', 'arabicCoptic', 'arabicEnglish']) {
      expect([language, stanzas(virtues, language).length]).toEqual([language, 21]);
    }
    expect(text(virtues, 'english')).not.toMatch(/bishop is present/i);
    expect(text(virtues, 'arabic')).not.toContain('في حضور أسقف');
    expect(stanzas(virtues, 'english')[0]).toBe('The twelve virtues of the Holy Spirit that are mentioned in the holy Scriptures, these are their names—');
    expect(stanzas(virtues, 'english')[3]).toBe('The first is love, the second is hope, the third is faith.');
    expect(stanzas(virtues, 'english')[20]).toBe('Amen (3), so it shall be (2) for you all the days of your life(s).');
    expect(stanzas(virtues, 'coptic')[0].startsWith('Ϯⲙⲏⲧ ⲥ̀ⲛⲟⲩϯ ⲛ̀ⲁ̀ⲣⲉⲧⲏ')).toBe(true);
    // the numbers under a line are written as numbers in English and Arabic letters
    expect(stanzas(virtues, 'englishCoptic')[1]).toContain('Eu-eshōpi (2)');
    expect(stanzas(virtues, 'arabicCoptic')[15]).toContain('(٣)');
    expect(stanzas(virtues, 'arabicCoptic')[15]).toContain('(٢)');
    expect(virtues.versions.every((v) => !v.text.includes('\\n') && v.audio === undefined)).toBe(true);
    // The Blessed: 6 stanzas (the praise of the Pope), different from the Hymn of the Virtues
    const blessed = service.hymns.find((h) => h.title === withLyricsTitles[6])!;
    for (const language of ['coptic', 'englishCoptic', 'english', 'arabic', 'arabicCoptic', 'arabicEnglish']) {
      expect([language, stanzas(blessed, language).length]).toEqual([language, 6]);
    }
    expect(stanzas(blessed, 'english')[0]).toBe('The blessed (...), the holy fully honored, our father and master,(...)');
    expect(stanzas(blessed, 'english')[3]).toBe('May his years be countless, may God preserve our master and Archbishop (for many years O master) (3x)');
    expect(stanzas(blessed, 'coptic')[0].startsWith('Ⲧⲟⲩ ⲙⲁⲕⲁⲣⲓⲱ ⲧⲁⲧⲟⲩ ⲁ̀ⲅⲓⲱ ⲧⲁⲧⲟⲩ')).toBe(true);
    expect(stanzas(blessed, 'arabic')[0]).toBe('الطوباوي الأقدس الكلي الإكرام، أبونا ومولانا وسيدنا');
    expect(stanzas(blessed, 'englishCoptic')[3]).toContain('(is polla etē Despota) 3.');
    expect(stanzas(blessed, 'arabicCoptic')[3]).toContain('٣');
    expect(text(blessed, 'english')).not.toBe(text(virtues, 'english'));
    expect(blessed.versions.every((v) => !v.text.includes('\\n') && v.audio === undefined)).toBe(true);
    // Perfect is the Blessing (12 stanzas) and the Introduction to the Coptic Catholic Epistle (1 stanza)
    const perfect = service.hymns.find((h) => h.title === withLyricsTitles[7])!;
    const catholic = service.hymns.find((h) => h.title === withLyricsTitles[8])!;
    for (const [hymn, count] of [[perfect, 12], [catholic, 1]] as [Hymn, number][]) {
      for (const language of ['coptic', 'englishCoptic', 'english', 'arabic', 'arabicCoptic', 'arabicEnglish']) {
        expect([hymn.title, language, stanzas(hymn, language).length]).toEqual([hymn.title, language, count]);
      }
      expect(hymn.versions.every((v) => !v.text.includes('\\n') && v.audio === undefined)).toBe(true);
    }
    expect(stanzas(perfect, 'english')[0]).toBe('Perfect is the blessing, of the Word of the Father, who came and was incarnate as a perfect man.');
    expect(stanzas(perfect, 'english')[11]).toBe('The catholic epistle, the catholic epistle.');
    expect(stanzas(perfect, 'coptic')[0].startsWith('Ⲁ̀ ⲡⲉⲧϫⲏⲕ ⲉ̀ⲃⲟⲗ ⲛ̀ϫⲉ ⲡⲓⲥ̀ⲙⲟⲩ')).toBe(true);
    expect(stanzas(perfect, 'englishCoptic')[5]).toContain('Ere pi-esmou en-Ti-etrias ethouab (2)');
    expect(stanzas(perfect, 'englishCoptic')[6]).toContain('en-Iēsous Pi-ekhristos');
    expect(stanzas(perfect, 'arabicCoptic')[5]).toContain('(٢)');
    expect(text(catholic, 'english')).toBe('The Catholic Epistle of our father ___, my beloved.');
    expect(text(catholic, 'coptic').startsWith('Ⲕⲁⲑⲟⲗⲓⲕⲟⲛ (ⲉ̀ⲃⲟⲗϧⲉⲛ ϯⲉ̀ⲡⲓⲥⲧⲟⲗⲏ ⲛ̀ⲧⲉ)')).toBe(true);
    expect(text(catholic, 'arabic')).toBe('الكاثوليكون من أبينا ___ أحبائي.');
    // the Praxis Response (11 stanzas) and the Paralex (3 stanzas)
    const praxis = service.hymns.find((h) => h.title === withLyricsTitles[9])!;
    const paralex = service.hymns.find((h) => h.title === withLyricsTitles[10])!;
    for (const [hymn, count] of [[praxis, 11], [paralex, 3]] as [Hymn, number][]) {
      for (const language of ['coptic', 'englishCoptic', 'english', 'arabic', 'arabicCoptic', 'arabicEnglish']) {
        expect([hymn.title, language, stanzas(hymn, language).length]).toEqual([hymn.title, language, count]);
      }
      expect(hymn.versions.every((v) => !v.text.includes('\\n') && v.audio === undefined)).toBe(true);
    }
    expect(stanzas(praxis, 'english')[0]).toBe('Hail to you O Mary, the beautiful dove, who has borne to us, God the Logos.');
    expect(stanzas(praxis, 'english')[10]).toBe('Blessed are You indeed, with Your good Father, and the Holy Spirit, for You have come and saved us. Have mercy on us.');
    expect(stanzas(praxis, 'coptic')[0].startsWith('Ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ: ϯϭⲣⲟⲙⲡⲓ')).toBe(true);
    expect(stanzas(praxis, 'englishCoptic')[4]).toContain('patshois epouro Ge-ōrgios');
    expect(stanzas(paralex, 'english')[0]).toBe('O My Lord Jesus Christ, the begotten of the Father, before all ages, have mercy on us according to Your great mercy.');
    expect(stanzas(paralex, 'coptic')[0].startsWith('Ⲡⲁϭⲟⲓⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ')).toBe(true);
    expect(stanzas(paralex, 'arabic')[2]).toBe('قدوس رب الألوف، مكرم بالربوات، أنت بخور يا مخلصي، لأنك أتيت وخلصتنا."');
    // the Trisagion and the Psalm Trailer for the Pope or a Bishop: the same lyrics as in Annual Liturgy, without its recordings
    const annualLiturgy = seasons.find((s) => s.id === 'annual')!.services.find((s) => s.id === 'annual-liturgy')!;
    for (const [title, annualId] of [
      ['Ⲁⲅⲓⲟⲥ ⲟ̀ Ⲑⲉⲟⲥ (Trisagion)', 'annual-liturgy-agios'],
      ['Ⲙⲁⲣⲟⲩϭⲁⲥϥ (Psalm Trailer for the Pope or a Bishop)', 'annual-liturgy-psalm-trailer-pope-bishop'],
    ]) {
      const kiahk = service.hymns.find((h) => h.title === title)!;
      const original = annualLiturgy.hymns.find((h) => h.id === annualId)!;
      for (const language of ['coptic', 'englishCoptic', 'english', 'arabic']) {
        expect([title, language, text(kiahk, language)]).toEqual([title, language, text(original, language)]);
        expect(text(kiahk, language)).toBeTruthy();
      }
      expect(kiahk.versions.some((v) => v.language === 'arabicCoptic')).toBe(true);
      expect(kiahk.versions.some((v) => v.language === 'arabicEnglish')).toBe(true);
      expect(kiahk.versions.every((v) => v.audio === undefined)).toBe(true);
    }
    expect(annualLiturgy.hymns.find((h) => h.id === 'annual-liturgy-agios')!.versions.some((v) => v.audio)).toBe(true);
    // Liturgy of the Faithful: the two Gospel Responses are the same as in Matins and Vespers, then the two Adam Aspasmos
    const matinsService = seasons.find((s) => s.id === 'kiahk')!.services.find((s) => s.id === 'kiahk-matins')!;
    const vespersService = seasons.find((s) => s.id === 'kiahk')!.services.find((s) => s.id === 'kiahk-vespers')!;
    for (const title of ['Ⲧⲉⲛϯ ⲛⲉ ⲙ̀ⲡⲓⲭⲉⲣⲉⲧⲓⲥⲙⲟⲥ (Gospel Response)', 'Ⲧⲉⲛϭⲓⲥⲓ ⲙ̀ⲙⲟ ϧⲉⲛ ⲟⲩⲉⲙⲡ̀ϣⲁ (Gospel Response)']) {
      const faithful = service.hymns.find((h) => h.title === title)!;
      for (const other of [matinsService, vespersService]) {
        const original = other.hymns.find((h) => h.title === title)!;
        for (const language of ['coptic', 'englishCoptic', 'english', 'arabic', 'arabicCoptic', 'arabicEnglish']) {
          expect([title, language, text(faithful, language)]).toEqual([title, language, text(original, language)]);
          expect(text(faithful, language)).toBeTruthy();
        }
      }
      expect(faithful.versions.every((v) => v.audio === undefined)).toBe(true);
    }
    const zechariah = service.hymns.find((h) => h.title === 'Ⲍⲁⲭⲁⲣⲓⲁⲥ (Adam Aspasmos (Zechariah))')!;
    const rejoice = service.hymns.find((h) => h.title === 'Ⲟⲩⲛⲟϥ ⲙ̀ⲙⲟ (Standard Adam Aspasmos (Rejoice))')!;
    for (const [hymn, count] of [[zechariah, 6], [rejoice, 7]] as [Hymn, number][]) {
      for (const language of ['coptic', 'englishCoptic', 'english', 'arabic', 'arabicCoptic', 'arabicEnglish']) {
        expect([hymn.title, language, stanzas(hymn, language).length]).toEqual([hymn.title, language, count]);
      }
      expect(hymn.versions.every((v) => !v.text.includes('\\n') && !v.text.includes('⳪') && v.audio === undefined)).toBe(true);
      // the Lord's symbol is written out, the symbol itself is not in the Coptic font
      expect(stanzas(hymn, 'coptic')[hymn === zechariah ? 5 : 6]).toContain('Ⲡ̀ϭⲟⲓⲥ ⲡⲓⲡⲁⲛⲧⲟⲕⲣⲁⲧⲱⲣ');
    }
    expect(stanzas(zechariah, 'english')[0]).toBe('Zechariah the priest, son of Berachia, was in the temple, offering incense.');
    expect(stanzas(zechariah, 'coptic')[0].startsWith('Ⲍⲁⲭⲁⲣⲓⲁⲥ ⲡⲓⲟⲩⲏⲃ ⲡ̀ϣⲏⲣⲓ ⲙ̀Ⲃⲁⲣⲁⲭⲓⲁⲥ')).toBe(true);
    expect(stanzas(rejoice, 'english')[0]).toBe('Rejoice, O Mary, handmaiden and mother, for the angels praise Him who is in your arms,');
    expect(stanzas(rejoice, 'coptic')[0].startsWith('Ⲟⲩⲛⲟϥ ⲙ̀ⲙⲟ Ⲙⲁⲣⲓⲁ')).toBe(true);
    // the second and third standard Adam Aspasmos: the same last four stanzas again
    const greet = service.hymns.find((h) => h.title === 'Ⲁ̀ⲣⲓⲁⲥⲡⲁⲍⲉⲥⲑⲉ (A Second Standard Adam Aspasmos (Greet With))')!;
    const savior = service.hymns.find((h) => h.title === 'Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲡⲉⲛⲥⲱⲧⲏⲣ (A Third Standard Adam Aspasmos (O Christ Our Savior))')!;
    for (const [hymn, count] of [[greet, 7], [savior, 5]] as [Hymn, number][]) {
      for (const language of ['coptic', 'englishCoptic', 'english', 'arabic', 'arabicCoptic', 'arabicEnglish']) {
        expect([hymn.title, language, stanzas(hymn, language).length]).toEqual([hymn.title, language, count]);
      }
      expect(hymn.versions.every((v) => !v.text.includes('\\n') && !v.text.includes('⳪') && v.audio === undefined)).toBe(true);
      for (const language of ['coptic', 'english', 'arabic']) {
        expect(stanzas(hymn, language).slice(-4)).toEqual(stanzas(rejoice, language).slice(-4));
      }
    }
    expect(stanzas(greet, 'english')[0]).toBe('Greet, with a holy kiss, purify your hearts, from every evil thing.');
    expect(stanzas(greet, 'english')[2]).toBe('Through these [mysteries], we may win mercy, and forgiveness of our sins, according to His great mercy.');
    expect(stanzas(greet, 'coptic')[0].startsWith('Ⲁ̀ⲣⲓⲁⲥⲡⲁⲍⲉⲥⲑⲉ: ϧⲉⲛ ⲟⲩⲫⲓ ⲉⲑⲟⲩⲁⲃ')).toBe(true);
    expect(stanzas(savior, 'english')[0]).toBe('O Christ our Savior, make us worthy, of Your holy peace, in the heavens.');
    expect(stanzas(savior, 'coptic')[0].startsWith('Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ Ⲡⲉⲛⲥⲱⲧⲏⲣ: ⲁ̀ⲣⲓⲧⲉⲛⲛ̀ⲉⲙⲡ̀ϣⲁ')).toBe(true);
    // the two Watos Aspasmos: 4 stanzas each, ending with "Holy, holy, holy"
    const watosGabriel = service.hymns.find((h) => h.title === 'Ⲅⲁⲃⲣⲓⲏⲗ (Watos Aspasmos (Gabriel))')!;
    const watosLordGod = service.hymns.find((h) => h.title === 'Ⲡ̀ϭⲟⲓⲥ Ⲫ̀ⲛⲟⲩϯ (Standard Watos Aspasmos, O Lord God)')!;
    for (const hymn of [watosGabriel, watosLordGod]) {
      for (const language of ['coptic', 'englishCoptic', 'english', 'arabic', 'arabicCoptic', 'arabicEnglish']) {
        expect([hymn.title, language, stanzas(hymn, language).length]).toEqual([hymn.title, language, 4]);
      }
      expect(hymn.versions.every((v) => !v.text.includes('\\n') && v.audio === undefined)).toBe(true);
    }
    expect(stanzas(watosGabriel, 'english')[0]).toBe('Gabriel the holy Angel, announced to the Virgin, "Hail to you O full of grace, the Lord is with you."');
    expect(stanzas(watosGabriel, 'coptic')[0].startsWith('Ⲅⲁⲃⲣⲓⲏⲗ ⲡⲓⲁ̀ⲅⲅⲉⲗⲟⲥ ⲁϥϩⲓϣⲉⲛⲛⲟⲩϥⲓ')).toBe(true);
    expect(stanzas(watosGabriel, 'english')[3]).toBe('Holy, holy, holy, Lord of hosts, heaven and earth, are full of Your holy glory.');
    expect(stanzas(watosLordGod, 'english')[1]).toBe('Alleluia Alleluia Alleluia.');
    expect(stanzas(watosLordGod, 'coptic')[0].startsWith('Ⲡ̀ϭⲟⲓⲥ Ⲫ̀ⲛⲟⲩϯ ⲛ̀ⲧⲉ ⲛⲓϫⲟⲙ')).toBe(true);
    expect(stanzas(watosLordGod, 'english')[3]).toBe('Holy holy holy, Lord of hosts, heaven and earth, are full of Your holy glory.');
    // the second and third Watos Aspasmos: 4 stanzas each, the last three the same as in the "O Lord God" one
    const watosLetUsPraise = service.hymns.find((h) => h.title === 'Ⲙⲁⲣⲉⲛϩⲱⲥ (A Second Standard Watos Aspasmos (Let Us Praise))')!;
    const watosMaryDove = service.hymns.find((h) => h.title === 'Ⲙⲁⲣⲓⲁ ϯϭⲣⲟⲙⲡⲓ (A Third Standard Watos Aspasmos (Mary the Beautiful Dove))')!;
    for (const hymn of [watosLetUsPraise, watosMaryDove]) {
      for (const language of ['coptic', 'englishCoptic', 'english', 'arabic', 'arabicCoptic', 'arabicEnglish']) {
        expect([hymn.title, language, stanzas(hymn, language).length]).toEqual([hymn.title, language, 4]);
      }
      expect(hymn.versions.every((v) => !v.text.includes('\\n') && v.audio === undefined)).toBe(true);
      for (const language of ['coptic', 'english', 'arabic']) {
        expect(stanzas(hymn, language).slice(1)).toEqual(stanzas(watosLordGod, language).slice(1));
      }
    }
    expect(stanzas(watosLetUsPraise, 'english')[0]).toBe('Let us praise with the angels, and the heavenly hosts, He who is the Father and the Son, and the Holy Spirit.');
    expect(stanzas(watosLetUsPraise, 'coptic')[0].startsWith('Ⲙⲁⲣⲉⲛϩⲱⲥ ⲛⲉⲙ ⲛⲓⲁⲅⲅⲉⲗⲟⲥ')).toBe(true);
    expect(stanzas(watosMaryDove, 'english')[0]).toBe('Mary the beautiful dove, Mary the Theotokos, Mary the Mother of Jesus Christ, to you is the glory and majesty.');
    expect(stanzas(watosMaryDove, 'coptic')[0].startsWith('Ⲙⲁⲣⲓⲁ ϯϭⲣⲟⲙⲡⲓ ⲉⲑⲛⲉⲥⲱⲥ')).toBe(true);
    expect(stanzas(watosMaryDove, 'arabic')[0]).toBe('مريم الحمامة الحسنة، مريم والدة الإله، مريم أُم يسوع المسيح، لكِ المجد والعز.');
    // the last four stanzas of the two Adam Aspasmos are the same
    for (const language of ['coptic', 'english', 'arabic']) {
      expect(stanzas(zechariah, language).slice(-3)).toEqual(stanzas(rejoice, language).slice(-3));
    }
    expect(stanzas(intercessions, 'english')[0]).toBe('Through the intercessions, of the Theotokos, Saint Mary, O Lord grant us, the forgiveness of our sins.');
    expect(stanzas(intercessions, 'english')[13]).toBe('Through the prayers: of our righteous father: Abba Abraam the bishop: O Lord grant us the forgiveness of our sins.');
    expect(stanzas(intercessions, 'coptic')[0].startsWith('Ϩⲓⲧⲉⲛ ⲛⲓⲡ̀ⲣⲉⲥⲃⲓⲁ: ⲛ̀ⲧⲉ ϯⲑⲉⲟ̀ⲧⲟⲕⲟⲥ')).toBe(true);
    expect(text(conclusion, 'english')).toBe('Grace and peace be with you all. Amen. So be it.');
    expect(text(conclusion, 'coptic').startsWith('Ⲡⲓϩ̀ⲙⲟⲧ ⲅⲁⲣ ⲛⲉⲙⲱⲧⲉⲛ')).toBe(true);
    expect(text(conclusion, 'arabic')).toBe('النعمة لكم والسلام معاً. آمين. يكون.');
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
