import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ChipScroller, createAlhanStyles, defaultHymnLanguage, languageLabels, recordingTitle, Speaker, toVerses, withCopticFont } from './alhan-ui';
import { tapFeedback } from './haptics';
import { AlhanPalette } from '../constants/alhan-colors';
import { displayTitle } from '../data/arabic-titles';
import { titleLines } from '../data/hymn-titles';
import { Hymn, LanguageType } from '../data/hymns';
import { useAlhanColors, useThemedStyles } from '../hooks/use-alhan-colors';
import { audioSourceFor } from '../hooks/use-audio-downloads';
import { currentTrack, playQueue, QueueTrack, useAudioQueue } from '../hooks/use-audio-queue';
import { AppLanguage, updateSettings, useSettings } from '../hooks/use-settings';

// Follow along, as in Spirit & Truth: a service's words one after another on one page instead of a list of names.
// Scroll down and tap a part to hear it; the recordings after it play on, and the page follows the one being sung.

export const followAlongStrings = {
  en: {
    toggle: 'Follow along',
    hint: 'All the words on one page. Tap a part to hear it; hold it to open it on its own.',
    open: 'Open',
    noText: 'No words yet',
  },
  ar: {
    toggle: 'تتبع الصلاة',
    hint: 'كل الكلمات في صفحة واحدة. اضغط على أي جزء لتسمعه، واضغط مطولاً لتفتحه وحده.',
    open: 'فتح',
    noText: 'لا توجد كلمات بعد',
  },
};

// The switch between the list of names and following along (remembered for every service)
export function FollowAlongSwitch({ lang }: { lang: AppLanguage }) {
  const settings = useSettings();
  const colors = useAlhanColors();
  const shared = useThemedStyles(createAlhanStyles);
  const styles = useThemedStyles(createStyles);
  const t = followAlongStrings[lang];
  const isRTL = lang === 'ar';
  return (
    <View style={[styles.switchRow, isRTL ? shared.rowReverse : shared.row]}>
      <View style={styles.switchTextWrap}>
        <Text style={[styles.switchLabel, isRTL ? shared.alignRight : shared.alignLeft]}>{t.toggle}</Text>
        {settings.followAlong ? <Text style={[styles.switchHint, isRTL ? shared.alignRight : shared.alignLeft]}>{t.hint}</Text> : null}
      </View>
      <Switch
        value={settings.followAlong}
        onValueChange={(on) => {
          tapFeedback();
          updateSettings({ followAlong: on });
        }}
        accessibilityLabel={t.toggle}
        trackColor={{ true: colors.gold, false: colors.border }}
        thumbColor={colors.surface}
        ios_backgroundColor={colors.border}
      />
    </View>
  );
}

const plainText = (hymn: Hymn, language: LanguageType) =>
  (hymn.versions.find((v) => v.language === language)?.text ?? '').replace(/(?:\\n)+/g, '\n\n');

const ARABIC_SCRIPT: LanguageType[] = ['arabic', 'arabicCoptic', 'arabicEnglish'];

