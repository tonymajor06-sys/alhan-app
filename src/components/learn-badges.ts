import { displayTitle } from '@/data/arabic-titles';
import { toArabicDigits } from '@/data/coptic-calendar';
import { flattenHymns, seasons } from '@/data/hymns';
import { hymnsWithStatus, LearnList } from '@/hooks/use-learning';
import { AppLanguage } from '@/hooks/use-settings';

import { withoutNumber } from './alhan-ui';

// Badges for My hymns to learn: hymns learnt, days in a row (the longest run, so a badge once earned stays), and a
// whole service learnt. A hymn sung in several places ("@" copies) is learnt everywhere once it is learnt in one.
export interface Badge {
  key: string;
  emoji: string;
  title: string;
  have: number;
  need: number;
}

const KNOWN_STEPS = [1, 5, 10, 25, 50];
const STREAK_STEPS = [3, 7, 30];

const baseId = (id: string) => id.split('@')[0];

// Every season's services with at least two hymns: how many of their hymns are learnt
export function serviceProgress(entries: LearnList, lang: AppLanguage) {
  const known = new Set(hymnsWithStatus(entries, 'known').map(baseId));
  if (!known.size) return [];
  return seasons.flatMap((season) =>
    season.services.flatMap((service) => {
      const ids = [...new Set(flattenHymns(service.hymns).map((h) => baseId(h.id)))];
      if (ids.length < 2) return [];
      const have = ids.filter((id) => known.has(id)).length;
      return have
        ? [{ name: `${withoutNumber(displayTitle(season, lang))} › ${displayTitle(service, lang)}`, have, all: ids.length }]
        : [];
    })
  );
}

export function learnBadges(entries: LearnList, bestStreak: number, servicesDone: number, lang: AppLanguage): Badge[] {
  const ar = lang === 'ar';
  const known = hymnsWithStatus(entries, 'known').length;
  return [
    ...KNOWN_STEPS.map((need) => ({
      key: `known-${need}`,
      emoji: need === 1 ? '🌱' : need < 25 ? '📖' : '🎓',
      title: ar ? (need === 1 ? 'أول لحن تعلّمته' : `${toArabicDigits(need)} ${need <= 10 ? 'ألحان' : 'لحنًا'} تعلّمتها`) : need === 1 ? 'First hymn learnt' : `${need} hymns learnt`,
      have: Math.min(known, need),
      need,
    })),
    ...STREAK_STEPS.map((need) => ({
      key: `streak-${need}`,
      emoji: '🔥',
      title: ar ? (need === 7 ? 'أسبوع كامل' : need <= 10 ? `${toArabicDigits(need)} أيام متتالية` : `${toArabicDigits(need)} يومًا متتاليًا`) : need === 7 ? 'A whole week' : `${need} days in a row`,
      have: Math.min(bestStreak, need),
      need,
    })),
    {
      key: 'service',
      emoji: '☩',
      title: ar ? 'خدمة كاملة تعلّمتها' : 'A whole service learnt',
      have: Math.min(servicesDone, 1),
      need: 1,
    },
  ];
}
