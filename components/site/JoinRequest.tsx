"use client";

import Link from "next/link";
import { useState } from "react";
import { LogoMark } from "./LogoMark";

export function JoinRequest() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [ready, setReady] = useState(false);

  const request = `mailto:hello@quantix.club?subject=${encodeURIComponent("Quantix membership request")}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nA little about me:\n${note}`)}`;

  return (
    <main className="join-request-page">
      <header className="club-entry-header">
        <Link className="landing-brand" href="/" aria-label="Back to Quantix home">
          <LogoMark className="brand-mark" size={40} />
          <span>quantix<span className="brand-period">.</span></span>
        </Link>
        <Link className="club-back-link" href="/club">Back to the club <span aria-hidden="true">↗</span></Link>
      </header>
      <section className="join-request-card">
        <span className="section-kicker">EVERY GREAT IDEA STARTS SOMEWHERE <span>— QX / JOIN</span></span>
        <h1>Curiosity is<br /><span className="gradient-text">your invitation.</span></h1>
        <p>Tell us a little about yourself. Your email app will open with a join request addressed to the Quantix team.</p>
        <form onSubmit={(event) => { event.preventDefault(); setReady(true); }}>
          <label htmlFor="join-name">YOUR NAME</label>
          <input id="join-name" required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Ada Lovelace" />
          <label htmlFor="join-email">EMAIL ADDRESS</label>
          <input id="join-email" required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
          <label htmlFor="join-note">WHAT MAKES YOU CURIOUS?</label>
          <textarea id="join-note" required rows={4} maxLength={500} value={note} onChange={(event) => setNote(event.target.value)} placeholder="A question, an idea, or where you'd like to start..." />
          {ready ? (
            <a className="button button-primary join-request-submit" href={request} onClick={() => setReady(false)}>Open email to send request <span aria-hidden="true">↗</span></a>
          ) : (
            <button className="button button-primary join-request-submit" type="submit">Prepare join request <span aria-hidden="true">✦</span></button>
          )}
          {ready && <p className="join-request-notice" role="status">Your request is ready. Select the button above to open your email app and send it.</p>}
        </form>
        <span className="join-request-note">Your details are only included in the email you choose to send.</span>
      </section>
    </main>
  );
}
