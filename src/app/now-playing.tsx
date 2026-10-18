import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { goBackOrHome, languageLabels, openHymnPage, strings, withCopticFont } from '@/components/alhan-ui';
import { BusyPulse } from '@/components/busy-pulse';
import { pressFeedback, tapFeedback } from '@/components/haptics';
import { SeekBar } from '@/components/seek-bar';
import { AlhanPalette } from '@/constants/alhan-colors';
import { homeArt } from '@/constants/home-art';
import { useAlhanColors, useThemedStyles } from '@/hooks/use-alhan-colors';
import {
  currentTrack,
  cycleRepeat,
  jumpTo,
  removeFromQueue,
  seekBy,
  seekTo,
  setShuffle,
  skip,
  togglePlay,
  trackKey,
  useAudioQueue,
} from '@/hooks/use-audio-queue';
import { useSettings } from '@/hooks/use-settings';

// The whole player, like a music app's: the big controls, shuffle and repeat, and what plays next (tap to jump to it)
export default function NowPlayingScreen() {
  const { language: lang } = useSettings();
  const t = strings[lang];
  const isRTL = lang === 'ar';
  const styles = useThemedStyles(createStyles);
  const colors = useAlhanColors();
  const insets = useSafeAreaInsets();
  const queue = useAudioQueue();
  const track = currentTrack(queue);
  const rowDirection = { flexDirection: isRTL ? ('row-reverse' as const) : ('row' as const) };
  const textAlign = { textAlign: isRTL ? ('right' as const) : ('left' as const) };

  const close = () => (router.canGoBack() ? router.back() : goBackOrHome());
  if (!track) {
    return (
      <View style={[styles.root, { paddingTop: insets.top + 12 }]}>
        <Pressable onPress={close} accessibilityRole="button" accessibilityLabel={t.close} style={styles.closeButton}>
          <Text style={styles.closeText}>⌄</Text>
        </Pressable>
        <Text style={styles.empty}>{t.nothingYet}</Text>
      </View>
    );
  }

  const { playing, currentTime, duration, isBuffering } = queue.status;
  const upNext = queue.tracks.map((tr, i) => ({ tr, i })).filter(({ i }) => i > queue.index);
  const repeatLabel = queue.repeat === 'all' ? t.repeatAll : queue.repeat === 'one' ? t.repeatOne : t.repeatOff;
  const languageLabel = languageLabels[lang].find((l) => l.key === track.language)?.label;
  const button = (label: string, icon: string, onPress: () => void, opts: { active?: boolean; big?: boolean; disabled?: boolean } = {}) => (
    <Pressable
      onPress={() => {
        if (opts.big) pressFeedback();
        else tapFeedback();
        onPress();
      }}
      disabled={opts.disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected: opts.active, disabled: opts.disabled }}
      hitSlop={8}
      style={({ pressed }) => [opts.big ? styles.playButton : styles.control, pressed && styles.pressed, opts.disabled && styles.disabled]}>
      <Text style={[opts.big ? styles.playIcon : styles.controlIcon, opts.active && { color: colors.gold }]}>{icon}</Text>
    </Pressable>
  );

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={{ paddingTop: insets.top + 8, paddingBottom: insets.bottom + 32, paddingHorizontal: 20 }}>
        <View style={[styles.topRow, rowDirection]}>
          <Pressable onPress={close} accessibilityRole="button" accessibilityLabel={t.close} hitSlop={12} style={styles.closeButton}>
            <Text style={styles.closeText}>⌄</Text>
          </Pressable>
          <Text style={styles.topLabel}>
            {t.nowPlaying}
            {queue.tracks.length > 1 ? ` · ${queue.index + 1}/${queue.tracks.length}` : ''}
          </Text>
          <View style={styles.closeButton} />
        </View>

        <Image source={homeArt.playlist} style={styles.art} contentFit="cover" accessibilityIgnoresInvertColors />

        <Text style={[styles.title, textAlign]} numberOfLines={2}>
          {withCopticFont(track.title)}
        </Text>
        {languageLabel ? <Text style={[styles.subtitle, textAlign]}>{languageLabel}</Text> : null}

        <SeekBar currentTime={currentTime} duration={duration} onSeek={seekTo} label={t.nowPlaying} />

        <View style={[styles.controls, rowDirection]}>
          {button(t.shuffle, '⤨', () => setShuffle(!queue.shuffle), { active: queue.shuffle, disabled: queue.tracks.length < 2 })}
          {button(t.previousTrack, isRTL ? '⏭︎' : '⏮︎', () => skip(-1))}
          {button(t.back15, '↺', () => seekBy(-15))}
          <BusyPulse busy={isBuffering}>{button(playing ? t.pause : t.play, playing ? '❚❚' : '▶', togglePlay, { big: true })}</BusyPulse>
          {button(t.forward15, '↻', () => seekBy(15))}
          {button(t.nextTrack, isRTL ? '⏮︎' : '⏭︎', () => skip(1), { disabled: queue.index >= queue.tracks.length - 1 && queue.repeat !== 'all' })}
          {button(repeatLabel, queue.repeat === 'one' ? '⟳¹' : '⟳', cycleRepeat, { active: queue.repeat !== 'none' })}
        </View>

        <Pressable
          onPress={() => openHymnPage(track.hymnId, track.language)}
          accessibilityRole="button"
          style={({ pressed }) => [styles.wordsButton, pressed && styles.pressed]}>
          <Text style={styles.wordsText}>{t.showWords}</Text>
        </Pressable>

        {upNext.length ? (
          <>
            <Text style={[styles.sectionTitle, textAlign]}>{t.upNext}</Text>
            {upNext.map(({ tr, i }) => (
              <View key={`${trackKey(tr)}-${i}`} style={[styles.queueRow, rowDirection]}>
                <Pressable
                  onPress={() => {
                    pressFeedback();
                    jumpTo(i);
                  }}
                  accessibilityRole="button"
                  style={({ pressed }) => [styles.queueTitleWrap, pressed && styles.pressed]}>
                  <Text style={[styles.queueTitle, textAlign]} numberOfLines={1}>
                    {withCopticFont(tr.title)}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    tapFeedback();
                    removeFromQueue(i);
                  }}
                  accessibilityRole="button"
                  accessibilityLabel={t.remove}
                  hitSlop={8}
                  style={({ pressed }) => [styles.queueRemove, pressed && styles.pressed]}>
                  <Text style={styles.queueRemoveText}>✕</Text>
                </Pressable>
              </View>
            ))}
          </>
        ) : null}
      </ScrollView>
    </View>
  );
}

