'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface ReportEntry {
  tag: string;
  title: string;
  summary: string;
  status: string;
  readTime: string;
  href?: string;
}

const REPORTS: ReportEntry[] = [
  {
    tag: 'Flagship Report · Q4 2026 / 2027 Outlook',
    title: 'The 2026–2027 State of Main Street Creator Commerce',
    summary:
      'An industry report synthesizing U.S. SBA 2026 small business demographics (36.2M firms, 82.3% nonemployers) and FTC 16 CFR Part 255 compliance standards to show why hyper-local AI orchestration and 30/40/30 Stripe escrow replace traditional agency retainers.',
    status: 'Published · Full Report',
    readTime: '14 MIN · DOI 10.5281/zenodo.24410731',
    href: '/why-bomie/research/main-street-creator-commerce-2026',
  },
  {
    tag: 'Benchmark Brief · Q4 2026',
    title: 'Why 2K–50K Neighborhood Creators Outperform Broad Paid Ads for Local Dining & Spas',
    summary:
      'City showcase benchmarks across San Francisco, Los Angeles, Seattle, and Las Vegas examining QR redemption workflows, trade-radius matching, and offline store visit attribution.',
    status: 'Published Summary',
    readTime: '6 MIN · SF / LA / SEA / LV',
  },
  {
    tag: 'Compliance Whitepaper',
    title: 'Automating FTC 16 CFR Part 255 Endorsement Governance for Main Street Businesses',
    summary:
      'How multi-agent pre-flight auditing checks #ad disclosures, medical/spa efficacy claims, and commercial audio licensing risks before content goes live.',
    status: 'Published Summary',
    readTime: '8 MIN · STATUTORY FRAMEWORK',
  },
  {
    tag: 'Upcoming Field Study · 2027',
    title: 'The State of AI Adoption Among North America’s 40M+ Small Businesses: Chat-First vs. Dashboards',
    summary:
      'Ongoing field research on why non-technical storefront owners prefer natural-language AI workflows and milestone escrow over traditional SaaS ad managers.',
    status: 'In Progress',
    readTime: '2027 RELEASE',
  },
];

