import { HStack, Spacer, Text, VStack } from '@expo/ui/swift-ui';
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

// Every string is prepared by the app (see season-widget-sync.ios.ts) because
// the widget runtime can't import the calendar code.
export type SeasonWidgetProps = {
  rtl: boolean;
  copticDay: string; // "20 Tout"
  copticYear: string; // "1743 A.M."
  gregorianDate: string; // "30 Sep 2026"
  season: string; // "Annual (ordinary days)"
  seasonKind: string; // "Fast" / "Feast" / "Adam tune"...
  isFast: boolean;
  nextLabel: string; // "Next" / "القادم"
  nextName: string; // "Nativity Fast"
  nextWhen: string; // "In 56 days"
  nextDate: string; // "25 Nov"
};

const SeasonWidget = (props: SeasonWidgetProps, environment: WidgetEnvironment) => {
  'widget';
  const background = '#1a0a0e';
  const gold = '#d9ad55';
  const fastColor = '#a79ff0';
  const text = '#f6f1e7';
  const muted = '#c4a9a6';

  // Lock Screen and tinted widgets are recoloured by the system, so only use
  // our palette when drawing in full colour.
  const fullColor = (environment.widgetRenderingMode ?? 'fullColor') === 'fullColor';
  const color = (c: string) => (fullColor ? [foregroundStyle(c)] : []);
  const align = props.rtl ? 'trailing' : 'leading';
  const url = widgetURL('alhanapp://calendar');

  if (environment.widgetFamily === 'accessoryInline') {
    return <Text modifiers={[url]}>{`☩ ${props.copticDay} · ${props.season}`}</Text>;
  }

  if (environment.widgetFamily === 'accessoryCircular') {
    const [day, ...month] = props.copticDay.split(' ');
    return (
      <VStack spacing={0} modifiers={[url]}>
        <Text modifiers={[font({ size: 22, weight: 'bold' })]}>{day}</Text>
        <Text modifiers={[font({ size: 11 }), lineLimit(1), minimumScaleFactor(0.6)]}>{month.join(' ')}</Text>
      </VStack>
    );
  }

  if (environment.widgetFamily === 'accessoryRectangular') {
    return (
      <VStack alignment={align} spacing={1} modifiers={[url, frame({ maxWidth: 10000, alignment: align })]}>
        <Text modifiers={[font({ size: 15, weight: 'bold' }), lineLimit(1)]}>{`☩ ${props.copticDay}`}</Text>
        <Text modifiers={[font({ size: 13 }), lineLimit(1), minimumScaleFactor(0.8)]}>{props.season}</Text>
        <Text modifiers={[font({ size: 12 }), lineLimit(1), minimumScaleFactor(0.8), foregroundStyle({ type: 'hierarchical', style: 'secondary' })]}>
          {`${props.nextName} · ${props.nextWhen}`}
        </Text>
      </VStack>
    );
  }

  const textAlign = multilineTextAlignment(props.rtl ? 'trailing' : 'leading');
  const seasonColor = props.isFast ? fastColor : gold;
  const shell = [url, containerBackground(background, 'widget'), frame({ maxWidth: 10000, maxHeight: 10000, alignment: props.rtl ? 'topTrailing' : 'topLeading' })];

  const dateBlock = (
    <VStack alignment={align} spacing={2}>
      <Text modifiers={[font({ size: 12, weight: 'bold' }), ...color(gold)]}>☩ ALHAN</Text>
      <Text modifiers={[font({ size: 22, weight: 'bold', design: 'serif' }), lineLimit(1), minimumScaleFactor(0.6), ...color(text)]}>
        {props.copticDay}
      </Text>
      <Text modifiers={[font({ size: 12 }), lineLimit(1), ...color(muted)]}>{props.copticYear}</Text>
    </VStack>
  );

  const seasonBlock = (
    <VStack alignment={align} spacing={2}>
      <Text modifiers={[font({ size: 11, weight: 'semibold' }), lineLimit(1), ...color(muted)]}>{props.seasonKind}</Text>
      <Text modifiers={[font({ size: 15, weight: 'bold' }), lineLimit(2), minimumScaleFactor(0.75), textAlign, ...color(seasonColor)]}>
        {props.season}
      </Text>
    </VStack>
  );

  const nextBlock = (
    <VStack alignment={align} spacing={1}>
      <Text modifiers={[font({ size: 11, weight: 'semibold' }), lineLimit(1), ...color(muted)]}>
        {`${props.nextLabel} · ${props.nextWhen}`}
      </Text>
      <Text modifiers={[font({ size: 13, weight: 'semibold' }), lineLimit(1), minimumScaleFactor(0.7), ...color(text)]}>
        {props.nextName}
      </Text>
    </VStack>
  );

  if (environment.widgetFamily === 'systemSmall') {
    return (
      <VStack alignment={align} spacing={0} modifiers={shell}>
        {dateBlock}
        <Spacer />
        {seasonBlock}
        <Spacer />
        {nextBlock}
      </VStack>
    );
  }

  // Medium and larger: date on one side, season + what's next on the other
  const left = (
    <VStack alignment={align} spacing={0}>
      {dateBlock}
      <Spacer />
      <Text modifiers={[font({ size: 12 }), lineLimit(1), ...color(muted)]}>{props.gregorianDate}</Text>
    </VStack>
  );
  const right = (
    <VStack alignment={align} spacing={0}>
      {seasonBlock}
      <Spacer />
      {nextBlock}
      <Text modifiers={[font({ size: 11 }), lineLimit(1), ...color(muted)]}>{props.nextDate}</Text>
    </VStack>
  );

  return (
    <HStack spacing={16} modifiers={shell}>
      {props.rtl ? right : left}
      <Spacer />
      {props.rtl ? left : right}
    </HStack>
  );
};

export default createWidget('SeasonWidget', SeasonWidget);
