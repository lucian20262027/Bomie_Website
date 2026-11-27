import Link from 'next/link';
import { Globe } from 'lucide-react';
import FooterInsightsForm from './FooterInsightsForm';

const infraRails = [
  {
    name: 'Google Gemini',
    miniIcon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0" aria-hidden="true">
        <defs>
          <linearGradient id="bomieGeminiGradMini" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1C7EFF" />
            <stop offset="55%" stopColor="#8E75FF" />
            <stop offset="100%" stopColor="#D96570" />
          </linearGradient>
        </defs>
        <path
          d="M12 2C12.7 7.1 16.9 11.3 22 12C16.9 12.7 12.7 16.9 12 22C11.3 16.9 7.1 12.7 2 12C7.1 11.3 11.3 7.1 12 2Z"
          fill="url(#bomieGeminiGradMini)"
        />
      </svg>
    ),
  },
  {
    name: 'Google Cloud',
    miniIcon: (
      <svg viewBox="0 0 28 22" fill="none" className="h-4 w-4.5 shrink-0" aria-hidden="true">
        <path
          d="M21.4 9.5C20.5 6.2 17.5 3.8 13.9 3.8C10.9 3.8 8.3 5.5 7 8C4.3 8.4 2.2 10.7 2.2 13.5C2.2 16.6 4.7 19.1 7.8 19.1H21C23.7 19.1 25.8 17 25.8 14.3C25.8 11.8 23.9 9.8 21.4 9.5Z"
          stroke="#4285F4"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />
        <path d="M7.8 19.1C4.7 19.1 2.2 16.6 2.2 13.5C2.2 10.7 4.3 8.4 7 8" stroke="#EA4335" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M7 8C8.3 5.5 10.9 3.8 13.9 3.8C16.1 3.8 18.1 4.7 19.5 6.2" stroke="#FBBC05" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M12.5 19.1H21C23.7 19.1 25.8 17 25.8 14.3" stroke="#34A853" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'AWS',
    miniIcon: (
      <div className="flex h-5 w-5 shrink-0 flex-col items-center justify-center rounded bg-slate-900 text-white">
        <span className="text-[7px] font-black leading-none">aws</span>
        <svg viewBox="0 0 36 10" fill="none" className="mt-0.5 h-1 w-3.5" aria-hidden="true">
          <path d="M2 2.5C11 8.5 23 8.5 32 3" stroke="#FF9900" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
    ),
  },
  {
    name: 'Microsoft Azure',
    miniIcon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 shrink-0" aria-hidden="true">
        <rect x="2" y="2" width="7.2" height="7.2" rx="1" fill="#F25022" />
        <rect x="10.8" y="2" width="7.2" height="7.2" rx="1" fill="#7FBA00" />
        <rect x="2" y="10.8" width="7.2" height="7.2" rx="1" fill="#00A4EF" />
        <rect x="10.8" y="10.8" width="7.2" height="7.2" rx="1" fill="#FFB900" />
      </svg>
    ),
  },
  {
    name: 'Mercury',
    miniIcon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5 shrink-0 text-[#272A37]" aria-hidden="true">
        <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="2.7" stroke="currentColor" strokeWidth="1.4" />
        {[0, 90, 180, 270].map((deg) => (
          <g key={deg} transform={`rotate(${deg} 12 12)`}>
            <path
              d="M12 2.5C14.8 2.5 16.5 4.8 14.9 7.2C13.8 8.8 11.5 9.3 10.1 8.1C8.8 7 9.1 4.8 11.2 4.5"
              stroke="currentColor"
              strokeWidth="1.35"
              strokeLinecap="round"
            />
          </g>
        ))}
      </svg>
    ),
  },
  {
    name: 'Stripe',
    miniIcon: (
      <div className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded bg-[#635BFF] text-white">
        <span className="text-[10px] font-black leading-none">S</span>
      </div>
    ),
  },
];

