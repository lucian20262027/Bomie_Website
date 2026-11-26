'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bot,
  Check,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Lock,
  MapPin,
  Pause,
  Play,
  QrCode,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Sparkles,
  Users,
  Video,
  Wand2,
} from 'lucide-react';
import {
  DEMO_PRESETS,
  evaluateCampaignDemo,
  type DemoEvaluationResult,
  type DemoPreset,
} from '../../lib/demoEngine';

type StageId = 1 | 2 | 3 | 4;

const STAGES: { id: StageId; num: string; label: string; short: string }[] = [
  { id: 1, num: '01', label: 'Brief & AI Diff', short: 'Brief & AI Diff' },
  { id: 2, num: '02', label: 'Local Creator Match', short: 'Creator Match' },
  { id: 3, num: '03', label: '30s Script & Score', short: 'Script & Score' },
  { id: 4, num: '04', label: '30/40/30 Escrow & QR', short: 'Escrow & QR' },
];

function AnimatedScoreRing({
  score,
  label,
  colorClass,
  strokeColor,
}: {
  score: number;
  label: string;
  colorClass: string;
  strokeColor: string;
}) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, score));
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <svg className="h-20 w-20 -rotate-90" viewBox="0 0 76 76">
          <circle
            cx="38"
            cy="38"
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="6"
          />
          <motion.circle
            cx="38"
            cy="38"
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          />
        </svg>
        <span className={`absolute text-lg font-extrabold tracking-tight ${colorClass}`}>
          {clamped}%
        </span>
      </div>
      <span className="mt-1.5 text-xs font-bold text-[#161224]">{label}</span>
    </div>
  );
}

