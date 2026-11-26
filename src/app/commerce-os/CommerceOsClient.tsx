'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import BrandFooter from '../../components/BrandFooter';
import DemoShowcase from '../../components/DemoShowcase';
import CreatorDemoShowcase from '../../components/CreatorDemoShowcase';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Gift,
  Repeat,
  ShieldCheck,
  SlidersHorizontal,
  Store,
  Video,
  Zap,
} from 'lucide-react';

interface MerchantSandboxPlan {
  city: string;
  category: string;
  baseBudget: number;
  title: string;
  roas: string;
  creators: { id: string; handle: string; niche: string; distance: string; weight: number }[];
  hookTemplate: string;
  stages: { s: string; name: string; detail: string }[];
}

interface CreatorSandboxPlan {
  handle: string;
  city: string;
  baseCollabs: number;
  avgPayout: number;
  offers: { brand: string; neighborhood: string; payout: number; perk: string; deliverable: string }[];
  scriptHook: string;
}

function buildMerchantPlan(prompt: string): MerchantSandboxPlan {
  const lower = prompt.toLowerCase();
  const budgetMatch = prompt.match(/\$?(\d[\d,]*)/);
  const parsedBudget = budgetMatch ? Math.min(5000, Math.max(500, Number(budgetMatch[1].replace(/,/g, '')))) : 1800;

  let city = 'San Francisco';
  if (lower.includes('la') || lower.includes('los angeles')) city = 'Los Angeles';
  else if (lower.includes('seattle')) city = 'Seattle';
  else if (lower.includes('vegas') || lower.includes('las vegas')) city = 'Las Vegas';
  else if (lower.includes('ny') || lower.includes('new york')) city = 'New York';

  if (lower.includes('spa') || lower.includes('facial') || lower.includes('beauty') || lower.includes('salon')) {
    return {
      city,
      category: 'Beauty & Wellness',
      baseBudget: parsedBudget,
      title: `Beauty & Wellness · ${city} Booking Plan`,
      roas: '3.55x',
      creators: [
        { id: 'c1', handle: '@glowwithchloe', niche: 'Skincare & ASMR', distance: '0.8 mi', weight: 0.4 },
        { id: 'c2', handle: '@la_selfcare_club', niche: 'Wellness Routines', distance: '1.4 mi', weight: 0.35 },
        { id: 'c3', handle: '@cleanbeauty_maya', niche: 'Local Spa Reviews', distance: '2.1 mi', weight: 0.25 },
      ],
      hookTemplate: `POV: You found the most relaxing hidden facial studio in ${city} — mention "{PROMO}" at check-in.`,
      stages: [
        { s: '01', name: 'Intake & Vision', detail: `Parsed ${city} wellness brief · Studio Fit 96%` },
        { s: '02', name: '3-Agent FTC Gate', detail: 'PASS · Cosmetic claims audited & #ad locked' },
        { s: '03', name: 'Creator & 30s Script', detail: '3 local beauty creators + ASMR shot list' },
        { s: '04', name: 'ROI & 30/40/30 Escrow', detail: '3.55x Projected ROAS · QR booking attribution' },
      ],
    };
  }

  if (lower.includes('candle') || lower.includes('craft') || lower.includes('boutique') || lower.includes('shop')) {
    return {
      city,
      category: 'Local Craft & Retail',
      baseBudget: parsedBudget,
      title: `Boutique & Craft · ${city} Foot-Traffic Plan`,
      roas: '3.40x',
      creators: [
        { id: 'c1', handle: '@cozyhomewithsam', niche: 'Home Aesthetics', distance: '0.5 mi', weight: 0.38 },
        { id: 'c2', handle: '@neighborhood_finds', niche: 'Weekend Markets', distance: '1.2 mi', weight: 0.34 },
        { id: 'c3', handle: '@minimal_living_pnw', niche: 'Craft & Decor', distance: '1.9 mi', weight: 0.28 },
      ],
      hookTemplate: `3 reasons this neighborhood boutique in ${city} is my weekend obsession — show code "{PROMO}" in-store.`,
      stages: [
        { s: '01', name: 'Intake & Vision', detail: `Parsed ${city} retail brief · Aesthetic Fit 95%` },
        { s: '02', name: '3-Agent FTC Gate', detail: 'PASS · Commercial audio & #ad verified' },
        { s: '03', name: 'Creator & 30s Script', detail: '3 neighborhood lifestyle creators + unboxing script' },
        { s: '04', name: 'ROI & 30/40/30 Escrow', detail: '3.40x Projected ROAS · Auto-payout on post' },
      ],
    };
  }

  return {
    city,
    category: 'Local Dining & Kitchen',
    baseBudget: parsedBudget,
    title: `Local Dining · ${city} Dine-In Plan`,
    roas: '3.45x',
    creators: [
      { id: 'c1', handle: '@sfnoodleclub', niche: 'Neighborhood Eats', distance: '0.6 mi', weight: 0.4 },
      { id: 'c2', handle: '@bayarea_bites', niche: 'Weekend Date Spots', distance: '1.3 mi', weight: 0.35 },
      { id: 'c3', handle: '@late_night_cravings', niche: 'Authentic Kitchens', distance: '1.8 mi', weight: 0.25 },
    ],
    hookTemplate: `Stop scrolling if you are in ${city} tonight — this hidden kitchen just dropped "{PROMO}" for dine-in guests.`,
    stages: [
      { s: '01', name: 'Intake & Vision', detail: `Parsed ${city} dining brief · Readiness 94%` },
      { s: '02', name: '3-Agent FTC Gate', detail: 'PASS · Risk 18/100 · #ad disclosure locked' },
      { s: '03', name: 'Creator & 30s Script', detail: '3 local foodie creators + 30s dining storyboard' },
      { s: '04', name: 'ROI & 30/40/30 Escrow', detail: '3.45x Projected ROAS · 100% refundable pre-accept' },
    ],
  };
}

