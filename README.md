# Quantix — Quantum Multiverse

An interactive, responsive website for a quantum-computing community, built with Next.js, TypeScript, Tailwind CSS, Three.js, and React Three Fiber.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```text
app/
  globals.css                 Design system, layouts, and responsive styles
  layout.tsx                  Root layout, fonts, and SEO metadata
  page.tsx                    Website composition
components/
  assistant/
    Assistant.tsx             Scripted, interactive quantum guide
  experience/
    Experience.tsx            Persistent React Three Fiber canvas
    QuantumCore.tsx           Scroll-aware processor, qubits, gates, and portals
    SpaceEnvironment.tsx      Layered stars and space environment
  site/
    Footer.tsx                Site footer
    Header.tsx                Responsive navigation
    IntroScene.tsx            Animated first-visit intro
  ui/
    Reveal.tsx                Reduced-motion-aware reveal transitions
    SectionHeading.tsx        Reusable section heading
  universes/
    AboutUniverse.tsx          Intro, quantum hub, and five universe portals
    LearningUniverse.tsx       Interactive qubit and quantum-concept explorer
    EventsUniverse.tsx         Event galaxy and category dialogs
    ResearchUniverse.tsx       QML, algorithms, security, and VQE
    TeamUniverse.tsx            Interactive entanglement network
.eslintrc.json                  Next.js and TypeScript lint rules
next.config.ts                 Next.js configuration
package.json                   Scripts and application dependencies
package-lock.json              Reproducible dependency lockfile
tailwind.config.ts              Tailwind design tokens
```

The 3D processor stays behind the page and responds to scroll and pointer movement. The five navigation gates launch a camera/wormhole transition before entering their corresponding universe. On smaller screens the experience keeps the interactive hero while using conventional, lighter content sections.

The AI guide currently uses scripted responses; connecting an AI provider is a future enhancement and is not required to run this project.

## Checks

```bash
npm run typecheck
npm run build
```
