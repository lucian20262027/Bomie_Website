'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface FounderTab {
  id: string;
  label: string;
  badge: string;
  lead: string;
  rest: string;
}

const FOUNDER_TABS: FounderTab[] = [
  {
    id: 'governance',
    label: 'Marketplace Governance',
    badge: 'PRINCIPLE · 01',
    lead: 'Scaling systems for 350K+ weekly active sellers taught one non-negotiable lesson:',
    rest: ' trust cannot be bolted on after launch. Automated pre-flight compliance, transparent fee structures, and enforceable milestone escrow must sit at the core of local commerce.',
  },
  {
    id: 'operator',
    label: 'Operator Empathy',
    badge: 'PRINCIPLE · 02',
    lead: 'Operating cross-border B2B supply chains across eight cities meant living real merchant margins every day.',
    rest: ' Independent restaurants, cafes, and salons do not fail because they lack ambition—they fail because enterprise SaaS assumes staff hours they simply do not have.',
  },
  {
    id: 'builder',
    label: 'Full-Stack Velocity',
    badge: 'PRINCIPLE · 03',
    lead: 'Engineering and GTM belong in the same feedback loop.',
    rest: ' Building Bomie AI end-to-end—from Gemini compliance orchestration and geo-matching algorithms to production settlement architecture—keeps shipping cycles measured in days, not quarters.',
  },
  {
    id: 'research',
    label: 'Research Rigor',
    badge: 'PRINCIPLE · 04',
    lead: 'Every product thesis should stand up to public empirical scrutiny.',
    rest: ' Our 2026–2027 Main Street Creator Commerce report synthesizes U.S. SBA advocacy benchmarks and FTC 16 CFR Part 255 statutes—permanently archived with a public Zenodo DOI.',
  },
];

const PALETTE = {
  pageBg: 'bg-[#f7f4ff] text-[#161224] selection:bg-[#161224] selection:text-[#f7f4ff]',
  header: 'border-b border-[#161224]/10 bg-[#f7f4ff]',
  logoBox: 'bg-[#161224] text-[#f7f4ff]',
  ink: 'text-[#161224]',
  mutedNav: 'text-[#161224]/62 hover:text-[#161224]',
  ctaBtn: 'border-[#161224]/30 text-[#161224] hover:bg-[#161224] hover:text-[#f7f4ff]',
  orbBg: 'bg-[#1E1535]',
  orbAtmosphere:
    'radial-gradient(circle at 75% 24%, rgba(235, 227, 255, 0.20) 0%, rgba(30, 21, 53, 0) 55%), linear-gradient(155deg, #171029 0%, #2A1D4B 55%, #140E24 100%)',
  orbCrescent:
    'radial-gradient(circle at 68% 32%, #F6F2FF 0%, rgba(221, 210, 255, 0.56) 32%, rgba(30, 21, 53, 0) 72%)',
  orbMask: 'bg-[#1E1535]',
  badge: 'border-[#161224]/20 bg-[#161224]/[0.04] text-[#161224]/65',
  prose: 'text-[#161224]/65',
  proseStrong: 'text-[#161224]/85',
  dotBg: 'bg-[#6D28D9]',
  dotHex: '#6D28D9',
  svgStroke: '#161224',
  linkPrimary: 'text-[#161224]/75 decoration-[#161224]/40 hover:text-[#161224]',
  linkSecondary: 'text-[#161224]/60 decoration-[#161224]/30 hover:text-[#161224]',
  cardBg: 'bg-[#ECE6FC]',
  cardBadge: 'border-[#161224]/15 bg-[#f7f4ff]/85 text-[#161224]',
  cardSubtle: 'text-[#161224]/48',
  cardFooterBorder: 'border-[#161224]/10 text-[#161224]/55',
  tabDivider: 'border-[#161224]/12',
  tabActiveRing: 'border-[#6D28D9]/45 bg-[#6D28D9]/10',
  tabIdleRing: 'border-[#161224]/15 bg-[#161224]/[0.04] group-hover:border-[#6D28D9]/35',
  tabActiveDot: 'bg-[#6D28D9]',
  tabIdleText: 'text-[#161224]/50 hover:text-[#161224]/80',
  chipActive: 'border-[#161224] bg-[#161224] text-[#f7f4ff]',
  chipIdle: 'border-[#161224]/22 text-[#161224]/75 hover:border-[#161224]',
  dottedRule: 'border-[#161224]/18',
  metaFaint: 'text-[#161224]/50',
  footer: 'border-t border-[#161224]/12 bg-[#f7f4ff]',
  footerText: 'text-[#161224]/60',
} as const;

