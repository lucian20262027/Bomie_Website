import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Gift,
  Repeat,
  ShieldCheck,
  Sparkles,
  Store,
  Video,
  Zap,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Commerce OS — 360° Merchant ⇄ Creator Closed-Loop Flywheel | Bomie AI',
  description:
    'Explore Bomie AI’s 6-node closed-loop Commerce OS connecting local businesses and neighborhood creators from matching to escrow payouts.',
};

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

export default function CommerceOsFlywheelPage() {
  return (
    <div className="min-h-screen bg-[#06060c] text-slate-200 selection:bg-violet-500 selection:text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#06060c]/85 backdrop-blur-xl">
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
            <span className="text-lg font-extrabold tracking-tight text-white">bomie.ai</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/commerce-os/how-it-works"
              className="hidden sm:inline-flex text-xs font-semibold text-violet-300 hover:text-white"
            >
              Interactive Sandbox →
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

      <main className="mx-auto max-w-6xl px-6 py-16 space-y-12">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-violet-300">
              <Repeat className="h-3.5 w-3.5" />
              Commerce OS · 360° Closed-Loop Flywheel
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Where Merchants &amp; Creators Power Each Other in One Complete Circle
            </h1>
            <p className="text-base leading-relaxed text-slate-400">
              Every campaign step connects business growth with creator rewards—forming a self-reinforcing neighborhood commerce loop.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-xs font-mono text-slate-300 shrink-0">
            <span className="text-violet-300">🏪 Merchant Brief</span> →{' '}
            <span className="text-fuchsia-300">🎬 Creator Story</span> →{' '}
            <span className="text-emerald-300">🛡️ Walk-In &amp; Payout</span> →{' '}
            <span className="text-amber-300">🔁 Repeat Loop</span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {flywheelNodes.map((node) => {
            const Icon = node.icon;
            return (
              <div
                key={node.step}
                className="rounded-3xl border border-white/10 bg-slate-950/85 p-6 space-y-4 transition hover:border-violet-500/40"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="font-mono text-xs uppercase tracking-wider text-slate-400">
                    Node {node.step} · {node.tag}
                  </div>
                </div>
                <h2 className="text-xl font-bold text-white">{node.title}</h2>
                <div className="space-y-2.5 text-xs">
                  <div className="rounded-xl border border-violet-500/20 bg-violet-500/10 p-3">
                    <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase text-violet-300">
                      <Store className="h-3 w-3" />
                      Merchant Side
                    </div>
                    <p className="mt-1 leading-relaxed text-slate-200">{node.merchantSide}</p>
                  </div>
                  <div className="rounded-xl border border-fuchsia-500/20 bg-fuchsia-500/10 p-3">
                    <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase text-fuchsia-300">
                      <Video className="h-3 w-3" />
                      Creator Side
                    </div>
                    <p className="mt-1 leading-relaxed text-slate-200">{node.creatorSide}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-3xl border border-violet-500/30 bg-gradient-to-r from-violet-950/50 via-[#110a24] to-fuchsia-950/40 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300">
              <Sparkles className="h-4 w-4" />
              Try It Live
            </div>
            <h3 className="mt-1 text-2xl font-bold text-white">
              Ready to test the 4-Stage Campaign OS or Simple Chat Mode?
            </h3>
          </div>
          <Link
            href="/commerce-os/how-it-works"
            className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-amber-50"
          >
            Open Interactive How It Works
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
