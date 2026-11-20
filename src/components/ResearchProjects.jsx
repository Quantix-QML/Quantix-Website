import React from 'react';
import { ExternalLink } from 'lucide-react';

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const nirikshakProject = {
  id: '01',
  code: 'QX-PRJ-01',
  title: 'Nirikshak: Drift-Robust Eavesdropper Detection for BB84 Quantum Key Distribution',
  hardware: 'IBM Quantum Hardware · Qiskit',
  abstract:
    'Eavesdropper detection models for quantum key distribution (QKD) often degrade in physical environments when quantum processors drift due to thermal fluctuations and calibration decay. Nirikshak characterizes baseline device noise dynamically during execution using reference rounds and non-parametric hypothesis testing, differentiating channel interception from physical hardware noise on superconducting processors.',
  links: {
    github: 'https://github.com/dipankarchettri/nirikshak',
  },
};

export default function ResearchProjects({ onOpenJoinModal } = {}) {
  return (
    <div id="research" className="relative py-16 sm:py-24 max-w-7xl mx-auto">
      {/* ── SECTION HEADER MATCHING HERO DISPLAY STYLING ── */}
      <div className="mb-12 sm:mb-16">
        <div>
          <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight uppercase leading-[0.95]">
            #RESEARCH &amp; <span className="text-lime-400">HARDWARE</span>
          </h2>
          <div className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight uppercase leading-[0.95]">
            VERIFICATION
          </div>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-white/80 leading-relaxed font-normal">
            Empirical quantum communications and security benchmarks tested on real IBM Heron r2 superconducting processors by SIET student &amp; faculty researchers.
          </p>
        </div>
      </div>

      {/* ── PROJECT SHOWCASE GRID (NIRIKSHAK + ADMIN PIPELINE) ── */}
      <div className="space-y-8">
        {/* ── CARD 1: NIRIKSHAK FLAGSHIP PROJECT (HIGH-CONTRAST BLUEPRINT CARD) ── */}
        <div className="relative p-6 sm:p-10 rounded-xl bg-[#06339e]/90 border-2 border-white/40 hover:border-lime-400 transition-all duration-300 shadow-2xl backdrop-blur-2xl group overflow-hidden">
          {/* Blueprint Corner Crosshair Accents (+) */}
          <span className="absolute top-3 left-3 font-mono text-nano text-white/40 select-none">+</span>
          <span className="absolute top-3 right-3 font-mono text-nano text-white/40 select-none">+</span>
          <span className="absolute bottom-3 left-3 font-mono text-nano text-white/40 select-none">+</span>
          <span className="absolute bottom-3 right-3 font-mono text-nano text-white/40 select-none">+</span>

          {/* Top Metadata Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-white/15">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-lime-400 text-ink-950 font-mono text-xs font-black uppercase tracking-wider shadow-sm">
                {nirikshakProject.code}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/30 text-white font-mono text-xs font-semibold">
                {nirikshakProject.hardware}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 font-mono text-nano uppercase">
                SIET Tumakuru
              </span>
            </div>
          </div>

          {/* Main Title & Tagline */}
          <div className="space-y-3">
            <h3 className="font-display font-black text-2xl sm:text-4xl text-white group-hover:text-lime-400 transition-colors tracking-tight leading-snug">
              {nirikshakProject.title}
            </h3>
            <p className="text-white/90 text-sm sm:text-base font-normal leading-relaxed max-w-4xl">
              {nirikshakProject.abstract}
            </p>
          </div>

          {/* Action Button Bar */}
          <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center gap-4">
              <a
                href={nirikshakProject.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-white hover:bg-lime-400 text-ink-950 font-mono text-xs font-bold transition-all shadow-md flex items-center gap-2 group/btn"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
              </a>
          </div>
        </div>

        {/* ── CARD 2: UPCOMING COHORT SUBMISSION SLOT ── */}
        <div className="relative p-6 sm:p-8 rounded-xl border-2 border-dashed border-white/30 bg-white/5 hover:bg-white/10 hover:border-lime-400/60 transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/70 font-mono text-nano uppercase tracking-wider font-bold">
                  QX-PRJ-02 • INTAKE PIPELINE
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-lime-400/20 text-lime-400 border border-lime-400/30 font-mono text-nano uppercase font-bold">
                  Active Review
                </span>
              </div>
              <h4 className="font-display font-bold text-2xl text-white">
                Upcoming Cohort Preprint &amp; Hardware Submission
              </h4>
              <p className="text-white/70 text-sm max-w-3xl leading-relaxed">
                SIET student fellows and cohort leads are actively benchmarking next-generation quantum algorithms on IBM Quantum Cloud. Verified papers are published through the Quantix editorial board.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 rounded-full bg-white/10 text-white/90 font-mono text-nano">
                  • Quantum Machine Learning (PennyLane)
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-white/90 font-mono text-nano">
                  • Post-Quantum Cryptography (NIST ML-KEM)
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-white/90 font-mono text-nano">
                  • Fault-Tolerant Surface Codes
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}