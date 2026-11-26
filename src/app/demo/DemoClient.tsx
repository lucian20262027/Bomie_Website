'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Users,
} from 'lucide-react';
import DemoShowcase from '../../components/DemoShowcase';

export default function DemoClient() {
  const [ftcChallengeChoice, setFtcChallengeChoice] = useState<'A' | 'B' | null>(null);

  return (
    <div className="min-h-screen bg-[#f7f4ff] text-[#161224] flex flex-col selection:bg-violet-600 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#f7f4ff]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10 py-3.5">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#5b21b6] via-[#d946ef] to-[#fbbf24] shadow-md shadow-violet-500/20 transition-transform group-hover:scale-105">
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
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-white/80 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-violet-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Interactive Product Tour
            </span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-violet-100/70 hover:text-violet-950"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
            <Link
              href="/pricing"
              className="hidden sm:inline-flex rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-violet-100/70 hover:text-violet-950"
            >
              Pricing
            </Link>
            <Link
              href="/#pricing"
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-violet-600/20 transition hover:opacity-95"
            >
              Book a Demo
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      <DemoShowcase showHero={true} />

      {/* SECTION 2: DARK CHARCOAL INTERACTIVE CHALLENGE ("Can You Spot the FTC Risk?" — Inspired by Hypotenuse's "Can you tell?") */}
      <section className="bg-[#161224] text-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            {/* Left Prompt */}
            <div className="lg:col-span-5 space-y-4">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-violet-300">
                3-Agent Compliance Challenge
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Can you spot the{' '}
                <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-amber-300 bg-clip-text text-transparent">
                  $51,744 FTC violation?
                </span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                One creator post looks natural and compliant; the other triggers statutory 16 CFR Part 255 penalties. Click a card to see how Bomie&apos;s compliance engine audits both in milliseconds.
              </p>
              {ftcChallengeChoice && (
                <button
                  type="button"
                  onClick={() => setFtcChallengeChoice(null)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-300 hover:text-white transition cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Reset Challenge
                </button>
              )}
            </div>

            {/* Right 2 Interactive Cards */}
            <div className="lg:col-span-7 grid gap-5 sm:grid-cols-2">
              {/* Post A */}
              <div
                onClick={() => setFtcChallengeChoice('A')}
                className={`rounded-2xl bg-white text-[#161224] p-6 flex flex-col justify-between space-y-5 cursor-pointer transition-all border-2 ${
                  ftcChallengeChoice
                    ? 'border-rose-400'
                    : 'border-transparent hover:border-violet-400 hover:-translate-y-0.5'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Creator Post A · Med-Spa
                    </span>
                    <Users className="h-4 w-4 text-slate-400" />
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700 italic">
                    &ldquo;Obsessed with GlowMed&apos;s new laser facial!! Literally cured my acne scars permanently in 48 hours, zero downtime. DM them &apos;GLOW&apos; — not sponsored, just sharing my honest fave!&rdquo;
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  {!ftcChallengeChoice ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-700">
                      Select Post A <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  ) : (
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-rose-600">
                        <ShieldAlert className="h-4 w-4" />
                        BLOCKED BY BOMIE FTC GATE
                      </div>
                      <p className="text-[11px] text-slate-600">
                        Hidden paid endorsement (&ldquo;not sponsored&rdquo;) + unsubstantiated permanent medical cure claim.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Post B */}
              <div
                onClick={() => setFtcChallengeChoice('B')}
                className={`rounded-2xl bg-white text-[#161224] p-6 flex flex-col justify-between space-y-5 cursor-pointer transition-all border-2 ${
                  ftcChallengeChoice
                    ? 'border-emerald-400'
                    : 'border-transparent hover:border-violet-400 hover:-translate-y-0.5'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Creator Post B · Local Dining
                    </span>
                    <Users className="h-4 w-4 text-slate-400" />
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700 italic">
                    &ldquo;#ad Hosted by @SichuanBistroSF in the Mission! Their hand-pulled chili oil dumplings hit different on rainy nights. Scan my bio QR for 20% off appetizers this weekend.&rdquo;
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  {!ftcChallengeChoice ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-700">
                      Select Post B <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  ) : (
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-600">
                        <ShieldCheck className="h-4 w-4" />
                        VERIFIED PASS · ESCROW UNLOCKED
                      </div>
                      <p className="text-[11px] text-slate-600">
                        Clear #ad disclosure at line start, authentic experience, and tracked QR redemption.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CLEAN BOTTOM CTA */}
      <section className="py-14 bg-[#f7f4ff] text-center">
        <div className="mx-auto max-w-2xl px-4 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#161224]">
            Ready to launch your first risk-free local campaign?
          </h2>
          <p className="text-sm text-slate-600">
            $0 MVP platform fee · 100% pre-acceptance refund · 30/40/30 Stripe Escrow
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/#pricing"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition hover:opacity-95"
            >
              Book a Live Demo <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-white px-6 py-3 text-sm font-bold text-[#161224] transition hover:border-violet-400"
            >
              View MVP Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
