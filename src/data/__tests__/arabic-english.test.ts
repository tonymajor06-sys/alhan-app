import { englishToArabic, withoutVowelMarks } from '../arabic-english';

describe('englishToArabic', () => {
  it('writes common hymn words by how they sound', () => {
    expect(withoutVowelMarks(englishToArabic('Lord have mercy'))).toBe('لورد هڤ مرسي');
    expect(withoutVowelMarks(englishToArabic('We worship the Father'))).toBe('وي ورشپ ذ فاذر');
  });

  it('writes g as ج, as Copts say it', () => {
    expect(englishToArabic('glory')).toBe('جلوري');
  });

  it('uses the church spelling of names', () => {
    expect(englishToArabic('Theotokos')).toBe('ثيئوطوكوس');
  });

  it('spells out names it does not know, letter by letter', () => {
    expect(englishToArabic('Pisura')).toBe('پيسورا');
  });

  it('handles plurals and possessives of known words', () => {
    expect(englishToArabic('intercessions')).toMatch(/ز$/);
    expect(englishToArabic("creator's")).toMatch(/ز$/);
  });

  it('keeps speaker labels as labels and uses Arabic punctuation', () => {
    expect(englishToArabic('People:\n\nAmen, amen?')).toBe('الشعب:\n\nإيمِن، إيمِن؟');
  });
});

describe('englishToArabic with literal line breaks', () => {
  it('turns a literal "\\n" into a verse break instead of reading the n as a letter', () => {
    expect(englishToArabic('Lord\\n\\nmercy')).toBe(englishToArabic('Lord\n\nmercy'));
  });
});
