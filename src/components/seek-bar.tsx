import { useState } from 'react';
import { GestureResponderEvent, StyleSheet, Text, View } from 'react-native';

import { formatTime } from '@/components/alhan-ui';
import { AlhanPalette } from '@/constants/alhan-colors';
import { useThemedStyles } from '@/hooks/use-alhan-colors';

// The recording's progress bar: tap or drag it to jump to another point.
// While dragging, the handle and time follow the finger; the recording jumps when it is let go.
export function SeekBar({
  currentTime,
  duration,
  onSeek,
  label,
}: {
  currentTime: number;
  duration: number;
  onSeek: (seconds: number) => void;
  label: string;
}) {
  const styles = useThemedStyles(createStyles);
  const [width, setWidth] = useState(0);
  // Where the finger is, from 0 to 1, while dragging
  const [drag, setDrag] = useState<number | null>(null);
  const enabled = duration > 0 && width > 0;

  const ratioAt = (e: GestureResponderEvent) => Math.min(1, Math.max(0, e.nativeEvent.locationX / width));
  const shown = drag ?? (duration > 0 ? Math.min(1, currentTime / duration) : 0);

  return (
    <View>
      <View
        style={styles.touchArea}
        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
        onStartShouldSetResponder={() => enabled}
        onMoveShouldSetResponder={() => enabled}
        // Keep the drag even if the finger wanders up or down, instead of scrolling the page
        onResponderTerminationRequest={() => false}
        onResponderGrant={(e) => setDrag(ratioAt(e))}
        onResponderMove={(e) => setDrag(ratioAt(e))}
        onResponderRelease={(e) => {
          onSeek(ratioAt(e) * duration);
          setDrag(null);
        }}
        onResponderTerminate={() => setDrag(null)}
        accessible
        accessibilityRole="adjustable"
        accessibilityLabel={label}
        accessibilityValue={{ min: 0, max: Math.round(duration), now: Math.round(shown * duration) }}
        accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
        onAccessibilityAction={(e) =>
          onSeek(Math.min(duration, Math.max(0, currentTime + (e.nativeEvent.actionName === 'increment' ? 10 : -10))))
        }>
        {/* Children ignore touches so the position is always measured across the whole bar */}
        <View style={styles.track} pointerEvents="none">
          <View style={[styles.fill, { width: `${shown * 100}%` }]} />
        </View>
        {enabled ? (
          <View
            pointerEvents="none"
            style={[styles.thumb, drag !== null && styles.thumbActive, { left: shown * width - (drag !== null ? 11 : 8) }]}
          />
        ) : null}
      </View>
      <View style={styles.times}>
        <Text style={styles.time}>{formatTime(shown * duration)}</Text>
        <Text style={styles.time}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
}

const createStyles = (colors: AlhanPalette) =>
  StyleSheet.create({
    // Taller than the bar so it is easy to grab
    touchArea: { height: 32, justifyContent: 'center' },
    track: { height: 6, borderRadius: 3, backgroundColor: colors.border, overflow: 'hidden' },
    fill: { height: '100%', backgroundColor: colors.gold },
    thumb: {
      position: 'absolute',
      top: 8,
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: colors.gold,
    },
    thumbActive: { top: 5, width: 22, height: 22, borderRadius: 11 },
    times: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 2 },
    time: { fontSize: 14, color: colors.muted, fontVariant: ['tabular-nums'] },
  });
