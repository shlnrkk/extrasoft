'use client';

import Link from 'next/link';
import './landing.css';

type LandingProps = { onLaunch: () => void };

const Arrow = ({ diagonal = false }: { diagonal?: boolean }) => <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? 'M5 19 19 5M7 5h12v12' : 'M3 12h17M14 6l6 6-6 6'} stroke="currentColor" strokeWidth="1.5" /></svg>;

const examples = [
  { title: 'Soft impact', number: '01', className: 'example-impact', word: <>MAKE<br />SOME<br />NOISE.</> },
  { title: 'After hours', number: '02', className: 'example-hours', word: <>after<br /><i>hours</i></> },
  { title: 'Echo chamber', number: '03', className: 'example-echo', word: <>ECHO<br />ECHO<br />ECHO</> },
  { title: 'Off grid', number: '04', className: 'example-offgrid', word: <>OFF<br />GRID<span>↗</span></> },
];

export default function Landing({ onLaunch }: LandingProps) {
  return <main className="landing" id="top">
    <header className="land-nav">
      <a href="#top" className="land-logo" aria-label="Extrasoft home">EXTRASOFT<sup>®</sup></a>
      <nav aria-label="Main navigation">
        <button onClick={onLaunch}>Studio</button>
        <a href="#possibilities">Features</a>
        <Link href="/tutorial">Tutorial</Link>
        <a href="#presets">Examples</a>
      </nav>
      <button className="nav-launch" onClick={onLaunch}>Launch Studio <Arrow diagonal /></button>
    </header>

    <section className="land-hero" aria-labelledby="hero-title">
      <div className="hero-heading">
        <div className="hero-index"><span>INTERACTIVE{' '}<br />TYPOGRAPHY{' '}<br />PLAYGROUND</span><span>V1.0</span></div>
        <h1 id="hero-title">Make<br />Type <em>Move.</em><span className="hero-underline" aria-hidden="true" /></h1>
        <div className="hero-description"><p>A CREATIVE STUDIO{' '}<br />FOR EXPERIMENTAL{' '}<br />TYPE, MOTION AND{' '}<br />INTERACTION.</p><Arrow diagonal /></div>
      </div>
      <div className="hero-art" aria-label="Expressive Extrasoft typography artwork">
        <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/artwork/extrasoft-type.png`} alt="" />
        <div className="art-edge art-edge-left" aria-hidden="true" /><div className="art-edge art-edge-right" aria-hidden="true" />
        <div className="art-index" aria-hidden="true"><span>01 <i /> TYPE</span><span>02 <i /> MOTION</span><span>03 <i /> EFFECTS</span><span>04 <i /> INTERACTION</span></div>
      </div>
      <div className="hero-action">
        <button className="launch-button" onClick={onLaunch}>Launch Studio <Arrow diagonal /></button>
        <p>DESIGN, ANIMATE AND{' '}<br />EXPERIMENT WITH TYPE —{' '}<br />ALL IN THE BROWSER.</p>
        <Link href="/tutorial" className="discover-link">How to use <Arrow diagonal /></Link>
      </div>
    </section>

    <section id="possibilities" className="land-intro">
      <div className="section-label"><span>01 / THE STUDIO</span><span>DESIGNED FOR CREATIVE FREEDOM</span></div>
      <div className="intro-main"><h2>Ideas deserve<br /><em>to move.</em></h2><div className="intro-copy"><p>Make a little noise. Set type in motion, experiment with form, and find the feeling you’re looking for.</p><button className="text-link" onClick={onLaunch}>Start creating <Arrow diagonal /></button></div></div>
      <div className="capability-row"><div><b>01</b><span>TYPE</span><small>Make every letter yours.</small></div><div><b>02</b><span>MOTION</span><small>Give your words a pulse.</small></div><div><b>03</b><span>COMPOSE</span><small>Find your own balance.</small></div><div><b>04</b><span>EXPORT</span><small>Take your work with you.</small></div></div>
    </section>

    <section id="presets" className="land-presets">
      <div className="section-label"><span>02 / THE STARTING POINTS</span><span>MADE TO BE REMADE</span></div>
      <div className="presets-heading"><h2>Start<br /><em>anywhere.</em></h2><p>A blank canvas is just one way in.<br />Explore editable compositions<br />and make them your own.</p></div>
      <div className="example-grid">{examples.map(example => <div className="example" key={example.title}><div className={`example-art ${example.className}`}><div className="example-top"><span>EXTRASOFT®</span><span>{example.number} / 04</span></div><div className="example-word">{example.word}</div><div className="example-bottom"><span>TYPE EXPERIMENTS</span><span>↗</span></div></div><div className="example-caption"><span>{example.title}</span><span>{example.number} — 04</span></div></div>)}</div>
      <div className="presets-footer"><span>THE BEST IDEAS ARE THE ONES YOU MAKE YOURS.</span><button className="text-link" onClick={onLaunch}>Explore presets <Arrow diagonal /></button></div>
    </section>

    <section className="land-final"><div className="final-top"><span>03 / YOUR TURN</span><span>LESS THINKING. MORE MAKING.</span></div><h2>Make something<br /><em>move.</em></h2><button className="final-button" onClick={onLaunch}>Launch Studio <Arrow diagonal /></button><div className="final-bottom"><a href="#top" className="land-logo">EXTRASOFT<sup>®</sup></a><span>AN INTERACTIVE TYPOGRAPHY PLAYGROUND.</span><a href="#top">BACK TO TOP ↑</a></div></section>
  </main>;
}

