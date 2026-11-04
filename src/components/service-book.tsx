import { RefObject, useEffect, useRef } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { createAlhanStyles, Sheet, Speaker, toVerses, Verse, withCopticFont } from './alhan-ui';
import { tapFeedback } from './haptics';
import { useTabChrome } from './tab-chrome';
import { AlhanPalette } from '../constants/alhan-colors';
import { displayTitle } from '../data/arabic-titles';
import { titleLines } from '../data/hymn-titles';
import { Hymn, LanguageType } from '../data/hymns';
import { BookEntry } from '../data/service-book';
import { useAlhanColors, useThemedStyles } from '../hooks/use-alhan-colors';
import { AppLanguage, updateSettings, useSettings } from '../hooks/use-settings';

// Follow along, as in Spirit & Truth: the switch in the hymn reader that opens the hymn out into its whole service on
// one page, the languages side by side verse by verse, with Contents to jump to any part (see service-book.ts)

export const bookStrings = {
  en: { toggle: 'Follow along', hint: 'The whole service on one page', contents: 'Contents', play: 'Play from here', noText: 'No words yet' },
  ar: { toggle: 'تتبع الصلاة', hint: 'الصلاة كلها في صفحة واحدة', contents: 'المحتويات', play: 'شغّل من هنا', noText: 'لا توجد كلمات بعد' },
};

const ARABIC_SCRIPT: LanguageType[] = ['arabic', 'arabicCoptic', 'arabicEnglish'];
const plainText = (hymn: Hymn, language: LanguageType) =>
  (hymn.versions.find((v) => v.language === language)?.text ?? '').replace(/(?:\\n)+/g, '\n\n');

// The small on/off switch in the reader's row of buttons, remembered for every hymn
export function FollowAlongSwitch({ lang }: { lang: AppLanguage }) {
  const settings = useSettings();
  const shared = useThemedStyles(createAlhanStyles);
  const styles = useThemedStyles(createStyles);
  const t = bookStrings[lang];
  const on = settings.followAlong;
  return (
    <Pressable
      onPress={() => {
        tapFeedback();
        updateSettings({ followAlong: !on });
      }}
      accessibilityRole="switch"
      accessibilityState={{ checked: on }}
      accessibilityLabel={t.toggle}
      accessibilityHint={t.hint}
      style={({ pressed }) => [shared.actionToolbarButton, on && shared.actionToolbarButtonActive, pressed && shared.pressed]}>
      <Text style={[shared.actionToolbarButtonText, on && shared.actionToolbarButtonTextActive]}>{t.toggle}</Text>
      <View style={[styles.miniTrack, on && styles.miniTrackOn]}>
        <View style={[styles.miniKnob, on && styles.miniKnobOn]} />
      </View>
    </Pressable>
  );
}

