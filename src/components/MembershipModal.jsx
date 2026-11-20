import React, { useState } from 'react';
import { X, CheckCircle, Send, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MembershipModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    usn: '',
    email: '',
    department: 'AI & DS',
    year: '2nd Year',
    preferredTrack: 'Track 01: Quantum Basics',
    interest: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#0052ff', '#a3ff00', '#ffffff', '#3b82f6', '#06339e']
      });
    } catch (err) {
      // Confetti fallback
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      usn: '',
      email: '',
      department: 'AI & DS',
      year: '2nd Year',
      preferredTrack: 'Track 01: Quantum Basics',
      interest: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/80 backdrop-blur-xl animate-fade-in">
      <div 
        className="relative w-full max-w-2xl rounded-xl bg-[#031d5b]/95 border-2 border-white/30 p-6 sm:p-9 shadow-2xl max-h-[92vh] overflow-y-auto blueprint-grid text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Blueprint Corner Crosshairs (+) */}
        <span className="absolute top-3 left-3 font-mono text-nano text-white/40 select-none">+</span>
        <span className="absolute top-3 right-3 font-mono text-nano text-white/40 select-none">+</span>
        <span className="absolute bottom-3 left-3 font-mono text-nano text-white/40 select-none">+</span>
        <span className="absolute bottom-3 right-3 font-mono text-nano text-white/40 select-none">+</span>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* ── SUBMISSION DOSSIER CONFIRMATION SCREEN ── */
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-lime-400 text-ink-950 flex items-center justify-center mb-4 shadow-lg shadow-lime-400/20">
              <CheckCircle className="w-9 h-9" />
            </div>

            <span className="px-3 py-1 rounded-full bg-lime-400/20 border border-lime-400/40 text-lime-300 font-mono text-xs font-bold uppercase tracking-wider mb-2">
              Registration Recorded • QX-COHORT-2026
            </span>

            <h3 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
              APPLICATION RECEIVED
            </h3>

            <p className="mt-3 text-xs sm:text-sm text-white/80 max-w-md leading-relaxed font-body">
              Thank you, <strong className="text-lime-400">{formData.name}</strong>! Your candidature for the Quantix Quantum Computing Club has been logged into the SIET registry.
            </p>

            {/* Dossier Ticket Tile */}
            <div className="mt-6 p-5 rounded-lg bg-white/5 border border-white/20 font-mono text-xs text-left w-full max-w-md space-y-2">
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <span className="text-white/50 text-micro uppercase tracking-wider">College USN / ID</span>
                <span className="text-white font-bold">{formData.usn}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <span className="text-white/50 text-micro uppercase tracking-wider">Department</span>
                <span className="text-white font-bold">{formData.department} ({formData.year})</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <span className="text-white/50 text-micro uppercase tracking-wider">Curriculum Track</span>
                <span className="text-lime-400 font-bold">{formData.preferredTrack}</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-white/50 text-micro uppercase tracking-wider">Next Step</span>
                <span className="text-white/80">Core Orientation at SIET Lab</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="mt-7 px-8 py-3 rounded-full bg-lime-400 hover:bg-lime-300 text-ink-950 font-display font-black text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
            >
              <span>Return to Website</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* ── APPLICATION FORM ── */
          <div>
            {/* Header / Institutional Branding */}
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/15">
              <img
                src="/QUANTIX-emblem.png"
                alt="Quantix"
                className="w-10 h-10 object-contain drop-shadow"
              />
              <div>
                <span className="font-mono text-[10px] text-lime-400 font-bold uppercase tracking-widest block">
                  Shridevi Institute of Engineering &amp; Technology
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight leading-none mt-0.5">
                  #JOIN QUANTIX COHORT
                </h3>
              </div>
            </div>

            <p className="text-xs text-white/70 mb-6 font-mono leading-relaxed">
              Register your student profile for upcoming hands-on quantum circuit workshops, IBM QPU cloud execution, and hardware hackathons.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 mb-1.5 uppercase tracking-wider text-nano font-bold">
                    // 01. Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dipankar Chettri"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-lime-400 focus:bg-white/10 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-white/70 mb-1.5 uppercase tracking-wider text-nano font-bold">
                    // 02. College USN / ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.usn}
                    onChange={(e) => setFormData({ ...formData, usn: e.target.value.toUpperCase() })}
                    placeholder="e.g. 1SV22AI001"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-lime-400 focus:bg-white/10 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 mb-1.5 uppercase tracking-wider text-nano font-bold">
                  // 03. Institutional / Personal Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@shrideviengineering.org"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-lime-400 focus:bg-white/10 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 mb-1.5 uppercase tracking-wider text-nano font-bold">
                    // 04. Department
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:border-lime-400 focus:bg-[#031d5b] transition-colors [&>option]:bg-[#031d5b] [&>option]:text-white"
                  >
                    <option value="AI & DS">Dept. of AI &amp; Data Science</option>
                    <option value="AI & ML">Dept. of AI &amp; Machine Learning</option>
                    <option value="CSE">Computer Science &amp; Engineering</option>
                    <option value="ISE">Information Science</option>
                    <option value="ECE">Electronics &amp; Communication</option>
                    <option value="Other">Other Department</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 mb-1.5 uppercase tracking-wider text-nano font-bold">
                    // 05. Current Academic Year
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:border-lime-400 focus:bg-[#031d5b] transition-colors [&>option]:bg-[#031d5b] [&>option]:text-white"
                  >
                    <option value="1st Year">1st Year (Freshman)</option>
                    <option value="2nd Year">2nd Year (Sophomore)</option>
                    <option value="3rd Year">3rd Year (Junior)</option>
                    <option value="4th Year">4th Year (Senior)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white/70 mb-1.5 uppercase tracking-wider text-nano font-bold">
                  // 06. Primary Curriculum Track
                </label>
                <select
                  value={formData.preferredTrack}
                  onChange={(e) => setFormData({ ...formData, preferredTrack: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:border-lime-400 focus:bg-[#031d5b] transition-colors [&>option]:bg-[#031d5b] [&>option]:text-white"
                >
                  <option value="Track 01: Quantum Basics">Track 01: Quantum Basics &amp; Linear Algebra</option>
                  <option value="Track 02: Quantum Algorithms">Track 02: Quantum Algorithms &amp; NISQ Systems</option>
                  <option value="Track 03: Applications">Track 03: Applications &amp; Quantum Machine Learning</option>
                </select>
              </div>

              <div>
                <label className="block text-white/70 mb-1.5 uppercase tracking-wider text-nano font-bold">
                  // 07. Statement of Interest &amp; Background
                </label>
                <textarea
                  rows={3}
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  placeholder="Share your interest in Python, linear algebra, physics, or what draws you to quantum..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-lime-400 focus:bg-white/10 transition-colors font-body text-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-lg bg-lime-400 hover:bg-lime-300 text-ink-950 font-display font-black tracking-wider uppercase transition-all shadow-lg hover:shadow-lime-400/20 flex items-center justify-center gap-2"
                >
                  <span>Submit Membership Application</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
