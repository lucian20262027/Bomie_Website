import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Building2, ExternalLink, Mail, ShieldCheck } from 'lucide-react';
import { EditorialHeader } from '../../components/EditorialChrome';
import BrandFooter from '../../components/BrandFooter';

const TEAM_URL = 'https://www.bomie.ai/team';

export const metadata: Metadata = {
  title: 'Founding Team & Leadership — BOMIES LLC (Bomie AI)',
  description:
    'Meet the founding team and leadership behind BOMIES LLC (dba Bomie AI) — led by Founder & CEO Lucian Wang.',
  alternates: {
    canonical: TEAM_URL,
  },
};

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Bomie AI',
  legalName: 'BOMIES LLC',
  url: 'https://www.bomie.ai',
  email: 'lucian.wang@bomie.ai',
  sameAs: [
    'https://www.crunchbase.com/organization/bomie-ai',
    'https://www.linkedin.com/in/lucianwang18',
  ],
  founder: {
    '@type': 'Person',
    name: 'Lucian Wang',
    jobTitle: 'Founder & CEO',
    url: 'https://www.bomie.ai/why-bomie/stories/founder',
    sameAs: ['https://www.linkedin.com/in/lucianwang18'],
  },
};

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-[#f7f4ff] text-[#161224]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <EditorialHeader activeNav="founder" />

      <main className="mx-auto max-w-[1440px] px-6 lg:px-10 pt-14 pb-24">
        {/* Top Company Identity Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/70 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-violet-900 shadow-2xs">
            <Building2 className="h-3.5 w-3.5 text-violet-700" />
            <span>BOMIES LLC · dba Bomie AI</span>
          </div>

          <h1 className="mt-5 text-3xl sm:text-5xl font-extrabold tracking-tight text-[#161224] leading-[1.1]">
            Founding Team &amp; Leadership
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#161224]/70 leading-relaxed">
            <strong>BOMIES LLC</strong> (operating as <strong>Bomie AI</strong>) is building North
            America&apos;s AI Commerce Operating System for local businesses and neighborhood
            creators—combining AI smart matching, automated FTC compliance governance, and 30/40/30
            Stripe Connect escrow.
          </p>
        </div>

        {/* Leadership Profile Card */}
        <section className="mt-12 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-3xl border border-violet-200/80 bg-white p-6 sm:p-10 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#5b21b6] via-[#d946ef] to-[#fbbf24] text-2xl font-extrabold tracking-wider text-white shadow-lg shadow-violet-500/25">
                LW
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h2 className="text-2xl font-extrabold text-[#161224]">Lucian Wang</h2>
                    <span className="rounded-full bg-violet-100 px-3 py-0.5 text-xs font-bold text-violet-800 border border-violet-200">
                      Founder &amp; CEO
                    </span>
                  </div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <Building2 className="h-3.5 w-3.5 text-violet-600" />
                      BOMIES LLC (Bomie AI)
                    </span>
                  </div>
                </div>

                <div className="space-y-3 text-sm sm:text-[15px] leading-relaxed text-[#161224]/75">
                  <p>
                    Lucian Wang is the Founder and Chief Executive Officer of{' '}
                    <strong>BOMIES LLC (Bomie AI)</strong>, overseeing product architecture,
                    AI compliance orchestration, and marketplace operations.
                  </p>
                  <p>
                    Previously, Lucian led marketplace seller governance initiatives at{' '}
                    <strong>TikTok</strong> across the US, Mexico, Brazil, and Southeast Asia—supporting
                    systems for 350K+ weekly active sellers. Earlier, he founded and operated a
                    cross-border B2B supply-chain venture across multiple cities and advised small and
                    medium-sized businesses on go-to-market strategy.
                  </p>
                  <p>
                    He holds an MBA in Entrepreneurship from <strong>Babson College</strong>, an MSc
                    in Computer Science from <strong>City St George&apos;s, University of London</strong>,
                    and studied International Relations at the <strong>University of Cambridge</strong>.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="https://www.linkedin.com/in/lucianwang18"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#161224] px-4 py-2 text-xs font-semibold text-white transition hover:bg-violet-900"
                  >
                    <span>LinkedIn Profile</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href="mailto:lucian.wang@bomie.ai"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-violet-200 bg-violet-50/70 px-4 py-2 text-xs font-semibold text-violet-900 transition hover:bg-violet-100"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>lucian.wang@bomie.ai</span>
                  </a>
                  <Link
                    href="/why-bomie/stories/founder"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-violet-300 hover:text-violet-900"
                  >
                    <span>Full Founder Story</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Company & Verification Summary Card */}
          <aside className="rounded-3xl border border-violet-200/80 bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-700">
                <ShieldCheck className="h-4 w-4" />
                <span>Corporate Overview</span>
              </div>

              <dl className="space-y-3 text-sm">
                <div className="border-b border-slate-100 pb-2.5">
                  <dt className="text-xs text-slate-500">Legal Entity</dt>
                  <dd className="font-bold text-[#161224]">BOMIES LLC</dd>
                </div>
                <div className="border-b border-slate-100 pb-2.5">
                  <dt className="text-xs text-slate-500">Product / DBA</dt>
                  <dd className="font-bold text-[#161224]">Bomie AI (bomie.ai)</dd>
                </div>
                <div className="border-b border-slate-100 pb-2.5">
                  <dt className="text-xs text-slate-500">Leadership &amp; Key Functions</dt>
                  <dd className="font-medium text-slate-700">
                    Lucian Wang (Founder &amp; CEO — Product, Engineering &amp; Marketplace Governance)
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Public Profiles</dt>
                  <dd className="mt-1 flex flex-col gap-1 text-xs font-semibold text-violet-700">
                    <a
                      href="https://www.crunchbase.com/organization/bomie-ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:underline"
                    >
                      Crunchbase Organization <ExternalLink className="h-3 w-3" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/lucianwang18"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:underline"
                    >
                      Founder LinkedIn <ExternalLink className="h-3 w-3" />
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl bg-[#f7f4ff] p-4 border border-violet-200/70">
              <div className="text-xs font-bold text-[#161224]">Explore Live Product</div>
              <p className="mt-1 text-xs text-slate-600">
                Test the live Merchant &amp; Creator Commerce OS workflows directly in your browser.
              </p>
              <Link
                href="/commerce-os"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-violet-700 hover:text-violet-900"
              >
                <span>Launch Commerce OS</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </aside>
        </section>
      </main>

      <BrandFooter />
    </div>
  );
}
