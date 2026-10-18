import { router } from 'expo-router';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Pressable, ScrollView, Share, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import { hymnWebUrl } from '../constants/site';
import { displayTitle } from '../data/arabic-titles';
import { titleLines } from '../data/hymn-titles';
import { flattenHymns, Hymn, LanguageType } from '../data/hymns';
import { hymnAcrossSeasons, hymnSlug, locateHymn, neighborHymns } from '../data/search';
import { followAlong, PraiseKind } from '../data/follow-along';
import { BusyPulse } from './busy-pulse';
import { followStrings } from './follow-strings';
import { pressFeedback, tapFeedback } from './haptics';
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
import { isInAnyPlaylist, PlaylistItem, usePlaylists } from '../hooks/use-playlist';
import { PlaylistPicker } from './playlist-picker';
import { TEXT_SCALE_MAX, TEXT_SCALE_MIN, updateSettings, useSettings } from '../hooks/use-settings';
import { clearVerseTimings, saveVerseTimings, useVerseTimings, verseAt } from '../hooks/use-verse-timings';
import {
  ChipScroller,
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
  const playlists = usePlaylists();
  const [choosingPlaylist, setChoosingPlaylist] = useState(false);
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
  // Swipe sideways for the next or previous hymn, like turning a page (reversed in Arabic); a mostly vertical
  // drag is left to the scrolling
  const swipe = Gesture.Pan()
    .runOnJS(true)
    .activeOffsetX([-30, 30])
    .failOffsetY([-15, 15])
    .onEnd((e) => {
      if (Math.abs(e.translationX) < 80 || Math.abs(e.velocityX) < 200) return;
      const forward = isRTL ? e.translationX > 0 : e.translationX < 0;
      const target = forward ? next : previous;
      if (target) {
        tapFeedback();
        openNeighbor(target);
      }
    });
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

  const selectRecording = (index: number) => {
    setRecordingIndex(index);
    const chosenFile = recordings[index];
    if (!chosenFile) return;
    const source = audioSourceFor(chosenFile);
    if (!source) return;
    playQueue([{ ...readerItem, title, source, file: chosenFile }, ...(settings.playNext ? followingTracks() : [])]);
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
  const inPlaylist = isInAnyPlaylist(playlists, readerItem);
  const isDownloading = !!currentAudio && downloads.downloading.has(currentAudio);
  const isDownloaded = !!currentAudio && downloads.downloaded.has(currentAudio);

  // Second column: the language last chosen for it, else English, else whatever else this hymn has
  const compareOptions = availableLanguages.filter((l) => l.key !== effectiveLanguage);
  const compareLanguage =
    compareOptions.find((l) => l.key === settings.compareLanguage)?.key ??
    (compareOptions.find((l) => l.key === 'english') ?? compareOptions[0])?.key ??
    null;
  const showSideBySide = settings.sideBySide && compareLanguage !== null;
  const currentLanguageLabel = languageLabels[lang].find((l) => l.key === effectiveLanguage)?.label ?? '';
  const compareLanguageLabel = languageLabels[lang].find((l) => l.key === compareLanguage)?.label ?? '';
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
  // While this hymn's recording plays and its verse times are known, the verse being sung lights up even outside
  // learning mode, and a verse can be tapped to jump to it
  const autoFollow = !learning && readerIsCurrent && !!timings;
  const versesTappable = learning || autoFollow;
  const sungVerse = versesTappable && readerIsCurrent && liveTimes ? verseAt(liveTimes, status.currentTime) : -1;
  const highlighted = learning
    ? marks
      ? marks.length - 1
      : sungVerse >= 0
        ? sungVerse
        : followed
    : autoFollow && sungVerse >= 0
      ? sungVerse
      : null;

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
    <GestureDetector gesture={swipe}>
      <View style={styles.root} collapsable={false}>
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
          {/* Settings out in the open: Season, Side by Side, Learn, Project, Text scale, More */}
          <ChipScroller rtl={isRTL} contentStyle={styles.readerActionsRow}>
            {acrossSeasons.length > 1 && currentSeason ? (
              <Pressable
                onPress={() => setSheet('season')}
                accessibilityRole="button"
                accessibilityLabel={`${t.season}: ${shortSeasonName(currentSeason, lang)}`}
                style={({ pressed }) => [styles.actionToolbarButton, pressed && styles.pressed]}>
                <Text style={styles.actionToolbarButtonText}>
                  {shortSeasonName(currentSeason, lang)}
                </Text>
                <Text style={styles.pickerCaret}>▾</Text>
              </Pressable>
            ) : null}

            {compareOptions.length > 0 ? (
              <Pressable
                onPress={() => updateSettings({ sideBySide: !settings.sideBySide })}
                accessibilityRole="button"
                accessibilityState={{ selected: showSideBySide }}
                accessibilityLabel={t.sideBySide}
                style={({ pressed }) => [
                  styles.actionToolbarButton,
                  showSideBySide && styles.actionToolbarButtonActive,
                  pressed && styles.pressed,
                ]}>
                <Text style={[styles.actionToolbarButtonText, showSideBySide && styles.actionToolbarButtonTextActive]}>
                  {t.sideBySide}
                </Text>
              </Pressable>
            ) : null}

            {currentAudio ? (
              <Pressable
                onPress={() => setLearning(!learning)}
                accessibilityRole="button"
                accessibilityState={{ selected: learning }}
                accessibilityLabel={t.learn}
                style={({ pressed }) => [
                  styles.actionToolbarButton,
                  learning && styles.actionToolbarButtonActive,
                  pressed && styles.pressed,
                ]}>
                <Text style={[styles.actionToolbarButtonText, learning && styles.actionToolbarButtonTextActive]}>
                  {t.learn}
                </Text>
              </Pressable>
            ) : null}

            <Pressable
              onPress={() => router.push({ pathname: '/present/[id]', params: { id: hymnSlug(hymn.id), lang: effectiveLanguage } })}
              accessibilityRole="button"
              accessibilityLabel={t.present}
              style={({ pressed }) => [styles.actionToolbarButton, pressed && styles.pressed]}>
              <Text style={styles.actionToolbarButtonText}>{t.present}</Text>
            </Pressable>

            <View style={[styles.textSizeGroup, rowDirection]}>
              <Pressable
                onPress={() => changeTextScale(-0.15)}
                disabled={settings.textScale <= TEXT_SCALE_MIN}
                accessibilityRole="button"
                accessibilityLabel={`${t.textSize} -`}
                style={({ pressed }) => [
                  styles.actionToolbarButton,
                  styles.textSizeBtn,
                  pressed && styles.pressed,
                  settings.textScale <= TEXT_SCALE_MIN && styles.disabled,
                ]}>
                <Text style={styles.actionToolbarButtonText}>A−</Text>
              </Pressable>
              <Pressable
                onPress={() => changeTextScale(0.15)}
                disabled={settings.textScale >= TEXT_SCALE_MAX}
                accessibilityRole="button"
                accessibilityLabel={`${t.textSize} +`}
                style={({ pressed }) => [
                  styles.actionToolbarButton,
                  styles.textSizeBtn,
                  pressed && styles.pressed,
                  settings.textScale >= TEXT_SCALE_MAX && styles.disabled,
                ]}>
                <Text style={styles.actionToolbarButtonText}>A+</Text>
              </Pressable>
            </View>

            <Pressable
              onPress={() => setSheet('more')}
              accessibilityRole="button"
              accessibilityLabel={t.more}
              style={({ pressed }) => [styles.actionToolbarButton, styles.moreCircleButton, pressed && styles.pressed]}>
              <Text style={styles.moreCircleText}>⋯</Text>
            </Pressable>
          </ChipScroller>

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

              <View style={[styles.audioTopRow, rowDirection]}>
                <Pressable
                  onPress={() => {
                    pressFeedback();
                    toggleReaderAudio();
                  }}
                  accessibilityRole="button"
                  accessibilityLabel={status.playing ? t.pause : t.play}
                  accessibilityState={{ busy: readerIsCurrent && queue.status.isBuffering }}
                  style={({ pressed }) => [pressed && styles.pressed]}>
                  <BusyPulse busy={readerIsCurrent && queue.status.isBuffering} style={styles.playButton}>
                    <Text style={styles.playIcon}>{status.playing ? '❚❚' : '▶'}</Text>
                  </BusyPulse>
                </Pressable>
                <View style={styles.rowTextWrap}>
                  <SeekBar currentTime={status.currentTime} duration={status.duration} onSeek={seekTo} label={t.position} goToLabel={t.goToTime} />
                </View>
              </View>
              {recordings.length > 1 ? (
                <View style={[styles.audioControls, rowDirection]}>
                  {recordings.map((file, i) =>
                    actionChip(
                      `${t.recording} ${isRTL ? String(i + 1).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]) : i + 1}`,
                      () => selectRecording(i),
                      file === currentAudio
                    )
                  )}
                </View>
              ) : null}
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
                <Pressable
                  onPress={togglePlayNext}
                  accessibilityRole="switch"
                  accessibilityState={{ checked: settings.playNext }}
                  style={[styles.controlButton, settings.playNext && styles.controlButtonActive]}>
                  <Text style={[styles.controlText, settings.playNext && styles.controlTextActive]}>⏭ {t.playNext}</Text>
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

              <View style={[styles.audioActions, rowDirection]}>
                <Pressable
                  onPress={() => {
                    pressFeedback();
                    setChoosingPlaylist((open) => !open);
                  }}
                  accessibilityRole="button"
                  accessibilityState={{ selected: inPlaylist, expanded: choosingPlaylist }}
                  style={({ pressed }) => [styles.playlistButton, styles.audioAction, inPlaylist && styles.controlButtonActive, pressed && styles.pressed]}>
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
                      styles.audioAction,
                      isDownloaded && styles.controlButtonActive,
                      pressed && styles.pressed,
                      isDownloading && styles.disabled,
                    ]}>
                    <Text style={[styles.controlText, isDownloaded && styles.controlTextActive]} numberOfLines={1} adjustsFontSizeToFit>
                      {isDownloading ? t.downloading : isDownloaded ? t.downloaded : t.download}
                    </Text>
                  </Pressable>
                ) : null}
              </View>
              {choosingPlaylist ? <PlaylistPicker lang={lang} item={readerItem} onDone={() => setChoosingPlaylist(false)} /> : null}
            </View>
          ) : null}

          <View style={styles.textCard} onLayout={(e) => (textCardY.current = e.nativeEvent.layout.y)}>
            <View style={[styles.textCardHeader, rowDirection]}>
              <Pressable
                onPress={() => setSheet('language')}
                accessibilityRole="button"
                accessibilityLabel={`${t.language}: ${currentLanguageLabel}`}
                style={({ pressed }) => [styles.textCardLangBadge, pressed && styles.pressed]}>
                <Text style={styles.textCardLangText}>{currentLanguageLabel}</Text>
                <Text style={styles.textCardLangCaret}>▾</Text>
              </Pressable>
              {showSideBySide && compareLanguage ? (
                <Pressable
                  onPress={() => compareOptions.length > 1 && setSheet('compare')}
                  accessibilityRole="button"
                  accessibilityLabel={`${t.compareWith}: ${compareLanguageLabel}`}
                  style={({ pressed }) => [styles.textCardLangBadge, pressed && styles.pressed]}>
                  <Text style={styles.textCardLangText}>{compareLanguageLabel}</Text>
                  {compareOptions.length > 1 ? <Text style={styles.textCardLangCaret}>▾</Text> : null}
                </Pressable>
              ) : null}
            </View>
            {showSideBySide && compareLanguage ? (
              Array.from({ length: Math.max(verses.length, compareVerses.length) }, (_, i) => (
                <Pressable
                  key={i}
                  disabled={!versesTappable}
                  onPress={() => tapVerse(i)}
                  onLayout={(e) => (verseY.current[i] = e.nativeEvent.layout.y)}
                  style={[styles.verseRow, rowDirection, i > 0 && styles.verseRowDivider, versesTappable && learnVerseStyle(i)]}>
                  <Text style={[styles.hymnText, styles.verseColumn, columnText, columnStyle(effectiveLanguage)]}>
                    {verseContent(verses[i])}
                  </Text>
                  <View style={styles.verseGutter} />
                  <Text style={[styles.hymnText, styles.verseColumn, columnText, columnStyle(compareLanguage)]}>
                    {verseContent(compareVerses[i])}
                  </Text>
                </Pressable>
              ))
            ) : versesTappable ? (
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
      </View>
    </GestureDetector>
  );
}
