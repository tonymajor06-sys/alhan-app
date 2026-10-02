import { useKeepAwake } from 'expo-keep-awake';
import { router } from 'expo-router';
import { ReactNode, RefObject, useRef } from 'react';
import { Platform, Pressable, ScrollView, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AlhanPalette } from '../constants/alhan-colors';
import { LanguageType } from '../data/hymns';
import { hymnSlug } from '../data/search';
import { useThemedStyles } from '../hooks/use-alhan-colors';
import { currentTrack, skip, stopQueue, togglePlay, useAudioQueue } from '../hooks/use-audio-queue';
import { AppLanguage } from '../hooks/use-settings';

// Shared by the home screen, the hymn page and projector mode

export const strings = {
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
    nothingYet: 'Nothing here yet.',
    search: 'Search hymns',
    searchPlaceholder: 'Coptic, English or Arabic',
    searchHint: 'Search titles and words in every language.',
    noResults: 'No hymns found.',
    titleMatch: 'Title',
    sideBySide: '⇆ Side by side',
    compareWith: 'Next to it',
    download: '⬇ Download for offline',
    downloading: 'Downloading…',
    downloaded: '✓ Downloaded · tap to remove',
    downloadFailed: 'Download failed. Check your connection and try again.',
    downloadAll: '⬇ Download all for offline',
    share: '↗ Share',
    present: '⛶ Projector',
    learn: '♫ Learn',
    speed: 'Speed',
    repeatVerse: '⟳ Repeat verse',
    markVerses: '✎ Mark verses',
    remarkVerses: '✎ Mark again',
    markNext: 'Tap when the next verse starts',
    markStart: 'Tap when the first verse starts',
    markDone: 'Done',
    clearMarks: 'Clear marks',
    sendMarks: 'Send verse times',
    learnHint:
      'Tap “Mark verses”, play the recording and tap the button each time a new verse begins. After that the verse being sung lights up, and you can tap a verse to jump to it or repeat it.',
    learnReady: 'Tap a verse to jump to it.',
    markingProgress: (n: number, total: number) => `Verse ${n} of ${total}`,
    getApp: 'Get the Alhan app',
    notFound: 'This hymn could not be found.',
    goHome: 'Go to the home screen',
    exit: 'Exit',
    presentHint: 'Tap the sides or use ← → to move between verses',
    previousVerse: 'Previous verse',
    nextVerse: 'Next verse',
    shownLanguages: 'Show',
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
    nothingYet: 'لا يوجد شيء هنا بعد.',
    search: 'ابحث في الألحان',
    searchPlaceholder: 'قبطي أو إنجليزي أو عربي',
    searchHint: 'ابحث في العناوين والكلمات بكل اللغات.',
    noResults: 'لا توجد ألحان مطابقة.',
    titleMatch: 'العنوان',
    sideBySide: '⇆ جنباً إلى جنب',
    compareWith: 'بجانبه',
    download: '⬇ تنزيل للاستماع بدون إنترنت',
    downloading: 'جارٍ التنزيل…',
    downloaded: '✓ تم التنزيل · اضغط للحذف',
    downloadFailed: 'فشل التنزيل. تحقق من الاتصال وحاول مرة أخرى.',
    downloadAll: '⬇ تنزيل الكل للاستماع بدون إنترنت',
    share: '↗ مشاركة',
    present: '⛶ وضع العرض',
    learn: '♫ تعلّم',
    speed: 'السرعة',
    repeatVerse: '⟳ تكرار المقطع',
    markVerses: '✎ حدّد المقاطع',
    remarkVerses: '✎ أعد التحديد',
    markNext: 'اضغط عند بداية المقطع التالي',
    markStart: 'اضغط عند بداية المقطع الأول',
    markDone: 'تم',
    clearMarks: 'امسح التحديد',
    sendMarks: 'أرسل توقيت المقاطع',
    learnHint:
      'اضغط «حدّد المقاطع» وشغّل التسجيل واضغط الزر كلما بدأ مقطع جديد. بعد ذلك يُضاء المقطع الذي يُرتّل، ويمكنك الضغط على أي مقطع للانتقال إليه أو تكراره.',
    learnReady: 'اضغط على أي مقطع للانتقال إليه.',
    markingProgress: (n: number, total: number) => `المقطع ${n} من ${total}`,
    getApp: 'حمّل تطبيق ألحان',
    notFound: 'لم يتم العثور على هذا اللحن.',
    goHome: 'اذهب إلى الصفحة الرئيسية',
    exit: 'خروج',
    presentHint: 'اضغط على الجانبين أو استخدم ← → للتنقل بين المقاطع',
    previousVerse: 'المقطع السابق',
    nextVerse: 'المقطع التالي',
    shownLanguages: 'اعرض',
  },
};

