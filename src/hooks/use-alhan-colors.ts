import { useMemo } from 'react';

import { AlhanPalette, alhanColors, alhanLightColors } from '@/constants/alhan-colors';
import { useColorScheme } from '@/hooks/use-color-scheme';

// Follows the phone's light/dark setting; dark is the app's original look, so it is the fallback
export function useAlhanColors(): AlhanPalette {
  return useColorScheme() === 'light' ? alhanLightColors : alhanColors;
}

// Builds a screen's StyleSheet for the current palette (once per palette, not every render)
export function useThemedStyles<T>(createStyles: (colors: AlhanPalette) => T): T {
  const colors = useAlhanColors();
  return useMemo(() => createStyles(colors), [createStyles, colors]);
}