function buildCreatorPlan(prompt: string): CreatorSandboxPlan {
  const lower = prompt.toLowerCase();
  let city = 'San Francisco';
  if (lower.includes('la') || lower.includes('los angeles')) city = 'Los Angeles';
  else if (lower.includes('seattle')) city = 'Seattle';
  else if (lower.includes('vegas')) city = 'Las Vegas';

  if (lower.includes('beauty') || lower.includes('spa') || lower.includes('skincare') || lower.includes('chloe')) {
    return {
      handle: '@glowwithchloe_la (28.1K)',
      city,
      baseCollabs: 4,
      avgPayout: 480,
      offers: [
        {
          brand: 'Lumina Skin Studio',
          neighborhood: 'West Hollywood · 0.9 mi',
          payout: 520,
          perk: 'Free Signature Hydra-Facial',
          deliverable: '1x 30s ASMR Reel + FTC #ad',
        },
        {
          brand: 'Botanica Hair Lounge',
          neighborhood: 'Silver Lake · 1.6 mi',
          payout: 460,
          perk: 'Complimentary Gloss Treatment',
          deliverable: '1x 25s GRWM Storyboard',
        },
        {
          brand: 'Pure Aura Apothecary',
          neighborhood: 'Melrose · 1.2 mi',
          payout: 450,
          perk: '$120 Skincare Gift Bag',
          deliverable: '1x 30s Routine Walkthrough',
        },
      ],
      scriptHook: '3-second tactile close-up + soft ASMR voiceover: "Here is the exact 45-minute reset I book every month..."',
    };
  }

  if (lower.includes('coffee') || lower.includes('craft') || lower.includes('home') || lower.includes('pnw')) {
    return {
      handle: '@pnwcoffeeclub (15.7K)',
      city,
      baseCollabs: 4,
      avgPayout: 320,
      offers: [
        {
          brand: 'Cedar & Roast Espresso',
          neighborhood: 'Capitol Hill · 0.5 mi',
          payout: 340,
          perk: '$60 Tasting Tab + Merch',
          deliverable: '1x 25s Pour-Over Reel',
        },
        {
          brand: 'Bloom Soy Candles',
          neighborhood: 'Ballard · 1.4 mi',
          payout: 310,
          perk: '3-Piece Seasonal Set',
          deliverable: '1x 30s Cozy Home Tour',
        },
        {
          brand: 'Moss & Ceramic Studio',
          neighborhood: 'Fremont · 1.8 mi',
          payout: 310,
          perk: 'Private Pottery Session',
          deliverable: '1x 30s Weekend Find Reel',
        },
      ],
      scriptHook: 'Natural morning window light + 2s espresso pour: "Skip the chain cafes — this corner spot..."',
    };
  }

  return {
    handle: '@sfnoodleclub (34.2K)',
    city,
    baseCollabs: 4,
    avgPayout: 420,
    offers: [
      {
        brand: 'Chili & Silk Sichuan',
        neighborhood: 'Mission District · 0.7 mi',
        payout: 450,
        perk: '$110 Tasting Menu for Two',
        deliverable: '1x 30s Dine-In Reel + QR Code',
      },
      {
        brand: 'Koji Ramen House',
        neighborhood: 'Inner Sunset · 1.5 mi',
        payout: 410,
        perk: '$85 Chef Tasting',
        deliverable: '1x 30s Broth Pull Hook',
      },
      {
        brand: 'Matcha & Mochi Bar',
        neighborhood: 'Hayes Valley · 1.1 mi',
        payout: 390,
        perk: 'VIP Dessert Box',
        deliverable: '1x 25s Hidden Gem Reel',
      },
    ],
    scriptHook: '2-second sizzling close-up: "If you are in the neighborhood tonight, do not miss this $0-hidden-fee spot..."',
  };
}

