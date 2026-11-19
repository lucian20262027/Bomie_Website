export type CulturalHubId = 'sf' | 'la' | 'seattle' | 'vegas';

export const CULTURAL_HUB_ORDER: CulturalHubId[] = ['sf', 'la', 'seattle', 'vegas'];

export interface HeroLiveMatch {
  tag: string;
  headline: string;
  subline: string;
  image: string;
  video?: string;
  business: string;
  location: string;
  creator: string;
  matchScore: string;
  ftcStatus: string;
  estReach: string;
}

export const HERO_LIVE_MATCHES: HeroLiveMatch[] = [
  {
    tag: 'Dining',
    headline: 'Artisanal Local Dining',
    subline: 'Sizzling kitchen storytelling · 30% weekend walk-in lift',
    image: '/images/pexels/262978.jpg',
    video: '/videos/dining.mp4',
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
    image: '/images/pexels/3997993.jpg',
    video: '/videos/spa.mp4',
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
    image: '/images/pexels/4207785.jpg',
    video: '/videos/craft.mp4',
    business: 'Bloom Studio Candles',
    location: '0.6 mi away · Austin, TX',
    creator: '@cozyhomewithsam (14.8K)',
    matchScore: '99% Match',
    ftcStatus: 'Escrow & FTC Rules Locked',
    estReach: '50K–95K High-Intent Views',
  },
];

