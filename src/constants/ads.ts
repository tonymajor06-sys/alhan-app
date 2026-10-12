// Google AdMob (account copticpsalmody@gmail.com, publisher pub-8657918561342604).
// Paste each ad unit ID from AdMob here; while one is empty, Google's test ad shows in its place.
// The App IDs go in app.json twice: under the react-native-google-mobile-ads plugin, and in the top-level
// "react-native-google-mobile-ads" block (android_app_id, ios_app_id), which the library's Android build reads.
export const ADS_ENABLED = true;

export const adUnits = {
  // The banner across the top of every screen
  banner: { ios: '', android: '' },
  // The full-screen ad after every few quiz rounds
  interstitial: { ios: '', android: '' },
};

export const QUIZ_ROUNDS_PER_AD = 5;
