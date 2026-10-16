import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

// Small taps under the finger, so buttons feel like an app's. The phone's own setting for system haptics
// still decides whether they are felt. Nothing on the website.
const enabled = Platform.OS === 'ios' || Platform.OS === 'android';

// Opening a row, tile or tab
export const tapFeedback = () => {
  if (enabled) Haptics.selectionAsync().catch(() => {});
};

// Play, pause, skip, and adding to the playlist
export const pressFeedback = () => {
  if (enabled) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
};

// Something finished, like a download
export const successFeedback = () => {
  if (enabled) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
};
