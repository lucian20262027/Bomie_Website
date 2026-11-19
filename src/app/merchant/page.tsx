import type { Metadata } from 'next';
import MerchantClient from './MerchantClient';

export const metadata: Metadata = {
  title: 'For Local Merchants — Turn Neighborhood Reels Into Walk-In Traffic | Bomie AI',
  description:
    'Launch hyper-local creator campaigns in minutes with $0 MVP platform fee, automated FTC 16 CFR Part 255 compliance, QR attribution, and 30/40/30 Stripe escrow.',
  alternates: { canonical: '/merchant' },
};

export default function MerchantPage() {
  return <MerchantClient />;
}