const flywheelNodes = [
  {
    step: '01',
    tag: 'Smart Matching',
    title: 'Hyper-Local AI Matching',
    icon: Zap,
    merchantSide:
      'Matches your storefront with verified neighborhood creators within 0.5–15 miles based on local foot-traffic fit.',
    creatorSide:
      'Delivers curated, paid brand invites straight to your inbox—matched to your authentic style with zero cold DMs.',
  },
  {
    step: '02',
    tag: 'Co-Creation Studio',
    title: '30s Script & Shot Copilot',
    icon: Video,
    merchantSide:
      'Auto-generates high-converting 30s storyboards, hook options, and store highlights tailored to your menu or service.',
    creatorSide:
      'Gives you ready-to-film shot checklists, voice-matched hooks, and trending commercial audio cleared for brand use.',
  },
  {
    step: '03',
    tag: 'Governance & Escrow',
    title: '3-Agent FTC & Escrow Shield',
    icon: ShieldCheck,
    merchantSide:
      'Audits briefs and verifies live #ad disclosures (FTC 16 CFR Part 255) before releasing 30/40/30 escrow milestones.',
    creatorSide:
      'Protects your creative work with guaranteed milestone escrow—once you post a compliant video, payout is locked.',
  },
  {
    step: '04',
    tag: 'Real-Time ROI',
    title: 'Walk-In & QR Attribution',
    icon: BarChart3,
    merchantSide:
      'Tracks real in-store QR redemptions, table covers, and online checkouts per creator instead of vanity impressions.',
    creatorSide:
      'Proves your real neighborhood sales impact so you automatically unlock view & redemption performance bonuses.',
  },
  {
    step: '05',
    tag: 'Instant Settlement',
    title: 'Automated Seeding & Payouts',
    icon: Gift,
    merchantSide:
      'Automates tasting/product perks, promo codes, and instant milestone payouts with $0 monthly fee during MVP.',
    creatorSide:
      'Withdraw earnings in seconds via Stripe or Apple Pay with 0% creator fee—no chasing invoices or waiting 60 days.',
  },
  {
    step: '06',
    tag: 'Compounding Loop',
    title: 'Always-On Community Flywheel',
    icon: Repeat,
    merchantSide:
      'Turns top-performing local creators into recurring monthly brand ambassadors that keep weekend tables full.',
    creatorSide:
      'Builds long-term neighborhood retainers ($450–$1,200/mo) with local businesses that love working with you.',
  },
];

