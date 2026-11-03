import { dictionaryWords, prefixes } from '../coptic-dictionary';
import { dictionary, lookUpCoptic, lookUpMeaning, normCoptic, versesWith } from '../coptic-translator';

const pieces = (word: string) => lookUpCoptic(word, 'en').words[0].pieces?.map((p) => normCoptic(p.text));

describe('Coptic translator', () => {
  it('has every new word in both languages', () => {
    for (const word of dictionaryWords) {
      expect(word.meaning.en).toBeTruthy();
      expect(word.meaning.ar).toBeTruthy();
      expect(normCoptic(word.coptic)).toBeTruthy();
    }
    for (const prefix of prefixes) expect(prefix.ar).toBeTruthy();
    expect(dictionary().length).toBeGreaterThan(900);
  });

  it('gives the meaning of a Coptic word however it is written', () => {
    expect(lookUpCoptic('Ⲫ̀ⲛⲟⲩϯ', 'en').words[0].entries[0].meaning.en).toBe('God');
    expect(lookUpCoptic('ⲫⲛⲟⲩϯ', 'ar').words[0].entries[0].meaning.ar).toBe('الله');
    expect(lookUpCoptic('ⲡ̅ⲭ̅ⲥ̅', 'en').words[0].entries[0].meaning.en).toBe('Christ');
  });

  it('finds a whole phrase', () => {
    expect(lookUpCoptic('Ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ', 'en').phrase[0].meaning.en).toBe('Hail to you, Mary');
  });

  it('breaks a longer word into its pieces', () => {
    expect(pieces('ⲁϥϭⲓⲥⲁⲣⲝ')).toEqual(['ⲁϥ', 'ϭⲓⲥⲁⲣⲝ']);
    expect(pieces('ⲙⲁⲣⲟⲩⲥ̀ⲙⲟⲩ')).toEqual(['ⲙⲁⲣⲟⲩ', 'ⲥⲙⲟⲩ']);
    expect(pieces('ⲛⲏⲉ̀ⲧⲁⲩⲉⲛⲕⲟⲧ')).toEqual(['ⲛⲏⲉⲧ', 'ⲁⲩ', 'ⲉⲛⲕⲟⲧ']);
    expect(pieces('ⲁⲕⲑⲁⲙⲓⲟⲓ')).toEqual(['ⲁⲕ', 'ⲑⲁⲙⲓⲟ', 'ⲓ']);
    expect(pieces('ⲙ̀Ⲡ̀ⲟⲩⲣⲟ')).toEqual(['ⲙ', 'ⲡ', 'ⲟⲩⲣⲟ']);
    expect(pieces('ⲡⲉⲥⲕⲉⲛⲟⲩⲃ')).toEqual(['ⲡⲉⲥ', 'ⲕⲉ', 'ⲛⲟⲩⲃ']);
  });

  it("doesn't make nonsense of a word it can't read", () => {
    // ⲡⲁⲧⲣⲟⲥ (Greek "of the Father") is not "my + the + door + her"
    expect(pieces('ⲡⲁⲧⲣⲟⲥ')).toBeUndefined();
  });

  it('finds the Coptic for English and Arabic words', () => {
    expect(lookUpMeaning('God', 'en').matches.map((e) => normCoptic(e.coptic))).toContain('ⲫⲛⲟⲩϯ');
    expect(normCoptic(lookUpMeaning('how do you say thank you', 'en').matches[0].coptic)).toBe('ϯϣⲉⲡϩⲙⲟⲧⲛⲧⲟⲧⲕ');
    expect(lookUpMeaning('محبة', 'ar').matches.map((e) => normCoptic(e.coptic))).toContain('ⲁⲅⲁⲡⲏ');
    expect(lookUpMeaning('الرب', 'ar').matches.map((e) => normCoptic(e.coptic))).toContain('ⲡϭⲟⲓⲥ');
  });

  it('finds Coptic typed in English letters', () => {
    expect(lookUpMeaning('efnouti', 'en').bySound.map((e) => normCoptic(e.coptic))).toContain('ⲫⲛⲟⲩϯ');
  });

  it('shows verses from the hymns that use a word', () => {
    const verses = versesWith('ⲁϥϭⲓⲥⲁⲣⲝ');
    expect(verses.length).toBeGreaterThan(0);
    expect(verses.every((v) => normCoptic(v.coptic).includes('ⲁϥϭⲓⲥⲁⲣⲝ') && v.meaning.en)).toBe(true);
  });
});
