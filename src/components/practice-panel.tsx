import {
  RecordingPresets,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
  useAudioRecorder,
} from 'expo-audio';
import { useEffect, useState } from 'react';
import { Alert, Platform, Pressable, Text, View } from 'react-native';

import { useAlhanColors, useThemedStyles } from '@/hooks/use-alhan-colors';
import { togglePlay, useAudioQueue } from '@/hooks/use-audio-queue';
import { markPractised } from '@/hooks/use-learning';
import { AppLanguage } from '@/hooks/use-settings';

import { createAlhanStyles, formatTime } from './alhan-ui';
import { pressFeedback } from './haptics';
import { practiceStrings } from './practice-strings';

// Practice, under Learn: record yourself singing a verse (or the whole hymn when its verses have no times), then play
// your take, the recording's verse, or both one after the other to hear the difference. Nothing is kept: a take lasts
// until the next one, another verse, or the hymn is closed (the reader gives each verse a panel of its own). Not on Android, where the app asks for no microphone.
export const canPractise = Platform.OS !== 'android';

const BARS = 48;
// Loudness in decibels (about -60 silent to 0 loudest) as a bar height from 0 to 1
const barHeight = (db: number) => Math.min(1, Math.max(0.04, (db + 60) / 60));

type Phase = 'idle' | 'recording' | 'original' | 'mine' | 'bothOriginal' | 'bothMine';

