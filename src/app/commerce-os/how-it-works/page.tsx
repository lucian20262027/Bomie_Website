'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Store,
  Video,
} from 'lucide-react';

export default function HowItWorksPage() {
  const [role, setRole] = useState<'business' | 'creator'>('business');
  const [presetIdx, setPresetIdx] = useState<number>(0);
  const [customPrompt, setCustomPrompt] = useState<string>(
    'I run a Sichuan restaurant in San Francisco with a $1,800 budget. Match 4 local foodie creators for weekend dine-in traffic.'
  );

  const merchantPresets = [
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

  const creatorPresets = [
    {
      label: '🍜 @sfnoodleclub (34.2K)',
      prompt: 'I am a 34K food & lifestyle creator in San Francisco looking for paid local restaurant collaborations.',
      handle: '@sfnoodleclub (34.2K) · San Francisco',
      deals: '3 Nearby Paid Offers ($380–$520 + Free Tasting)',
      payout: 'Instant Stripe / Apple Pay Payout · 0% Creator Fee',
      script: 'AI 30s Script & FTC #ad Tag Auto-Prepared for You',
    },
    {
      label: '✨ @glowwithchloe_la (28.1K)',
      prompt: 'I create clean beauty & wellness reels in Los Angeles and want recurring spa & boutique retainers.',
      handle: '@glowwithchloe_la (28.1K) · Los Angeles',
      deals: '4 Clean Beauty & Spa Retainers ($450–$650/mo)',
      payout: '30/40/30 Escrow Locked · Zero Ghosting',
      script: 'ASMR & GRWM Shot Checklist Included',
    },
    {
      label: '🏠 @cozyhomewithsam (14.8K)',
      prompt: 'I am a 14K home & craft nano-creator looking for zero-cold-DM paid local brand deals.',
      handle: '@cozyhomewithsam (14.8K) · Austin / Seattle',
      deals: '5 Local Craft & Cafe Invites ($240–$360 + QR Bonus)',
      payout: 'Instant Withdrawal Upon Verified Post',
      script: 'Commercial Audio & FTC Shield Verified',
    },
  ];

  const activeM = merchantPresets[presetIdx % merchantPresets.length];
  const activeC = creatorPresets[presetIdx % creatorPresets.length];

  return (
    <div className="min-h-screen bg-[#f7f4ff] text-[#161224] selection:bg-violet-500 selection:text-[#161224]">
      <header className="sticky top-0 z-40 border-b border-violet-200/70 bg-[#f7f4ff]/85 backdrop-blur-xl">
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
            <span className="text-lg font-extrabold tracking-tight text-[#161224]">bomie.ai</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/commerce-os/flywheel"
              className="hidden sm:inline-flex text-xs font-semibold text-violet-700 hover:text-violet-950"
            >
              360° Flywheel →
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

      <main className="mx-auto max-w-5xl px-6 py-14 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-3.5 py-1 text-xs font-semibold text-violet-700">
            <Sparkles className="h-3.5 w-3.5 text-amber-700" />
            Commerce OS · How It Works
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#161224]">
            Chat-First Simplicity. 4-Stage AI Power.
          </h1>
          <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-600">
            Describe your store or creator profile in plain English—Bomie AI handles matching, 30s scripts, FTC compliance, and 30/40/30 escrow automatically.
          </p>

          <div className="pt-3 inline-flex rounded-2xl border border-violet-200/70 bg-white shadow-sm p-1.5">
            <button
              type="button"
              onClick={() => setRole('business')}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-semibold transition ${
                role === 'business' ? 'bg-violet-600 text-white' : 'text-slate-600 hover:text-violet-950'
              }`}
            >
              <Store className="h-4 w-4" />
              I&apos;m a Merchant
            </button>
            <button
              type="button"
              onClick={() => setRole('creator')}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-semibold transition ${
                role === 'creator' ? 'bg-fuchsia-600 text-white' : 'text-slate-600 hover:text-violet-950'
              }`}
            >
              <Video className="h-4 w-4" />
              I&apos;m a Creator
            </button>
          </div>
        </div>

        {/* Prompt Input */}
        <div className="rounded-3xl border border-violet-400/30 bg-white/95 p-6 sm:p-7 shadow-2xl space-y-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setPresetIdx((prev) => (prev + 1) % 3);
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="flex-1 rounded-2xl border border-violet-200/80 bg-[#f7f4ff] px-4 py-3.5 text-sm text-[#161224] focus:border-violet-400 focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3.5 text-sm font-bold text-white"
            >
              <Sparkles className="h-4 w-4" />
              Generate Plan
            </button>
          </form>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-slate-500">Examples:</span>
            {(role === 'business' ? merchantPresets : creatorPresets).map((p, idx) => (
              <button
                key={p.label}
                type="button"
                onClick={() => {
                  setPresetIdx(idx);
                  setCustomPrompt(p.prompt);
                }}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                  presetIdx === idx
                    ? 'border-violet-400/60 bg-violet-500/20 text-[#161224]'
                    : 'border-violet-200/70 bg-[#f7f4ff] text-slate-600 hover:bg-violet-50'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Output Card */}
        {role === 'business' ? (
          <div className="rounded-3xl border border-violet-200/80 bg-white shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-violet-200/70 pb-5">
              <div>
                <span className="font-mono text-xs uppercase text-emerald-400">
                  ✓ 4-Stage Autonomous Plan Ready
                </span>
                <h2 className="mt-1 text-2xl font-bold text-[#161224]">{activeM.title}</h2>
              </div>
              <span className="self-start rounded-full border border-amber-300/40 bg-amber-400/15 px-3.5 py-1 text-xs font-bold text-amber-800">
                {activeM.roas}
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-violet-200/70 bg-[#f7f4ff] p-4">
                <div className="text-xs text-slate-600">AI Matched Creators</div>
                <div className="mt-1.5 text-sm font-bold text-[#161224]">{activeM.matched}</div>
              </div>
              <div className="rounded-2xl border border-violet-200/70 bg-[#f7f4ff] p-4">
                <div className="text-xs text-slate-600">Expected Impact</div>
                <div className="mt-1.5 text-sm font-bold text-emerald-700">{activeM.reach}</div>
              </div>
              <div className="rounded-2xl border border-violet-400/30 bg-violet-500/10 p-4">
                <div className="text-xs text-violet-700">MVP Transparent Pricing</div>
                <div className="mt-1.5 text-sm font-bold text-[#161224]">{activeM.budget}</div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-4 pt-2">
              {activeM.stages.map((st) => (
                <div key={st.s} className="rounded-2xl border border-violet-200/70 bg-[#f7f4ff] p-4">
                  <div className="font-mono text-[10px] text-violet-700">STAGE {st.s}</div>
                  <div className="mt-1 text-sm font-bold text-[#161224]">{st.name}</div>
                  <div className="mt-1 text-xs text-slate-600">{st.detail}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-violet-200/80 bg-white shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-violet-200/70 pb-5">
              <div>
                <span className="font-mono text-xs uppercase text-fuchsia-400">
                  ✓ Creator Copilot Ready · Zero Cold DMs
                </span>
                <h2 className="mt-1 text-2xl font-bold text-[#161224]">{activeC.handle}</h2>
              </div>
              <span className="self-start rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3.5 py-1 text-xs font-bold text-emerald-700">
                0% Creator Fee (MVP Free)
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-violet-200/70 bg-[#f7f4ff] p-4">
                <div className="text-xs text-slate-600">Inbound Local Deals</div>
                <div className="mt-1.5 text-sm font-bold text-[#161224]">{activeC.deals}</div>
              </div>
              <div className="rounded-2xl border border-violet-200/70 bg-[#f7f4ff] p-4">
                <div className="text-xs text-slate-600">AI Shooting Copilot</div>
                <div className="mt-1.5 text-sm font-bold text-fuchsia-700">{activeC.script}</div>
              </div>
              <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4">
                <div className="text-xs text-emerald-700">Guaranteed Payouts</div>
                <div className="mt-1.5 text-sm font-bold text-[#161224]">{activeC.payout}</div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://bomie-ai-v5-autonomous-merchant-creator-campaign.ai.studio/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-violet-200/80 bg-white shadow-sm px-5 py-3 text-xs sm:text-sm font-semibold text-[#161224] transition hover:bg-violet-50"
          >
            Launch Full V5 Sandbox in New Tab
            <ExternalLink className="h-4 w-4" />
          </a>
          <Link
            href="/#pricing"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-violet-600/20 transition hover:opacity-95"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            See Free MVP Pricing &amp; Escrow →
          </Link>
        </div>
      </main>
    </div>
  );
}
