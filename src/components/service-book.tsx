import { ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { copticColumnNudge, copticFont, createAlhanStyles, languageLabels, readerFont, Sheet, SheetRow, Speaker, toVerses, Verse, withCopticFont } from './alhan-ui';
import { tapFeedback } from './haptics';
import { useTabChrome } from './tab-chrome';
import { AlhanPalette } from '../constants/alhan-colors';
import { displayTitle } from '../data/arabic-titles';
import { titleLines } from '../data/hymn-titles';
import { locateHymn } from '../data/search';
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
export function FollowAlongSwitch({ lang, onTurnOn }: { lang: AppLanguage; onTurnOn?: () => void }) {
  const settings = useSettings();
  const shared = useThemedStyles(createAlhanStyles);
  const styles = useThemedStyles(createStyles);
  const t = bookStrings[lang];
  const on = settings.followAlong;
  return (
    <Pressable
      onPress={() => {
        tapFeedback();
        if (!on) onTurnOn?.();
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
  startVerse = 0,
  sungVerse = -1,
  onPlace,
  onSelect,
  onPlay,
}: {
  book: BookEntry[];
  currentId: string;
  playingId?: string;
  // The current part's verse the book opens at (where the reader was), and the one being sung in it (-1: none)
  startVerse?: number;
  sungVerse?: number;
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

  // Opened at the current part (at the verse the reader was on) once it has its place on the page, and scrolled to a
  // part again whenever another becomes current; the verse being sung stays in view
  const scrolledTo = useRef<string | null>(null);
  const positions = useRef<Record<string, number>>({});
  const verseYs = useRef<Record<string, number[]>>({});
  const verseTop = (id: string, verse: number) => {
    const part = positions.current[id];
    const inPart = verse > 0 ? verseYs.current[id]?.[verse] : 0;
    return part === undefined || inPart === undefined ? undefined : part + inPart;
  };
  const openAtStart = () => {
    if (scrolledTo.current === currentId) return;
    const y = verseTop(currentId, startVerse);
    if (y === undefined) return;
    scrolledTo.current = currentId;
    scrollRef.current?.scrollTo({ y: Math.max(0, y - insets.top - (startVerse > 0 ? 60 : 8)), animated: false });
  };
  const placed = (id: string, y: number) => {
    positions.current[id] = y;
    onPlace(id, y);
    if (id === currentId) openAtStart();
  };
  const placedVerse = (id: string, verse: number, y: number) => {
    (verseYs.current[id] ??= [])[verse] = y;
    if (id === currentId && verse === startVerse) openAtStart();
  };
  useEffect(() => {
    const y = positions.current[currentId];
    if (scrolledTo.current === currentId || y === undefined) return;
    scrolledTo.current = currentId;
    scrollRef.current?.scrollTo({ y: Math.max(0, y - insets.top - 8), animated: true });
  }, [currentId, scrollRef, insets.top]);
  const singingHere = sungVerse >= 0 && playingId === currentId;
  useEffect(() => {
    if (!singingHere) return;
    const y = verseTop(currentId, sungVerse);
    if (y !== undefined) scrollRef.current?.scrollTo({ y: Math.max(0, y - 140), animated: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singingHere, sungVerse, currentId]);

  const columns = languages.length;
  const size = 20 * settings.textScale * (columns > 2 ? 0.72 : columns > 1 ? 0.8 : 0.9);
  const speakerColor: Record<Speaker, string> = { deacon: colors.gold, people: colors.people, priest: colors.priest };
  const columnStyle = (language: LanguageType) => [
    shared.hymnText,
    { fontSize: size, lineHeight: size * 1.55 },
    ARABIC_SCRIPT.includes(language) ? shared.arabicText : styles.justified,
    language === 'coptic' && [shared.copticText, { paddingTop: size * copticColumnNudge }],
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
      if (c > 0) out.push(<View key={`gap-${c}`} style={styles.columnGap} />);
      out.push(cell);
    });
    return <View style={[rowDirection, styles.verseRow]}>{out}</View>;
  };
  return (
    <>
      {book.map((entry) => {
        if (entry.kind === 'header')
          return (
            <View
              key={`h-${entry.id}`}
              onLayout={(e) => placed(entry.id, e.nativeEvent.layout.y)}
              style={[rowDirection, styles.bookHeader]}>
              <Text style={[styles.bookHeaderText, isRTL ? shared.alignRight : shared.alignLeft]}>{withCopticFont(displayTitle(entry.title, lang))}</Text>
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
              <View style={[styles.partHead, hasAudio && (isRTL ? styles.partHeadRoomLeft : styles.partHeadRoomRight)]}>
                <Text style={[styles.partTitle, { fontSize: 26 * settings.textScale, lineHeight: 34 * settings.textScale }, isRTL ? shared.alignRight : shared.alignLeft]}>
                  {withCopticFont(main)}
                </Text>
                {coptic ? (
                  <Text style={[styles.partCoptic, { fontSize: 19 * settings.textScale }, isRTL ? shared.alignRight : shared.alignLeft]}>{coptic}</Text>
                ) : null}
              </View>
              {rows === 0 ? <Text style={styles.noText}>{t.noText}</Text> : null}
              {Array.from({ length: rows }, (_, i) => (
                <View
                  key={i}
                  onLayout={(e) => placedVerse(hymn.id, i, e.nativeEvent.layout.y)}
                  style={isCurrent && singingHere && i === sungVerse ? styles.verseSung : undefined}>
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
  const insets = useSafeAreaInsets();
  const drawerScroll = useRef<ScrollView>(null);
  const [showingHide, setShowingHide] = useState(false);
  const service = locateHymn(currentId)?.location.service;
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
      {/* Contents, as in Spirit & Truth: a panel from the side, the service's name at the top and every part numbered,
          with its Arabic name and Coptic words; the current one in gold and in view */}
      <Modal visible={open} transparent animationType="fade" onRequestClose={onClose}>
        <View style={[styles.drawerRoot, isRTL ? shared.row : shared.rowReverse]}>
          <View style={[styles.drawer, { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 12 }]}>
            <View style={[styles.drawerTop, rowDirection]}>
              <Text style={[styles.drawerTitle, textAlign]} numberOfLines={2}>
                {service ? withCopticFont(displayTitle(service, lang)) : t.contents}
              </Text>
              <Pressable onPress={onClose} accessibilityRole="button" accessibilityLabel="✕" hitSlop={10} style={({ pressed }) => [styles.drawerClose, pressed && shared.pressed]}>
                <Text style={styles.drawerCloseText}>✕</Text>
              </Pressable>
            </View>
            <ScrollView ref={drawerScroll} contentContainerStyle={styles.drawerList}>
              {hiding && hiding.kinds.length ? (
                <View style={styles.hidePanel}>
                  <Pressable
                    onPress={() => setShowingHide((v) => !v)}
                    accessibilityRole="button"
                    style={({ pressed }) => [shared.sheetRow, rowDirection, pressed && shared.sheetRowPressed]}>
                    <Text style={[styles.switchLabelSmall, textAlign, { flex: 1 }]}>{t.show}</Text>
                    <Text style={styles.caret}>{showingHide ? '▴' : '▾'}</Text>
                  </Pressable>
                  {showingHide
                    ? hiding.kinds.map((kind) => {
                        const shown = !hiding.hidden.includes(kind);
                        return (
                          <View key={kind}>
                            {switchRow(t.kinds[kind], shown, () => hiding.onToggle(kind), false)}
                            {kind === 'doxologies' && shown
                              ? hiding.doxologies.map((h) =>
                                  switchRow(titleLines(h, lang, 'english').main, !hiding.hidden.includes(doxologyId(h)), () => hiding.onToggle(doxologyId(h)), true, h.id)
                                )
                              : null}
                          </View>
                        );
                      })
                    : null}
                </View>
              ) : null}
              {(() => {
                let n = 0;
                return book.map((entry) => {
                  if (entry.kind === 'header')
                    return (
                      <Text key={`h-${entry.id}`} style={[styles.drawerHeader, textAlign]}>
                        {withCopticFont(displayTitle(entry.title, lang))}
                      </Text>
                    );
                  n++;
                  const hymn = entry.hymn;
                  const current = hymn.id === currentId;
                  const { main, coptic } = titleLines(hymn, lang, settings.titleStyle);
                  const other = displayTitle(hymn, isRTL ? 'en' : 'ar');
                  // the name in the other language (Arabic, or English in Arabic), only when there is one
                  const otherName = other !== main && (isRTL ? !/[\u0600-\u06ff]/.test(other) : /[\u0600-\u06ff]/.test(other)) ? other : null;
                  return (
                    <Pressable
                      key={hymn.id}
                      onPress={() => onJump(hymn.id)}
                      onLayout={current ? (e) => drawerScroll.current?.scrollTo({ y: Math.max(0, e.nativeEvent.layout.y - 120), animated: false }) : undefined}
                      accessibilityRole="button"
                      accessibilityState={{ selected: current }}
                      style={({ pressed }) => [styles.drawerRow, rowDirection, pressed && shared.sheetRowPressed]}>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.drawerName, current && styles.drawerCurrent, textAlign]} numberOfLines={1}>
                          {withCopticFont(main)}
                        </Text>
                        {otherName ? (
                          <Text style={[styles.drawerSub, current && styles.drawerCurrent, isRTL ? shared.alignLeft : shared.alignRight]} numberOfLines={1}>
                            {otherName}
                          </Text>
                        ) : null}
                        {coptic ? (
                          <Text style={[styles.drawerCoptic, current && styles.drawerCurrent, textAlign]} numberOfLines={1}>
                            {coptic}
                          </Text>
                        ) : null}
                      </View>
                      <Text style={[styles.drawerNumber, current && styles.drawerCurrent]}>{isRTL ? String(n).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]) : n}</Text>
                    </Pressable>
                  );
                });
              })()}
            </ScrollView>
          </View>
          <Pressable style={styles.drawerShade} onPress={onClose} accessibilityRole="button" accessibilityLabel="✕" />
        </View>
      </Modal>
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
    // A clean page, as in Spirit & Truth: the part's name large at the start of the line, its words in columns below
    part: { marginHorizontal: -12, marginBottom: 10 },
    partCurrent: {},
    barLeft: { borderLeftWidth: 2, borderLeftColor: colors.gold },
    barRight: { borderRightWidth: 2, borderRightColor: colors.gold },
    partInner: { paddingTop: 22, paddingBottom: 18, paddingHorizontal: 12 },
    partPressed: { opacity: 0.75 },
    partHead: { marginBottom: 18 },
    partHeadRoomRight: { paddingRight: 44 },
    partHeadRoomLeft: { paddingLeft: 44 },
    partTitle: { fontFamily: readerFont, fontWeight: '700', color: colors.gold },
    partCoptic: { fontFamily: copticFont, color: colors.gold, opacity: 0.75, marginTop: 4 },
    justified: { textAlign: 'justify' },
    columnGap: { width: 16 },
    verseRow: { alignItems: 'stretch' },
    verseGap: { paddingTop: 14 },
    verseSung: { backgroundColor: colors.goldSoft, borderRadius: 6, marginHorizontal: -6, paddingHorizontal: 6 },
    column: { flex: 1 },
    bookHeader: { alignItems: 'center', gap: 12, marginTop: 30, marginBottom: 4 },
    bookHeaderLine: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: colors.gold, opacity: 0.5 },
    bookHeaderText: { fontSize: 13, fontWeight: '800', color: colors.muted, letterSpacing: 1.2, textTransform: 'uppercase', flexShrink: 1 },
    noText: { fontSize: 15, color: colors.muted, textAlign: 'center' },
    play: {
      position: 'absolute',
      top: 22,
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
    drawerRoot: { flex: 1 },
    drawerShade: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)' },
    drawer: { width: '86%', maxWidth: 440, backgroundColor: colors.surface, shadowColor: '#000', shadowOpacity: 0.35, shadowRadius: 16, elevation: 12 },
    drawerTop: { alignItems: 'center', gap: 12, marginHorizontal: 12, marginBottom: 8, paddingVertical: 14, paddingHorizontal: 16, borderRadius: 18, backgroundColor: colors.background },
    drawerTitle: { flex: 1, fontSize: 19, fontWeight: '800', color: colors.text },
    drawerClose: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
    drawerCloseText: { fontSize: 16, color: colors.muted },
    drawerList: { paddingHorizontal: 16, paddingBottom: 24 },
    drawerHeader: { fontSize: 18, fontWeight: '700', color: colors.text, marginTop: 18, paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
    drawerRow: { alignItems: 'center', gap: 12, paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
    drawerName: { fontSize: 17, fontWeight: '600', color: colors.text },
    drawerSub: { fontSize: 15, color: colors.muted, marginTop: 3 },
    drawerCoptic: { fontFamily: copticFont, fontSize: 18, lineHeight: 28, paddingTop: 2, color: colors.muted, marginTop: 2 },
    drawerCurrent: { color: colors.gold },
    drawerNumber: { fontSize: 16, fontWeight: '700', color: colors.muted, minWidth: 28, textAlign: 'center' },
  });
