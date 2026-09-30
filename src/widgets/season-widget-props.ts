import {
  copticMonths,
  currentSeasonName,
  formatDaysUntil,
  formatGregorianDate,
  getSeasonInfo,
  jdnToCoptic,
  kindName,
  toArabicDigits,
  tuneName,
} from '@/data/coptic-calendar';
import type { AppLanguage } from '@/hooks/use-settings';

import type { SeasonWidgetProps } from './season-widget';

export function seasonWidgetProps(jdn: number, lang: AppLanguage): SeasonWidgetProps {
  const info = getSeasonInfo(jdn, 1);
  const c = jdnToCoptic(jdn);
  const next = info.upcoming[0];
  const ar = lang === 'ar';
  const n = (v: number) => (ar ? toArabicDigits(v) : String(v));

  return {
    rtl: ar,
    copticDay: `${n(c.day)} ${copticMonths[lang][c.month - 1]}`,
    copticYear: ar ? `${n(c.year)} للشهداء` : `${c.year} A.M.`,
    gregorianDate: formatGregorianDate(jdn, lang, true),
    season: currentSeasonName(info, lang),
    seasonKind: info.current ? kindName[lang][info.current.kind] : tuneName[lang][info.tune],
    isFast: info.current?.kind === 'fast',
    nextLabel: ar ? 'القادم' : 'Next',
    nextName: next?.name[lang] ?? '',
    nextWhen: next ? formatDaysUntil(next.daysUntil, lang) : '',
    nextDate: next ? formatGregorianDate(next.start, lang) : '',
  };
}
