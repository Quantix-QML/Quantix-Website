import React, { useState, useEffect, useRef } from 'react';

// Exact 40px Blueprint Grid coordinates (width = 280px = 7 cells, height = 600px = 15 cells)
// Each gate is exactly 40px by 40px fitting into [x..x+40, topY..topY+40]
const GATES = [
  { id: 'H', x: 140, y: 60, topY: 40, name: 'Hadamard', role: 'Superposition' },
  { id: 'X', x: 60, y: 180, topY: 160, name: 'Pauli-X', role: 'Bit-Flip NOT' },
  { id: 'S', x: 220, y: 300, topY: 280, name: 'Phase-S', role: 'π/2 Phase' },
  { id: 'Z', x: 60, y: 420, topY: 400, name: 'Pauli-Z', role: 'Phase-Flip' },
  { id: 'M', x: 220, y: 540, topY: 520, name: 'Detector', role: 'Collapse' },
];

const QUBIT_RADIUS = 16;

// ── 5 DISTINCT AUTHENTIC QUANTUM CIRCUIT ICONS ──

// 1. Gate H: Hadamard Superposition with beam-splitter wave brackets
function HadamardIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6V18M20 6V18" strokeWidth="1.5" strokeOpacity="0.5" />
      <path d="M7 6v12M17 6v12M7 12h10" strokeWidth="2.5" />
      <path d="M3 19.5c1.5-1 3.5-1 5 0s3.5 1 5 0 3.5-1 5 0" strokeWidth="1.2" strokeOpacity="0.7" />
    </svg>
  );
}

// 2. Gate X: Pauli-X Quantum NOT with crosshair target circle-plus ⨁
function PauliXIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="3" x2="12" y2="21" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

// 3. Gate S: Phase Gate π/2 with 90° circular phase arc and S glyph
function PhaseSIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a9 9 0 0 1 9 9" strokeWidth="2" />
      <polyline points="21 7 21 12 16 12" strokeWidth="2" />
      <path d="M8.5 13.5c0-.8.7-1.5 1.5-1.5h3c.8 0 1.5.7 1.5 1.5v.5c0 .8-.7 1.5-1.5 1.5h-3c-.8 0-1.5.7-1.5 1.5v.5c0 .8.7 1.5 1.5 1.5h3c.8 0 1.5-.7 1.5-1.5" strokeWidth="2.2" />
    </svg>
  );
}

// 4. Gate Z: Pauli-Z Phase Inversion Diamond with bold Z
function PauliZIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 3 21 12 12 21 3 12" strokeWidth="1.5" strokeOpacity="0.5" />
      <path d="M8 8h8l-8 8h8" strokeWidth="2.5" />
    </svg>
  );
}

// 5. Gate M: Quantum Measurement Analog Meter Dial Gauge with needle
function MeasurementIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 17a9 9 0 0 1 16 0" />
      <path d="M12 17l5.5-8.5" strokeWidth="2.5" />
      <circle cx="12" cy="17" r="1.5" fill="currentColor" />
      <line x1="7.5" y1="11.5" x2="8.5" y2="12.5" strokeWidth="1.5" />
      <line x1="12" y1="8" x2="12" y2="9.5" strokeWidth="1.5" />
      <line x1="16.5" y1="11.5" x2="15.5" y2="12.5" strokeWidth="1.5" />
    </svg>
  );
}

