import { copticMonths, currentSeasonName, getSeasonInfo, jdnToCoptic, toArabicDigits } from '@/data/coptic-calendar';
import { verseForDay } from '@/data/daily-verses';
import type { AppLanguage } from '@/hooks/use-settings';

import type { VerseWidgetProps } from './verse-widget';

export function verseWidgetProps(jdn: number, lang: AppLanguage): VerseWidgetProps {
  const info = getSeasonInfo(jdn, 0);
  const c = jdnToCoptic(jdn);
  const ar = lang === 'ar';
  const verse = verseForDay(jdn);
  return {
    rtl: ar,
    copticDay: `${ar ? toArabicDigits(c.day) : c.day} ${copticMonths[lang][c.month - 1]}`,
    season: currentSeasonName(info, lang),
    isFast: info.current?.kind === 'fast',
    verse: verse[lang],
    source: verse.source[lang],
  };
}
