import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, PanResponder, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MiniPlayer, openHymnPage, Sheet } from '@/components/alhan-ui';
import { pressFeedback, tapFeedback } from '@/components/haptics';
import { ListGroup, ListRow, SectionHeader } from '@/components/lists';
import { StatusBarBlur } from '@/components/status-bar-blur';
import { useTabChrome } from '@/components/tab-chrome';
import { AlhanPalette } from '@/constants/alhan-colors';
import { hasSaints, saintHymnKind, saintHymnsOn, storySaintsOn } from '@/data/calendar-day';
import {
  ChurchEvent,
  copticMonths,
  copticToJdn,
  currentSeasonName,
  eventsAround,
  formatCopticDate,
  formatDaysUntil,
  formatGregorianDate,
  getSeasonInfo,
  jdnToCoptic,
  jdnToGregorian,
  kindName,
  toArabicDigits,
  tuneName,
} from '@/data/coptic-calendar';
import { titleLines } from '@/data/hymn-titles';
import { useAlhanColors, useThemedStyles } from '@/hooks/use-alhan-colors';
import { currentTrack, useAudioQueueSelect } from '@/hooks/use-audio-queue';
import { updateSettings, useSettings } from '@/hooks/use-settings';
import { useTodayJdn } from '@/hooks/use-today';
import { requestReminderPermission } from '@/notifications/feast-reminders';

const strings = {
  en: {
    title: 'Coptic Calendar',
    today: 'Today',
    comingUp: 'Coming up',
    openHymns: 'Open hymns',
    goToToday: 'Today',
    prevMonth: 'Previous month',
    nextMonth: 'Next month',
    chooseMonth: 'Choose a month',
    prevYear: 'Previous year',
    nextYear: 'Next year',
    feast: 'Feast',
    fast: 'Fast',
    saintDay: 'Saint',
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    weekdaysLong: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    saints: 'Saints remembered',
    saintHymns: 'Hymns for the saints of the day',
    noSaints: 'No saint in the app’s lists on this day.',
    reminders: 'Feast reminders',
    remindersOn: 'On · the evening before each feast and fast',
    remindersOff: 'Off · tap to get a reminder the evening before',
    remindersDenied: 'Notifications are turned off for Coptic Psalmody. You can allow them in Settings.',
    holdHint: 'Tap a day to see what is on it · hold it to follow its praises',
    followAlong: 'Follow along',
  },
  ar: {
    title: 'التقويم القبطي',
    today: 'اليوم',
    comingUp: 'المناسبات القادمة',
    openHymns: 'افتح الألحان',
    goToToday: 'اليوم',
    prevMonth: 'الشهر السابق',
    nextMonth: 'الشهر التالي',
    chooseMonth: 'اختر شهرًا',
    prevYear: 'السنة السابقة',
    nextYear: 'السنة التالية',
    feast: 'عيد',
    fast: 'صوم',
    saintDay: 'قديس',
    weekdays: ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
    weekdaysLong: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    saints: 'تذكار القديسين',
    saintHymns: 'ألحان قديسي اليوم',
    noSaints: 'لا يوجد قديس في قوائم التطبيق في هذا اليوم.',
    reminders: 'تذكير بالأعياد',
    remindersOn: 'مفعّل · مساء اليوم السابق لكل عيد وصوم',
    remindersOff: 'متوقف · اضغط لتصلك رسالة تذكير مساء اليوم السابق',
    remindersDenied: 'الإشعارات متوقفة لتطبيق التسبحة القبطية. يمكنك السماح بها من الإعدادات.',
    holdHint: 'اضغط على يوم لترى ما فيه · اضغط مطولاً لتتابع تسبحته',
    followAlong: 'تتبع التسبحة',
  },
};

// Switches to the Hymns tab, on that season's page
const openSeasonHymns = (seasonId: string) => router.navigate({ pathname: '/hymns/[season]', params: { season: seasonId } });
// Holding a day opens its praises in the order they are prayed (the night before it: Saturday night is Sunday's)
const followDay = (jdn: number) => router.push({ pathname: '/follow/[kind]', params: { kind: 'midnight', night: String(jdn) } });

