'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Store, Video } from 'lucide-react';
import { HERO_LIVE_MATCHES } from '../data/landingData';

export default function SandHeroSection({
  onSwitchToDefault,
}: {
  onSwitchToDefault?: () => void;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % HERO_LIVE_MATCHES.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const current = HERO_LIVE_MATCHES[activeIdx];

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative -mt-[64px] sm:-mt-[72px] flex min-h-[100svh] w-full flex-col items-center justify-between overflow-hidden bg-[#0b0717] px-6 pt-28 pb-10 text-center text-white"
    >
      {/* Full-Bleed Cross-Fading 3-Video Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {HERO_LIVE_MATCHES.map((item, idx) => (
          <video
            key={item.tag}
            src={item.video}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              idx === 0 ? 'object-[center_42%]' : 'object-center'
            } ${activeIdx === idx ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        {/* Cinematic Dark Scrim for High Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-[#0b0717]/85" />
      </div>

      {/* Top Spacer */}
      <div className="relative z-10 flex items-center gap-2 pt-2">
        {onSwitchToDefault && (
          <button
            type="button"
            onClick={onSwitchToDefault}
            className="rounded-full border border-white/20 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/80 backdrop-blur-md transition hover:bg-white hover:text-[#161224] cursor-pointer"
          >
            A/B Preview: Sand Mode · Switch Back to Default (A)
          </button>
        )}
      </div>

      {/* Centered Sand.ai-Style Editorial Statement + Dual CTAs */}
      <div className="relative z-10 mx-auto max-w-4xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.26em] text-amber-200/90"
        >
          BOMIE.AI · NORTH AMERICA&apos;S AI COMMERCE OS
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="text-4xl sm:text-6xl lg:text-[68px] font-medium leading-[1.06] tracking-[-0.02em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]"
          style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
        >
          Where Local Businesses Meet Booming Creators
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-white/85"
        >
          {current.business} · {current.location} · {current.matchScore} ({current.estReach})
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2"
        >
          <Link
            href="/merchant"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#161224] shadow-xl transition hover:scale-[1.03] hover:bg-violet-50"
          >
            <Store className="h-4 w-4 text-violet-700" />
            <span>I&apos;m a Merchant</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/creator"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/30 bg-black/35 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:scale-[1.03] hover:border-white/60 hover:bg-black/55"
          >
            <Video className="h-4 w-4 text-fuchsia-300" />
            <span>I&apos;m a Creator</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>

      {/* Bottom Video Scene Pills + Scroll Chevron */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/45 p-1 backdrop-blur-md">
          {HERO_LIVE_MATCHES.map((item, idx) => (
            <button
              key={item.tag}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`rounded-full px-3.5 py-1 text-xs font-semibold transition cursor-pointer ${
                activeIdx === idx
                  ? 'bg-white text-[#161224] shadow-xs'
                  : 'text-white/75 hover:text-white'
              }`}
            >
              {item.tag}
            </button>
          ))}
        </div>

        <a
          href="#stories"
          aria-label="Scroll down"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white/80 backdrop-blur-sm transition hover:border-white/50 hover:text-white"
        >
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
