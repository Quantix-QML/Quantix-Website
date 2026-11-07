"use client";

import { useState } from "react";

const people = [
  { id: "a", x: 14, y: 27, initial: "?", label: "THE CURIOUS", name: "The curious beginner", role: "Future quantum thinker", description: "No quantum background required. Curiosity is the only prerequisite." },
  { id: "b", x: 37, y: 14, initial: "⌘", label: "THE BUILDERS", name: "The hands-on builder", role: "Circuit experimenter", description: "Learn by making, testing, tinkering, and trying one more time." },
  { id: "c", x: 56, y: 39, initial: "∿", label: "THE THINKERS", name: "The big-picture thinker", role: "Ideas explorer", description: "Follow the questions that don't have easy answers yet." },
  { id: "d", x: 83, y: 18, initial: "+", label: "THE CONNECTORS", name: "The community connector", role: "People person", description: "Make room for new voices and connect curious minds." },
  { id: "e", x: 23, y: 72, initial: "⌬", label: "THE EXPLORERS", name: "The research explorer", role: "Future researcher", description: "Take a first step into a field that's still being written." }
];

export function TeamUniverse() {
  const [activePerson, setActivePerson] = useState<(typeof people)[number] | null>(null);
  return (
    <section className="people section-shell" id="people">
      <div className="section-heading">
        <div><div className="section-kicker">NO ONE FIGURES IT OUT ALONE <span>— 06</span></div><h2>Curiosity connects us.</h2></div>
        <p>Different starting points.<br />One beautifully entangled community.</p>
      </div>
      <div className="people-network">
        <svg className="network-lines" viewBox="0 0 1000 380" preserveAspectRatio="none" aria-hidden="true">
          <path d="M140 102 370 53 560 148 830 68M140 102 230 280 560 262 830 68M370 53 560 262 810 285 830 68M140 102 560 262 560 148M230 280 560 148 810 285" />
        </svg>
        {people.map((person) => (
          <button
            className={`person-node node-${person.id}${activePerson?.id === person.id ? " is-selected" : ""}`}
            style={{ left: `${person.x}%`, top: `${person.y}%` }}
            type="button"
            key={person.id}
            aria-label={`Meet ${person.name}`}
            aria-pressed={activePerson?.id === person.id}
            onClick={() => setActivePerson(person)}
          >
            <span className="node-initial">{person.initial}</span><span className="node-label">{person.label}</span>
          </button>
        ))}
        <div className="network-center"><span className="center-symbol">Q</span><span>CONNECTED BY CURIOSITY</span></div>
        <div className="person-tooltip" aria-live="polite">
          <strong>{activePerson?.name || "Your kind of people"}</strong>
          <span>{activePerson ? `${activePerson.role} — ${activePerson.description}` : "Choose a node. Your quantum story starts anywhere."}</span>
        </div>
      </div>
    </section>
  );
}
