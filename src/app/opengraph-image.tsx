import { ImageResponse } from 'next/og';

export const alt = "Bomie AI — North America's First AI Commerce OS for Local Businesses & Creators";
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
          backgroundColor: '#f7f4ff',
          backgroundImage:
            'radial-gradient(circle at 18% 18%, rgba(139, 92, 246, 0.18), transparent 45%), radial-gradient(circle at 85% 82%, rgba(217, 70, 239, 0.14), transparent 45%), radial-gradient(circle at 50% 100%, rgba(251, 191, 36, 0.10), transparent 50%)',
          padding: '56px 68px',
          color: '#161224',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top Row: B✦ Brand + Pill */}
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
            <div style={{ fontSize: '34px', fontWeight: 800, letterSpacing: '-0.02em', color: '#161224' }}>
              bomie.ai
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: '9999px',
              border: '1px solid rgba(109, 40, 217, 0.25)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              padding: '10px 22px',
              fontSize: '18px',
              fontWeight: 700,
              color: '#5b21b6',
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
              color: '#161224',
            }}
          >
            <span>Where Local Businesses Meet</span>
            <span
              style={{
                backgroundImage: 'linear-gradient(90deg, #5b21b6 0%, #d946ef 55%, #f59e0b 100%)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Booming Creators
            </span>
          </div>
          <div style={{ fontSize: '24px', color: '#475569', maxWidth: '940px', lineHeight: 1.4 }}>
            AI Smart Matching · 30s Script Copilot · Built-In FTC Compliance &amp; 30/40/30 Escrow
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(109, 40, 217, 0.16)',
            paddingTop: '24px',
            fontSize: '20px',
          }}
        >
          <div style={{ display: 'flex', gap: '36px' }}>
            <span style={{ color: '#161224', fontWeight: 700 }}>San Francisco</span>
            <span style={{ color: '#161224', fontWeight: 700 }}>Los Angeles</span>
            <span style={{ color: '#161224', fontWeight: 700 }}>Seattle</span>
            <span style={{ color: '#161224', fontWeight: 700 }}>Las Vegas</span>
          </div>
          <div style={{ color: '#047857', fontWeight: 800 }}>MVP $0 Platform Fee</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
