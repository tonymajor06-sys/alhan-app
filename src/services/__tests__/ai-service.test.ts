import { askAiQuestion, findSaintAnswer } from '../ai-service';

describe('ai-service Coptic knowledge and saint lookup', () => {
  it('finds St. Antony when asked for "story of st anthony"', () => {
    const answer = findSaintAnswer('tell me the story of st anthony', 'en');
    expect(answer).not.toBeNull();
    expect(answer).toContain('St. Antony the Great');
    expect(answer).toContain('22 Tubah');
    expect(answer).toContain('Coma in Upper Egypt');
  });

  it('finds St. Antony when spelled "st antony" or in uppercase', () => {
    const answer = findSaintAnswer('WHO WAS ST ANTONY?', 'en');
    expect(answer).not.toBeNull();
    expect(answer).toContain('St. Antony the Great');
  });

  it('finds St. Antony in Arabic when asked in Arabic', () => {
    const answer = findSaintAnswer('سيرة القديس الانبا انطونيوس', 'ar');
    expect(answer).not.toBeNull();
    expect(answer).toContain('أنطونيوس');
    expect(answer).toContain('طوبه');
    expect(answer).toContain('قمن العروس');
  });

  it('finds St. George and St. Mina', () => {
    const george = findSaintAnswer('tell me about st george', 'en');
    expect(george).not.toBeNull();
    expect(george).toContain('St. George');

    const mina = findSaintAnswer('who is st mina', 'en');
    expect(mina).not.toBeNull();
    expect(mina).toContain('St. Mina');
  });

  it('askAiQuestion returns St. Anthony story for offline / unconfigured server', async () => {
    const result = await askAiQuestion('when i ask for the story of st anthony', [], 'en');
    expect(result).toContain('St. Antony the Great');
    expect(result).toContain('22 Tubah');
    expect(result).not.toContain('The AI assistant is connecting to the server');
  });

  it('askAiQuestion returns Adam vs Watos explanation', async () => {
    const result = await askAiQuestion('difference between adam and watos', [], 'en');
    expect(result).toContain('Adam vs. Watos');
    expect(result).toContain('Sunday, Monday, Tuesday');
  });
});
