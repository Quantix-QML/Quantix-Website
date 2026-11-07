# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite + React + Tailwind CSS (static build ready for GitHub Pages, Vercel, or Netlify)

## Users

- Primary: Engineering and computer science students (Artificial Intelligence & Data Science, Artificial Intelligence & Machine Learning, Computer Science) at Shridevi Institute of Engineering & Technology, Tumakuru, seeking to learn quantum computing, quantum algorithms, and next-generation quantum software engineering.
- Secondary: Faculty, academic evaluators, university leadership, hackathon organizers, and quantum research/industry communities (IBM Qiskit, PennyLane, Xanadu) seeking collaboration with an active student research club.

## Product Purpose

Quantix is the official Quantum Computing Club of Shridevi Institute of Engineering & Technology (SIET), Tumakuru. The website serves as the club's primary digital flagship, curriculum roadmap, interactive learning portal, and recruitment hub. Success means communicating the excitement and depth of quantum computation, guiding students through the 3 structured learning tracks, demonstrating real quantum principles through interactive visualizers (Bloch sphere and quantum gate playground), celebrating faculty mentorship and student leadership, and providing a seamless call-to-action for joining the club.

## Positioning

Unlike conventional student programming clubs or generic computer science societies, Quantix focuses exclusively on the frontier of quantum computation, superposition, entanglement, and NISQ applications. It bridges the gap between deep theoretical quantum physics and modern quantum software development (IBM Qiskit, PennyLane, Post-Quantum Cryptography, and Quantum Machine Learning).

## Operating Context

Students and guests access the site on laptops, tablets, and mobile phones, frequently during club launches, tech fests, workshops, and Discord/WhatsApp community shares. The interface must load instantaneously, run smooth 60fps quantum simulations without battery drain or lag, and offer effortless navigation.

## Capabilities and Constraints

- Modern component-driven single-page architecture built with Vite, React 18/19, and Tailwind CSS with Lucide icons.
- Interactive Qubit / Bloch Sphere visualizer: Real-time 3D or dynamic interactive representation of a quantum state $|\psi\rangle = \cos(\theta/2)|0\rangle + e^{i\phi}\sin(\theta/2)|1\rangle$ allowing users to apply Pauli-X, Hadamard (H), and Phase (Z) gates and observe state vector changes and measurement probabilities.
- Structured Track Explorer:
  - Track 01: Quantum Basics (Qubits, Superposition, Entanglement, Quantum Logic Gates & Circuits)
  - Track 02: Quantum Algorithms (Shor's & Grover's Algorithms, Variational Quantum Eigensolver [VQE], Noisy Intermediate-Scale Quantum [NISQ] circuits)
  - Track 03: Applications & Future Tech (IBM Qiskit & PennyLane frameworks, Post-Quantum Cryptography, Quantum Machine Learning)
- Team & Mentorship Showcase: Featuring Faculty Mentor Dr. Girish L and President Dipankar Chettri with authentic photos, along with the core team.
- Membership Application modal / CTA with clear onboarding instructions.
- Event timeline and workshop calendar.

## Brand Commitments

- Name: QUANTIX — Quantum Computing Club
- College: Shridevi Institute of Engineering & Technology · Tumakuru, Karnataka
- Departments: Dept. of Artificial Intelligence & Data Science, Dept. of Artificial Intelligence & Machine Learning
- Collaboration: In collaboration with AI Syntax Surge
- Headline: "Unlocking Quantum Realms Into Real-World Solutions"
- Motto: "Build with knowledge • Grow with people"
- Core Four-Step Journey: 01 Learn → 02 Simulate → 03 Build → 04 Collaborate
- Colors: Deep-space quantum ink (`#05060c`), cryogenic navy (`#0b0f19`), quantum crimson (`#dc2626` / `#ef4444`), photon magenta (`#db2777`), icy starlight neutrals (`#f5f5f4`, `#e2e8f0`).
- Hardware Theme: Dilution refrigerator cryostat aesthetic (gold thermal stages, coaxial cabling, vacuum chamber precision).

## Evidence on Hand

- Official logos: `QUANTIX-logo-v3.png`, `QUANTIX-emblem.png`, `QUANTIX-logo-email.png`
- Verified Leadership Photos: `dr girish.jpeg` (Dr. Girish L), `dipanlar.jpeg` (Dipankar Chettri)
- Cryogenic Hardware Image: `poster-bg-fridge.jpg`
- Complete launch poster typography and specs from `quantix-landscape-centered.html` and `kit/`
- Founding roster from `kit/members.json`

## Product Principles

1. Tangible Quantum Intuition: Quantum mechanics is counter-intuitive; the site must make superposition, phase, and entanglement visually and interactively perceptible rather than hiding behind buzzwords.
2. Academic Authority & High-Tech Prestige: Reflect SIET's academic rigor while projecting the forward-looking polish of premier quantum labs like IBM Quantum, MIT, and QuTech.
3. High Information Density with Clean Rhythm: Give visitors immediate access to track syllabi, lab tools, and membership details without overwhelming or nesting cards.
4. Craft Floor Integrity: Zero generic AI slop. Avoid cliché purple-to-cyan gradient text or empty sparklines. Use deliberate typographic scale, authentic physics formulas, custom styled browser surfaces, and purposeful interactive motion.

## Accessibility & Inclusion

- WCAG AA contrast compliance: Body text ≥ 4.5:1 against dark backgrounds.
- Respect `prefers-reduced-motion` for all quantum visualizers and animated transitions.
- Semantic HTML tags (`<main>`, `<section>`, `<nav>`, `<header>`, `<footer>`) with descriptive ARIA attributes for interactive quantum controls.