export function FollowAlongList({
  items,
  lang,
  scrollRef,
  onOpenHymn,
  onOpenGroup,
  onSectionLayout,
}: {
  items: Hymn[];
  lang: AppLanguage;
  scrollRef: React.RefObject<ScrollView | null>;
  onOpenHymn: (hymn: Hymn, language: LanguageType) => void;
  onOpenGroup: (group: Hymn) => void;
  // Where each section header is on the page, for the section chips at the top
  onSectionLayout?: (id: string, y: number) => void;
}) {
  const settings = useSettings();
  const colors = useAlhanColors();
  const shared = useThemedStyles(createAlhanStyles);
  const styles = useThemedStyles(createStyles);
  const t = followAlongStrings[lang];
  const isRTL = lang === 'ar';
  const rowDirection = isRTL ? shared.rowReverse : shared.row;
  const textAlign = isRTL ? shared.alignRight : shared.alignLeft;
  const insets = useSafeAreaInsets();

  // The languages any part here has words in; the page reads in one of them
  const hymns = items.filter((h) => !h.isSectionHeader && !h.children);
  const offered = languageLabels[lang].filter((l) => hymns.some((h) => h.versions.some((v) => v.language === l.key && v.text.trim())));
  const [chosen, setChosen] = useState<LanguageType>(settings.hymnLanguage ?? defaultHymnLanguage(lang));
  const language = offered.some((l) => l.key === chosen) ? chosen : (offered[0]?.key ?? chosen);

  // Each part's recording: the one in the language being read, else Coptic, else any
  const trackFor = (hymn: Hymn): QueueTrack | null => {
    const order: LanguageType[] = [language, 'coptic', lang === 'ar' ? 'arabic' : 'english', 'arabic', 'english'];
    const version = order.map((l) => hymn.versions.find((v) => v.language === l && v.audio)).find(Boolean) ?? hymn.versions.find((v) => v.audio);
    const source = version?.audio ? audioSourceFor(version.audio) : null;
    if (!version?.audio || !source) return null;
    return {
      hymnId: hymn.id,
      language: version.language,
      title: recordingTitle(titleLines(hymn, lang).main, version.audio, version.language, lang),
      source,
      file: version.audio,
    };
  };
  const tracks = hymns.map(trackFor);

  // Tapping a part plays it and every recording after it
  const playFrom = (hymn: Hymn) => {
    const start = hymns.indexOf(hymn);
    const queue = tracks.slice(start).filter((tr): tr is QueueTrack => !!tr);
    if (!tracks[start]) return onOpenHymn(hymn, language);
    tapFeedback();
    playQueue(queue, 0);
  };

  // The page follows the part being sung
  const queue = useAudioQueue();
  const playingId = currentTrack(queue)?.hymnId;
  // Everything here sits straight on the page, so these are places on the page
  const blockY = useRef<Record<string, number>>({});
  useEffect(() => {
    const y = playingId ? blockY.current[playingId] : undefined;
    if (y !== undefined)
      scrollRef.current?.scrollTo({
        y: Math.max(0, y - insets.top - 16),
        animated: true,
      });
  }, [playingId, scrollRef, insets.top]);

  const fontSize = 18 * settings.textScale;
  const speakerColor: Record<Speaker, string> = {
    deacon: colors.gold,
    people: colors.people,
    priest: colors.priest,
  };
  const isArabicScript = ARABIC_SCRIPT.includes(language);
  const textStyle = [
    shared.hymnText,
    { fontSize, lineHeight: fontSize * 1.6 },
    isArabicScript ? shared.arabicText : shared.alignLeft,
    language === 'coptic' && shared.copticText,
  ];

  return (
    <>
      {offered.length > 1 ? (
        <ChipScroller rtl={isRTL}>
          {offered.map((l) => (
            <Pressable
              key={l.key}
              onPress={() => setChosen(l.key)}
              accessibilityRole="button"
              accessibilityState={{ selected: l.key === language }}
              style={({ pressed }) => [shared.chip, shared.chipSmall, l.key === language && shared.chipActive, pressed && shared.pressed]}>
              <Text style={[shared.chipText, l.key === language && shared.chipTextActive]}>{l.label}</Text>
            </Pressable>
          ))}
        </ChipScroller>
      ) : null}

      {items.map((item) => {
        if (item.isSectionHeader)
          return (
            <View
              key={item.id}
              onLayout={onSectionLayout ? (e) => onSectionLayout(item.id, e.nativeEvent.layout.y) : undefined}
              style={[shared.sectionHeader, rowDirection]}>
              <Text style={shared.sectionHeaderText}>{withCopticFont(displayTitle(item, lang))}</Text>
              <View style={shared.sectionLine} />
            </View>
          );
        if (item.children)
          return (
            <Pressable
              key={item.id}
              onPress={() => onOpenGroup(item)}
              accessibilityRole="button"
              style={({ pressed }) => [styles.group, rowDirection, pressed && shared.pressed]}>
              <Text style={[styles.groupTitle, textAlign]}>{withCopticFont(displayTitle(item, lang))}</Text>
              <Text style={styles.groupArrow}>{isRTL ? '‹' : '›'}</Text>
            </Pressable>
          );

        const { main, coptic } = titleLines(item, lang, settings.titleStyle);
        const text = plainText(item, language);
        const hasAudio = !!tracks[hymns.indexOf(item)];
        const isPlaying = item.id === playingId;
        return (
          // The Open button sits over the part rather than inside it (a button inside a button breaks on the web)
          <View
            key={item.id}
            onLayout={(e) => (blockY.current[item.id] = e.nativeEvent.layout.y)}
            style={[styles.block, isPlaying && styles.blockPlaying]}>
            <Pressable
              onPress={() => playFrom(item)}
              onLongPress={() => onOpenHymn(item, language)}
              accessibilityRole="button"
              accessibilityLabel={[main, hasAudio ? '▶' : t.open].join(', ')}
              style={({ pressed }) => [styles.blockInner, pressed && styles.blockPressed]}>
              <View style={[styles.blockHead, rowDirection, isRTL ? styles.roomLeft : styles.roomRight]}>
                <View style={styles.blockTitleWrap}>
                  <Text style={[styles.blockTitle, textAlign]}>{withCopticFont(main)}</Text>
                  {coptic ? <Text style={[shared.tileCoptic, textAlign]}>{coptic}</Text> : null}
                </View>
                {hasAudio ? <Text style={[styles.play, isPlaying && styles.playOn]}>{isPlaying ? '♪' : '▶'}</Text> : null}
              </View>
              {text.trim() ? (
                <Text style={textStyle}>
                  {toVerses(text).map((verse, i) => (
                    <Text key={i}>
                      {i > 0 ? '\n\n' : ''}
                      {verse.speaker ? (
                        <Text style={[shared.speaker, { color: speakerColor[verse.speaker] }]}>
                          {verse.label}
                          {verse.text ? '\n' : ''}
                        </Text>
                      ) : null}
                      {verse.text}
                    </Text>
                  ))}
                </Text>
              ) : (
                <Text style={[styles.noText, textAlign]}>{t.noText}</Text>
              )}
            </Pressable>
            <Pressable
              onPress={() => onOpenHymn(item, language)}
              accessibilityRole="button"
              accessibilityLabel={`${t.open}: ${main}`}
              hitSlop={8}
              style={({ pressed }) => [styles.open, isRTL ? styles.openLeft : styles.openRight, pressed && shared.pressed]}>
              <Text style={styles.openText}>{t.open}</Text>
            </Pressable>
          </View>
        );
      })}
    </>
  );
}