export const languageLabels: Record<AppLanguage, { key: LanguageType; label: string }[]> = {
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

export const defaultHymnLanguage = (lang: AppLanguage): LanguageType => (lang === 'ar' ? 'arabic' : 'coptic');

// Season titles carry their list number ("5. Kiahk Praises & Season"), which reads oddly on its own
export const withoutNumber = (title: string) => title.replace(/^\d+\.\s*/, '');

export const splitVerses = (text: string) => text.split(/\n\s*\n/).filter((p) => p.trim());

// A paragraph that is only a speaker's name ("Deacon:") is drawn in that speaker's color, like the service books
export type Speaker = 'deacon' | 'people' | 'priest';
export const speakerLabels: Record<string, Speaker> = {
  'Deacon:': 'deacon',
  'People:': 'people',
  'Priest:': 'priest',
  'Ⲡⲓⲇⲓⲁⲕⲱⲛ:': 'deacon',
  'Ⲡⲓⲗⲁⲟⲥ:': 'people',
  'Ⲡⲓⲟⲩⲏⲃ:': 'priest',
  'Pi-diakon:': 'deacon',
  'Pi-laos:': 'people',
  'Pi-ouib:': 'priest',
  'الشماس:': 'deacon',
  'الشعب:': 'people',
  'الكاهن:': 'priest',
  'Esh-shammas:': 'deacon',
  "Esh-sha'b:": 'people',
  'El-kahin:': 'priest',
};
export const speakerOf = (paragraph: string): Speaker | undefined => speakerLabels[paragraph.trim()];

// A verse, with the speaker label that introduces it kept on the line just above it
export interface Verse {
  speaker?: Speaker;
  label?: string;
  text: string;
}

export function toVerses(text: string): Verse[] {
  const verses: Verse[] = [];
  let pending: Verse | null = null;
  for (const paragraph of splitVerses(text)) {
    const speaker = speakerOf(paragraph);
    if (speaker) {
      if (pending) verses.push(pending);
      pending = { speaker, label: paragraph.trim(), text: '' };
    } else {
      verses.push(pending ? { ...pending, text: paragraph } : { text: paragraph });
      pending = null;
    }
  }
  if (pending) verses.push(pending);
  return verses;
}

// Book-like serif for hymn text; Coptic and Arabic letters fall back to the system fonts that have them
export const readerFont = Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia, "Times New Roman", serif' });

// One line of chips that scrolls sideways instead of wrapping onto several rows.
// Right-to-left starts scrolled to the right edge so the first chip is visible.
export function ChipScroller({
  rtl,
  contentStyle,
  children,
}: {
  rtl: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  children: ReactNode;
}) {
  const ref = useRef<ScrollView>(null);
  return (
    <ScrollView
      ref={ref}
      horizontal
      showsHorizontalScrollIndicator={false}
      onContentSizeChange={() => {
        if (rtl) ref.current?.scrollToEnd({ animated: false });
      }}
      style={chipScrollerStyles.scroller}
      contentContainerStyle={[
        chipScrollerStyles.content,
        { flexDirection: rtl ? 'row-reverse' : 'row' },
        contentStyle,
      ]}>
      {children}
    </ScrollView>
  );
}

export const chipScrollerStyles = StyleSheet.create({
  // Runs to the screen edges, past the page's 20px padding
  scroller: { marginHorizontal: -20, flexGrow: 0 },
  content: { flexGrow: 1, alignItems: 'center', gap: 8, paddingHorizontal: 20 },
});

// Keeps the screen on while a hymn is open, so it doesn't dim in the middle of a service
export function KeepScreenAwake() {
  useKeepAwake(undefined, { suppressDeactivateWarnings: true });
  return null;
}

export const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

// Opens a hymn on its own page (also its web address, so it can be shared)
export const hymnHref = (id: string, language?: LanguageType) =>
  ({ pathname: '/hymn/[id]', params: language ? { id: hymnSlug(id), lang: language } : { id: hymnSlug(id) } }) as const;

export const openHymnPage = (id: string, language?: LanguageType) => router.push(hymnHref(id, language));

// Back to the previous screen, or home when the page was opened straight from a link
export const goBackOrHome = () => (router.canGoBack() ? router.back() : router.replace('/'));

// Shown at the bottom of every screen while audio plays, except on the hymn that is playing
export function MiniPlayer({ lang, hideFor }: { lang: AppLanguage; hideFor?: string }) {
  const styles = useThemedStyles(createAlhanStyles);
  const insets = useSafeAreaInsets();
  const queue = useAudioQueue();
  const nowPlaying = currentTrack(queue);
  const t = strings[lang];
  const isRTL = lang === 'ar';
  if (!nowPlaying || `${nowPlaying.hymnId}:${nowPlaying.language}` === hideFor) return null;
  const rowDirection = isRTL ? styles.rowReverse : styles.row;
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;
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
          onPress={() => openHymnPage(nowPlaying.hymnId, nowPlaying.language)}
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
            <Text style={styles.miniButtonText}>{isRTL ? '⏭︎' : '⏮︎'}</Text>
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
            <Text style={styles.miniButtonText}>{isRTL ? '⏮︎' : '⏭︎'}</Text>
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
}

// A scrolling page with the Back button, a title and the mini player
export function ScreenShell({
  lang,
  title,
  subtitle,
  onBack,
  hidePlayerFor,
  scrollRef,
  children,
}: {
  lang: AppLanguage;
  title: string;
  subtitle?: string | null;
  onBack: () => void;
  hidePlayerFor?: string;
  scrollRef?: RefObject<ScrollView | null>;
  children: ReactNode;
}) {
  const styles = useThemedStyles(createAlhanStyles);
  const insets = useSafeAreaInsets();
  const queue = useAudioQueue();
  const nowPlaying = currentTrack(queue);
  const t = strings[lang];
  const isRTL = lang === 'ar';
  const rowDirection = isRTL ? styles.rowReverse : styles.row;
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;
  const showMiniPlayer = !!nowPlaying && `${nowPlaying.hymnId}:${nowPlaying.language}` !== hidePlayerFor;
  return (
    <View style={styles.root}>
      <ScrollView
        ref={scrollRef}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 40 + (showMiniPlayer ? 96 : 0) },
        ]}>
        <Pressable
          onPress={onBack}
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
      <MiniPlayer lang={lang} hideFor={hidePlayerFor} />
    </View>
  );
}

