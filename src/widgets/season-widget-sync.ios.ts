import { dateToJdn, jdnToDate } from '@/data/coptic-calendar';
import type { AppLanguage } from '@/hooks/use-settings';

import { calendarWidgetProps } from './calendar-widget-props';
import { seasonWidgetProps } from './season-widget-props';

// How many days ahead to schedule; the app refreshes this each time it opens
const DAYS_AHEAD = 45;

// Each entry takes over at local midnight of its day
const dailyTimeline = <P,>(props: (jdn: number) => P) => {
  const now = new Date();
  const today = dateToJdn(now);
  return Array.from({ length: DAYS_AHEAD }, (_, i) => ({
    date: i === 0 ? now : jdnToDate(today + i),
    props: props(today + i),
  }));
};

export async function syncSeasonWidget(lang: AppLanguage) {
  try {
    // Loaded here, not at the top of the file: the widget files need the ExpoWidgets native module, which
    // Expo Go doesn't have, and importing them at startup would crash the whole app (a white screen)
    const [{ default: SeasonWidget }, { default: CalendarWidget }] = await Promise.all([
      import('./season-widget'),
      import('./calendar-widget'),
    ]);
    SeasonWidget.updateTimeline(dailyTimeline((jdn) => seasonWidgetProps(jdn, lang)));
    CalendarWidget.updateTimeline(dailyTimeline((jdn) => calendarWidgetProps(jdn, lang)));
  } catch {
    // Widget extension missing (e.g. running in Expo Go) — nothing to update
  }
}
