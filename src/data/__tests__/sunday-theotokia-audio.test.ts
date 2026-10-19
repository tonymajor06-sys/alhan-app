import { seasons, deaconCategories, flattenHymns, Hymn } from '../hymns';
import { arsaniAudio } from '../arsani-audio';
import { displayTitle } from '../arabic-titles';

describe('Sunday Theotokia Audio Recordings', () => {
  const annualMidnight = seasons.find((s) => s.id === 'annual')?.services.find((s) => s.id === 'annual-midnight');
  const annualVesperPraises = seasons.find((s) => s.id === 'annual')?.services.find((s) => s.id === 'annual-vesper-praises');

  const findHymn = (hymns: Hymn[] | undefined, id: string): Hymn | undefined => {
    return hymns ? flattenHymns(hymns).find((h) => h.id === id) : undefined;
  };

  test('Joe Seif recordings are added to arsaniAudio registry', () => {
    for (let i = 1; i <= 6; i++) {
      const entry = arsaniAudio.find((a) => a.file === `arsani-223-sunday-theotokia-part-${i}.m4a`);
      expect(entry).toBeDefined();
      expect(entry?.hymns).toContain(`annual-midnight-sunday-theotokia-part-${i}`);
      expect(entry?.hymns).toContain(`annual-vesper-praises-sunday-theotokia-part-${i}`);
      expect(entry?.language).toBe('coptic');
    }
    const conclusion = arsaniAudio.find((a) => a.file === 'arsani-223-sunday-adam-psali-conclusion.m4a');
    expect(conclusion).toBeDefined();
    expect(conclusion?.hymns).toContain('annual-midnight-sunday-adam-psali-conclusion');
    expect(conclusion?.hymns).toContain('annual-vesper-praises-sunday-adam-psali-conclusion');
    expect(conclusion?.language).toBe('coptic');
  });

  test('Sunday Theotokia parts 1 to 6 in Midnight Praises have original audio and second recording', () => {
    for (let i = 1; i <= 6; i++) {
      const hymn = findHymn(annualMidnight?.hymns, `annual-midnight-sunday-theotokia-part-${i}`);
      expect(hymn).toBeDefined();
      const coptic = hymn?.versions.find((v) => v.language === 'coptic');
      expect(coptic?.audio).toBe(`midnight-sunday-theotokion-${i}.m4a`);
      expect(coptic?.otherAudio).toContain(`arsani-223-sunday-theotokia-part-${i}.m4a`);

      const engCoptic = hymn?.versions.find((v) => v.language === 'englishCoptic');
      expect(engCoptic?.audio).toBe(`midnight-sunday-theotokion-${i}.m4a`);
      expect(engCoptic?.otherAudio).toContain(`arsani-223-sunday-theotokia-part-${i}.m4a`);
    }
  });

  test("Vesper Praises' Sunday Theotokia (parts 11 to 18, as Spirit & Truth has it) plays Midnight Praises' recordings", () => {
    for (let i = 11; i <= 18; i++) {
      const midnight = findHymn(annualMidnight?.hymns, `annual-midnight-sunday-theotokia-part-${i}`);
      const hymn = findHymn(annualVesperPraises?.hymns, `annual-midnight-sunday-theotokia-part-${i}@annual-vesper-praises-sunday`);
      expect(hymn).toBeDefined();
      const audio = (h?: Hymn) => h?.versions.find((v) => v.language === 'coptic')?.audio;
      expect(audio(hymn)).toBe(audio(midnight));
    }
  });

  test('Adam Psali Conclusion in Midnight Praises has original audio and second recording', () => {
    const hymn = findHymn(annualMidnight?.hymns, 'annual-midnight-sunday-adam-psali-conclusion');
    expect(hymn).toBeDefined();
    const coptic = hymn?.versions.find((v) => v.language === 'coptic');
    expect(coptic?.audio).toBe('midnight-adam-psali-conclusion.m4a');
    expect(coptic?.otherAudio).toContain('arsani-223-sunday-adam-psali-conclusion.m4a');
  });

  test('Annual Aripsalin has only midnight-aripsalin.m4a (no Kiahk Joe Seif recording)', () => {
    const hymn = findHymn(annualMidnight?.hymns, 'annual-midnight-greek-psali-watos');
    expect(hymn).toBeDefined();
    const coptic = hymn?.versions.find((v) => v.language === 'coptic');
    expect(coptic?.audio).toBe('midnight-aripsalin.m4a');
    expect(coptic?.otherAudio).toBeUndefined();
  });

  test('Kiahk Aripsalin has Kiahk Joe Seif recording', () => {
    const kiahkMidnight = seasons.find((s) => s.id === 'kiahk')?.services.find((s) => s.id === 'kiahk-midnight');
    const hymn = findHymn(kiahkMidnight?.hymns, 'kiahk-midnight-hymn-17');
    expect(hymn).toBeDefined();
    const coptic = hymn?.versions.find((v) => v.language === 'coptic');
    expect(coptic?.audio).toBe('arsani-029-aripsalin-joe-seif-s-from-diocese-of-los-angeles-l.m4a');
  });

  test('Kata Nikhoros has 2nd recording by Arsani Sidarous & Mena Fawzy', () => {
    const pentecostLiturgy = seasons.find((s) => s.id === 'pentecost')?.services.find((s) => s.id === 'pentecost-liturgy');
    const hymn = findHymn(pentecostLiturgy?.hymns, 'pentecost-liturgy-kata-nichorous');
    expect(hymn).toBeDefined();
    const coptic = hymn?.versions.find((v) => v.language === 'coptic');
    expect(coptic?.otherAudio).toContain('kata-nikhoros-arsani-mena-fawzy.m4a');
  });

  test('Clarity ranking selects clearer recording as primary audio', () => {
    // 1. Ten Strings (Atai Parthenos): arsani-008 (clearer) is primary, Atai Parthenos.m4a & arsani-256 are secondary
    const annualVeneration = seasons.find((s) => s.id === 'annual')?.services.find((s) => s.id === 'annual-veneration');
    const tenStrings = findHymn(annualVeneration?.hymns, 'annual-veneration-ten-strings');
    expect(tenStrings).toBeDefined();
    const tenStringsCoptic = tenStrings?.versions.find((v) => v.language === 'coptic');
    expect(tenStringsCoptic?.audio).toBe('arsani-008-atai-parthenos.m4a');
    expect(tenStringsCoptic?.otherAudio).toContain('Atai Parthenos.m4a');
    expect(tenStringsCoptic?.otherAudio).toContain('arsani-256-atai-parthenos.m4a');

    // 2. Kiahk Psalm 150: arsani-194 (clearer) is primary, arsani-190 and arsani-155 are secondary
    const kiahkDist = seasons.find((s) => s.id === 'kiahk')?.services.find((s) => s.id === 'kiahk-distribution');
    const kiahkPsalm150 = findHymn(kiahkDist?.hymns, 'kiahk-distribution-hymn-1');
    expect(kiahkPsalm150).toBeDefined();
    const psalm150Coptic = kiahkPsalm150?.versions.find((v) => v.language === 'coptic');
    expect(psalm150Coptic?.audio).toBe('arsani-194-kiahk-psalm-150-live-la.m4a');
    expect(psalm150Coptic?.otherAudio).toContain('arsani-190-kiahk-psalm-150-2022.m4a');
    expect(psalm150Coptic?.otherAudio).toContain('arsani-155-kiahk-psalm-150-alleluia.m4a');

    // 3. Pentecost Ya Kol El Sefoof: arsani-044 (clearer) is primary, arsani-248 is secondary
    const pentLiturgy = seasons.find((s) => s.id === 'pentecost')?.services.find((s) => s.id === 'pentecost-liturgy');
    const sefoof = findHymn(pentLiturgy?.hymns, 'pentecost-liturgy-ya-kol-alsefoof');
    expect(sefoof).toBeDefined();
    const sefoofArabic = sefoof?.versions.find((v) => v.language === 'arabic');
    expect(sefoofArabic?.audio).toBe('arsani-044-ya-kol-al-sefoof.m4a');
    expect(sefoofArabic?.otherAudio).toContain('arsani-248-ya-kol-a-sefoof.m4a');

    // 4. Lent The Great High Priest: arsani-300 (clearer) is primary, arsani-208 is secondary
    const lentWeekday = seasons.find((s) => s.id === 'great-lent')?.services.find((s) => s.id === 'lent-weekday');
    const highPriest = findHymn(lentWeekday?.hymns, 'lent-weekday-the-great-high-priest');
    expect(highPriest).toBeDefined();
    const highPriestCoptic = highPriest?.versions.find((v) => v.language === 'coptic');
    expect(highPriestCoptic?.audio).toBe('arsani-300-the-great-high-priest-meeghalo.m4a');
    expect(highPriestCoptic?.otherAudio).toContain('arsani-208-meghalo-apenchoice.m4a');

    // 5. Palm Sunday Evlogimenos: arsani-236 (clearer) is primary, arsani-114 is secondary
    const palmDist = seasons.find((s) => s.id === 'palm-sunday')?.services.find((s) => s.id === 'palmsunday-distribution');
    const evlogimenos = palmDist?.hymns.find((h) => h.id.startsWith('palmsunday-distribution-the-hymn-of-palm-sunday'));
    expect(evlogimenos).toBeDefined();
    const evlogimenosCoptic = evlogimenos?.versions.find((v) => v.language === 'coptic');
    expect(evlogimenosCoptic?.audio).toBe('arsani-236-evlogimenos.m4a');
    expect(evlogimenosCoptic?.otherAudio).toContain('arsani-114-evlogimenos.m4a');
  });
});

