import { seasons, deaconCategories, flattenHymns, Hymn } from '../hymns';
import { arsaniAudio } from '../arsani-audio';
import { displayTitle } from '../arabic-titles';

const findHymn = (hymns: Hymn[] | undefined, id: string): Hymn | undefined => (hymns ? flattenHymns(hymns).find((h) => h.id === id) : undefined);

describe('Sunday Theotokia Audio Recordings', () => {
  const annualMidnight = seasons.find((s) => s.id === 'annual')?.services.find((s) => s.id === 'annual-midnight');
  const annualVesperPraises = seasons.find((s) => s.id === 'annual')?.services.find((s) => s.id === 'annual-vesper-praises');


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

    // 4. Lent The Great High Priest (Megalo, sung on weekends only): arsani-300 (clearer) comes before arsani-208
    const lent = seasons.find((s) => s.id === 'great-lent');
    expect(findHymn(lent?.services.find((s) => s.id === 'lent-weekday')?.hymns, 'lent-weekday-the-great-high-priest')).toBeUndefined();
    const highPriest = findHymn(lent?.services.find((s) => s.id === 'lent-weekend')?.hymns, 'lent-weekend-liturgy-the-great-high-priest');
    expect(highPriest).toBeDefined();
    const highPriestFiles = highPriest?.versions.find((v) => v.language === 'coptic')?.otherAudio ?? [];
    expect(highPriestFiles.indexOf('arsani-300-the-great-high-priest-meeghalo.m4a')).toBeLessThan(highPriestFiles.indexOf('arsani-208-meghalo-apenchoice.m4a'));
    expect(highPriestFiles.indexOf('arsani-300-the-great-high-priest-meeghalo.m4a')).toBeGreaterThanOrEqual(0);

    // 5. Palm Sunday Evlogimenos: arsani-236 (clearer) is primary, duplicate arsani-114 is removed
    const palmDist = seasons.find((s) => s.id === 'palm-sunday')?.services.find((s) => s.id === 'palmsunday-distribution');
    const evlogimenos = palmDist?.hymns.find((h) => h.id.startsWith('palmsunday-distribution-the-hymn-of-palm-sunday'));
    expect(evlogimenos).toBeDefined();
    const evlogimenosCoptic = evlogimenos?.versions.find((v) => v.language === 'coptic');
    expect(evlogimenosCoptic?.audio).toBe('arsani-236-evlogimenos.m4a');
    expect(evlogimenosCoptic?.otherAudio ?? []).not.toContain('arsani-114-evlogimenos.m4a');
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
    const aspasmosAdam1 = findHymn(annualLiturgy?.hymns, 'annual-liturgy-aspasmos-adam');
    expect(aspasmosAdam1?.versions.find((v) => v.language === 'coptic')?.audio).toBe('arsani-aspasmos-adam-onof-emmo.m4a');

    const aspasmosAdam3 = findHymn(annualLiturgy?.hymns, 'annual-liturgy-aspasmos-adam-3');
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

    // Read in every Liturgy of the Word (after Hitens), not only before a bishop; Ⲡⲓϩ̀ⲙⲟⲧ ⲅⲁⲣ stays in the bishop's section
    const ids = annualLiturgy?.hymns.map((h) => h.id) ?? [];
    const paulineIndex = ids.indexOf('annual-liturgy-pauline-intro');
    expect(paulineIndex).toBe(ids.indexOf('annual-liturgy-hitens') + 1);
    expect(paulineIndex).toBeLessThan(ids.indexOf('annual-liturgy-bishop-header'));
    expect(ids.indexOf('annual-liturgy-pihmot-gar')).toBeGreaterThan(ids.indexOf('annual-liturgy-bishop-header'));
    expect(paulineIntro?.title).toBe('Ⲡⲁⲩⲗⲟⲥ (Pauline Coptic Reading)');

    // Verify all 5 versions
    const coptic = paulineIntro?.versions.find((v) => v.language === 'coptic');
    expect(coptic?.text).toContain('Ⲡⲓⲁⲛⲁⲅⲛⲱⲥⲧⲏⲥ:\n\nⲠⲁⲩⲗⲟⲥ ⲫ̀ⲃⲱⲕ');

    const engCoptic = paulineIntro?.versions.find((v) => v.language === 'englishCoptic');
    expect(engCoptic?.text).toContain('Pi-anaghnostees:\n\nPavlos efvok');

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
    expect(displayTitle(paulineIntro!, 'ar')).toBe('قراءة البولس بالقبطي');
    // the Deacon Responses are named by their first words
    expect(displayTitle(deaconPauline!, 'ar')).toMatch(/^بولس عبد يسوع المسيح/);
  });

  test('Verse of the Cymbals has single recording (no second recording)', () => {
    const annualMatins = seasons.find((s) => s.id === 'annual')?.services.find((s) => s.id === 'annual-matins');
    const verseOfCymbals = annualMatins?.hymns.find((h) => h.id === 'annual-matins-verse-of-cymbals');
    expect(verseOfCymbals).toBeDefined();
    const coptic = verseOfCymbals?.versions.find((v) => v.language === 'coptic');
    expect(coptic?.audio).toBe('verse-of-the-cymbals-annual.m4a');
    expect(coptic?.otherAudio ?? []).toHaveLength(0);
  });

  test('Blessed Are You has Blessed are you.m4a as primary audio and no liturgy-ksmarout.m4a', () => {
    const blessed = annualLiturgy?.hymns.find((h) => h.id === 'annual-liturgy-offering-blessed-are-you');
    expect(blessed).toBeDefined();
    const coptic = blessed?.versions.find((v) => v.language === 'coptic');
    expect(coptic?.audio).toBe('Blessed are you.m4a');
    expect(coptic?.otherAudio ?? []).not.toContain('liturgy-ksmarout.m4a');
  });

  test('Introduction to the Fraction is removed from Liturgy', () => {
    const allHymns = [...seasons, ...deaconCategories].flatMap((g) => g.services.flatMap((s) => flattenHymns(s.hymns)));
    const fraction = allHymns.find((h) => h.id === 'annual-liturgy-introduction-to-the-fraction');
    expect(fraction).toBeUndefined();
  });

  test('Praxis Response Shere Maria has only single recording (2nd and 3rd removed)', () => {
    const praxisResponse = annualLiturgy?.hymns.find((h) => h.id === 'annual-liturgy-praxis-response');
    expect(praxisResponse).toBeDefined();
    const coptic = praxisResponse?.versions.find((v) => v.language === 'coptic');
    expect(coptic?.audio).toBe('liturgy-praxis-response.m4a');
    expect(coptic?.otherAudio ?? []).not.toContain('arsani-240-long-praxis-response-shere-ne-maria.m4a');
    expect(coptic?.otherAudio ?? []).not.toContain('arsani-115-melismatic-shere-ne-maria-praxis-response.m4a');
    expect(coptic?.otherAudio ?? []).toHaveLength(0);
  });

  test('Through the Intercessions of the Theotokos (53s) is completely removed', () => {
    const allHymns = [...seasons, ...deaconCategories].flatMap((g) => g.services.flatMap((s) => flattenHymns(s.hymns)));
    const hiten = allHymns.find((h) => h.id === 'annual-liturgy-hiten-ni-presvia-eleos');
    expect(hiten).toBeUndefined();

    // Check no version references the 53-second audio file
    const audioVersions = allHymns.flatMap((h) => h.versions).filter((v) => v.audio === 'liturgy-faithful-hitens.m4a' || v.otherAudio?.includes('liturgy-faithful-hitens.m4a'));
    expect(audioVersions).toHaveLength(0);
  });

  test('Standard Watos Aspasmos (O Lord God) has only first audio (2nd duplicate removed)', () => {
    const aspasmos = findHymn(annualLiturgy?.hymns, 'annual-liturgy-aspasmos-watos');
    expect(aspasmos).toBeDefined();
    const coptic = aspasmos?.versions.find((v) => v.language === 'coptic');
    expect(coptic?.audio).toBe('liturgy-aspasmos-watos.m4a');
    expect(coptic?.otherAudio ?? []).not.toContain('arsani-078-annual-aspasmos-watos-epchois-efnoti-archi-seattle.m4a');
    expect(coptic?.otherAudio ?? []).toHaveLength(0);
  });

  test('Lent weekend and weekday liturgies have Pauline intro', () => {
    const lent = seasons.find((s) => s.id === 'great-lent');
    const weekendHymns = flattenHymns(lent?.services.find((s) => s.id === 'lent-weekend')?.hymns ?? []);
    const weekdayHymns = flattenHymns(lent?.services.find((s) => s.id === 'lent-weekday')?.hymns ?? []);

    const weekendPauline = weekendHymns.find((h) => h.id === 'lent-weekend-liturgy-pauline-intro');
    const weekdayPauline = weekdayHymns.find((h) => h.id === 'lent-weekday-liturgy-pauline-intro');

    expect(weekendPauline).toBeDefined();
    expect(weekdayPauline).toBeDefined();
    expect(displayTitle(weekendPauline!, 'ar')).toBe('قراءة البولس بالقبطي');
    expect(displayTitle(weekdayPauline!, 'ar')).toBe('قراءة البولس بالقبطي');
  });
});

