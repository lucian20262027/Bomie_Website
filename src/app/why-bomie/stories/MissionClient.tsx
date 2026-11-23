'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface OSPrincipleTab {
  id: string;
  label: string;
  badge: string;
  lead: string;
  rest: string;
}

const OS_TABS: OSPrincipleTab[] = [
  {
    id: 'zero-dashboard',
    label: 'Zero Dashboards',
    badge: 'BOMIE OS · 01',
    lead: 'Storefront owners spend 70 hours a week on craft and customers.',
    rest: ' Nobody running an independent restaurant, med-spa, or cafe wants another analytics tab. One plain-English brief triggers autonomous matching, scripting, governance, and settlement.',
  },
  {
    id: 'ftc-gate',
    label: 'FTC Pre-Flight',
    badge: 'BOMIE OS · 02',
    lead: 'Most small shops unwittingly trigger $50K+ FTC 16 CFR Part 255 exposure',
    rest: ' every time they comp a neighborhood creator a free dinner or treatment without clear #ad disclosures. Our multi-agent pre-flight gate audits disclosures, efficacy claims, and audio rights before anything goes live.',
  },
  {
    id: 'hyper-local',
    label: 'Hyper-Local Fit',
    badge: 'BOMIE OS · 03',
    lead: 'Out-of-state impressions do not pay Main Street rent.',
    rest: ' We rank 2K–50K neighborhood creators by real physical catchment density within 0.5 to 15 miles—pairing every 30-second storyboard with unique QR vouchers tracked at the storefront door.',
  },
  {
    id: 'escrow',
    label: 'Milestone Escrow',
    badge: 'BOMIE OS · 04',
    lead: 'Two-sided markets fail when neither side trusts upfront payment.',
    rest: ' Stripe-powered 30/40/30 milestone escrow gives merchants 100% pre-acceptance refund protection while guaranteeing neighborhood creators reliable, milestone-verified payouts.',
  },
];

type ChapterFilter = 'ALL' | 'CITIES' | 'SYSTEM' | 'LEADERSHIP';

interface MissionDirectoryItem {
  group: 'CITIES' | 'SYSTEM' | 'LEADERSHIP';
  title: string;
  metaLeft: string;
  metaRight: string;
  href: string;
  external?: boolean;
}

const DIRECTORY_GROUPS: {
  num: string;
  key: 'LEADERSHIP' | 'SYSTEM' | 'CITIES';
  name: string;
  items: MissionDirectoryItem[];
}[] = [
  {
    num: '01',
    key: 'LEADERSHIP',
    name: 'Leadership & Origin',
    items: [
      {
        group: 'LEADERSHIP',
        title: 'Founder Profile — Lucian Wang',
        metaLeft: 'San Francisco · Full-Stack Solo Builder',
        metaRight: 'TikTok Governance · City CS · Babson MBA · Cambridge',
        href: '/why-bomie/stories/founder',
      },
      {
        group: 'LEADERSHIP',
        title: '2026–2027 State of Main Street Creator Commerce Report',
        metaLeft: 'Published Nov 2026 · Public Research',
        metaRight: 'Zenodo DOI 10.5281/zenodo.24410731',
        href: '/why-bomie/research/main-street-creator-commerce-2026',
      },
    ],
  },
  {
    num: '02',
    key: 'SYSTEM',
    name: 'Core AI Infrastructure',
    items: [
      {
        group: 'SYSTEM',
        title: 'Interactive Pre-Flight Governance & Escrow Sandbox',
        metaLeft: 'Live Product Demo · Gemini Powered',
        metaRight: 'FTC 16 CFR Part 255 · 30/40/30 Escrow',
        href: '/demo',
      },
      {
        group: 'SYSTEM',
        title: 'Bomie Commerce OS Architecture',
        metaLeft: '4-Stage Autonomous Pipeline',
        metaRight: '0.5–15 mi Radius · 30s Script Copilot',
        href: '/commerce-os',
      },
    ],
  },
  {
    num: '03',
    key: 'CITIES',
    name: 'Neighborhood Playbooks',
    items: [
      {
        group: 'CITIES',
        title: 'San Francisco — Inner Sunset & Mission Dining Loops',
        metaLeft: 'Bay Area Launch Market',
        metaRight: 'Tracked QR Vouchers · Local Foodies',
        href: '/stories/sf',
      },
      {
        group: 'CITIES',
        title: 'Los Angeles — Silver Lake & Aesthetics Studios',
        metaLeft: 'Southern California',
        metaRight: 'Compliant Med-Spa & Wellness Flows',
        href: '/stories/la',
      },
      {
        group: 'CITIES',
        title: 'Seattle & Las Vegas — Craft Retail & Hospitality',
        metaLeft: 'Pacific Northwest & Southwest',
        metaRight: 'Verified Neighborhood Cohorts',
        href: '/stories/seattle',
      },
    ],
  },
];