const createStyles = (colors: AlhanPalette) =>
  StyleSheet.create({
    switchRow: {
      alignItems: 'center',
      marginTop: 4,
      gap: 12,
      minHeight: 56,
      paddingHorizontal: 16,
      paddingVertical: 10,
      marginBottom: 14,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    switchTextWrap: { flex: 1 },
    switchLabel: { fontSize: 17, fontWeight: '700', color: colors.text },
    switchHint: {
      fontSize: 13,
      lineHeight: 18,
      color: colors.muted,
      marginTop: 2,
    },
    group: {
      alignItems: 'center',
      gap: 12,
      minHeight: 52,
      paddingHorizontal: 16,
      marginBottom: 10,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    groupTitle: {
      flex: 1,
      fontSize: 17,
      fontWeight: '700',
      color: colors.text,
    },
    groupArrow: { fontSize: 24, color: colors.gold },
    block: {
      marginHorizontal: -12,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: 'transparent',
      borderBottomColor: colors.border,
    },
    blockInner: {
      paddingVertical: 14,
      paddingHorizontal: 12,
      borderRadius: 14,
    },
    blockPlaying: { borderColor: colors.gold, backgroundColor: colors.surface },
    blockPressed: { backgroundColor: colors.surface },
    blockHead: { alignItems: 'flex-start', gap: 10, marginBottom: 8 },
    blockTitleWrap: { flex: 1 },
    blockTitle: { fontSize: 16, fontWeight: '800', color: colors.gold },
    play: { fontSize: 15, lineHeight: 22, color: colors.muted },
    playOn: { color: colors.gold },
    roomRight: { paddingRight: 62 },
    roomLeft: { paddingLeft: 62 },
    openRight: { position: 'absolute', top: 12, right: 12 },
    openLeft: { position: 'absolute', top: 12, left: 12 },
    open: {
      minHeight: 28,
      paddingHorizontal: 10,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
      justifyContent: 'center',
    },
    openText: { fontSize: 13, fontWeight: '700', color: colors.muted },
    noText: { fontSize: 15, color: colors.muted },
  });
