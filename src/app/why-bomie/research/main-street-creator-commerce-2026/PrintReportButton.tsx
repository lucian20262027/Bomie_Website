'use client';

import { Printer } from 'lucide-react';

export default function PrintReportButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print:hidden inline-flex items-center gap-1.5 whitespace-nowrap rounded-[10px] border border-[#161224] bg-[#161224] px-3 sm:px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[#f7f4ff] transition hover:opacity-90 cursor-pointer"
    >
      <Printer className="h-3.5 w-3.5 shrink-0" />
      <span className="sm:hidden">PDF</span>
      <span className="hidden sm:inline">Download / Print PDF</span>
    </button>
  );
}
