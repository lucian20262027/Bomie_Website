import Link from 'next/link';
import { ArrowLeft, BarChart3, BookOpen, FileText, ShieldCheck, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bomie Research — Local Business & Creator Economy Reports | Bomie AI',
  description:
    'Research insights, benchmarks, and upcoming whitepapers from Bomie AI on U.S. small business marketing ROI, nano-creator conversion, and FTC compliance.',
};

export default function BomieResearchPage() {
  const reports = [
    {
      tag: 'Benchmark Report · Q4 2026',
      title: 'Why 2K–50K Neighborhood Creators Outperform Broad Paid Ads by 3.6× for Local Dining & Spas',
      summary:
        'An empirical study across San Francisco, Los Angeles, Seattle, and Las Vegas analyzing QR redemption rates, foot-traffic lift, and cost-per-visit across 40+ local campaigns.',
      status: 'Published Summary',
    },
    {
      tag: 'Compliance Whitepaper',
      title: 'Automating FTC 16 CFR Part 255 Endorsement Governance for Main Street Businesses',
      summary:
        'How multi-agent AI auditing eliminates #ad disclosure misses, medical/spa claim risks, and commercial audio copyright strikes before content goes live.',
      status: 'Published Summary',
    },
    {
      tag: 'Upcoming Study · 2027',
      title: 'The State of AI Adoption Among America’s 40M+ Small Businesses: Chat-First vs. Dashboards',
      summary:
        'Field research on why non-technical storefront owners prefer natural-language AI workflows and milestone escrow over traditional SaaS ad managers.',
      status: 'In Progress',
    },
  ];

  return (
    <div className="min-h-screen bg-[#06060c] text-slate-200 selection:bg-violet-500 selection:text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#06060c]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#5b21b6] via-[#d946ef] to-[#fbbf24] shadow-md shadow-violet-500/30">
              <svg viewBox="0 0 512 512" fill="none" className="h-5 w-5">
                <path
                  fill="#ffffff"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M140 124C140 112.954 148.954 104 160 104H268C321.019 104 360 137.565 360 184C360 214.12 343.39 239.47 317.88 251.42C350.69 263.74 372 292.69 372 330C372 381.915 329.915 416 272 416H160C148.954 416 140 407.046 140 396V124ZM204 162V228H260C281.539 228 296 214.569 296 195C296 175.431 281.539 162 260 162H204ZM204 282V356H268C292.301 356 308 341.673 308 319C308 296.327 292.301 282 268 282H204Z"
                />
                <path
                  fill="#fef08a"
                  d="M396 76C399.5 103.5 412.5 116.5 440 120C412.5 123.5 399.5 136.5 396 164C392.5 136.5 379.5 123.5 352 120C379.5 116.5 392.5 103.5 396 76Z"
                />
              </svg>
            </div>
            <span className="text-lg font-extrabold tracking-tight text-white">bomie.ai</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/why-bomie/founder"
              className="hidden sm:inline-flex text-xs font-semibold text-slate-400 hover:text-white"
            >
              Founder
            </Link>
            <Link
              href="/why-bomie/stories"
              className="hidden sm:inline-flex text-xs font-semibold text-slate-400 hover:text-white"
            >
              Bomie Stories
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-16 space-y-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-300">
            <BookOpen className="h-3.5 w-3.5" />
            Why Bomie · Research Lab
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Bomie Research: Small Business &amp; Local Creator Economy
          </h1>
          <p className="max-w-3xl text-base sm:text-lg leading-relaxed text-slate-400">
            Field studies, neighborhood ROI benchmarks, and AI compliance whitepapers from the Bomie AI research team in San Francisco.
          </p>
        </div>

        <div className="space-y-5">
          {reports.map((rep) => (
            <div
              key={rep.title}
              className="rounded-3xl border border-white/10 bg-slate-950 p-7 sm:p-8 transition hover:border-violet-500/40"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-violet-300">
                  {rep.tag}
                </span>
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold text-amber-200">
                  {rep.status}
                </span>
              </div>
              <h2 className="mt-3 text-xl sm:text-2xl font-bold text-white">{rep.title}</h2>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{rep.summary}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-violet-500/30 bg-gradient-to-r from-violet-950/40 to-slate-950 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
              <ShieldCheck className="h-4 w-4" />
              Request Full PDF / Press Data
            </div>
            <h3 className="text-xl font-bold text-white">
              Want early access to our upcoming 2027 U.S. Local Creator Report?
            </h3>
          </div>
          <a
            href="mailto:lucian.wang@bomie.ai?subject=Request%20Bomie%20Research%20Report"
            className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs sm:text-sm font-bold text-slate-950 transition hover:bg-amber-50"
          >
            <FileText className="h-4 w-4 text-violet-600" />
            Request Report via Email
          </a>
        </div>
      </main>
    </div>
  );
}
