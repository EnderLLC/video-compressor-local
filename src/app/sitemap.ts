import { MetadataRoute } from 'next';

const baseUrl = 'https://www.local-media-tools.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/privacy', '/terms'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}