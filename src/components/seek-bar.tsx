import { useRef, useState } from 'react';
import { GestureResponderEvent, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { formatTime } from '@/components/alhan-ui';
import { AlhanPalette } from '@/constants/alhan-colors';
import { useAlhanColors, useThemedStyles } from '@/hooks/use-alhan-colors';

// "1:23", "83" or "1:02:03" in seconds, or null if it is not a time
const parseTime = (text: string): number | null => {
  const parts = text.trim().replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d))).split(/[:.,]/);
  if (!parts.length || parts.some((p) => !/^\d+$/.test(p))) return null;
  return parts.reduce((total, p) => total * 60 + Number(p), 0);
};

// The recording's progress bar. Tap it to jump there, or drag the handle: while dragging, the time shows above the
// finger, and moving the finger up or down away from the bar slows the drag (half, then a quarter) to find an exact
// spot. The recording jumps when the finger is let go. Tap the current time to type a time to jump to.
export function SeekBar({
  currentTime,
  duration,
  onSeek,
  label,
  goToLabel = 'Go to',
}: {
  currentTime: number;
  duration: number;
  onSeek: (seconds: number) => void;
  label: string;
  goToLabel?: string;
}) {
  const styles = useThemedStyles(createStyles);
  const colors = useAlhanColors();
  const [width, setWidth] = useState(0);
  // Where the drag is, from 0 to 1, and how slowly it moves
  const [drag, setDrag] = useState<number | null>(null);
  const [fine, setFine] = useState(1);
  const [typing, setTyping] = useState<string | null>(null);
  // The bar's left edge on screen, and where the finger and handle were when the drag last changed speed
  const barRef = useRef<View>(null);
  const left = useRef(0);
  const anchor = useRef({ x: 0, ratio: 0 });
  const anchorY = useRef<number | null>(null);
  const enabled = duration > 0 && width > 0;

  const clamp = (r: number) => Math.min(1, Math.max(0, r));
  const speedFor = (e: GestureResponderEvent) => {
    const away = Math.abs(e.nativeEvent.pageY - (anchorY.current ?? e.nativeEvent.pageY));
    return away > 120 ? 0.25 : away > 60 ? 0.5 : 1;
  };
  const shown = drag ?? (duration > 0 ? Math.min(1, currentTime / duration) : 0);

  const grant = (e: GestureResponderEvent) => {
    const { pageX, pageY, locationX } = e.nativeEvent;
    // pageX keeps working when the finger leaves the bar; work out the bar's edge from where the touch began
    left.current = pageX - locationX;
    barRef.current?.measureInWindow((x) => (left.current = x));
    const ratio = clamp(locationX / width);
    anchor.current = { x: pageX, ratio };
    anchorY.current = pageY;
    setFine(1);
    setDrag(ratio);
  };
  const move = (e: GestureResponderEvent) => {
    const { pageX } = e.nativeEvent;
    const speed = speedFor(e);
    if (speed !== fine) {
      // carry on from where the handle is, at the new speed
      anchor.current = { x: pageX, ratio: drag ?? anchor.current.ratio };
      setFine(speed);
      return;
    }
    setDrag(speed === 1 ? clamp((pageX - left.current) / width) : clamp(anchor.current.ratio + ((pageX - anchor.current.x) / width) * speed));
  };
  const release = () => {
    if (drag !== null) onSeek(drag * duration);
    setDrag(null);
    setFine(1);
    anchorY.current = null;
  };

  const submitTyped = () => {
    const seconds = typing === null ? null : parseTime(typing);
    if (seconds !== null && duration > 0) onSeek(Math.min(duration, seconds));
    setTyping(null);
  };

  return (
    <View>
      <View
        ref={barRef}
        style={styles.touchArea}
        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
        onStartShouldSetResponder={() => enabled}
        onMoveShouldSetResponder={() => enabled}
        // Keep the drag even if the finger wanders up or down, instead of scrolling the page
        onResponderTerminationRequest={() => false}
        onResponderGrant={grant}
        onResponderMove={move}
        onResponderRelease={release}
        onResponderTerminate={() => {
          setDrag(null);
          setFine(1);
        }}
        accessible
        accessibilityRole="adjustable"
        accessibilityLabel={label}
        accessibilityValue={{ min: 0, max: Math.round(duration), now: Math.round(shown * duration), text: formatTime(shown * duration) }}
        accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
        onAccessibilityAction={(e) =>
          onSeek(Math.min(duration, Math.max(0, currentTime + (e.nativeEvent.actionName === 'increment' ? 10 : -10))))
        }>
        {/* Children ignore touches so the position is always measured across the whole bar */}
        <View style={[styles.track, drag !== null && styles.trackActive]} pointerEvents="none">
          <View style={[styles.fill, { width: `${shown * 100}%` }]} />
        </View>
        {enabled ? (
          <View
            pointerEvents="none"
            style={[styles.thumb, drag !== null && styles.thumbActive, { left: shown * width - (drag !== null ? 14 : 10) }]}
          />
        ) : null}
        {drag !== null ? (
          <View pointerEvents="none" style={[styles.bubble, { left: Math.min(Math.max(shown * width - 44, -8), width - 80) }]}>
            <Text style={styles.bubbleTime}>{formatTime(shown * duration)}</Text>
            {fine < 1 ? <Text style={styles.bubbleSpeed}>{fine === 0.5 ? '½×' : '¼×'}</Text> : null}
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
    // Comfortable touch target for dragging on mobile
    touchArea: { height: 44, justifyContent: 'center' },
    track: { height: 6, borderRadius: 3, backgroundColor: colors.border, overflow: 'hidden' },
    trackActive: { height: 8, borderRadius: 4 },
    fill: { height: '100%', backgroundColor: colors.gold },
    thumb: {
      position: 'absolute',
      top: 14,
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: colors.gold,
      borderWidth: 2,
      borderColor: colors.surface,
    },
    thumbActive: { top: 11, width: 22, height: 22, borderRadius: 11 },
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
    bubbleTime: { fontSize: 15, fontWeight: '800', color: colors.onGold, fontVariant: ['tabular-nums'] },
    bubbleSpeed: { fontSize: 12, fontWeight: '700', color: colors.onGold, opacity: 0.8 },
    times: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 },
    time: { fontSize: 13, color: colors.muted, fontVariant: ['tabular-nums'] },
    // The current time looks tappable: tap it to type a time
    timeButton: {
      paddingHorizontal: 6,
      paddingVertical: 2,
      marginLeft: -6,
      borderRadius: 6,
      backgroundColor: colors.goldSoft,
    },
    timeButtonPressed: { opacity: 0.6 },
    timeCurrent: { color: colors.gold, fontWeight: '700' },
    timeInput: {
      minWidth: 80,
      paddingHorizontal: 6,
      paddingVertical: 2,
      marginLeft: -6,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: colors.gold,
      color: colors.text,
      fontSize: 14,
      fontVariant: ['tabular-nums'],
    },
  });
