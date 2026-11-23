'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import BrandFooter from '../components/BrandFooter';
import {
  HERO_LIVE_MATCHES,
  CULTURAL_HUB_CITIES,
  CULTURAL_HUB_ORDER,
  type CulturalHubId,
} from '../data/landingData';
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

type MerchantScenarioId = 'sichuan' | 'lumina' | 'glowmed';
type CreatorPersonaId = 'maya' | 'chloe' | 'sam';

interface CreatorCandidate {
  id: string;
  handle: string;
  name: string;
  neighborhood: string;
  followers: string;
  engagement: string;
  match: number;
  fee: number;
  code: string;
  hookA: string;
  hookB: string;
  shots: { beat: string; visual: string; line: string }[];
}

interface MerchantScenario {
  id: MerchantScenarioId;
  badge: string;
  businessName: string;
  category: string;
  city: string;
  budget: number;
  timeline: string;
  rawBrief: string;
  readinessScore: number;
  brandFitScore: number;
  visionHighlights: string[];
  deliverables: string[];
  kpis: string[];
  gateStatus: 'PASS' | 'BLOCK';
  riskScore: number;
  gateSummary: string;
  pillars: { name: string; level: 'Low Risk' | 'Moderate Risk' | 'High Risk'; note: string }[];
  agentDebate: { agent: string; role: string; verdict: string }[];
  remediationPlan?: { issue: string; fix: string; compliantDraft: string };
  creators: CreatorCandidate[];
  defaultTicket: number;
  defaultConvPct: number;
  defaultImpressions: number;
}

interface CreatorOffer {
  id: string;
  merchant: string;
  distance: string;
  category: string;
  basePay: number;
  bonusPotential: number;
  perk: string;
  matchScore: number;
  deliverable: string;
  promoCode: string;
}

interface CreatorPersona {
  id: CreatorPersonaId;
  handle: string;
  name: string;
  city: string;
  niche: string;
  followers: string;
  engRate: string;
  localAudiencePct: number;
  avgViews: string;
  styleTags: string[];
  offers: CreatorOffer[];
  voiceStyles: {
    id: 'vlog' | 'asmr' | 'list';
    label: string;
    hook: string;
    captionPreview: string;
  }[];
  shotChecklist: { id: string; beat: string; instruction: string; tip: string }[];
  defaultViews: number;
  defaultRedemptions: number;
  walletBalance: number;
}

