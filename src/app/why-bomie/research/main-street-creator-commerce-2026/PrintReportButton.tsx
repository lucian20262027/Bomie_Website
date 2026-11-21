'use client';

import { Printer } from 'lucide-react';

export default function PrintReportButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print:hidden inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-xs font-bold text-white shadow-sm shadow-violet-600/20 transition hover:opacity-95 cursor-pointer"
    >
      <Printer className="h-3.5 w-3.5 text-amber-200" />
      Download / Print PDF
    </button>
  );
}
