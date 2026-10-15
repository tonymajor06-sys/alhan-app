import { router } from 'expo-router';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Pressable, ScrollView, Share, Text, View } from 'react-native';

import { hymnWebUrl } from '../constants/site';
import { displayTitle } from '../data/arabic-titles';
import { titleLines } from '../data/hymn-titles';
import { flattenHymns, Hymn, LanguageType } from '../data/hymns';
import { hymnAcrossSeasons, hymnSlug, locateHymn, neighborHymns } from '../data/search';
import { followAlong, PraiseKind } from '../data/follow-along';
import { followStrings } from './follow-strings';
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
  queueAfterCurrent,
  QueueTrack,
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
  createAlhanStyles,
  defaultHymnLanguage,
  goBackOrHome,
  hymnHref,
  KeepScreenAwake,
  languageLabels,
  ScreenShell,
  Sheet,
  SheetRow,
  Speaker,
  strings,
  toVerses,
  Verse,
  withCopticFont,
  withoutNumber,
} from './alhan-ui';
import { SeekBar } from './seek-bar';

const SPEEDS = [0.5, 0.75, 1];

export const hymnPlainText = (hymn: Hymn, language: LanguageType) =>
  (hymn.versions.find((v) => v.language === language)?.text ?? '').replace(/(?:\\n)+/g, '\n\n');

