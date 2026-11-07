/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        electric: {
          50: '#edf4ff',
          100: '#dbe8fe',
          200: '#bfd7fe',
          400: '#3b82f6',
          500: '#1d4ed8',
          600: '#0052ff', // Vibrant Electric Royal Blue (Reference Hero)
          700: '#0a46d1',
          800: '#06339e',
          900: '#04226d',
          950: '#02133f',
        },
        lime: {
          300: '#bef264',
          400: '#a3ff00', // Acid Neon Lime (Reference Accent & Doodles)
          500: '#84cc16',
          600: '#65a30d',
          950: '#1a2e05',
        },
        ink: {
          950: '#080c16',
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
          500: '#64748b',
          400: '#94a3b8',
          300: '#cbd5e1',
          200: '#e2e8f0',
          100: '#f1f5f9',
          50: '#f8fafc',
        },
        starlight: {
          100: '#ffffff',
          200: '#f8fafc',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
        }
      },
      fontFamily: {
        display: ['"Cabinet Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Satoshi"', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        giant: ['8.75rem', { lineHeight: '0.9' }], // 140px
        micro: ['0.6875rem', { lineHeight: '1rem' }], // 11px
        nano: ['0.625rem', { lineHeight: '0.875rem' }], // 10px
        pico: ['0.5625rem', { lineHeight: '0.75rem' }], // 9px
      },
    },
  },
  plugins: [],
}
