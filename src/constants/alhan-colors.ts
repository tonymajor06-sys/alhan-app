// Dark palette: Coptic Orthodox church colors - deep burgundy, gold and ivory, as in the icons and vestments
export const alhanColors = {
  background: '#1a0a0e',
  surface: '#2a1217',
  surfacePressed: '#3a1a21',
  border: '#4e2530',
  gold: '#d9ad55',
  goldSoft: 'rgba(217, 173, 85, 0.15)',
  // Text and icons drawn on top of gold
  onGold: '#1a0a0e',
  fast: '#b39ae0',
  fastSoft: 'rgba(179, 154, 224, 0.16)',
  text: '#f7efe2',
  muted: '#c4a9a6',
  // Who is speaking in a response (the deacon uses gold)
  people: '#7fbde0',
  priest: '#f0907e',
};

export type AlhanPalette = typeof alhanColors;

// Same roles on warm parchment, like an old service book: burgundy as the accent, gold-toned borders,
// dark brown ink; the accent is dark enough that text in it stays readable
export const alhanLightColors: AlhanPalette = {
  background: '#f4e8d2',
  surface: '#fdf7ea',
  surfacePressed: '#efdcb8',
  border: '#d6bb85',
  gold: '#7a1626',
  goldSoft: 'rgba(122, 22, 38, 0.10)',
  onGold: '#fdf7ea',
  fast: '#4f3fa6',
  fastSoft: 'rgba(79, 63, 166, 0.12)',
  text: '#2b1610',
  muted: '#6f5340',
  people: '#1f5f80',
  priest: '#8a5a0a',
};
