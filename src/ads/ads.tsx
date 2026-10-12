import { useState } from 'react';
import { Platform, View } from 'react-native';
import mobileAds, {
  AdEventType,
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  MaxAdContentRating,
  TestIds,
} from 'react-native-google-mobile-ads';

import { adUnits, ADS_ENABLED } from '@/constants/ads';

// Ads that suit a church app: rated for general audiences, not personalized (so no tracking prompt)
const requestOptions = { requestNonPersonalizedAdsOnly: true };
const unitFor = (unit: { ios: string; android: string }, test: string) => (Platform.OS === 'ios' ? unit.ios : unit.android) || test;

let started = false;
export function startAds() {
  if (!ADS_ENABLED || started) return;
  started = true;
  mobileAds()
    .setRequestConfiguration({ maxAdContentRating: MaxAdContentRating.G })
    .then(() => mobileAds().initialize())
    .catch(() => {
      // no ads this session
    });
}

// The banner across the top of the screen; it takes no room until an ad has loaded
export function TopBanner() {
  const [failed, setFailed] = useState(false);
  if (!ADS_ENABLED || failed) return null;
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
  if (!ADS_ENABLED) return done();
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
