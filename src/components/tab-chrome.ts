import { useSegments } from 'expo-router';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Height of the website's own tab bar (see src/app/(tabs)/_layout.web.tsx)
export const WEB_TAB_BAR_HEIGHT = 64;
// The iPhone tab bar before iOS 26, above the home indicator
const IOS_CLASSIC_TAB_BAR_HEIGHT = 49;

// iOS 26 and later show the mini player in the tab bar's own slot (NativeTabs.BottomAccessory)
export const iosHasTabAccessory = Platform.OS === 'ios' && parseInt(String(Platform.Version), 10) >= 26;

// Where a screen sits: inside the tab bar's screens, or pushed over them (hymn pages, lessons, saints...)
// and how far the floating mini player and the end of the page must stay from the bottom edge
export function useTabChrome() {
  const insets = useSafeAreaInsets();
  const inTabs = useSegments()[0] === '(tabs)';
  if (!inTabs) {
    return { inTabs, floatingPlayer: true, playerBottom: insets.bottom + 12, pageBottom: insets.bottom, autoInsets: false };
  }
  if (Platform.OS === 'ios') {
    // The scroll view leaves room for the tab bar (and the bar's player) by itself
    return {
      inTabs,
      floatingPlayer: !iosHasTabAccessory,
      playerBottom: insets.bottom + IOS_CLASSIC_TAB_BAR_HEIGHT + 8,
      pageBottom: 0,
      autoInsets: true,
    };
  }
  if (Platform.OS === 'android') {
    // Android already ends the screen above the tab bar
    return { inTabs, floatingPlayer: true, playerBottom: 8, pageBottom: 0, autoInsets: false };
  }
  return {
    inTabs,
    floatingPlayer: true,
    playerBottom: insets.bottom + WEB_TAB_BAR_HEIGHT + 8,
    pageBottom: insets.bottom + WEB_TAB_BAR_HEIGHT,
    autoInsets: false,
  };
}
