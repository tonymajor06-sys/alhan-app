import { dateToJdn, jdnToDate } from '@/data/coptic-calendar';
import type { AppLanguage } from '@/hooks/use-settings';

import CalendarWidget from './calendar-widget';
import { calendarWidgetProps } from './calendar-widget-props';
import SeasonWidget from './season-widget';
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

export function syncSeasonWidget(lang: AppLanguage) {
  try {
    SeasonWidget.updateTimeline(dailyTimeline((jdn) => seasonWidgetProps(jdn, lang)));
    CalendarWidget.updateTimeline(dailyTimeline((jdn) => calendarWidgetProps(jdn, lang)));
  } catch {
    // Widget extension missing (e.g. running in Expo Go) — nothing to update
  }
}
