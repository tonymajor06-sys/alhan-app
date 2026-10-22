import { useEffect, useRef, useState } from 'react';

// The player reports the time every half second; in between, this moves it on every frame at the playback speed,
// so progress bars glide instead of jumping. `moving` is false while paused or loading, which holds it still.
export function useSmoothTime(currentTime: number, duration: number, moving: boolean, rate = 1): number {
  const [time, setTime] = useState(currentTime);
  const anchor = useRef({ time: currentTime, at: 0 });

  useEffect(() => {
    const now = Date.now();
    const projected = anchor.current.at ? anchor.current.time + ((now - anchor.current.at) / 1000) * rate : currentTime;
    // A report just behind where the bar already is would pull it back a little: keep going from where it is.
    // A bigger difference is a seek (or the recording catching up), so it jumps there.
    const behind = projected - currentTime;
    anchor.current = { time: moving && behind > 0 && behind < 0.4 ? projected : currentTime, at: now };
    setTime(anchor.current.time);
  }, [currentTime, moving, rate]);

  useEffect(() => {
    if (!moving) {
      anchor.current = { time: anchor.current.time, at: 0 };
      return;
    }
    let frame = 0;
    const tick = () => {
      const { time: from, at } = anchor.current;
      const next = from + ((Date.now() - at) / 1000) * rate;
      setTime(duration > 0 ? Math.min(duration, next) : next);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [moving, rate, duration]);

  return moving ? time : currentTime;
}
