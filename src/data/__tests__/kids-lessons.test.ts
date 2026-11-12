import { buildKidQuiz, kidLessons } from '../kids-lessons';

describe('Kids Corner stories', () => {
  it('have unique ids', () => {
    expect(new Set(kidLessons.map((l) => l.id)).size).toBe(kidLessons.length);
  });

  it('are written out in English and Arabic', () => {
    for (const lesson of kidLessons) {
      const texts = [lesson.title, ...lesson.steps, lesson.verse.text, lesson.verse.ref, lesson.remember];
      for (const text of texts) {
        expect(text.en.trim()).not.toBe('');
        expect(text.ar.trim()).not.toBe('');
      }
      expect(lesson.steps).toHaveLength(3);
    }
  });

  it('ask three questions, each with one right answer and three different wrong ones', () => {
    for (const lesson of kidLessons) {
      expect(lesson.quiz).toHaveLength(3);
      for (const question of lesson.quiz) {
        for (const lang of ['en', 'ar'] as const) {
          const answers = [question.right[lang], ...question.wrong.map((w) => w[lang])];
          expect(answers).toHaveLength(4);
          expect(new Set(answers).size).toBe(4);
        }
      }
      expect(buildKidQuiz(lesson, 'en')).toHaveLength(3);
    }
  });
});
