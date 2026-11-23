import type { Metadata } from 'next';
import ResearchClient from './ResearchClient';

export const metadata: Metadata = {
  title: 'Bomie Research — Local Business & Creator Economy Reports | Bomie AI',
  description:
    'Research insights, industry reports, and whitepapers from Bomie AI on U.S. small business marketing ROI, hyper-local creator conversion, and FTC 16 CFR Part 255 compliance.',
  alternates: {
    canonical: 'https://www.bomie.ai/why-bomie/research',
  },
};

export default function BomieResearchPage() {
  return <ResearchClient />;
}
