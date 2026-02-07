import { getPostData, getSortedPostsData } from "@/lib/blog";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { CompileMDXResult } from "next-mdx-remote/rsc";
import { MDXRemote } from "next-mdx-remote/rsc";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostData(slug);
  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }
  return {
    title: `${post.title} – Local Media Tools Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 mb-8"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <h1>{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8 not-prose">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString()}
            </time>
            {post.tags && (
              <div className="flex gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <MDXRemote source={post.content} />
        </article>
      </div>
    </div>
  );
}