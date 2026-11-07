"use client";

import Link from "next/link";
import { SignIn } from "./SignIn";
import { LogoMark } from "./LogoMark";

export function ClubEntry() {
  function openSignIn(event: React.MouseEvent<HTMLButtonElement>) {
    window.dispatchEvent(new CustomEvent("quantix:signin", { detail: event.currentTarget }));
  }

  return (
    <main className="club-entry">
      <header className="club-entry-header">
        <Link className="landing-brand" href="/" aria-label="Back to Quantix home">
          <LogoMark className="brand-mark" size={40} priority />
          <span>quantix<span className="brand-period">.</span></span>
        </Link>
        <Link className="club-back-link" href="/">Back to the universe <span aria-hidden="true">↗</span></Link>
      </header>

      <section className="club-entry-content">
        <div className="club-entry-intro">
          <div className="eyebrow"><span className="status-dot" /> A COMMUNITY FOR THE QUANTUM-CURIOUS</div>
          <h1>Big questions.<br /><span className="gradient-text">Open minds.</span></h1>
          <p>Quantix is a student-led community exploring quantum computing together. We turn intimidating ideas into approachable experiments, share what we learn, and make space for curious people at every starting point.</p>
          <div className="club-entry-values">
            <span>LEARN OUT LOUD</span><i /><span>BUILD TOGETHER</span><i /><span>STAY CURIOUS</span>
          </div>
        </div>

        <div className="club-access">
          <div className="section-kicker">CHOOSE YOUR WAY IN <span>— QX / ACCESS</span></div>
          <div className="club-access-grid">
            <article className="club-access-card">
              <span className="club-access-index">01 / CLUB ACCESS</span>
              <div className="club-access-icon" aria-hidden="true">⊕</div>
              <h2>Presidents &amp; members</h2>
              <p>Already part of Quantix? Continue to member access or request help with your account.</p>
              <button className="button button-primary" type="button" onClick={openSignIn}>Member sign in <span aria-hidden="true">↗</span></button>
              <span className="club-access-note">Club president or member</span>
            </article>
            <article className="club-access-card club-access-card--visitor">
              <span className="club-access-index">02 / OPEN ACCESS</span>
              <div className="club-access-icon" aria-hidden="true">✦</div>
              <h2>Visitors</h2>
              <p>New to Quantix? Explore our learning universe, events, research, and community—no account needed.</p>
              <Link className="button button-outline" href="/explore">Explore as a visitor <span aria-hidden="true">↗</span></Link>
              <Link className="visitor-join-link" href="/join">Interested in joining? Send a request</Link>
              <span className="club-access-note">Everyone is welcome to explore</span>
            </article>
          </div>
        </div>
      </section>

      <footer className="club-entry-footer">
        <span>MADE OF QUESTIONS. POWERED BY PEOPLE.</span>
        <Link href="/join">Request to join ↗</Link>
      </footer>
      <SignIn />
    </main>
  );
}
