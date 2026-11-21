import type { Metadata } from 'next';
import DemoClient from './DemoClient';

export const metadata: Metadata = {
  title: 'Interactive Product Demo — AI Campaign Intake, FTC Governance & Escrow | Bomie AI',
  description:
    'Live interactive sandbox of Bomie AI: test local merchant campaign intake, FTC 16 CFR Part 255 pre-flight compliance auditing, 2K–50K hyper-local creator matching, 30s shot lists, and 30/40/30 Stripe milestone escrow.',
  alternates: {
    canonical: 'https://www.bomie.ai/demo',
  },
};

export default function DemoPage() {
  return <DemoClient />;
}
