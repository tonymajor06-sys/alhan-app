import * as QuickActions from 'expo-quick-actions';
import { useQuickActionRouting } from 'expo-quick-actions/router';
import { useEffect } from 'react';
import { AppState, Platform } from 'react-native';

import { hymnHref } from './alhan-ui';
import { getSeasonInfo } from '../data/coptic-calendar';
import { LanguageType, seasons } from '../data/hymns';
import { readSetting } from '../hooks/settings-storage';
import { LAST_PLAYED_KEY } from '../hooks/use-audio-queue';
import { AppLanguage } from '../hooks/use-settings';

const labels = {
  en: { tonight: "Tonight's Praises", season: 'Hymns for today', continue: 'Continue listening', search: 'Search hymns' },
  ar: { tonight: 'تسبحة الليلة', season: 'ألحان اليوم', continue: 'متابعة الاستماع', search: 'ابحث في الألحان' },
};

const lastPlayed = (): { hymnId: string; language: LanguageType } | null => {
  try {
    const saved = readSetting(LAST_PLAYED_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

// The shortcuts shown when the app icon is held down on the home screen; each opens its page
export function useHomeScreenQuickActions(language: AppLanguage, today: number) {
  useQuickActionRouting();

  useEffect(() => {
    if (Platform.OS === 'web') return;
    const update = () => setShortcuts(language, today);
    update();
    // "Continue listening" follows the last hymn played, so refresh the list whenever the app is left
    const sub = AppState.addEventListener('change', (state) => state === 'background' && update());
    return () => sub.remove();
  }, [language, today]);
}

function setShortcuts(language: AppLanguage, today: number) {
  const t = labels[language];
  const currentSeason = getSeasonInfo(today, 0).current?.seasonId;
  const seasonId = seasons.some((s) => s.id === currentSeason) ? currentSeason : null;
  const last = lastPlayed();
  const lastHref = last ? hymnHref(last.hymnId, last.language) : null;
  QuickActions.setItems([
    { id: 'tonight', title: t.tonight, icon: Platform.OS === 'ios' ? 'symbol:moon.stars' : undefined, params: { href: '/follow/midnight' } },
    {
      id: 'season',
      title: t.season,
      icon: Platform.OS === 'ios' ? 'symbol:book' : undefined,
      params: { href: seasonId ? `/hymns/${seasonId}` : '/hymns' },
    },
    ...(lastHref
      ? [
          {
            id: 'continue',
            title: t.continue,
            icon: Platform.OS === 'ios' ? 'symbol:play.circle' : undefined,
            params: { href: `/hymn/${lastHref.params.id}${lastHref.params.lang ? `?lang=${lastHref.params.lang}` : ''}` },
          },
        ]
      : []),
    { id: 'search', title: t.search, icon: Platform.OS === 'ios' ? 'symbol:magnifyingglass' : undefined, params: { href: '/search' } },
  ]).catch(() => {
    // shortcuts are not supported on this phone
  });
}
