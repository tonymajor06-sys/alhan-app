import { buildLessonQuiz, lessons, schoolDay, units } from '../theology-school';

describe('Theology School', () => {
  it('has a month of lessons, each in both languages and in a unit', () => {
    expect(lessons.length).toBeGreaterThanOrEqual(30);
    expect(new Set(lessons.map((l) => l.id)).size).toBe(lessons.length);
    for (const lesson of lessons) {
      expect(units.some((u) => u.id === lesson.unit)).toBe(true);
      expect(lesson.sections.length).toBeGreaterThanOrEqual(2);
      expect(lesson.remember).toHaveLength(3);
      const texts = [lesson.title, lesson.hook, lesson.verse.text, lesson.verse.ref, lesson.know, ...lesson.remember, ...lesson.sections.flatMap((s) => [s.heading, s.body])];
      for (const text of texts) {
        expect(text.en.trim()).toBeTruthy();
        expect(text.ar.trim()).toBeTruthy();
      }
    }
  });

  it('ends every lesson with a quiz of four different answers per question', () => {
    for (const lesson of lessons) {
      expect(lesson.quiz.length).toBeGreaterThanOrEqual(4);
      for (const lang of ['en', 'ar'] as const) {
        const quiz = buildLessonQuiz(lesson, lang);
        expect(quiz).toHaveLength(lesson.quiz.length);
        for (const q of quiz) {
          expect(q.question).toBeTruthy();
          expect(q.options).toHaveLength(4);
          expect(new Set(q.options).size).toBe(4);
        }
      }
    }
  });

  it('gives one new lesson a day and counts the streak', () => {
    const start = schoolDay({}, 100);
    expect(start.next?.id).toBe(lessons[0].id);
    expect(start.doneToday).toBe(false);
    expect(start.streak).toBe(0);

    const first = { [lessons[0].id]: { day: 100, right: 4, total: 4 } };
    const sameDay = schoolDay(first, 100);
    expect(sameDay.next?.id).toBe(lessons[1].id);
    expect(sameDay.doneToday).toBe(true);
    expect(sameDay.streak).toBe(1);

    // The next morning the streak still stands until the day ends
    expect(schoolDay(first, 101)).toMatchObject({ doneToday: false, streak: 1 });
    // A missed day breaks it
    expect(schoolDay(first, 102).streak).toBe(0);

    const three = { ...first, [lessons[1].id]: { day: 101, right: 3, total: 4 }, [lessons[2].id]: { day: 102, right: 4, total: 4 } };
    expect(schoolDay(three, 102)).toMatchObject({ streak: 3, doneCount: 3 });
  });
});
