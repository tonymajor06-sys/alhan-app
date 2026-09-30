import { dateToJdn, jdnToDate } from '@/data/coptic-calendar';
import type { AppLanguage } from '@/hooks/use-settings';

import SeasonWidget from './season-widget';
import { seasonWidgetProps } from './season-widget-props';

// How many days ahead to schedule; the app refreshes this each time it opens
const DAYS_AHEAD = 45;

export function syncSeasonWidget(lang: AppLanguage) {
  try {
    const now = new Date();
    const today = dateToJdn(now);
    SeasonWidget.updateTimeline(
      Array.from({ length: DAYS_AHEAD }, (_, i) => ({
        // Each entry takes over at local midnight of its day
        date: i === 0 ? now : jdnToDate(today + i),
        props: seasonWidgetProps(today + i, lang),
      }))
    );
  } catch {
    // Widget extension missing (e.g. running in Expo Go) — nothing to update
  }
}
