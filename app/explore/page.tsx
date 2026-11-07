import { Assistant } from "@/components/assistant/Assistant";
import { Experience } from "@/components/experience/Experience";
import { AboutUniverse } from "@/components/universes/AboutUniverse";
import { EventsUniverse } from "@/components/universes/EventsUniverse";
import { LearningUniverse } from "@/components/universes/LearningUniverse";
import { ResearchUniverse } from "@/components/universes/ResearchUniverse";
import { TeamUniverse } from "@/components/universes/TeamUniverse";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { IntroScene } from "@/components/site/IntroScene";
import { JoinBurstLink } from "@/components/site/JoinBurstLink";
import { SignIn } from "@/components/site/SignIn";

export default function Explore() {
  return (
    <>
      <IntroScene />
      <Experience />
      <Header />
      <main>
        <AboutUniverse />
        <LearningUniverse />
        <EventsUniverse />
        <ResearchUniverse />
        <TeamUniverse />
        <section className="join section-shell" id="join">
          <div className="join-card">
            <div className="join-content">
              <div className="eyebrow"><span className="status-dot" /> YOUR NEXT CHAPTER STARTS HERE</div>
              <h2>There&apos;s room for<br /><span className="gradient-text">one more mind.</span></h2>
              <p>You don&apos;t need to know everything. You just need to want to know more.</p>
              <JoinBurstLink />
            </div>
            <div className="join-orbit" aria-hidden="true"><div className="join-orbit-ring" /><div className="join-orbit-ring ring-two" /><div className="join-core">Q</div><span className="join-bit join-bit-one">|0⟩</span><span className="join-bit join-bit-two">|1⟩</span><span className="join-bit join-bit-three">+</span></div>
          </div>
        </section>
      </main>
      <Footer />
      <Assistant />
      <SignIn />
    </>
  );
}
