import { useKeepAwake } from 'expo-keep-awake';
import { router } from 'expo-router';
import { ReactNode, RefObject, useMemo, useRef } from 'react';
import { Modal, PanResponder, Platform, Pressable, ScrollView, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { pressFeedback } from './haptics';
import { BusyPulse } from './busy-pulse';
import { StatusBarBlur } from './status-bar-blur';
import { useTabChrome } from './tab-chrome';
import { AlhanPalette } from '../constants/alhan-colors';
import { LanguageType } from '../data/hymns';
import { hymnSlug } from '../data/search';
import { useThemedStyles } from '../hooks/use-alhan-colors';
import { currentTrack, skip, stopQueue, togglePlay, useAudioQueue } from '../hooks/use-audio-queue';
import { AppLanguage } from '../hooks/use-settings';

// Shared by the home screen, the hymn page and projector mode

export const strings = {
  en: {
    appTitle: 'Coptic Psalmody',
    appSubtitle: 'Hymns & responses in Coptic, English and Arabic',
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
    position: 'Position in the recording',
    goToTime: 'Go to a time',
    repeat: 'Repeat',
    playNext: 'Play next',
    recording: 'Recording',
    melismatic: 'Melismatic',
    sungInEnglish: 'English',
    raisingOfIncense: 'Raising of Incense',
    divineLiturgy: 'Divine Liturgy',
    sections: 'Sections',
    textSize: 'Text size',
    notAvailable: 'Text not available in this language.',
    hasAudio: 'Audio',
    groupCount: (n: number) => (n === 1 ? '1 hymn' : `${n} hymns`),
    next: 'Next',
    openCalendar: 'Coptic calendar',
    supportApp: '♥ Support this app',
    playlistTitle: 'Playlists',
    playlistDesc: (n: number) => (n === 1 ? '1 hymn' : `${n} hymns`),
    playlistsDesc: (n: number) => (n === 1 ? '1 playlist' : `${n} playlists`),
    playlistEmpty: 'This playlist is empty. Open any hymn marked ♪ Audio and tap “Add to playlist”.',
    playlistsEmpty: 'Make playlists of the hymns you love, like SoundCloud: name one below, then open any hymn marked ♪ Audio and tap “Add to playlist”.',
    addToPlaylist: '+ Add to playlist',
    inPlaylist: '✓ In a playlist',
    chooseList: 'Add to which playlist?',
    newPlaylist: '+ New playlist',
    playlistName: 'Playlist name',
    create: 'Create',
    rename: 'Rename',
    save: 'Save',
    cancel: 'Cancel',
    deletePlaylist: 'Delete playlist',
    confirmDelete: (name: string) => `Delete “${name}”? The hymns stay in the app.`,
    shufflePlay: '⤨ Shuffle',
    shuffle: 'Shuffle',
    repeatOff: 'Repeat off',
    repeatAll: 'Repeat all',
    repeatOne: 'Repeat one',
    upNext: 'Up next',
    showWords: 'Show the words',
    back15: 'Back 15 seconds',
    forward15: 'Forward 15 seconds',
    swipeToSkip: 'Swipe left or right to skip',
    close: 'Close',
    addToQueue: 'Add to queue',
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
    download: '⬇ Save offline',
    downloading: 'Downloading…',
    downloaded: '✓ Saved offline',
    downloadFailed: 'Download failed. Check your connection and try again.',
    downloadAll: '⬇ Download all for offline',
    share: '↗ Share',
    copyWords: '⧉ Copy the words',
    copied: '✓ Copied',
    downloadFile: '⬇ Download',
    present: '⛶ Projector',
    previousHymn: 'Previous',
    nextHymn: 'Next',
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
    getApp: 'Get the Coptic Psalmody app',
    notFound: 'This hymn could not be found.',
    goHome: 'Go to the home screen',
    exit: 'Exit',
    presentHint: 'Tap the sides or use ← → to move between verses',
    previousVerse: 'Previous verse',
    nextVerse: 'Next verse',
    shownLanguages: 'Show',
    settings: 'Settings',
    language: 'Language',
    season: 'Season',
    more: 'More',
    textSizeLabel: 'Text size',
    recordingIn: (language: string) => `Recording in ${language}`,
    bishopAddition: 'In the presence of the Pope or a Bishop',
  },
  ar: {
    appTitle: 'التسبحة القبطية',
    appSubtitle: 'الألحان والمردات بالقبطي والعربي والإنجليزي',
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
    position: 'الموضع في التسجيل',
    goToTime: 'انتقل إلى وقت',
    repeat: 'تكرار',
    playNext: 'تشغيل التالي',
    recording: 'تسجيل',
    melismatic: 'ملحن',
    sungInEnglish: 'إنجليزي',
    raisingOfIncense: 'رفع البخور',
    divineLiturgy: 'القداس الإلهي',
    sections: 'الأقسام',
    textSize: 'حجم الخط',
    notAvailable: 'النص غير متوفر بهذه اللغة.',
    hasAudio: 'صوت',
    groupCount: (n: number) => (n === 1 ? 'لحن واحد' : n === 2 ? 'لحنان' : `${String(n).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)])} ألحان`),
    next: 'القادم',
    openCalendar: 'التقويم القبطي',
    supportApp: '♥ ادعم التطبيق',
    playlistTitle: 'قوائم التشغيل',
    playlistDesc: (n: number) => `${n} ${n >= 3 && n <= 10 ? 'ألحان' : 'لحن'}`,
    playlistsDesc: (n: number) => `${n} ${n >= 3 && n <= 10 ? 'قوائم' : 'قائمة'}`,
    playlistEmpty: 'هذه القائمة فارغة. افتح أي لحن عليه ♪ صوت واضغط «أضف إلى قائمة التشغيل».',
    playlistsEmpty: 'اصنع قوائم بالألحان التي تحبها: اكتب اسم قائمة بالأسفل، ثم افتح أي لحن عليه ♪ صوت واضغط «أضف إلى قائمة التشغيل».',
    addToPlaylist: '+ أضف إلى قائمة التشغيل',
    inPlaylist: '✓ في قائمة',
    chooseList: 'أضف إلى أي قائمة؟',
    newPlaylist: '+ قائمة جديدة',
    playlistName: 'اسم القائمة',
    create: 'إنشاء',
    rename: 'إعادة تسمية',
    save: 'حفظ',
    cancel: 'إلغاء',
    deletePlaylist: 'حذف القائمة',
    confirmDelete: (name: string) => `حذف «${name}»؟ تبقى الألحان في التطبيق.`,
    shufflePlay: '⤨ عشوائي',
    shuffle: 'عشوائي',
    repeatOff: 'بدون تكرار',
    repeatAll: 'تكرار الكل',
    repeatOne: 'تكرار اللحن',
    upNext: 'التالي في القائمة',
    showWords: 'اعرض الكلمات',
    back15: 'رجوع ١٥ ثانية',
    forward15: 'تقديم ١٥ ثانية',
    swipeToSkip: 'اسحب يميناً أو يساراً للتخطي',
    close: 'إغلاق',
    addToQueue: 'أضف إلى قائمة الانتظار',
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
    download: '⬇ حفظ بدون إنترنت',
    downloading: 'جارٍ التنزيل…',
    downloaded: '✓ محفوظ بدون إنترنت',
    downloadFailed: 'فشل التنزيل. تحقق من الاتصال وحاول مرة أخرى.',
    downloadAll: '⬇ تنزيل الكل للاستماع بدون إنترنت',
    share: '↗ مشاركة',
    copyWords: '⧉ نسخ الكلمات',
    copied: '✓ تم النسخ',
    downloadFile: '⬇ تنزيل',
    present: '⛶ وضع العرض',
    previousHymn: 'السابق',
    nextHymn: 'التالي',
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
    getApp: 'حمّل تطبيق التسبحة القبطية',
    notFound: 'لم يتم العثور على هذا اللحن.',
    goHome: 'اذهب إلى الصفحة الرئيسية',
    exit: 'خروج',
    presentHint: 'اضغط على الجانبين أو استخدم ← → للتنقل بين المقاطع',
    previousVerse: 'المقطع السابق',
    nextVerse: 'المقطع التالي',
    shownLanguages: 'اعرض',
    settings: 'الإعدادات',
    language: 'اللغة',
    season: 'المناسبة',
    more: 'المزيد',
    textSizeLabel: 'حجم الخط',
    recordingIn: (language: string) => `التسجيل باللغة: ${language}`,
    bishopAddition: 'في حضور البابا أو الأسقف',
  },
};

export const languageLabels: Record<AppLanguage, { key: LanguageType; label: string }[]> = {
  en: [
    { key: 'coptic', label: 'Coptic' },
    { key: 'englishCoptic', label: 'Coptic (English letters)' },
    { key: 'arabicCoptic', label: 'Coptic (Arabic letters)' },
    { key: 'english', label: 'English' },
    { key: 'arabicEnglish', label: 'English (Arabic letters)' },
    { key: 'englishArabic', label: 'Arabic (English letters)' },
    { key: 'arabic', label: 'Arabic' },
  ],
  ar: [
    { key: 'arabic', label: 'عربي' },
    { key: 'coptic', label: 'قبطي' },
    { key: 'englishArabic', label: 'عربي بحروف إنجليزية' },
    { key: 'englishCoptic', label: 'قبطي بحروف إنجليزية' },
    { key: 'arabicCoptic', label: 'قبطي بحروف عربية' },
    { key: 'english', label: 'إنجليزي' },
    { key: 'arabicEnglish', label: 'إنجليزي بحروف عربية' },
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

// Coptic script in the church-book style: a Unicode copy of CS Avva Shenouda, loaded in the root layout.
// It only has Coptic letters, digits and punctuation, so anything else falls back to the system font.
export const copticFont = 'AvvaShenouda';

// A run of Coptic words: Coptic letters with their marks, plus the spaces and punctuation between them
const copticRun = /([\u2C80-\u2CFF\u03E2-\u03EF](?:[\u2C80-\u2CFF\u03E2-\u03EF\u0300-\u036F\uFE20-\uFE2F:.,]|\s(?=[\u2C80-\u2CFF\u03E2-\u03EF]))*)/;

// For titles and labels that mix scripts: the Coptic part in Avva Shenouda, the rest in the surrounding font.
// Use inside a <Text>, e.g. <Text>{withCopticFont(title)}</Text>
export function withCopticFont(text: string): ReactNode {
  if (!copticRun.test(text)) return text;
  return text.split(copticRun).map((part, i) =>
    i % 2 ? (
      <Text key={i} style={copticTitleStyle}>
        {part}
      </Text>
    ) : (
      part
    )
  );
}

const copticTitleStyle = { fontFamily: copticFont, fontWeight: 'normal' } as const;

// One line of chips that scrolls sideways instead of wrapping onto several rows.
// Right-to-left starts scrolled to the right edge so the first chip is visible.
export function ChipScroller({
  rtl,
  contentStyle,
  endFlush,
  children,
}: {
  rtl: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  // Stops at the content's end edge instead of running to the screen edge (something sits beside it)
  endFlush?: boolean;
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
      style={[chipScrollerStyles.scroller, endFlush && (rtl ? { marginLeft: 0 } : { marginRight: 0 })]}
      contentContainerStyle={[
        chipScrollerStyles.content,
        { flexDirection: rtl ? 'row-reverse' : 'row' },
        endFlush && (rtl ? { paddingLeft: 0 } : { paddingRight: 0 }),
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

// A panel that slides up from the bottom with a list of choices; tapping outside closes it
export function Sheet({
  visible,
  title,
  rtl,
  onClose,
  children,
}: {
  visible: boolean;
  title: string;
  rtl: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  const styles = useThemedStyles(createAlhanStyles);
  const insets = useSafeAreaInsets();
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.sheetBackdrop} onPress={onClose} accessibilityRole="button" accessibilityLabel={strings[rtl ? 'ar' : 'en'].close} />
      <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.sheetHandle} />
        <Text style={[styles.sheetTitle, rtl ? styles.alignRight : styles.alignLeft]}>{title}</Text>
        <ScrollView style={styles.sheetList}>{children}</ScrollView>
      </View>
    </Modal>
  );
}

// One choice in a Sheet: a check mark when it is the current one, or something of its own at the end (e.g. a switch)
export function SheetRow({
  label,
  selected,
  rtl,
  onPress,
  end,
}: {
  label: string;
  selected?: boolean;
  rtl: boolean;
  onPress?: () => void;
  end?: ReactNode;
}) {
  const styles = useThemedStyles(createAlhanStyles);
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: !!selected }}
      style={({ pressed }) => [styles.sheetRow, rtl ? styles.rowReverse : styles.row, pressed && styles.sheetRowPressed]}>
      <Text style={[styles.sheetRowText, selected && styles.sheetRowTextSelected, rtl ? styles.alignRight : styles.alignLeft]}>{label}</Text>
      {end ?? (selected ? <Text style={styles.sheetCheck}>✓</Text> : null)}
    </Pressable>
  );
}

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

// What a recording's name says about it: "Melismatic" when its file name says so, "English" when it is sung in English
export const recordingTags = (file: string | null | undefined, language: LanguageType, lang: AppLanguage): string[] => {
  const t = strings[lang];
  return [
    ...(file && /melismatic/i.test(file) ? [t.melismatic] : []),
    ...(language === 'english' || language === 'arabicEnglish' || (file && /english/i.test(file)) ? [t.sungInEnglish] : []),
  ];
};

// The name of a recording's button: the language it is sung in (Coptic, English or Arabic), then "Melismatic" when it is
export const recordingName = (file: string | null | undefined, language: LanguageType, lang: AppLanguage): string => {
  const sung: LanguageType =
    language === 'english' || language === 'arabicEnglish' || (file && /english/i.test(file))
      ? 'english'
      : language === 'arabic' || language === 'englishArabic'
        ? 'arabic'
        : 'coptic';
  const name = languageLabels[lang].find((l) => l.key === sung)?.label ?? '';
  return [name, ...(file && /melismatic/i.test(file) ? [strings[lang].melismatic] : [])].join(' · ');
};

// A hymn's title as the player shows it, with the recording's tags after it (unless the title already says them)
export const recordingTitle = (title: string, file: string | null | undefined, language: LanguageType, lang: AppLanguage) =>
  [title, ...recordingTags(file, language, lang).filter((tag) => !title.toLowerCase().includes(tag.toLowerCase()))].join(' · ');

// Opens a hymn on its own page (also its web address, so it can be shared)
// `follow` keeps Previous and Next on tonight's Midnight or Vesper Praises (see follow-along.ts)
export const hymnHref = (id: string, language?: LanguageType, follow?: { kind: string; night: number }) =>
  ({
    pathname: '/hymn/[id]',
    params: {
      id: hymnSlug(id),
      ...(language ? { lang: language } : {}),
      ...(follow ? { follow: follow.kind, night: String(follow.night) } : {}),
    },
  }) as const;

export const openHymnPage = (id: string, language?: LanguageType) => router.push(hymnHref(id, language));

// Back to the previous screen, or home when the page was opened straight from a link
export const goBackOrHome = () => (router.canGoBack() ? router.back() : router.replace('/'));

// Shown at the bottom of every screen while audio plays, except on the hymn that is playing.
// Inside the tabs on iOS 26 and later the tab bar shows it instead (see TabBarPlayer).
// A horizontal swipe on a player skips to the next or previous hymn in the queue
export function useSwipeToSkip(isRTL: boolean) {
  return useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 24 && Math.abs(g.dx) > Math.abs(g.dy) * 2,
        onPanResponderRelease: (_, g) => {
          if (Math.abs(g.dx) < 60) return;
          pressFeedback();
          skip((g.dx < 0) !== isRTL ? 1 : -1);
        },
      }),
    [isRTL]
  );
}

