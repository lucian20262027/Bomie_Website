import type { Metadata } from 'next';
import MissionClient from './MissionClient';

export const metadata: Metadata = {
  title: 'Mission & Founder — Deploying Autonomous AI for Main Street | Bomie AI',
  description:
    'Discover the mission behind Bomie AI in San Francisco: deploying automated FTC 16 CFR Part 255 governance, hyper-local creator matching, and 30/40/30 Stripe escrow for America’s 36.2M small businesses.',
  alternates: {
    canonical: 'https://www.bomie.ai/why-bomie/stories',
  },
};

export default function BomieMissionPage() {
  return <MissionClient />;
}
