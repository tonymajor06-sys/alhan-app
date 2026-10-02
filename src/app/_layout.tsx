import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { copticFont } from '@/components/alhan-ui';
import { useAlhanColors } from '@/hooks/use-alhan-colors';
import { useSettings } from '@/hooks/use-settings';
import { useTodayJdn } from '@/hooks/use-today';
import { syncFeastReminders, useReminderNavigation } from '@/notifications/feast-reminders';
import { syncSeasonWidget } from '@/widgets/season-widget-sync';

export default function RootLayout() {
  const { language, feastReminders } = useSettings();
  const today = useTodayJdn();
  const colors = useAlhanColors();
  // Coptic text uses this font everywhere; wait for it so Coptic never flashes in the fallback font
  const [fontsLoaded, fontError] = useFonts({ [copticFont]: require('../../assets/fonts/AvvaShenouda.ttf') });

  // Keep the home-screen widgets' schedule fresh whenever the app opens or the language changes
  useEffect(() => {
    syncSeasonWidget(language);
  }, [language, today]);

  // Likewise the feast reminders, which only cover the next few months at a time
  useEffect(() => {
    syncFeastReminders(language, feastReminders);
  }, [language, feastReminders, today]);

  useReminderNavigation();

  if (!fontsLoaded && !fontError) return null;

  return (
    <>
      {/* Light status bar text on the dark theme, dark text on the light theme */}
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
          // The app is portrait; only projector mode turns sideways for a TV or projector
          orientation: 'portrait',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          contentStyle: { backgroundColor: colors.background },
          headerTitleStyle: {
            fontWeight: '700',
          },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="calendar" />
        <Stack.Screen name="hymn/[id]" />
        <Stack.Screen name="learn/index" />
        <Stack.Screen name="learn/[lesson]" />
        <Stack.Screen name="guide/index" />
        <Stack.Screen name="guide/[section]" />
        <Stack.Screen
          name="present/[id]"
          options={{ orientation: 'all', animation: 'fade', contentStyle: { backgroundColor: '#000' } }}
        />
      </Stack>
    </>
  );
}
