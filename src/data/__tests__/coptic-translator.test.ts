import { dictionaryWords, prefixes } from '../coptic-dictionary';
import { copticFromSound, dictionary, hymnVersesFor, lookUpCoptic, lookUpMeaning, normCoptic, versesSaying, versesWith } from '../coptic-translator';

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

  it('finds a word spelled another way, and only offers one a letter off', () => {
    const written = (word: string) => lookUpCoptic(word, 'en').words[0];
    expect(written('ⲫⲛⲟⲩⲧⲓ').entries[0].meaning.en).toBe('God');
    expect(normCoptic(written('ⲫⲛⲟⲩⲧⲓ').spelled!)).toBe('ⲫⲛⲟⲩϯ');
    expect(written('ⲁⲅⲁⲡⲓ').entries[0].meaning.en).toBe('love');
    // ⲡⲁⲧⲣⲟⲥ is not Peter: Ⲡⲉⲧⲣⲟⲥ is only suggested
    expect(written('ⲡⲁⲧⲣⲟⲥ').entries).toHaveLength(0);
    expect(normCoptic(written('ⲡⲁⲧⲣⲟⲥ').nearest!.coptic)).toBe('ⲡⲉⲧⲣⲟⲥ');
  });

  it('gives a sentence word for word, and the closest verse in the hymns', () => {
    const sentence = lookUpCoptic('ⲁϥⲧⲱⲛϥ ⲛ̀ϫⲉ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ ϧⲉⲛ ⲡⲓⲙ̀ϩⲁⲩ', 'en');
    expect(sentence.gloss).toBe('He rose · Christ · in · the tomb');
    expect(lookUpCoptic('ⲁϥⲧⲱⲛϥ ⲛ̀ϫⲉ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ ϧⲉⲛ ⲡⲓⲙ̀ϩⲁⲩ', 'ar').gloss).toBe('قام · المسيح · في · القبر');
    // A phrase in the dictionary needs no word-for-word line
    expect(lookUpCoptic('Ⲭⲉⲣⲉ ⲛⲉ Ⲙⲁⲣⲓⲁ', 'en').gloss).toBeNull();
    const close = hymnVersesFor('ⲁϥⲧⲱⲛϥ ⲛ̀ϫⲉ Ⲡⲓⲭ̀ⲣⲓⲥⲧⲟⲥ ϧⲉⲛ ⲡⲓⲙ̀ϩⲁⲩ');
    expect(close.verses.length).toBeGreaterThan(0);
  });

  it('reads Coptic typed in English letters, however it is spelled', () => {
    for (const typed of ['pchois', 'epchois', 'Epshois']) expect(normCoptic(copticFromSound(typed)!)).toBe('ⲡϭⲟⲓⲥ');
    expect(normCoptic(lookUpMeaning('pikhristos aftonf', 'en').asCoptic!)).toBe('ⲡⲓⲭⲣⲓⲥⲧⲟⲥⲁϥⲧⲱⲛϥ');
    // English stays English
    expect(lookUpMeaning('peace', 'en').asCoptic).toBeUndefined();
  });

  it('finds English through its endings and typing slips', () => {
    expect(lookUpMeaning('praises', 'en').searchedFor).toBe('praise');
    expect(lookUpMeaning('churches', 'en').searchedFor).toBe('church');
    expect(lookUpMeaning('resurection', 'en').searchedFor).toBe('resurrection');
    expect(normCoptic(lookUpMeaning('resurection', 'en').matches[0].coptic)).toBe('ⲁⲛⲁⲥⲧⲁⲥⲓⲥ');
  });

  it('finds the verses that say an English or Arabic sentence', () => {
    expect(versesSaying('Christ is risen from the dead').some((v) => normCoptic(v.coptic).includes('ⲁϥⲧⲱⲛϥ'))).toBe(true);
    expect(versesSaying('المسيح قام من الأموات').length).toBeGreaterThan(0);
  });
});
