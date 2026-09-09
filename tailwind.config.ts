import type { Config } from 'tailwindcss';

/**
 * Design tokens — planning/docs/02 §2–§4, with the PROVISIONAL brand hexes
 * replaced by values eyedropped from planning/assets/brand/allsafe-electric-logo.png.
 * See planning/docs/99 "2026-09-10 — Brand hexes".
 *
 *   logo blue  (house mark + wordmark)  ≈ #0165AC
 *   logo green (pine + tagline)         ≈ #008E6C
 *
 * `brand-green` (the action color) is darkened to #007A5C so white text on it
 * clears WCAG AA (4.5:1) — the true logo green #008E6C is 4.1:1 and is used only
 * for non-text accents (the availability dot, rules). No orange anywhere — the
 * audit script fails the build if a retired-orange hex appears (scripts/audit-seo.ts).
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', lg: '2rem' },
      screens: { '2xl': '1200px' },
    },
    extend: {
      colors: {
        ink: '#12283D',
        paper: '#F3F6F8',
        rule: '#D8E2E8',
        muted: '#5B7186',
        urgent: '#A3302A',
        brand: {
          blue: '#0165AC',
          'blue-deep': '#024D80',
          'blue-darker': '#013A62',
          green: '#007A5C',
          'green-strong': '#00654B',
          'green-bright': '#008E6C',
        },
      },
      fontFamily: {
        sans: ['var(--font-figtree)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-newsreader)', 'ui-serif', 'Georgia', 'serif'],
      },
      fontSize: {
        // planning/docs/02 §3 — major third, 18px base
        'step--1': ['0.875rem', { lineHeight: '1.5' }],
        'step-0': ['1.125rem', { lineHeight: '1.65' }],
        'step-1': ['1.375rem', { lineHeight: '1.5' }],
        'step-2': ['1.75rem', { lineHeight: '1.35' }],
        'step-3': ['2.25rem', { lineHeight: '1.25' }],
        'step-4': ['3rem', { lineHeight: '1.15' }],
        'step-5': ['3.75rem', { lineHeight: '1.05' }],
      },
      maxWidth: {
        measure: '68ch', // Figtree body
        'measure-serif': '74ch', // Newsreader review text
        content: '1200px',
      },
      spacing: {
        section: '6rem', // 96px desktop rhythm
        'section-sm': '3.5rem', // 56px mobile
      },
      borderRadius: { card: '6px' },
      boxShadow: {
        // Two levels only — planning/docs/02 §2
        lift: '0 12px 32px -8px rgba(18, 40, 61, 0.22), 0 4px 12px -4px rgba(18, 40, 61, 0.12)',
        rest: '0 1px 2px rgba(18, 40, 61, 0.06)',
      },
      transitionDuration: { 180: '180ms' },
    },
  },
  plugins: [],
};

export default config;
