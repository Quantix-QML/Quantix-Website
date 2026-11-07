"use client";

import Link from "next/link";
import { useState } from "react";
import { LogoMark } from "./LogoMark";

const links = [
  ["Explore", "#universes"],
  ["Learn", "#learn"],
  ["Research", "#research"],
  ["People", "#people"]
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Quantix home">
        <LogoMark className="brand-mark" size={30} priority />
        <span>quantix<span className="brand-period">.</span></span>
      </Link>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="primary-nav"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((value) => !value)}
      >
        <span /><span />
      </button>
      <nav className={`primary-nav${open ? " is-open" : ""}`} id="primary-nav" aria-label="Main navigation">
        {links.map(([label, href]) => (
          <a href={href} key={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
      </nav>
      <button className="header-cta signin-trigger" type="button" onClick={(event) => window.dispatchEvent(new CustomEvent("quantix:signin", { detail: event.currentTarget }))}>Sign in <span aria-hidden="true">↗</span></button>
    </header>
  );
}