// A month as one number counting Coptic months from year 0, so moving a month is +1 or -1
const monthIndexOf = (jdn: number) => {
  const c = jdnToCoptic(jdn);
  return c.year * 13 + c.month - 1;
};
const monthStartOf = (index: number) => copticToJdn(Math.floor(index / 13), (index % 13) + 1, 1);

export default function CalendarScreen() {
  const { language: lang, feastReminders, titleStyle } = useSettings();
  const t = strings[lang];
  const isRTL = lang === 'ar';
  const insets = useSafeAreaInsets();
  const chrome = useTabChrome();
  const playing = !!useAudioQueueSelect(currentTrack);
  const colors = useAlhanColors();
  const styles = useThemedStyles(createStyles);
  const today = useTodayJdn();

  const [selected, setSelected] = useState(today);
  const [monthIndex, setMonthIndex] = useState(monthIndexOf(today));
  const [picking, setPicking] = useState(false);
  const [pickerYear, setPickerYear] = useState(Math.floor(monthIndex / 13));
  const shownYear = Math.floor(monthIndex / 13);
  const shownMonth = (monthIndex % 13) + 1;

  const monthStart = monthStartOf(monthIndex);
  const daysInMonth = monthStartOf(monthIndex + 1) - monthStart;
  const leadingBlanks = (monthStart + 1) % 7; // 0 = Sunday

  const events = eventsAround(monthStart);
  const eventsOn = (jdn: number): ChurchEvent[] =>
    events.filter((ev) => ev.start <= jdn && jdn <= ev.end).sort((a, b) => b.priority - a.priority);

  const selectedInfo = getSeasonInfo(selected, 0);
  const selectedCoptic = jdnToCoptic(selected);
  const selectedEvents = eventsAround(selected)
    .filter((ev) => ev.start <= selected && selected <= ev.end)
    .sort((a, b) => b.priority - a.priority)
    // one line for each name (a season's hidden range and its first day can share one)
    .filter((ev, i, all) => all.findIndex((o) => o.name.en === ev.name.en) === i);
  const daySaints = storySaintsOn(selectedCoptic.month, selectedCoptic.day);
  const dayHymns = saintHymnsOn(selectedCoptic.month, selectedCoptic.day);
  // The day's saints known only by their hymns (no story in the app), each once
  const plain = (name: string) => name.toLowerCase().replace(/^(sts?\.?|saint|the)\s+/, '').replace(/[^a-z]/g, '');
  const hymnSaints = dayHymns
    .filter((h, i, all) => all.findIndex((o) => o.saint.en === h.saint.en) === i)
    .filter((h) => !daySaints.some((s) => plain(s.name.en) === plain(h.saint.en)))
    .map((h) => ({ name: h.saint, hymnId: h.hymn.id }));
  const upcoming = getSeasonInfo(today, 10).upcoming;

  const rowDirection = isRTL ? styles.rowReverse : styles.row;
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;
  const n = (v: number) => (isRTL ? toArabicDigits(v) : String(v));
  const isThisMonth = monthIndex === monthIndexOf(today);

  // Showing another month selects its first day (this month: today), so the day below is always one on the page
  const showMonth = (index: number) => {
    setMonthIndex(index);
    setSelected(index === monthIndexOf(today) ? today : monthStartOf(index));
  };
  const goToToday = () => {
    setSelected(today);
    setMonthIndex(monthIndexOf(today));
  };
  const openPicker = () => {
    tapFeedback();
    setPickerYear(shownYear);
    setPicking(true);
  };

  // A sideways swipe on the month moves a month (the way the page reads)
  const swipe = PanResponder.create({
    onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 24 && Math.abs(g.dx) > Math.abs(g.dy) * 2,
    onPanResponderRelease: (_, g) => {
      if (Math.abs(g.dx) < 50) return;
      showMonth(monthIndex + ((isRTL ? g.dx > 0 : g.dx < 0) ? 1 : -1));
    },
  });

  const toggleReminders = async () => {
    if (feastReminders) return updateSettings({ feastReminders: false });
    if (await requestReminderPermission()) updateSettings({ feastReminders: true });
    else Alert.alert(t.remindersDenied);
  };

  const cells = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => monthStart + i),
  ];
  const selectedWeekday = (selected + 1) % 7;

  return (
    <View style={styles.root} collapsable={false}>
      <ScrollView
        contentInsetAdjustmentBehavior={chrome.autoInsets ? 'automatic' : 'never'}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: (chrome.autoInsets ? 0 : insets.top) + 12,
            paddingBottom: chrome.pageBottom + 40 + (playing && chrome.floatingPlayer ? 96 : 0),
          },
        ]}>
        <View style={[styles.topBar, rowDirection]}>
          <Text style={[styles.headerTitle, styles.topBarTitle, textAlign]}>{t.title}</Text>
          {selected !== today || !isThisMonth ? (
            <Pressable onPress={goToToday} accessibilityRole="button" style={({ pressed }) => [styles.pillButton, pressed && styles.pressed]}>
              <Text style={styles.pillText}>{t.goToToday}</Text>
            </Pressable>
          ) : null}
        </View>

        {/* Month */}
        <View style={styles.monthCard} {...swipe.panHandlers}>
          <View style={[styles.monthHeader, rowDirection]}>
            <Pressable
              onPress={() => showMonth(monthIndex - 1)}
              accessibilityRole="button"
              accessibilityLabel={t.prevMonth}
              style={({ pressed }) => [styles.monthNav, pressed && styles.pressed]}>
              <Text style={styles.monthNavText}>{isRTL ? '›' : '‹'}</Text>
            </Pressable>
            <Pressable
              onPress={openPicker}
              accessibilityRole="button"
              accessibilityLabel={`${copticMonths[lang][shownMonth - 1]} ${n(shownYear)}, ${t.chooseMonth}`}
              style={({ pressed }) => [styles.monthTitleWrap, pressed && styles.pressed]}>
              <Text style={styles.monthTitle}>
                {copticMonths[lang][shownMonth - 1]} {n(shownYear)} ▾
              </Text>
              <Text style={styles.monthSubtitle}>
                {formatGregorianDate(monthStart, lang)} – {formatGregorianDate(monthStart + daysInMonth - 1, lang, true)}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => showMonth(monthIndex + 1)}
              accessibilityRole="button"
              accessibilityLabel={t.nextMonth}
              style={({ pressed }) => [styles.monthNav, pressed && styles.pressed]}>
              <Text style={styles.monthNavText}>{isRTL ? '‹' : '›'}</Text>
            </Pressable>
          </View>

          <View style={[styles.grid, rowDirection]}>
            {t.weekdays.map((d) => (
              <View key={d} style={styles.weekdayCell}>
                <Text style={styles.weekday} numberOfLines={1}>
                  {d}
                </Text>
              </View>
            ))}
            {cells.map((jdn, i) => {
              if (jdn === null) return <View key={`blank-${i}`} style={styles.cell} />;
              const ev = eventsOn(jdn)[0];
              const isToday = jdn === today;
              const isSelected = jdn === selected;
              const c = jdnToCoptic(jdn);
              const saintDay = hasSaints(c.month, c.day);
              const follow = () => {
                pressFeedback();
                setSelected(jdn);
                followDay(jdn);
              };
              return (
                <Pressable
                  key={jdn}
                  onPress={() => {
                    tapFeedback();
                    setSelected(jdn);
                  }}
                  onLongPress={follow}
                  {...(Platform.OS === 'web'
                    ? {
                        onContextMenu: (e: any) => {
                          e.preventDefault?.();
                          follow();
                        },
                      }
                    : {})}
                  accessibilityHint={t.holdHint}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  accessibilityLabel={`${formatCopticDate(jdn, lang)}${ev ? `, ${ev.name[lang]}` : ''}`}
                  style={styles.cell}>
                  <View
                    style={[
                      styles.day,
                      ev?.kind === 'fast' && styles.dayFast,
                      ev && ev.kind !== 'fast' && styles.dayFeast,
                      isToday && styles.dayToday,
                      isSelected && styles.daySelected,
                    ]}>
                    <Text style={[styles.dayNumber, isToday && styles.dayNumberToday]}>{n(c.day)}</Text>
                    <Text style={[styles.dayGregorian, isToday && styles.dayNumberToday]}>{n(jdnToGregorian(jdn).day)}</Text>
                    <View style={[styles.saintDot, saintDay && { backgroundColor: isToday ? colors.onGold : colors.gold }]} />
                  </View>
                </Pressable>
              );
            })}
          </View>

          <View style={[styles.legend, rowDirection]}>
            <View style={[styles.legendItem, rowDirection]}>
              <View style={[styles.legendSwatch, styles.dayFeast]} />
              <Text style={styles.legendText}>{t.feast}</Text>
            </View>
            <View style={[styles.legendItem, rowDirection]}>
              <View style={[styles.legendSwatch, styles.dayFast]} />
              <Text style={styles.legendText}>{t.fast}</Text>
            </View>
            <View style={[styles.legendItem, rowDirection]}>
              <View style={[styles.saintDot, { backgroundColor: colors.gold }]} />
              <Text style={styles.legendText}>{t.saintDay}</Text>
            </View>
          </View>
          <Text style={styles.holdHint}>{t.holdHint}</Text>
        </View>

        {/* The day */}
        <View style={styles.todayCard}>
          <Text style={[styles.cardLabel, textAlign]}>
            {selected === today ? `${t.today} · ` : ''}
            {t.weekdaysLong[selectedWeekday]} · {formatGregorianDate(selected, lang, true)}
          </Text>
          <Text style={[styles.copticDate, textAlign]}>{formatCopticDate(selected, lang)}</Text>
          <View style={styles.divider} />
          {selectedEvents.length ? (
            selectedEvents.map((ev) => (
              <Pressable
                key={ev.key}
                disabled={!ev.seasonId}
                onPress={() => ev.seasonId && openSeasonHymns(ev.seasonId)}
                accessibilityRole="button"
                style={({ pressed }) => [styles.dayEvent, rowDirection, pressed && styles.pressed]}>
                <View style={[styles.eventMarker, ev.kind === 'fast' ? styles.markerFast : styles.markerFeast]} />
                <View style={styles.flex}>
                  <Text style={[styles.dayEventName, textAlign, ev.kind === 'fast' && { color: colors.fast }]}>{ev.name[lang]}</Text>
                  <Text style={[styles.eventDate, textAlign]}>
                    {kindName[lang][ev.kind]}
                    {ev.end > ev.start ? ` · ${formatGregorianDate(ev.start, lang)} – ${formatGregorianDate(ev.end, lang)}` : ''}
                  </Text>
                </View>
              </Pressable>
            ))
          ) : (
            <Text style={[styles.seasonName, textAlign]}>{currentSeasonName(selectedInfo, lang)}</Text>
          )}
          <View style={[styles.tagRow, rowDirection]}>
            {selectedInfo.weekName ? (
              <View style={styles.tag}>
                <Text style={styles.tagText}>{selectedInfo.weekName[lang]}</Text>
              </View>
            ) : null}
            <View style={styles.tag}>
              <Text style={styles.tagText}>{tuneName[lang][selectedInfo.tune]}</Text>
            </View>
          </View>
          <View style={[styles.cardActions, rowDirection]}>
            <Pressable
              onPress={() => followDay(selected)}
              accessibilityRole="button"
              accessibilityLabel={t.followAlong}
              style={({ pressed }) => [styles.primaryButton, styles.cardActionBtn, pressed && styles.pressed]}>
              <Text style={styles.primaryButtonText}>📖 {t.followAlong}</Text>
            </Pressable>
            <Pressable
              onPress={() => openSeasonHymns(selectedInfo.current?.seasonId ?? 'annual')}
              accessibilityRole="button"
              accessibilityLabel={t.openHymns}
              style={({ pressed }) => [styles.secondaryButton, styles.cardActionBtn, pressed && styles.pressed]}>
              <Text style={styles.secondaryButtonText}>♫ {t.openHymns}</Text>
            </Pressable>
          </View>
        </View>

        {/* The day's saints and their hymns */}
        <SectionHeader title={t.saints} />
        {daySaints.length || hymnSaints.length ? (
          <ListGroup
            rows={[
              ...daySaints.map((saint) => (
                <ListRow
                  key={saint.id}
                  title={saint.name[lang]}
                  sub={saint.story[lang].slice(0, 110).replace(/\s+\S*$/, '') + '…'}
                  onPress={() => router.push({ pathname: '/saints/[id]', params: { id: saint.id } })}
                />
              )),
              // Saints the app has hymns for but no story: their name opens their first hymn
              ...hymnSaints.map(({ name, hymnId }) => (
                <ListRow key={`h-${name.en}`} title={name[lang]} onPress={() => openHymnPage(hymnId)} />
              )),
            ]}
          />
        ) : (
          <Text style={[styles.emptyDay, textAlign]}>{t.noSaints}</Text>
        )}
        {dayHymns.length ? (
          <>
            <SectionHeader title={t.saintHymns} />
            <ListGroup
              rows={dayHymns.map(({ hymn, tab, saint }) => {
                const { main, coptic } = titleLines(hymn, lang, titleStyle);
                return (
                  <ListRow
                    key={hymn.id}
                    title={main}
                    coptic={coptic}
                    sub={`${saintHymnKind[tab]?.[lang] ?? ''} · ${saint[lang]}`}
                    audio={hymn.versions.some((v) => v.audio)}
                    onPress={() => openHymnPage(hymn.id)}
                  />
                );
              })}
            />
          </>
        ) : null}

        {/* Coming up */}
        <View style={styles.sectionGap} />
        {Platform.OS !== 'web' ? (
          <Pressable
            onPress={toggleReminders}
            accessibilityRole="switch"
            accessibilityState={{ checked: feastReminders }}
            style={({ pressed }) => [
              styles.eventRow,
              styles.reminderRow,
              rowDirection,
              feastReminders && styles.reminderRowOn,
              pressed && styles.eventRowPressed,
            ]}>
            <Text style={styles.reminderBell}>{feastReminders ? '🔔' : '🔕'}</Text>
            <View style={styles.flex}>
              <Text style={[styles.eventName, textAlign]}>{t.reminders}</Text>
              <Text style={[styles.eventDate, textAlign]}>{feastReminders ? t.remindersOn : t.remindersOff}</Text>
            </View>
            <View style={[styles.switchTrack, feastReminders && styles.switchTrackOn]}>
              <View style={[styles.switchThumb, feastReminders && styles.switchThumbOn]} />
            </View>
          </Pressable>
        ) : null}
        <Text style={[styles.sectionTitle, textAlign]}>{t.comingUp}</Text>
        {upcoming.map((ev) => (
          <Pressable
            key={ev.key}
            onPress={() => {
              setSelected(ev.start);
              setMonthIndex(monthIndexOf(ev.start));
            }}
            accessibilityRole="button"
            style={({ pressed }) => [styles.eventRow, rowDirection, pressed && styles.eventRowPressed]}>
            <View style={[styles.eventMarker, ev.kind === 'fast' ? styles.markerFast : styles.markerFeast]} />
            <View style={styles.flex}>
              <Text style={[styles.eventName, textAlign]}>{ev.name[lang]}</Text>
              <Text style={[styles.eventDate, textAlign]}>
                {formatGregorianDate(ev.start, lang)}
                {ev.end > ev.start ? ` – ${formatGregorianDate(ev.end, lang)}` : ''} · {formatCopticDate(ev.start, lang)}
              </Text>
            </View>
            <Text style={styles.eventWhen}>{formatDaysUntil(ev.daysUntil, lang)}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Any month of any year */}
      <Sheet visible={picking} title={t.chooseMonth} rtl={isRTL} onClose={() => setPicking(false)}>
        <View style={[styles.yearRow, rowDirection]}>
          <Pressable
            onPress={() => setPickerYear((y) => y - 1)}
            accessibilityRole="button"
            accessibilityLabel={t.prevYear}
            style={({ pressed }) => [styles.monthNav, pressed && styles.pressed]}>
            <Text style={styles.monthNavText}>{isRTL ? '›' : '‹'}</Text>
          </Pressable>
          <View style={styles.monthTitleWrap}>
            <Text style={styles.monthTitle}>{lang === 'ar' ? `${n(pickerYear)} للشهداء` : `${pickerYear} A.M.`}</Text>
            <Text style={styles.monthSubtitle}>
              {n(jdnToGregorian(copticToJdn(pickerYear, 1, 1)).year)} – {n(jdnToGregorian(copticToJdn(pickerYear, 13, 1)).year)}
            </Text>
          </View>
          <Pressable
            onPress={() => setPickerYear((y) => y + 1)}
            accessibilityRole="button"
            accessibilityLabel={t.nextYear}
            style={({ pressed }) => [styles.monthNav, pressed && styles.pressed]}>
            <Text style={styles.monthNavText}>{isRTL ? '‹' : '›'}</Text>
          </Pressable>
        </View>
        <View style={[styles.monthGrid, rowDirection]}>
          {copticMonths[lang].map((name, i) => {
            const index = pickerYear * 13 + i;
            const current = index === monthIndex;
            const now = index === monthIndexOf(today);
            return (
              <View key={name} style={styles.monthChipCell}>
                <Pressable
                  onPress={() => {
                    tapFeedback();
                    showMonth(index);
                    setPicking(false);
                  }}
                  accessibilityRole="button"
                  accessibilityState={{ selected: current }}
                  style={({ pressed }) => [
                    styles.monthChip,
                    now && styles.monthChipNow,
                    current && styles.monthChipCurrent,
                    pressed && styles.pressed,
                  ]}>
                  <Text style={[styles.monthChipName, current && styles.monthChipNameCurrent]} numberOfLines={1} adjustsFontSizeToFit>
                    {name}
                  </Text>
                  <Text style={[styles.monthChipDate, current && styles.monthChipNameCurrent]}>
                    {formatGregorianDate(monthStartOf(index), lang)}
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </View>
      </Sheet>
      <StatusBarBlur />
      <MiniPlayer lang={lang} />
    </View>
  );
}

const createStyles = (colors: AlhanPalette) => StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 16 },
  row: { flexDirection: 'row' },
  rowReverse: { flexDirection: 'row-reverse' },
  alignLeft: { textAlign: 'left' },
  alignRight: { textAlign: 'right' },
  flex: { flex: 1 },
  pressed: { opacity: 0.7 },

  topBar: {
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    minHeight: 48,
    marginBottom: 16,
  },
  topBarTitle: {
    flex: 1,
    marginBottom: 0,
  },
  pillButton: {
    alignItems: 'center',
    gap: 6,
    minHeight: 48,
    paddingHorizontal: 16,
    borderRadius: 24,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
  },
  pillText: { fontSize: 18, color: colors.text, fontWeight: '600' },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.gold,
    lineHeight: 38,
    marginBottom: 16,
  },

  todayCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    borderTopWidth: 3,
    borderTopColor: colors.gold,
    padding: 20,
    marginBottom: 16,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.muted,
    letterSpacing: 0.5,
  },
  copticDate: { fontSize: 26, fontWeight: '800', color: colors.text, marginTop: 4 },
  gregorianDate: { fontSize: 16, color: colors.muted, marginTop: 2 },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 16 },
  seasonName: { fontSize: 22, fontWeight: '800', color: colors.gold, marginTop: 4 },
  tagRow: { flexWrap: 'wrap', gap: 8, marginTop: 10 },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: colors.goldSoft,
  },
  tagFast: { backgroundColor: colors.fastSoft },
  tagText: { fontSize: 14, fontWeight: '700', color: colors.gold },
  tagTextFast: { color: colors.fast },
  cardActions: {
    gap: 10,
    marginTop: 18,
  },
  cardActionBtn: {
    flex: 1,
  },
  primaryButton: {
    minHeight: 48,
    borderRadius: 14,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  primaryButtonText: { fontSize: 16, fontWeight: '800', color: colors.onGold },
  secondaryButton: {
    minHeight: 48,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  secondaryButtonText: { fontSize: 16, fontWeight: '700', color: colors.text },

  monthCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 24,
  },
  monthHeader: { alignItems: 'center', marginBottom: 8 },
  monthNav: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  monthNavText: { fontSize: 28, lineHeight: 32, color: colors.gold, fontWeight: '600' },
  monthTitleWrap: { flex: 1, alignItems: 'center', paddingVertical: 4, borderRadius: 12 },
  monthTitle: { fontSize: 20, fontWeight: '800', color: colors.text },
  monthSubtitle: { fontSize: 13, color: colors.muted, marginTop: 2 },
  grid: { flexWrap: 'wrap' },
  weekdayCell: { width: `${100 / 7}%`, paddingVertical: 4 },
  cell: { width: `${100 / 7}%`, aspectRatio: 0.85, padding: 2 },
  weekday: {
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '700',
    color: colors.muted,
  },
  day: {
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  dayFeast: { backgroundColor: colors.goldSoft },
  dayFast: { backgroundColor: colors.fastSoft },
  dayToday: { backgroundColor: colors.gold },
  daySelected: { borderColor: colors.text },
  dayNumber: { fontSize: 16, fontWeight: '700', color: colors.text },
  dayGregorian: { fontSize: 10, color: colors.muted },
  saintDot: { width: 5, height: 5, borderRadius: 3, marginTop: 2, backgroundColor: 'transparent' },
  dayNumberToday: { color: colors.onGold },
  legend: { gap: 16, justifyContent: 'center', marginTop: 10 },
  legendItem: { alignItems: 'center', gap: 6 },
  legendSwatch: { width: 14, height: 14, borderRadius: 4 },
  legendText: { fontSize: 13, color: colors.muted },
  holdHint: { fontSize: 13, color: colors.muted, textAlign: 'center', marginTop: 8 },

  reminderRow: { marginBottom: 22 },
  reminderRowOn: { borderColor: colors.gold },
  reminderBell: { fontSize: 22 },
  switchTrack: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.border,
    padding: 3,
    justifyContent: 'center',
  },
  switchTrackOn: { backgroundColor: colors.gold },
  switchThumb: { width: 24, height: 24, borderRadius: 12, backgroundColor: colors.text },
  switchThumbOn: { alignSelf: 'flex-end', backgroundColor: colors.onGold },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.gold,
    letterSpacing: 1,
    marginBottom: 12,
  },
  eventRow: {
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  eventRowPressed: { backgroundColor: colors.surfacePressed, borderColor: colors.gold },
  eventMarker: { width: 6, alignSelf: 'stretch', borderRadius: 3 },
  markerFeast: { backgroundColor: colors.gold },
  markerFast: { backgroundColor: colors.fast },
  eventName: { fontSize: 17, fontWeight: '700', color: colors.text },
  dayEvent: { alignItems: 'center', gap: 12, paddingVertical: 6 },
  dayEventName: { fontSize: 20, fontWeight: '800', color: colors.gold },
  emptyDay: { fontSize: 15, color: colors.muted, marginBottom: 8 },
  sectionGap: { height: 24 },
  yearRow: { alignItems: 'center', marginBottom: 12 },
  monthGrid: { flexWrap: 'wrap', marginHorizontal: -4, paddingBottom: 8 },
  monthChipCell: { width: '33.333%', padding: 4 },
  monthChip: {
    minHeight: 64,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  monthChipNow: { borderColor: colors.gold },
  monthChipCurrent: { backgroundColor: colors.gold, borderColor: colors.gold },
  monthChipName: { fontSize: 17, fontWeight: '800', color: colors.text },
  monthChipDate: { fontSize: 12, color: colors.muted, marginTop: 2 },
  monthChipNameCurrent: { color: colors.onGold },
  eventDate: { fontSize: 13, color: colors.muted, marginTop: 3 },
  eventWhen: { fontSize: 14, fontWeight: '700', color: colors.gold },
});
