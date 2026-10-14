import { router, useLocalSearchParams } from 'expo-router';
import { ReactNode, useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { createAlhanStyles, goBackOrHome, hymnHref, ScreenShell, strings, withCopticFont } from '@/components/alhan-ui';
import { followStrings } from '@/components/follow-strings';
import { displayTitle } from '@/data/arabic-titles';
import { formatCopticDate, toArabicDigits } from '@/data/coptic-calendar';
import { followAlong, FollowSection, PraiseKind, praiseKinds, tonightJdn, weekdayNames, weekdayOf } from '@/data/follow-along';
import { titleLines } from '@/data/hymn-titles';
import { Hymn, LanguageType } from '@/data/hymns';
import { useThemedStyles } from '@/hooks/use-alhan-colors';
import { audioSourceFor } from '@/hooks/use-audio-downloads';
import { playQueue, QueueTrack } from '@/hooks/use-audio-queue';
import { useSettings } from '@/hooks/use-settings';

// Midnight and Vesper Praises each get their own page in the web version (/follow/midnight, /follow/vesper)
export async function generateStaticParams(): Promise<Record<string, string>[]> {
  return praiseKinds.map((kind) => ({ kind }));
}

// Tonight's Midnight or Vesper Praises in the order they are prayed, from the calendar: one list from the
// first hymn to the last, so nobody has to go back and forth between General and the day of the week
export default function FollowScreen() {
  const { kind: kindParam, night } = useLocalSearchParams<{ kind: string; night?: string }>();
  const kind: PraiseKind = praiseKinds.includes(kindParam as PraiseKind) ? (kindParam as PraiseKind) : 'midnight';
  const settings = useSettings();
  const lang = settings.language;
  const isRTL = lang === 'ar';
  const t = strings[lang];
  const ft = followStrings[lang];
  const styles = useThemedStyles(createAlhanStyles);
  const rowDirection = isRTL ? styles.rowReverse : styles.row;
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;
  const digits = (n: number) => (isRTL ? toArabicDigits(n) : String(n));

  const [tonight] = useState(() => tonightJdn());
  const [jdn, setJdn] = useState(() => (Number(night) > 0 ? Number(night) : tonight));
  const plan = useMemo(() => followAlong(kind, jdn), [kind, jdn]);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const days = weekdayNames[lang];
  const dayName = days[plan.weekday];
  const eveName = days[(plan.weekday + 6) % 7];
  const nightLabel = isRTL ? followStrings.ar.night(dayName) : followStrings.en.night(dayName, eveName);
  const seasonName = displayTitle(plan.season, lang).replace(/^\d+\.\s*/, '');

  const open = (hymn: Hymn) => router.push(hymnHref(hymn.id, undefined, { kind, night: jdn }));

  // Every recording in tonight's order, Coptic first (the praises are sung in Coptic)
  const preferred: LanguageType[] = ['coptic', lang === 'ar' ? 'arabic' : 'english', 'arabic', 'english'];
  const tracks = plan.hymns.flatMap((hymn): QueueTrack[] => {
    const version = preferred.map((l) => hymn.versions.find((v) => v.language === l && v.audio)).find(Boolean) ?? hymn.versions.find((v) => v.audio);
    const source = version?.audio ? audioSourceFor(version.audio) : null;
    return version && source ? [{ hymnId: hymn.id, language: version.language, title: titleLines(hymn, lang).main, source }] : [];
  });

  const sectionTitle = (section: FollowSection) =>
    section.key === 'praises' ? ft.praises : section.key === 'conclusion' ? ft.conclusion : ft.day(dayName);

  // One row of tonight's list: its number, its title, and whether it has a recording
  const row = (hymn: Hymn, lead: string, onPress: () => void, chevron?: string) => {
    const { main, coptic } = titleLines(hymn, lang, settings.titleStyle);
    const hasAudio = hymn.versions.some((v) => v.audio);
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={[main, coptic, hasAudio ? t.hasAudio : null].filter(Boolean).join(', ')}
        style={({ pressed }) => [styles.listRow, rowDirection, pressed && styles.listRowPressed]}>
        <View style={styles.listLead}>
          <Text style={styles.listLeadText}>{lead}</Text>
        </View>
        <View style={styles.rowTextWrap}>
          <Text style={[styles.listTitle, textAlign]}>{withCopticFont(main)}</Text>
          {coptic ? <Text style={[styles.tileCoptic, textAlign]}>{coptic}</Text> : null}
        </View>
        <View style={[styles.listEnd, rowDirection]}>
          {hasAudio ? <Text style={styles.listAudio}>♪</Text> : null}
          <Text style={styles.listChevron}>{chevron ?? (isRTL ? '‹' : '›')}</Text>
        </View>
      </Pressable>
    );
  };

  // Numbered straight through the night, not from 1 in each section
  const firstNumber = plan.sections.map((_, i) => plan.sections.slice(0, i).reduce((n, s) => n + s.hymns.length, 1));
  const sections: ReactNode[] = plan.sections.map((section, sectionIndex) => (
    <View key={section.key}>
      <View style={[styles.sectionHeader, rowDirection]}>
        <Text style={styles.sectionHeaderText}>{sectionTitle(section)}</Text>
        <View style={styles.sectionLine} />
      </View>
      <View style={styles.listGroup}>
        {section.hymns.map((hymn, i) => {
          const number = firstNumber[sectionIndex] + i;
          const group = hymn.children?.length ? hymn.children : null;
          const opened = group && openGroup === hymn.id;
          return (
            <View key={hymn.id}>
              {i > 0 ? <View style={styles.listDivider} /> : null}
              {row(hymn, digits(number), group ? () => setOpenGroup(opened ? null : hymn.id) : () => open(hymn), group ? (opened ? '⌄' : isRTL ? '‹' : '›') : undefined)}
              {/* The doxologies' entry opens to show each of them */}
              {opened
                ? group.map((child) => (
                    <View key={child.id}>
                      <View style={styles.listDivider} />
                      {row(child, '•', () => open(child))}
                    </View>
                  ))
                : null}
            </View>
          );
        })}
      </View>
    </View>
  ));

  return (
    <ScreenShell lang={lang} title={ft.title[kind]} subtitle={`${nightLabel} · ${seasonName}`} onBack={goBackOrHome}>
      {/* Which night: tonight first, then the rest of the week */}
      <Text style={[styles.listSub, textAlign]}>{ft.whichNight}</Text>
      <View style={[rowDirection, { flexWrap: 'wrap', gap: 8, paddingVertical: 8 }]}>
        {Array.from({ length: 7 }, (_, i) => tonight + i).map((day, i) => {
          const selected = day === jdn;
          return (
            <Pressable
              key={day}
              onPress={() => setJdn(day)}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              style={({ pressed }) => [styles.chip, styles.chipSmall, selected && styles.controlButtonActive, pressed && styles.pressed]}>
              <Text style={[styles.chipText, selected && styles.controlTextActive]}>
                {i === 0 ? `${ft.tonight} · ${days[weekdayOf(day)]}` : days[weekdayOf(day)]}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={[styles.listSub, textAlign, { marginBottom: 12 }]}>
        {formatCopticDate(jdn, lang)} · {ft.note}
      </Text>

      <View style={[styles.audioControls, rowDirection]}>
        {plan.hymns[0] ? (
          <Pressable
            onPress={() => open(plan.hymns[0])}
            accessibilityRole="button"
            style={({ pressed }) => [styles.controlButton, styles.playAllButton, pressed && styles.pressed]}>
            <Text style={[styles.controlText, styles.playAllText]}>{ft.start}</Text>
          </Pressable>
        ) : null}
        {tracks.length ? (
          <Pressable
            onPress={() => playQueue(tracks, 0)}
            accessibilityRole="button"
            style={({ pressed }) => [styles.controlButton, pressed && styles.pressed]}>
            <Text style={styles.controlText}>{ft.playAll}</Text>
          </Pressable>
        ) : null}
      </View>

      {sections}
    </ScreenShell>
  );
}
