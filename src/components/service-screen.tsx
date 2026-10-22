import { Href, router } from 'expo-router';
import { useRef } from 'react';
import { Platform, Pressable, ScrollView, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ChipScroller, createAlhanStyles, goBackOrHome, openHymnPage, ScreenShell, strings, withCopticFont } from './alhan-ui';
import { tapFeedback } from './haptics';
import { HymnList } from './lists';
import { openGroupsFrom } from './open-groups';
import { displayTitle } from '../data/arabic-titles';
import { PraiseKind, praiseJdnFor, tonightJdn } from '../data/follow-along';
import { Hymn, Service } from '../data/hymns';
import { useThemedStyles } from '../hooks/use-alhan-colors';
import { useSettings } from '../hooks/use-settings';

// A service's list of hymns, or the list of the innermost group opened inside it.
// Opening a group pushes the same page again with one more group, so Back and the swipe step out of it.
// A long list with several sections (a Liturgy's responses) shows its sections at the top; tap one to jump to it.
export function ServiceScreen({
  service,
  groups,
  chooseLabel,
  hrefWithGroups,
}: {
  service: Service;
  groups: string | undefined;
  chooseLabel: string;
  hrefWithGroups: (groups: string) => Href;
}) {
  const { language: lang } = useSettings();
  const t = strings[lang];
  const isRTL = lang === 'ar';
  const styles = useThemedStyles(createAlhanStyles);
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;

  const openGroups = openGroupsFrom(service, groups);
  const group = openGroups[openGroups.length - 1];
  const items = group ? (group.children ?? []) : service.hymns;
  const sections = items.filter((h) => h.isSectionHeader);
  const showSections = sections.length >= 3;
  const scrollRef = useRef<ScrollView>(null);
  const sectionY = useRef<Record<string, number>>({});
  const insets = useSafeAreaInsets();
  const jumpTo = (id: string) => {
    const y = sectionY.current[id];
    if (y === undefined) return;
    tapFeedback();
    scrollRef.current?.scrollTo({ y: Math.max(0, y - insets.top - 12), animated: true });
  };
  const path = [service, ...openGroups.slice(0, -1)].map((g) => displayTitle(g, lang)).join(isRTL ? ' ‹ ' : ' › ');

  const isMidnight = /-midnight$/.test(service.id);
  const isVesper = /-vesper-praises$/.test(service.id);
  const praiseKind: PraiseKind | null = isMidnight ? 'midnight' : isVesper ? 'vesper' : null;

  const handleFollow = (item?: Hymn) => {
    if (!praiseKind) return;
    const target = item ?? group;
    const night = target ? praiseJdnFor(target, group) : tonightJdn();
    router.push({ pathname: '/follow/[kind]', params: { kind: praiseKind, night: String(night) } });
  };

  return (
    <ScreenShell
      lang={lang}
      title={displayTitle(group ?? service, lang)}
      subtitle={group ? path : chooseLabel}
      onBack={goBackOrHome}
      scrollRef={scrollRef}>
      {showSections ? (
        <ChipScroller rtl={isRTL}>
          {sections.map((h) => (
            <Pressable
              key={h.id}
              onPress={() => jumpTo(h.id)}
              accessibilityRole="button"
              accessibilityHint={t.sections}
              style={({ pressed }) => [styles.chip, styles.chipSmall, pressed && styles.pressed]}>
              <Text style={styles.chipText}>{withCopticFont(displayTitle(h, lang))}</Text>
            </Pressable>
          ))}
        </ChipScroller>
      ) : null}
      {praiseKind && group ? (
        <Pressable
          onPress={() => handleFollow(group)}
          accessibilityRole="button"
          style={({ pressed }) => [styles.followOrderButton, pressed && styles.pressed]}>
          <Text style={styles.followOrderButtonText}>
            📖 {lang === 'ar' ? 'تتبع التسبحة بالترتيب' : 'Follow praises in order'}
          </Text>
        </Pressable>
      ) : null}
      {praiseKind && !group ? (
        <Text style={styles.praiseHintText}>
          {lang === 'ar'
            ? Platform.OS === 'web'
              ? 'اختر يوماً، أو اضغط بالزر الأيمن / مطولاً لتتبع التسبحة'
              : 'اضغط مطولاً على أي يوم لتتابع تسبحته بالترتيب'
            : Platform.OS === 'web'
              ? 'Click a day, or right-click / hold to follow along'
              : 'Hold any day to follow along in order'}
        </Text>
      ) : null}
      {items.length === 0 ? (
        <Text style={[styles.emptyText, textAlign]}>{t.nothingYet}</Text>
      ) : (
        <HymnList
          hymns={items}
          onOpenHymn={(hymn) => openHymnPage(hymn.id)}
          onOpenGroup={(next) => router.push(hrefWithGroups([...openGroups, next].map((g) => g.id).join(',')))}
          onLongPressGroup={praiseKind ? (g) => handleFollow(g) : undefined}
          onLongPressHymn={praiseKind ? (h) => handleFollow(h) : undefined}
          onSectionLayout={showSections ? (id, y) => (sectionY.current[id] = y) : undefined}
        />
      )}
    </ScreenShell>
  );
}
