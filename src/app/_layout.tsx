import { useFonts } from 'expo-font';
import { Stack, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform, View } from 'react-native';
import { SafeAreaInsetsContext, useSafeAreaInsets } from 'react-native-safe-area-context';

import { startAds, TopBanner } from '@/ads/ads';
import { copticFont } from '@/components/alhan-ui';
import { ADS_ENABLED } from '@/constants/ads';
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

  // A banner across the top of every screen in the phone apps, except projector mode.
  // It sits below the status bar, so the screens under it need no room for the status bar themselves.
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const showBanner = ADS_ENABLED && Platform.OS !== 'web' && !pathname.startsWith('/present');
  useEffect(() => {
    if (Platform.OS !== 'web') startAds();
  }, []);

  if (!fontsLoaded && !fontError) return null;

  return (
    <>
      {/* Light status bar text on the dark theme, dark text on the light theme (which Settings can choose) */}
      <StatusBar style={colors.background === alhanLightColors.background ? 'dark' : 'light'} />
      {showBanner ? (
        <View style={{ paddingTop: insets.top, backgroundColor: colors.background, alignItems: 'center' }}>
          <TopBanner />
        </View>
      ) : null}
      <SafeAreaInsetsContext.Provider value={showBanner ? { ...insets, top: 0 } : insets}>
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
          <Stack.Screen name="settings" />
          <Stack.Screen name="hymn/[id]" />
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
      </SafeAreaInsetsContext.Provider>
    </>
  );
}
