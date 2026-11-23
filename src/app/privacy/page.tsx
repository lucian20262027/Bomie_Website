import {
  EditorialFooter,
  EditorialHeader,
} from '../../components/EditorialChrome';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Bomie AI',
  description:
    'Privacy Policy for Bomie AI (BOMIES LLC) — how we protect merchant and creator data.',
};

const PRIVACY_SECTIONS = [
  {
    num: '01',
    title: 'Information We Collect',
    body: (
      <p>
        When you book a demo, create a Merchant OS or Creator Copilot account, or submit
        campaign briefs on <strong className="font-medium text-[#161224]">bomie.ai</strong>,
        we collect information you directly provide, including your name, work email,
        business or creator handle, city/region, campaign preferences, and connected
        social media public profile metrics (such as TikTok, Instagram Reels, or YouTube
        Shorts engagement data authorized via OAuth).
      </p>
    ),
  },
  {
    num: '02',
    title: 'How We Use Your Data',
    body: (
      <ul className="space-y-2.5 list-disc pl-5">
        <li>
          Match local businesses with verified neighborhood creators based on location,
          audience fit, and content style.
        </li>
        <li>
          Run automated 3-Agent FTC 16 CFR Part 255 disclosure and content compliance
          checks.
        </li>
        <li>
          Process milestone escrow payouts (30% / 40% / 30%) securely via regulated payment
          processors such as Stripe.
        </li>
        <li>
          Respond to demo requests, support inquiries, and product onboarding
          communications.
        </li>
      </ul>
    ),
  },
  {
    num: '03',
    title: 'Data Sharing & Security',
    body: (
      <p>
        We do not sell personal data to third-party data brokers. Information is shared
        only with matched campaign counterparties (for example, a merchant brief shared
        with an invited creator), payment infrastructure providers, and cloud hosting
        partners under strict confidentiality and encryption-in-transit (TLS 1.3)
        safeguards.
      </p>
    ),
  },
  {
    num: '04',
    title: 'Your Rights & Contact',
    body: (
      <p>
        Under CCPA/CPRA and applicable U.S. state privacy laws, you may request access,
        correction, or deletion of your personal data at any time by contacting our privacy
        team at{' '}
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

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#f7f4ff] text-[#161224] selection:bg-[#161224] selection:text-[#f7f4ff]">
      <EditorialHeader activeNav="legal" />

      <main className="mx-auto max-w-[1440px] px-6 sm:px-10 py-16 sm:py-24">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Sticky Legal Index Anchor */}
          <div className="lg:col-span-4 lg:sticky lg:top-14 space-y-5">
            <div className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#161224]/60">
              <span className="h-2 w-2 rounded-full bg-[#6D28D9]" />
              <span>LEGAL &amp; DATA PROTECTION</span>
            </div>
            <h1 className="text-[28px] sm:text-[34px] font-medium leading-[1.2] tracking-[-0.02em] text-[#161224]">
              Privacy Policy
            </h1>
            <p className="text-[14px] leading-[1.65] text-[#161224]/65">
              How BOMIES LLC (&ldquo;Bomie AI&rdquo;) handles merchant, creator, and
              compliance records across our platform.
            </p>
            <div className="border-t border-dotted border-[#161224]/20 pt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#161224]/50 space-y-1">
              <div>EFFECTIVE: NOVEMBER 17, 2026</div>
              <div>ENTITY: BOMIES LLC · SAN FRANCISCO</div>
            </div>
          </div>

          {/* Right Dotted Legal Clauses */}
          <div className="lg:col-span-7 lg:col-start-6 divide-y divide-dotted divide-[#161224]/20 border-t border-b border-dotted border-[#161224]/20">
            {PRIVACY_SECTIONS.map((sec) => (
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
