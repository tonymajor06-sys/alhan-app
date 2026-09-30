import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

import { dateToJdn } from '@/data/coptic-calendar';

// Today's day number, refreshed when the app returns to the foreground
// (so it rolls over if the app was left open past midnight)
export function useTodayJdn(): number {
  const [today, setToday] = useState(() => dateToJdn(new Date()));

  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') setToday(dateToJdn(new Date()));
    });
    return () => sub.remove();
  }, []);

  return today;
}
