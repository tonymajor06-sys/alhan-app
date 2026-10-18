import { router } from 'expo-router';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { openHymnPage, strings, useSwipeToSkip, withCopticFont } from './alhan-ui';
import { BusyPulse } from './busy-pulse';
import { pressFeedback } from './haptics';
import { useAlhanColors } from '../hooks/use-alhan-colors';
import { currentTrack, skip, togglePlay, useAudioQueue } from '../hooks/use-audio-queue';
import { useSettings } from '../hooks/use-settings';

// The mini player in the iOS 26 tab bar's own slot, above the tabs or (when the bar shrinks) inline with them.
// The bar draws two of these at once, one per placement, so everything comes from the shared audio queue.
export function TabBarPlayer() {
  const placement = NativeTabs.BottomAccessory.usePlacement();
  const { language: lang } = useSettings();
  const colors = useAlhanColors();
  const queue = useAudioQueue();
  const nowPlaying = currentTrack(queue);
  const t = strings[lang];
  const isRTL = lang === 'ar';
  const swipe = useSwipeToSkip(isRTL);
  if (!nowPlaying) return null;
  const { playing, isBuffering } = queue.status;
  const hasQueue = queue.tracks.length > 1;

  return (
    <View style={[styles.row, isRTL && styles.rowReverse]} {...swipe.panHandlers}>
      <Pressable
        onPress={() => router.push('/now-playing')}
        onLongPress={() => openHymnPage(nowPlaying.hymnId, nowPlaying.language)}
        accessibilityRole="button"
        accessibilityLabel={`${t.nowPlaying}: ${nowPlaying.title}`}
        style={styles.titleWrap}>
        <Text style={[styles.title, { color: colors.text }, isRTL && styles.alignRight]} numberOfLines={1}>
          {withCopticFont(nowPlaying.title)}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          pressFeedback();
          togglePlay();
        }}
        accessibilityRole="button"
        accessibilityLabel={playing ? t.pause : t.play}
        accessibilityState={{ busy: isBuffering }}
        hitSlop={8}
        style={styles.button}>
        <BusyPulse busy={isBuffering}>
          <Text style={[styles.icon, { color: colors.text }]}>{playing ? '❚❚' : '▶'}</Text>
        </BusyPulse>
      </Pressable>
      {hasQueue && placement === 'regular' ? (
        <Pressable
          onPress={() => {
            pressFeedback();
            skip(1);
          }}
          accessibilityRole="button"
          accessibilityLabel={t.nextTrack}
          hitSlop={8}
          style={styles.button}>
          <Text style={[styles.icon, { color: colors.text }]}>{isRTL ? '⏮︎' : '⏭︎'}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 6,
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  titleWrap: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
  },
  alignRight: {
    textAlign: 'right',
  },
  button: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 17,
    fontWeight: '700',
  },
});
