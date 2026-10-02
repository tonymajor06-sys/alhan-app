import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AlhanPalette } from '@/constants/alhan-colors';
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
import { useAlhanColors, useThemedStyles } from '@/hooks/use-alhan-colors';
import { updateSettings, useSettings } from '@/hooks/use-settings';
import { useTodayJdn } from '@/hooks/use-today';
import { requestReminderPermission } from '@/notifications/feast-reminders';

const strings = {
  en: {
    back: 'Back',
    title: 'Coptic Calendar',
    today: 'Today',
    nowIn: 'Now in',
    comingUp: 'Coming up',
    openHymns: 'Open hymns',
    goToToday: 'Today',
    prevMonth: 'Previous month',
    nextMonth: 'Next month',
    feast: 'Feast',
    fast: 'Fast',
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    reminders: 'Feast reminders',
    remindersOn: 'On · the evening before each feast and fast',
    remindersOff: 'Off · tap to get a reminder the evening before',
    remindersDenied: 'Notifications are turned off for Alhan. You can allow them in Settings.',
  },
  ar: {
    back: 'رجوع',
    title: 'التقويم القبطي',
    today: 'اليوم',
    nowIn: 'نحن الآن في',
    comingUp: 'المناسبات القادمة',
    openHymns: 'افتح الألحان',
    goToToday: 'اليوم',
    prevMonth: 'الشهر السابق',
    nextMonth: 'الشهر التالي',
    feast: 'عيد',
    fast: 'صوم',
    weekdays: ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
    reminders: 'تذكير بالأعياد',
    remindersOn: 'مفعّل · مساء اليوم السابق لكل عيد وصوم',
    remindersOff: 'متوقف · اضغط لتصلك رسالة تذكير مساء اليوم السابق',
    remindersDenied: 'الإشعارات متوقفة لتطبيق ألحان. يمكنك السماح بها من الإعدادات.',
  },
};

const openSeasonHymns = (seasonId: string) =>
  router.dismissTo({ pathname: '/', params: { season: seasonId, at: String(Date.now()) } });

