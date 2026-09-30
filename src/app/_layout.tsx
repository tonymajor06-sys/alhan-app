import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { useSettings } from '@/hooks/use-settings';
import { useTodayJdn } from '@/hooks/use-today';
import { syncSeasonWidget } from '@/widgets/season-widget-sync';

export default function RootLayout() {
  const { language } = useSettings();
  const today = useTodayJdn();

  // Keep the home-screen widget's schedule fresh whenever the app opens or the language changes
  useEffect(() => {
    syncSeasonWidget(language);
  }, [language, today]);

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0e1322',
          },
          headerTintColor: '#ffffff',
          contentStyle: { backgroundColor: '#0e1322' },
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
