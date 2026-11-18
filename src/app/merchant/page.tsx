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
  ShieldCheck,
  Sparkles,
  Store,
  Users,
  Video,
  XCircle,
} from 'lucide-react';

interface GeneratedMerchantPlan {
  title: string;
  city: string;
  budget: number;
  roas: string;
  expectedViews: string;
  estConversions: string;
  creators: {
    id: string;
    handle: string;
    niche: string;
    distance: string;
    followers: string;
    match: string;
    fee: number;
  }[];
  scriptHook: string;
  shots: string[];
  ftcCaption: string;
}

function buildCustomMerchantPlan(promptText: string): GeneratedMerchantPlan {
  const lower = promptText.toLowerCase();

  // Extract budget number like $1,200 or 800
  const budgetMatch = promptText.match(/\$?\s*(\d{1,3}(?:,\d{3})+|\d{3,5})/);
  const parsedBudget = budgetMatch ? Math.max(300, Math.min(25000, Number(budgetMatch[1].replace(/,/g, '')))) : 1200;

  // Detect city
  let city = 'San Francisco, CA';
  if (lower.includes('la') || lower.includes('los angeles')) city = 'Los Angeles, CA';
  else if (lower.includes('seattle')) city = 'Seattle, WA';
  else if (lower.includes('vegas') || lower.includes('las vegas')) city = 'Las Vegas, NV';
  else if (lower.includes('new york') || lower.includes('nyc')) city = 'New York, NY';
  else if (lower.includes('austin')) city = 'Austin, TX';

  // Detect category / business type
  let bizLabel = 'Local Storefront';
  let niche = 'Neighborhood Lifestyle';
  let hook = '“POV: You just found the best hidden-gem spot in your neighborhood…”';
  let shots = [
    '0–3s: Storefront entrance + signature product close-up',
    '3–18s: Authentic behind-the-scenes / customer reaction',
    '18–30s: Exclusive 20% local QR voucher call-to-action',
  ];

  if (
    lower.includes('sichuan') ||
    lower.includes('restaurant') ||
    lower.includes('dining') ||
    lower.includes('food') ||
    lower.includes('boba') ||
    lower.includes('cafe') ||
    lower.includes('coffee')
  ) {
    bizLabel = lower.includes('boba') || lower.includes('coffee') || lower.includes('cafe')
      ? 'Neighborhood Cafe & Drinks'
      : 'Local Dining & Kitchen';
    niche = 'Foodie & Dining';
    hook = '“Wait until you see this tableside pour—20% off when you scan our local QR code.”';
    shots = [
      '0–3s: Sizzling dish / signature drink pour in warm lighting',
      '3–18s: First-bite reaction + cozy neighborhood atmosphere',
      '18–30s: Show QR table tent for 20% off weekend dine-in',
    ];
  } else if (lower.includes('spa') || lower.includes('skin') || lower.includes('beauty') || lower.includes('salon') || lower.includes('facial')) {
    bizLabel = 'Beauty & Wellness Studio';
    niche = 'Clean Beauty & Self-Care';
    hook = '“The 45-minute facial reset everyone in town is quietly booking right now…”';
    shots = [
      '0–3s: Sunlit treatment room & calming studio aesthetic',
      '3–18s: ASMR skincare / sculpting treatment close-up',
      '18–30s: Post-glow result + new-client booking QR code',
    ];
  } else if (lower.includes('candle') || lower.includes('craft') || lower.includes('boutique') || lower.includes('shop')) {
    bizLabel = 'Independent Craft & Boutique';
    niche = 'Home & Local Goods';
    hook = '“I found a local artisan studio hand-pouring the coziest scents right down the street.”';
    shots = [
      '0–3s: Hands crafting & packaging signature local product',
      '3–18s: Aesthetic home styling & unboxing moment',
      '18–30s: Weekend pop-up / in-store pickup perk',
    ];
  }

  const perCreator = Math.round(parsedBudget / 3);
  const viewsK = Math.round((parsedBudget / 100) * 2.9);
  const conversions = Math.round(parsedBudget / 16);

  return {
    title: `${bizLabel} · ${city.split(',')[0]} Campaign Plan`,
    city,
    budget: parsedBudget,
    roas: '3.45x',
    expectedViews: `${viewsK}K–${Math.round(viewsK * 1.4)}K Local Views`,
    estConversions: `${conversions}+ Tracked Visits / Orders`,
    creators: [
      {
        id: 'c1',
        handle: '@localtaste_club',
        niche,
        distance: '0.8 mi away',
        followers: '34.2K',
        match: '98% Match',
        fee: perCreator,
      },
      {
        id: 'c2',
        handle: '@neighborhood_vibes',
        niche,
        distance: '1.4 mi away',
        followers: '21.8K',
        match: '96% Match',
        fee: perCreator,
      },
      {
        id: 'c3',
        handle: '@cityhidden_gems',
        niche,
        distance: '2.1 mi away',
        followers: '16.5K',
        match: '95% Match',
        fee: parsedBudget - perCreator * 2,
      },
    ],
    scriptHook: hook,
    shots,
    ftcCaption: `#ad Paid partnership in ${city.split(',')[0]} · Scan QR in video for local perk!`,
  };
}

