"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoMark } from "./LogoMark";

const gates = [
  { symbol: "H", name: "Hadamard", detail: "Rotate |0⟩ into an equal superposition.", className: "landing-gate--h" },
  { symbol: "X", name: "Pauli-X", detail: "Flip the qubit between |0⟩ and |1⟩.", className: "landing-gate--x" },
  { symbol: "Z", name: "Pauli-Z", detail: "Flip the phase of the qubit state.", className: "landing-gate--z" }
];

export function LandingScene() {
  const [activeGate, setActiveGate] = useState<string | null>(null);
  const [stateLabel, setStateLabel] = useState("|0⟩");
  const [angles, setAngles] = useState({ theta: 0, phi: 0 });

  useEffect(() => {
    const onState = (event: Event) => {
      const { label, theta, phi } = (event as CustomEvent<{ label: string; theta: number; phi: number }>).detail;
      setStateLabel((current) => current === label ? current : label);
      const nextAngles = { theta: Math.round(theta), phi: Math.round(phi) };
      setAngles((current) => current.theta === nextAngles.theta && current.phi === nextAngles.phi ? current : nextAngles);
    };
    window.addEventListener("quantix:state", onState);
    return () => window.removeEventListener("quantix:state", onState);
  }, []);

  function applyGate(gate: string) {
    setActiveGate(gate);
    window.dispatchEvent(new CustomEvent("quantix:gate", { detail: { gate } }));
  }

  return (
    <main className="landing-page">
      <header className="landing-header">
        <Link className="landing-brand" href="/" aria-label="Quantix home">
          <LogoMark className="brand-mark" size={40} priority />
          <span>quantix<span className="brand-period">.</span></span>
        </Link>
        <Link className="landing-enter" href="/club">Enter the club <span aria-hidden="true">↗</span></Link>
      </header>

      <div className="landing-status"><span className="status-dot" /> DRAG TO ROTATE <i /> MOVE TO CHANGE THE STATE VECTOR</div>

      <div className="bloch-notations" aria-label="Bloch sphere axes and qubit state">
        <span className="bloch-notation bloch-notation--north">|0⟩</span>
        <span className="bloch-notation bloch-notation--south">|1⟩</span>
        <span className="bloch-notation bloch-notation--x">x</span>
        <span className="bloch-notation bloch-notation--y">y</span>
        <span className="bloch-notation bloch-notation--z">z</span>
        <span className="bloch-notation bloch-notation--theta" key={`theta-${angles.theta}`}>θ <b>{angles.theta}°</b></span>
        <span className="bloch-notation bloch-notation--phi" key={`phi-${angles.phi}`}>φ <b>{angles.phi}°</b></span>
        <span className="bloch-notation bloch-notation--psi" key={`psi-${stateLabel}`}>|ψ⟩ = {stateLabel}</span>
      </div>

      <div className="landing-gates" aria-label="Explore quantum gates">
        {gates.map((gate) => (
          <div className={`landing-gate ${gate.className}`} key={gate.name}>
            <button
              type="button"
              aria-label={`Apply ${gate.name} gate`}
              aria-expanded={activeGate === gate.name}
              aria-controls={`gate-info-${gate.name}`}
              onClick={() => applyGate(gate.symbol)}
            >
              <span>{gate.symbol}</span>
            </button>
            <div
              className={`landing-gate-popup${activeGate === gate.name ? " is-visible" : ""}`}
              id={`gate-info-${gate.name}`}
              role="tooltip"
            >
              <strong>{gate.name} gate</strong>
              <span>{gate.detail}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="landing-wordmark" aria-hidden="true">QUANTIX</div>
      <div className="landing-caption" aria-live="polite"><span /> STATE {stateLabel} <i /> SCROLL TO APPLY H · X · Z <span /></div>
    </main>
  );
}
