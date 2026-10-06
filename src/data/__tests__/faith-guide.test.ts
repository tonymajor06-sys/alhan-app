import { buildFaithQuiz, faithSections } from '../faith-guide';

describe('Our Faith', () => {
  it('has every section and item in both languages', () => {
    for (const section of faithSections) {
      for (const text of [section.title, section.desc, ...section.items.flatMap((i) => [i.text, ...(i.title ? [i.title] : [])])]) {
        expect(text.en).toBeTruthy();
        expect(text.ar).toBeTruthy();
      }
    }
  });

  it('gives every question four different options with one right answer', () => {
    for (const lang of ['en', 'ar'] as const) {
      const quiz = buildFaithQuiz(lang, 1000);
      expect(quiz.length).toBeGreaterThan(30);
      expect(new Set(quiz.map((q) => q.question)).size).toBe(quiz.length);
      for (const q of quiz) {
        expect(q.options).toHaveLength(4);
        expect(new Set(q.options).size).toBe(4);
        expect(q.options[q.answer]).toBeTruthy();
      }
    }
  });
});
