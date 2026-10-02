import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { useEffect } from 'react';

import { dateToJdn, getSeasonInfo, jdnToDate } from '@/data/coptic-calendar';
import { seasons } from '@/data/hymns';
import type { AppLanguage } from '@/hooks/use-settings';

// A reminder the evening before each feast, fast and season, e.g. "Tomorrow: Nayrouz",
// that opens its hymns when tapped. Scheduled on the phone, so no server or account is needed.

const CHANNEL_ID = 'feast-reminders';
const REMINDER_HOUR = 19; // 7 pm the day before
const DAYS_AHEAD = 200;
const MAX_REMINDERS = 40; // iOS keeps at most 64 scheduled notifications per app

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// Asks for permission; false if the person said no
export async function requestReminderPermission(): Promise<boolean> {
  try {
    const current = await Notifications.getPermissionsAsync();
    if (current.granted) return true;
    const asked = await Notifications.requestPermissionsAsync({
      ios: { allowAlert: true, allowBadge: false, allowSound: true },
    });
    return asked.granted;
  } catch {
    return false;
  }
}

// Replaces every scheduled reminder with a fresh set; runs whenever the app opens
export async function syncFeastReminders(lang: AppLanguage, enabled: boolean) {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    if (!enabled || !(await Notifications.getPermissionsAsync()).granted) return;

    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: lang === 'ar' ? 'تذكير بالأعياد والأصوام' : 'Feast & fast reminders',
      importance: Notifications.AndroidImportance.DEFAULT,
    });

    const now = new Date();
    const upcoming = getSeasonInfo(dateToJdn(now), 200).upcoming.filter((ev) => ev.daysUntil <= DAYS_AHEAD);
    let scheduled = 0;
    for (const ev of upcoming) {
      if (scheduled >= MAX_REMINDERS) break;
      const date = jdnToDate(ev.start - 1);
      date.setHours(REMINDER_HOUR, 0, 0, 0);
      if (date <= now) continue;

      const hasHymns = !!ev.seasonId && seasons.some((s) => s.id === ev.seasonId);
      const name = ev.name[lang];
      const title =
        ev.kind === 'feast'
          ? lang === 'ar' ? `غداً: ${name}` : `Tomorrow: ${name}`
          : lang === 'ar' ? `يبدأ غداً: ${name}` : `${name} begins tomorrow`;
      const body = hasHymns
        ? lang === 'ar' ? 'اضغط لفتح ألحان المناسبة.' : 'Tap to open its hymns.'
        : lang === 'ar' ? 'اضغط لفتح التقويم القبطي.' : 'Tap to open the Coptic calendar.';

      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data: { url: hasHymns ? `/?season=${ev.seasonId}&at=${ev.start}` : '/calendar' },
        },
        trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date, channelId: CHANNEL_ID },
      });
      scheduled += 1;
    }
  } catch {
    // Notifications unavailable (e.g. denied, or a simulator without support)
  }
}

// Opens the page a tapped reminder points to, including when the tap launched the app
export function useReminderNavigation() {
  const response = Notifications.useLastNotificationResponse();
  useEffect(() => {
    const url = response?.notification.request.content.data?.url;
    if (typeof url === 'string') router.push(url as never);
  }, [response]);
}
