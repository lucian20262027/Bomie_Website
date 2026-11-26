export type MerchantScenarioId = 'sichuan' | 'lumina' | 'glowmed';
export type CreatorPersonaId = 'maya' | 'chloe' | 'sam';

export interface CreatorCandidate {
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

export interface MerchantScenario {
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

export interface CreatorOffer {
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

export interface CreatorPersona {
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

export const MERCHANT_SCENARIOS: Record<MerchantScenarioId, MerchantScenario> = {
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
export const CREATOR_PERSONAS: Record<CreatorPersonaId, CreatorPersona> = {
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
