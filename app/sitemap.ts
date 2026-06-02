import type { MetadataRoute } from 'next';
import { baseUrl, numberMeaningPages } from '@/lib/number-content';

const staticPaths = [
  '/',
  '/numerology-calculator',
  '/name-numerology-calculator',
  '/birthday-number-calculator',
  '/life-path-number-calculator',
  '/how-to-calculate-numerology',
  '/how-to-calculate-life-path-number',
  '/personal-year-numerology-calculator',
  '/address-numerology-calculator',
  '/wedding-date-numerology-calculator',
  '/word-numerology-calculator'
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticPaths.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: path === '/' || path === '/numerology-calculator' ? 1 : 0.8
    })),
    ...numberMeaningPages.map((page) => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7
    }))
  ];
}
