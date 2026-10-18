import { AppLanguage } from '../hooks/use-settings';

// The tab bar's names
export const tabLabels: Record<AppLanguage, { home: string; hymns: string; calendar: string; playlist: string; settings: string }> = {
  en: { home: 'Home', hymns: 'Hymns', calendar: 'Calendar', playlist: 'Playlists', settings: 'Settings' },
  ar: { home: 'الرئيسية', hymns: 'الألحان', calendar: 'التقويم', playlist: 'القوائم', settings: 'الإعدادات' },
};