export function HymnReader({
  hymn,
  initialLanguage,
  banner,
  follow,
}: {
  hymn: Hymn;
  initialLanguage?: LanguageType;
  // Shown above the language chips (the web version's "Get the app")
  banner?: ReactNode;
  // Opened from tonight's Midnight or Vesper Praises: Previous and Next follow tonight's order
  follow?: { kind: PraiseKind; night: number };
}) {
  const settings = useSettings();
  const lang = settings.language;
  const t = strings[lang];
  const isRTL = lang === 'ar';
  const colors = useAlhanColors();
  const styles = useThemedStyles(createAlhanStyles);
  const rowDirection = isRTL ? styles.rowReverse : styles.row;
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;

  const [activeLanguage, setActiveLanguage] = useState<LanguageType>(
    initialLanguage ?? settings.hymnLanguage ?? defaultHymnLanguage(lang)
  );

  // Only offer the languages this hymn actually has text for
  const availableLanguages = languageLabels[lang].filter((l) =>
    hymn.versions.some((v) => v.language === l.key && v.text)
  );
  const effectiveLanguage = availableLanguages.some((l) => l.key === activeLanguage)
    ? activeLanguage
    : (availableLanguages[0]?.key ?? activeLanguage);

  // The recording for the language being read; when it has none (e.g. a Theotokia sung in English and Arabic),
  // the hymn's recording in another language, preferring the app's language, so it can still be played
  const appLanguageFirst: LanguageType[] = lang === 'ar' ? ['arabic', 'englishArabic', 'english'] : ['english', 'arabic', 'coptic'];
  const audioVersion =
    [effectiveLanguage, ...appLanguageFirst]
      .map((l) => hymn.versions.find((v) => v.language === l && v.audio))
      .find(Boolean) ?? hymn.versions.find((v) => v.audio);
  const audioLanguage = audioVersion?.language ?? effectiveLanguage;
  const recordings = [audioVersion?.audio, ...(audioVersion?.otherAudio ?? [])].filter((f): f is string => !!f);
  const [recordingIndex, setRecordingIndex] = useState(0);
  const currentAudio = recordings[recordingIndex] ?? recordings[0] ?? null;
  // Audio lives in a shared queue so it keeps playing after leaving the hymn or the app
  const queue = useAudioQueue();
  const nowPlaying = currentTrack(queue);
  const playlist = usePlaylist();
  const downloads = useAudioDownloads();
  const readerItem: PlaylistItem = { hymnId: hymn.id, language: audioLanguage };
  const readerIsCurrent =
    !!nowPlaying && trackKey(nowPlaying) === trackKey(readerItem) && (!nowPlaying.file || nowPlaying.file === currentAudio);
  const status = readerIsCurrent ? queue.status : { playing: false, currentTime: 0, duration: 0 };
  const heading = titleLines(hymn, lang, settings.titleStyle);
  const title = heading.main;

  const location = locateHymn(hymn.id)?.location;
  const followKind = follow?.kind;
  const followNight = follow?.night ?? 0;
  const tonight = useMemo(() => (followKind ? followAlong(followKind, followNight).hymns : null), [followKind, followNight]);
  const tonightIndex = tonight ? tonight.findIndex((h) => h.id === hymn.id) : -1;
  const ft = followStrings[lang];
  const breadcrumb =
    tonight && tonightIndex >= 0
      ? `${ft.title[follow!.kind]} · ${ft.position(tonightIndex + 1, tonight.length)}`
      : location
        ? `${withoutNumber(displayTitle(location.group, lang))} ${isRTL ? '‹' : '›'} ${displayTitle(location.service, lang)}`
        : null;

  // Step through the service (or tonight's praises) in order, keeping the language; replace so Back still returns to the list
  const { previous, next } =
    tonight && tonightIndex >= 0 ? { previous: tonight[tonightIndex - 1], next: tonight[tonightIndex + 1] } : neighborHymns(hymn.id);
  const openNeighbor = (h: Hymn) => router.replace(hymnHref(h.id, effectiveLanguage, tonightIndex >= 0 ? follow : undefined));
  const navButton = (h: Hymn | undefined, label: string, arrow: string, end: boolean) =>
    h ? (
      <Pressable
        onPress={() => openNeighbor(h)}
        accessibilityRole="link"
        accessibilityLabel={`${label}: ${displayTitle(h, lang)}`}
        style={({ pressed }) => [styles.hymnNavButton, pressed && styles.rowCardPressed]}>
        <Text style={[styles.hymnNavLabel, end ? styles.alignRight : styles.alignLeft]}>
          {end ? `${label} ${arrow}` : `${arrow} ${label}`}
        </Text>
        <Text style={[styles.hymnNavTitle, end ? styles.alignRight : styles.alignLeft]} numberOfLines={2}>
          {withCopticFont(titleLines(h, lang, settings.titleStyle).main)}
        </Text>
      </Pressable>
    ) : (
      <View style={styles.verseColumn} />
    );

  // The same hymn as other seasons sing it; switching keeps the language, and Back still returns to the list.
  // Chips name the season without its number or note: "Feast of the Nativity", not "6. Feast of the Nativity (Christmas)"
  const shortSeasonName = (season: { id: string; title: string }, language: typeof lang) =>
    withoutNumber(displayTitle(season, language))
      .replace(/\s*\([^)]*\)$/, '')
      .replace(' / Standard Services', '');
  const acrossSeasons = hymnAcrossSeasons(hymn.id);
  const currentSeason = acrossSeasons.find((x) => x.hymn.id === hymn.id)?.season;
  // Which sheet is open: the language, the season, the language beside it, or the other tools
  const [sheet, setSheet] = useState<'language' | 'season' | 'compare' | 'more' | null>(null);

  // Play next: the hymns after this one in the service that have a recording in the same language
  const followingTracks = (): QueueTrack[] => {
    // Tonight's praises go on in tonight's order, in whichever language each hymn is recorded
    if (tonight && tonightIndex >= 0)
      return tonight.slice(tonightIndex + 1).flatMap((h) => {
        const version = h.versions.find((v) => v.language === audioLanguage && v.audio) ?? h.versions.find((v) => v.audio);
        const source = version?.audio ? audioSourceFor(version.audio) : null;
        return version && source ? [{ hymnId: h.id, language: version.language, title: titleLines(h, lang).main, source }] : [];
      });
    const service = location?.service;
    if (!service) return [];
    const order = flattenHymns(service.hymns);
    return order.slice(order.findIndex((h) => h.id === hymn.id) + 1).flatMap((h) => {
      const file = h.versions.find((v) => v.language === audioLanguage)?.audio;
      const source = file ? audioSourceFor(file) : null;
      return source ? [{ hymnId: h.id, language: audioLanguage, title: titleLines(h, lang).main, source }] : [];
    });
  };

  const toggleReaderAudio = () => {
    if (readerIsCurrent) return togglePlay();
    const source = currentAudio ? audioSourceFor(currentAudio) : null;
    if (source && currentAudio)
      playQueue([{ ...readerItem, title, source, file: currentAudio }, ...(settings.playNext ? followingTracks() : [])]);
  };

  const togglePlayNext = () => {
    const on = !settings.playNext;
    updateSettings({ playNext: on });
    if (readerIsCurrent && queue.origin === 'single') queueAfterCurrent(on ? followingTracks() : []);
  };

  // When this hymn's recording ends and the next one starts, open the next hymn's words
  const wasCurrent = useRef(false);
  useEffect(() => {
    if (wasCurrent.current && !readerIsCurrent && nowPlaying && queue.origin === 'single' && settings.playNext) {
      const stillTonight = followKind && tonight?.some((h) => h.id === nowPlaying.hymnId);
      router.replace(hymnHref(nowPlaying.hymnId, nowPlaying.language, stillTonight ? { kind: followKind, night: followNight } : undefined));
    }
    wasCurrent.current = readerIsCurrent;
  }, [readerIsCurrent, nowPlaying, queue.origin, settings.playNext, followKind, followNight, tonight]);

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
  const isArabicText = effectiveLanguage === 'arabic' || effectiveLanguage === 'arabicCoptic' || effectiveLanguage === 'arabicEnglish' || rawText === strings.ar.notAvailable;
  const fontSize = 20 * settings.textScale;
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
  const columnStyle = (language: LanguageType) =>
    language === 'arabic' || language === 'arabicCoptic' || language === 'arabicEnglish'
      ? styles.arabicText
      : language === 'coptic'
        ? [styles.alignLeft, styles.copticText]
        : styles.alignLeft;
  const copticStyle = effectiveLanguage === 'coptic' ? styles.copticText : null;
  // Verse by verse, so each line sits next to its translation
  const verses = toVerses(textFor(effectiveLanguage));
  const compareVerses = compareLanguage ? toVerses(textFor(compareLanguage)) : [];

  // What is added in the presence of the Pope or a bishop, folded under the text until opened (as in Spirit & Truth)
  const [bishopOpen, setBishopOpen] = useState(false);
  const bishopText = (language: LanguageType) =>
    (hymn.bishop?.find((v) => v.language === language)?.text ?? '').replace(/(?:\\n)+/g, '\n\n');
  const bishopVerses = toVerses(bishopText(effectiveLanguage));
  const bishopCompareVerses = compareLanguage ? toVerses(bishopText(compareLanguage)) : [];
  const bishopAudio = hymn.bishop?.find((v) => v.language === effectiveLanguage)?.audio;
  const playBishop = () => {
    const source = bishopAudio ? audioSourceFor(bishopAudio) : null;
    if (source && bishopAudio) playQueue([{ ...readerItem, title: `${title} · ${t.bishopAddition}`, source, file: bishopAudio }]);
  };
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

  // A button showing the current choice, which opens its sheet
  const pickerButton = (value: string, label: string, onPress: () => void) => (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${label}: ${value}`}
      style={({ pressed }) => [styles.pickerButton, rowDirection, pressed && styles.pressed]}>
      <Text style={styles.pickerButtonText} numberOfLines={1}>
        {value}
      </Text>
      <Text style={styles.pickerCaret}>▾</Text>
    </Pressable>
  );

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
      title={heading.main}
      titleCoptic={heading.coptic}
      subtitle={breadcrumb}
      onBack={goBackOrHome}
      hidePlayerFor={trackKey(readerItem)}
      scrollRef={scrollRef}>
      <KeepScreenAwake />
      {banner}
      {/* Three pickers keep the page calm: the language, the season, and everything else under More */}
      <View style={[styles.readerBar, rowDirection]}>
        {availableLanguages.length > 1
          ? pickerButton(languageLabels[lang].find((l) => l.key === effectiveLanguage)?.label ?? '', t.language, () => setSheet('language'))
          : null}
        {acrossSeasons.length > 1 && currentSeason ? pickerButton(shortSeasonName(currentSeason, lang), t.season, () => setSheet('season')) : null}
        <View style={styles.verseColumn} />
        <Pressable
          onPress={() => setSheet('more')}
          accessibilityRole="button"
          accessibilityLabel={t.more}
          style={({ pressed }) => [styles.moreButton, (learning || showSideBySide) && styles.controlButtonActive, pressed && styles.pressed]}>
          <Text style={styles.moreButtonText}>⋯</Text>
        </Pressable>
      </View>
      {showSideBySide && compareLanguage ? (
        <Pressable
          onPress={() => compareOptions.length > 1 && setSheet('compare')}
          accessibilityRole="button"
          style={({ pressed }) => [styles.compareChips, rowDirection, { alignItems: 'center', gap: 6 }, pressed && styles.pressed]}>
          <Text style={styles.compareLabel}>
            {t.compareWith}: {languageLabels[lang].find((l) => l.key === compareLanguage)?.label}
          </Text>
          {compareOptions.length > 1 ? <Text style={styles.pickerCaret}>▾</Text> : null}
        </Pressable>
      ) : null}

      <Sheet visible={sheet === 'language'} title={t.language} rtl={isRTL} onClose={() => setSheet(null)}>
        {availableLanguages.map((l) => (
          <SheetRow
            key={l.key}
            rtl={isRTL}
            label={l.label}
            selected={l.key === effectiveLanguage}
            onPress={() => {
              setActiveLanguage(l.key);
              setSheet(null);
            }}
          />
        ))}
      </Sheet>
      <Sheet visible={sheet === 'season'} title={t.season} rtl={isRTL} onClose={() => setSheet(null)}>
        {acrossSeasons.map(({ season, hymn: other }) => (
          <SheetRow
            key={season.id}
            rtl={isRTL}
            label={shortSeasonName(season, lang)}
            selected={other.id === hymn.id}
            onPress={() => {
              setSheet(null);
              if (other.id !== hymn.id) router.replace(hymnHref(other.id, effectiveLanguage));
            }}
          />
        ))}
      </Sheet>
      <Sheet visible={sheet === 'compare'} title={t.compareWith} rtl={isRTL} onClose={() => setSheet(null)}>
        {compareOptions.map((l) => (
          <SheetRow
            key={l.key}
            rtl={isRTL}
            label={l.label}
            selected={l.key === compareLanguage}
            onPress={() => {
              updateSettings({ compareLanguage: l.key });
              setSheet(null);
            }}
          />
        ))}
      </Sheet>
      <Sheet visible={sheet === 'more'} title={t.more} rtl={isRTL} onClose={() => setSheet(null)}>
        {compareOptions.length > 0 ? (
          <SheetRow
            rtl={isRTL}
            label={t.sideBySide}
            onPress={() => updateSettings({ sideBySide: !settings.sideBySide })}
            end={<Text style={styles.sheetCheck}>{showSideBySide ? '✓' : ''}</Text>}
          />
        ) : null}
        {currentAudio ? (
          <SheetRow
            rtl={isRTL}
            label={t.learn}
            onPress={() => {
              setLearning(!learning);
              setSheet(null);
            }}
            end={<Text style={styles.sheetCheck}>{learning ? '✓' : ''}</Text>}
          />
        ) : null}
        <SheetRow
          rtl={isRTL}
          label={t.present}
          onPress={() => {
            setSheet(null);
            router.push({ pathname: '/present/[id]', params: { id: hymnSlug(hymn.id), lang: effectiveLanguage } });
          }}
        />
        <SheetRow
          rtl={isRTL}
          label={t.share}
          onPress={() => {
            setSheet(null);
            share();
          }}
        />
        <SheetRow
          rtl={isRTL}
          label={t.textSizeLabel}
          end={
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
          }
        />
      </Sheet>

      {currentAudio ? (
        <View style={styles.audioCard}>
          {audioLanguage !== effectiveLanguage ? (
            <Text style={[styles.compareLabel, textAlign, { marginBottom: 8 }]}>
              ♪ {t.recordingIn(languageLabels[lang].find((l) => l.key === audioLanguage)?.label ?? '')}
            </Text>
          ) : null}

          {/* Full-width SeekBar so scrubbing is smooth and accurate across the phone screen */}
          <SeekBar currentTime={status.currentTime} duration={status.duration} onSeek={seekTo} label={t.position} goToLabel={t.goToTime} />

          {/* Primary playback controls: skip back, play/pause, skip forward */}
          <View style={[styles.audioPlayerMain, rowDirection]}>
            <Pressable
              onPress={() => seekBy(-10)}
              disabled={!readerIsCurrent}
              accessibilityLabel="Skip back 10 seconds"
              style={({ pressed }) => [styles.audioSkipButton, pressed && styles.pressed, !readerIsCurrent && styles.disabled]}>
              <Text style={styles.audioSkipIcon}>↺ 10</Text>
            </Pressable>

            <Pressable
              onPress={toggleReaderAudio}
              accessibilityRole="button"
              accessibilityLabel={status.playing ? t.pause : t.play}
              style={({ pressed }) => [styles.playButton, pressed && styles.pressed]}>
              <Text style={styles.playIcon}>{status.playing ? '❚❚' : '▶'}</Text>
            </Pressable>

            <Pressable
              onPress={() => seekBy(10)}
              disabled={!readerIsCurrent}
              accessibilityLabel="Skip forward 10 seconds"
              style={({ pressed }) => [styles.audioSkipButton, pressed && styles.pressed, !readerIsCurrent && styles.disabled]}>
              <Text style={styles.audioSkipIcon}>10 ↻</Text>
            </Pressable>
          </View>

          {/* Multiple recordings selector if available */}
          {recordings.length > 1 ? (
            <View style={[styles.audioControls, rowDirection, { justifyContent: 'center', marginVertical: 6 }]}>
              {recordings.map((file, i) =>
                actionChip(`${t.recording} ${isRTL ? String(i + 1).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]) : i + 1}`, () => setRecordingIndex(i), file === currentAudio)
              )}
            </View>
          ) : null}

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

          {/* Secondary controls row: Repeat, Play next, Playlist, Download */}
          <View style={[styles.audioPillsRow, rowDirection]}>
            <Pressable
              onPress={() => setRepeat(repeatOne ? 'none' : 'one')}
              accessibilityState={{ selected: repeatOne }}
              style={({ pressed }) => [styles.audioPill, repeatOne && styles.audioPillActive, pressed && styles.pressed]}>
              <Text style={[styles.audioPillText, repeatOne && styles.audioPillTextActive]}>⟳ {t.repeat}</Text>
            </Pressable>

            <Pressable
              onPress={togglePlayNext}
              accessibilityRole="switch"
              accessibilityState={{ checked: settings.playNext }}
              style={({ pressed }) => [styles.audioPill, settings.playNext && styles.audioPillActive, pressed && styles.pressed]}>
              <Text style={[styles.audioPillText, settings.playNext && styles.audioPillTextActive]}>⏭ {t.playNext}</Text>
            </Pressable>

            <Pressable
              onPress={() => togglePlaylistItem(readerItem)}
              accessibilityRole="button"
              accessibilityState={{ selected: inPlaylist }}
              style={({ pressed }) => [styles.audioPill, inPlaylist && styles.audioPillActive, pressed && styles.pressed]}>
              <Text style={[styles.audioPillText, inPlaylist && styles.audioPillTextActive]}>
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
                  styles.audioPill,
                  isDownloaded && styles.audioPillActive,
                  pressed && styles.pressed,
                  isDownloading && styles.disabled,
                ]}>
                <Text style={[styles.audioPillText, isDownloaded && styles.audioPillTextActive]}>
                  {isDownloading ? t.downloading : isDownloaded ? t.downloaded : t.download}
                </Text>
              </Pressable>
            ) : null}
          </View>
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
                  copticStyle,
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
              copticStyle,
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

      {hymn.bishop ? (
        <View style={styles.bishopCard}>
          <Pressable
            onPress={() => setBishopOpen(!bishopOpen)}
            accessibilityRole="button"
            accessibilityState={{ expanded: bishopOpen }}
            style={({ pressed }) => [styles.bishopHeader, rowDirection, pressed && styles.pressed]}>
            <Text style={[styles.bishopTitle, textAlign]}>{t.bishopAddition}</Text>
            <Text style={styles.bishopToggle}>{bishopOpen ? '−' : '+'}</Text>
          </Pressable>
          {bishopOpen ? (
            <View style={styles.bishopBody}>
              {bishopAudio ? <View style={[styles.learnRow, rowDirection]}>{actionChip(`▶ ${t.play}`, playBishop)}</View> : null}
              {showSideBySide && compareLanguage ? (
                Array.from({ length: Math.max(bishopVerses.length, bishopCompareVerses.length) }, (_, i) => (
                  <View key={i} style={[styles.verseRow, rowDirection, i > 0 && styles.verseRowDivider]}>
                    <Text style={[styles.hymnText, styles.verseColumn, columnText, columnStyle(effectiveLanguage)]}>
                      {verseContent(bishopVerses[i])}
                    </Text>
                    <View style={styles.verseGutter} />
                    <Text style={[styles.hymnText, styles.verseColumn, columnText, columnStyle(compareLanguage)]}>
                      {verseContent(bishopCompareVerses[i])}
                    </Text>
                  </View>
                ))
              ) : (
                <Text
                  style={[
                    styles.hymnText,
                    { fontSize, lineHeight: fontSize * 1.65 },
                    isArabicText ? styles.arabicText : styles.alignLeft,
                    copticStyle,
                  ]}>
                  {bishopVerses.map((verse, i) => (
                    <Text key={i}>
                      {i > 0 ? '\n\n' : ''}
                      {verseContent(verse)}
                    </Text>
                  ))}
                </Text>
              )}
            </View>
          ) : null}
        </View>
      ) : null}

      {previous || next ? (
        <View style={[styles.hymnNav, rowDirection]}>
          {navButton(previous, t.previousHymn, isRTL ? '›' : '‹', isRTL)}
          {navButton(next, t.nextHymn, isRTL ? '‹' : '›', !isRTL)}
        </View>
      ) : null}
    </ScreenShell>
  );
}
