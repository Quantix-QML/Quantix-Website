import React from 'react';
import { ExternalLink } from 'lucide-react';

function GithubIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const foundingMembers = [
  {
    name: 'Dipankar Chettri',
    username: 'dipankarchettri',
    github: 'https://github.com/dipankarchettri',
    icon: '👾',
    gradient: 'from-blue-500 to-indigo-700',
  },
  {
    name: 'Preetam',
    username: 'Preetam-R',
    github: 'https://github.com/Preetam-R',
    icon: '⚛️',
    gradient: 'from-lime-400 to-emerald-600',
  },
  {
    name: 'Gouri',
    username: 'gouri2408',
    github: 'https://github.com/gouri2408',
    icon: '🪐',
    gradient: 'from-sky-400 to-blue-600',
  },
  {
    name: 'Khushi',
    username: 'Mskhushi21',
    github: 'https://github.com/Mskhushi21',
    icon: '🔮',
    gradient: 'from-lime-300 to-emerald-500',
  },
  {
    name: 'Prarthana',
    username: 'prarthanapkhasnis2-sketch',
    github: 'https://github.com/prarthanapkhasnis2-sketch',
    icon: '🧬',
    gradient: 'from-teal-400 to-emerald-600',
  },
  {
    name: 'Milind Nayak',
    username: 'nayakmilind',
    github: 'https://github.com/nayakmilind',
    icon: '🚀',
    gradient: 'from-blue-400 to-indigo-600',
  },
];

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

      {/* ── SOLE LEADER SPOTLIGHT: DR. GIRISH L (BLUEPRINT HIGH-CONTRAST CARD) ── */}
      <div className="mb-14 relative p-6 sm:p-10 rounded-3xl bg-[#06339e]/90 border-2 border-white/40 hover:border-lime-400 transition-all duration-300 shadow-2xl backdrop-blur-2xl group overflow-hidden">
        {/* Blueprint Corner Crosshair Accents (+) */}
        <span className="absolute top-3 left-3 font-mono text-nano text-white/40 select-none">+</span>
        <span className="absolute top-3 right-3 font-mono text-nano text-white/40 select-none">+</span>
        <span className="absolute bottom-3 left-3 font-mono text-nano text-white/40 select-none">+</span>
        <span className="absolute bottom-3 right-3 font-mono text-nano text-white/40 select-none">+</span>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden bg-slate-900 border-2 border-white/60 shadow-xl shrink-0 relative group-hover:border-lime-400 transition-colors">
            <img
              src="/dr-girish.jpeg"
              alt="Dr. Girish L"
              className="w-full h-full object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-lime-400 border-2 border-[#06339e]" />
          </div>

          <div className="text-center sm:text-left space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400 text-ink-950 font-mono text-xs font-black uppercase tracking-wider shadow-sm">
              Faculty Mentor &amp; Leadership
            </div>
            <h3 className="font-display font-black text-2xl sm:text-4xl text-white group-hover:text-lime-400 transition-colors tracking-tight">
              Dr. Girish L
            </h3>
            <p className="font-mono text-xs sm:text-sm text-lime-400/90 font-bold">
              Shridevi Institute of Engineering &amp; Technology, Tumakuru
            </p>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-2xl pt-1 font-normal">
              Academic guide directing research methodology, quantum computing education, laboratory infrastructure, and institutional research collaborations across Dept. of AI &amp; DS and Dept. of AI &amp; ML.
            </p>
          </div>
        </div>
      </div>

      {/* ── FOUNDING MEMBER COHORT: FROSTED GLASSMORPHED CARDS WITH GITHUB PROFILES ── */}
      <div className="pt-4">
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

        {/* 6 Glassmorphic Member Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5">
          {foundingMembers.map((member, idx) => (
            <div
              key={idx}
              className="backdrop-blur-xl bg-white/15 border-2 border-white/40 hover:border-lime-400 p-5 rounded-3xl shadow-xl flex flex-col items-center text-center transition-all duration-300 group hover:-translate-y-1 hover:bg-white/25"
            >
              {/* Cyber/Quantum Avatar Ring */}
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr ${member.gradient} p-0.5 shadow-lg flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform`}
              >
                <div className="w-full h-full rounded-2xl bg-[#031338] flex items-center justify-center text-2xl select-none">
                  {member.icon}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-lime-400 border-2 border-[#031338]" />
              </div>

              <span className="font-display font-extrabold text-sm sm:text-base mt-3.5 tracking-wide text-white group-hover:text-lime-400 transition-colors leading-tight line-clamp-1">
                {member.name}
              </span>

              <span className="font-mono text-nano text-white/60 mt-1 uppercase tracking-wider font-semibold">
                Founding Member
              </span>

              {/* GitHub Profile Link Pill */}
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3.5 w-full py-1.5 px-2.5 rounded-full bg-white/10 hover:bg-lime-400 hover:text-ink-950 border border-white/20 hover:border-lime-400 text-white font-mono text-nano flex items-center justify-center gap-1.5 transition-all shadow-sm group/btn"
                title={`View ${member.name}'s GitHub profile`}
              >
                <GithubIcon className="w-3 h-3 shrink-0" />
                <span className="truncate">@{member.username}</span>
                <ExternalLink className="w-2.5 h-2.5 shrink-0 opacity-60 group-hover/btn:opacity-100" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