export default function FallingQubitTrack() {
  // Live render state for 3D qubit: begins completely hidden (opacity 0)
  const [qubit, setQubit] = useState({
    x: GATES[0].x,
    y: -40,
    state: '|0⟩',
    opacity: 0,
  });

  // Active gate recoil/lighting triggers
  const [activeGate, setActiveGate] = useState(null); // 'H' | 'X' | 'S' | 'Z' | 'M' | null
  const [gateRecoils, setGateRecoils] = useState({ H: 0, X: 0, S: 0, Z: 0, M: 0 });
  const [measurementOutcome, setMeasurementOutcome] = useState(null);
  const [sparks, setSparks] = useState([]);

  const animStateRef = useRef({
    phase: 'idle', // 'idle' | 0: drop to H, 1: H to X, 2: X to S, 3: S to Z, 4: Z to M, 5: exit right off screen
    x: GATES[0].x,
    y: -30,
    vx: 0,
    vy: 1.2,
    gravity: 0.22,
    qubitState: '|0⟩',
    initialState: '|0⟩',
    lastSparkId: 0,
    recoils: { H: 0, X: 0, S: 0, Z: 0, M: 0 },
    collapsedVal: '|0⟩',
  });

  // Spawn spark particle burst at impact point
  const triggerSparks = (x, y) => {
    const newSparks = Array.from({ length: 6 }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / 6 + (Math.random() - 0.5) * 0.5;
      const speed = 1.5 + Math.random() * 2.5;
      return {
        id: ++animStateRef.current.lastSparkId,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.0,
        opacity: 1,
      };
    });
    setSparks((prev) => [...prev.slice(-15), ...newSparks]);
  };

  // Launch drop ONLY when triggered by clicking gates
  const launchDrop = (now) => {
    const s = animStateRef.current;
    const initKet = Math.random() > 0.4 ? '|0⟩' : '|1⟩';
    s.initialState = initKet;
    s.qubitState = initKet;
    s.phase = 0; // begins drop to H
    s.x = GATES[0].x;
    s.y = -25;
    s.vx = 0;
    s.vy = 1.2;
    s.gravity = 0.22;
    s.collapsedVal = Math.random() > 0.5 ? '|0⟩' : '|1⟩';

    setActiveGate(null);
    setMeasurementOutcome(null);
  };

  // Click handler specifically for interacting with gates
  const handleGateClick = (gateId) => {
    const s = animStateRef.current;
    // Spring recoil on the clicked gate
    if (s.recoils[gateId] !== undefined) {
      s.recoils[gateId] = 6;
      setGateRecoils({ ...s.recoils });
    }
    // Launch qubit drop
    launchDrop(performance.now());
  };

  useEffect(() => {
    let animationFrameId;

    // NOTE: Stays completely idle on page load! No qubit drops unless gates are clicked!

    // 60FPS Physics Engine Loop
    const tick = (now) => {
      const s = animStateRef.current;

      // Handle idle state: do NOT drop any qubit automatically
      if (s.phase === 'idle') {
        let recoilChanged = false;
        Object.keys(s.recoils).forEach((k) => {
          if (s.recoils[k] > 0.1) {
            s.recoils[k] *= 0.82;
            recoilChanged = true;
          } else if (s.recoils[k] !== 0) {
            s.recoils[k] = 0;
            recoilChanged = true;
          }
        });
        if (recoilChanged) {
          setGateRecoils({ ...s.recoils });
        }
        animationFrameId = requestAnimationFrame(tick);
        return;
      }

      // 1. Advance Physics Integrator
      s.x += s.vx;
      s.y += s.vy;
      s.vy += s.gravity;

      // Spring decay for gate recoils
      let recoilChanged = false;
      Object.keys(s.recoils).forEach((k) => {
        if (s.recoils[k] > 0.1) {
          s.recoils[k] *= 0.82;
          recoilChanged = true;
        } else if (s.recoils[k] !== 0) {
          s.recoils[k] = 0;
          recoilChanged = true;
        }
      });
      if (recoilChanged) {
        setGateRecoils({ ...s.recoils });
      }

      // Helper for calculating bounce impulse to the next gate on the 40px grid
      // Hits precisely at top bumper surface (GATES[toIdx].topY - QUBIT_RADIUS)
      const bounceToNext = (fromIdx, toIdx) => {
        const fromX = GATES[fromIdx].x;
        const fromContactY = GATES[fromIdx].topY - QUBIT_RADIUS;
        const toX = GATES[toIdx].x;
        const toContactY = GATES[toIdx].topY - QUBIT_RADIUS;
        const dx = toX - fromX;
        const dy = toContactY - fromContactY; // exactly 120px = 3 grid cells
        const bounceVy = -3.4;
        const apexRise = (bounceVy * bounceVy) / (2 * s.gravity);
        const fallT = Math.sqrt((2 * (apexRise + dy)) / s.gravity);
        const riseT = Math.abs(bounceVy) / s.gravity;
        const totalT = riseT + fallT;
        s.vx = dx / totalT;
        s.vy = bounceVy;
      };

      // ── GATE 1: HADAMARD [H] (Grid cell [120..160, 40..80], contact y=24) ──
      if (s.phase === 0 && s.y >= GATES[0].topY - QUBIT_RADIUS && Math.abs(s.x - GATES[0].x) < 25) {
        s.phase = 1;
        s.y = GATES[0].topY - QUBIT_RADIUS;
        bounceToNext(0, 1);

        // Quantum transformation: Superposition created
        s.qubitState = s.initialState === '|0⟩' ? '|+⟩' : '|−⟩';
        s.recoils.H = 6;
        setGateRecoils({ ...s.recoils });
        setActiveGate('H');
        triggerSparks(GATES[0].x, GATES[0].topY);
      }

      // ── GATE 2: PAULI-X [X] (Grid cell [40..80, 160..200], contact y=144) ──
      else if (s.phase === 1 && s.y >= GATES[1].topY - QUBIT_RADIUS && Math.abs(s.x - GATES[1].x) < 25) {
        s.phase = 2;
        s.y = GATES[1].topY - QUBIT_RADIUS;
        bounceToNext(1, 2);

        // Quantum transformation: Bit-flip NOT
        s.qubitState = s.qubitState === '|+⟩' ? '|−⟩' : '|+⟩';
        s.recoils.X = 6;
        setGateRecoils({ ...s.recoils });
        setActiveGate('X');
        triggerSparks(GATES[1].x, GATES[1].topY);
      }

      // ── GATE 3: PHASE GATE [S] (Grid cell [200..240, 280..320], contact y=264) ──
      else if (s.phase === 2 && s.y >= GATES[2].topY - QUBIT_RADIUS && Math.abs(s.x - GATES[2].x) < 25) {
        s.phase = 3;
        s.y = GATES[2].topY - QUBIT_RADIUS;
        bounceToNext(2, 3);

        // Quantum transformation: π/2 phase shift
        s.qubitState = s.qubitState === '|+⟩' ? '|+i⟩' : '|-i⟩';
        s.recoils.S = 6;
        setGateRecoils({ ...s.recoils });
        setActiveGate('S');
        triggerSparks(GATES[2].x, GATES[2].topY);
      }

      // ── GATE 4: PAULI-Z [Z] (Grid cell [40..80, 400..440], contact y=384) ──
      else if (s.phase === 3 && s.y >= GATES[3].topY - QUBIT_RADIUS && Math.abs(s.x - GATES[3].x) < 25) {
        s.phase = 4;
        s.y = GATES[3].topY - QUBIT_RADIUS;
        bounceToNext(3, 4);

        // Quantum transformation: Phase flip
        s.qubitState = s.qubitState === '|+i⟩' ? '|-i⟩' : '|+i⟩';
        s.recoils.Z = 6;
        setGateRecoils({ ...s.recoils });
        setActiveGate('Z');
        triggerSparks(GATES[3].x, GATES[3].topY);
      }

      // ── GATE 5: MEASUREMENT [M] (Grid cell [200..240, 520..560], contact y=504) ──
      else if (s.phase === 4 && s.y >= GATES[4].topY - QUBIT_RADIUS && Math.abs(s.x - GATES[4].x) < 25) {
        s.phase = 5; // exiting right off screen
        s.y = GATES[4].topY - QUBIT_RADIUS;

        // Bouncy impulse pushing UP and FAR RIGHT past screen edge
        s.vy = -3.2;
        s.vx = 3.8;

        // Wavefunction collapse into eigenvalue |0⟩ or |1⟩
        s.qubitState = s.collapsedVal;
        setMeasurementOutcome(s.collapsedVal);

        s.recoils.M = 6;
        setGateRecoils({ ...s.recoils });
        setActiveGate('M');
        triggerSparks(GATES[4].x, GATES[4].topY);
      }

      // ── COMPLETELY EXITED SCREEN EDGE (x > 290) / RETURN TO IDLE UNTIL NEXT CLICK ──
      else if (s.phase === 5 && (s.x > 290 || s.y > 620)) {
        s.phase = 'idle'; // Completely idle! No more drops unless a gate is clicked!
        setActiveGate(null);
        setMeasurementOutcome(null);
        setQubit((prev) => ({ ...prev, opacity: 0 }));
      }

      // Full opacity during flight; smooth lead-in at top
      let opacity = 1;
      if (s.y < 20) {
        opacity = Math.max(0, (s.y + 25) / 45);
      }

      // Update React state for rendering
      setQubit({
        x: s.x,
        y: s.y,
        state: s.qubitState,
        opacity: s.phase === 'idle' ? 0 : opacity,
      });

      // Update sparks
      setSparks((prev) =>
        prev
          .map((sp) => ({
            ...sp,
            x: sp.x + sp.vx,
            y: sp.y + sp.vy,
            vy: sp.vy + 0.15,
            opacity: sp.opacity - 0.045,
          }))
          .filter((sp) => sp.opacity > 0)
      );

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div
      onClick={() => handleGateClick('H')}
      className="relative w-[280px] h-[600px] select-none group pointer-events-auto overflow-visible"
    >
      {/* ── BACKGROUND BLUEPRINT PATH: Connecting Theoretical Quantum Trajectory ── */}
      <svg className="absolute inset-0 w-[340px] h-[620px] pointer-events-none opacity-25 group-hover:opacity-40 transition-opacity overflow-visible" viewBox="0 0 340 620">
        {/* Drop lead-in to H */}
        <line x1={GATES[0].x} y1="0" x2={GATES[0].x} y2={GATES[0].topY - QUBIT_RADIUS} stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3" />
        {/* Arc H -> X */}
        <path
          d={`M ${GATES[0].x} ${GATES[0].topY - QUBIT_RADIUS} Q 90 2, ${GATES[1].x} ${GATES[1].topY - QUBIT_RADIUS}`}
          fill="none"
          stroke="#a3ff00"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        {/* Arc X -> S */}
        <path
          d={`M ${GATES[1].x} ${GATES[1].topY - QUBIT_RADIUS} Q 140 122, ${GATES[2].x} ${GATES[2].topY - QUBIT_RADIUS}`}
          fill="none"
          stroke="#a3ff00"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        {/* Arc S -> Z */}
        <path
          d={`M ${GATES[2].x} ${GATES[2].topY - QUBIT_RADIUS} Q 140 242, ${GATES[3].x} ${GATES[3].topY - QUBIT_RADIUS}`}
          fill="none"
          stroke="#a3ff00"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        {/* Arc Z -> M */}
        <path
          d={`M ${GATES[3].x} ${GATES[3].topY - QUBIT_RADIUS} Q 140 362, ${GATES[4].x} ${GATES[4].topY - QUBIT_RADIUS}`}
          fill="none"
          stroke="#a3ff00"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        {/* Arc M -> Exit all the way past right screen edge */}
        <path
          d={`M ${GATES[4].x} ${GATES[4].topY - QUBIT_RADIUS} Q 260 470, 310 520`}
          fill="none"
          stroke="#a3ff00"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
      </svg>

      {/* ── GATE 1: HADAMARD [H] (Grid cell [120..160, 40..80]) ── */}
      <div
        className="absolute flex flex-col items-center transition-transform duration-100"
        style={{
          left: `${GATES[0].x}px`,
          top: `${GATES[0].topY}px`,
          transform: `translateX(-50%) translateY(${gateRecoils.H}px)`,
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleGateClick('H');
          }}
          className={`w-[40px] h-[40px] rounded-lg border-2 flex items-center justify-center transition-all duration-150 cursor-pointer hover:border-lime-400 hover:shadow-lg hover:shadow-lime-400/30 hover:scale-105 active:scale-95 ${
            activeGate === 'H'
              ? 'bg-lime-400 border-lime-400 text-ink-950 shadow-xl shadow-lime-400/60 scale-105'
              : 'bg-white/10 border-white/30 text-white backdrop-blur-md group-hover:border-white/60'
          }`}
          title="Click to fire qubit through gates"
        >
          <HadamardIcon className="w-5 h-5" />
        </button>
        <div className="flex flex-col items-center mt-1 pointer-events-none select-none">
          <span
            className={`text-pico font-mono uppercase tracking-wider whitespace-nowrap transition-colors ${
              activeGate === 'H' ? 'text-lime-400 font-bold' : 'text-white/80'
            }`}
          >
            Hadamard
          </span>
          <span className="text-pico font-mono text-white/50 whitespace-nowrap">
            Superposition
          </span>
        </div>
      </div>

      {/* ── GATE 2: PAULI-X [X] (Grid cell [40..80, 160..200]) ── */}
      <div
        className="absolute flex flex-col items-center transition-transform duration-100"
        style={{
          left: `${GATES[1].x}px`,
          top: `${GATES[1].topY}px`,
          transform: `translateX(-50%) translateY(${gateRecoils.X}px)`,
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleGateClick('X');
          }}
          className={`w-[40px] h-[40px] rounded-lg border-2 flex items-center justify-center transition-all duration-150 cursor-pointer hover:border-lime-400 hover:shadow-lg hover:shadow-lime-400/30 hover:scale-105 active:scale-95 ${
            activeGate === 'X'
              ? 'bg-lime-400 border-lime-400 text-ink-950 shadow-xl shadow-lime-400/60 scale-105'
              : 'bg-white/10 border-white/30 text-white backdrop-blur-md group-hover:border-white/60'
          }`}
          title="Click to fire qubit through gates"
        >
          <PauliXIcon className="w-5 h-5" />
        </button>
        <div className="flex flex-col items-center mt-1 pointer-events-none select-none">
          <span
            className={`text-pico font-mono uppercase tracking-wider whitespace-nowrap transition-colors ${
              activeGate === 'X' ? 'text-lime-400 font-bold' : 'text-white/80'
            }`}
          >
            Pauli-X
          </span>
          <span className="text-pico font-mono text-white/50 whitespace-nowrap">
            Bit-Flip NOT
          </span>
        </div>
      </div>

      {/* ── GATE 3: PHASE GATE [S] (Grid cell [200..240, 280..320]) ── */}
      <div
        className="absolute flex flex-col items-center transition-transform duration-100"
        style={{
          left: `${GATES[2].x}px`,
          top: `${GATES[2].topY}px`,
          transform: `translateX(-50%) translateY(${gateRecoils.S}px)`,
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleGateClick('S');
          }}
          className={`w-[40px] h-[40px] rounded-lg border-2 flex items-center justify-center transition-all duration-150 cursor-pointer hover:border-lime-400 hover:shadow-lg hover:shadow-lime-400/30 hover:scale-105 active:scale-95 ${
            activeGate === 'S'
              ? 'bg-lime-400 border-lime-400 text-ink-950 shadow-xl shadow-lime-400/60 scale-105'
              : 'bg-white/10 border-white/30 text-white backdrop-blur-md group-hover:border-white/60'
          }`}
          title="Click to fire qubit through gates"
        >
          <PhaseSIcon className="w-5 h-5" />
        </button>
        <div className="flex flex-col items-center mt-1 pointer-events-none select-none">
          <span
            className={`text-pico font-mono uppercase tracking-wider whitespace-nowrap transition-colors ${
              activeGate === 'S' ? 'text-lime-400 font-bold' : 'text-white/80'
            }`}
          >
            Phase-S
          </span>
          <span className="text-pico font-mono text-white/50 whitespace-nowrap">
            π/2 Phase
          </span>
        </div>
      </div>

      {/* ── GATE 4: PAULI-Z [Z] (Grid cell [40..80, 400..440]) ── */}
      <div
        className="absolute flex flex-col items-center transition-transform duration-100"
        style={{
          left: `${GATES[3].x}px`,
          top: `${GATES[3].topY}px`,
          transform: `translateX(-50%) translateY(${gateRecoils.Z}px)`,
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleGateClick('Z');
          }}
          className={`w-[40px] h-[40px] rounded-lg border-2 flex items-center justify-center transition-all duration-150 cursor-pointer hover:border-lime-400 hover:shadow-lg hover:shadow-lime-400/30 hover:scale-105 active:scale-95 ${
            activeGate === 'Z'
              ? 'bg-lime-400 border-lime-400 text-ink-950 shadow-xl shadow-lime-400/60 scale-105'
              : 'bg-white/10 border-white/30 text-white backdrop-blur-md group-hover:border-white/60'
          }`}
          title="Click to fire qubit through gates"
        >
          <PauliZIcon className="w-5 h-5" />
        </button>
        <div className="flex flex-col items-center mt-1 pointer-events-none select-none">
          <span
            className={`text-pico font-mono uppercase tracking-wider whitespace-nowrap transition-colors ${
              activeGate === 'Z' ? 'text-lime-400 font-bold' : 'text-white/80'
            }`}
          >
            Pauli-Z
          </span>
          <span className="text-pico font-mono text-white/50 whitespace-nowrap">
            Phase-Flip
          </span>
        </div>
      </div>

      {/* ── GATE 5: MEASUREMENT [M] (Grid cell [200..240, 520..560]) ── */}
      <div
        className="absolute flex flex-col items-center transition-transform duration-100"
        style={{
          left: `${GATES[4].x}px`,
          top: `${GATES[4].topY}px`,
          transform: `translateX(-50%) translateY(${gateRecoils.M}px)`,
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleGateClick('M');
          }}
          className={`w-[40px] h-[40px] rounded-lg border-2 flex items-center justify-center transition-all duration-150 cursor-pointer hover:border-lime-400 hover:shadow-lg hover:shadow-lime-400/30 hover:scale-105 active:scale-95 ${
            activeGate === 'M'
              ? 'bg-lime-400 border-lime-400 text-ink-950 shadow-xl shadow-lime-400/60 scale-105'
              : 'bg-white/10 border-white/30 text-white backdrop-blur-md group-hover:border-white/60'
          }`}
          title="Click to fire qubit through gates"
        >
          <MeasurementIcon className="w-5 h-5" />
        </button>
        <div className="flex flex-col items-center mt-1 pointer-events-none select-none">
          <span
            className={`text-pico font-mono uppercase tracking-wider whitespace-nowrap transition-colors ${
              activeGate === 'M' ? 'text-lime-400 font-bold' : 'text-white/80'
            }`}
          >
            Detector
          </span>
          {measurementOutcome ? (
            <span className="text-pico font-mono font-bold text-lime-400 bg-black/60 px-1.5 py-0.5 rounded mt-0.5 border border-lime-400/50 whitespace-nowrap">
              Out: {measurementOutcome}
            </span>
          ) : (
            <span className="text-pico font-mono text-white/50 whitespace-nowrap">
              Collapse
            </span>
          )}
        </div>
      </div>

      {/* ── SPARK BURST PARTICLES ON IMPACT ── */}
      {sparks.map((sp) => (
        <div
          key={sp.id}
          className="absolute w-1.5 h-1.5 rounded-full bg-lime-400 pointer-events-none"
          style={{
            left: `${sp.x}px`,
            top: `${sp.y}px`,
            opacity: sp.opacity,
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 6px #a3ff00',
          }}
        />
      ))}

      {/* ── THE 3D QUANTUM BALL QUBIT (ONLY VISIBLE WHEN TRIGGERED BY CLICK) ── */}
      <div
        className="absolute z-20 pointer-events-none transition-opacity duration-100 overflow-visible"
        style={{
          left: `${qubit.x}px`,
          top: `${qubit.y}px`,
          opacity: qubit.opacity,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Photorealistic 3D Quantum Ball with Specular Glint & Ambient Curvature */}
        <div
          className="relative w-8 h-8 rounded-full flex items-center justify-center select-none"
          style={{
            background: 'radial-gradient(circle at 32% 28%, #ffffff 0%, #bef264 22%, #a3ff00 50%, #65a30d 78%, #1a2e05 100%)',
            boxShadow:
              'inset 1.5px 1.5px 3px rgba(255, 255, 255, 0.9), inset -2.5px -2.5px 5px rgba(0, 0, 0, 0.6), 0 6px 14px rgba(0, 0, 0, 0.45), 0 0 14px rgba(163, 255, 0, 0.5)',
          }}
        >
          {/* Top-left specular spherical highlight */}
          <div
            className="absolute top-1 left-1.5 w-2 h-1.5 rounded-full pointer-events-none opacity-85"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 80%)',
              transform: 'rotate(-25deg)',
            }}
          />

          {/* Dirac Ket with Embossed 3D Depth */}
          <span
            className="relative z-10 font-mono font-black text-xs text-ink-950 tracking-tighter"
            style={{
              textShadow: '0 1px 1px rgba(255, 255, 255, 0.6), 0 -1px 1px rgba(0, 0, 0, 0.3)',
            }}
          >
            {qubit.state}
          </span>
        </div>
      </div>
    </div>
  );
}