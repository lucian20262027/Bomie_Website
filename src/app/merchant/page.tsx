'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Lock,
  ShieldCheck,
  Sparkles,
  Store,
  XCircle,
} from 'lucide-react';

export default function MerchantPage() {
  const [viewMode, setViewMode] = useState<'simple' | 'pro'>('simple');
  const [presetIdx, setPresetIdx] = useState<number>(0);
  const [customPrompt, setCustomPrompt] = useState<string>(
    'I run a Sichuan restaurant in San Francisco with a $1,800 budget. Match 4 local foodie creators to drive weekend dine-in traffic.'
  );

  const presets = [
    {
      label: '🍜 SF Restaurant ($1,800)',
      prompt:
        'I run a Sichuan restaurant in San Francisco with a $1,800 budget. Match 4 local foodie creators for weekend dine-in traffic.',
      title: 'Sichuan Bistro SF · Weekend Dine-In Plan',
      matched: '4 Local SF Foodie Creators (0.6–1.8 mi away)',
      reach: '52,000+ Local Views · Est. 114 Dine-In Tables',
      roas: '3.29x Projected ROAS',
      budget: '$1,800 Creator Budget · $0 Platform Fee (MVP Free)',
      stages: [
        { s: '01', name: 'Intake & Vision', detail: 'Brief Readiness 92% · Vision Fit 95%' },
        { s: '02', name: '3-Agent FTC Gate', detail: 'PASS · Risk 18/100 · #ad Locked' },
        { s: '03', name: 'Creator & 30s Script', detail: '4 Local Creators + Shot Checklist Ready' },
        { s: '04', name: 'ROI & 30/40/30 Escrow', detail: '3.29x ROAS · 100% Refundable Before Accept' },
      ],
    },
    {
      label: '✨ LA Skin & Spa ($2,200)',
      prompt:
        'I own a facial spa in Los Angeles with a $2,200 budget. Match 3 local beauty creators for new client bookings.',
      title: 'Lumina Skin & Spa LA · Client Booking Plan',
      matched: '3 Verified LA Beauty & Wellness Creators',
      reach: '41,000+ Targeted Views · Est. 68 Bookings',
      roas: '3.55x Projected ROAS',
      budget: '$2,200 Creator Budget · $0 Platform Fee (MVP Free)',
      stages: [
        { s: '01', name: 'Intake & Vision', detail: 'Brief Readiness 95% · Studio Fit 97%' },
        { s: '02', name: '3-Agent FTC Gate', detail: 'PASS · Claims Audited & Safe' },
        { s: '03', name: 'Creator & 30s Script', detail: '3 LA Beauty Creators + ASMR Script' },
        { s: '04', name: 'ROI & 30/40/30 Escrow', detail: '3.55x ROAS · QR Booking Attribution' },
      ],
    },
    {
      label: '🕯️ Local Craft Shop ($800)',
      prompt:
        'I sell handmade soy candles locally with an $800 budget. Match 3 neighborhood lifestyle creators.',
      title: 'Bloom Studio Candles · Neighborhood Drop Plan',
      matched: '3 Cozy Home Nano-Creators (0.5–2.1 mi away)',
      reach: '28,000+ Local Views · Tracked In-Store QR Codes',
      roas: '3.40x Projected ROAS',
      budget: '$800 Creator Budget · $0 Platform Fee (MVP Free)',
      stages: [
        { s: '01', name: 'Intake & Vision', detail: 'Brief Readiness 94% · Aesthetic Fit 96%' },
        { s: '02', name: '3-Agent FTC Gate', detail: 'PASS · Audio & Disclosure Cleared' },
        { s: '03', name: 'Creator & 30s Script', detail: '3 Nano-Creators + Cozy Home Shots' },
        { s: '04', name: 'ROI & 30/40/30 Escrow', detail: '3.40x ROAS · Auto-Payout on Post' },
      ],
    },
  ];

  const active = presets[presetIdx % presets.length];

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
              href="/creator"
              className="hidden sm:inline-flex text-xs font-semibold text-fuchsia-300 hover:text-white"
            >
              For Creators →
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

      <main className="mx-auto max-w-5xl px-6 py-14 space-y-16">
        {/* 1. Merchant Pain Points First */}
        <section className="space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/35 bg-violet-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-violet-300">
              <Store className="h-3.5 w-3.5" />
              For Local Merchants &amp; Storefronts
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Why Traditional Local Marketing Fails Small Businesses
            </h1>
            <p className="max-w-2xl text-base text-slate-400">
              You shouldn&apos;t have to burn thousands on broad ads or spend 15 hours a week DMing strangers just to fill weekend tables and appointments.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                title: 'Broad Social Ads Drain Margins',
                desc: 'Boosting posts reaches people 30 miles away who never walk into your neighborhood store.',
              },
              {
                title: 'Cold DMs & Agencies Don’t Scale',
                desc: 'Agencies charge $3K–$5K/mo retainers, while DMing local creators yourself leads to endless ghosting.',
              },
              {
                title: 'Zero FTC & Payout Protection',
                desc: 'Paying upfront via Venmo risks missed #ad disclosures, no-shows, and untracked ROI.',
              },
            ].map((pain) => (
              <div
                key={pain.title}
                className="rounded-3xl border border-rose-500/20 bg-gradient-to-b from-rose-950/20 to-slate-950 p-6 space-y-2.5"
              >
                <XCircle className="h-5 w-5 text-rose-400" />
                <h2 className="text-base font-bold text-white">{pain.title}</h2>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-400">{pain.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. How You Leverage Bomie AI (Interactive Demo) */}
        <section className="space-y-8 border-t border-white/10 pt-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-400">
                The Solution · Zero Technical Complexity
              </span>
              <h2 className="mt-1.5 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                How You Leverage Bomie AI in 30 Seconds
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-400">
                Type what you want to promote—Bomie AI matches nearby creators, writes scripts, checks FTC rules, and tracks walk-in ROI.
              </p>
            </div>
            <div className="inline-flex shrink-0 items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 text-xs">
              <button
                type="button"
                onClick={() => setViewMode('simple')}
                className={`rounded-full px-3.5 py-1.5 font-semibold transition ${
                  viewMode === 'simple' ? 'bg-white text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                ✨ Simple Chat Mode
              </button>
              <button
                type="button"
                onClick={() => setViewMode('pro')}
                className={`rounded-full px-3.5 py-1.5 font-semibold transition ${
                  viewMode === 'pro' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                ⚙️ 4-Stage Engine View
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-violet-400/30 bg-slate-950/90 p-6 sm:p-7 shadow-2xl space-y-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setPresetIdx((prev) => (prev + 1) % presets.length);
              }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                className="flex-1 rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3.5 text-sm text-white focus:border-violet-400 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3.5 text-sm font-bold text-white"
              >
                <Sparkles className="h-4 w-4" />
                Generate Campaign Plan
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-slate-500">Try a store example:</span>
              {presets.map((p, idx) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    setPresetIdx(idx);
                    setCustomPrompt(p.prompt);
                  }}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                    presetIdx === idx
                      ? 'border-violet-400/60 bg-violet-500/20 text-white'
                      : 'border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/15 bg-slate-950 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-5">
              <div>
                <span className="font-mono text-xs uppercase text-emerald-400">
                  ✓ Ready to Launch · MVP Limited-Time $0 Platform Fee
                </span>
                <h3 className="mt-1 text-2xl font-bold text-white">{active.title}</h3>
              </div>
              <span className="self-start rounded-full border border-amber-300/40 bg-amber-400/15 px-3.5 py-1 text-xs font-bold text-amber-200">
                {active.roas}
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-xs text-slate-400">1. AI Matched Creators</div>
                <div className="mt-1.5 text-sm font-bold text-white">{active.matched}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-xs text-slate-400">2. Expected Foot Traffic</div>
                <div className="mt-1.5 text-sm font-bold text-emerald-300">{active.reach}</div>
              </div>
              <div className="rounded-2xl border border-violet-400/30 bg-violet-500/10 p-4">
                <div className="text-xs text-violet-200">3. Transparent Terms</div>
                <div className="mt-1.5 text-sm font-bold text-white">{active.budget}</div>
                <div className="mt-1 text-[11px] text-slate-300">
                  100% refundable before creator accepts
                </div>
              </div>
            </div>

            {viewMode === 'pro' && (
              <div className="grid gap-3 sm:grid-cols-4 pt-2">
                {active.stages.map((st) => (
                  <div key={st.s} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                    <div className="font-mono text-[10px] text-violet-300">STAGE {st.s}</div>
                    <div className="mt-1 text-sm font-bold text-white">{st.name}</div>
                    <div className="mt-1 text-xs text-slate-400">{st.detail}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/10">
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <Lock className="h-3.5 w-3.5 text-violet-400" />
                  30/40/30 Stripe Escrow
                </span>
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  FTC 16 CFR Part 255 Verified
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://bomie-ai-v5-autonomous-merchant-creator-campaign.ai.studio/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/10"
                >
                  Open Live V5 Studio
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <Link
                  href="/#pricing"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-950 hover:bg-amber-50"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Start Free MVP Campaign
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
