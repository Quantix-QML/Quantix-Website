import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#070914",
        aqua: "#66e4ed",
        violet: "#a48aff",
        mint: "#a2f4d0"
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      }
    }
  },
  plugins: []
};

export default config;
