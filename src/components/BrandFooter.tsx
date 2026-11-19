import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

const infraRails = [
  {
    name: 'Google Gemini',
    role: 'Multimodal AI',
    badge: (
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200/80 bg-white">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
          <defs>
            <linearGradient id="bomieGeminiGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1C7EFF" />
              <stop offset="55%" stopColor="#8E75FF" />
              <stop offset="100%" stopColor="#D96570" />
            </linearGradient>
          </defs>
          <path
            d="M12 2C12.7 7.1 16.9 11.3 22 12C16.9 12.7 12.7 16.9 12 22C11.3 16.9 7.1 12.7 2 12C7.1 11.3 11.3 7.1 12 2Z"
            fill="url(#bomieGeminiGrad)"
          />
        </svg>
      </div>
    ),
  },
  {
    name: 'Google Cloud',
    role: 'AI Infrastructure',
    badge: (
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200/80 bg-white">
        <svg viewBox="0 0 28 22" fill="none" className="h-5 w-6" aria-hidden="true">
          <path
            d="M21.4 9.5C20.5 6.2 17.5 3.8 13.9 3.8C10.9 3.8 8.3 5.5 7 8C4.3 8.4 2.2 10.7 2.2 13.5C2.2 16.6 4.7 19.1 7.8 19.1H21C23.7 19.1 25.8 17 25.8 14.3C25.8 11.8 23.9 9.8 21.4 9.5Z"
            stroke="#4285F4"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <path d="M7.8 19.1C4.7 19.1 2.2 16.6 2.2 13.5C2.2 10.7 4.3 8.4 7 8" stroke="#EA4335" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M7 8C8.3 5.5 10.9 3.8 13.9 3.8C16.1 3.8 18.1 4.7 19.5 6.2" stroke="#FBBC05" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M12.5 19.1H21C23.7 19.1 25.8 17 25.8 14.3" stroke="#34A853" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </div>
    ),
  },
  {
    name: 'AWS',
    role: 'Cloud & Compute',
    badge: (
      <div className="flex h-9 w-9 shrink-0 flex-col items-center justify-center rounded-xl bg-slate-900 px-1.5 text-white">
        <span className="text-[11px] font-black leading-none tracking-tight">aws</span>
        <svg viewBox="0 0 36 10" fill="none" className="mt-0.5 h-2 w-6" aria-hidden="true">
          <path d="M2 2.5C11 8.5 23 8.5 32 3" stroke="#FF9900" strokeWidth="2.2" strokeLinecap="round" />
          <path
            d="M28.5 1.8L33.2 2.9L31.4 7.2"
            stroke="#FF9900"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
  },
  {
    name: 'Microsoft Azure',
    role: 'Enterprise Cloud',
    badge: (
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200/80 bg-white">
        <svg viewBox="0 0 20 20" fill="none" className="h-4.5 w-4.5" aria-hidden="true">
          <rect x="2" y="2" width="7.2" height="7.2" rx="1" fill="#F25022" />
          <rect x="10.8" y="2" width="7.2" height="7.2" rx="1" fill="#7FBA00" />
          <rect x="2" y="10.8" width="7.2" height="7.2" rx="1" fill="#00A4EF" />
          <rect x="10.8" y="10.8" width="7.2" height="7.2" rx="1" fill="#FFB900" />
        </svg>
      </div>
    ),
  },
  {
    name: 'Mercury',
    role: 'Business Banking',
    badge: (
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1E1B4B] text-white">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
          <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="2.6" fill="#A5B4FC" />
          <path d="M6.5 6.5C9.5 4.5 14.5 4.5 17.5 6.5" stroke="#818CF8" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>
    ),
  },
  {
    name: 'Stripe',
    role: 'Escrow & Payouts',
    badge: (
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#635BFF] text-white">
        <span className="text-base font-black leading-none tracking-tighter">S</span>
      </div>
    ),
  },
];

export default function BrandFooter() {
  return (
    <footer className="border-t border-violet-200/80 bg-white/60 py-14 text-sm text-slate-600">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        {/* AI, Cloud, Banking & Payment Infrastructure Strip */}
        <div className="mb-12 border-b border-violet-200/70 pb-10">
          <div className="mb-5 flex flex-col items-start justify-between gap-1.5 sm:flex-row sm:items-center">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-violet-700/85">
              AI, Cloud, Banking &amp; Payment Infrastructure
            </span>
            <span className="text-xs text-slate-500">
              Powered by frontier AI, enterprise cloud compute, US business banking &amp; 30/40/30 escrow rails
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
            {infraRails.map((rail) => (
              <div
                key={rail.name}
                className="flex items-center gap-2 sm:gap-2.5 rounded-2xl border border-violet-200/70 bg-white/85 px-2.5 py-2.5 sm:px-3.5 sm:py-3 shadow-xs transition hover:border-violet-300 hover:bg-white hover:shadow-sm"
              >
                {rail.badge}
                <div className="min-w-0">
                  <div className="text-[11.5px] sm:text-xs font-bold leading-tight text-[#161224]">{rail.name}</div>
                  <div className="text-[10px] sm:text-[11px] leading-tight text-slate-500">{rail.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
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
            <div className="flex items-center gap-2 pt-1 text-xs font-medium text-slate-500">
              <ShieldCheck className="h-4 w-4 text-violet-600" />
              <span>© 2026 BOMIES LLC · San Francisco, CA</span>
            </div>
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
                <Link href="/why-bomie/stories" className="hover:text-violet-700">
                  Founder &amp; Mission
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
      </div>
    </footer>
  );
}