export default function MerchantPage() {
  const [presetIdx, setPresetIdx] = useState<number>(0);
  const [customPrompt, setCustomPrompt] = useState<string>(
    'I run a Sichuan restaurant in San Francisco with a $1,800 budget. Match 3 local foodie creators to drive weekend dine-in traffic.'
  );
  const [activePlan, setActivePlan] = useState<GeneratedMerchantPlan>(() =>
    buildCustomMerchantPlan(
      'I run a Sichuan restaurant in San Francisco with a $1,800 budget. Match 3 local foodie creators to drive weekend dine-in traffic.'
    )
  );
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [activePreviewTab, setActivePreviewTab] = useState<'creators' | 'script' | 'escrow'>('creators');
  const [selectedCreatorIds, setSelectedCreatorIds] = useState<string[]>(['c1', 'c2', 'c3']);
  const [dispatchedBrief, setDispatchedBrief] = useState<boolean>(false);

  const presets = [
    {
      label: '🍜 SF Restaurant ($1,800)',
      prompt:
        'I run a Sichuan restaurant in San Francisco with a $1,800 budget. Match 3 local foodie creators for weekend dine-in traffic.',
    },
    {
      label: '✨ LA Skin & Spa ($2,200)',
      prompt:
        'I own a facial spa in Los Angeles with a $2,200 budget. Match 3 local beauty creators for new client bookings.',
    },
    {
      label: '🕯️ Seattle Craft Shop ($800)',
      prompt:
        'I sell handmade soy candles in Seattle with an $800 budget. Match 3 neighborhood lifestyle creators.',
    },
  ];

  const runGeneration = (promptToRun: string) => {
    setIsGenerating(true);
    setDispatchedBrief(false);
    setTimeout(() => {
      const next = buildCustomMerchantPlan(promptToRun);
      setActivePlan(next);
      setSelectedCreatorIds(next.creators.map((c) => c.id));
      setIsGenerating(false);
    }, 450);
  };

  const toggleCreator = (id: string) => {
    setSelectedCreatorIds((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((x) => x !== id) : prev) : [...prev, id]
    );
  };

  const liveSelectedBudget = activePlan.creators
    .filter((c) => selectedCreatorIds.includes(c.id))
    .reduce((sum, c) => sum + c.fee, 0);

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
            <Link
              href="/creator"
              className="hidden sm:inline-flex text-xs font-semibold text-fuchsia-700 hover:text-violet-950"
            >
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

      <main className="mx-auto max-w-5xl px-6 py-14 space-y-16">
        {/* 1. Merchant Pain Points First */}
        <section className="space-y-8">
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

        {/* 2. Interactive Live Demo: How You Leverage Bomie AI */}
        <section className="space-y-8 border-t border-violet-200/70 pt-14">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-600">
              Live Interactive Demo · Try Typing Your Own Store
            </span>
            <h2 className="mt-1.5 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#161224]">
              How You Leverage Bomie AI in 30 Seconds
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Type your city, business, and budget below—then click through the 3 tabs to see how Bomie matches creators, writes scripts, and locks escrow.
            </p>
          </div>

          {/* Prompt Input Card */}
          <div className="rounded-3xl border border-violet-300 bg-white p-6 sm:p-7 shadow-xl shadow-violet-900/5 space-y-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                runGeneration(customPrompt);
              }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g., I run a boba shop in Seattle with a $1,000 budget..."
                className="flex-1 rounded-2xl border border-violet-200 bg-[#f7f4ff] px-4 py-3.5 text-sm text-[#161224] placeholder-slate-400 focus:border-violet-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={isGenerating}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-violet-600/20 transition hover:opacity-95 disabled:opacity-60"
              >
                <Sparkles className="h-4 w-4" />
                {isGenerating ? 'Matching Creators...' : 'Generate Plan'}
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-slate-500">Or click an example:</span>
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
          </div>

          {/* Interactive 3-Tab Result Workspace */}
          <div className="rounded-3xl border border-violet-200/80 bg-white p-6 sm:p-8 shadow-xl shadow-violet-900/5 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-violet-100 pb-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-600">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{activePlan.city} · MVP Limited-Time $0 Platform Fee</span>
                </div>
                <h3 className="mt-1 text-2xl font-bold text-[#161224]">{activePlan.title}</h3>
              </div>
              <div className="flex items-center gap-2 self-start">
                <span className="rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1 text-xs font-bold text-amber-800">
                  {activePlan.roas} Projected ROAS
                </span>
              </div>
            </div>

            {/* Summary KPIs */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-violet-100 bg-[#f7f4ff] p-4">
                <div className="text-xs text-slate-500">Selected Creators</div>
                <div className="mt-1 text-lg font-extrabold text-[#161224]">
                  {selectedCreatorIds.length} Local Creators
                </div>
              </div>
              <div className="rounded-2xl border border-violet-100 bg-[#f7f4ff] p-4">
                <div className="text-xs text-slate-500">Expected Local Reach</div>
                <div className="mt-1 text-lg font-extrabold text-emerald-700">
                  {activePlan.expectedViews}
                </div>
              </div>
              <div className="rounded-2xl border border-violet-200 bg-violet-50 p-4">
                <div className="text-xs text-violet-700">Total Creator Budget ($0 Fee)</div>
                <div className="mt-1 text-lg font-extrabold text-[#161224]">
                  ${liveSelectedBudget.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Interactive Step Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-violet-100 pb-3">
              {(
                [
                  { id: 'creators', label: '1. Select Local Creators', icon: Users },
                  { id: 'script', label: '2. Preview 30s AI Script', icon: FileText },
                  { id: 'escrow', label: '3. FTC & 30/40/30 Escrow', icon: ShieldCheck },
                ] as const
              ).map((tab) => {
                const Icon = tab.icon;
                const active = activePreviewTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActivePreviewTab(tab.id)}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition ${
                      active
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

            {/* Tab 1: Interactive Creator Selection */}
            {activePreviewTab === 'creators' && (
              <div className="grid gap-4 md:grid-cols-3">
                {activePlan.creators.map((c) => {
                  const picked = selectedCreatorIds.includes(c.id);
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => toggleCreator(c.id)}
                      className={`text-left rounded-2xl border p-4 transition ${
                        picked
                          ? 'border-violet-500 bg-violet-50/70 shadow-sm'
                          : 'border-violet-100 bg-[#f7f4ff] opacity-65 hover:opacity-100'
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
                      <div className="mt-3 flex items-center justify-between border-t border-violet-200/60 pt-2.5 text-xs">
                        <span className="text-slate-500">{c.niche}</span>
                        <span className="font-bold text-[#161224]">${c.fee}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Tab 2: 30s AI Script */}
            {activePreviewTab === 'script' && (
              <div className="rounded-2xl border border-violet-200 bg-[#f7f4ff] p-5 space-y-4">
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase text-violet-700">
                    AI Opening Hook (0–3s)
                  </span>
                  <p className="mt-1 text-base font-bold text-[#161224]">{activePlan.scriptHook}</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {activePlan.shots.map((shot, i) => (
                    <div key={i} className="rounded-xl border border-violet-200/70 bg-white p-3.5 text-xs text-slate-700">
                      <div className="font-bold text-violet-700 mb-1">Shot {i + 1}</div>
                      {shot}
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-medium text-emerald-800">
                  Auto-Included FTC Caption: <span className="font-bold">{activePlan.ftcCaption}</span>
                </div>
              </div>
            )}

            {/* Tab 3: FTC & 30/40/30 Escrow + Live Test Dispatch */}
            {activePreviewTab === 'escrow' && (
              <div className="rounded-2xl border border-violet-200 bg-[#f7f4ff] p-5 space-y-4">
                <div className="grid gap-3 sm:grid-cols-3 text-xs">
                  <div className="rounded-xl bg-white p-4 border border-violet-100">
                    <div className="font-bold text-violet-700">30% · Brief Accepted</div>
                    <div className="mt-1 text-lg font-extrabold text-[#161224]">
                      ${Math.round(liveSelectedBudget * 0.3)}
                    </div>
                    <p className="mt-1 text-slate-500">100% refundable if you cancel before acceptance.</p>
                  </div>
                  <div className="rounded-xl bg-white p-4 border border-violet-100">
                    <div className="font-bold text-fuchsia-700">40% · Script Approved</div>
                    <div className="mt-1 text-lg font-extrabold text-[#161224]">
                      ${Math.round(liveSelectedBudget * 0.4)}
                    </div>
                    <p className="mt-1 text-slate-500">Released only after you approve the 30s draft.</p>
                  </div>
                  <div className="rounded-xl bg-white p-4 border border-violet-100">
                    <div className="font-bold text-emerald-700">30% · Live &amp; FTC Verified</div>
                    <div className="mt-1 text-lg font-extrabold text-[#161224]">
                      ${liveSelectedBudget - Math.round(liveSelectedBudget * 0.3) - Math.round(liveSelectedBudget * 0.4)}
                    </div>
                    <p className="mt-1 text-slate-500">Auto-released once #ad &amp; post are verified live.</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <span className="text-xs text-slate-600">
                    Try clicking the button to simulate sending invites to your {selectedCreatorIds.length} selected creators:
                  </span>
                  <button
                    type="button"
                    onClick={() => setDispatchedBrief(true)}
                    className="rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-500"
                  >
                    {dispatchedBrief
                      ? `✓ Invites Sent to ${selectedCreatorIds.length} Creators!`
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
                  FTC 16 CFR Part 255 Verified
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
                <Link
                  href="/#pricing"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-violet-600/20 hover:opacity-95"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-200" />
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
