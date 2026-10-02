import type { AppLanguage } from '@/hooks/use-settings';

// Browsers don't get feast reminders; the phone apps schedule them (see feast-reminders.ts)
export const requestReminderPermission = async () => false;
export async function syncFeastReminders(_lang: AppLanguage, _enabled: boolean) {}
export function useReminderNavigation() {}
