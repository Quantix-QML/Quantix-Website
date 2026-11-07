---
name: Quantix Quantum Computing Club
description: Official design system for Quantix — the Quantum Computing Club of Shridevi Institute of Engineering & Technology (SIET), Tumakuru. Inspired by Web3 / Neo-Brutalist modern club aesthetics (Electric Royal Blue, Acid Neon Lime, Crisp Modern White Sheet, and Frosted Glass).
colors:
  primary: "#0052ff"         # Vibrant Electric Royal Blue (Base Hero Canvas)
  primary-dark: "#06339e"    # Deep Royal Blue for Nav Pill and Contrast
  accent-lime: "#a3ff00"     # Acid Neon Lime (Display #QUANTIX, Doodles, Circular Badges)
  accent-lime-hover: "#bef264"
  accent-lime-deep: "#65a30d"  # 3D Shading & Sphere Occlusion
  accent-lime-dark: "#1a2e05"  # Deep Core Shadow
  neutral-bg-hero: "#0052ff"
  neutral-bg-sheet: "#ffffff" # Modern White Container Sheet
  neutral-card: "#f8fafc"    # Light Slate Card Background
  neutral-fg: "#0f172a"      # Black/Ink Primary Text (#0f172a)
  neutral-muted: "#64748b"   # Muted Slate Metadata
  border-subtle: "rgba(226, 232, 240, 0.8)"
  border-grid: "rgba(255, 255, 255, 0.09)" # Blueprint Grid
typography:
  display:
    fontFamily: "Cabinet Grotesk, system-ui, sans-serif"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.03em"
  giant:
    fontSize: "8.75rem"      # 140px
    lineHeight: "0.9"
  body:
    fontFamily: "Satoshi, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  mono:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.85rem"
    fontWeight: 600
  micro:
    fontSize: "0.6875rem"    # 11px
    lineHeight: "1rem"
  nano:
    fontSize: "0.625rem"     # 10px
    lineHeight: "0.875rem"
  pico:
    fontSize: "0.5625rem"    # 9px
    lineHeight: "0.75rem"
rounded:
  scrollbar: "3px"
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
  sheet: "48px"
  full: "9999px"
components:
  hero-title-lime:
    color: "#a3ff00"
    fontFamily: "Cabinet Grotesk"
    fontWeight: 900
    textTransform: "uppercase"
  hero-title-white:
    color: "#ffffff"
    fontFamily: "Cabinet Grotesk"
    fontWeight: 900
    textTransform: "uppercase"
  button-primary:
    backgroundColor: "{colors.accent-lime}"
    textColor: "{colors.neutral-fg}"
    fontWeight: 900
    rounded: "{rounded.full}"
    padding: "12px 24px"
  badge-speech:
    rounded: "{rounded.full}"
    backgroundColor: "#ffffff"
    textColor: "{colors.primary}"
---

# Quantix Design System Documentation

## 1. Aesthetic DNA
- **Theme**: Web3 / Neo-Brutalist Playful Modern Club Aesthetic (derived from the user's reference design).
- **Hero Canvas**: Vibrant Electric Royal Blue (`#0052ff`) overlaid with a clean architectural blueprint grid (`.blueprint-grid`).
- **Display Typography**: Massive, compressed/expanded typography `#QUANTIX QUANTUM REALMS` in neon lime (`#a3ff00`) and crisp white.
- **Accents**: Hand-drawn SVG doodle arrows in neon lime and dark ink, a rotating circular sticker badge ("EXPLORE RESEARCH • QUANTIX SIET •"), and tilted frosted glassmorphic profile cards (`dipankar.qx`, `quantix.siet`).
- **Main Content**: A seamless, modern white card sheet (`bg-white rounded-t-[48px]`) with high-contrast slate cards, real-time interactive quantum instruments, and clear student research showcases.
- **Zero 3D Hardware Overhead**: Fast, clean 2D layout without heavy WebGL shaders or Three.js backgrounds, ensuring instantaneous loading and responsive fluidity.
