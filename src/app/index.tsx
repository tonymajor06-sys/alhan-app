import { useKeepAwake } from 'expo-keep-awake';
import { router, useLocalSearchParams } from 'expo-router';
import { ReactNode, useEffect, useState } from 'react';
import { Alert, BackHandler, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AlhanPalette } from '../constants/alhan-colors';
import { displayTitle } from '../data/arabic-titles';
import {
  currentSeasonName,
  formatCopticDate,
  formatDaysUntil,
  getSeasonInfo,
  kindName,
  tuneName,
} from '../data/coptic-calendar';
import {
  deaconCategories,
  DeaconCategory,
  Hymn,
  LanguageType,
  mainCategories,
  Season,
  seasons,
  Service,
} from '../data/hymns';
import { searchHymns, SearchResult } from '../data/search';
import { useAlhanColors, useThemedStyles } from '../hooks/use-alhan-colors';
import {
  audioSourceFor,
  canDownload,
  downloadAudio,
  removeDownload,
  useAudioDownloads,
} from '../hooks/use-audio-downloads';
import {
  AppLanguage,
  TEXT_SCALE_MAX,
  TEXT_SCALE_MIN,
  updateSettings,
  useSettings,
} from '../hooks/use-settings';
import {
  currentTrack,
  playQueue,
  QueueTrack,
  seekBy,
  setRepeat,
  skip,
  stopQueue,
  togglePlay,
  trackKey,
  useAudioQueue,
} from '../hooks/use-audio-queue';
import {
  audioFor,
  findHymn,
  isInPlaylist,
  movePlaylistItem,
  PlaylistItem,
  removePlaylistItem,
  togglePlaylistItem,
  usePlaylist,
} from '../hooks/use-playlist';
import { useTodayJdn } from '../hooks/use-today';

const strings = {
  en: {
    appTitle: 'Alhan',
    appSubtitle: 'Coptic hymns & responses',
    languagePrompt: 'App language',
    back: 'Back',
    chooseSeason: 'Choose a season',
    chooseService: 'Choose a service',
    chooseCategory: 'Choose a category',
    chooseHymn: 'Choose a hymn',
    chooseResponse: 'Choose a response',
    seasonsTitle: 'Liturgical Seasons',
    responsesTitle: 'Deacon / Altar Responses',
    hymnsDesc: 'Hymns for every season, fast and feast',
    responsesDesc: 'Responses between the priest, deacons and congregation',
    play: 'Play',
    pause: 'Pause',
    repeat: 'Repeat',
    textSize: 'Text size',
    notAvailable: 'Text not available in this language.',
    hasAudio: 'Audio',
    nowIn: 'Now in',
    next: 'Next',
    openCalendar: 'Coptic calendar',
    playlistTitle: 'My Playlist',
    playlistDesc: (n: number) => (n === 1 ? '1 hymn' : `${n} hymns`),
    playlistEmpty: 'Your playlist is empty. Open any hymn marked ♪ Audio and tap “Add to playlist”.',
    addToPlaylist: '+ Add to playlist',
    inPlaylist: '✓ In playlist',
    playAll: '▶ Play all',
    repeatPlaylist: '⟳ Repeat playlist',
    previousTrack: 'Previous',
    nextTrack: 'Next',
    stop: 'Stop',
    moveUp: 'Move up',
    moveDown: 'Move down',
    remove: 'Remove',
    nowPlaying: 'Now playing',
    search: 'Search hymns',
    searchPlaceholder: 'Coptic, English or Arabic',
    searchHint: 'Search titles and words in every language.',
    noResults: 'No hymns found.',
    titleMatch: 'Title',
    todaysHymns: 'Today’s hymns',
    sideBySide: '⇆ Side by side',
    compareWith: 'Next to it',
    download: '⬇ Download for offline',
    downloading: 'Downloading…',
    downloaded: '✓ Downloaded · tap to remove',
    downloadFailed: 'Download failed. Check your connection and try again.',
    downloadAll: '⬇ Download all for offline',
  },
  ar: {
    appTitle: 'ألحان',
    appSubtitle: 'الألحان والمردات القبطية',
    languagePrompt: 'لغة التطبيق',
    back: 'رجوع',
    chooseSeason: 'اختر المناسبة',
    chooseService: 'اختر الخدمة',
    chooseCategory: 'اختر القسم',
    chooseHymn: 'اختر اللحن',
    chooseResponse: 'اختر المرد',
    seasonsTitle: 'المناسبات الكنسية',
    responsesTitle: 'مردات الشماس والهيكل',
    hymnsDesc: 'ألحان كل المواسم والأصوام والأعياد',
    responsesDesc: 'المردات بين الكاهن والشمامسة والشعب',
    play: 'تشغيل',
    pause: 'إيقاف',
    repeat: 'تكرار',
    textSize: 'حجم الخط',
    notAvailable: 'النص غير متوفر بهذه اللغة.',
    hasAudio: 'صوت',
    nowIn: 'نحن الآن في',
    next: 'القادم',
    openCalendar: 'التقويم القبطي',
    playlistTitle: 'قائمة التشغيل',
    playlistDesc: (n: number) => `${n} ${n >= 3 && n <= 10 ? 'ألحان' : 'لحن'}`,
    playlistEmpty: 'قائمة التشغيل فارغة. افتح أي لحن عليه ♪ صوت واضغط «أضف إلى قائمة التشغيل».',
    addToPlaylist: '+ أضف إلى قائمة التشغيل',
    inPlaylist: '✓ في قائمة التشغيل',
    playAll: '▶ تشغيل الكل',
    repeatPlaylist: '⟳ تكرار القائمة',
    previousTrack: 'السابق',
    nextTrack: 'التالي',
    stop: 'إيقاف',
    moveUp: 'تحريك لأعلى',
    moveDown: 'تحريك لأسفل',
    remove: 'حذف',
    nowPlaying: 'يعمل الآن',
    search: 'ابحث في الألحان',
    searchPlaceholder: 'قبطي أو إنجليزي أو عربي',
    searchHint: 'ابحث في العناوين والكلمات بكل اللغات.',
    noResults: 'لا توجد ألحان مطابقة.',
    titleMatch: 'العنوان',
    todaysHymns: 'ألحان اليوم',
    sideBySide: '⇆ جنباً إلى جنب',
    compareWith: 'بجانبه',
    download: '⬇ تنزيل للاستماع بدون إنترنت',
    downloading: 'جارٍ التنزيل…',
    downloaded: '✓ تم التنزيل · اضغط للحذف',
    downloadFailed: 'فشل التنزيل. تحقق من الاتصال وحاول مرة أخرى.',
    downloadAll: '⬇ تنزيل الكل للاستماع بدون إنترنت',
  },
};

