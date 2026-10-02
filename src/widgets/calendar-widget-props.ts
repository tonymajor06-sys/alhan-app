import {
  copticMonths,
  copticToJdn,
  currentSeasonName,
  eventsAround,
  formatDaysUntil,
  formatGregorianDate,
  getSeasonInfo,
  jdnToCoptic,
  toArabicDigits,
} from '@/data/coptic-calendar';
import type { AppLanguage } from '@/hooks/use-settings';

import type { CalendarWidgetProps } from './calendar-widget';

const weekdays: Record<AppLanguage, string[]> = {
  en: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  ar: ['أحد', 'إثن', 'ثلا', 'أرب', 'خمي', 'جمع', 'سبت'],
};

// The Coptic month containing `jdn`, laid out Sunday-first in rows of 7 (mirrored for Arabic)
export function calendarWidgetProps(jdn: number, lang: AppLanguage): CalendarWidgetProps {
  const ar = lang === 'ar';
  const n = (v: number) => (ar ? toArabicDigits(v) : String(v));
  const c = jdnToCoptic(jdn);
  const monthStart = copticToJdn(c.year, c.month, 1);
  const daysInMonth = c.month === 13 ? copticToJdn(c.year + 1, 1, 1) - monthStart : 30;
  const leadingBlanks = (monthStart + 1) % 7; // 0 = Sunday
  const total = Math.ceil((leadingBlanks + daysInMonth) / 7) * 7;

  const events = eventsAround(monthStart);
  const kindOn = (day: number) => {
    const top = events.filter((ev) => ev.start <= day && day <= ev.end).sort((a, b) => b.priority - a.priority)[0];
    return top?.kind === 'feast' ? 1 : top?.kind === 'fast' ? 2 : 0;
  };

  let cells: string[] = [];
  let kinds: number[] = [];
  for (let i = 0; i < total; i++) {
    const day = monthStart + i - leadingBlanks;
    const inMonth = i >= leadingBlanks && i < leadingBlanks + daysInMonth;
    cells.push(inMonth ? n(day - monthStart + 1) : '');
    kinds.push(inMonth ? kindOn(day) : 0);
  }
  let todayIndex = leadingBlanks + c.day - 1;
  let days = weekdays[lang];

  // Right to left: each week reads from the right
  if (ar) {
    const flip = <T,>(list: T[]) => list.flatMap((_, i) => (i % 7 === 0 ? list.slice(i, i + 7).reverse() : []));
    cells = flip(cells);
    kinds = flip(kinds);
    todayIndex = Math.floor(todayIndex / 7) * 7 + (6 - (todayIndex % 7));
    days = [...days].reverse();
  }

  const info = getSeasonInfo(jdn, 1);
  const next = info.upcoming[0];
  const monthEnd = monthStart + daysInMonth - 1;
  return {
    rtl: ar,
    monthTitle: `${copticMonths[lang][c.month - 1]} ${n(c.year)}`,
    gregorianRange: `${formatGregorianDate(monthStart, lang)} – ${formatGregorianDate(monthEnd, lang)}`,
    weekdays: days,
    cells,
    kinds,
    todayIndex,
    weekRow: Math.floor(todayIndex / 7),
    season: currentSeasonName(info, lang),
    isFast: info.current?.kind === 'fast',
    next: next ? `${next.name[lang]} · ${formatDaysUntil(next.daysUntil, lang)}` : '',
  };
}
