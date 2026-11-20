import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({ onOpenJoinModal, currentRoute = 'home' }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAbout = currentRoute === 'about';

  return (
    <header className="relative z-40 w-full pt-6 pb-2 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Quantix Brand Logo */}
        <a href="#/" className="flex items-center gap-2 group select-none shrink-0" aria-label="Quantix Home">
          <div className="px-3.5 py-1.5 rounded-full bg-white text-electric-600 font-display font-black text-sm tracking-tight shadow-sm flex items-center gap-2 hover:bg-slate-50 transition-colors">
            <img
              src="./QUANTIX-emblem.png"
              alt="Quantix Logo"
              className="w-5 h-5 object-contain group-hover:scale-105 transition-transform"
            />
            <span>QUANTIX</span>
          </div>
        </a>

        {/* Center: Each Link in its own Individual Pill */}
        <nav className="hidden md:flex items-center gap-2 sm:gap-2.5">
          <a
            href="#/about"
            className={`px-5 py-1.5 rounded-full border text-xs tracking-tight transition-all shadow-sm ${
              isAbout
                ? 'bg-lime-400 text-ink-950 border-lime-400 font-black'
                : 'border-white/35 bg-white/5 hover:bg-white/15 hover:border-white/80 text-white font-bold'
            }`}
          >
            About Club
          </a>
          <a
            href={isAbout ? "#/research" : "#research"}
            className="px-5 py-1.5 rounded-full border border-white/35 bg-white/5 hover:bg-white/15 hover:border-white/80 text-white font-bold text-xs tracking-tight transition-all shadow-sm"
          >
            Research
          </a>
          <a
            href={isAbout ? "#/tracks" : "#tracks"}
            className="px-5 py-1.5 rounded-full border border-white/35 bg-white/5 hover:bg-white/15 hover:border-white/80 text-white font-bold text-xs tracking-tight transition-all shadow-sm"
          >
            Tracks
          </a>
          <a
            href={isAbout ? "#/team" : "#team"}
            className="px-5 py-1.5 rounded-full border border-white/35 bg-white/5 hover:bg-white/15 hover:border-white/80 text-white font-bold text-xs tracking-tight transition-all shadow-sm"
          >
            Team
          </a>
        </nav>

        {/* Right: Outline Pill Action Button matching "Connect wallet" */}
        <div className="hidden md:flex items-center shrink-0">
          <button
            onClick={onOpenJoinModal}
            className="px-6 sm:px-7 py-2 rounded-full border border-white hover:bg-white hover:text-electric-700 text-white font-bold text-xs sm:text-sm tracking-tight transition-all shadow-sm"
          >
            <span>Join Club</span>
          </button>
        </div>

        {/* Mobile Menu Hamburger */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full bg-white/10 text-white border border-white/20"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu with Pill Links */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 mx-2 p-5 rounded-3xl bg-[#062879]/95 border border-white/20 backdrop-blur-2xl space-y-2.5 font-mono text-xs text-white shadow-2xl">
          <div className="flex flex-wrap gap-2 pt-1">
            <a
              href="#/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2 rounded-full border ${
                isAbout
                  ? 'bg-lime-400 text-ink-950 border-lime-400 font-bold'
                  : 'border-white/40 bg-white/10 text-white/90 hover:bg-white/20'
              }`}
            >
              About Club
            </a>
            <a
              href={isAbout ? "#/research" : "#research"}
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 rounded-full border border-white/40 bg-white/10 text-white/90 hover:bg-white/20"
            >
              Research
            </a>
            <a
              href={isAbout ? "#/tracks" : "#tracks"}
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 rounded-full border border-white/40 bg-white/10 text-white/90 hover:bg-white/20"
            >
              Tracks
            </a>
            <a
              href={isAbout ? "#/team" : "#team"}
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 rounded-full border border-white/40 bg-white/10 text-white/90 hover:bg-white/20"
            >
              Team
            </a>
          </div>

          <div className="pt-3 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenJoinModal();
              }}
              className="w-full py-2.5 rounded-full bg-lime-400 text-ink-950 font-bold uppercase tracking-wider text-center"
            >
              Join Club
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
