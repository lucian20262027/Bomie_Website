'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Sparkles,
  Store,
  Video,
  Wallet,
  XCircle,
} from 'lucide-react';

interface CreatorDealPlan {
  handle: string;
  city: string;
  offers: {
    id: string;
    merchant: string;
    distance: string;
    pay: number;
    perk: string;
    deliverable: string;
  }[];
  hooks: {
    vlog: string;
    asmr: string;
    top3: string;
  };
}

function buildCreatorPlan(promptText: string): CreatorDealPlan {
  const lower = promptText.toLowerCase();
  let city = 'San Francisco';
  if (lower.includes('la') || lower.includes('los angeles')) city = 'Los Angeles';
  else if (lower.includes('seattle')) city = 'Seattle';
  else if (lower.includes('vegas')) city = 'Las Vegas';
  else if (lower.includes('austin')) city = 'Austin';

  const handleMatch = promptText.match(/@[a-zA-Z0-9_.]+/);
  const handle = handleMatch ? handleMatch[0] : '@your_local_handle';

  if (lower.includes('beauty') || lower.includes('spa') || lower.includes('skin') || lower.includes('fashion')) {
    return {
      handle: `${handle} · ${city}`,
      city,
      offers: [
        { id: 'o1', merchant: 'Lumina Skin & Spa', distance: '0.9 mi away', pay: 520, perk: '+ Free Sculpting Facial', deliverable: '1x 30s Reel' },
        { id: 'o2', merchant: 'Silver Lake Pilates Club', distance: '1.6 mi away', pay: 450, perk: '+ 4-Class VIP Pass', deliverable: '1x Morning Vlog' },
      ],
      hooks: {
        vlog: '“Come with me to try the viral sculpting facial everyone in town is talking about…”',
        asmr: '[Soft studio ambience] “30 seconds of pure self-care magic right down the street.”',
        top3: '“3 hidden self-care spots in ' + city + ' you actually need to book this weekend.”',
      },
    };
  }

  return {
    handle: `${handle} · ${city}`,
    city,
    offers: [
      { id: 'o1', merchant: 'Sichuan Bistro ' + city.split(' ')[0], distance: '0.7 mi away', pay: 420, perk: '+ $80 Tasting Dinner', deliverable: '1x 30s TikTok/Reel' },
      { id: 'o2', merchant: 'Fog City Matcha & Cafe', distance: '1.2 mi away', pay: 340, perk: '+ 2 Guest Drinks', deliverable: '1x 25s Drink Pour' },
    ],
    hooks: {
      vlog: '“POV: You just found the best neighborhood spot in ' + city + ' with a 20% local QR perk.”',
      asmr: '[Crisp pour & sizzle audio] “No talking—just 25 seconds of pure flavor.”',
      top3: '“Top 3 reasons locals line up at this ' + city + ' gem every Friday night.”',
    },
  };
}

