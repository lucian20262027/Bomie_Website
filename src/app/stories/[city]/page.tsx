import Link from 'next/link';
import { ArrowLeft, MapPin, Star } from 'lucide-react';
import type { Metadata } from 'next';
import BrandFooter from '../../../components/BrandFooter';
import CityBookDemoButton from './CityBookDemoButton';
import CitySwitcher from './CitySwitcher';

type CityKey = 'sf' | 'la' | 'seattle' | 'vegas';

const cityData: Record<
  CityKey,
  {
    name: string;
    slogan: string;
    tagline: string;
    heroImage: string;
    overview: string;
    stats: { label: string; value: string }[];
    cases: {
      brand: string;
      industry: string;
      creator: string;
      metric: string;
      image: string;
      summary: string;
      quote: string;
    }[];
  }
> = {
  sf: {
    name: 'San Francisco',
    slogan: 'AI That Builds More Connection, Not More Separation.',
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
        quote: '“We saw a 38% jump in weekend walk-ins after just two creator reels.” — Chef & Founder',
      },
      {
        brand: 'Fog City Matcha & Roastery',
        industry: 'Specialty Cafe · Hayes Valley',
        creator: '@bayareabites_sam (26.8K)',
        metric: '410+ QR Drink Redemptions',
        image: '/images/pexels/302899.jpg',
        summary:
          'Launched a seasonal strawberry-hojicha latte drop with 3 SF lifestyle creators, creating a 2-block morning line on Saturday.',
        quote: '“Bomie matched us with creators who actually live 10 minutes away.”',
      },
      {
        brand: 'Marina Botanical Apothecary',
        industry: 'Clean Beauty & Home · Marina District',
        creator: '@fogcityfoodie (18.4K)',
        metric: '$6,800 Launch Weekend Sales',
        image: '/images/pexels/3735657.jpg',
        summary:
          'Nano-creators shared in-store custom fragrance blending sessions, driving high-ticket gift box purchases both in-store and online.',
        quote: '“Zero cold DMs, zero awkward price haggling. Saved us 20 hours a week.”',
      },
      {
        brand: 'Mission Ceramic & Tableware',
        industry: 'Artisan Studio · Mission District',
        creator: '@goldengategrub (41.5K)',
        metric: '48 Sold-Out Workshop Seats',
        image: '/images/pexels/2162938.jpg',
        summary:
          'Couples date-night pottery reels filled every weekend wheel-throwing workshop for 6 consecutive weeks.',
        quote: '“Every dollar went straight to real neighbors who brought real customers through our doors.”',
      },
    ],
  },
  la: {
    name: 'Los Angeles',
    slogan: 'Together with Bomie, Welcoming Athletes and Audiences Worldwide to LA for 2028.',
    tagline: 'Clean Beauty, Wellness Studios & Trendy Neighborhood Dining',
    heroImage: '/images/pexels/1388030.jpg',
    overview:
      'From Silver Lake and West Hollywood to Santa Monica and Arts District, Bomie AI powers LA’s fastest-growing facial studios, Pilates clubs, and concept eateries with aesthetic, FTC-compliant local creator storytelling.',
    stats: [
      { label: 'Active LA Creators', value: '2,850+' },
      { label: 'Avg. Booking ROAS', value: '4.1x' },
      { label: 'First-Time Client Lift', value: '+42%' },
    ],
    cases: [
      {
        brand: 'Lumina Skin & Spa',
        industry: 'Holistic Facial Studio · West Hollywood',
        creator: '@glowwithchloe_la (28.1K)',
        metric: '64 Booked Facials · 3.9x ROAS',
        image: '/images/pexels/3997993.jpg',
        summary:
          'ASMR facial sculpting reels paired with our 3-Agent FTC compliance gate drove 64 new-client bookings in 10 days.',
        quote: '“Having built-in FTC #ad checks gave us total peace of mind while scaling beauty creators.”',
      },
      {
        brand: 'Silver Lake Sun Pilates',
        industry: 'Boutique Fitness · Silver Lake',
        creator: '@lavellewellness (19.6K)',
        metric: '92 Intro Pack Sign-Ups',
        image: '/images/pexels/4056535.jpg',
        summary:
          'Morning reformer routine vlogs with a tracked studio QR pass filled mid-day classes that used to sit at 40% capacity.',
        quote: '“Our Tuesday & Thursday noon classes went from half-empty to a waitlist.”',
      },
      {
        brand: 'Melrose Vintage & Linen',
        industry: 'Independent Fashion · Fairfax',
        creator: '@socalstylefiles (33.4K)',
        metric: '$9,400 Weekend Drop Revenue',
        image: '/images/pexels/1884584.jpg',
        summary:
          '“Get Ready With Me” try-on hauls inside our Melrose flagship drove 310+ weekend shoppers.',
        quote: '“Far higher ROI than running Meta ads—plus we kept all the creator video assets.”',
      },
      {
        brand: 'Venice Coastal Tacos & Mezcal',
        industry: 'Neighborhood Dining · Venice',
        creator: '@veniceeats_dan (24.0K)',
        metric: '+47% Taco Tuesday Traffic',
        image: '/images/pexels/2092507.jpg',
        summary:
          'Golden-hour patio reels spotlighted fresh handmade tortillas and mezcal flights, driving immediate neighborhood walk-ins.',
        quote: '“Creators showed up, filmed in 45 minutes, and our patio was packed that same Friday.”',
      },
    ],
  },
  seattle: {
    name: 'Seattle',
    slogan: 'Where Pacific Northwest Craft Meets the Creators Who Keep Neighborhoods Alive.',
    tagline: 'Specialty Coffee, Craft Bakeries & Pacific Northwest Hospitality',
    heroImage: '/images/pexels/656195.jpg',
    overview:
      'Across Capitol Hill, Ballard, Fremont, and Bellevue, Bomie AI helps Seattle’s beloved coffee roasters, sourdough bakeries, and outdoor lifestyle shops turn rainy-day scrollers into loyal neighborhood regulars.',
    stats: [
      { label: 'Active PNW Creators', value: '940+' },
      { label: 'Avg. Campaign ROAS', value: '3.4x' },
      { label: 'Repeat Visit Rate', value: '29%' },
    ],
    cases: [
      {
        brand: 'Ballard Sourdough & Pastry',
        industry: 'Artisan Bakery · Ballard',
        creator: '@seattlecravings (22.3K)',
        metric: 'Sold Out by 11:30 AM Daily',
        image: '/images/pexels/1775043.jpg',
        summary:
          'Warm cardamom-bun pull-apart clips filmed at 7 AM opening drove massive weekend foot traffic across North Seattle.',
        quote: '“One 28-second reel brought more new faces into Ballard than a year of flyers.”',
      },
      {
        brand: 'Emerald Rain Roasters',
        industry: 'Coffee & Beans · Capitol Hill',
        creator: '@pnwcoffeeclub (15.7K)',
        metric: '260+ Bag Subscriptions',
        image: '/images/pexels/312418.jpg',
        summary:
          'Pour-over tasting flight reels paired with an in-store QR bag discount converted local coffee lovers into recurring subscribers.',
        quote: '“The AI brief nailed our roasting story on the first try.”',
      },
      {
        brand: 'Cascade Trail & Gear',
        industry: 'Local Outdoor Boutique · Fremont',
        creator: '@hikepnw_alex (31.0K)',
        metric: '$7,200 Seasonal Jacket Lift',
        image: '/images/pexels/1365425.jpg',
        summary:
          'Real rainy-hike waterproof tests on Rattlesnake Ledge drove direct in-store fittings and local pickup orders.',
        quote: '“Authentic Pacific Northwest creators made our gear look unstoppable.”',
      },
      {
        brand: 'Puget Sound Oyster & Wine',
        industry: 'Seafood Bistro · Pike / Belltown',
        creator: '@raincityplates (27.4K)',
        metric: '+32% Happy Hour Covers',
        image: '/images/pexels/1267320.jpg',
        summary:
          '4–6 PM oyster shucking reels with a tracked $20 tasting flight voucher packed early-evening bar seats.',
        quote: '“Tracked POS attribution proved the exact revenue from every creator.”',
      },
    ],
  },
  vegas: {
    name: 'Las Vegas',
    slogan: 'Beyond the Strip: Turning Every Local Kitchen and Studio into the City’s Next Must-Visit.',
    tagline: 'Experiential Dining, Off-Strip Gems & Luxury Wellness Spas',
    heroImage: '/images/pexels/415999.jpg',
    overview:
      'Beyond the Strip—in Chinatown, Summerlin, Henderson, and Arts District—Bomie AI helps Las Vegas’s hottest independent restaurants, dessert bars, and med-spas capture both locals and high-spending weekend visitors.',
    stats: [
      { label: 'Active Vegas Creators', value: '1,180+' },
      { label: 'Avg. Campaign ROAS', value: '4.4x' },
      { label: 'Reservation Surge', value: '+51%' },
    ],
    cases: [
      {
        brand: 'Kuro Wagyu & Izakaya',
        industry: 'Late-Night Dining · Chinatown',
        creator: '@vegasfoodbible (48.9K)',
        metric: '320+ Tracked Reservations',
        image: '/images/pexels/2313686.jpg',
        summary:
          'Tableside torch-seared wagyu nigiri reels triggered a viral wave among both Vegas locals and weekend LA travelers.',
        quote: '“Our 10 PM–1 AM seating went from quiet to 100% booked in one week.”',
      },
      {
        brand: 'Neon Velvet Gelato & Crepes',
        industry: 'Dessert Bar · Arts District',
        creator: '@sincitysweets (29.5K)',
        metric: '540+ BOGO QR Redemptions',
        image: '/images/pexels/1352278.jpg',
        summary:
          'Vibrant neon-lit dessert pours drove massive Friday & Saturday night foot traffic in the Arts District.',
        quote: '“Bomie’s 30s shot checklist made filming effortless for our creators.”',
      },
      {
        brand: 'Oasis Cryo & Recovery Lounge',
        industry: 'Wellness & Spa · Summerlin',
        creator: '@vegaswellness_mia (17.2K)',
        metric: '$8,900 Membership Sign-Ups',
        image: '/images/pexels/3757942.jpg',
        summary:
          '3-Agent FTC compliance check ensured zero medical-claim violations while driving high-intent Summerlin memberships.',
        quote: '“The built-in FTC gate caught risky wording before we ever published.”',
      },
      {
        brand: 'Desert Pulse Lagree & Matcha',
        industry: 'Boutique Fitness · Henderson',
        creator: '@fitinvegas (21.8K)',
        metric: '58 New Class Pack Sign-Ups',
        image: '/images/pexels/4498606.jpg',
        summary:
          'Morning workout + iced collagen matcha bundle reels converted Henderson locals into recurring studio members.',
        quote: '“So simple to run—we posted the brief on Monday and had 4 incredible local videos live by Friday.”',
      },
    ],
  },
};

