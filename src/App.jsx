import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QuantumHaloExperience from './components/QuantumHaloExperience';
import FallingQubitTrack from './components/FallingQubitTrack';
import ResearchProjects from './components/ResearchProjects';
import Tracks from './components/Tracks';
import Team from './components/Team';
import MemberPass from './components/MemberPass';
import Footer from './components/Footer';
import MembershipModal from './components/MembershipModal';

export default function App() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-slate-950 selection:bg-lime-400 selection:text-ink-950 flex flex-col font-body">
      {/* ── STICKY/FIXED 3D QUANTUM HALO RING BACKGROUND (ALWAYS VISIBLE & STAYS IN PLACE) ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
        <QuantumHaloExperience />
      </div>

      {/* Hero & Real Research Showcase with Vibrant Electric Blue Canvas & Blueprint Grid */}
      <div className="relative bg-electric-600/80 backdrop-blur-[1px] blueprint-grid overflow-hidden text-white z-10">
        <div className="relative z-10">
          <Navbar onOpenJoinModal={() => setIsJoinModalOpen(true)} />
          <Hero onOpenJoinModal={() => setIsJoinModalOpen(true)} />
        </div>

        {/* Falling Qubit Track - Locked exactly to the 40px Blueprint Grid cells */}
        <div className="hidden lg:block absolute top-[160px] right-0 z-20 pointer-events-auto overflow-visible">
          <FallingQubitTrack />
        </div>

        {/* Primary Priority: Real Hardware Research Showcase with Blueprint Grid Outlines */}
        <div className="relative z-10 bg-gradient-to-b from-transparent via-electric-900/15 to-electric-900/30 px-6 sm:px-10 pb-16">
          <ResearchProjects onOpenJoinModal={() => setIsJoinModalOpen(true)} />
        </div>

        {/* Curriculum & Cohort Tracks with Seamless Gradient & Blueprint Grid */}
        <div className="relative z-10 bg-gradient-to-b from-electric-900/30 via-electric-900/50 to-electric-950/65 px-6 sm:px-10 pb-20">
          <Tracks onOpenJoinModal={() => setIsJoinModalOpen(true)} />
        </div>

        {/* Leadership & Faculty Mentorship + Founding Cohort with Blueprint Grid */}
        <div className="relative z-10 bg-gradient-to-b from-electric-950/65 via-[#020e2e]/75 to-[#01091f]/90 px-6 sm:px-10 pb-64 sm:pb-80">
          <Team />
        </div>
      </div>

      {/* SVG Clip Path Definition for Silky-Smooth Continuous Sigmoid Sheet Contour */}
      <svg width="0" height="0" className="absolute pointer-events-none opacity-0" aria-hidden="true">
        <defs>
          <clipPath id="curved-sheet-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0 0.04 C 0 0.015 0.012 0 0.028 0 L 0.28 0 C 0.58 0 0.74 0.18 1.0 0.18 L 1.0 1.0 L 0 1.0 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Main Content: Crisp Modern White Sheet with Electric Blue Blueprint Grid Lines and Smooth Architectural Contour */}
      <div className="relative z-20 -mt-56 sm:-mt-72 filter drop-shadow-[0_-16px_28px_rgba(0,0,0,0.22)]">
        <main className="relative bg-white/90 backdrop-blur-md blueprint-grid-blue text-ink-950 rounded-t-[36px] md:rounded-t-none curved-sheet-top pt-20 sm:pt-28">
          {/* Member Credential Pass */}
          <MemberPass />
        </main>
      </div>

      {/* Clean Institutional Footer */}
      <Footer onOpenJoinModal={() => setIsJoinModalOpen(true)} />

      {/* Membership Onboarding Modal */}
      <MembershipModal 
        isOpen={isJoinModalOpen} 
        onClose={() => setIsJoinModalOpen(false)} 
      />
    </div>
  );
}
