'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const CITIES = [
  { id: 'sf', label: 'San Francisco' },
  { id: 'la', label: 'Los Angeles' },
  { id: 'seattle', label: 'Seattle' },
  { id: 'vegas', label: 'Las Vegas' },
] as const;

export default function CitySwitcher({ activeCity }: { activeCity: string }) {
  const router = useRouter();

  return (
    <nav className="inline-flex shrink-0 items-center gap-5 sm:gap-7 overflow-x-auto whitespace-nowrap text-[13px]">
      {CITIES.map((c) => (
        <Link
          key={c.id}
          href={`/stories/${c.id}`}
          onMouseEnter={() => {
            if (activeCity !== c.id) {
              router.push(`/stories/${c.id}`);
            }
          }}
          className={`whitespace-nowrap transition cursor-pointer ${
            activeCity === c.id
              ? 'font-semibold text-[#161224]'
              : 'font-normal text-[#161224]/50 hover:text-[#161224]'
          }`}
        >
          {c.label}
        </Link>
      ))}
    </nav>
  );
}