export function generateStaticParams() {
  return [{ city: 'sf' }, { city: 'la' }, { city: 'seattle' }, { city: 'vegas' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const key = (city in cityData ? city : 'sf') as CityKey;
  const c = cityData[key];
  return {
    title: `${c.name} Success Stories | Bomie AI`,
    description: c.overview,
  };
}

export default async function CityStoriesPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const key = (city in cityData ? city : 'sf') as CityKey;
  const active = cityData[key];

  return (
    <div className="min-h-screen bg-[#f7f4ff] text-[#161224] selection:bg-violet-500 selection:text-[#161224]">
      <header className="sticky top-0 z-40 bg-[#f7f4ff]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10 py-3.5 sm:py-4">
          <div className="flex items-center gap-6 lg:gap-10 min-w-0">
            <Link href="/" className="flex shrink-0 items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#5b21b6] via-[#d946ef] to-[#fbbf24] shadow-md shadow-violet-500/30">
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
            <div className="hidden md:block">
              <CitySwitcher activeCity={key} />
            </div>
          </div>
          <Link
            href="/"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-violet-200/80 bg-white shadow-sm px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-violet-50 hover:text-violet-950"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 sm:py-12 space-y-8">
        {/* City Title & Slogan */}
        <div className="space-y-2.5">
          <div className="md:hidden pb-2">
            <CitySwitcher activeCity={key} />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#161224]">
            {active.name} Local Commerce
          </h1>
          <p className="text-base sm:text-lg font-semibold bg-gradient-to-r from-violet-700 via-fuchsia-600 to-amber-500 bg-clip-text text-transparent">
            {active.slogan}
          </p>
        </div>

        {/* City Hero Card */}
        <div className="overflow-hidden rounded-3xl border border-violet-200/80 bg-white shadow-sm shadow-2xl">
          <div className="relative h-64 sm:h-80 w-full overflow-hidden">
            <img src={active.heroImage} alt={active.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-amber-300">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{active.name} · Verified City Hub</span>
                </div>
                <p className="mt-1 text-lg sm:text-2xl font-bold text-white">{active.tagline}</p>
              </div>
              <div className="flex flex-wrap lg:flex-nowrap gap-3 shrink-0">
                {active.stats.map((st) => (
                  <div
                    key={st.label}
                    className="rounded-xl border border-white/25 bg-black/65 px-4 py-2.5 backdrop-blur-md whitespace-nowrap"
                  >
                    <div className="text-[10px] font-mono uppercase text-slate-300">{st.label}</div>
                    <div className="text-base font-extrabold text-white">{st.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="p-6 sm:p-8 text-sm sm:text-base leading-relaxed text-slate-600">
            {active.overview}
          </div>
        </div>

        {/* 4 Illustrated Brand Case Studies */}
        <div className="grid gap-6 md:grid-cols-2">
          {active.cases.map((cs) => (
            <div
              key={cs.brand}
              className="overflow-hidden rounded-3xl border border-violet-200/70 bg-white shadow-sm transition hover:border-violet-500/40"
            >
              <div className="relative h-52 w-full overflow-hidden">
                <img src={cs.image} alt={cs.brand} loading="lazy" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />
                <div className="absolute top-4 right-4 rounded-full border border-emerald-400/35 bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-700 backdrop-blur-md">
                  {cs.metric}
                </div>
                <div className="absolute bottom-4 left-5 right-5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-amber-700">
                    {cs.industry}
                  </div>
                  <h2 className="text-xl font-bold text-white">{cs.brand}</h2>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-violet-700">Matched Creator: {cs.creator}</span>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-slate-600">{cs.summary}</p>
                <div className="rounded-2xl border border-violet-100 bg-[#f7f4ff] p-3.5 text-xs italic text-slate-600">
                  {cs.quote}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-4">
          <CityBookDemoButton cityName={active.name} />
        </div>
      </main>
      <BrandFooter />
    </div>
  );
}
