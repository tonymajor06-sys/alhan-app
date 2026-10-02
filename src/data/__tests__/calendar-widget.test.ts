import { gregorianToJdn, jdnToCoptic, toArabicDigits } from '@/data/coptic-calendar';
import { calendarWidgetProps } from '@/widgets/calendar-widget-props';

jest.mock('@/widgets/calendar-widget', () => ({}));

describe('calendar widget month grid', () => {
  const jdn = gregorianToJdn(2026, 10, 1); // 21 Thout 1743, a Thursday

  it('lays the month out in full weeks with today in the right cell', () => {
    const p = calendarWidgetProps(jdn, 'en');
    const c = jdnToCoptic(jdn);
    expect(p.cells.length % 7).toBe(0);
    expect(p.cells.length).toBe(p.kinds.length);
    expect(p.cells.filter(Boolean)).toHaveLength(30);
    expect(p.cells[p.todayIndex]).toBe(String(c.day));
    expect(p.todayIndex % 7).toBe(4); // Thursday column
    expect(p.monthTitle).toBe('Thout 1743');
  });

  it('marks the Feast of the Cross (17 Thout)', () => {
    const p = calendarWidgetProps(jdn, 'en');
    expect(p.kinds[p.cells.indexOf('17')]).toBe(1);
  });

  it('mirrors each week for Arabic', () => {
    const p = calendarWidgetProps(jdn, 'ar');
    expect(p.rtl).toBe(true);
    expect(p.cells[p.todayIndex]).toBe(toArabicDigits(jdnToCoptic(jdn).day));
    expect(p.todayIndex % 7).toBe(2); // Thursday counted from the right
    expect(p.weekdays[6]).toBe('أحد');
  });
});
