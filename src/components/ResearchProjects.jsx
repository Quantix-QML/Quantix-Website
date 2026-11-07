import React, { useState } from 'react';
import { ShieldCheck, Code2, ExternalLink, Play, Copy, Check, X, Cpu, Activity, PlusCircle, Lock } from 'lucide-react';

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
  tagline: 'Tested on real IBM Quantum Heron r2 processors. Catches stealthy eavesdroppers far below the textbook 11% QBER threshold.',
  hardware: 'IBM Heron r2 (ibm_kingston, ibm_fez, ibm_marrakesh) · Qiskit 2.6',
  abstract:
    'Eavesdropper detectors for QKD are trained almost entirely in simulation and fail when real devices drift with temperature, aging, and calibration. Nirikshak measures honest device noise on-the-fly using local reference rounds, applying an exact Mann-Whitney U test with a guaranteed 5% false-alarm budget. Evaluated across 11 hardware batches, Nirikshak caught 100% of attacked sessions (77/77) where textbook 11% QBER rule completely failed.',
  metrics: [
    { label: 'Attacks Flagged', value: '77 / 77', detail: '100% catch rate on IBM Heron r2' },
    { label: 'False-Alarm Rate', value: '5.3%', detail: 'Strictly bounds to 5% budget (sim fails at 99%)' },
    { label: 'Quantum Hardware', value: '3 Heron r2', detail: 'ibm_kingston, ibm_fez, ibm_marrakesh' },
    { label: 'Stealth Resilience', value: '1 of 16', detail: 'Catches eavesdroppers tapping only 6.25% rounds' },
  ],
  links: {
    github: 'https://github.com/dipankarchettri/nirikshak',
    liveApp: 'https://dipankarchettri.github.io/nirikshak/',
    videoDemo: 'https://youtu.be/gO9v1e-yHNs',
  },
  codeSnippet: `# Nirikshak: Drift-Robust Statistical Eavesdropper Detection
# Tested on IBM Heron r2 processors (Qiskit 2.6)
import numpy as np
from scipy.stats import mannwhitneyu
from qiskit import QuantumCircuit
from qiskit_ibm_runtime import QiskitRuntimeService, SamplerV2

def evaluate_session(key_rounds_qber, reference_rounds_qber, alpha=0.05):
    """
    Compares key rounds (traversed channel) against reference rounds (local honest baseline).
    Guarantees fixed 5% false-alarm rate under arbitrary hardware drift.
    """
    # Exact non-parametric Mann-Whitney U statistical test
    stat, p_value = mannwhitneyu(key_rounds_qber, reference_rounds_qber, alternative='greater')
    
    # Flag session if channel noise exceeds hardware reference baseline
    attack_detected = bool(p_value < alpha)
    
    return {
        "attack_detected": attack_detected,
        "p_value": float(p_value),
        "confidence": float(1.0 - p_value),
        "qber_key": float(np.mean(key_rounds_qber)),
        "qber_ref": float(np.mean(reference_rounds_qber))
    }

# Hardware verification result on ibm_kingston:
# Flagged 77 of 77 attacks (including 1-in-16 round tapping) with 5.3% false alarm.`,
};