const languageLabels: Record<AppLanguage, { key: LanguageType; label: string }[]> = {
  en: [
    { key: 'coptic', label: 'Coptic' },
    { key: 'englishCoptic', label: 'Coptic (English letters)' },
    { key: 'english', label: 'English' },
    { key: 'englishArabic', label: 'Arabic (English letters)' },
    { key: 'arabic', label: 'Arabic' },
  ],
  ar: [
    { key: 'arabic', label: 'عربي' },
    { key: 'coptic', label: 'قبطي' },
    { key: 'englishArabic', label: 'عربي بحروف إنجليزية' },
    { key: 'englishCoptic', label: 'قبطي بحروف إنجليزية' },
    { key: 'english', label: 'إنجليزي' },
  ],
};

const defaultHymnLanguage = (lang: AppLanguage): LanguageType => (lang === 'ar' ? 'arabic' : 'coptic');

// Season titles carry their list number ("5. Kiahk Praises & Season"), which reads oddly on its own
const withoutNumber = (title: string) => title.replace(/^\d+\.\s*/, '');

const splitVerses = (text: string) => text.split(/\n\s*\n/).filter((p) => p.trim());

// Keeps the screen on while a hymn is open, so it doesn't dim in the middle of a service
function KeepScreenAwake() {
  useKeepAwake(undefined, { suppressDeactivateWarnings: true });
  return null;
}

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

