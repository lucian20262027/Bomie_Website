'use client';

import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import BrandFooter from '../components/BrandFooter';
import TurnstileWidget from '../components/TurnstileWidget';
import {
  HERO_LIVE_MATCHES,
  CULTURAL_HUB_CITIES,
  CULTURAL_HUB_ORDER,
  type CulturalHubId,
} from '../data/landingData';
import {
  MERCHANT_SCENARIOS,
  CREATOR_PERSONAS,
  type MerchantScenarioId,
  type CreatorPersonaId,
  type MerchantScenario,
} from '../data/homeScenarios';
const HomeFaqChatbot = dynamic(() => import('./HomeFaqChatbot'), { ssr: false });
const SandHeroSection = dynamic(() => import('./SandHeroSection'), { ssr: false });
import {
  Sparkles,
  ArrowRight,
  Store,
  Video,
  XCircle,
  Zap,
  BarChart3,
  Gift,
  Repeat,
  ShieldCheck,
  Star,
  ChevronDown,
  Layers,
  CheckCircle2,
  MapPin,
  TrendingUp,
  AlertTriangle,
  Play,
  FileText,
  Lock,
  ExternalLink,
  Sliders,
  Eye,
  Check,
  X,
  Wallet,
  Camera,
  Music,
  Award,
  Volume2,
  VolumeX,
  Send,
  MessageSquare,
  Bot,
  Menu,
} from 'lucide-react';


/**
 * Shared 1:1 horizontal drag, trackpad two-finger swipe, and arrow-key spring carousel controller.
 */
function useHorizontalCarousel(currentIndex: number, onStep: (delta: number) => void) {
  const dragStartXRef = useRef<number | null>(null);
  const didDragRef = useRef<boolean>(false);
  const lastWheelRef = useRef<number>(0);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 16) {
      const now = Date.now();
      if (now - lastWheelRef.current < 350) return;
      lastWheelRef.current = now;
      onStep(e.deltaX > 0 ? 1 : -1);
    }
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragStartXRef.current = e.clientX;
    didDragRef.current = false;
    setIsDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartXRef.current === null) return;
    const dx = e.clientX - dragStartXRef.current;
    if (Math.abs(dx) > 8) didDragRef.current = true;
    setDragOffset(dx);
  };

  const finishDrag = (dx: number) => {
    dragStartXRef.current = null;
    setIsDragging(false);
    setDragOffset(0);
    if (Math.abs(dx) >= 35) {
      onStep(dx < 0 ? 1 : -1);
    }
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartXRef.current === null) return;
    finishDrag(e.clientX - dragStartXRef.current);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') onStep(1);
    else if (e.key === 'ArrowLeft') onStep(-1);
  };

  return {
    didDragRef,
    trackAnimate: { x: `calc(-${currentIndex * 100}% + ${dragOffset}px)` },
    trackTransition: isDragging
      ? { duration: 0 }
      : { type: 'spring' as const, stiffness: 300, damping: 32 },
    containerHandlers: {
      onWheel,
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
      onKeyDown,
    },
  };
}

