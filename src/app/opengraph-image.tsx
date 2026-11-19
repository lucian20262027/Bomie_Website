import { ImageResponse } from 'next/og';

export const alt = 'Bomie AI — Where Local Businesses Meet Booming Creators';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#06060c',
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(124, 58, 237, 0.35), transparent 45%), radial-gradient(circle at 80% 80%, rgba(217, 70, 239, 0.28), transparent 45%), radial-gradient(circle at 50% 100%, rgba(251, 191, 36, 0.16), transparent 50%)',
          padding: '56px 68px',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top Row: Bespoke B✦ Brand + Pill */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '18px',
                backgroundImage: 'linear-gradient(135deg, #5b21b6 0%, #d946ef 50%, #fbbf24 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '36px',
                fontWeight: 900,
                color: '#ffffff',
              }}
            >
              B
            </div>
            <div style={{ fontSize: '34px', fontWeight: 800, letterSpacing: '-0.02em' }}>
              bomie.ai
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: '9999px',
              border: '1px solid rgba(167, 139, 250, 0.45)',
              backgroundColor: 'rgba(139, 92, 246, 0.14)',
              padding: '10px 22px',
              fontSize: '18px',
              fontWeight: 600,
              color: '#ddd6fe',
            }}
          >
            North America&apos;s First AI Commerce OS
          </div>
        </div>

        {/* Center Hero Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div
            style={{
              fontSize: '68px',
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>Where Local Businesses Meet</span>
            <span
              style={{
                backgroundImage: 'linear-gradient(90deg, #a78bfa 0%, #f472b6 50%, #fde047 100%)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Booming Creators
            </span>
          </div>
          <div style={{ fontSize: '24px', color: '#cbd5e1', maxWidth: '920px', lineHeight: 1.4 }}>
            AI Smart Matching · 4-Stage Autonomous Campaign OS · Built-In FTC Compliance &amp; 30/40/30 Escrow
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255,255,255,0.12)',
            paddingTop: '24px',
            fontSize: '20px',
            color: '#94a3b8',
          }}
        >
          <div style={{ display: 'flex', gap: '36px' }}>
            <span style={{ color: '#f8fafc', fontWeight: 700 }}>San Francisco</span>
            <span style={{ color: '#f8fafc', fontWeight: 700 }}>Los Angeles</span>
            <span style={{ color: '#f8fafc', fontWeight: 700 }}>Seattle</span>
            <span style={{ color: '#f8fafc', fontWeight: 700 }}>Las Vegas</span>
          </div>
          <div style={{ color: '#fde047', fontWeight: 700 }}>First Platform in North America</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