// Every part of the book, one after another, straight on the page (so their places are places on the page).
// The current part is outlined and scrolled to; tapping a part makes it the current one, ▶ plays from it.
export function ServiceBook({
  book,
  currentId,
  playingId,
  languages,
  lang,
  scrollRef,
  onPlace,
  onSelect,
  onPlay,
}: {
  book: BookEntry[];
  currentId: string;
  playingId?: string;
  // The columns, side by side
  languages: LanguageType[];
  lang: AppLanguage;
  scrollRef: RefObject<ScrollView | null>;
  // Hears where each part and header is, for Contents
  onPlace: (id: string, y: number) => void;
  onSelect: (hymn: Hymn) => void;
  onPlay?: (hymn: Hymn) => void;
}) {
  const settings = useSettings();
  const colors = useAlhanColors();
  const shared = useThemedStyles(createAlhanStyles);
  const styles = useThemedStyles(createStyles);
  const insets = useSafeAreaInsets();
  const t = bookStrings[lang];
  const isRTL = lang === 'ar';
  const rowDirection = isRTL ? shared.rowReverse : shared.row;
  const textAlign = isRTL ? shared.alignRight : shared.alignLeft;

  // Scrolled to the current part once it has its place on the page, and again whenever another part becomes current
  const scrolledTo = useRef<string | null>(null);
  const positions = useRef<Record<string, number>>({});
  const placed = (id: string, y: number) => {
    positions.current[id] = y;
    onPlace(id, y);
    if (id === currentId && scrolledTo.current !== currentId) {
      scrolledTo.current = currentId;
      scrollRef.current?.scrollTo({ y: Math.max(0, y - insets.top - 8), animated: false });
    }
  };
  useEffect(() => {
    const y = positions.current[currentId];
    if (scrolledTo.current === currentId || y === undefined) return;
    scrolledTo.current = currentId;
    scrollRef.current?.scrollTo({ y: Math.max(0, y - insets.top - 8), animated: true });
  }, [currentId, scrollRef, insets.top]);

  const columns = languages.length;
  const size = 20 * settings.textScale * (columns > 1 ? 0.8 : 0.9);
  const speakerColor: Record<Speaker, string> = { deacon: colors.gold, people: colors.people, priest: colors.priest };
  const columnStyle = (language: LanguageType) => [
    shared.hymnText,
    { fontSize: size, lineHeight: size * 1.6 },
    ARABIC_SCRIPT.includes(language) ? shared.arabicText : shared.alignLeft,
    language === 'coptic' && shared.copticText,
  ];
  const verseContent = (verse: Verse | undefined) =>
    verse ? (
      <>
        {verse.speaker ? (
          <Text style={[shared.speaker, { color: speakerColor[verse.speaker] }]}>
            {verse.label}
            {verse.text ? '\n' : ''}
          </Text>
        ) : null}
        {verse.text}
      </>
    ) : null;

  return (
    <>
      {book.map((entry) => {
        if (entry.kind === 'header')
          return (
            <View
              key={`h-${entry.id}`}
              onLayout={(e) => placed(entry.id, e.nativeEvent.layout.y)}
              style={[shared.sectionHeader, rowDirection]}>
              <Text style={shared.sectionHeaderText}>{withCopticFont(displayTitle(entry.title, lang))}</Text>
              <View style={shared.sectionLine} />
            </View>
          );
        const hymn = entry.hymn;
        const { main, coptic } = titleLines(hymn, lang, settings.titleStyle);
        const verses = languages.map((l) => toVerses(plainText(hymn, l)));
        const rows = Math.max(0, ...verses.map((v) => v.length));
        const isCurrent = hymn.id === currentId;
        const hasAudio = !!onPlay && hymn.versions.some((v) => v.audio);
        return (
          <View
            key={hymn.id}
            onLayout={(e) => placed(hymn.id, e.nativeEvent.layout.y)}
            style={[styles.part, isCurrent && styles.partCurrent, hymn.id === playingId && styles.partPlaying]}>
            <Pressable
              onPress={() => !isCurrent && onSelect(hymn)}
              accessibilityRole="button"
              accessibilityState={{ selected: isCurrent }}
              accessibilityLabel={main}
              style={({ pressed }) => [styles.partInner, pressed && !isCurrent && styles.partPressed]}>
              <View style={[styles.partHead, hasAudio && (isRTL ? styles.roomLeft : styles.roomRight)]}>
                <Text style={[styles.partTitle, textAlign]}>{withCopticFont(main)}</Text>
                {coptic ? <Text style={[shared.tileCoptic, textAlign]}>{coptic}</Text> : null}
              </View>
              {rows === 0 ? <Text style={[styles.noText, textAlign]}>{t.noText}</Text> : null}
              {Array.from({ length: rows }, (_, i) => (
                <View key={i} style={[rowDirection, styles.verseRow, i > 0 && styles.verseDivider]}>
                  {languages.map((l, c) => (
                    <Text key={l} style={[columnStyle(l), styles.column]}>
                      {verseContent(verses[c][i])}
                    </Text>
                  ))}
                </View>
              ))}
            </Pressable>
            {hasAudio ? (
              <Pressable
                onPress={() => onPlay!(hymn)}
                accessibilityRole="button"
                accessibilityLabel={`${t.play}: ${main}`}
                hitSlop={8}
                style={({ pressed }) => [styles.play, isRTL ? styles.playLeft : styles.playRight, pressed && shared.pressed]}>
                <Text style={styles.playText}>{hymn.id === playingId ? '♪' : '▶'}</Text>
              </Pressable>
            ) : null}
          </View>
        );
      })}
    </>
  );
}

