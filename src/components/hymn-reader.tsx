import { router } from 'expo-router';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { Alert, Pressable, ScrollView, Share, Text, View } from 'react-native';

import { hymnWebUrl } from '../constants/site';
import { displayTitle } from '../data/arabic-titles';
import { Hymn, LanguageType } from '../data/hymns';
import { hymnSlug, locateHymn } from '../data/search';
import { useAlhanColors, useThemedStyles } from '../hooks/use-alhan-colors';
import {
  audioSourceFor,
  canDownload,
  downloadAudio,
  removeDownload,
  useAudioDownloads,
} from '../hooks/use-audio-downloads';
import {
  currentTrack,
  playQueue,
  seekBy,
  seekTo,
  setPlaybackRate,
  setRepeat,
  togglePlay,
  trackKey,
  useAudioQueue,
} from '../hooks/use-audio-queue';
import { isInPlaylist, PlaylistItem, togglePlaylistItem, usePlaylist } from '../hooks/use-playlist';
import { TEXT_SCALE_MAX, TEXT_SCALE_MIN, updateSettings, useSettings } from '../hooks/use-settings';
import { clearVerseTimings, saveVerseTimings, useVerseTimings, verseAt } from '../hooks/use-verse-timings';
import {
  ChipScroller,
  createAlhanStyles,
  defaultHymnLanguage,
  formatTime,
  goBackOrHome,
  KeepScreenAwake,
  languageLabels,
  ScreenShell,
  Speaker,
  strings,
  toVerses,
  Verse,
  withoutNumber,
} from './alhan-ui';

const SPEEDS = [0.5, 0.75, 1];

export const hymnPlainText = (hymn: Hymn, language: LanguageType) =>
  (hymn.versions.find((v) => v.language === language)?.text ?? '').replace(/(?:\\n)+/g, '\n\n');