export const CULTURAL_HUB_CITIES = {
  sf: {
    id: 'sf' as const,
    name: 'San Francisco',
    tagline: 'Culinary Craft, Specialty Roasteries & Neighborhood Boutiques',
    heroImage: '/images/pexels/208745.jpg',
    overview:
      'Across the Mission, Hayes Valley, Inner Sunset, and Marina, Bomie AI connects San Francisco’s iconic independent restaurants, specialty coffee bars, and craft studios with hyper-local foodie and lifestyle creators—turning 30-second neighborhood reels into packed weekend tables.',
    stats: [
      { label: 'Active SF Creators', value: '1,420+' },
      { label: 'Avg. Store-Visit ROAS', value: '3.6x' },
      { label: 'Weekend Walk-In Lift', value: '+34%' },
    ],
    cases: [
      {
        brand: 'Sichuan Bistro SF',
        industry: 'Artisanal Dining · Inner Sunset',
        creator: '@sfnoodleclub (34.2K)',
        metric: '+38% Weekend Covers · 3.6x ROAS',
        image: '/images/pexels/955137.jpg',
        summary:
          '4 local foodie creators filmed tableside chili-oil pours with a 20% off dumpling QR voucher, generating 142 tracked dine-in tables in 5 days.',
        quote:
          '“We saw a 38% jump in weekend walk-ins after just two creator reels. Every redemption was tracked right at the table.” — Chef & Founder',
      },
      {
        brand: 'Fog City Matcha & Roastery',
        industry: 'Specialty Cafe · Hayes Valley',
        creator: '@bayareabites_sam (26.8K)',
        metric: '410+ QR Drink Redemptions',
        image: '/images/pexels/302899.jpg',
        summary:
          'Launched a seasonal strawberry-hojicha latte drop with 3 SF lifestyle creators, creating a 2-block morning line on Saturday.',
        quote:
          '“Bomie matched us with creators who actually live 10 minutes away. Their followers walked into our cafe the very next morning.”',
      },
      {
        brand: 'Marina Botanical Apothecary',
        industry: 'Clean Beauty & Home · Marina District',
        creator: '@fogcityfoodie (18.4K)',
        metric: '$6,800 Launch Weekend Sales',
        image: '/images/pexels/3735657.jpg',
        summary:
          'Nano-creators shared in-store custom fragrance blending sessions, driving high-ticket gift box purchases both in-store and online.',
        quote:
          '“Zero cold DMs, zero awkward price haggling. The 30/40/30 escrow and automatic FTC check saved us 20 hours a week.”',
      },
      {
        brand: 'Mission Ceramic & Tableware',
        industry: 'Artisan Studio · Mission District',
        creator: '@goldengategrub (41.5K)',
        metric: '48 Sold-Out Workshop Seats',
        image: '/images/pexels/2162938.jpg',
        summary:
          'Couples date-night pottery reels filled every weekend wheel-throwing workshop for 6 consecutive weeks.',
        quote:
          '“Our workshops sold out in 48 hours. Local creators told our story way better than paid social ads ever could.”',
      },
    ],
  },
  la: {
    id: 'la' as const,
    name: 'Los Angeles',
    tagline: 'Clean Beauty Studios, Reformer Pilates & West Coast Resort Retail',
    heroImage: '/images/pexels/2695679.jpg',
    overview:
      'From West Hollywood and Melrose Place to Santa Monica and Silver Lake, LA’s wellness studios, aesthetic spas, and boutique fashion labels use Bomie AI to turn sunlit creator vlogs into booked appointments and VIP recurring memberships.',
    stats: [
      { label: 'Active LA Creators', value: '2,850+' },
      { label: 'Avg. Booking ROAS', value: '4.1x' },
      { label: 'First-Visit Conversions', value: '3.8%' },
    ],
    cases: [
      {
        brand: 'Lumina Skin & Spa',
        industry: 'Luxury Facial Studio · West Hollywood',
        creator: '@glowwithchloe_la (48.0K)',
        metric: '52 First-Visit Bookings · 4.1x ROAS',
        image: '/images/pexels/3997993.jpg',
        summary:
          '4 LA skincare creators filmed "Sunday Reset" glass-skin hydro-facial vlogs with FTC-compliant cosmetic claims and $35-off booking codes.',
        quote:
          '“Bomie’s FTC pre-flight shield kept all our skincare scripts 100% compliant while filling our weekday treatment calendar.”',
      },
      {
        brand: 'Forma Pilates Collective',
        industry: 'Boutique Fitness · Melrose Place',
        creator: '@santamonicaserenity (31.5K)',
        metric: '64 New Monthly Memberships',
        image: '/images/pexels/4056535.jpg',
        summary:
          'Post-class matcha & reformer studio tours drove 64 high-retention intro class pack conversions in 10 days.',
        quote:
          '“Every creator matched our sunlit studio aesthetic to perfection. Best customer acquisition channel we have ever run.”',
      },
      {
        brand: 'Silver Lake Elixir & Matcha',
        industry: 'Wellness Beverage · Silver Lake',
        creator: '@lafoodiediary (52.0K)',
        metric: '78K Local Views · +42% Foot Traffic',
        image: '/images/pexels/5946968.jpg',
        summary:
          'Adaptogenic cloud-foam matcha reels went viral across East LA neighborhoods, doubling weekend afternoon store traffic.',
        quote:
          '“The QR voucher tracking let us see exact cup redemptions per creator in real time.”',
      },
      {
        brand: 'Malibu Linen & Sun Atelier',
        industry: 'Resort Apparel · Abbot Kinney, Venice',
        creator: '@chloestylediary (28.1K)',
        metric: '3.9x Pop-Up Store ROAS',
        image: '/images/pexels/1884581.jpg',
        summary:
          'Coastal try-on hauls inside the Venice flagship store drove both weekend foot traffic and direct Shopify orders.',
        quote:
          '“We turned 3 top creators into monthly brand ambassadors right inside the Bomie dashboard.”',
      },
    ],
  },
  seattle: {
    id: 'seattle' as const,
    name: 'Seattle',
    tagline: 'Craft Espresso Roasters, Nordic-PNW Dining & Cozy Lifestyle',
    heroImage: '/images/pexels/3964406.jpg',
    overview:
      'Across Capitol Hill, Ballard, Fremont, and South Lake Union, Seattle’s independent coffee roasters, neighborhood bistros, and wellness clubs partner with high-trust local creators to build year-round community loyalty.',
    stats: [
      { label: 'Active Seattle Creators', value: '980+' },
      { label: 'Avg. Store-Visit ROAS', value: '3.7x' },
      { label: 'Local Audience Density', value: '84%' },
    ],
    cases: [
      {
        brand: 'Pike & Pine Craft Roasters',
        industry: 'Specialty Coffee · Capitol Hill',
        creator: '@seattlecoffeeculture (29.4K)',
        metric: '520+ Morning QR Scans · 3.9x ROAS',
        image: '/images/pexels/312418.jpg',
        summary:
          'Rainy-morning pour-over & cardamom bun reels drove over 500 tracked commuter visits during a 7-day autumn drop.',
        quote:
          '“Seattleites trust authentic local voices over ads. Bomie connected us with the exact coffee creators our neighborhood follows.”',
      },
      {
        brand: 'Ballard Fjord Bakery & Bistro',
        industry: 'Nordic-PNW Dining · Ballard',
        creator: '@pnwfoodiefinds (36.1K)',
        metric: '+35% Rainy-Weekend Covers',
        image: '/images/pexels/205961.jpg',
        summary:
          'Behind-the-scenes sourdough & smoked salmon brunch reels booked out weekend reservations two weeks in advance.',
        quote:
          '“The 30-second shot-list studio helped our creators capture our kitchen craft without disrupting service.”',
      },
      {
        brand: 'Fremont Botanicals & Terrariums',
        industry: 'Plant & Home Studio · Fremont',
        creator: '@cozyseattlehome (16.5K)',
        metric: '$5,400 Workshop & Retail Sales',
        image: '/images/pexels/4503273.jpg',
        summary:
          'Nano-creators hosted "Build Your Own Moss Terrarium" reels, converting viewers into weekend store visitors.',
        quote:
          '“Even nano-creators with 15K followers delivered incredible foot traffic because 85% of their audience lives in Seattle.”',
      },
      {
        brand: 'Soundview Cold Plunge & Sauna',
        industry: 'Contrast Therapy Club · South Lake Union',
        creator: '@seattlewellness (24.0K)',
        metric: '44 Intro Pass Conversions',
        image: '/images/pexels/39237331.jpg',
        summary:
          'Evening cedar sauna & cold plunge recovery vlogs attracted tech professionals within a 1-mile radius.',
        quote:
          '“From brief to payout took less than a week, with 3.5x return on our campaign spend.”',
      },
    ],
  },
  vegas: {
    id: 'vegas' as const,
    name: 'Las Vegas',
    tagline: 'Experiential Dining, Artisanal Dessert Lounges & Resort Day Spas',
    heroImage: '/images/pexels/415999.jpg',
    overview:
      'Beyond the Strip—across the Arts District, Summerlin, Chinatown, and Henderson—Las Vegas’s booming culinary spots, dessert lounges, and luxury med-spas use Bomie AI to capture both high-spending locals and weekend visitors.',
    stats: [
      { label: 'Active Vegas Creators', value: '1,150+' },
      { label: 'Avg. Campaign ROAS', value: '4.2x' },
      { label: 'Avg. Video Save Rate', value: '6.8%' },
    ],
    cases: [
      {
        brand: 'Koi Neon Izakaya & Grill',
        industry: 'Experiential Dining · Arts District / Chinatown',
        creator: '@vegasfoodieinsider (58.2K)',
        metric: '95K Views · 4.4x Store-Visit ROAS',
        image: '/images/pexels/2098085.jpg',
        summary:
          'Tableside wagyu sear & craft mocktail reels drove 180+ tracked group dinner redemptions over a single weekend.',
        quote:
          '“Vegas is a visual city. Bomie’s AI matched us with creators whose nighttime food cinematography blew our doors off.”',
      },
      {
        brand: 'Mirage Oasis Desert Spa',
        industry: 'Luxury Recovery & Spa · Summerlin',
        creator: '@vegasglowguide (33.0K)',
        metric: '39 High-Ticket Package Bookings',
        image: '/images/pexels/3757942.jpg',
        summary:
          'Desert stone massage & hydration lounge tours generated $11,200 in verified package bookings.',
        quote:
          '“The automated FTC compliance gate gave our spa team total peace of mind while scaling creator partnerships.”',
      },
      {
        brand: 'Velvet Crumb Pastry Lounge',
        industry: 'Late-Night Dessert Bar · Spring Valley',
        creator: '@sweettoothvegas (44.5K)',
        metric: '380+ Weekend Voucher Scans',
        image: '/images/pexels/291528.jpg',
        summary:
          'Pistachio kunefe crepe & espresso martini reels turned a neighborhood bakery into a late-night destination.',
        quote:
          '“Lines were out the door by Friday 9 PM, and customers were holding up their phones with the creator QR code.”',
      },
      {
        brand: 'Desert Pulse Lagree & Matcha',
        industry: 'Boutique Fitness · Henderson',
        creator: '@fitinvegas (21.8K)',
        metric: '58 New Class Pack Sign-Ups',
        image: '/images/pexels/4498606.jpg',
        summary:
          'Morning workout + iced collagen matcha bundle reels converted Henderson locals into recurring studio members.',
        quote:
          '“So simple to run—we posted the brief on Monday and had 4 incredible local videos live by Friday.”',
      },
    ],
  },
};
