import { MetadataRoute } from 'next';
import { getSortedPostsData } from '@/lib/blog';
import { getAllSlugs } from '@/config/conversions';

const baseUrl = 'https://www.local-media-tools.com';

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticRoutes = [
    '',
    '/privacy',
    '/terms',
    '/compress-video',
    '/convert-video',
    '/adjust-video',
    '/blog',
    '/settings'
  ].map((route) => ({
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

  // Blog posts
  const blogPosts = getSortedPostsData();
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...toolRoutes, ...blogRoutes];
}