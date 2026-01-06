import { BLOG_POSTS, BlogPost } from "@/config/blog-posts";

/**
 * Get all blog posts, filtered by schedule.
 * In development, all posts are returned (including future‑dated).
 * In production, only posts with date <= today are returned.
 * Posts are sorted newest first.
 */
export function getAllPosts(): BlogPost[] {
  const isDev = process.env.NODE_ENV === 'development';
  const now = new Date();

  const filtered = BLOG_POSTS.filter(post => {
    if (isDev) return true;
    // production: only include posts that are published (date <= now)
    const postDate = new Date(post.date);
    return postDate <= now;
  });


  // Sort by date descending (newest first)
  return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single post by slug, respecting schedule.
 * Returns undefined if the post does not exist or is not yet published in production.
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find(post => post.slug === slug);
}

/**
 * Get the latest posts (already sorted by getAllPosts).
 * Optionally limit the number of posts.
 */
export function getLatestPosts(limit?: number): BlogPost[] {
  const posts = getAllPosts();
  return limit ? posts.slice(0, limit) : posts;
}