export function MiniPlayer({ lang, hideFor }: { lang: AppLanguage; hideFor?: string }) {
  const styles = useThemedStyles(createAlhanStyles);
  const chrome = useTabChrome();
  const queue = useAudioQueue();
  const nowPlaying = currentTrack(queue);
  const t = strings[lang];
  const isRTL = lang === 'ar';
  // Swipe the player left for the next hymn and right for the previous one (the other way round in Arabic)
  const swipe = useSwipeToSkip(isRTL);
  if (!chrome.floatingPlayer || !nowPlaying || `${nowPlaying.hymnId}:${nowPlaying.language}` === hideFor) return null;
  const rowDirection = isRTL ? styles.rowReverse : styles.row;
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;
  const { playing, currentTime, duration } = queue.status;
  const progress = duration > 0 ? Math.min(1, currentTime / duration) : 0;
  const hasQueue = queue.tracks.length > 1;
  return (
    <View style={[styles.miniPlayer, { bottom: chrome.playerBottom }]} {...swipe.panHandlers}>
      <View style={styles.miniProgressTrack}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>
      <View style={[styles.miniRow, rowDirection]}>
        <Pressable
          onPress={() => openHymnPage(nowPlaying.hymnId, nowPlaying.language)}
          onLongPress={() => router.push('/now-playing')}
          accessibilityRole="button"
          accessibilityLabel={`${t.nowPlaying}: ${nowPlaying.title}`}
          accessibilityHint={hasQueue ? t.swipeToSkip : undefined}
          style={({ pressed }) => [styles.rowTextWrap, pressed && styles.pressed]}>
          <Text style={[styles.miniLabel, textAlign]}>
            ♪ {t.nowPlaying}
            {hasQueue ? ` · ${queue.index + 1}/${queue.tracks.length}` : ''}
          </Text>
          <Text style={[styles.miniTitle, textAlign]} numberOfLines={1}>
            {withCopticFont(nowPlaying.title)}
          </Text>
        </Pressable>
        {hasQueue ? (
          <Pressable
            onPress={() => {
              pressFeedback();
              skip(-1);
            }}
            accessibilityRole="button"
            accessibilityLabel={t.previousTrack}
            style={({ pressed }) => [styles.miniButton, pressed && styles.pressed]}>
            <Text style={styles.miniButtonText}>{isRTL ? '⏭︎' : '⏮︎'}</Text>
          </Pressable>
        ) : null}
        <Pressable
          onPress={() => {
            pressFeedback();
            togglePlay();
          }}
          accessibilityRole="button"
          accessibilityLabel={playing ? t.pause : t.play}
          accessibilityState={{ busy: queue.status.isBuffering }}
          style={({ pressed }) => [pressed && styles.pressed]}>
          <BusyPulse busy={queue.status.isBuffering} style={styles.miniPlayButton}>
            <Text style={styles.miniPlayIcon}>{playing ? '❚❚' : '▶'}</Text>
          </BusyPulse>
        </Pressable>
        {hasQueue ? (
          <Pressable
            onPress={() => {
              pressFeedback();
              skip(1);
            }}
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
  titleCoptic,
  subtitle,
  onBack,
  hidePlayerFor,
  scrollRef,
  children,
}: {
  lang: AppLanguage;
  title: string;
  // A hymn's Coptic words, in smaller type under its name
  titleCoptic?: string | null;
  subtitle?: string | null;
  // Left out on the tabs' first screens, which have nothing to go back to
  onBack?: () => void;
  hidePlayerFor?: string;
  scrollRef?: RefObject<ScrollView | null>;
  children: ReactNode;
}) {
  const styles = useThemedStyles(createAlhanStyles);
  const insets = useSafeAreaInsets();
  const chrome = useTabChrome();
  const queue = useAudioQueue();
  const nowPlaying = currentTrack(queue);
  const t = strings[lang];
  const isRTL = lang === 'ar';
  const rowDirection = isRTL ? styles.rowReverse : styles.row;
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;
  const showMiniPlayer =
    chrome.floatingPlayer && !!nowPlaying && `${nowPlaying.hymnId}:${nowPlaying.language}` !== hidePlayerFor;
  return (
    // Not collapsable, so iOS finds the scroll view and scrolls it to the top when its tab is tapped again
    <View style={styles.root} collapsable={false}>
      <ScrollView
        ref={scrollRef}
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior={chrome.autoInsets ? 'automatic' : 'never'}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: (chrome.autoInsets ? 0 : insets.top) + 12,
            paddingBottom: chrome.pageBottom + 40 + (showMiniPlayer ? 96 : 0),
          },
        ]}>
        {onBack ? (
          <Pressable
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel={t.back}
            style={({ pressed }) => [styles.backButton, rowDirection, isRTL && styles.selfEnd, pressed && styles.pressed]}>
            <Text style={styles.backArrow}>{isRTL ? '›' : '‹'}</Text>
            <Text style={styles.backText}>{t.back}</Text>
          </Pressable>
        ) : null}
        <Text style={[styles.headerTitle, textAlign]}>{withCopticFont(title)}</Text>
        {titleCoptic ? <Text style={[styles.headerCoptic, textAlign]}>{titleCoptic}</Text> : null}
        {subtitle ? <Text style={[styles.subtitle, textAlign]}>{subtitle}</Text> : null}
        {children}
      </ScrollView>
      <StatusBarBlur />
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
  // Everything below the top bar
  homeBody: {
    paddingTop: 32,
  },
  topBar: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  navTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  calendarBox: {
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 20,
  },
  calendarTile: {
    width: 72,
    alignSelf: 'stretch',
    minHeight: 88,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.goldSoft,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  calendarTileDay: {
    fontSize: 32,
    lineHeight: 36,
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
    fontSize: 18,
    fontWeight: '700',
    color: colors.gold,
  },
  calendarMeta: {
    fontSize: 14,
    color: colors.muted,
    marginTop: 2,
  },
  calendarNext: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
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
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonIcon: {
    fontSize: 20,
    lineHeight: 22,
    color: colors.gold,
  },
  topButtons: {
    alignItems: 'center',
    gap: 8,
  },
  hero: {
    marginBottom: 20,
  },
  heroTitleRow: {
    alignItems: 'center',
    gap: 12,
  },
  heroCross: {
    width: 40,
    height: 40,
  },
  heroTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: colors.text,
  },
  heroSubtitle: {
    fontSize: 16,
    color: colors.muted,
    marginTop: 6,
  },
  // A quiet link under the home tiles to the donation box
  supportLink: {
    alignSelf: 'center',
    marginTop: 28,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  supportLinkText: {
    fontSize: 14,
    color: colors.muted,
  },
  languagePrompt: {
    fontSize: 14,
    color: colors.muted,
    marginBottom: 8,
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

  // Two tiles per row (home sections, seasons, services); an odd last tile stretches across
  tileGrid: {
    flexWrap: 'wrap',
    gap: 12,
  },
  tile: {
    flexBasis: '44%',
    flexGrow: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    paddingVertical: 14,
    paddingHorizontal: 14,
    gap: 6,
  },
  tileSmall: {
    minHeight: 76,
  },
  // The home screen's pictures: small, so the tiles stay tiles on a computer too
  tileImage: {
    width: 54,
    height: 54,
    borderRadius: 16,
    marginBottom: 4,
  },
  tileLead: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.gold,
  },
  tileTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    lineHeight: 23,
  },
  // A hymn's Coptic words under its name
  tileCoptic: {
    fontFamily: copticFont,
    fontSize: 14,
    lineHeight: 20,
    color: colors.muted,
    marginTop: 3,
  },
  // Number on one side, ♪ on the other
  tileTopRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tileAudio: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.gold,
  },
  tileDesc: {
    fontSize: 13,
    color: colors.muted,
    lineHeight: 18,
  },

  // "Follow tonight's Midnight Praises" at the top of the praises' lists
  followCard: {
    alignItems: 'center',
    gap: 14,
    padding: 16,
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  followCardIcon: { fontSize: 22, color: colors.gold },
  followCardTitle: { fontSize: 17, fontWeight: '700', color: colors.text },

  // Lists of seasons, services and hymns: rows in one rounded panel, divided by thin lines, like a phone's own lists
  listGroup: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: 8,
  },
  listRow: {
    alignItems: 'center',
    gap: 14,
    minHeight: 64,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  listRowPressed: {
    backgroundColor: colors.surfacePressed,
  },
  listDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  // A season's picture
  listThumb: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  listLead: {
    minWidth: 30,
    height: 30,
    paddingHorizontal: 6,
    borderRadius: 15,
    backgroundColor: colors.goldSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listLeadText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.gold,
    fontVariant: ['tabular-nums'],
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    lineHeight: 24,
  },
  listSub: {
    fontSize: 14,
    color: colors.muted,
    lineHeight: 19,
    marginTop: 2,
  },
  listEnd: {
    alignItems: 'center',
    gap: 8,
  },
  listAudio: {
    fontSize: 16,
    color: colors.gold,
  },
  listChevron: {
    fontSize: 26,
    color: colors.muted,
    fontWeight: '300',
    marginTop: -2,
  },
  // The seasons as small cards side by side: two on a phone, more on a wide screen
  seasonGrid: {
    flexWrap: 'wrap',
    gap: 10,
  },
  seasonCard: {
    flexGrow: 1,
    flexBasis: '45%',
    minWidth: 150,
    maxWidth: 360,
    alignItems: 'center',
    gap: 10,
    minHeight: 64,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 32,
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  // A round picture
  seasonCardImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  seasonCardTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 19,
    color: colors.text,
  },
  // A season's picture and when it is prayed, above its list of services
  seasonHeader: {
    alignItems: 'center',
    gap: 16,
    marginTop: 4,
    marginBottom: 18,
  },
  seasonHeaderImage: {
    width: 84,
    height: 84,
    borderRadius: 20,
  },
  seasonHeaderAbout: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    color: colors.muted,
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
    lineHeight: 36,
  },
  headerCoptic: {
    fontFamily: copticFont,
    fontSize: 19,
    lineHeight: 26,
    color: colors.text,
    opacity: 0.8,
    marginTop: 4,
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
    fontSize: 14,
    fontWeight: '800',
    color: colors.gold,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
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
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 8,
  },
  audioTopRow: {
    alignItems: 'center',
    gap: 16,
  },
  playButton: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  playIcon: {
    fontSize: 22,
    color: colors.onGold,
    fontWeight: '800',
  },
  audioPlayerMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 28,
    marginVertical: 10,
  },
  audioSkipButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioSkipIcon: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  audioPillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  audioPill: {
    minHeight: 36,
    paddingHorizontal: 14,
    borderRadius: 18,
    backgroundColor: colors.background,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioPillActive: {
    backgroundColor: colors.goldSoft,
    borderColor: colors.gold,
  },
  audioPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.muted,
  },
  audioPillTextActive: {
    color: colors.gold,
    fontWeight: '700',
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.border,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.gold,
  },
  // Two buttons to a row on a phone, so each one has room for its words
  audioControls: {
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  controlButton: {
    flexGrow: 1,
    flexBasis: '45%',
    minHeight: 44,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
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
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  controlTextActive: {
    color: colors.gold,
  },
  // Playlist and download, side by side under the controls
  audioActions: {
    gap: 8,
    marginTop: 8,
  },
  audioAction: {
    flex: 1,
    marginTop: 0,
    paddingHorizontal: 10,
  },
  playlistButton: {
    minHeight: 44,
    marginTop: 8,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  followOrderButton: {
    minHeight: 48,
    borderRadius: 14,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  followOrderButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.onGold,
  },
  praiseHintText: {
    fontSize: 13,
    color: colors.muted,
    textAlign: 'center',
    marginBottom: 12,
  },

  // Mini player
  miniPlayer: {
    position: 'absolute',
    left: 12,
    right: 12,
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  miniProgressTrack: {
    height: 2.5,
    backgroundColor: colors.border,
  },
  miniRow: {
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  miniLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.gold,
  },
  miniTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginTop: 1,
  },
  miniButton: {
    width: 40,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniButtonText: {
    fontSize: 18,
    color: colors.text,
  },
  miniPlayButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniPlayIcon: {
    fontSize: 18,
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
  // Previous / next hymn, under the text
  hymnNav: {
    gap: 10,
    marginTop: 16,
  },
  hymnNavButton: {
    flex: 1,
    minHeight: 64,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingVertical: 10,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  hymnNavLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.gold,
    marginBottom: 2,
  },
  hymnNavTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    lineHeight: 21,
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
    gap: 10,
    marginBottom: 16,
  },
  toolbarChips: {
    flex: 1,
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
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.gold,
    paddingTop: 22,
    paddingBottom: 8,
    paddingHorizontal: 2,
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
  copticText: {
    fontFamily: copticFont,
    fontWeight: 'normal',
  },
  // What is added in the presence of the Pope or a bishop, folded under the hymn
  bishopCard: {
    marginTop: 18,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  bishopHeader: {
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    minHeight: 54,
    paddingHorizontal: 16,
  },
  bishopTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: colors.gold,
  },
  bishopToggle: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.gold,
  },
  bishopBody: {
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  // Bottom sheets
  sheetBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  sheet: {
    maxHeight: '75%',
    backgroundColor: colors.background,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.border,
    marginBottom: 12,
  },
  sheetTitle: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.gold,
    marginBottom: 6,
  },
  sheetList: {
    flexGrow: 0,
  },
  sheetRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    minHeight: 52,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  sheetRowPressed: {
    opacity: 0.6,
  },
  sheetRowText: {
    flex: 1,
    fontSize: 17,
    color: colors.text,
  },
  sheetRowTextSelected: {
    color: colors.gold,
    fontWeight: '700',
  },
  sheetCheck: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.gold,
  },
  // The reader's row of pickers: language, season, more
  readerBar: {
    alignItems: 'center',
    gap: 8,
    paddingTop: 16,
    paddingBottom: 14,
  },
  pickerButton: {
    flexShrink: 1,
    minHeight: 44,
    paddingHorizontal: 14,
    borderRadius: 22,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  pickerButtonText: {
    flexShrink: 1,
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  pickerCaret: {
    fontSize: 12,
    color: colors.gold,
  },
  moreButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreButtonText: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.gold,
    lineHeight: 22,
  },
  // Reader language chips bar
  readerLanguageRow: {
    paddingTop: 14,
    paddingBottom: 8,
    gap: 8,
  },
  readerChip: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 40,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 6,
  },
  readerChipActive: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  readerChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  readerChipTextActive: {
    color: colors.onGold,
    fontWeight: '800',
  },
  readerChipCaret: {
    fontSize: 11,
    color: colors.onGold,
    fontWeight: '800',
  },
  // Open action toolbar (side by side, learn, project, text scale, more)
  readerActionsRow: {
    paddingTop: 2,
    paddingBottom: 12,
    gap: 8,
  },
  actionToolbarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 38,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 6,
  },
  actionToolbarButtonActive: {
    borderColor: colors.gold,
    backgroundColor: colors.goldSoft,
  },
  actionToolbarButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  actionToolbarButtonTextActive: {
    color: colors.gold,
    fontWeight: '800',
  },
  textSizeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  textSizeBtn: {
    minWidth: 38,
    paddingHorizontal: 8,
  },
  moreCircleButton: {
    width: 38,
    height: 38,
    paddingHorizontal: 0,
    borderRadius: 19,
  },
  moreCircleText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.gold,
    lineHeight: 18,
  },
  // Header on top of the text card showing active language
  textCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  textCardLangBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: colors.goldSoft,
    borderWidth: 1,
    borderColor: colors.gold,
  },
  textCardLangText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.gold,
    letterSpacing: 0.2,
  },
  textCardLangCaret: {
    fontSize: 12,
    color: colors.gold,
    fontWeight: '700',
  },
  // Share / projector / learn
  actionChips: {
    paddingVertical: 2,
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
