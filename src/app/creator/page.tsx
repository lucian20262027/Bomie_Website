import type { Metadata } from 'next';
import CreatorClient from './CreatorClient';

export const metadata: Metadata = {
  title: 'For Local Creators — Paid Neighborhood Brand Collabs & 0% Fee | Bomie AI',
  description:
    'Get matched with nearby restaurants, spas, and boutiques with zero cold DMs, AI 30-second shot lists, and 30/40/30 Stripe escrow payouts.',
  alternates: { canonical: '/creator' },
};

export default function CreatorPage() {
  return <CreatorClient />;
}
