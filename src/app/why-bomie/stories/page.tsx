import Link from 'next/link';
import { ArrowLeft, HeartHandshake, MapPin, Sparkles, Store, TrendingUp, Video } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bomie Stories — Empowering 40M+ U.S. Small Businesses & Local Creators | Bomie AI',
  description:
    'Discover Bomie AI’s vision for helping America’s small businesses and neighborhood creators grow together through AI-powered local commerce.',
};

export default function BomieStoriesPage() {
  return (
    <div className="min-h-screen bg-[#f7f4ff] text-[#161224] selection:bg-violet-500 selection:text-[#161224]">
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
              href="/why-bomie/founder"
              className="hidden sm:inline-flex text-xs font-semibold text-slate-600 hover:text-violet-950"
            >
              Founder
            </Link>
            <Link
              href="/why-bomie/research"
              className="hidden sm:inline-flex text-xs font-semibold text-slate-600 hover:text-violet-950"
            >
              Bomie Research
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

      <main className="mx-auto max-w-5xl px-6 py-16 space-y-14">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#161224]">
            Powering Millions of Main Streets &amp; Local Storytellers Across America.
          </h1>
          <p className="max-w-3xl text-base sm:text-lg leading-relaxed text-slate-600">
            Small businesses are the heartbeat of every American city—yet traditional digital ads drain margins without building real community trust. Bomie AI exists to flip the equation.
          </p>
        </div>

        {/* 3 Vision Pillars */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-violet-200/70 bg-white shadow-sm p-7 space-y-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-700">
              <Store className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-[#161224]">40M+ Small Businesses</h2>
            <p className="text-sm leading-relaxed text-slate-600">
              Independent restaurants, salons, gyms, and neighborhood shops deserve Fortune 500-grade creator marketing without hiring expensive agencies or learning complex ad dashboards.
            </p>
          </div>

          <div className="rounded-3xl border border-violet-200/70 bg-white shadow-sm p-7 space-y-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-fuchsia-500/15 text-fuchsia-700">
              <Video className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-[#161224]">Everyday Local Creators</h2>
            <p className="text-sm leading-relaxed text-slate-600">
              You don&apos;t need 1 million followers to drive real foot traffic. A 15K-follower neighborhood foodie or lifestyle creator has 4× higher local trust—and deserves fast, guaranteed pay.
            </p>
          </div>

          <div className="rounded-3xl border border-violet-200/70 bg-white shadow-sm p-7 space-y-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-400/15 text-amber-700">
              <TrendingUp className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-[#161224]">Thriving Neighborhoods</h2>
            <p className="text-sm leading-relaxed text-slate-600">
              When local marketing budgets go to local creators instead of faceless ad auctions, dollars circulate right back into the community—filling weekend tables and main streets.
            </p>
          </div>
        </div>

        {/* Editorial Story Block */}
        <div className="rounded-3xl border border-violet-200/70 bg-gradient-to-r from-violet-100/60 via-white to-fuchsia-50/70 p-8 sm:p-10 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-700">
            <MapPin className="h-4 w-4" />
            From San Francisco to Main Streets Nationwide
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#161224]">
            How One 30-Second Local Reel Changes a Business&apos;s Weekend
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-slate-600">
            In San Francisco&apos;s Inner Sunset, Sichuan Bistro SF needed to fill weekday and weekend tables without burning $5,000/month on broad social ads. Using Bomie AI, they matched with 4 neighborhood foodie creators within 1.8 miles, launched a 30-second tableside chili-oil reel with a tracked 20% dumpling QR voucher, and generated 142 verified dine-in tables in 5 days (3.6x ROAS).
          </p>
          <div className="pt-2">
            <Link
              href="/#stories"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-violet-600/20 transition hover:opacity-95"
            >
              <Sparkles className="h-4 w-4 text-violet-600" />
              Explore Live City Case Studies →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
