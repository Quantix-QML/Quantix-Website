import React, { useState } from 'react';
import { X, CheckCircle, Send, Atom } from 'lucide-react';
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

    // Fire celebratory electric blue + neon lime confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0052ff', '#a3ff00', '#3b82f6', '#ffffff', '#0f172a']
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/70 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-xl rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-ink-500 hover:text-ink-950 hover:bg-slate-200 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-lime-400 text-ink-950 flex items-center justify-center mb-4 shadow-md">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-ink-950">
              Application Received!
            </h3>
            <p className="font-mono text-xs text-electric-600 font-bold mt-1 uppercase tracking-wider">
              Welcome to the Quantum Cohort
            </p>
            <p className="mt-4 text-xs sm:text-sm text-ink-600 max-w-md leading-relaxed">
              Thank you, <strong className="text-ink-950">{formData.name}</strong>! Your application for Quantix Quantum Computing Club has been recorded. Our team will contact you for the upcoming orientation session at SIET Tumakuru.
            </p>
            <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs text-ink-700 w-full text-left space-y-1">
              <div><span className="text-ink-400">USN:</span> {formData.usn}</div>
              <div><span className="text-ink-400">Track:</span> {formData.preferredTrack}</div>
              <div><span className="text-ink-400">Status:</span> Pending Core Orientation</div>
            </div>
            <button
              onClick={handleReset}
              className="mt-6 px-6 py-2.5 rounded-full bg-ink-950 hover:bg-electric-600 text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-electric-600 text-lime-400 flex items-center justify-center shadow-sm">
                <Atom className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-micro font-bold text-electric-600 uppercase tracking-widest block">
                  SIET Quantum Computing Club
                </span>
                <h3 className="font-display font-black text-2xl text-ink-950">
                  Join Quantix Club
                </h3>
              </div>
            </div>
            <p className="text-xs text-ink-500 mb-6 font-mono">
              Fill out your student credentials to register for upcoming hands-on quantum research sprints and workshops.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-ink-700 mb-1.5 uppercase tracking-wider text-micro font-bold">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dipankar Chettri"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-ink-950 placeholder-slate-400 focus:outline-none focus:border-electric-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-ink-700 mb-1.5 uppercase tracking-wider text-micro font-bold">
                    College USN / ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.usn}
                    onChange={(e) => setFormData({ ...formData, usn: e.target.value.toUpperCase() })}
                    placeholder="e.g. 1SV22AI001"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-ink-950 placeholder-slate-400 focus:outline-none focus:border-electric-600 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-ink-700 mb-1.5 uppercase tracking-wider text-micro font-bold">
                  Institutional / Personal Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@shrideviengineering.org"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-ink-950 placeholder-slate-400 focus:outline-none focus:border-electric-600 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-ink-700 mb-1.5 uppercase tracking-wider text-micro font-bold">
                    Department
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-ink-950 focus:outline-none focus:border-electric-600 focus:bg-white"
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
                  <label className="block text-ink-700 mb-1.5 uppercase tracking-wider text-micro font-bold">
                    Current Year
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-ink-950 focus:outline-none focus:border-electric-600 focus:bg-white"
                  >
                    <option value="1st Year">1st Year (Freshman)</option>
                    <option value="2nd Year">2nd Year (Sophomore)</option>
                    <option value="3rd Year">3rd Year (Junior)</option>
                    <option value="4th Year">4th Year (Senior)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-ink-700 mb-1.5 uppercase tracking-wider text-micro font-bold">
                  Primary Track of Interest
                </label>
                <select
                  value={formData.preferredTrack}
                  onChange={(e) => setFormData({ ...formData, preferredTrack: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-ink-950 focus:outline-none focus:border-electric-600 focus:bg-white"
                >
                  <option value="Track 01: Quantum Basics">Track 01: Quantum Basics &amp; Linear Algebra</option>
                  <option value="Track 02: Quantum Algorithms">Track 02: Quantum Algorithms &amp; NISQ Systems</option>
                  <option value="Track 03: Applications">Track 03: Applications &amp; Post-Quantum Frontiers</option>
                </select>
              </div>

              <div>
                <label className="block text-ink-700 mb-1.5 uppercase tracking-wider text-micro font-bold">
                  Why do you want to explore Quantum Computing?
                </label>
                <textarea
                  rows={3}
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  placeholder="Share your background in coding, physics, or what excites you about qubits..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-ink-950 placeholder-slate-400 focus:outline-none focus:border-electric-600 focus:bg-white font-sans text-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-lime-400 hover:bg-lime-300 text-ink-950 font-mono font-black tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2"
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
