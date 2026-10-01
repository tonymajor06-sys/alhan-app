// Dark palette: the app's original look, matching the home-screen widget
export const alhanColors = {
  background: '#0e1322',
  surface: '#182036',
  surfacePressed: '#222c48',
  border: '#2b3553',
  gold: '#d9ad55',
  goldSoft: 'rgba(217, 173, 85, 0.14)',
  // Text and icons drawn on top of gold
  onGold: '#0e1322',
  fast: '#8f86d9',
  fastSoft: 'rgba(143, 134, 217, 0.16)',
  text: '#f6f1e7',
  muted: '#a4abc0',
};

export type AlhanPalette = typeof alhanColors;

// Same roles on warm parchment; gold and violet are darkened so text in them stays readable
export const alhanLightColors: AlhanPalette = {
  background: '#f6f1e6',
  surface: '#ffffff',
  surfacePressed: '#f1e7d2',
  border: '#e0d5bf',
  gold: '#8f6210',
  goldSoft: 'rgba(143, 98, 16, 0.12)',
  onGold: '#ffffff',
  fast: '#5a4ec0',
  fastSoft: 'rgba(90, 78, 192, 0.12)',
  text: '#1f1b14',
  muted: '#675f51',
};
