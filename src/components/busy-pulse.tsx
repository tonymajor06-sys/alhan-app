import { ReactNode, useEffect } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, { cancelAnimation, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

// Gently fades its contents in and out while `busy`, e.g. a play button while the recording loads
export function BusyPulse({ busy, style, children }: { busy: boolean; style?: StyleProp<ViewStyle>; children: ReactNode }) {
  const opacity = useSharedValue(1);
  useEffect(() => {
    if (busy) {
      opacity.value = withRepeat(withTiming(0.45, { duration: 650 }), -1, true);
    } else {
      cancelAnimation(opacity);
      opacity.value = withTiming(1, { duration: 150 });
    }
  }, [busy, opacity]);
  const animated = useAnimatedStyle(() => ({ opacity: opacity.value }));
  return <Animated.View style={[style, animated]}>{children}</Animated.View>;
}