const createStyles = (colors: AlhanPalette) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.background },
    pressed: { opacity: 0.6 },
    disabled: { opacity: 0.3 },
    empty: { color: colors.muted, fontSize: 17, textAlign: 'center', marginTop: 40 },
    topRow: { alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
    closeButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
    closeText: { fontSize: 30, color: colors.text, lineHeight: 32 },
    topLabel: { fontSize: 14, fontWeight: '700', color: colors.muted, letterSpacing: 0.5 },
    art: { width: '100%', aspectRatio: 1, borderRadius: 20, marginBottom: 24, backgroundColor: colors.surface },
    title: { fontSize: 24, fontWeight: '800', color: colors.text },
    subtitle: { fontSize: 15, color: colors.muted, marginTop: 4, marginBottom: 12 },
    controls: { alignItems: 'center', justifyContent: 'space-between', marginTop: 12 },
    control: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
    controlIcon: { fontSize: 22, color: colors.text, fontWeight: '700' },
    playButton: { width: 72, height: 72, borderRadius: 36, backgroundColor: colors.gold, alignItems: 'center', justifyContent: 'center' },
    playIcon: { fontSize: 28, color: colors.onGold, fontWeight: '800' },
    wordsButton: {
      marginTop: 22,
      minHeight: 48,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
    },
    wordsText: { fontSize: 17, fontWeight: '700', color: colors.text },
    sectionTitle: { fontSize: 16, fontWeight: '800', color: colors.gold, letterSpacing: 1, marginTop: 28, marginBottom: 8 },
    queueRow: { alignItems: 'center', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
    queueTitleWrap: { flex: 1, paddingVertical: 14 },
    queueTitle: { fontSize: 16, color: colors.text },
    queueRemove: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
    queueRemoveText: { fontSize: 15, color: colors.muted },
  });
