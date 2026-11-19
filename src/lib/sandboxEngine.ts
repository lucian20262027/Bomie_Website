export interface CreatorCandidate {
  id: string;
  handle: string;
  niche: string;
  distance: string;
  distanceMiles: number;
  followers: string;
  localAudiencePct: number;
  engagementRate: string;
  authenticityScore: number;
  match: string;
  weight: number;
}

export interface GeneratedMerchantPlan {
  title: string;
  city: string;
  category: string;
  baseBudget: number;
  baseRoas: number;
  creators: CreatorCandidate[];
  hookTemplate: string;
  shots: string[];
  aiSource?: 'gemini-live' | 'scientific-engine';
}

export function scoreCreatorCandidate(
  semanticFit: number,
  distanceMiles: number,
  localAudiencePct: number,
  authenticityScore: number
): string {
  // Hybrid Ranking: 45% Semantic Fit + 25% Geo-Decay + 20% Local Audience % + 10% Authenticity
  const geoScore = Math.exp(-0.15 * Math.max(0, distanceMiles));
  const raw =
    0.45 * semanticFit +
    0.25 * geoScore +
    0.2 * (localAudiencePct / 100) +
    0.1 * (authenticityScore / 100);
  const pct = Math.min(99, Math.max(82, Math.round(raw * 100)));
  return `${pct}% Match`;
}

export interface CreatorDealPlan {
  handle: string;
  city: string;
  nicheLabel: string;
  offers: {
    id: string;
    merchant: string;
    distance: string;
    pay: number;
    perk: string;
    deliverable: string;
  }[];
  hooks: {
    vlog: string;
    asmr: string;
    top3: string;
  };
}

function detectCity(lower: string): string {
  if (lower.includes('cancun')) return 'Cancun, Mexico';
  if (lower.includes('cabo')) return 'Cabo San Lucas, Mexico';
  if (lower.includes('mexico city') || lower.includes('cdmx')) return 'Mexico City, Mexico';
  if (lower.includes('mexico')) return 'Mexico';
  if (lower.includes('hawaii') || lower.includes('maui') || lower.includes('honolulu')) return 'Hawaii';
  if (lower.includes('miami')) return 'Miami, FL';
  if (lower.includes('los angeles') || /\bla\b/.test(lower)) return 'Los Angeles, CA';
  if (lower.includes('seattle')) return 'Seattle, WA';
  if (lower.includes('vegas') || lower.includes('las vegas')) return 'Las Vegas, NV';
  if (lower.includes('new york') || lower.includes('nyc')) return 'New York, NY';
  if (lower.includes('austin')) return 'Austin, TX';
  if (lower.includes('chicago')) return 'Chicago, IL';
  if (lower.includes('san diego')) return 'San Diego, CA';
  if (lower.includes('tokyo')) return 'Tokyo';
  return 'San Francisco, CA';
}

