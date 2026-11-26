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
    <div className="inline-flex shrink-0 items-center gap-1 overflow-x-auto whitespace-nowrap rounded-2xl border border-violet-200/70 bg-white shadow-sm p-1.5">
      {CITIES.map((c) => (
        <Link
          key={c.id}
          href={`/stories/${c.id}`}
          onMouseEnter={() => {
            if (activeCity !== c.id) {
              router.push(`/stories/${c.id}`);
            }
          }}
          className={`whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-semibold transition cursor-pointer ${
            activeCity === c.id
              ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md'
              : 'text-slate-600 hover:bg-violet-50 hover:text-violet-950'
          }`}
        >
          {c.label}
        </Link>
      ))}
    </div>
  );
}