export default function BrandFooter() {
  return (
    <footer className="border-t border-violet-200/80 bg-white/60 pt-12 pb-24 lg:pb-16 text-sm text-slate-600">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        {/* Minimalist Borderless Infrastructure Trust Bar */}
        <div className="mb-12 border-b border-violet-200/70 pb-9">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-violet-700/80 shrink-0">
              Infrastructure Partners
            </span>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {infraRails.map((rail) => (
                <div
                  key={rail.name}
                  className="inline-flex items-center gap-2 text-[#161224]/80 transition hover:text-[#161224]"
                >
                  {rail.miniIcon}
                  <span className="text-xs sm:text-[13px] font-semibold tracking-tight whitespace-nowrap">
                    {rail.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:pr-48">
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-[#5b21b6] via-[#d946ef] to-[#fbbf24]">
                <svg viewBox="0 0 512 512" fill="none" className="h-5 w-5">
                  <path
                    fill="#ffffff"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M140 124C140 112.954 148.954 104 160 104H268C321.019 104 360 137.565 360 184C360 214.12 343.39 239.47 317.88 251.42C350.69 263.74 372 292.69 372 330C372 381.915 329.915 416 272 416H160C148.954 416 140 407.046 140 396V124ZM204 162V228H260C281.539 228 296 214.569 296 195C296 175.431 281.539 162 260 162H204ZM204 282V356H268C292.301 356 308 341.673 308 319C308 296.327 292.301 282 268 282H204Z"
                  />
                </svg>
              </div>
              <span className="text-lg font-extrabold tracking-tight text-[#161224]">bomie.ai</span>
            </div>
            <p className="max-w-sm text-xs leading-relaxed text-slate-600">
              North America&apos;s First AI Commerce OS for Local Businesses &amp; Creators—with built-in FTC compliance and 30/40/30 Stripe Escrow.
            </p>
          </div>

          <div className="space-y-3">
            <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#161224]">
              Product
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/commerce-os" className="hover:text-violet-700">
                  Commerce OS
                </Link>
              </li>
              <li>
                <Link href="/merchant" className="hover:text-violet-700">
                  For Merchants
                </Link>
              </li>
              <li>
                <Link href="/creator" className="hover:text-violet-700">
                  For Creators
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-violet-700">
                  Pricing (MVP Free)
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#161224]">
              Cities
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/stories/sf" className="hover:text-violet-700">
                  San Francisco
                </Link>
              </li>
              <li>
                <Link href="/stories/la" className="hover:text-violet-700">
                  Los Angeles
                </Link>
              </li>
              <li>
                <Link href="/stories/seattle" className="hover:text-violet-700">
                  Seattle
                </Link>
              </li>
              <li>
                <Link href="/stories/vegas" className="hover:text-violet-700">
                  Las Vegas
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#161224]">
              Company &amp; Legal
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/team" className="hover:text-violet-700">
                  Team &amp; Leadership
                </Link>
              </li>
              <li>
                <Link href="/why-bomie/stories" className="hover:text-violet-700">
                  Mission &amp; Founder
                </Link>
              </li>
              <li>
                <Link href="/why-bomie/research" className="hover:text-violet-700">
                  Bomie Research
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-violet-700">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-violet-700">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Stripe-style Industry Insights Email Capture */}
        <div className="mt-12 border-t border-violet-200/70 pt-8 pb-8">
          <FooterInsightsForm />
        </div>

        {/* Stripe-style Bottom Locale + Legal Entity Row */}
        <div className="border-t border-violet-200/70 pt-6 flex flex-col gap-2 text-xs">
          <div className="inline-flex items-center gap-2 font-semibold text-violet-700">
            <Globe className="h-4 w-4" />
            <span>United States (English)</span>
          </div>
          <div className="font-medium text-slate-600">
            © 2026 BOMIES LLC.
          </div>
        </div>
      </div>
    </footer>
  );
}
