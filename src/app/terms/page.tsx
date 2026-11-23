import {
  EditorialFooter,
  EditorialHeader,
} from '../../components/EditorialChrome';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Bomie AI',
  description:
    'Terms of Service for Bomie AI (BOMIES LLC) governing merchants, creators, escrow, and FTC compliance.',
};

const TERMS_SECTIONS = [
  {
    num: '01',
    title: 'Platform Scope',
    body: (
      <p>
        Bomie AI provides an autonomous creator commerce operating system connecting local
        businesses (&ldquo;Merchants&rdquo;) and content creators (&ldquo;Creators&rdquo;)
        for campaign orchestration, AI matching, script co-creation, attribution tracking,
        and milestone escrow settlements.
      </p>
    ),
  },
  {
    num: '02',
    title: 'FTC & Advertising Compliance',
    body: (
      <p>
        All sponsored content published through Bomie AI must comply with the U.S. Federal
        Trade Commission (FTC) Endorsement Guides (16 CFR Part 255), including clear and
        conspicuous <code className="text-[#161224]">#ad</code> or{' '}
        <code className="text-[#161224]">#sponsored</code> disclosures, truthful product
        claims, and properly licensed commercial audio.
      </p>
    ),
  },
  {
    num: '03',
    title: 'Milestone Escrow & Payouts',
    body: (
      <p>
        Campaign budgets are governed by Bomie&apos;s 30% / 40% / 30% milestone release
        schedule (30% upon brief acceptance, 40% upon script/draft approval, and 30% upon
        verified live post and FTC disclosure check). Disputes are reviewed within 5
        business days.
      </p>
    ),
  },
  {
    num: '04',
    title: 'Contact',
    body: (
      <p>
        Questions regarding these Terms may be directed to{' '}
        <a
          href="mailto:lucian.wang@bomie.ai"
          className="text-[#6D28D9] underline underline-offset-4 hover:text-[#161224]"
        >
          lucian.wang@bomie.ai
        </a>
        .
      </p>
    ),
  },
];

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#f7f4ff] text-[#161224] selection:bg-[#161224] selection:text-[#f7f4ff]">
      <EditorialHeader activeNav="legal" />

      <main className="mx-auto max-w-[1440px] px-6 sm:px-10 py-16 sm:py-24">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Sticky Legal Index Anchor */}
          <div className="lg:col-span-4 lg:sticky lg:top-14 space-y-5">
            <div className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#161224]/60">
              <span className="h-2 w-2 rounded-full bg-[#6D28D9]" />
              <span>PLATFORM AGREEMENT</span>
            </div>
            <h1 className="text-[28px] sm:text-[34px] font-medium leading-[1.2] tracking-[-0.02em] text-[#161224]">
              Terms of Service
            </h1>
            <p className="text-[14px] leading-[1.65] text-[#161224]/65">
              Operating terms governing Merchants, Creators, automated compliance
              governance, and 30/40/30 milestone escrow on Bomie AI.
            </p>
            <div className="border-t border-dotted border-[#161224]/20 pt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#161224]/50 space-y-1">
              <div>EFFECTIVE: NOVEMBER 17, 2026</div>
              <div>ENTITY: BOMIES LLC · SAN FRANCISCO</div>
            </div>
          </div>

          {/* Right Dotted Legal Clauses */}
          <div className="lg:col-span-7 lg:col-start-6 divide-y divide-dotted divide-[#161224]/20 border-t border-b border-dotted border-[#161224]/20">
            {TERMS_SECTIONS.map((sec) => (
              <section key={sec.num} className="py-8 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#161224]/20 bg-[#161224]/[0.04] font-mono text-[10px] text-[#161224]/65">
                    {sec.num}
                  </span>
                  <h2 className="text-[19px] font-medium tracking-[-0.01em] text-[#161224]">
                    {sec.title}
                  </h2>
                </div>
                <div className="pl-9 text-[15px] leading-[1.7] text-[#161224]/68">
                  {sec.body}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>

      <EditorialFooter />
    </div>
  );
}
