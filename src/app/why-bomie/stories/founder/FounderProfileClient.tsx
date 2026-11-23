'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

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

type LedgerFilter = 'ALL' | 'EXPERIENCE' | 'EDUCATION' | 'PUBLICATIONS';

const LEDGER_GROUPS: {
  num: string;
  key: 'EXPERIENCE' | 'EDUCATION' | 'PUBLICATIONS';
  name: string;
  entries: {
    title: string;
    detail: string;
    meta: string;
    href?: string;
    external?: boolean;
  }[];
}[] = [
  {
    num: '01',
    key: 'EXPERIENCE',
    name: 'Operating & Technical Track Record',
    entries: [
      {
        title: 'Founder & CEO — Bomie AI',
        detail: 'San Francisco, CA · Oct 2026 – Present',
        meta: 'Solo Technical Builder · AI Commerce OS · FTC Governance · 30/40/30 Escrow',
        href: '/demo',
      },
      {
        title: 'Global Seller Analytics & Platform Governance — TikTok (ByteDance)',
        detail: 'Marketplace Risk, Seller Health & Commerce Scale',
        meta: 'Scaled governance & operational analytics for 350K+ weekly active sellers',
      },
      {
        title: 'Founder & Operator — Cross-Border B2B Supply Chain',
        detail: 'Multi-City Commercial Operations (8 Cities)',
        meta: 'Unit Economics · Merchant Onboarding · Physical Commerce Execution',
      },
    ],
  },
  {
    num: '02',
    key: 'EDUCATION',
    name: 'Academic Foundation',
    entries: [
      {
        title: 'Babson College — MBA',
        detail: 'F.W. Olin Graduate School of Business · Ranked #1 in Entrepreneurship',
        meta: 'Entrepreneurial Thought & Action (ET&A) · Venture Scaling',
      },
      {
        title: "City St George's, University of London — MS in Computer Science",
        detail: 'Graduate Engineering & Distributed Systems',
        meta: 'Computer Science · Systems Engineering & Applied AI',
      },
      {
        title: 'University of Cambridge — Alumnus',
        detail: 'International Relations & Global Institutional Frameworks',
        meta: 'University of Cambridge PACE Alumnus',
      },
    ],
  },
  {
    num: '03',
    key: 'PUBLICATIONS',
    name: 'Published Work & Verified Records',
    entries: [
      {
        title: 'The 2026–2027 State of Main Street Creator Commerce (Bomie Research)',
        detail: 'Primary Industry Whitepaper · U.S. SBA & FTC 16 CFR Part 255 Study',
        meta: 'www.bomie.ai/why-bomie/research/main-street-creator-commerce-2026',
        href: '/why-bomie/research/main-street-creator-commerce-2026',
      },
      {
        title: 'Zenodo Permanent Academic Archive (DOI: 10.5281/zenodo.24410731)',
        detail: 'Open-Access CC BY 4.0 Citation Record',
        meta: 'https://doi.org/10.5281/zenodo.24410731',
        href: 'https://doi.org/10.5281/zenodo.24410731',
        external: true,
      },
      {
        title: 'Crunchbase & LinkedIn Executive Profile',
        detail: 'Bomie AI Ranked #1 Organization Search Result for "bomie"',
        meta: 'crunchbase.com/organization/bomie-ai · linkedin.com/in/lucianwang18',
        href: 'https://www.linkedin.com/in/lucianwang18',
        external: true,
      },
    ],
  },
];

