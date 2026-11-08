import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

// State that starts as something random (a verse, a quiz round). The website's pages are made ahead of time, and the
// browser must first show what was made there, or React stops with a hydration error: so on the web it starts as
// `atFirst` and the random one is picked as soon as the page is up. In the phone app it is random from the start.
export function useRandomStart<T>(pick: () => T, atFirst: T) {
  const web = Platform.OS === 'web';
  const state = useState<T>(web ? atFirst : pick);
  const set = state[1];
  useEffect(() => {
    if (web) set(pick());
    // once, when the page is up
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return state;
}
