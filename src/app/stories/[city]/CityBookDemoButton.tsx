'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, X } from 'lucide-react';

export default function CityBookDemoButton({ cityName }: { cityName: string }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredContact, setPreferredContact] = useState<'either' | 'phone' | 'email'>('either');
  const [business, setBusiness] = useState('');
  const [city, setCity] = useState(cityName);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [leadId, setLeadId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          preferredContact,
          handle: `[City Story · ${cityName}] ${business.trim()}`,
          city: city.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrorMsg(data.error || 'Please fill in all required fields.');
      } else {
        setLeadId(data.leadId || 'BOMIE-NEW');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setCity(cityName);
          setErrorMsg('');
          setLeadId('');
          setOpen(true);
        }}
        className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#5b21b6] to-[#d946ef] px-7 py-3.5 text-sm font-bold text-white shadow-md shadow-violet-600/20 transition hover:opacity-95"
      >
        Launch a Free MVP Campaign in {cityName} →
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm text-left">
          <div className="relative w-full max-w-lg rounded-3xl border border-violet-200 bg-white p-7 shadow-2xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close modal"
              className="absolute right-5 top-5 rounded-full p-1.5 text-slate-400 transition hover:bg-violet-50 hover:text-slate-700"
            >
              <X className="h-4 w-4" />
            </button>

            {leadId ? (
              <div className="space-y-4 py-4 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#161224]">Demo Request Confirmed!</h3>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-mono text-[11px] font-bold text-emerald-700">
                  Ref: {leadId}
                </div>
                <p className="text-sm text-slate-600">
                  Our founding team will reach out within 24 hours to launch your $0 platform fee MVP campaign in{' '}
                  <span className="font-semibold text-[#161224]">{city}</span>.
                </p>
                <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row">
                  <Link
                    href="/merchant"
                    className="rounded-xl bg-gradient-to-r from-[#5b21b6] to-[#d946ef] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:opacity-95"
                  >
                    Try Merchant Sandbox →
                  </Link>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-xl border border-violet-200 bg-[#f7f4ff] px-5 py-2.5 text-xs font-semibold text-violet-900 hover:bg-violet-100"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-violet-700">
                    {cityName} · $0 MVP Platform Fee
                  </span>
                  <h3 className="mt-1 text-2xl font-extrabold text-[#161224]">
                    Book a Live Bomie AI Demo
                  </h3>
                  <p className="mt-1 text-xs text-slate-600">
                    See how we match your {cityName} store with high-converting local creators in under 5 minutes.
                  </p>
                </div>

                {errorMsg && (
                  <div className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-700">
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Chen"
                    className="w-full rounded-xl border border-violet-200 bg-[#faf8ff] px-3.5 py-2.5 text-sm text-[#161224] placeholder-slate-400 focus:border-violet-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-700">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@yourbusiness.com"
                      className="w-full rounded-xl border border-violet-200 bg-[#faf8ff] px-3.5 py-2.5 text-sm text-[#161224] placeholder-slate-400 focus:border-violet-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-700">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (415) 555-0192"
                      className="w-full rounded-xl border border-violet-200 bg-[#faf8ff] px-3.5 py-2.5 text-sm text-[#161224] placeholder-slate-400 focus:border-violet-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700">
                    Preferred Contact Method
                  </label>
                  <div className="grid grid-cols-3 gap-2 rounded-xl border border-violet-200 bg-[#f7f4ff] p-1">
                    {(
                      [
                        { id: 'email', label: '✉️ Email' },
                        { id: 'phone', label: '📞 Phone / Text' },
                        { id: 'either', label: 'Either' },
                      ] as const
                    ).map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setPreferredContact(opt.id)}
                        className={`rounded-lg py-2 text-xs font-semibold transition ${
                          preferredContact === opt.id
                            ? 'bg-gradient-to-r from-[#5b21b6] to-[#d946ef] text-white shadow-sm'
                            : 'text-slate-600 hover:bg-white hover:text-[#161224]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-700">
                      Business / Store Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={business}
                      onChange={(e) => setBusiness(e.target.value)}
                      placeholder="Sichuan Bistro"
                      className="w-full rounded-xl border border-violet-200 bg-[#faf8ff] px-3.5 py-2.5 text-sm text-[#161224] placeholder-slate-400 focus:border-violet-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-700">City *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full rounded-xl border border-violet-200 bg-[#faf8ff] px-3.5 py-2.5 text-sm text-[#161224] placeholder-slate-400 focus:border-violet-500 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-xl bg-gradient-to-r from-[#5b21b6] to-[#d946ef] py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition hover:opacity-95 disabled:opacity-50"
                >
                  {submitting ? 'Submitting Request...' : 'Schedule My 15-Min Demo'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
