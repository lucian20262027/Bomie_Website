import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.bomie.ai';
  const lastModified = new Date();

  const routes: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' }[] = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/commerce-os', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/merchant', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/creator', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/pricing', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/stories/sf', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/stories/la', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/stories/seattle', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/stories/vegas', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/why-bomie/stories', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/why-bomie/research', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/privacy', priority: 0.3, changeFrequency: 'monthly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'monthly' },
  ];

  return routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