export default function DemoClient() {
  const initialPreset = DEMO_PRESETS[0];

  const [activePresetId, setActivePresetId] = useState<string>(initialPreset.id);
  const [businessName, setBusinessName] = useState<string>(initialPreset.businessName);
  const [city, setCity] = useState<string>(initialPreset.city);
  const [category, setCategory] = useState<string>(initialPreset.category);
  const [budget, setBudget] = useState<number>(initialPreset.budget);
  const [timelineDays, setTimelineDays] = useState<number>(initialPreset.timelineDays);
  const [targetTier, setTargetTier] = useState<string>(initialPreset.targetTier);
  const [brief, setBrief] = useState<string>(initialPreset.brief);

  const [activeStage, setActiveStage] = useState<StageId>(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [diffMode, setDiffMode] = useState<'ai' | 'raw'>('ai');
  const [milestoneStage, setMilestoneStage] = useState<0 | 1 | 2 | 3>(2);
  const [simulatedScans, setSimulatedScans] = useState<number>(142);
  const [isRunningCustom, setIsRunningCustom] = useState<boolean>(false);
  const [showCustomDrawer, setShowCustomDrawer] = useState<boolean>(false);

  // Interactive "Can you spot the FTC risk?" challenge state
  const [ftcChallengeChoice, setFtcChallengeChoice] = useState<'A' | 'B' | null>(null);

  const [result, setResult] = useState<DemoEvaluationResult>(() =>
    evaluateCampaignDemo({
      businessName: initialPreset.businessName,
      city: initialPreset.city,
      category: initialPreset.category,
      budget: initialPreset.budget,
      timelineDays: initialPreset.timelineDays,
      targetTier: initialPreset.targetTier,
      brief: initialPreset.brief,
    })
  );

  const autoTimerRef = useRef<number | null>(null);

  // Smooth auto-play sequencer across Stages 01 -> 02 -> 03 -> 04
  useEffect(() => {
    if (!isAutoPlaying) return;
    autoTimerRef.current = window.setInterval(() => {
      setActiveStage((prev) => (prev === 4 ? 1 : ((prev + 1) as StageId)));
    }, 4200);
    return () => {
      if (autoTimerRef.current) window.clearInterval(autoTimerRef.current);
    };
  }, [isAutoPlaying]);

  const applyParams = async (
    params: {
      businessName: string;
      city: string;
      category: string;
      budget: number;
      timelineDays: number;
      targetTier: string;
      brief: string;
    },
    targetStage: StageId = 1
  ) => {
    setIsRunningCustom(true);
    let next = evaluateCampaignDemo(params);
    try {
      const res = await fetch('/api/demo-run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      if (res.ok) {
        const json = await res.json();
        if (json?.ok && json?.result) {
          next = json.result;
        }
      }
    } catch {
      // deterministic fallback already evaluated
    }
    setResult(next);
    setMilestoneStage(next.gateStatus === 'PASS' ? 2 : 0);
    setSimulatedScans(next.gateStatus === 'PASS' ? 142 : 0);
    setActiveStage(targetStage);
    setIsRunningCustom(false);
  };

  const handleSelectPreset = (preset: DemoPreset) => {
    setActivePresetId(preset.id);
    setBusinessName(preset.businessName);
    setCity(preset.city);
    setCategory(preset.category);
    setBudget(preset.budget);
    setTimelineDays(preset.timelineDays);
    setTargetTier(preset.targetTier);
    setBrief(preset.brief);
    setDiffMode('ai');
    setIsAutoPlaying(false);
    void applyParams(
      {
        businessName: preset.businessName,
        city: preset.city,
        category: preset.category,
        budget: preset.budget,
        timelineDays: preset.timelineDays,
        targetTier: preset.targetTier,
        brief: preset.brief,
      },
      1
    );
  };

  const handleApplyAiFix = () => {
    if (!result.recommendedFix) return;
    const fix = result.recommendedFix;
    const nextTimeline = timelineDays < 4 ? 5 : timelineDays;
    setActivePresetId('fixed');
    setBudget(fix.fixedBudget);
    setTargetTier(fix.fixedTargetTier);
    setBrief(fix.fixedBrief);
    setTimelineDays(nextTimeline);
    setIsAutoPlaying(false);
    void applyParams(
      {
        businessName,
        city,
        category,
        budget: fix.fixedBudget,
        timelineDays: nextTimeline,
        targetTier: fix.fixedTargetTier,
        brief: fix.fixedBrief,
      },
      3
    );
  };

  const handleRunCustom = (e: React.FormEvent) => {
    e.preventDefault();
    setActivePresetId('custom');
    setIsAutoPlaying(false);
    void applyParams(
      {
        businessName,
        city,
        category,
        budget,
        timelineDays,
        targetTier,
        brief,
      },
      1
    );
  };

  const ftcComplianceScore =
    result.gateStatus === 'PASS' ? 96 : result.gateStatus === 'MISMATCH' ? 78 : 28;
  const localFitScore =
    result.gateStatus === 'PASS' ? 94 : result.gateStatus === 'MISMATCH' ? 42 : 68;

  const releasedPct =
    milestoneStage === 0 ? 0 : milestoneStage === 1 ? 30 : milestoneStage === 2 ? 70 : 100;
  const releasedDollars = Math.round((result.budget * releasedPct) / 100);

  // Extracted AI tags for Stage 01 (visual "AI Diff" inspired by Hypotenuse AI)
  const extractedTags =
    result.gateStatus === 'PASS'
      ? [
          { label: `Radius: ${city.split(',')[0]} (0.5–10 mi)`, ai: true },
          { label: 'Format: 30s Vertical Reel', ai: true },
          { label: '#ad Paid Partnership', ai: true },
          { label: 'Licensed Commercial Audio', ai: true },
          { label: `Budget: $${result.budget.toLocaleString()}`, ai: false },
          { label: `${result.timelineDays}-Day Sprint`, ai: false },
        ]
      : result.gateStatus === 'FLAGGED'
        ? [
            { label: 'Missing #ad Disclosure', risk: true },
            { label: 'Unsubstantiated Medical Claim', risk: true },
            { label: 'No Contract / Cash at Door', risk: true },
            { label: `Budget: $${result.budget.toLocaleString()}`, ai: false },
          ]
        : [
            { label: 'Tier Mismatch: $50 vs 500K+ Macro', risk: true },
            { label: 'Recommended: 2K–50K Local Tier', ai: true },
            { label: `Budget: $${result.budget.toLocaleString()}`, ai: false },
            { label: '2-Day Window Too Tight', risk: true },
          ];

  return (
    <div className="min-h-screen bg-[#f7f4ff] text-[#161224] flex flex-col selection:bg-violet-600 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-violet-200/70 bg-[#f7f4ff]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10 py-3.5">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#5b21b6] via-[#d946ef] to-[#fbbf24] shadow-md shadow-violet-500/20 transition-transform group-hover:scale-105">
                <svg viewBox="0 0 512 512" fill="none" className="h-5 w-5">
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
              <span className="text-lg font-extrabold tracking-tight text-[#161224]">bomie.ai</span>
            </Link>
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-white/80 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-violet-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Interactive Product Tour
            </span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-violet-100/70 hover:text-violet-950"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
            <Link
              href="/pricing"
              className="hidden sm:inline-flex rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-violet-100/70 hover:text-violet-950"
            >
              Pricing
            </Link>
            <Link
              href="/#pricing"
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-violet-600/20 transition hover:opacity-95"
            >
              Book a Demo
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* SECTION 1: HERO + INTERACTIVE PRODUCT WORKSPACE (Hypotenuse-inspired Aura + 100% Live Vector UI) */}
      <section className="relative overflow-hidden pt-10 pb-16 sm:pt-14 sm:pb-20">
        {/* Soft Radial Lavender Aura */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px] bg-[radial-gradient(ellipse_80%_60%_at_50%_10%,rgba(167,139,250,0.28),rgba(247,244,255,0))]"
        />

        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
          {/* Editorial Headline */}
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#161224] leading-[1.12]">
              From raw storefront brief to{' '}
              <span className="bg-gradient-to-r from-violet-700 via-fuchsia-600 to-amber-500 bg-clip-text text-transparent">
                verified walk-in traffic
              </span>
            </h1>
            <p className="mt-3.5 text-sm sm:text-base text-[#161224]/70 leading-relaxed">
              Watch how Bomie AI audits FTC compliance, matches hyper-local creators, scripts 30s Reels, and locks 30/40/30 Stripe escrow—live in 4 visual steps.
            </p>
          </div>

          {/* Scenario Switcher + Auto-Play / Custom Controls */}
          <div className="mt-7 flex flex-col lg:flex-row items-center justify-between gap-3">
            {/* 3 Click/Hover Scenario Pills */}
            <div className="inline-flex flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-violet-200/80 bg-white/85 p-1.5 shadow-sm backdrop-blur-sm">
              {DEMO_PRESETS.map((preset) => {
                const active = activePresetId === preset.id;
                const badgeColor =
                  preset.id === 'clean'
                    ? 'bg-emerald-500'
                    : preset.id === 'high-risk'
                      ? 'bg-rose-500'
                      : 'bg-amber-500';
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition cursor-pointer ${
                      active
                        ? 'bg-[#161224] text-white shadow-sm'
                        : 'text-slate-600 hover:bg-violet-50 hover:text-[#161224]'
                    }`}
                  >
                    <span className={`h-2 w-2 rounded-full ${badgeColor}`} />
                    <span>{preset.businessName}</span>
                    <span
                      className={`hidden sm:inline font-mono text-[10px] ${
                        active ? 'text-violet-200' : 'text-slate-400'
                      }`}
                    >
                      {preset.id === 'clean'
                        ? 'Clean Pass'
                        : preset.id === 'high-risk'
                          ? 'FTC Flagged'
                          : 'Tier Mismatch'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Playback & Customizer Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsAutoPlaying((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
                  isAutoPlaying
                    ? 'border-violet-300 bg-violet-100/80 text-violet-900'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-violet-300'
                }`}
              >
                {isAutoPlaying ? (
                  <>
                    <Pause className="h-3.5 w-3.5 text-violet-700" />
                    <span>Auto-Playing Flow</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5 text-violet-700 fill-violet-700" />
                    <span>Auto-Play Tour</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowCustomDrawer((prev) => !prev)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-violet-200 bg-white px-3.5 py-2 text-xs font-bold text-[#161224] shadow-2xs transition hover:border-violet-400 cursor-pointer"
              >
                <Sliders className="h-3.5 w-3.5 text-violet-600" />
                <span>{showCustomDrawer ? 'Hide Custom Input' : 'Test Your Own Store'}</span>
              </button>
            </div>
          </div>

          {/* Optional Collapsible Custom Input Drawer (Hidden by default so hero stays clean!) */}
          <AnimatePresence>
            {showCustomDrawer && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleRunCustom}
                className="overflow-hidden"
              >
                <div className="mt-4 rounded-2xl border border-violet-200 bg-white p-5 shadow-md space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#161224] flex items-center gap-2">
                      <Wand2 className="h-4 w-4 text-violet-600" />
                      Customize Campaign Inputs — Feeds Live Into the Workspace Below
                    </span>
                    <button
                      type="button"
                      onClick={() => handleSelectPreset(DEMO_PRESETS[0])}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-violet-700 cursor-pointer"
                    >
                      <RotateCcw className="h-3 w-3" /> Reset
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                        Storefront Name
                      </label>
                      <input
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs focus:border-violet-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs focus:border-violet-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                        Budget ($)
                      </label>
                      <input
                        type="number"
                        min={50}
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value) || 0)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-mono focus:border-violet-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                        Creator Tier
                      </label>
                      <input
                        type="text"
                        value={targetTier}
                        onChange={(e) => setTargetTier(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs focus:border-violet-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">
                    <div className="flex-1">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                        Campaign Prompt
                      </label>
                      <input
                        type="text"
                        value={brief}
                        onChange={(e) => setBrief(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs focus:border-violet-500 focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isRunningCustom}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:opacity-95 cursor-pointer"
                    >
                      <Cpu className={`h-3.5 w-3.5 ${isRunningCustom ? 'animate-spin' : ''}`} />
                      {isRunningCustom ? 'Evaluating...' : 'Run Live Audit'}
                    </button>
                  </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* THE FLAGSHIP INTERACTIVE WORKSPACE STAGE */}
          <div className="mt-5 rounded-[28px] border border-violet-200/90 bg-gradient-to-br from-[#ECE6FC]/90 via-white to-[#f5f3ff] p-2.5 sm:p-4 shadow-2xl shadow-violet-950/10">
            <div className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-sm">
              {/* Workspace Top Chrome + 4-Stage Interactive Stepper */}
              <div className="border-b border-slate-100 bg-slate-50/70 px-4 sm:px-6 py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <div className="h-4 w-px bg-slate-200" />
                  <div className="flex items-center gap-2 text-xs font-bold text-[#161224]">
                    <span>{result.businessName}</span>
                    <span className="text-slate-300">·</span>
                    <span className="font-mono text-[11px] font-semibold text-slate-500">
                      ${result.budget.toLocaleString()} · {result.timelineDays}d
                    </span>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase ${
                      result.gateStatus === 'PASS'
                        ? 'bg-emerald-100 text-emerald-800'
                        : result.gateStatus === 'FLAGGED'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {result.gateStatus === 'PASS'
                      ? '✓ Gate Pass'
                      : result.gateStatus === 'FLAGGED'
                        ? '⚠ FTC Flagged'
                        : '⚠ Scope Mismatch'}
                  </span>
                </div>

                {/* 4 Silky Interactive Workflow Tabs */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {STAGES.map((st) => {
                    const active = activeStage === st.id;
                    return (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => {
                          setIsAutoPlaying(false);
                          setActiveStage(st.id);
                        }}
                        onMouseEnter={() => {
                          setIsAutoPlaying(false);
                          setActiveStage(st.id);
                        }}
                        className={`relative inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                          active
                            ? 'bg-violet-600 text-white shadow-sm'
                            : 'bg-white text-slate-600 border border-slate-200/80 hover:border-violet-300 hover:text-violet-900'
                        }`}
                      >
                        <span
                          className={`font-mono text-[10px] ${
                            active ? 'text-violet-200' : 'text-slate-400'
                          }`}
                        >
                          {st.num}
                        </span>
                        <span>{st.short}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Continuous Animated Progress Line */}
              <div className="h-1 w-full bg-slate-100">
                <motion.div
                  className="h-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-400"
                  animate={{ width: `${activeStage * 25}%` }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                />
              </div>

              {/* MAIN WORKSPACE BODY */}
              <div className="p-5 sm:p-7 min-h-[420px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  {/* STAGE 01: BRIEF & AI DIFF */}
                  {activeStage === 1 && (
                    <motion.div
                      key="stage-1"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-5"
                    >
                      {/* Top Status Banner */}
                      <div
                        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border px-4 py-3 ${
                          result.gateStatus === 'PASS'
                            ? 'border-emerald-200 bg-emerald-50/80 text-emerald-950'
                            : result.gateStatus === 'FLAGGED'
                              ? 'border-rose-200 bg-rose-50/80 text-rose-950'
                              : 'border-amber-200 bg-amber-50/80 text-amber-950'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 text-xs font-semibold">
                          {result.gateStatus === 'PASS' ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                          ) : (
                            <ShieldAlert className="h-4 w-4 text-rose-600 shrink-0" />
                          )}
                          <span>{result.verdictTitle}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="inline-flex rounded-lg border border-black/10 bg-white/80 p-0.5 text-[11px] font-semibold">
                            <button
                              type="button"
                              onClick={() => setDiffMode('ai')}
                              className={`rounded-md px-2.5 py-1 transition cursor-pointer ${
                                diffMode === 'ai'
                                  ? 'bg-violet-600 text-white'
                                  : 'text-slate-600 hover:text-slate-900'
                              }`}
                            >
                              ✦ AI Enriched
                            </button>
                            <button
                              type="button"
                              onClick={() => setDiffMode('raw')}
                              className={`rounded-md px-2.5 py-1 transition cursor-pointer ${
                                diffMode === 'raw'
                                  ? 'bg-slate-800 text-white'
                                  : 'text-slate-600 hover:text-slate-900'
                              }`}
                            >
                              Raw Input
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* 2-Column Split Pane: Input Brief vs AI-Extracted Purple Tags & 3-Agent Audit */}
                      <div className="grid gap-5 lg:grid-cols-12">
                        {/* Left Pane: Input & AI Tag Extraction */}
                        <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-slate-50/50 p-5 space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500">
                              Storefront Input &amp; Extracted Attributes
                            </span>
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-violet-700">
                              <Sparkles className="h-3 w-3" /> Purple border = AI-enriched
                            </span>
                          </div>

                          <div className="rounded-xl border border-slate-200 bg-white p-4 text-xs sm:text-sm leading-relaxed text-[#161224]/85">
                            {brief}
                          </div>

                          {diffMode === 'ai' && (
                            <div className="space-y-2">
                              <div className="text-[11px] font-semibold text-slate-500">
                                AI-Structured Campaign Tags:
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {extractedTags.map((tag) => (
                                  <span
                                    key={tag.label}
                                    className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold ${
                                      'risk' in tag && tag.risk
                                        ? 'border border-rose-300 bg-rose-50 text-rose-800'
                                        : tag.ai
                                          ? 'border border-violet-400 bg-violet-50/90 text-violet-900 shadow-2xs'
                                          : 'border border-slate-200 bg-white text-slate-600'
                                    }`}
                                  >
                                    {tag.ai && <Sparkles className="h-3 w-3 text-violet-600" />}
                                    {'risk' in tag && tag.risk && (
                                      <AlertTriangle className="h-3 w-3 text-rose-600" />
                                    )}
                                    <span>{tag.label}</span>
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Right Pane: 3-Agent Live Verdict + 1-Click AI Rewrite */}
                        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-5 flex flex-col justify-between space-y-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-violet-700 flex items-center gap-1.5">
                                <Bot className="h-3.5 w-3.5" /> 3-Agent Governance Debate
                              </span>
                              <span className="font-mono text-xs font-bold text-[#161224]">
                                {result.readinessScore}/100
                              </span>
                            </div>

                            <div className="space-y-2">
                              {result.agentDebate.map((a) => (
                                <div
                                  key={a.agent}
                                  className="rounded-xl border border-slate-100 bg-slate-50/70 p-3"
                                >
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-xs font-bold text-[#161224]">{a.agent}</span>
                                    <span
                                      className={`rounded-full px-2 py-0.5 font-mono text-[9px] font-bold uppercase ${
                                        a.status === 'PASS'
                                          ? 'bg-emerald-100 text-emerald-700'
                                          : a.status === 'BLOCK'
                                            ? 'bg-rose-100 text-rose-700'
                                            : 'bg-amber-100 text-amber-700'
                                      }`}
                                    >
                                      {a.status}
                                    </span>
                                  </div>
                                  <p className="mt-1 text-[11px] leading-snug text-slate-600">
                                    {a.note}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {result.recommendedFix ? (
                            <button
                              type="button"
                              onClick={handleApplyAiFix}
                              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-violet-500/20 transition hover:opacity-95 cursor-pointer"
                            >
                              <Wand2 className="h-3.5 w-3.5 text-amber-200" />
                              <span>{result.recommendedFix.buttonLabel}</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                setIsAutoPlaying(false);
                                setActiveStage(2);
                              }}
                              className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-4 py-2.5 text-xs font-bold text-violet-900 transition hover:bg-violet-100 cursor-pointer"
                            >
                              <span>Next: View Matched Local Creators</span>
                              <ChevronRight className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STAGE 02: HYPER-LOCAL CREATOR MATCH (Hypotenuse Enrich-Style Table with Purple ✦ AI Cells) */}
                  {activeStage === 2 && (
                    <motion.div
                      key="stage-2"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border border-emerald-200 bg-emerald-50/80 px-4 py-3 text-xs font-semibold text-emerald-950">
                        <span className="inline-flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                          {result.creators.length > 0
                            ? `${result.creators.length} neighborhood creators enriched & scored within ${city} catchment.`
                            : 'Matching paused until FTC / budget mismatch is resolved in Stage 01.'}
                        </span>
                        <span className="inline-flex items-center gap-1 font-mono text-[11px] text-violet-700">
                          <Sparkles className="h-3 w-3" /> Purple cells = AI-verified match
                        </span>
                      </div>

                      {result.creators.length > 0 ? (
                        <div className="overflow-x-auto rounded-2xl border border-slate-200">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-mono uppercase tracking-wider text-slate-500">
                                <th className="px-4 py-3">Creator</th>
                                <th className="px-4 py-3">Distance</th>
                                <th className="px-4 py-3">Audience</th>
                                <th className="px-4 py-3">AI Match ✦</th>
                                <th className="px-4 py-3">Escrow Payout</th>
                                <th className="px-4 py-3">Tracked QR</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs">
                              {result.creators.map((c, idx) => (
                                <motion.tr
                                  key={c.id}
                                  initial={{ opacity: 0, x: -6 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.08 }}
                                  className="hover:bg-violet-50/30 transition"
                                >
                                  <td className="px-4 py-3.5">
                                    <div className="font-bold text-[#161224]">{c.handle}</div>
                                    <div className="text-[11px] text-slate-500">{c.niche}</div>
                                  </td>
                                  <td className="px-4 py-3.5 text-slate-600">
                                    <span className="inline-flex items-center gap-1">
                                      <MapPin className="h-3 w-3 text-violet-600" />
                                      {c.distance}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3.5">
                                    <div className="font-semibold text-[#161224]">{c.followers}</div>
                                    <div className="text-[10px] text-slate-500">
                                      {c.localShare} local · {c.engagement} ER
                                    </div>
                                  </td>
                                  <td className="px-4 py-3.5">
                                    <span className="inline-flex items-center gap-1 rounded-lg border border-violet-400 bg-violet-50 px-2.5 py-1 font-mono text-xs font-bold text-violet-800">
                                      <Sparkles className="h-3 w-3 text-violet-600" />
                                      {c.matchPct}% Match
                                    </span>
                                  </td>
                                  <td className="px-4 py-3.5 font-mono font-bold text-[#161224]">
                                    ${c.payout}
                                  </td>
                                  <td className="px-4 py-3.5">
                                    <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 font-mono text-[10px] font-semibold text-slate-700">
                                      <QrCode className="h-3 w-3 text-violet-600" />
                                      {c.qrCode}
                                    </span>
                                  </td>
                                </motion.tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="rounded-2xl border border-dashed border-rose-200 bg-rose-50/40 p-10 text-center space-y-3">
                          <ShieldAlert className="h-8 w-8 text-rose-500 mx-auto" />
                          <div className="text-sm font-bold text-[#161224]">
                            Creator Invites Blocked by Pre-Flight Compliance Gate
                          </div>
                          <p className="text-xs text-slate-600 max-w-md mx-auto">
                            Bomie protects your storefront from FTC fines and wasted creator outreach. Apply the 1-click AI fix to unlock verified neighborhood creators.
                          </p>
                          {result.recommendedFix && (
                            <button
                              type="button"
                              onClick={handleApplyAiFix}
                              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm cursor-pointer"
                            >
                              <Wand2 className="h-3.5 w-3.5" />
                              {result.recommendedFix.buttonLabel}
                            </button>
                          )}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* STAGE 03: 30s SCRIPT + FLOATING SCORE & GUIDELINES CARD (Direct Homage to Hypotenuse's Lumaris Chair!) */}
                  {activeStage === 3 && (
                    <motion.div
                      key="stage-3"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="relative grid gap-6 lg:grid-cols-12 items-start"
                    >
                      {/* Left/Center: 30s Storyboard Editor */}
                      <div className="lg:col-span-8 rounded-2xl border border-slate-200 bg-slate-50/50 p-5 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                          <div className="flex items-center gap-2">
                            <Video className="h-4 w-4 text-violet-600" />
                            <span className="text-sm font-bold text-[#161224]">
                              30s Reel &amp; TikTok Storyboard
                            </span>
                          </div>
                          <span className="font-mono text-[11px] text-slate-400">
                            AUTO-SCRIPTED · {category.toUpperCase()}
                          </span>
                        </div>

                        <div className="rounded-xl border border-violet-200 bg-white p-4">
                          <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-violet-700 mb-1">
                            Opening Hook (0–3s)
                          </div>
                          <p className="text-sm font-semibold text-[#161224]">{result.scriptHook}</p>
                        </div>

                        <div className="space-y-2.5">
                          {result.shotList.map((shot) => (
                            <div
                              key={shot.timestamp}
                              className="rounded-xl border border-slate-200 bg-white p-3.5 flex flex-col sm:flex-row sm:items-start gap-3"
                            >
                              <span className="shrink-0 rounded-md bg-violet-100 px-2 py-0.5 font-mono text-[11px] font-bold text-violet-800">
                                {shot.timestamp}
                              </span>
                              <div className="space-y-1 text-xs">
                                <div className="font-semibold text-[#161224]">{shot.visual}</div>
                                <div className="text-slate-500 italic">{shot.audio}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Floating Score & Guidelines Pop-out Card (Animated SVG Rings!) */}
                      <div className="lg:col-span-4 rounded-2xl border border-violet-200/90 bg-white p-5 shadow-xl shadow-violet-950/10 space-y-5 lg:-mt-2">
                        <div className="grid grid-cols-2 gap-3 pt-1">
                          <AnimatedScoreRing
                            score={ftcComplianceScore}
                            label="FTC Compliance"
                            colorClass={
                              result.gateStatus === 'PASS' ? 'text-emerald-700' : 'text-rose-600'
                            }
                            strokeColor={result.gateStatus === 'PASS' ? '#10b981' : '#f43f5e'}
                          />
                          <AnimatedScoreRing
                            score={localFitScore}
                            label="Local Hook Fit"
                            colorClass={
                              localFitScore >= 80 ? 'text-emerald-700' : 'text-amber-600'
                            }
                            strokeColor={localFitScore >= 80 ? '#10b981' : '#f59e0b'}
                          />
                        </div>

                        <div className="flex flex-wrap gap-1.5 justify-center border-t border-slate-100 pt-4">
                          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                            #ad disclosure ×
                          </span>
                          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                            local QR CTA ×
                          </span>
                          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                            licensed audio ×
                          </span>
                        </div>

                        <div className="space-y-2.5 border-t border-slate-100 pt-4 text-xs">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-slate-700">16 CFR § 255.5 disclosure clear</span>
                            {result.gateStatus === 'FLAGGED' ? (
                              <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0" />
                            ) : (
                              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                            )}
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-slate-700">Zero unverified medical claims</span>
                            {result.gateStatus === 'FLAGGED' ? (
                              <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0" />
                            ) : (
                              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                            )}
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-slate-700">3-beat local hook &amp; QR CTA</span>
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STAGE 04: 30/40/30 STRIPE ESCROW & WALK-IN QR ATTRIBUTION */}
                  {activeStage === 4 && (
                    <motion.div
                      key="stage-4"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="grid gap-6 lg:grid-cols-12 items-stretch"
                    >
                      {/* Left: Interactive 30/40/30 Milestone Stepper */}
                      <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-slate-50/50 p-5 flex flex-col justify-between space-y-5">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-violet-700">
                              30 / 40 / 30 Stripe Milestone Escrow
                            </div>
                            <h3 className="text-base font-bold text-[#161224] mt-0.5">
                              Click any milestone to simulate payout release
                            </h3>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-extrabold text-[#161224]">
                              ${releasedDollars.toLocaleString()}
                            </div>
                            <div className="font-mono text-[10px] text-emerald-700 font-bold">
                              $0 PLATFORM FEE (MVP)
                            </div>
                          </div>
                        </div>

                        {/* Progress Track */}
                        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-emerald-500"
                            animate={{ width: `${releasedPct}%` }}
                            transition={{ duration: 0.4 }}
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {[
                            {
                              stage: 1 as const,
                              pct: '30%',
                              amount: result.escrowBreakdown.milestone1,
                              title: 'Kickoff Accepted',
                              desc: 'Creator signs brief & locks calendar',
                            },
                            {
                              stage: 2 as const,
                              pct: '40%',
                              amount: result.escrowBreakdown.milestone2,
                              title: 'Draft & FTC Approved',
                              desc: 'Merchant approves 30s video cut',
                            },
                            {
                              stage: 3 as const,
                              pct: '30%',
                              amount: result.escrowBreakdown.milestone3,
                              title: 'Live Post & QR Active',
                              desc: 'Reel live with verified #ad tag',
                            },
                          ].map((m) => {
                            const unlocked = milestoneStage >= m.stage;
                            return (
                              <button
                                key={m.stage}
                                type="button"
                                onClick={() => setMilestoneStage(m.stage)}
                                className={`rounded-xl border p-3.5 text-left transition cursor-pointer ${
                                  unlocked
                                    ? 'border-emerald-400 bg-white shadow-sm'
                                    : 'border-slate-200 bg-white/60 hover:border-violet-300'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-mono text-xs font-extrabold text-violet-700">
                                    {m.pct} · ${m.amount}
                                  </span>
                                  {unlocked ? (
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                  ) : (
                                    <Lock className="h-3.5 w-3.5 text-slate-400" />
                                  )}
                                </div>
                                <div className="mt-1.5 text-xs font-bold text-[#161224]">
                                  {m.title}
                                </div>
                                <div className="mt-0.5 text-[11px] text-slate-500">{m.desc}</div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Right: Live Walk-In QR Attribution Simulator */}
                      <div className="lg:col-span-5 rounded-2xl border border-violet-200 bg-white p-5 flex flex-col justify-between space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            Storefront Walk-In Attribution
                          </span>
                          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-800">
                            {result.projectedRoas} ROAS
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 text-center">
                            <div className="text-2xl sm:text-3xl font-extrabold text-violet-700">
                              {simulatedScans}
                            </div>
                            <div className="mt-1 text-[11px] font-medium text-slate-600">
                              Verified QR Scans
                            </div>
                          </div>
                          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 text-center">
                            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
                              {result.projectedVisits}
                            </div>
                            <div className="mt-1 text-[11px] font-medium text-slate-600">
                              Projected Walk-Ins
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setSimulatedScans((s) => s + 12)}
                          className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-violet-300 bg-violet-50 px-4 py-2.5 text-xs font-bold text-violet-900 transition hover:bg-violet-100 cursor-pointer"
                        >
                          <QrCode className="h-4 w-4 text-violet-700" />
                          Simulate +12 In-Store QR Redemptions
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: DARK CHARCOAL INTERACTIVE CHALLENGE ("Can You Spot the FTC Risk?" — Inspired by Hypotenuse's "Can you tell?") */}
      <section className="bg-[#161224] text-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            {/* Left Prompt */}
            <div className="lg:col-span-5 space-y-4">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-violet-300">
                3-Agent Compliance Challenge
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Can you spot the{' '}
                <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-amber-300 bg-clip-text text-transparent">
                  $51,744 FTC violation?
                </span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                One creator post looks natural and compliant; the other triggers statutory 16 CFR Part 255 penalties. Click a card to see how Bomie&apos;s compliance engine audits both in milliseconds.
              </p>
              {ftcChallengeChoice && (
                <button
                  type="button"
                  onClick={() => setFtcChallengeChoice(null)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-300 hover:text-white transition cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Reset Challenge
                </button>
              )}
            </div>

            {/* Right 2 Interactive Cards */}
            <div className="lg:col-span-7 grid gap-5 sm:grid-cols-2">
              {/* Post A */}
              <div
                onClick={() => setFtcChallengeChoice('A')}
                className={`rounded-2xl bg-white text-[#161224] p-6 flex flex-col justify-between space-y-5 cursor-pointer transition-all border-2 ${
                  ftcChallengeChoice
                    ? 'border-rose-400'
                    : 'border-transparent hover:border-violet-400 hover:-translate-y-0.5'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Creator Post A · Med-Spa
                    </span>
                    <Users className="h-4 w-4 text-slate-400" />
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700 italic">
                    &ldquo;Obsessed with GlowMed&apos;s new laser facial!! Literally cured my acne scars permanently in 48 hours, zero downtime. DM them &apos;GLOW&apos; — not sponsored, just sharing my honest fave!&rdquo;
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  {!ftcChallengeChoice ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-700">
                      Select Post A <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  ) : (
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-rose-600">
                        <ShieldAlert className="h-4 w-4" />
                        BLOCKED BY BOMIE FTC GATE
                      </div>
                      <p className="text-[11px] text-slate-600">
                        Hidden paid endorsement (&ldquo;not sponsored&rdquo;) + unsubstantiated permanent medical cure claim.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Post B */}
              <div
                onClick={() => setFtcChallengeChoice('B')}
                className={`rounded-2xl bg-white text-[#161224] p-6 flex flex-col justify-between space-y-5 cursor-pointer transition-all border-2 ${
                  ftcChallengeChoice
                    ? 'border-emerald-400'
                    : 'border-transparent hover:border-violet-400 hover:-translate-y-0.5'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Creator Post B · Local Dining
                    </span>
                    <Users className="h-4 w-4 text-slate-400" />
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700 italic">
                    &ldquo;#ad Hosted by @SichuanBistroSF in the Mission! Their hand-pulled chili oil dumplings hit different on rainy nights. Scan my bio QR for 20% off appetizers this weekend.&rdquo;
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  {!ftcChallengeChoice ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-700">
                      Select Post B <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  ) : (
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-600">
                        <ShieldCheck className="h-4 w-4" />
                        VERIFIED PASS · ESCROW UNLOCKED
                      </div>
                      <p className="text-[11px] text-slate-600">
                        Clear #ad disclosure at line start, authentic experience, and tracked QR redemption.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CLEAN BOTTOM CTA */}
      <section className="py-14 bg-[#f7f4ff] text-center">
        <div className="mx-auto max-w-2xl px-4 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#161224]">
            Ready to launch your first risk-free local campaign?
          </h2>
          <p className="text-sm text-slate-600">
            $0 MVP platform fee · 100% pre-acceptance refund · 30/40/30 Stripe Escrow
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/#pricing"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition hover:opacity-95"
            >
              Book a Live Demo <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-white px-6 py-3 text-sm font-bold text-[#161224] transition hover:border-violet-400"
            >
              View MVP Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
