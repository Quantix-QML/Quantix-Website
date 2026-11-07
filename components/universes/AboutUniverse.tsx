"use client";

import { motion, useReducedMotion } from "framer-motion";

const portals = [
  { href: "#manifesto", gate: "E", operation: "Entanglement", label: "ABOUT", className: "portal-gate--about" },
  { href: "#learn", gate: "H", operation: "Hadamard", label: "LEARN", className: "portal-gate--learn" },
  { href: "#events", gate: "⊕", operation: "CNOT", label: "EVENTS", className: "portal-gate--events" },
  { href: "#research", gate: "M", operation: "Measurement", label: "RESEARCH", className: "portal-gate--research" },
  { href: "#people", gate: "X", operation: "X", label: "TEAM", className: "portal-gate--team" }
];

export function AboutUniverse() {
  const reducedMotion = useReducedMotion();

  function enterPortal(href: string) {
    window.dispatchEvent(new CustomEvent("quantix:portal", { detail: { href } }));
  }

  return (
    <>
      <section className="hero section-shell" id="home">
        <motion.div
          className="hero-copy"
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="eyebrow"><span className="status-dot" /> QUANTIX QUANTUM SYSTEM / ONLINE</div>
          <h1>Enter the<br /><span className="gradient-text">quantum.</span></h1>
          <p className="hero-description">The future doesn&apos;t have a user manual. Step into an interactive quantum universe built for the curious, the courageous, and the next generation of ideas.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#universes">Initialize exploration <span aria-hidden="true">↗</span></a>
            <button className="text-link hero-signin-link" type="button" onClick={(event) => window.dispatchEvent(new CustomEvent("quantix:signin", { detail: event.currentTarget }))}><span className="play-icon" aria-hidden="true">↗</span> Member sign in</button>
          </div>
          <div className="hero-proof">
            <div className="avatar-stack" aria-hidden="true"><span>Q</span><span>+</span><span>∞</span></div>
            <p><strong>NO MANUAL REQUIRED.</strong><br />Curiosity is enough.</p>
          </div>
          <div className="hero-readout" aria-hidden="true"><span>CORE STABILITY <b>99.8%</b></span><i><span /></i><span>TRANSMISSION <b>SECURE</b></span></div>
        </motion.div>
        <div className="hero-art" aria-label="Quantum computer core. Select a gate to enter a universe.">
          <div className="scene-label scene-label--top"><span className="status-dot" /> QUANTUM CORE / LIVE RENDER</div>
          {portals.map((portal) => (
            <a
              className={`portal-gate ${portal.className}`}
              href={portal.href}
              key={portal.label}
              aria-label={`Enter the ${portal.label.toLowerCase()} universe with the ${portal.operation} gate`}
              title={`${portal.operation} gate`}
              onClick={(event) => {
                event.preventDefault();
                enterPortal(portal.href);
              }}
            >
              <span className="portal-symbol">{portal.gate}</span>
              <span className="portal-name">{portal.label}</span>
              <span className="portal-operation" aria-hidden="true">{portal.operation} gate</span>
            </a>
          ))}
          <div className="scene-label scene-label--bottom"><span className="scene-label-line" /> MOVE TO INTERACT / SCROLL TO TRAVERSE</div>
        </div>
        <a className="scroll-cue" href="#manifesto"><span /> SCROLL TO ENTER THE MULTIVERSE</a>
        <div className="hero-index"><span>01</span> / QUANTIX-OS</div>
      </section>

      <section className="manifesto section-shell" id="manifesto">
        <div className="section-kicker">A DIFFERENT KIND OF CLUB <span>— 01</span></div>
        <div className="manifesto-content">
          <h2>Not just a subject.<br /><span className="muted-heading">A whole new way to think.</span></h2>
          <div className="manifesto-aside">
            <p>Quantum is strange, exciting, and bigger than any one person. Quantix is where we make sense of it — one experiment, conversation, and “wait, what if?” at a time.</p>
            <a className="underlined-link" href="#people">Get to know us <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="stat-strip">
          <div className="stat"><strong>01<span>+</span></strong><span>curiosity-first community</span></div>
          <div className="stat"><strong>∞</strong><span>questions worth exploring</span></div>
          <div className="stat"><strong>100<span>%</span></strong><span>room to start from zero</span></div>
          <div className="stat stat-note"><span className="status-dot" /><span>All experience levels<br />are in superposition here.</span></div>
        </div>
        <div className="story-timeline" aria-label="The Quantix journey">
          <div className="timeline-heading"><span>THE QUANTIX JOURNEY</span><span>A CONSTELLATION STILL BEING DRAWN</span></div>
          <div className="timeline-track">
            {[
              ["2024", "THE FIRST QUESTION", "A new field comes into focus."],
              ["2025", "THE CONNECTIONS", "Curious minds start learning together."],
              ["2026", "IDEAS IN ORBIT", "Small experiments open new doors."],
              ["∞", "WHAT'S NEXT", "The story is still being written."]
            ].map(([number, label, description]) => (
              <article className="timeline-stop" key={number}><span className="timeline-node">{number}</span><span className="timeline-label">{label}</span><p>{description}</p></article>
            ))}
          </div>
        </div>
        <div className="about-pillars">
          <article><span>01 / VISION</span><h3>A future more people can shape.</h3><p>Make quantum computing feel like an open invitation—not an insider&apos;s language.</p></article>
          <article><span>02 / MISSION</span><h3>Learn out loud. Build together.</h3><p>Turn big ideas into approachable lessons, thoughtful experiments, and shared progress.</p></article>
          <article><span>03 / WHY QUANTUM</span><h3>Because hard questions matter.</h3><p>Explore a new way of computing, and make room for more people to ask what comes next.</p></article>
        </div>
        <div className="founding-story">
          <span className="founding-mark" aria-hidden="true">Q</span>
          <div><span className="timeline-label">THE FOUNDING QUESTION</span><p>What if the most extraordinary ideas in computing felt a little less far away? Quantix begins with that question—and with people willing to explore the answer together.</p></div>
        </div>
      </section>

      <UniverseDirectory />
    </>
  );
}