export default function FounderProfileClient() {
  const [activeTabId, setActiveTabId] = useState<string>('governance');
  const [filter, setFilter] = useState<LedgerFilter>('ALL');

  const activeTab = FOUNDER_TABS.find((t) => t.id === activeTabId) ?? FOUNDER_TABS[0];

  const visibleGroups =
    filter === 'ALL' ? LEDGER_GROUPS : LEDGER_GROUPS.filter((g) => g.key === filter);

  return (
    <div className="min-h-screen bg-[#FBFBF8] text-[#3C2E2A] selection:bg-[#3C2E2A] selection:text-[#FBFBF8]">
      {/* Minimal Header with Level-2 Breadcrumb */}
      <header className="w-full border-b border-[#3C2E2A]/10 bg-[#FBFBF8]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 sm:px-10 h-[74px]">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#3C2E2A] text-[#FBFBF8] transition group-hover:opacity-85">
                <svg viewBox="0 0 512 512" fill="none" className="h-4 w-4">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M140 124C140 112.954 148.954 104 160 104H268C321.019 104 360 137.565 360 184C360 214.12 343.39 239.47 317.88 251.42C350.69 263.74 372 292.69 372 330C372 381.915 329.915 416 272 416H160C148.954 416 140 407.046 140 396V124ZM204 162V228H260C281.539 228 296 214.569 296 195C296 175.431 281.539 162 260 162H204ZM204 282V356H268C292.301 356 308 341.673 308 319C308 296.327 292.301 282 268 282H204Z"
                  />
                </svg>
              </div>
              <span className="text-base font-semibold tracking-tight text-[#3C2E2A]">
                BOMIE
              </span>
            </Link>

            <Link
              href="/why-bomie/stories"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#3C2E2A]/62 hover:text-[#3C2E2A] transition"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              MISSION &amp; FOUNDER
            </Link>
          </div>

          <a
            href="mailto:lucian.wang@bomie.ai"
            className="inline-flex items-center justify-center rounded-[10px] border border-[#3C2E2A]/35 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[#3C2E2A] transition hover:bg-[#3C2E2A] hover:text-[#FBFBF8]"
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
            <div className="relative aspect-square w-full overflow-hidden bg-[#2A201E]">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(circle at 75% 24%, rgba(251, 251, 248, 0.14) 0%, rgba(42, 32, 30, 0) 55%), linear-gradient(155deg, #211817 0%, #362926 55%, #1d1514 100%)',
                }}
              />
              {/* Soft Crescent Glow */}
              <div
                className="absolute right-[-12%] top-[-10%] h-[76%] w-[76%] rounded-full opacity-90 blur-[36px]"
                style={{
                  background:
                    'radial-gradient(circle at 68% 32%, #f4f1ea 0%, rgba(235, 228, 218, 0.48) 32%, rgba(42, 32, 30, 0) 72%)',
                }}
              />
              <div className="absolute right-[8%] top-[8%] h-[70%] w-[70%] rounded-full bg-[#2A201E] opacity-95 blur-[24px]" />

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
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#3C2E2A]/20 bg-[#3C2E2A]/[0.04] font-mono text-[10px] text-[#3C2E2A]/65">
                    01
                  </span>
                  <h1 className="text-[22px] sm:text-[25px] font-medium leading-[1.32] tracking-[-0.015em] text-[#3C2E2A]">
                    Lucian Wang — Founder &amp; CEO building autonomous AI infrastructure
                    for Main Street.
                  </h1>
                </div>

                <div className="pl-10 sm:pl-16 space-y-5 text-[15px] leading-[1.65] text-[#3C2E2A]/62">
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
                  <p className="text-[#3C2E2A]/80">
                    Based in the Bay Area, partnering with neighborhood operators and
                    creators nationwide.
                  </p>
                </div>

                <div className="pl-10 sm:pl-16 space-y-7 pt-2">
                  <div className="flex items-center gap-3.5">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#dc4a2d]" />
                    <h2 className="text-[17px] sm:text-[19px] font-medium tracking-[-0.01em] text-[#3C2E2A]">
                      Engineering rigor meets storefront reality
                    </h2>
                  </div>

                  <div className="flex flex-wrap items-center gap-7 pt-1">
                    <a
                      href="https://www.linkedin.com/in/lucianwang18"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#3C2E2A]/70 underline decoration-[#3C2E2A]/40 underline-offset-[6px] transition hover:text-[#3C2E2A]"
                    >
                      LINKEDIN PROFILE
                    </a>
                    <a
                      href="mailto:lucian.wang@bomie.ai"
                      className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#3C2E2A]/60 underline decoration-[#3C2E2A]/30 underline-offset-[6px] transition hover:text-[#3C2E2A]"
                    >
                      LUCIAN.WANG@BOMIE.AI
                    </a>
                    <Link
                      href="/why-bomie/stories"
                      className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#3C2E2A]/60 underline decoration-[#3C2E2A]/30 underline-offset-[6px] transition hover:text-[#3C2E2A]"
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
        <section className="mx-auto max-w-[1440px] px-6 sm:px-10 pt-24 sm:pt-32 pb-16">
          <div className="grid lg:grid-cols-12">
            <div className="lg:col-start-3 lg:col-span-6 flex items-start gap-4">
              <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#3C2E2A]/20 bg-[#3C2E2A]/[0.04] font-mono text-[10px] text-[#3C2E2A]/65">
                02
              </span>
              <h2 className="text-[22px] sm:text-[26px] font-medium leading-[1.3] tracking-[-0.015em] text-[#3C2E2A]">
                How builder conviction shapes every decision at Bomie.
              </h2>
            </div>
          </div>

          <div className="mt-14 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-[#EAECE6] p-7 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-[#3C2E2A]/15 bg-[#FBFBF8]/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#3C2E2A]">
                    {activeTab.badge}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#3C2E2A]/45">
                    OPERATING CODE
                  </span>
                </div>

                <svg viewBox="0 0 320 240" fill="none" className="w-full max-w-[290px] mx-auto opacity-80">
                  <rect x="44" y="44" width="232" height="152" rx="4" stroke="#3C2E2A" strokeWidth="1" strokeDasharray="3 4" />
                  <circle cx="160" cy="120" r="54" stroke="#3C2E2A" strokeWidth="1.2" />
                  <path d="M106 120 H214 M160 66 V174" stroke="#3C2E2A" strokeWidth="0.9" strokeOpacity="0.4" />
                  <circle
                    cx={activeTabId === 'governance' ? 160 : activeTabId === 'operator' ? 214 : activeTabId === 'builder' ? 160 : 106}
                    cy={activeTabId === 'governance' ? 66 : activeTabId === 'operator' ? 120 : activeTabId === 'builder' ? 174 : 120}
                    r="6"
                    fill="#dc4a2d"
                  />
                </svg>

                <div className="flex items-center justify-between border-t border-[#3C2E2A]/10 pt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[#3C2E2A]/55">
                  <span>CITY CS · BABSON MBA</span>
                  <span>CAMBRIDGE ALUMNUS</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7 space-y-8">
              <div role="tablist" className="flex flex-wrap gap-x-6 gap-y-3 border-b border-[#3C2E2A]/12 pb-5">
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
                          isActive
                            ? 'border-[#3C2E2A]/35 bg-[#3C2E2A]/10'
                            : 'border-[#3C2E2A]/15 bg-[#3C2E2A]/[0.04] group-hover:border-[#3C2E2A]/30'
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full transition ${
                            isActive ? 'bg-[#3C2E2A]' : 'bg-transparent'
                          }`}
                        />
                      </span>
                      <span
                        className={`text-sm font-medium transition ${
                          isActive ? 'text-[#3C2E2A]' : 'text-[#3C2E2A]/50 hover:text-[#3C2E2A]/80'
                        }`}
                      >
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="text-[19px] sm:text-[22px] leading-[1.45] tracking-[-0.01em] text-[#3C2E2A]/62">
                <span className="text-[#3C2E2A] font-medium">{activeTab.lead}</span>
                {activeTab.rest}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 03: Founder Record & Credentials Ledger */}
        <section className="mx-auto max-w-[1440px] px-6 sm:px-10 pt-20 pb-28">
          <div className="grid lg:grid-cols-12 mb-12">
            <div className="lg:col-start-3 lg:col-span-6 flex items-start gap-4">
              <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#3C2E2A]/20 bg-[#3C2E2A]/[0.04] font-mono text-[10px] text-[#3C2E2A]/65">
                03
              </span>
              <h2 className="text-[22px] sm:text-[26px] font-medium leading-[1.3] tracking-[-0.015em] text-[#3C2E2A]">
                Experience, academic record, and public artifacts.
              </h2>
            </div>
          </div>

          <div className="grid lg:grid-cols-12">
            <div className="lg:col-span-6 lg:col-start-7 space-y-10">
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { id: 'ALL', label: 'All' },
                    { id: 'EXPERIENCE', label: 'Experience' },
                    { id: 'EDUCATION', label: 'Education' },
                    { id: 'PUBLICATIONS', label: 'Published Work' },
                  ] as const
                ).map((chip) => {
                  const active = filter === chip.id;
                  return (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => setFilter(chip.id)}
                      className={`rounded-[10px] border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition cursor-pointer ${
                        active
                          ? 'border-[#3C2E2A] bg-[#3C2E2A] text-[#FBFBF8]'
                          : 'border-[#3C2E2A]/25 text-[#3C2E2A]/75 hover:border-[#3C2E2A]'
                      }`}
                    >
                      {chip.label}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-10">
                {visibleGroups.map((group) => (
                  <div
                    key={group.num}
                    className="border-t-2 border-dotted border-[#3C2E2A]/20 pt-7 space-y-6"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#3C2E2A]/20 bg-[#3C2E2A]/[0.04] font-mono text-[10px] text-[#3C2E2A]/65">
                        {group.num}
                      </span>
                      <h3 className="text-base font-medium text-[#3C2E2A]">
                        {group.name}
                      </h3>
                    </div>

                    <div className="space-y-5 pl-9">
                      {group.entries.map((entry) => {
                        const content = (
                          <div className="space-y-1">
                            <div className="inline-flex items-center gap-1.5 text-[16px] font-medium text-[#3C2E2A] group-hover:underline underline-offset-4">
                              <span>{entry.title}</span>
                              {entry.href && (
                                <ArrowUpRight className="h-3.5 w-3.5 opacity-55 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                              )}
                            </div>
                            <div className="text-xs text-[#3C2E2A]/62">{entry.detail}</div>
                            <div className="font-mono text-[11px] text-[#3C2E2A]/50">
                              {entry.meta}
                            </div>
                          </div>
                        );

                        if (entry.href && entry.external) {
                          return (
                            <a
                              key={entry.title}
                              href={entry.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group block"
                            >
                              {content}
                            </a>
                          );
                        }

                        if (entry.href) {
                          return (
                            <Link key={entry.title} href={entry.href} className="group block">
                              {content}
                            </Link>
                          );
                        }

                        return (
                          <div key={entry.title} className="block">
                            {content}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#3C2E2A]/12 bg-[#FBFBF8]">
        <div className="mx-auto flex max-w-[1440px] flex-col sm:flex-row items-center justify-between gap-4 px-6 sm:px-10 py-6 font-mono text-[11px] uppercase tracking-[0.12em] text-[#3C2E2A]/60">
          <span>© 2026 BOMIE AI · SAN FRANCISCO</span>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/why-bomie/stories" className="hover:text-[#3C2E2A]">
              MISSION &amp; FOUNDER
            </Link>
            <Link href="/demo" className="hover:text-[#3C2E2A]">
              LIVE DEMO
            </Link>
            <Link href="/why-bomie/research" className="hover:text-[#3C2E2A]">
              RESEARCH
            </Link>
            <Link href="/privacy" className="hover:text-[#3C2E2A]">
              PRIVACY
            </Link>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="https://www.linkedin.com/in/lucianwang18"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#3C2E2A]"
            >
              LINKEDIN
            </a>
            <a href="mailto:lucian.wang@bomie.ai" className="hover:text-[#3C2E2A]">
              EMAIL
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
