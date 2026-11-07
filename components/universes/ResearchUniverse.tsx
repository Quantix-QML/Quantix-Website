import { Reveal } from "@/components/ui/Reveal";

const projects = [
  { number: "01", name: "Quantum machine learning", description: "What changes when learning meets quantum?", tag: "QML / PATTERNS", visual: "graphic-ml" },
  { number: "02", name: "Quantum algorithms", description: "New ways to think about hard problems.", tag: "CIRCUITS / COMPUTATION", visual: "graphic-algorithm" },
  { number: "03", name: "Quantum & security", description: "Rethinking trust in a quantum future.", tag: "SECURITY / THE FUTURE", visual: "graphic-security" },
  { number: "04", name: "Variational algorithms", description: "Explore hybrid quantum-classical optimization.", tag: "VQE / OPTIMIZATION", visual: "graphic-vqe" }
];

export function ResearchUniverse() {
  return (
    <section className="research section-shell" id="research">
      <div className="research-header">
        <div><div className="section-kicker">QUESTIONS WE&apos;RE CHASING <span>— 05</span></div><h2>At the edge of<br /><span className="gradient-text">what&apos;s possible.</span></h2></div>
        <p>We explore the ideas shaping tomorrow&apos;s quantum world. These are starting points, not boundaries.</p>
      </div>
      <div className="research-grid">
        {projects.map((project) => (
          <Reveal className="research-card research-card--floating" key={project.number}>
            <span className="research-icon">{project.number}<i>↗</i></span>
            <ResearchVisual visual={project.visual} />
            <h3>{project.name}</h3><p>{project.description}</p><span className="research-tag">{project.tag}</span>
            <a className="research-project-link" href={`mailto:hello@quantix.club?subject=${encodeURIComponent(`Project inquiry: ${project.name}`)}`}>
              Ask about this project <span aria-hidden="true">↗</span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ResearchVisual({ visual }: { visual: string }) {
  if (visual === "graphic-algorithm") {
    return <div className={`research-graphic ${visual}`} aria-hidden="true">{["H", "⊕", "U", "H", "×", "ψ"].map((item, index) => <span key={index}>{item}</span>)}</div>;
  }
  if (visual === "graphic-security") {
    return <div className={`research-graphic ${visual}`} aria-hidden="true"><span className="security-ring" /><span className="security-core">⌑</span><span className="security-node" /></div>;
  }
  if (visual === "graphic-vqe") {
    return <div className={`research-graphic ${visual}`} aria-hidden="true">{["H", "ψ", "↻", "E"].map((item, index) => <span key={index}>{item}</span>)}</div>;
  }
  return <div className={`research-graphic ${visual}`} aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /><b>Q</b></div>;
}
