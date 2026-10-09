import { learnStrings } from '../../components/learn-strings';
import { arabicAlphabet, arabicForms, arabicQuizLevels, getArabicPracticeVerses } from '../arabic-lessons';
import { copticAlphabet, copticEverydayPhrases, copticMoreWords, copticQuizLevels, getPracticeVerses } from '../coptic-lessons';
import { deaconCategories, flattenHymns, seasons } from '../hymns';
import { englishQuizLevels } from '../english-lessons';
import { QuizLevel } from '../quiz';

describe('copticAlphabet', () => {
  it('has each letter once', () => {
    expect(new Set(copticAlphabet.map((l) => l.upper)).size).toBe(copticAlphabet.length);
  });
});

// Every level of a course gives ten questions: four different options with the right one among them,
// or a sentence whose tiles are its own words, mixed up
const checkLevels = (levels: QuizLevel[], count = 6) => {
  expect(levels).toHaveLength(count);
  for (const level of levels) {
    for (let round = 0; round < 5; round++) {
      const quiz = level.build();
      expect(quiz).toHaveLength(10);
      for (const q of quiz) {
        if (q.kind === 'order') {
          expect([...q.tiles!].sort()).toEqual([...q.solution!].sort());
          if (q.solution!.length > 1) expect(q.tiles!.join(' ')).not.toBe(q.solution!.join(' '));
          expect(q.prompt).toBeTruthy();
        } else {
          expect(new Set(q.options).size).toBe(4);
          expect(q.answer).toBeGreaterThanOrEqual(0);
        }
      }
    }
  }
};

describe('quiz levels', () => {
  it('builds every Learn Coptic level in both languages', () => {
    checkLevels(copticQuizLevels('en', learnStrings.en.levelText, learnStrings.en.everydayLevel), 7);
    checkLevels(copticQuizLevels('ar', learnStrings.ar.levelText, learnStrings.ar.everydayLevel), 7);
  });
  it('asks the everyday phrases in the seventh Learn Coptic level', () => {
    const level = copticQuizLevels('en', learnStrings.en.levelText, learnStrings.en.everydayLevel)[6];
    const phrases = new Set(copticEverydayPhrases.flatMap((p) => [p.coptic, p.meaning.en]));
    for (const q of level.build()) expect(phrases.has(q.prompt!)).toBe(true);
  });
  it('builds every Learn Arabic and Learn English level', () => {
    checkLevels(arabicQuizLevels(learnStrings.en.levelText));
    checkLevels(englishQuizLevels(learnStrings.ar.levelText));
  });
  it('ends with sentence building and a mix of everything', () => {
    const levels = copticQuizLevels('en', learnStrings.en.levelText);
    expect(levels[4].build().every((q) => q.kind === 'order')).toBe(true);
    expect(new Set(levels[5].build().map((q) => q.kind)).size).toBeGreaterThan(2);
  });
});

describe('copticMoreWords', () => {
  it('only teaches words found in the Coptic of the app\'s hymns', () => {
    const coptic = [...seasons.flatMap((s) => s.services), ...deaconCategories.flatMap((c) => c.services)]
      .flatMap((sv) => flattenHymns(sv.hymns))
      .map((h) => h.versions.find((v) => v.language === 'coptic')?.text ?? '')
      .join(' ')
      .toLowerCase();
    for (const w of copticMoreWords) expect([w.coptic, coptic.includes(w.coptic.toLowerCase())]).toEqual([w.coptic, true]);
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
  it('pairs Arabic verses from the hymns with their pronunciation', () => {
    const verses = getArabicPracticeVerses();
    expect(verses.length).toBeGreaterThan(50);
    const verse = verses.find((v) => v.arabic.startsWith('قوموا يا بني النور'));
    expect(verse?.sound).toMatch(/^Qumu ya bani en-nour/);
    expect(verse?.meaning).toMatch(/^Arise O you children of the light/);
  });
});
