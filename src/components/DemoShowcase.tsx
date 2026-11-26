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
} from '../lib/demoEngine';

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

export default function DemoShowcase({ showHero = true, hideCustomDrawerButton = false }: { showHero?: boolean; hideCustomDrawerButton?: boolean }) {
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

  const loadPresetInstant = (preset: DemoPreset) => {
    const next = evaluateCampaignDemo({
      businessName: preset.businessName,
      city: preset.city,
      category: preset.category,
      budget: preset.budget,
      timelineDays: preset.timelineDays,
      targetTier: preset.targetTier,
      brief: preset.brief,
    });
    setActivePresetId(preset.id);
    setBusinessName(preset.businessName);
    setCity(preset.city);
    setCategory(preset.category);
    setBudget(preset.budget);
    setTimelineDays(preset.timelineDays);
    setTargetTier(preset.targetTier);
    setBrief(preset.brief);
    setDiffMode('ai');
    setResult(next);
    setMilestoneStage(next.gateStatus === 'PASS' ? 2 : 0);
    setSimulatedScans(next.gateStatus === 'PASS' ? 142 : 0);
    setActiveStage(1);
  };

  // Smooth auto-play sequencer: 01 -> 02 -> 03 -> 04 (3s/stage), then rotates to the next merchant
  useEffect(() => {
    if (!isAutoPlaying) return;
    autoTimerRef.current = window.setTimeout(() => {
      if (activeStage < 4) {
        setActiveStage((activeStage + 1) as StageId);
      } else {
        const idx = DEMO_PRESETS.findIndex((p) => p.id === activePresetId);
        if (idx !== -1) {
          const nextPreset = DEMO_PRESETS[(idx + 1) % DEMO_PRESETS.length];
          loadPresetInstant(nextPreset);
        } else {
          setActiveStage(1);
        }
      }
    }, 3000);
    return () => {
      if (autoTimerRef.current) window.clearTimeout(autoTimerRef.current);
    };
  }, [isAutoPlaying, activeStage, activePresetId]);

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
    loadPresetInstant(preset);
    setIsAutoPlaying(true);
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
    <section className={`relative overflow-hidden ${showHero ? "pt-10 pb-16 sm:pt-14 sm:pb-20" : "py-4"}`}>
        {/* Soft Radial Lavender Aura */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px] bg-[radial-gradient(ellipse_80%_60%_at_50%_10%,rgba(167,139,250,0.28),rgba(247,244,255,0))]"
        />

        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
          {/* Editorial Headline */}
          {showHero && (
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
          )}

          {/* Scenario Switcher + Optional Custom Controls */}
          <div className={`${showHero ? 'mt-7 ' : ''}flex flex-col lg:flex-row items-center ${hideCustomDrawerButton ? 'justify-center' : 'justify-between'} gap-3`}>
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
                    onMouseEnter={() => {
                      if (activePresetId !== preset.id) handleSelectPreset(preset);
                    }}
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

            {/* Optional Customizer Button */}
            {!hideCustomDrawerButton && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowCustomDrawer((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-violet-200 bg-white px-3.5 py-2 text-xs font-bold text-[#161224] shadow-2xs transition hover:border-violet-400 cursor-pointer"
                >
                  <Sliders className="h-3.5 w-3.5 text-violet-600" />
                  <span>{showCustomDrawer ? 'Hide Custom Input' : 'Test Your Own Store'}</span>
                </button>
              </div>
            )}
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
          <div
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="mt-5 rounded-[28px] border border-violet-200/90 bg-gradient-to-br from-[#ECE6FC]/90 via-white to-[#f5f3ff] p-2.5 sm:p-4 shadow-2xl shadow-violet-950/10"
          >
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

              {/* Continuous Video-Style Animated Progress Line */}
              <div className="h-1.5 w-full bg-slate-100 overflow-hidden">
                {isAutoPlaying ? (
                  <motion.div
                    key={`playhead-${activePresetId}-${activeStage}`}
                    className="h-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-400"
                    initial={{ width: `${(activeStage - 1) * 25}%` }}
                    animate={{ width: `${activeStage * 25}%` }}
                    transition={{ duration: 3, ease: 'linear' }}
                  />
                ) : (
                  <motion.div
                    className="h-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-400"
                    animate={{ width: `${activeStage * 25}%` }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />
                )}
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

  );
}
