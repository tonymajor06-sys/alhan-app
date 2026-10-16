import { ReactNode } from 'react';
import { Image, ImageSourcePropType, Pressable, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { createAlhanStyles, strings, withCopticFont } from './alhan-ui';
import { tapFeedback } from './haptics';
import { displayTitle } from '../data/arabic-titles';
import { titleLines } from '../data/hymn-titles';
import { toArabicDigits } from '../data/coptic-calendar';
import { flattenHymns, Hymn } from '../data/hymns';
import { useThemedStyles } from '../hooks/use-alhan-colors';
import { useSettings } from '../hooks/use-settings';

// Lists and tiles shared by the home screen, the hymns and the responses

const useDirection = () => {
  const { language: lang } = useSettings();
  const styles = useThemedStyles(createAlhanStyles);
  const isRTL = lang === 'ar';
  return {
    lang,
    isRTL,
    styles,
    t: strings[lang],
    rowDirection: isRTL ? styles.rowReverse : styles.row,
    textAlign: isRTL ? styles.alignRight : styles.alignLeft,
  };
};

export const localDigits = (n: number, isRTL: boolean) => (isRTL ? toArabicDigits(n) : String(n));

// A tile in a two-column grid; `lead` is a small mark or number above the title, `coptic` a hymn's Coptic words
// under its name, and `audio` marks a hymn with a recording
export function Tile({
  title,
  onPress,
  lead,
  desc,
  coptic,
  audio,
  image,
}: {
  title: string;
  onPress: () => void;
  lead?: string;
  desc?: string;
  coptic?: string | null;
  audio?: boolean;
  image?: ImageSourcePropType;
}) {
  const { styles, t, isRTL, rowDirection, textAlign } = useDirection();
  return (
    <Pressable
      onPress={() => {
        tapFeedback();
        onPress();
      }}
      accessibilityRole="button"
      accessibilityLabel={[title, coptic, audio ? t.hasAudio : null].filter(Boolean).join(', ')}
      style={({ pressed }) => [styles.tile, !desc && styles.tileSmall, pressed && styles.rowCardPressed]}>
      {image ? <Image source={image} style={[styles.tileImage, isRTL && { alignSelf: 'flex-end' }]} accessibilityIgnoresInvertColors /> : null}
      {lead || audio ? (
        <View style={[styles.tileTopRow, rowDirection]}>
          <Text style={styles.tileLead}>{lead}</Text>
          {audio ? <Text style={styles.tileAudio}>♪ {t.hasAudio}</Text> : null}
        </View>
      ) : null}
      <View>
        <Text style={[styles.tileTitle, textAlign]}>{withCopticFont(title)}</Text>
        {coptic ? <Text style={[styles.tileCoptic, textAlign]}>{coptic}</Text> : null}
        {desc ? <Text style={[styles.tileDesc, textAlign]}>{desc}</Text> : null}
      </View>
    </Pressable>
  );
}

export function TileGrid({ children }: { children: ReactNode }) {
  const { styles, rowDirection } = useDirection();
  return (
    <Animated.View entering={FadeIn.duration(200)} style={[styles.tileGrid, rowDirection]}>
      {children}
    </Animated.View>
  );
}

export function SectionHeader({ title }: { title: string }) {
  const { styles, rowDirection } = useDirection();
  return (
    <View style={[styles.sectionHeader, rowDirection]}>
      <Text style={styles.sectionHeaderText}>{withCopticFont(title)}</Text>
      <View style={styles.sectionLine} />
    </View>
  );
}

// A row in a list: a picture or number at the start, the name with a line under it, ♪ for a recording, and ›
export function ListRow({
  title,
  onPress,
  lead,
  image,
  sub,
  coptic,
  audio,
}: {
  title: string;
  onPress: () => void;
  lead?: string;
  image?: ImageSourcePropType;
  sub?: string | null;
  coptic?: string | null;
  audio?: boolean;
}) {
  const { styles, t, isRTL, rowDirection, textAlign } = useDirection();
  return (
    <Pressable
      onPress={() => {
        tapFeedback();
        onPress();
      }}
      accessibilityRole="button"
      accessibilityLabel={[title, coptic, sub, audio ? t.hasAudio : null].filter(Boolean).join(', ')}
      style={({ pressed }) => [styles.listRow, rowDirection, pressed && styles.listRowPressed]}>
      {image ? <Image source={image} style={styles.listThumb} accessibilityIgnoresInvertColors /> : null}
      {lead ? (
        <View style={styles.listLead}>
          <Text style={styles.listLeadText}>{lead}</Text>
        </View>
      ) : null}
      <View style={styles.rowTextWrap}>
        <Text style={[styles.listTitle, textAlign]}>{withCopticFont(title)}</Text>
        {coptic ? <Text style={[styles.tileCoptic, textAlign]}>{coptic}</Text> : null}
        {sub ? (
          <Text style={[styles.listSub, textAlign]} numberOfLines={2}>
            {sub}
          </Text>
        ) : null}
      </View>
      <View style={[styles.listEnd, rowDirection]}>
        {audio ? <Text style={styles.listAudio}>♪</Text> : null}
        <Text style={styles.listChevron}>{isRTL ? '‹' : '›'}</Text>
      </View>
    </Pressable>
  );
}

// Rows together in one rounded panel, with a thin line between them; it fades in rather than popping up
export function ListGroup({ rows }: { rows: ReactNode[] }) {
  const { styles } = useDirection();
  return (
    <Animated.View entering={FadeIn.duration(200)} style={styles.listGroup}>
      {rows.flatMap((row, i) => (i === 0 ? [row] : [<View key={`divider-${i}`} style={styles.listDivider} />, row]))}
    </Animated.View>
  );
}

// A service's hymns, numbered in order and starting again from 1 after each section header.
// A hymn with children is a group, opened with `onOpenGroup`; any other hymn with `onOpenHymn`.
export function HymnList({
  hymns,
  onOpenHymn,
  onOpenGroup,
}: {
  hymns: Hymn[];
  onOpenHymn: (hymn: Hymn) => void;
  onOpenGroup: (group: Hymn) => void;
}) {
  const settings = useSettings();
  const { lang, isRTL, t } = useDirection();
  const out: ReactNode[] = [];
  let rows: ReactNode[] = [];
  let number = 0;
  const flush = (key: string) => {
    if (rows.length) out.push(<ListGroup key={`list-${key}`} rows={rows} />);
    rows = [];
  };
  for (const hymn of hymns) {
    if (hymn.isSectionHeader) {
      flush(hymn.id);
      number = 0;
      out.push(<SectionHeader key={hymn.id} title={displayTitle(hymn, lang)} />);
      continue;
    }
    number += 1;
    const inside = hymn.children ? flattenHymns(hymn.children) : [hymn];
    const hasAudio = inside.some((h) => h.versions.some((v) => v.audio));
    const { main, coptic } = titleLines(hymn, lang, settings.titleStyle);
    rows.push(
      <ListRow
        key={hymn.id}
        title={main}
        onPress={() => (hymn.children ? onOpenGroup(hymn) : onOpenHymn(hymn))}
        lead={localDigits(number, isRTL)}
        coptic={coptic}
        sub={hymn.children ? t.groupCount(inside.length) : null}
        audio={hasAudio}
      />
    );
  }
  flush('end');
  return <>{out}</>;
}
