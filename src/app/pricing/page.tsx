import type { Metadata } from 'next';
import PricingClient from './PricingClient';

export const metadata: Metadata = {
  title: 'Pricing — MVP 100% Free for Small Businesses & Transparent Future Tiers | Bomie AI',
  description:
    'Bomie AI is 100% free during our MVP launch to empower neighborhood small businesses and local creators, with transparent post-MVP plans starting at $49/mo.',
};

export default function PricingPage() {
  return <PricingClient />;
}
