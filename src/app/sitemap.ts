import { MetadataRoute } from 'next';
import { getAllSlugs } from '@/config/conversions';

const baseUrl = 'https://www.local-media-tools.com';

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticRoutes = ['', '/privacy', '/terms', '/compress-video', '/convert-video'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic tool pages
  const toolSlugs = getAllSlugs();
  const toolRoutes = toolSlugs.map((slug) => ({
    url: `${baseUrl}/tools/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...toolRoutes];
}