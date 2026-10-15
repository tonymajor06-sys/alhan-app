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

  test('Sunday Theotokia parts 1 to 6 in Vesper Praises have original audio and second recording', () => {
    for (let i = 1; i <= 6; i++) {
      const hymn = findHymn(annualVesperPraises?.hymns, `annual-vesper-praises-sunday-theotokia-part-${i}`);
      expect(hymn).toBeDefined();
      const coptic = hymn?.versions.find((v) => v.language === 'coptic');
      expect(coptic?.audio).toBe(`midnight-sunday-theotokion-${i}.m4a`);
      expect(coptic?.otherAudio).toContain(`arsani-223-sunday-theotokia-part-${i}.m4a`);
    }
  });

  test('Adam Psali Conclusion in Midnight Praises has original audio and second recording', () => {
    const hymn = findHymn(annualMidnight?.hymns, 'annual-midnight-sunday-adam-psali-conclusion');
    expect(hymn).toBeDefined();
    const coptic = hymn?.versions.find((v) => v.language === 'coptic');
    expect(coptic?.audio).toBe('midnight-adam-psali-conclusion.m4a');
    expect(coptic?.otherAudio).toContain('arsani-223-sunday-adam-psali-conclusion.m4a');
  });
});
