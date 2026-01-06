import { BLOG_POSTS } from "@/config/blog-posts";
import { CalendarDaysIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const metadata = {
  title: "Blog – Video Compression Guides & Tutorials",
  description: "Step‑by‑step guides on how to compress, convert, trim, and edit videos for WhatsApp, Instagram, and other platforms.",
};

export default function BlogPage() {
  const posts = BLOG_POSTS;

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Hero header */}
      <div className="relative isolate px-6 lg:px-8 pt-12 lg:pt-16">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl lg:text-7xl dark:text-white">
            Latest Guides & Tutorials
          </h1>
          <p className="mt-6 text-xl text-pretty text-gray-600 dark:text-gray-300">
            Learn how to get the most out of our tools with step‑by‑step tutorials, best practices, and expert tips.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 text-sm font-medium">
              <CalendarDaysIcon className="w-4 h-4" />
              {posts.length} article{posts.length !== 1 ? 's' : ''} available
            </div>
          </div>
        </div>
      </div>

      {/* Blog posts grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 shadow-xl ring-1 ring-gray-200 dark:ring-gray-700 hover:shadow-2xl transition-shadow"
            >
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <CalendarDaysIcon className="w-4 h-4" />
                    <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                    {post.relatedTool && (
                      <>
                        <span className="mx-1">•</span>
                        <span className="px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 text-xs font-medium">
                          {post.relatedTool.replace('-', ' ')}
                        </span>
                      </>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      <span className="absolute inset-0" aria-hidden="true" />
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-4 text-gray-600 dark:text-gray-300 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
                <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-800 dark:hover:text-indigo-300"
                  >
                    Read full guide
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state (if no posts) */}
        {posts.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">No articles yet</h3>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Check back soon for tutorials and guides.</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-24 text-center">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Need help with a specific video task?</h3>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Use our tools to compress, convert, trim, crop, rotate, or adjust audio—all in your browser, with no uploads.
          </p>
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
            >
              Explore all tools
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Background accent */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
        />
      </div>
    </div>
  );
}