'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import BrandFooter from '../../components/BrandFooter';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  HeartHandshake,
  ShieldCheck,
  Store,
  Video,
  X,
} from 'lucide-react';

type ModalMode =
  | { kind: 'closed' }
  | { kind: 'creator' }
  | { kind: 'merchant'; planName: string };

const pricingTiers = [
  {
    id: 'creator',
    name: 'Local Creators',
    badge: 'ALWAYS FREE',
    mvpPrice: '$0',
    postMvpPrice: '$0 / mo',
    tagline: 'For neighborhood creators, foodies, beauty & lifestyle storytellers.',
    highlight: false,
    icon: Video,
    ctaLabel: 'Join as Creator',
    features: [
      '0% creator commission — keep 100% of payouts',
      'Curated paid local brand invites (zero cold DMs)',
      'AI 30s Script & Shot Copilot included',
      '30/40/30 Stripe Escrow protection',
      'Instant Stripe / Apple Pay withdrawals',
    ],
  },
  {
    id: 'starter',
    name: 'Neighborhood Starter',
    badge: 'FREE IN MVP',
    mvpPrice: '$0',
    postMvpPrice: 'Est. $49 / mo post-MVP',
    tagline: 'Built for single-location cafes, restaurants, salons & boutiques.',
    highlight: false,
    icon: Store,
    ctaLabel: 'Start Free MVP Campaign',
    features: [
      'Up to 5 local creator campaigns per month',
      'Hyper-local 0.5–15 mi AI creator matching',
      'AI 30s storyboards & hook generator',
      '3-Agent FTC 16 CFR Part 255 compliance audit',
      'Walk-in QR code & promo ROI tracking',
    ],
  },
  {
    id: 'growth',
    name: 'Multi-Location Growth',
    badge: 'MOST POPULAR · FREE IN MVP',
    mvpPrice: '$0',
    postMvpPrice: 'Est. $149 / mo post-MVP',
    tagline: 'For growing local brands & 2–10 storefronts scaling neighborhood traffic.',
    highlight: true,
    icon: HeartHandshake,
    ctaLabel: 'Launch Growth Campaign Free',
    features: [
      'Unlimited creator campaigns & monthly retainers',
      'Multi-storefront hub & regional attribution',
      'Priority access to top-converting local creators',
      'Custom brand voice AI script templates',
      'Dedicated founder-led onboarding & support',
    ],
  },
  {
    id: 'enterprise',
    name: 'Regional & Franchise',
    badge: 'CUSTOM',
    mvpPrice: 'Custom',
    postMvpPrice: 'Tailored Annual Plan',
    tagline: 'For 10+ locations, franchise groups & multi-city hospitality brands.',
    highlight: false,
    icon: Building2,
    ctaLabel: 'Explore Commerce OS',
    features: [
      '10+ storefront locations across US hubs',
      'POS & CRM walk-in attribution sync',
      'Custom compliance & approval workflows',
      'Dedicated campaign strategist & SLA',
      'Consolidated billing & escrow reporting',
    ],
  },
] as const;

