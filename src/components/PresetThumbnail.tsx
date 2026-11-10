import type { Composition } from '@/lib/types';

/** A miniature vector rendering of the actual editable layers, not a representative label. */
export default function PresetThumbnail({ composition }: { composition: Composition }) {
  return <svg viewBox={`0 0 ${composition.width} ${composition.height}`} role="img" aria-label={`${composition.name} composition preview`} preserveAspectRatio="xMidYMid meet">
    <defs>{composition.layers.map((layer, index) => <linearGradient key={layer.id} id={`thumb-${composition.id}-${index}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={layer.fill}/><stop offset="100%" stopColor={layer.gradientEnd || layer.fill}/></linearGradient>)}</defs>
    <rect width={composition.width} height={composition.height} fill={composition.background}/>
    {composition.layers.map((layer, index) => {
      if (layer.visible === false) return null;
      const x = layer.align === 'center' ? layer.width / 2 : layer.align === 'right' ? layer.width : 0;
      const anchor = layer.align === 'center' ? 'middle' : layer.align === 'right' ? 'end' : 'start';
      return <g key={layer.id} transform={`translate(${layer.x} ${layer.y}) rotate(${layer.rotation})`} opacity={layer.opacity} style={{mixBlendMode: layer.blendMode === 'source-over' ? 'normal' : layer.blendMode as React.CSSProperties['mixBlendMode']}}>
        <text x={x} y={0} dominantBaseline="hanging" textAnchor={anchor} fontFamily={layer.fontFamily} fontSize={layer.fontSize} fontWeight={layer.fontWeight} letterSpacing={layer.letterSpacing} fill={layer.gradientEnabled ? `url(#thumb-${composition.id}-${index})` : layer.fill} stroke={layer.stroke} strokeWidth={layer.strokeWidth} paintOrder="stroke fill">{layer.text.split('\n').map((line, i) => <tspan key={i} x={x} dy={i ? '1.2em' : 0}>{line || ' '}</tspan>)}</text>
      </g>;
    })}
  </svg>;
}
