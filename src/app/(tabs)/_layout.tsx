import { NativeTabs } from 'expo-router/unstable-native-tabs';

import { tabLabels } from '@/components/tab-labels';
import { TabBarPlayer } from '@/components/tab-bar-player';
import { iosHasTabAccessory } from '@/components/tab-chrome';
import { alhanLightColors } from '@/constants/alhan-colors';
import { useAlhanColors } from '@/hooks/use-alhan-colors';
import { currentTrack, useAudioQueue } from '@/hooks/use-audio-queue';
import { useSettings } from '@/hooks/use-settings';

// The phone's own tab bar: Home, Hymns, Calendar, Playlist and Settings.
// Hymn pages, lessons and the like open over it (see the root layout).
export default function TabsLayout() {
  const { language } = useSettings();
  const colors = useAlhanColors();
  const nowPlaying = currentTrack(useAudioQueue());
  const t = tabLabels[language];
  const light = colors.background === alhanLightColors.background;
  const content = { backgroundColor: colors.background };

  return (
    <NativeTabs
      tintColor={colors.gold}
      iconColor={{ default: colors.muted, selected: colors.gold }}
      labelStyle={{ default: { color: colors.muted }, selected: { color: colors.gold } }}
      backgroundColor={colors.surface}
      indicatorColor={colors.goldSoft}
      blurEffect={light ? 'systemChromeMaterialLight' : 'systemChromeMaterialDark'}
      minimizeBehavior="onScrollDown">
      {iosHasTabAccessory && nowPlaying ? (
        <NativeTabs.BottomAccessory>
          <TabBarPlayer />
        </NativeTabs.BottomAccessory>
      ) : null}
      <NativeTabs.Trigger name="(home)" contentStyle={content}>
        <NativeTabs.Trigger.Label>{t.home}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'house', selected: 'house.fill' }} md="home" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="hymns" contentStyle={content}>
        <NativeTabs.Trigger.Label>{t.hymns}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'book', selected: 'book.fill' }} md="menu_book" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="calendar" contentStyle={content}>
        <NativeTabs.Trigger.Label>{t.calendar}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="calendar" md="calendar_month" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="playlist" contentStyle={content}>
        <NativeTabs.Trigger.Label>{t.playlist}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="music.note.list" md="queue_music" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings" contentStyle={content}>
        <NativeTabs.Trigger.Label>{t.settings}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'gearshape', selected: 'gearshape.fill' }} md="settings" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
