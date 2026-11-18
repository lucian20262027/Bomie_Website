import Link from 'next/link';
import { ArrowLeft, ExternalLink, Mail, MapPin, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Founder — Lucian Wang | Bomie AI',
  description:
    'Meet Lucian Wang, Founder & CEO of Bomie AI (BOMIES LLC) in San Francisco, building America’s first AI Commerce OS for small businesses and local creators.',
};

export default function FounderPage() {
  return (
    <div className="min-h-screen bg-[#06060c] text-slate-200 selection:bg-violet-500 selection:text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#06060c]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3 group">
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
              href="/why-bomie/stories"
              className="hidden sm:inline-flex text-xs font-semibold text-slate-400 hover:text-white"
            >
              Bomie Stories
            </Link>
            <Link
              href="/why-bomie/research"
              className="hidden sm:inline-flex text-xs font-semibold text-slate-400 hover:text-white"
            >
              Bomie Research
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
        {/* Hero */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/35 bg-violet-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-violet-300">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            Why Bomie · Leadership
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Built for Main Street, by Builders Who Care.
          </h1>
          <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-slate-400">
            Meet the founder behind America&apos;s first AI Commerce OS built specifically for neighborhood small businesses and local creators.
          </p>
        </div>

        {/* Founder Spotlight Card */}
        <div className="rounded-3xl border border-violet-500/35 bg-gradient-to-br from-violet-950/45 via-[#0b0b16] to-slate-950 p-8 sm:p-10 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/10 pb-8">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-tr from-[#5b21b6] via-[#d946ef] to-[#fbbf24] text-2xl font-extrabold text-white shadow-xl shadow-violet-500/30">
                LW
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Lucian Wang</h2>
                <p className="mt-1 text-sm font-semibold text-violet-300">
                  Founder &amp; CEO · BOMIES LLC
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-amber-300" />
                    San Francisco, California
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                    U.S. Registered Entity
                  </span>
                </div>
              </div>
            </div>
            <span className="self-start rounded-full border border-emerald-400/35 bg-emerald-500/15 px-3.5 py-1.5 text-xs font-bold text-emerald-300">
              24h Founder Response SLA
            </span>
          </div>

          <div className="mt-8 space-y-5 text-base leading-relaxed text-slate-300">
            <p className="text-lg sm:text-xl font-medium text-white italic">
              &ldquo;We built Bomie AI so every neighborhood restaurant, spa, and boutique can harness the same AI creator engine as Fortune 500 brands—with zero technical complexity and full payment transparency.&rdquo;
            </p>
            <p>
              Across the United States, over 40 million small businesses power local culture and neighborhood jobs—yet most are priced out of enterprise influencer agencies or burned by opaque ad spend that never turns into real walk-in customers. Meanwhile, millions of talented local nano- and micro-creators spend hours sending cold DMs only to be ghosted.
            </p>
            <p>
              At Bomie AI, our mission is to replace friction with autonomous trust: combining hyper-local AI matching, 30-second creative co-creation, built-in FTC 16 CFR Part 255 compliance, and 30/40/30 milestone escrow so both small businesses and local creators prosper together.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 pt-4 border-t border-white/10">
            <a
              href="mailto:lucian.wang@bomie.ai"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs sm:text-sm font-bold text-slate-950 transition hover:bg-amber-50"
            >
              <Mail className="h-4 w-4 text-violet-600" />
              Email Lucian: lucian.wang@bomie.ai
            </a>
            <a
              href="https://www.linkedin.com/company/bomies"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-violet-400/40 bg-violet-500/15 px-5 py-3 text-xs sm:text-sm font-semibold text-violet-100 transition hover:bg-violet-500/25"
            >
              LinkedIn Company Page
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Principles */}
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              title: 'Zero Technical Friction',
              desc: 'Built for busy restaurant owners and creators—describe your goal in plain English and let AI handle matching and briefs.',
            },
            {
              title: '100% Payment Transparency',
              desc: 'During our MVP launch, Bomie charges $0 monthly fee and 0% platform commission, backed by 30/40/30 Stripe escrow.',
            },
            {
              title: 'Community Prosperity First',
              desc: 'Every dollar stays in the neighborhood—helping independent shops pack tables and local storytellers earn fairly.',
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-slate-950 p-6">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 mb-3" />
              <h3 className="text-base font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
