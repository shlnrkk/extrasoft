# EXTRASOFT

A browser-based typography playground for making expressive, animated type compositions. Built with Next.js, TypeScript, React Konva, Zustand, Tailwind CSS, and GSAP.

## Getting started

Requirements: Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), then choose **Launch Studio**. For a production build, run `npm run build` followed by `npm start`.

## Working in the studio

Start from one of 20 editable compositions or add a text layer. Select a layer on the artboard or in the layer list to edit its typography, appearance, and animation. Drag, rotate, and resize directly on the artboard. Use the playback control to preview motion and the zoom control to change your view. Projects can be saved locally and loaded again in the same browser.

Use **Export** to save a PNG or an SVG. SVG preserves text as text; the viewer needs access to the selected typeface to display it as intended. WebM recording is available only where the browser supports canvas capture and WebM MediaRecorder encoding. Recording captures the current playback, so start the animation before exporting if motion is desired. Browser support and recording performance vary by device.

The Google Fonts used by the editor require an internet connection when first loaded. Your compositions remain in your browser and are not uploaded to a server.

## Keyboard shortcuts

- **Ctrl/Cmd + Z**: undo; **Ctrl/Cmd + Shift + Z** or **Ctrl/Cmd + Y**: redo
- **Ctrl/Cmd + D**: duplicate the selected layer; **Delete/Backspace**: delete it
- **Arrow keys**: nudge; hold **Shift** for larger steps
- **Space**: play or pause motion; **Escape**: deselect

The studio starts paused when your system requests reduced motion. Exported SVGs retain editable text and require the chosen fonts to be available in the viewing application.

## Type Lab

Open **Type Lab** from the studio header to build orbit, stack, fan, cascade, grid, or spiral arrangements. Adjust the phrase, repetition, spread, font, palette, and motion; the preview shows the generated arrangement. **Add to canvas** creates ordinary editable text layers and the whole operation can be undone.

Select a layer to hide or lock it using the layer toolbar. Use the Design panel for exact position, text-box width, centering, and artboard dimensions. The Snap control beneath the canvas toggles edge and center guides. Hidden layers are omitted from exports.

The in-app field guide is available at `/tutorial` and from the studio header.
