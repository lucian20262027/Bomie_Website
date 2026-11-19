import type { Metadata } from 'next';
import CommerceOsClient from './CommerceOsClient';

export const metadata: Metadata = {
  title: "Commerce OS — North America's First AI Operating System for Local Commerce | Bomie AI",
  description:
    'Test the Bomie AI Commerce OS live: match nearby local creators, generate 30-second FTC-compliant scripts, and automate 30/40/30 Stripe escrow.',
  alternates: { canonical: '/commerce-os' },
};

export default function CommerceOsPage() {
  return <CommerceOsClient />;
}
