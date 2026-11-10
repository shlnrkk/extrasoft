import { create } from 'zustand';
import type { Composition, TextLayer } from './types';
import { presets } from './presets';

const copy = <T,>(value: T): T => JSON.parse(JSON.stringify(value));
type State = {
  project: Composition; selectedId: string | null; past: Composition[]; future: Composition[];
  zoom: number; playing: boolean; activeTab: 'design' | 'animate';
  select: (id: string | null) => void; setZoom: (value: number) => void; setPlaying: (value: boolean) => void; setTab: (value: 'design' | 'animate') => void;
  updateLayer: (id: string, patch: Partial<TextLayer>, commit?: boolean) => void;
  updateProject: (patch: Partial<Composition>) => void; addLayer: () => void; duplicateLayer: () => void; deleteLayer: () => void; moveLayer: (id: string, direction: number) => void;
  loadProject: (project: Composition) => void; undo: () => void; redo: () => void;
};
const initial = copy(presets[0]);
export const useStudio = create<State>((set, get) => ({
  project: initial, selectedId: initial.layers[0]?.id ?? null, past: [], future: [], zoom: 1, playing: true, activeTab: 'design',
  select: selectedId => set({selectedId}), setZoom: zoom => set({zoom}), setPlaying: playing => set({playing}), setTab: activeTab => set({activeTab}),
  updateLayer: (id, patch, commit = true) => set(s => ({
    past: commit ? [...s.past.slice(-49), copy(s.project)] : s.past, future: commit ? [] : s.future,
    project: {...s.project, layers: s.project.layers.map(layer => layer.id === id ? {...layer, ...patch} : layer)}
  })),
  updateProject: patch => set(s => ({past: [...s.past.slice(-49), copy(s.project)], future: [], project: {...s.project, ...patch}})),
  addLayer: () => set(s => { const id = `layer-${Date.now()}`; const layer: TextLayer = {id, text:'YOUR TYPE', x:100, y:100, width:700, fontFamily:'Space Grotesk', fontSize:120, fontWeight:700, letterSpacing:-3, align:'left', fill:'#171714', rotation:0, opacity:1, stroke:'#171714', strokeWidth:0, shadowColor:'#000000', shadowBlur:0, blendMode:'source-over', animation:{preset:'none',speed:1,easing:'easeInOut',loop:true}}; return {past:[...s.past.slice(-49),copy(s.project)], future:[], project:{...s.project,layers:[...s.project.layers,layer]}, selectedId:id}; }),
  duplicateLayer: () => set(s => { const layer = s.project.layers.find(l => l.id === s.selectedId); if (!layer || layer.locked) return {}; const clone = {...copy(layer), id:`layer-${Date.now()}`, x:layer.x+30, y:layer.y+30}; return {past:[...s.past.slice(-49),copy(s.project)],future:[],project:{...s.project,layers:[...s.project.layers,clone]},selectedId:clone.id}; }),
  deleteLayer: () => set(s => {if (!s.selectedId || s.project.layers.find(l=>l.id===s.selectedId)?.locked) return {}; const layers=s.project.layers.filter(l=>l.id!==s.selectedId); return {past:[...s.past.slice(-49),copy(s.project)],future:[],project:{...s.project,layers},selectedId:layers.at(-1)?.id??null};}),
  moveLayer: (id, direction) => set(s => {const layers=[...s.project.layers]; const index=layers.findIndex(l=>l.id===id); const next=index+direction; if(index<0||next<0||next>=layers.length||layers[index].locked)return {}; [layers[index],layers[next]]=[layers[next],layers[index]]; return {past:[...s.past.slice(-49),copy(s.project)],future:[],project:{...s.project,layers}};}),
  loadProject: project => set(s => ({past:[...s.past.slice(-49),copy(s.project)],future:[],project:copy(project),selectedId:project.layers[0]?.id??null})),
  undo: () => set(s => {const previous=s.past.at(-1); if(!previous)return {}; return {project:previous,past:s.past.slice(0,-1),future:[copy(s.project),...s.future],selectedId:previous.layers.some(l=>l.id===s.selectedId)?s.selectedId:previous.layers[0]?.id??null};}),
  redo: () => set(s => {const next=s.future[0]; if(!next)return {}; return {project:next,past:[...s.past,copy(s.project)],future:s.future.slice(1),selectedId:next.layers.some(l=>l.id===s.selectedId)?s.selectedId:next.layers[0]?.id??null};}),
}));