const MERCHANT_SCENARIOS: Record<MerchantScenarioId, MerchantScenario> = {
  sichuan: {
    id: 'sichuan',
    badge: 'Restaurant & Cafe · Clean PASS',
    businessName: 'Sichuan Bistro SF',
    category: 'Food & Beverage · Local Dining',
    city: 'San Francisco, CA',
    budget: 1800,
    timeline: '5 Days',
    rawBrief:
      'Signature chili-oil dumpling & weekend tasting promo. Match 4 local SF foodie creators for 30s TikTok/Reels videos with dine-in QR voucher tracking and clear #ad disclosure.',
    readinessScore: 92,
    brandFitScore: 95,
    visionHighlights: [
      'Hand-pulled chili oil noodles & bamboo steamer visual hook',
      'Warm open-kitchen lighting ideal for 9:16 Reels retention',
      'Clear "20% OFF Weekend Dumplings" chalkboard offer detected',
    ],
    deliverables: [
      '4 × 30s vertical videos (TikTok + IG Reels cross-post)',
      'In-store dine-in QR voucher + POS promo code attribution',
      'Mandatory FTC #ad / Paid Partnership header tag',
    ],
    kpis: [
      '42,000–65,000 geo-fenced SF Bay Area views',
      '110+ tracked dine-in voucher redemptions',
      'Target blended Store-Visit ROAS: 3.2x+',
    ],
    gateStatus: 'PASS',
    riskScore: 18,
    gateSummary:
      'PASS — Approved for Autonomous Dispatch. Claims, unit economics ($450/creator), and FTC 16 CFR Part 255 disclosure clauses are fully aligned.',
    pillars: [
      {
        name: 'Compliance & Claims',
        level: 'Low Risk',
        note: 'Authentic culinary tasting experience; no deceptive health or guaranteed claims.',
      },
      {
        name: 'FTC 16 CFR Part 255',
        level: 'Low Risk',
        note: 'Auto-injected #ad & Paid Partner tags required before escrow milestone release.',
      },
      {
        name: 'Pricing & ROI Realism',
        level: 'Low Risk',
        note: '$1,800 budget across 4 local micro-creators ($450/ea) matches SF market rates.',
      },
      {
        name: 'Fulfillment & Timeline',
        level: 'Low Risk',
        note: '5-day window supports Day-1 tasting, Day-3 draft review, and Day-5 weekend post.',
      },
    ],
    agentDebate: [
      {
        agent: '01 · Growth & Conversion Agent',
        role: 'Local Reach Optimizer',
        verdict:
          'High viral velocity potential. Close-up chili-oil pour in 0–3s hook drives 6.1%+ local save rates across SF foodies.',
      },
      {
        agent: '02 · Trust & Safety / FTC Agent',
        role: '16 CFR Part 255 Auditor',
        verdict:
          'Verified safe. Enforcing mandatory #ad in first 3 words of caption and platform Paid Partnership toggle.',
      },
      {
        agent: '03 · World-Model Mediator Judge',
        role: 'Consensus Ruling · PASS (18/100 Risk)',
        verdict:
          'Approved for immediate creator roster dispatch and 30% / 40% / 30% milestone escrow lock.',
      },
    ],
    creators: [
      {
        id: 'c1',
        handle: '@sfnoodleclub',
        name: 'Maya Lin',
        neighborhood: 'Inner Sunset / Richmond',
        followers: '34.2K',
        engagement: '6.1%',
        match: 96,
        fee: 450,
        code: 'SFNOODLE20',
        hookA: '“Stop scrolling if you live in SF—this hidden kitchen pours sizzling chili oil tableside.”',
        hookB: '“3 dishes at Sichuan Bistro SF that taste like a flight to Chengdu (#ad).”',
        shots: [
          { beat: '0–3s · Hook', visual: 'Macro sizzle of hot chili oil hitting garlic & dumplings', line: 'Stop scrolling if you crave real Sichuan heat in SF.' },
          { beat: '3–12s · Ambience', visual: 'Steaming bamboo baskets + open kitchen chef hand-folding', line: 'Sichuan Bistro just dropped their weekend tasting menu.' },
          { beat: '12–22s · Hero Bite', visual: 'First bite cheese/broth pull + authentic reaction', line: 'The numbing peppercorn balance is unreal.' },
          { beat: '22–30s · QR CTA', visual: 'Show phone voucher QR + storefront sign', line: 'Use code SFNOODLE20 or scan the link in bio for 20% off!' },
        ],
      },
      {
        id: 'c2',
        handle: '@bayareabites_sam',
        name: 'Samira Patel',
        neighborhood: 'Mission District',
        followers: '26.8K',
        engagement: '5.4%',
        match: 93,
        fee: 450,
        code: 'SAMBITES20',
        hookA: '“SF date night spot under $45 that nobody is gatekeeping anymore (#ad).”',
        hookB: '“Testing the viral soup dumplings in the Mission—here is my honest rating.”',
        shots: [
          { beat: '0–3s · Hook', visual: 'Lifting soup dumpling on spoon without breaking skin', line: 'Found the juiciest handmade dumplings in San Francisco.' },
          { beat: '3–12s · Table Spread', visual: 'Overhead table pan of 4 signature dishes', line: 'We ordered the full weekend feast at Sichuan Bistro SF.' },
          { beat: '12–22s · Texture', visual: 'Dipping crispy wontons in house chili crisp', line: 'Everything is made from scratch every morning.' },
          { beat: '22–30s · Offer CTA', visual: 'Clinking glasses + code overlay SAMBITES20', line: 'Grab 20% off your table this weekend with SAMBITES20.' },
        ],
      },
      {
        id: 'c3',
        handle: '@goldengategrub',
        name: 'Marcus Vance',
        neighborhood: 'SoMa / Hayes Valley',
        followers: '41.5K',
        engagement: '4.9%',
        match: 89,
        fee: 450,
        code: 'GGGRUB20',
        hookA: '“Where SF chefs actually eat after their shift (#ad).”',
        hookB: '“Ranking the top 3 spicy noodle bowls in San Francisco.”',
        shots: [
          { beat: '0–3s · Hook', visual: 'High-energy noodle toss in glossy red chili sauce', line: 'This noodle bowl has a cult following in SF for a reason.' },
          { beat: '3–12s · Kitchen', visual: 'Wok hei flame burst in kitchen window', line: 'Real wok hei flavor right in the heart of the city.' },
          { beat: '12–22s · Tasting', visual: 'Close-up noodle slurp + spice nod', line: '10 out of 10 heat and texture.' },
          { beat: '22–30s · CTA', visual: 'Storefront exterior + code GGGRUB20', line: 'Mention GGGRUB20 this weekend for 20% off dumplings!' },
        ],
      },
      {
        id: 'c4',
        handle: '@fogcityfoodie',
        name: 'Elena Rostova',
        neighborhood: 'North Beach / Marina',
        followers: '18.4K',
        engagement: '5.8%',
        match: 86,
        fee: 450,
        code: 'FOGFOOD20',
        hookA: '“Cozy rainy-day comfort food in SF that hits every time (#ad).”',
        hookB: '“Come with me to try Sichuan Bistro’s new weekend dumpling drop.”',
        shots: [
          { beat: '0–3s · Hook', visual: 'Foggy SF street cut to warm steaming broth', line: 'Nothing beats foggy SF weather like handmade spicy wontons.' },
          { beat: '3–12s · Interior', visual: 'Cozy booth seating & tea pour', line: 'Brought my best friend to Sichuan Bistro SF.' },
          { beat: '12–22s · Highlight', visual: 'Close-up of garlic cucumbers & dan dan noodles', line: 'Every single dish came out piping hot.' },
          { beat: '22–30s · CTA', visual: 'Voucher screen + FOGFOOD20 badge', line: 'Save this post and use FOGFOOD20 for 20% off!' },
        ],
      },
    ],
    defaultTicket: 52,
    defaultConvPct: 0.22,
    defaultImpressions: 52000,
  },
  lumina: {
    id: 'lumina',
    badge: 'Beauty & Spa · Clean PASS',
    businessName: 'Lumina Skin & Spa',
    category: 'Beauty & Aesthetics · Local Wellness',
    city: 'Los Angeles, CA',
    budget: 2200,
    timeline: '7 Days',
    rawBrief:
      'Hydra-glow facial experience & West Hollywood studio tour. Partner with 4 LA lifestyle/skincare creators for authentic 30s vlog-style Reels with booking link attribution.',
    readinessScore: 94,
    brandFitScore: 96,
    visionHighlights: [
      'Sunlit minimalist travertine treatment suite aesthetic',
      'Cosmetic-only hydration & glow framing (zero medical overclaims)',
      'First-visit $35 off facial booking code clearly structured',
    ],
    deliverables: [
      '4 × 30s Aesthetic Spa Vlog Reels + TikToks',
      'Unique creator booking UTM + QR check-in code',
      'Verified cosmetic-only sensory script & #ad disclosure',
    ],
    kpis: [
      '55,000–80,000 West LA / Santa Monica views',
      '45+ booked first-time facial appointments',
      'Target Customer Acquisition ROAS: 3.6x+',
    ],
    gateStatus: 'PASS',
    riskScore: 14,
    gateSummary:
      'PASS — Approved for Autonomous Dispatch. Cosmetic hydration claims are compliant with FTC & FDA guidelines.',
    pillars: [
      {
        name: 'Compliance & Claims',
        level: 'Low Risk',
        note: 'Focuses on spa relaxation and surface hydration glow without medical cure claims.',
      },
      {
        name: 'FTC 16 CFR Part 255',
        level: 'Low Risk',
        note: 'Clear #ad disclosure + complimentary treatment disclosure enforced.',
      },
      {
        name: 'Pricing & ROI Realism',
        level: 'Low Risk',
        note: '$2,200 budget ($550/creator) is optimal for LA skincare micro-creators.',
      },
      {
        name: 'Fulfillment & Timeline',
        level: 'Low Risk',
        note: '7-day schedule allows staggered spa booking slots and draft review.',
      },
    ],
    agentDebate: [
      {
        agent: '01 · Growth & Conversion Agent',
        role: 'Local Reach Optimizer',
        verdict:
          'ASMR facial mist + glass-skin after-shot drives 4.2x higher booking intent than static flyers.',
      },
      {
        agent: '02 · Trust & Safety / FTC Agent',
        role: '16 CFR Part 255 Auditor',
        verdict:
          'Confirmed no unsubstantiated clinical claims. Approved with standard #ad header.',
      },
      {
        agent: '03 · World-Model Mediator Judge',
        role: 'Consensus Ruling · PASS (14/100 Risk)',
        verdict: 'Cleared for immediate LA creator shortlist activation.',
      },
    ],
    creators: [
      {
        id: 'l1',
        handle: '@glowwithchloe_la',
        name: 'Chloe Vance',
        neighborhood: 'West Hollywood',
        followers: '48.0K',
        engagement: '5.9%',
        match: 97,
        fee: 550,
        code: 'CHLOEGLOW',
        hookA: '“My secret pre-event glass skin facial in West Hollywood (#ad).”',
        hookB: '“60 minutes of pure calm at Lumina Skin & Spa LA.”',
        shots: [
          { beat: '0–3s · Hook', visual: 'Post-facial dewy skin check in sunlit mirror', line: 'If your skin feels dull in LA, bookmark this studio.' },
          { beat: '3–12s · Space', visual: 'Walking into warm travertine lobby + herbal tea', line: 'Checked into Lumina Skin & Spa on Melrose.' },
          { beat: '12–22s · Treatment', visual: 'Cooling hydro-wand glide & LED canopy', line: 'Zero downtime—just instant hydration and glow.' },
          { beat: '22–30s · Booking CTA', visual: 'Booking confirmation screen + code CHLOEGLOW', line: 'Use CHLOEGLOW for $35 off your first signature facial!' },
        ],
      },
      {
        id: 'l2',
        handle: '@santamonicaserenity',
        name: 'Aria Chen',
        neighborhood: 'Santa Monica / Brentwood',
        followers: '31.5K',
        engagement: '5.2%',
        match: 94,
        fee: 550,
        code: 'ARIASPA',
        hookA: '“Come with me for a Sunday reset facial in LA (#ad).”',
        hookB: '“Why LA estheticians are obsessed with this hydro-glow ritual.”',
        shots: [
          { beat: '0–3s · Hook', visual: 'ASMR towel steam & botanical serum drop', line: 'Sunday reset at my favorite hidden gem spa in LA.' },
          { beat: '3–12s · Consult', visual: 'Skin analysis & custom serum blending', line: 'They tailor every step to your skin barrier.' },
          { beat: '12–22s · Result', visual: 'No-makeup outdoor sunlight glow check', line: 'Walked out with the cleanest, bouncy glow.' },
          { beat: '22–30s · CTA', visual: 'Link in bio + ARIASPA code', line: 'Book with code ARIASPA for $35 off this week!' },
        ],
      },
    ],
    defaultTicket: 165,
    defaultConvPct: 0.09,
    defaultImpressions: 60000,
  },
  glowmed: {
    id: 'glowmed',
    badge: 'High-Risk Brief · Governance BLOCK Demo',
    businessName: 'GlowMed Aesthetics',
    category: 'Medical Aesthetics · Flagged Brief',
    city: 'Bellevue, WA',
    budget: 800,
    timeline: '2 Days',
    rawBrief:
      'Want 10 top beauty influencers to promise "guaranteed permanent wrinkle removal in 24 hours" with no written contract, upfront cash only, and no #ad tags so it looks organic.',
    readinessScore: 25,
    brandFitScore: 31,
    visionHighlights: [
      'CRITICAL: Unsubstantiated "100% Permanent Cure in 24h" text overlay detected',
      'Explicit instruction to hide #ad disclosure violates FTC 16 CFR Part 255',
      'Unit economics mismatch: $800 / 10 macro-creators = $80 each in 48 hours',
    ],
    deliverables: [
      'HALTED: Deceptive medical efficacy claims detected',
      'HALTED: Off-escrow cash demand without creator contract',
    ],
    kpis: ['Escrow Locked until mandatory compliance remediation is applied'],
    gateStatus: 'BLOCK',
    riskScore: 95,
    gateSummary:
      'BLOCK — Policy & Feasibility Violation. Campaign halted due to deceptive medical guarantee claims ("permanent wrinkle removal in 24h"), hidden #ad request, and impossible $80/creator scope.',
    pillars: [
      {
        name: 'Compliance & Claims',
        level: 'High Risk',
        note: '"Guaranteed permanent wrinkle removal in 24h" violates FTC truth-in-advertising & FDA rules.',
      },
      {
        name: 'FTC 16 CFR Part 255',
        level: 'High Risk',
        note: 'Requesting "no #ad tags so it looks organic" is an illegal deceptive sponsorship practice.',
      },
      {
        name: 'Pricing & ROI Realism',
        level: 'High Risk',
        note: '$800 for 10 top influencers ($80/ea) is 85% below market floor.',
      },
      {
        name: 'Fulfillment & Timeline',
        level: 'High Risk',
        note: '2 days is insufficient for appointment booking, filming, and compliance review.',
      },
    ],
    agentDebate: [
      {
        agent: '01 · Growth & Conversion Agent',
        role: 'Local Reach Optimizer',
        verdict:
          'Even if posted, TikTok/IG trust algorithms suppress exaggerated medical guarantee claims and penalize accounts.',
      },
      {
        agent: '02 · Trust & Safety / FTC Agent',
        role: '16 CFR Part 255 Auditor',
        verdict:
          'HARD VETO (Risk 95/100). Omitting #ad disclosures and claiming permanent 24h medical results exposes merchant and creators to severe regulatory fines.',
      },
      {
        agent: '03 · World-Model Mediator Judge',
        role: 'Consensus Ruling · BLOCK & REMEDIATE',
        verdict:
          'Dispatch halted. Generated 1-click Auto-Remediated Brief ($800 for 2 micro-creators, 14-day timeline, compliant cosmetic glow framing + mandatory #ad).',
      },
    ],
    remediationPlan: {
      issue:
        'Illegal permanent medical claim + hidden #ad request + $80/creator budget mismatch.',
      fix: 'Reframe to cosmetic hydration/glow experience, enforce FTC #ad tags, and scope $800 to 2 vetted local micro-creators ($400/ea) over 14 days via milestone escrow.',
      compliantDraft:
        'Partner with 2 Bellevue skincare micro-creators ($400/ea via 30/40/30 escrow) over 14 days to showcase our signature non-invasive Hydra-Facial glow experience. Creators will share authentic studio vlogs with clear #ad disclosure and a $40 first-visit voucher.',
    },
    creators: [],
    defaultTicket: 140,
    defaultConvPct: 0.1,
    defaultImpressions: 28000,
  },
};

