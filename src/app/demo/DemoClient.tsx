'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowLeft,
  Bot,
  CheckCircle2,
  Cpu,
  Lock,
  MapPin,
  QrCode,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
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

type OutputTab = 'governance' | 'creators' | 'escrow';

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

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [pipelineStep, setPipelineStep] = useState<1 | 2 | 3 | 4>(4);
  const [activeTab, setActiveTab] = useState<OutputTab>('governance');
  const [milestoneStage, setMilestoneStage] = useState<0 | 1 | 2 | 3>(1);
  const [simulatedScans, setSimulatedScans] = useState<number>(142);

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

  const executeRun = async (params: {
    businessName: string;
    city: string;
    category: string;
    budget: number;
    timelineDays: number;
    targetTier: string;
    brief: string;
  }) => {
    setIsRunning(true);
    setPipelineStep(1);
    setTimeout(() => setPipelineStep(2), 180);
    setTimeout(() => setPipelineStep(3), 360);

    let nextResult = evaluateCampaignDemo(params);
    try {
      const res = await fetch('/api/demo-run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      if (res.ok) {
        const json = await res.json();
        if (json?.ok && json?.result) {
          nextResult = json.result;
        }
      }
    } catch {
      // deterministic engine already computed
    }

    setTimeout(() => {
      setResult(nextResult);
      setPipelineStep(4);
      setIsRunning(false);
      setMilestoneStage(nextResult.gateStatus === 'PASS' ? 1 : 0);
      setSimulatedScans(nextResult.gateStatus === 'PASS' ? 142 : 0);
      setActiveTab('governance');
    }, 420);
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
    void executeRun({
      businessName: preset.businessName,
      city: preset.city,
      category: preset.category,
      budget: preset.budget,
      timelineDays: preset.timelineDays,
      targetTier: preset.targetTier,
      brief: preset.brief,
    });
  };

  const handleApplyAiFix = () => {
    if (!result.recommendedFix) return;
    const fix = result.recommendedFix;
    setActivePresetId('fixed');
    setBudget(fix.fixedBudget);
    setTargetTier(fix.fixedTargetTier);
    setBrief(fix.fixedBrief);
    if (timelineDays < 4) setTimelineDays(5);
    void executeRun({
      businessName,
      city,
      category,
      budget: fix.fixedBudget,
      timelineDays: timelineDays < 4 ? 5 : timelineDays,
      targetTier: fix.fixedTargetTier,
      brief: fix.fixedBrief,
    });
  };

  const handleReset = () => {
    handleSelectPreset(DEMO_PRESETS[0]);
  };

  const gateBannerStyles =
    result.gateStatus === 'PASS'
      ? 'border-emerald-200 bg-emerald-50/90 text-emerald-950'
      : result.gateStatus === 'FLAGGED'
        ? 'border-rose-200 bg-rose-50/90 text-rose-950'
        : 'border-amber-200 bg-amber-50/90 text-amber-950';

  const releasedPct =
    milestoneStage === 0 ? 0 : milestoneStage === 1 ? 30 : milestoneStage === 2 ? 70 : 100;
  const releasedDollars = Math.round((result.budget * releasedPct) / 100);

  return (
    <div className="min-h-screen bg-[#f5f4f8] text-[#161224] flex flex-col">
      {/* Top Product OS Header Bar */}
      <header className="sticky top-0 z-30 border-b border-violet-200/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#5b21b6] via-[#d946ef] to-[#fbbf24] shadow-sm shadow-violet-500/30">
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
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold tracking-tight text-[#161224]">
                  Bomie AI
                </span>
                <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-800">
                  Live Sandbox
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Autonomous Campaign Intake, FTC 16 CFR Part 255 Governance &amp; Creator Escrow OS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-[11px] font-semibold text-violet-800">
              <Sparkles className="h-3.5 w-3.5 text-fuchsia-600" />
              Powered by Google Gemini
            </span>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              bomie.ai
            </Link>
          </div>
        </div>
      </header>

      {/* Main Split Product Workspace */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 py-5 grid gap-5 lg:grid-cols-12 items-start">
        {/* LEFT COLUMN: Merchant Campaign Intake */}
        <section className="lg:col-span-5 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h1 className="text-base font-bold text-[#161224]">
                Merchant Campaign Intake
              </h1>
              <p className="text-xs text-slate-500">
                Load a preset scenario or test custom local campaign terms.
              </p>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-violet-700 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          </div>

          {/* Preset Scenarios */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Quick-Load Preset Scenarios
            </div>
            {DEMO_PRESETS.map((preset) => {
              const selected = activePresetId === preset.id;
              const badgeColor =
                preset.id === 'clean'
                  ? 'text-emerald-700'
                  : preset.id === 'high-risk'
                    ? 'text-rose-700'
                    : 'text-amber-700';
              const iconEl =
                preset.id === 'clean' ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                ) : preset.id === 'high-risk' ? (
                  <ShieldAlert className="h-4 w-4 text-rose-600 shrink-0" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                );

              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={`w-full text-left rounded-xl border p-3 transition cursor-pointer ${
                    selected
                      ? 'border-violet-600 bg-violet-50/70 ring-1 ring-violet-600/30'
                      : 'border-slate-200 bg-white hover:border-violet-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${badgeColor}`}>
                      {iconEl}
                      {preset.badge}
                    </span>
                    <span className="font-mono text-[11px] font-semibold text-slate-500">
                      ${preset.budget.toLocaleString()} · {preset.timelineDays}d
                    </span>
                  </div>
                  <div className="mt-1 text-xs font-semibold text-[#161224]">
                    {preset.title}
                  </div>
                  <div className="mt-0.5 text-[11px] text-slate-500 line-clamp-1">
                    {preset.subtitle}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Editable Inputs */}
          <div className="space-y-3 pt-1 border-t border-slate-100">
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Business Name
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => {
                    setActivePresetId('custom');
                    setBusinessName(e.target.value);
                  }}
                  className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs text-[#161224] focus:border-violet-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  City / Trade Area
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => {
                    setActivePresetId('custom');
                    setCity(e.target.value);
                  }}
                  className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs text-[#161224] focus:border-violet-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Total Budget (USD)
                </label>
                <input
                  type="number"
                  min={50}
                  max={25000}
                  value={budget}
                  onChange={(e) => {
                    setActivePresetId('custom');
                    setBudget(Number(e.target.value) || 0);
                  }}
                  className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-mono text-[#161224] focus:border-violet-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Turnaround (Days)
                </label>
                <input
                  type="number"
                  min={1}
                  max={60}
                  value={timelineDays}
                  onChange={(e) => {
                    setActivePresetId('custom');
                    setTimelineDays(Number(e.target.value) || 1);
                  }}
                  className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-mono text-[#161224] focus:border-violet-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Campaign Prompt &amp; Terms
              </label>
              <textarea
                rows={4}
                value={brief}
                onChange={(e) => {
                  setActivePresetId('custom');
                  setBrief(e.target.value);
                }}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs leading-relaxed text-[#161224] focus:border-violet-500 focus:outline-none"
              />
            </div>

            <button
              type="button"
              disabled={isRunning}
              onClick={() =>
                void executeRun({
                  businessName,
                  city,
                  category,
                  budget,
                  timelineDays,
                  targetTier,
                  brief,
                })
              }
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm shadow-violet-600/25 transition hover:opacity-95 disabled:opacity-60 cursor-pointer"
            >
              <Cpu className="h-4 w-4 text-amber-200" />
              {isRunning ? 'Running Multi-Agent Audit...' : 'Run Autonomous AI Audit & Match'}
            </button>
          </div>
        </section>

        {/* RIGHT COLUMN: Autonomous Orchestration Output */}
        <section className="lg:col-span-7 space-y-4">
          {/* 4-Stage Pipeline Indicator */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-sm grid grid-cols-4 gap-2">
            {[
              { step: 1, label: '01 Intake' },
              { step: 2, label: '02 FTC Gate' },
              { step: 3, label: '03 Match & 30s Script' },
              { step: 4, label: '04 30/40/30 Escrow' },
            ].map((item) => {
              const active = pipelineStep >= item.step;
              return (
                <div
                  key={item.step}
                  className={`rounded-lg px-2.5 py-2 text-center text-[11px] font-bold transition ${
                    active
                      ? 'bg-violet-50 text-violet-800 border border-violet-200'
                      : 'bg-slate-50 text-slate-400 border border-slate-100'
                  }`}
                >
                  {item.label}
                </div>
              );
            })}
          </div>

          {/* Verdict Banner */}
          <div className={`rounded-2xl border p-5 shadow-sm space-y-3 ${gateBannerStyles}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {result.gateStatus === 'PASS' ? (
                    <ShieldCheck className="h-5 w-5 text-emerald-700" />
                  ) : result.gateStatus === 'FLAGGED' ? (
                    <ShieldAlert className="h-5 w-5 text-rose-700" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-amber-700" />
                  )}
                  <span className="font-mono text-xs font-extrabold uppercase tracking-wider">
                    {result.verdictTitle}
                  </span>
                </div>
                <p className="text-xs leading-relaxed opacity-90">{result.verdictSummary}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="rounded-xl bg-white/80 px-3 py-1.5 text-center border border-black/5">
                  <div className="font-mono text-[10px] font-semibold uppercase text-slate-500">
                    Risk Score
                  </div>
                  <div className="font-mono text-base font-extrabold text-[#161224]">
                    {result.riskScore}/100
                  </div>
                </div>
                <div className="rounded-xl bg-white/80 px-3 py-1.5 text-center border border-black/5">
                  <div className="font-mono text-[10px] font-semibold uppercase text-slate-500">
                    Readiness
                  </div>
                  <div className="font-mono text-base font-extrabold text-[#161224]">
                    {result.readinessScore}%
                  </div>
                </div>
              </div>
            </div>

            {result.recommendedFix && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl bg-white/90 p-3.5 border border-black/10">
                <div className="text-xs text-slate-700">
                  <strong className="text-[#161224]">AI Remediation Ready:</strong>{' '}
                  {result.recommendedFix.summary}
                </div>
                <button
                  type="button"
                  onClick={handleApplyAiFix}
                  className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-[#161224] px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-violet-900 transition cursor-pointer"
                >
                  <Wand2 className="h-3.5 w-3.5 text-amber-300" />
                  {result.recommendedFix.buttonLabel}
                </button>
              </div>
            )}
          </div>

          {/* Interactive 3-Tab Output Panel */}
          <div className="rounded-2xl border border-slate-200/90 bg-white shadow-sm overflow-hidden">
            <div className="flex border-b border-slate-200 bg-slate-50/70">
              <button
                type="button"
                onClick={() => setActiveTab('governance')}
                className={`flex-1 py-3 px-4 text-xs font-bold inline-flex items-center justify-center gap-1.5 border-b-2 transition cursor-pointer ${
                  activeTab === 'governance'
                    ? 'border-violet-600 text-violet-800 bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Bot className="h-3.5 w-3.5" />
                1. FTC Governance &amp; Agent Audit
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('creators')}
                className={`flex-1 py-3 px-4 text-xs font-bold inline-flex items-center justify-center gap-1.5 border-b-2 transition cursor-pointer ${
                  activeTab === 'creators'
                    ? 'border-violet-600 text-violet-800 bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Users className="h-3.5 w-3.5" />
                2. Local Creators &amp; 30s Script
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('escrow')}
                className={`flex-1 py-3 px-4 text-xs font-bold inline-flex items-center justify-center gap-1.5 border-b-2 transition cursor-pointer ${
                  activeTab === 'escrow'
                    ? 'border-violet-600 text-violet-800 bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Lock className="h-3.5 w-3.5" />
                3. 30/40/30 Escrow &amp; QR
              </button>
            </div>

            <div className="p-5">
              {/* TAB 1: Risk Governance & Agent Log */}
              {activeTab === 'governance' && (
                <div className="space-y-4">
                  <div className="space-y-2.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Rule &amp; Policy Findings
                    </div>
                    {result.findings.map((f) => {
                      const sevStyle =
                        f.severity === 'Critical'
                          ? 'bg-rose-100 text-rose-800'
                          : f.severity === 'Moderate'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800';
                      return (
                        <div
                          key={f.code}
                          className="rounded-xl border border-slate-200 p-3.5 space-y-1"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-[#161224]">{f.rule}</span>
                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${sevStyle}`}>
                              {f.code} · {f.severity}
                            </span>
                          </div>
                          <p className="text-xs leading-relaxed text-slate-600">{f.detail}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Multi-Agent Consensus Log
                    </div>
                    <div className="grid gap-2.5 sm:grid-cols-3">
                      {result.agentDebate.map((a) => {
                        const pill =
                          a.status === 'PASS'
                            ? 'bg-emerald-100 text-emerald-800'
                            : a.status === 'WARN'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800';
                        return (
                          <div
                            key={a.agent}
                            className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 space-y-1.5"
                          >
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-xs font-bold text-[#161224]">{a.agent}</span>
                              <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${pill}`}>
                                {a.status}
                              </span>
                            </div>
                            <div className="text-[10px] font-medium text-slate-500">{a.role}</div>
                            <p className="text-[11px] leading-relaxed text-slate-700">{a.note}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Matched Hyper-Local Creators + 30s Script */}
              {activeTab === 'creators' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Matched Neighborhood Cohort (2K–50K · {result.city})
                    </div>
                    <span className="text-xs font-semibold text-emerald-700">
                      Projected Store Visits: ~{result.projectedVisits} · Est. ROAS: {result.projectedRoas}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {result.creators.map((c) => (
                      <div
                        key={c.id}
                        className="rounded-xl border border-slate-200 p-3.5 flex flex-wrap items-center justify-between gap-3"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-[#161224]">{c.handle}</span>
                            <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-bold text-violet-800">
                              {c.matchPct}% Match
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600">
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-violet-600" />
                              {c.distance} ({c.localShare})
                            </span>
                            <span>{c.followers} followers · {c.engagement} ER</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-mono text-sm font-extrabold text-[#161224]">
                            ${c.payout}
                          </div>
                          <div className="font-mono text-[10px] text-slate-500">
                            QR: {c.qrCode}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 30-second Script */}
                  <div className="rounded-xl border border-violet-200 bg-violet-50/50 p-4 space-y-2.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-violet-900">
                      <Video className="h-4 w-4 text-violet-700" />
                      Auto-Generated 30s Compliant Script &amp; Shot List
                    </div>
                    <p className="text-xs font-semibold text-[#161224] bg-white rounded-lg p-2.5 border border-violet-100">
                      &ldquo;{result.scriptHook.replace('{QR}', result.creators[0]?.qrCode || 'BOMIE-01')}&rdquo;
                    </p>
                    <div className="grid gap-2 sm:grid-cols-3">
                      {result.shotList.map((s) => (
                        <div
                          key={s.timestamp}
                          className="rounded-lg bg-white p-2.5 border border-violet-100 space-y-1"
                        >
                          <div className="font-mono text-[10px] font-bold text-violet-700">
                            {s.timestamp}
                          </div>
                          <div className="text-[11px] font-semibold text-[#161224]">{s.visual}</div>
                          <div className="text-[10px] text-slate-500">
                            {s.audio.replace('{QR}', result.creators[0]?.qrCode || 'BOMIE-01')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: 30/40/30 Stripe Escrow & Offline QR */}
              {activeTab === 'escrow' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="text-xs font-bold text-[#161224]">
                        Stripe 30 / 40 / 30 Milestone Escrow Simulator
                      </div>
                      <div className="text-[11px] text-slate-500">
                        $0 MVP platform fee · 100% refundable prior to creator acceptance
                      </div>
                    </div>
                    <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-right">
                      <div className="text-[10px] font-semibold text-emerald-700">
                        Released to Creators
                      </div>
                      <div className="font-mono text-sm font-extrabold text-emerald-900">
                        ${releasedDollars.toLocaleString()} / ${result.budget.toLocaleString()} ({releasedPct}%)
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2.5 sm:grid-cols-4">
                    {[
                      {
                        stage: 0 as const,
                        label: 'Funded in Escrow',
                        pct: '0% Released',
                        amt: `$${result.budget}`,
                        desc: '100% refundable if terms declined',
                      },
                      {
                        stage: 1 as const,
                        label: 'Milestone 1 (30%)',
                        pct: 'Brief Accepted',
                        amt: `$${result.escrowBreakdown.milestone1}`,
                        desc: 'Creator locks filming slot',
                      },
                      {
                        stage: 2 as const,
                        label: 'Milestone 2 (40%)',
                        pct: 'FTC Audit Passed',
                        amt: `$${result.escrowBreakdown.milestone2}`,
                        desc: '#Ad & audio cleared pre-publish',
                      },
                      {
                        stage: 3 as const,
                        label: 'Milestone 3 (30%)',
                        pct: 'Live + QR Active',
                        amt: `$${result.escrowBreakdown.milestone3}`,
                        desc: 'Post live & QR tracking verified',
                      },
                    ].map((m) => {
                      const reached = milestoneStage >= m.stage;
                      return (
                        <button
                          key={m.stage}
                          type="button"
                          onClick={() => setMilestoneStage(m.stage)}
                          className={`text-left rounded-xl border p-3 transition cursor-pointer ${
                            reached
                              ? 'border-emerald-500 bg-emerald-50/70'
                              : 'border-slate-200 bg-white hover:border-violet-300'
                          }`}
                        >
                          <div className="text-[10px] font-bold uppercase text-slate-500">
                            {m.label}
                          </div>
                          <div className="mt-1 font-mono text-base font-extrabold text-[#161224]">
                            {m.amt}
                          </div>
                          <div className="text-[11px] font-semibold text-emerald-700">{m.pct}</div>
                          <div className="mt-1 text-[10px] text-slate-600">{m.desc}</div>
                        </button>
                      );
                    })}
                  </div>

                  {/* QR Attribution Simulator */}
                  <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-slate-200 shadow-sm">
                        <QrCode className="h-6 w-6 text-violet-700" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#161224]">
                          Offline Walk-In QR Attribution ({result.creators[0]?.qrCode})
                        </div>
                        <div className="text-[11px] text-slate-600">
                          Simulated Storefront Check-Ins:{' '}
                          <strong className="font-mono text-[#161224]">{simulatedScans} scans</strong>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSimulatedScans((n) => n + 12)}
                      className="shrink-0 rounded-lg border border-violet-300 bg-white px-3.5 py-2 text-xs font-bold text-violet-800 hover:bg-violet-50 cursor-pointer"
                    >
                      + Simulate 12 In-Store QR Scans
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
