export type GateStatus = 'PASS' | 'FLAGGED' | 'MISMATCH';

export interface DemoPreset {
  id: 'clean' | 'high-risk' | 'mismatch';
  badge: string;
  title: string;
  subtitle: string;
  businessName: string;
  city: string;
  category: string;
  budget: number;
  timelineDays: number;
  targetTier: string;
  brief: string;
}

export interface RiskFinding {
  code: string;
  severity: 'Low' | 'Moderate' | 'Critical';
  rule: string;
  detail: string;
}

export interface AgentVerdict {
  agent: string;
  role: string;
  status: 'PASS' | 'WARN' | 'BLOCK';
  note: string;
}

export interface DemoCreatorMatch {
  id: string;
  handle: string;
  niche: string;
  distance: string;
  followers: string;
  localShare: string;
  engagement: string;
  matchPct: number;
  payout: number;
  qrCode: string;
}

export interface DemoEvaluationResult {
  businessName: string;
  city: string;
  category: string;
  budget: number;
  timelineDays: number;
  gateStatus: GateStatus;
  riskScore: number;
  readinessScore: number;
  verdictTitle: string;
  verdictSummary: string;
  findings: RiskFinding[];
  agentDebate: AgentVerdict[];
  recommendedFix?: {
    buttonLabel: string;
    fixedBrief: string;
    fixedBudget: number;
    fixedTargetTier: string;
    summary: string;
  };
  creators: DemoCreatorMatch[];
  scriptHook: string;
  shotList: { timestamp: string; visual: string; audio: string }[];
  projectedVisits: number;
  projectedRoas: string;
  escrowBreakdown: {
    platformFee: number;
    milestone1: number;
    milestone2: number;
    milestone3: number;
  };
  aiEngine: 'gemini-live' | 'bomie-policy-engine';
}

export const DEMO_PRESETS: DemoPreset[] = [
  {
    id: 'clean',
    badge: 'Preset 1: Clean & Ready',
    title: 'Sichuan Bistro SF (San Francisco, CA)',
    subtitle: 'Compliant local dining promo with realistic micro-creator unit economics.',
    businessName: 'Sichuan Bistro SF',
    city: 'San Francisco, CA',
    category: 'Local Dining',
    budget: 1800,
    timelineDays: 5,
    targetTier: '2K–50K Local Food Creators (0.5–10 mi)',
    brief:
      'Launch weekend chili-oil tasting menu at our Mission District dining room. Match 3 SF food creators (10K–40K followers, >70% local audience) for 30s Reels with #ad disclosure, licensed audio, unique dine-in QR voucher (20% off appetizers), and 30/40/30 Stripe milestone escrow.',
  },
  {
    id: 'high-risk',
    badge: 'Preset 2: High-Risk / Flagged',
    title: 'GlowMed Aesthetics (Bellevue, WA)',
    subtitle: 'Unsubstantiated medical efficacy claim combined with no-contract cash terms.',
    businessName: 'GlowMed Aesthetics',
    city: 'Bellevue, WA',
    category: 'Med-Spa & Aesthetics',
    budget: 800,
    timelineDays: 2,
    targetTier: '5K–30K Local Beauty Creators',
    brief:
      'Pay $800 cash at the door (no contract, no #ad tag so it looks organic) for creators to claim our laser facial permanently cures acne scars and reverses aging in 48 hours. Use trending TikTok pop audio.',
  },
  {
    id: 'mismatch',
    badge: 'Preset 3: Scope Mismatch',
    title: 'BayArea Boba Lab (Berkeley, CA)',
    subtitle: 'Severe budget-to-tier mismatch ($50 per 500K+ creator for 3-min YouTube doc).',
    businessName: 'BayArea Boba Lab',
    city: 'Berkeley, CA',
    category: 'Cafe & Beverage',
    budget: 150,
    timelineDays: 2,
    targetTier: '500K+ Macro YouTube Creators',
    brief:
      'Offer $50 per creator (plus 1 free boba) to 3 macro YouTube creators with 500K+ subscribers to film and edit a custom 3-minute mini-documentary in Berkeley within 48 hours.',
  },
];

