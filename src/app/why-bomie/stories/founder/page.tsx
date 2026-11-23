import type { Metadata } from 'next';
import FounderProfileClient from './FounderProfileClient';

const FOUNDER_URL = 'https://www.bomie.ai/why-bomie/stories/founder';

export const metadata: Metadata = {
  title: 'Founder Profile — Lucian Wang | Bomie AI',
  description:
    'Meet Lucian Wang, Founder & CEO of Bomie AI in San Francisco. Former TikTok global seller governance lead, B2B supply-chain operator, MS in CS (City St George’s), Babson MBA, and University of Cambridge alumnus.',
  alternates: {
    canonical: FOUNDER_URL,
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Lucian Wang',
  jobTitle: 'Founder & CEO',
  url: FOUNDER_URL,
  sameAs: [
    'https://www.linkedin.com/in/lucianwang18',
    'https://www.crunchbase.com/organization/bomie-ai',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Bomie AI',
    url: 'https://www.bomie.ai',
  },
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'Babson College',
    },
    {
      '@type': 'CollegeOrUniversity',
      name: "City St George's, University of London",
    },
    {
      '@type': 'CollegeOrUniversity',
      name: 'University of Cambridge',
    },
  ],
};

export default function FounderProfilePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <FounderProfileClient />
    </>
  );
}
