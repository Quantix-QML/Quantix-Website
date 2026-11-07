"use client";

import { useState } from "react";

const concepts: Record<string, string> = {
  superposition: "Start with a qubit in state |0⟩. Apply H to create an equal chance of measuring 0 or 1.",
  entanglement: "Entangled qubits share a connection: measuring one tells you about the other, even when their outcomes are correlated across distance.",
  gates: "Quantum gates are operations that change a qubit's state. H creates superposition; X flips |0⟩ and |1⟩.",
  qubits: "A qubit is a quantum bit. Unlike a classical bit, it can hold a combination of |0⟩ and |1⟩ until measured.",
  qft: "The Quantum Fourier Transform changes how amplitudes are represented, helping quantum algorithms reveal periodic structure.",
  grover: "Grover's algorithm searches an unstructured set of possibilities with a quadratic speedup over classical search.",
  shor: "Shor's algorithm uses quantum Fourier transforms to factor integers efficiently in theory, motivating research into post-quantum security."
};

const topics = [
  ["superposition", "Superposition"], ["entanglement", "Entanglement"], ["gates", "Quantum gates"],
  ["qubits", "Qubits"], ["qft", "QFT"], ["grover", "Grover"], ["shor", "Shor"]
];

export function LearningUniverse() {
  const [topic, setTopic] = useState("superposition");
  const [bloch, setBloch] = useState({ x: 0, y: 0, z: 1 });
  const [lastGate, setLastGate] = useState("READY");
  const [measured, setMeasured] = useState<number | null>(null);

  const probabilityOne = Math.round(((1 - bloch.z) / 2) * 100);
  const polar = Math.acos(Math.max(-1, Math.min(1, bloch.z)));
  const azimuth = Math.atan2(bloch.y, bloch.x);
  const alpha = Math.cos(polar / 2);
  const beta = Math.sin(polar / 2);
  const betaPhase = ((azimuth * 180) / Math.PI + 360) % 360;

  function applyGate(gate: "H" | "X" | "Z") {
    setBloch((state) => {
      if (gate === "H") return { x: state.z, y: -state.y, z: state.x };
      if (gate === "X") return { x: state.x, y: -state.y, z: -state.z };
      return { x: -state.x, y: -state.y, z: state.z };
    });
    setLastGate(gate);
    setMeasured(null);
    if (gate === "H") setTopic("superposition");
  }

  function measure() {
    const outcome = Math.random() < (1 + bloch.z) / 2 ? 0 : 1;
    setBloch({ x: 0, y: 0, z: outcome === 0 ? 1 : -1 });
    setMeasured(outcome);
    setLastGate("MEASURE");
  }

  return (
    <section className="learning section-shell" id="learn">
      <div className="section-kicker">THE QUANTUM, DEMYSTIFIED <span>— 03</span></div>
      <div className="learning-layout">
        <div className="learning-copy">
          <h2>One little gate.<br /><span className="gradient-text">A world of possibility.</span></h2>
          <p>A quantum bit can be more than zero or one. Apply gates to rotate its state, watch the Bloch vector move, then measure an outcome.</p>
          <div className="topic-list" role="group" aria-label="Choose a quantum concept">
            {topics.map(([id, label], index) => (
              <button
                className={`topic-chip${topic === id ? " is-active" : ""}`}
                type="button"
                key={id}
                data-topic={id}
                aria-pressed={topic === id}
                onClick={() => setTopic(id)}
              >
                {label}<span>{String(index + 1).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="circuit-panel">
          <div className="panel-top"><span><i className="status-dot" /> LIVE QUBIT PLAYGROUND</span><span className="panel-id">SIM.001</span></div>
          <div className="circuit-display">
            <div className="mini-bloch" aria-label={`Bloch vector x ${bloch.x.toFixed(2)}, y ${bloch.y.toFixed(2)}, z ${bloch.z.toFixed(2)}`}>
              <span className="mini-bloch-axis mini-bloch-axis--vertical" />
              <span className="mini-bloch-axis mini-bloch-axis--horizontal" />
              <span className="mini-bloch-sphere" />
              <span className="mini-bloch-vector" style={{ transform: `translate(-50%, -50%) rotate(${Math.atan2(bloch.x, bloch.z)}rad) scaleY(${Math.max(.2, Math.hypot(bloch.x, bloch.z))})` }} />
              <span className="mini-bloch-tip" style={{ left: `${50 + bloch.x * 38}%`, top: `${50 - bloch.z * 38}%` }} />
              <span className="mini-bloch-label mini-bloch-label--zero">|0⟩</span>
              <span className="mini-bloch-label mini-bloch-label--one">|1⟩</span>
            </div>
            <div className="circuit-row">
              <span className="ket">|0⟩</span><span className="wire" />
              <span className="gate-runner" aria-label={`Last operation: ${lastGate}`}>{lastGate === "READY" ? "·" : lastGate}</span>
              <span className="wire" /><span className="ket ket-result">{measured === null ? `${alpha.toFixed(2)}|0⟩ + ${beta.toFixed(2)}e^(${betaPhase}°i)|1⟩` : `Measured |${measured}⟩`}</span>
            </div>
            <div className="probability"><span>CHANCE OF MEASURING |1⟩</span><div className="probability-track"><i style={{ width: `${probabilityOne}%` }} /></div><b>{probabilityOne}%</b></div>
            <div className="sim-gates" role="group" aria-label="Apply a quantum gate">
              <span>APPLY</span>
              {(["H", "X", "Z"] as const).map((gate) => <button key={gate} type="button" aria-label={`Apply ${gate} gate`} onClick={() => applyGate(gate)}>{gate}</button>)}
              <button type="button" className="measure-button" onClick={measure}>MEASURE</button>
            </div>
            <p className="sim-explanation" aria-live="polite">
              {measured !== null
                ? `Measurement collapsed the state to |${measured}⟩. Reset the qubit to explore another state.`
                : lastGate === "H"
                  ? "H rotates the Bloch vector, creating a superposition from |0⟩."
                  : lastGate === "X"
                    ? "X flips the north and south poles of the Bloch sphere."
                    : lastGate === "Z"
                      ? "Z rotates the state phase around the vertical axis."
                      : concepts[topic]}
            </p>
          </div>
          <div className="panel-bottom"><span>STATE <b>{measured !== null ? `|${measured}⟩ MEASURED` : lastGate === "READY" ? "READY" : `${lastGate} APPLIED`}</b></span><button className="reset-button" type="button" onClick={() => { setBloch({ x: 0, y: 0, z: 1 }); setLastGate("READY"); setMeasured(null); }}>RESET <span aria-hidden="true">↺</span></button></div>
        </div>
      </div>
      <div className="learning-roadmap">
        <div className="roadmap-heading"><span>THE QUANTUM ROADMAP</span><span>START ANYWHERE. KEEP GOING.</span></div>
        <ol className="roadmap-track">
          {[
            ["01", "Foundations", "Linear algebra & probability"],
            ["02", "Qubits", "States, amplitudes & measurement"],
            ["03", "Gates", "Build and read circuits"],
            ["04", "Algorithms", "Explore Grover & Shor"],
            ["05", "Qiskit", "Run your first experiment"]
          ].map(([number, title, detail]) => (
            <li className="roadmap-step" key={number}>
              <span className="roadmap-node">{number}</span>
              <strong>{title}</strong>
              <span>{detail}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
