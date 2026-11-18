import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Bomie AI',
  description: 'Privacy Policy for Bomie AI (BOMIES LLC) — how we protect merchant and creator data.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#06060c] text-slate-200 selection:bg-violet-500 selection:text-white">
      <header className="border-b border-white/10 bg-[#06060c]/85 backdrop-blur-xl">
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
            <span className="text-lg font-extrabold tracking-tight text-white">bomie.ai</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-14 space-y-8">
        <div className="space-y-3 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300">
            <ShieldCheck className="h-3.5 w-3.5" />
            Legal &amp; Data Protection
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-400">
            Effective Date: November 17, 2026 · Entity: BOMIES LLC (&ldquo;Bomie AI&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;)
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">1. Information We Collect</h2>
          <p className="text-sm leading-relaxed text-slate-300">
            When you book a demo, create a Merchant OS or Creator Copilot account, or submit campaign briefs on{' '}
            <span className="text-violet-300">bomie.ai</span>, we collect information you directly provide, including your name, work email, business or creator handle, city/region, campaign preferences, and connected social media public profile metrics (such as TikTok, Instagram Reels, or YouTube Shorts engagement data authorized via OAuth).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">2. How We Use Your Data</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed text-slate-300">
            <li>Match local businesses with verified neighborhood creators based on location, audience fit, and content style.</li>
            <li>Run automated 3-Agent FTC 16 CFR Part 255 disclosure and content compliance checks.</li>
            <li>Process milestone escrow payouts (30% / 40% / 30%) securely via regulated payment processors such as Stripe.</li>
            <li>Respond to demo requests, support inquiries, and product onboarding communications.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">3. Data Sharing &amp; Security</h2>
          <p className="text-sm leading-relaxed text-slate-300">
            We do not sell personal data to third-party data brokers. Information is shared only with matched campaign counterparties (for example, a merchant brief shared with an invited creator), payment infrastructure providers, and cloud hosting partners under strict confidentiality and encryption-in-transit (TLS 1.3) safeguards.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">4. Your Rights &amp; Contact</h2>
          <p className="text-sm leading-relaxed text-slate-300">
            Under CCPA/CPRA and applicable U.S. state privacy laws, you may request access, correction, or deletion of your personal data at any time by contacting our privacy team at{' '}
            <a href="mailto:lucian.wang@bomie.ai" className="text-violet-300 underline hover:text-white">
              lucian.wang@bomie.ai
            </a>
            .
          </p>
        </section>
      </main>
    </div>
  );
}
