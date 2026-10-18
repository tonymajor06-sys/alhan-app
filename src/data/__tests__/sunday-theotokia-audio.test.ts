import { seasons, flattenHymns, Hymn } from '../hymns';
import { arsaniAudio } from '../arsani-audio';

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
