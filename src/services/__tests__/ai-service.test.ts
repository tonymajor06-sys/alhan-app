import { askAiQuestion, findSaintAnswer } from '../ai-service';

describe('ai-service Coptic knowledge and saint lookup', () => {
  it('finds St. Antony when asked for "story of st anthony"', () => {
    const res = findSaintAnswer('tell me the story of st anthony', 'en');
    expect(res).not.toBeNull();
    expect(res!.answer).toContain('St. Antony the Great');
    expect(res!.answer).toContain('22 Tubah');
    expect(res!.answer).toContain('Coma in Upper Egypt');
    expect(res!.actions).toBeDefined();
    expect(res!.actions![0].type).toBe('saint');
  });

  it('finds St. Antony when spelled "st antony" or in uppercase', () => {
    const res = findSaintAnswer('WHO WAS ST ANTONY?', 'en');
    expect(res).not.toBeNull();
    expect(res!.answer).toContain('St. Antony the Great');
  });

  it('finds St. Antony in Arabic when asked in Arabic', () => {
    const res = findSaintAnswer('سيرة القديس الانبا انطونيوس', 'ar');
    expect(res).not.toBeNull();
    expect(res!.answer).toContain('أنطونيوس');
    expect(res!.answer).toContain('طوبه');
    expect(res!.answer).toContain('قمن العروس');
  });

  it('finds St. George and St. Mina', () => {
    const george = findSaintAnswer('tell me about st george', 'en');
    expect(george).not.toBeNull();
    expect(george!.answer).toContain('St. George');

    const mina = findSaintAnswer('who is st mina', 'en');
    expect(mina).not.toBeNull();
    expect(mina!.answer).toContain('St. Mina');
  });

  it('askAiQuestion returns St. Anthony story for offline / unconfigured server', async () => {
    const result = await askAiQuestion('when i ask for the story of st anthony', [], 'en');
    expect(result.answer).toContain('St. Antony the Great');
    expect(result.answer).toContain('22 Tubah');
    expect(result.answer).not.toContain('The AI assistant is connecting to the server');
    expect(result.actions).toBeDefined();
    expect(result.actions![0].type).toBe('saint');
  });

  it('askAiQuestion returns Adam vs Watos explanation', async () => {
    const result = await askAiQuestion('difference between adam and watos', [], 'en');
    expect(result.answer).toContain('Adam vs. Watos');
    expect(result.answer).toContain('Sunday, Monday, Tuesday');
  });

  it('handles conversational greetings in English and Arabic', async () => {
    const enGreeting = await askAiQuestion('hello', [], 'en');
    expect(enGreeting.answer).toContain('Peace be with you');
    expect(enGreeting.actions).toBeDefined();

    const arGreeting = await askAiQuestion('سلام ونعمة', [], 'ar');
    expect(arGreeting.answer).toContain('سلام ونعمة');
    expect(arGreeting.actions).toBeDefined();
  });

  it('answers date question with live Coptic calendar date', async () => {
    const res = await askAiQuestion("what is today's coptic date?", [], 'en');
    expect(res.answer).toContain('Coptic Calendar');
    expect(res.actions).toBeDefined();
    expect(res.actions![0].route).toBe('/calendar');
  });

  it('finds hymn when asked "find me Tai Shouri" with actionable open button', async () => {
    const res = await askAiQuestion('find me Tai Shouri', [], 'en');
    expect(res.answer).toContain('The Golden Censer');
    expect(res.actions).toBeDefined();
    expect(res.actions![0].type).toBe('hymn');
    expect(res.actions![0].id).toContain('golden-censer');
  });

  it('navigates to hymn when asked "take me to Tai Shouri"', async () => {
    const res = await askAiQuestion('take me to Tai Shouri', [], 'en');
    expect(res.autoNavigate).toBeDefined();
    expect(res.autoNavigate!.route).toContain('golden-censer');
  });

  it('navigates contextually when user says "take me there" after finding a hymn', async () => {
    const history = [
      { id: '1', role: 'user' as const, content: 'find me Golgotha', timestamp: 1 },
      {
        id: '2',
        role: 'assistant' as const,
        content: 'I found Golgotha...',
        timestamp: 2,
        actions: [
          { type: 'hymn' as const, id: 'holyweek-bright-saturday-golgotha', title: 'Golgotha' },
        ],
      },
    ];
    const res = await askAiQuestion('take me there', history, 'en');
    expect(res.autoNavigate).toBeDefined();
    expect(res.autoNavigate!.route).toBe('/hymn/holyweek-bright-saturday-golgotha');
    expect(res.answer).toContain('Taking you to **Golgotha** now');
  });
});