export default function HomeScreen() {
  const settings = useSettings();
  const lang = settings.language;
  const t = strings[lang];
  const isRTL = lang === 'ar';
  const insets = useSafeAreaInsets();
  const colors = useAlhanColors();
  const styles = useThemedStyles(createStyles);

  const [currentView, setCurrentView] = useState<'home' | 'responses-home' | 'seasons-home' | 'playlist' | 'search'>(
    'home'
  );
  const [searchQuery, setSearchQuery] = useState('');

  // Deacon navigation state
  const [selectedDeaconCategory, setSelectedDeaconCategory] = useState<DeaconCategory | null>(null);
  const [selectedDeaconService, setSelectedDeaconService] = useState<Service | null>(null);
  const [selectedDeaconHymn, setSelectedDeaconHymn] = useState<Hymn | null>(null);

  // Hymns navigation state
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedHymn, setSelectedHymn] = useState<Hymn | null>(null);

  const [activeLanguage, setActiveLanguage] = useState<LanguageType>(defaultHymnLanguage(lang));

  const activeTargetHymn = selectedHymn || selectedDeaconHymn;

  const today = useTodayJdn();
  const seasonInfo = getSeasonInfo(today, 1);

  // "Open hymns" on the calendar screen lands here with ?season=<id>
  const { season: seasonParam, at: seasonParamAt } = useLocalSearchParams<{ season?: string; at?: string }>();
  const seasonRequest = seasonParam ? `${seasonParam}@${seasonParamAt}` : null;
  const [handledSeasonRequest, setHandledSeasonRequest] = useState<string | null>(null);
  if (seasonRequest !== handledSeasonRequest) {
    setHandledSeasonRequest(seasonRequest);
    const requested = seasons.find((s) => s.id === seasonParam);
    if (requested) {
      setSelectedHymn(null);
      setSelectedDeaconHymn(null);
      setSelectedDeaconService(null);
      setSelectedDeaconCategory(null);
      setSelectedService(null);
      setSelectedSeason(requested);
      setCurrentView('seasons-home');
    }
  }

  // Only offer the languages this hymn actually has text for
  const availableLanguages = languageLabels[lang].filter((l) =>
    activeTargetHymn?.versions.some((v) => v.language === l.key && v.text)
  );
  const effectiveLanguage = availableLanguages.some((l) => l.key === activeLanguage)
    ? activeLanguage
    : (availableLanguages[0]?.key ?? activeLanguage);

  const currentAudio =
    activeTargetHymn?.versions.find((v) => v.language === effectiveLanguage)?.audio ?? null;
  // Audio lives in a shared queue so it keeps playing after leaving the hymn or the app
  const queue = useAudioQueue();
  const nowPlaying = currentTrack(queue);
  const playlist = usePlaylist();
  const downloads = useAudioDownloads();
  const readerItem: PlaylistItem | null = activeTargetHymn
    ? { hymnId: activeTargetHymn.id, language: effectiveLanguage }
    : null;
  const readerIsCurrent = !!readerItem && !!nowPlaying && trackKey(nowPlaying) === trackKey(readerItem);
  const status = readerIsCurrent ? queue.status : { playing: false, currentTime: 0, duration: 0 };

  const toTrack = (item: PlaylistItem): QueueTrack | null => {
    const hymn = findHymn(item.hymnId);
    const file = audioFor(item);
    const source = file ? audioSourceFor(file) : null;
    return hymn && source ? { ...item, title: displayTitle(hymn, lang), source } : null;
  };

  const toggleReaderAudio = () => {
    if (readerIsCurrent) return togglePlay();
    const track = readerItem && toTrack(readerItem);
    if (track) playQueue([track]);
  };

  const playPlaylist = (startIndex = 0) =>
    playQueue(
      playlist.map(toTrack).filter((t): t is QueueTrack => t !== null),
      startIndex,
      'playlist'
    );

  const openNowPlaying = () => {
    const hymn = nowPlaying && findHymn(nowPlaying.hymnId);
    if (!hymn || !nowPlaying) return;
    setActiveLanguage(nowPlaying.language);
    setSelectedHymn(hymn);
  };

  const toggleDownload = (file: string) => {
    if (downloads.downloaded.has(file)) return removeDownload(file);
    downloadAudio(file).then((ok) => {
      if (!ok) Alert.alert(t.downloadFailed);
    });
  };

  const downloadAll = async (files: string[]) => {
    for (const file of files) {
      if (!(await downloadAudio(file))) return Alert.alert(t.downloadFailed);
    }
  };

  // Today's season (or the annual hymns on ordinary days), opened straight to one of its services
  const todaySeason = seasons.find((s) => s.id === (seasonInfo.current?.seasonId ?? 'annual')) ?? seasons[0];
  const openService = (season: Season, service: Service) => {
    setSelectedSeason(season);
    setSelectedService(service);
    setCurrentView('seasons-home');
  };

  const openSearchResult = (result: SearchResult) => {
    if (result.language) setActiveLanguage(result.language);
    setSelectedHymn(result.hymn);
  };

  const closeHymn = () => {
    setSelectedHymn(null);
    setSelectedDeaconHymn(null);
  };

  const changeLanguage = (next: LanguageType) => {
    setActiveLanguage(next);
  };

  const changeAppLanguage = (next: AppLanguage) => {
    updateSettings({ language: next });
    setActiveLanguage(defaultHymnLanguage(next));
  };

  const changeTextScale = (delta: number) => {
    const next = Math.round((settings.textScale + delta) * 100) / 100;
    updateSettings({ textScale: Math.min(TEXT_SCALE_MAX, Math.max(TEXT_SCALE_MIN, next)) });
  };

  // Steps back one level; returns false when already on the home screen
  const goBack = (): boolean => {
    if (activeTargetHymn) closeHymn();
    else if (selectedService) setSelectedService(null);
    else if (selectedSeason) setSelectedSeason(null);
    else if (selectedDeaconService) setSelectedDeaconService(null);
    else if (selectedDeaconCategory) setSelectedDeaconCategory(null);
    else if (currentView !== 'home') setCurrentView('home');
    else return false;
    return true;
  };

  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', goBack);
    return () => sub.remove();
  });

  const rowDirection = isRTL ? styles.rowReverse : styles.row;
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;

  // The reader already has full controls for its own track, so the mini player only shows elsewhere
  const showMiniPlayer = !!nowPlaying && !readerIsCurrent;
  const bottomPadding = insets.bottom + 40 + (showMiniPlayer ? 96 : 0);

  const miniPlayer = () => {
    if (!showMiniPlayer || !nowPlaying) return null;
    const { playing, currentTime, duration } = queue.status;
    const progress = duration > 0 ? Math.min(1, currentTime / duration) : 0;
    const hasQueue = queue.tracks.length > 1;
    return (
      <View style={[styles.miniPlayer, { bottom: insets.bottom + 12 }]}>
        <View style={styles.miniProgressTrack}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
        <View style={[styles.miniRow, rowDirection]}>
          <Pressable
            onPress={openNowPlaying}
            accessibilityRole="button"
            accessibilityLabel={`${t.nowPlaying}: ${nowPlaying.title}`}
            style={({ pressed }) => [styles.rowTextWrap, pressed && styles.pressed]}>
            <Text style={[styles.miniLabel, textAlign]}>
              ♪ {t.nowPlaying}
              {hasQueue ? ` · ${queue.index + 1}/${queue.tracks.length}` : ''}
            </Text>
            <Text style={[styles.miniTitle, textAlign]} numberOfLines={1}>
              {nowPlaying.title}
            </Text>
          </Pressable>
          {hasQueue ? (
            <Pressable
              onPress={() => skip(-1)}
              accessibilityRole="button"
              accessibilityLabel={t.previousTrack}
              style={({ pressed }) => [styles.miniButton, pressed && styles.pressed]}>
              <Text style={styles.miniButtonText}>{isRTL ? '⏭\uFE0E' : '⏮\uFE0E'}</Text>
            </Pressable>
          ) : null}
          <Pressable
            onPress={togglePlay}
            accessibilityRole="button"
            accessibilityLabel={playing ? t.pause : t.play}
            style={({ pressed }) => [styles.miniPlayButton, pressed && styles.pressed]}>
            <Text style={styles.miniPlayIcon}>{playing ? '❚❚' : '▶'}</Text>
          </Pressable>
          {hasQueue ? (
            <Pressable
              onPress={() => skip(1)}
              accessibilityRole="button"
              accessibilityLabel={t.nextTrack}
              style={({ pressed }) => [styles.miniButton, pressed && styles.pressed]}>
              <Text style={styles.miniButtonText}>{isRTL ? '⏮\uFE0E' : '⏭\uFE0E'}</Text>
            </Pressable>
          ) : null}
          <Pressable
            onPress={stopQueue}
            accessibilityRole="button"
            accessibilityLabel={t.stop}
            style={({ pressed }) => [styles.miniButton, pressed && styles.pressed]}>
            <Text style={styles.miniButtonText}>✕</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  const screen = (title: string, subtitle: string | null, children: ReactNode) => (
    <View style={styles.root}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 12, paddingBottom: bottomPadding }]}>
        <Pressable
          onPress={goBack}
          accessibilityRole="button"
          accessibilityLabel={t.back}
          style={({ pressed }) => [styles.backButton, rowDirection, isRTL && styles.selfEnd, pressed && styles.pressed]}>
          <Text style={styles.backArrow}>{isRTL ? '›' : '‹'}</Text>
          <Text style={styles.backText}>{t.back}</Text>
        </Pressable>
        <Text style={[styles.headerTitle, textAlign]}>{title}</Text>
        {subtitle ? <Text style={[styles.subtitle, textAlign]}>{subtitle}</Text> : null}
        {children}
      </ScrollView>
      {miniPlayer()}
    </View>
  );

  const row = (key: string, title: string, onPress: () => void, badge?: string) => (
    <Pressable
      key={key}
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.rowCard, rowDirection, pressed && styles.rowCardPressed]}>
      <View style={styles.rowTextWrap}>
        <Text style={[styles.rowTitle, textAlign]}>{title}</Text>
        {badge ? (
          <View style={[styles.badge, isRTL && styles.selfEnd]}>
            <Text style={styles.badgeText}>♪ {badge}</Text>
          </View>
        ) : null}
      </View>
      <Text style={styles.chevron}>{isRTL ? '‹' : '›'}</Text>
    </Pressable>
  );

  const sectionHeader = (key: string, title: string) => (
    <View key={key} style={[styles.sectionHeader, rowDirection]}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
      <View style={styles.sectionLine} />
    </View>
  );

  const hymnList = (hymns: Hymn[], onSelect: (h: Hymn) => void) =>
    hymns.map((hymn) =>
      hymn.isSectionHeader
        ? sectionHeader(hymn.id, displayTitle(hymn, lang))
        : row(
            hymn.id,
            displayTitle(hymn, lang),
            () => onSelect(hymn),
            hymn.versions.some((v) => v.audio) ? t.hasAudio : undefined
          )
    );

  // 1. HOME (the mini player can open a hymn straight from here)
  if (currentView === 'home' && !activeTargetHymn) {
    return (
      <View style={styles.root}>
        <ScrollView
          contentContainerStyle={[styles.homeContent, { paddingTop: insets.top + 40, paddingBottom: bottomPadding }]}>
          <View style={styles.hero}>
            <Text style={styles.heroCross}>☩</Text>
            <Text style={styles.heroTitle}>{t.appTitle}</Text>
            <Text style={styles.heroSubtitle}>{t.appSubtitle}</Text>
          </View>

          <Pressable
            onPress={() => setCurrentView('search')}
            accessibilityRole="search"
            accessibilityLabel={t.search}
            style={({ pressed }) => [styles.searchEntry, rowDirection, pressed && styles.rowCardPressed]}>
            <Text style={styles.searchIcon}>⌕</Text>
            <Text style={[styles.searchEntryText, textAlign]}>{t.search}</Text>
          </Pressable>

          <Pressable
            onPress={() => router.push('/calendar')}
            accessibilityRole="button"
            accessibilityHint={t.openCalendar}
            style={({ pressed }) => [styles.seasonCard, pressed && styles.rowCardPressed]}>
            <View style={[styles.seasonCardTop, rowDirection]}>
              <Text style={[styles.seasonDate, textAlign]}>☩ {formatCopticDate(today, lang)}</Text>
              <Text style={styles.chevron}>{isRTL ? '‹' : '›'}</Text>
            </View>
            <Text style={[styles.seasonLabel, textAlign]}>{t.nowIn}</Text>
            <Text
              style={[styles.seasonName, textAlign, seasonInfo.current?.kind === 'fast' && { color: colors.fast }]}>
              {currentSeasonName(seasonInfo, lang)}
            </Text>
            <Text style={[styles.seasonMeta, textAlign]}>
              {seasonInfo.current ? kindName[lang][seasonInfo.current.kind] : tuneName[lang][seasonInfo.tune]}
            </Text>
            {seasonInfo.upcoming[0] ? (
              <View style={[styles.seasonNext, rowDirection]}>
                <Text style={[styles.seasonNextText, textAlign]} numberOfLines={1}>
                  {t.next}: {seasonInfo.upcoming[0].name[lang]}
                </Text>
                <Text style={styles.seasonNextWhen}>
                  {formatDaysUntil(seasonInfo.upcoming[0].daysUntil, lang)}
                </Text>
              </View>
            ) : null}
          </Pressable>

          <View style={styles.todayCard}>
            <Text style={[styles.seasonLabel, textAlign]}>♫ {t.todaysHymns}</Text>
            <Text style={[styles.todaySeason, textAlign]}>{withoutNumber(displayTitle(todaySeason, lang))}</Text>
            <View style={[styles.chipWrap, styles.todayServices, rowDirection]}>
              {todaySeason.services.map((service) => (
                <Pressable
                  key={service.id}
                  onPress={() => openService(todaySeason, service)}
                  accessibilityRole="button"
                  style={({ pressed }) => [styles.chip, pressed && styles.rowCardPressed]}>
                  <Text style={styles.chipText}>{displayTitle(service, lang)}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          <Text style={styles.languagePrompt}>{t.languagePrompt}</Text>
          <View style={styles.segmented}>
            {(['en', 'ar'] as AppLanguage[]).map((option) => (
              <Pressable
                key={option}
                onPress={() => changeAppLanguage(option)}
                accessibilityRole="button"
                accessibilityState={{ selected: lang === option }}
                style={[styles.segment, lang === option && styles.segmentActive]}>
                <Text style={[styles.segmentText, lang === option && styles.segmentTextActive]}>
                  {option === 'en' ? 'English' : 'العربية'}
                </Text>
              </Pressable>
            ))}
          </View>

          {[
            { key: 'hymns', title: displayTitle(mainCategories[1], lang), icon: '♫', desc: t.hymnsDesc, view: 'seasons-home' as const },
            { key: 'responses', title: displayTitle(mainCategories[0], lang), icon: '✝', desc: t.responsesDesc, view: 'responses-home' as const },
            { key: 'playlist', title: t.playlistTitle, icon: '☰', desc: t.playlistDesc(playlist.length), view: 'playlist' as const },
          ].map(({ key, title, icon, desc, view }) => (
            <Pressable
              key={key}
              onPress={() => setCurrentView(view)}
              accessibilityRole="button"
              style={({ pressed }) => [styles.homeCard, rowDirection, pressed && styles.rowCardPressed]}>
              <View style={styles.homeIcon}>
                <Text style={styles.homeIconText}>{icon}</Text>
              </View>
              <View style={styles.rowTextWrap}>
                <Text style={[styles.homeCardTitle, textAlign]}>{title}</Text>
                <Text style={[styles.homeCardDesc, textAlign]}>{desc}</Text>
              </View>
              <Text style={styles.chevron}>{isRTL ? '‹' : '›'}</Text>
            </Pressable>
          ))}
        </ScrollView>
        {miniPlayer()}
      </View>
    );
  }

  // 2. HYMN READER
  if (activeTargetHymn) {
    const textFor = (language: LanguageType) =>
      (activeTargetHymn.versions.find((v) => v.language === language)?.text || t.notAvailable).replace(
        /(?:\\n)+/g,
        '\n\n'
      );
    const rawText =
      activeTargetHymn.versions.find((v) => v.language === effectiveLanguage)?.text || t.notAvailable;
    const hymnText = textFor(effectiveLanguage);
    const isArabicText = effectiveLanguage === 'arabic' || rawText === strings.ar.notAvailable;
    const fontSize = 20 * settings.textScale;
    const progress = status.duration > 0 ? Math.min(1, status.currentTime / status.duration) : 0;
    const repeatOne = queue.repeat === 'one';
    const inPlaylist = !!readerItem && isInPlaylist(playlist, readerItem);
    const audioFile = currentAudio;
    const isDownloading = !!audioFile && downloads.downloading.has(audioFile);
    const isDownloaded = !!audioFile && downloads.downloaded.has(audioFile);

    // Second column: the language last chosen for it, else English, else whatever else this hymn has
    const compareOptions = availableLanguages.filter((l) => l.key !== effectiveLanguage);
    const compareLanguage =
      compareOptions.find((l) => l.key === settings.compareLanguage)?.key ??
      (compareOptions.find((l) => l.key === 'english') ?? compareOptions[0])?.key ??
      null;
    const showSideBySide = settings.sideBySide && compareLanguage !== null;
    const columnStyle = (language: LanguageType) => (language === 'arabic' ? styles.arabicText : styles.alignLeft);
    // Verse by verse, so each line sits next to its translation
    const verses = splitVerses(hymnText);
    const compareVerses = compareLanguage ? splitVerses(textFor(compareLanguage)) : [];
    const columnSize = fontSize * 0.85;
    const columnText = { fontSize: columnSize, lineHeight: columnSize * 1.6 };

    return screen(
      displayTitle(activeTargetHymn, lang),
      null,
      <>
        <KeepScreenAwake />
        {availableLanguages.length > 1 ? (
          <View style={[styles.chipWrap, rowDirection]}>
            {availableLanguages.map((l) => {
              const active = effectiveLanguage === l.key;
              return (
                <Pressable
                  key={l.key}
                  onPress={() => changeLanguage(l.key)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                  style={[styles.chip, active && styles.chipActive]}>
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>{l.label}</Text>
                </Pressable>
              );
            })}
          </View>
        ) : null}

        {compareOptions.length > 0 ? (
          <View style={[styles.compareRow, rowDirection]}>
            <Pressable
              onPress={() => updateSettings({ sideBySide: !settings.sideBySide })}
              accessibilityRole="switch"
              accessibilityState={{ checked: showSideBySide }}
              style={[styles.chip, showSideBySide && styles.controlButtonActive]}>
              <Text style={[styles.chipText, showSideBySide && styles.controlTextActive]}>{t.sideBySide}</Text>
            </Pressable>
          </View>
        ) : null}
        {showSideBySide && compareOptions.length > 1 ? (
          <View style={[styles.chipWrap, styles.compareChips, rowDirection]}>
            <Text style={styles.textSizeLabel}>{t.compareWith}:</Text>
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
          </View>
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
                <Text style={[styles.controlText, repeatOne && styles.controlTextActive]}>
                  ⟳ {t.repeat}
                </Text>
              </Pressable>
            </View>
            {readerItem ? (
              <Pressable
                onPress={() => togglePlaylistItem(readerItem)}
                accessibilityRole="button"
                accessibilityState={{ selected: inPlaylist }}
                style={({ pressed }) => [
                  styles.playlistButton,
                  inPlaylist && styles.controlButtonActive,
                  pressed && styles.pressed,
                ]}>
                <Text style={[styles.controlText, inPlaylist && styles.controlTextActive]}>
                  {inPlaylist ? t.inPlaylist : t.addToPlaylist}
                </Text>
              </Pressable>
            ) : null}
            {audioFile && canDownload(audioFile) ? (
              <Pressable
                onPress={() => toggleDownload(audioFile)}
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

        <View style={[styles.textSizeRow, rowDirection]}>
          <Text style={styles.textSizeLabel}>{t.textSize}</Text>
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

        <View style={styles.textCard}>
          {showSideBySide && compareLanguage ? (
            Array.from({ length: Math.max(verses.length, compareVerses.length) }, (_, i) => (
              <View key={i} style={[styles.verseRow, rowDirection, i > 0 && styles.verseRowDivider]}>
                <Text style={[styles.hymnText, styles.verseColumn, columnText, columnStyle(effectiveLanguage)]}>
                  {verses[i] ?? ''}
                </Text>
                <View style={styles.verseGutter} />
                <Text style={[styles.hymnText, styles.verseColumn, columnText, columnStyle(compareLanguage)]}>
                  {compareVerses[i] ?? ''}
                </Text>
              </View>
            ))
          ) : (
            <Text
              style={[
                styles.hymnText,
                { fontSize, lineHeight: fontSize * 1.65 },
                isArabicText ? styles.arabicText : styles.alignLeft,
              ]}>
              {hymnText}
            </Text>
          )}
        </View>
      </>
    );
  }

  // PLAYLIST
  if (currentView === 'playlist') {
    const playingFromPlaylist = queue.origin === 'playlist' && nowPlaying;
    const repeatAll = queue.repeat === 'all';
    const toDownload = [
      ...new Set(playlist.map(audioFor).filter((f): f is string => !!f && canDownload(f))),
    ].filter((f) => !downloads.downloaded.has(f));
    const downloadingAny = toDownload.some((f) => downloads.downloading.has(f));
    return screen(
      t.playlistTitle,
      t.playlistDesc(playlist.length),
      playlist.length === 0 ? (
        <Text style={[styles.emptyText, textAlign]}>{t.playlistEmpty}</Text>
      ) : (
        <>
          <View style={[styles.audioControls, styles.playlistActions, rowDirection]}>
            <Pressable
              onPress={() => playPlaylist(0)}
              accessibilityRole="button"
              style={({ pressed }) => [styles.controlButton, styles.playAllButton, pressed && styles.pressed]}>
              <Text style={[styles.controlText, styles.playAllText]}>{t.playAll}</Text>
            </Pressable>
            <Pressable
              onPress={() => setRepeat(repeatAll ? 'none' : 'all')}
              accessibilityRole="button"
              accessibilityState={{ selected: repeatAll }}
              style={[styles.controlButton, repeatAll && styles.controlButtonActive]}>
              <Text style={[styles.controlText, repeatAll && styles.controlTextActive]}>{t.repeatPlaylist}</Text>
            </Pressable>
          </View>
          {toDownload.length > 0 ? (
            <Pressable
              onPress={() => downloadAll(toDownload)}
              disabled={downloadingAny}
              accessibilityRole="button"
              style={({ pressed }) => [
                styles.playlistButton,
                styles.playlistDownload,
                pressed && styles.pressed,
                downloadingAny && styles.disabled,
              ]}>
              <Text style={styles.controlText}>{downloadingAny ? t.downloading : t.downloadAll}</Text>
            </Pressable>
          ) : null}
          {playlist.map((item, index) => {
            const hymn = findHymn(item.hymnId);
            if (!hymn) return null;
            const isCurrent = !!playingFromPlaylist && trackKey(playingFromPlaylist) === trackKey(item);
            const languageLabel = languageLabels[lang].find((l) => l.key === item.language)?.label;
            return (
              <View
                key={trackKey(item)}
                style={[styles.rowCard, styles.playlistRow, rowDirection, isCurrent && styles.rowCardPressed]}>
                <Pressable
                  onPress={() => playPlaylist(index)}
                  accessibilityRole="button"
                  style={({ pressed }) => [styles.rowTextWrap, pressed && styles.pressed]}>
                  <Text style={[styles.rowTitle, textAlign]}>
                    {isCurrent ? (queue.status.playing ? '♪ ' : '❚❚ ') : `${index + 1}. `}
                    {displayTitle(hymn, lang)}
                  </Text>
                  <Text style={[styles.playlistMeta, textAlign]}>{languageLabel}</Text>
                </Pressable>
                <View style={[styles.playlistRowButtons, rowDirection]}>
                  <Pressable
                    onPress={() => movePlaylistItem(index, -1)}
                    disabled={index === 0}
                    accessibilityLabel={t.moveUp}
                    style={({ pressed }) => [styles.iconButton, pressed && styles.pressed, index === 0 && styles.disabled]}>
                    <Text style={styles.iconButtonText}>▲</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => movePlaylistItem(index, 1)}
                    disabled={index === playlist.length - 1}
                    accessibilityLabel={t.moveDown}
                    style={({ pressed }) => [
                      styles.iconButton,
                      pressed && styles.pressed,
                      index === playlist.length - 1 && styles.disabled,
                    ]}>
                    <Text style={styles.iconButtonText}>▼</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => removePlaylistItem(index)}
                    accessibilityLabel={t.remove}
                    style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}>
                    <Text style={styles.iconButtonText}>✕</Text>
                  </Pressable>
                </View>
              </View>
            );
          })}
        </>
      )
    );
  }

  // SEARCH (opening a result keeps the search underneath, so Back returns to the results)
  if (currentView === 'search') {
    const results = searchHymns(searchQuery);
    const hasQuery = searchQuery.trim().length >= 2;
    return screen(
      t.search,
      null,
      <>
        <View style={[styles.searchField, rowDirection]}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={t.searchPlaceholder}
            placeholderTextColor={colors.muted}
            autoFocus
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="search"
            clearButtonMode="while-editing"
            accessibilityLabel={t.search}
            style={[styles.searchInput, textAlign]}
          />
        </View>
        {!hasQuery ? (
          <Text style={[styles.emptyText, textAlign]}>{t.searchHint}</Text>
        ) : results.length === 0 ? (
          <Text style={[styles.emptyText, textAlign]}>{t.noResults}</Text>
        ) : (
          results.map((result) => {
            const { hymn, location, language } = result;
            const where = `${withoutNumber(displayTitle(location.group, lang))} › ${displayTitle(location.service, lang)}`;
            const matchedIn = language ? languageLabels[lang].find((l) => l.key === language)?.label : t.titleMatch;
            return (
              <Pressable
                key={hymn.id}
                onPress={() => openSearchResult(result)}
                accessibilityRole="button"
                style={({ pressed }) => [styles.rowCard, rowDirection, pressed && styles.rowCardPressed]}>
                <View style={styles.rowTextWrap}>
                  <Text style={[styles.rowTitle, textAlign]}>{displayTitle(hymn, lang)}</Text>
                  <Text style={[styles.playlistMeta, textAlign]} numberOfLines={1}>
                    {where} · {matchedIn}
                  </Text>
                  {result.snippet ? (
                    <Text
                      style={[styles.searchSnippet, language === 'arabic' ? styles.arabicText : textAlign]}
                      numberOfLines={2}>
                      {result.snippet}
                    </Text>
                  ) : null}
                </View>
                <Text style={styles.chevron}>{isRTL ? '‹' : '›'}</Text>
              </Pressable>
            );
          })
        )}
      </>
    );
  }

  // 3. HYMNS FLOW
  if (selectedService) {
    return screen(displayTitle(selectedService, lang), t.chooseHymn, hymnList(selectedService.hymns, setSelectedHymn));
  }

  if (selectedSeason) {
    return screen(
      displayTitle(selectedSeason, lang),
      t.chooseService,
      selectedSeason.services.map((service) =>
        row(service.id, displayTitle(service, lang), () => setSelectedService(service))
      )
    );
  }

  if (currentView === 'seasons-home') {
    return screen(
      t.seasonsTitle,
      t.chooseSeason,
      seasons.map((season) => row(season.id, displayTitle(season, lang), () => setSelectedSeason(season)))
    );
  }

  // 4. DEACON RESPONSES FLOW
  if (selectedDeaconService) {
    return screen(
      displayTitle(selectedDeaconService, lang),
      t.chooseResponse,
      hymnList(selectedDeaconService.hymns, setSelectedDeaconHymn)
    );
  }

  if (selectedDeaconCategory) {
    return screen(
      displayTitle(selectedDeaconCategory, lang),
      t.chooseService,
      selectedDeaconCategory.services.map((service) =>
        row(service.id, displayTitle(service, lang), () => setSelectedDeaconService(service))
      )
    );
  }

  return screen(
    t.responsesTitle,
    t.chooseCategory,
    deaconCategories.map((cat) => row(cat.id, displayTitle(cat, lang), () => setSelectedDeaconCategory(cat)))
  );
}

const createStyles = (colors: AlhanPalette) => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  row: { flexDirection: 'row' },
  rowReverse: { flexDirection: 'row-reverse' },
  alignLeft: { textAlign: 'left' },
  alignRight: { textAlign: 'right' },
  selfEnd: { alignSelf: 'flex-end' },
  pressed: { opacity: 0.7 },
  disabled: { opacity: 0.35 },

  // Home
  searchEntry: {
    alignItems: 'center',
    gap: 10,
    minHeight: 54,
    paddingHorizontal: 18,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  searchIcon: {
    fontSize: 24,
    color: colors.gold,
  },
  searchEntryText: {
    flex: 1,
    fontSize: 18,
    color: colors.muted,
  },
  todayCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    marginBottom: 28,
  },
  todaySeason: {
    fontSize: 21,
    fontWeight: '800',
    color: colors.text,
    marginTop: 2,
  },
  todayServices: {
    marginTop: 12,
    marginBottom: 0,
  },
  homeContent: {
    paddingHorizontal: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  hero: {
    alignItems: 'center',
    marginBottom: 36,
  },
  heroCross: {
    fontSize: 44,
    color: colors.gold,
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 40,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: 1,
  },
  heroSubtitle: {
    fontSize: 17,
    color: colors.muted,
    marginTop: 6,
  },
  seasonCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    borderTopWidth: 3,
    borderTopColor: colors.gold,
    padding: 18,
    marginBottom: 28,
  },
  seasonCardTop: {
    alignItems: 'center',
    gap: 8,
  },
  seasonDate: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  seasonLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.muted,
    marginTop: 4,
  },
  seasonName: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.gold,
    marginTop: 2,
  },
  seasonMeta: {
    fontSize: 15,
    color: colors.muted,
    marginTop: 2,
  },
  seasonNext: {
    alignItems: 'center',
    gap: 10,
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  seasonNextText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  seasonNextWhen: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.gold,
  },
  languagePrompt: {
    fontSize: 15,
    color: colors.muted,
    textAlign: 'center',
    marginBottom: 10,
  },
  segmented: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 5,
    marginBottom: 28,
  },
  segment: {
    flex: 1,
    minHeight: 54,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: {
    backgroundColor: colors.gold,
  },
  segmentText: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.muted,
  },
  segmentTextActive: {
    color: colors.onGold,
  },
  homeCard: {
    alignItems: 'center',
    gap: 16,
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    marginBottom: 14,
  },
  homeIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.goldSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeIconText: {
    fontSize: 26,
    color: colors.gold,
  },
  homeCardTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  homeCardDesc: {
    fontSize: 15,
    color: colors.muted,
    lineHeight: 21,
  },

  // Screen header
  backButton: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    gap: 6,
    minHeight: 48,
    paddingHorizontal: 16,
    borderRadius: 24,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  backArrow: {
    fontSize: 28,
    lineHeight: 32,
    color: colors.gold,
    fontWeight: '600',
  },
  backText: {
    fontSize: 18,
    color: colors.text,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.gold,
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 16,
    color: colors.muted,
    marginTop: 4,
    marginBottom: 20,
  },

  // List rows
  rowCard: {
    alignItems: 'center',
    gap: 12,
    minHeight: 68,
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 10,
  },
  rowCardPressed: {
    backgroundColor: colors.surfacePressed,
    borderColor: colors.gold,
  },
  rowTextWrap: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: colors.text,
    lineHeight: 27,
  },
  chevron: {
    fontSize: 30,
    color: colors.gold,
    fontWeight: '300',
  },
  badge: {
    alignSelf: 'flex-start',
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    backgroundColor: colors.goldSoft,
  },
  badgeText: {
    fontSize: 13,
    color: colors.gold,
    fontWeight: '700',
  },
  sectionHeader: {
    alignItems: 'center',
    gap: 12,
    marginTop: 18,
    marginBottom: 12,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.gold,
    letterSpacing: 1,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },

  // Reader
  chipWrap: {
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
    marginBottom: 16,
  },
  chip: {
    minHeight: 46,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderRadius: 23,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  chipText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  chipTextActive: {
    color: colors.onGold,
    fontWeight: '800',
  },
  audioCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 14,
  },
  audioTopRow: {
    alignItems: 'center',
    gap: 16,
  },
  playButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    fontSize: 26,
    color: colors.onGold,
    fontWeight: '800',
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.gold,
  },
  audioTime: {
    marginTop: 8,
    fontSize: 15,
    color: colors.muted,
    fontVariant: ['tabular-nums'],
  },
  audioControls: {
    gap: 8,
    marginTop: 14,
  },
  controlButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButtonActive: {
    borderColor: colors.gold,
    backgroundColor: colors.goldSoft,
  },
  controlText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  controlTextActive: {
    color: colors.gold,
  },
  playlistButton: {
    minHeight: 48,
    marginTop: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Mini player
  miniPlayer: {
    position: 'absolute',
    left: 12,
    right: 12,
    backgroundColor: colors.surfacePressed,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.gold,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  miniProgressTrack: {
    height: 3,
    backgroundColor: colors.border,
  },
  miniRow: {
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  miniLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.gold,
  },
  miniTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
    marginTop: 2,
  },
  miniButton: {
    width: 44,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniButtonText: {
    fontSize: 20,
    color: colors.text,
  },
  miniPlayButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniPlayIcon: {
    fontSize: 20,
    color: colors.onGold,
    fontWeight: '800',
  },

  // Search
  searchField: {
    alignItems: 'center',
    gap: 10,
    minHeight: 56,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.gold,
    marginTop: 12,
    marginBottom: 18,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: colors.text,
    paddingVertical: 12,
  },
  searchSnippet: {
    fontSize: 15,
    lineHeight: 21,
    color: colors.muted,
    marginTop: 6,
  },

  // Side by side
  compareRow: {
    marginTop: -4,
    marginBottom: 16,
  },
  compareChips: {
    alignItems: 'center',
    marginTop: -6,
  },
  chipSmall: {
    minHeight: 40,
    paddingHorizontal: 12,
  },
  verseRow: {
    paddingVertical: 10,
  },
  verseRowDivider: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  verseColumn: {
    flex: 1,
  },
  verseGutter: {
    width: 1,
    marginHorizontal: 10,
    backgroundColor: colors.border,
  },

  // Playlist
  emptyText: {
    fontSize: 17,
    color: colors.muted,
    lineHeight: 26,
  },
  playlistActions: {
    marginTop: 0,
    marginBottom: 14,
  },
  playAllButton: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  playAllText: {
    color: colors.onGold,
    fontWeight: '800',
  },
  playlistDownload: {
    marginTop: 0,
    marginBottom: 14,
  },
  playlistRow: {
    paddingHorizontal: 14,
  },
  playlistMeta: {
    fontSize: 14,
    color: colors.muted,
    marginTop: 2,
  },
  playlistRowButtons: {
    gap: 4,
  },
  iconButton: {
    width: 40,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonText: {
    fontSize: 15,
    color: colors.text,
  },
  textSizeRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  textSizeLabel: {
    fontSize: 16,
    color: colors.muted,
    fontWeight: '600',
  },
  textSizeButtons: {
    gap: 10,
  },
  sizeButton: {
    width: 60,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeButtonSmall: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
  sizeButtonLarge: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  textCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    borderTopWidth: 3,
    borderTopColor: colors.gold,
    padding: 22,
  },
  hymnText: {
    color: colors.text,
  },
  arabicText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});
