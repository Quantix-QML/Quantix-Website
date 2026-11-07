import React, { useState } from 'react';
import { Rotate3d, Download, ShieldCheck, AlertTriangle, XCircle, KeyRound, Lock } from 'lucide-react';

// Verified Quantix Fellows directory (IDs are strictly verified without exposing registry)
const memberDirectory = {
  'Q10007X': { name: 'Dipankar Chettri', title: 'President', allowed: true },
  'Q10009X': { name: 'Preetam', title: 'Member', allowed: true },
  'Q10037X': { name: 'Krutika', title: 'Member', allowed: false }, // Explicitly blocked / revoked
  'Q10039X': { name: 'Gouri', title: 'Member', allowed: true },
  'Q10061X': { name: 'Khushi', title: 'Member', allowed: true },
  'Q10067X': { name: 'Prarthana', title: 'Member', allowed: true },
  'Q10069X': { name: 'Milland', title: 'Member', allowed: true },
};

export default function MemberPass() {
  const [memberIdInput, setMemberIdInput] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);

  const normalizedId = memberIdInput.trim().toUpperCase();
  const matchedMember = memberDirectory[normalizedId];

  const isVerified = Boolean(matchedMember && matchedMember.allowed);
  const isRevoked = Boolean(matchedMember && !matchedMember.allowed);
  const isInvalid = Boolean(!matchedMember && normalizedId.length > 0);
  const isEmpty = normalizedId.length === 0;

  // Card display values
  const cardName = isVerified
    ? matchedMember.name
    : isRevoked
    ? 'REVOKED'
    : '____________________';

  const cardTitle = isVerified
    ? matchedMember.title
    : isRevoked
    ? 'INACTIVE'
    : 'FELLOW';

  const cardId = isVerified
    ? normalizedId
    : isRevoked
    ? normalizedId
    : isEmpty
    ? 'Q_____X'
    : 'Q••••••X';

  const handlePrint = () => {
    if (isVerified) {
      window.print();
    }
  };

  return (
    <section id="pass" className="pb-24 px-6 sm:px-10 max-w-7xl mx-auto">
      {/* ── SECTION HEADER ── */}
      <div className="max-w-3xl mb-12">
        <h2 className="font-display font-black text-3xl sm:text-5xl text-ink-950 tracking-tight leading-tight">
          Quantix Member Pass
        </h2>
        <p className="mt-4 text-base sm:text-lg text-ink-600 leading-relaxed font-normal">
          Official physical credential badge generation is gated strictly to authenticated Quantix fellows. Enter your designated 5-digit prime Member ID to verify and generate your official pass.
        </p>
      </div>

      {/* ── 2-COLUMN LAYOUT: VERIFICATION INPUT + PHYSICAL PASS PREVIEW ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: ID-Only Input & Actions */}
        <div className="lg:col-span-5 font-mono text-xs bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xl space-y-6">
          <div>
            <label className="block text-ink-800 text-micro uppercase tracking-wider mb-2.5 font-bold flex items-center justify-between">
              <span>Member ID (5-Digit Prime Format)</span>
              <span className="text-electric-600 font-mono text-nano lowercase">e.g. Q•••••X</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={memberIdInput}
                onChange={(e) => setMemberIdInput(e.target.value.toUpperCase())}
                placeholder="Enter Member ID (e.g. Q_____X)"
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-ink-950 font-bold font-mono text-base tracking-wider placeholder-slate-400 focus:outline-none focus:border-electric-600 focus:bg-white transition-all shadow-inner"
                maxLength={8}
                autoComplete="off"
                spellCheck="false"
              />
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                {isVerified && <ShieldCheck className="w-5 h-5 text-emerald-600" />}
                {isRevoked && <AlertTriangle className="w-5 h-5 text-amber-500" />}
                {isInvalid && <XCircle className="w-5 h-5 text-rose-500" />}
                {isEmpty && <KeyRound className="w-5 h-5 text-slate-400" />}
              </div>
            </div>
          </div>

          {/* Dynamic Authentication Status Feedback */}
          {isVerified && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-mono text-xs flex items-start gap-3 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <div className="font-bold text-emerald-950">
                  Authentication Successful
                </div>
                <div className="text-nano text-emerald-700 mt-0.5">
                  Official badge credentials verified and unlocked for physical export.
                </div>
              </div>
            </div>
          )}

          {isRevoked && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 font-mono text-xs flex items-start gap-3 shadow-2xs">
              <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <div className="font-bold text-amber-950">
                  Pass Generation Blocked
                </div>
                <div className="text-nano text-amber-800 mt-0.5">
                  Membership status is inactive or revoked. Credential pass generation disabled for {normalizedId}.
                </div>
              </div>
            </div>
          )}

          {isInvalid && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 font-mono text-xs flex items-start gap-3 shadow-2xs">
              <XCircle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
              <div>
                <div className="font-bold text-rose-950">Unrecognized Member ID</div>
                <div className="text-nano text-rose-700 mt-0.5">
                  Access denied. Only registered Quantix cohort fellows can generate official credentials.
                </div>
              </div>
            </div>
          )}

          {isEmpty && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 font-mono text-xs flex items-start gap-3">
              <KeyRound className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
              <div>
                <div className="font-bold text-slate-800">Awaiting Authentication</div>
                <div className="text-nano text-slate-500 mt-0.5">
                  Enter your assigned Member ID to generate your official pass.
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={() => setIsFlipped(!isFlipped)}
              className="flex-1 py-3.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-ink-900 font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-2xs cursor-pointer active:scale-95"
            >
              <Rotate3d className="w-4 h-4 text-electric-600" />
              <span>Flip Card</span>
            </button>
            <button
              type="button"
              onClick={handlePrint}
              disabled={!isVerified}
              className={`flex-1 py-3.5 px-4 rounded-2xl font-mono text-xs font-black flex items-center justify-center gap-2 transition-all shadow-sm ${
                isVerified
                  ? 'bg-lime-400 hover:bg-lime-300 text-ink-950 cursor-pointer hover:shadow-md active:scale-95'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-60'
              }`}
            >
              {isVerified ? (
                <>
                  <Download className="w-4 h-4" />
                  <span>Print Pass</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Pass Locked</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Exact Physical Spec 3D Card Preview */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center pt-2">
          {/* Rigid 340x214 Stage (Flips in-place with zero layout shift) */}
          <div className="qc-stage select-none">
            <div
              id="printableMemberCard"
              className="qc-flipper cursor-pointer group"
              onClick={() => setIsFlipped(!isFlipped)}
              style={{
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* ── CARD FRONT (EXACT MATCH OF kit/card-template.html #cardFront) ── */}
              <div className="qc-card-face qc-front qc-card-front">
                <div className="qc-glow" />
                <img className="qc-wm" src="/QUANTIX-emblem.png" alt="" />
                <div className="qc-frame" />

                {/* Revoked watermark banner if status revoked */}
                {isRevoked && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                    <span className="font-mono font-black text-xs text-rose-500 border border-rose-500/80 px-4 py-1.5 rounded-lg bg-black/75 backdrop-blur-xs uppercase tracking-widest -rotate-6 shadow-xl">
                      STATUS: REVOKED
                    </span>
                  </div>
                )}

                <div className="qc-fpad">
                  <div className="qc-fhead">
                    <img src="/QUANTIX-emblem.png" alt="QUANTIX" />
                    <div className="qc-club">
                      Quantum Computing Club<br />SIET · Tumakuru
                    </div>
                    <span className="qc-chip">{cardTitle}</span>
                  </div>

                  <div className="qc-fname">
                    <div className="qc-val">{cardName}</div>
                    <div className="qc-line" />
                  </div>

                  <div className="qc-fmeta">
                    <span>{cardId}</span>
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

          <div className="mt-8 font-mono text-xs text-ink-500 text-center flex items-center gap-2">
            <Rotate3d className="w-4 h-4 text-electric-600" />
            <span>Click card to flip • 3D interactive preview</span>
          </div>
        </div>
      </div>
    </section>
  );
}