// The floating Contents button and its list: tap a name to jump to it
export function ServiceBookContents({
  book,
  currentId,
  lang,
  open,
  onOpen,
  onClose,
  onJump,
}: {
  book: BookEntry[];
  currentId: string;
  lang: AppLanguage;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onJump: (id: string) => void;
}) {
  const settings = useSettings();
  const shared = useThemedStyles(createAlhanStyles);
  const styles = useThemedStyles(createStyles);
  const chrome = useTabChrome();
  const t = bookStrings[lang];
  const isRTL = lang === 'ar';
  const textAlign = isRTL ? shared.alignRight : shared.alignLeft;
  return (
    <>
      <Pressable
        onPress={() => {
          tapFeedback();
          onOpen();
        }}
        accessibilityRole="button"
        accessibilityLabel={t.contents}
        style={({ pressed }) => [
          styles.contentsButton,
          isRTL ? { left: 20 } : { right: 20 },
          { bottom: chrome.playerBottom + 84 },
          pressed && shared.pressed,
        ]}>
        <Text style={styles.contentsButtonText}>☰ {t.contents}</Text>
      </Pressable>
      <Sheet visible={open} title={t.contents} rtl={isRTL} onClose={onClose}>
        {book.map((entry) =>
          entry.kind === 'header' ? (
            <Text key={`h-${entry.id}`} style={[shared.sectionHeaderText, styles.contentsHeader, textAlign]}>
              {withCopticFont(displayTitle(entry.title, lang))}
            </Text>
          ) : (
            <Pressable
              key={entry.hymn.id}
              onPress={() => onJump(entry.hymn.id)}
              accessibilityRole="button"
              accessibilityState={{ selected: entry.hymn.id === currentId }}
              style={({ pressed }) => [shared.sheetRow, isRTL ? shared.rowReverse : shared.row, pressed && shared.sheetRowPressed]}>
              <Text style={[shared.sheetRowText, entry.hymn.id === currentId && shared.sheetRowTextSelected, textAlign]}>
                {withCopticFont(titleLines(entry.hymn, lang, settings.titleStyle).main)}
              </Text>
              {entry.hymn.id === currentId ? <Text style={shared.sheetCheck}>✓</Text> : null}
            </Pressable>
          )
        )}
      </Sheet>
    </>
  );
}

const createStyles = (colors: AlhanPalette) =>
  StyleSheet.create({
    miniTrack: { width: 30, height: 18, borderRadius: 9, backgroundColor: colors.border, padding: 2, justifyContent: 'center' },
    miniTrackOn: { backgroundColor: colors.gold },
    miniKnob: { width: 14, height: 14, borderRadius: 7, backgroundColor: colors.surface },
    miniKnobOn: { alignSelf: 'flex-end' },
    part: {
      marginHorizontal: -12,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: 'transparent',
      borderBottomColor: colors.border,
    },
    partCurrent: { borderColor: colors.gold, backgroundColor: colors.surface },
    partPlaying: { borderColor: colors.gold },
    partInner: { paddingVertical: 14, paddingHorizontal: 12, borderRadius: 14 },
    partPressed: { backgroundColor: colors.surface },
    partHead: { marginBottom: 8 },
    partTitle: { fontSize: 16, fontWeight: '800', color: colors.gold },
    roomRight: { paddingRight: 48 },
    roomLeft: { paddingLeft: 48 },
    verseRow: { alignItems: 'flex-start', gap: 14 },
    verseDivider: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border, marginTop: 10, paddingTop: 10 },
    column: { flex: 1 },
    noText: { fontSize: 15, color: colors.muted },
    play: {
      position: 'absolute',
      top: 10,
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.gold,
      alignItems: 'center',
      justifyContent: 'center',
    },
    playRight: { right: 10 },
    playLeft: { left: 10 },
    playText: { fontSize: 15, color: colors.gold },
    contentsButton: {
      position: 'absolute',
      minHeight: 46,
      paddingHorizontal: 18,
      borderRadius: 23,
      backgroundColor: colors.gold,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.25,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 3 },
      elevation: 4,
    },
    contentsButtonText: { fontSize: 16, fontWeight: '800', color: colors.onGold },
    contentsHeader: { marginTop: 16, marginBottom: 4, paddingHorizontal: 4 },
  });