// ==========================================
// CREATOR COPILOT & ONBOARDING PERSONAS (For [I'm a Creator] Tab)
// ==========================================
const CREATOR_PERSONAS: Record<CreatorPersonaId, CreatorPersona> = {
  maya: {
    id: 'maya',
    handle: '@sfnoodleclub',
    name: 'Maya Lin',
    city: 'San Francisco, CA',
    niche: 'Local Foodie & Hidden Gems',
    followers: '34.2K',
    engRate: '6.1%',
    localAudiencePct: 82,
    avgViews: '28.5K',
    styleTags: ['Warm Handheld Vlog', 'Tableside Sizzle Macro', 'High Save-to-View Ratio'],
    offers: [
      {
        id: 'off-1',
        merchant: 'Sichuan Bistro SF',
        distance: '0.9 mi · Inner Sunset',
        category: 'Artisanal Dining',
        basePay: 450,
        bonusPotential: 150,
        perk: '$85 VIP Tasting for 2',
        matchScore: 98,
        deliverable: '1 × 30s TikTok & IG Reel + Bio QR Code',
        promoCode: 'SFNOODLE20',
      },
      {
        id: 'off-2',
        merchant: 'Matcha Haus Roastery',
        distance: '1.4 mi · Hayes Valley',
        category: 'Specialty Cafe',
        basePay: 380,
        bonusPotential: 120,
        perk: 'Ceremonial Matcha Gift Box',
        matchScore: 95,
        deliverable: '1 × 30s Morning Routine Reel',
        promoCode: 'MAYAMATCHA',
      },
      {
        id: 'off-3',
        merchant: 'Tartine Craft Bakery Pop-Up',
        distance: '2.1 mi · Mission District',
        category: 'Artisan Bakery',
        basePay: 420,
        bonusPotential: 140,
        perk: 'Weekend Pastry Box + VIP Pass',
        matchScore: 92,
        deliverable: '1 × 30s First-Bite Review',
        promoCode: 'SFPASTRY15',
      },
    ],
    voiceStyles: [
      {
        id: 'vlog',
        label: 'Bestie Date-Night Vlog',
        hook: '“Stop scrolling if you live in SF—I just found our new Friday night dumpling ritual (#ad).”',
        captionPreview:
          '#ad #sponsored Paid partnership with @SichuanBistroSF · Brought my best friend to test their handmade chili-oil wontons and we are obsessed. Use code SFNOODLE20 for 20% off your table this weekend!',
      },
      {
        id: 'asmr',
        label: 'ASMR Sizzle & Texture',
        hook: '“Listen to this tableside chili oil pour in the heart of San Francisco (#ad).”',
        captionPreview:
          '#ad #sponsored Partnering with @SichuanBistroSF · That handmade wrapper texture + house numbing chili crisp is a 10/10. Scan my link in bio or mention SFNOODLE20 for 20% off!',
      },
      {
        id: 'list',
        label: 'Top 3 Must-Order Guide',
        hook: '“3 exact dishes you need to order at Sichuan Bistro SF this weekend (#ad).”',
        captionPreview:
          '#ad #sponsored @SichuanBistroSF · From soup dumplings to wok-charred dan dan noodles, here is the ultimate order guide. Code SFNOODLE20 gets you 20% off dine-in!',
      },
    ],
    shotChecklist: [
      {
        id: 's1',
        beat: '0–3s · Sensory Hook',
        instruction: 'Close-up 60fps clip of hot chili oil pouring over handmade dumplings.',
        tip: 'Keep natural kitchen sizzle audio at 40% volume for instant thumb-stop.',
      },
      {
        id: 's2',
        beat: '3–12s · Neighborhood Vibe',
        instruction: 'Quick pan of warm lanterns, steaming bamboo baskets & chef folding.',
        tip: 'Tag San Francisco location sticker for local algorithm boost.',
      },
      {
        id: 's3',
        beat: '12–22s · First Bite Reaction',
        instruction: 'Lift dumpling on spoon + authentic reaction with your dining partner.',
        tip: 'Show genuine texture—no scripted corporate buzzwords.',
      },
      {
        id: 's4',
        beat: '22–30s · Voucher Callout',
        instruction: 'Flash code SFNOODLE20 on screen for 20% off weekend dine-in.',
        tip: 'Bomie auto-tracks every scan & code use straight to your bonus wallet.',
      },
    ],
    defaultViews: 38000,
    defaultRedemptions: 46,
    walletBalance: 1640,
  },
  chloe: {
    id: 'chloe',
    handle: '@glowwithchloe_la',
    name: 'Chloe Vance',
    city: 'Los Angeles, CA',
    niche: 'Clean Beauty, Spa & Pilates',
    followers: '48.0K',
    engRate: '5.9%',
    localAudiencePct: 79,
    avgViews: '41.0K',
    styleTags: ['Sunlit Glass-Skin Aesthetic', 'Calm Voiceover', 'High Booking Conversion'],
    offers: [
      {
        id: 'off-la-1',
        merchant: 'Lumina Skin & Spa',
        distance: '1.1 mi · West Hollywood',
        category: 'Luxury Facial Studio',
        basePay: 550,
        bonusPotential: 200,
        perk: '$220 Signature Hydro-Glow Facial',
        matchScore: 97,
        deliverable: '1 × 30s Sunday Reset Spa Reel',
        promoCode: 'CHLOEGLOW',
      },
      {
        id: 'off-la-2',
        merchant: 'Forma Pilates Collective',
        distance: '1.8 mi · Melrose Place',
        category: 'Boutique Fitness',
        basePay: 480,
        bonusPotential: 150,
        perk: '1-Month Unlimited Reformer Pass',
        matchScore: 94,
        deliverable: '1 × 30s Post-Class Matcha & Studio Tour',
        promoCode: 'CHLOEPILATES',
      },
      {
        id: 'off-la-3',
        merchant: 'Botanica Apothecary LA',
        distance: '2.4 mi · Silver Lake',
        category: 'Clean Skincare',
        basePay: 450,
        bonusPotential: 150,
        perk: 'Full Barrier Serum Ritual Set',
        matchScore: 91,
        deliverable: '1 × 30s Evening Skincare Routine',
        promoCode: 'CHLOEBOTANICA',
      },
    ],
    voiceStyles: [
      {
        id: 'vlog',
        label: 'Sunday Reset Routine',
        hook: '“Come with me for 60 minutes of pure glass-skin calm in West Hollywood (#ad).”',
        captionPreview:
          '#ad #sponsored Paid partnership with @LuminaSkinLA · Checked in for their signature non-invasive hydro-glow facial and my skin barrier has never felt bouncier. Book with code CHLOEGLOW for $35 off!',
      },
      {
        id: 'asmr',
        label: 'Aesthetic Spa ASMR',
        hook: '“POV: You booked the most relaxing travertine spa suite on Melrose (#ad).”',
        captionPreview:
          '#ad #sponsored @LuminaSkinLA · Warm herbal tea, custom botanical serums, and zero downtime glow. Use CHLOEGLOW via the link in my bio for $35 off your first visit!',
      },
      {
        id: 'list',
        label: 'Pre-Event Glow Prep',
        hook: '“My exact pre-shoot facial spot in LA for instant hydration (#ad).”',
        captionPreview:
          '#ad #sponsored Partnering with @LuminaSkinLA · Why every LA esthetician raves about this 4-step hydration ritual. Grab $35 off your booking with CHLOEGLOW!',
      },
    ],
    shotChecklist: [
      {
        id: 's1',
        beat: '0–3s · Sunlight Glow Check',
        instruction: 'Natural window light mirror clip showing dewy post-facial skin.',
        tip: 'Avoid beauty filters so your authentic glow passes FTC truth-in-advertising.',
      },
      {
        id: 's2',
        beat: '3–12s · Travertine Sanctuary',
        instruction: 'Walking into Lumina lobby + pouring welcome botanical tea.',
        tip: 'Highlight the calm, private suite atmosphere.',
      },
      {
        id: 's3',
        beat: '12–22s · Hydro-Wand Glide',
        instruction: 'Close-up of cooling serum infusion & LED light canopy.',
        tip: 'Keep claims focused on hydration, relaxation, and surface glow.',
      },
      {
        id: 's4',
        beat: '22–30s · Booking Code CTA',
        instruction: 'Overlay code CHLOEGLOW ($35 off first facial) + booking link.',
        tip: 'Every booked appointment adds +$10 bonus to your escrow payout.',
      },
    ],
    defaultViews: 45000,
    defaultRedemptions: 24,
    walletBalance: 2380,
  },
  sam: {
    id: 'sam',
    handle: '@cozyhomewithsam',
    name: 'Sam Rivera (Nano-Creator)',
    city: 'Austin, TX',
    niche: 'Cozy Home, Candles & Local Coffee',
    followers: '14.8K',
    engRate: '7.4%',
    localAudiencePct: 86,
    avgViews: '19.2K',
    styleTags: ['Nano-Creator High Trust', 'Warm Acoustic Aesthetic', '86% Austin Local Reach'],
    offers: [
      {
        id: 'off-atx-1',
        merchant: 'Bloom Studio Candles',
        distance: '0.6 mi · South Congress',
        category: 'Artisan Home Goods',
        basePay: 320,
        bonusPotential: 120,
        perk: 'Custom Pouring Workshop for 2',
        matchScore: 99,
        deliverable: '1 × 30s Candle Pouring & Cozy Desk Reel',
        promoCode: 'SAMBLOOM20',
      },
      {
        id: 'off-atx-2',
        merchant: 'Desnudo Coffee Roasters',
        distance: '1.2 mi · East Austin',
        category: 'Local Coffee Truck',
        basePay: 280,
        bonusPotential: 100,
        perk: '3-Month Whole Bean Subscription',
        matchScore: 95,
        deliverable: '1 × 30s Brown Sugar Miso Latte Reel',
        promoCode: 'SAMCOFFEE',
      },
      {
        id: 'off-atx-3',
        merchant: 'Barton Plant & Terrarium Co.',
        distance: '1.9 mi · Zilker',
        category: 'Botanical Boutique',
        basePay: 300,
        bonusPotential: 110,
        perk: '$120 Rare Monstera + Ceramic Planter',
        matchScore: 93,
        deliverable: '1 × 30s Apartment Plant Styling Tour',
        promoCode: 'SAMPLANTS',
      },
    ],
    voiceStyles: [
      {
        id: 'vlog',
        label: 'Cozy Rainy-Afternoon Vlog',
        hook: '“Come blend a custom cedar & fig soy candle with me on South Congress (#ad).”',
        captionPreview:
          '#ad #sponsored Paid partnership with @BloomStudioATX · You don’t need 100K followers to work with your favorite neighborhood shops! Use code SAMBLOOM20 for 20% off in-store or online.',
      },
      {
        id: 'asmr',
        label: 'Wooden Wick Crackling ASMR',
        hook: '“The sound of this hand-poured wooden wick candle from East Austin (#ad).”',
        captionPreview:
          '#ad #sponsored @BloomStudioATX · Poured with 100% botanical soy wax and essential oils. Stop by their South Congress studio with code SAMBLOOM20 for 20% off!',
      },
      {
        id: 'list',
        label: '3 Local Austin Gifts',
        hook: '“3 scents at Bloom Studio Austin that make your apartment smell like a boutique hotel (#ad).”',
        captionPreview:
          '#ad #sponsored Partnering with @BloomStudioATX · My top picks: Santal Rain, Texas Cedar, and Matcha Fig. Grab 20% off with SAMBLOOM20!',
      },
    ],
    shotChecklist: [
      {
        id: 's1',
        beat: '0–3s · Wooden Wick Spark',
        instruction: 'Macro shot lighting the wooden wick with warm golden-hour shadows.',
        tip: 'High-contrast warm lighting drives 3x higher saves in home decor.',
      },
      {
        id: 's2',
        beat: '3–12s · South Congress Workshop',
        instruction: ' Testing fragrance oils & pouring warm soy wax in-store.',
        tip: 'Show the founder or storefront sign for local Austin recognition.',
      },
      {
        id: 's3',
        beat: '12–22s · Apartment Styling',
        instruction: 'Placing the finished candle on your coffee table next to books.',
        tip: 'Demonstrates how the product fits into everyday cozy living.',
      },
      {
        id: 's4',
        beat: '22–30s · Local Code Callout',
        instruction: 'Share code SAMBLOOM20 for 20% off in-store or online.',
        tip: 'Even with 14.8K followers, your 86% local trust unlocks full base + bonus!',
      },
    ],
    defaultViews: 22000,
    defaultRedemptions: 34,
    walletBalance: 980,
  },
};

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