export default function CommerceOsClient() {
  const [role, setRole] = useState<'merchant' | 'creator'>('merchant');
  const [guideStep, setGuideStep] = useState<1 | 2 | 3>(1);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [presetIdx, setPresetIdx] = useState<number>(-1);
  const [thinkingStage, setThinkingStage] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [demoSide, setDemoSide] = useState<'merchant' | 'creator'>('merchant');

  // Merchant interactive state
  const [merchantPlan, setMerchantPlan] = useState<MerchantSandboxPlan>(() =>
    buildMerchantPlan(
      'I run a Sichuan restaurant in San Francisco with a $1,800 budget. Match 3 local foodie creators for weekend dine-in traffic.'
    )
  );
  const [budgetSlider, setBudgetSlider] = useState<number>(1800);
  const [promoOffer, setPromoOffer] = useState<'20% Off' | 'Free Appetizer' | 'BOGO Deal'>('20% Off');

  // Creator interactive state
  const [creatorPlan, setCreatorPlan] = useState<CreatorSandboxPlan>(() =>
    buildCreatorPlan('I am @sfnoodleclub (34K) food & lifestyle creator in San Francisco looking for paid local restaurant deals.')
  );
  const [collabCount, setCollabCount] = useState<number>(4);

  const merchantPresets = [
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

  const creatorPresets = [
    {
      label: '🍜 @sfnoodleclub (34.2K)',
      prompt:
        'I am @sfnoodleclub (34K) food & lifestyle creator in San Francisco looking for paid local restaurant deals.',
    },
    {
      label: '✨ @glowwithchloe_la (28.1K)',
      prompt:
        'I am @glowwithchloe_la in Los Angeles creating beauty & skincare reels and want recurring spa deals.',
    },
    {
      label: '☕ @pnwcoffeeclub (15.7K)',
      prompt:
        'I am @pnwcoffeeclub in Seattle looking for paid local coffee shop and craft brand collabs.',
    },
  ];

  const switchRole = (nextRole: 'merchant' | 'creator') => {
    setRole(nextRole);
    setCustomPrompt('');
    setPresetIdx(-1);
    setThinkingStage(0);
    setGuideStep(1);
  };

  const runSimulation = (promptText: string) => {
    setGuideStep(2);
    setThinkingStage(1);
    setTimeout(() => setThinkingStage(2), 340);
    setTimeout(() => setThinkingStage(3), 680);
    setTimeout(() => {
      if (role === 'merchant') {
        const next = buildMerchantPlan(promptText);
        setMerchantPlan(next);
        setBudgetSlider(next.baseBudget);
      } else {
        const next = buildCreatorPlan(promptText);
        setCreatorPlan(next);
        setCollabCount(next.baseCollabs);
      }
      setThinkingStage(4);
      setGuideStep(3);
    }, 1020);
  };

  const estMerchantViewsK = Math.round((budgetSlider / 100) * 2.9);
  const estMerchantVisits = Math.round(budgetSlider / 15.5);
  const estCreatorMonthly = collabCount * creatorPlan.avgPayout;

  return (
    <div className="min-h-screen bg-[#f7f4ff] text-[#161224] selection:bg-violet-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-violet-200/70 bg-[#f7f4ff]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10 py-3.5 sm:py-4">
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
              href="/pricing"
              className="hidden sm:inline-flex rounded-xl px-3 py-2 text-xs font-semibold text-violet-700 transition hover:bg-violet-100 hover:text-violet-950"
            >
              Pricing (MVP Free)
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-xl border border-violet-200/80 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-violet-50 hover:text-violet-950"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1320px] space-y-14 px-4 sm:px-6 lg:px-10 py-10 sm:py-12">
        {/* Hero: System Overview */}
        <section className="mx-auto max-w-5xl text-center space-y-3">
          <h1 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-[#161224] sm:text-5xl">
            North America&apos;s First AI Operating System for
            <br className="hidden sm:inline" />{' '}
            <span className="bg-gradient-to-r from-violet-700 via-fuchsia-600 to-amber-500 bg-clip-text text-transparent">
              Local Merchants &amp; Creators
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Match nearby stores and creators, generate 30s reels, audit FTC compliance, and settle 30/40/30 Stripe Escrow automatically.
          </p>
        </section>

        {/* Unified Dual-Sided Automated Demo (Merchant OS / Creator OS) */}
        <section className="space-y-4">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-1.5 rounded-2xl border border-violet-200 bg-white p-1.5 shadow-sm">
              <button
                type="button"
                onMouseEnter={() => setDemoSide('merchant')}
                onClick={() => setDemoSide('merchant')}
                className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition cursor-pointer ${
                  demoSide === 'merchant'
                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-violet-50 hover:text-violet-950'
                }`}
              >
                <Store className="h-4 w-4" />
                <span>Merchant OS Demo</span>
              </button>
              <button
                type="button"
                onMouseEnter={() => setDemoSide('creator')}
                onClick={() => setDemoSide('creator')}
                className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition cursor-pointer ${
                  demoSide === 'creator'
                    ? 'bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-fuchsia-50 hover:text-fuchsia-950'
                }`}
              >
                <Video className="h-4 w-4" />
                <span>Creator OS Demo</span>
              </button>
            </div>
          </div>

          <div className="pt-3.5">
            {demoSide === 'merchant' ? (
              <DemoShowcase showHero={false} hideCustomDrawerButton={true} />
            ) : (
              <CreatorDemoShowcase />
            )}
          </div>
        </section>

        {/* Interactive Guided System Sandbox (Merged How It Works) */}
        <section className="space-y-6 px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="font-mono text-xs font-semibold uppercase tracking-widest text-violet-700">
                INTERACTIVE SYSTEM SANDBOX · TRY BOTH SIDES
              </div>
              <h2 className="mt-1.5 text-2xl font-extrabold tracking-tight text-[#161224] sm:text-3xl">
                Test the Commerce OS in 3 Simple Steps
              </h2>
            </div>

            {/* Role Toggle */}
            <div className="inline-flex rounded-2xl border border-violet-200 bg-white p-1 shadow-sm">
              <button
                type="button"
                onClick={() => switchRole('merchant')}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                  role === 'merchant'
                    ? 'bg-gradient-to-r from-[#5b21b6] to-[#d946ef] text-white shadow-sm'
                    : 'text-slate-600 hover:text-violet-900'
                }`}
              >
                <Store className="h-3.5 w-3.5" />
                Merchant OS
              </button>
              <button
                type="button"
                onClick={() => switchRole('creator')}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                  role === 'creator'
                    ? 'bg-gradient-to-r from-[#d946ef] to-[#7c3aed] text-white shadow-sm'
                    : 'text-slate-600 hover:text-violet-900'
                }`}
              >
                <Video className="h-3.5 w-3.5" />
                Creator OS
              </button>
            </div>
          </div>

          {/* 3-Step Guided Onboarding Bar */}
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              {
                step: 1 as const,
                title: role === 'merchant' ? 'Step 1 · Describe Your Store' : 'Step 1 · Enter Handle & City',
                desc:
                  role === 'merchant'
                    ? 'Type your city & goal, or tap an example'
                    : 'Type your niche & city, or pick a persona',
              },
              {
                step: 2 as const,
                title: role === 'merchant' ? 'Step 2 · Click "Generate Plan"' : 'Step 2 · Click "Find Local Deals"',
                desc:
                  role === 'merchant'
                    ? 'Watch Bomie AI match creators & FTC rules'
                    : 'Watch AI match nearby paid brand offers',
              },
              {
                step: 3 as const,
                title: role === 'merchant' ? 'Step 3 · Tune Budget & Offer' : 'Step 3 · Tune Monthly Collabs',
                desc:
                  role === 'merchant'
                    ? 'Adjust budget & promo live—$0 MVP fee'
                    : 'Adjust monthly goal & preview 0% fee payout',
              },
            ].map((item) => {
              const isActive = guideStep === item.step;
              const isDone = guideStep > item.step;
              return (
                <div
                  key={item.step}
                  className={`rounded-2xl border px-4 py-3 transition ${
                    isActive
                      ? role === 'merchant'
                        ? 'border-violet-400 bg-white shadow-md shadow-violet-500/10'
                        : 'border-fuchsia-400 bg-white shadow-md shadow-fuchsia-500/10'
                      : isDone
                      ? 'border-emerald-200 bg-emerald-50/60'
                      : 'border-violet-200/70 bg-white/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-extrabold ${
                        isActive
                          ? role === 'merchant'
                            ? 'text-violet-700'
                            : 'text-fuchsia-700'
                          : isDone
                          ? 'text-emerald-700'
                          : 'text-slate-600'
                      }`}
                    >
                      {item.title}
                    </span>
                    {isActive && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold text-white ${
                          role === 'merchant' ? 'bg-violet-600' : 'bg-fuchsia-600'
                        }`}
                      >
                        Next
                      </span>
                    )}
                    {isDone && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500">{item.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Prompt Box with Blinking Cursor & No Sparkle Icon on Button */}
          <div className="rounded-3xl border border-violet-200/90 bg-white p-5 shadow-lg shadow-violet-900/5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                {customPrompt === '' && !isInputFocused && (
                  <div className="pointer-events-none absolute inset-0 flex items-center overflow-hidden px-4 text-sm text-slate-400">
                    <span className="mr-0.5 inline-block h-4 w-[2px] bg-[#161224] animate-caret-blink" />
                    <span className="truncate">
                      {role === 'merchant'
                        ? 'e.g., I run a Sichuan restaurant in San Francisco with a $1,800 budget...'
                        : 'e.g., I am @sfnoodleclub (34K) food creator in San Francisco looking for paid deals...'}
                    </span>
                  </div>
                )}
                <input
                  type="text"
                  value={customPrompt}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  onChange={(e) => {
                    setCustomPrompt(e.target.value);
                    setPresetIdx(-1);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const fallback =
                        role === 'merchant' ? merchantPresets[0].prompt : creatorPresets[0].prompt;
                      runSimulation(customPrompt.trim() || fallback);
                    }
                  }}
                  placeholder={
                    isInputFocused
                      ? role === 'merchant'
                        ? 'Describe your business, city & budget...'
                        : 'Enter your @handle, city & content niche...'
                      : ''
                  }
                  className={`w-full rounded-2xl border px-4 py-3.5 text-sm text-[#161224] placeholder:text-slate-400 focus:outline-none ${
                    role === 'merchant'
                      ? 'border-violet-200 bg-[#faf8ff] focus:border-violet-500'
                      : 'border-fuchsia-200 bg-[#fdf7ff] focus:border-fuchsia-500'
                  }`}
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  const fallback =
                    role === 'merchant' ? merchantPresets[0].prompt : creatorPresets[0].prompt;
                  runSimulation(customPrompt.trim() || fallback);
                }}
                className={`inline-flex shrink-0 items-center justify-center rounded-2xl px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:scale-[1.01] ${
                  role === 'merchant'
                    ? 'bg-gradient-to-r from-[#5b21b6] to-[#d946ef] shadow-violet-500/25'
                    : 'bg-gradient-to-r from-[#d946ef] to-[#7c3aed] shadow-fuchsia-500/25'
                }`}
              >
                {role === 'merchant' ? 'Generate Plan' : 'Find Local Deals'}
              </button>
            </div>

            {/* Quick Example Chips */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-500">
                {role === 'merchant' ? 'Step 1 Quick Examples:' : 'Step 1 Creator Personas:'}
              </span>
              {(role === 'merchant' ? merchantPresets : creatorPresets).map((p, idx) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    setPresetIdx(idx);
                    setCustomPrompt(p.prompt);
                    runSimulation(p.prompt);
                  }}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                    presetIdx === idx
                      ? role === 'merchant'
                        ? 'border-violet-500 bg-violet-100 text-violet-900'
                        : 'border-fuchsia-500 bg-fuchsia-100 text-fuchsia-900'
                      : 'border-violet-200/80 bg-white text-slate-600 hover:border-violet-300 hover:bg-violet-50'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Live AI Thinking Stream */}
            {thinkingStage > 0 && thinkingStage < 4 && (
              <div className="mt-5 rounded-2xl border border-violet-200 bg-[#faf8ff] p-4 font-mono text-xs text-slate-700 space-y-1.5">
                <div className="flex items-center gap-2 text-violet-700 font-bold">
                  <span className="h-2 w-2 rounded-full bg-violet-600 animate-ping" />
                  Bomie Commerce OS Reasoning...
                </div>
                {thinkingStage >= 1 && (
                  <div>[01] Parsing local intent, geo-radius (0.5–15 mi), and category benchmarks...</div>
                )}
                {thinkingStage >= 2 && (
                  <div>[02] Running 3-Agent FTC 16 CFR Part 255 &amp; 30/40/30 Escrow compliance gate...</div>
                )}
                {thinkingStage >= 3 && (
                  <div>
                    [03]{' '}
                    {role === 'merchant'
                      ? 'Scoring verified local creators & drafting 30s storyboard hooks...'
                      : 'Matching paid storefront briefs & locking 0% creator fee payouts...'}
                  </div>
                )}
              </div>
            )}

            {/* Live Interactive Output Panel */}
            <div className="mt-6 rounded-2xl border border-violet-200/80 bg-[#faf8ff] p-5 sm:p-6">
              {role === 'merchant' ? (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
                        {merchantPlan.city} · MVP $0 PLATFORM FEE
                      </div>
                      <h3 className="text-xl font-extrabold text-[#161224]">{merchantPlan.title}</h3>
                    </div>
                    <span className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">
                      {merchantPlan.roas} Projected ROAS
                    </span>
                  </div>

                  {/* Interactive Controls */}
                  <div className="grid gap-4 rounded-2xl border border-violet-200/80 bg-white p-4 sm:grid-cols-2">
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                        <span className="inline-flex items-center gap-1.5">
                          <SlidersHorizontal className="h-3.5 w-3.5 text-violet-600" />
                          Creator Budget (100% to Creators)
                        </span>
                        <span className="font-mono text-sm text-violet-700">
                          ${budgetSlider.toLocaleString()}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={500}
                        max={5000}
                        step={100}
                        value={budgetSlider}
                        onChange={(e) => {
                          setBudgetSlider(Number(e.target.value));
                          setGuideStep(3);
                        }}
                        className="mt-2.5 w-full accent-violet-600"
                      />
                    </div>

                    <div>
                      <div className="text-xs font-bold text-slate-700">Customer Walk-In Offer</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {(['20% Off', 'Free Appetizer', 'BOGO Deal'] as const).map((offer) => (
                          <button
                            key={offer}
                            type="button"
                            onClick={() => {
                              setPromoOffer(offer);
                              setGuideStep(3);
                            }}
                            className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${
                              promoOffer === offer
                                ? 'border-violet-600 bg-violet-600 text-white'
                                : 'border-violet-200 bg-violet-50/50 text-slate-700 hover:bg-violet-100'
                            }`}
                          >
                            {offer}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 4-Stage Summary + Live Metrics */}
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-violet-200/70 bg-white p-4">
                      <div className="text-[11px] font-semibold text-slate-500">Projected Local Reach</div>
                      <div className="mt-1 text-lg font-extrabold text-[#161224]">
                        {estMerchantViewsK},000+ Views
                      </div>
                      <div className="text-[11px] text-emerald-700">Est. {estMerchantVisits} Store Visits</div>
                    </div>
                    <div className="rounded-xl border border-violet-200/70 bg-white p-4">
                      <div className="text-[11px] font-semibold text-slate-500">AI Matched Creators</div>
                      <div className="mt-1 text-lg font-extrabold text-[#161224]">
                        {merchantPlan.creators.length} Verified Locals
                      </div>
                      <div className="text-[11px] text-violet-700">0.5–2.1 mi from storefront</div>
                    </div>
                    <div className="rounded-xl border border-violet-200/70 bg-white p-4">
                      <div className="text-[11px] font-semibold text-slate-500">Live 30s Hook Preview</div>
                      <p className="mt-1 line-clamp-2 text-xs font-medium text-slate-700">
                        {merchantPlan.hookTemplate.replace('{PROMO}', promoOffer)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-violet-200/70 pt-4">
                    <span className="text-xs text-slate-600">
                      Protected by 30/40/30 Stripe Escrow &amp; FTC 16 CFR Part 255 Auto-Audit.
                    </span>
                    <Link
                      href="/merchant"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#5b21b6] to-[#d946ef] px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:opacity-95"
                    >
                      Open Full Merchant OS
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-fuchsia-700">
                        {creatorPlan.city} · 0% CREATOR FEE
                      </div>
                      <h3 className="text-xl font-extrabold text-[#161224]">{creatorPlan.handle}</h3>
                    </div>
                    <span className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
                      Est. ${estCreatorMonthly.toLocaleString()}/mo · 0% Fee
                    </span>
                  </div>

                  {/* Interactive Collab Slider */}
                  <div className="rounded-2xl border border-fuchsia-200/80 bg-white p-4">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span className="inline-flex items-center gap-1.5">
                        <SlidersHorizontal className="h-3.5 w-3.5 text-fuchsia-600" />
                        Monthly Local Collabs Goal
                      </span>
                      <span className="font-mono text-sm text-fuchsia-700">
                        {collabCount} Collabs → ${estCreatorMonthly.toLocaleString()}/mo
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={8}
                      step={1}
                      value={collabCount}
                      onChange={(e) => {
                        setCollabCount(Number(e.target.value));
                        setGuideStep(3);
                      }}
                      className="mt-2.5 w-full accent-fuchsia-600"
                    />
                  </div>

                  {/* Matched Offers */}
                  <div className="grid gap-3 sm:grid-cols-3">
                    {creatorPlan.offers.map((offer) => (
                      <div key={offer.brand} className="rounded-xl border border-fuchsia-200/70 bg-white p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-[#161224]">{offer.brand}</span>
                          <span className="font-mono text-xs font-bold text-emerald-700">${offer.payout}</span>
                        </div>
                        <div className="mt-1 text-[11px] text-slate-500">{offer.neighborhood}</div>
                        <div className="mt-2 text-[11px] font-semibold text-fuchsia-700">{offer.perk}</div>
                        <div className="mt-0.5 text-[11px] text-slate-600">{offer.deliverable}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-fuchsia-200/70 pt-4">
                    <span className="text-xs text-slate-600">
                      AI Script Hook: &ldquo;{creatorPlan.scriptHook}&rdquo;
                    </span>
                    <Link
                      href="/creator"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#d946ef] to-[#7c3aed] px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:opacity-95"
                    >
                      Open Full Creator OS
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Section 3: 6-Node Closed-Loop System Architecture */}
        <section className="space-y-6 px-4 sm:px-6 lg:px-10">
          <div>
            <div className="font-mono text-xs font-semibold uppercase tracking-widest text-violet-700">
              SYSTEM ARCHITECTURE · 6 CLOSED-LOOP NODES
            </div>
            <h2 className="mt-1.5 text-2xl font-extrabold tracking-tight text-[#161224] sm:text-3xl">
              How Every Campaign Feeds the Next
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {flywheelNodes.map((node) => {
              const Icon = node.icon;
              return (
                <div
                  key={node.step}
                  className="flex flex-col rounded-3xl border border-violet-200/80 bg-white/95 p-6 shadow-sm transition hover:border-violet-300 hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-violet-200 bg-violet-50 text-violet-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                      NODE {node.step} · {node.tag}
                    </div>
                  </div>
                  <h3 className="mt-4 text-lg font-extrabold text-[#161224]">{node.title}</h3>
                  <div className="mt-4 space-y-2.5 text-xs leading-relaxed">
                    <div className="rounded-xl border border-violet-100 bg-violet-50/50 p-3">
                      <div className="mb-1 flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-violet-700">
                        <Store className="h-3 w-3" />
                        Merchant Side
                      </div>
                      <p className="text-slate-700">{node.merchantSide}</p>
                    </div>
                    <div className="rounded-xl border border-fuchsia-100 bg-fuchsia-50/50 p-3">
                      <div className="mb-1 flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-fuchsia-700">
                        <Video className="h-3 w-3" />
                        Creator Side
                      </div>
                      <p className="text-slate-700">{node.creatorSide}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-violet-300/80 bg-gradient-to-r from-violet-100 via-white to-fuchsia-100 p-8 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-xl font-extrabold text-[#161224]">
              Ready to try Bomie Commerce OS with $0 platform fee?
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              During our MVP launch, small businesses and local creators get full system access completely free.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/pricing"
              className="rounded-xl border border-violet-200 bg-white px-5 py-3 text-xs font-bold text-violet-900 shadow-sm transition hover:bg-violet-50"
            >
              View Pricing &amp; MVP Free Plan
            </Link>
            <Link
              href="/merchant"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#5b21b6] to-[#d946ef] px-5 py-3 text-xs font-bold text-white shadow-md shadow-violet-500/25 transition hover:scale-[1.02]"
            >
              Start as Merchant
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
        </section>
      </main>
      <BrandFooter />
    </div>
  );
}
