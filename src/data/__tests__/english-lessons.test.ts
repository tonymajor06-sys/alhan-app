import { englishAlphabet, englishMoreWords, englishSound, englishWords, getEnglishPracticeVerses } from '../english-lessons';

describe('Learn English', () => {
  it('has all 26 letters with different names', () => {
    expect(englishAlphabet).toHaveLength(26);
    expect(new Set(englishAlphabet.map((l) => l.name)).size).toBe(26);
  });

  it('writes every word and example in Arabic letters', () => {
    for (const text of [...englishWords, ...englishMoreWords].map((w) => w.english).concat(englishAlphabet.map((l) => l.example))) {
      expect(englishSound(text)).toMatch(/[؀-ۿ]/);
    }
  });

  it('finds English verses to practise, each with its Arabic-letter sound', () => {
    const verses = getEnglishPracticeVerses();
    expect(verses.length).toBeGreaterThan(50);
    for (const v of verses) expect(v.sound).toMatch(/[؀-ۿ]/);
  });
});