export const createAlhanStyles = (colors: AlhanPalette) => StyleSheet.create({
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
  searchIcon: {
    fontSize: 24,
    color: colors.gold,
  },
  homeContent: {
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  // Everything below the top bar, centered in the space that is left
  homeBody: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: 28,
  },
  topBar: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
  },
  // Only as wide as its contents, so it reads as a small card rather than a banner
  calendarBox: {
    maxWidth: '82%',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  calendarTile: {
    width: 76,
    alignSelf: 'stretch',
    minHeight: 92,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.gold,
    backgroundColor: colors.goldSoft,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  calendarTileDay: {
    fontSize: 34,
    lineHeight: 38,
    fontWeight: '800',
    color: colors.gold,
    fontVariant: ['tabular-nums'],
  },
  calendarTileMonth: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
    marginTop: 2,
  },
  calendarTileYear: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.muted,
    marginTop: 1,
  },
  calendarInfo: {
    flexShrink: 1,
    minWidth: 140,
  },
  calendarSeason: {
    fontSize: 19,
    fontWeight: '800',
    color: colors.gold,
  },
  calendarMeta: {
    fontSize: 14,
    color: colors.muted,
    marginTop: 2,
  },
  calendarNext: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  calendarNextText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  calendarNextWhen: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.gold,
    marginTop: 2,
  },
  searchButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonIcon: {
    fontSize: 26,
    lineHeight: 30,
    color: colors.gold,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 32,
  },
  heroMedallion: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 1,
    borderColor: colors.gold,
    backgroundColor: colors.goldSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  heroCross: {
    fontSize: 40,
    lineHeight: 46,
    color: colors.gold,
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
  ornament: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 18,
  },
  ornamentLine: {
    width: 44,
    height: 1,
    backgroundColor: colors.gold,
    opacity: 0.5,
  },
  ornamentMark: {
    fontSize: 12,
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
  rowNumber: {
    minWidth: 34,
    height: 34,
    paddingHorizontal: 6,
    borderRadius: 17,
    backgroundColor: colors.goldSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowNumberText: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.gold,
    fontVariant: ['tabular-nums'],
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
  compareChips: {
    paddingTop: 2,
    paddingBottom: 16,
  },
  compareLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.muted,
  },
  chipSmall: {
    minHeight: 40,
    paddingHorizontal: 14,
    borderRadius: 20,
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
  textSizeButtons: {
    gap: 8,
  },
  readerChips: {
    paddingTop: 16,
    paddingBottom: 14,
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 14,
  },
  sizeButton: {
    width: 52,
    height: 44,
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
    paddingHorizontal: 22,
    paddingVertical: 24,
  },
  hymnText: {
    color: colors.text,
    fontFamily: readerFont,
  },
  speaker: {
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  arabicText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  // Share / projector / learn
  actionChips: {
    paddingBottom: 14,
  },
  learnPanel: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 10,
  },
  learnRow: {
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
  },
  learnHint: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.muted,
  },
  markButton: {
    minHeight: 64,
    borderRadius: 16,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  markButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.onGold,
    textAlign: 'center',
  },
  learnVerse: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginHorizontal: -10,
    marginBottom: 6,
  },
  learnVerseActive: {
    backgroundColor: colors.goldSoft,
  },
  getAppBanner: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    minHeight: 52,
    borderRadius: 16,
    backgroundColor: colors.gold,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  getAppText: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.onGold,
  },
});
