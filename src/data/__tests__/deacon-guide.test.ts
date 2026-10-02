import { buildGuideQuiz } from '../deacon-guide';

describe('buildGuideQuiz', () => {
  it('gives every question four different options with one right answer', () => {
    for (const lang of ['en', 'ar'] as const) {
      // A large count returns every question once
      const quiz = buildGuideQuiz(lang, 1000);
      expect(quiz.length).toBeGreaterThan(30);
      expect(new Set(quiz.map((q) => q.question)).size).toBe(quiz.length);
      for (const q of quiz) {
        expect(q.question).toBeTruthy();
        expect(q.options).toHaveLength(4);
        expect(new Set(q.options).size).toBe(4);
        expect(q.options[q.answer]).toBeTruthy();
      }
    }
  });

  it('asks ten questions per round', () => {
    expect(buildGuideQuiz('en')).toHaveLength(10);
  });
});
