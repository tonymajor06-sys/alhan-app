import { arabicAlphabet } from '../arabic-lessons';
import { courseUnits, lessonExercises, lettersOfWord, reviewExercises } from '../arabic-course';

describe('Learn Arabic > Letter by Letter', () => {
  it('teaches every letter of the alphabet once', () => {
    const taught = courseUnits.flatMap((u) => u.letters);
    expect(new Set(taught).size).toBe(taught.length);
    expect([...taught].sort()).toEqual(arabicAlphabet.map((l) => l.letter).sort());
  });

  it('only gives words written with letters already learned', () => {
    const known = new Set<string>();
    for (const unit of courseUnits) {
      unit.letters.forEach((l) => known.add(l));
      (unit.marks ?? []).filter((m) => [...m].length === 1).forEach((m) => known.add(m));
      for (const word of unit.words) {
        for (const letter of lettersOfWord(word.arabic)) expect(`${unit.id} ${word.arabic}: ${known.has(letter) ? 'ok' : letter}`).toBe(`${unit.id} ${word.arabic}: ok`);
      }
    }
  });

  it('builds every lesson with questions whose answer is one of the choices, all different', () => {
    courseUnits.forEach((_, i) => {
      const questions = lessonExercises(i).filter((e) => e.kind === 'question');
      expect(questions.length).toBeGreaterThanOrEqual(8);
      for (const q of questions) {
        if (q.kind !== 'question') continue;
        expect(q.choices).toContain(q.answer);
        expect(new Set(q.choices).size).toBe(q.choices.length);
        expect(q.choices.length).toBeGreaterThanOrEqual(3);
      }
    });
  });

  it('reviews the letters missed most', () => {
    const review = reviewExercises(4, { ج: 5 });
    expect(review.some((e) => e.kind === 'question' && e.letter === 'ج')).toBe(true);
  });
});