export default function HomeClient() {
  const [activeTab, setActiveTab] = useState<'business' | 'creator'>('business');
  const [selectedMatch, setSelectedMatch] = useState<number>(0);
  const [isMatchPaused, setIsMatchPaused] = useState<boolean>(false);

  // ==========================================
  // 1. MERCHANT V5 ORCHESTRATOR STATE
  // ==========================================
  const [scenarioId, setScenarioId] = useState<MerchantScenarioId>('sichuan');
  const [activeStage, setActiveStage] = useState<1 | 2 | 3 | 4>(1);
  const [isRunningPipeline, setIsRunningPipeline] = useState(false);
  const [selectedCreatorIds, setSelectedCreatorIds] = useState<string[]>(['c1', 'c2', 'c3', 'c4']);
  const [activeScriptCreatorId, setActiveScriptCreatorId] = useState<string>('c1');
  const [avgTicket, setAvgTicket] = useState<number>(52);
  const [convRatePct, setConvRatePct] = useState<number>(0.22);
  const [impressions, setImpressions] = useState<number>(52000);
  const [escrowStep, setEscrowStep] = useState<1 | 2 | 3 | 4>(3);
  const [postSimMode, setPostSimMode] = useState<'compliant' | 'noncompliant'>('compliant');
  const [showFullStudioModal, setShowFullStudioModal] = useState(false);

  // ==========================================
  // 2. CREATOR COPILOT & ONBOARDING STATE
  // ==========================================
  const [creatorPersonaId, setCreatorPersonaId] = useState<CreatorPersonaId>('maya');
  const [creatorStage, setCreatorStage] = useState<1 | 2 | 3 | 4>(1);
  const [isRunningCreatorSim, setIsRunningCreatorSim] = useState(false);
  const [selectedOfferIdx, setSelectedOfferIdx] = useState<number>(0);
  const [selectedVoiceStyle, setSelectedVoiceStyle] = useState<'vlog' | 'asmr' | 'list'>('vlog');
  const [completedShots, setCompletedShots] = useState<string[]>(['s1', 's2', 's3', 's4']);
  const [creatorDraftMode, setCreatorDraftMode] = useState<'clean' | 'autofix'>('clean');
  const [creatorSimViews, setCreatorSimViews] = useState<number>(38000);
  const [creatorSimRedemptions, setCreatorSimRedemptions] = useState<number>(46);
  const [withdrawnSuccess, setWithdrawnSuccess] = useState<boolean>(false);
  const [showDemoModal, setShowDemoModal] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginSent, setLoginSent] = useState<boolean>(false);
  const [demoSubmitted, setDemoSubmitted] = useState<boolean>(false);
  const [demoName, setDemoName] = useState<string>('');
  const [demoEmail, setDemoEmail] = useState<string>('');
  const [demoPhone, setDemoPhone] = useState<string>('');
  const [demoPreferredContact, setDemoPreferredContact] = useState<'email' | 'phone' | 'either'>('either');
  const [demoHandle, setDemoHandle] = useState<string>('');
  const [demoCity, setDemoCity] = useState<string>('');
  const [isSubmittingDemo, setIsSubmittingDemo] = useState<boolean>(false);
  const [demoLeadId, setDemoLeadId] = useState<string>('');
  const [demoError, setDemoError] = useState<string>('');
  const [demoTurnstileToken, setDemoTurnstileToken] = useState<string>('');
  const [loginRole, setLoginRole] = useState<'merchant' | 'creator'>('merchant');
  const [isSandHero, setIsSandHero] = useState(false);
  const [openNavMenu, setOpenNavMenu] = useState<'os' | 'stories' | 'why' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<CulturalHubId>('sf');
  const [cityExpanded, setCityExpanded] = useState<boolean>(false);
  const [isCityPaused, setIsCityPaused] = useState<boolean>(false);
  const [sandboxViewMode, setSandboxViewMode] = useState<'simple' | 'pro'>('simple');
  const [simplePresetIdx, setSimplePresetIdx] = useState<number>(0);
  const [simpleCustomPrompt, setSimpleCustomPrompt] = useState<string>(
    'I run a Sichuan restaurant in San Francisco with a $1,800 budget. Match 4 local foodie creators to drive weekend dine-in traffic.'
  );

  // ==========================================
  // 3. FLOATING BOMIE AI FAQ CHATBOT STATE
  // ==========================================
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatHighlight, setChatHighlight] = useState<boolean>(false);

  const handleOpenFaqChatbot = () => {
    setOpenNavMenu(null);
    setMobileMenuOpen(false);
    setIsChatOpen(true);
    setChatHighlight(true);
    setTimeout(() => setChatHighlight(false), 1800);
  };

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDemoError('');
    if (!demoTurnstileToken) {
      setDemoError('Please complete the human verification check below.');
      return;
    }
    setIsSubmittingDemo(true);
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
        setDemoError(data?.error || 'Could not submit right now. Please try again.');
        setIsSubmittingDemo(false);
        return;
      }
      setDemoLeadId(data.leadId || '');
      setDemoSubmitted(true);
    } catch {
      setDemoError('Network error — please try again or email lucian.wang@bomie.ai.');
    } finally {
      setIsSubmittingDemo(false);
    }
  };

  const jumpToOsStage = (role: 'business' | 'creator', stageNum: 1 | 2 | 3 | 4) => {
    setActiveTab(role);
    if (role === 'business') setActiveStage(stageNum);
    else setCreatorStage(stageNum);
    const el = document.getElementById('how-it-works');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavCitySelect = (cityKey: 'sf' | 'la' | 'seattle' | 'vegas') => {
    setSelectedCity(cityKey);
    setCityExpanded(false);
    setOpenNavMenu(null);
    const el = document.getElementById('stories');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const currentScenario = MERCHANT_SCENARIOS[scenarioId];
  const currentCreator = CREATOR_PERSONAS[creatorPersonaId];
  const activeOffer = currentCreator.offers[selectedOfferIdx] || currentCreator.offers[0];
  const activeVoice =
    currentCreator.voiceStyles.find((v) => v.id === selectedVoiceStyle) ||
    currentCreator.voiceStyles[0];

  const handleSelectScenario = (id: MerchantScenarioId) => {
    const next = MERCHANT_SCENARIOS[id];
    setScenarioId(id);
    setAvgTicket(next.defaultTicket);
    setConvRatePct(next.defaultConvPct);
    setImpressions(next.defaultImpressions);
    if (next.creators.length > 0) {
      setSelectedCreatorIds(next.creators.map((c) => c.id));
      setActiveScriptCreatorId(next.creators[0].id);
    } else {
      setSelectedCreatorIds([]);
    }
    if (id === 'glowmed') {
      setActiveStage(2);
    }
  };

  const handleRunAutonomousPipeline = () => {
    setIsRunningPipeline(true);
    setActiveStage(1);
    setTimeout(() => setActiveStage(2), 450);
    setTimeout(() => setActiveStage(3), 950);
    setTimeout(() => {
      if (currentScenario.gateStatus === 'PASS') {
        setActiveStage(4);
      } else {
        setActiveStage(3);
      }
      setIsRunningPipeline(false);
    }, 1450);
  };

  const handleApplyCompliantRevision = () => {
    handleSelectScenario('lumina');
    setActiveStage(3);
  };

  const toggleCreatorSelection = (id: string) => {
    setSelectedCreatorIds((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((item) => item !== id) : prev) : [...prev, id]
    );
  };

  // Creator handlers
  const handleSelectCreatorPersona = (id: CreatorPersonaId) => {
    const next = CREATOR_PERSONAS[id];
    setCreatorPersonaId(id);
    setSelectedOfferIdx(0);
    setCreatorSimViews(next.defaultViews);
    setCreatorSimRedemptions(next.defaultRedemptions);
    setWithdrawnSuccess(false);
  };

  const handleRunCreatorJourney = () => {
    setIsRunningCreatorSim(true);
    setCreatorStage(1);
    setTimeout(() => setCreatorStage(2), 450);
    setTimeout(() => setCreatorStage(3), 950);
    setTimeout(() => {
      setCreatorStage(4);
      setIsRunningCreatorSim(false);
    }, 1450);
  };

  const toggleShotCheck = (shotId: string) => {
    setCompletedShots((prev) =>
      prev.includes(shotId) ? prev.filter((s) => s !== shotId) : [...prev, shotId]
    );
  };

  // Ocean Tide Sound (Web Audio API Realistic Ocean Surf Synthesizer)
  const [isOceanSoundPlaying, setIsOceanSoundPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  const toggleOceanSound = () => {
    if (isOceanSoundPlaying) {
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.setTargetAtTime(0.0001, audioCtxRef.current.currentTime, 0.35);
        setTimeout(() => {
          audioCtxRef.current?.close().catch(() => {});
          audioCtxRef.current = null;
          masterGainRef.current = null;
        }, 500);
      }
      setIsOceanSoundPlaying(false);
      return;
    }

    try {
      const AudioContextClass =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Layer 1: 8-second warm stereo brown noise buffer (Deep Ocean Swell Roar)
      const bufferSize = ctx.sampleRate * 8;
      const swellBuffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);
      // Layer 2: 8-second pink-white noise buffer (Breaking Whitewater Foam & Shore Wash)
      const foamBuffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);

      for (let channel = 0; channel < 2; channel++) {
        const swellOut = swellBuffer.getChannelData(channel);
        const foamOut = foamBuffer.getChannelData(channel);
        let lastBrown = 0.0;
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          // Brown noise integration for deep ocean body
          lastBrown = (lastBrown + 0.02 * white) / 1.02;
          swellOut[i] = lastBrown * 3.0;
          // Pink noise approximation for silky shore foam fizz
          b0 = 0.99765 * b0 + white * 0.099046;
          b1 = 0.96300 * b1 + white * 0.2965164;
          b2 = 0.57000 * b2 + white * 1.0526913;
          foamOut[i] = (b0 + b1 + b2 + white * 0.1848) * 0.08;
        }
      }

      const swellSource = ctx.createBufferSource();
      swellSource.buffer = swellBuffer;
      swellSource.loop = true;

      const foamSource = ctx.createBufferSource();
      foamSource.buffer = foamBuffer;
      foamSource.loop = true;

      // Deep ocean swell lowpass filter modulated by 0.125 Hz tidal LFO (8s wave cycle)
      const swellFilter = ctx.createBiquadFilter();
      swellFilter.type = 'lowpass';
      swellFilter.frequency.value = 220;
      swellFilter.Q.value = 0.9;

      // Foaming shore wash bandpass filter
      const foamFilter = ctx.createBiquadFilter();
      foamFilter.type = 'bandpass';
      foamFilter.frequency.value = 780;
      foamFilter.Q.value = 0.65;

      const tideLfo = ctx.createOscillator();
      tideLfo.type = 'sine';
      tideLfo.frequency.value = 0.125; // 1 full Pacific wave roll every 8 seconds

      const lfoFilterGain = ctx.createGain();
      lfoFilterGain.gain.value = 175; // Sweeps swell cutoff from 45Hz (trough) to 395Hz (crest)

      const lfoFoamFreqGain = ctx.createGain();
      lfoFoamFreqGain.gain.value = 420; // Sweeps foam wash from 360Hz to 1200Hz as wave breaks

      // Tidal volume swell
      const waveEnvelopeGain = ctx.createGain();
      waveEnvelopeGain.gain.value = 0.16;

      const foamEnvelopeGain = ctx.createGain();
      foamEnvelopeGain.gain.value = 0.07;

      const lfoVolumeGain = ctx.createGain();
      lfoVolumeGain.gain.value = 0.11;

      const lfoFoamVolumeGain = ctx.createGain();
      lfoFoamVolumeGain.gain.value = 0.065;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.9, ctx.currentTime + 1.0);
      masterGainRef.current = masterGain;

      tideLfo.connect(lfoFilterGain);
      lfoFilterGain.connect(swellFilter.frequency);

      tideLfo.connect(lfoFoamFreqGain);
      lfoFoamFreqGain.connect(foamFilter.frequency);

      tideLfo.connect(lfoVolumeGain);
      lfoVolumeGain.connect(waveEnvelopeGain.gain);

      tideLfo.connect(lfoFoamVolumeGain);
      lfoFoamVolumeGain.connect(foamEnvelopeGain.gain);

      swellSource.connect(swellFilter);
      swellFilter.connect(waveEnvelopeGain);
      waveEnvelopeGain.connect(masterGain);

      foamSource.connect(foamFilter);
      foamFilter.connect(foamEnvelopeGain);
      foamEnvelopeGain.connect(masterGain);

      masterGain.connect(ctx.destination);

      swellSource.start(0);
      foamSource.start(0);
      tideLfo.start(0);
      setIsOceanSoundPlaying(true);
    } catch {
      setIsOceanSoundPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Merchant Stage 04 ROI calculations
  const estConversions = Math.round(impressions * (convRatePct / 100));
  const estGrossRevenue = Math.round(estConversions * avgTicket);
  const activeBudget =
    currentScenario.gateStatus === 'PASS'
      ? currentScenario.creators
          .filter((c) => selectedCreatorIds.includes(c.id))
          .reduce((sum, c) => sum + c.fee, 0) || currentScenario.budget
      : currentScenario.budget;
  const projectedRoas = activeBudget > 0 ? (estGrossRevenue / activeBudget).toFixed(2) : '0.00';
  const effectiveCpa = estConversions > 0 ? (activeBudget / estConversions).toFixed(2) : '0.00';
  const netRoiPct =
    activeBudget > 0 ? Math.round(((estGrossRevenue - activeBudget) / activeBudget) * 100) : 0;

  const activeScriptCreator =
    currentScenario.creators.find((c) => c.id === activeScriptCreatorId) ||
    currentScenario.creators[0];

  // Creator Stage 04 Earnings calculations
  const unlockedViewBonus = creatorSimViews >= 25000 ? Math.round(activeOffer.bonusPotential * 0.5) : 0;
  const unlockedRedemptionBonus = Math.min(
    activeOffer.bonusPotential,
    creatorSimRedemptions * 3
  );
  const totalCreatorBonus = unlockedViewBonus + unlockedRedemptionBonus;
  const totalCampaignPayout = activeOffer.basePay + totalCreatorBonus;

  const liveMatches = HERO_LIVE_MATCHES;

  const showcaseVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const hasMountedShowcaseRef = useRef<boolean>(false);

  const heroCarousel = useHorizontalCarousel(selectedMatch, (delta) => {
    setSelectedMatch((prev) => (prev + delta + liveMatches.length) % liveMatches.length);
  });

  // Auto-rotate Hero Showcase (Dining -> Fashion & Spa -> Craft Goods) every 3.85s (synced to 3.92s clips), pause on hover
  useEffect(() => {
    if (isMatchPaused) return;
    const timer = setInterval(() => {
      setSelectedMatch((prev) => (prev + 1) % liveMatches.length);
    }, 3850);
    return () => clearInterval(timer);
  }, [selectedMatch, isMatchPaused, liveMatches.length]);

  // Keep only active slide video playing; reset newly activated slide to 0s without re-seeking on initial load
  useEffect(() => {
    const isInitialMount = !hasMountedShowcaseRef.current;
    hasMountedShowcaseRef.current = true;
    showcaseVideoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (idx === selectedMatch) {
        if (!isInitialMount) {
          video.currentTime = 0;
        }
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [selectedMatch]);

  const marqueeItems = [
    'AI Hyper-Local Matching',
    'Auto FTC Compliance Check',
    'Zero Cold DMs',
    'Escrow Milestone Payouts',
    'TikTok & Reels Attribution',
    'Walk-In Traffic Tracking',
    'Creator Co-Creation Studio',
    'Automated Product Seeding',
  ];


  const cityStories = CULTURAL_HUB_CITIES;
  const cityOrder = CULTURAL_HUB_ORDER;
  const selectedCityIndex = cityOrder.indexOf(selectedCity);
  const activeCityData = cityStories[selectedCity];

  const stepCity = (delta: number) => {
    setSelectedCity((prev) => {
      const idx = cityOrder.indexOf(prev);
      return cityOrder[(idx + delta + cityOrder.length) % cityOrder.length];
    });
    setCityExpanded(false);
  };

  const cityCarousel = useHorizontalCarousel(selectedCityIndex, stepCity);

  // Auto-rotate 4 Cultural Hub cities every 5s unless hovered or expanded to read case studies
  useEffect(() => {
    if (isCityPaused || cityExpanded) return;
    const timer = setInterval(() => {
      setSelectedCity((prev) => {
        const idx = cityOrder.indexOf(prev);
        return cityOrder[(idx + 1) % cityOrder.length];
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [selectedCity, isCityPaused, cityExpanded]);

  const [activePilotIndex, setActivePilotIndex] = useState(0);
  const [isScrolledToVideo, setIsScrolledToVideo] = useState(false);
  const [brandBounceKey, setBrandBounceKey] = useState(0);
  const [brandMarqueeActive, setBrandMarqueeActive] = useState(false);

  useEffect(() => {
    let marqueeStartTimer: ReturnType<typeof setTimeout> | null = null;
    let marqueeEndTimer: ReturnType<typeof setTimeout> | null = null;

    const triggerBrandShow = () => {
      setBrandBounceKey((k) => k + 1);
      marqueeStartTimer = setTimeout(() => {
        setBrandMarqueeActive(true);
        marqueeEndTimer = setTimeout(() => {
          setBrandMarqueeActive(false);
        }, 12700);
      }, 220);
    };

    // Initial showcase 3.5s after page load, then repeat every 5 minutes (300,000ms)
    const initialTimer = setTimeout(triggerBrandShow, 3500);
    const intervalTimer = setInterval(triggerBrandShow, 300_000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
      if (marqueeStartTimer) clearTimeout(marqueeStartTimer);
      if (marqueeEndTimer) clearTimeout(marqueeEndTimer);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolledToVideo(window.scrollY > 320);
    };
    onScroll();
    setIsSandHero(new URLSearchParams(window.location.search).get('hero') === 'sand');
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip bg-[#f7f4ff] text-[#161224] selection:bg-violet-600 selection:text-white">
      {/* Sticky Soft Lavender Glass Navbar */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        onMouseLeave={() => setOpenNavMenu(null)}
        className="sticky top-0 z-50 bg-[#f7f4ff]/55 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10 py-2.5 sm:py-3">
          {/* 1. Bespoke Geometric B✦ Logo */}
          <Link href="/" className="group flex min-w-0 items-center gap-3">
            <div className="relative flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#5b21b6] via-[#d946ef] to-[#fbbf24] p-[1px] shadow-md shadow-violet-500/25 transition-transform duration-300 group-hover:scale-105">
              <div className="flex h-full w-full items-center justify-center rounded-[11px] sm:rounded-[15px] bg-gradient-to-tr from-violet-700/95 via-fuchsia-500/95 to-amber-400/95 backdrop-blur-sm">
                <svg
                  viewBox="0 0 512 512"
                  fill="none"
                  className="h-7 w-7 sm:h-8 sm:w-8 drop-shadow-[0_2px_8px_rgba(46,16,101,0.35)]"
                >
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
            </div>
            <motion.div
              key={brandBounceKey}
              initial={brandBounceKey > 0 ? { y: 0 } : false}
              animate={brandBounceKey > 0 ? { y: [0, -6, 0] } : undefined}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative flex items-center h-9 overflow-hidden bg-transparent"
            >
              {brandMarqueeActive ? (
                <div
                  className="w-[130px] sm:w-[225px] overflow-hidden bg-transparent"
                  style={{
                    maskImage: 'linear-gradient(90deg, transparent 0%, black 14%, black 86%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 14%, black 86%, transparent 100%)',
                  }}
                >
                  <motion.span
                    key={brandBounceKey}
                    initial={{ x: 200, opacity: 0.2 }}
                    animate={{ x: '-100%', opacity: 1 }}
                    transition={{
                      x: { duration: 12.5, ease: 'linear' },
                      opacity: { duration: 0.25 },
                    }}
                    className="inline-block whitespace-nowrap text-sm sm:text-[15px] font-medium tracking-tight text-[#161224]/85"
                  >
                    <span className="font-bold text-violet-700">Bomie AI</span> is North America&apos;s first{' '}
                    <span className="font-bold text-fuchsia-600">AI Commerce OS</span> for local businesses and creators
                  </motion.span>
                </div>
              ) : (
                <span className="text-xl sm:text-[26px] font-extrabold tracking-tight text-[#161224] leading-none whitespace-nowrap">
                  bomie.ai
                </span>
              )}
            </motion.div>
          </Link>

          {/* 2. Three Single-Line Center Dropdown Menus */}
          <nav className="hidden lg:flex self-center items-center gap-2 xl:gap-5 shrink-0">
            {/* Dropdown 1: Commerce OS */}
            <div
              className="relative"
              onMouseEnter={() => setOpenNavMenu('os')}
            >
              <button
                type="button"
                onClick={() => setOpenNavMenu(openNavMenu === 'os' ? null : 'os')}
                className="flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 pt-1.5 pb-1 text-sm font-semibold leading-none text-[#161224]/85 transition hover:bg-violet-200/40 hover:text-violet-950"
              >
                <span>Commerce OS</span>
                <ChevronDown
                  className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${
                    openNavMenu === 'os' ? 'rotate-180 text-violet-700' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {openNavMenu === 'os' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 top-full pt-2 w-56 z-50"
                  >
                    <div className="rounded-2xl border border-violet-200/80 bg-white/95 p-2 shadow-2xl shadow-violet-900/10 backdrop-blur-2xl space-y-1">
                      <Link
                        href="/commerce-os"
                        onClick={() => setOpenNavMenu(null)}
                        className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition hover:bg-violet-50"
                      >
                        <Repeat className="h-4 w-4 shrink-0 text-violet-600" />
                        <span className="text-xs font-bold text-[#161224]">Commerce OS</span>
                      </Link>
                      <Link
                        href="/pricing"
                        onClick={() => setOpenNavMenu(null)}
                        className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition hover:bg-violet-50"
                      >
                        <Wallet className="h-4 w-4 shrink-0 text-fuchsia-600" />
                        <span className="text-xs font-bold text-[#161224]">Pricing</span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dropdown 2: Why Bomie (Oura-Style Dedicated Pages) */}
            <div
              className="relative"
              onMouseEnter={() => setOpenNavMenu('why')}
            >
              <button
                type="button"
                onClick={() => setOpenNavMenu(openNavMenu === 'why' ? null : 'why')}
                className="flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 pt-1.5 pb-1 text-sm font-semibold leading-none text-[#161224]/85 transition hover:bg-violet-200/40 hover:text-violet-950"
              >
                <span>Why Bomie</span>
                <ChevronDown
                  className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${
                    openNavMenu === 'why' ? 'rotate-180 text-emerald-600' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {openNavMenu === 'why' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 top-full pt-2 w-56 z-50"
                  >
                    <div className="rounded-2xl border border-violet-200/80 bg-white/95 p-2 shadow-2xl shadow-violet-900/10 backdrop-blur-2xl space-y-1">
                      <Link
                        href="/why-bomie/stories"
                        onClick={() => setOpenNavMenu(null)}
                        className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition hover:bg-violet-50"
                      >
                        <Award className="h-4 w-4 shrink-0 text-amber-500" />
                        <span className="text-xs font-bold text-[#161224]">Mission &amp; Founder</span>
                      </Link>
                      <Link
                        href="/why-bomie/research"
                        onClick={() => setOpenNavMenu(null)}
                        className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition hover:bg-violet-50"
                      >
                        <FileText className="h-4 w-4 shrink-0 text-emerald-600" />
                        <span className="text-xs font-bold text-[#161224]">Bomie Research</span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dropdown 3: Success Stories (4 Dedicated City Pages) */}
            <div
              className="relative"
              onMouseEnter={() => setOpenNavMenu('stories')}
            >
              <button
                type="button"
                onClick={() => setOpenNavMenu(openNavMenu === 'stories' ? null : 'stories')}
                className="flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 pt-1.5 pb-1 text-sm font-semibold leading-none text-[#161224]/85 transition hover:bg-violet-200/40 hover:text-violet-950"
              >
                <span>Success Stories</span>
                <ChevronDown
                  className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${
                    openNavMenu === 'stories' ? 'rotate-180 text-amber-600' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {openNavMenu === 'stories' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 top-full pt-2 w-[340px] z-50"
                  >
                    <div className="grid grid-cols-2 gap-1.5 rounded-2xl border border-violet-200/80 bg-white/95 p-2.5 shadow-2xl shadow-violet-900/10 backdrop-blur-2xl">
                      <Link
                        href="/stories/sf"
                        onClick={() => setOpenNavMenu(null)}
                        className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left transition hover:bg-violet-50"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 shrink-0 text-rose-500">
                          <path d="M2 16h20M6 16V7m12 9V7M6 7c2 3 4 4.5 6 4.5S16 10 18 7M6 12h12" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-xs font-bold text-[#161224]">San Francisco</span>
                      </Link>
                      <Link
                        href="/stories/la"
                        onClick={() => setOpenNavMenu(null)}
                        className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left transition hover:bg-violet-50"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 shrink-0 text-amber-500">
                          <path d="M12 20v-9m0 0c-1.5-3-4.5-4-7-3 2 1 3.5 2.5 4 4m3-1c1.5-3 4.5-4 7-3-2 1-3.5 2.5-4 4m-3-1c0-3 1.5-5.5 3-7m-3 7c0-3-1.5-5.5-3-7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-xs font-bold text-[#161224]">Los Angeles</span>
                      </Link>
                      <Link
                        href="/stories/seattle"
                        onClick={() => setOpenNavMenu(null)}
                        className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left transition hover:bg-violet-50"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 shrink-0 text-emerald-600">
                          <path d="M12 2v3m-5 4h10l-1.5 2h-7L7 9Zm2.5 2L8 21m6.5-10L16 21M12 11v10" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-xs font-bold text-[#161224]">Seattle</span>
                      </Link>
                      <Link
                        href="/stories/vegas"
                        onClick={() => setOpenNavMenu(null)}
                        className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left transition hover:bg-violet-50"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 shrink-0 text-fuchsia-600">
                          <path d="M12 3l2.2 4.5 5 .7-3.6 3.5.8 5L12 14.4 7.6 16.7l.8-5L4.8 8.2l5-.7L12 3Z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-xs font-bold text-[#161224]">Las Vegas</span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          <div className="flex shrink-0 self-center items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowLoginModal(true)}
              className="hidden sm:inline-flex rounded-lg px-3.5 py-2 text-sm font-semibold leading-none text-[#161224]/85 transition hover:bg-violet-200/40 hover:text-violet-950 cursor-pointer"
            >
              Log in
            </button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setDemoSubmitted(false);
                setDemoError('');
                setDemoTurnstileToken('');
                setShowDemoModal(true);
              }}
              className={`inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full border px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                isScrolledToVideo
                  ? 'border-transparent bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-700 text-white shadow-md shadow-violet-600/25 hover:opacity-95'
                  : 'border-violet-200 bg-white/95 text-[#161224] shadow-sm shadow-violet-900/5 hover:border-violet-400 hover:bg-violet-50/70'
              }`}
            >
              <span>Book a Demo</span>
            </motion.button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="inline-flex lg:hidden shrink-0 items-center justify-center rounded-xl border border-violet-300 bg-white p-2 text-[#161224] transition hover:bg-violet-50"
              aria-label="Toggle Mobile Navigation"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer (< lg) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-violet-200/80 bg-[#f7f4ff]/98 px-6 py-4 lg:hidden"
            >
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-violet-700">
                    Commerce OS
                  </div>
                  <div className="grid grid-cols-1 gap-1.5">
                    <Link
                      href="/commerce-os"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl border border-violet-200/70 bg-white px-3.5 py-2.5 text-xs font-semibold text-[#161224] shadow-xs"
                    >
                      <Repeat className="h-4 w-4 text-violet-600" />
                      Commerce OS
                    </Link>
                    <Link
                      href="/pricing"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl border border-violet-200/70 bg-white px-3.5 py-2.5 text-xs font-semibold text-[#161224] shadow-xs"
                    >
                      <Wallet className="h-4 w-4 text-fuchsia-600" />
                      Pricing
                    </Link>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-amber-700">
                    Success Stories
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(
                      [
                        { id: 'sf', label: 'San Francisco' },
                        { id: 'la', label: 'Los Angeles' },
                        { id: 'seattle', label: 'Seattle' },
                        { id: 'vegas', label: 'Las Vegas' },
                      ] as const
                    ).map((city) => (
                      <Link
                        key={city.id}
                        href={`/stories/${city.id}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-1.5 rounded-xl border border-violet-200/70 bg-white px-3 py-2 text-left text-xs font-semibold text-[#161224] shadow-xs"
                      >
                        <MapPin className="h-3.5 w-3.5 text-amber-500" />
                        <span>{city.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
                    Why Bomie
                  </div>
                  <div className="grid grid-cols-1 gap-1.5">
                    <Link
                      href="/why-bomie/stories"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl border border-violet-200/70 bg-white px-3.5 py-2.5 text-xs font-semibold text-[#161224] shadow-xs"
                    >
                      <Award className="h-4 w-4 text-amber-500" />
                      Mission &amp; Founder
                    </Link>
                    <Link
                      href="/why-bomie/research"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl border border-violet-200/70 bg-white px-3.5 py-2.5 text-xs font-semibold text-[#161224] shadow-xs"
                    >
                      <FileText className="h-4 w-4 text-emerald-600" />
                      Bomie Research
                    </Link>
                  </div>
                </div>

                <div className="pt-2 border-t border-violet-200/70">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setShowLoginModal(true);
                    }}
                    className="w-full rounded-xl border border-violet-200 bg-white py-2.5 text-xs font-semibold text-[#161224] shadow-xs transition hover:bg-violet-50"
                  >
                    Log in to Workspace
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section (Default vs Sand.ai Full-Bleed A/B Variant via ?hero=sand) */}
      {isSandHero ? (
        <SandHeroSection
          onSwitchToDefault={() => {
            setIsSandHero(false);
            window.history.replaceState(null, '', '/');
          }}
        />
      ) : (
      <section className="relative pt-8 pb-14 md:pt-11 md:pb-16">
        <div
          className="pointer-events-none absolute inset-0 -z-20 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(124,58,237,0.14) 1px, transparent 0)',
            backgroundSize: '36px 36px',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.45, 0.65, 0.45] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[520px] w-[1100px] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-300/50 via-fuchsia-200/45 to-amber-200/35 blur-[130px]"
        />

        <div className="mx-auto max-w-[1440px] px-6 lg:px-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto max-w-6xl text-4xl font-extrabold tracking-tight text-[#161224] sm:text-6xl md:text-7xl lg:text-[5.25rem] lg:leading-[1.06]"
          >
            Where Local Businesses Meet{' '}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-500 bg-clip-text text-transparent">
              Booming Creators
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-4xl text-base leading-relaxed text-slate-600 sm:text-lg"
          >
            <span className="font-semibold text-[#161224]">
              Bomie AI is North America&apos;s first AI Commerce OS for local businesses and creators.
            </span>{' '}
            We empower local businesses and local creators to grow together — through AI smart matching,
            4-stage autonomous campaign orchestration, and built-in FTC compliance.
          </motion.p>

          {/* Dual Role CTA Buttons -> Dedicated Oura-Style Role Pages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/merchant"
              className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-violet-600/25 transition hover:scale-[1.03] hover:shadow-[0_12px_35px_rgba(124,58,237,0.35)] active:scale-[0.98] sm:w-auto"
            >
              <Store className="h-5 w-5" />
              I&apos;m a Merchant
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/creator"
              className="flex w-full items-center justify-center gap-2.5 rounded-2xl border border-violet-200 bg-white px-8 py-4 text-base font-semibold text-[#161224] shadow-md shadow-violet-900/5 transition hover:scale-[1.03] hover:border-violet-400 active:scale-[0.98] sm:w-auto"
            >
              <Video className="h-5 w-5 text-fuchsia-600" />
              I&apos;m a Creator
              <ArrowRight className="h-4 w-4 text-fuchsia-600" />
            </Link>
          </motion.div>

          {/* Material-Style Widescreen Visual Stage Framed in Crisp Lavender Glass */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            onMouseEnter={() => setIsMatchPaused(true)}
            onMouseLeave={() => setIsMatchPaused(false)}
            className="mx-auto mt-8 w-full overflow-hidden rounded-3xl border border-violet-200/60 bg-[#0b0b14] text-left shadow-2xl shadow-violet-950/15"
          >
            <div>
              {/* Visual Hero Stage (Responsive 16:9 Video Framing + Physical Horizontal Spring Carousel) */}
              <div
                {...heroCarousel.containerHandlers}
                tabIndex={0}
                className="relative h-[270px] sm:h-[360px] md:h-[420px] lg:h-[480px] w-full overflow-hidden cursor-grab active:cursor-grabbing select-none touch-pan-y focus:outline-none"
              >
                {/* Horizontal Spring Track (1:1 Live Drag + Silky Slide Transition) */}
                <motion.div
                  animate={heroCarousel.trackAnimate}
                  transition={heroCarousel.trackTransition}
                  className="flex h-full w-full"
                >
                  {liveMatches.map((m, idx) => (
                    <div key={m.tag} className="relative h-full w-full shrink-0 overflow-hidden">
                      {'video' in m && m.video ? (
                        <video
                          ref={(el) => {
                            showcaseVideoRefs.current[idx] = el;
                          }}
                          src={m.video}
                          autoPlay={idx === 0}
                          muted
                          loop
                          playsInline
                          preload="auto"
                          className={`h-full w-full object-cover pointer-events-none ${
                            idx === 0 ? 'object-[center_42%]' : ''
                          }`}
                        />
                      ) : (
                        <img
                          src={m.image}
                          alt={m.headline}
                          className="h-full w-full object-cover pointer-events-none"
                        />
                      )}
                    </div>
                  ))}
                </motion.div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0b14] via-[#0b0b14]/45 to-black/20" />

                {/* Top-Right Category Switcher Overlay */}
                <div className="absolute top-4 right-5 flex items-center justify-end">
                  <div className="flex gap-1.5 rounded-full border border-white/15 bg-black/55 p-1 backdrop-blur-md">
                    {liveMatches.map((m, i) => (
                      <button
                        key={m.tag}
                        onMouseEnter={() => setSelectedMatch(i)}
                        onClick={() => setSelectedMatch(i)}
                        className={`rounded-full px-3.5 py-1 text-xs font-semibold transition ${
                          selectedMatch === i
                            ? 'bg-white text-slate-950 shadow-xs'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        {m.tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bottom-Left Big Editorial Typography + Bottom-Right Dash Switcher (Exact Image 3 Layout) */}
                <div className="absolute bottom-5 left-6 right-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-amber-300">
                      0{selectedMatch + 1} · Verified Neighborhood Match
                    </span>
                    <h3 className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                      {liveMatches[selectedMatch].headline}
                    </h3>
                    <p className="mt-1 text-sm text-slate-300">
                      {liveMatches[selectedMatch].subline}
                    </p>
                  </div>

                  {/* Material Flask Style Dash Indicator Pill with 3.85s Apple-Style Progress Fill */}
                  <div className="inline-flex items-center gap-2 self-start sm:self-end rounded-full border border-white/15 bg-black/65 px-4 py-2.5 backdrop-blur-md">
                    {liveMatches.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        aria-label={`Slide ${idx + 1}`}
                        onMouseEnter={() => setSelectedMatch(idx)}
                        onClick={() => setSelectedMatch(idx)}
                        className={`relative h-1.5 overflow-hidden rounded-full transition-all duration-300 ${
                          selectedMatch === idx
                            ? 'w-10 bg-white/25'
                            : 'w-3.5 bg-white/30 hover:bg-white/60'
                        }`}
                      >
                        {selectedMatch === idx && !isMatchPaused && (
                          <motion.span
                            key={`progress-${selectedMatch}`}
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 3.85, ease: 'linear' }}
                            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-300 via-white to-amber-200"
                          />
                        )}
                        {selectedMatch === idx && isMatchPaused && (
                          <span className="absolute inset-0 rounded-full bg-white" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Single-Line Live Match Summary Strip */}
              <div className="border-t border-white/10 bg-black/40 px-6 py-3.5 backdrop-blur-md">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedMatch}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-wrap items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex flex-wrap items-center gap-2.5 text-slate-200">
                      <span className="font-bold text-white">
                        {liveMatches[selectedMatch].business}
                      </span>
                      <span className="text-slate-500">×</span>
                      <span className="font-semibold text-violet-300">
                        {liveMatches[selectedMatch].creator}
                      </span>
                      <span className="hidden sm:inline text-slate-500">·</span>
                      <span className="hidden sm:inline-flex items-center gap-1 text-slate-400">
                        <MapPin className="h-3 w-3 text-amber-300" />
                        {liveMatches[selectedMatch].location}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="inline-flex items-center gap-1 text-amber-300 font-medium">
                        <TrendingUp className="h-3.5 w-3.5" />
                        {liveMatches[selectedMatch].estReach}
                      </span>
                      <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 font-semibold text-emerald-300">
                        {liveMatches[selectedMatch].matchScore}
                      </span>
                      <span className="hidden md:inline-flex items-center gap-1 text-emerald-400 font-medium">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        FTC Verified
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Silicon Valley Ecosystem & Compliance Trust Strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-10 flex flex-col items-center gap-3"
          >
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              Native Attribution, Escrow &amp; Compliance Infrastructure
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm font-semibold text-slate-600">
              <span className="flex items-center gap-1.5 transition hover:text-violet-700">
                <Video className="h-3.5 w-3.5 text-violet-600" />
                TikTok
              </span>
              <span className="flex items-center gap-1.5 transition hover:text-violet-700">
                <Camera className="h-3.5 w-3.5 text-fuchsia-600" />
                Instagram Reels
              </span>
              <span className="flex items-center gap-1.5 transition hover:text-violet-700">
                <Play className="h-3.5 w-3.5 text-rose-500" />
                YouTube Shorts
              </span>
              <span className="flex items-center gap-1.5 transition hover:text-violet-700">
                <Lock className="h-3.5 w-3.5 text-indigo-600" />
                Stripe 30/40/30 Escrow
              </span>
              <span className="flex items-center gap-1.5 transition hover:text-violet-700">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                FTC 16 CFR Part 255
              </span>
              <span className="flex items-center gap-1.5 transition hover:text-violet-700">
                <Wallet className="h-3.5 w-3.5 text-amber-500" />
                Apple Pay Instant Payout
              </span>
            </div>
          </motion.div>
        </div>
      </section>
      )}

      {/* Success Stories — Minimalist 4 City Hubs */}
      <section id="stories" className="border-t border-violet-200/70 bg-[#efe9ff]/55 py-12 sm:py-14 scroll-mt-16">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="mx-auto max-w-4xl space-y-6 text-center">
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-violet-600">
                City Success Stories
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#161224]">
                Live Across North America&apos;s{' '}
                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-500 bg-clip-text text-transparent">
                  Cultural Hubs
                </span>
              </h2>
              <p className="text-sm text-slate-600">
                Explore neighborhood playbooks and local creator ecosystems in each launch city.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-left">
              {cityOrder.map((cityId) => {
                const c = cityStories[cityId];
                return (
                  <Link
                    key={c.id}
                    href={`/stories/${c.id}`}
                    className="group flex items-center justify-between rounded-2xl border border-violet-200/80 bg-white/90 px-4 py-3.5 shadow-2xs transition hover:border-violet-400 hover:bg-white hover:shadow-md"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 text-sm font-bold text-[#161224] group-hover:text-violet-700">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-violet-600" />
                        <span className="truncate">{c.name}</span>
                      </div>
                      <div className="mt-0.5 truncate text-[11px] font-medium text-slate-500">
                        Verified City Playbook
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-violet-700" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Pilot Testimonials + Zero Risk & Escrow Protection — Cohesive Centered Editorial Flow */}
      <section id="pricing" className="border-t border-[#161224]/12 py-12 sm:py-16 scroll-mt-16">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="space-y-10">
            {/* Top Tier: Lightweight Centered 3-Metric Strip (Mirrors Cultural Hubs Aesthetic) */}
            <div className="mx-auto grid max-w-4xl grid-cols-3 divide-x divide-violet-200/80 border-b border-violet-200/80 pb-8 text-center">
              <div className="px-2 sm:px-6">
                <div className="text-2xl sm:text-4xl font-extrabold tracking-tight text-violet-700">$0</div>
                <div className="mt-1 text-[11px] sm:text-sm font-medium text-slate-600">Platform Fee in MVP</div>
              </div>
              <div className="px-2 sm:px-6">
                <div className="text-2xl sm:text-4xl font-extrabold tracking-tight text-emerald-600">100%</div>
                <div className="mt-1 text-[11px] sm:text-sm font-medium text-slate-600">Pre-Acceptance Refund</div>
              </div>
              <div className="px-2 sm:px-6">
                <div className="text-2xl sm:text-4xl font-extrabold tracking-tight text-amber-600">30·40·30</div>
                <div className="mt-1 text-[11px] sm:text-sm font-medium text-slate-600">Stripe Milestone Escrow</div>
              </div>
            </div>

            {/* Lower Tier: Centered Editorial Pilot Spotlight + Unified Pill Switcher */}
            <div className="mx-auto max-w-3xl text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePilotIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="inline-flex items-center justify-center gap-3 mb-4">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-violet-800 bg-violet-100/80 px-3 py-0.5 rounded-full border border-violet-200">
                      {['3.6X ROAS · 96 NEW TABLES', '+41% BOOKINGS · 100% FTC SAFE', 'STRIPE INSTANT PAYOUT · 34.2K FOODIES'][activePilotIndex]}
                    </span>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-lg sm:text-xl lg:text-2xl italic leading-relaxed text-[#161224]/90 font-serif">
                    {[
                      '\u201cWe skipped a $3,500/mo agency retainer, matched 3 neighborhood foodies in minutes, and saw 96 new weekend tables within 14 days.\u201d',
                      '\u201cThe 3-Agent FTC check caught risky medical claims before filming, and every beauty creator brought real neighborhood facial bookings.\u201d',
                      '\u201cNo cold DMs, no awkward rate haggling, and zero waiting 60 days for Net-60 invoices. Funds unlocked the moment my reel went live.\u201d',
                    ][activePilotIndex]}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-[#161224]/65">
                    <span className="text-sm font-bold text-[#161224]">
                      {['David L.', 'Elena R.', '@sfnoodleclub'][activePilotIndex]}
                    </span>
                    <span className="text-[#161224]/30">·</span>
                    <span>
                      {[
                        'Owner, Chili & Silk Sichuan · San Francisco',
                        'Founder, Lumina Skin Studio · Los Angeles',
                        'Local Food Creator (34.2K) · Bay Area',
                      ][activePilotIndex]}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Unified Hover-to-Switch Pill Bar (Matches Cultural Hubs Switcher) */}
              <div className="mt-7 flex justify-center">
                <div className="inline-flex flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-violet-200 bg-white/85 p-1.5 shadow-sm backdrop-blur-sm">
                  {[
                    { name: 'Chili & Silk (SF)', tag: '3.6X ROAS' },
                    { name: 'Lumina Skin (LA)', tag: '+41% Bookings' },
                    { name: '@sfnoodleclub', tag: 'Bay Area Creator' },
                  ].map((item, idx) => {
                    const active = activePilotIndex === idx;
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onMouseEnter={() => setActivePilotIndex(idx)}
                        onClick={() => setActivePilotIndex(idx)}
                        className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition ${
                          active
                            ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md'
                            : 'text-slate-600 hover:text-violet-950'
                        }`}
                      >
                        <span>{item.name}</span>
                        <span
                          className={`font-mono text-[10px] ${
                            active ? 'text-violet-100' : 'text-violet-700/80'
                          }`}
                        >
                          {item.tag}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Full-Width CTA — Photorealistic Surging Ocean Tide & Buoyant Wave Typography */}
      <section className="pt-8 pb-16">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <motion.div
            whileHover={{ scale: 1.003 }}
            className="relative overflow-hidden rounded-3xl border border-violet-400/45 bg-[#0f0624] px-6 py-20 sm:px-12 sm:py-26 text-center shadow-2xl shadow-violet-950/80"
          >
            {/* Real-Time SVG Fluid Water Refraction Filter for Photorealistic Ocean Ripple */}
            <svg className="pointer-events-none absolute h-0 w-0" aria-hidden="true">
              <defs>
                <filter id="realisticOceanRipple" x="-10%" y="-10%" width="120%" height="120%">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.012 0.04"
                    numOctaves="3"
                    seed="7"
                    result="turbulence"
                  >
                    <animate
                      attributeName="baseFrequency"
                      values="0.011 0.036;0.017 0.056;0.011 0.036"
                      dur="8s"
                      repeatCount="indefinite"
                    />
                  </feTurbulence>
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="turbulence"
                    scale="26"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>
              </defs>
            </svg>

            {/* Layer 1: Photorealistic Ocean Surf Base with Real-Time Water Displacement Shader */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <motion.div
                animate={{
                  scale: [1.08, 1.18, 1.08],
                  y: [0, -14, 0],
                  x: ['-1.5%', '1.5%', '-1.5%'],
                }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ filter: 'url(#realisticOceanRipple)' }}
                className="absolute -inset-8"
              >
                <img
                  src="/images/pexels/1001682.jpg"
                  alt="Real Ocean Tide Waves"
                  loading="lazy"
                  className="h-full w-full object-cover object-center opacity-80 saturate-150 contrast-125"
                />
              </motion.div>

              {/* Layer 2: Secondary Rolling Foaming Wave Crest (Counter-Tide) */}
              <motion.div
                animate={{
                  scale: [1.16, 1.06, 1.16],
                  y: [12, -10, 12],
                  x: ['2%', '-2%', '2%'],
                  opacity: [0.35, 0.65, 0.35],
                }}
                transition={{
                  duration: 7.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ filter: 'url(#realisticOceanRipple)' }}
                className="absolute -inset-8 mix-blend-screen"
              >
                <img
                  src="/images/pexels/1295138.jpg"
                  alt="Foaming Ocean Surf"
                  loading="lazy"
                  className="h-full w-full object-cover object-bottom contrast-125"
                />
              </motion.div>

              {/* Layer 3: Real HD Slow-Motion Crashing Ocean Waves Video (Locally Hosted) */}
              <video
                src="/videos/ocean.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                poster="/images/pexels/1001682.jpg"
                className="absolute inset-0 h-full w-full object-cover opacity-65 mix-blend-lighten contrast-125"
              />

              {/* Layer 4: Royal Violet, Fuchsia & Golden Sunset Bioluminescent Color Grading */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#2e1065] via-[#701a75] to-[#78350f] opacity-80 mix-blend-color" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0b041a]/85 via-[#2e1065]/55 to-[#1e0936]/80" />
              <motion.div
                animate={{
                  opacity: [0.25, 0.5, 0.25],
                  scale: [1, 1.08, 1],
                }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(251,191,36,0.28),_rgba(217,70,239,0.25)_45%,_transparent_75%)]"
              />
            </div>

            {/* Interactive Ocean Tide Audio Toggle Button (Top-Right) */}
            {/* Top-Right Compact Audio Toggle Button (Icon Only) */}
            <div className="relative z-20 mb-6 flex justify-center sm:mb-0 sm:absolute sm:top-6 sm:right-6">
              <button
                type="button"
                onClick={toggleOceanSound}
                aria-label={isOceanSoundPlaying ? 'Mute Ocean Tide' : 'Play Ocean Tide'}
                title={isOceanSoundPlaying ? 'Mute Ocean Tide' : 'Listen to Ocean Tide'}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-xl transition-all ${
                  isOceanSoundPlaying
                    ? 'border-amber-300/70 bg-amber-400/25 text-amber-200 shadow-lg shadow-amber-500/30'
                    : 'border-white/25 bg-black/35 text-violet-100 hover:border-violet-300/60 hover:bg-black/50'
                }`}
              >
                {isOceanSoundPlaying ? (
                  <Volume2 className="h-4 w-4 text-amber-300 animate-pulse" />
                ) : (
                  <VolumeX className="h-4 w-4 text-violet-100" />
                )}
              </button>
            </div>

            {/* Buoyant Wave Headline: Words Gently Riding the Real Ocean Swell */}
            <h2 className="relative z-10 flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 w-full text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              {(['Where', 'Local', 'Meets', 'Viral'] as const).map((word, idx) => (
                <motion.span
                  key={word}
                  animate={{
                    y: [0, -8, 0, 5, 0],
                    rotate: [0, -1.1, 0, 1.1, 0],
                  }}
                  transition={{
                    duration: 4.4,
                    repeat: Infinity,
                    delay: idx * 0.35,
                    ease: 'easeInOut',
                  }}
                  className={
                    word === 'Viral'
                      ? 'inline-block bg-gradient-to-r from-amber-200 via-yellow-300 to-fuchsia-200 bg-clip-text text-transparent drop-shadow-[0_4px_28px_rgba(251,191,36,0.55)]'
                      : 'inline-block bg-gradient-to-b from-white via-white to-violet-100 bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(15,6,36,0.9)]'
                  }
                >
                  {word}
                </motion.span>
              ))}
            </h2>

            <p className="relative z-10 mx-auto mt-5 max-w-2xl text-base sm:text-lg text-white/95 font-medium drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
              Join hundreds of local businesses and creators building authentic community growth
              on Bomie AI.
            </p>

            <div className="relative z-10 mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setDemoSubmitted(false);
                  setShowDemoModal(true);
                }}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-400 p-[2px] shadow-2xl shadow-black/80"
              >
                <span className="flex items-center gap-2 rounded-[14px] bg-white px-9 py-4 text-base font-bold text-slate-950 transition hover:bg-amber-50">
                  <Sparkles className="h-4 w-4 text-violet-600" />
                  Book a Demo
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Book a Demo Modal */}
      <AnimatePresence>
        {showDemoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg rounded-3xl border border-violet-200 bg-white p-7 shadow-2xl"
            >
              <button
                onClick={() => setShowDemoModal(false)}
                className="absolute top-5 right-5 rounded-full p-1.5 text-slate-400 transition hover:bg-violet-50 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>

              {demoSubmitted ? (
                <div className="py-6 text-center space-y-4">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#161224]">Demo Request Confirmed!</h3>
                  {demoLeadId && (
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-mono text-[11px] font-bold text-emerald-700">
                      Ref: {demoLeadId}
                    </div>
                  )}
                  <p className="text-sm text-slate-600">
                    Our founding team at Bomie AI will reach out to <span className="text-[#161224] font-semibold">{demoEmail}</span> within 24 hours to walk you through a custom campaign for <span className="text-[#161224] font-semibold">{demoCity}</span>.
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => {
                        setShowDemoModal(false);
                        setShowFullStudioModal(true);
                      }}
                      className="rounded-xl bg-gradient-to-r from-[#5b21b6] to-[#d946ef] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:opacity-95"
                    >
                      Try Live V5 Studio Right Now &rarr;
                    </button>
                    <a
                      href={`mailto:lucian.wang@bomie.ai?subject=${encodeURIComponent(
                        `[Bomie Demo] ${demoHandle} (${demoCity})`
                      )}&body=${encodeURIComponent(
                        `Name: ${demoName}\nEmail: ${demoEmail}\nBusiness/Handle: ${demoHandle}\nCity: ${demoCity}\nRef: ${demoLeadId}`
                      )}`}
                      className="rounded-xl border border-violet-200 bg-[#f7f4ff] px-5 py-2.5 text-xs font-semibold text-violet-900 hover:bg-violet-100"
                    >
                      Email Founder Directly
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleDemoSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-extrabold text-[#161224]">
                      Book a Live Bomie AI Demo
                    </h3>
                    <p className="mt-1 text-xs text-slate-600">
                      See how we match your store with high-converting local creators in under 5 minutes.
                    </p>
                  </div>

                  {demoError && (
                    <div className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-700">
                      {demoError}
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
                          className={`rounded-lg py-2 text-xs font-semibold transition ${
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
                        if (demoError) setDemoError('');
                      }}
                      onExpire={() => setDemoTurnstileToken('')}
                      onError={() => {
                        setDemoTurnstileToken('');
                        setDemoError('Verification failed to load. Please refresh and try again.');
                      }}
                    />

                    <button
                      type="submit"
                      disabled={isSubmittingDemo}
                      className="w-full rounded-xl bg-gradient-to-r from-[#5b21b6] to-[#d946ef] py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition hover:opacity-95 disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmittingDemo ? 'Submitting Request...' : 'Schedule My 15-Min Demo'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Log in Portal Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md rounded-3xl border border-violet-200 bg-white p-7 shadow-2xl space-y-5"
            >
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  setLoginSent(false);
                }}
                className="absolute top-5 right-5 rounded-full p-1.5 text-slate-400 transition hover:bg-violet-50 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="text-center">
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-[#5b21b6] via-[#d946ef] to-[#fbbf24] shadow-lg shadow-violet-500/30">
                  <svg viewBox="0 0 512 512" fill="none" className="h-7 w-7">
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
                <h3 className="text-xl font-extrabold text-[#161224]">Sign in to Bomie AI</h3>
                <p className="mt-1 text-xs text-slate-500">
                  Passwordless magic-link access for Founding Merchants &amp; Creators
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 rounded-xl border border-violet-200 bg-[#f7f4ff] p-1">
                <button
                  type="button"
                  onClick={() => setLoginRole('merchant')}
                  className={`rounded-lg py-2 text-xs font-bold transition ${
                    loginRole === 'merchant'
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-violet-950'
                  }`}
                >
                  Merchant OS
                </button>
                <button
                  type="button"
                  onClick={() => setLoginRole('creator')}
                  className={`rounded-lg py-2 text-xs font-bold transition ${
                    loginRole === 'creator'
                      ? 'bg-fuchsia-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-violet-950'
                  }`}
                >
                  Creator OS
                </button>
              </div>

              {loginSent ? (
                <div className="space-y-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 text-center">
                  <CheckCircle2 className="mx-auto h-7 w-7 text-emerald-600" />
                  <div className="text-sm font-bold text-[#161224]">
                    Magic link requested for {loginEmail}
                  </div>
                  <p className="text-xs leading-relaxed text-slate-600">
                    If your workspace is already activated, check your inbox. Or jump straight into the interactive sandbox below:
                  </p>
                  <Link
                    href={loginRole === 'merchant' ? '/merchant' : '/creator'}
                    onClick={() => {
                      setShowLoginModal(false);
                      setLoginSent(false);
                    }}
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#5b21b6] to-[#d946ef] py-2.5 text-xs font-bold text-white"
                  >
                    Open {loginRole === 'merchant' ? 'Merchant OS' : 'Creator OS'} →
                  </Link>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setLoginSent(true);
                  }}
                  className="space-y-3.5"
                >
                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-700">
                      Work or Creator Email
                    </label>
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder={
                        loginRole === 'merchant' ? 'founder@localstore.com' : 'creator@gmail.com'
                      }
                      className="w-full rounded-xl border border-violet-200 bg-[#faf8ff] px-3.5 py-2.5 text-sm text-[#161224] placeholder-slate-400 focus:border-violet-500 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className={`w-full rounded-xl py-3 text-sm font-bold text-white shadow-md transition ${
                      loginRole === 'merchant'
                        ? 'bg-gradient-to-r from-[#5b21b6] to-[#7c3aed] hover:opacity-95'
                        : 'bg-gradient-to-r from-[#d946ef] to-[#7c3aed] hover:opacity-95'
                    }`}
                  >
                    Send Magic Login Link
                  </button>
                </form>
              )}

              <div className="border-t border-violet-100 pt-4 text-center text-xs text-slate-500">
                New to Bomie AI?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setShowLoginModal(false);
                    setDemoSubmitted(false);
                    setShowDemoModal(true);
                  }}
                  className="font-semibold text-violet-300 underline hover:text-white"
                >
                  Book a Demo for Early Access
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-Screen Live V5 Sandbox Drawer/Modal */}
      <AnimatePresence>
        {showFullStudioModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="flex h-[90vh] w-full max-w-7xl flex-col overflow-hidden rounded-3xl border border-white/15 bg-[#0b0b14] shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="font-mono text-xs font-semibold text-slate-200">
                    Bomie AI V5 — Autonomous Merchant-Creator Campaign Sandbox
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://bomie-ai-v5-autonomous-merchant-creator-campaign.ai.studio/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white"
                  >
                    <span>Open in New Tab</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <button
                    onClick={() => setShowFullStudioModal(false)}
                    className="rounded-lg border border-white/10 p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <iframe
                src="https://bomie-ai-v5-autonomous-merchant-creator-campaign.ai.studio/"
                title="Bomie AI V5 Autonomous Merchant Creator Campaign"
                className="h-full w-full flex-1 border-0 bg-slate-50"
                allow="clipboard-write"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <HomeFaqChatbot
        isOpen={isChatOpen}
        onOpenChange={setIsChatOpen}
        highlight={chatHighlight}
        onOpenDemo={() => {
          setDemoSubmitted(false);
          setShowDemoModal(true);
        }}
        onJumpToOsStage={jumpToOsStage}
      />

      <BrandFooter />
    </div>
  );
}