export function buildCustomMerchantPlan(promptText: string): GeneratedMerchantPlan {
  const lower = promptText.toLowerCase();
  const budgetMatch = promptText.match(/(?:\$\s*(\d[\d,]*)|(\d[\d,]*)\s*(?:usd|dollars?|bucks?))/i);
  const rawNum = budgetMatch ? Number((budgetMatch[1] || budgetMatch[2]).replace(/,/g, '')) : 1800;
  const parsedBudget = Number.isFinite(rawNum)
    ? Math.max(200, Math.min(5000, Math.round(rawNum / 50) * 50))
    : 1800;

  const city = detectCity(lower);
  const cityShort = city.split(',')[0];

  if (
    lower.includes('travel') ||
    lower.includes('tour') ||
    lower.includes('trip') ||
    lower.includes('tips') ||
    lower.includes('vacation') ||
    lower.includes('hotel') ||
    lower.includes('resort') ||
    lower.includes('flight') ||
    lower.includes('agency') ||
    lower.includes('mexico') ||
    lower.includes('hawaii')
  ) {
    return {
      title: `Travel & Experiences · ${cityShort} Campaign`,
      city,
      category: 'Travel & Tourism',
      baseBudget: parsedBudget,
      baseRoas: 4.12,
      creators: [
        {
          id: 'c1',
          handle: '@wanderlust_maya',
          niche: 'Travel & Itineraries',
          distance: 'Verified Hub',
          distanceMiles: 1.2,
          followers: '42.1K',
          localAudiencePct: 71,
          engagementRate: '5.4%',
          authenticityScore: 98,
          match: scoreCreatorCandidate(0.98, 1.2, 71, 98),
          weight: 0.4,
        },
        {
          id: 'c2',
          handle: '@weekend_escapes',
          niche: 'Destination Guides',
          distance: 'Verified Hub',
          distanceMiles: 2.1,
          followers: '26.8K',
          localAudiencePct: 68,
          engagementRate: '4.9%',
          authenticityScore: 96,
          match: scoreCreatorCandidate(0.95, 2.1, 68, 96),
          weight: 0.33,
        },
        {
          id: 'c3',
          handle: '@passport_deals',
          niche: 'Travel Tips & Stays',
          distance: 'Verified Hub',
          distanceMiles: 2.8,
          followers: '18.4K',
          localAudiencePct: 65,
          engagementRate: '5.1%',
          authenticityScore: 95,
          match: scoreCreatorCandidate(0.93, 2.8, 65, 95),
          weight: 0.27,
        },
      ],
      hookTemplate: `“Planning a ${cityShort} trip? Save these 3 insider ${cityShort} tips & unlock {PROMO} on your booking!”`,
      shots: [
        `0–3s: Breathtaking ${cityShort} arrival clip + scenic golden-hour hook`,
        `3–18s: 3 rapid-fire ${cityShort} travel tips & hidden local spots`,
        '18–30s: Show tracked booking link & {PROMO} exclusive traveler perk',
      ],
    };
  }

  if (
    lower.includes('spa') ||
    lower.includes('skin') ||
    lower.includes('beauty') ||
    lower.includes('salon') ||
    lower.includes('facial') ||
    lower.includes('nail') ||
    lower.includes('medspa')
  ) {
    return {
      title: `Beauty & Wellness Studio · ${cityShort} Campaign`,
      city,
      category: 'Beauty & Wellness',
      baseBudget: parsedBudget,
      baseRoas: 3.68,
      creators: [
        { id: 'c1', handle: '@glowwithchloe', niche: 'Skincare & ASMR', distance: '0.8 mi away', distanceMiles: 0.8, followers: '31.4K', localAudiencePct: 76, engagementRate: '5.6%', authenticityScore: 98, match: scoreCreatorCandidate(0.98, 0.8, 76, 98), weight: 0.39 },
        { id: 'c2', handle: '@selfcare_diary', niche: 'Wellness Routines', distance: '1.3 mi away', distanceMiles: 1.3, followers: '22.6K', localAudiencePct: 72, engagementRate: '4.8%', authenticityScore: 96, match: scoreCreatorCandidate(0.95, 1.3, 72, 96), weight: 0.34 },
        { id: 'c3', handle: '@cleanbeauty_maya', niche: 'Local Spa Reviews', distance: '2.0 mi away', distanceMiles: 2.0, followers: '17.2K', localAudiencePct: 69, engagementRate: '5.1%', authenticityScore: 95, match: scoreCreatorCandidate(0.93, 2.0, 69, 95), weight: 0.27 },
      ],
      hookTemplate: `“The 45-minute glow reset everyone in ${cityShort} is booking—claim {PROMO} below.”`,
      shots: [
        '0–3s: Sunlit treatment room & calming studio aesthetic',
        '3–18s: ASMR skincare / sculpting treatment close-up',
        '18–30s: Post-glow result + new-client {PROMO} QR code',
      ],
    };
  }

  if (
    lower.includes('gym') ||
    lower.includes('fitness') ||
    lower.includes('pilates') ||
    lower.includes('yoga') ||
    lower.includes('workout')
  ) {
    return {
      title: `Fitness & Movement Studio · ${cityShort} Campaign`,
      city,
      category: 'Fitness & Studios',
      baseBudget: parsedBudget,
      baseRoas: 3.38,
      creators: [
        { id: 'c1', handle: '@pilates_club_sf', niche: 'Studio Workouts', distance: '0.7 mi away', distanceMiles: 0.7, followers: '29.5K', localAudiencePct: 78, engagementRate: '5.2%', authenticityScore: 97, match: scoreCreatorCandidate(0.97, 0.7, 78, 97), weight: 0.38 },
        { id: 'c2', handle: '@morning_run_crew', niche: 'Active Lifestyle', distance: '1.4 mi away', distanceMiles: 1.4, followers: '19.8K', localAudiencePct: 71, engagementRate: '4.7%', authenticityScore: 95, match: scoreCreatorCandidate(0.94, 1.4, 71, 95), weight: 0.34 },
        { id: 'c3', handle: '@wellness_with_sam', niche: 'Healthy Routines', distance: '1.9 mi away', distanceMiles: 1.9, followers: '15.1K', localAudiencePct: 68, engagementRate: '5.0%', authenticityScore: 94, match: scoreCreatorCandidate(0.92, 1.9, 68, 94), weight: 0.28 },
      ],
      hookTemplate: `“Come with me to my favorite new class in ${cityShort}—grab {PROMO} on your first drop-in!”`,
      shots: [
        '0–3s: High-energy studio warm-up & sunlight through mirrors',
        '3–18s: Class highlights + instructor energy & community vibe',
        '18–30s: Front-desk QR code for {PROMO} intro class pass',
      ],
    };
  }

  if (
    lower.includes('candle') ||
    lower.includes('craft') ||
    lower.includes('boutique') ||
    lower.includes('shop') ||
    lower.includes('ceramic') ||
    lower.includes('clothing') ||
    lower.includes('retail')
  ) {
    return {
      title: `Independent Craft & Boutique · ${cityShort} Campaign`,
      city,
      category: 'Craft & Retail',
      baseBudget: parsedBudget,
      baseRoas: 3.44,
      creators: [
        { id: 'c1', handle: '@cozyhomewithsam', niche: 'Home Aesthetics', distance: '0.6 mi away', distanceMiles: 0.6, followers: '24.8K', localAudiencePct: 75, engagementRate: '5.5%', authenticityScore: 98, match: scoreCreatorCandidate(0.98, 0.6, 75, 98), weight: 0.38 },
        { id: 'c2', handle: '@neighborhood_finds', niche: 'Local Shopping', distance: '1.2 mi away', distanceMiles: 1.2, followers: '19.4K', localAudiencePct: 72, engagementRate: '4.9%', authenticityScore: 96, match: scoreCreatorCandidate(0.95, 1.2, 72, 96), weight: 0.34 },
        { id: 'c3', handle: '@artisan_curator', niche: 'Craft & Goods', distance: '1.8 mi away', distanceMiles: 1.8, followers: '14.9K', localAudiencePct: 69, engagementRate: '5.1%', authenticityScore: 95, match: scoreCreatorCandidate(0.93, 1.8, 69, 95), weight: 0.28 },
      ],
      hookTemplate: `“Found a local artisan studio right in ${cityShort}—unlock {PROMO} this weekend.”`,
      shots: [
        '0–3s: Hands crafting & packaging signature local product',
        '3–18s: Aesthetic home styling & unboxing moment',
        '18–30s: Weekend pop-up / {PROMO} in-store pickup perk',
      ],
    };
  }

  if (
    lower.includes('sichuan') ||
    lower.includes('restaurant') ||
    lower.includes('dining') ||
    lower.includes('food') ||
    lower.includes('boba') ||
    lower.includes('cafe') ||
    lower.includes('coffee') ||
    lower.includes('taco') ||
    lower.includes('ramen') ||
    lower.includes('bakery')
  ) {
    const isCafe = lower.includes('boba') || lower.includes('coffee') || lower.includes('cafe') || lower.includes('bakery');
    return {
      title: `${isCafe ? 'Neighborhood Cafe & Drinks' : 'Local Dining & Kitchen'} · ${cityShort} Campaign`,
      city,
      category: isCafe ? 'Cafe & Drinks' : 'Local Dining',
      baseBudget: parsedBudget,
      baseRoas: isCafe ? 3.28 : 3.52,
      creators: [
        { id: 'c1', handle: '@localtaste_club', niche: 'Foodie & Dining', distance: '0.7 mi away', distanceMiles: 0.7, followers: '34.2K', localAudiencePct: 77, engagementRate: '5.8%', authenticityScore: 98, match: scoreCreatorCandidate(0.98, 0.7, 77, 98), weight: 0.39 },
        { id: 'c2', handle: '@bite_sized_city', niche: 'Weekend Eats', distance: '1.3 mi away', distanceMiles: 1.3, followers: '23.1K', localAudiencePct: 73, engagementRate: '5.0%', authenticityScore: 96, match: scoreCreatorCandidate(0.95, 1.3, 73, 96), weight: 0.33 },
        { id: 'c3', handle: '@hidden_kitchens', niche: 'Local Gems', distance: '1.9 mi away', distanceMiles: 1.9, followers: '16.5K', localAudiencePct: 70, engagementRate: '5.2%', authenticityScore: 95, match: scoreCreatorCandidate(0.93, 1.9, 70, 95), weight: 0.28 },
      ],
      hookTemplate: `“Wait until you see this tableside pour in ${cityShort}—grab {PROMO} when you scan our QR code!”`,
      shots: [
        '0–3s: Sizzling dish / signature drink pour in warm lighting',
        '3–18s: First-bite reaction + cozy neighborhood atmosphere',
        '18–30s: Show QR table tent for {PROMO} weekend dine-in',
      ],
    };
  }

  return {
    title: `Neighborhood Growth · ${cityShort} Campaign`,
    city,
    category: 'Local Business',
    baseBudget: parsedBudget,
    baseRoas: 3.18,
    creators: [
      { id: 'c1', handle: '@localspotlight', niche: 'Neighborhood Discovery', distance: '0.8 mi away', distanceMiles: 0.8, followers: '28.6K', localAudiencePct: 74, engagementRate: '4.9%', authenticityScore: 96, match: scoreCreatorCandidate(0.95, 0.8, 74, 96), weight: 0.38 },
      { id: 'c2', handle: '@city_insider_guide', niche: 'Local Reviews', distance: '1.4 mi away', distanceMiles: 1.4, followers: '20.4K', localAudiencePct: 70, engagementRate: '4.6%', authenticityScore: 95, match: scoreCreatorCandidate(0.93, 1.4, 70, 95), weight: 0.34 },
      { id: 'c3', handle: '@everyday_local', niche: 'Community Picks', distance: '2.1 mi away', distanceMiles: 2.1, followers: '15.2K', localAudiencePct: 67, engagementRate: '4.8%', authenticityScore: 94, match: scoreCreatorCandidate(0.91, 2.1, 67, 94), weight: 0.28 },
    ],
    hookTemplate: `“POV: You just discovered this local favorite in ${cityShort}—scan for {PROMO}!”`,
    shots: [
      '0–3s: Storefront / service hook in bright natural light',
      '3–18s: Authentic behind-the-scenes & customer experience',
      '18–30s: Show QR voucher for {PROMO} in-store or online',
    ],
  };
}