export default function BomieLandingPage() {
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
  const [loginRole, setLoginRole] = useState<'merchant' | 'creator'>('merchant');
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
  const [isChatHovered, setIsChatHovered] = useState<boolean>(false);
  const [chatHighlight, setChatHighlight] = useState<boolean>(false);
  const [chatInput, setChatInput] = useState<string>('');
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false);
  const chatScrollRef = useRef<HTMLDivElement | null>(null);
  const [chatMessages, setChatMessages] = useState<
    {
      id: string;
      sender: 'bot' | 'user';
      text: string;
      actionLabel?: string;
      actionType?: 'demo' | 'merchant' | 'creator';
    }[]
  >([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Hi! 👋 I’m Bomie AI Concierge. Tap any of our 5 popular FAQ topics below, or type any question about local campaigns, pricing, creators, or FTC compliance!',
    },
  ]);

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

  const faqs = [
    {
      q: 'How does Bomie AI match local businesses with creators?',
      a: 'Our AI engine analyzes your store location, product category, brand vibe, and target audience demographics against local creators’ content style, engagement authenticity, and neighborhood reach—delivering high-fit matches without cold DMs.',
      actionLabel: 'Explore Merchant Matching →',
      actionType: 'merchant' as const,
    },
    {
      q: 'How does pricing and creator payout work?',
      a: 'Businesses can launch campaigns using flat fees, free product seeding, or performance-based milestones (views, clicks, or in-store redemptions). Funds are held securely in 30% / 40% / 30% escrow and released automatically once deliverables and FTC disclosures are verified.',
      actionLabel: 'Book a Custom Pricing Demo →',
      actionType: 'demo' as const,
    },
    {
      q: 'Does Bomie handle FTC disclosure and compliance?',
      a: 'Yes. Bomie’s 3-Agent Governance Gate automatically audits campaign briefs and verifies that published posts include required FTC 16 CFR Part 255 #ad / #sponsored disclosures before releasing final escrow payouts.',
      actionLabel: 'See 3-Agent FTC Gate →',
      actionType: 'merchant' as const,
    },
    {
      q: 'Do I need a minimum follower count to join as a creator?',
      a: 'No. Local businesses care most about authentic storytelling and neighborhood trust. Nano and micro-creators (even 2K–50K followers) with strong local engagement regularly win paid collaborations on Bomie.',
      actionLabel: 'Try Creator Copilot →',
      actionType: 'creator' as const,
    },
    {
      q: 'Which platforms are supported for content tracking?',
      a: 'Bomie currently supports automated performance tracking across TikTok, Instagram Reels, and YouTube Shorts, with direct e-commerce, QR voucher, and POS attribution links.',
      actionLabel: 'Book a Live Walkthrough →',
      actionType: 'demo' as const,
    },
  ];

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages, isBotTyping, isChatOpen]);

  // Auto-collapse chatbot after 4 seconds of inactivity (pause while hovered or typing)
  useEffect(() => {
    if (!isChatOpen || isChatHovered || isBotTyping || chatInput.trim().length > 0) return;
    const timer = setTimeout(() => {
      setIsChatOpen(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [isChatOpen, isChatHovered, isBotTyping, chatInput, chatMessages.length]);

  const handleSelectFaqTopic = (faqItem: (typeof faqs)[number]) => {
    const userMsgId = `u-${Date.now()}`;
    setChatMessages((prev) => [...prev, { id: userMsgId, sender: 'user', text: faqItem.q }]);
    setIsBotTyping(true);
    setTimeout(() => {
      setIsBotTyping(false);
      setChatMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: faqItem.a,
          actionLabel: faqItem.actionLabel,
          actionType: faqItem.actionType,
        },
      ]);
    }, 450);
  };

  const generateSmartBotReply = (raw: string): {
    text: string;
    actionLabel?: string;
    actionType?: 'demo' | 'merchant' | 'creator';
  } => {
    const q = raw.toLowerCase();
    const isZh = /[\u4e00-\u9fa5]/.test(raw);

    if (q.includes('price') || q.includes('cost') || q.includes('fee') || q.includes('budget') || q.includes('多少钱') || q.includes('收费') || q.includes('价格') || q.includes('预算')) {
      return {
        text: isZh
          ? 'Bomie AI 支持极灵活的预算配置！本地商家可以从 $300–$1,500 的单次社区推广起步，资金采用 30%（签约）/ 40%（脚本过审）/ 30%（发布且 FTC 合规验证后）智能托管结算，零隐形费用。'
          : 'Bomie AI is built for local budgets! Most neighborhood campaigns start between $300 and $1,500 with 30% / 40% / 30% milestone escrow protection—you only release final payout once verified content is live.',
        actionLabel: isZh ? '预约 1 对 1 报价演示 →' : 'Book a Pricing Walkthrough →',
        actionType: 'demo',
      };
    }

    if (q.includes('city') || q.includes('cities') || q.includes('where') || q.includes('sf') || q.includes('la') || q.includes('seattle') || q.includes('vegas') || q.includes('城市') || q.includes('地区') || q.includes('哪里')) {
      return {
        text: isZh
          ? '我们目前已全面覆盖北美核心文化与商业枢纽（旧金山 San Francisco、洛杉矶 Los Angeles、西雅图 Seattle、拉斯维加斯 Las Vegas 等），并支持全美 4,000 万+ 中小商家与本地达人按邮编与英里半径精准匹配！'
          : 'We are live across North America’s major cultural hubs—including San Francisco, Los Angeles, Seattle, and Las Vegas—matching businesses and creators within a 0.5 to 15-mile neighborhood radius.',
        actionLabel: isZh ? '预约城市专属方案 →' : 'Book a City Launch Demo →',
        actionType: 'demo',
      };
    }

    if (q.includes('creator') || q.includes('influencer') || q.includes('follower') || q.includes('tiktok') || q.includes('达人') || q.includes('博主') || q.includes('粉丝') || q.includes('提现')) {
      return {
        text: isZh
          ? '作为本地达人（Creator），哪怕你是 2K–50K 粉丝的 KOC/Nano 达人，只要本地互动真实，就能收到附近餐厅、美学 Spa、精品店的付费邀请！自带 AI 30 秒脚本助手，发布即通过 Stripe / Apple Pay 秒级提现。'
          : 'Creators love Bomie Copilot! You don’t need millions of followers—nano & micro creators (2K–50K) get direct paid invites from nearby restaurants, spas, and boutiques with instant Stripe / Apple Pay payouts.',
        actionLabel: isZh ? '体验达人工作台 →' : 'Try Creator Copilot →',
        actionType: 'creator',
      };
    }

    if (q.includes('ftc') || q.includes('compliance') || q.includes('legal') || q.includes('escrow') || q.includes('合规') || q.includes('担保') || q.includes('安全')) {
      return {
        text: isZh
          ? 'Bomie 内置三智能体合规网关（3-Agent Governance Gate）：自动扫描医疗夸大词、强制校验 FTC #ad 标签与商业曲库授权，合规通过后才释放尾款，帮商家和达人 100% 规避法律与封号风险。'
          : 'Our 3-Agent Governance Gate automatically checks FTC 16 CFR Part 255 disclosures (#ad / #sponsored), medical/category claims, and commercial audio licensing before releasing final escrow funds.',
        actionLabel: isZh ? '查看合规沙盒演示 →' : 'Test FTC Gate in Sandbox →',
        actionType: 'merchant',
      };
    }

    if (q.includes('demo') || q.includes('human') || q.includes('contact') || q.includes('book') || q.includes('预约') || q.includes('联系') || q.includes('客服') || q.includes('合作')) {
      return {
        text: isZh
          ? '太棒了！你可以直接点击下方按钮预约我们创始团队的 15 分钟 1-on-1 专属演示，或者发送邮件至 lucian.wang@bomie.ai，我们会在 24 小时内为你定制本地增长方案！'
          : 'We’d love to show you around! Click below to schedule a 15-minute 1-on-1 walkthrough with our founding team, or email us directly at lucian.wang@bomie.ai.',
        actionLabel: isZh ? '立即预约 Demo →' : 'Book a 1-on-1 Demo →',
        actionType: 'demo',
      };
    }

    return {
      text: isZh
        ? `收到你的问题！Bomie AI 通过「AI 同城精准匹配 + 4 阶段全自动活动编排 + 内置 FTC 合规与托管结算」连接北美本地商家与达人。你可以点击下方按钮体验交互式工作台，或直接预约 1 对 1 演示！`
        : `Great question! Bomie AI connects local businesses and neighborhood creators within miles—combining AI smart matching, 30s script co-creation, FTC compliance verification, and tracked in-store QR attribution. Would you like to see a live demo for your store or creator profile?`,
      actionLabel: isZh ? '预约 1 对 1 专属演示 →' : 'Book a Live Demo →',
      actionType: 'demo',
    };
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = chatInput.trim();
    if (!trimmed) return;
    const userMsgId = `u-${Date.now()}`;
    setChatMessages((prev) => [...prev, { id: userMsgId, sender: 'user', text: trimmed }]);
    setChatInput('');
    setIsBotTyping(true);

    setTimeout(() => {
      const reply = generateSmartBotReply(trimmed);
      setIsBotTyping(false);
      setChatMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: reply.text,
          actionLabel: reply.actionLabel,
          actionType: reply.actionType,
        },
      ]);
    }, 520);
  };

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

  return (
    <div className="min-h-screen overflow-x-clip bg-[#f7f4ff] text-[#161224] selection:bg-violet-600 selection:text-white">
      {/* Sticky Soft Lavender Glass Navbar */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        onMouseLeave={() => setOpenNavMenu(null)}
        className="sticky top-0 z-50 border-b border-violet-200/70 bg-[#f7f4ff]/85 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10 py-3.5 sm:py-4">
          {/* 1. Enlarged Bespoke Geometric B✦ Logo + Stacked Shimmer Tagline Underneath */}
          <Link href="/" className="group flex min-w-0 items-center gap-3.5">
            <div className="relative flex h-11 w-11 sm:h-13 sm:w-13 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-tr from-[#5b21b6] via-[#d946ef] to-[#fbbf24] p-[1px] shadow-lg shadow-violet-500/25 transition-transform duration-300 group-hover:scale-105">
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
            <div className="flex min-w-0 flex-col justify-center">
              <span className="text-xl sm:text-[26px] font-extrabold tracking-tight text-[#161224] leading-none whitespace-nowrap">
                bomie.ai
              </span>
              <div className="hidden xl:flex items-center mt-1.5">
                <motion.span
                  animate={{ backgroundPosition: ['115% 0%', '-15% 0%'] }}
                  transition={{
                    duration: 3.6,
                    repeat: Infinity,
                    repeatDelay: 0.8,
                    ease: 'easeInOut',
                  }}
                  style={{
                    backgroundImage:
                      'linear-gradient(90deg, #5b21b6 0%, #5b21b6 38%, #db2777 48%, #d97706 51%, #7c3aed 55%, #5b21b6 64%, #5b21b6 100%)',
                    backgroundSize: '240% 100%',
                  }}
                  className="bg-clip-text text-[11px] lg:text-xs font-semibold tracking-wide text-transparent leading-none whitespace-nowrap"
                >
                  North America&apos;s First AI Commerce OS for Local Businesses &amp; Creators
                </motion.span>
              </div>
            </div>
          </Link>

          {/* 2. Three Single-Line Center Dropdown Menus */}
          <nav className="hidden lg:flex lg:self-center pb-0.5 items-center gap-2 xl:gap-5 shrink-0">
            {/* Dropdown 1: Commerce OS */}
            <div
              className="relative"
              onMouseEnter={() => setOpenNavMenu('os')}
            >
              <button
                type="button"
                onClick={() => setOpenNavMenu(openNavMenu === 'os' ? null : 'os')}
                className="flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-semibold text-[#161224]/85 transition hover:bg-violet-200/40 hover:text-violet-950"
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
                      <button
                        type="button"
                        onClick={handleOpenFaqChatbot}
                        className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left transition hover:bg-violet-50"
                      >
                        <MessageSquare className="h-4 w-4 shrink-0 text-emerald-600" />
                        <span className="text-xs font-bold text-[#161224]">FAQ</span>
                      </button>
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
                className="flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-semibold text-[#161224]/85 transition hover:bg-violet-200/40 hover:text-violet-950"
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
                className="flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-semibold text-[#161224]/85 transition hover:bg-violet-200/40 hover:text-violet-950"
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
                    className="absolute left-0 top-full pt-2 w-56 z-50"
                  >
                    <div className="rounded-2xl border border-violet-200/80 bg-white/95 p-2 shadow-2xl shadow-violet-900/10 backdrop-blur-2xl space-y-1">
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

          <div className="flex shrink-0 self-center pb-0.5 items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowLoginModal(true)}
              className="hidden sm:inline-flex rounded-lg px-3.5 py-1.5 text-sm font-semibold text-[#161224]/85 transition hover:bg-violet-200/40 hover:text-violet-950"
            >
              Log in
            </button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setDemoSubmitted(false);
                setDemoError('');
                setShowDemoModal(true);
              }}
              className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-lg bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-700 px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold text-white shadow-lg shadow-violet-600/25 transition hover:opacity-95"
            >
              Book a Demo
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
                    <button
                      type="button"
                      onClick={handleOpenFaqChatbot}
                      className="flex items-center gap-2.5 rounded-xl border border-violet-200/70 bg-white px-3.5 py-2.5 text-left text-xs font-semibold text-[#161224] shadow-xs"
                    >
                      <MessageSquare className="h-4 w-4 text-emerald-600" />
                      FAQ
                    </button>
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

      {/* Hero Section with Apple 18 Soft Lavender Glow & Subtle Grid */}
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
            className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg"
          >
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

      {/* Success Stories — Clean Metric Strip + 4 City Hubs */}
      <section id="stories" className="border-t border-violet-200/70 bg-[#efe9ff]/55 py-14 scroll-mt-16">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10 space-y-10">
          {/* Lightweight Centered 3-Metric Strip (Desktop & Mobile) */}
          <div className="mx-auto grid max-w-4xl grid-cols-3 divide-x divide-violet-200/80 border-b border-violet-200/80 pb-8 text-center">
            <div className="px-2 sm:px-6">
              <div className="text-2xl sm:text-4xl font-extrabold tracking-tight text-amber-600">3.6x</div>
              <div className="mt-1 text-[11px] sm:text-sm font-medium text-slate-600">Avg. Store-Visit ROAS</div>
            </div>
            <div className="px-2 sm:px-6">
              <div className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#161224]">&lt; 5m</div>
              <div className="mt-1 text-[11px] sm:text-sm font-medium text-slate-600">AI Local Creator Match</div>
            </div>
            <div className="px-2 sm:px-6">
              <div className="text-2xl sm:text-4xl font-extrabold tracking-tight text-emerald-600">100%</div>
              <div className="mt-1 text-[11px] sm:text-sm font-medium text-slate-600">FTC 16 CFR Pass Rate</div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="min-w-0">
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-violet-600">
                City Success Stories
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#161224] sm:text-4xl leading-tight">
                Proven Across North America&apos;s
                <br />
                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-500 bg-clip-text text-transparent">
                  Cultural Hubs
                </span>
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600">
                Swipe or select a city to explore its local commerce ecosystem, then click any city card to unfold 4 verified brand collaborations.
              </p>
            </div>

            {/* 4 City Tabs — Strictly 1 Single Row on Desktop */}
            <div className="inline-flex flex-nowrap shrink-0 items-center gap-1.5 overflow-x-auto rounded-2xl border border-violet-200 bg-white p-1.5 shadow-sm">
              {cityOrder.map((cityId) => {
                const c = cityStories[cityId];
                const active = selectedCity === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onMouseEnter={() => {
                      setSelectedCity(c.id);
                      setCityExpanded(false);
                    }}
                    onClick={() => {
                      setSelectedCity(c.id);
                      setCityExpanded(false);
                    }}
                    className={`whitespace-nowrap shrink-0 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition ${
                      active
                        ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md'
                        : 'text-slate-600 hover:text-violet-950'
                    }`}
                  >
                    {c.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 1: Swipeable Horizontal Spring Track Across All 4 Cities */}
          <div
            onMouseEnter={() => setIsCityPaused(true)}
            onMouseLeave={() => setIsCityPaused(false)}
            className="mt-10 space-y-6"
          >
            <div
              {...cityCarousel.containerHandlers}
              tabIndex={0}
              className="overflow-hidden rounded-3xl border border-white/15 bg-slate-950 shadow-2xl transition hover:border-violet-500/50 cursor-grab active:cursor-grabbing select-none touch-pan-y focus:outline-none"
            >
              <motion.div
                animate={cityCarousel.trackAnimate}
                transition={cityCarousel.trackTransition}
                className="flex w-full"
              >
                {cityOrder.map((cityId) => {
                  const cityData = cityStories[cityId];
                  const isCurrent = selectedCity === cityId;
                  return (
                    <div
                      key={cityData.id}
                      onClick={() => {
                        if (cityCarousel.didDragRef.current) {
                          cityCarousel.didDragRef.current = false;
                          return;
                        }
                        if (!isCurrent) {
                          setSelectedCity(cityId);
                          setCityExpanded(false);
                          return;
                        }
                        setCityExpanded((prev) => !prev);
                      }}
                      className="group w-full shrink-0 cursor-pointer"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-12">
                        {/* City Visual Banner */}
                        <div className="relative h-64 sm:h-80 lg:h-auto lg:col-span-5 overflow-hidden">
                          <img
                            src={cityData.heroImage}
                            alt={cityData.name}
                            loading="lazy"
                            draggable={false}
                            className="h-full w-full object-cover pointer-events-none transition duration-700 group-hover:scale-105"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#090912]" />
                          <div className="absolute bottom-5 left-6">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/65 px-3 py-1 font-mono text-xs text-amber-300 backdrop-blur-md border border-white/15">
                              <MapPin className="h-3.5 w-3.5" />
                              {cityData.name} Hub
                            </span>
                          </div>
                        </div>

                        {/* City Overview Details & Expand Trigger */}
                        <div className="flex flex-col justify-between p-7 sm:p-10 lg:col-span-7 bg-[#090912]">
                          <div className="space-y-4">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="font-mono text-xs uppercase tracking-widest text-violet-400">
                                {cityData.tagline}
                              </span>
                              <span className="rounded-full bg-emerald-500/15 px-3 py-1 font-mono text-xs font-semibold text-emerald-300">
                                4 Verified Case Studies
                              </span>
                            </div>
                            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
                              {cityData.name} Creator Commerce Ecosystem
                            </h3>
                            <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                              {cityData.overview}
                            </p>

                            <div className="grid grid-cols-3 gap-4 pt-2">
                              {cityData.stats.map((st, i) => (
                                <div
                                  key={i}
                                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5"
                                >
                                  <div className="font-mono text-xl sm:text-2xl font-bold text-white">
                                    {st.value}
                                  </div>
                                  <div className="text-xs text-slate-400 mt-0.5">{st.label}</div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
                            <span className="text-xs font-mono text-slate-400">
                              {isCurrent && cityExpanded
                                ? `Showing all 4 ${cityData.name} merchant collaborations below`
                                : `Click to unfold 4 ${cityData.name} brand case studies`}
                            </span>
                            <button
                              type="button"
                              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-slate-950 shadow-md transition group-hover:bg-amber-200"
                            >
                              <span>
                                {isCurrent && cityExpanded
                                  ? `Hide ${cityData.name} Case Studies`
                                  : `Explore 4 ${cityData.name} Brand Stories`}
                              </span>
                              <ChevronDown
                                className={`h-4 w-4 transition-transform duration-300 ${
                                  isCurrent && cityExpanded ? 'rotate-180' : ''
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* 4-City Dash Progress Pill + Swipe Cue (Matches Hero Carousel Feel) */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-1">
              <span className="font-mono text-[11px] text-slate-500">
                Swipe or drag ↔ to glide across cities · Auto-rotates until hovered or expanded
              </span>
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-white px-4 py-2 shadow-xs">
                {cityOrder.map((cityId, idx) => (
                  <button
                    key={cityId}
                    type="button"
                    aria-label={`View ${cityStories[cityId].name}`}
                    onMouseEnter={() => {
                      setSelectedCity(cityId);
                      setCityExpanded(false);
                    }}
                    onClick={() => {
                      setSelectedCity(cityId);
                      setCityExpanded(false);
                    }}
                    className={`relative h-1.5 overflow-hidden rounded-full transition-all duration-300 ${
                      selectedCityIndex === idx
                        ? 'w-10 bg-violet-200'
                        : 'w-3.5 bg-slate-300 hover:bg-violet-400'
                    }`}
                  >
                    {selectedCityIndex === idx && !isCityPaused && !cityExpanded && (
                      <motion.span
                        key={`city-progress-${selectedCity}`}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 5, ease: 'linear' }}
                        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-400"
                      />
                    )}
                    {selectedCityIndex === idx && (isCityPaused || cityExpanded) && (
                      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Expandable 4 Illustrated Local Brand Case Studies */}
            <AnimatePresence>
              {cityExpanded && (
                <motion.div
                  key={`cases-${activeCityData.id}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35 }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-6 pt-2 md:grid-cols-2">
                    {activeCityData.cases.map((cs, idx) => (
                      <motion.div
                        key={cs.brand}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.06 }}
                        className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950 flex flex-col justify-between shadow-xl"
                      >
                        <div>
                          <div className="relative h-52 w-full overflow-hidden">
                            <img
                              src={cs.image}
                              alt={cs.brand}
                              loading="lazy"
                              className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                            <div className="absolute top-4 left-4 rounded-full bg-black/65 px-3 py-1 font-mono text-[11px] text-white backdrop-blur-md border border-white/15">
                              {cs.industry}
                            </div>
                            <div className="absolute bottom-3 left-5 right-5 flex items-end justify-between">
                              <h4 className="text-xl font-bold text-white">{cs.brand}</h4>
                              <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 font-mono text-xs font-bold text-emerald-300">
                                {cs.metric}
                              </span>
                            </div>
                          </div>

                          <div className="p-6 space-y-3">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-violet-300 font-semibold">
                                Matched Lead Creator: {cs.creator}
                              </span>
                              <div className="flex items-center gap-0.5 text-amber-400">
                                {[...Array(5)].map((_, sIdx) => (
                                  <Star key={sIdx} className="h-3.5 w-3.5 fill-current" />
                                ))}
                              </div>
                            </div>
                            <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
                              {cs.summary}
                            </p>
                            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-3.5 text-xs italic text-slate-400">
                              {cs.quote}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Pilot Testimonials + Zero Risk & Escrow Protection — Finalized Ode Architectural Ribbon */}
      <section id="pricing" className="border-t border-[#161224]/12 py-12 sm:py-16 scroll-mt-16">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="space-y-10">
            {/* Top Tier: Clean Heading & Escrow Subtitle */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#161224]/10">
              <div className="max-w-3xl">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#161224]">
                  $0 Monthly Fee in MVP.{' '}
                  <span className="bg-gradient-to-r from-violet-700 to-fuchsia-600 bg-clip-text text-transparent">
                    Protected at Every Step.
                  </span>
                </h2>
                <p className="mt-2 text-sm sm:text-base text-[#161224]/70 leading-relaxed">
                  Every campaign runs on 30/40/30 Stripe Escrow with a 100% pre-acceptance refund guarantee—zero risk of wasted ad spend.
                </p>
              </div>
              <Link
                href="/pricing"
                className="group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#5b21b6] hover:text-violet-950 transition font-semibold shrink-0"
              >
                <span className="border-b border-[#5b21b6]/40 group-hover:border-[#5b21b6] pb-0.5">
                  View Pricing &amp; Escrow Plan
                </span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Middle Tier: 3-Column Architectural Ledger (三列发丝分割线，大数字) */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#161224]/10 py-2 border-b border-[#161224]/10">
              {/* Col 1 */}
              <div className="py-4 md:py-2 md:pr-8">
                <div className="font-mono text-xs uppercase tracking-wider text-[#6D28D9] font-semibold">
                  01 · Zero Platform Fee
                </div>
                <div className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#161224]">
                  $0 <span className="text-sm font-normal text-[#161224]/50 font-mono">MVP FREE</span>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-[#161224]/65 leading-relaxed">
                  100% Waived during limited MVP launch. Pay strictly for approved creator collaborations.
                </p>
              </div>

              {/* Col 2 */}
              <div className="py-4 md:py-2 md:px-8">
                <div className="font-mono text-xs uppercase tracking-wider text-emerald-700 font-semibold flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5" />
                  <span>02 · 100% Refund Guarantee</span>
                </div>
                <div className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#161224]">
                  100% <span className="text-sm font-normal text-[#161224]/50 font-mono">MONEY-BACK</span>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-[#161224]/65 leading-relaxed">
                  Cancel anytime before a creator accepts your brief for an instant card or bank refund.
                </p>
              </div>

              {/* Col 3 */}
              <div className="py-4 md:py-2 md:pl-8">
                <div className="font-mono text-xs uppercase tracking-wider text-amber-700 font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>03 · Milestone Protection</span>
                </div>
                <div className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#161224]">
                  30 · 40 · 30 <span className="text-sm font-normal text-[#161224]/50 font-mono">STRIPE ESCROW</span>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-[#161224]/65 leading-relaxed">
                  30% kickoff, 40% draft approved, and final 30% only after live video post &amp; FTC compliance.
                </p>
              </div>
            </div>

            {/* Lower Tier: Expansive Pilot Voices Spotlight (大气全宽名言引述与故事切换) */}
            <div className="pt-2">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                {/* Left: Quote */}
                <div className="flex-1 max-w-3xl">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-violet-800 bg-violet-100/80 px-2.5 py-0.5 rounded-full border border-violet-200">
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
                  <div className="mt-4 flex items-center gap-3">
                    <div className="text-sm font-bold text-[#161224]">
                      {['David L.', 'Elena R.', '@sfnoodleclub'][activePilotIndex]}
                    </div>
                    <span className="text-[#161224]/30">·</span>
                    <div className="text-xs text-[#161224]/65">
                      {[
                        'Owner, Chili & Silk Sichuan · San Francisco',
                        'Founder, Lumina Skin Studio · Los Angeles',
                        'Local Food Creator (34.2K) · Bay Area',
                      ][activePilotIndex]}
                    </div>
                  </div>
                </div>

                {/* Right: Quick Switcher Navigation */}
                <div className="flex flex-wrap lg:flex-col gap-2 shrink-0">
                  {[
                    { name: 'Chili & Silk (SF)', tag: '3.6X ROAS', type: 'Dining' },
                    { name: 'Lumina Skin (LA)', tag: '+41% Bookings', type: 'Beauty & Spa' },
                    { name: '@sfnoodleclub', tag: 'Bay Area Creator', type: 'Creator' },
                  ].map((item, idx) => (
                    <button
                      key={item.name}
                      type="button"
                      onMouseEnter={() => setActivePilotIndex(idx)}
                      onClick={() => setActivePilotIndex(idx)}
                      className={`flex items-center justify-between gap-4 px-4 py-2.5 rounded-xl border transition-all text-left min-w-[200px] ${
                        activePilotIndex === idx
                          ? 'border-violet-600 bg-white shadow-sm'
                          : 'border-[#161224]/8 bg-white/40 hover:bg-white hover:border-violet-200'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-[#161224]">{item.name}</div>
                        <div className="text-[10px] text-[#161224]/50">{item.type}</div>
                      </div>
                      <span className="font-mono text-[10px] text-violet-700 font-semibold">{item.tag}</span>
                    </button>
                  ))}
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
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-violet-700">
                      1-on-1 Founder Walkthrough
                    </span>
                    <h3 className="mt-1 text-2xl font-extrabold text-[#161224]">
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
                      placeholder="Alex Chen"
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
                        placeholder="alex@yourbusiness.com"
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

                  <div className="grid grid-cols-2 gap-3">
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

                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      type="submit"
                      disabled={isSubmittingDemo}
                      className="w-full rounded-xl bg-gradient-to-r from-[#5b21b6] to-[#d946ef] py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition hover:opacity-95 disabled:opacity-50"
                    >
                      {isSubmittingDemo ? 'Submitting Request...' : 'Schedule My 15-Min Demo'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowDemoModal(false);
                        setShowFullStudioModal(true);
                      }}
                      className="w-full rounded-xl border border-violet-200 bg-[#f7f4ff] py-2.5 text-xs font-semibold text-violet-800 hover:bg-violet-100"
                    >
                      Or Skip Wait &amp; Launch Self-Serve V5 Sandbox &rarr;
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
                  Creator Copilot
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
                    Open {loginRole === 'merchant' ? 'Merchant Workspace' : 'Creator Copilot'} →
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

      {/* Floating Bottom-Right Bomie AI Logo FAQ Chatbot */}
      <div
        onMouseEnter={() => setIsChatHovered(true)}
        onMouseLeave={() => setIsChatHovered(false)}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3"
      >
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.94 }}
              transition={{ duration: 0.22 }}
              className={`flex h-[520px] max-h-[82vh] w-[calc(100vw-2.5rem)] sm:w-[400px] flex-col overflow-hidden rounded-3xl border bg-white/95 shadow-2xl backdrop-blur-2xl ${
                chatHighlight
                  ? 'border-violet-400 ring-2 ring-violet-400/35 shadow-violet-500/20'
                  : 'border-violet-200/90 shadow-violet-950/15'
              }`}
            >
              {/* Chatbot Header */}
              <div className="flex items-center justify-between border-b border-violet-200/80 bg-gradient-to-r from-[#f7f4ff] via-white to-[#fdf4ff] px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#5b21b6] via-[#d946ef] to-[#fbbf24] shadow-md shadow-violet-500/25">
                    <svg viewBox="0 0 512 512" fill="none" className="h-6 w-6">
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
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-extrabold text-[#161224]">Bomie AI Concierge</span>
                      <span className="rounded-full bg-violet-100 px-1.5 py-0.5 text-[10px] font-bold text-violet-700 border border-violet-200">
                        FAQ Bot
                      </span>
                    </div>
                    <div className="text-[11px] text-emerald-700 flex items-center gap-1 font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Online · 5 FAQ Topics &amp; Live Chat</span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsChatOpen(false)}
                  className="rounded-lg border border-violet-200 bg-white p-1.5 text-slate-500 transition hover:bg-violet-50 hover:text-[#161224]"
                  aria-label="Close Bomie AI Chatbot"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Pre-stored 5 FAQ Topic Pills */}
              <div className="border-b border-violet-100 bg-[#f7f4ff]/70 px-3.5 py-2.5">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-violet-700">
                    Quick FAQ Topics (Tap to Ask)
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {faqs.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectFaqTopic(item)}
                      className="rounded-full border border-violet-200 bg-white px-2.5 py-1 text-left text-[11px] font-medium text-slate-700 shadow-xs transition hover:border-violet-400 hover:bg-violet-50 hover:text-violet-950"
                    >
                      {item.q.length > 38 ? `${item.q.slice(0, 36)}…` : item.q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Conversation Stream */}
              <div
                ref={chatScrollRef}
                className="flex-1 overflow-y-auto bg-[#faf8ff] px-4 py-3.5 space-y-3"
              >
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[86%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-[#5b21b6] to-[#d946ef] text-white rounded-br-sm shadow-sm'
                          : 'border border-violet-200/80 bg-white text-slate-700 rounded-bl-sm shadow-xs'
                      }`}
                    >
                      <p>{msg.text}</p>
                      {msg.sender === 'bot' && msg.actionLabel && (
                        <button
                          type="button"
                          onClick={() => {
                            if (msg.actionType === 'demo') {
                              setDemoSubmitted(false);
                              setShowDemoModal(true);
                            } else if (msg.actionType === 'merchant') {
                              setIsChatOpen(false);
                              jumpToOsStage('business', 1);
                            } else if (msg.actionType === 'creator') {
                              setIsChatOpen(false);
                              jumpToOsStage('creator', 1);
                            }
                          }}
                          className="mt-2 inline-flex items-center gap-1 rounded-lg border border-violet-200 bg-violet-50 px-2.5 py-1 text-[11px] font-semibold text-violet-800 transition hover:bg-violet-100"
                        >
                          <span>{msg.actionLabel}</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {isBotTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-violet-200/80 bg-white px-3.5 py-2.5 shadow-xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-bounce" />
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-fuchsia-500 animate-bounce"
                        style={{ animationDelay: '0.15s' }}
                      />
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-bounce"
                        style={{ animationDelay: '0.3s' }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Input Form */}
              <form
                onSubmit={handleSendChatMessage}
                className="flex items-center gap-2 border-t border-violet-200/80 bg-white p-3"
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask anything about pricing, cities, creators..."
                  className="flex-1 rounded-xl border border-violet-200 bg-[#faf8ff] px-3.5 py-2 text-xs text-[#161224] placeholder-slate-400 focus:border-violet-500 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim()}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-[#5b21b6] to-[#d946ef] text-white shadow-md transition hover:opacity-90 disabled:opacity-40"
                  aria-label="Send message"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Bomie B✦ Logo Launcher Button */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsChatOpen((prev) => !prev)}
          className="group relative flex items-center gap-2.5 rounded-full border border-violet-200/90 bg-white/95 p-1.5 pr-4 shadow-xl shadow-violet-900/15 backdrop-blur-xl transition hover:border-violet-400"
          aria-label="Open Bomie AI FAQ Chatbot"
        >
          <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-[#5b21b6] via-[#d946ef] to-[#fbbf24] shadow-lg shadow-violet-500/30">
            {isChatOpen ? (
              <X className="h-5 w-5 text-white" />
            ) : (
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
            )}
            <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
          </span>
          <div className="flex flex-col text-left">
            <span className="text-xs font-extrabold text-[#161224] flex items-center gap-1">
              <Bot className="h-3 w-3 text-violet-600" />
              Ask Bomie AI
            </span>
            <span className="text-[10px] font-medium text-slate-500">FAQ &amp; Live Answers</span>
          </div>
        </motion.button>
      </div>

      <BrandFooter />
    </div>
  );
}
