export type AnimationPreset = 'none' | 'kinetic' | 'wave' | 'scramble' | 'typewriter' | 'glitch' | 'reveal' | 'stagger';
export type AnimationEasing = 'linear' | 'easeInOut' | 'easeOut' | 'elastic';
export interface LayerAnimation { preset: AnimationPreset; speed: number; easing: AnimationEasing; loop: boolean }
export interface TextLayer {
  id: string;
  /** Undefined means visible for backward-compatible saved projects. */
  visible?: boolean;
  /** Locks direct movement and transforms while preserving style editing. */
  locked?: boolean;
  text: string;
  x: number;
  y: number;
  width: number;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  letterSpacing: number;
  align: 'left' | 'center' | 'right';
  fill: string;
  gradientEnabled?: boolean;
  gradientEnd?: string;
  rotation: number;
  opacity: number;
  stroke: string;
  strokeWidth: number;
  shadowColor: string;
  shadowBlur: number;
  blendMode: string;
  animation: LayerAnimation;
}
export interface Composition {
  id: string;
  name: string;
  background: string;
  width: number;
  height: number;
  layers: TextLayer[];
}