export default function ResearchClient() {
  const flagship = REPORTS[0];
  const secondary = REPORTS.slice(1);

  return (
    <div className="min-h-screen bg-[#f7f4ff] text-[#161224] selection:bg-[#161224] selection:text-[#f7f4ff]">
      {/* Unified Editorial Top Navigation (matching Mission & Founder) */}
      <header className="w-full border-b border-[#161224]/10 bg-[#f7f4ff]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 sm:px-10 h-[74px]">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#161224] text-[#f7f4ff] transition group-hover:opacity-85">
                <svg viewBox="0 0 512 512" fill="none" className="h-4 w-4">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M140 124C140 112.954 148.954 104 160 104H268C321.019 104 360 137.565 360 184C360 214.12 343.39 239.47 317.88 251.42C350.69 263.74 372 292.69 372 330C372 381.915 329.915 416 272 416H160C148.954 416 140 407.046 140 396V124ZM204 162V228H260C281.539 228 296 214.569 296 195C296 175.431 281.539 162 260 162H204ZM204 282V356H268C292.301 356 308 341.673 308 319C308 296.327 292.301 282 268 282H204Z"
                  />
                </svg>
              </div>
              <span className="text-base font-semibold tracking-tight text-[#161224]">
                BOMIE
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-7 text-[13px] text-[#161224]/62">
              <Link href="/commerce-os" className="hover:text-[#161224] transition">
                Commerce OS
              </Link>
              <Link href="/why-bomie/stories" className="hover:text-[#161224] transition">
                Mission
              </Link>
              <Link href="/why-bomie/stories/founder" className="hover:text-[#161224] transition">
                Founder
              </Link>
              <Link href="/why-bomie/research" className="text-[#161224] font-medium">
                Research
              </Link>
            </nav>
          </div>

          <Link
            href="/demo"
            className="inline-flex items-center justify-center rounded-[10px] border border-[#161224]/30 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[#161224] transition hover:bg-[#161224] hover:text-[#f7f4ff]"
          >
            LIVE SANDBOX
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px]">
        {/* SECTION 01: Editorial Index Header */}
        <section className="px-6 sm:px-10 pt-11 pb-10 border-b border-dotted border-[#161224]/20">
          <div className="grid lg:grid-cols-12">
            <div className="lg:col-start-3 lg:col-span-7 space-y-2.5">
              <h1 className="text-[24px] sm:text-[30px] font-medium leading-[1.25] tracking-[-0.02em] text-[#161224]">
                Bomie Research — Small Business &amp; Local Creator Economy
              </h1>
              <p className="max-w-xl text-[15px] leading-[1.6] text-[#161224]/65">
                Field studies, neighborhood ROI benchmarks, and FTC 16 CFR Part 255
                compliance whitepapers from the Bomie AI research team in San Francisco.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 02: Asymmetric 50/50 Dotted-Split Reading Canvas */}
        <section className="grid lg:grid-cols-2 lg:divide-x lg:divide-dotted lg:divide-[#161224]/20 border-b border-dotted border-[#161224]/20">
          {/* Left Column: Flagship Monograph Feature (compact 16:9 visual keeps title + CTA above fold) */}
          <div className="px-6 sm:px-12 lg:px-16 py-10 lg:py-12 space-y-6">
            <Link href={flagship.href!} className="group block">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-[#18102B] p-7 flex flex-col justify-between">
                <div
                  className="absolute inset-0 transition duration-500 group-hover:scale-[1.02]"
                  style={{
                    background:
                      'radial-gradient(circle at 68% 18%, rgba(226, 217, 255, 0.24) 0%, rgba(24, 16, 43, 0) 56%), linear-gradient(160deg, #150E26 0%, #241942 52%, #130C22 100%)',
                  }}
                />
                {/* Soft Upper-Right Lunar Halo (kept clear of bottom metric typography) */}
                <div
                  className="absolute right-[-6%] top-[-22%] h-[68%] w-[56%] rounded-full opacity-75 blur-[36px]"
                  style={{
                    background:
                      'radial-gradient(circle at 55% 40%, #F4F0FF 0%, rgba(221, 210, 255, 0.34) 38%, rgba(24, 16, 43, 0) 74%)',
                  }}
                />
                <div className="relative z-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-[#F6F2FF]/70">
                  <span>BOMIE RESEARCH · MONOGRAPH</span>
                  <span>Q4 2026 / 2027</span>
                </div>

                <div className="relative z-10 grid grid-cols-3 gap-4 border-t border-[#F6F2FF]/15 bg-[#150E26]/45 pt-4 text-[#F6F2FF] rounded-xs">
                  <div>
                    <div className="text-xl sm:text-2xl font-medium tracking-tight">36.2M</div>
                    <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[#F6F2FF]/65">
                      U.S. SMB FIRMS
                    </div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-medium tracking-tight">82.3%</div>
                    <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[#F6F2FF]/65">
                      NONEMPLOYERS
                    </div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-medium tracking-tight">30/40/30</div>
                    <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[#F6F2FF]/65">
                      STRIPE ESCROW
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <div className="space-y-3.5">
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[#161224]/55">
                <span className="h-2 w-2 rounded-full bg-[#6D28D9]" />
                <span>{flagship.tag}</span>
              </div>

              <h2 className="text-[22px] sm:text-[25px] font-medium leading-[1.3] tracking-[-0.015em] text-[#161224]">
                <Link href={flagship.href!} className="hover:underline underline-offset-4">
                  {flagship.title}
                </Link>
              </h2>

              <p className="text-[15px] leading-[1.65] text-[#161224]/65">
                {flagship.summary}
              </p>

              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#161224]/48">
                {flagship.readTime}
              </div>

              <div className="pt-2">
                <Link
                  href={flagship.href!}
                  className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[#161224]/85 underline decoration-[#161224]/40 underline-offset-[6px] transition hover:text-[#161224] hover:decoration-[#161224]"
                >
                  <span>READ FULL REPORT OR DOWNLOAD PDF</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Secondary Text-First Briefings + Request Card */}
          <div className="px-6 sm:px-12 lg:px-16 py-10 lg:py-12 flex flex-col justify-between space-y-10">
            <div className="divide-y divide-dotted divide-[#161224]/18">
              {secondary.map((rep, idx) => (
                <article
                  key={rep.title}
                  className={idx === 0 ? 'pb-7 space-y-2.5' : 'py-7 space-y-2.5'}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.15em]">
                    <span className="text-[#6D28D9]">{rep.tag}</span>
                    <span className="text-[#161224]/50">{rep.status}</span>
                  </div>
                  <h2 className="text-[18px] sm:text-[20px] font-medium leading-[1.35] tracking-[-0.01em] text-[#161224]">
                    {rep.title}
                  </h2>
                  <p className="text-[14px] leading-[1.6] text-[#161224]/65">
                    {rep.summary}
                  </p>
                  <div className="pt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#161224]/45">
                    {rep.readTime}
                  </div>
                </article>
              ))}
            </div>

            <div className="rounded-sm bg-[#ECE6FC] p-7 space-y-3.5">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em] text-[#161224]/55">
                <span>PRESS &amp; EMPIRICAL DATA</span>
                <span>2027 COHORT</span>
              </div>
              <p className="text-[16px] font-medium leading-[1.45] text-[#161224]">
                Want early access to our upcoming 2027 U.S. Local Creator Report or raw
                benchmark tables?
              </p>
              <a
                href="mailto:lucian.wang@bomie.ai?subject=Request%20Bomie%20Research%20Report"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#161224]/80 underline decoration-[#161224]/35 underline-offset-[6px] transition hover:text-[#161224]"
              >
                REQUEST REPORT VIA EMAIL
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#f7f4ff]">
        <div className="mx-auto flex max-w-[1440px] flex-col sm:flex-row items-center justify-between gap-4 px-6 sm:px-10 py-6 font-mono text-[11px] uppercase tracking-[0.12em] text-[#161224]/60">
          <span>© 2026 BOMIE AI · SAN FRANCISCO</span>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/why-bomie/stories" className="hover:text-[#161224]">
              MISSION &amp; FOUNDER
            </Link>
            <Link href="/why-bomie/stories/founder" className="hover:text-[#161224]">
              FOUNDER PROFILE
            </Link>
            <Link href="/privacy" className="hover:text-[#161224]">
              PRIVACY
            </Link>
            <Link href="/terms" className="hover:text-[#161224]">
              TERMS
            </Link>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="https://www.linkedin.com/in/lucianwang18"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#161224]"
            >
              LINKEDIN
            </a>
            <a href="mailto:lucian.wang@bomie.ai" className="hover:text-[#161224]">
              EMAIL
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
