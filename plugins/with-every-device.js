// Google Play shows an app only on devices that have every hardware feature it requires. Android counts a touchscreen
// as required unless the app says otherwise, which hides the app from Chromebooks and other computers without one;
// the app needs none of it (it is read and listened to), so the touchscreen is marked as not required.
const { withAndroidManifest } = require('expo/config-plugins');

const NOT_REQUIRED = ['android.hardware.touchscreen', 'android.hardware.microphone'];

module.exports = function withEveryDevice(config) {
  return withAndroidManifest(config, (config) => {
    const manifest = config.modResults.manifest;
    const features = (manifest['uses-feature'] = manifest['uses-feature'] ?? []);
    for (const name of NOT_REQUIRED) {
      const existing = features.find((f) => f.$?.['android:name'] === name);
      if (existing) existing.$['android:required'] = 'false';
      else features.push({ $: { 'android:name': name, 'android:required': 'false' } });
    }
    return config;
  });
};
