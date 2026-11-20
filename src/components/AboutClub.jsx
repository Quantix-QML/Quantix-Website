import React from 'react';
import { 
  Atom, 
  Cpu, 
  Binary, 
  ShieldCheck, 
  Sparkles, 
  GraduationCap, 
  Users, 
  ArrowRight, 
  ArrowLeft,
  Compass, 
  CheckCircle2,
  BookOpen,
  Terminal,
  ExternalLink
} from 'lucide-react';

export default function AboutClub({ onOpenJoinModal }) {
  return (
    <div className="relative z-10 text-white min-h-screen">
      {/* ── TOP HERO / BREADCRUMB SECTION ── */}
      <section className="pt-8 sm:pt-12 pb-14 px-6 sm:px-10 max-w-7xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <a 
            href="#/" 
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white/80 hover:text-white text-xs font-mono transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </a>
          <span className="text-white/40 text-xs">/</span>
          <span className="text-lime-400 text-xs font-mono font-bold tracking-wider uppercase">
            About Quantix
          </span>
        </div>

        {/* Institution & Department Header */}
        <div className="max-w-4xl space-y-3">
          <div className="text-white/90 text-sm sm:text-base font-semibold tracking-wide flex flex-wrap items-center gap-2">
            <span>Shridevi Institute of Engineering and Technology, Tumakuru</span>
            <span className="text-lime-400 font-bold">•</span>
            <span className="text-white/70">Dept. of AI &amp; DS &amp; Dept. of AI &amp; ML</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-lime-400/10 border border-lime-400/30 text-lime-300 font-mono text-xs uppercase tracking-widest">
            <span>In Collaboration with AI Syntax Surge</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05] pt-2">
            THE QUANTIX STORY: <br className="hidden sm:inline" />
            <span className="text-lime-400">FROM LAB TO QUANTUM REALMS.</span>
          </h1>

          <p className="text-white/80 text-base sm:text-lg max-w-3xl font-body leading-relaxed pt-2">
            Quantix is the official student-led quantum computing lab of Shridevi Institute of Engineering &amp; Technology (SIET), Tumakuru. 
            We bridge deep theoretical quantum physics and modern quantum software engineering through real hardware execution on IBM Quantum QPUs.
          </p>
        </div>

        {/* Quick Facts Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-10">
          <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/15 backdrop-blur-sm">
            <div className="text-xs font-mono uppercase tracking-wider text-white/60">Institution</div>
            <div className="font-display font-bold text-base sm:text-lg text-white mt-1">SIET, Tumakuru</div>
            <div className="text-xs text-white/50 mt-0.5">Karnataka, India</div>
          </div>
          <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/15 backdrop-blur-sm">
            <div className="text-xs font-mono uppercase tracking-wider text-white/60">Academic Anchor</div>
            <div className="font-display font-bold text-base sm:text-lg text-white mt-1">AI &amp; DS + AI &amp; ML</div>
            <div className="text-xs text-lime-400 font-mono mt-0.5">Joint Department Initiative</div>
          </div>
          <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/15 backdrop-blur-sm">
            <div className="text-xs font-mono uppercase tracking-wider text-white/60">Hardware Cloud</div>
            <div className="font-display font-bold text-base sm:text-lg text-white mt-1">IBM Quantum</div>
            <div className="text-xs text-white/50 mt-0.5">Qiskit &amp; OpenQASM</div>
          </div>
          <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/15 backdrop-blur-sm">
            <div className="text-xs font-mono uppercase tracking-wider text-white/60">Collaboration</div>
            <div className="font-display font-bold text-base sm:text-lg text-white mt-1">AI Syntax Surge</div>
            <div className="text-xs text-white/50 mt-0.5">Workshops &amp; Cohorts</div>
          </div>
        </div>
      </section>

      {/* ── CORE PHILOSOPHY & MOTTO ── */}
      <section className="py-12 sm:py-16 px-6 sm:px-10 max-w-7xl mx-auto border-t border-white/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-lime-400">
              Founding Philosophy
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight">
              “Build with knowledge. <br />
              <span className="text-lime-400">Grow with people.”</span>
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Classical computer science curricula teach deterministic logic, Boolean algebra, and standard von Neumann architectures. 
              Quantix was founded to introduce engineers to Hilbert state vectors, superposition, entanglement, and probabilistic computation.
            </p>
            <div className="p-4 rounded-xl bg-lime-400/10 border border-lime-400/30 text-white space-y-1">
              <div className="font-mono text-xs text-lime-300 font-bold uppercase tracking-wider">Our Lab Motto</div>
              <div className="font-display font-bold text-lg text-white">
                “Unlocking Quantum Realms Into Real-World Solutions”
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-white/5 border border-white/15 backdrop-blur-sm space-y-2">
              <div className="w-9 h-9 rounded-lg bg-lime-400/20 text-lime-400 flex items-center justify-center">
                <Atom className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Direct Qubit Interaction</h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Rather than treating quantum mechanics as abstract mathematics, club members write OpenQASM circuits, manipulate Bloch spheres, and measure quantum superposition firsthand.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/5 border border-white/15 backdrop-blur-sm space-y-2">
              <div className="w-9 h-9 rounded-lg bg-lime-400/20 text-lime-400 flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Real Hardware Benchmarking</h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                We transpile circuits for IBM Quantum Falcon and Heron superconducting QPUs, evaluating coupling topologies, coherence times (T₁, T₂), and gate errors.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/5 border border-white/15 backdrop-blur-sm space-y-2">
              <div className="w-9 h-9 rounded-lg bg-lime-400/20 text-lime-400 flex items-center justify-center">
                <Binary className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Hybrid Quantum-Classical AI</h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Leveraging our anchor in AI &amp; DS and AI &amp; ML, we explore Parameterized Quantum Circuits (PQC) and Quantum Neural Networks through Xanadu PennyLane and PyTorch.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/5 border border-white/15 backdrop-blur-sm space-y-2">
              <div className="w-9 h-9 rounded-lg bg-lime-400/20 text-lime-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Post-Quantum Cryptography</h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Understanding Shor&apos;s threat to RSA and ECC, we study quantum-resistant cryptographic primitives, lattice-based cryptography, and security in the post-quantum era.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE 4-STEP METHODOLOGY ── */}
      <section className="py-12 sm:py-16 px-6 sm:px-10 max-w-7xl mx-auto border-t border-white/15">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-lime-400">
            Cohort Journey
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            THE 4-STEP QUANTUM WORKFLOW
          </h2>
          <p className="text-white/70 text-sm">
            How Quantix takes students from zero quantum background to executing circuits on production cloud QPUs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-white/5 border border-white/15 relative overflow-hidden">
            <div className="text-3xl font-display font-black text-lime-400/30">01</div>
            <h3 className="font-display font-bold text-xl text-white mt-1">Learn</h3>
            <div className="font-mono text-xs text-lime-300 mt-0.5">Hilbert Spaces &amp; Dirac Math</div>
            <p className="text-xs text-white/70 leading-relaxed mt-3">
              Mastering bra-ket notation (|ψ⟩), complex linear algebra, probability amplitudes, and the physics of single &amp; multi-qubit systems.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white/5 border border-white/15 relative overflow-hidden">
            <div className="text-3xl font-display font-black text-lime-400/30">02</div>
            <h3 className="font-display font-bold text-xl text-white mt-1">Simulate</h3>
            <div className="font-mono text-xs text-lime-300 mt-0.5">Qiskit &amp; Statevectors</div>
            <p className="text-xs text-white/70 leading-relaxed mt-3">
              Designing quantum logic gates (Pauli, Hadamard, Phase, CNOT) on local simulators and visualizing state transformations on the 3D Bloch sphere.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white/5 border border-white/15 relative overflow-hidden">
            <div className="text-3xl font-display font-black text-lime-400/30">03</div>
            <h3 className="font-display font-bold text-xl text-white mt-1">Build</h3>
            <div className="font-mono text-xs text-lime-300 mt-0.5">Cloud QPU Transpilation</div>
            <p className="text-xs text-white/70 leading-relaxed mt-3">
              Mapping theoretical circuits to real physical superconducting qubits, routing SWAP networks, and running quantum error mitigation.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white/5 border border-white/15 relative overflow-hidden">
            <div className="text-3xl font-display font-black text-lime-400/30">04</div>
            <h3 className="font-display font-bold text-xl text-white mt-1">Collaborate</h3>
            <div className="font-mono text-xs text-lime-300 mt-0.5">AI Syntax Surge Projects</div>
            <p className="text-xs text-white/70 leading-relaxed mt-3">
              Publishing student research, hosting department workshops, participating in national hackathons, and building open-source quantum tools.
            </p>
          </div>
        </div>
      </section>

      {/* ── THREE STRUCTURED CURRICULUM TRACKS ── */}
      <section className="py-12 sm:py-16 px-6 sm:px-10 max-w-7xl mx-auto border-t border-white/15">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-lime-400">
            Curriculum Structure
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            THREE SPECIALIZED TRACKS
          </h2>
          <p className="text-white/70 text-sm">
            Progressive education tracks designed for computer science and AI/ML undergraduates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Track 01 */}
          <div className="p-6 rounded-xl bg-white/5 border border-white/15 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-lime-400">TRACK 01</span>
                <span className="text-xs font-mono text-white/50">SEMESTER I</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-white mt-2">Quantum Basics</h3>
              <p className="text-xs text-white/70 mt-2 leading-relaxed">
                Foundations of quantum mechanics and computational states without classical analogies.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-white/85">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                  <span>Qubits &amp; Superposition statevectors (|ψ⟩ = α|0⟩ + β|1⟩)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                  <span>Quantum entanglement, Bell states &amp; EPR correlations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                  <span>Single-qubit (X, Y, Z, H, S, T) &amp; multi-qubit CNOT logic gates</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                  <span>Measurement collapse &amp; Born rule probability calculation</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-white/10 font-mono text-[11px] text-white/60">
              Tooling: Python · NumPy · IBM Quantum Composer
            </div>
          </div>

          {/* Track 02 */}
          <div className="p-6 rounded-xl bg-white/5 border border-white/15 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-lime-400">TRACK 02</span>
                <span className="text-xs font-mono text-white/50">SEMESTER II</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-white mt-2">Quantum Algorithms</h3>
              <p className="text-xs text-white/70 mt-2 leading-relaxed">
                Algorithmic speedups, phase estimation, and noisy intermediate-scale computing.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-white/85">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                  <span>Grover’s Quantum Search &amp; amplitude amplification (O(√N) quadratic speedup)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                  <span>Quantum Fourier Transform (QFT) &amp; Shor’s factoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                  <span>Variational Quantum Eigensolver (VQE) for molecular chemistry</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                  <span>NISQ circuit depth, decoherence (T₁, T₂), and gate errors</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-white/10 font-mono text-[11px] text-white/60">
              Tooling: IBM Qiskit · Qiskit Aer · OpenQASM 3.0
            </div>
          </div>

          {/* Track 03 */}
          <div className="p-6 rounded-xl bg-white/5 border border-white/15 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-lime-400">TRACK 03</span>
                <span className="text-xs font-mono text-white/50">SEMESTER III</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-white mt-2">Applications &amp; QML</h3>
              <p className="text-xs text-white/70 mt-2 leading-relaxed">
                Quantum machine learning, cryptography, and real IBM Quantum cloud execution.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-white/85">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                  <span>Parameterized Quantum Circuits (PQC) &amp; Quantum Neural Networks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                  <span>Hybrid PyTorch + PennyLane quantum-classical optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                  <span>Post-Quantum Cryptography (PQC) &amp; lattice-based algorithms</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                  <span>Submitting jobs to IBM Quantum superconducting QPUs</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-white/10 font-mono text-[11px] text-white/60">
              Tooling: PennyLane · PyTorch · IBM Quantum Platform
            </div>
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP & FOUNDING ROSTER ── */}
      <section className="py-12 sm:py-16 px-6 sm:px-10 max-w-7xl mx-auto border-t border-white/15">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-lime-400">
            People &amp; Mentorship
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            LEADERSHIP &amp; FOUNDING TEAM
          </h2>
          <p className="text-white/70 text-sm">
            Mentored by senior faculty and driven by undergraduate researchers at SIET.
          </p>
        </div>

        {/* Mentorship & Student Lead Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Faculty Mentor */}
          <div className="p-6 rounded-xl bg-white/5 border border-white/15 flex flex-col sm:flex-row gap-5 items-center sm:items-start text-center sm:text-left">
            <img 
              src="/dr-girish.jpeg" 
              alt="Dr. Girish L" 
              className="w-24 h-24 rounded-full object-cover border-2 border-lime-400/80 shadow-md shrink-0" 
            />
            <div className="space-y-1">
              <span className="font-mono text-xs uppercase tracking-wider text-lime-400 font-bold">
                Faculty Mentor
              </span>
              <h3 className="font-display font-bold text-xl text-white">Dr. Girish L</h3>
              <p className="text-xs font-mono text-white/70">
                Head of Department (HOD) · Dept. of AI &amp; DS
              </p>
              <p className="text-xs text-white/60 pt-2 leading-relaxed">
                Provides academic oversight, institutional support, and research guidance for Quantix lab initiatives and department workshops.
              </p>
            </div>
          </div>

          {/* Student Lead */}
          <div className="p-6 rounded-xl bg-white/5 border border-white/15 flex flex-col sm:flex-row gap-5 items-center sm:items-start text-center sm:text-left">
            <img 
              src="/dipankar.jpeg" 
              alt="Dipankar Chettri" 
              className="w-24 h-24 rounded-full object-cover border-2 border-lime-400/80 shadow-md shrink-0" 
            />
            <div className="space-y-1">
              <span className="font-mono text-xs uppercase tracking-wider text-lime-400 font-bold">
                Student Lead
              </span>
              <h3 className="font-display font-bold text-xl text-white">Dipankar Chettri</h3>
              <p className="text-xs font-mono text-white/70">
                Student Lead · QUANTIX
              </p>
              <p className="text-xs text-white/60 pt-2 leading-relaxed">
                Leads curriculum development, hardware benchmark experiments, laboratory projects, and student quantum cohort sessions.
              </p>
            </div>
          </div>
        </div>

        {/* Founding Cohort Member List */}
        <div className="mt-10 p-6 rounded-xl bg-white/5 border border-white/15 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
            <div>
              <div className="font-display font-bold text-lg text-white">The Founding Cohort</div>
              <div className="text-xs text-white/60">Registered with unique prime-indexed credentials in the club registry</div>
            </div>
            <div className="text-xs font-mono text-lime-400">7 Verified Members</div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pt-5">
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="font-mono text-[10px] text-lime-400 uppercase">Prime #01 · Student Lead</div>
              <div className="font-display font-bold text-sm text-white mt-0.5">Dipankar Chettri</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="font-mono text-[10px] text-white/50 uppercase">Prime #02 · Member</div>
              <div className="font-display font-bold text-sm text-white mt-0.5">Preetam</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="font-mono text-[10px] text-white/50 uppercase">Prime #03 · Member</div>
              <div className="font-display font-bold text-sm text-white mt-0.5">Krutika</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="font-mono text-[10px] text-white/50 uppercase">Prime #04 · Member</div>
              <div className="font-display font-bold text-sm text-white mt-0.5">Gouri</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="font-mono text-[10px] text-white/50 uppercase">Prime #05 · Member</div>
              <div className="font-display font-bold text-sm text-white mt-0.5">Khushi</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="font-mono text-[10px] text-white/50 uppercase">Prime #06 · Member</div>
              <div className="font-display font-bold text-sm text-white mt-0.5">Prarthana</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="font-mono text-[10px] text-white/50 uppercase">Prime #07 · Member</div>
              <div className="font-display font-bold text-sm text-white mt-0.5">Milland</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CALL TO ACTION ── */}
      <section className="py-14 sm:py-20 px-6 sm:px-10 max-w-4xl mx-auto text-center">
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-white/10 via-white/5 to-transparent border border-white/20 backdrop-blur-md space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400/20 text-lime-300 font-mono text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open for SIET Students</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            Ready to Step Into the <br />
            <span className="text-lime-400">Quantum Realm?</span>
          </h2>

          <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Join the Quantix cohort, participate in hardware workshops, and begin executing your first circuits on real quantum hardware.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenJoinModal}
              className="px-8 py-3 rounded-full bg-lime-400 hover:bg-lime-300 text-ink-950 font-display font-black text-sm tracking-wide shadow-lg hover:shadow-lime-400/20 transition-all flex items-center gap-2"
            >
              <span>Apply for Membership</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#/"
              className="px-7 py-3 rounded-full border border-white/40 hover:border-white hover:bg-white/10 text-white font-display font-bold text-sm tracking-wide transition-all"
            >
              Back to Home
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

