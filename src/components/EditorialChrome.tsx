import React from 'react';
import Link from 'next/link';

interface EditorialHeaderProps {
  activeNav?: 'mission' | 'founder' | 'research' | 'legal';
  rightSlot?: React.ReactNode;
}

export function EditorialHeader({ activeNav, rightSlot }: EditorialHeaderProps) {
  return (
    <header className="w-full border-b border-[#161224]/10 bg-[#f7f4ff] print:static print:border-[#161224]/15 print:bg-white">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 sm:px-10 h-[74px]">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#161224] text-[#f7f4ff] transition group-hover:opacity-85">
              <svg viewBox="0 0 512 512" fill="none" className="h-4 w-4">
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M140 124C140 112.954 148.954 104 160 104H268C321.019 104 360 137.565 360 184C360 214.12 343.39 239.47 317.88 251.42C350.69 263.74 372 292.69 372 330C372 381.915 329.915 416 272 416H160C148.954 416 140 407.046 140 396V124ZM204 162V228H260C281.539 228 296 214.569 296 195C296 175.431 281.539 162 260 162H204ZM204 282V356H268C292.301 356 308 341.673 308 319C308 296.327 292.301 282 268 282H204Z"
                />
              </svg>
            </div>
            <span className="text-base font-semibold tracking-tight text-[#161224]">
              BOMIE
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-[13px] text-[#161224]/62 print:hidden">
            <Link href="/commerce-os" className="hover:text-[#161224] transition">
              Commerce OS
            </Link>
            <Link
              href="/why-bomie/stories"
              className={
                activeNav === 'mission'
                  ? 'text-[#161224] font-medium'
                  : 'hover:text-[#161224] transition'
              }
            >
              Mission
            </Link>
            <Link
              href="/why-bomie/stories/founder"
              className={
                activeNav === 'founder'
                  ? 'text-[#161224] font-medium'
                  : 'hover:text-[#161224] transition'
              }
            >
              Founder
            </Link>
            <Link
              href="/why-bomie/research"
              className={
                activeNav === 'research'
                  ? 'text-[#161224] font-medium'
                  : 'hover:text-[#161224] transition'
              }
            >
              Research
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2.5 print:hidden">
          {rightSlot ?? (
            <Link
              href="/demo"
              className="inline-flex items-center justify-center rounded-[10px] border border-[#161224]/30 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[#161224] transition hover:bg-[#161224] hover:text-[#f7f4ff]"
            >
              LIVE SANDBOX
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export function EditorialFooter() {
  return (
    <footer className="border-t border-[#161224]/12 bg-[#f7f4ff] print:hidden">
      <div className="mx-auto flex max-w-[1440px] flex-col sm:flex-row items-center justify-between gap-4 px-6 sm:px-10 py-6 font-mono text-[11px] uppercase tracking-[0.12em] text-[#161224]/60">
        <span>© 2026 BOMIE AI · SAN FRANCISCO</span>
        <div className="flex flex-wrap items-center gap-6">
          <Link href="/why-bomie/stories" className="hover:text-[#161224]">
            MISSION &amp; FOUNDER
          </Link>
          <Link href="/why-bomie/research" className="hover:text-[#161224]">
            RESEARCH
          </Link>
          <Link href="/privacy" className="hover:text-[#161224]">
            PRIVACY
          </Link>
          <Link href="/terms" className="hover:text-[#161224]">
            TERMS
          </Link>
        </div>
        <div className="flex items-center gap-5">
          <a
            href="https://www.linkedin.com/in/lucianwang18"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#161224]"
          >
            LINKEDIN
          </a>
          <a href="mailto:lucian.wang@bomie.ai" className="hover:text-[#161224]">
            EMAIL
          </a>
        </div>
      </div>
    </footer>
  );
}
