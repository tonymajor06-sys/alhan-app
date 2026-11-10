// expo-audio as the queue's player: on the website, and the fallback on a phone build without the native player.
// One AudioPlayer that is never released; this file moves through the queue itself (expo-audio plays one recording).
import { AudioPlayer, AudioStatus, createAudioPlayer, setAudioModeAsync } from 'expo-audio';

import type { AudioEngine, EngineEvents, EngineRepeat, EngineTrack } from './audio-engine-types';

export function createExpoEngine(events: EngineEvents): AudioEngine {
  let tracks: EngineTrack[] = [];
  let index = 0;
  let repeat: EngineRepeat = 'none';
  let rate = 1;
  let volume = 1;
  let player: AudioPlayer | null = null;

  // Created on first use because the web player needs `Audio`, which doesn't exist during static rendering
  const getPlayer = (): AudioPlayer => {
    if (player) return player;
    const p = createAudioPlayer(null, { updateInterval: 500 });
    player = p;
    p.addListener('playbackStatusUpdate', onStatus);
    // Next/previous on the lock screen or headphones (added to expo-audio in patches/)
    p.addListener('remoteCommand', ({ command }) => {
      const target = index + (command === 'next' ? 1 : -1);
      const wrapped = repeat === 'all' && tracks.length ? (target + tracks.length) % tracks.length : target;
      if (wrapped >= 0 && wrapped < tracks.length) {
        open(wrapped, p.playing);
        events.trackChanged(tracks[wrapped].id);
      }
    });
    // On web expo-audio drops the promise from <audio>.play(), so a recording that can't load (not online yet,
    // or no internet) becomes an "Uncaught Error". Give every play() a handler; the player already shows it as stopped.
    if (typeof HTMLMediaElement !== 'undefined' && !(HTMLMediaElement.prototype as { alhanSafePlay?: boolean }).alhanSafePlay) {
      const play = HTMLMediaElement.prototype.play;
      HTMLMediaElement.prototype.play = function (this: HTMLMediaElement) {
        const result = play.call(this);
        result?.catch?.(() => {});
        return result;
      };
      (HTMLMediaElement.prototype as { alhanSafePlay?: boolean }).alhanSafePlay = true;
    }
    setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: true,
      // Lock screen controls require exclusive audio focus
      interruptionMode: 'doNotMix',
    }).catch(() => {
      // audio still plays in the foreground
    });
    return p;
  };

  const applyRate = (p: AudioPlayer) => {
    try {
      // Pitch correction keeps a slowed-down chant at its real pitch
      p.setPlaybackRate(rate, 'high');
    } catch {
      // speed control is unavailable on this platform
    }
  };

  const open = (at: number, autoplay: boolean) => {
    const track = tracks[at];
    if (!track) return;
    index = at;
    const p = getPlayer();
    p.replace({ uri: track.url });
    p.loop = repeat === 'one';
    applyRate(p);
    p.volume = volume;
    if (autoplay) p.play();
    try {
      // Also keeps Android's foreground service alive; without it background audio stops after ~3 minutes
      p.setActiveForLockScreen(
        true,
        { title: track.title, artist: track.artist, artworkUrl: track.artwork },
        // Next/previous hymn instead of 10-second jumps, so the car's skip buttons move through the queue
        { showPreviousTrack: true, showNextTrack: true }
      );
    } catch {
      // lock screen controls are unavailable on this platform
    }
  };

  function onStatus(s: AudioStatus) {
    if (s.didJustFinish && repeat !== 'one') {
      const next = index + 1;
      if (next < tracks.length || (repeat === 'all' && tracks.length > 0)) {
        const at = next < tracks.length ? next : 0;
        open(at, true);
        return events.trackChanged(tracks[at].id);
      }
      // End of the queue: rewind so Play starts the last track again
      getPlayer().seekTo(0);
      events.status({ playing: false, currentTime: 0, duration: s.duration, isBuffering: false });
      return events.queueEnded();
    }
    events.status({
      playing: s.playing,
      currentTime: s.currentTime,
      duration: s.duration,
      isBuffering: s.isBuffering || (s.playing && !s.isLoaded),
    });
  }

  return {
    load(next, at, autoplay) {
      tracks = next;
      open(at, autoplay);
    },
    update(next) {
      const playingId = tracks[index]?.id;
      tracks = next;
      index = Math.max(0, next.findIndex((t) => t.id === playingId));
    },
    skipTo(at, autoplay) {
      open(at, autoplay);
    },
    play: () => getPlayer().play(),
    pause: () => getPlayer().pause(),
    seekTo: (seconds) => getPlayer().seekTo(seconds),
    setRepeat(next) {
      repeat = next;
      if (player) player.loop = next === 'one';
    },
    setRate(next) {
      rate = next;
      if (player) applyRate(player);
    },
    setVolume(next) {
      volume = next;
      try {
        if (player) player.volume = next;
      } catch {
        // volume is unavailable on this platform
      }
    },
    stop() {
      if (!player) return;
      player.pause();
      try {
        player.clearLockScreenControls();
      } catch {
        // nothing to clear
      }
    },
    setLibrary() {
      // no car on this player
    },
  };
}
