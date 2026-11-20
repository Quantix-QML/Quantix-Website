import React, { useState } from 'react';
import { Rotate3d, CheckCircle2 } from 'lucide-react';

export default function MemberPass() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section id="pass" className="pb-24 px-6 sm:px-10 max-w-7xl mx-auto">
      {/* ── 2-COLUMN SHOWCASE: SPECIFICATION & PHYSICAL PASS PREVIEW ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Official Credential Overview */}
        <div className="lg:col-span-6 space-y-6">
          <h2 className="font-display font-black text-3xl sm:text-5xl text-ink-950 tracking-tight leading-tight">
            The Quantix Member Pass
          </h2>

          <p className="text-base sm:text-lg text-ink-700 leading-relaxed font-normal">
            Every admitted Quantix fellow receives an official physical identity badge and verified digital credential upon joining the cohort.
          </p>

          <div className="space-y-3.5 pt-2 font-mono text-xs text-ink-800">
            <div className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
              <CheckCircle2 className="w-4 h-4 text-electric-600 mt-0.5 shrink-0" />
              <div>
                <strong className="text-ink-950 block">Lab &amp; Compute Access</strong>
                <span className="text-ink-600 text-nano">Authorizes hands-on access to SIET AI &amp; DS hardware lab sessions and cloud QPU allocations.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
              <CheckCircle2 className="w-4 h-4 text-electric-600 mt-0.5 shrink-0" />
              <div>
                <strong className="text-ink-950 block">Verifiable Cohort Registry</strong>
                <span className="text-ink-600 text-nano">Unique member identification registered in the institutional club database.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
              <CheckCircle2 className="w-4 h-4 text-electric-600 mt-0.5 shrink-0" />
              <div>
                <strong className="text-ink-950 block">Digital Pass Management</strong>
                <span className="text-ink-600 text-nano">Full pass generation, personalized credentials, and exports are managed securely inside the upcoming Members Portal.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Exact Physical Spec 3D Card Preview */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center pt-2">
          {/* Rigid 340x214 Stage (Flips in-place with zero layout shift) */}
          <div className="qc-stage select-none">
            <div
              id="printableMemberCard"
              className="qc-flipper cursor-pointer group"
              onClick={() => setIsFlipped(!isFlipped)}
              style={{
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
              title="Click to flip badge"
            >
              {/* ── CARD FRONT (EXACT MATCH OF kit/card-template.html #cardFront) ── */}
              <div className="qc-card-face qc-front qc-card-front">
                <div className="qc-glow" />
                <img className="qc-wm" src="/QUANTIX-emblem.png" alt="" />
                <div className="qc-frame" />

                <div className="qc-fpad">
                  <div className="qc-fhead">
                    <img src="/QUANTIX-emblem.png" alt="QUANTIX" />
                    <div className="qc-club">
                      Quantum Computing Club<br />SIET · Tumakuru
                    </div>
                    <span className="qc-chip">FELLOW</span>
                  </div>

                  <div className="qc-fname">
                    <div className="qc-val">QUANTIX FELLOW</div>
                    <div className="qc-line" />
                  </div>

                  <div className="qc-fmeta">
                    <span>QX-COHORT-2026</span>
                  </div>

                  <div className="qc-ffoot">
                    Quant<span className="qc-i">i</span>X
                  </div>
                </div>
              </div>

              {/* ── CARD BACK (EXACT MATCH OF kit/card-template.html #cardBack) ── */}
              <div className="qc-card-face qc-back qc-card-back">
                <div className="qc-glow" />
                <div className="qc-frame" />
                <div className="qc-bpad">
                  <img className="qc-bemblem" src="/QUANTIX-emblem.png" alt="QUANTIX" />
                  <div className="qc-bmotto">
                    Build with knowledge <span className="qc-dot">•</span> Grow with people
                  </div>
                  <div className="qc-btag">For a quantum tomorrow</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 font-mono text-xs text-ink-500 text-center flex items-center gap-2 select-none">
            <Rotate3d className="w-4 h-4 text-electric-600 animate-spin-slow" />
            <span>Click card to inspect reverse</span>
          </div>
        </div>
      </div>
    </section>
  );
}
