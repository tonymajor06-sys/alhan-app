import { verseWidgetProps } from '../../widgets/verse-widget-props';
import { dateToJdn } from '../coptic-calendar';
import { dailyVerses, verseForDay } from '../daily-verses';

describe('Verse of the Day', () => {
  it('has short verses in English and Arabic, each with where it is from', () => {
    expect(dailyVerses.length).toBeGreaterThanOrEqual(40);
    for (const verse of dailyVerses) {
      // three lock-screen lines at most
      expect(verse.en.length).toBeLessThanOrEqual(110);
      expect(verse.ar).toMatch(/[؀-ۿ]/);
      expect(verse.source.en).toBeTruthy();
      expect(verse.source.ar).toBeTruthy();
    }
  });

  it('keeps one verse all day and changes it the next day', () => {
    const today = dateToJdn(new Date(2026, 9, 12));
    expect(verseForDay(today)).toBe(verseForDay(today));
    expect(verseForDay(today + 1)).not.toBe(verseForDay(today));
  });

  it('gives the widget the Coptic date and the verse in the app language', () => {
    const jdn = dateToJdn(new Date(2026, 9, 12));
    const en = verseWidgetProps(jdn, 'en');
    expect(en.copticDay).toBe('2 Babah');
    expect(en.verse).toBe(verseForDay(jdn).en);
    const ar = verseWidgetProps(jdn, 'ar');
    expect(ar.rtl).toBe(true);
    expect(ar.verse).toBe(verseForDay(jdn).ar);
  });
});
