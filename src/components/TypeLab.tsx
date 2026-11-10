'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useStudio } from '@/lib/store';
import type { AnimationPreset, TextLayer } from '@/lib/types';
import './typelab.css';

type Arrangement = 'orbit' | 'stack' | 'fan' | 'diagonal' | 'grid' | 'spiral';
const arrangements: { id: Arrangement; label: string; glyph: string; description: string }[] = [
  { id: 'orbit', label: 'Orbit', glyph: '◌', description: 'Words in rotation.' },
  { id: 'stack', label: 'Stack', glyph: '≋', description: 'Rhythm in repetition.' },
  { id: 'fan', label: 'Fan', glyph: '◔', description: 'A burst of type.' },
  { id: 'diagonal', label: 'Cascade', glyph: '↗', description: 'A line in motion.' },
  { id: 'grid', label: 'Grid', glyph: '▦', description: 'An ordered field of words.' },
  { id: 'spiral', label: 'Spiral', glyph: '◎', description: 'A winding typographic path.' },
];
const palettes = [
  { label: 'Ink', colors: ['#171815'] },
  { label: 'Acid', colors: ['#171815', '#b8f300'] },
  { label: 'Electric', colors: ['#ff5b39', '#5238df', '#171815'] },
  { label: 'Paper', colors: ['#f5f1e8', '#c4fb47'] },
];
const choices: { label: string; value: AnimationPreset }[] = [
  {label:'Still',value:'none'}, {label:'Kinetic',value:'kinetic'}, {label:'Wave',value:'wave'}, {label:'Glitch',value:'glitch'}, {label:'Reveal',value:'reveal'}, {label:'Stagger',value:'stagger'},
];

function buildLayers(text: string, arrangement: Arrangement, count: number, size: number, colors: string[], motion: AnimationPreset, spread: number, font: string, width: number, height: number, prefix: string): TextLayer[] {
  const boxWidth = Math.min(width * .72, Math.max(size * 2.2, text.length * size * .72));
  return Array.from({ length: count }, (_, index) => {
    const t = count > 1 ? index / (count - 1) : .5;
    let centerX = width / 2, centerY = height / 2, rotation = 0;
    if (arrangement === 'orbit') {
      const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
      centerX += Math.cos(angle) * width * .27 * spread; centerY += Math.sin(angle) * height * .27 * spread;
      rotation = angle * 180 / Math.PI + 90;
    } else if (arrangement === 'stack') {
      centerY = height * .5 + (t - .5) * height * .72 * spread;
    } else if (arrangement === 'fan') {
      rotation = (-42 + t * 84) * spread;
      centerX = width * .5 + Math.cos(rotation * Math.PI / 180) * width * .1;
      centerY = height * .5 + Math.sin(rotation * Math.PI / 180) * height * .26;
    } else if (arrangement === 'diagonal') {
      centerX = width * (.5 + (t - .5) * .48 * spread); centerY = height * (.5 + (t - .5) * .64 * spread); rotation = -8;
    } else if (arrangement === 'grid') {
      const columns = Math.ceil(Math.sqrt(count * width / height));
      const rows = Math.ceil(count / columns);
      centerX = width * (.5 + ((index % columns) - (columns - 1) / 2) * .24 * spread);
      centerY = height * (.5 + (Math.floor(index / columns) - (rows - 1) / 2) * .24 * spread);
    } else {
      const angle = index * 2.4 - Math.PI / 2; const radius = (.06 + t * .28) * spread;
      centerX += Math.cos(angle) * width * radius; centerY += Math.sin(angle) * height * radius; rotation = angle * 180 / Math.PI + 90;
    }
    const radians = rotation * Math.PI / 180;
    const x = centerX - Math.cos(radians) * boxWidth / 2 + Math.sin(radians) * size / 2;
    const y = centerY - Math.sin(radians) * boxWidth / 2 - Math.cos(radians) * size / 2;
    const outlined = arrangement === 'stack' && index % 2 === 1;
    const color = colors[index % colors.length];
    return { id: `${prefix}-${index}`, text, x, y, width: boxWidth, fontFamily: font, fontSize: size, fontWeight: 700, letterSpacing: -size * .035, align: 'center', fill: outlined ? 'transparent' : color, stroke: color, strokeWidth: outlined ? Math.max(1, size * .018) : 0, rotation, opacity: 1, shadowColor: '#000000', shadowBlur: 0, blendMode: 'source-over', animation: { preset: motion, speed: .8 + index * .06, easing: 'easeInOut', loop: true } };
  });
}

