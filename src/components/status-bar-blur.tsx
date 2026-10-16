import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { alhanLightColors } from '../constants/alhan-colors';
import { useAlhanColors } from '../hooks/use-alhan-colors';

// Frosted glass behind the clock and battery, so text scrolling under them blurs away instead of clashing.
// Android has no live blur here and shows a see-through strip of the page colour instead.
export function StatusBarBlur() {
  const insets = useSafeAreaInsets();
  const colors = useAlhanColors();
  if (insets.top === 0) return null;
  const light = colors.background === alhanLightColors.background;
  return (
    <BlurView
      intensity={60}
      tint={light ? 'systemChromeMaterialLight' : 'systemChromeMaterialDark'}
      pointerEvents="none"
      style={[styles.strip, { height: insets.top }]}
    />
  );
}

const styles = StyleSheet.create({
  strip: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});
