import { Spacer, Text, VStack } from '@expo/ui/swift-ui';
import {
  containerBackground,
  font,
  foregroundStyle,
  frame,
  lineLimit,
  minimumScaleFactor,
  multilineTextAlignment,
  widgetURL,
} from '@expo/ui/swift-ui/modifiers';
import { createWidget, type WidgetEnvironment } from 'expo-widgets';

// Today's Coptic date and a short verse for the day, mainly for the lock screen, like a verse-of-the-day widget.
// Every string is prepared by the app (see verse-widget-props.ts) because the widget runtime can't import app code.
export type VerseWidgetProps = {
  rtl: boolean;
  copticDay: string; // "2 Babah"
  season: string; // "Annual (ordinary days)"
  isFast: boolean;
  verse: string;
  source: string; // "Psalm 150"
};

const VerseWidget = (props: VerseWidgetProps, environment: WidgetEnvironment) => {
  'widget';
  const background = '#1a0a0e';
  const gold = '#d9ad55';
  const fastColor = '#a79ff0';
  const text = '#f6f1e7';
  const muted = '#c4a9a6';

  // The lock screen recolours widgets itself, so the palette is only used in full colour
  const fullColor = (environment.widgetRenderingMode ?? 'fullColor') === 'fullColor';
  const color = (c: string) => (fullColor ? [foregroundStyle(c)] : []);
  const align = props.rtl ? 'trailing' : 'leading';
  const textAlign = multilineTextAlignment(props.rtl ? 'trailing' : 'leading');
  const url = widgetURL('copticpsalmody://');

  // One line above the clock: the date and the start of the verse
  if (environment.widgetFamily === 'accessoryInline') {
    return <Text modifiers={[url]}>{`☩ ${props.copticDay} · ${props.verse}`}</Text>;
  }

  // Under the clock: the date, then as much of the verse as fits
  if (environment.widgetFamily === 'accessoryRectangular') {
    return (
      <VStack alignment={align} spacing={1} modifiers={[url, frame({ maxWidth: 10000, alignment: align })]}>
        <Text modifiers={[font({ size: 13, weight: 'bold' }), lineLimit(1)]}>{`☩ ${props.copticDay}`}</Text>
        <Text modifiers={[font({ size: 13 }), lineLimit(3), minimumScaleFactor(0.7), textAlign]}>{props.verse}</Text>
      </VStack>
    );
  }

  // Home screen: date and season on top, the verse and where it is from below
  const large = environment.widgetFamily !== 'systemSmall';
  return (
    <VStack
      alignment={align}
      spacing={0}
      modifiers={[url, containerBackground(background, 'widget'), frame({ maxWidth: 10000, maxHeight: 10000, alignment: props.rtl ? 'topTrailing' : 'topLeading' })]}>
      <Text modifiers={[font({ size: 12, weight: 'bold' }), lineLimit(1), ...color(gold)]}>{`☩ ${props.copticDay}`}</Text>
      <Text modifiers={[font({ size: 11 }), lineLimit(1), minimumScaleFactor(0.7), ...color(props.isFast ? fastColor : muted)]}>
        {props.season}
      </Text>
      <Spacer />
      <Text modifiers={[font({ size: large ? 17 : 14, design: 'serif' }), lineLimit(large ? 4 : 5), minimumScaleFactor(0.6), textAlign, ...color(text)]}>
        {props.verse}
      </Text>
      <Spacer />
      <Text modifiers={[font({ size: 11, weight: 'semibold' }), lineLimit(1), minimumScaleFactor(0.7), ...color(gold)]}>{props.source}</Text>
    </VStack>
  );
};

export default createWidget('VerseWidget', VerseWidget);
