import { useMemo, useRef, useState } from 'react';
import { GestureResponderEvent, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { formatTime } from '@/components/alhan-ui';
import { AlhanPalette } from '@/constants/alhan-colors';
import { useAlhanColors, useThemedStyles } from '@/hooks/use-alhan-colors';
import { useSmoothTime } from '@/hooks/use-smooth-time';

const WAVE_HEIGHT = 44;

// A recording's waveform as bars (see src/data/audio-waveforms.ts), drawn in one color
function WaveBars({ wave, color }: { wave: string; color: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', height: WAVE_HEIGHT }}>
      {[...wave].map((level, i) => (
        <View
          key={i}
          style={{ flex: 1, marginHorizontal: 1, borderRadius: 1.5, backgroundColor: color, height: 4 + (parseInt(level, 36) / 35) * (WAVE_HEIGHT - 4) }}
        />
      ))}
    </View>
  );
}

// "1:23", "83" or "1:02:03" in seconds, or null if it is not a time
const parseTime = (text: string): number | null => {
  const parts = text.trim().replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d))).split(/[:.,]/);
  if (!parts.length || parts.some((p) => !/^\d+$/.test(p))) return null;
  return parts.reduce((total, p) => total * 60 + Number(p), 0);
};

// The recording's progress bar. Tap it to jump there, or drag the handle: while dragging, the time shows above the
// finger, and moving the finger up or down away from the bar slows the drag (half, then a quarter) to find an exact
// spot. The recording jumps when the finger is let go. Tap the current time to type a time to jump to.
// With a `waveform` it is drawn like SoundCloud's: the recording's loudness as bars, gold up to where it is playing.
// While `playing`, it glides between the player's updates (at `rate`, the playback speed).
export function SeekBar({
  currentTime,
  duration,
  onSeek,
  label,
  goToLabel = 'Go to',
  waveform,
  playing = false,
  rate = 1,
}: {
  currentTime: number;
  duration: number;
  onSeek: (seconds: number) => void;
  label: string;
  goToLabel?: string;
  waveform?: string;
  playing?: boolean;
  rate?: number;
}) {
  const styles = useThemedStyles(createStyles);
  const colors = useAlhanColors();
  const [width, setWidth] = useState(0);
  // Where the drag is, from 0 to 1
  const [drag, setDrag] = useState<number | null>(null);
  const [typing, setTyping] = useState<string | null>(null);
  const barRef = useRef<View>(null);
  const anchor = useRef({ startX: 0, startRatio: 0 });
  const enabled = duration > 0 && width > 0;
  const smoothTime = useSmoothTime(currentTime, duration, playing, rate);
  // Drawn once per recording and color; only the gold part's width changes as it plays
  const waveBase = useMemo(() => (waveform ? <WaveBars wave={waveform} color={colors.border} /> : null), [waveform, colors.border]);
  const wavePlayed = useMemo(() => (waveform ? <WaveBars wave={waveform} color={colors.gold} /> : null), [waveform, colors.gold]);

  const clamp = (r: number) => Math.min(1, Math.max(0, r));
  const shown = drag ?? (duration > 0 ? Math.min(1, smoothTime / duration) : 0);

  const grant = (e: GestureResponderEvent) => {
    const { pageX, locationX } = e.nativeEvent;
    const ratio = clamp(locationX / width);
    anchor.current = { startX: pageX, startRatio: ratio };
    setDrag(ratio);
  };
  const move = (e: GestureResponderEvent) => {
    const { pageX } = e.nativeEvent;
    const deltaRatio = (pageX - anchor.current.startX) / width;
    setDrag(clamp(anchor.current.startRatio + deltaRatio));
  };
  const release = () => {
    if (drag !== null) onSeek(drag * duration);
    setDrag(null);
  };

  const submitTyped = () => {
    const seconds = typing === null ? null : parseTime(typing);
    if (seconds !== null && duration > 0) onSeek(Math.min(duration, seconds));
    setTyping(null);
  };

  const thumbSize = drag !== null ? 28 : 22;
  const thumbLeft = Math.max(0, Math.min(width - thumbSize, shown * width - thumbSize / 2));

  return (
    <View>
      <View
        ref={barRef}
        style={[styles.touchArea, waveform ? styles.touchAreaWave : null]}
        hitSlop={{ top: 12, bottom: 12, left: 0, right: 0 }}
        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
        onStartShouldSetResponder={() => enabled}
        onMoveShouldSetResponder={() => enabled}
        // Keep the drag even if the finger wanders up or down, instead of scrolling the page
        onResponderTerminationRequest={() => false}
        onResponderGrant={grant}
        onResponderMove={move}
        onResponderRelease={release}
        onResponderTerminate={() => setDrag(null)}
        accessible
        accessibilityRole="adjustable"
        accessibilityLabel={label}
        accessibilityValue={{ min: 0, max: Math.round(duration), now: Math.round(shown * duration), text: formatTime(shown * duration) }}
        accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
        onAccessibilityAction={(e) =>
          onSeek(Math.min(duration, Math.max(0, currentTime + (e.nativeEvent.actionName === 'increment' ? 10 : -10))))
        }>
        {waveform ? (
          <View pointerEvents="none">
            {waveBase}
            {/* The played part: the same bars in gold, cut off where the recording is */}
            <View style={[styles.wavePlayed, { width: `${shown * 100}%` }]}>
              <View style={{ width }}>{wavePlayed}</View>
            </View>
            {enabled ? <View style={[styles.playhead, drag !== null && styles.playheadActive, { left: Math.max(0, Math.min(width - 2, shown * width - 1)) }]} /> : null}
          </View>
        ) : (
          /* Track and fill */
          <View style={[styles.track, drag !== null && styles.trackActive]} pointerEvents="none">
            <View style={[styles.fill, { width: `${shown * 100}%` }]} />
          </View>
        )}
        {enabled && !waveform ? (
          <View
            pointerEvents="none"
            style={[styles.thumb, drag !== null && styles.thumbActive, { left: thumbLeft }]}
          />
        ) : null}
        {drag !== null ? (
          <View pointerEvents="none" style={[styles.bubble, { left: Math.min(Math.max(shown * width - 36, 0), Math.max(0, width - 72)) }]}>
            <Text style={styles.bubbleTime}>{formatTime(shown * duration)}</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.times}>
        {typing !== null ? (
          <TextInput
            value={typing}
            onChangeText={setTyping}
            onSubmitEditing={submitTyped}
            onBlur={submitTyped}
            autoFocus
            keyboardType="numbers-and-punctuation"
            returnKeyType="go"
            placeholder="1:30"
            placeholderTextColor={colors.muted}
            accessibilityLabel={goToLabel}
            style={styles.timeInput}
          />
        ) : (
          <Pressable
            onPress={() => enabled && setTyping('')}
            accessibilityRole="button"
            accessibilityLabel={`${goToLabel}, ${formatTime(shown * duration)}`}
            hitSlop={10}
            style={({ pressed }) => [styles.timeButton, pressed && styles.timeButtonPressed]}>
            <Text style={[styles.time, styles.timeCurrent]}>{formatTime(shown * duration)}</Text>
          </Pressable>
        )}
        <Text style={styles.time}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
}

const createStyles = (colors: AlhanPalette) =>
  StyleSheet.create({
    // Much taller than the bar so it is easy to grab with a thumb
    touchArea: { height: 52, justifyContent: 'center' },
    touchAreaWave: { height: WAVE_HEIGHT + 16 },
    wavePlayed: { position: 'absolute', top: 0, left: 0, bottom: 0, overflow: 'hidden' },
    playhead: { position: 'absolute', top: -2, width: 2, height: WAVE_HEIGHT + 4, borderRadius: 1, backgroundColor: colors.gold },
    playheadActive: { width: 3, top: -6, height: WAVE_HEIGHT + 12 },
    track: { height: 8, borderRadius: 4, backgroundColor: colors.border, overflow: 'hidden' },
    trackActive: { height: 10, borderRadius: 5 },
    fill: { height: '100%', backgroundColor: colors.gold },
    thumb: {
      position: 'absolute',
      top: '50%',
      marginTop: -11,
      width: 22,
      height: 22,
      borderRadius: 11,
      backgroundColor: colors.gold,
      borderWidth: 2.5,
      borderColor: colors.surface,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3,
      elevation: 4,
    },
    thumbActive: {
      marginTop: -14,
      width: 28,
      height: 28,
      borderRadius: 14,
      borderWidth: 3,
    },
    // The time above the finger while dragging
    bubble: {
      position: 'absolute',
      top: -34,
      minWidth: 88,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 10,
      backgroundColor: colors.gold,
    },
    bubbleTime: { fontSize: 16, fontWeight: '800', color: colors.onGold, fontVariant: ['tabular-nums'] },
    bubbleSpeed: { fontSize: 13, fontWeight: '700', color: colors.onGold, opacity: 0.8 },
    times: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    time: { fontSize: 14, color: colors.muted, fontVariant: ['tabular-nums'] },
    // The current time looks tappable: tap it to type a time
    timeButton: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      marginLeft: -8,
      borderRadius: 8,
      backgroundColor: colors.goldSoft,
    },
    timeButtonPressed: { opacity: 0.6 },
    timeCurrent: { color: colors.gold, fontWeight: '700' },
    timeInput: {
      minWidth: 90,
      paddingHorizontal: 8,
      paddingVertical: 4,
      marginLeft: -8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.gold,
      color: colors.text,
      fontSize: 15,
      fontVariant: ['tabular-nums'],
    },
  });