export function evaluateCampaignDemo(input: {
  businessName: string;
  city: string;
  category: string;
  budget: number;
  timelineDays: number;
  targetTier?: string;
  brief: string;
}): DemoEvaluationResult {
  const businessName = input.businessName.trim() || 'Neighborhood Storefront';
  const city = input.city.trim() || 'San Francisco, CA';
  const category = input.category.trim() || 'Local Business';
  const budget = Math.max(50, Math.min(25000, Number(input.budget) || 1800));
  const timelineDays = Math.max(1, Math.min(60, Number(input.timelineDays) || 5));
  const targetTier = input.targetTier?.trim() || '2K–50K Local Creators';
  const brief = input.brief.trim();
  const lower = `${brief} ${category} ${targetTier}`.toLowerCase();

  const hasHiddenAd =
    lower.includes('no #ad') ||
    lower.includes('without #ad') ||
    lower.includes('look organic') ||
    lower.includes('looks organic') ||
    lower.includes('no disclosure') ||
    lower.includes('skip disclosure');

  const hasMedicalClaim =
    !lower.includes('no unsubstantiated claims') &&
    (lower.includes('permanently cure') ||
      (lower.includes('permanent cure') && !lower.includes('no permanent cure')) ||
      lower.includes('cures acne') ||
      lower.includes('reverse aging') ||
      lower.includes('reverses aging') ||
      lower.includes('100% effective') ||
      lower.includes('fda-approved cure') ||
      lower.includes('guaranteed weight loss'));

  const hasCashNoContract =
    lower.includes('no contract') ||
    lower.includes('cash at the door') ||
    lower.includes('under the table') ||
    lower.includes('venmo after');

  const hasAudioRisk =
    lower.includes('trending tiktok') ||
    lower.includes('popular song') ||
    lower.includes('billboard') ||
    lower.includes('commercial pop');

  const isMacroScopeMismatch =
    ((lower.includes('500k') || lower.includes('macro') || lower.includes('3-min') || lower.includes('3-minute') || lower.includes('documentary')) &&
      budget < 1200) ||
    budget < 300;

  const creators: DemoCreatorMatch[] = lower.includes('spa') || lower.includes('med') || lower.includes('aesthetic')
    ? [
        {
          id: 'c1',
          handle: '@bellevue_glow',
          niche: 'Skincare & Wellness',
          distance: '0.9 mi',
          followers: '24.6K',
          localShare: '78% Seattle-Bellevue',
          engagement: '5.4%',
          matchPct: 96,
          payout: Math.round(budget * 0.4),
          qrCode: 'GLOW-BEL-01',
        },
        {
          id: 'c2',
          handle: '@pnw_selfcare',
          niche: 'Local Clinics & Spas',
          distance: '1.6 mi',
          followers: '16.2K',
          localShare: '82% Eastside WA',
          engagement: '6.1%',
          matchPct: 94,
          payout: Math.round(budget * 0.33),
          qrCode: 'GLOW-BEL-02',
        },
        {
          id: 'c3',
          handle: '@eastside_beauty_notes',
          niche: 'Dermatology-Safe Reviews',
          distance: '2.3 mi',
          followers: '11.4K',
          localShare: '74% Bellevue WA',
          engagement: '5.8%',
          matchPct: 91,
          payout: budget - Math.round(budget * 0.4) - Math.round(budget * 0.33),
          qrCode: 'GLOW-BEL-03',
        },
      ]
    : lower.includes('boba') || lower.includes('cafe') || lower.includes('berkeley') || lower.includes('coffee')
      ? [
          {
            id: 'c1',
            handle: '@cal_foodie_diaries',
            niche: 'UC Berkeley Eats & Drinks',
            distance: '0.4 mi',
            followers: '18.9K',
            localShare: '85% Berkeley / Oakland',
            engagement: '6.4%',
            matchPct: 97,
            payout: Math.round(budget * 0.4),
            qrCode: 'BOBA-BK-01',
          },
          {
            id: 'c2',
            handle: '@eastbay_sip_spots',
            niche: 'Cafe Culture & Study Spots',
            distance: '1.1 mi',
            followers: '12.3K',
            localShare: '79% East Bay',
            engagement: '5.7%',
            matchPct: 93,
            payout: Math.round(budget * 0.33),
            qrCode: 'BOBA-BK-02',
          },
          {
            id: 'c3',
            handle: '@telegraph_bites',
            niche: 'Campus Weekend Guides',
            distance: '0.7 mi',
            followers: '8.8K',
            localShare: '88% Berkeley',
            engagement: '7.1%',
            matchPct: 92,
            payout: budget - Math.round(budget * 0.4) - Math.round(budget * 0.33),
            qrCode: 'BOBA-BK-03',
          },
        ]
      : [
          {
            id: 'c1',
            handle: '@mission_bites_sf',
            niche: 'Neighborhood Dining',
            distance: '0.6 mi',
            followers: '31.4K',
            localShare: '76% San Francisco',
            engagement: '5.5%',
            matchPct: 98,
            payout: Math.round(budget * 0.4),
            qrCode: 'SB-SF-01',
          },
          {
            id: 'c2',
            handle: '@sf_weekend_tables',
            niche: 'Hidden Kitchens & Date Spots',
            distance: '1.3 mi',
            followers: '22.1K',
            localShare: '73% SF Bay Area',
            engagement: '5.1%',
            matchPct: 95,
            payout: Math.round(budget * 0.33),
            qrCode: 'SB-SF-02',
          },
          {
            id: 'c3',
            handle: '@sffoodloop',
            niche: 'Authentic Eats',
            distance: '1.9 mi',
            followers: '14.7K',
            localShare: '81% San Francisco',
            engagement: '6.0%',
            matchPct: 93,
            payout: budget - Math.round(budget * 0.4) - Math.round(budget * 0.33),
            qrCode: 'SB-SF-03',
          },
        ];

  const baseShotVisual = lower.includes('spa')
    ? 'Clean clinic interior, treatment room walkthrough, consultation experience'
    : lower.includes('boba')
      ? 'Fresh brown-sugar boba pour, store exterior sign, student line-up'
      : 'Sizzling hero dish close-up, Mission District storefront exterior, lively table pour';

  const cityShort = city.split(',')[0];
  const m1 = Math.round(budget * 0.3);
  const m2 = Math.round(budget * 0.4);
  const m3 = budget - m1 - m2;

  if (hasHiddenAd || hasMedicalClaim || hasCashNoContract) {
    const findings: RiskFinding[] = [];
    if (hasHiddenAd) {
      findings.push({
        code: 'FTC-255-DISC',
        severity: 'Critical',
        rule: 'FTC 16 CFR Part 255 (§ 255.5)',
        detail:
          'Prompt omits or prohibits #ad / Paid Partnership disclosure. Even complimentary services or cash fees require visible in-video + caption disclosure (statutory civil penalty exposure >$50K/violation).',
      });
    }
    if (hasMedicalClaim) {
      findings.push({
        code: 'MED-EFF-CLAIM',
        severity: 'Critical',
        rule: 'FTC Substantiation & Health Claims',
        detail:
          'Claims such as "permanently cures acne scars" or "reverses aging in 48 hours" trigger strict substantiation & deceptive medical claim liability.',
      });
    }
    if (hasCashNoContract) {
      findings.push({
        code: 'ESCROW-GOV-01',
        severity: 'Critical',
        rule: 'Milestone & Tax Compliance Gate',
        detail:
          'Uncontracted cash-at-the-door payout bypasses Stripe escrow protection, deliverable verification, and tax documentation.',
      });
    }
    if (hasAudioRisk) {
      findings.push({
        code: 'AUDIO-COPY-02',
        severity: 'Moderate',
        rule: 'Commercial Audio Rights',
        detail:
          'Trending consumer pop audio cannot be used in paid commercial creator deliverables without commercial licensing.',
      });
    }

    return {
      businessName,
      city,
      category,
      budget,
      timelineDays,
      gateStatus: 'FLAGGED',
      riskScore: 86,
      readinessScore: 28,
      verdictTitle: 'BLOCKED BY PRE-FLIGHT COMPLIANCE GATE',
      verdictSummary:
        'Multi-agent audit halted campaign dispatch due to critical FTC 16 CFR Part 255 disclosure violations, unsubstantiated medical claims, and off-platform cash terms.',
      findings,
      agentDebate: [
        {
          agent: 'FTC Governance Agent',
          role: '16 CFR Part 255 & Health Claims',
          status: 'BLOCK',
          note: 'Blocked: Requires explicit on-screen + caption #ad disclosure and removal of permanent cure claims.',
        },
        {
          agent: 'Rights & Audio Agent',
          role: 'Commercial Licensing Check',
          status: hasAudioRisk ? 'WARN' : 'PASS',
          note: hasAudioRisk
            ? 'Replace trending consumer audio with TikTok/IG Commercial Music Library or original voiceover.'
            : 'Audio posture clear.',
        },
        {
          agent: 'Escrow & Pricing Agent',
          role: 'Unit Economics & Payout Guard',
          status: hasCashNoContract ? 'BLOCK' : 'PASS',
          note: 'Enforce 30/40/30 Stripe milestone escrow instead of uncontracted cash payments.',
        },
      ],
      recommendedFix: {
        buttonLabel: 'Apply AI Compliance Fix & Re-Run Gate',
        fixedBudget: Math.max(budget, 1200),
        fixedTargetTier: '5K–30K Local Beauty Creators (0.5–10 mi)',
        fixedBrief: `Promote facial consultations at ${businessName} in ${cityShort}. Match 3 local beauty creators (5K–30K) for 30s honest experience Reels with clear on-screen + caption #ad disclosure, factual consultation walkthrough (no unsubstantiated claims), royalty-free commercial audio, tracked QR consultation voucher, and 30/40/30 Stripe milestone escrow.`,
        summary:
          'Rewrites brief to comply with FTC 16 CFR § 255.5, removes medical cure claims, switches to licensed audio, and enables 30/40/30 Stripe escrow.',
      },
      creators,
      scriptHook: `#Ad | Honest visit to ${businessName} in ${cityShort} — scan QR code {QR} to book your introductory skin consultation.`,
      shotList: [
        { timestamp: '0–3s', visual: baseShotVisual, audio: '#Ad on-screen badge + authentic voiceover hook' },
        { timestamp: '3–18s', visual: 'Licensed practitioner consultation & treatment steps (factual only)', audio: 'Original voiceover (commercial-safe audio bed)' },
        { timestamp: '18–30s', visual: 'Clear booking QR code overlay & clinic location pin', audio: 'Show unique QR voucher at reception for your guest perk' },
      ],
      projectedVisits: Math.round((budget / 18) * 1.1),
      projectedRoas: '3.4×',
      escrowBreakdown: { platformFee: 0, milestone1: m1, milestone2: m2, milestone3: m3 },
      aiEngine: 'bomie-policy-engine',
    };
  }

  if (isMacroScopeMismatch) {
    return {
      businessName,
      city,
      category,
      budget,
      timelineDays,
      gateStatus: 'MISMATCH',
      riskScore: 64,
      readinessScore: 44,
      verdictTitle: 'FLAGGED · SEVERE SCOPE & BUDGET MISMATCH',
      verdictSummary: `Forecasted creator acceptance is <2%: offering $${Math.round(budget / 3)} per 500K+ macro creator for a 3-minute documentary inside ${timelineDays} days is economically unviable for neighborhood foot traffic.`,
      findings: [
        {
          code: 'ECON-TIER-01',
          severity: 'Critical',
          rule: 'Creator Market Rate vs. Budget',
          detail: `Macro YouTube creators (500K+) command $3,500–$12,000+ for 3-minute custom features—your $${budget} total budget yields <2% acceptance.`,
        },
        {
          code: 'GEO-DENSITY-02',
          severity: 'Moderate',
          rule: 'Catchment Area Leakage',
          detail: `National 500K+ audiences typically have <8% local ${cityShort} residents, wasting budget on out-of-market viewers.`,
        },
      ],
      agentDebate: [
        {
          agent: 'Unit Economics Agent',
          role: 'Pricing & Acceptance Forecast',
          status: 'BLOCK',
          note: `Re-scope deliverables from 3-min YouTube docs to 30s local Reels/TikToks and shift from 500K+ macro to 8K–25K campus/neighborhood creators.`,
        },
        {
          agent: 'Geo-Attribution Agent',
          role: 'Foot-Traffic Radius Check',
          status: 'WARN',
          note: `8K–25K creators in ${cityShort} deliver ~80%+ local reach vs <8% for national channels.`,
        },
        {
          agent: 'FTC Governance Agent',
          role: '16 CFR Part 255 Check',
          status: 'PASS',
          note: 'Auto-attaches #ad + QR drink voucher template once budget & tier align.',
        },
      ],
      recommendedFix: {
        buttonLabel: 'Optimize to $900 Local 2K–25K Cohort & Re-Run',
        fixedBudget: 900,
        fixedTargetTier: '5K–25K Campus & Neighborhood Creators (0.5–3 mi)',
        fixedBrief: `Promote signature drinks at ${businessName} in ${cityShort}. Match 3 hyper-local campus/foodie creators (8K–25K followers within 2 mi) for 30s vertical Reels ($300 each + complimentary tasting), clear #ad disclosure, tracked student QR voucher, 5-day turnaround, and 30/40/30 Stripe milestone escrow.`,
        summary:
          'Shifts target from national 500K+ YouTubers to 3 dense local creators (8K–25K), sets $300/creator fair pay, and unlocks 94% match readiness.',
      },
      creators,
      scriptHook: `#Ad | Found the newest boba spot near campus in ${cityShort} — scan {QR} for our neighborhood tasting deal.`,
      shotList: [
        { timestamp: '0–3s', visual: baseShotVisual, audio: 'Fast campus hook + #Ad disclosure badge' },
        { timestamp: '3–18s', visual: 'Top 3 signature drinks + cozy store seating vibes', audio: 'Flavor breakdown + neighborhood walkability cue' },
        { timestamp: '18–30s', visual: 'Unique tracked QR voucher code on cup & screen', audio: 'Scan {QR} at counter for exclusive local offer' },
      ],
      projectedVisits: Math.round(budget / 14),
      projectedRoas: '1.1× (Unoptimized)',
      escrowBreakdown: { platformFee: 0, milestone1: m1, milestone2: m2, milestone3: m3 },
      aiEngine: 'bomie-policy-engine',
    };
  }

  // Clean & Ready PASS state
  const projectedVisits = Math.round(budget / 15);
  return {
    businessName,
    city,
    category,
    budget,
    timelineDays,
    gateStatus: 'PASS',
    riskScore: 14,
    readinessScore: 96,
    verdictTitle: 'PASSED · READY FOR AUTONOMOUS DISPATCH',
    verdictSummary: `All 3 governance agents cleared ${businessName}. FTC 16 CFR Part 255 disclosure, commercial audio rights, neighborhood radius (${cityShort}), and 30/40/30 Stripe milestone escrow are locked.`,
    findings: [
      {
        code: 'FTC-255-OK',
        severity: 'Low',
        rule: 'FTC 16 CFR Part 255 (§ 255.5)',
        detail: 'On-screen + caption #ad disclosure automatically enforced prior to Milestone 2 payout.',
      },
      {
        code: 'ECON-FIT-OK',
        severity: 'Low',
        rule: 'Hyper-Local Unit Economics',
        detail: `$${Math.round(budget / 3)} avg creator budget aligns cleanly with 2K–50K local creator market rates (>92% acceptance probability).`,
      },
    ],
    agentDebate: [
      {
        agent: 'FTC Governance Agent',
        role: '16 CFR Part 255 Audit',
        status: 'PASS',
        note: 'Verified clear #ad disclosure prompt, no unsubstantiated efficacy claims, and commercial-safe audio.',
      },
      {
        agent: 'Local Matching Agent',
        role: 'Geo-Density & Fit Score',
        status: 'PASS',
        note: `Matched 3 vetted ${cityShort} creators within 0.4–2.0 mi with 73%–88% local audience concentration.`,
      },
      {
        agent: 'Escrow & Attribution Agent',
        role: 'Stripe 30/40/30 + QR Proof',
        status: 'PASS',
        note: '$0 MVP platform fee; 100% refundable prior to creator acceptance; QR redemption codes generated.',
      },
    ],
    creators,
    scriptHook: `#Ad | Stop scrolling if you are in ${cityShort} this weekend — ${businessName} just unlocked QR voucher {QR} for dine-in guests.`,
    shotList: [
      { timestamp: '0–3s', visual: baseShotVisual, audio: '#Ad badge visible · high-contrast local hook' },
      { timestamp: '3–18s', visual: 'Authentic founder/kitchen story + top 2 hero items', audio: 'Why neighborhood locals book this spot every weekend' },
      { timestamp: '18–30s', visual: 'Scan-ready tracked QR voucher + neighborhood street sign', audio: 'Show {QR} at check-in · measurable store visit attribution' },
    ],
    projectedVisits,
    projectedRoas: '3.6×',
    escrowBreakdown: { platformFee: 0, milestone1: m1, milestone2: m2, milestone3: m3 },
    aiEngine: 'bomie-policy-engine',
  };
}
