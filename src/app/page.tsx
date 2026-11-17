'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Store,
  Video,
  XCircle,
  Zap,
  BarChart3,
  Gift,
  Repeat,
  ShieldCheck,
  Star,
  ChevronDown,
  Layers,
  CheckCircle2,
  MapPin,
  TrendingUp,
} from 'lucide-react';

export default function BomieLandingPage() {
  const [activeTab, setActiveTab] = useState<'business' | 'creator'>('business');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedMatch, setSelectedMatch] = useState<number>(0);

  const liveMatches = [
    {
      business: 'TastyTaco Artisanal Kitchen',
      location: '0.8 mi away · Local Dining',
      creator: '@mayalovesfood (42.5K)',
      matchScore: '98% Match',
      ftcStatus: 'FTC #ad Brief Auto-Generated',
      estReach: '35K–60K Local Views',
    },
    {
      business: 'Modest Muse Boutique',
      location: '1.2 mi away · Apparel & Style',
      creator: '@chloestylediary (28.1K)',
      matchScore: '96% Match',
      ftcStatus: 'FTC Disclosure Verified',
      estReach: '22K–40K Targeted Views',
    },
    {
      business: 'Bloom Studio Candles',
      location: 'Online + Pop-up · Home Goods',
      creator: '@cozyhomewithsam (64.0K)',
      matchScore: '99% Match',
      ftcStatus: 'Escrow & FTC Rules Locked',
      estReach: '50K–95K High-Intent Views',
    },
  ];

  const marqueeItems = [
    'AI Hyper-Local Matching',
    'Auto FTC Compliance Check',
    'Zero Cold DMs',
    'Escrow Milestone Payouts',
    'TikTok & Reels Attribution',
    'Walk-In Traffic Tracking',
    'Creator Co-Creation Studio',
    'Automated Product Seeding',
  ];

  const faqs = [
    {
      q: 'How does Bomie AI match local businesses with creators?',
      a: 'Our AI engine analyzes your store location, product category, brand vibe, and target audience demographics against local creators’ content style, engagement authenticity, and neighborhood reach—delivering high-fit matches without cold DMs.',
    },
    {
      q: 'How does pricing and creator payout work?',
      a: 'Businesses can launch campaigns using flat fees, free product seeding, or performance-based milestones (views, clicks, or in-store redemptions). Funds are held securely in escrow and released automatically once deliverables are verified.',
    },
    {
      q: 'Does Bomie handle FTC disclosure and compliance?',
      a: 'Yes. Bomie automatically generates compliant campaign briefs and verifies that published posts include required FTC #ad / #sponsored disclosures before releasing payouts, protecting both merchants and creators.',
    },
    {
      q: 'Do I need a minimum follower count to join as a creator?',
      a: 'No. Local businesses care most about authentic storytelling and neighborhood trust. Nano and micro-creators with strong local engagement regularly win paid collaborations on Bomie.',
    },
    {
      q: 'Which platforms are supported for content tracking?',
      a: 'Bomie currently supports automated performance tracking across TikTok, Instagram Reels, and YouTube Shorts, with direct e-commerce and POS attribution links.',
    },
  ];

  const testimonials = [
    {
      name: 'David Ramirez',
      role: 'Founder of TastyTaco (Local Restaurant Chain)',
      quote:
        'I never imagined social media could drive so many walk-ins. The AI creator matching was spot-on — we saw a 30% increase in weekend traffic after just 2 videos. Bomie made influencer marketing finally feel doable.',
    },
    {
      name: 'Aisha Noor',
      role: 'Owner at Modest Muse (Modest Fashion Boutique)',
      quote:
        "As a small business owner with limited time and no design team, I always felt stuck. Bomie's campaign studio was a blessing — I could launch and track influencer collabs in one dashboard. Elegant and powerful.",
    },
    {
      name: 'Kevin Liu',
      role: 'Co-founder of GadgetPop (Shopify Gadget Store)',
      quote:
        'We used to waste hours just finding reliable creators. Bomie streamlined everything. From vetting to post scheduling, it saved us time and doubled ROI during our last product drop.',
    },
    {
      name: 'Natalie Brooks',
      role: 'Owner of Bloom Studio (Artisan Candle Brand)',
      quote:
        "What I love most is how personal everything feels. Our creators truly understood the brand. It wasn't just ads — it was storytelling. We built a loyal audience, not just buyers.",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#06060c] text-slate-50 selection:bg-violet-500 selection:text-white">
      {/* Sticky Glass Navbar */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 border-b border-white/10 bg-[#06060c]/75 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="group flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-amber-400 font-extrabold text-white shadow-lg shadow-violet-500/30 transition-transform group-hover:scale-105">
              B
            </div>
            <span className="text-xl font-bold tracking-tight">bomie.ai</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
            <a href="#how-it-works" className="transition hover:text-white">
              How It Works
            </a>
            <a href="#os" className="transition hover:text-white">
              Creator Commerce OS
            </a>
            <a href="#stories" className="transition hover:text-white">
              Success Stories
            </a>
            <a href="#faq" className="transition hover:text-white">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="hidden rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition hover:text-white sm:inline-block"
            >
              Log in
            </a>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="/signup"
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 shadow-md transition hover:bg-slate-200"
            >
              Sign Up
            </motion.a>
          </div>
        </div>
      </motion.header>

      {/* Hero Section with Animated Aurora & Grid */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-32">
        {/* Subtle Grid Background */}
        <div
          className="pointer-events-none absolute inset-0 -z-20 opacity-25"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.18) 1px, transparent 0)',
            backgroundSize: '36px 36px',
          }}
        />
        {/* Animated Aurora Blobs */}
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.22, 0.35, 0.22] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[520px] w-[920px] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-600/40 via-fuchsia-600/30 to-amber-500/20 blur-[130px]"
        />

        <div className="mx-auto max-w-6xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-xs font-medium text-violet-200 backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            AI-Powered Platform for Local Businesses & Local Creators
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl"
          >
            Where Local Businesses Meet{' '}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">
              Booming Creators
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg"
          >
            We empower local businesses and local creators to grow together — through AI smart matching,
            automated campaign workflows, and built-in FTC compliance.
          </motion.p>

          {/* Dual Role CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.a
              whileHover={{ scale: 1.03, boxShadow: '0 0 35px rgba(139, 92, 246, 0.45)' }}
              whileTap={{ scale: 0.98 }}
              href="/signup?role=business"
              className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-violet-600/25 sm:w-auto"
            >
              <Store className="h-5 w-5" />
              I&apos;m a Business Owner
              <ArrowRight className="h-4 w-4" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.12)' }}
              whileTap={{ scale: 0.98 }}
              href="/signup?role=creator"
              className="flex w-full items-center justify-center gap-2.5 rounded-2xl border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-md sm:w-auto"
            >
              <Video className="h-5 w-5 text-fuchsia-400" />
              I&apos;m a Creator
            </motion.a>
          </motion.div>

          {/* Interactive Live AI Match Preview Console */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mx-auto mt-16 max-w-4xl rounded-3xl border border-white/15 bg-slate-900/70 p-2 shadow-2xl shadow-violet-950/50 backdrop-blur-xl"
          >
            <div className="rounded-2xl border border-white/10 bg-[#0b0b14] p-6 text-left">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                  <span className="ml-2 font-mono text-xs text-slate-400">
                    bomie-ai-engine · live-matching-preview
                  </span>
                </div>
                <div className="flex gap-2">
                  {['Dining', 'Fashion', 'Local Goods'].map((tag, i) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedMatch(i)}
                      className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                        selectedMatch === i
                          ? 'bg-violet-600 text-white'
                          : 'bg-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedMatch}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                  className="mt-6 grid gap-4 md:grid-cols-3"
                >
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="text-xs text-slate-400">Local Merchant</div>
                    <div className="mt-1 font-bold text-white">
                      {liveMatches[selectedMatch].business}
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-xs text-violet-300">
                      <MapPin className="h-3.5 w-3.5" />
                      {liveMatches[selectedMatch].location}
                    </div>
                  </div>

                  <div className="rounded-xl border border-violet-500/30 bg-violet-500/10 p-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-violet-200">AI Matched Creator</span>
                      <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 font-semibold text-emerald-300">
                        {liveMatches[selectedMatch].matchScore}
                      </span>
                    </div>
                    <div className="mt-1 font-bold text-white">
                      {liveMatches[selectedMatch].creator}
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-xs text-slate-300">
                      <TrendingUp className="h-3.5 w-3.5 text-amber-300" />
                      {liveMatches[selectedMatch].estReach}
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="text-xs text-slate-400">Compliance &amp; Escrow</div>
                    <div className="mt-1 flex items-center gap-1.5 font-semibold text-emerald-400">
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                      <span className="text-sm">{liveMatches[selectedMatch].ftcStatus}</span>
                    </div>
                    <div className="mt-2 text-xs text-slate-400">
                      Auto-payout upon verified post
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Infinite Smooth Marquee */}
      <div className="relative overflow-hidden border-y border-white/10 bg-white/[0.02] py-4">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          className="flex w-max items-center gap-8"
        >
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <div key={index} className="flex items-center gap-8">
              <span className="text-sm font-semibold tracking-wide text-slate-300 uppercase">
                {item}
              </span>
              <Sparkles className="h-4 w-4 text-violet-400" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Pain Points Comparison */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Growth Happens When Sellers &amp; Creators Click
            </h2>
            <p className="mt-3 text-slate-400">
              Bomie bridges real people, not cold ads — eliminating friction on both sides.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* Local Sellers Card */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/90 to-slate-950 p-8 transition-colors hover:border-violet-500/40"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-xl bg-violet-500/15 px-3.5 py-1.5 text-sm font-semibold text-violet-300">
                <Store className="h-4 w-4" />
                For Local Sellers
              </div>
              <ul className="space-y-4 text-slate-300">
                <li className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                  <span>Can&apos;t find reliable creators to promote niche or local products.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                  <span>Spend money on broad social ads that fail to convert into walk-ins.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                  <span>Lack simple tools to integrate e-commerce and local social marketing.</span>
                </li>
              </ul>
            </motion.div>

            {/* Creators Card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/90 to-slate-950 p-8 transition-colors hover:border-fuchsia-500/40"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-xl bg-fuchsia-500/15 px-3.5 py-1.5 text-sm font-semibold text-fuchsia-300">
                <Video className="h-4 w-4" />
                For Creators
              </div>
              <ul className="space-y-4 text-slate-300">
                <li className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                  <span>Struggle to find paid content opportunities that genuinely fit your voice.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                  <span>Get ghosted after sending dozens of cold DMs to brands.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                  <span>Waste hours chasing logistics and invoices instead of creating.</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Spring-Animated Workflow Tabs */}
      <section id="how-it-works" className="border-t border-white/10 bg-slate-900/20 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How Bomie Works</h2>
            <p className="mt-3 text-slate-400">
              Switch views to see how Bomie streamlines collaboration from brief to payout.
            </p>

            {/* Shared Layout Spring Pill */}
            <div className="mt-8 inline-flex rounded-2xl border border-white/10 bg-slate-950 p-1.5">
              {(['business', 'creator'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="relative rounded-xl px-6 py-2.5 text-sm font-semibold transition-colors"
                >
                  {activeTab === tab && (
                    <motion.span
                      layoutId="activeWorkflowTab"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className={`absolute inset-0 rounded-xl ${
                        tab === 'business' ? 'bg-violet-600' : 'bg-fuchsia-600'
                      }`}
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      activeTab === tab ? 'text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab === 'business' ? 'For Local Businesses' : 'For Creators'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'business' ? (
              <motion.div
                key="business-cards"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="mt-12 grid gap-6 md:grid-cols-3"
              >
                {[
                  {
                    step: 'Step 01',
                    title: 'Post Your Campaign',
                    desc: 'Define your product, target neighborhood, budget, and deliverables in minutes using AI-assisted campaign briefs.',
                  },
                  {
                    step: 'Step 02',
                    title: 'Match With Nearby Creators',
                    desc: 'Our AI vets and invites local creators whose audience and aesthetic match your brand—ready to review in one dashboard.',
                  },
                  {
                    step: 'Step 03',
                    title: 'Track Results & Pay Securely',
                    desc: 'Monitor real-time views, clicks, and store traffic. Payouts trigger only after content and FTC compliance checks pass.',
                  },
                ].map((item) => (
                  <motion.div
                    key={item.step}
                    whileHover={{ y: -5 }}
                    className="rounded-3xl border border-white/10 bg-slate-950/90 p-8 shadow-lg"
                  >
                    <span className="text-xs font-bold tracking-wider text-violet-400 uppercase">
                      {item.step}
                    </span>
                    <h3 className="mt-2 text-xl font-bold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="creator-cards"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
              >
                {[
                  {
                    tag: 'Get Matched',
                    title: 'No Cold DMs',
                    desc: 'Receive product and campaign invitations tailored to your niche, style, and city.',
                  },
                  {
                    tag: 'Pitch & Co-create',
                    title: 'Win the Project',
                    desc: 'Submit creative pitches, get fast feedback, and co-create authentic stories inside your dashboard.',
                  },
                  {
                    tag: 'Launch & Share',
                    title: 'Live Impact Tracking',
                    desc: 'Publish across TikTok, Instagram, and YouTube Shorts with automated metric syncing.',
                  },
                  {
                    tag: 'Get Rewarded',
                    title: 'Zero Invoice Chasing',
                    desc: 'Earn base pay, performance bonuses, or free samples automatically upon approval.',
                  },
                ].map((item) => (
                  <motion.div
                    key={item.tag}
                    whileHover={{ y: -5 }}
                    className="rounded-3xl border border-white/10 bg-slate-950/90 p-7 shadow-lg"
                  >
                    <span className="text-xs font-bold tracking-wider text-fuchsia-400 uppercase">
                      {item.tag}
                    </span>
                    <h3 className="mt-2 text-lg font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Creator Commerce OS - Glowing Bento Grid */}
      <section id="os" className="border-t border-white/10 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold text-violet-400">Creator Commerce OS</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to run local creator campaigns on autopilot
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-6">
            <motion.div
              whileHover={{ y: -4, borderColor: 'rgba(139, 92, 246, 0.5)' }}
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8 transition-colors md:col-span-3"
            >
              <Zap className="h-8 w-8 text-violet-400" />
              <h3 className="mt-4 text-xl font-bold">1. Smart Matching</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Connect local businesses with the most relevant creators based on product category,
                neighborhood audience, and visual style fit.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4, borderColor: 'rgba(217, 70, 239, 0.5)' }}
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8 transition-colors md:col-span-3"
            >
              <Layers className="h-8 w-8 text-fuchsia-400" />
              <h3 className="mt-4 text-xl font-bold">2. Campaign Studio</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Design campaign briefs, review creator pitches, approve drafts, and enforce FTC
                compliance — all in one unified workspace.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4, borderColor: 'rgba(251, 191, 36, 0.4)' }}
              className="rounded-3xl border border-white/10 bg-slate-950 p-7 transition-colors md:col-span-2"
            >
              <BarChart3 className="h-7 w-7 text-amber-400" />
              <h3 className="mt-4 text-lg font-bold">3. Business Boost</h3>
              <p className="mt-2 text-sm text-slate-400">
                Gain visibility across TikTok, Instagram, and Shorts with live conversion data and
                e-commerce plug-ins.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4, borderColor: 'rgba(52, 211, 153, 0.4)' }}
              className="rounded-3xl border border-white/10 bg-slate-950 p-7 transition-colors md:col-span-2"
            >
              <Gift className="h-7 w-7 text-emerald-400" />
              <h3 className="mt-4 text-lg font-bold">4. Creative Rewards</h3>
              <p className="mt-2 text-sm text-slate-400">
                Incentivize creators based on reach, engagement, or sales — auto-triggering bonuses
                and free product drops.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4, borderColor: 'rgba(56, 189, 248, 0.4)' }}
              className="rounded-3xl border border-white/10 bg-slate-950 p-7 transition-colors md:col-span-2"
            >
              <Repeat className="h-7 w-7 text-sky-400" />
              <h3 className="mt-4 text-lg font-bold">5. Brand Loop</h3>
              <p className="mt-2 text-sm text-slate-400">
                Turn top-performing creators into long-term brand ambassadors with repeat
                dashboards and exclusive perks.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="stories" className="border-t border-white/10 bg-slate-900/20 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Trusted by Local Businesses
            </h2>
            <p className="mt-3 text-slate-400">
              Real stories from founders turning neighborhood creators into steady revenue.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {testimonials.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className="flex flex-col justify-between rounded-3xl border border-white/10 bg-slate-950 p-7"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                    <span className="ml-2 text-xs font-semibold text-slate-300">5.0</span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-300">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>
                <div className="mt-6 border-t border-white/10 pt-4">
                  <div className="font-semibold text-white">{item.name}</div>
                  <div className="text-xs text-slate-400">{item.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Smooth Animated FAQ Accordion */}
      <section id="faq" className="border-t border-white/10 py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
            <p className="mt-3 text-slate-400">
              Everything you need to know about launching or creating on Bomie.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left font-semibold text-white transition hover:bg-white/5"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="border-t border-white/5 px-6 py-4 text-sm leading-relaxed text-slate-400">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="relative overflow-hidden rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-950 via-slate-900 to-fuchsia-950 px-8 py-16 text-center shadow-2xl"
          >
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
              Where Local Meets Viral
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-slate-300">
              Join hundreds of local businesses and creators building authentic community growth
              on Bomie AI.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                href="/signup?role=business"
                className="w-full rounded-2xl bg-white px-8 py-4 text-sm font-bold text-slate-950 shadow-lg transition hover:bg-slate-200 sm:w-auto"
              >
                Launch a Campaign
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                href="/signup?role=creator"
                className="w-full rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20 sm:w-auto"
              >
                Join as a Creator
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 text-center text-sm text-slate-500">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="flex items-center gap-2 font-semibold text-slate-300">
            <ShieldCheck className="h-4 w-4 text-violet-400" />
            <span>© 2026 BOMIES LLC. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-slate-300">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-slate-300">
              Terms of Service
            </a>
            <a href="mailto:lucian.wang@bomie.ai" className="hover:text-slate-300">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}