describe('Divine Liturgy Audio and Bishop Updates', () => {
  const annualLiturgy = seasons.find((s) => s.id === 'annual')?.services.find((s) => s.id === 'annual-liturgy');

  test('Taishori in Annual Liturgy has only single recording and no second audio', () => {
    const taishori = annualLiturgy?.hymns.find((h) => h.id === 'annual-liturgy-offering-golden-censer');
    expect(taishori).toBeDefined();
    const coptic = taishori?.versions.find((v) => v.language === 'coptic');
    expect(coptic?.audio).toBe('liturgy-taishori.m4a');
    expect(coptic?.otherAudio).toBeUndefined();
  });

  test('In the Presence of a Bishop section header and Taishori + Hitens hymn exist in Annual Liturgy', () => {
    const header = annualLiturgy?.hymns.find((h) => h.id === 'annual-liturgy-bishop-header');
    expect(header).toBeDefined();
    expect(header?.isSectionHeader).toBe(true);
    expect(header?.title).toBe('In the Presence of a Bishop');

    const bishopHymn = annualLiturgy?.hymns.find((h) => h.id === 'annual-liturgy-taishori-hitens-bishop');
    expect(bishopHymn).toBeDefined();
    expect(bishopHymn?.title).toBe('Ⲧⲁⲓϣⲟⲩⲣⲏ ⲛⲉⲙ Ϩⲓⲧⲉⲛ (Taishori and Hitens)');

    const coptic = bishopHymn?.versions.find((v) => v.language === 'coptic');
    expect(coptic?.audio).toBe('arsani-030-taishori-hymn-of-intercessions.m4a');
    expect(coptic?.text).toContain('Ⲧⲁⲓϣⲟⲩⲣⲏ');
    expect(coptic?.text).toContain('Ϩⲓⲧⲉⲛ ⲛⲓⲡ̀ⲣⲉⲥⲃⲓⲁ');

    const english = bishopHymn?.versions.find((v) => v.language === 'english');
    expect(english?.text).toContain('This is the censer of pure gold');
    expect(english?.text).toContain('Through the intercessions');
  });

  test('Standard Adam Aspasmos audio recordings are assigned', () => {
    const aspasmosAdam1 = annualLiturgy?.hymns.find((h) => h.id === 'annual-liturgy-aspasmos-adam');
    expect(aspasmosAdam1?.versions.find((v) => v.language === 'coptic')?.audio).toBe('arsani-aspasmos-adam-onof-emmo.m4a');

    const aspasmosAdam3 = annualLiturgy?.hymns.find((h) => h.id === 'annual-liturgy-aspasmos-adam-3');
    expect(aspasmosAdam3?.versions.find((v) => v.language === 'coptic')?.audio).toBe('arsani-aspasmos-adam-o-christ-our-savior.m4a');
  });

  test('Before Confession has trimmed text ending at "And with your spirit" and English audio', () => {
    const allHymns = [...seasons, ...deaconCategories].flatMap((g) => g.services.flatMap((s) => flattenHymns(s.hymns)));
    const beforeConfession = allHymns.find((h) => h.id === 'd-annual-liturgy-faithful-in-christ-jesus-our-lord');
    expect(beforeConfession).toBeDefined();

    const english = beforeConfession?.versions.find((v) => v.language === 'english');
    expect(english?.audio).toBe('liturgy-before-confession-english.m4a');
    expect(english?.text).toMatch(/And with your spirit\.\s*$/);
    expect(english?.text).not.toContain('One is the All-Holy Father');

    const coptic = beforeConfession?.versions.find((v) => v.language === 'coptic');
    expect(coptic?.text).toMatch(/Ⲕⲉ ⲧⲱ ⲡ̀ⲛⲉⲩⲙⲁⲧⲓ ⲥⲟⲩ\.\s*$/);

    const arabic = beforeConfession?.versions.find((v) => v.language === 'arabic');
    expect(arabic?.text).toMatch(/ولروحِكَ أيضاً\.\s*$/);
  });

  test('Duplicate alleluia ID does not exist in any service', () => {
    const allHymns = [...seasons, ...deaconCategories].flatMap((g) => g.services.flatMap((s) => flattenHymns(s.hymns)));
    const dup = allHymns.filter((h) => h.id === 'annual-liturgy-alleluia-the-thought-of-man');
    expect(dup).toHaveLength(0);

    const canonical = allHymns.filter((h) => h.id.startsWith('annual-liturgy-offering-alleluia-thought-of-man'));
    expect(canonical.length).toBeGreaterThan(0);
    expect(canonical[0].versions.find((v) => v.language === 'coptic')?.audio).toBe('liturgy-je-fmevi.m4a');
  });

  test('Introduction to Pauline Epistle is present in Annual Liturgy and Deacon Liturgy of the Word', () => {
    const paulineIntro = annualLiturgy?.hymns.find((h) => h.id === 'annual-liturgy-pauline-intro');
    expect(paulineIntro).toBeDefined();

    // Ordered immediately before annual-liturgy-pihmot-gar
    const paulineIndex = annualLiturgy?.hymns.findIndex((h) => h.id === 'annual-liturgy-pauline-intro') ?? -1;
    const pihmotIndex = annualLiturgy?.hymns.findIndex((h) => h.id === 'annual-liturgy-pihmot-gar') ?? -1;
    expect(paulineIndex).toBeGreaterThan(-1);
    expect(pihmotIndex).toBe(paulineIndex + 1);

    // Verify all 5 versions
    const coptic = paulineIntro?.versions.find((v) => v.language === 'coptic');
    expect(coptic?.text).toContain('Ⲡⲓⲁⲛⲁⲅⲛⲱⲥⲧⲏⲥ:\n\nⲠⲁⲩⲗⲟⲥ ⲫ̀ⲃⲱⲕ');

    const engCoptic = paulineIntro?.versions.find((v) => v.language === 'englishCoptic');
    expect(engCoptic?.text).toContain('Pi-anagnōstēs:\n\nPaulos efvōk');

    const english = paulineIntro?.versions.find((v) => v.language === 'english');
    expect(english?.text).toContain('Reader:\n\nPaul, the servant of our Lord Jesus Christ');

    const engArabic = paulineIntro?.versions.find((v) => v.language === 'englishArabic');
    expect(engArabic?.text).toContain("El-Qari':\n\nBoulus 'abd");

    const arabic = paulineIntro?.versions.find((v) => v.language === 'arabic');
    expect(arabic?.text).toContain('القارئ:\n\nبولس عبد');

    // Deacon Liturgy of the Word has it too
    const deaconWord = deaconCategories
      .find((c) => c.id === 'deacon-annual')
      ?.services.find((s) => s.id === 'd-annual-liturgy-word');
    const deaconPauline = deaconWord?.hymns.find((h) => h.id === 'd-annual-liturgy-word-pauline-intro');
    expect(deaconPauline).toBeDefined();

    // Arabic title
    expect(displayTitle(paulineIntro!, 'ar')).toBe('البولس');
    expect(displayTitle(deaconPauline!, 'ar')).toBe('البولس');
  });
});

