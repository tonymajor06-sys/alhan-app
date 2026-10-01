import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { useAlhanColors } from '@/hooks/use-alhan-colors';
import { useSettings } from '@/hooks/use-settings';
import { useTodayJdn } from '@/hooks/use-today';
import { syncSeasonWidget } from '@/widgets/season-widget-sync';

export default function RootLayout() {
  const { language } = useSettings();
  const today = useTodayJdn();
  const colors = useAlhanColors();

  // Keep the home-screen widget's schedule fresh whenever the app opens or the language changes
  useEffect(() => {
    syncSeasonWidget(language);
  }, [language, today]);

  return (
    <>
      {/* Light status bar text on the dark theme, dark text on the light theme */}
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
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
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="calendar" options={{ headerShown: false }} />
        <Stack.Screen name="services" options={{ title: 'Services' }} />
        <Stack.Screen name="hymns" options={{ title: 'Hymns' }} />
        <Stack.Screen name="detail" options={{ title: 'Hymn Lyrics' }} />
      </Stack>
    </>
  );
}
