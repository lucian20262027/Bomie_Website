import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function BrandFooter() {
  return (
    <footer className="border-t border-violet-200/80 bg-white/60 py-14 text-sm text-slate-600">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
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
                  Bomie Stories
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
