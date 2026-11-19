'use client';

import React, { useState } from 'react';
import { CheckCircle2, RotateCw, XCircle } from 'lucide-react';

interface FlipPainCardProps {
  title: string;
  desc: string;
  solutionTitle: string;
  solutionDesc: string;
}

export default function FlipPainCard({
  title,
  desc,
  solutionTitle,
  solutionDesc,
}: FlipPainCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => setFlipped((prev) => !prev)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setFlipped((prev) => !prev);
        }
      }}
      aria-pressed={flipped}
      className="group relative h-[188px] w-full cursor-pointer [perspective:1000px] focus:outline-none"
    >
      <div
        className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${
          flipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* Front: Pain Point */}
        <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-rose-200/80 bg-gradient-to-br from-rose-50/70 via-white to-white p-6 shadow-sm [backface-visibility:hidden] group-hover:border-rose-300">
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-rose-100/80 text-rose-600 transition group-hover:scale-110">
                <XCircle className="h-5 w-5" />
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 group-hover:text-rose-600">
                <RotateCw className="h-3 w-3" />
                See Bomie Fix
              </span>
            </div>
            <h2 className="mt-3 text-base font-bold text-[#161224]">{title}</h2>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{desc}</p>
          </div>
        </div>

        {/* Back: Bomie Solution */}
        <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-emerald-300/80 bg-gradient-to-br from-emerald-50/90 via-white to-[#f7f4ff] p-6 shadow-md [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <CheckCircle2 className="h-5 w-5" />
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                <RotateCw className="h-3 w-3" />
                Bomie Solution
              </span>
            </div>
            <h2 className="mt-3 text-base font-bold text-emerald-950">{solutionTitle}</h2>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-700">{solutionDesc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
