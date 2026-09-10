import { ImageResponse } from 'next/og';
import { business } from '@/lib/business';

/**
 * Per-page Open Graph image — planning/docs/11 §5. 1200×630, brand-blue ground,
 * the page title, and the phone number. Generated at the edge, cached hard.
 */
// Rendered on demand per title, then cached hard at the edge.
export const dynamic = 'force-dynamic';

export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get('title') || 'Allsafe Electric').slice(0, 110);
  const eyebrow = (searchParams.get('eyebrow') || 'Residential electrician · Parker, CO').slice(0, 60);

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #024D80 0%, #0165AC 60%, #013A62 100%)',
          padding: '64px',
          fontFamily: 'sans-serif',
          color: '#fff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: 44,
              height: 44,
              background: '#008E6C',
              borderRadius: 8,
              display: 'flex',
            }}
          />
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 1 }}>ALLSAFE ELECTRIC</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ fontSize: 22, fontWeight: 600, color: '#BFE9DA' }}>{eyebrow}</div>
          <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.1, maxWidth: '960px' }}>
            {title}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 24,
            color: 'rgba(255,255,255,0.9)',
          }}
        >
          <span>allsafehomeservice.com</span>
          <span style={{ fontWeight: 700 }}>{business.phone.display}</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=604800, immutable' },
    }
  );
}
