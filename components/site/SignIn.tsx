"use client";

import { useEffect, useRef, useState } from "react";
import { LogoMark } from "./LogoMark";

export function SignIn() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const returnFocus = useRef<HTMLElement | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeButton.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = document.querySelectorAll<HTMLElement>(
        ".signin-modal button, .signin-modal input, .signin-modal a[href]"
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = previousOverflow;
      returnFocus.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    const openDialog = (event: Event) => {
      returnFocus.current = (event as CustomEvent<HTMLElement>).detail ?? null;
      setOpen(true);
    };
    window.addEventListener("quantix:signin", openDialog);
    return () => window.removeEventListener("quantix:signin", openDialog);
  }, []);

  const accessMail = `mailto:hello@quantix.club?subject=${encodeURIComponent("Quantix club president or member sign-in")}&body=${encodeURIComponent(`Please help me sign in to Quantix.${email ? `\n\nMy email: ${email}` : ""}`)}`;

  if (!open) return null;

  return (
    <div className="signin-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) setOpen(false);
    }}>
      <section className="signin-modal" role="dialog" aria-modal="true" aria-labelledby="signin-title">
        <button ref={closeButton} className="signin-close" type="button" aria-label="Close sign in" onClick={() => setOpen(false)}>×</button>
        <div className="signin-mark"><LogoMark size={56} priority /></div>
        <span className="signin-kicker">QUANTIX CLUB ACCESS</span>
        <h2 id="signin-title">Welcome <span className="gradient-text">back.</span></h2>
        <p className="signin-description">Club president and member accounts are managed by the Quantix community. Request sign-in help and we&apos;ll help you get back in.</p>
        <label className="signin-label" htmlFor="signin-email">YOUR EMAIL ADDRESS</label>
        <input
          id="signin-email"
          className="signin-input"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <a
          className="button button-primary signin-submit"
          href={accessMail}
          onClick={() => setOpen(false)}
        >
          Request sign-in help <span aria-hidden="true">↗</span>
        </a>
        <p className="signin-disclaimer">No password is collected. Sign-in requests open your email app; authentication is not yet connected to this site.</p>
        <div className="signin-divider"><span /> NEW TO QUANTIX? <span /></div>
        <a className="signin-join" href="mailto:hello@quantix.club?subject=Joining%20Quantix" onClick={() => setOpen(false)}>Request a community invite <span aria-hidden="true">↗</span></a>
      </section>
    </div>
  );
}
