import { Stack } from 'expo-router';

import { useAlhanColors } from '../hooks/use-alhan-colors';

// The pages inside one tab, pushed with the phone's own slide and swipe back
export function TabStack() {
  const colors = useAlhanColors();
  return <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }} />;
}
