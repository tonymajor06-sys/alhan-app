import { router, usePathname } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  PanResponder,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { tapFeedback } from '@/components/haptics';
import { alhanColors } from '@/constants/alhan-colors';
import { updateSettings, useSettings } from '@/hooks/use-settings';

const BUBBLE_SIZE = 52;
const MARGIN = 16;
const colors = alhanColors;

export function AiBubble() {
  const { showAiBubble, language } = useSettings();
  const isRTL = language === 'ar';
  const insets = useSafeAreaInsets();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const pathname = usePathname();

  const [dockedSide, setDockedSide] = useState<'left' | 'right'>('right');

  const initialX = screenWidth > 0 ? screenWidth - MARGIN - BUBBLE_SIZE : 320;
  const [pan] = useState(() => new Animated.ValueXY({ x: initialX, y: 0 }));
  const currentPos = useRef({ x: initialX, y: 0 });

  useEffect(() => {
    const id = pan.addListener((val) => {
      currentPos.current = val;
    });
    return () => {
      pan.removeListener(id);
    };
  }, [pan]);

  // Keep screenWidth and insets in refs so the memoized PanResponder always has fresh dimensions
  const dimsRef = useRef({ screenWidth, screenHeight, bottomInset: insets.bottom, topInset: insets.top });
  useEffect(() => {
    dimsRef.current = { screenWidth, screenHeight, bottomInset: insets.bottom, topInset: insets.top };
  }, [screenWidth, screenHeight, insets]);

  // Adjust on screen orientation / width change
  const prevWidth = useRef(screenWidth);
  useEffect(() => {
    if (prevWidth.current !== screenWidth && screenWidth > 0) {
      prevWidth.current = screenWidth;
      const targetX = dockedSide === 'left' ? MARGIN : screenWidth - MARGIN - BUBBLE_SIZE;
      Animated.spring(pan, {
        toValue: { x: targetX, y: currentPos.current.y },
        useNativeDriver: false,
      }).start();
    }
  }, [screenWidth, dockedSide, pan]);

  const bottomPosition = insets.bottom + (Platform.OS === 'web' ? 76 : 84);

  const hideBubble = () => {
    tapFeedback();
    updateSettings({ showAiBubble: false });
  };

  const confirmHide = () => {
    Alert.alert(
      isRTL ? 'إخفاء أيقونة المساعد الذكي؟' : 'Hide AI Assistant Bubble?',
      isRTL
        ? 'يمكنك دائماً إعادة إظهارها في أي وقت من الإعدادات.'
        : 'You can re-enable it anytime from Settings.',
      [
        { text: isRTL ? 'إلغاء' : 'Cancel', style: 'cancel' },
        { text: isRTL ? 'إخفاء' : 'Hide', style: 'destructive', onPress: hideBubble },
      ]
    );
  };

  const [panResponder, setPanResponder] = useState<ReturnType<typeof PanResponder.create> | null>(null);

  useEffect(() => {
    setPanResponder(
      PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onStartShouldSetPanResponderCapture: () => false,
        onMoveShouldSetPanResponder: (_, gesture) =>
          Math.abs(gesture.dx) > 6 || Math.abs(gesture.dy) > 6,
        onMoveShouldSetPanResponderCapture: (_, gesture) =>
          Math.abs(gesture.dx) > 6 || Math.abs(gesture.dy) > 6,
        onPanResponderGrant: () => {
          pan.setOffset({
            x: currentPos.current.x,
            y: currentPos.current.y,
          });
          pan.setValue({ x: 0, y: 0 });
        },
        onPanResponderMove: (_, gesture) => {
          pan.setValue({ x: gesture.dx, y: gesture.dy });
        },
        onPanResponderRelease: (_, gesture) => {
          pan.flattenOffset();
          const distSq = gesture.dx * gesture.dx + gesture.dy * gesture.dy;

          if (distSq < 36) {
            tapFeedback();
            router.push('/ask');
            return;
          }

          const { screenWidth: sw, screenHeight: sh, bottomInset, topInset } = dimsRef.current;
          const curX = currentPos.current.x;
          const dockLeft = curX + BUBBLE_SIZE / 2 < sw / 2;
          setDockedSide(dockLeft ? 'left' : 'right');

          const targetX = dockLeft ? MARGIN : sw - MARGIN - BUBBLE_SIZE;
          const curBottom = bottomInset + (Platform.OS === 'web' ? 76 : 84);
          const minY = -(sh - curBottom - topInset - 80);
          const maxY = 20;
          const targetY = Math.max(minY, Math.min(maxY, currentPos.current.y));

          Animated.spring(pan, {
            toValue: { x: targetX, y: targetY },
            useNativeDriver: false,
            friction: 7,
            tension: 40,
          }).start();
        },
      })
    );
  }, [pan]);

  // Don't show if user disabled it, or when inside the Ask screen or Projector mode
  if (!showAiBubble || pathname === '/ask' || pathname?.startsWith('/present')) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          bottom: bottomPosition,
          left: 0,
          transform: pan.getTranslateTransform(),
        },
      ]}
      pointerEvents="box-none"
    >
      <View {...(panResponder?.panHandlers ?? {})} style={styles.bubbleTouchTarget}>
        <Pressable
          onPress={() => {
            tapFeedback();
            router.push('/ask');
          }}
          onLongPress={confirmHide}
          accessibilityRole="button"
          accessibilityLabel={isRTL ? 'المساعد القبطي الذكي' : 'Coptic AI Assistant'}
          accessibilityHint={
            isRTL
              ? 'اضغط للسؤال عن الألحان والطقوس، اسحب للتحريك يميناً ويساراً'
              : 'Tap to ask about hymns & rites, drag to move left or right'
          }
          style={({ pressed }) => [styles.bubble, pressed && styles.bubblePressed]}
        >
          <Text style={styles.bubbleIcon}>✨</Text>
          <Text style={styles.bubbleLabel}>AI</Text>
        </Pressable>

        {/* Small dismiss button on inward corner so it's never clipped by screen edge */}
        <Pressable
          onPress={hideBubble}
          accessibilityRole="button"
          accessibilityLabel={isRTL ? 'إخفاء' : 'Hide'}
          hitSlop={8}
          style={({ pressed }) => [
            styles.dismissBtn,
            dockedSide === 'right' ? styles.dismissBtnLeft : styles.dismissBtnRight,
            pressed && styles.dismissPressed,
          ]}
        >
          <Text style={styles.dismissText}>✕</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 9999,
  },
  bubbleTouchTarget: {
    position: 'relative',
  },
  bubble: {
    width: BUBBLE_SIZE,
    height: BUBBLE_SIZE,
    borderRadius: BUBBLE_SIZE / 2,
    backgroundColor: '#12172a',
    borderWidth: 1.5,
    borderColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 6,
    elevation: 8,
  },
  bubblePressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  bubbleIcon: {
    fontSize: 18,
    lineHeight: 20,
  },
  bubbleLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.gold,
    letterSpacing: 0.5,
  },
  dismissBtn: {
    position: 'absolute',
    top: -4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(30, 36, 60, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(217, 173, 85, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dismissBtnLeft: {
    left: -4,
  },
  dismissBtnRight: {
    right: -4,
  },
  dismissPressed: {
    opacity: 0.6,
  },
  dismissText: {
    color: colors.muted,
    fontSize: 9,
    fontWeight: '900',
    lineHeight: 11,
  },
});
