import { TabList, TabSlot, Tabs, TabTrigger, TabTriggerSlotProps } from 'expo-router/ui';
import { SymbolView } from 'expo-symbols';
import { forwardRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { tabLabels } from '@/components/tab-labels';
import { WEB_TAB_BAR_HEIGHT } from '@/components/tab-chrome';
import { useAlhanColors } from '@/hooks/use-alhan-colors';
import { useSettings } from '@/hooks/use-settings';

type WebIcon = Parameters<typeof SymbolView>[0]['name'];

// The website has no system tab bar, so it draws its own along the bottom, like the app's
export default function WebTabsLayout() {
  const { language } = useSettings();
  const colors = useAlhanColors();
  const insets = useSafeAreaInsets();
  const t = tabLabels[language];
  const tabs: { name: string; href: '/' | '/hymns' | '/calendar' | '/playlist' | '/settings'; label: string; icon: string }[] = [
    { name: '(home)', href: '/', label: t.home, icon: 'home' },
    { name: 'hymns', href: '/hymns', label: t.hymns, icon: 'menu_book' },
    { name: 'calendar', href: '/calendar', label: t.calendar, icon: 'calendar_month' },
    { name: 'playlist', href: '/playlist', label: t.playlist, icon: 'queue_music' },
    { name: 'settings', href: '/settings', label: t.settings, icon: 'settings' },
  ];

  return (
    <Tabs style={{ flex: 1, backgroundColor: colors.background }}>
      <TabSlot style={{ flex: 1 }} />
      <TabList
        style={[
          styles.bar,
          language === 'ar' && styles.barReverse,
          {
            height: WEB_TAB_BAR_HEIGHT + insets.bottom,
            paddingBottom: insets.bottom,
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
          },
        ]}>
        {tabs.map((tab) => (
          <TabTrigger key={tab.name} name={tab.name} href={tab.href} asChild>
            <TabButton label={tab.label} icon={tab.icon} gold={colors.gold} muted={colors.muted} />
          </TabTrigger>
        ))}
      </TabList>
    </Tabs>
  );
}

const TabButton = forwardRef<View, TabTriggerSlotProps & { label: string; icon: string; gold: string; muted: string }>(
  function TabButton({ label, icon, gold, muted, isFocused, ...props }, ref) {
    const color = isFocused ? gold : muted;
    return (
      <Pressable ref={ref} {...props} accessibilityRole="tab" accessibilityState={{ selected: isFocused }} style={styles.tab}>
        <SymbolView name={{ ios: 'circle', web: icon } as WebIcon} tintColor={color} size={24} />
        <Text style={[styles.label, { color }]} numberOfLines={1}>
          {label}
        </Text>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  barReverse: {
    flexDirection: 'row-reverse',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    maxWidth: 160,
    marginHorizontal: 'auto',
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
  },
});