export default function MissionClient() {
  const [activeTabId, setActiveTabId] = useState<string>('zero-dashboard');
  const [filter, setFilter] = useState<ChapterFilter>('ALL');

  const activeTab = OS_TABS.find((t) => t.id === activeTabId) ?? OS_TABS[0];

  const visibleGroups =
    filter === 'ALL'
      ? DIRECTORY_GROUPS
      : DIRECTORY_GROUPS.filter((g) => g.key === filter);

  return (
    <div className="min-h-screen bg-[#FBFBF8] text-[#3C2E2A] selection:bg-[#3C2E2A] selection:text-[#FBFBF8]">
      {/* Minimal Single-Row Header (non-sticky, editorial clean) */}
      <header className="w-full border-b border-[#3C2E2A]/10 bg-[#FBFBF8]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 sm:px-10 h-[74px]">
          <div className="flex items-center gap-10">
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

            <nav className="hidden md:flex items-center gap-7 text-[13px] text-[#3C2E2A]/62">
              <Link href="/commerce-os" className="hover:text-[#3C2E2A] transition">
                Commerce OS
              </Link>
              <Link href="/why-bomie/stories" className="text-[#3C2E2A] font-medium">
                Mission
              </Link>
              <Link
                href="/why-bomie/stories/founder"
                className="hover:text-[#3C2E2A] transition"
              >
                Founder
              </Link>
              <Link
                href="/why-bomie/research"
                className="hover:text-[#3C2E2A] transition"
              >
                Research
              </Link>
            </nav>
          </div>

          <Link
            href="/demo"
            className="inline-flex items-center justify-center rounded-[10px] border border-[#3C2E2A]/35 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[#3C2E2A] transition hover:bg-[#3C2E2A] hover:text-[#FBFBF8]"
          >
            LIVE SANDBOX
          </Link>
        </div>
      </header>

      <main>
        {/* SECTION 01: Moonshot 50/50 Split Hero */}
        <section className="mx-auto max-w-[1440px]">
          <div className="grid lg:grid-cols-2">
            {/* Left 1:1 Matte Charcoal-Espresso Crescent Orb Canvas */}
            <div className="relative aspect-square w-full overflow-hidden bg-[#312523]">
              {/* Atmospheric deep radial warmth */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(circle at 22% 78%, rgba(251, 251, 248, 0.16) 0%, rgba(49, 37, 35, 0) 58%), linear-gradient(145deg, #271d1b 0%, #3a2c29 55%, #231917 100%)',
                }}
              />
              {/* Diffused Luminous Lunar Crescent */}
              <div
                className="absolute left-[-8%] bottom-[-10%] h-[78%] w-[78%] rounded-full opacity-95 blur-[36px]"
                style={{
                  background:
                    'radial-gradient(circle at 32% 68%, #f5f2eb 0%, rgba(235, 228, 218, 0.58) 32%, rgba(49, 37, 35, 0) 70%)',
                }}
              />
              {/* Sharp Subtle Eclipse Rim Mask */}
              <div
                className="absolute left-[10%] bottom-[8%] h-[72%] w-[72%] rounded-full bg-[#312523] opacity-95 blur-[24px]"
              />
              <div className="absolute bottom-6 left-7 font-mono text-[10px] uppercase tracking-[0.18em] text-[#FBFBF8]/45">
                37.7749° N · MAIN STREET COMMERCE
              </div>
            </div>

            {/* Right Column: Indented Editorial Manifesto */}
            <div className="flex flex-col justify-center px-6 py-14 sm:px-12 lg:px-16 lg:py-20">
              <div className="mx-auto w-full max-w-lg space-y-10">
                {/* Badge 01 + Restrained Editorial H1 */}
                <div className="flex items-start gap-4">
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#3C2E2A]/20 bg-[#3C2E2A]/[0.04] font-mono text-[10px] text-[#3C2E2A]/65">
                    01
                  </span>
                  <h1 className="text-[22px] sm:text-[25px] font-medium leading-[1.32] tracking-[-0.015em] text-[#3C2E2A]">
                    We&apos;re a company of builders working on the hardest part of
                    applied AI: deploying it on Main Street at scale.
                  </h1>
                </div>

                {/* Narrow Indented Prose Column */}
                <div className="pl-10 sm:pl-16 space-y-5 text-[15px] leading-[1.65] text-[#3C2E2A]/62">
                  <p>
                    Most AI startups are built for Fortune 500 teams with dedicated
                    analysts and six-figure retainers. At Bomie, we are building for the
                    36.2 million small businesses—where 82.3% operate without a single paid
                    marketing employee. We care deeply about taking frontier multi-agent
                    systems out of enterprise slide decks and putting them to work for real
                    storefronts with real rent on the line.
                  </p>
                  <p>
                    From plain-English campaign intake to automated FTC 16 CFR Part 255
                    governance, hyper-local creator matching, and milestone-locked Stripe
                    escrow, we turn autonomous intelligence into neighborhood foot traffic.
                  </p>
                  <p className="text-[#3C2E2A]/80">
                    Headquartered in San Francisco, building across Los Angeles, Seattle,
                    and Las Vegas.
                  </p>
                </div>

                {/* Vermilion Dot Statement + Underlined Monospace CTA */}
                <div className="pl-10 sm:pl-16 space-y-7 pt-2">
                  <div className="flex items-center gap-3.5">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#dc4a2d]" />
                    <h2 className="text-[17px] sm:text-[19px] font-medium tracking-[-0.01em] text-[#3C2E2A]">
                      The operating layer for neighborhood commerce
                    </h2>
                  </div>

                  <div className="flex flex-wrap items-center gap-8 pt-1">
                    <Link
                      href="/why-bomie/stories/founder"
                      className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#3C2E2A]/70 underline decoration-[#3C2E2A]/40 underline-offset-[6px] transition hover:text-[#3C2E2A] hover:decoration-[#3C2E2A]"
                    >
                      FOUNDER PROFILE
                    </Link>
                    <Link
                      href="/why-bomie/research/main-street-creator-commerce-2026"
                      className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#3C2E2A]/55 underline decoration-[#3C2E2A]/30 underline-offset-[6px] transition hover:text-[#3C2E2A] hover:decoration-[#3C2E2A]"
                    >
                      READ 2026 REPORT
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 02: Offset Header + Interactive Sage-Stone Showcase */}
        <section className="mx-auto max-w-[1440px] px-6 sm:px-10 pt-24 sm:pt-32 pb-16">
          <div className="grid lg:grid-cols-12">
            <div className="lg:col-start-3 lg:col-span-6 flex items-start gap-4">
              <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#3C2E2A]/20 bg-[#3C2E2A]/[0.04] font-mono text-[10px] text-[#3C2E2A]/65">
                02
              </span>
              <h2 className="text-[22px] sm:text-[26px] font-medium leading-[1.3] tracking-[-0.015em] text-[#3C2E2A]">
                Why real-world Main Street autonomy requires more than a chat prompt.
              </h2>
            </div>
          </div>

          <div className="mt-14 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left 1:1 Sage-Stone Diagram Card */}
            <div className="lg:col-span-5">
              <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-[#EAECE6] p-7 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-[#3C2E2A]/15 bg-[#FBFBF8]/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#3C2E2A]">
                    {activeTab.badge}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#3C2E2A]/45">
                    BOMIE ENGINE
                  </span>
                </div>

                {/* Minimal Architectural Monochrome Geometry */}
                <svg viewBox="0 0 320 240" fill="none" className="w-full max-w-[300px] mx-auto opacity-80">
                  <circle cx="160" cy="120" r="88" stroke="#3C2E2A" strokeWidth="1" strokeDasharray="3 4" />
                  <circle cx="160" cy="120" r="56" stroke="#3C2E2A" strokeWidth="1.2" />
                  <circle cx="160" cy="120" r="22" stroke="#3C2E2A" strokeWidth="1.2" />
                  <line x1="40" y1="120" x2="280" y2="120" stroke="#3C2E2A" strokeWidth="0.9" strokeOpacity="0.45" />
                  <line x1="160" y1="16" x2="160" y2="224" stroke="#3C2E2A" strokeWidth="0.9" strokeOpacity="0.45" />
                  <circle
                    cx={activeTabId === 'zero-dashboard' ? 160 : activeTabId === 'ftc-gate' ? 216 : activeTabId === 'hyper-local' ? 104 : 160}
                    cy={activeTabId === 'zero-dashboard' ? 64 : activeTabId === 'ftc-gate' ? 120 : activeTabId === 'hyper-local' ? 120 : 176}
                    r="6"
                    fill="#dc4a2d"
                  />
                </svg>

                <div className="flex items-center justify-between border-t border-[#3C2E2A]/10 pt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[#3C2E2A]/55">
                  <span>FTC 16 CFR § 255.5</span>
                  <span>STRIPE 30 / 40 / 30</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Circular-Dot Tabs + Split Ink Paragraph */}
            <div className="lg:col-span-6 lg:col-start-7 space-y-8">
              <div role="tablist" className="flex flex-wrap gap-x-6 gap-y-3 border-b border-[#3C2E2A]/12 pb-5">
                {OS_TABS.map((tab) => {
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

              <div>
                <Link
                  href="/demo"
                  className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#3C2E2A]/70 underline decoration-[#3C2E2A]/35 underline-offset-[6px] hover:text-[#3C2E2A]"
                >
                  TEST LIVE PRE-FLIGHT GATE →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 03: Asymmetric Staggered 3-Photo Editorial Grid */}
        <section className="mx-auto max-w-[1440px] px-6 sm:px-10 pt-20 sm:pt-28 pb-20">
          <div className="grid lg:grid-cols-12 mb-16">
            <div className="lg:col-start-3 lg:col-span-6 flex items-start gap-4">
              <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#3C2E2A]/20 bg-[#3C2E2A]/[0.04] font-mono text-[10px] text-[#3C2E2A]/65">
                03
              </span>
              <h2 className="text-[22px] sm:text-[26px] font-medium leading-[1.3] tracking-[-0.015em] text-[#3C2E2A]">
                What we believe every independent storefront deserves.
              </h2>
            </div>
          </div>

          {/* Row 1: Staggered Portrait (Left Low) & Landscape (Right High) */}
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4 lg:mt-24 space-y-4">
              <div className="aspect-[4/5] w-full overflow-hidden rounded-sm bg-[#EAECE6]">
                <img
                  src="/images/pexels/312418.jpg"
                  alt="Independent coffee shop espresso craft"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-[15px] leading-[1.55] text-[#3C2E2A]/62">
                <strong className="font-medium text-[#3C2E2A] mr-2">
                  Conviction over complexity.
                </strong>
                Neighborhood operators win on hospitality and product—not ad-manager sliders.
                Every agent we ship removes manual coordination rather than adding another
                portal.
              </p>
            </div>

            <div className="lg:col-span-4 lg:col-start-7 space-y-4">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-sm bg-[#EAECE6]">
                <img
                  src="/images/pexels/262978.jpg"
                  alt="Local restaurant hospitality and neighborhood dining"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-[15px] leading-[1.55] text-[#3C2E2A]/62">
                <strong className="font-medium text-[#3C2E2A] mr-2">
                  Proof at the register.
                </strong>
                Vanity impressions never pay commercial rent. Tracked QR vouchers and
                2K–50K local creator cohorts tie campaign spend directly to real walk-in
                visits.
              </p>
            </div>
          </div>

          {/* Row 2: Wide Bottom-Right Panoramic Card */}
          <div className="mt-16 lg:mt-24 grid lg:grid-cols-12">
            <div className="lg:col-span-6 lg:col-start-7 space-y-4">
              <div className="aspect-[2/1] w-full overflow-hidden rounded-sm bg-[#EAECE6]">
                <img
                  src="/images/pexels/208745.jpg"
                  alt="San Francisco Golden Gate skyline"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-[15px] leading-[1.55] text-[#3C2E2A]/62">
                <strong className="font-medium text-[#3C2E2A] mr-2">
                  Built in San Francisco for every Main Street.
                </strong>
                Combining lessons from scaling 350K+ weekly active marketplace sellers with
                hands-on B2B storefront economics—so neighborhood businesses thrive alongside
                local creators.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 04: Filterable Directory & Dotted Ledger */}
        <section className="mx-auto max-w-[1440px] px-6 sm:px-10 pt-20 pb-28">
          <div className="grid lg:grid-cols-12 mb-12">
            <div className="lg:col-start-3 lg:col-span-6 flex items-start gap-4">
              <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#3C2E2A]/20 bg-[#3C2E2A]/[0.04] font-mono text-[10px] text-[#3C2E2A]/65">
                04
              </span>
              <h2 className="text-[22px] sm:text-[26px] font-medium leading-[1.3] tracking-[-0.015em] text-[#3C2E2A]">
                Explore the founder record, live system, and regional playbooks.
              </h2>
            </div>
          </div>

          <div className="grid lg:grid-cols-12">
            <div className="lg:col-span-6 lg:col-start-7 space-y-10">
              {/* Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { id: 'ALL', label: 'All' },
                    { id: 'LEADERSHIP', label: 'Founder & Research' },
                    { id: 'SYSTEM', label: 'AI Infrastructure' },
                    { id: 'CITIES', label: 'City Playbooks' },
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

              {/* Dotted Ledger Groups */}
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
                      {group.items.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="group block space-y-1"
                        >
                          <div className="inline-flex items-center gap-1.5 text-[16px] font-medium text-[#3C2E2A] group-hover:underline underline-offset-4">
                            <span>{item.title}</span>
                            <ArrowUpRight className="h-3.5 w-3.5 opacity-55 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </div>
                          <div className="text-xs text-[#3C2E2A]/62">{item.metaLeft}</div>
                          <div className="font-mono text-[11px] text-[#3C2E2A]/50">
                            {item.metaRight}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Minimal Horizontal Archival Footer */}
      <footer className="border-t border-[#3C2E2A]/12 bg-[#FBFBF8]">
        <div className="mx-auto flex max-w-[1440px] flex-col sm:flex-row items-center justify-between gap-4 px-6 sm:px-10 py-6 font-mono text-[11px] uppercase tracking-[0.12em] text-[#3C2E2A]/60">
          <span>© 2026 BOMIE AI · SAN FRANCISCO</span>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/why-bomie/stories/founder" className="hover:text-[#3C2E2A]">
              FOUNDER PROFILE
            </Link>
            <Link href="/why-bomie/research" className="hover:text-[#3C2E2A]">
              RESEARCH
            </Link>
            <Link href="/privacy" className="hover:text-[#3C2E2A]">
              PRIVACY
            </Link>
            <Link href="/terms" className="hover:text-[#3C2E2A]">
              TERMS
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
