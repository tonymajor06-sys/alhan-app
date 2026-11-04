import { buildGuideQuiz, guideSections } from '../deacon-guide';
import { servingPsalms } from '../serving-psalms';

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

describe('Psalms for Serving', () => {
  it('says when each is prayed, and has every psalm it names whole, in both languages', () => {
    const psalms = guideSections.find((s) => s.id === 'psalms')!;
    for (const item of psalms.items) {
      expect(item.when?.en && item.when.ar).toBeTruthy();
      expect(item.psalms?.length).toBeGreaterThan(0);
      for (const { number } of item.psalms!) {
        const psalm = servingPsalms[number];
        expect(psalm.en.split('\n').length).toBeGreaterThan(3);
        expect(psalm.ar.split('\n').length).toBeGreaterThan(3);
        // Only the psalm: no notes or page code from where it was copied
        expect(`${psalm.en}${psalm.ar}`).not.toMatch(/dataLayer|function|Qr\.|LXX|\[[a-z]\]/);
      }
    }
    // Agpeya Psalm 115 is verses 10-19 of Bible Psalm 116
    expect(servingPsalms[115].en.startsWith('I believed, therefore I spoke')).toBe(true);
    expect(servingPsalms[50].en.startsWith('Have mercy upon me, O God')).toBe(true);
  });

  it('no longer has the parts the owner took out', () => {
    for (const id of ['incense', 'bring', 'stand']) expect(guideSections.some((s) => s.id === id)).toBe(false);
    const altar = guideSections.find((s) => s.id === 'altar')!.items.map((i) => i.text.en).join(' ');
    expect(altar).not.toMatch(/Come early|unless he asks/);
  });
});