export function PracticePanel({
  lang,
  hymnId,
  verse,
  range,
  isCurrent,
  playOriginal,
}: {
  lang: AppLanguage;
  hymnId: string;
  // The verse being practised (counted from 0), or null for the whole hymn
  verse: number | null;
  // Where it is in the recording, in seconds (end: the next verse's start, or the recording's end)
  range: { start: number; end: number | null };
  // Whether the hymn's recording is the one in the player
  isCurrent: boolean;
  // Plays the hymn's recording from `range.start`
  playOriginal: () => void;
}) {
  const t = practiceStrings[lang];
  const isRTL = lang === 'ar';
  const styles = useThemedStyles(createAlhanStyles);
  const colors = useAlhanColors();
  const rowDirection = isRTL ? styles.rowReverse : styles.row;
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;

  const queue = useAudioQueue();
  const recorder = useAudioRecorder({ ...RecordingPresets.HIGH_QUALITY, isMeteringEnabled: true });
  const [take, setTake] = useState<string | null>(null);
  const [levels, setLevels] = useState<number[]>([]);
  const [recordedMs, setRecordedMs] = useState(0);
  const player = useAudioPlayer(take);
  const playerStatus = useAudioPlayerStatus(player);
  const [phase, setPhase] = useState<Phase>('idle');

  // While recording, the loudness ten times a second, for the take's waveform
  useEffect(() => {
    if (phase !== 'recording') return;
    const id = setInterval(() => {
      const s = recorder.getStatus();
      setRecordedMs(s.durationMillis);
      if (s.metering !== undefined) setLevels((l) => [...l, s.metering!]);
    }, 100);
    return () => clearInterval(id);
  }, [phase, recorder]);

  // The take has played to its end
  useEffect(() => {
    const sub = player.addListener('playbackStatusUpdate', (s) => {
      if (s.didJustFinish) setPhase((ph) => (ph === 'mine' || ph === 'bothMine' ? 'idle' : ph));
    });
    return () => sub.remove();
  }, [player]);

  const pauseOriginal = () => {
    if (queue.status.playing) togglePlay();
  };
  const startMine = () => {
    pauseOriginal();
    player.seekTo(0);
    player.play();
  };

  // The recording's verse stops at the verse's end; with Both, the take follows it
  const originalEnd = range.end ?? (queue.status.duration || Infinity);
  useEffect(() => {
    if ((phase !== 'original' && phase !== 'bothOriginal') || !isCurrent) return;
    if (queue.status.currentTime >= originalEnd - 0.1) {
      pauseOriginal();
      // (following the player's clock, which lives outside React)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPhase(phase === 'bothOriginal' ? 'bothMine' : 'idle');
      if (phase === 'bothOriginal') startMine();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, isCurrent, queue.status.currentTime, originalEnd]);

  const record = async () => {
    pressFeedback();
    pauseOriginal();
    player.pause();
    try {
      const permission = await requestRecordingPermissionsAsync();
      if (!permission.granted) return Alert.alert(t.noMicrophone);
      await setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });
      await recorder.prepareToRecordAsync();
      recorder.record();
      setLevels([]);
      setRecordedMs(0);
      setTake(null);
      setPhase('recording');
    } catch {
      Alert.alert(t.recordFailed);
    }
  };

  const stop = async () => {
    pressFeedback();
    if (phase === 'recording') {
      await recorder.stop().catch(() => {});
      // Back to playing out loud, as the player had it (see audio-engine-expo.ts)
      await setAudioModeAsync({ allowsRecording: false, playsInSilentMode: true, shouldPlayInBackground: true, interruptionMode: 'doNotMix' }).catch(
        () => {}
      );
      setTake(recorder.uri);
      markPractised(hymnId);
    } else {
      pauseOriginal();
      player.pause();
    }
    setPhase('idle');
  };

  const play = (which: 'original' | 'mine' | 'both') => {
    pressFeedback();
    player.pause();
    if (which === 'mine') {
      setPhase('mine');
      return startMine();
    }
    setPhase(which === 'both' ? 'bothOriginal' : 'original');
    playOriginal();
  };

  // The take's waveform: its loudness in BARS bars (fewer while a short take is still being recorded)
  const bars =
    levels.length <= BARS
      ? levels
      : Array.from({ length: BARS }, (_, i) => {
          const part = levels.slice(Math.floor((i * levels.length) / BARS), Math.floor(((i + 1) * levels.length) / BARS));
          return Math.max(...part);
        });
  const playedPart = phase === 'mine' || phase === 'bothMine' ? playerStatus.currentTime / (playerStatus.duration || 1) : 0;
  const recording = phase === 'recording';
  // Playing the recording's verse ends when another hymn takes over the player
  const busy = phase !== 'idle' && !((phase === 'original' || phase === 'bothOriginal') && !isCurrent);

  const button = (label: string, onPress: () => void, main = false, disabled = false) => (
    <Pressable
      key={label}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.chip,
        styles.chipSmall,
        main && { backgroundColor: recording ? colors.fast : colors.gold, borderColor: 'transparent' },
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}>
      <Text style={[styles.chipText, main && { color: recording ? '#fff' : colors.onGold }]}>{label}</Text>
    </Pressable>
  );

  return (
    <View style={{ marginTop: 14, gap: 8 }}>
      <Text style={[styles.compareLabel, textAlign]}>
        {t.practice}
        {verse !== null ? ` · ${t.practiceVerse(verse + 1)}` : ''}
      </Text>
      <Text style={[styles.learnHint, textAlign]}>{verse !== null ? t.practiceHint : t.practiceWhole}</Text>
      {bars.length ? (
        <View
          style={[rowDirection, { height: 36, alignItems: 'center', gap: 2 }]}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants">
          {bars.map((db, i) => (
            <View
              key={i}
              style={{
                flex: 1,
                maxWidth: 6,
                height: 36 * barHeight(db),
                borderRadius: 2,
                backgroundColor: recording ? colors.fast : i / bars.length < playedPart ? colors.gold : colors.goldSoft,
              }}
            />
          ))}
        </View>
      ) : null}
      {recording ? <Text style={[styles.learnHint, textAlign]}>{t.recording(formatTime(recordedMs / 1000))}</Text> : null}
      <View style={[styles.learnRow, rowDirection]}>
        {recording || busy ? button(t.stop, stop, recording) : button(take ? t.again : t.record, record, true)}
        {take && !recording ? button(t.playMine, () => play('mine'), false, busy) : null}
        {!recording ? button(t.playOriginal, () => play('original'), false, busy) : null}
        {take && !recording ? button(t.playBoth, () => play('both'), false, busy) : null}
      </View>
    </View>
  );
}
