import Constants, { ExecutionEnvironment } from 'expo-constants';
import { useState } from 'react';
import { Platform, View } from 'react-native';

import { adUnits, ADS_ENABLED } from '@/constants/ads';

// Expo Go has no ad code, so the ad library is only loaded in real builds of the app
type AdsLibrary = typeof import('react-native-google-mobile-ads');
const ads: AdsLibrary | null =
  ADS_ENABLED && Constants.executionEnvironment !== ExecutionEnvironment.StoreClient
    ? // eslint-disable-next-line @typescript-eslint/no-require-imports
      (require('react-native-google-mobile-ads') as AdsLibrary)
    : null;

// Kid-friendly ads that suit a church app: rated G, treated as for children (Google's family-safe ads only),
// and not personalized (so no tracking prompt)
const requestOptions = { requestNonPersonalizedAdsOnly: true };
const unitFor = (unit: { ios: string; android: string }, test: string) => (Platform.OS === 'ios' ? unit.ios : unit.android) || test;

let started = false;
export function startAds() {
  if (!ads || started) return;
  started = true;
  ads
    .default()
    .setRequestConfiguration({
      maxAdContentRating: ads.MaxAdContentRating.G,
      tagForChildDirectedTreatment: true,
      tagForUnderAgeOfConsent: true,
    })
    .then(() => ads.default().initialize())
    .catch(() => {
      // no ads this session
    });
}

// The banner across the top of the screen; it takes no room until an ad has loaded
export function TopBanner() {
  const [failed, setFailed] = useState(false);
  if (!ads || failed) return null;
  const { BannerAd, BannerAdSize, TestIds } = ads;
  return (
    <View>
      <BannerAd
        unitId={unitFor(adUnits.banner, TestIds.ADAPTIVE_BANNER)}
        size={BannerAdSize.LARGE_ANCHORED_ADAPTIVE_BANNER}
        requestOptions={requestOptions}
        onAdFailedToLoad={() => setFailed(true)}
      />
    </View>
  );
}

// A full-screen ad; `done` runs when it is closed, or straight away if none could be shown
export function showFullScreenAd(done: () => void) {
  if (!ads) return done();
  const { AdEventType, InterstitialAd, TestIds } = ads;
  const ad = InterstitialAd.createForAdRequest(unitFor(adUnits.interstitial, TestIds.INTERSTITIAL), requestOptions);
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    unsubscribe.forEach((u) => u());
    done();
  };
  const unsubscribe = [
    ad.addAdEventListener(AdEventType.LOADED, () => ad.show().catch(finish)),
    ad.addAdEventListener(AdEventType.CLOSED, finish),
    ad.addAdEventListener(AdEventType.ERROR, finish),
  ];
  ad.load();
  // never keep the quiz waiting on a slow network
  setTimeout(() => {
    if (!ad.loaded) finish();
  }, 8000);
}
