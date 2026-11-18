'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Video,
  Wallet,
  XCircle,
} from 'lucide-react';

export default function CreatorPage() {
  const [presetIdx, setPresetIdx] = useState<number>(0);
  const [customPrompt, setCustomPrompt] = useState<string>(
    'I am a 34K food & lifestyle creator in San Francisco looking for paid local restaurant collaborations.'
  );

  const presets = [
    {
      label: '🍜 @sfnoodleclub (34.2K)',
      prompt:
        'I am a 34K food & lifestyle creator in San Francisco looking for paid local restaurant collaborations.',
      handle: '@sfnoodleclub (34.2K) · San Francisco',
      deals: '3 Nearby Paid Offers ($380–$520 + Free Tasting)',
      payout: 'Instant Stripe / Apple Pay Payout · 0% Creator Fee',
      script: 'AI 30s Script & FTC #ad Tag Auto-Prepared for You',
    },
    {
      label: '✨ @glowwithchloe_la (28.1K)',
      prompt:
        'I create clean beauty & wellness reels in Los Angeles and want recurring spa & boutique retainers.',
      handle: '@glowwithchloe_la (28.1K) · Los Angeles',
      deals: '4 Clean Beauty & Spa Retainers ($450–$650/mo)',
      payout: '30/40/30 Escrow Locked · Zero Ghosting',
      script: 'ASMR & GRWM Shot Checklist Included',
    },
    {
      label: '🏠 @cozyhomewithsam (14.8K)',
      prompt:
        'I am a 14K home & craft nano-creator looking for zero-cold-DM paid local brand deals.',
      handle: '@cozyhomewithsam (14.8K) · Austin / Seattle',
      deals: '5 Local Craft & Cafe Invites ($240–$360 + QR Bonus)',
      payout: 'Instant Withdrawal Upon Verified Post',
      script: 'Commercial Audio & FTC Shield Verified',
    },
  ];

  const active = presets[presetIdx % presets.length];

  return (
    <div className="min-h-screen bg-[#06060c] text-slate-200 selection:bg-fuchsia-500 selection:text-white">
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
              href="/merchant"
              className="hidden sm:inline-flex text-xs font-semibold text-violet-300 hover:text-white"
            >
              For Merchants →
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
        {/* 1. Creator Pain Points First */}
        <section className="space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/35 bg-fuchsia-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-fuchsia-300">
              <Video className="h-3.5 w-3.5" />
              For Local Creators &amp; Storytellers
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Stop Chasing Cold DMs and Late Invoices
            </h1>
            <p className="max-w-2xl text-base text-slate-400">
              Your neighborhood influence is valuable even at 2K–50K followers. Bomie AI brings paid local brand deals directly to you—with guaranteed escrow payouts.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                title: 'Ignored by Big Agencies',
                desc: 'Traditional platforms only care about 500K+ mega-influencers—ignoring high-trust local creators.',
              },
              {
                title: 'Ghosted After Cold Pitching',
                desc: 'Spending hours emailing or DMing local shops only to hear crickets or get offered $0 “exposure.”',
              },
              {
                title: 'Late Payments & FTC Stress',
                desc: 'Waiting 60 days for Net-60 invoices or worrying about accidental #ad and audio copyright flags.',
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

        {/* 2. How You Leverage Bomie Copilot */}
        <section className="space-y-8 border-t border-white/10 pt-14">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-fuchsia-400">
              Creator Copilot · 0% Creator Fee (MVP Free)
            </span>
            <h2 className="mt-1.5 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              How Creators Leverage Bomie AI
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400">
              Describe your city and content style—see nearby paid deals, AI-generated 30s scripts, and instant payouts waiting for you.
            </p>
          </div>

          <div className="rounded-3xl border border-fuchsia-400/30 bg-slate-950/90 p-6 sm:p-7 shadow-2xl space-y-4">
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
                className="flex-1 rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3.5 text-sm text-white focus:border-fuchsia-400 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-violet-600 px-6 py-3.5 text-sm font-bold text-white"
              >
                <Sparkles className="h-4 w-4" />
                Find Local Deals
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-slate-500">Creator personas:</span>
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
                      ? 'border-fuchsia-400/60 bg-fuchsia-500/20 text-white'
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
                <span className="font-mono text-xs uppercase text-fuchsia-400">
                  ✓ Creator Copilot Ready · Zero Cold DMs
                </span>
                <h3 className="mt-1 text-2xl font-bold text-white">{active.handle}</h3>
              </div>
              <span className="self-start rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3.5 py-1 text-xs font-bold text-emerald-300">
                0% Creator Fee (MVP Free)
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-xs text-slate-400">1. Inbound Local Deals</div>
                <div className="mt-1.5 text-sm font-bold text-white">{active.deals}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-xs text-slate-400">2. AI Shooting Copilot</div>
                <div className="mt-1.5 text-sm font-bold text-fuchsia-300">{active.script}</div>
              </div>
              <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4">
                <div className="text-xs text-emerald-200">3. Guaranteed Payouts</div>
                <div className="mt-1.5 text-sm font-bold text-white">{active.payout}</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/10">
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <Wallet className="h-3.5 w-3.5 text-amber-300" />
                  Stripe &amp; Apple Pay Payouts
                </span>
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  Commercial Audio &amp; FTC Shield
                </span>
              </div>
              <Link
                href="/#pricing"
                className="inline-flex items-center gap-1.5 rounded-xl bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-950 hover:bg-amber-50"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Claim Your Creator Handle (Free)
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
