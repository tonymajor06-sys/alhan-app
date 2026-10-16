import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { copticFont } from '@/components/alhan-ui';
import { useHomeScreenQuickActions } from '@/components/quick-actions';
import { alhanLightColors } from '@/constants/alhan-colors';
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
  useHomeScreenQuickActions(language, today);

  if (!fontsLoaded && !fontError) return null;

  const light = colors.background === alhanLightColors.background;
  // The app's own colours for the native tab bar and screen backgrounds, so nothing flashes white between tabs
  const theme = {
    ...(light ? DefaultTheme : DarkTheme),
    colors: {
      ...(light ? DefaultTheme : DarkTheme).colors,
      primary: colors.gold,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
    },
  };

  return (
    // Needed for the swipes between hymns
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={theme}>
        {/* Light status bar text on the dark theme, dark text on the light theme (which Settings can choose) */}
        <StatusBar style={light ? 'dark' : 'light'} />
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
          {/* Home, Hymns, Calendar, Playlist and Settings; everything else opens over the tab bar */}
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="privacy" />
          <Stack.Screen name="downloads" />
          <Stack.Screen name="support" />
          <Stack.Screen name="hymn/[id]" />
          <Stack.Screen name="follow/[kind]" />
          <Stack.Screen name="saints" />
          <Stack.Screen name="saints/[id]" />
          <Stack.Screen name="learn" />
          <Stack.Screen name="learn/[lesson]" />
          <Stack.Screen name="learn-arabic" />
          <Stack.Screen name="learn-arabic/[lesson]" />
          <Stack.Screen name="learn-english" />
          <Stack.Screen name="learn-english/[lesson]" />
          <Stack.Screen name="guide" />
          <Stack.Screen name="guide/[section]" />
          <Stack.Screen name="faith" />
          <Stack.Screen name="faith/[section]" />
          <Stack.Screen
            name="present/[id]"
            options={{ orientation: 'all', animation: 'fade', contentStyle: { backgroundColor: '#000' } }}
          />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
