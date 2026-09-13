import type { Config } from 'tailwindcss';

/**
 * Design tokens, v4 (2026-09-11).
 *
 * v3 shipped the client's stated palette, which turned out to still include the
 * orange the client's own style guide excludes as a CTA color (client audit,
 * 2026-09-11, see planning/docs/99). Corrected here: accent is now GREEN, sampled
 * directly from the real logo file (public/img/brand/allsafe-electric-logo.webp),
 * confirmed with the client.
 *
 *   #0068A8  blue     primary, structural, links, headers
 *   #007A56  green    accent, primary CTAs, eyebrows, icons (darkened from the
 *                     sampled #009A6B so white-on-green text clears WCAG AA,
 *                     4.5:1; #009A6B stays available as green-bright for large
 *                     decorative use only, where it is 3.6:1)
 *   #B3352F  urgent   emergency-only red. Never a generic CTA color.
 *   #54595F  slate    body text
 *   #7A7A7A  grey     secondary / muted text
 *   #000000  black    headings
 *
 * Dark sections (hero, CTA band, footer) use a deep navy derived from the blue.
 * Layout, spacing and section flow follow the designer's homepage artifact
 * (3f589566-2420-48b6-8eda-34269e1979ba).
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
        black: '#000000',
        ink: '#111214', // headings, a hair off pure black for large blocks
        slate: '#54595F', // body copy (client palette)
        grey: '#7A7A7A', // secondary / muted (client palette)
        rule: '#E3E7EB',
        paper: '#F4F6F8',
        blue: {
          50: '#E8F2F9',
          100: '#CFE5F2',
          200: '#9CC9E4',
          300: '#63A9D3',
          400: '#2E88C0',
          500: '#0F76B4',
          600: '#0068A8', // client palette, primary
          700: '#00568B',
          800: '#01426B',
          900: '#08314F',
        },
        navy: {
          DEFAULT: '#0A2E4C',
          light: '#0E3A60',
          deep: '#071F35',
        },
        // Second dark surface, added for the "Job-Site Editorial" refresh (2026-09-13)
        // so repeated dark sections don't all read as the same navy block.
        graphite: {
          DEFAULT: '#1B232E',
          light: '#242E3B',
        },
        green: {
          50: '#E6F5EF',
          100: '#C2E7D8',
          200: '#8ED0B3',
          300: '#5AB88E',
          400: '#26A069',
          500: '#009A6B', // sampled from the logo, decorative / large text only (3.6:1 on white)
          600: '#007A56', // CTA / text-safe, 5.36:1 white-on-green
          700: '#00643F', // hover / pressed
          800: '#004E30',
        },
        urgent: {
          50: '#FBEEEC',
          500: '#B3352F', // emergency-only. Never a generic CTA.
          600: '#952B26',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(2.5rem, 5.4vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.01em', fontWeight: '800' }],
        'display': ['clamp(2rem, 3.8vw, 3rem)', { lineHeight: '1.12', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h1': ['clamp(1.875rem, 3.2vw, 2.75rem)', { lineHeight: '1.14', letterSpacing: '-0.008em', fontWeight: '700' }],
        'h2': ['clamp(1.5rem, 2.6vw, 2.125rem)', { lineHeight: '1.2', letterSpacing: '-0.006em', fontWeight: '700' }],
        'h3': ['clamp(1.1875rem, 1.5vw, 1.375rem)', { lineHeight: '1.35', fontWeight: '700' }],
        'lead': ['clamp(1.0625rem, 1.3vw, 1.1875rem)', { lineHeight: '1.65' }],
        'body-lg': ['1.125rem', { lineHeight: '1.72' }],
        'body': ['1.0625rem', { lineHeight: '1.7' }],
        'small': ['0.9375rem', { lineHeight: '1.6' }],
        'tiny': ['0.8125rem', { lineHeight: '1.5' }],
        'eyebrow': ['0.8125rem', { lineHeight: '1.4', letterSpacing: '0.12em', fontWeight: '700' }],
      },
      maxWidth: {
        measure: '65ch',
        content: '1200px',
      },
      borderRadius: {
        card: '10px',
        btn: '6px',
        pill: '999px',
        // Alias of `pill`. Was referenced as `rounded-chip` in PageIntro.tsx and the
        // service/city hero sections with no matching config entry anywhere — a
        // silent no-op. Given a real definition, 2026-09-13.
        chip: '999px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(10, 46, 76, 0.06), 0 10px 30px -12px rgba(10, 46, 76, 0.16)',
        lift: '0 18px 44px -16px rgba(10, 46, 76, 0.28)',
        float: '0 30px 70px -24px rgba(7, 31, 53, 0.4)',
        form: '0 24px 60px -18px rgba(10, 46, 76, 0.24)',
        // "Job-Site Editorial" refresh (2026-09-13): shadows for the new
        // photo-forward modules (PhotoGallery, full-bleed zigzag bands).
        photo: '0 24px 56px -20px rgba(10, 46, 76, 0.35)',
        ambient: '0 2px 10px rgba(10, 46, 76, 0.08)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
