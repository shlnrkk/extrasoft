import type { Composition, TextLayer, LayerAnimation } from './types';

const still: LayerAnimation = { preset: 'none', speed: 1, easing: 'easeInOut', loop: true };
const text = (id: string, value: string, x: number, y: number, size: number, options: Partial<TextLayer> = {}): TextLayer => ({
  id, text: value, x, y, width: 1000, fontFamily: 'Space Grotesk', fontSize: size, fontWeight: 700,
  letterSpacing: -2, align: 'left', fill: '#171815', rotation: 0, opacity: 1, stroke: '#171815', strokeWidth: 0,
  shadowColor: '#000000', shadowBlur: 0, blendMode: 'source-over', animation: { ...still }, ...options,
});
const composition = (id: string, name: string, background: string, layers: TextLayer[]): Composition => ({ id, name, background, width: 1200, height: 900, layers });

/** The artboards are deliberately made only from editable text layers. */
export const presets: Composition[] = [
  composition('soft-impact', 'Soft impact', '#e9ff60', [
    text('si-1', 'EXTRASOFT®     /     TYPE EXPERIMENTS', 70, 55, 21, { fontWeight: 500, letterSpacing: 1, width: 1060 }),
    text('si-2', 'MAKE', 50, 170, 272, { letterSpacing: -18, width: 1100, animation: { preset: 'kinetic', speed: 1, easing: 'easeOut', loop: true } }),
    text('si-3', 'SOME', 50, 375, 272, { letterSpacing: -18, width: 1100 }),
    text('si-4', 'NOISE.', 50, 580, 272, { letterSpacing: -18, width: 1100 }),
    text('si-5', 'A LITTLE LOUDER, PLEASE.   ↗', 750, 820, 17, { width: 390, fontWeight: 500, letterSpacing: 1, align: 'right' }),
  ]),
  composition('after-hours', 'After hours', '#191a17', [
    text('ah-1', 'N° 02 / THE NIGHT ISSUE', 68, 58, 20, { fill: '#e7e5da', fontWeight: 500, letterSpacing: 2 }),
    text('ah-2', 'after', 95, 130, 245, { fill: '#f2f0e7', fontFamily: 'Playfair Display', fontWeight: 700, letterSpacing: -12, width: 1000 }),
    text('ah-3', 'hours', 290, 335, 245, { fill: '#f2f0e7', fontFamily: 'Playfair Display', fontWeight: 700, letterSpacing: -12, width: 850, animation: { preset: 'reveal', speed: 0.8, easing: 'easeInOut', loop: true } }),
    text('ah-4', 'A STUDY IN CONTRAST', 72, 785, 20, { fill: '#d9ff55', fontWeight: 500, letterSpacing: 2 }),
    text('ah-5', '01 — 04', 935, 785, 20, { fill: '#d9ff55', width: 190, align: 'right', fontWeight: 500, letterSpacing: 2 }),
  ]),
  composition('in-motion', 'In motion', '#f2eee5', [
    text('im-1', 'MOVEMENT STUDY / 001', 68, 58, 18, { fontWeight: 500, letterSpacing: 2 }),
    text('im-2', 'IN', 80, 145, 240, { fill: '#1c1d1a', width: 420 }),
    text('im-3', 'MO', 330, 300, 270, { fill: '#1c1d1a', width: 600, animation: { preset: 'wave', speed: 1, easing: 'easeInOut', loop: true } }),
    text('im-4', 'TION', 600, 480, 240, { fill: '#1c1d1a', width: 580 }),
    text('im-5', '↗', 96, 610, 155, { fill: '#fe5b38', width: 200 }),
    text('im-6', 'FORM FOLLOWS FEELING', 68, 815, 18, { fontWeight: 500, letterSpacing: 2 }),
  ]),
  composition('echo-chamber', 'Echo chamber', '#dedbd1', [
    text('ec-1', 'ECHO', 70, 90, 250, { fill: '#252620', width: 1060, letterSpacing: -15 }),
    text('ec-2', 'ECHO', 70, 265, 250, { fill: '#dedbd1', stroke: '#252620', strokeWidth: 3, width: 1060, letterSpacing: -15 }),
    text('ec-3', 'ECHO', 70, 440, 250, { fill: '#dedbd1', stroke: '#252620', strokeWidth: 3, width: 1060, letterSpacing: -15, animation: { preset: 'glitch', speed: 0.8, easing: 'linear', loop: true } }),
    text('ec-4', 'SOUND / SPACE / REPETITION', 75, 790, 18, { fontWeight: 500, letterSpacing: 2 }),
  ]),
  composition('future-perfect', 'Future perfect', '#c9b8ed', [
    text('fp-1', 'TOMORROW', 67, 85, 130, { fontWeight: 700, letterSpacing: -8, width: 1060 }),
    text('fp-2', 'IS A', 67, 215, 130, { fontWeight: 700, letterSpacing: -8, width: 1060 }),
    text('fp-3', 'BLANK', 67, 345, 130, { fontWeight: 700, letterSpacing: -8, width: 1060 }),
    text('fp-4', 'PAGE.', 67, 475, 130, { fontWeight: 700, letterSpacing: -8, width: 1060, animation: { preset: 'typewriter', speed: 1, easing: 'linear', loop: true } }),
    text('fp-5', '✳', 870, 570, 230, { width: 250, fill: '#edff62', rotation: 15 }),
    text('fp-6', 'WRITE SOMETHING GOOD  /  2025', 75, 805, 18, { fontWeight: 500, letterSpacing: 2 }),
  ]),
  composition('less-but-better', 'Less, but better', '#f3f0e7', [
    text('lb-1', 'THE ART OF', 80, 85, 20, { fontWeight: 500, letterSpacing: 3 }),
    text('lb-2', 'less,', 70, 180, 230, { fontFamily: 'DM Serif Display', fontWeight: 400, letterSpacing: -8, width: 1060 }),
    text('lb-3', 'but better.', 70, 390, 170, { fontFamily: 'DM Serif Display', fontWeight: 400, letterSpacing: -7, width: 1080 }),
    text('lb-4', 'A LITTLE MORE MEANING.\nA LITTLE LESS NOISE.', 75, 735, 20, { fontWeight: 500, letterSpacing: 1, width: 600 }),
    text('lb-5', '№ 06', 935, 780, 24, { width: 180, align: 'right', fontWeight: 500 }),
  ]),
  composition('digital-garden', 'Digital garden', '#142c25', [
    text('dg-1', 'GROW', 72, 160, 220, { fill: '#dcff72', width: 1060, letterSpacing: -12, animation: { preset: 'stagger', speed: 1, easing: 'easeOut', loop: true } }),
    text('dg-2', 'WILD', 72, 330, 220, { fill: '#dcff72', width: 1060, letterSpacing: -12 }),
    text('dg-3', '✳', 875, 570, 180, { fill: '#dcff72', width: 200, rotation: -15 }),
    text('dg-4', 'A DIGITAL GARDEN\nFOR NEW IDEAS', 80, 725, 20, { fill: '#dcff72', width: 500, fontWeight: 500, letterSpacing: 2 }),
    text('dg-5', '001 / ∞', 80, 62, 18, { fill: '#dcff72', fontWeight: 500, letterSpacing: 2 }),
  ]),
  composition('off-grid', 'Off grid', '#ef573d', [
    text('og-1', 'OFF', 65, 100, 270, { fill: '#f7f1e4', width: 900, letterSpacing: -17 }),
    text('og-2', 'GRID', 180, 320, 270, { fill: '#f7f1e4', width: 900, letterSpacing: -17, animation: { preset: 'scramble', speed: 1, easing: 'linear', loop: true } }),
    text('og-3', 'DO THINGS DIFFERENTLY', 65, 760, 19, { fill: '#f7f1e4', fontWeight: 500, letterSpacing: 2 }),
    text('og-4', '↗', 920, 690, 125, { fill: '#f7f1e4', width: 170 }),
  ]),
  composition('blue-note', 'Blue note', '#1234d4', [
    text('bn-1', 'A SMALL STUDY IN RHYTHM', 72, 65, 18, { fill: '#f5f1e6', fontFamily: 'Space Mono', fontWeight: 400, letterSpacing: 1 }),
    text('bn-2', 'blue', 68, 145, 300, { fill: '#f5f1e6', fontFamily: 'DM Serif Display', fontWeight: 400, letterSpacing: -16, width: 1000 }),
    text('bn-3', 'NOTE', 320, 400, 220, { fill: '#f7e75b', fontFamily: 'Archivo Black', fontWeight: 400, letterSpacing: -14, width: 800, animation: { preset: 'kinetic', speed: .7, easing: 'easeInOut', loop: true } }),
    text('bn-4', '01  /  SOUND ON PAPER', 75, 804, 20, { fill: '#f5f1e6', fontFamily: 'Space Mono', fontWeight: 400, letterSpacing: 0 }),
  ]),
  composition('sideways', 'Sideways', '#f2e9d7', [
    text('sw-1', 'A DIFFERENT PERSPECTIVE', 70, 64, 19, { fontFamily: 'Space Mono', fontWeight: 400, letterSpacing: 1 }),
    text('sw-2', 'TURN', 75, 155, 240, { fontFamily: 'Oswald', fontWeight: 700, letterSpacing: -6, width: 900 }),
    text('sw-3', 'IT', 170, 380, 240, { fontFamily: 'Oswald', fontWeight: 700, letterSpacing: -6, width: 350, fill: '#f14b34', rotation: -8 }),
    text('sw-4', 'SIDEWAYS', 430, 725, 93, { fontFamily: 'Oswald', fontWeight: 700, letterSpacing: -2, width: 760, rotation: -90, animation: { preset: 'reveal', speed: .8, easing: 'easeOut', loop: true } }),
    text('sw-5', '↗', 920, 620, 150, { width: 170, fill: '#f14b34' }),
  ]),
  composition('electric-dreams', 'Electric dreams', '#eb87bb', [
    text('ed-1', 'ELECTRIC', 55, 115, 145, { fontFamily: 'Archivo Black', fontWeight: 400, fill: '#27103e', width: 1100, letterSpacing: -9 }),
    text('ed-2', 'dreams', 72, 290, 270, { fontFamily: 'Cormorant Garamond', fontWeight: 700, fill: '#f7eafe', width: 1060, letterSpacing: -14, animation: { preset: 'wave', speed: .8, easing: 'easeInOut', loop: true } }),
    text('ed-3', '✳', 940, 590, 180, { fill: '#ddff4f', width: 200 }),
    text('ed-4', 'MAKE BELIEVE / MAKE IT REAL', 70, 805, 19, { fontFamily: 'Space Mono', fontWeight: 400, fill: '#27103e', letterSpacing: 0 }),
  ]),
  composition('signal-noise', 'Signal / noise', '#111c1c', [
    text('sn-1', 'S I G N A L  /  N O I S E', 70, 66, 18, { fontFamily: 'Space Mono', fontWeight: 400, fill: '#bafad7', letterSpacing: 0 }),
    text('sn-2', 'SIGNAL', 65, 190, 205, { fontFamily: 'Space Mono', fontWeight: 700, fill: '#bafad7', width: 1070, letterSpacing: -16, animation: { preset: 'scramble', speed: 1.2, easing: 'linear', loop: true } }),
    text('sn-3', 'NOISE', 65, 440, 205, { fontFamily: 'Space Mono', fontWeight: 700, fill: '#111c1c', stroke: '#bafad7', strokeWidth: 3, width: 1070, letterSpacing: -16 }),
    text('sn-4', 'SCAN 001  ─────────────────────  100%', 70, 800, 18, { fontFamily: 'Space Mono', fontWeight: 400, fill: '#bafad7', letterSpacing: 0, width: 1070 }),
  ]),
  composition('sunny-side', 'Sunny side', '#f6be3e', [
    text('ss-1', 'GOOD', 65, 100, 260, { fontFamily: 'Archivo Black', fontWeight: 400, fill: '#553424', letterSpacing: -18, width: 1060 }),
    text('ss-2', 'DAY', 65, 335, 260, { fontFamily: 'Archivo Black', fontWeight: 400, fill: '#553424', letterSpacing: -18, width: 1060, animation: { preset: 'kinetic', speed: .8, easing: 'easeInOut', loop: true } }),
    text('ss-3', '☺', 840, 455, 210, { fontFamily: 'DM Sans', fontWeight: 700, fill: '#f9f1d7', width: 260, rotation: 12 }),
    text('ss-4', 'A LITTLE LIGHT, EVERY DAY.', 75, 805, 20, { fontFamily: 'Space Mono', fontWeight: 400, fill: '#553424', letterSpacing: 0 }),
  ]),
  composition('quiet-form', 'Quiet form', '#dfd6c6', [
    text('qf-1', 'FORM / 012', 75, 65, 18, { fontFamily: 'Space Mono', fontWeight: 400, fill: '#473d36', letterSpacing: 1 }),
    text('qf-2', 'quiet', 80, 170, 270, { fontFamily: 'Cormorant Garamond', fontWeight: 400, fill: '#473d36', letterSpacing: -8, width: 1000 }),
    text('qf-3', 'FORM', 405, 490, 155, { fontFamily: 'Space Grotesk', fontWeight: 500, fill: '#dfd6c6', stroke: '#473d36', strokeWidth: 2, letterSpacing: 7, width: 700, animation: { preset: 'reveal', speed: .6, easing: 'easeInOut', loop: true } }),
    text('qf-4', 'A COMPOSITION IN RESTRAINT', 75, 805, 18, { fontFamily: 'Space Mono', fontWeight: 400, fill: '#473d36', letterSpacing: 0 }),
  ]),
  composition('redline', 'Redline', '#f1eee3', [
    text('rl-1', 'RED', 75, 70, 270, { fontFamily: 'Oswald', fontWeight: 700, fill: '#ed3f2b', letterSpacing: -8, width: 850 }),
    text('rl-2', 'LINE', 270, 300, 270, { fontFamily: 'Oswald', fontWeight: 700, fill: '#ed3f2b', letterSpacing: -8, width: 850, animation: { preset: 'glitch', speed: .7, easing: 'linear', loop: true } }),
    text('rl-3', '/////////////////////', 65, 655, 60, { fontFamily: 'Space Mono', fontWeight: 700, fill: '#1e201b', letterSpacing: -4, width: 1060 }),
    text('rl-4', 'PUSH THE BOUNDARY   /   07', 75, 805, 18, { fontFamily: 'Space Mono', fontWeight: 400, letterSpacing: 0 }),
  ]),
  composition('soft-focus', 'Soft focus', '#e7e1f0', [
    text('sf-1', 'soft', 85, 150, 290, { fontFamily: 'DM Serif Display', fontWeight: 400, fill: '#5c388e', letterSpacing: -12, shadowColor: '#a77fe6', shadowBlur: 30, width: 950 }),
    text('sf-2', 'focus', 245, 390, 270, { fontFamily: 'DM Serif Display', fontWeight: 400, fill: '#5c388e', letterSpacing: -12, shadowColor: '#a77fe6', shadowBlur: 30, width: 900, animation: { preset: 'wave', speed: .5, easing: 'easeInOut', loop: true } }),
    text('sf-3', 'LOOK A LITTLE CLOSER', 80, 805, 19, { fontFamily: 'Space Mono', fontWeight: 400, fill: '#5c388e', letterSpacing: 0 }),
  ]),
  composition('all-caps', 'All caps', '#f45f3c', [
    text('ac-1', 'SAY IT', 65, 115, 215, { fontFamily: 'Oswald', fontWeight: 700, fill: '#fff2c9', letterSpacing: -7, width: 1060 }),
    text('ac-2', 'WITH', 65, 310, 215, { fontFamily: 'Oswald', fontWeight: 700, fill: '#fff2c9', letterSpacing: -7, width: 1060 }),
    text('ac-3', 'FEELING.', 65, 505, 215, { fontFamily: 'Oswald', fontWeight: 700, fill: '#fff2c9', letterSpacing: -7, width: 1060, animation: { preset: 'stagger', speed: .9, easing: 'easeOut', loop: true } }),
    text('ac-4', 'LOUDER THAN WORDS', 70, 805, 18, { fontFamily: 'Space Mono', fontWeight: 400, fill: '#fff2c9', letterSpacing: 1 }),
  ]),
  composition('orbit', 'Orbit', '#1e254e', [
    text('or-1', 'ORBIT', 100, 225, 245, { fontFamily: 'Space Grotesk', fontWeight: 700, fill: '#c2f9e9', width: 1000, letterSpacing: -15, align: 'center', animation: { preset: 'wave', speed: .7, easing: 'linear', loop: true } }),
    text('or-2', '○', 380, 35, 570, { fontFamily: 'DM Sans', fontWeight: 400, fill: '#1e254e', stroke: '#c2f9e9', strokeWidth: 3, width: 510, opacity: .75 }),
    text('or-3', '●', 875, 570, 76, { fontFamily: 'DM Sans', fill: '#f9db6b', width: 100 }),
    text('or-4', 'A DIFFERENT KIND OF GRAVITY', 80, 805, 18, { fontFamily: 'Space Mono', fontWeight: 400, fill: '#c2f9e9', letterSpacing: 1 }),
  ]),
  composition('cut-paper', 'Cut paper', '#e5dcc6', [
    text('cp-1', 'CUT', 100, 120, 280, { fontFamily: 'Archivo Black', fontWeight: 400, fill: '#274a3a', width: 800, rotation: -5, letterSpacing: -18 }),
    text('cp-2', 'PA', 170, 410, 280, { fontFamily: 'Archivo Black', fontWeight: 400, fill: '#e95933', width: 500, rotation: 4, letterSpacing: -18 }),
    text('cp-3', 'PER', 520, 415, 240, { fontFamily: 'Archivo Black', fontWeight: 400, fill: '#243f72', width: 660, rotation: -4, letterSpacing: -16, animation: { preset: 'kinetic', speed: .6, easing: 'easeInOut', loop: true } }),
    text('cp-4', 'SHAPE / COLOUR / PLAY', 78, 805, 19, { fontFamily: 'Space Mono', fontWeight: 400, letterSpacing: 0 }),
  ]),
  composition('type-specimen', 'Type specimen', '#f0efe9', [
    text('ts-1', 'Aa', 80, 70, 430, { fontFamily: 'Playfair Display', fontWeight: 700, fill: '#292a26', width: 850, letterSpacing: -25 }),
    text('ts-2', 'THE QUICK BROWN FOX', 80, 590, 52, { fontFamily: 'Space Grotesk', fontWeight: 700, fill: '#292a26', width: 1050, letterSpacing: -1 }),
    text('ts-3', 'abcdefghijklmnopqrstuvwxyz\n0123456789  &  !  ?  @', 80, 675, 27, { fontFamily: 'Space Mono', fontWeight: 400, fill: '#292a26', width: 1050, letterSpacing: 0, animation: { preset: 'typewriter', speed: .7, easing: 'linear', loop: true } }),
    text('ts-4', 'A STUDY OF LETTERFORMS  /  20', 80, 825, 17, { fontFamily: 'Space Mono', fontWeight: 400, fill: '#292a26', letterSpacing: 0 }),
  ]),
];

export function cloneComposition(composition: Composition): Composition {
  return JSON.parse(JSON.stringify(composition)) as Composition;
}