export default function CalendarScreen() {
  const { language: lang, feastReminders } = useSettings();
  const t = strings[lang];
  const isRTL = lang === 'ar';
  const insets = useSafeAreaInsets();
  const colors = useAlhanColors();
  const styles = useThemedStyles(createStyles);
  const today = useTodayJdn();

  const [selected, setSelected] = useState(today);
  // Month being shown, as an index counting Coptic months from year 0
  const todayCoptic = jdnToCoptic(today);
  const [monthIndex, setMonthIndex] = useState(todayCoptic.year * 13 + todayCoptic.month - 1);
  const shownYear = Math.floor(monthIndex / 13);
  const shownMonth = (monthIndex % 13) + 1;

  const monthStart = copticToJdn(shownYear, shownMonth, 1);
  const daysInMonth = shownMonth === 13 ? copticToJdn(shownYear + 1, 1, 1) - monthStart : 30;
  const leadingBlanks = (monthStart + 1) % 7; // 0 = Sunday

  const events = eventsAround(monthStart);
  const topEventOn = (jdn: number): ChurchEvent | undefined =>
    events.filter((ev) => ev.start <= jdn && jdn <= ev.end).sort((a, b) => b.priority - a.priority)[0];

  const selectedInfo = getSeasonInfo(selected, 0);
  const upcoming = getSeasonInfo(today, 10).upcoming;

  const rowDirection = isRTL ? styles.rowReverse : styles.row;
  const textAlign = isRTL ? styles.alignRight : styles.alignLeft;
  const n = (v: number) => (isRTL ? toArabicDigits(v) : String(v));

  const goToToday = () => {
    setSelected(today);
    setMonthIndex(todayCoptic.year * 13 + todayCoptic.month - 1);
  };

  const toggleReminders = async () => {
    if (feastReminders) return updateSettings({ feastReminders: false });
    if (await requestReminderPermission()) updateSettings({ feastReminders: true });
    else Alert.alert(t.remindersDenied);
  };

  const cells = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => monthStart + i),
  ];

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 40 }]}>
        <View style={[styles.topBar, rowDirection]}>
          <Pressable
            onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}
            accessibilityRole="button"
            accessibilityLabel={t.back}
            style={({ pressed }) => [styles.pillButton, rowDirection, pressed && styles.pressed]}>
            <Text style={styles.backArrow}>{isRTL ? '›' : '‹'}</Text>
            <Text style={styles.pillText}>{t.back}</Text>
          </Pressable>
          {selected !== today || monthIndex !== todayCoptic.year * 13 + todayCoptic.month - 1 ? (
            <Pressable
              onPress={goToToday}
              accessibilityRole="button"
              style={({ pressed }) => [styles.pillButton, pressed && styles.pressed]}>
              <Text style={styles.pillText}>{t.goToToday}</Text>
            </Pressable>
          ) : null}
        </View>

        <Text style={[styles.headerTitle, textAlign]}>{t.title}</Text>

        {/* Selected day */}
        <View style={styles.todayCard}>
          <Text style={[styles.cardLabel, textAlign]}>
            {selected === today ? t.today : formatGregorianDate(selected, lang, true)}
          </Text>
          <Text style={[styles.copticDate, textAlign]}>{formatCopticDate(selected, lang)}</Text>
          {selected === today ? (
            <Text style={[styles.gregorianDate, textAlign]}>{formatGregorianDate(selected, lang, true)}</Text>
          ) : null}
          <View style={styles.divider} />
          <Text style={[styles.cardLabel, textAlign]}>{t.nowIn}</Text>
          <Text
            style={[
              styles.seasonName,
              textAlign,
              selectedInfo.current?.kind === 'fast' && { color: colors.fast },
            ]}>
            {currentSeasonName(selectedInfo, lang)}
          </Text>
          <View style={[styles.tagRow, rowDirection]}>
            {selectedInfo.current ? (
              <View style={[styles.tag, selectedInfo.current.kind === 'fast' && styles.tagFast]}>
                <Text style={[styles.tagText, selectedInfo.current.kind === 'fast' && styles.tagTextFast]}>
                  {kindName[lang][selectedInfo.current.kind]}
                </Text>
              </View>
            ) : null}
            <View style={styles.tag}>
              <Text style={styles.tagText}>{tuneName[lang][selectedInfo.tune]}</Text>
            </View>
          </View>
          <Pressable
            onPress={() => openSeasonHymns(selectedInfo.current?.seasonId ?? 'annual')}
            accessibilityRole="button"
            style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
            <Text style={styles.primaryButtonText}>♫ {t.openHymns}</Text>
          </Pressable>
        </View>

        {/* Month grid */}
        <View style={styles.monthCard}>
          <View style={[styles.monthHeader, rowDirection]}>
            <Pressable
              onPress={() => setMonthIndex((m) => m - 1)}
              accessibilityRole="button"
              accessibilityLabel={t.prevMonth}
              style={({ pressed }) => [styles.monthNav, pressed && styles.pressed]}>
              <Text style={styles.monthNavText}>{isRTL ? '›' : '‹'}</Text>
            </Pressable>
            <View style={styles.monthTitleWrap}>
              <Text style={styles.monthTitle}>
                {copticMonths[lang][shownMonth - 1]} {n(shownYear)}
              </Text>
              <Text style={styles.monthSubtitle}>
                {formatGregorianDate(monthStart, lang)} – {formatGregorianDate(monthStart + daysInMonth - 1, lang, true)}
              </Text>
            </View>
            <Pressable
              onPress={() => setMonthIndex((m) => m + 1)}
              accessibilityRole="button"
              accessibilityLabel={t.nextMonth}
              style={({ pressed }) => [styles.monthNav, pressed && styles.pressed]}>
              <Text style={styles.monthNavText}>{isRTL ? '‹' : '›'}</Text>
            </Pressable>
          </View>

          <View style={[styles.grid, rowDirection]}>
            {t.weekdays.map((d) => (
              <View key={d} style={styles.cell}>
                <Text style={styles.weekday} numberOfLines={1}>
                  {d}
                </Text>
              </View>
            ))}
            {cells.map((jdn, i) => {
              if (jdn === null) return <View key={`blank-${i}`} style={styles.cell} />;
              const ev = topEventOn(jdn);
              const isToday = jdn === today;
              const isSelected = jdn === selected;
              return (
                <Pressable
                  key={jdn}
                  onPress={() => setSelected(jdn)}
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
                    <Text style={[styles.dayNumber, isToday && styles.dayNumberToday]}>
                      {n(jdn - monthStart + 1)}
                    </Text>
                    <Text style={[styles.dayGregorian, isToday && styles.dayNumberToday]}>
                      {n(jdnToGregorian(jdn).day)}
                    </Text>
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
          </View>
        </View>

        {/* Upcoming */}
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
              const c = jdnToCoptic(ev.start);
              setSelected(ev.start);
              setMonthIndex(c.year * 13 + c.month - 1);
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
    marginBottom: 16,
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
  backArrow: { fontSize: 28, lineHeight: 32, color: colors.gold, fontWeight: '600' },
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
  primaryButton: {
    marginTop: 18,
    minHeight: 52,
    borderRadius: 14,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: { fontSize: 18, fontWeight: '800', color: colors.onGold },

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
  monthTitleWrap: { flex: 1, alignItems: 'center' },
  monthTitle: { fontSize: 20, fontWeight: '800', color: colors.text },
  monthSubtitle: { fontSize: 13, color: colors.muted, marginTop: 2 },
  grid: { flexWrap: 'wrap' },
  cell: { width: `${100 / 7}%`, aspectRatio: 0.9, padding: 2 },
  weekday: {
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '700',
    color: colors.muted,
    marginTop: 'auto',
    marginBottom: 4,
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
  dayNumberToday: { color: colors.onGold },
  legend: { gap: 16, justifyContent: 'center', marginTop: 10 },
  legendItem: { alignItems: 'center', gap: 6 },
  legendSwatch: { width: 14, height: 14, borderRadius: 4 },
  legendText: { fontSize: 13, color: colors.muted },

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
  eventDate: { fontSize: 13, color: colors.muted, marginTop: 3 },
  eventWhen: { fontSize: 14, fontWeight: '700', color: colors.gold },
});