export default function CreatorPage() {
  const [presetIdx, setPresetIdx] = useState<number>(0);
  const [customPrompt, setCustomPrompt] = useState<string>(
    'I am @sfnoodleclub (34K) food & lifestyle creator in San Francisco looking for paid local restaurant deals.'
  );
  const [plan, setPlan] = useState<CreatorDealPlan>(() =>
    buildCreatorPlan('I am @sfnoodleclub (34K) food & lifestyle creator in San Francisco looking for paid local restaurant deals.')
  );
  const [isMatching, setIsMatching] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'offers' | 'script' | 'payout'>('offers');
  const [acceptedOfferId, setAcceptedOfferId] = useState<string>('o1');
  const [hookStyle, setHookStyle] = useState<'vlog' | 'asmr' | 'top3'>('vlog');
  const [checkedShots, setCheckedShots] = useState<number[]>([0, 1]);
  const [withdrawn, setWithdrawn] = useState<boolean>(false);

  const presets = [
    {
      label: '🍜 @sfnoodleclub (34.2K)',
      prompt: 'I am @sfnoodleclub (34K) food & lifestyle creator in San Francisco looking for paid local restaurant deals.',
    },
    {
      label: '✨ @glowwithchloe_la (28.1K)',
      prompt: 'I am @glowwithchloe_la creating beauty & spa reels in Los Angeles.',
    },
    {
      label: '☕ @pnwcoffeeclub (15.7K)',
      prompt: 'I am @pnwcoffeeclub in Seattle looking for local cafe & bakery collaborations.',
    },
  ];

  const runMatch = (text: string) => {
    setIsMatching(true);
    setWithdrawn(false);
    setTimeout(() => {
      const next = buildCreatorPlan(text);
      setPlan(next);
      setAcceptedOfferId(next.offers[0].id);
      setIsMatching(false);
    }, 450);
  };

  const activeOffer = plan.offers.find((o) => o.id === acceptedOfferId) || plan.offers[0];

  return (
    <div className="min-h-screen bg-[#f7f4ff] text-[#161224] selection:bg-fuchsia-600 selection:text-white">
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
              href="/merchant"
              className="hidden sm:inline-flex text-xs font-semibold text-violet-700 hover:text-violet-950"
            >
              For Merchants →
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
        {/* 1. Creator Pain Points First */}
        <section className="space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/35 bg-fuchsia-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-fuchsia-700">
              <Video className="h-3.5 w-3.5" />
              For Local Creators &amp; Storytellers
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#161224]">
              Stop Chasing Cold DMs and Late Invoices
            </h1>
            <p className="max-w-2xl text-base text-slate-600">
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
                className="rounded-3xl border border-rose-500/20 bg-gradient-to-b from-rose-50 to-white p-6 space-y-2.5 shadow-sm"
              >
                <XCircle className="h-5 w-5 text-rose-500" />
                <h2 className="text-base font-bold text-[#161224]">{pain.title}</h2>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600">{pain.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Interactive Creator Copilot */}
        <section className="space-y-8 border-t border-violet-200/70 pt-14">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-fuchsia-700">
              Interactive Creator Copilot · 0% Creator Fee (MVP Free)
            </span>
            <h2 className="mt-1.5 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#161224]">
              How Creators Leverage Bomie AI
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Type your handle, city, and niche below—then click through to accept a deal, customize your 30s script, and test instant payout.
            </p>
          </div>

          <div className="rounded-3xl border border-fuchsia-300 bg-white p-6 sm:p-7 shadow-xl shadow-violet-900/5 space-y-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                runMatch(customPrompt);
              }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g., I am @latte_lover in Seattle looking for paid cafe deals..."
                className="flex-1 rounded-2xl border border-violet-200 bg-[#f7f4ff] px-4 py-3.5 text-sm text-[#161224] placeholder-slate-400 focus:border-fuchsia-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={isMatching}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-violet-600 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-fuchsia-600/20"
              >
                <Sparkles className="h-4 w-4" />
                {isMatching ? 'Finding Offers...' : 'Find Local Deals'}
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
                    runMatch(p.prompt);
                  }}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                    presetIdx === idx && customPrompt === p.prompt
                      ? 'border-fuchsia-500 bg-fuchsia-100 text-fuchsia-950 font-semibold'
                      : 'border-violet-200 bg-[#f7f4ff] text-slate-700 hover:bg-fuchsia-50'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-violet-200/80 bg-white p-6 sm:p-8 shadow-xl shadow-violet-900/5 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-violet-100 pb-5">
              <div>
                <div className="flex items-center gap-1.5 font-mono text-xs uppercase text-fuchsia-700">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Creator Copilot Ready · Zero Cold DMs</span>
                </div>
                <h3 className="mt-1 text-2xl font-bold text-[#161224]">{plan.handle}</h3>
              </div>
              <span className="self-start rounded-full border border-emerald-300 bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-700">
                0% Creator Fee (MVP Free)
              </span>
            </div>

            {/* Interactive 3 Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-violet-100 pb-3">
              {(
                [
                  { id: 'offers', label: '1. Inbound Paid Deals', icon: Store },
                  { id: 'script', label: '2. 30s Shooting Copilot', icon: Camera },
                  { id: 'payout', label: '3. Instant Wallet Payout', icon: Wallet },
                ] as const
              ).map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition ${
                      activeTab === tab.id
                        ? 'bg-fuchsia-600 text-white shadow-sm'
                        : 'bg-[#f7f4ff] text-slate-700 hover:bg-fuchsia-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {activeTab === 'offers' && (
              <div className="grid gap-4 md:grid-cols-2">
                {plan.offers.map((offer) => {
                  const picked = acceptedOfferId === offer.id;
                  return (
                    <div
                      key={offer.id}
                      onClick={() => setAcceptedOfferId(offer.id)}
                      className={`cursor-pointer rounded-2xl border p-5 transition ${
                        picked
                          ? 'border-fuchsia-500 bg-fuchsia-50/70 shadow-sm'
                          : 'border-violet-100 bg-[#f7f4ff] hover:border-fuchsia-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-500">{offer.distance}</span>
                        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                          ${offer.pay} Base
                        </span>
                      </div>
                      <h4 className="mt-2 text-lg font-bold text-[#161224]">{offer.merchant}</h4>
                      <p className="mt-1 text-xs text-slate-600">
                        {offer.deliverable} · {offer.perk}
                      </p>
                      <div className="mt-4 flex justify-end">
                        <span className="rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-fuchsia-700 border border-fuchsia-200">
                          {picked ? '✓ Offer Accepted' : 'Click to Accept →'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === 'script' && (
              <div className="rounded-2xl border border-violet-200 bg-[#f7f4ff] p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#161224]">
                    Pick Your Voice Style for {activeOffer.merchant}:
                  </span>
                  <div className="flex gap-1.5">
                    {(
                      [
                        { id: 'vlog', label: 'POV Vlog' },
                        { id: 'asmr', label: 'ASMR' },
                        { id: 'top3', label: 'Top 3 List' },
                      ] as const
                    ).map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => setHookStyle(st.id)}
                        className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                          hookStyle === st.id
                            ? 'bg-fuchsia-600 text-white'
                            : 'bg-white text-slate-700 border border-violet-200'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl bg-white p-4 border border-violet-100 text-sm font-bold text-[#161224]">
                  {plan.hooks[hookStyle]}
                </div>
                <div className="grid gap-2 sm:grid-cols-3">
                  {['Film 3s Hero Shot', 'Capture Natural Reaction', 'Include #ad & QR Code'].map((shot, i) => {
                    const done = checkedShots.includes(i);
                    return (
                      <button
                        key={shot}
                        type="button"
                        onClick={() =>
                          setCheckedShots((prev) =>
                            prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
                          )
                        }
                        className={`rounded-xl border p-3 text-left text-xs font-semibold transition ${
                          done
                            ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                            : 'border-violet-200 bg-white text-slate-600'
                        }`}
                      >
                        {done ? '✓ ' : '○ '}
                        {shot}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'payout' && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono uppercase text-emerald-700">
                    Escrow Locked for {activeOffer.merchant}
                  </div>
                  <div className="mt-1 text-3xl font-extrabold text-[#161224]">
                    ${activeOffer.pay}.00{' '}
                    <span className="text-sm font-medium text-slate-600">+ {activeOffer.perk}</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-600">
                    Instant withdrawal via Stripe or Apple Pay with $0 creator fee.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setWithdrawn(true)}
                  className="shrink-0 rounded-xl bg-emerald-600 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-md transition hover:bg-emerald-500"
                >
                  {withdrawn ? '✓ Sent to Apple Pay!' : 'Test Instant Withdraw →'}
                </button>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-violet-100">
              <div className="flex items-center gap-4 text-xs text-slate-600">
                <span className="inline-flex items-center gap-1">
                  <Wallet className="h-3.5 w-3.5 text-amber-600" />
                  Stripe &amp; Apple Pay Payouts
                </span>
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  Commercial Audio &amp; FTC Shield
                </span>
              </div>
              <Link
                href="/#pricing"
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-violet-600/20 hover:opacity-95"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-200" />
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