export default function FounderProfileClient() {
  const [activeTabId, setActiveTabId] = useState<string>('governance');

  const p = PALETTE;
  const activeTab = FOUNDER_TABS.find((t) => t.id === activeTabId) ?? FOUNDER_TABS[0];

  return (
    <div className={`min-h-screen ${p.pageBg}`}>
      {/* Minimal Header with Level-2 Breadcrumb */}
      <header className={`w-full ${p.header}`}>
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 sm:px-10 h-[74px]">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${p.logoBox} transition group-hover:opacity-85`}>
                <svg viewBox="0 0 512 512" fill="none" className="h-4 w-4">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M140 124C140 112.954 148.954 104 160 104H268C321.019 104 360 137.565 360 184C360 214.12 343.39 239.47 317.88 251.42C350.69 263.74 372 292.69 372 330C372 381.915 329.915 416 272 416H160C148.954 416 140 407.046 140 396V124ZM204 162V228H260C281.539 228 296 214.569 296 195C296 175.431 281.539 162 260 162H204ZM204 282V356H268C292.301 356 308 341.673 308 319C308 296.327 292.301 282 268 282H204Z"
                  />
                </svg>
              </div>
              <span className={`text-base font-semibold tracking-tight ${p.ink}`}>
                BOMIE
              </span>
            </Link>

            <Link
              href="/why-bomie/stories"
              className={`inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition ${p.mutedNav}`}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              MISSION &amp; FOUNDER
            </Link>
          </div>

          <a
            href="mailto:lucian.wang@bomie.ai"
            className={`inline-flex items-center justify-center rounded-[10px] border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition ${p.ctaBtn}`}
          >
            CONTACT FOUNDER
          </a>
        </div>
      </header>

      <main>
        {/* SECTION 01: Founder Profile 50/50 Split Hero */}
        <section className="mx-auto max-w-[1440px]">
          <div className="grid lg:grid-cols-2">
            {/* Left 1:1 Matte Dark Horizon Panel */}
            <div className={`relative aspect-square w-full overflow-hidden ${p.orbBg}`}>
              <div
                className="absolute inset-0"
                style={{
                  background: p.orbAtmosphere,
                }}
              />
              {/* Soft Crescent Glow */}
              <div
                className="absolute right-[-12%] top-[-10%] h-[76%] w-[76%] rounded-full opacity-90 blur-[36px]"
                style={{
                  background: p.orbCrescent,
                }}
              />
              <div className={`absolute right-[8%] top-[8%] h-[70%] w-[70%] rounded-full ${p.orbMask} opacity-95 blur-[24px]`} />

              {/* Subtle Archival Monogram Stamp */}
              <div className="relative z-10 flex h-full flex-col justify-between p-8 sm:p-10">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#FBFBF8]/45">
                  FOUNDER PROFILE · 01
                </div>
                <div className="space-y-2">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#FBFBF8]/25 font-mono text-sm font-semibold tracking-widest text-[#FBFBF8]/85">
                    LW
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#FBFBF8]/50">
                    LUCIAN WANG · SAN FRANCISCO, CA
                  </div>
                </div>
              </div>
            </div>

            {/* Right Editorial Manifesto Column */}
            <div className="flex flex-col justify-center px-6 py-14 sm:px-12 lg:px-16 lg:py-20">
              <div className="mx-auto w-full max-w-lg space-y-10">
                <div className="flex items-start gap-4">
                  <span className={`mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono text-[10px] ${p.badge}`}>
                    01
                  </span>
                  <h1 className={`text-[22px] sm:text-[25px] font-medium leading-[1.32] tracking-[-0.015em] ${p.ink}`}>
                    Lucian Wang — Founder &amp; CEO building autonomous AI infrastructure
                    for Main Street.
                  </h1>
                </div>

                <div className={`pl-10 sm:pl-16 space-y-5 text-[15px] leading-[1.65] ${p.prose}`}>
                  <p>
                    Before founding Bomie AI in San Francisco, I led global seller
                    analytics and platform governance at TikTok (ByteDance), scaling
                    trust and operational systems across 350K+ weekly active sellers.
                    Earlier, I built and ran a cross-border B2B supply-chain business
                    across eight cities.
                  </p>
                  <p>
                    With a background spanning an MS in Computer Science (City St
                    George&apos;s, University of London), an MBA (Babson College), and
                    alumni study at the University of Cambridge, I architect and ship Bomie
                    end-to-end—combining strict marketplace governance with real-world
                    merchant empathy.
                  </p>
                  <p className={p.proseStrong}>
                    Based in the Bay Area, partnering with neighborhood operators and
                    creators nationwide.
                  </p>
                </div>

                <div className="pl-10 sm:pl-16 space-y-7 pt-2">
                  <div className="flex items-center gap-3.5">
                    <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${p.dotBg}`} />
                    <h2 className={`text-[17px] sm:text-[19px] font-medium tracking-[-0.01em] ${p.ink}`}>
                      Engineering rigor meets storefront reality
                    </h2>
                  </div>

                  <div className="flex flex-wrap items-center gap-7 pt-1">
                    <a
                      href="https://www.linkedin.com/in/lucianwang18"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`font-mono text-[11px] uppercase tracking-[0.16em] underline underline-offset-[6px] transition ${p.linkPrimary}`}
                    >
                      LINKEDIN PROFILE
                    </a>
                    <a
                      href="mailto:lucian.wang@bomie.ai"
                      className={`font-mono text-[11px] uppercase tracking-[0.16em] underline underline-offset-[6px] transition ${p.linkSecondary}`}
                    >
                      LUCIAN.WANG@BOMIE.AI
                    </a>
                    <Link
                      href="/why-bomie/stories"
                      className={`font-mono text-[11px] uppercase tracking-[0.16em] underline underline-offset-[6px] transition ${p.linkSecondary}`}
                    >
                      ← MISSION
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 02: Tabbed Founder Operating Principles */}
        <section className="mx-auto max-w-[1440px] px-6 sm:px-10 pt-24 sm:pt-32 pb-24 sm:pb-28">
          <div className="grid lg:grid-cols-12">
            <div className="lg:col-start-3 lg:col-span-6 flex items-start gap-4">
              <span className={`mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono text-[10px] ${p.badge}`}>
                02
              </span>
              <h2 className={`text-[22px] sm:text-[26px] font-medium leading-[1.3] tracking-[-0.015em] ${p.ink}`}>
                How builder conviction shapes every decision at Bomie.
              </h2>
            </div>
          </div>

          <div className="mt-14 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-5">
              <div className={`relative aspect-square w-full overflow-hidden rounded-sm ${p.cardBg} p-7 flex flex-col justify-between`}>
                <div className="flex items-center justify-between">
                  <span className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${p.cardBadge}`}>
                    {activeTab.badge}
                  </span>
                  <span className={`font-mono text-[10px] uppercase tracking-[0.14em] ${p.cardSubtle}`}>
                    OPERATING CODE
                  </span>
                </div>

                <svg viewBox="0 0 320 240" fill="none" className="w-full max-w-[290px] mx-auto opacity-80">
                  <rect x="44" y="44" width="232" height="152" rx="4" stroke={p.svgStroke} strokeWidth="1" strokeDasharray="3 4" />
                  <circle cx="160" cy="120" r="54" stroke={p.svgStroke} strokeWidth="1.2" />
                  <path d="M106 120 H214 M160 66 V174" stroke={p.svgStroke} strokeWidth="0.9" strokeOpacity="0.4" />
                  <circle
                    cx={activeTabId === 'governance' ? 160 : activeTabId === 'operator' ? 214 : activeTabId === 'builder' ? 160 : 106}
                    cy={activeTabId === 'governance' ? 66 : activeTabId === 'operator' ? 120 : activeTabId === 'builder' ? 174 : 120}
                    r="6"
                    fill={p.dotHex}
                  />
                </svg>

                <div className={`flex items-center justify-between border-t pt-3 font-mono text-[10px] uppercase tracking-[0.14em] ${p.cardFooterBorder}`}>
                  <span>CITY CS · BABSON MBA</span>
                  <span>CAMBRIDGE ALUMNUS</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7 space-y-8">
              <div role="tablist" className={`flex flex-wrap gap-x-6 gap-y-3 border-b ${p.tabDivider} pb-5`}>
                {FOUNDER_TABS.map((tab) => {
                  const isActive = tab.id === activeTabId;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveTabId(tab.id)}
                      className="inline-flex items-center gap-2.5 text-left transition cursor-pointer group"
                    >
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full border transition ${
                          isActive ? p.tabActiveRing : p.tabIdleRing
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full transition ${
                            isActive ? p.tabActiveDot : 'bg-transparent'
                          }`}
                        />
                      </span>
                      <span
                        className={`text-sm font-medium transition ${
                          isActive ? p.ink : p.tabIdleText
                        }`}
                      >
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className={`text-[19px] sm:text-[22px] leading-[1.45] tracking-[-0.01em] ${p.prose}`}>
                <span className={`${p.ink} font-medium`}>{activeTab.lead}</span>
                {activeTab.rest}
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={p.footer}>
        <div className={`mx-auto flex max-w-[1440px] flex-col sm:flex-row items-center justify-between gap-4 px-6 sm:px-10 py-6 font-mono text-[11px] uppercase tracking-[0.12em] ${p.footerText}`}>
          <span>© 2026 BOMIE AI · SAN FRANCISCO</span>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/why-bomie/stories" className="hover:opacity-100">
              MISSION &amp; FOUNDER
            </Link>
            <Link href="/demo" className="hover:opacity-100">
              LIVE DEMO
            </Link>
            <Link href="/why-bomie/research" className="hover:opacity-100">
              RESEARCH
            </Link>
            <Link href="/privacy" className="hover:opacity-100">
              PRIVACY
            </Link>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="https://www.linkedin.com/in/lucianwang18"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100"
            >
              LINKEDIN
            </a>
            <a href="mailto:lucian.wang@bomie.ai" className="hover:opacity-100">
              EMAIL
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
