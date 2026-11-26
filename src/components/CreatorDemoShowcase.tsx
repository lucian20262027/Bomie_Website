'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  DollarSign,
  Lock,
  MapPin,
  QrCode,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Video,
  Zap,
} from 'lucide-react';

type StageId = 1 | 2 | 3 | 4;

interface CreatorPersona {
  id: string;
  handle: string;
  niche: string;
  city: string;
  followers: string;
  localAudience: string;
  matchScore: number;
  basePay: number;
  bonusPay: number;
  brandName: string;
  brandCategory: string;
  distance: string;
  hook: string;
  captionPreview: string;
  estMonthly: string;
}

const CREATOR_PERSONAS: CreatorPersona[] = [
  {
    id: 'sf-food',
    handle: '@sfnoodleclub',
    niche: 'SF Food & Hidden Gems',
    city: 'San Francisco, CA',
    followers: '34.2K',
    localAudience: '82% Bay Area',
    matchScore: 98,
    basePay: 450,
    bonusPay: 150,
    brandName: 'Sichuan Bistro SF',
    brandCategory: 'Mission District Dining',
    distance: '0.8 mi away',
    hook: '#Ad | Found the most underrated chili-oil noodles in the Mission — scan my bio QR for 20% off.',
    captionPreview: '#ad Paid partnership with @SichuanBistroSF · 20% off appetizers with code SFNOODLE20',
    estMonthly: '$2,400/mo',
  },
  {
    id: 'la-beauty',
    handle: '@chloestylediary',
    niche: 'LA Skincare & Wellness',
    city: 'Los Angeles, CA',
    followers: '28.1K',
    localAudience: '79% LA Metro',
    matchScore: 96,
    basePay: 550,
    bonusPay: 200,
    brandName: 'Lumina Skin Studio',
    brandCategory: 'West Hollywood Med-Spa',
    distance: '1.2 mi away',
    hook: '#Ad | Come with me for a sunlit barrier-repair facial in WeHo (plus a $40 first-visit perk).',
    captionPreview: '#ad Paid partnership with @LuminaSkinLA · Licensed commercial audio verified',
    estMonthly: '$3,000/mo',
  },
  {
    id: 'seattle-coffee',
    handle: '@seattle.sip',
    niche: 'PNW Coffee & Lifestyle',
    city: 'Seattle, WA',
    followers: '14.8K',
    localAudience: '86% Seattle',
    matchScore: 95,
    basePay: 350,
    bonusPay: 120,
    brandName: 'Nordic Roast Ballard',
    brandCategory: 'Specialty Espresso Bar',
    distance: '0.5 mi away',
    hook: '#Ad | Rainy Seattle mornings just got better — trying Nordic Roast’s new cardamom oat latte.',
    captionPreview: '#ad Paid partnership with @NordicRoastSEA · Tracked QR redemption active',
    estMonthly: '$1,880/mo',
  },
];

const STAGES: { id: StageId; num: string; label: string }[] = [
  { id: 1, num: '01', label: 'Inbound Offers' },
  { id: 2, num: '02', label: 'AI Script & FTC' },
  { id: 3, num: '03', label: 'Escrow Locked' },
  { id: 4, num: '04', label: 'Instant Payout' },
];

function ScoreRing({
  score,
  label,
  strokeColor,
  textClass,
}: {
  score: number;
  label: string;
  strokeColor: string;
  textClass: string;
}) {
  const r = 30;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <svg className="h-20 w-20 -rotate-90" viewBox="0 0 76 76">
          <circle cx="38" cy="38" r={r} fill="none" stroke="#e2e8f0" strokeWidth="6" />
          <motion.circle
            cx="38"
            cy="38"
            r={r}
            fill="none"
            stroke={strokeColor}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          />
        </svg>
        <span className={`absolute text-lg font-extrabold ${textClass}`}>{score}%</span>
      </div>
      <span className="mt-1.5 text-xs font-bold text-[#161224]">{label}</span>
    </div>
  );
}