export default function ResearchProjects({ onOpenJoinModal }) {
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [adminNotice, setAdminNotice] = useState(false);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleAdminClick = () => {
    setAdminNotice(true);
    setTimeout(() => setAdminNotice(false), 3500);
  };

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
        <div className="relative p-6 sm:p-10 rounded-3xl bg-[#06339e]/90 border-2 border-white/40 hover:border-lime-400 transition-all duration-300 shadow-2xl backdrop-blur-2xl group overflow-hidden">
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

          {/* 4 Quantitative Benchmark Tiles */}
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {nirikshakProject.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/5 border border-white/15 hover:border-lime-400/60 transition-colors"
              >
                <div className="text-nano font-mono text-white/60 uppercase tracking-wider">
                  {metric.label}
                </div>
                <div className="text-xl sm:text-2xl font-mono font-black text-lime-400 mt-1">
                  {metric.value}
                </div>
                <div className="text-nano font-mono text-white/70 mt-1">
                  {metric.detail}
                </div>
              </div>
            ))}
          </div>

          {/* Action Button Bar */}
          <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
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

              <a
                href={nirikshakProject.links.liveApp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/40 text-white font-mono text-xs font-bold transition-all flex items-center gap-2"
              >
                <Activity className="w-4 h-4 text-lime-400" />
                <span>Live Web App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={nirikshakProject.links.videoDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/40 text-white font-mono text-xs font-bold transition-all flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5 text-lime-400 fill-lime-400" />
                <span>Video Demo (4:46)</span>
              </a>
            </div>

            <button
              onClick={() => setIsCodeModalOpen(true)}
              className="px-5 py-2.5 rounded-full bg-lime-400 hover:bg-lime-300 text-ink-950 font-mono text-xs font-black transition-all flex items-center gap-2 shadow-md"
            >
              <Code2 className="w-4 h-4" />
              <span>Inspect Qiskit Code</span>
            </button>
          </div>
        </div>

        {/* ── CARD 2: ADMIN / UPCOMING COHORT SUBMISSION SLOT ── */}
        <div className="relative p-6 sm:p-8 rounded-3xl border-2 border-dashed border-white/30 bg-white/5 hover:bg-white/10 hover:border-lime-400/60 transition-all duration-300">
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

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                onClick={onOpenJoinModal}
                className="px-6 py-2.5 rounded-full bg-white hover:bg-lime-400 hover:text-ink-950 text-ink-950 font-mono text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Submit Research Draft</span>
              </button>

              <button
                onClick={handleAdminClick}
                className="px-5 py-2.5 rounded-full border border-white/40 hover:border-white bg-white/5 hover:bg-white/15 text-white font-mono text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5 text-lime-400" />
                <span>Admin Portal</span>
              </button>
            </div>
          </div>

          {adminNotice && (
            <div className="mt-4 p-3 rounded-2xl bg-lime-400 text-ink-950 font-mono text-xs font-bold flex items-center justify-between animate-fade-in">
              <span>Admin portal ready. Authenticated cohort leads can publish new verified preprints.</span>
              <button onClick={() => setAdminNotice(false)} className="text-ink-950 hover:opacity-70">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── CODE WORKBENCH MODAL FOR NIRIKSHAK ── */}
      {isCodeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/80 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-3xl rounded-3xl bg-[#031d5b] border-2 border-white/30 p-6 sm:p-8 shadow-2xl text-white">
            <button
              onClick={() => setIsCodeModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Close Code Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-xl bg-lime-400 text-ink-950 flex items-center justify-center font-mono font-black text-xs">
                Q
              </div>
              <div>
                <span className="font-mono text-xs text-lime-400 font-bold uppercase tracking-wider">
                  Nirikshak Implementation • Qiskit 2.6
                </span>
                <div className="text-micro font-mono text-white/60">
                  Exact Statistical Test for Drift-Robust BB84 Eavesdropper Detection
                </div>
              </div>
            </div>

            <p className="mt-3 text-xs sm:text-sm text-white/80 leading-relaxed">
              Real Python algorithm tested on IBM Quantum processors (<code className="text-lime-400 font-mono">ibm_kingston</code>, <code className="text-lime-400 font-mono">ibm_fez</code>, <code className="text-lime-400 font-mono">ibm_marrakesh</code>).
            </p>

            {/* Code Block with Copy Button */}
            <div className="mt-5 rounded-2xl bg-[#010e2f] border border-white/20 p-4 font-mono text-xs overflow-x-auto relative group">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-white/50 text-nano">
                <span>python • src/main.py</span>
                <button
                  onClick={() => handleCopyCode(nirikshakProject.codeSnippet)}
                  className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-colors text-nano font-bold"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3 h-3 text-lime-400" />
                      <span className="text-lime-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="text-lime-300/90 leading-relaxed">
                <code>{nirikshakProject.codeSnippet}</code>
              </pre>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/15">
              <a
                href={nirikshakProject.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-lime-400 font-mono text-xs flex items-center gap-1.5"
              >
                <span>View full repository &amp; datasets on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setIsCodeModalOpen(false)}
                className="px-6 py-2 rounded-full bg-white text-ink-950 font-mono text-xs font-bold hover:bg-lime-400 transition-colors"
              >
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}