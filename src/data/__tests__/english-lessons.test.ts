import { buildEnglishQuiz, englishAlphabet, englishSound, englishWords, getEnglishPracticeVerses } from '../english-lessons';

describe('Learn English', () => {
  it('has all 26 letters with different names', () => {
    expect(englishAlphabet).toHaveLength(26);
    expect(new Set(englishAlphabet.map((l) => l.name)).size).toBe(26);
  });

  it('writes every word and example in Arabic letters', () => {
    for (const text of [...englishWords.map((w) => w.english), ...englishAlphabet.map((l) => l.example)]) {
      expect(englishSound(text)).toMatch(/[؀-ۿ]/);
    }
  });

  it('gives every question four different options with one right answer', () => {
    const quiz = buildEnglishQuiz(20);
    expect(quiz).toHaveLength(20);
    for (const q of quiz) {
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options).size).toBe(4);
      expect(q.options[q.answer]).toBeTruthy();
    }
  });

  it('finds English verses to practise, each with its Arabic-letter sound', () => {
    const verses = getEnglishPracticeVerses();
    expect(verses.length).toBeGreaterThan(50);
    for (const v of verses) expect(v.sound).toMatch(/[؀-ۿ]/);
  });
});
