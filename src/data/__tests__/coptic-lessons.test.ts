import { arabicAlphabet, arabicForms, arabicWords, buildArabicQuiz, getArabicPracticeVerses } from '../arabic-lessons';
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
    expect(verse?.sound).toMatch(/^Temetnishti ō Maria/);
    expect(verse?.meaning).toMatch(/^Your greatness O Mary/);
    for (const v of verses) {
      expect(v.coptic).not.toMatch(/^\+/);
      expect(v.coptic.length).toBeLessThanOrEqual(160);
    }
  });
});

describe('arabicAlphabet', () => {
  it('has all 28 letters once, each with an example that uses it', () => {
    expect(arabicAlphabet).toHaveLength(28);
    expect(new Set(arabicAlphabet.map((l) => l.letter)).size).toBe(28);
    for (const l of arabicAlphabet) expect(l.example).toContain(l.letter);
  });

  it('gives letters that do not join forward no start or middle form', () => {
    const dal = arabicAlphabet.find((l) => l.letter === 'د')!;
    expect(arabicForms(dal)).toEqual({ alone: 'د', start: 'د', middle: 'ـد', end: 'ـد' });
    const ba = arabicAlphabet.find((l) => l.letter === 'ب')!;
    expect(arabicForms(ba)).toEqual({ alone: 'ب', start: 'بـ', middle: 'ـبـ', end: 'ـب' });
  });
});

describe('Learn Arabic', () => {
  it('builds a quiz of letter names and word meanings with the right answer among four options', () => {
    const quiz = buildArabicQuiz();
    expect(quiz).toHaveLength(10);
    for (const q of quiz) {
      expect(new Set(q.options).size).toBe(4);
      const right = q.options[q.answer];
      if (q.kind === 'letter') expect(arabicAlphabet.find((l) => l.letter === q.prompt)?.name.en).toBe(right);
      else expect(arabicWords.find((w) => w.arabic === q.prompt)?.meaning).toBe(right);
    }
  });

  it('pairs Arabic verses from the hymns with their pronunciation', () => {
    const verses = getArabicPracticeVerses();
    expect(verses.length).toBeGreaterThan(50);
    const verse = verses.find((v) => v.arabic.startsWith('قوموا يا بني النور'));
    expect(verse?.sound).toMatch(/^Qumu ya bani en-nour/);
    expect(verse?.meaning).toMatch(/^Arise O you children of the light/);
  });
});
