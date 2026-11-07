"use client";

import { useEffect, useRef, useState } from "react";

const events = {
  workshop: ["Workshop planet", "Hands-on sessions for building intuition, learning quantum concepts, and trying small experiments together."],
  hackathon: ["Hackathon planet", "A collaborative space to turn quantum-computing questions into prototypes, demos, and ideas."],
  competition: ["Competition planet", "Friendly challenges to test your problem-solving skills, learn from others, and celebrate creative approaches."],
  speakers: ["Speaker planet", "Talks and conversations that bring new perspectives on quantum research, technology, and careers."]
};

type EventKey = keyof typeof events;

export function EventsUniverse() {
  const [activeEvent, setActiveEvent] = useState<EventKey | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const eventTrigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!activeEvent) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveEvent(null);
    };
    closeButton.current?.focus();
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      eventTrigger.current?.focus();
    };
  }, [activeEvent]);

  return (
    <section className="events section-shell" id="events">
      <div className="section-heading">
        <div><div className="section-kicker">GOOD THINGS HAPPEN IRL <span>— 04</span></div><h2>Come for the quantum.<br /><span className="muted-heading">Stay for the people.</span></h2></div>
        <a className="underlined-link" href="#join">See you at the next one <span aria-hidden="true">↗</span></a>
      </div>
      <div className="events-layout">
        <article className="event-feature">
          <div className="event-art"><span className="event-art-label">QUANTIX / OPEN SESSION</span><div className="event-orb"><span>Q</span></div><span className="event-coordinate">QX / COMMUNITY PLANET</span></div>
          <div className="event-details">
            <div className="event-meta"><span>COMMUNITY SESSION</span><span className="event-status"><i /> OPEN TO ALL</span></div>
            <h3>Quantum, from the ground up.</h3>
            <p>A friendly, hands-on introduction to the ideas behind quantum computing. No prerequisites. Bring your questions.</p>
            <a className="event-action" href="#join">Get event updates <span>↗</span></a>
          </div>
        </article>
        <div className="event-side">
          <div className="event-side-heading"><span>IN OUR ORBIT</span><span>WHAT&apos;S NEXT</span></div>
          {[
            ["01", "BUILD TOGETHER", "Quantum circuit jam", "Sketch it. Simulate it. Break it. Learn from it.", "⌘"],
            ["02", "IDEAS IN MOTION", "Research show & tell", "Curious minds sharing what they're figuring out.", "↗"],
            ["03", "NO WRONG QUESTIONS", "Quantum coffee chat", "Good conversation. Great questions. Zero pressure.", "☼"]
          ].map(([number, type, title, description, symbol]) => (
            <article className="orbit-event" key={number}><span className="event-number">{number}</span><div><span className="event-type">{type}</span><h3>{title}</h3><p>{description}</p></div><span className="event-icon">{symbol}</span></article>
          ))}
          <div className="event-categories" aria-label="Explore event categories">
            <span>EXPLORE A PLANET</span>
            {(Object.keys(events) as EventKey[]).map((key) => (
              <button key={key} type="button" data-event={key} onClick={(event) => {
                eventTrigger.current = event.currentTarget;
                setActiveEvent(key);
              }}>
                {key === "speakers" ? "Speakers" : `${key.charAt(0).toUpperCase() + key.slice(1)}s`} <span>↗</span>
              </button>
            ))}
          </div>
          <div className="events-note"><span className="status-dot" /> Dates announced to the community first.<a href="#join">Get in the loop ↗</a></div>
        </div>
      </div>
      <div className="event-helix">
        <div className="event-helix-heading"><span>FOLLOW THE EVENT ORBIT</span><span>CHOOSE A COMMUNITY PLANET</span></div>
        <div className="event-helix-track">
          <svg viewBox="0 0 1000 150" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 76 C125 3 250 3 375 76 S625 149 750 76 875 3 1000 76" />
            <path d="M0 76 C125 149 250 149 375 76 S625 3 750 76 875 149 1000 76" />
          </svg>
          {(Object.keys(events) as EventKey[]).map((key, index) => (
            <button
              className={`event-helix-node event-helix-node--${index + 1}`}
              key={key}
              type="button"
              onClick={(event) => {
                eventTrigger.current = event.currentTarget;
                setActiveEvent(key);
              }}
              aria-label={`Explore ${events[key][0]}`}
            >
              <span>{["W", "H", "C", "S"][index]}</span>
              <strong>{events[key][0]}</strong>
            </button>
          ))}
        </div>
        <p>Workshops, hackathons, competitions, and talks bring the community together. Event dates are shared as they&apos;re announced.</p>
      </div>
      {activeEvent && (
        <div className="event-modal-backdrop" role="presentation" onClick={() => setActiveEvent(null)}>
          <section className="event-modal" role="dialog" aria-modal="true" aria-labelledby="event-modal-title" onClick={(event) => event.stopPropagation()}>
            <button ref={closeButton} className="event-dialog-close" type="button" aria-label="Close event details" onClick={() => setActiveEvent(null)}>×</button>
            <span className="section-kicker">QUANTIX EVENT GALAXY</span>
            <h2 id="event-modal-title">{events[activeEvent][0]}</h2>
            <p>{events[activeEvent][1]}</p>
            <div className="event-dialog-note"><span className="status-dot" />Specific dates are shared with the community as they are announced.</div>
            <a className="button button-primary" href="#join" onClick={() => setActiveEvent(null)}>Get event updates <span aria-hidden="true">↗</span></a>
          </section>
        </div>
      )}
    </section>
  );
}