export default function CreatorDemoShowcase() {
  const [personaIdx, setPersonaIdx] = useState(0);
  const [activeStage, setActiveStage] = useState<StageId>(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [payoutStep, setPayoutStep] = useState<1 | 2 | 3>(3);
  const timerRef = useRef<number | null>(null);

  const p = CREATOR_PERSONAS[personaIdx];
  const totalDeal = p.basePay + p.bonusPay;
  const m1 = Math.round(p.basePay * 0.3);
  const m2 = Math.round(p.basePay * 0.4);
  const m3 = p.basePay - m1 - m2;

  // 3s per stage, rotating across all 3 creator personas automatically
  useEffect(() => {
    if (!isAutoPlaying) return;
    timerRef.current = window.setTimeout(() => {
      if (activeStage < 4) {
        setActiveStage((activeStage + 1) as StageId);
      } else {
        setPersonaIdx((prev) => (prev + 1) % CREATOR_PERSONAS.length);
        setActiveStage(1);
      }
    }, 3000);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [isAutoPlaying, activeStage, personaIdx]);

  const handleSelectPersona = (idx: number) => {
    setPersonaIdx(idx);
    setActiveStage(1);
    setIsAutoPlaying(true);
  };

  return (
    <section className="relative overflow-hidden py-4">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        {/* Persona Switcher */}
        <div className="flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-violet-200/80 bg-white/85 p-1.5 shadow-sm backdrop-blur-sm">
            {CREATOR_PERSONAS.map((item, idx) => {
              const active = personaIdx === idx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onMouseEnter={() => {
                    if (personaIdx !== idx) handleSelectPersona(idx);
                  }}
                  onClick={() => handleSelectPersona(idx)}
                  className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition cursor-pointer ${
                    active
                      ? 'bg-[#161224] text-white shadow-sm'
                      : 'text-slate-600 hover:bg-violet-50 hover:text-[#161224]'
                  }`}
                >
                  <span className="h-2 w-2 rounded-full bg-fuchsia-500" />
                  <span>{item.handle}</span>
                  <span
                    className={`hidden sm:inline font-mono text-[10px] ${
                      active ? 'text-fuchsia-200' : 'text-slate-400'
                    }`}
                  >
                    {item.followers} · {item.city.split(',')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Workspace Window */}
        <div
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          className="mt-5 rounded-[28px] border border-fuchsia-200/80 bg-gradient-to-br from-[#F6E8FF]/90 via-white to-[#f5f3ff] p-2.5 sm:p-4 shadow-2xl shadow-violet-950/10"
        >
          <div className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-sm">
            {/* Top Window Chrome + 4 Tabs */}
            <div className="border-b border-slate-100 bg-slate-50/70 px-4 sm:px-6 py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <div className="h-4 w-px bg-slate-200" />
                <div className="flex items-center gap-2 text-xs font-bold text-[#161224]">
                  <span>{p.handle}</span>
                  <span className="text-slate-300">·</span>
                  <span className="font-mono text-[11px] font-semibold text-emerald-700">
                    Est. {p.estMonthly}
                  </span>
                </div>
                <span className="rounded-full bg-fuchsia-100 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase text-fuchsia-800">
                  0% Creator Fee
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {STAGES.map((st) => {
                  const active = activeStage === st.id;
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => {
                        setIsAutoPlaying(false);
                        setActiveStage(st.id);
                      }}
                      onMouseEnter={() => {
                        setIsAutoPlaying(false);
                        setActiveStage(st.id);
                      }}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                        active
                          ? 'bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white shadow-sm'
                          : 'bg-white text-slate-600 border border-slate-200/80 hover:border-fuchsia-300 hover:text-fuchsia-900'
                      }`}
                    >
                      <span
                        className={`font-mono text-[10px] ${
                          active ? 'text-fuchsia-100' : 'text-slate-400'
                        }`}
                      >
                        {st.num}
                      </span>
                      <span>{st.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Video-Style Continuous Progress Line */}
            <div className="h-1.5 w-full bg-slate-100 overflow-hidden">
              {isAutoPlaying ? (
                <motion.div
                  key={`creator-playhead-${p.id}-${activeStage}`}
                  className="h-full bg-gradient-to-r from-fuchsia-600 via-violet-500 to-amber-400"
                  initial={{ width: `${(activeStage - 1) * 25}%` }}
                  animate={{ width: `${activeStage * 25}%` }}
                  transition={{ duration: 3, ease: 'linear' }}
                />
              ) : (
                <motion.div
                  className="h-full bg-gradient-to-r from-fuchsia-600 via-violet-500 to-amber-400"
                  animate={{ width: `${activeStage * 25}%` }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                />
              )}
            </div>

            {/* Workspace Stage Content */}
            <div className="p-5 sm:p-7 min-h-[380px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                {/* STAGE 01: INBOUND PAID OFFERS */}
                {activeStage === 1 && (
                  <motion.div
                    key="c-stage-1"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border border-emerald-200 bg-emerald-50/80 px-4 py-3 text-xs font-semibold text-emerald-950">
                      <span className="inline-flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        Pre-funded local deal matched to {p.handle} ({p.localAudience} local audience) — zero cold pitching.
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-[11px] text-fuchsia-700">
                        <Sparkles className="h-3 w-3" /> Purple border = AI-matched deal
                      </span>
                    </div>

                    <div className="grid gap-5 lg:grid-cols-12">
                      <div className="lg:col-span-7 rounded-2xl border border-fuchsia-300 bg-fuchsia-50/30 p-5 space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-fuchsia-700">
                              Matched Brand Invite
                            </span>
                            <h3 className="text-lg font-extrabold text-[#161224] mt-0.5">
                              {p.brandName}
                            </h3>
                            <p className="text-xs text-slate-500">
                              {p.brandCategory} · <MapPin className="inline h-3 w-3 text-fuchsia-600" /> {p.distance}
                            </p>
                          </div>
                          <span className="inline-flex items-center gap-1 rounded-xl border border-fuchsia-400 bg-white px-3 py-1.5 font-mono text-xs font-bold text-fuchsia-800 shadow-2xs">
                            <Sparkles className="h-3.5 w-3.5 text-fuchsia-600" />
                            {p.matchScore}% Match
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          <div className="rounded-xl border border-slate-200 bg-white p-3">
                            <div className="text-[11px] text-slate-500">Guaranteed Base</div>
                            <div className="mt-1 text-lg font-extrabold text-[#161224]">${p.basePay}</div>
                          </div>
                          <div className="rounded-xl border border-slate-200 bg-white p-3">
                            <div className="text-[11px] text-slate-500">QR &amp; View Bonus</div>
                            <div className="mt-1 text-lg font-extrabold text-emerald-700">+${p.bonusPay}</div>
                          </div>
                          <div className="rounded-xl border border-fuchsia-200 bg-white p-3">
                            <div className="text-[11px] text-fuchsia-700 font-semibold">Total Potential</div>
                            <div className="mt-1 text-lg font-extrabold text-fuchsia-700">${totalDeal}</div>
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 flex flex-col justify-between space-y-4">
                        <div className="space-y-2.5">
                          <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500">
                            Why {p.brandName} Wants You
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1 rounded-lg border border-violet-300 bg-white px-2.5 py-1 text-xs font-semibold text-violet-900">
                              <Sparkles className="h-3 w-3 text-violet-600" />
                              {p.localAudience}
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-lg border border-violet-300 bg-white px-2.5 py-1 text-xs font-semibold text-violet-900">
                              <Sparkles className="h-3 w-3 text-violet-600" />
                              {p.niche}
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-lg border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800">
                              <Lock className="h-3 w-3 text-emerald-600" />
                              Escrow Pre-Funded
                            </span>
                          </div>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-white p-3.5 text-xs text-slate-600">
                          Deliverable: <strong>1 × 30s Vertical Reel / TikTok</strong> + Bio QR link. Zero rate haggling.
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STAGE 02: AI SCRIPT & FTC SHIELD */}
                {activeStage === 2 && (
                  <motion.div
                    key="c-stage-2"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="grid gap-6 lg:grid-cols-12 items-start"
                  >
                    <div className="lg:col-span-8 rounded-2xl border border-slate-200 bg-slate-50/50 p-5 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                        <span className="inline-flex items-center gap-2 text-sm font-bold text-[#161224]">
                          <Video className="h-4 w-4 text-fuchsia-600" />
                          Pre-Cleared 30s Script &amp; Caption
                        </span>
                        <span className="font-mono text-[11px] text-emerald-700 font-bold">
                          16 CFR PART 255 CLEAR
                        </span>
                      </div>

                      <div className="rounded-xl border border-fuchsia-200 bg-white p-4">
                        <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-fuchsia-700 mb-1">
                          AI Opening Hook (0–3s)
                        </div>
                        <p className="text-sm font-semibold text-[#161224]">{p.hook}</p>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-white p-4">
                        <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                          Ready-to-Paste FTC Compliant Caption
                        </div>
                        <p className="text-xs text-slate-700 font-mono">{p.captionPreview}</p>
                      </div>
                    </div>

                    <div className="lg:col-span-4 rounded-2xl border border-fuchsia-200/90 bg-white p-5 shadow-xl shadow-violet-950/10 space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <ScoreRing
                          score={100}
                          label="FTC Shield"
                          strokeColor="#10b981"
                          textClass="text-emerald-700"
                        />
                        <ScoreRing
                          score={p.matchScore}
                          label="Brand Fit"
                          strokeColor="#c026d3"
                          textClass="text-fuchsia-700"
                        />
                      </div>
                      <div className="space-y-2 border-t border-slate-100 pt-3 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700">#ad tag placed at line 1</span>
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700">Commercial audio cleared</span>
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STAGE 03: ESCROW PRE-FUNDED LOCK */}
                {activeStage === 3 && (
                  <motion.div
                    key="c-stage-3"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="grid gap-6 lg:grid-cols-12 items-center"
                  >
                    <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-slate-50/50 p-6 space-y-4">
                      <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 font-mono text-[11px] font-bold text-emerald-800">
                        <Lock className="h-3.5 w-3.5" />
                        ${p.basePay} LOCKED ON STRIPE BEFORE YOU FILM
                      </div>
                      <h3 className="text-xl font-extrabold text-[#161224]">
                        Never chase an invoice or wait Net-60 again.
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {p.brandName} funds 100% of your ${p.basePay} base pay into Stripe Escrow before you ever pick up your camera. Bomie takes <strong>0% creator fee</strong>.
                      </p>
                    </div>
                    <div className="lg:col-span-5 rounded-2xl border border-violet-200 bg-white p-6 space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold text-[#161224] border-b border-slate-100 pb-2.5">
                        <span>Creator Fee</span>
                        <span className="text-emerald-600 font-mono">$0 (0%)</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-bold text-[#161224] border-b border-slate-100 pb-2.5">
                        <span>Escrow Guarantee</span>
                        <span className="text-violet-700 font-mono">100% Pre-Funded</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-bold text-[#161224]">
                        <span>Performance Bonus</span>
                        <span className="text-fuchsia-700 font-mono">Up to +${p.bonusPay}</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STAGE 04: INSTANT 30/40/30 STRIPE PAYOUT */}
                {activeStage === 4 && (
                  <motion.div
                    key="c-stage-4"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-fuchsia-700">
                          30 / 40 / 30 Instant Stripe Payout
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-[#161224]">
                          Click any milestone to preview your automatic Stripe payouts
                        </h3>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-extrabold text-emerald-700">
                          ${payoutStep === 1 ? m1 : payoutStep === 2 ? m1 + m2 : p.basePay}
                        </span>
                        <span className="ml-1.5 text-xs text-slate-500">released</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { s: 1 as const, pct: '30%', amt: m1, title: 'Accept Invite', sub: 'Instant deposit on brief lock' },
                        { s: 2 as const, pct: '40%', amt: m2, title: 'Draft Approved', sub: 'Paid as soon as brand approves cut' },
                        { s: 3 as const, pct: '30%', amt: m3, title: 'Reel Goes Live', sub: 'Final payout + QR bonus active' },
                      ].map((item) => {
                        const unlocked = payoutStep >= item.s;
                        return (
                          <button
                            key={item.s}
                            type="button"
                            onClick={() => setPayoutStep(item.s)}
                            className={`rounded-xl border p-4 text-left transition cursor-pointer ${
                              unlocked
                                ? 'border-emerald-400 bg-emerald-50/40 shadow-sm'
                                : 'border-slate-200 bg-white hover:border-fuchsia-300'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-xs font-extrabold text-fuchsia-700">
                                {item.pct} · ${item.amt}
                              </span>
                              <CheckCircle2
                                className={`h-4 w-4 ${
                                  unlocked ? 'text-emerald-600' : 'text-slate-300'
                                }`}
                              />
                            </div>
                            <div className="mt-1.5 text-xs font-bold text-[#161224]">{item.title}</div>
                            <div className="mt-0.5 text-[11px] text-slate-500">{item.sub}</div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
