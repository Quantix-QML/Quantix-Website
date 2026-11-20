import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QuantumHaloExperience from './components/QuantumHaloExperience';
import FallingQubitTrack from './components/FallingQubitTrack';
import ResearchProjects from './components/ResearchProjects';
import Tracks from './components/Tracks';
import Team from './components/Team';
import Footer from './components/Footer';
import MembershipModal from './components/MembershipModal';
import AboutClub from './components/AboutClub';

const getRoute = () => {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash || '';
  if (hash.startsWith('#/about') || hash === '#about') return 'about';
  return 'home';
};

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(getRoute());
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '';
      const newRoute = (hash.startsWith('#/about') || hash === '#about') ? 'about' : 'home';
      setCurrentRoute(newRoute);

      if (newRoute === 'about') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const target = hash.replace(/^#\/?/, '');
        if (target && target !== 'home') {
          setTimeout(() => {
            const el = document.getElementById(target);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 80);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0052ff] selection:bg-lime-400 selection:text-ink-950 flex flex-col font-body">
      {/* ── STICKY/FIXED 3D QUANTUM HALO RING BACKGROUND (ALWAYS ROYAL BLUE BLUEPRINT GRID, NEVER BLACK) ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#0052ff] via-[#0433a8] to-[#06339e] blueprint-grid">
        <QuantumHaloExperience />
      </div>

      {currentRoute === 'about' ? (
        /* ── DEDICATED ABOUT CLUB PAGE ── */
        <div className="relative z-10 bg-electric-600/85 backdrop-blur-[1px] blueprint-grid min-h-screen flex flex-col justify-between">
          <div>
            <Navbar 
              onOpenJoinModal={() => setIsJoinModalOpen(true)} 
              currentRoute="about"
            />
            <AboutClub onOpenJoinModal={() => setIsJoinModalOpen(true)} />
          </div>
          <Footer onOpenJoinModal={() => setIsJoinModalOpen(true)} />
        </div>
      ) : (
        /* ── HOME INTERACTIVE SHOWCASE PAGE ── */
        <>
          {/* Hero & Real Research Showcase with Vibrant Electric Blue Canvas & Blueprint Grid */}
          <div className="relative bg-electric-600/80 backdrop-blur-[1px] blueprint-grid overflow-hidden text-white z-10">
            <div className="relative z-10">
              <Navbar 
                onOpenJoinModal={() => setIsJoinModalOpen(true)} 
                currentRoute="home"
              />
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
            <div className="relative z-10 bg-gradient-to-b from-electric-900/30 via-electric-900/40 to-electric-900/50 px-6 sm:px-10 pb-20">
              <Tracks onOpenJoinModal={() => setIsJoinModalOpen(true)} />
            </div>

            {/* Leadership & Faculty Mentorship + Founding Cohort with Blueprint Grid */}
            <div className="relative z-10 bg-gradient-to-b from-electric-900/50 via-[#06339e]/60 to-[#06339e]/80 px-6 sm:px-10 pb-16 sm:pb-24">
              <Team />
            </div>
          </div>

          {/* Clean Institutional Footer */}
          <Footer onOpenJoinModal={() => setIsJoinModalOpen(true)} />
        </>
      )}

      {/* Membership Onboarding Modal */}
      <MembershipModal 
        isOpen={isJoinModalOpen} 
        onClose={() => setIsJoinModalOpen(false)} 
      />
    </div>
  );
}
