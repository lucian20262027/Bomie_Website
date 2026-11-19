'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  FileText,
  Lock,
  MapPin,
  QrCode,
  ShieldCheck,
  Sliders,
  Sparkles,
  Store,
  Users,
  X,
  XCircle,
} from 'lucide-react';

import {
  buildCustomMerchantPlan,
  computeDynamicRoas,
  type GeneratedMerchantPlan,
} from '../../lib/sandboxEngine';

export default function MerchantPage() {
  const [guideStep, setGuideStep] = useState<1 | 2 | 3>(1);
  const [presetIdx, setPresetIdx] = useState<number>(-1);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [activePlan, setActivePlan] = useState<GeneratedMerchantPlan>(() =>
    buildCustomMerchantPlan(
      'I run a Sichuan restaurant in San Francisco with a $1,800 budget. Match 3 local foodie creators for weekend dine-in traffic.'
    )
  );
  const [thinkingStage, setThinkingStage] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [budgetSlider, setBudgetSlider] = useState<number>(1800);
  const [promoOffer, setPromoOffer] = useState<'20% Off' | 'Free Appetizer' | 'BOGO Deal'>('20% Off');
  const [activePreviewTab, setActivePreviewTab] = useState<'creators' | 'script' | 'escrow'>('creators');
  const [selectedCreatorIds, setSelectedCreatorIds] = useState<string[]>(['c1', 'c2', 'c3']);
  const [dispatchedBrief, setDispatchedBrief] = useState<boolean>(false);

  // In-page Launch Modal (wired directly to /api/demo -> Discord!)
  const [showLaunchModal, setShowLaunchModal] = useState<boolean>(false);
  const [launchName, setLaunchName] = useState<string>('');
  const [launchEmail, setLaunchEmail] = useState<string>('');
  const [launchPhone, setLaunchPhone] = useState<string>('');
  const [launchBiz, setLaunchBiz] = useState<string>('');
  const [launchPrefer, setLaunchPrefer] = useState<'email' | 'phone' | 'either'>('either');
  const [isLaunching, setIsLaunching] = useState<boolean>(false);
  const [launchLeadId, setLaunchLeadId] = useState<string>('');
  const [launchSuccess, setLaunchSuccess] = useState<boolean>(false);

  const presets = [
    {
      label: '🍜 SF Restaurant ($1,800)',
      prompt: 'I run a Sichuan restaurant in San Francisco with a $1,800 budget. Match 3 local foodie creators for weekend dine-in traffic.',
    },
    {
      label: '✨ LA Skin & Spa ($2,200)',
      prompt: 'I own a facial spa in Los Angeles with a $2,200 budget. Match 3 local beauty creators for new client bookings.',
    },
    {
      label: '🕯️ Seattle Craft Shop ($800)',
      prompt: 'I sell handmade soy candles in Seattle with an $800 budget. Match 3 neighborhood lifestyle creators.',
    },
  ];

  const runGeneration = async (promptToRun: string) => {
    setGuideStep(2);
    setDispatchedBrief(false);
    setThinkingStage(1);
    setTimeout(() => setThinkingStage(2), 340);
    setTimeout(() => setThinkingStage(3), 680);

    let nextPlan = buildCustomMerchantPlan(promptToRun);
    try {
      const res = await fetch('/api/sandbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'merchant', prompt: promptToRun }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.ok && data?.plan?.creators?.length) {
          nextPlan = data.plan;
        }
      }
    } catch {
      // fallback already computed
    }

    setTimeout(() => {
      setActivePlan(nextPlan);
      setBudgetSlider(nextPlan.baseBudget);
      setSelectedCreatorIds(nextPlan.creators.map((c) => c.id));
      setThinkingStage(4);
      setGuideStep(3);
    }, 350);
  };

  const toggleCreator = (id: string) => {
    setSelectedCreatorIds((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((x) => x !== id) : prev) : [...prev, id]
    );
  };

  // Live dynamic calculations from Budget Slider + Selected Creators
  const activeCreators = activePlan.creators.filter((c) => selectedCreatorIds.includes(c.id));
  const totalWeight = activeCreators.reduce((s, c) => s + c.weight, 0) || 1;
  const estViewsK = Math.round((budgetSlider / 100) * 2.9 * (activeCreators.length / 3));
  const estVisits = Math.round((budgetSlider / 15.5) * (activeCreators.length / 3));
  const dynamicRoas = computeDynamicRoas(activePlan.baseRoas, budgetSlider, activeCreators.length, promoOffer);
  const renderedHook = activePlan.hookTemplate.replace('{PROMO}', promoOffer);

  const handleLaunchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLaunching(true);
    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: launchName,
          email: launchEmail,
          phone: launchPhone,
          preferredContact: launchPrefer,
          handle: `${launchBiz} ($${budgetSlider} · ${promoOffer} · ${activeCreators.length} Creators)`,
          city: activePlan.city,
        }),
      });
      const data = await res.json();
      if (res.ok && data?.ok) {
        setLaunchLeadId(data.leadId || 'BOMIE-MVP');
        setLaunchSuccess(true);
      }
    } finally {
      setIsLaunching(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f4ff] text-[#161224] selection:bg-violet-600 selection:text-white">
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
            <Link href="/creator" className="hidden sm:inline-flex text-xs font-semibold text-fuchsia-700 hover:text-violet-950">
              For Creators →
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

      <main className="mx-auto max-w-5xl px-6 py-14 space-y-14">
        {/* 1. Merchant Pain Points First */}
        <section className="space-y-7">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/35 bg-violet-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-violet-700">
              <Store className="h-3.5 w-3.5" />
              For Local Merchants &amp; Storefronts
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#161224]">
              Why Traditional Local Marketing Fails Small Businesses
            </h1>
            <p className="max-w-2xl text-base text-slate-600">
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
                className="rounded-3xl border border-rose-500/20 bg-gradient-to-b from-rose-50 to-white p-6 space-y-2.5 shadow-sm"
              >
                <XCircle className="h-5 w-5 text-rose-500" />
                <h2 className="text-base font-bold text-[#161224]">{pain.title}</h2>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600">{pain.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Guided Interactive Live Demo */}
        <section className="space-y-7 border-t border-violet-200/70 pt-14">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-600">
              Guided Interactive Walkthrough · Zero Technical Setup
            </span>
            <h2 className="mt-1.5 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#161224]">
              How You Leverage Bomie AI in 3 Simple Steps
            </h2>
          </div>

          {/* 3-Step Beginner Guide Bar */}
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { num: 1, title: 'Step 1 · Describe Store', desc: 'Type your city & goal, or tap an example' },
              { num: 2, title: 'Step 2 · Click "Generate Plan"', desc: 'Watch Bomie AI match creators & FTC rules' },
              { num: 3, title: 'Step 3 · Tune & Launch Free', desc: 'Slide budget, pick promo & launch ($0 fee)' },
            ].map((s) => {
              const isCurrent = guideStep === s.num;
              const isDone = guideStep > s.num;
              return (
                <div
                  key={s.num}
                  className={`rounded-2xl border p-4 transition ${
                    isCurrent
                      ? 'border-violet-500 bg-white shadow-md shadow-violet-500/10 ring-2 ring-violet-400/30'
                      : isDone
                        ? 'border-emerald-300 bg-emerald-50/70'
                        : 'border-violet-200/70 bg-white/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold ${
                        isCurrent ? 'text-violet-700' : isDone ? 'text-emerald-700' : 'text-slate-500'
                      }`}
                    >
                      {isDone ? `✓ ${s.title}` : s.title}
                    </span>
                    {isCurrent && (
                      <span className="rounded-full bg-violet-600 px-2 py-0.5 text-[10px] font-bold text-white animate-pulse">
                        Next
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-slate-600">{s.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Prompt Input Card */}
          <div className="rounded-3xl border border-violet-300 bg-white p-6 sm:p-7 shadow-xl shadow-violet-900/5 space-y-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                runGeneration(
                  customPrompt.trim() ||
                    'I run a boba shop in Seattle with a $1,000 budget.'
                );
              }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <div className="relative flex-1">
                {!customPrompt && !isInputFocused && (
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 flex items-center text-sm text-slate-400">
                    <span className="mr-0.5 inline-block h-4 w-[2px] bg-[#161224] animate-caret-blink" />
                    <span>e.g., I run a boba shop in Seattle with a $1,000 budget...</span>
                  </span>
                )}
                <input
                  type="text"
                  value={customPrompt}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  onChange={(e) => {
                    setCustomPrompt(e.target.value);
                    setGuideStep(1);
                  }}
                  placeholder={isInputFocused ? 'e.g., I run a boba shop in Seattle with a $1,000 budget...' : ''}
                  className="w-full rounded-2xl border border-violet-200 bg-[#f7f4ff] px-4 py-3.5 text-sm text-[#161224] placeholder-slate-400 focus:border-violet-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={thinkingStage > 0 && thinkingStage < 4}
                className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-violet-600/20 transition hover:opacity-95 disabled:opacity-60"
              >
                {thinkingStage > 0 && thinkingStage < 4 ? 'AI Thinking...' : 'Generate Plan'}
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-slate-500">Step 1 Quick Examples:</span>
              {presets.map((p, idx) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    setPresetIdx(idx);
                    setCustomPrompt(p.prompt);
                    runGeneration(p.prompt);
                  }}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                    presetIdx === idx && customPrompt === p.prompt
                      ? 'border-violet-500 bg-violet-100 text-violet-950 font-semibold'
                      : 'border-violet-200 bg-[#f7f4ff] text-slate-700 hover:bg-violet-50'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Streaming AI Thinking Conversation Bubble */}
            {thinkingStage > 0 && (
              <div className="mt-4 rounded-2xl border border-violet-200 bg-[#f7f4ff] p-4 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-violet-800">
                  <Sparkles className="h-3.5 w-3.5 text-violet-600" />
                  <span>Bomie AI Agent Pipeline:</span>
                </div>
                <div className="space-y-1.5 pl-5">
                  <div className={thinkingStage >= 1 ? 'text-emerald-700 font-semibold' : 'text-slate-400'}>
                    {thinkingStage >= 2 ? '✓' : '⏳'} Step 1: Analyzing storefront category &amp; {activePlan.city} demographics...
                  </div>
                  {thinkingStage >= 2 && (
                    <div className={thinkingStage >= 3 ? 'text-emerald-700 font-semibold' : 'text-violet-700 font-medium'}>
                      {thinkingStage >= 3 ? '✓' : '⏳'} Step 2: Scanning verified neighborhood creators within 0.5–3 miles...
                    </div>
                  )}
                  {thinkingStage >= 3 && (
                    <div className={thinkingStage >= 4 ? 'text-emerald-700 font-semibold' : 'text-violet-700 font-medium'}>
                      {thinkingStage >= 4 ? '✓' : '⏳'} Step 3: Auditing FTC 16 CFR Part 255 #ad rules &amp; building 30s script...
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Live Interactive Workspace */}
          <div className="rounded-3xl border border-violet-200/80 bg-white p-6 sm:p-8 shadow-xl shadow-violet-900/5 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-violet-100 pb-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-600">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{activePlan.city} · MVP Limited-Time $0 Platform Fee</span>
                </div>
                <h3 className="mt-1 text-2xl font-bold text-[#161224]">{activePlan.title}</h3>
              </div>
              <span className="self-start rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1 text-xs font-bold text-amber-800">
                {dynamicRoas.range} Projected ROAS
              </span>
            </div>

            {/* Real-Time Budget Slider + Promo Hook Selector */}
            <div className="grid gap-5 md:grid-cols-2 rounded-2xl border border-violet-200/70 bg-[#f7f4ff] p-5">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-[#161224]">
                  <span className="flex items-center gap-1.5">
                    <Sliders className="h-3.5 w-3.5 text-violet-600" />
                    Adjust Campaign Budget (100% to Creators)
                  </span>
                  <span className="text-base font-extrabold text-violet-700">
                    ${budgetSlider.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={200}
                  max={5000}
                  step={50}
                  value={budgetSlider}
                  onChange={(e) => {
                    setBudgetSlider(Number(e.target.value));
                    setGuideStep(3);
                  }}
                  className="w-full accent-violet-600 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>$200 Starter</span>
                  <span>$2,500 Growth</span>
                  <span>$5,000 City Blitz</span>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-[#161224]">
                  <span className="flex items-center gap-1.5">
                    <QrCode className="h-3.5 w-3.5 text-fuchsia-600" />
                    Pick Customer Walk-In Promo Offer
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700">Updates Script Live</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(['20% Off', 'Free Appetizer', 'BOGO Deal'] as const).map((offer) => (
                    <button
                      key={offer}
                      type="button"
                      onClick={() => {
                        setPromoOffer(offer);
                        setGuideStep(3);
                      }}
                      className={`rounded-xl py-2 text-xs font-semibold transition ${
                        promoOffer === offer
                          ? 'bg-violet-600 text-white shadow-sm'
                          : 'bg-white text-slate-700 border border-violet-200 hover:bg-violet-50'
                      }`}
                    >
                      {offer}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Updating KPIs */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-violet-100 bg-[#f7f4ff] p-4">
                <div className="text-xs text-slate-500">Selected Creators</div>
                <div className="mt-1 text-lg font-extrabold text-[#161224]">
                  {activeCreators.length} Local Creators
                </div>
              </div>
              <div className="rounded-2xl border border-violet-100 bg-[#f7f4ff] p-4">
                <div className="text-xs text-slate-500">Live Expected Impact</div>
                <div className="mt-1 text-lg font-extrabold text-emerald-700">
                  {estViewsK}K+ Views · ~{estVisits} Visits
                </div>
              </div>
              <div className="rounded-2xl border border-violet-200 bg-violet-50 p-4">
                <div className="text-xs text-violet-700">Total Cost ($0 Platform Fee)</div>
                <div className="mt-1 text-lg font-extrabold text-[#161224]">
                  ${budgetSlider.toLocaleString()}{' '}
                  <span className="text-xs font-medium text-slate-500">(100% refundable)</span>
                </div>
              </div>
            </div>

            {/* Interactive Step Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-violet-100 pb-3">
              {(
                [
                  { id: 'creators', label: '1. Select Local Creators', icon: Users },
                  { id: 'script', label: '2. Preview Live 30s Script', icon: FileText },
                  { id: 'escrow', label: '3. FTC & 30/40/30 Escrow', icon: ShieldCheck },
                ] as const
              ).map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActivePreviewTab(tab.id)}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition ${
                      activePreviewTab === tab.id
                        ? 'bg-violet-600 text-white shadow-sm'
                        : 'bg-[#f7f4ff] text-slate-700 hover:bg-violet-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {activePreviewTab === 'creators' && (
              <div className="grid gap-4 md:grid-cols-3">
                {activePlan.creators.map((c) => {
                  const picked = selectedCreatorIds.includes(c.id);
                  const creatorShare = picked ? Math.round((budgetSlider * c.weight) / totalWeight) : 0;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => toggleCreator(c.id)}
                      className={`text-left rounded-2xl border p-4 transition ${
                        picked
                          ? 'border-violet-500 bg-violet-50/70 shadow-sm'
                          : 'border-violet-100 bg-[#f7f4ff] opacity-60 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                          {c.match}
                        </span>
                        <span className="text-xs font-bold text-violet-700">
                          {picked ? '✓ Selected' : '+ Select'}
                        </span>
                      </div>
                      <div className="mt-3 text-base font-bold text-[#161224]">{c.handle}</div>
                      <div className="text-xs text-slate-600">
                        {c.followers} · {c.distance}
                      </div>
                      <div className="mt-1.5 text-[11px] font-medium text-emerald-700">
                        {c.localAudiencePct}% Local · {c.authenticityScore}/100 Auth · {c.engagementRate} ER
                      </div>
                      <div className="mt-3 flex items-center justify-between border-t border-violet-200/60 pt-2.5 text-xs">
                        <span className="text-slate-500">{c.niche}</span>
                        <span className="font-bold text-[#161224]">
                          {picked ? `$${creatorShare}` : 'Paused'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {activePreviewTab === 'script' && (
              <div className="rounded-2xl border border-violet-200 bg-[#f7f4ff] p-5 space-y-4">
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase text-violet-700">
                    Live AI Opening Hook (Updates with your Promo Selection)
                  </span>
                  <p className="mt-1 text-base font-bold text-[#161224]">{renderedHook}</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {activePlan.shots.map((shot, i) => (
                    <div key={i} className="rounded-xl border border-violet-200/70 bg-white p-3.5 text-xs text-slate-700">
                      <div className="font-bold text-violet-700 mb-1">Shot {i + 1}</div>
                      {shot.replace('{PROMO}', promoOffer)}
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-medium text-emerald-800">
                  QR Voucher Attached: <span className="font-bold">{promoOffer} · #ad Paid Partnership ({activePlan.city.split(',')[0]})</span>
                </div>
              </div>
            )}

            {activePreviewTab === 'escrow' && (
              <div className="rounded-2xl border border-violet-200 bg-[#f7f4ff] p-5 space-y-4">
                <div className="grid gap-3 sm:grid-cols-3 text-xs">
                  <div className="rounded-xl bg-white p-4 border border-violet-100">
                    <div className="font-bold text-violet-700">30% · Brief Accepted</div>
                    <div className="mt-1 text-lg font-extrabold text-[#161224]">
                      ${Math.round(budgetSlider * 0.3)}
                    </div>
                    <p className="mt-1 text-slate-500">100% refundable if cancelled before accept.</p>
                  </div>
                  <div className="rounded-xl bg-white p-4 border border-violet-100">
                    <div className="font-bold text-fuchsia-700">40% · Script Approved</div>
                    <div className="mt-1 text-lg font-extrabold text-[#161224]">
                      ${Math.round(budgetSlider * 0.4)}
                    </div>
                    <p className="mt-1 text-slate-500">Released only after you approve 30s draft.</p>
                  </div>
                  <div className="rounded-xl bg-white p-4 border border-violet-100">
                    <div className="font-bold text-emerald-700">30% · Live &amp; FTC Verified</div>
                    <div className="mt-1 text-lg font-extrabold text-[#161224]">
                      ${budgetSlider - Math.round(budgetSlider * 0.3) - Math.round(budgetSlider * 0.4)}
                    </div>
                    <p className="mt-1 text-slate-500">Released after live post &amp; #ad verified.</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <span className="text-xs text-slate-600">
                    Test sending invites to your {activeCreators.length} selected creators:
                  </span>
                  <button
                    type="button"
                    onClick={() => setDispatchedBrief(true)}
                    className="rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-500"
                  >
                    {dispatchedBrief
                      ? `✓ Test Invites Sent to ${activeCreators.length} Creators!`
                      : 'Simulate Dispatching Creator Invites →'}
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-violet-100">
              <div className="flex items-center gap-4 text-xs text-slate-600">
                <span className="inline-flex items-center gap-1">
                  <Lock className="h-3.5 w-3.5 text-violet-600" />
                  30/40/30 Stripe Escrow
                </span>
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  $0 MVP Platform Fee
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://bomie-ai-v5-autonomous-merchant-creator-campaign.ai.studio/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-violet-200 bg-white px-4 py-2.5 text-xs font-semibold text-[#161224] hover:bg-violet-50"
                >
                  Open Live V5 Studio
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setLaunchSuccess(false);
                    setShowLaunchModal(true);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-violet-600/20 hover:opacity-95"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-200" />
                  Launch This Free MVP Campaign
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* In-Page Launch Campaign Modal (Sends customized campaign straight to Discord!) */}
      {showLaunchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl border border-violet-200 bg-white p-7 shadow-2xl">
            <button
              type="button"
              onClick={() => setShowLaunchModal(false)}
              className="absolute top-5 right-5 rounded-lg border border-violet-200 p-1.5 text-slate-500 hover:bg-violet-50 hover:text-[#161224]"
            >
              <X className="h-4 w-4" />
            </button>

            {launchSuccess ? (
              <div className="py-6 text-center space-y-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#161224]">Campaign Request Sent!</h3>
                <div className="inline-flex rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 font-mono text-xs text-emerald-700">
                  Ref: {launchLeadId}
                </div>
                <p className="text-sm text-slate-600">
                  We received your <strong>${budgetSlider} ({promoOffer})</strong> campaign for <strong>{activePlan.city}</strong>. Lucian &amp; our team will reach out via your preferred channel within 24 hours!
                </p>
                <button
                  type="button"
                  onClick={() => setShowLaunchModal(false)}
                  className="rounded-xl bg-violet-600 px-6 py-2.5 text-xs font-bold text-white"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleLaunchSubmit} className="space-y-4">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-violet-600">
                    MVP Limited-Time Free ($0 Platform Fee)
                  </span>
                  <h3 className="mt-1 text-2xl font-bold text-[#161224]">
                    Launch Your {activePlan.city.split(',')[0]} Campaign
                  </h3>
                  <p className="mt-1 text-xs text-slate-600">
                    Configured Plan: <strong>${budgetSlider.toLocaleString()}</strong> · <strong>{promoOffer}</strong> · <strong>{activeCreators.length} Creators</strong>
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={launchName}
                      onChange={(e) => setLaunchName(e.target.value)}
                      placeholder="Alex Chen"
                      className="w-full rounded-xl border border-violet-200 bg-[#f7f4ff] px-3.5 py-2.5 text-sm text-[#161224]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Store / Business Name *</label>
                    <input
                      type="text"
                      required
                      value={launchBiz}
                      onChange={(e) => setLaunchBiz(e.target.value)}
                      placeholder="Sichuan Bistro SF"
                      className="w-full rounded-xl border border-violet-200 bg-[#f7f4ff] px-3.5 py-2.5 text-sm text-[#161224]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={launchEmail}
                      onChange={(e) => setLaunchEmail(e.target.value)}
                      placeholder="alex@yourbusiness.com"
                      className="w-full rounded-xl border border-violet-200 bg-[#f7f4ff] px-3.5 py-2.5 text-sm text-[#161224]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={launchPhone}
                      onChange={(e) => setLaunchPhone(e.target.value)}
                      placeholder="+1 (415) 555-0192"
                      className="w-full rounded-xl border border-violet-200 bg-[#f7f4ff] px-3.5 py-2.5 text-sm text-[#161224]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Contact Method</label>
                  <div className="grid grid-cols-3 gap-2 rounded-xl border border-violet-200 bg-[#f7f4ff] p-1">
                    {(
                      [
                        { id: 'email', label: '✉️ Email' },
                        { id: 'phone', label: '📞 Phone / Text' },
                        { id: 'either', label: '✨ Either' },
                      ] as const
                    ).map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setLaunchPrefer(opt.id)}
                        className={`rounded-lg py-2 text-xs font-semibold transition ${
                          launchPrefer === opt.id
                            ? 'bg-violet-600 text-white'
                            : 'text-slate-600 hover:text-[#161224]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLaunching}
                  className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 text-sm font-bold text-white shadow-md"
                >
                  {isLaunching ? 'Submitting Campaign...' : 'Submit Free MVP Campaign →'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
