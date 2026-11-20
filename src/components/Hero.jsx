import React from 'react';

// Hand-drawn doodle arrow SVG components
function TopLimeArrow({ className = "w-28 h-28" }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 75C25 35 60 15 95 25C110 30 115 50 100 70C88 85 80 92 78 98"
        stroke="#a3ff00"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M68 85L78 100L95 90"
        stroke="#a3ff00"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BottomLimeArrow({ className = "w-28 h-28" }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M25 95C20 70 28 45 45 35C65 22 80 35 90 60"
        stroke="#a3ff00"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M75 58L92 62L96 45"
        stroke="#a3ff00"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Circular rotating sticker badge matching reference "GET STARTED OF FREE"
function CircularLimeBadge() {
  return (
    <a
      href="#research"
      className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-lime-400 p-2 flex items-center justify-center shadow-xl hover:scale-105 transition-transform duration-300 group cursor-pointer"
      title="Explore Research"
    >
      {/* Outer circular text */}
      <svg className="w-full h-full animate-spin-slow" viewBox="0 0 140 140">
        <defs>
          <path
            id="textcircle"
            d="M 70, 70 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
          />
        </defs>
        <text className="text-xs font-mono font-black uppercase tracking-[0.2em] fill-ink-950">
          <textPath href="#textcircle">
            EXPLORE RESEARCH • QUANTIX SIET •
          </textPath>
        </text>
      </svg>

      {/* Center Quantix Logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src="./QUANTIX-emblem.png"
          alt="Quantix Logo"
          className="w-11 h-11 sm:w-13 sm:h-13 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-sm"
        />
      </div>
    </a>
  );
}

export default function Hero({ onOpenJoinModal }) {
  return (
    <section id="hero" className="relative pt-[60px] sm:pt-[84px] pb-12 sm:pb-16 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col justify-center overflow-visible">
      {/* 1. Main Huge Typography & Persistent Spin Qubit */}
      <div className="relative z-10 my-4 sm:my-8 text-center">
        {/* Institution Affiliation & Collaboration */}
        <div className="mb-8 sm:mb-10 max-w-2xl mx-auto space-y-2 text-center">
          <div className="text-white/95 text-base sm:text-lg font-semibold tracking-wide">
            Shridevi Institute of Engineering and Technology, Tumkur.
          </div>
          <div className="text-white/90 text-sm sm:text-base font-medium">
            Dept. of AI &amp; DS <span className="text-lime-400 italic font-serif text-lg mx-1.5 select-none">&amp;</span> Dept. of AI &amp; ML
          </div>
          <div className="text-white/70 text-xs uppercase tracking-widest pt-2">
            In collaboration with
          </div>
          <div className="text-lime-400 font-display font-black text-2xl sm:text-3xl tracking-wide drop-shadow-sm">
            AI Syntax Surge
          </div>
        </div>

        {/* Curving Neon Lime Doodle Arrow: Top Right */}
        <div className="absolute top-24 right-4 sm:right-16 lg:right-28 hidden sm:block pointer-events-none z-20">
          <TopLimeArrow className="w-24 h-24 sm:w-32 sm:h-32 rotate-6" />
        </div>

        {/* Curving Neon Lime Doodle Arrow: Bottom Left */}
        <div className="absolute -bottom-10 left-2 sm:left-12 lg:left-24 hidden sm:block pointer-events-none z-20">
          <BottomLimeArrow className="w-24 h-24 sm:w-32 sm:h-32 -rotate-12" />
        </div>

        {/* Giant Hero Text Stack matching reference screenshot */}
        <div className="relative inline-block mx-auto select-none">
          {/* Top Line: #QUANTIX in Neon Lime */}
          <div className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-giant tracking-tight text-lime-400 uppercase leading-[0.9] drop-shadow-sm">
            #QUANTIX
          </div>

          {/* Middle Line: QUANTUM in Solid Bold White */}
          <div className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-giant tracking-tight text-white uppercase leading-[0.9] drop-shadow-md">
            QUANTUM
          </div>

          {/* Bottom Line: REALMS / PEOPLE in Solid Bold White */}
          <div className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-giant tracking-tight text-white uppercase leading-[0.9] drop-shadow-md">
            REALMS
          </div>

          {/* Circular Rotating Lime Stamp Badge on the Right (hidden on mobile to prevent disturbing typography) */}
          <div className="hidden sm:block absolute -bottom-8 -right-2 sm:-right-6 md:-right-10 z-30 pointer-events-auto">
            <CircularLimeBadge />
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-10 sm:mt-14 max-w-3xl mx-auto text-center space-y-4 px-4">
          {/* Mission Tagline */}
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight uppercase leading-snug">
            “Unlocking Quantum Realms <br className="hidden sm:inline" />
            <span className="text-lime-400">Into Real-World Solutions.</span>”
          </h2>

          {/* Subtitle Explainer */}
          <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto font-body leading-relaxed">
            Shridevi&apos;s student-led quantum computing lab exploring real hardware execution, quantum algorithms, and post-quantum cryptography.
          </p>
        </div>
      </div>
    </section>
  );
}
