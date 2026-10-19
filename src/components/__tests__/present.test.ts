import { fitFontSize, generateStaticParams, getSavedScale, MAX_SCALE, MIN_SCALE, SCALE_STEP, STORAGE_SCALE_KEY } from '../../app/present/[id]';
import { writeSetting } from '../../hooks/settings-storage';

jest.mock('react-native-worklets', () => ({}));
jest.mock('react-native-reanimated', () => ({
  default: {
    View: 'View',
    createAnimatedComponent: (c: any) => c,
  },
  useSharedValue: jest.fn(),
  useAnimatedStyle: jest.fn(),
  withTiming: jest.fn(),
  withRepeat: jest.fn(),
  cancelAnimation: jest.fn(),
}));
jest.mock('expo-audio', () => ({
  createAudioPlayer: jest.fn(),
  setAudioModeAsync: jest.fn(),
}));
jest.mock('expo-keep-awake', () => ({
  useKeepAwake: jest.fn(),
  activateKeepAwakeAsync: jest.fn(),
  deactivateKeepAwake: jest.fn(),
}));
jest.mock('expo-haptics', () => ({}));
jest.mock('expo-notifications', () => ({}));
jest.mock('expo-sqlite/kv-store', () => {
  const store = new Map<string, string>();
  return {
    getItemSync: (key: string) => store.get(key) ?? null,
    setItemSync: (key: string, value: string) => store.set(key, value),
  };
});

describe('Projector Screen Text Sizing and Configuration', () => {
  afterEach(() => {
    try {
      writeSetting(STORAGE_SCALE_KEY, '');
    } catch {
      // ignore
    }
  });

  test('constants have expected ranges and step', () => {
    expect(STORAGE_SCALE_KEY).toBe('projector-text-scale');
    expect(MIN_SCALE).toBe(0.5);
    expect(MAX_SCALE).toBe(2.5);
    expect(SCALE_STEP).toBe(0.1);
  });

  test('getSavedScale returns fallback when empty or invalid', () => {
    writeSetting(STORAGE_SCALE_KEY, '');
    expect(getSavedScale(1)).toBe(1);

    writeSetting(STORAGE_SCALE_KEY, 'invalid');
    expect(getSavedScale(1.2)).toBe(1.2);

    writeSetting(STORAGE_SCALE_KEY, '0.1'); // below MIN_SCALE
    expect(getSavedScale(1)).toBe(1);

    writeSetting(STORAGE_SCALE_KEY, '3.5'); // above MAX_SCALE
    expect(getSavedScale(1)).toBe(1);
  });

  test('getSavedScale returns stored scale when within range', () => {
    writeSetting(STORAGE_SCALE_KEY, '1.4');
    expect(getSavedScale(1)).toBe(1.4);

    writeSetting(STORAGE_SCALE_KEY, '0.8');
    expect(getSavedScale(1)).toBe(0.8);
  });

  test('fitFontSize calculates responsive sizes', () => {
    // Short text on a wide screen gets a large font size
    const shortText = ['Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ'];
    const largeSize = fitFontSize(shortText, 800, 600);
    expect(largeSize).toBeGreaterThanOrEqual(40);

    // Long multi-paragraph text requires smaller font size to fit same height
    const longText = [
      'Line 1 of hymn\nLine 2 of hymn\nLine 3 of hymn\nLine 4 of hymn\nLine 5 of hymn\nLine 6 of hymn\nLine 7 of hymn\nLine 8 of hymn\nLine 9 of hymn\nLine 10 of hymn',
    ];
    const smallerSize = fitFontSize(longText, 400, 400);
    expect(smallerSize).toBeLessThan(largeSize);

    // Empty text array returns default 36
    expect(fitFontSize([], 800, 600)).toBe(36);
  });

  test('generateStaticParams provides params for all hymns', async () => {
    const params = await generateStaticParams();
    expect(params.length).toBeGreaterThan(50);
    expect(params[0]).toHaveProperty('id');
  });
});