describe('The three Divine Liturgies', () => {
  const annual = seasons.find((s) => s.id === 'annual')!;
  const liturgy = annual.services.find((s) => s.id === 'annual-liturgy')!;
  const deaconAnnual = deaconCategories.find((c) => c.id === 'deacon-annual')!;
  const ids = (hymns: Hymn[]) => hymns.filter((h) => !h.isSectionHeader).map((h) => h.id.split('@')[0]);

  test('Deacon Responses > Annual has St Basil, St Gregory and St Cyril instead of one Liturgy of the Faithful', () => {
    const services = deaconAnnual.services.map((s) => s.id);
    expect(services).not.toContain('d-annual-liturgy-faithful');
    expect(services.slice(services.indexOf('d-annual-liturgy-word') + 1, services.indexOf('d-annual-liturgy-word') + 4)).toEqual([
      'd-annual-liturgy-basil',
      'd-annual-liturgy-gregory',
      'd-annual-liturgy-cyril',
    ]);
    expect(deaconCategories.find((c) => c.id === 'deacon-festival')!.services.map((s) => s.id)).toEqual(
      expect.arrayContaining(['d-fest-liturgy-basil', 'd-fest-liturgy-gregory', 'd-fest-liturgy-cyril'])
    );
  });

  test("each liturgy has its own responses, in Spirit & Truth's order", () => {
    // (without what is said in the presence of the Pope or a bishop, which ends each liturgy)
    const of = (id: string) => ids(deaconAnnual.services.find((s) => s.id === id)!.hymns).filter((h) => !h.startsWith('d-annual-bishop-'));
    const basil = of('d-annual-liturgy-basil');
    const gregory = of('d-annual-liturgy-gregory');
    const cyril = of('d-annual-liturgy-cyril');
    expect(basil).toContain('d-annual-liturgy-faithful-epiclesis');
    expect(basil.some((id) => /st-(gregory|cyril)/.test(id))).toBe(false);
    expect(gregory).toContain('d-annual-liturgy-faithful-pray-for-the-captives-st-gregory');
    expect(gregory.some((id) => /st-cyril/.test(id))).toBe(false);
    expect(cyril).toContain('d-annual-liturgy-faithful-pray-for-the-patriarch-st-cyril');
    expect(cyril.some((id) => /st-gregory/.test(id))).toBe(false);
    // St Cyril has no Commemoration with Pinishti
    expect(cyril.some((id) => id.includes('pinishti'))).toBe(false);
    for (const list of [basil, gregory, cyril]) {
      expect(list.indexOf('d-annual-liturgy-faithful-greet-one-another')).toBeLessThan(list.indexOf('d-annual-liturgy-faithful-anaphora'));
    }
    expect(gregory[gregory.length - 1]).toBe('d-annual-liturgy-faithful-peace-and-love');
    // St Basil: Worship God the Father, Amen. Amen. Pray. right before the Confession, and one Confession with what follows it
    expect(basil).toContain('d-annual-liturgy-faithful-worship-god-the-father');
    expect(basil[basil.length - 2]).toBe('d-annual-liturgy-faithful-amen-let-us-pray');
    expect(basil[basil.length - 1]).toBe('d-annual-liturgy-faithful-the-confession');
    for (const gone of ['confession', 'confession-great', 'peace-and-love']) expect(basil).not.toContain(`d-annual-liturgy-faithful-${gone}`);
    // Every response has its words in every language the reader offers
    for (const service of deaconAnnual.services.filter((s) => /-liturgy-(basil|gregory|cyril)$/.test(s.id))) {
      for (const hymn of service.hymns.filter((h) => !h.isSectionHeader)) {
        expect(hymn.versions.map((v) => v.language)).toEqual(expect.arrayContaining(['coptic', 'englishCoptic', 'english', 'englishArabic', 'arabic']));
      }
    }
  });

  test('Annual > Liturgy groups the Liturgy of the Faithful hymns by liturgy', () => {
    const header = liturgy.hymns.findIndex((h) => h.id === 'annual-liturgy-faithful-header');
    const groups = liturgy.hymns.slice(header + 1);
    expect(groups.map((g) => g.id)).toEqual(['annual-liturgy-basil', 'annual-liturgy-gregory', 'annual-liturgy-cyril']);
    const [basil, gregory, cyril] = groups.map((g) => ids(g.children!));
    expect(basil).toContain('annual-liturgy-may-their-holy-blessings');
    expect(gregory).toEqual(basil);
    expect(cyril).not.toContain('annual-liturgy-may-their-holy-blessings');
    // St Basil sings According to Your Mercy before Your Death, O Lord; St Cyril after it
    expect(basil.indexOf('annual-liturgy-kata-to-eleos')).toBeLessThan(basil.indexOf('annual-liturgy-amen-ton-thanaton'));
    expect(cyril.indexOf('annual-liturgy-kata-to-eleos')).toBeGreaterThan(cyril.indexOf('annual-liturgy-amen-ton-thanaton'));
    // The copies keep the recordings
    const audio = (g: Hymn) => g.children!.find((h) => h.id.startsWith('annual-liturgy-aspasmos-adam'))!.versions.find((v) => v.language === 'coptic')?.audio;
    expect(audio(groups[2])).toBe(audio(groups[0]));
  });

  test('Arabic names for the liturgies and their sections', () => {
    expect(displayTitle(deaconAnnual.services.find((s) => s.id === 'd-annual-liturgy-cyril')!, 'ar')).toBe('قداس القديس كيرلس الكبير');
    expect(displayTitle(liturgy.hymns.find((h) => h.id === 'annual-liturgy-basil')!, 'ar')).toBe('قداس القديس باسيليوس الكبير');
    const header = deaconAnnual.services.find((s) => s.id === 'd-annual-liturgy-basil')!.hymns[0];
    expect(displayTitle(header, 'ar')).toBe('الثلاث أواشي الكبار');
  });
});

describe('Recordings', () => {
  test('Pinishti is cut in two: Let Those Who Read, then Pinishti', () => {
    const basil = deaconCategories.find((c) => c.id === 'deacon-annual')!.services.find((s) => s.id === 'd-annual-liturgy-basil')!.hymns;
    const audio = (id: string) => basil.find((h) => h.id === id)!.versions.find((v) => v.language === 'coptic')?.audio;
    expect(audio('d-annual-liturgy-faithful-let-those-who-read')).toBe('arsani-035-let-those-who-read.m4a');
    expect(audio('d-annual-liturgy-faithful-the-great-abba-antony-pinishti')).toBe('arsani-035-pinishti.m4a');
  });
});
