'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, CheckCircle2 } from 'lucide-react';

export default function FooterInsightsForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setStatus('error');
      setErrorMsg('Please enter a valid work email.');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data?.ok) {
        setStatus('error');
        setErrorMsg(data?.error || 'Unable to subscribe. Please try again.');
        return;
      }
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  };

  return (
    <div className="max-w-lg space-y-3">
      <div className="text-sm font-bold text-[#161224]">
        Get industry insights and updates from Bomie AI
      </div>

      {status === 'success' ? (
        <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-xs font-semibold text-emerald-800">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>Subscribed! You&apos;ll receive our next Commerce OS &amp; Main Street research brief.</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error') setStatus('idle');
            }}
            placeholder="Enter work email"
            aria-label="Enter work email"
            className="h-10 flex-1 rounded-lg border border-slate-200 bg-white px-3.5 text-sm text-[#161224] placeholder-slate-400 shadow-2xs transition focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500/15"
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="inline-flex h-10 shrink-0 items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-[#5b21b6] to-[#7c3aed] px-5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 disabled:opacity-60 cursor-pointer"
          >
            <span>{status === 'submitting' ? 'Saving...' : 'Continue'}</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </form>
      )}

      {status === 'error' && errorMsg && (
        <p className="text-xs font-medium text-rose-600">{errorMsg}</p>
      )}

      <p className="text-[11px] leading-relaxed text-slate-500">
        Receive marketing communication from Bomie AI (including via automated systems) regarding
        product updates, industry news, and event invitations. You can unsubscribe at any time.{' '}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-[#161224]">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
