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
    <div className="min-h-screen bg-[#f7f4ff] text-[#161224] selection:bg-violet-500 selection:text-[#161224]">
      <header className="sticky top-0 z-40 border-b border-violet-200/70 bg-[#f7f4ff]/85 backdrop-blur-xl">
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
            <span className="text-lg font-extrabold tracking-tight text-[#161224]">bomie.ai</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/why-bomie/stories"
              className="hidden sm:inline-flex text-xs font-semibold text-slate-600 hover:text-violet-950"
            >
              Bomie Stories
            </Link>
            <Link
              href="/why-bomie/research"
              className="hidden sm:inline-flex text-xs font-semibold text-slate-600 hover:text-violet-950"
            >
              Bomie Research
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-xl border border-violet-200/80 bg-white shadow-sm px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-violet-50 hover:text-violet-950"
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
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#161224]">
            Built for Main Street, by Builders Who Care.
          </h1>
          <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600">
            Meet the founder behind America&apos;s first AI Commerce OS built specifically for neighborhood small businesses and local creators.
          </p>
        </div>

        {/* Founder Spotlight Card */}
        <div className="rounded-3xl border border-violet-500/35 bg-gradient-to-br from-violet-100/70 via-white to-white p-8 sm:p-10 shadow-2xl">
          <div className="flex items-center gap-5 border-b border-violet-200/70 pb-8">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-tr from-[#5b21b6] via-[#d946ef] to-[#fbbf24] text-2xl font-extrabold text-white shadow-xl shadow-violet-500/30">
              LW
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#161224]">Lucian Wang</h2>
              <div className="mt-2 flex items-center gap-2.5">
                <a
                  href="mailto:lucian.wang@bomie.ai"
                  aria-label="Email lucian.wang@bomie.ai"
                  title="lucian.wang@bomie.ai"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-violet-200 bg-white text-violet-700 shadow-sm transition hover:border-violet-400 hover:bg-violet-50 hover:text-violet-950"
                >
                  <Mail className="h-4 w-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/lucianwang18"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Lucian Wang on LinkedIn"
                  title="LinkedIn"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-violet-200 bg-white text-[#0A66C2] shadow-sm transition hover:border-violet-400 hover:bg-violet-50"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-5 text-base leading-relaxed text-slate-600">
            <p className="text-lg sm:text-xl font-medium text-[#161224] italic">
              &ldquo;We built Bomie AI so every neighborhood restaurant, spa, and boutique can harness the same AI creator engine as Fortune 500 brands—with zero technical complexity and full payment transparency.&rdquo;
            </p>
            <p>
              Across the United States, over 40 million small businesses power local culture and neighborhood jobs—yet most are priced out of enterprise influencer agencies or burned by opaque ad spend that never turns into real walk-in customers. Meanwhile, millions of talented local nano- and micro-creators spend hours sending cold DMs only to be ghosted.
            </p>
            <p>
              At Bomie AI, our mission is to replace friction with autonomous trust: combining hyper-local AI matching, 30-second creative co-creation, built-in FTC 16 CFR Part 255 compliance, and 30/40/30 milestone escrow so both small businesses and local creators prosper together.
            </p>
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
            <div key={item.title} className="rounded-2xl border border-violet-200/70 bg-white shadow-sm p-6">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 mb-3" />
              <h3 className="text-base font-bold text-[#161224]">{item.title}</h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
