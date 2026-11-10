// The app's player (react-native-nitro-player, see src/hooks/audio-engine.native.ts) in the car and in the background.
//
// Android Auto: the car finds a media app by its browse service and the automotive_app_desc file, then lists the
// app's playlists (the library's NitroPlayerMediaBrowserService; the intent filter must be on that exact class, or
// the car shows what is playing but an empty library).
// No Google Cast: the library's Cast setup entry is removed, so Cast never starts (the library catches that and
// carries on without it). iOS leaves the Cast SDK out in patches/react-native-nitro-player+1.9.0.patch.
// iOS: audio keeps playing in the background (expo-audio's own background setup is off, see app.json).
// CarPlay comes later: it needs Apple's CarPlay audio entitlement and Expo SDK 58's scenes.
const { withAndroidManifest, withDangerousMod, withInfoPlist } = require('expo/config-plugins');
const fs = require('fs');
const path = require('path');

const BROWSER_SERVICE = 'com.margelo.nitro.nitroplayer.media.NitroPlayerMediaBrowserService';
const CAST_OPTIONS = 'com.google.android.gms.cast.framework.OPTIONS_PROVIDER_CLASS_NAME';

const withAndroidAuto = (config) =>
  withAndroidManifest(config, (config) => {
    const manifest = config.modResults.manifest;
    manifest.$['xmlns:tools'] = manifest.$['xmlns:tools'] ?? 'http://schemas.android.com/tools';
    const app = manifest.application[0];
    const metaData = (app['meta-data'] = (app['meta-data'] ?? []).filter(
      (m) => ![CAST_OPTIONS, 'com.google.android.gms.car.application'].includes(m.$['android:name'])
    ));
    metaData.push(
      { $: { 'android:name': 'com.google.android.gms.car.application', 'android:resource': '@xml/automotive_app_desc' } },
      { $: { 'android:name': CAST_OPTIONS, 'tools:node': 'remove' } }
    );
    const services = (app.service = (app.service ?? []).filter((s) => s.$['android:name'] !== BROWSER_SERVICE));
    services.push({
      $: {
        'android:name': BROWSER_SERVICE,
        'android:foregroundServiceType': 'mediaPlayback',
        'android:exported': 'true',
        'tools:ignore': 'ExportedService',
      },
      'intent-filter': [{ action: [{ $: { 'android:name': 'android.media.browse.MediaBrowserService' } }] }],
    });
    return config;
  });

const withAutomotiveDescription = (config) =>
  withDangerousMod(config, [
    'android',
    (config) => {
      const dir = path.join(config.modRequest.platformProjectRoot, 'app', 'src', 'main', 'res', 'xml');
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(
        path.join(dir, 'automotive_app_desc.xml'),
        '<?xml version="1.0" encoding="utf-8"?>\n<automotiveApp>\n  <uses name="media" />\n</automotiveApp>\n'
      );
      return config;
    },
  ]);

const withBackgroundAudio = (config) =>
  withInfoPlist(config, (config) => {
    const modes = new Set(config.modResults.UIBackgroundModes ?? []);
    modes.add('audio');
    config.modResults.UIBackgroundModes = [...modes];
    return config;
  });

module.exports = function withCarAudio(config) {
  return withBackgroundAudio(withAutomotiveDescription(withAndroidAuto(config)));
};
