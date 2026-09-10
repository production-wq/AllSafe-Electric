/**
 * Brand mark, redrawn as inline SVG so it works on both the white header and the
 * deep-blue footer without shipping two raster files. Geometry follows
 * planning/assets/brand/allsafe-electric-logo.png: a house with a pine element and
 * two four-point sparkles, wordmark, and the "Safety Security Satisfaction" tagline.
 * Colours from the eyedropped hexes (planning/docs/99).
 */
export function Logo({
  variant = 'dark',
  showTagline = true,
  className,
}: {
  variant?: 'dark' | 'light';
  showTagline?: boolean;
  className?: string;
}) {
  const blue = variant === 'light' ? '#FFFFFF' : '#0165AC';
  const green = variant === 'light' ? '#BFE9DA' : '#008E6C';
  const word = variant === 'light' ? '#FFFFFF' : '#0165AC';

  return (
    <svg
      viewBox="0 0 340 74"
      className={className}
      role="img"
      aria-label="Allsafe Electric. Safety Security Satisfaction"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* sparkles, 4-point */}
      <path d="M10 13 q1 -6 2 0 q6 1 0 2 q-1 6 -2 0 q-6 -1 0 -2z" fill={green} />
      <path d="M40 58 q0.8 -4.5 1.6 0 q4.5 0.8 0 1.6 q-0.8 4.5 -1.6 0 q-4.5 -0.8 0 -1.6z" fill={blue} />
      {/* pine, peeking behind the house on the right */}
      <path d="M62 16 l7 15 h-14z M62 25 l8.5 17 h-17z" fill={green} />
      {/* house body + roof */}
      <path d="M17 41 L39 22 L61 41 h-7 V57 H24 V41z" fill={blue} />
      <path
        d="M13 43 L39 20 L65 43"
        fill="none"
        stroke={blue}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* chimney */}
      <rect x="49" y="24" width="5.5" height="11" rx="1" fill={blue} />
      {/* door */}
      <rect
        x="34"
        y="44"
        width="10"
        height="13"
        rx="1"
        fill={variant === 'light' ? '#0165AC' : '#FFFFFF'}
      />
      {/* ground arc */}
      <path d="M9 61 Q39 53 71 61" stroke={blue} strokeWidth="3.4" fill="none" strokeLinecap="round" />

      {/* wordmark */}
      <text
        x="88"
        y="34"
        fontFamily="var(--font-figtree), system-ui, sans-serif"
        fontWeight="700"
        fontSize="27"
        letterSpacing="0.5"
        fill={word}
      >
        ALLSAFE ELECTRIC
      </text>
      {showTagline && (
        <text
          x="89"
          y="57"
          fontFamily="var(--font-figtree), system-ui, sans-serif"
          fontWeight="600"
          fontSize="12.5"
          letterSpacing="1.5"
          fill={green}
        >
          SAFETY SECURITY SATISFACTION
        </text>
      )}
    </svg>
  );
}
