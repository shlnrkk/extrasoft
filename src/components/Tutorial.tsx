'use client';

import './tutorial.css';

type TutorialProps = { onLaunch: () => void; onBack: () => void };

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? 'M5 19 19 5M7 5h12v12' : 'M3 12h17M14 6l6 6-6 6'} stroke="currentColor" strokeWidth="1.5" /></svg>;
}

const chapters = [
  { number: '01', id: 'start', title: 'Choose your canvas' },
  { number: '02', id: 'type', title: 'Shape your type' },
  { number: '03', id: 'motion', title: 'Make it move' },
  { number: '04', id: 'export', title: 'Save & export' },
];

export default function Tutorial({ onLaunch, onBack }: TutorialProps) {
  return <main className="tutorial" id="guide-top">
    <header className="guide-nav">
      <button className="guide-logo" onClick={onBack} aria-label="Back to Extrasoft home">EXTRASOFT<sup>®</sup></button>
      <span className="guide-nav-label">THE FIELD GUIDE / 001</span>
      <button className="guide-back" onClick={onBack}>Back to home</button>
      <button className="guide-launch" onClick={onLaunch}>Launch Studio <Arrow diagonal /></button>
    </header>

    <div className="guide-layout">
      <aside className="guide-contents" aria-label="Guide contents">
        <div className="guide-eyebrow">IN THIS GUIDE <span>↓</span></div>
        <nav>{chapters.map(chapter => <a key={chapter.id} href={`#${chapter.id}`}><span>{chapter.number}</span>{chapter.title}<Arrow diagonal /></a>)}<a href="#shortcuts"><span>05</span>Keyboard shortcuts<Arrow diagonal /></a></nav>
        <p>GOOD TYPE.<br />GOOD TIMES. <span>✳</span></p>
      </aside>
      <div className="guide-main">
        <section className="guide-intro">
          <div className="guide-kicker"><span>EXTRASOFT® / FIELD GUIDE</span><span>THE BASICS, IN FIVE MINUTES</span></div>
          <h1>Let’s make<br /><em>something</em> move<span>.</span></h1>
          <div className="guide-intro-bottom"><p>A little guidance for your first big idea. Follow along, then make it your own.</p><a href="#start">Start the guide <Arrow /></a></div>
        </section>

        <section className="guide-step" id="start">
          <div className="guide-step-number">01 <span>/ 04</span></div>
          <div className="guide-step-content"><div className="guide-step-label">THE STARTING POINT</div><h2>Choose your<br /><em>canvas.</em></h2><p>Open the studio and choose <strong>Explore presets</strong> for a head start. Every composition is made of editable text layers, so there’s no wrong place to begin.</p><p>Or select <strong>Add text layer</strong> to bring your own words onto the canvas. For a different starting point, try <strong>Type Lab</strong> to generate an orbit, stack, fan, cascade, grid, or spiral arrangement from editable layers.</p><button onClick={onLaunch} className="guide-text-button">Open the studio <Arrow diagonal /></button></div>
          <div className="guide-visual guide-visual-start" aria-label="Illustration of editable typography compositions"><div className="guide-poster-one"><small>01 / START HERE</small><b>MAKE<br />SOME<br />NOISE.</b><span>EXTRASOFT®</span></div><div className="guide-poster-two"><small>02 / REMIX</small><b>after<br /><i>hours</i></b><span>TYPE EXPERIMENTS</span></div></div>
        </section>

        <section className="guide-step" id="type">
          <div className="guide-step-number">02 <span>/ 04</span></div>
          <div className="guide-step-content"><div className="guide-step-label">TYPE & COMPOSITION</div><h2>Shape your<br /><em>type.</em></h2><p>Choose a layer on the canvas or in the layer list. Edit its words and typography in the <strong>Design</strong> panel: change the font, size, spacing, alignment, fill, outline, shadow, and blend mode.</p><p>Drag a layer to move it. Use its handles to resize or rotate it; guides appear as you align it with the canvas. Use the layer toolbar to reorder, duplicate, hide, or lock a layer. In Design, adjust exact positions and canvas dimensions; turn snapping on or off beneath the canvas.</p></div>
          <div className="guide-visual guide-visual-type" aria-label="Illustration of a selected type layer"><div className="guide-type-frame"><div className="guide-handle tl"/><div className="guide-handle tr"/><div className="guide-handle bl"/><div className="guide-handle br"/><b>TYPE<br /><i>YOUR</i><br />WAY.</b></div><span>SELECT / MOVE / TRANSFORM</span></div>
        </section>

        <section className="guide-step" id="motion">
          <div className="guide-step-number">03 <span>/ 04</span></div>
          <div className="guide-step-content"><div className="guide-step-label">MOTION STUDY</div><h2>Make it<br /><em>move.</em></h2><p>With a layer selected, open <strong>Animate</strong> and choose a motion preset. Try wave, kinetic, typewriter, glitch, or one of the other treatments.</p><p>Set the speed and easing, then choose whether it loops. Use the play control under the canvas to pause and preview your composition.</p></div>
          <div className="guide-visual guide-visual-motion" aria-label="Motion preset examples"><div className="guide-motion-word">MOVE<span>✳</span></div><div className="guide-motion-list"><span>01 / KINETIC</span><span>02 / WAVE</span><span>03 / TYPEWRITER</span><span>04 / GLITCH</span></div></div>
        </section>

        <section className="guide-step" id="export">
          <div className="guide-step-number">04 <span>/ 04</span></div>
          <div className="guide-step-content"><div className="guide-step-label">KEEP YOUR WORK</div><h2>Save it.<br /><em>Share it.</em></h2><p>Use <strong>Save</strong> to keep a project in this browser and <strong>Load</strong> to bring it back. For a portable backup, use <strong>Export → Save project file</strong>; open it later from the same menu.</p><p>Export a still as PNG or editable text as SVG. WebM appears when your browser supports recording; play the animation before exporting to capture motion.</p></div>
          <div className="guide-visual guide-visual-export"><div className="guide-export-top">READY TO GO <span>↗</span></div><div className="guide-export-row"><b>PNG</b><span>STILL IMAGE</span></div><div className="guide-export-row"><b>SVG</b><span>EDITABLE VECTOR</span></div><div className="guide-export-row"><b>WebM</b><span>WHEN SUPPORTED</span></div><small>YOUR IDEAS, OUT IN THE WORLD.</small></div>
        </section>

        <section id="shortcuts" className="guide-shortcuts"><div><div className="guide-step-label">KEEP THE FLOW GOING / 05</div><h2>A few handy<br /><em>shortcuts.</em></h2><p>Use ⌘ on Mac or Ctrl on Windows.</p></div><dl><div><dt>Undo / redo</dt><dd><kbd>⌘ / Ctrl</kbd> + <kbd>Z</kbd> / <kbd>Shift + Z</kbd></dd></div><div><dt>Duplicate layer</dt><dd><kbd>⌘ / Ctrl</kbd> + <kbd>D</kbd></dd></div><div><dt>Delete layer</dt><dd><kbd>Delete</kbd></dd></div><div><dt>Nudge layer</dt><dd><kbd>Arrow keys</kbd> <span>+ Shift for 10 px</span></dd></div><div><dt>Play / pause</dt><dd><kbd>Space</kbd></dd></div><div><dt>Deselect</dt><dd><kbd>Esc</kbd></dd></div></dl></section>
        <section className="guide-end"><div className="guide-kicker"><span>THE REST IS UP TO YOU</span><span>✳</span></div><h2>Now go<br /><em>make a little</em><br />noise.</h2><button onClick={onLaunch}>Launch Studio <Arrow diagonal /></button><div className="guide-end-foot"><button onClick={onBack} className="guide-logo">EXTRASOFT<sup>®</sup></button><a href="#guide-top">BACK TO TOP ↑</a></div></section>
      </div>
    </div>
  </main>;
}