export default function PricingClient() {
  const [modal, setModal] = useState<ModalMode>({ kind: 'closed' });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredContact, setPreferredContact] = useState<'either' | 'phone' | 'email'>('either');
  const [handleOrBiz, setHandleOrBiz] = useState('');
  const [city, setCity] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [leadId, setLeadId] = useState('');

  const openModal = (nextModal: ModalMode) => {
    setErrorMsg('');
    setLeadId('');
    setModal(nextModal);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    const prefix =
      modal.kind === 'creator'
        ? '[Founding Creator Onboarding]'
        : modal.kind === 'merchant'
        ? `[${modal.planName} · MVP Free]`
        : '';

    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          preferredContact,
          handle: `${prefix} ${handleOrBiz.trim()}`.trim(),
          city: city.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrorMsg(data.error || 'Please fill in all required fields.');
      } else {
        setLeadId(data.leadId || 'BOMIE-NEW');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f4ff] text-[#161224] selection:bg-violet-500 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-violet-200/70 bg-[#f7f4ff]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
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
              href="/commerce-os"
              className="hidden sm:inline-flex rounded-xl px-3 py-2 text-xs font-semibold text-violet-700 transition hover:bg-violet-100 hover:text-violet-950"
            >
              Commerce OS →
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

      <main className="mx-auto max-w-6xl space-y-14 px-6 py-12 sm:py-16">
        {/* Hero */}
        <section className="mx-auto max-w-3xl space-y-5 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/80 bg-emerald-50 px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-emerald-800">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            MVP LAUNCH · 100% FREE TO EMPOWER SMALL BUSINESSES
          </div>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-[#161224] sm:text-5xl">
            $0 Platform Fee During MVP.{' '}
            <span className="bg-gradient-to-r from-[#5b21b6] via-[#d946ef] to-[#f59e0b] bg-clip-text text-transparent">
              Built for Main Street.
            </span>
          </h1>
          <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
            We are waiving 100% of software &amp; platform fees during our MVP phase to help neighborhood restaurants,
            spas, and local shops thrive. Merchants only fund direct creator payouts held safely in 30/40/30 Stripe
            Escrow—with zero hidden agency markups.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 font-mono text-xs">
            <span className="rounded-full border border-violet-200 bg-white px-3.5 py-1.5 font-semibold text-violet-800 shadow-sm">
              $0/mo MVP Software Fee
            </span>
            <span className="rounded-full border border-violet-200 bg-white px-3.5 py-1.5 font-semibold text-fuchsia-800 shadow-sm">
              0% Creator Commission Forever
            </span>
            <span className="rounded-full border border-violet-200 bg-white px-3.5 py-1.5 font-semibold text-emerald-800 shadow-sm">
              100% Refundable Pre-Accept
            </span>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pricingTiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.id}
                className={`flex flex-col justify-between rounded-3xl border p-6 transition ${
                  tier.highlight
                    ? 'border-violet-500 bg-white shadow-xl shadow-violet-500/15 ring-1 ring-violet-400/50'
                    : 'border-violet-200/80 bg-white/95 shadow-sm hover:border-violet-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-violet-200 bg-violet-50 text-violet-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider ${
                        tier.highlight
                          ? 'bg-gradient-to-r from-[#5b21b6] to-[#d946ef] text-white'
                          : tier.mvpPrice === '$0'
                          ? 'border border-emerald-200 bg-emerald-50 text-emerald-800'
                          : 'border border-slate-200 bg-slate-100 text-slate-700'
                      }`}
                    >
                      {tier.badge}
                    </span>
                  </div>

                  <h2 className="mt-4 text-lg font-extrabold text-[#161224]">{tier.name}</h2>
                  <p className="mt-1.5 min-h-[40px] text-xs leading-relaxed text-slate-600">{tier.tagline}</p>

                  <div className="mt-5 border-b border-violet-100 pb-5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold tracking-tight text-[#161224]">
                        {tier.mvpPrice}
                      </span>
                      {tier.mvpPrice === '$0' && (
                        <span className="text-xs font-bold text-emerald-700">during MVP</span>
                      )}
                    </div>
                    <div className="mt-1 font-mono text-[11px] font-medium text-slate-500">
                      {tier.postMvpPrice}
                    </div>
                  </div>

                  <ul className="mt-5 space-y-2.5 text-xs text-slate-700">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {tier.id === 'enterprise' ? (
                  <Link
                    href="/commerce-os"
                    className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-2xl border border-violet-200 bg-violet-50/70 px-4 py-3 text-xs font-bold text-violet-900 transition hover:bg-violet-100"
                  >
                    {tier.ctaLabel}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      tier.id === 'creator'
                        ? openModal({ kind: 'creator' })
                        : openModal({ kind: 'merchant', planName: tier.name })
                    }
                    className={`mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-2xl px-4 py-3 text-xs font-bold transition ${
                      tier.highlight
                        ? 'bg-gradient-to-r from-[#5b21b6] to-[#d946ef] text-white shadow-md shadow-violet-500/25 hover:opacity-95'
                        : 'border border-violet-200 bg-violet-50/70 text-violet-900 hover:bg-violet-100'
                    }`}
                  >
                    {tier.ctaLabel}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </section>

        {/* Cost Transparency & Agency Comparison */}
        <section className="grid gap-6 rounded-3xl border border-violet-200/80 bg-white p-8 shadow-sm lg:grid-cols-2">
          <div className="space-y-3">
            <div className="font-mono text-xs font-semibold uppercase tracking-widest text-violet-700">
              WHY WE BUILT THIS PRICING
            </div>
            <h3 className="text-2xl font-extrabold text-[#161224]">
              100% of Your Creator Budget Goes to Local Creators
            </h3>
            <p className="text-sm leading-relaxed text-slate-600">
              Traditional marketing agencies charge small businesses $3,000–$5,000/month in retainers plus a 20%–35%
              markup on creator fees. Bomie AI automates matching, scripting, FTC compliance, and Stripe Escrow so
              neighborhood stores can launch campaigns for $0 platform fee during MVP—and predictable, flat software
              pricing afterward.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
              <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                BOMIE AI (MVP → POST-MVP)
              </div>
              <div className="mt-2 text-2xl font-extrabold text-[#161224]">$0 → $49/mo</div>
              <ul className="mt-3 space-y-1.5 text-xs text-slate-700">
                <li>• 0% hidden creator markup</li>
                <li>• 30/40/30 Stripe Escrow protection</li>
                <li>• Automated FTC #ad compliance</li>
                <li>• Cancel anytime, no lock-in contracts</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500">
                TRADITIONAL AGENCIES
              </div>
              <div className="mt-2 text-2xl font-extrabold text-slate-500 line-through">$3,500+/mo</div>
              <ul className="mt-3 space-y-1.5 text-xs text-slate-500">
                <li>• 20%–35% hidden creator markup</li>
                <li>• 6-month minimum retainer contracts</li>
                <li>• Manual spreadsheets &amp; slow DMs</li>
                <li>• Vanity views, no walk-in QR ROI</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <BrandFooter />

      {/* Registration Modal (Founding Creator Onboarding OR Free MVP Merchant Demo) */}
      {modal.kind !== 'closed' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl border border-violet-200 bg-white p-6 shadow-2xl sm:p-7">
            <button
              type="button"
              onClick={() => setModal({ kind: 'closed' })}
              aria-label="Close modal"
              className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 transition hover:bg-violet-50 hover:text-slate-700"
            >
              <X className="h-5 w-5" />
            </button>

            {leadId ? (
              <div className="space-y-4 py-4 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-extrabold text-[#161224]">
                  {modal.kind === 'creator'
                    ? 'Welcome to Bomie Founding Creators!'
                    : 'Your Free MVP Campaign Request is In!'}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {modal.kind === 'creator'
                    ? 'Our team has been notified immediately. We will reach out within 24 hours to activate your 0% fee creator profile and send your first local brand invites.'
                    : 'Our founder team has been notified immediately and will reach out within 24 hours to launch your $0 platform fee MVP campaign.'}
                </p>
                <div className="inline-block rounded-xl border border-violet-200 bg-violet-50 px-4 py-2 font-mono text-xs font-bold text-violet-800">
                  Reference ID: {leadId}
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setModal({ kind: 'closed' })}
                    className="w-full rounded-xl bg-gradient-to-r from-[#5b21b6] to-[#d946ef] px-5 py-3 text-xs font-bold text-white shadow-md"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <span
                    className={`inline-block rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider ${
                      modal.kind === 'creator'
                        ? 'bg-fuchsia-100 text-fuchsia-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {modal.kind === 'creator'
                      ? 'FOUNDING CREATOR · 0% FEE FOREVER'
                      : `${modal.planName} · $0 MVP FEE`}
                  </span>
                  <h3 className="mt-2.5 text-xl font-extrabold text-[#161224]">
                    {modal.kind === 'creator'
                      ? 'Apply as a Founding Local Creator'
                      : 'Book Your Free MVP Onboarding'}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    {modal.kind === 'creator'
                      ? 'Register your handle & city—receive curated paid local brand deals with zero cold DMs.'
                      : 'Leave your store info below and our team will set up your $0 fee MVP campaign within 24h.'}
                  </p>
                </div>

                {errorMsg && (
                  <div className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-700">
                    {errorMsg}
                  </div>
                )}

                <div className="space-y-3">
                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-700">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={modal.kind === 'creator' ? 'e.g., Chloe Lin' : 'e.g., Alex Chen'}
                      className="w-full rounded-xl border border-violet-200 bg-[#faf8ff] px-3.5 py-2.5 text-sm text-[#161224] focus:border-violet-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-700">
                      {modal.kind === 'creator'
                        ? 'Social Handle & Niche *'
                        : 'Business Name & Category *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={handleOrBiz}
                      onChange={(e) => setHandleOrBiz(e.target.value)}
                      placeholder={
                        modal.kind === 'creator'
                          ? 'e.g., @sfnoodleclub (28K) · Food & Lifestyle'
                          : 'e.g., Chili & Silk Sichuan Bistro'
                      }
                      className="w-full rounded-xl border border-violet-200 bg-[#faf8ff] px-3.5 py-2.5 text-sm text-[#161224] focus:border-violet-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block text-xs font-bold text-slate-700">City *</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g., San Francisco"
                        className="w-full rounded-xl border border-violet-200 bg-[#faf8ff] px-3.5 py-2.5 text-sm text-[#161224] focus:border-violet-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-bold text-slate-700">Phone *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(415) 555-0192"
                        className="w-full rounded-xl border border-violet-200 bg-[#faf8ff] px-3.5 py-2.5 text-sm text-[#161224] focus:border-violet-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-700">Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={modal.kind === 'creator' ? 'creator@gmail.com' : 'owner@yourbusiness.com'}
                      className="w-full rounded-xl border border-violet-200 bg-[#faf8ff] px-3.5 py-2.5 text-sm text-[#161224] focus:border-violet-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-700">Preferred Contact</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(
                        [
                          { id: 'either', label: 'Either' },
                          { id: 'phone', label: 'Phone / Text' },
                          { id: 'email', label: 'Email' },
                        ] as const
                      ).map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setPreferredContact(opt.id)}
                          className={`rounded-xl border py-2 text-xs font-semibold transition ${
                            preferredContact === opt.id
                              ? 'border-violet-600 bg-violet-100 text-violet-900'
                              : 'border-violet-200 bg-white text-slate-600 hover:bg-violet-50'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-2xl bg-gradient-to-r from-[#5b21b6] to-[#d946ef] px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-violet-500/25 transition hover:opacity-95 disabled:opacity-60"
                >
                  {submitting
                    ? 'Submitting...'
                    : modal.kind === 'creator'
                    ? 'Submit Founding Creator Application'
                    : 'Submit & Lock In $0 MVP Fee'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
