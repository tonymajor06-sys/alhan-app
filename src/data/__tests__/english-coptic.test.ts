import { copticToEnglish } from '../english-coptic';

describe('copticToEnglish', () => {
  it('handles Ganga (ϫ) as j before e-sound vowels (ⲉ, ⲏ, ⲓ, ⲩ) and g otherwise', () => {
    // Ϫⲱⲣ before ⲱ -> Gōr
    // ⲛ̀ⲛⲓϫⲁϫⲓ -> ϫ before ⲁ = g, ϫ before ⲓ = j -> ennigaji
    expect(copticToEnglish('Ϫⲱⲣ ⲉ̀ⲃⲟⲗ ⲛ̀ⲛⲓϫⲁϫⲓ')).toBe('Gōr evol ennigaji');
    expect(copticToEnglish('ϫⲉ')).toBe('je');
    expect(copticToEnglish('ϫⲓⲛⲙⲓⲥⲓ')).toBe('jinmisi');
    expect(copticToEnglish('ϫⲟⲙ')).toBe('gom');
    expect(copticToEnglish('ⲡⲓϫⲁϫⲓ')).toBe('pigaji');
  });

  it('handles Bēta (ⲃ) as v before vowel and b otherwise', () => {
    expect(copticToEnglish('ⲉ̀ⲃⲟⲗ')).toBe('evol');
    expect(copticToEnglish('ⲛⲟⲃⲓ')).toBe('novi');
    expect(copticToEnglish('ⲧⲱⲃϩ')).toBe('tōbh');
  });

  it('handles Shere for Ⲭⲉⲣⲉ', () => {
    expect(copticToEnglish('Ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ')).toBe('Shere ne Maria');
  });
});

