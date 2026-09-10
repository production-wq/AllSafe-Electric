import type { Config } from 'tailwindcss';

/**
 * Design tokens. Brand hexes eyedropped from
 * planning/assets/brand/allsafe-electric-logo.png (planning/docs/99, 2026-09-10):
 *   logo blue  #0165AC   ·   logo green  #008E6C
 *
 * v2 (2026-09-10) widens the palette on client direction: full blue and green
 * ramps, a teal secondary, a warm sand neutral for section alternation, and a
 * gold used only for star ratings. Every hue sits OUTSIDE the 16 to 34 degree
 * orange band that scripts/audit-seo.ts fails the build on, so the "no orange"
 * prime directive still holds.
 *
 * `green.600` (#007A5C) is the action colour: white text on it clears WCAG AA
 * at 5.3:1. The literal logo green #008E6C is 4.1:1 and is used only for
 * non-text accents such as the availability dot and hairlines.
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
      screens: { '2xl': '1240px' },
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: '#10243A',
          soft: '#33506B',
        },
        muted: '#5B7186',
        rule: '#DEE7ED',
        paper: '#F4F7F9',
        sand: '#FAF6F0',
        urgent: {
          DEFAULT: '#B3352F',
          soft: '#FBEFEE',
        },
        brand: {
          50: '#EEF6FC',
          100: '#DCEBF7',
          200: '#B9D6EE',
          300: '#7FB6DF',
          400: '#3E90CB',
          500: '#0F76BC',
          600: '#0165AC', // logo blue
          700: '#024D80',
          800: '#013A62',
          900: '#0A2E4D',
        },
        leaf: {
          50: '#EEF9F4',
          100: '#D6F0E6',
          200: '#A8E0CB',
          300: '#6DCBAB',
          400: '#2FAE87',
          500: '#008E6C', // logo green
          600: '#007A5C', // action green, AA on white
          700: '#00654B',
          800: '#00543E',
          900: '#02402F',
        },
        teal: {
          50: '#E8F6F7',
          100: '#CCEAED',
          500: '#12909C',
          600: '#0E7C86',
          700: '#0B646C',
        },
        gold: {
          50: '#FDF7E9',
          100: '#F8EBC8',
          500: '#E8A317', // star fill only, hue 40deg, outside the orange band
          600: '#C4870F',
        },
      },
      fontFamily: {
        sans: ['var(--font-figtree)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-newsreader)', 'ui-serif', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-lg': ['clamp(2.75rem, 5.5vw, 4.25rem)', { lineHeight: '1.03', letterSpacing: '-0.026em' }],
        display: ['clamp(2.25rem, 4.4vw, 3.5rem)', { lineHeight: '1.06', letterSpacing: '-0.022em' }],
        h1: ['clamp(2rem, 3.6vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        h2: ['clamp(1.625rem, 2.6vw, 2.375rem)', { lineHeight: '1.18', letterSpacing: '-0.016em' }],
        h3: ['clamp(1.25rem, 1.5vw, 1.5rem)', { lineHeight: '1.32', letterSpacing: '-0.008em' }],
        lead: ['clamp(1.125rem, 1.4vw, 1.3125rem)', { lineHeight: '1.6' }],
        body: ['1.0625rem', { lineHeight: '1.68' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        small: ['0.9375rem', { lineHeight: '1.55' }],
        tiny: ['0.8125rem', { lineHeight: '1.45' }],
      },
      maxWidth: {
        measure: '66ch',
        'measure-serif': '72ch',
        content: '1240px',
      },
      borderRadius: {
        card: '14px',
        btn: '10px',
        chip: '999px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(16, 36, 58, 0.04), 0 6px 20px -12px rgba(16, 36, 58, 0.14)',
        lift: '0 2px 6px rgba(16, 36, 58, 0.06), 0 22px 48px -20px rgba(1, 101, 172, 0.28)',
        float: '0 30px 70px -28px rgba(1, 62, 104, 0.42)',
        ring: '0 0 0 1px rgba(1, 101, 172, 0.14)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(rgba(1,101,172,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(1,101,172,0.06) 1px, transparent 1px)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
