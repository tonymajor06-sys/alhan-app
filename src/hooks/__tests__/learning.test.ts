jest.mock('../settings-storage', () => ({ readSetting: () => null, writeSetting: () => {} }));

import { LearnList, todaysReview } from '../use-learning';
import { lineAt, verseProgress } from '../use-verse-timings';

describe('lineAt', () => {
  const lines = ['short', 'a much much longer line here', 'end'];
  it('starts on the first line and ends on the last', () => {
    expect(lineAt(lines, 0)).toBe(0);
    expect(lineAt(lines, 0.999)).toBe(2);
  });
  it('gives longer lines more of the verse', () => {
    // "short" is 5 of 31 letters: past 17% the second line is being sung
    expect(lineAt(lines, 0.1)).toBe(0);
    expect(lineAt(lines, 0.2)).toBe(1);
    expect(lineAt(lines, 0.85)).toBe(1);
  });
});

describe('verseProgress', () => {
  it('is how far between this verse and the next', () => {
    expect(verseProgress([0, 10, 20], 1, 15, 30)).toBeCloseTo(0.5);
  });
  it('runs the last verse to the end of the recording', () => {
    expect(verseProgress([0, 10, 20], 2, 25, 30)).toBeCloseTo(0.5);
  });
});

describe('todaysReview', () => {
  const day = 100;
  const list: LearnList = {
    a: { status: 'learning', added: 1, practised: 99 },
    b: { status: 'learning', added: 2 },
    c: { status: 'learning', added: 3, practised: 50 },
    d: { status: 'learning', added: 4, practised: 98 },
    e: { status: 'known', added: 5 },
  };
  it('picks never-practised first, then the longest ago, and leaves out learnt hymns', () => {
    expect(todaysReview(list, day).map((r) => r.hymnId)).toEqual(['b', 'c', 'd']);
  });
  it('keeps the ones done today in the review, ticked', () => {
    const done = { ...list, b: { ...list.b, practised: day } };
    expect(todaysReview(done, day)).toEqual([
      { hymnId: 'b', done: true },
      { hymnId: 'c', done: false },
      { hymnId: 'd', done: false },
    ]);
  });
});
