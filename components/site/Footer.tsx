import Link from "next/link";
import { LogoMark } from "./LogoMark";

export function Footer() {
  return (
    <footer className="site-footer section-shell">
      <Link className="brand" href="/">
        <LogoMark className="brand-mark" size={30} />
        <span>quantix<span className="brand-period">.</span></span>
      </Link>
      <p>Made of questions. Powered by people.</p>
      <div className="footer-links">
        <a href="#universes">Explore</a><a href="#learn">Learn</a><a href="mailto:hello@quantix.club">Say hello ↗</a>
      </div>
      <span className="copyright">© 2025 QUANTIX COMMUNITY</span>
    </footer>
  );
}
