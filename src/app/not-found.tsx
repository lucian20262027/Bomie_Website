import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f7f4ff] px-6 text-center text-[#161224]">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#5b21b6] via-[#d946ef] to-[#fbbf24] shadow-lg shadow-violet-500/30">
        <svg viewBox="0 0 512 512" fill="none" className="h-8 w-8">
          <path
            fill="#ffffff"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M140 124C140 112.954 148.954 104 160 104H268C321.019 104 360 137.565 360 184C360 214.12 343.39 239.47 317.88 251.42C350.69 263.74 372 292.69 372 330C372 381.915 329.915 416 272 416H160C148.954 416 140 407.046 140 396V124ZM204 162V228H260C281.539 228 296 214.569 296 195C296 175.431 281.539 162 260 162H204ZM204 282V356H268C292.301 356 308 341.673 308 319C308 296.327 292.301 282 268 282H204Z"
          />
          <path
            fill="#fef08a"
            d="M396 76C399.5 103.5 412.5 116.5 440 120C412.5 123.5 399.5 136.5 396 164C392.5 136.5 379.5 123.5 352 120C379.5 116.5 392.5 103.5 396 76Z"
          />
        </svg>
      </div>

      <span className="font-mono text-xs font-bold uppercase tracking-widest text-violet-700">
        404 · Page Not Found
      </span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">
        Let&apos;s Get You Back to Main Street
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600 sm:text-base">
        The page you&apos;re looking for doesn&apos;t exist or has moved. Explore Bomie Commerce OS or head back to our homepage.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-2xl border border-violet-200 bg-white px-5 py-3 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-violet-50 hover:text-violet-950"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        <Link
          href="/commerce-os"
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#5b21b6] to-[#d946ef] px-5 py-3 text-xs font-bold text-white shadow-md shadow-violet-500/25 transition hover:opacity-95"
        >
          Explore Commerce OS
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