export default function TypeLab({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.stopPropagation(); onClose(); return; }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'));
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey); return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);
  const project = useStudio(s => s.project);
  const loadProject = useStudio(s => s.loadProject);
  const [phrase, setPhrase] = useState('TYPE');
  const [arrangement, setArrangement] = useState<Arrangement>('orbit');
  const [count, setCount] = useState(6);
  const [size, setSize] = useState(72);
  const [palette, setPalette] = useState(0);
  const [motion, setMotion] = useState<AnimationPreset>('none');
  const [spread, setSpread] = useState(1);
  const [font, setFont] = useState('Space Grotesk');
  const layers = useMemo(() => buildLayers(phrase.trim() || 'YOUR TYPE', arrangement, count, size, palettes[palette].colors, motion, spread, font, project.width, project.height, 'preview'), [phrase, arrangement, count, size, palette, motion, spread, font, project.width, project.height]);
  const add = () => {
    const prefix = `lab-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const generated = buildLayers(phrase.trim() || 'YOUR TYPE', arrangement, count, size, palettes[palette].colors, motion, spread, font, project.width, project.height, prefix);
    loadProject({ ...project, layers: [...project.layers, ...generated] });
    useStudio.getState().select(generated[0].id);
    onClose();
  };
  return <div className="tl-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
    <section ref={dialogRef} className="tl-dialog" role="dialog" aria-modal="true" aria-labelledby="tl-title">
      <header className="tl-header"><div><span>EXTRASOFT / CREATIVE TOOLS</span><h2 id="tl-title">Type <em>Lab.</em></h2><p>Turn a phrase into a composition. Every word stays editable.</p></div><button type="button" autoFocus onClick={onClose} aria-label="Close Type Lab">×</button></header>
      <div className="tl-body"><div className="tl-controls">
        <label className="tl-label">YOUR WORDS<input value={phrase} maxLength={40} onChange={e => setPhrase(e.target.value)} placeholder="Type something" /></label>
        <div className="tl-label">ARRANGEMENT<div className="tl-modes">{arrangements.map(mode => <button type="button" key={mode.id} className={arrangement === mode.id ? 'active' : ''} onClick={() => setArrangement(mode.id)} aria-pressed={arrangement === mode.id}><b aria-hidden="true">{mode.glyph}</b><span>{mode.label}</span></button>)}</div><small>{arrangements.find(item => item.id === arrangement)?.description}</small></div>
        <label className="tl-range"><span>REPETITIONS <b>{count}</b></span><input type="range" min="3" max="12" value={count} onChange={e => setCount(Number(e.target.value))}/></label>
        <label className="tl-range"><span>SPREAD <b>{Math.round(spread * 100)}%</b></span><input type="range" min="0.4" max="1.2" step="0.05" value={spread} onChange={e => setSpread(Number(e.target.value))}/></label>
        <label className="tl-range"><span>TYPE SIZE <b>{size} PX</b></span><input type="range" min="24" max="180" step="2" value={size} onChange={e => setSize(Number(e.target.value))}/></label>
        <label className="tl-label">TYPEFACE<select value={font} onChange={e=>setFont(e.target.value)}>{['Space Grotesk','Inter','Playfair Display','DM Serif Display','Bebas Neue','Space Mono','Oswald'].map(item=><option key={item}>{item}</option>)}</select></label>
        <div className="tl-label">PALETTE<div className="tl-palettes">{palettes.map((item,i)=><button type="button" key={item.label} title={item.label} aria-label={`${item.label} palette`} aria-pressed={palette===i} className={palette===i?'active':''} onClick={()=>setPalette(i)}>{item.colors.map((color,j)=><i key={j} style={{background:color}} />)}</button>)}</div></div>
        <label className="tl-label">MOTION<select value={motion} onChange={e=>setMotion(e.target.value as AnimationPreset)}>{choices.map(choice=><option key={choice.value} value={choice.value}>{choice.label}</option>)}</select></label>
      </div><div className="tl-preview-wrap"><div className="tl-preview-meta"><span>ARRANGEMENT PREVIEW</span><span>{project.width} × {project.height} PX</span></div><div className="tl-preview"><svg viewBox={`0 0 ${project.width} ${project.height}`} role="img" aria-label={`${arrangement} arrangement preview`}><rect width={project.width} height={project.height} fill={project.background}/>{layers.map(layer=><g key={layer.id} transform={`translate(${layer.x} ${layer.y}) rotate(${layer.rotation})`}><text x={layer.width/2} y={layer.fontSize*.82} textAnchor="middle" fontFamily={layer.fontFamily} fontSize={layer.fontSize} fontWeight={layer.fontWeight} letterSpacing={layer.letterSpacing} fill={layer.fill} stroke={layer.stroke} strokeWidth={layer.strokeWidth} paintOrder="stroke fill">{layer.text}</text></g>)}</svg></div><div className="tl-preview-note">{count} EDITABLE TEXT LAYERS <span>↗</span></div></div></div>
      <footer className="tl-footer"><span>ADD TO YOUR CURRENT CANVAS · UNDO ANYTIME</span><button type="button" onClick={add}>Add to canvas <span>↗</span></button></footer>
    </section>
  </div>;
}
