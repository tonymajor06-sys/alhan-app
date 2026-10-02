import { buildQuiz, copticAlphabet, copticWords, getPracticeVerses } from '../coptic-lessons';

describe('copticAlphabet', () => {
  it('has each letter once', () => {
    expect(new Set(copticAlphabet.map((l) => l.upper)).size).toBe(copticAlphabet.length);
  });
});

describe('buildQuiz', () => {
  it('gives four different options with the right answer among them', () => {
    for (const lang of ['en', 'ar'] as const) {
      const quiz = buildQuiz(lang);
      expect(quiz).toHaveLength(10);
      for (const q of quiz) {
        expect(new Set(q.options).size).toBe(4);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        const right = q.options[q.answer];
        if (q.kind === 'letter') {
          expect(copticAlphabet.find((l) => `${l.upper} ${l.lower}` === q.prompt)?.name).toBe(right);
        } else {
          expect(copticWords.find((w) => w.coptic === q.prompt)?.meaning[lang]).toBe(right);
        }
      }
    }
  });
});

describe('getPracticeVerses', () => {
  it('pairs Coptic verses with their pronunciation from the hymns', () => {
    const verses = getPracticeVerses();
    expect(verses.length).toBeGreaterThan(50);
    const verse = verses.find((v) => v.coptic.startsWith('Ⲧⲉⲙⲉⲧⲛⲓϣϯ ⲱ̀ Ⲙⲁⲣⲓⲁ'));
    expect(verse?.sound).toMatch(/^Te-metnishti o Maria/);
    expect(verse?.meaning).toMatch(/^Your greatness O Mary/);
    for (const v of verses) {
      expect(v.coptic).not.toMatch(/^\+/);
      expect(v.coptic.length).toBeLessThanOrEqual(160);
    }
  });
});
