import React from 'react';
import { Layers, Cpu, Network } from 'lucide-react';

const tracks = [
  {
    number: '01',
    icon: Layers,
    title: 'Quantum Foundations & Linear Algebra',
    subtitle: 'From Hilbert Spaces to Entanglement',
    description: 'Foundations of quantum information science: state vectors, bra-ket notation, superposition, Bell states, and unitary transformation matrices.',
    topics: [
      'Hilbert spaces & Dirac notation',
      'Bloch sphere state representation',
      'Bell states & quantum entanglement',
      'Unitary logic gates (H, X, Y, Z, S)'
    ],
    tools: 'NumPy · SymPy · Statevector Sim'
  },
  {
    number: '02',
    icon: Cpu,
    title: 'Algorithms & NISQ Hardware',
    subtitle: 'Computational Speedups on Hardware',
    description: 'Analyzing algorithms that outpace classical supercomputers: Grover search, Shor’s period finding, and Variational Quantum Eigensolvers for molecular chemistry.',
    topics: [
      "Grover's search algorithm O(√N)",
      "Shor's quantum Fourier transform",
      'Variational Quantum Eigensolver (VQE)',
      'Zero-noise extrapolation (ZNE)'
    ],
    tools: 'IBM Qiskit · Qiskit Runtime · OpenQASM'
  },
  {
    number: '03',
    icon: Network,
    title: 'Quantum ML & Post-Quantum Crypto',
    subtitle: 'Hybrid Quantum-Classical Systems',
    description: 'Bridging algorithms into machine learning pipelines with PennyLane, and analyzing post-quantum lattice cryptography (ML-KEM/ML-DSA).',
    topics: [
      'Parameterized Quantum Circuits (PQC)',
      'Quantum kernel methods (QSVM)',
      'Post-quantum lattice cryptography',
      'Hybrid quantum-classical backprop'
    ],
    tools: 'PennyLane · PyTorch · liboqs'
  }
];

export default function Tracks({ onOpenJoinModal }) {
  return (
    <div id="tracks" className="relative py-16 sm:py-24 max-w-7xl mx-auto">
      {/* ── SECTION HEADER MATCHING HERO & RESEARCH DISPLAY STYLING ── */}
      <div className="mb-12 sm:mb-16">
        <div>
          <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight uppercase leading-[0.95]">
            #CURRICULUM &amp; <span className="text-lime-400">TRACKS</span>
          </h2>
          <div className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight uppercase leading-[0.95]">
            ROADMAP
          </div>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-white/80 leading-relaxed font-normal">
            A progressive student learning path from fundamental quantum mechanics to executing variational algorithms on cloud quantum processors.
          </p>
        </div>
      </div>

      {/* ── 3 HIGH-CONTRAST BLUEPRINT TRACK CARDS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {tracks.map((track) => {
          return (
            <div
              key={track.number}
              className="relative p-6 sm:p-8 rounded-xl bg-[#06339e]/90 border-2 border-white/40 hover:border-lime-400 transition-all duration-300 shadow-2xl backdrop-blur-2xl group overflow-hidden flex flex-col justify-between"
            >
              {/* Blueprint Corner Crosshair Accents (+) */}
              <span className="absolute top-3 left-3 font-mono text-nano text-white/40 select-none">+</span>
              <span className="absolute top-3 right-3 font-mono text-nano text-white/40 select-none">+</span>
              <span className="absolute bottom-3 left-3 font-mono text-nano text-white/40 select-none">+</span>
              <span className="absolute bottom-3 right-3 font-mono text-nano text-white/40 select-none">+</span>

              <div>
                {/* Top Metadata Header */}
                <div className="flex items-center justify-between mb-5">
                  <span className="px-3 py-1 rounded-full bg-lime-400 text-ink-950 font-mono text-xs font-black uppercase tracking-wider shadow-sm">
                    TRACK {track.number}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/30 text-white font-mono text-nano font-semibold">
                    {track.tools.split('·')[0].trim()}
                  </span>
                </div>

                <h3 className="font-display font-black text-xl sm:text-2xl text-white group-hover:text-lime-400 transition-colors tracking-tight leading-snug">
                  {track.title}
                </h3>
                <div className="font-mono text-xs text-lime-400 font-bold mt-1.5">
                  {track.subtitle}
                </div>

                <p className="mt-3 text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
                  {track.description}
                </p>

                {/* Topics list */}
                <div className="mt-5 space-y-2.5 bg-white/5 border border-white/15 p-4 rounded-lg font-mono text-xs text-white/90">
                  {track.topics.map((topic, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-lime-400 mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-5 border-t border-white/15">
                <span className="font-mono text-nano text-white/60">
                  {track.tools}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