function UniverseDirectory() {
  const universes = [
    { href: "#learn", id: "01 / LEARNING", title: "Learning dimension", detail: "Make the mind-bending make sense.", visual: "visual-circuit", symbol: "H" },
    { href: "#events", id: "02 / EVENTS", title: "Event galaxy", detail: "Ideas are better when they collide.", visual: "visual-planet", symbol: "◎" },
    { href: "#research", id: "03 / RESEARCH", title: "Research lab", detail: "Follow the questions off the map.", visual: "visual-lab", symbol: "⌬" },
    { href: "#people", id: "04 / PEOPLE", title: "Team entanglement", detail: "Meet the minds behind the mission.", visual: "visual-team", symbol: "⊕" },
    { href: "#manifesto", id: "05 / OUR STORY", title: "About Quantix", detail: "A small spark can change everything.", visual: "visual-story", symbol: "Ψ" }
  ];

  return (
    <section className="universes section-shell" id="universes">
      <div className="section-heading">
        <div><div className="section-kicker">PICK YOUR NEXT DIMENSION <span>— 02</span></div><h2>Five ways to <span className="gradient-text">go quantum.</span></h2></div>
        <p>Different paths, same curiosity.<br />Where will you land?</p>
      </div>
      <div className="universe-grid">
        {universes.map((universe) => (
          <a className="universe-card" href={universe.href} key={universe.id}>
            <div className="card-topline"><span>{universe.id}</span><span className="card-arrow">↗</span></div>
            <div className={`universe-visual ${universe.visual}`} aria-hidden="true"><span>{universe.symbol}</span></div>
            <div className="card-copy"><h3>{universe.title}</h3><p>{universe.detail}</p><span className="card-link">Explore this universe <b>↗</b></span></div>
          </a>
        ))}
      </div>
    </section>
  );
}