export function computeDynamicRoas(
  baseRoas: number,
  budget: number,
  selectedCreatorCount: number,
  promoOffer: '20% Off' | 'Free Appetizer' | 'BOGO Deal'
): { mid: string; range: string } {
  // Budget curve: smaller starter budgets have slightly tighter reach, mid-scale ($1500-$3000) hits peak efficiency
  const budgetDelta =
    budget < 600
      ? -0.22
      : budget < 1200
      ? -0.08
      : budget <= 2800
      ? ((budget - 1200) / 1600) * 0.28
      : 0.28 - ((budget - 2800) / 2200) * 0.14;

  const creatorDelta = (selectedCreatorCount - 2) * 0.11;
  const promoDelta = promoOffer === 'BOGO Deal' ? 0.21 : promoOffer === '20% Off' ? 0.12 : 0.06;

  const finalRoas = Math.max(2.4, Math.min(4.95, baseRoas + budgetDelta + creatorDelta + promoDelta));
  const low = Math.max(2.1, finalRoas - 0.32).toFixed(1);
  const high = Math.min(5.3, finalRoas + 0.34).toFixed(1);
  return {
    mid: finalRoas.toFixed(2),
    range: `${low}x – ${high}x`,
  };
}

export function buildCreatorPlan(promptText: string): CreatorDealPlan {
  const lower = promptText.toLowerCase();
  const cityRaw = detectCity(lower);
  const city = cityRaw.split(',')[0];

  const handleMatch = promptText.match(/@[a-zA-Z0-9_.]+/);

  if (
    lower.includes('travel') ||
    lower.includes('trip') ||
    lower.includes('tour') ||
    lower.includes('vacation') ||
    lower.includes('flight') ||
    lower.includes('hotel') ||
    lower.includes('adventure') ||
    lower.includes('mexico') ||
    lower.includes('wander')
  ) {
    const handle = handleMatch ? handleMatch[0] : '@travel_storyteller';
    return {
      handle: `${handle} · ${city}`,
      city,
      nicheLabel: 'Travel & Experiences',
      offers: [
        {
          id: 'o1',
          merchant: 'Pacific Boutique Hotel & Stay',
          distance: 'Local / Weekend Escape',
          pay: 580,
          perk: '+ 2-Night Complimentary Stay',
          deliverable: '1x 30s Staycation Reel',
        },
        {
          id: 'o2',
          merchant: 'Sunset City & Food Tours',
          distance: '1.1 mi away',
          pay: 440,
          perk: '+ VIP Guided Pass for Two',
          deliverable: '1x 30s Itinerary Vlog',
        },
      ],
      hooks: {
        vlog: `“Skip the tourist traps—here is the ultimate 48-hour ${city} & getaway itinerary…”`,
        asmr: '[Ocean breeze & suitcase zip] “30 seconds inside my favorite boutique stay.”',
        top3: `“Top 3 hidden travel experiences near ${city} worth booking this month.”`,
      },
    };
  }

  if (lower.includes('beauty') || lower.includes('spa') || lower.includes('skin') || lower.includes('fashion')) {
    const handle = handleMatch ? handleMatch[0] : '@glow_creator';
    return {
      handle: `${handle} · ${city}`,
      city,
      nicheLabel: 'Beauty & Wellness',
      offers: [
        { id: 'o1', merchant: 'Lumina Skin & Spa', distance: '0.9 mi away', pay: 520, perk: '+ Free Sculpting Facial', deliverable: '1x 30s Reel' },
        { id: 'o2', merchant: 'Silver Lake Pilates Club', distance: '1.6 mi away', pay: 450, perk: '+ 4-Class VIP Pass', deliverable: '1x Morning Vlog' },
      ],
      hooks: {
        vlog: '“Come with me to try the viral sculpting facial everyone in town is talking about…”',
        asmr: '[Soft studio ambience] “30 seconds of pure self-care magic right down the street.”',
        top3: `“3 hidden self-care spots in ${city} you actually need to book this weekend.”`,
      },
    };
  }

  if (lower.includes('coffee') || lower.includes('cafe') || lower.includes('craft') || lower.includes('candle') || lower.includes('home')) {
    const handle = handleMatch ? handleMatch[0] : '@cozy_creator';
    return {
      handle: `${handle} · ${city}`,
      city,
      nicheLabel: 'Coffee & Craft',
      offers: [
        { id: 'o1', merchant: 'Cedar & Roast Espresso', distance: '0.6 mi away', pay: 350, perk: '+ $60 Tasting Tab', deliverable: '1x 25s Pour-Over Reel' },
        { id: 'o2', merchant: 'Bloom Soy Candle Studio', distance: '1.4 mi away', pay: 320, perk: '+ 3-Piece Seasonal Set', deliverable: '1x 30s Cozy Home Tour' },
      ],
      hooks: {
        vlog: `“My Sunday morning ritual in ${city} starts at this neighborhood coffee & craft corner…”`,
        asmr: '[Espresso pour & match strike] “30 seconds of pure cozy aesthetic.”',
        top3: `“3 independent ${city} shops I will always support over big chains.”`,
      },
    };
  }

  if (lower.includes('fitness') || lower.includes('gym') || lower.includes('yoga') || lower.includes('workout')) {
    const handle = handleMatch ? handleMatch[0] : '@fit_local';
    return {
      handle: `${handle} · ${city}`,
      city,
      nicheLabel: 'Fitness & Studios',
      offers: [
        { id: 'o1', merchant: 'Core & Reformer Studio', distance: '0.8 mi away', pay: 460, perk: '+ 1-Month Unlimited Pass', deliverable: '1x 30s Class Recap' },
        { id: 'o2', merchant: 'Pressed Recovery & Cryo', distance: '1.5 mi away', pay: 390, perk: '+ 3 Recovery Sessions', deliverable: '1x 25s Recovery Reel' },
      ],
      hooks: {
        vlog: `“Day in the life testing the toughest new reformer class in ${city}…”`,
        asmr: '[Studio beat & cold plunge] “Post-workout recovery routine right in my neighborhood.”',
        top3: `“Top 3 local fitness & recovery spots in ${city} for busy weekdays.”`,
      },
    };
  }

  const handle = handleMatch ? handleMatch[0] : '@local_foodie';
  return {
    handle: `${handle} · ${city}`,
    city,
    nicheLabel: 'Food & Neighborhood Dining',
    offers: [
      { id: 'o1', merchant: `Sichuan Bistro ${city.split(' ')[0]}`, distance: '0.7 mi away', pay: 420, perk: '+ $80 Tasting Dinner', deliverable: '1x 30s TikTok/Reel' },
      { id: 'o2', merchant: 'Fog City Matcha & Cafe', distance: '1.2 mi away', pay: 340, perk: '+ 2 Guest Drinks', deliverable: '1x 25s Drink Pour' },
    ],
    hooks: {
      vlog: `“POV: You just found the best neighborhood spot in ${city} with a 20% local QR perk.”`,
      asmr: '[Crisp pour & sizzle audio] “No talking—just 25 seconds of pure flavor.”',
      top3: `“Top 3 reasons locals line up at this ${city} gem every Friday night.”`,
    },
  };
}