export function HymnReader({
  hymn,
  initialLanguage,
  banner,
}: {
  hymn: Hymn;
  initialLanguage?: LanguageType;
  // Shown above the language chips (the web version's "Get the app")
  banner?: ReactNode;
}) {
  const settings = useSettings();
  const lang = settings.language;
  const t = strings[lang];
  const isRTL = lang === 'ar';
  const colors = useAlhanColors();
  const styles = useThemedStyles(createAlhanStyles);
  const rowDirection = isRTL ? styles.rowReverse : styles.row;
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;

  const [activeLanguage, setActiveLanguage] = useState<LanguageType>(initialLanguage ?? defaultHymnLanguage(lang));

  // Only offer the languages this hymn actually has text for
  const availableLanguages = languageLabels[lang].filter((l) =>
    hymn.versions.some((v) => v.language === l.key && v.text)
  );
  const effectiveLanguage = availableLanguages.some((l) => l.key === activeLanguage)
    ? activeLanguage
    : (availableLanguages[0]?.key ?? activeLanguage);

  const currentAudio = hymn.versions.find((v) => v.language === effectiveLanguage)?.audio ?? null;
  // Audio lives in a shared queue so it keeps playing after leaving the hymn or the app
  const queue = useAudioQueue();
  const nowPlaying = currentTrack(queue);
  const playlist = usePlaylist();
  const downloads = useAudioDownloads();
  const readerItem: PlaylistItem = { hymnId: hymn.id, language: effectiveLanguage };
  const readerIsCurrent = !!nowPlaying && trackKey(nowPlaying) === trackKey(readerItem);
  const status = readerIsCurrent ? queue.status : { playing: false, currentTime: 0, duration: 0 };
  const title = displayTitle(hymn, lang);

  const location = locateHymn(hymn.id)?.location;
  const breadcrumb = location
    ? `${withoutNumber(displayTitle(location.group, lang))} ${isRTL ? '‹' : '›'} ${displayTitle(location.service, lang)}`
    : null;

  const toggleReaderAudio = () => {
    if (readerIsCurrent) return togglePlay();
    const source = currentAudio ? audioSourceFor(currentAudio) : null;
    if (source) playQueue([{ ...readerItem, title, source }]);
  };

  const toggleDownload = (file: string) => {
    if (downloads.downloaded.has(file)) return removeDownload(file);
    downloadAudio(file).then((ok) => {
      if (!ok) Alert.alert(t.downloadFailed);
    });
  };

  const changeTextScale = (delta: number) => {
    const next = Math.round((settings.textScale + delta) * 100) / 100;
    updateSettings({ textScale: Math.min(TEXT_SCALE_MAX, Math.max(TEXT_SCALE_MIN, next)) });
  };

  // A link to this hymn's web page once the site is live; until then, the words themselves
  const share = () => {
    const url = hymnWebUrl(hymn.id, effectiveLanguage);
    const message = url ? `${title}\n${url}` : `${title}\n\n${hymnPlainText(hymn, effectiveLanguage)}`;
    Share.share(url ? { message, url, title } : { message, title }).catch(() => {
      // share sheet dismissed or unavailable
    });
  };

  const textFor = (language: LanguageType) => hymnPlainText(hymn, language) || t.notAvailable;
  const rawText = hymn.versions.find((v) => v.language === effectiveLanguage)?.text || t.notAvailable;
  const isArabicText = effectiveLanguage === 'arabic' || rawText === strings.ar.notAvailable;
  const fontSize = 20 * settings.textScale;
  const progress = status.duration > 0 ? Math.min(1, status.currentTime / status.duration) : 0;
  const repeatOne = queue.repeat === 'one';
  const inPlaylist = isInPlaylist(playlist, readerItem);
  const isDownloading = !!currentAudio && downloads.downloading.has(currentAudio);
  const isDownloaded = !!currentAudio && downloads.downloaded.has(currentAudio);

  // Second column: the language last chosen for it, else English, else whatever else this hymn has
  const compareOptions = availableLanguages.filter((l) => l.key !== effectiveLanguage);
  const compareLanguage =
    compareOptions.find((l) => l.key === settings.compareLanguage)?.key ??
    (compareOptions.find((l) => l.key === 'english') ?? compareOptions[0])?.key ??
    null;
  const showSideBySide = settings.sideBySide && compareLanguage !== null;
  const columnStyle = (language: LanguageType) => (language === 'arabic' ? styles.arabicText : styles.alignLeft);
  // Verse by verse, so each line sits next to its translation
  const verses = toVerses(textFor(effectiveLanguage));
  const compareVerses = compareLanguage ? toVerses(textFor(compareLanguage)) : [];
  const columnSize = fontSize * 0.85;
  const columnText = { fontSize: columnSize, lineHeight: columnSize * 1.6 };
  const speakerColor: Record<Speaker, string> = { deacon: colors.gold, people: colors.people, priest: colors.priest };
  const verseContent = (verse: Verse | undefined) =>
    verse ? (
      <>
        {verse.speaker ? (
          <Text style={[styles.speaker, { color: speakerColor[verse.speaker] }]}>
            {verse.label}
            {verse.text ? '\n' : ''}
          </Text>
        ) : null}
        {verse.text}
      </>
    ) : null;

  // ---------- Learning mode ----------
  // With verse times for the recording, the verse being sung lights up and follows the audio;
  // a verse can be tapped to jump to it, slowed down, or repeated until it is learnt.
  const timings = useVerseTimings(currentAudio);
  const [learning, setLearning] = useState(false);
  const [marks, setMarks] = useState<number[] | null>(null); // verse starts tapped so far while marking
  const [loopVerse, setLoopVerse] = useState<number | null>(null);
  const [followed, setFollowed] = useState<number | null>(null);
  const liveTimes = marks ?? timings;
  const sungVerse = learning && readerIsCurrent && liveTimes ? verseAt(liveTimes, status.currentTime) : -1;
  const highlighted = learning ? (marks ? marks.length - 1 : sungVerse >= 0 ? sungVerse : followed) : null;

  // Keep the verse being sung in view
  const scrollRef = useRef<ScrollView>(null);
  const textCardY = useRef(0);
  const verseY = useRef<number[]>([]);
  useEffect(() => {
    if (sungVerse < 0 || verseY.current[sungVerse] === undefined) return;
    scrollRef.current?.scrollTo({ y: Math.max(0, textCardY.current + verseY.current[sungVerse] - 140), animated: true });
  }, [sungVerse]);

  // Repeat one verse: jump back to its start whenever the next verse begins
  useEffect(() => {
    if (!learning || loopVerse === null || !readerIsCurrent || !timings || marks) return;
    const start = timings[loopVerse];
    const end = timings[loopVerse + 1] ?? status.duration - 0.4;
    if (start !== undefined && end > start && status.currentTime >= end - 0.1) seekTo(start);
  }, [learning, loopVerse, readerIsCurrent, timings, marks, status.currentTime, status.duration]);

  const tapVerse = (i: number) => {
    if (marks) return;
    if (timings?.[i] !== undefined && currentAudio) {
      if (!readerIsCurrent) toggleReaderAudio();
      seekTo(timings[i]);
      if (loopVerse !== null) setLoopVerse(i);
    } else {
      setFollowed(i === followed ? null : i);
    }
  };

  const startMarking = () => {
    setLoopVerse(null);
    setMarks([]);
    if (readerIsCurrent) {
      seekTo(0);
      if (!status.playing) togglePlay();
    } else {
      toggleReaderAudio();
    }
  };

  const finishMarking = (times: number[]) => {
    if (currentAudio && times.length > 0) saveVerseTimings(currentAudio, times);
    setMarks(null);
  };

  const markVerse = () => {
    if (!marks) return;
    const next = [...marks, Math.round(status.currentTime * 10) / 10];
    if (next.length >= verses.length) finishMarking(next);
    else setMarks(next);
  };

  const sendTimings = () => {
    if (!currentAudio || !timings) return;
    Share.share({ message: `${hymn.id}\n'${currentAudio}': [${timings.join(', ')}],` }).catch(() => {});
  };

  const learnVerseStyle = (i: number) => [styles.learnVerse, i === highlighted && styles.learnVerseActive];

  const actionChip = (label: string, onPress: () => void, active = false) => (
    <Pressable
      key={label}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      style={({ pressed }) => [styles.chip, styles.chipSmall, active && styles.controlButtonActive, pressed && styles.pressed]}>
      <Text style={[styles.chipText, active && styles.controlTextActive]}>{label}</Text>
    </Pressable>
  );

  return (
    <ScreenShell
      lang={lang}
      title={title}
      subtitle={breadcrumb}
      onBack={goBackOrHome}
      hidePlayerFor={trackKey(readerItem)}
      scrollRef={scrollRef}>
      <KeepScreenAwake />
      {banner}
      {availableLanguages.length > 1 ? (
        <ChipScroller rtl={isRTL} contentStyle={styles.readerChips}>
          {availableLanguages.map((l) => {
            const active = effectiveLanguage === l.key;
            return (
              <Pressable
                key={l.key}
                onPress={() => setActiveLanguage(l.key)}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                style={[styles.chip, active && styles.chipActive]}>
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{l.label}</Text>
              </Pressable>
            );
          })}
        </ChipScroller>
      ) : (
        <View style={styles.readerChips} />
      )}

      {/* Share, projector and learning mode */}
      <ChipScroller rtl={isRTL} contentStyle={styles.actionChips}>
        {actionChip(t.share, share)}
        {actionChip(t.present, () =>
          router.push({ pathname: '/present/[id]', params: { id: hymnSlug(hymn.id), lang: effectiveLanguage } })
        )}
        {currentAudio ? actionChip(t.learn, () => setLearning(!learning), learning) : null}
      </ChipScroller>

      {/* Reading tools: side by side on one end, text size on the other */}
      <View style={[styles.toolbar, rowDirection]}>
        {compareOptions.length > 0 ? (
          <Pressable
            onPress={() => updateSettings({ sideBySide: !settings.sideBySide })}
            accessibilityRole="switch"
            accessibilityState={{ checked: showSideBySide }}
            style={[styles.chip, styles.chipSmall, showSideBySide && styles.controlButtonActive]}>
            <Text style={[styles.chipText, showSideBySide && styles.controlTextActive]}>{t.sideBySide}</Text>
          </Pressable>
        ) : (
          <View />
        )}
        <View style={[styles.textSizeButtons, rowDirection]}>
          <Pressable
            onPress={() => changeTextScale(-0.15)}
            disabled={settings.textScale <= TEXT_SCALE_MIN}
            accessibilityLabel={`${t.textSize} -`}
            style={({ pressed }) => [styles.sizeButton, pressed && styles.pressed, settings.textScale <= TEXT_SCALE_MIN && styles.disabled]}>
            <Text style={styles.sizeButtonSmall}>A−</Text>
          </Pressable>
          <Pressable
            onPress={() => changeTextScale(0.15)}
            disabled={settings.textScale >= TEXT_SCALE_MAX}
            accessibilityLabel={`${t.textSize} +`}
            style={({ pressed }) => [styles.sizeButton, pressed && styles.pressed, settings.textScale >= TEXT_SCALE_MAX && styles.disabled]}>
            <Text style={styles.sizeButtonLarge}>A+</Text>
          </Pressable>
        </View>
      </View>
      {showSideBySide && compareOptions.length > 1 ? (
        <ChipScroller rtl={isRTL} contentStyle={styles.compareChips}>
          <Text style={styles.compareLabel}>{t.compareWith}:</Text>
          {compareOptions.map((l) => {
            const active = compareLanguage === l.key;
            return (
              <Pressable
                key={l.key}
                onPress={() => updateSettings({ compareLanguage: l.key })}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                style={[styles.chip, styles.chipSmall, active && styles.controlButtonActive]}>
                <Text style={[styles.chipText, active && styles.controlTextActive]}>{l.label}</Text>
              </Pressable>
            );
          })}
        </ChipScroller>
      ) : null}

      {currentAudio ? (
        <View style={styles.audioCard}>
          <View style={[styles.audioTopRow, rowDirection]}>
            <Pressable
              onPress={toggleReaderAudio}
              accessibilityRole="button"
              accessibilityLabel={status.playing ? t.pause : t.play}
              style={({ pressed }) => [styles.playButton, pressed && styles.pressed]}>
              <Text style={styles.playIcon}>{status.playing ? '❚❚' : '▶'}</Text>
            </Pressable>
            <View style={styles.rowTextWrap}>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
              </View>
              <Text style={styles.audioTime}>
                {formatTime(status.currentTime)} / {formatTime(status.duration)}
              </Text>
            </View>
          </View>
          <View style={[styles.audioControls, rowDirection]}>
            <Pressable
              onPress={() => seekBy(-10)}
              disabled={!readerIsCurrent}
              style={({ pressed }) => [styles.controlButton, pressed && styles.pressed, !readerIsCurrent && styles.disabled]}>
              <Text style={styles.controlText}>↺ 10s</Text>
            </Pressable>
            <Pressable
              onPress={() => seekBy(10)}
              disabled={!readerIsCurrent}
              style={({ pressed }) => [styles.controlButton, pressed && styles.pressed, !readerIsCurrent && styles.disabled]}>
              <Text style={styles.controlText}>10s ↻</Text>
            </Pressable>
            <Pressable
              onPress={() => setRepeat(repeatOne ? 'none' : 'one')}
              accessibilityState={{ selected: repeatOne }}
              style={[styles.controlButton, repeatOne && styles.controlButtonActive]}>
              <Text style={[styles.controlText, repeatOne && styles.controlTextActive]}>⟳ {t.repeat}</Text>
            </Pressable>
          </View>

          {learning ? (
            <View style={styles.learnPanel}>
              <View style={[styles.learnRow, rowDirection]}>
                <Text style={styles.compareLabel}>{t.speed}:</Text>
                {SPEEDS.map((rate) =>
                  actionChip(`${isRTL ? String(rate).replace('.', '٫') : rate}×`, () => setPlaybackRate(rate), queue.rate === rate)
                )}
              </View>
              {marks ? (
                <>
                  <Text style={[styles.learnHint, textAlign]}>{t.markingProgress(marks.length + 1, verses.length)}</Text>
                  <Pressable
                    onPress={markVerse}
                    disabled={!readerIsCurrent}
                    accessibilityRole="button"
                    style={({ pressed }) => [styles.markButton, pressed && styles.pressed, !readerIsCurrent && styles.disabled]}>
                    <Text style={styles.markButtonText}>{marks.length === 0 ? t.markStart : t.markNext}</Text>
                  </Pressable>
                  <View style={[styles.learnRow, rowDirection]}>
                    {actionChip(t.markDone, () => finishMarking(marks))}
                  </View>
                </>
              ) : (
                <>
                  <Text style={[styles.learnHint, textAlign]}>{timings ? t.learnReady : t.learnHint}</Text>
                  <View style={[styles.learnRow, rowDirection]}>
                    {timings
                      ? actionChip(
                          t.repeatVerse,
                          () => setLoopVerse(loopVerse === null ? Math.max(0, sungVerse) : null),
                          loopVerse !== null
                        )
                      : null}
                    {actionChip(timings ? t.remarkVerses : t.markVerses, startMarking)}
                  </View>
                  {timings ? (
                    <View style={[styles.learnRow, rowDirection]}>
                      {actionChip(t.sendMarks, sendTimings)}
                      {currentAudio ? actionChip(t.clearMarks, () => clearVerseTimings(currentAudio)) : null}
                    </View>
                  ) : null}
                </>
              )}
            </View>
          ) : null}

          <Pressable
            onPress={() => togglePlaylistItem(readerItem)}
            accessibilityRole="button"
            accessibilityState={{ selected: inPlaylist }}
            style={({ pressed }) => [styles.playlistButton, inPlaylist && styles.controlButtonActive, pressed && styles.pressed]}>
            <Text style={[styles.controlText, inPlaylist && styles.controlTextActive]}>
              {inPlaylist ? t.inPlaylist : t.addToPlaylist}
            </Text>
          </Pressable>
          {canDownload(currentAudio) ? (
            <Pressable
              onPress={() => toggleDownload(currentAudio)}
              disabled={isDownloading}
              accessibilityRole="button"
              accessibilityState={{ selected: isDownloaded, busy: isDownloading }}
              style={({ pressed }) => [
                styles.playlistButton,
                isDownloaded && styles.controlButtonActive,
                pressed && styles.pressed,
                isDownloading && styles.disabled,
              ]}>
              <Text style={[styles.controlText, isDownloaded && styles.controlTextActive]}>
                {isDownloading ? t.downloading : isDownloaded ? t.downloaded : t.download}
              </Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}

      <View style={styles.textCard} onLayout={(e) => (textCardY.current = e.nativeEvent.layout.y)}>
        {showSideBySide && compareLanguage ? (
          Array.from({ length: Math.max(verses.length, compareVerses.length) }, (_, i) => (
            <Pressable
              key={i}
              disabled={!learning}
              onPress={() => tapVerse(i)}
              onLayout={(e) => (verseY.current[i] = e.nativeEvent.layout.y)}
              style={[styles.verseRow, rowDirection, i > 0 && styles.verseRowDivider, learning && learnVerseStyle(i)]}>
              <Text style={[styles.hymnText, styles.verseColumn, columnText, columnStyle(effectiveLanguage)]}>
                {verseContent(verses[i])}
              </Text>
              <View style={styles.verseGutter} />
              <Text style={[styles.hymnText, styles.verseColumn, columnText, columnStyle(compareLanguage)]}>
                {verseContent(compareVerses[i])}
              </Text>
            </Pressable>
          ))
        ) : learning ? (
          // One tappable block per verse, so the one being sung can light up
          verses.map((verse, i) => (
            <Pressable
              key={i}
              onPress={() => tapVerse(i)}
              onLayout={(e) => (verseY.current[i] = e.nativeEvent.layout.y)}
              style={learnVerseStyle(i)}>
              <Text
                style={[
                  styles.hymnText,
                  { fontSize, lineHeight: fontSize * 1.65 },
                  isArabicText ? styles.arabicText : styles.alignLeft,
                ]}>
                {verseContent(verse)}
              </Text>
            </Pressable>
          ))
        ) : (
          <Text
            style={[
              styles.hymnText,
              { fontSize, lineHeight: fontSize * 1.65 },
              isArabicText ? styles.arabicText : styles.alignLeft,
            ]}>
            {verses.map((verse, i) => (
              <Text key={i}>
                {i > 0 ? '\n\n' : ''}
                {verseContent(verse)}
              </Text>
            ))}
          </Text>
        )}
      </View>
    </ScreenShell>
  );
}
