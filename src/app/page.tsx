'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

export default function BomieLandingPage() {
  const [activeTab, setActiveTab] = useState<'business' | 'creator'>('business');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedMatch, setSelectedMatch] = useState<number>(0);

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
  const [demoSubmitted, setDemoSubmitted] = useState<boolean>(false);
  const [loginRole, setLoginRole] = useState<'merchant' | 'creator'>('merchant');

  const jumpToOsStage = (role: 'business' | 'creator', stageNum: 1 | 2 | 3 | 4) => {
    setActiveTab(role);
    if (role === 'business') setActiveStage(stageNum);
    else setCreatorStage(stageNum);
    const el = document.getElementById('how-it-works');
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

  const liveMatches = [
    {
      tag: 'Dining',
      headline: 'Artisanal Local Dining',
      subline: 'Sizzling kitchen storytelling · 30% weekend walk-in lift',
      image:
        'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1400',
      business: 'TastyTaco Artisanal Kitchen',
      location: '0.8 mi away · San Francisco, CA',
      creator: '@mayalovesfood (42.5K)',
      matchScore: '98% Match',
      ftcStatus: 'FTC #ad Brief Auto-Generated',
      estReach: '35K–60K Local Views',
    },
    {
      tag: 'Fashion & Spa',
      headline: 'Boutique Style & Wellness',
      subline: 'Sunlit studio vlogs · High-intent local appointment bookings',
      image:
        'https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=1400',
      business: 'Modest Muse & Lumina Studio',
      location: '1.2 mi away · Los Angeles, CA',
      creator: '@chloestylediary (28.1K)',
      matchScore: '96% Match',
      ftcStatus: 'FTC Disclosure Verified',
      estReach: '22K–40K Targeted Views',
    },
    {
      tag: 'Craft Goods',
      headline: 'Neighborhood Craft & Home',
      subline: 'Cozy creator co-creation · Tracked in-store QR redemptions',
      image:
        'https://images.pexels.com/photos/4207785/pexels-photo-4207785.jpeg?auto=compress&cs=tinysrgb&w=1400',
      business: 'Bloom Studio Candles',
      location: '0.6 mi away · Austin, TX',
      creator: '@cozyhomewithsam (14.8K)',
      matchScore: '99% Match',
      ftcStatus: 'Escrow & FTC Rules Locked',
      estReach: '50K–95K High-Intent Views',
    },
  ];

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
    },
    {
      q: 'How does pricing and creator payout work?',
      a: 'Businesses can launch campaigns using flat fees, free product seeding, or performance-based milestones (views, clicks, or in-store redemptions). Funds are held securely in 30% / 40% / 30% escrow and released automatically once deliverables and FTC disclosures are verified.',
    },
    {
      q: 'Does Bomie handle FTC disclosure and compliance?',
      a: 'Yes. Bomie’s 3-Agent Governance Gate automatically audits campaign briefs and verifies that published posts include required FTC 16 CFR Part 255 #ad / #sponsored disclosures before releasing final escrow payouts.',
    },
    {
      q: 'Do I need a minimum follower count to join as a creator?',
      a: 'No. Local businesses care most about authentic storytelling and neighborhood trust. Nano and micro-creators with strong local engagement regularly win paid collaborations on Bomie.',
    },
    {
      q: 'Which platforms are supported for content tracking?',
      a: 'Bomie currently supports automated performance tracking across TikTok, Instagram Reels, and YouTube Shorts, with direct e-commerce, QR voucher, and POS attribution links.',
    },
  ];

  const testimonials = [
    {
      name: 'David Ramirez',
      role: 'Founder of TastyTaco (Local Restaurant Chain)',
      quote:
        'I never imagined social media could drive so many walk-ins. The AI creator matching was spot-on — we saw a 30% increase in weekend traffic after just 2 videos. Bomie made influencer marketing finally feel doable.',
    },
    {
      name: 'Aisha Noor',
      role: 'Owner at Modest Muse (Modest Fashion Boutique)',
      quote:
        "As a small business owner with limited time and no design team, I always felt stuck. Bomie's campaign studio was a blessing — I could launch and track influencer collabs in one dashboard. Elegant and powerful.",
    },
    {
      name: 'Kevin Liu',
      role: 'Co-founder of GadgetPop (Shopify Gadget Store)',
      quote:
        'We used to waste hours just finding reliable creators. Bomie streamlined everything. From vetting to post scheduling, it saved us time and doubled ROI during our last product drop.',
    },
    {
      name: 'Natalie Brooks',
      role: 'Owner of Bloom Studio (Artisan Candle Brand)',
      quote:
        "What I love most is how personal everything feels. Our creators truly understood the brand. It wasn't just ads — it was storytelling. We built a loyal audience, not just buyers.",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#06060c] text-slate-50 selection:bg-violet-500 selection:text-white">
      {/* Sticky Glass Navbar */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 border-b border-white/10 bg-[#06060c]/75 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          <a href="#" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-amber-400 font-extrabold text-white shadow-lg shadow-violet-500/30 transition-transform group-hover:scale-105">
              B
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2.5">
                <span className="text-xl font-bold tracking-tight text-white">bomie.ai</span>
                <span className="hidden h-3.5 w-[1px] bg-white/20 xl:inline-block" />
                <span className="hidden font-[family-name:var(--font-playfair)] text-xs italic tracking-wide text-amber-200/90 xl:inline-block">
                  Built for North America&apos;s 40M+ Small Businesses &amp; Local Creators
                </span>
              </div>
              <span className="font-[family-name:var(--font-playfair)] text-[11px] italic tracking-wide text-amber-200/85 xl:hidden">
                For North America&apos;s 40M+ Businesses &amp; Creators
              </span>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-300 lg:flex">
            <a href="#how-it-works" className="transition hover:text-white">
              How It Works
            </a>
            <a href="#os" className="transition hover:text-white">
              Commerce OS
            </a>
            <a href="#stories" className="transition hover:text-white">
              Success Stories
            </a>
            <a href="#faq" className="transition hover:text-white">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowLoginModal(true)}
              className="rounded-xl px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              Log in
            </button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setDemoSubmitted(false);
                setShowDemoModal(true);
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-500 p-[1px] shadow-lg shadow-violet-600/25"
            >
              <span className="flex items-center gap-1.5 rounded-[11px] bg-white px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-slate-100">
                <Sparkles className="h-3.5 w-3.5 text-violet-600" />
                Book a Demo
              </span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section with Animated Aurora & Grid */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-32">
        <div
          className="pointer-events-none absolute inset-0 -z-20 opacity-25"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.18) 1px, transparent 0)',
            backgroundSize: '36px 36px',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.22, 0.35, 0.22] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[520px] w-[920px] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-600/40 via-fuchsia-600/30 to-amber-500/20 blur-[130px]"
        />

        <div className="mx-auto max-w-6xl px-6 text-center">
          {/* Clean Static Top Pill (Zero Truncation) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-violet-400/35 bg-violet-500/10 px-5 py-2 text-xs sm:text-sm font-semibold tracking-wide text-violet-100 backdrop-blur-md shadow-lg shadow-violet-950/40"
          >
            <Sparkles className="h-4 w-4 shrink-0 text-amber-300" />
            <span>First Platform in North America for Local Businesses &amp; Local Creators</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl"
          >
            Where Local Businesses Meet{' '}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">
              Booming Creators
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg"
          >
            We empower local businesses and local creators to grow together — through AI smart matching,
            4-stage autonomous campaign orchestration, and built-in FTC compliance.
          </motion.p>

          {/* Dual Role CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.a
              whileHover={{ scale: 1.03, boxShadow: '0 0 35px rgba(139, 92, 246, 0.45)' }}
              whileTap={{ scale: 0.98 }}
              href="#how-it-works"
              onClick={() => setActiveTab('business')}
              className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-violet-600/25 sm:w-auto"
            >
              <Store className="h-5 w-5" />
              I&apos;m a Merchant
              <ArrowRight className="h-4 w-4" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.12)' }}
              whileTap={{ scale: 0.98 }}
              href="#how-it-works"
              onClick={() => setActiveTab('creator')}
              className="flex w-full items-center justify-center gap-2.5 rounded-2xl border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-md sm:w-auto"
            >
              <Video className="h-5 w-5 text-fuchsia-400" />
              I&apos;m a Creator
              <ArrowRight className="h-4 w-4 text-fuchsia-300" />
            </motion.a>
          </motion.div>

          {/* Material-Style Visual Stage + Live AI Match Console (Combining Adjustment A & B) */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mx-auto mt-16 max-w-5xl rounded-3xl border border-white/15 bg-slate-900/70 p-2.5 shadow-2xl shadow-violet-950/50 backdrop-blur-xl"
          >
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b14] text-left">
              {/* Visual Hero Stage (Image 3 Material Flask Paradigm: Editorial Scene + Bottom-Left Title + Bottom-Right Dash Switcher) */}
              <div className="relative h-[300px] sm:h-[360px] w-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={liveMatches[selectedMatch].image}
                    src={liveMatches[selectedMatch].image}
                    alt={liveMatches[selectedMatch].headline}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.45 }}
                    className="h-full w-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b14] via-[#0b0b14]/45 to-black/20" />

                {/* Top Console Bar Overlay */}
                <div className="absolute top-4 left-5 right-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-3.5 py-1.5 backdrop-blur-md">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-xs text-slate-200">
                      bomie-ai-engine · live-local-campaign
                    </span>
                  </div>
                  <div className="flex gap-1.5 rounded-full border border-white/15 bg-black/55 p-1 backdrop-blur-md">
                    {liveMatches.map((m, i) => (
                      <button
                        key={m.tag}
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

                  {/* Material Flask Style Dash Indicator Pill [ ━━  ──  ── ] */}
                  <div className="inline-flex items-center gap-2 self-start sm:self-end rounded-full border border-white/15 bg-black/65 px-4 py-2.5 backdrop-blur-md">
                    {liveMatches.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        aria-label={`Slide ${idx + 1}`}
                        onClick={() => setSelectedMatch(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          selectedMatch === idx
                            ? 'w-8 bg-white'
                            : 'w-3.5 bg-white/30 hover:bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom 3-Column Live Match Telemetry Strip */}
              <div className="p-6 pt-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedMatch}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="grid gap-4 md:grid-cols-3"
                  >
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="text-xs text-slate-400">Local Merchant</div>
                      <div className="mt-1 font-bold text-white">
                        {liveMatches[selectedMatch].business}
                      </div>
                      <div className="mt-2 flex items-center gap-1 text-xs text-violet-300">
                        <MapPin className="h-3.5 w-3.5" />
                        {liveMatches[selectedMatch].location}
                      </div>
                    </div>

                    <div className="rounded-xl border border-violet-500/30 bg-violet-500/10 p-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-violet-200">AI Matched Creator</span>
                        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 font-semibold text-emerald-300">
                          {liveMatches[selectedMatch].matchScore}
                        </span>
                      </div>
                      <div className="mt-1 font-bold text-white">
                        {liveMatches[selectedMatch].creator}
                      </div>
                      <div className="mt-2 flex items-center gap-1 text-xs text-slate-300">
                        <TrendingUp className="h-3.5 w-3.5 text-amber-300" />
                        {liveMatches[selectedMatch].estReach}
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="text-xs text-slate-400">Compliance &amp; Escrow</div>
                      <div className="mt-1 flex items-center gap-1.5 font-semibold text-emerald-400">
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        <span className="text-sm">{liveMatches[selectedMatch].ftcStatus}</span>
                      </div>
                      <div className="mt-2 text-xs text-slate-400">
                        Auto-payout upon verified post
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Infinite Smooth Marquee */}
      <div className="relative overflow-hidden border-y border-white/10 bg-white/[0.02] py-4">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          className="flex w-max items-center gap-8"
        >
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <div key={index} className="flex items-center gap-8">
              <span className="text-sm font-semibold tracking-wide text-slate-300 uppercase">
                {item}
              </span>
              <Sparkles className="h-4 w-4 text-violet-400" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Pain Points Comparison */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Growth Happens When Sellers &amp; Creators Click
            </h2>
            <p className="mt-3 text-slate-400">
              Bomie bridges real people, not cold ads — eliminating friction on both sides.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/90 to-slate-950 p-8 transition-colors hover:border-violet-500/40"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-xl bg-violet-500/15 px-3.5 py-1.5 text-sm font-semibold text-violet-300">
                <Store className="h-4 w-4" />
                For Local Sellers
              </div>
              <ul className="space-y-4 text-slate-300">
                <li className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                  <span>Can&apos;t find reliable creators to promote niche or local products.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                  <span>Spend money on broad social ads that fail to convert into walk-ins.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                  <span>Lack simple tools to integrate e-commerce and local social marketing.</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/90 to-slate-950 p-8 transition-colors hover:border-fuchsia-500/40"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-xl bg-fuchsia-500/15 px-3.5 py-1.5 text-sm font-semibold text-fuchsia-300">
                <Video className="h-4 w-4" />
                For Creators
              </div>
              <ul className="space-y-4 text-slate-300">
                <li className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                  <span>Struggle to find paid content opportunities that genuinely fit your voice.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                  <span>Get ghosted after sending dozens of cold DMs to brands.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                  <span>Waste hours chasing logistics and invoices instead of creating.</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          HOW BOMIE WORKS — DUAL INTERACTIVE CONSOLES:
          1) [I'm a Merchant] -> Bomie V5 4-Stage Autonomous Campaign Orchestrator
          2) [I'm a Creator]  -> Bomie V5 4-Stage Creator Onboarding & Copilot Studio
         ===================================================================== */}
      <section id="how-it-works" className="border-t border-white/10 bg-slate-900/20 py-24 scroll-mt-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-3.5 py-1 text-xs font-semibold text-violet-300">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              Interactive Dual-Role Autonomous Sandbox
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How Bomie Works</h2>
            <p className="mt-3 text-slate-400">
              Switch between our live Merchant Campaign Orchestrator and Creator Copilot Studio.
            </p>

            {/* Shared Layout Spring Pill: I'm a Merchant vs I'm a Creator */}
            <div className="mt-8 inline-flex rounded-2xl border border-white/10 bg-slate-950 p-1.5">
              {(['business', 'creator'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="relative rounded-xl px-6 py-2.5 text-sm font-semibold transition-colors"
                >
                  {activeTab === tab && (
                    <motion.span
                      layoutId="activeWorkflowTab"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className={`absolute inset-0 rounded-xl ${
                        tab === 'business' ? 'bg-violet-600' : 'bg-fuchsia-600'
                      }`}
                    />
                  )}
                  <span
                    className={`relative z-10 flex items-center gap-2 ${
                      activeTab === tab ? 'text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab === 'business' ? (
                      <>
                        <Store className="h-4 w-4" />
                        I&apos;m a Merchant (Campaign OS)
                      </>
                    ) : (
                      <>
                        <Video className="h-4 w-4" />
                        I&apos;m a Creator (Creator Copilot)
                      </>
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'business' ? (
              /* ==============================================================
                 TAB A: I'M A MERCHANT — 4-STAGE AUTONOMOUS CAMPAIGN OS
                 ============================================================== */
              <motion.div
                key="merchant-v5-orchestrator"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35 }}
                className="mt-12 space-y-6"
              >
                {/* Top Control Bar: Preset Switcher + Run Pipeline + Open Full Studio */}
                <div className="flex flex-col justify-between gap-4 rounded-3xl border border-white/10 bg-slate-950/90 p-5 lg:flex-row lg:items-center">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Select Live Merchant Brief Scenario</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(Object.keys(MERCHANT_SCENARIOS) as MerchantScenarioId[]).map((key) => {
                        const s = MERCHANT_SCENARIOS[key];
                        const active = scenarioId === key;
                        return (
                          <button
                            key={key}
                            onClick={() => handleSelectScenario(key)}
                            className={`rounded-xl border px-3.5 py-2 text-left text-xs font-semibold transition ${
                              active
                                ? key === 'glowmed'
                                  ? 'border-rose-500/50 bg-rose-500/15 text-rose-200'
                                  : 'border-violet-500/60 bg-violet-600/20 text-white'
                                : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/25 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span>{s.businessName}</span>
                              <span
                                className={`rounded-md px-1.5 py-0.5 font-mono text-[10px] ${
                                  s.gateStatus === 'PASS'
                                    ? 'bg-emerald-500/20 text-emerald-300'
                                    : 'bg-rose-500/20 text-rose-300'
                                }`}
                              >
                                {s.gateStatus}
                              </span>
                            </div>
                            <div className="mt-0.5 font-normal text-[11px] opacity-75">
                              {s.city} · ${s.budget.toLocaleString()} · {s.timeline}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleRunAutonomousPipeline}
                      disabled={isRunningPipeline}
                      className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-violet-600/25 transition hover:opacity-95 disabled:opacity-50"
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                      {isRunningPipeline ? 'Running 4-Stage OS...' : 'Simulate 4-Stage Run'}
                    </button>
                    <button
                      onClick={() => setShowFullStudioModal(true)}
                      className="inline-flex items-center gap-1.5 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
                    >
                      <span>Open Full V5 Sandbox</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* 4-Stage Interactive Pipeline Stepper */}
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {[
                    {
                      num: 1 as const,
                      code: 'STAGE 01',
                      title: 'Intake Pre-Flight & Vision',
                      sub: `Readiness · ${currentScenario.readinessScore}%`,
                    },
                    {
                      num: 2 as const,
                      code: 'STAGE 02',
                      title: '3-Agent FTC & Risk Gate',
                      sub:
                        currentScenario.gateStatus === 'PASS'
                          ? `PASS · Risk ${currentScenario.riskScore}/100`
                          : `BLOCK · Risk ${currentScenario.riskScore}/100`,
                    },
                    {
                      num: 3 as const,
                      code: 'STAGE 03',
                      title:
                        currentScenario.gateStatus === 'PASS'
                          ? 'Creator Roster & 30s Script'
                          : 'Governance Revision Plan',
                      sub:
                        currentScenario.gateStatus === 'PASS'
                          ? `${currentScenario.creators.length} Local Creators Matched`
                          : 'Auto-Remediation Ready',
                    },
                    {
                      num: 4 as const,
                      code: 'STAGE 04',
                      title: 'ROI World Model & Escrow',
                      sub:
                        currentScenario.gateStatus === 'PASS'
                          ? `${projectedRoas}x Proj. ROAS`
                          : 'Escrow Locked',
                    },
                  ].map((st) => {
                    const isCurrent = activeStage === st.num;
                    const isBlockStage = currentScenario.gateStatus === 'BLOCK' && st.num >= 2;
                    return (
                      <button
                        key={st.num}
                        onClick={() => setActiveStage(st.num)}
                        className={`group relative rounded-2xl border p-4 text-left transition-all ${
                          isCurrent
                            ? isBlockStage
                              ? 'border-rose-500/60 bg-rose-950/30 shadow-lg shadow-rose-950/30'
                              : 'border-violet-500/60 bg-violet-950/30 shadow-lg shadow-violet-950/30'
                            : 'border-white/10 bg-slate-950/70 hover:border-white/25'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span
                            className={
                              isCurrent
                                ? isBlockStage
                                  ? 'text-rose-300 font-bold'
                                  : 'text-violet-300 font-bold'
                                : 'text-slate-500'
                            }
                          >
                            {st.code}
                          </span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                              isBlockStage
                                ? 'bg-rose-500/20 text-rose-300'
                                : 'bg-emerald-500/15 text-emerald-300'
                            }`}
                          >
                            {st.sub}
                          </span>
                        </div>
                        <div className="mt-1.5 text-sm font-bold text-white">{st.title}</div>
                      </button>
                    );
                  })}
                </div>

                {/* Active Stage Workspace Card */}
                <div className="rounded-3xl border border-white/15 bg-[#090912] p-6 sm:p-8 shadow-2xl">
                  <AnimatePresence mode="wait">
                    {activeStage === 1 && (
                      <motion.div
                        key="stage-1"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="grid gap-8 lg:grid-cols-12"
                      >
                        <div className="space-y-5 lg:col-span-7">
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
                            <div>
                              <span className="font-mono text-xs uppercase tracking-wider text-violet-400">
                                01 · Multimodal Intake Pre-Flight Evaluator
                              </span>
                              <h3 className="mt-1 text-2xl font-bold text-white">
                                {currentScenario.businessName} ({currentScenario.city})
                              </h3>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="rounded-xl border border-violet-500/30 bg-violet-500/15 px-3 py-1.5 font-mono text-xs font-bold text-violet-200">
                                Brief Readiness: {currentScenario.readinessScore}%
                              </span>
                              <span className="rounded-xl border border-emerald-500/30 bg-emerald-500/15 px-3 py-1.5 font-mono text-xs font-bold text-emerald-300">
                                Vision Fit: {currentScenario.brandFitScore}%
                              </span>
                            </div>
                          </div>

                          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                              Merchant Raw Brief Input
                            </div>
                            <p className="mt-1.5 text-sm leading-relaxed text-slate-200">
                              &ldquo;{currentScenario.rawBrief}&rdquo;
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2 text-xs font-mono text-slate-400">
                              <span className="rounded-lg bg-white/5 px-2.5 py-1">
                                Category: {currentScenario.category}
                              </span>
                              <span className="rounded-lg bg-white/5 px-2.5 py-1">
                                Budget: ${currentScenario.budget.toLocaleString()}
                              </span>
                              <span className="rounded-lg bg-white/5 px-2.5 py-1">
                                Timeline: {currentScenario.timeline}
                              </span>
                            </div>
                          </div>

                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                              <div className="text-xs font-bold uppercase tracking-wider text-violet-300">
                                Structured Target Deliverables
                              </div>
                              <ul className="mt-2.5 space-y-2 text-xs text-slate-300">
                                {currentScenario.deliverables.map((d, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                                    <span>{d}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                              <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
                                Extracted Attribution KPIs
                              </div>
                              <ul className="mt-2.5 space-y-2 text-xs text-slate-300">
                                {currentScenario.kpis.map((k, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <TrendingUp className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                                    <span>{k}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 p-5 lg:col-span-5">
                          <div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-mono font-semibold text-slate-300">
                                Gemini Vision · 9:16 Ad &amp; Storefront Read
                              </span>
                              <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-[10px] text-amber-300">
                                #ad Paid Partner
                              </span>
                            </div>

                            <div className="mt-4 rounded-2xl border border-white/10 bg-black/50 p-4 space-y-3">
                              <div className="flex items-center justify-between text-xs text-slate-400">
                                <span>Visual Asset Signals Detected</span>
                                <Eye className="h-4 w-4 text-violet-400" />
                              </div>
                              <ul className="space-y-2 text-xs text-slate-200">
                                {currentScenario.visionHighlights.map((vh, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start gap-2 rounded-xl bg-white/[0.04] p-2.5"
                                  >
                                    <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-fuchsia-400" />
                                    <span>{vh}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                            <span className="text-xs text-slate-400">
                              Next: 3-Agent FTC &amp; Risk Gate
                            </span>
                            <button
                              onClick={() => setActiveStage(2)}
                              className="inline-flex items-center gap-1.5 rounded-xl bg-violet-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-violet-500"
                            >
                              <span>Proceed to Stage 02</span>
                              <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeStage === 2 && (
                      <motion.div
                        key="stage-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-6"
                      >
                        <div
                          className={`flex flex-col justify-between gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center ${
                            currentScenario.gateStatus === 'PASS'
                              ? 'border-emerald-500/40 bg-emerald-950/25'
                              : 'border-rose-500/50 bg-rose-950/30'
                          }`}
                        >
                          <div className="flex items-start gap-3.5">
                            {currentScenario.gateStatus === 'PASS' ? (
                              <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-400" />
                            ) : (
                              <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-rose-400" />
                            )}
                            <div>
                              <div className="font-mono text-xs uppercase tracking-wider text-slate-300">
                                02 · Risk-Based Exposure Gate · Adversarial Risk Score:{' '}
                                {currentScenario.riskScore}/100
                              </div>
                              <h3 className="mt-0.5 text-lg font-bold text-white">
                                {currentScenario.gateSummary}
                              </h3>
                            </div>
                          </div>
                          <button
                            onClick={() => setActiveStage(3)}
                            className="shrink-0 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-slate-200"
                          >
                            {currentScenario.gateStatus === 'PASS'
                              ? 'View Matched Creators (Stage 03) →'
                              : 'View Auto-Remediation Plan →'}
                          </button>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                          {currentScenario.pillars.map((p, i) => (
                            <div
                              key={i}
                              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                            >
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-bold text-white">{p.name}</span>
                                <span
                                  className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold ${
                                    p.level === 'Low Risk'
                                      ? 'bg-emerald-500/20 text-emerald-300'
                                      : 'bg-rose-500/20 text-rose-300'
                                  }`}
                                >
                                  {p.level}
                                </span>
                              </div>
                              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                                {p.note}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-slate-950 p-5">
                          <div className="mb-3 flex items-center justify-between text-xs">
                            <span className="font-mono font-semibold uppercase tracking-wider text-violet-300">
                              Multi-Agent Deliberation Log (3-Turn Governance Consensus)
                            </span>
                            <span className="font-mono text-slate-500">
                              FTC 16 CFR Part 255 Engine
                            </span>
                          </div>
                          <div className="grid gap-3 md:grid-cols-3">
                            {currentScenario.agentDebate.map((turn, idx) => (
                              <div
                                key={idx}
                                className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5"
                              >
                                <div className="text-xs font-bold text-white">{turn.agent}</div>
                                <div className="font-mono text-[10px] text-violet-400">
                                  {turn.role}
                                </div>
                                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                                  {turn.verdict}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeStage === 3 && (
                      <motion.div
                        key="stage-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                      >
                        {currentScenario.gateStatus === 'BLOCK' &&
                        currentScenario.remediationPlan ? (
                          <div className="space-y-6">
                            <div className="rounded-2xl border border-rose-500/40 bg-rose-950/20 p-6">
                              <div className="font-mono text-xs uppercase tracking-wider text-rose-300">
                                03 · Merchant Revision Plan (Governance Remediation)
                              </div>
                              <h3 className="mt-1 text-xl font-bold text-white">
                                Creator Dispatch Halted — 1-Click Compliant Brief Ready
                              </h3>
                              <p className="mt-2 text-sm text-slate-300">
                                {currentScenario.remediationPlan.fix}
                              </p>
                              <div className="mt-4 rounded-xl border border-white/10 bg-black/40 p-4">
                                <div className="font-mono text-xs text-emerald-400">
                                  Auto-Generated Compliant Brief Draft:
                                </div>
                                <p className="mt-1.5 text-sm text-slate-200">
                                  &ldquo;{currentScenario.remediationPlan.compliantDraft}&rdquo;
                                </p>
                              </div>
                              <div className="mt-5">
                                <button
                                  onClick={handleApplyCompliantRevision}
                                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-xs font-bold text-slate-950 transition hover:bg-emerald-400"
                                >
                                  <Check className="h-4 w-4" />
                                  Apply Compliant Revision &amp; Unlock Creator Roster
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="grid gap-8 lg:grid-cols-12">
                            <div className="space-y-4 lg:col-span-6">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <div>
                                  <span className="font-mono text-xs uppercase tracking-wider text-violet-400">
                                    03 · Local Creator Roster &amp; Dynamic Escrow
                                  </span>
                                  <h3 className="text-xl font-bold text-white">
                                    Select Creators ({selectedCreatorIds.length}/
                                    {currentScenario.creators.length} Active · $
                                    {activeBudget.toLocaleString()} Allocated)
                                  </h3>
                                </div>
                              </div>

                              <div className="space-y-2.5">
                                {currentScenario.creators.map((cr) => {
                                  const isChecked = selectedCreatorIds.includes(cr.id);
                                  const isScriptActive =
                                    activeScriptCreator && activeScriptCreator.id === cr.id;
                                  return (
                                    <div
                                      key={cr.id}
                                      className={`rounded-2xl border p-4 transition ${
                                        isScriptActive
                                          ? 'border-violet-500/60 bg-violet-950/25'
                                          : 'border-white/10 bg-white/[0.02]'
                                      }`}
                                    >
                                      <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                          <button
                                            type="button"
                                            onClick={() => toggleCreatorSelection(cr.id)}
                                            className={`flex h-5 w-5 items-center justify-center rounded-md border text-xs ${
                                              isChecked
                                                ? 'border-violet-500 bg-violet-600 text-white'
                                                : 'border-white/30 bg-transparent'
                                            }`}
                                          >
                                            {isChecked && <Check className="h-3.5 w-3.5" />}
                                          </button>
                                          <div>
                                            <div className="flex items-center gap-2">
                                              <span className="font-bold text-white">
                                                {cr.handle}
                                              </span>
                                              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-300">
                                                {cr.match}% Match
                                              </span>
                                            </div>
                                            <div className="text-xs text-slate-400">
                                              {cr.name} · {cr.neighborhood} · {cr.followers} (
                                              {cr.engagement} eng)
                                            </div>
                                          </div>
                                        </div>

                                        <div className="text-right">
                                          <div className="font-mono text-sm font-bold text-white">
                                            ${cr.fee}
                                          </div>
                                          <button
                                            type="button"
                                            onClick={() => setActiveScriptCreatorId(cr.id)}
                                            className="mt-1 text-[11px] font-semibold text-violet-300 underline hover:text-white"
                                          >
                                            30s Script &amp; Shots →
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {activeScriptCreator && (
                              <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-950 p-5 lg:col-span-6">
                                <div className="space-y-4">
                                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                    <div>
                                      <span className="font-mono text-[11px] uppercase tracking-wider text-fuchsia-400">
                                        30s Short-Video Hook &amp; Shot-List Studio
                                      </span>
                                      <h4 className="text-base font-bold text-white">
                                        {activeScriptCreator.handle} · Code:{' '}
                                        <span className="font-mono text-amber-300">
                                          {activeScriptCreator.code}
                                        </span>
                                      </h4>
                                    </div>
                                    <FileText className="h-5 w-5 text-slate-400" />
                                  </div>

                                  <div className="space-y-2 text-xs">
                                    <div className="rounded-xl bg-white/[0.03] p-3">
                                      <span className="font-mono text-[10px] uppercase text-violet-300">
                                        A/B Opening Hook A (0–3s):
                                      </span>
                                      <p className="mt-1 font-medium text-slate-200">
                                        {activeScriptCreator.hookA}
                                      </p>
                                    </div>
                                    <div className="rounded-xl bg-white/[0.03] p-3">
                                      <span className="font-mono text-[10px] uppercase text-fuchsia-300">
                                        A/B Opening Hook B (0–3s):
                                      </span>
                                      <p className="mt-1 font-medium text-slate-200">
                                        {activeScriptCreator.hookB}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    <div className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                                      Second-by-Second 30s Storyboard
                                    </div>
                                    {activeScriptCreator.shots.map((sh, idx) => (
                                      <div
                                        key={idx}
                                        className="grid grid-cols-12 gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-2.5 text-xs"
                                      >
                                        <div className="col-span-3 font-mono font-semibold text-violet-300">
                                          {sh.beat}
                                        </div>
                                        <div className="col-span-9 space-y-0.5">
                                          <div className="text-slate-200">{sh.visual}</div>
                                          <div className="italic text-slate-400">
                                            &ldquo;{sh.line}&rdquo;
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                                  <span className="font-mono text-[11px] text-emerald-400">
                                    ✓ Mandatory FTC 16 CFR Part 255 #ad Clause Locked
                                  </span>
                                  <button
                                    onClick={() => setActiveStage(4)}
                                    className="inline-flex items-center gap-1.5 rounded-xl bg-violet-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-violet-500"
                                  >
                                    <span>Simulate ROI &amp; Escrow (Stage 04)</span>
                                    <ArrowRight className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </motion.div>
                    )}

                    {activeStage === 4 && (
                      <motion.div
                        key="stage-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="grid gap-8 lg:grid-cols-12"
                      >
                        <div className="space-y-6 lg:col-span-7">
                          <div>
                            <span className="font-mono text-xs uppercase tracking-wider text-violet-400">
                              04 · Post-Campaign Attribution &amp; World-Model ROI Simulator
                            </span>
                            <h3 className="mt-1 text-xl font-bold text-white">
                              Interactive Foot-Traffic &amp; Unit Economics Forecast
                            </h3>
                          </div>

                          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            <div className="rounded-2xl border border-violet-500/30 bg-violet-500/10 p-3.5">
                              <div className="text-[11px] text-violet-200">Projected ROAS</div>
                              <div className="mt-1 font-mono text-2xl font-bold text-white">
                                {projectedRoas}x
                              </div>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5">
                              <div className="text-[11px] text-slate-400">Est. Gross Revenue</div>
                              <div className="mt-1 font-mono text-2xl font-bold text-emerald-400">
                                ${estGrossRevenue.toLocaleString()}
                              </div>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5">
                              <div className="text-[11px] text-slate-400">Store Redemptions</div>
                              <div className="mt-1 font-mono text-2xl font-bold text-white">
                                {estConversions}
                              </div>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5">
                              <div className="text-[11px] text-slate-400">Effective CPA</div>
                              <div className="mt-1 font-mono text-2xl font-bold text-amber-300">
                                ${effectiveCpa}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-xs">
                            <div className="flex items-center gap-2 font-mono text-slate-300">
                              <Sliders className="h-4 w-4 text-violet-400" />
                              <span>Drag Sliders to Stress-Test Store Economics</span>
                            </div>

                            <div>
                              <div className="mb-1 flex justify-between">
                                <span className="text-slate-400">Avg. Customer Ticket ($)</span>
                                <span className="font-mono font-bold text-white">${avgTicket}</span>
                              </div>
                              <input
                                type="range"
                                min={15}
                                max={220}
                                value={avgTicket}
                                onChange={(e) => setAvgTicket(Number(e.target.value))}
                                className="w-full accent-violet-500"
                              />
                            </div>

                            <div>
                              <div className="mb-1 flex justify-between">
                                <span className="text-slate-400">
                                  In-Store Voucher Conversion Rate (%)
                                </span>
                                <span className="font-mono font-bold text-white">
                                  {convRatePct.toFixed(2)}%
                                </span>
                              </div>
                              <input
                                type="range"
                                min={0.05}
                                max={0.6}
                                step={0.01}
                                value={convRatePct}
                                onChange={(e) => setConvRatePct(Number(e.target.value))}
                                className="w-full accent-violet-500"
                              />
                            </div>

                            <div>
                              <div className="mb-1 flex justify-between">
                                <span className="text-slate-400">
                                  Est. Geo-Fenced Local Impressions
                                </span>
                                <span className="font-mono font-bold text-white">
                                  {impressions.toLocaleString()}
                                </span>
                              </div>
                              <input
                                type="range"
                                min={15000}
                                max={150000}
                                step={1000}
                                value={impressions}
                                onChange={(e) => setImpressions(Number(e.target.value))}
                                className="w-full accent-violet-500"
                              />
                            </div>
                          </div>

                          <div className="grid gap-3 sm:grid-cols-2 text-xs">
                            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                              <div className="font-mono text-[10px] uppercase text-rose-400">
                                Policy A · Unaligned Blind Cold DMs
                              </div>
                              <div className="mt-1 font-bold text-slate-200">
                                0.85x Store-Visit ROAS · 81% FTC Flag Risk
                              </div>
                              <p className="mt-1 text-slate-400">
                                Broad non-local followers; zero QR redemption tracking.
                              </p>
                            </div>
                            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                              <div className="font-mono text-[10px] uppercase text-emerald-300">
                                Policy B · Bomie World Model Rollout
                              </div>
                              <div className="mt-1 font-bold text-white">
                                {projectedRoas}x Store-Visit ROAS · +{netRoiPct}% Net ROI
                              </div>
                              <p className="mt-1 text-emerald-200/80">
                                Neighborhood-verified audience + automated QR &amp; POS attribution.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-950 p-5 lg:col-span-5">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                              <div>
                                <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400">
                                  30% / 40% / 30% Escrow Milestone Tracker
                                </span>
                                <h4 className="text-base font-bold text-white">
                                  Automated FTC Post Verification Gate
                                </h4>
                              </div>
                              <Lock className="h-4 w-4 text-emerald-400" />
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-xs">
                              {[
                                { step: 1 as const, label: '01 · 30% Deposit Locked' },
                                { step: 2 as const, label: '02 · 40% Draft Approved' },
                                { step: 3 as const, label: '03 · FTC Live Post Verified' },
                                { step: 4 as const, label: '04 · 100% Escrow Settled' },
                              ].map((m) => (
                                <button
                                  key={m.step}
                                  type="button"
                                  onClick={() => setEscrowStep(m.step)}
                                  className={`rounded-xl border px-3 py-2.5 text-left font-mono text-[11px] font-semibold transition ${
                                    escrowStep >= m.step
                                      ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
                                      : 'border-white/10 bg-white/[0.02] text-slate-500'
                                  }`}
                                >
                                  {m.label}
                                </button>
                              ))}
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-3 text-xs">
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-slate-300">
                                  Test Creator Post FTC Verification:
                                </span>
                                <div className="flex gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setPostSimMode('compliant');
                                      setEscrowStep(3);
                                    }}
                                    className={`rounded-lg px-2.5 py-1 font-mono text-[10px] font-semibold ${
                                      postSimMode === 'compliant'
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-white/5 text-slate-400'
                                    }`}
                                  >
                                    Compliant Post
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setPostSimMode('noncompliant');
                                      setEscrowStep(2);
                                    }}
                                    className={`rounded-lg px-2.5 py-1 font-mono text-[10px] font-semibold ${
                                      postSimMode === 'noncompliant'
                                        ? 'bg-rose-600 text-white'
                                        : 'bg-white/5 text-slate-400'
                                    }`}
                                  >
                                    Missing #ad
                                  </button>
                                </div>
                              </div>

                              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 font-mono text-[11px] text-slate-300">
                                {postSimMode === 'compliant'
                                  ? '"#ad #sponsored Paid partnership with @SichuanBistroSF! Use code SFNOODLE20 for 20% off handmade dumplings this weekend!"'
                                  : '"Obsessed with this spot! Guaranteed 100% permanent results overnight—everyone go today!" (No #ad disclosure)'}
                              </div>

                              {postSimMode === 'compliant' ? (
                                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-emerald-200">
                                  <div className="font-bold">
                                    ✓ FTC 16 CFR Part 255 Verified — Ready for Final Payout
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => setEscrowStep(4)}
                                    className="mt-2 w-full rounded-lg bg-emerald-500 py-2 text-xs font-bold text-slate-950 transition hover:bg-emerald-400"
                                  >
                                    {escrowStep === 4
                                      ? '✓ 100% Final Escrow Released & Settled'
                                      : 'Release Final 30% Escrow Payout'}
                                  </button>
                                </div>
                              ) : (
                                <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-3 text-rose-200">
                                  <div className="font-bold">
                                    ✕ Non-Compliant — Escrow Held at Stage 02 (40%)
                                  </div>
                                  <p className="mt-1 text-[11px]">
                                    Auto-notified creator to prepend mandatory #ad disclosure and remove unsubstantiated guarantee claim before payout release.
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
                            <span className="text-slate-400">Want to test with your own store photo?</span>
                            <button
                              type="button"
                              onClick={() => setShowFullStudioModal(true)}
                              className="font-semibold text-violet-300 underline hover:text-white"
                            >
                              Launch Full V5 Studio ↗
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : (
              /* ==============================================================
                 TAB B: I'M A CREATOR — 4-STAGE CREATOR ONBOARDING & COPILOT STUDIO
                 ============================================================== */
              <motion.div
                key="creator-v5-copilot"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35 }}
                className="mt-12 space-y-6"
              >
                {/* Top Control Bar: Creator Persona Switcher + Simulate Journey */}
                <div className="flex flex-col justify-between gap-4 rounded-3xl border border-white/10 bg-slate-950/90 p-5 lg:flex-row lg:items-center">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-fuchsia-300">
                      <span className="h-2 w-2 rounded-full bg-fuchsia-400 animate-pulse" />
                      <span>Select Creator Onboarding Persona (Nano to Mid-Tier)</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(Object.keys(CREATOR_PERSONAS) as CreatorPersonaId[]).map((key) => {
                        const c = CREATOR_PERSONAS[key];
                        const active = creatorPersonaId === key;
                        return (
                          <button
                            key={key}
                            onClick={() => handleSelectCreatorPersona(key)}
                            className={`rounded-xl border px-3.5 py-2 text-left text-xs font-semibold transition ${
                              active
                                ? 'border-fuchsia-500/60 bg-fuchsia-600/20 text-white'
                                : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/25 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span>{c.handle}</span>
                              <span className="rounded-md bg-fuchsia-500/20 px-1.5 py-0.5 font-mono text-[10px] text-fuchsia-300">
                                {c.followers} · {c.engRate}
                              </span>
                            </div>
                            <div className="mt-0.5 font-normal text-[11px] opacity-75">
                              {c.city} · {c.niche}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleRunCreatorJourney}
                      disabled={isRunningCreatorSim}
                      className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-violet-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-fuchsia-600/25 transition hover:opacity-95 disabled:opacity-50"
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                      {isRunningCreatorSim
                        ? 'Simulating Creator Flow...'
                        : 'Simulate Creator Onboarding'}
                    </button>
                  </div>
                </div>

                {/* 4-Stage Interactive Creator Pipeline Stepper */}
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {[
                    {
                      num: 1 as const,
                      code: 'STEP 01 · ONBOARDING',
                      title: 'AI Media Kit & Deal Radar',
                      sub: `${currentCreator.offers.length} Paid Invites Waiting`,
                    },
                    {
                      num: 2 as const,
                      code: 'STEP 02 · CO-CREATE',
                      title: '30s AI Script & Shot Copilot',
                      sub: `${completedShots.length}/4 Shots Checked`,
                    },
                    {
                      num: 3 as const,
                      code: 'STEP 03 · SAFE-GUARD',
                      title: '1-Click FTC & Audio Shield',
                      sub: creatorDraftMode === 'clean' ? 'FTC #ad Verified' : 'Auto-Fix Applied',
                    },
                    {
                      num: 4 as const,
                      code: 'STEP 04 · INSTANT WALLET',
                      title: 'Escrow Payout & Bonuses',
                      sub: `$${totalCampaignPayout} Earned`,
                    },
                  ].map((st) => {
                    const isCurrent = creatorStage === st.num;
                    return (
                      <button
                        key={st.num}
                        onClick={() => setCreatorStage(st.num)}
                        className={`group relative rounded-2xl border p-4 text-left transition-all ${
                          isCurrent
                            ? 'border-fuchsia-500/60 bg-fuchsia-950/30 shadow-lg shadow-fuchsia-950/30'
                            : 'border-white/10 bg-slate-950/70 hover:border-white/25'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span
                            className={
                              isCurrent ? 'text-fuchsia-300 font-bold' : 'text-slate-500'
                            }
                          >
                            {st.code}
                          </span>
                          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                            {st.sub}
                          </span>
                        </div>
                        <div className="mt-1.5 text-sm font-bold text-white">{st.title}</div>
                      </button>
                    );
                  })}
                </div>

                {/* Active Creator Stage Workspace Card */}
                <div className="rounded-3xl border border-white/15 bg-[#090912] p-6 sm:p-8 shadow-2xl">
                  <AnimatePresence mode="wait">
                    {/* CREATOR STEP 01: 60S ONBOARDING, AI MEDIA KIT & INBOUND DEAL RADAR */}
                    {creatorStage === 1 && (
                      <motion.div
                        key="creator-stage-1"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="grid gap-8 lg:grid-cols-12"
                      >
                        {/* Left: Instant OAuth Onboarding & AI-Extracted Creator DNA */}
                        <div className="space-y-5 lg:col-span-5">
                          <div className="border-b border-white/10 pb-4">
                            <span className="font-mono text-xs uppercase tracking-wider text-fuchsia-400">
                              01 · 60-Second OAuth Onboarding &amp; AI Media Kit
                            </span>
                            <h3 className="mt-1 text-2xl font-bold text-white">
                              {currentCreator.name} ({currentCreator.handle})
                            </h3>
                            <p className="mt-1 text-xs text-slate-400">
                              {currentCreator.city} · {currentCreator.niche}
                            </p>
                          </div>

                          {/* Connected Social Channels */}
                          <div className="flex flex-wrap gap-2 text-xs">
                            <span className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 font-mono text-emerald-300">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              TikTok Synced ({currentCreator.followers})
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 font-mono text-emerald-300">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              IG Reels Synced ({currentCreator.engRate} Eng)
                            </span>
                          </div>

                          {/* AI Neighborhood DNA Metrics */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                              <div className="text-xs text-slate-400">Local Neighborhood Reach</div>
                              <div className="mt-1 font-mono text-2xl font-bold text-fuchsia-300">
                                {currentCreator.localAudiencePct}%
                              </div>
                              <div className="mt-0.5 text-[11px] text-slate-500">
                                Within 15 mi of {currentCreator.city.split(',')[0]}
                              </div>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                              <div className="text-xs text-slate-400">Avg. Local Reel Views</div>
                              <div className="mt-1 font-mono text-2xl font-bold text-white">
                                {currentCreator.avgViews}
                              </div>
                              <div className="mt-0.5 text-[11px] text-emerald-400">
                                Top 8% Local Save Velocity
                              </div>
                            </div>
                          </div>

                          {/* AI Visual Voice Tags */}
                          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                              AI-Detected Content DNA (Auto-Builds Your Pitch)
                            </div>
                            <div className="mt-2.5 flex flex-wrap gap-2">
                              {currentCreator.styleTags.map((tag, i) => (
                                <span
                                  key={i}
                                  className="rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1 text-xs font-medium text-fuchsia-200"
                                >
                                  ✨ {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right: Inbound Paid Deal Radar (Zero Cold DMs) */}
                        <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-950 p-5 lg:col-span-7">
                          <div className="space-y-4">
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                              <div>
                                <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400">
                                  Inbound Deal Radar · Zero Cold DMs Required
                                </span>
                                <h4 className="text-lg font-bold text-white">
                                  3 Pre-Funded Local Invitations Waiting for You
                                </h4>
                              </div>
                              <span className="rounded-full bg-violet-500/20 px-3 py-1 font-mono text-xs font-semibold text-violet-200">
                                Escrow Pre-Funded
                              </span>
                            </div>

                            <div className="space-y-3">
                              {currentCreator.offers.map((off, idx) => {
                                const isSelected = selectedOfferIdx === idx;
                                return (
                                  <div
                                    key={off.id}
                                    onClick={() => setSelectedOfferIdx(idx)}
                                    className={`cursor-pointer rounded-2xl border p-4 transition ${
                                      isSelected
                                        ? 'border-fuchsia-500/60 bg-fuchsia-950/25 shadow-md'
                                        : 'border-white/10 bg-white/[0.02] hover:border-white/25'
                                    }`}
                                  >
                                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                                      <div>
                                        <div className="flex items-center gap-2">
                                          <span className="text-base font-bold text-white">
                                            {off.merchant}
                                          </span>
                                          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-300">
                                            {off.matchScore}% Fit
                                          </span>
                                        </div>
                                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                                          <span>📍 {off.distance}</span>
                                          <span>·</span>
                                          <span>{off.deliverable}</span>
                                        </div>
                                        <div className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-amber-500/10 px-2.5 py-1 text-[11px] font-medium text-amber-300">
                                          <Gift className="h-3.5 w-3.5" />
                                          <span>Free Perk: {off.perk}</span>
                                        </div>
                                      </div>

                                      <div className="text-left sm:text-right shrink-0">
                                        <div className="font-mono text-xl font-bold text-white">
                                          ${off.basePay}{' '}
                                          <span className="text-xs font-normal text-emerald-400">
                                            +${off.bonusPotential} bonus
                                          </span>
                                        </div>
                                        <div className="text-[11px] text-slate-400">
                                          30% (${Math.round(off.basePay * 0.3)}) paid on accept
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          <div className="mt-5 flex flex-col justify-between gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center">
                            <span className="text-xs text-slate-400">
                              Selected: <strong className="text-white">{activeOffer.merchant}</strong>
                            </span>
                            <button
                              onClick={() => setCreatorStage(2)}
                              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-violet-600 px-5 py-2.5 text-xs font-bold text-white transition hover:opacity-95"
                            >
                              <span>Accept Invite &amp; Open 30s Script Copilot</span>
                              <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* CREATOR STEP 02: 30S AI SCRIPT COPILOT & INTERACTIVE FILMING CHECKLIST */}
                    {creatorStage === 2 && (
                      <motion.div
                        key="creator-stage-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="grid gap-8 lg:grid-cols-12"
                      >
                        {/* Left: Voice Style Switcher & Personalized Hook Generator */}
                        <div className="space-y-5 lg:col-span-6">
                          <div>
                            <span className="font-mono text-xs uppercase tracking-wider text-fuchsia-400">
                              02 · AI Co-Creation Studio · {activeOffer.merchant}
                            </span>
                            <h3 className="mt-1 text-xl font-bold text-white">
                              Tailored to {currentCreator.handle}&apos;s Authentic Voice
                            </h3>
                            <p className="mt-1 text-xs text-slate-400">
                              Switch storytelling modes below—Bomie writes hooks that sound like you, never stiff corporate ads.
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {currentCreator.voiceStyles.map((vs) => (
                              <button
                                key={vs.id}
                                type="button"
                                onClick={() => setSelectedVoiceStyle(vs.id)}
                                className={`rounded-xl border px-3.5 py-2 text-xs font-semibold transition ${
                                  selectedVoiceStyle === vs.id
                                    ? 'border-fuchsia-500 bg-fuchsia-600 text-white'
                                    : 'border-white/10 bg-white/5 text-slate-300 hover:text-white'
                                }`}
                              >
                                {vs.label}
                              </button>
                            ))}
                          </div>

                          <div className="rounded-2xl border border-fuchsia-500/30 bg-fuchsia-950/20 p-5 space-y-3">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-mono uppercase text-fuchsia-300">
                                0–3s Spoken Opening Hook
                              </span>
                              <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-[10px] text-amber-300">
                                Est. 74% 3s Retention
                              </span>
                            </div>
                            <p className="text-base font-bold text-white leading-snug">
                              {activeVoice.hook}
                            </p>
                          </div>

                          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-mono text-slate-400">
                                Auto-Generated Compliant Caption &amp; Promo Code
                              </span>
                              <span className="font-mono text-emerald-400">
                                Code: {activeOffer.promoCode}
                              </span>
                            </div>
                            <p className="font-mono text-xs leading-relaxed text-slate-200">
                              {activeVoice.captionPreview}
                            </p>
                          </div>
                        </div>

                        {/* Right: Interactive 4-Beat On-Site Filming Checklist */}
                        <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-950 p-5 lg:col-span-6">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                              <div className="flex items-center gap-2">
                                <Camera className="h-4 w-4 text-fuchsia-400" />
                                <h4 className="text-base font-bold text-white">
                                  On-Location 30s Shot Checklist ({completedShots.length}/4 Ready)
                                </h4>
                              </div>
                              <span className="font-mono text-xs text-emerald-400">
                                30% Escrow Deposit Locked
                              </span>
                            </div>

                            <div className="space-y-2.5">
                              {currentCreator.shotChecklist.map((shot) => {
                                const done = completedShots.includes(shot.id);
                                return (
                                  <div
                                    key={shot.id}
                                    onClick={() => toggleShotCheck(shot.id)}
                                    className={`cursor-pointer rounded-xl border p-3.5 transition ${
                                      done
                                        ? 'border-emerald-500/30 bg-emerald-950/15'
                                        : 'border-white/10 bg-white/[0.02]'
                                    }`}
                                  >
                                    <div className="flex items-start gap-3">
                                      <div
                                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs ${
                                          done
                                            ? 'border-emerald-500 bg-emerald-500 text-slate-950'
                                            : 'border-white/30'
                                        }`}
                                      >
                                        {done && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                                      </div>
                                      <div className="text-xs">
                                        <div className="font-mono font-bold text-white">
                                          {shot.beat}
                                        </div>
                                        <div className="mt-0.5 text-slate-200">
                                          {shot.instruction}
                                        </div>
                                        <div className="mt-1 text-[11px] text-violet-300">
                                          💡 {shot.tip}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                            <span className="text-xs text-slate-400">
                              Next: Pre-Flight FTC &amp; Audio Shield
                            </span>
                            <button
                              onClick={() => setCreatorStage(3)}
                              className="inline-flex items-center gap-1.5 rounded-xl bg-fuchsia-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-fuchsia-500"
                            >
                              <span>Run Pre-Publish Check (Step 03)</span>
                              <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* CREATOR STEP 03: PRE-PUBLISH FTC & AUDIO SAFE-GUARD */}
                    {creatorStage === 3 && (
                      <motion.div
                        key="creator-stage-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-6"
                      >
                        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-4 sm:flex-row sm:items-center">
                          <div>
                            <span className="font-mono text-xs uppercase tracking-wider text-fuchsia-400">
                              03 · Creator Protection &amp; Pre-Publish FTC Shield
                            </span>
                            <h3 className="mt-1 text-xl font-bold text-white">
                              Zero Rejected Videos. Zero Delayed Payouts.
                            </h3>
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => setCreatorDraftMode('clean')}
                              className={`rounded-xl px-3.5 py-2 font-mono text-xs font-semibold transition ${
                                creatorDraftMode === 'clean'
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-white/5 text-slate-400 hover:text-white'
                              }`}
                            >
                              Test Clean Draft
                            </button>
                            <button
                              type="button"
                              onClick={() => setCreatorDraftMode('autofix')}
                              className={`rounded-xl px-3.5 py-2 font-mono text-xs font-semibold transition ${
                                creatorDraftMode === 'autofix'
                                  ? 'bg-amber-500 text-slate-950'
                                  : 'bg-white/5 text-slate-400 hover:text-white'
                              }`}
                            >
                              Test Missing #ad Auto-Fix
                            </button>
                          </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">
                          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/15 p-5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-white">FTC 16 CFR Part 255</span>
                              <ShieldCheck className="h-4 w-4 text-emerald-400" />
                            </div>
                            <div className="mt-2 font-mono text-xs font-semibold text-emerald-300">
                              {creatorDraftMode === 'clean'
                                ? '✓ #ad & #sponsored Verified in First Line'
                                : '⚡ Auto-Prepended #ad Disclosure to Caption'}
                            </div>
                            <p className="mt-2 text-xs text-slate-400">
                              Protects your creator account from algorithmic suppression and ensures instant escrow release.
                            </p>
                          </div>

                          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/15 p-5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-white">Commercial Audio Check</span>
                              <Music className="h-4 w-4 text-violet-400" />
                            </div>
                            <div className="mt-2 font-mono text-xs font-semibold text-emerald-300">
                              ✓ Cleared for Brand Reposting &amp; Spark Ads
                            </div>
                            <p className="mt-2 text-xs text-slate-400">
                              Verifies your background audio is licensed for commercial merchant whitelisting.
                            </p>
                          </div>

                          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/15 p-5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-white">40% Draft Escrow Unlock</span>
                              <Lock className="h-4 w-4 text-amber-400" />
                            </div>
                            <div className="mt-2 font-mono text-xs font-semibold text-amber-300">
                              ✓ +${Math.round(activeOffer.basePay * 0.4)} Released on Draft Approval
                            </div>
                            <p className="mt-2 text-xs text-slate-400">
                              70% of your base pay is already in your wallet before your post even goes live.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950 p-5">
                          <div className="text-xs text-slate-300">
                            <span className="font-bold text-emerald-400">Pre-Flight Passed:</span>{' '}
                            Your video is 100% protected against merchant disputes.
                          </div>
                          <button
                            onClick={() => setCreatorStage(4)}
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-violet-600 px-5 py-2.5 text-xs font-bold text-white transition hover:opacity-95"
                          >
                            <span>Publish &amp; View Instant Wallet (Step 04)</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* CREATOR STEP 04: LIVE EARNINGS SIMULATOR & INSTANT ESCROW WALLET */}
                    {creatorStage === 4 && (
                      <motion.div
                        key="creator-stage-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="grid gap-8 lg:grid-cols-12"
                      >
                        {/* Left: Creator Base + Viral Bonus Simulator */}
                        <div className="space-y-5 lg:col-span-7">
                          <div>
                            <span className="font-mono text-xs uppercase tracking-wider text-fuchsia-400">
                              04 · Creator Earnings &amp; Performance Bonus Simulator
                            </span>
                            <h3 className="mt-1 text-xl font-bold text-white">
                              Guaranteed Base Pay + Uncapped Local Walk-In Bonuses
                            </h3>
                          </div>

                          <div className="grid grid-cols-3 gap-3">
                            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                              <div className="text-[11px] text-slate-400">Guaranteed Base</div>
                              <div className="mt-1 font-mono text-2xl font-bold text-white">
                                ${activeOffer.basePay}
                              </div>
                              <div className="text-[10px] text-emerald-400">100% Escrow Backed</div>
                            </div>
                            <div className="rounded-2xl border border-fuchsia-500/30 bg-fuchsia-500/10 p-4">
                              <div className="text-[11px] text-fuchsia-200">Performance Bonus</div>
                              <div className="mt-1 font-mono text-2xl font-bold text-fuchsia-300">
                                +${totalCreatorBonus}
                              </div>
                              <div className="text-[10px] text-fuchsia-200/80">
                                Views + QR Redemptions
                              </div>
                            </div>
                            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/15 p-4">
                              <div className="text-[11px] text-emerald-200">Total You Earn</div>
                              <div className="mt-1 font-mono text-2xl font-bold text-emerald-300">
                                ${totalCampaignPayout}
                              </div>
                              <div className="text-[10px] text-emerald-200/80">
                                + {activeOffer.perk}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-xs">
                            <div className="flex items-center gap-2 font-mono text-slate-300">
                              <Sliders className="h-4 w-4 text-fuchsia-400" />
                              <span>Drag Sliders to See How Local Views &amp; Scans Boost Your Payout</span>
                            </div>

                            <div>
                              <div className="mb-1 flex justify-between">
                                <span className="text-slate-400">
                                  Your Video Views (TikTok + IG Reels)
                                </span>
                                <span className="font-mono font-bold text-white">
                                  {creatorSimViews.toLocaleString()} views
                                </span>
                              </div>
                              <input
                                type="range"
                                min={5000}
                                max={120000}
                                step={1000}
                                value={creatorSimViews}
                                onChange={(e) => setCreatorSimViews(Number(e.target.value))}
                                className="w-full accent-fuchsia-500"
                              />
                            </div>

                            <div>
                              <div className="mb-1 flex justify-between">
                                <span className="text-slate-400">
                                  In-Store Code ({activeOffer.promoCode}) Redemptions
                                </span>
                                <span className="font-mono font-bold text-white">
                                  {creatorSimRedemptions} walk-ins (+$3/ea bonus)
                                </span>
                              </div>
                              <input
                                type="range"
                                min={5}
                                max={90}
                                step={1}
                                value={creatorSimRedemptions}
                                onChange={(e) => setCreatorSimRedemptions(Number(e.target.value))}
                                className="w-full accent-fuchsia-500"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Right: Instant Creator Wallet & Repeat Ambassador Unlock */}
                        <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-950 p-5 lg:col-span-5">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                              <div className="flex items-center gap-2">
                                <Wallet className="h-4 w-4 text-emerald-400" />
                                <h4 className="text-base font-bold text-white">
                                  Bomie Creator Escrow Wallet
                                </h4>
                              </div>
                              <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-300">
                                Zero Invoice Chasing
                              </span>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-950/60 via-slate-900 to-fuchsia-950/60 p-5">
                              <div className="text-xs text-slate-300">Available for Instant Payout</div>
                              <div className="mt-1 font-mono text-3xl font-extrabold text-white">
                                ${(currentCreator.walletBalance + totalCampaignPayout).toLocaleString()}.00
                              </div>
                              <div className="mt-2 text-[11px] text-emerald-300">
                                Includes ${totalCampaignPayout} from {activeOffer.merchant}
                              </div>

                              <button
                                type="button"
                                onClick={() => setWithdrawnSuccess(true)}
                                className="mt-4 w-full rounded-xl bg-white py-3 text-xs font-bold text-slate-950 shadow-md transition hover:bg-slate-200"
                              >
                                {withdrawnSuccess
                                  ? '✓ Instant Transfer Sent to Stripe / Venmo ($0 Fee)'
                                  : 'Instant Cash Out to Stripe / Venmo ($0 Fee)'}
                              </button>
                            </div>

                            {/* Brand Loop / Repeat Retainer Unlock */}
                            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs">
                              <div className="flex items-center gap-2 font-bold text-amber-300">
                                <Award className="h-4 w-4" />
                                <span>Repeat Brand Ambassador Unlocked!</span>
                              </div>
                              <p className="mt-1 text-slate-200 leading-relaxed">
                                Because your post drove {creatorSimRedemptions} walk-ins,{' '}
                                <strong>{activeOffer.merchant}</strong> unlocked an automatic{' '}
                                <strong>${activeOffer.basePay}/mo recurring retainer</strong> invite in your inbox.
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
                            <span className="text-slate-400">Ready to get matched in your city?</span>
                            <a
                              href="mailto:lucian.wang@bomie.ai?subject=Creator%20Early%20Access"
                              className="font-semibold text-fuchsia-300 underline hover:text-white"
                            >
                              Claim Creator Handle →
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Commerce OS - Interactive Glowing Bento Grid */}
      <section id="os" className="border-t border-white/10 py-24 scroll-mt-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="text-sm font-semibold uppercase tracking-wider text-violet-400">
                Commerce OS
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need to run local creator campaigns on autopilot
              </h2>
            </div>
            <p className="text-xs font-mono text-slate-400">
              Click any OS module to test it live in the sandbox &uarr;
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-6">
            <motion.div
              onClick={() => jumpToOsStage('business', 1)}
              whileHover={{ y: -4, borderColor: 'rgba(139, 92, 246, 0.5)' }}
              className="group cursor-pointer rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8 transition-colors md:col-span-3"
            >
              <div className="flex items-center justify-between">
                <Zap className="h-8 w-8 text-violet-400" />
                <span className="font-mono text-xs text-violet-400 opacity-0 transition group-hover:opacity-100">
                  Try in Stage 01 &rarr;
                </span>
              </div>
              <h3 className="mt-4 text-xl font-bold">1. Smart Matching</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Connect local businesses with the most relevant creators based on product category,
                neighborhood audience, and visual style fit.
              </p>
            </motion.div>

            <motion.div
              onClick={() => jumpToOsStage('business', 3)}
              whileHover={{ y: -4, borderColor: 'rgba(217, 70, 239, 0.5)' }}
              className="group cursor-pointer rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8 transition-colors md:col-span-3"
            >
              <div className="flex items-center justify-between">
                <Layers className="h-8 w-8 text-fuchsia-400" />
                <span className="font-mono text-xs text-fuchsia-400 opacity-0 transition group-hover:opacity-100">
                  Try in Stage 03 &rarr;
                </span>
              </div>
              <h3 className="mt-4 text-xl font-bold">2. Campaign Studio</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Design campaign briefs, generate 30s A/B video hooks, approve drafts, and enforce FTC
                compliance — all in one unified workspace.
              </p>
            </motion.div>

            <motion.div
              onClick={() => jumpToOsStage('business', 4)}
              whileHover={{ y: -4, borderColor: 'rgba(251, 191, 36, 0.4)' }}
              className="group cursor-pointer rounded-3xl border border-white/10 bg-slate-950 p-7 transition-colors md:col-span-2"
            >
              <div className="flex items-center justify-between">
                <BarChart3 className="h-7 w-7 text-amber-400" />
                <span className="font-mono text-xs text-amber-400 opacity-0 transition group-hover:opacity-100">
                  Try ROI Sim &rarr;
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold">3. Business Boost</h3>
              <p className="mt-2 text-sm text-slate-400">
                Gain visibility across TikTok, Instagram, and Shorts with live conversion data and
                in-store QR voucher plug-ins.
              </p>
            </motion.div>

            <motion.div
              onClick={() => jumpToOsStage('creator', 4)}
              whileHover={{ y: -4, borderColor: 'rgba(52, 211, 153, 0.4)' }}
              className="group cursor-pointer rounded-3xl border border-white/10 bg-slate-950 p-7 transition-colors md:col-span-2"
            >
              <div className="flex items-center justify-between">
                <Gift className="h-7 w-7 text-emerald-400" />
                <span className="font-mono text-xs text-emerald-400 opacity-0 transition group-hover:opacity-100">
                  Try Creator Wallet &rarr;
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold">4. Creative Rewards</h3>
              <p className="mt-2 text-sm text-slate-400">
                Incentivize creators based on reach, engagement, or sales — auto-triggering 30/40/30
                escrow milestones and product drops.
              </p>
            </motion.div>

            <motion.div
              onClick={() => jumpToOsStage('creator', 1)}
              whileHover={{ y: -4, borderColor: 'rgba(56, 189, 248, 0.4)' }}
              className="group cursor-pointer rounded-3xl border border-white/10 bg-slate-950 p-7 transition-colors md:col-span-2"
            >
              <div className="flex items-center justify-between">
                <Repeat className="h-7 w-7 text-sky-400" />
                <span className="font-mono text-xs text-sky-400 opacity-0 transition group-hover:opacity-100">
                  Try Creator Radar &rarr;
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold">5. Brand Loop</h3>
              <p className="mt-2 text-sm text-slate-400">
                Turn top-performing creators into long-term brand ambassadors with repeat
                dashboards and exclusive perks.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="stories" className="border-t border-white/10 bg-slate-900/20 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Trusted by Local Businesses
            </h2>
            <p className="mt-3 text-slate-400">
              Real stories from founders turning neighborhood creators into steady revenue.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {testimonials.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className="flex flex-col justify-between rounded-3xl border border-white/10 bg-slate-950 p-7"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                    <span className="ml-2 text-xs font-semibold text-slate-300">5.0</span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-300">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>
                <div className="mt-6 border-t border-white/10 pt-4">
                  <div className="font-semibold text-white">{item.name}</div>
                  <div className="text-xs text-slate-400">{item.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Smooth Animated FAQ Accordion */}
      <section id="faq" className="border-t border-white/10 py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
            <p className="mt-3 text-slate-400">
              Everything you need to know about launching or creating on Bomie.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left font-semibold text-white transition hover:bg-white/5"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="border-t border-white/5 px-6 py-4 text-sm leading-relaxed text-slate-400">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="relative overflow-hidden rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-950 via-slate-900 to-fuchsia-950 px-8 py-16 text-center shadow-2xl"
          >
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
              Where Local Meets Viral
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-slate-300">
              Join hundreds of local businesses and creators building authentic community growth
              on Bomie AI.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                onClick={() => setShowFullStudioModal(true)}
                className="w-full rounded-2xl bg-white px-8 py-4 text-sm font-bold text-slate-950 shadow-lg transition hover:bg-slate-200 sm:w-auto"
              >
                Launch Interactive V5 Studio
              </button>
              <a
                href="#how-it-works"
                onClick={() => setActiveTab('creator')}
                className="w-full rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20 sm:w-auto"
              >
                Explore Creator Copilot
              </a>
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg rounded-3xl border border-white/15 bg-[#0b0b14] p-7 shadow-2xl"
            >
              <button
                onClick={() => setShowDemoModal(false)}
                className="absolute top-5 right-5 rounded-lg border border-white/10 p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              {demoSubmitted ? (
                <div className="py-6 text-center space-y-4">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Demo Request Confirmed!</h3>
                  <p className="text-sm text-slate-400">
                    Our founding team at Bomie AI will reach out within 24 hours to walk you through a custom campaign for your city.
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => {
                        setShowDemoModal(false);
                        setShowFullStudioModal(true);
                      }}
                      className="rounded-xl bg-violet-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-violet-500"
                    >
                      Try Live V5 Studio Right Now &rarr;
                    </button>
                    <button
                      onClick={() => setShowDemoModal(false)}
                      className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-semibold text-slate-300"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setDemoSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-violet-400">
                      1-on-1 Founder Walkthrough
                    </span>
                    <h3 className="mt-1 text-2xl font-bold text-white">
                      Book a Live Bomie AI Demo
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      See how we match your store with high-converting local creators in under 5 minutes.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Chen"
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-violet-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@yourbusiness.com"
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-violet-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Business / Creator Handle *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Sichuan Bistro SF"
                        className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-violet-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        City / Region *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="San Francisco, CA"
                        className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-violet-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/25 transition hover:opacity-95"
                    >
                      Schedule My 15-Min Demo
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowDemoModal(false);
                        setShowFullStudioModal(true);
                      }}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 text-xs font-semibold text-violet-300 hover:bg-white/10"
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md rounded-3xl border border-white/15 bg-[#0b0b14] p-7 shadow-2xl space-y-5"
            >
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-5 right-5 rounded-lg border border-white/10 p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-amber-400 font-extrabold text-white">
                  B
                </div>
                <h3 className="text-xl font-bold text-white">Welcome back to Bomie AI</h3>
                <p className="mt-1 text-xs text-slate-400">
                  Select your workspace portal to sign in
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 rounded-xl border border-white/10 bg-slate-950 p-1">
                <button
                  type="button"
                  onClick={() => setLoginRole('merchant')}
                  className={`rounded-lg py-2 text-xs font-semibold transition ${
                    loginRole === 'merchant'
                      ? 'bg-violet-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Merchant OS
                </button>
                <button
                  type="button"
                  onClick={() => setLoginRole('creator')}
                  className={`rounded-lg py-2 text-xs font-semibold transition ${
                    loginRole === 'creator'
                      ? 'bg-fuchsia-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Creator Copilot
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowLoginModal(false);
                  setActiveTab(loginRole === 'merchant' ? 'business' : 'creator');
                  const el = document.getElementById('how-it-works');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="space-y-3.5"
              >
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder={
                      loginRole === 'merchant' ? 'founder@localstore.com' : 'creator@tiktok.com'
                    }
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-violet-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-violet-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full rounded-xl py-3 text-sm font-bold text-white transition ${
                    loginRole === 'merchant'
                      ? 'bg-violet-600 hover:bg-violet-500'
                      : 'bg-fuchsia-600 hover:bg-fuchsia-500'
                  }`}
                >
                  Sign In to {loginRole === 'merchant' ? 'Merchant OS' : 'Creator Copilot'}
                </button>
              </form>

              <div className="border-t border-white/10 pt-4 text-center text-xs text-slate-400">
                Don&apos;t have an invite code yet?{' '}
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

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 text-center text-sm text-slate-500">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="flex items-center gap-2 font-semibold text-slate-300">
            <ShieldCheck className="h-4 w-4 text-violet-400" />
            <span>© 2026 BOMIES LLC. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-slate-300">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-slate-300">
              Terms of Service
            </a>
            <a href="mailto:lucian.wang@bomie.ai" className="hover:text-slate-300">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
