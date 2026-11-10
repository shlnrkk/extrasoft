import type Konva from 'konva';
import type { Composition } from './types';

const safeName = (name: string) => (name.trim().replace(/[^a-z0-9_-]+/gi, '-').replace(/^-+|-+$/g, '') || 'extrasoft');
function download(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Capture the rendered Konva stage at twice its on-screen resolution. */
export function exportPNG(stage: Konva.Stage, filename = 'extrasoft') {
  const uri = stage.toDataURL({ pixelRatio: 2 });
  const link = document.createElement('a');
  link.href = uri;
  link.download = `${safeName(filename)}.png`;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

const escapeXML = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
/** Generate editable vector text rather than embedding a raster image. */
export function compositionToSVG(composition: Composition): string {
  const defs: string[] = [];
  const layers = composition.layers.filter(layer => layer.visible !== false).map((layer, i) => {
    const x = layer.align === 'center' ? layer.width / 2 : layer.align === 'right' ? layer.width : 0;
    const anchor = layer.align === 'center' ? 'middle' : layer.align === 'right' ? 'end' : 'start';
    let fill = escapeXML(layer.fill);
    if (layer.gradientEnabled && layer.gradientEnd) {
      defs.push(`<linearGradient id="gradient-${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${escapeXML(layer.fill)}"/><stop offset="100%" stop-color="${escapeXML(layer.gradientEnd)}"/></linearGradient>`);
      fill = `url(#gradient-${i})`;
    }
    let filter = '';
    if (layer.shadowBlur > 0) {
      defs.push(`<filter id="shadow-${i}" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="0" stdDeviation="${layer.shadowBlur / 2}" flood-color="${escapeXML(layer.shadowColor)}"/></filter>`);
      filter = ` filter="url(#shadow-${i})"`;
    }
    const lines = layer.text.split('\n').map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : 1}em">${escapeXML(line) || '&#160;'}</tspan>`).join('');
    const blend = layer.blendMode && layer.blendMode !== 'source-over' ? ` style="mix-blend-mode:${escapeXML(layer.blendMode)}"` : '';
    return `<g transform="translate(${layer.x} ${layer.y}) rotate(${layer.rotation})" opacity="${layer.opacity}"${blend}${filter}><text x="${x}" y="0" dominant-baseline="hanging" text-anchor="${anchor}" font-family="${escapeXML(layer.fontFamily)}, sans-serif" font-weight="${layer.fontWeight}" font-size="${layer.fontSize}" letter-spacing="${layer.letterSpacing}" fill="${fill}" stroke="${escapeXML(layer.stroke)}" stroke-width="${layer.strokeWidth}" paint-order="stroke fill">${lines}</text></g>`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${composition.width}" height="${composition.height}" viewBox="0 0 ${composition.width} ${composition.height}"><defs>${defs.join('')}</defs><rect width="100%" height="100%" fill="${escapeXML(composition.background)}"/>${layers.join('')}</svg>`;
}
export function exportSVG(composition: Composition, filename = 'extrasoft') {
  download(new Blob([compositionToSVG(composition)], { type: 'image/svg+xml;charset=utf-8' }), `${safeName(filename)}.svg`);
}

function webmMime(): string | undefined {
  if (typeof window === 'undefined' || typeof MediaRecorder === 'undefined' || typeof HTMLCanvasElement === 'undefined' || !HTMLCanvasElement.prototype.captureStream) return undefined;
  return ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm'].find(type => MediaRecorder.isTypeSupported(type));
}
export function canExportWebM(): boolean { return Boolean(webmMime()); }

/** Record the currently playing stage. Unsupported browsers reject without advertising a format. */
export async function exportWebM(stage: Konva.Stage, filename = 'extrasoft', durationMs = 4000): Promise<void> {
  const mimeType = webmMime();
  if (!mimeType) throw new Error('WebM recording is not supported in this browser.');
  const canvas = document.createElement('canvas');
  // Keep recordings independent of the editor zoom, while bounding frame size.
  const pixelRatio = Math.min(2 / Math.abs(stage.scaleX() || 1), 1920 / Math.max(stage.width(), stage.height()));
  const firstFrame = stage.toCanvas({ pixelRatio });
  canvas.width = firstFrame.width;
  canvas.height = firstFrame.height;
  const context = canvas.getContext('2d');
  if (!context || !canvas.width || !canvas.height) throw new Error('The canvas is not ready to record.');
  context.drawImage(firstFrame, 0, 0);
  const stream = canvas.captureStream(30);
  const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 8_000_000 });
  const chunks: BlobPart[] = [];
  let frame = 0;
  let lastFrame = 0;
  return new Promise<void>((resolve, reject) => {
    const cleanup = () => { cancelAnimationFrame(frame); stream.getTracks().forEach(track => track.stop()); };
    recorder.ondataavailable = event => { if (event.data.size) chunks.push(event.data); };
    recorder.onerror = () => { cleanup(); reject(new Error('Could not record the canvas.')); };
    recorder.onstop = () => {
      cleanup();
      if (!chunks.length) { reject(new Error('The recording was empty.')); return; }
      download(new Blob(chunks, { type: mimeType }), `${safeName(filename)}.webm`);
      resolve();
    };
    const start = performance.now();
    const draw = (now: number) => {
      if (recorder.state !== 'recording') return;
      try { if (now - lastFrame >= 1000 / 30) { context.clearRect(0, 0, canvas.width, canvas.height); context.drawImage(stage.toCanvas({ pixelRatio }), 0, 0, canvas.width, canvas.height); lastFrame = now; } }
      catch (error) { cleanup(); recorder.stop(); reject(error); return; }
      if (now - start >= durationMs) recorder.stop();
      else frame = requestAnimationFrame(draw);
    };
    recorder.start();
    frame = requestAnimationFrame(draw);
  });
}
