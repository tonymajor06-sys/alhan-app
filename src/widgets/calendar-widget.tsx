import { HStack, Spacer, Text, VStack } from '@expo/ui/swift-ui';
import {
  background,
  containerBackground,
  font,
  foregroundStyle,
  frame,
  lineLimit,
  minimumScaleFactor,
  shapes,
  widgetURL,
} from '@expo/ui/swift-ui/modifiers';
import { createWidget, type WidgetEnvironment } from 'expo-widgets';

// Every string and the whole month grid are prepared by the app (see calendar-widget-props.ts)
// because the widget runtime can't import the calendar code.
export type CalendarWidgetProps = {
  rtl: boolean;
  monthTitle: string; // "Thout 1743"
  gregorianRange: string; // "11 Sep – 10 Oct"
  weekdays: string[]; // 7 short names, already in display order
  cells: string[]; // day numbers, '' for blanks; rows of 7, already in display order
  kinds: number[]; // per cell: 0 ordinary, 1 feast, 2 fast
  todayIndex: number; // cell holding today
  weekRow: number; // row holding today (the medium widget shows only this week)
  season: string;
  isFast: boolean;
  next: string; // "Nativity Fast · In 56 days"
};

const CalendarWidget = (props: CalendarWidgetProps, environment: WidgetEnvironment) => {
  'widget';
  const bg = '#1a0a0e';
  const gold = '#d9ad55';
  const fastColor = '#a79ff0';
  const text = '#f6f1e7';
  const muted = '#c4a9a6';
  const onGold = '#1a1408';

  const fullColor = (environment.widgetRenderingMode ?? 'fullColor') === 'fullColor';
  const color = (c: string) => (fullColor ? [foregroundStyle(c)] : []);
  const align = props.rtl ? 'trailing' : 'leading';
  const large = environment.widgetFamily === 'systemLarge';
  const cellHeight = large ? 34 : 30;

  const rows: number[] = [];
  for (let r = 0; r * 7 < props.cells.length; r++) rows.push(r);
  const shownRows = large ? rows : [props.weekRow];

  const cell = (i: number) => {
    const day = props.cells[i] ?? '';
    const isToday = i === props.todayIndex;
    const kind = props.kinds[i] ?? 0;
    const dayColor = isToday ? onGold : kind === 1 ? gold : kind === 2 ? fastColor : text;
    return (
      <Text
        modifiers={[
          font({ size: large ? 16 : 15, weight: isToday || kind === 1 ? 'bold' : 'regular' }),
          ...color(dayColor),
          frame({ maxWidth: 10000, height: cellHeight }),
          ...(isToday && fullColor ? [background(gold, shapes.circle())] : []),
        ]}>
        {day}
      </Text>
    );
  };

  const header = (
    <HStack spacing={8}>
      {props.rtl ? <Spacer /> : null}
      <VStack alignment={align} spacing={1}>
        <Text modifiers={[font({ size: 11, weight: 'bold' }), ...color(gold)]}>☩ ALHAN</Text>
        <Text modifiers={[font({ size: 19, weight: 'bold', design: 'serif' }), lineLimit(1), minimumScaleFactor(0.7), ...color(text)]}>
          {props.monthTitle}
        </Text>
      </VStack>
      {props.rtl ? null : <Spacer />}
      <VStack alignment={props.rtl ? 'leading' : 'trailing'} spacing={1}>
        <Text modifiers={[font({ size: 13, weight: 'semibold' }), lineLimit(1), minimumScaleFactor(0.7), ...color(props.isFast ? fastColor : gold)]}>
          {props.season}
        </Text>
        <Text modifiers={[font({ size: 11 }), lineLimit(1), ...color(muted)]}>{props.gregorianRange}</Text>
      </VStack>
    </HStack>
  );

  const weekdayRow = (
    <HStack spacing={0}>
      {props.weekdays.map((w, i) => (
        <Text key={`w${i}`} modifiers={[font({ size: 11, weight: 'semibold' }), lineLimit(1), minimumScaleFactor(0.6), ...color(muted), frame({ maxWidth: 10000 })]}>
          {w}
        </Text>
      ))}
    </HStack>
  );

  return (
    <VStack
      spacing={large ? 6 : 4}
      modifiers={[widgetURL('alhanapp://calendar'), containerBackground(bg, 'widget'), frame({ maxWidth: 10000, maxHeight: 10000, alignment: 'top' })]}>
      {header}
      {large ? <Spacer /> : null}
      {weekdayRow}
      {shownRows.map((r) => (
        <HStack key={`r${r}`} spacing={0}>
          {[0, 1, 2, 3, 4, 5, 6].map((c) => cell(r * 7 + c))}
        </HStack>
      ))}
      <Spacer />
      <HStack>
        {props.rtl ? <Spacer /> : null}
        <Text modifiers={[font({ size: 12, weight: 'semibold' }), lineLimit(1), minimumScaleFactor(0.7), ...color(text)]}>{props.next}</Text>
        {props.rtl ? null : <Spacer />}
      </HStack>
    </VStack>
  );
};

export default createWidget('CalendarWidget', CalendarWidget);
