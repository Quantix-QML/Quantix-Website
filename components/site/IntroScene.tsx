"use client";

import { useEffect, useState } from "react";
import { LogoMark } from "./LogoMark";

export function IntroScene() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1600);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="intro-scene" aria-hidden="true">
      <div className="intro-mark"><LogoMark size={72} priority /></div>
      <span className="intro-wordmark">QUANTIX</span>
      <span className="intro-caption">INITIALIZING QUANTUM FIELD</span>
      <div className="intro-progress"><i /></div>
    </div>
  );
}
