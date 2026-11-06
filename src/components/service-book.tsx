import { ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { createAlhanStyles, languageLabels, Sheet, SheetRow, Speaker, toVerses, Verse, withCopticFont } from './alhan-ui';
import { tapFeedback } from './haptics';
import { useTabChrome } from './tab-chrome';
import { AlhanPalette } from '../constants/alhan-colors';
import { displayTitle } from '../data/arabic-titles';
import { titleLines } from '../data/hymn-titles';
import { Hymn, LanguageType } from '../data/hymns';
import { BookEntry, doxologyId, PartKind } from '../data/service-book';
import { useAlhanColors, useThemedStyles } from '../hooks/use-alhan-colors';
import { AppLanguage, updateSettings, useSettings } from '../hooks/use-settings';

// Follow along, as in Spirit & Truth: the switch in the hymn reader that opens the hymn out into its whole service on
// one page, the languages side by side verse by verse, with Contents to jump to any part (see service-book.ts)

export const bookStrings = {
  en: {
    toggle: 'Follow along',
    hint: 'The whole service on one page',
    contents: 'Contents',
    play: 'Play from here',
    noText: 'No words yet',
    languages: 'Languages',
    column: (n: number) => `Column ${n}`,
    addColumn: 'Add a column',
    remove: 'Remove',
    show: 'Show',
    kinds: { doxologies: 'Doxologies', psalis: 'Psalis', lobsh: 'Lobsh', expositions: 'Expositions' } as Record<PartKind, string>,
  },
  ar: {
    toggle: 'تتبع الصلاة',
    hint: 'الصلاة كلها في صفحة واحدة',
    contents: 'المحتويات',
    play: 'شغّل من هنا',
    noText: 'لا توجد كلمات بعد',
    languages: 'اللغات',
    column: (n: number) => `العمود ${String(n).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)])}`,
    addColumn: 'أضف عمودًا',
    remove: 'احذف',
    show: 'إظهار',
    kinds: { doxologies: 'الذكصولوجيات', psalis: 'الإبصاليات', lobsh: 'اللبش', expositions: 'التفاسير' } as Record<PartKind, string>,
  },
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

// The columns shown side by side, and what each can be changed to (chosen in the Languages sheet)
export type BookColumns = {
  columns: LanguageType[];
  // The languages each column could show instead
  options: LanguageType[][];
  onSet: (column: number, language: LanguageType) => void;
  // Undefined when no more columns can be added (three at most, or no other language)
  onAdd?: () => void;
  onRemove: (column: number) => void;
};

// What Midnight and Vesper Praises can leave out: whole kinds, and single doxologies (keys as in service-book.ts)
export type BookHiding = {
  kinds: PartKind[];
  doxologies: Hymn[];
  hidden: readonly string[];
  onToggle: (key: string) => void;
};

// Every part of the book, one after another, straight on the page (so their places are places on the page).
// Laid out like a service book: each part's name centred over its words, the languages in columns with a fine rule
// between them, the current part marked by a gold bar at its side; tap a part to make it current, ▶ plays from it.
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
  const size = 20 * settings.textScale * (columns > 2 ? 0.72 : columns > 1 ? 0.8 : 0.9);
  const speakerColor: Record<Speaker, string> = { deacon: colors.gold, people: colors.people, priest: colors.priest };
  const columnStyle = (language: LanguageType) => [
    shared.hymnText,
    { fontSize: size, lineHeight: size * 1.55 },
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
  // The columns in reading order (in Arabic the first column is on the right)
  const ordered = (cells: ReactNode[]) => {
    const out: ReactNode[] = [];
    cells.forEach((cell, c) => {
      if (c > 0) out.push(<View key={`rule-${c}`} style={styles.columnRule} />);
      out.push(cell);
    });
    return <View style={[rowDirection, styles.verseRow]}>{out}</View>;
  };
  const label = (language: LanguageType) => languageLabels[lang].find((l) => l.key === language)?.label ?? language;

  return (
    <>
      {columns > 1 ? (
        <View style={styles.columnHeads}>
          {ordered(
            languages.map((l) => (
              <Text key={l} style={[styles.columnHead, ARABIC_SCRIPT.includes(l) ? shared.alignRight : shared.alignLeft]} numberOfLines={1}>
                {label(l)}
              </Text>
            ))
          )}
        </View>
      ) : null}
      {book.map((entry) => {
        if (entry.kind === 'header')
          return (
            <View
              key={`h-${entry.id}`}
              onLayout={(e) => placed(entry.id, e.nativeEvent.layout.y)}
              style={[shared.row, styles.bookHeader]}>
              <View style={styles.bookHeaderLine} />
              <Text style={styles.bookHeaderText}>{withCopticFont(displayTitle(entry.title, lang))}</Text>
              <View style={styles.bookHeaderLine} />
            </View>
          );
        const hymn = entry.hymn;
        const { main, coptic } = titleLines(hymn, lang, settings.titleStyle);
        const verses = languages.map((l) => toVerses(plainText(hymn, l)));
        const rows = Math.max(0, ...verses.map((v) => v.length));
        const isCurrent = hymn.id === currentId;
        const isPlaying = hymn.id === playingId;
        const hasAudio = !!onPlay && hymn.versions.some((v) => v.audio);
        return (
          <View
            key={hymn.id}
            onLayout={(e) => placed(hymn.id, e.nativeEvent.layout.y)}
            style={[styles.part, (isCurrent || isPlaying) && styles.partCurrent, (isCurrent || isPlaying) && (isRTL ? styles.barRight : styles.barLeft)]}>
            <Pressable
              onPress={() => !isCurrent && onSelect(hymn)}
              accessibilityRole="button"
              accessibilityState={{ selected: isCurrent }}
              accessibilityLabel={main}
              style={({ pressed }) => [styles.partInner, pressed && !isCurrent && styles.partPressed]}>
              <View style={[styles.partHead, hasAudio && styles.partHeadRoom]}>
                <Text style={styles.partTitle}>{withCopticFont(main)}</Text>
                {coptic ? <Text style={[shared.tileCoptic, styles.partCoptic]}>{coptic}</Text> : null}
                <View style={styles.titleRule} />
              </View>
              {rows === 0 ? <Text style={styles.noText}>{t.noText}</Text> : null}
              {Array.from({ length: rows }, (_, i) => (
                <View key={i}>
                  {ordered(
                    languages.map((l, c) => (
                      <Text key={l} style={[columnStyle(l), styles.column, i > 0 && styles.verseGap]}>
                        {verseContent(verses[c][i])}
                      </Text>
                    ))
                  )}
                </View>
              ))}
            </Pressable>
            {hasAudio ? (
              <Pressable
                onPress={() => onPlay!(hymn)}
                accessibilityRole="button"
                accessibilityLabel={`${t.play}: ${main}`}
                hitSlop={10}
                style={({ pressed }) => [styles.play, isPlaying && styles.playOn, isRTL ? styles.playLeft : styles.playRight, pressed && shared.pressed]}>
                <Text style={[styles.playText, isPlaying && styles.playTextOn]}>{isPlaying ? '♪' : '▶'}</Text>
              </Pressable>
            ) : null}
          </View>
        );
      })}
    </>
  );
}

// The floating Contents and Languages buttons and their sheets: tap a name to jump to it; choose each column's language,
// add a column (three at most) or take one away
export function ServiceBookContents({
  book,
  currentId,
  lang,
  open,
  onOpen,
  onClose,
  onJump,
  columns,
  hiding,
}: {
  book: BookEntry[];
  currentId: string;
  lang: AppLanguage;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onJump: (id: string) => void;
  columns: BookColumns;
  hiding?: BookHiding;
}) {
  const settings = useSettings();
  const shared = useThemedStyles(createAlhanStyles);
  const styles = useThemedStyles(createStyles);
  const chrome = useTabChrome();
  const t = bookStrings[lang];
  const isRTL = lang === 'ar';
  const textAlign = isRTL ? shared.alignRight : shared.alignLeft;
  const rowDirection = isRTL ? shared.rowReverse : shared.row;
  const [languagesOpen, setLanguagesOpen] = useState(false);
  // The column whose language is being chosen, or null for the list of columns
  const [editing, setEditing] = useState<number | null>(null);
  const label = (language: LanguageType) => languageLabels[lang].find((l) => l.key === language)?.label ?? language;
  const closeLanguages = () => {
    setLanguagesOpen(false);
    setEditing(null);
  };
  // One thing to show or hide, with a small switch; a single doxology sits indented under Doxologies
  const switchRow = (text: string, on: boolean, onPress: () => void, indented: boolean, key?: string) => (
    <Pressable
      key={key}
      onPress={() => {
        tapFeedback();
        onPress();
      }}
      accessibilityRole="switch"
      accessibilityState={{ checked: on }}
      accessibilityLabel={text}
      style={({ pressed }) => [shared.sheetRow, rowDirection, indented && (isRTL ? styles.indentRight : styles.indentLeft), pressed && shared.sheetRowPressed]}>
      <Text style={[indented ? styles.switchLabelSmall : shared.sheetRowText, !on && styles.switchLabelOff, textAlign, { flex: 1 }]}>
        {withCopticFont(text)}
      </Text>
      <View style={[styles.miniTrack, on && styles.miniTrackOn]}>
        <View style={[styles.miniKnob, on && styles.miniKnobOn]} />
      </View>
    </Pressable>
  );
  const floating = (text: string, onPress: () => void) => (
    <Pressable
      onPress={() => {
        tapFeedback();
        onPress();
      }}
      accessibilityRole="button"
      accessibilityLabel={text}
      style={({ pressed }) => [styles.floatingButton, pressed && shared.pressed]}>
      <Text style={styles.floatingButtonText}>{text}</Text>
    </Pressable>
  );
  return (
    <>
      <View style={[styles.floatingRow, rowDirection, isRTL ? { left: 20 } : { right: 20 }, { bottom: chrome.playerBottom + 84 }]}>
        {floating(`Aa ${t.languages}`, () => setLanguagesOpen(true))}
        {floating(`☰ ${t.contents}`, onOpen)}
      </View>
      <Sheet visible={open} title={t.contents} rtl={isRTL} onClose={onClose}>
        {hiding && hiding.kinds.length ? (
          <View style={styles.hidePanel}>
            <Text style={[shared.sectionHeaderText, styles.contentsHeader, textAlign]}>{t.show}</Text>
            {hiding.kinds.map((kind) => {
              const shown = !hiding.hidden.includes(kind);
              return (
                <View key={kind}>
                  {switchRow(t.kinds[kind], shown, () => hiding.onToggle(kind), false)}
                  {kind === 'doxologies' && shown
                    ? hiding.doxologies.map((h) =>
                        switchRow(
                          titleLines(h, lang, 'english').main,
                          !hiding.hidden.includes(doxologyId(h)),
                          () => hiding.onToggle(doxologyId(h)),
                          true,
                          h.id
                        )
                      )
                    : null}
                </View>
              );
            })}
          </View>
        ) : null}
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
              style={({ pressed }) => [shared.sheetRow, rowDirection, pressed && shared.sheetRowPressed]}>
              <Text style={[shared.sheetRowText, entry.hymn.id === currentId && shared.sheetRowTextSelected, textAlign]}>
                {withCopticFont(titleLines(entry.hymn, lang, settings.titleStyle).main)}
              </Text>
              {entry.hymn.id === currentId ? <Text style={shared.sheetCheck}>✓</Text> : null}
            </Pressable>
          )
        )}
      </Sheet>
      <Sheet
        visible={languagesOpen}
        title={editing === null ? t.languages : t.column(editing + 1)}
        rtl={isRTL}
        onClose={closeLanguages}>
        {editing === null ? (
          <>
            {columns.columns.map((language, c) => (
              <View key={language} style={[rowDirection, styles.columnRow]}>
                <Pressable
                  onPress={() => setEditing(c)}
                  accessibilityRole="button"
                  accessibilityLabel={`${t.column(c + 1)}: ${label(language)}`}
                  style={({ pressed }) => [styles.columnPick, rowDirection, pressed && shared.sheetRowPressed]}>
                  <Text style={[styles.columnNumber]}>{isRTL ? String(c + 1).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]) : c + 1}</Text>
                  <Text style={[shared.sheetRowText, textAlign]}>{label(language)}</Text>
                  <Text style={styles.caret}>▾</Text>
                </Pressable>
                {columns.columns.length > 1 ? (
                  <Pressable
                    onPress={() => columns.onRemove(c)}
                    accessibilityRole="button"
                    accessibilityLabel={`${t.remove}: ${label(language)}`}
                    hitSlop={8}
                    style={({ pressed }) => [styles.removeButton, pressed && shared.pressed]}>
                    <Text style={styles.removeText}>✕</Text>
                  </Pressable>
                ) : null}
              </View>
            ))}
            {columns.onAdd ? (
              <SheetRow rtl={isRTL} label={`＋ ${t.addColumn}`} onPress={columns.onAdd} />
            ) : null}
          </>
        ) : (
          <>
            <SheetRow rtl={isRTL} label={`${isRTL ? '›' : '‹'} ${t.languages}`} onPress={() => setEditing(null)} />
            {[columns.columns[editing], ...(columns.options[editing] ?? [])].map((language) => (
              <SheetRow
                key={language}
                rtl={isRTL}
                label={label(language)}
                selected={language === columns.columns[editing]}
                onPress={() => {
                  if (language !== columns.columns[editing]) columns.onSet(editing, language);
                  setEditing(null);
                }}
              />
            ))}
          </>
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
    // A service book's page: no boxes, the current part marked by a gold bar at its side
    part: { marginHorizontal: -12, marginBottom: 6 },
    partCurrent: { backgroundColor: colors.surface, borderRadius: 4 },
    barLeft: { borderLeftWidth: 3, borderLeftColor: colors.gold },
    barRight: { borderRightWidth: 3, borderRightColor: colors.gold },
    partInner: { paddingTop: 18, paddingBottom: 20, paddingHorizontal: 12 },
    partPressed: { backgroundColor: colors.surface },
    partHead: { alignItems: 'center', marginBottom: 14 },
    partHeadRoom: { paddingHorizontal: 40 },
    partTitle: { fontSize: 17, fontWeight: '800', color: colors.gold, textAlign: 'center' },
    partCoptic: { textAlign: 'center', marginTop: 2 },
    titleRule: { width: 36, height: 2, borderRadius: 1, backgroundColor: colors.gold, opacity: 0.5, marginTop: 10 },
    verseRow: { alignItems: 'stretch' },
    verseGap: { paddingTop: 14 },
    column: { flex: 1 },
    columnRule: { width: StyleSheet.hairlineWidth, backgroundColor: colors.border, marginHorizontal: 10 },
    columnHeads: { paddingBottom: 8, marginBottom: 4, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
    columnHead: { flex: 1, fontSize: 12, fontWeight: '800', color: colors.muted, letterSpacing: 0.8, textTransform: 'uppercase' },
    bookHeader: { alignItems: 'center', gap: 12, marginTop: 26, marginBottom: 10 },
    bookHeaderLine: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: colors.gold, opacity: 0.6 },
    bookHeaderText: { fontSize: 14, fontWeight: '800', color: colors.gold, letterSpacing: 1.2, textTransform: 'uppercase', textAlign: 'center', flexShrink: 1 },
    noText: { fontSize: 15, color: colors.muted, textAlign: 'center' },
    play: {
      position: 'absolute',
      top: 14,
      width: 34,
      height: 34,
      borderRadius: 17,
      borderWidth: 1,
      borderColor: colors.gold,
      alignItems: 'center',
      justifyContent: 'center',
    },
    playOn: { backgroundColor: colors.gold },
    playRight: { right: 10 },
    playLeft: { left: 10 },
    playText: { fontSize: 13, color: colors.gold },
    playTextOn: { color: colors.onGold },
    floatingRow: { position: 'absolute', gap: 8, opacity: 0.96 },
    floatingButton: {
      minHeight: 38,
      paddingHorizontal: 13,
      borderRadius: 19,
      backgroundColor: colors.gold,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.25,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 3 },
      elevation: 4,
    },
    floatingButtonText: { fontSize: 13, fontWeight: '800', color: colors.onGold },
    columnRow: { alignItems: 'center', gap: 8 },
    columnPick: { flex: 1, alignItems: 'center', gap: 12, paddingVertical: 14, paddingHorizontal: 8, borderRadius: 12 },
    columnNumber: {
      width: 26,
      height: 26,
      borderRadius: 13,
      overflow: 'hidden',
      textAlign: 'center',
      lineHeight: 26,
      fontSize: 13,
      fontWeight: '800',
      color: colors.onGold,
      backgroundColor: colors.gold,
    },
    caret: { fontSize: 14, color: colors.muted, marginStart: 'auto' },
    removeButton: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border },
    removeText: { fontSize: 14, color: colors.muted },
    hidePanel: { marginBottom: 12, paddingBottom: 8, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
    indentLeft: { paddingLeft: 28 },
    indentRight: { paddingRight: 28 },
    switchLabelSmall: { fontSize: 15, color: colors.text },
    switchLabelOff: { color: colors.muted },
    contentsHeader: { marginTop: 16, marginBottom: 4, paddingHorizontal: 4 },
  });
