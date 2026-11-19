import Link from 'next/link';
import BrandFooter from '../../components/BrandFooter';
import { ArrowLeft, FileText } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Bomie AI',
  description: 'Terms of Service for Bomie AI (BOMIES LLC) governing merchants, creators, escrow, and FTC compliance.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#f7f4ff] text-[#161224] selection:bg-violet-500 selection:text-[#161224]">
      <header className="border-b border-violet-200/70 bg-[#f7f4ff]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3 group">
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
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-xl border border-violet-200/80 bg-white shadow-sm px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-violet-50 hover:text-violet-950"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-14 space-y-8">
        <div className="space-y-3 border-b border-violet-200/70 pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-700">
            <FileText className="h-3.5 w-3.5" />
            Platform Agreement
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#161224]">
            Terms of Service
          </h1>
          <p className="text-sm text-slate-600">
            Effective Date: November 17, 2026 · Entity: BOMIES LLC
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#161224]">1. Platform Scope</h2>
          <p className="text-sm leading-relaxed text-slate-600">
            Bomie AI provides an autonomous creator commerce operating system connecting local businesses (&ldquo;Merchants&rdquo;) and content creators (&ldquo;Creators&rdquo;) for campaign orchestration, AI matching, script co-creation, attribution tracking, and milestone escrow settlements.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#161224]">2. FTC &amp; Advertising Compliance</h2>
          <p className="text-sm leading-relaxed text-slate-600">
            All sponsored content published through Bomie AI must comply with the U.S. Federal Trade Commission (FTC) Endorsement Guides (16 CFR Part 255), including clear and conspicuous <code className="text-emerald-700">#ad</code> or <code className="text-emerald-700">#sponsored</code> disclosures, truthful product claims, and properly licensed commercial audio.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#161224]">3. Milestone Escrow &amp; Payouts</h2>
          <p className="text-sm leading-relaxed text-slate-600">
            Campaign budgets are governed by Bomie&apos;s 30% / 40% / 30% milestone release schedule (30% upon brief acceptance, 40% upon script/draft approval, and 30% upon verified live post and FTC disclosure check). Disputes are reviewed within 5 business days.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#161224]">4. Contact</h2>
          <p className="text-sm leading-relaxed text-slate-600">
            Questions regarding these Terms may be directed to{' '}
            <a href="mailto:lucian.wang@bomie.ai" className="text-violet-700 underline hover:text-violet-950">
              lucian.wang@bomie.ai
            </a>
            .
          </p>
        </section>
      </main>
      <BrandFooter />
    </div>
  );
}
