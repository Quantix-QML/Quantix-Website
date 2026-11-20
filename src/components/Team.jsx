import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';

function GithubIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const facultyMentor = {
  name: 'Dr. Girish L',
  chip: 'FACULTY MENTOR',
  code: 'QX-FACULTY-01',
};

const foundingMembers = [
  {
    name: 'Dipankar Chettri',
    chip: 'STUDENT LEAD',
    code: 'QX-PRIME-01',
    github: 'https://github.com/dipankarchettri',
  },
  {
    name: 'Preetam',
    chip: 'FELLOW',
    code: 'QX-PRIME-02',
    github: 'https://github.com/Preetam-R',
  },
  {
    name: 'Gouri',
    chip: 'FELLOW',
    code: 'QX-PRIME-03',
    github: 'https://github.com/gouri2408',
  },
  {
    name: 'Khushi',
    chip: 'FELLOW',
    code: 'QX-PRIME-04',
    github: 'https://github.com/Mskhushi21',
  },
  {
    name: 'Prarthana',
    chip: 'FELLOW',
    code: 'QX-PRIME-05',
    github: 'https://github.com/prarthanapkhasnis2-sketch',
  },
  {
    name: 'Milind Nayak',
    chip: 'FELLOW',
    code: 'QX-PRIME-06',
    github: 'https://github.com/nayakmilind',
  },
];

function MemberBadgeCard({ member }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex justify-center py-2">
        <div className="scale-[0.88] xs:scale-95 sm:scale-100 origin-center transition-transform">
          {/* Rigid 340x214 Stage (Exact Physical Spec Card from Member Pass) */}
          <div
            className="qc-stage select-none cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
            title={`Click to flip ${member.name}'s card`}
          >
            <div
              className="qc-flipper group"
              style={{
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* ── CARD FRONT (EXACT PHYSICAL SPEC BADGE) ── */}
              <div className="qc-card-face qc-front qc-card-front shadow-2xl">
                <div className="qc-glow" />
                <img className="qc-wm" src="/QUANTIX-emblem.png" alt="" />
                <div className="qc-frame" />

                <div className="qc-fpad">
                  <div className="qc-fhead">
                    <img src="/QUANTIX-emblem.png" alt="QUANTIX" />
                    <div className="qc-club">
                      Quantum Computing Club<br />SIET · Tumakuru
                    </div>
                    <span className="qc-chip">{member.chip}</span>
                  </div>

                  <div className="qc-fname">
                    <div className="qc-val">{member.name}</div>
                    <div className="qc-line" />
                  </div>

                  <div className="qc-fmeta">
                    <span>{member.code}</span>
                  </div>

                  <div className="qc-ffoot">
                    Quant<span className="qc-i">i</span>X
                  </div>
                </div>
              </div>

              {/* ── CARD BACK ── */}
              <div className="qc-card-face qc-back qc-card-back shadow-2xl">
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
        </div>
      </div>

      {/* Under-Card GitHub Profile Link (if present) */}
      {member.github && (
        <div className="mt-2 font-mono text-[11px]">
          <a
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-lime-400 flex items-center gap-1.5 transition-colors"
            title={`View ${member.name}'s GitHub`}
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub Profile</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
          </a>
        </div>
      )}
    </div>
  );
}

export default function Team() {
  return (
    <div id="team" className="relative py-16 sm:py-24 max-w-7xl mx-auto">
      {/* ── SECTION HEADER MATCHING HERO, RESEARCH & TRACKS ── */}
      <div className="mb-12 sm:mb-16">
        <div>
          <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight uppercase leading-[0.95]">
            #LEADERSHIP &amp; <span className="text-lime-400">MENTORSHIP</span>
          </h2>
          <div className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight uppercase leading-[0.95]">
            FOUNDING COHORT
          </div>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-white/80 leading-relaxed font-normal">
            Guided by institutional faculty mentorship at Shridevi Institute, driven by student quantum computing researchers and engineers.
          </p>
        </div>
      </div>

      {/* ── FACULTY MENTOR CARD ── */}
      <div className="mb-14">
        <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-white/15">
          <span className="w-2.5 h-2.5 rounded-full bg-lime-400" />
          <h4 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
            Faculty Mentor
          </h4>
        </div>

        <div className="flex justify-center">
          <MemberBadgeCard member={facultyMentor} />
        </div>
      </div>

      {/* ── FOUNDING MEMBER COHORT: OFFICIAL 3D MEMBER PASS BADGES ── */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/15">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-lime-400 animate-pulse" />
            <h4 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
              Founding Member Cohort
            </h4>
          </div>
          <a
            href="https://github.com/orgs/Quantix-QML/people"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-white/70 hover:text-lime-400 flex items-center gap-1.5 transition-colors"
          >
            <span>Quantix-QML on GitHub</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* 6 Individual 3D Interactive Member Pass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 justify-items-center">
          {foundingMembers.map((member, idx) => (
            <MemberBadgeCard key={idx} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
}
