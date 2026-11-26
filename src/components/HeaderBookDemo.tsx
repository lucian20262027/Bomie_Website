'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import TurnstileWidget from './TurnstileWidget';

export default function HeaderBookDemo() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [demoName, setDemoName] = useState('');
  const [demoEmail, setDemoEmail] = useState('');
  const [demoPhone, setDemoPhone] = useState('');
  const [demoPreferredContact, setDemoPreferredContact] = useState<'email' | 'phone' | 'either'>('either');
  const [demoHandle, setDemoHandle] = useState('');
  const [demoCity, setDemoCity] = useState('');
  const [demoTurnstileToken, setDemoTurnstileToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leadId, setLeadId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 240);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!demoTurnstileToken) {
      setError('Please complete the human verification check below.');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: demoName,
          email: demoEmail,
          phone: demoPhone,
          preferredContact: demoPreferredContact,
          handle: demoHandle,
          city: demoCity,
          turnstileToken: demoTurnstileToken,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        setError(data?.error || 'Could not submit right now. Please try again.');
        setIsSubmitting(false);
        return;
      }
      setLeadId(data.leadId || '');
      setSubmitted(true);
    } catch {
      setError('Network error — please try again or email lucian.wang@bomie.ai.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setSubmitted(false);
          setError('');
          setDemoTurnstileToken('');
          setShowModal(true);
        }}
        className={`inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full border px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
          isScrolled
            ? 'border-transparent bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-700 !text-white shadow-md shadow-violet-600/25 hover:opacity-95'
            : 'border-violet-200 bg-white/95 text-[#161224] shadow-sm shadow-violet-900/5 hover:border-violet-400 hover:bg-violet-50/70'
        }`}
      >
        Book a Demo
      </button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl border border-violet-200 bg-white p-7 shadow-2xl text-[#161224]"
            >
              <button
                type="button"
                onClick={() => setShowModal(false)}
                aria-label="Close Book a Demo modal"
                className="absolute right-5 top-5 text-slate-400 hover:text-slate-800 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {submitted ? (
                <div className="py-6 text-center space-y-4">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#161224]">
                    Demo Request Received!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-sm mx-auto">
                    Thank you, <strong>{demoName}</strong>! Our founder team will contact{' '}
                    <strong>
                      {demoPreferredContact === 'phone' && demoPhone
                        ? demoPhone
                        : demoPreferredContact === 'either' && demoPhone
                          ? `${demoEmail} / ${demoPhone}`
                          : demoEmail}
                    </strong>{' '}
                    within 2 hours with a live campaign walkthrough for{' '}
                    <strong>{demoHandle}</strong>.
                  </p>
                  {leadId && (
                    <div className="inline-block rounded-lg border border-violet-200 bg-[#f7f4ff] px-3 py-1 font-mono text-xs text-violet-800">
                      Reference ID: {leadId}
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-extrabold text-[#161224]">
                      Book a Live Bomie AI Demo
                    </h3>
                    <p className="mt-1 text-xs text-slate-600">
                      See how we match your store with high-converting local creators in under 5 minutes.
                    </p>
                  </div>

                  {error && (
                    <div className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-700">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={demoName}
                      onChange={(e) => setDemoName(e.target.value)}
                      placeholder="Jordan Miller"
                      className="w-full rounded-xl border border-violet-200 bg-[#faf8ff] px-3.5 py-2.5 text-sm text-[#161224] placeholder-slate-400 focus:border-violet-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={demoEmail}
                        onChange={(e) => setDemoEmail(e.target.value)}
                        placeholder="jordan@yourbusiness.com"
                        className="w-full rounded-xl border border-violet-200 bg-[#faf8ff] px-3.5 py-2.5 text-sm text-[#161224] placeholder-slate-400 focus:border-violet-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        value={demoPhone}
                        onChange={(e) => setDemoPhone(e.target.value)}
                        placeholder="+1 (415) 555-0192"
                        className="w-full rounded-xl border border-violet-200 bg-[#faf8ff] px-3.5 py-2.5 text-sm text-[#161224] placeholder-slate-400 focus:border-violet-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
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
                          onClick={() => setDemoPreferredContact(opt.id)}
                          className={`rounded-lg py-2 text-xs font-semibold transition cursor-pointer ${
                            demoPreferredContact === opt.id
                              ? 'bg-gradient-to-r from-[#5b21b6] to-[#d946ef] text-white shadow-sm'
                              : 'text-slate-600 hover:bg-white hover:text-[#161224]'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Business / Creator Handle *
                      </label>
                      <input
                        type="text"
                        required
                        value={demoHandle}
                        onChange={(e) => setDemoHandle(e.target.value)}
                        placeholder="Sichuan Bistro SF"
                        className="w-full rounded-xl border border-violet-200 bg-[#faf8ff] px-3.5 py-2.5 text-sm text-[#161224] placeholder-slate-400 focus:border-violet-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        City / Region *
                      </label>
                      <input
                        type="text"
                        required
                        value={demoCity}
                        onChange={(e) => setDemoCity(e.target.value)}
                        placeholder="San Francisco, CA"
                        className="w-full rounded-xl border border-violet-200 bg-[#faf8ff] px-3.5 py-2.5 text-sm text-[#161224] placeholder-slate-400 focus:border-violet-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-1 space-y-3">
                    <TurnstileWidget
                      onVerify={(token) => {
                        setDemoTurnstileToken(token);
                        if (error) setError('');
                      }}
                      onExpire={() => setDemoTurnstileToken('')}
                      onError={() => {
                        setDemoTurnstileToken('');
                        setError('Verification failed to load. Please refresh and try again.');
                      }}
                    />

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-xl bg-gradient-to-r from-[#5b21b6] to-[#d946ef] py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition hover:opacity-95 disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? 'Submitting Request...' : 'Schedule My 15-Min Demo'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
