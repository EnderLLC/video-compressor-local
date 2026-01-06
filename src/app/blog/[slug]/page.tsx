import { getPostBySlug } from "@/config/blog-posts";
import { notFound } from "next/navigation";
import { ArrowRightIcon, CalendarDaysIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }
  return {
    title: `${post.title} – Local Media Tools Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  // Tool mapping for sidebar
  const toolInfo: Record<string, { name: string; description: string; href: string; color: string }> = {
    'compress-video': {
      name: 'Video Compressor',
      description: 'Reduce video file size without uploading. Perfect for WhatsApp, email, or storage saving.',
      href: '/compress-video',
      color: 'from-indigo-500 to-purple-600',
    },
    'convert-video': {
      name: 'Video Converter',
      description: 'Convert videos to MP4, MOV, MKV, AVI, MP3, GIF—all locally, no uploads.',
      href: '/convert-video',
      color: 'from-emerald-500 to-teal-600',
    },
    'crop-video': {
      name: 'Video Cropper',
      description: 'Crop videos to any aspect ratio visually. Keep only the region you want.',
      href: '/crop-video',
      color: 'from-purple-500 to-pink-600',
    },
    'trim-video': {
      name: 'Video Trimmer',
      description: 'Cut precise segments from your videos with stream‑copy (no re‑encode).',
      href: '/trim-video',
      color: 'from-amber-500 to-orange-600',
    },
    'rotate-video': {
      name: 'Rotate & Flip',
      description: 'Rotate videos 90°, 180°, or flip horizontally/vertically. Fix sideways videos instantly.',
      href: '/rotate-video',
      color: 'from-cyan-500 to-blue-600',
    },
    'remove-audio': {
      name: 'Remove Audio',
      description: 'Strip the audio track from your videos completely, leaving only the video.',
      href: '/remove-audio',
      color: 'from-rose-500 to-red-600',
    },
    'increase-volume': {
      name: 'Volume Booster',
      description: 'Increase or decrease the audio volume of your videos. Video stream stays untouched.',
      href: '/increase-volume',
      color: 'from-blue-500 to-cyan-600',
    },
  };

  const tool = post.relatedTool ? toolInfo[post.relatedTool] : null;

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Header */}
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
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main content */}
          <article className="lg:w-2/3">
            <div className="max-w-3xl">
              {/* Breadcrumb */}
              <nav className="mb-8">
                <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <li>
                    <Link href="/" className="hover:text-gray-900 dark:hover:text-white">Home</Link>
                  </li>
                  <li>/</li>
                  <li>
                    <Link href="/blog" className="hover:text-gray-900 dark:hover:text-white">Blog</Link>
                  </li>
                  <li>/</li>
                  <li className="text-gray-900 dark:text-white font-medium truncate">{post.title}</li>
                </ol>
              </nav>

              {/* Title and meta */}
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
                {post.title}
              </h1>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <CalendarDaysIcon className="w-5 h-5 text-gray-400" />
                  <time dateTime={post.date} className="text-gray-600 dark:text-gray-300">
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time>
                </div>
                {tool && (
                  <div className="flex items-center gap-2">
                    <DocumentTextIcon className="w-5 h-5 text-gray-400" />
                    <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 text-sm font-medium">
                      {tool.name}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="mt-12 prose prose-lg max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-indigo-600 dark:prose-a:text-indigo-400">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>

              {/* Back to blog */}
              <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-800 dark:hover:text-indigo-300"
                >
                  <ArrowRightIcon className="w-4 h-4 rotate-180" />
                  Back to all guides
                </Link>
              </div>
            </div>
          </article>

          {/* Sticky sidebar */}
          <aside className="lg:w-1/3">
            <div className="sticky top-24 space-y-8">
              {/* Related tool CTA */}
              {tool && (
                <div className={`rounded-2xl bg-gradient-to-br ${tool.color} p-8 text-white shadow-2xl`}>
                  <h3 className="text-2xl font-bold">Try {tool.name}</h3>
                  <p className="mt-4 opacity-90">
                    {tool.description}
                  </p>
                  <div className="mt-8">
                    <Link
                      href={tool.href}
                      className="inline-flex items-center justify-center w-full py-3 px-6 rounded-lg bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors"
                    >
                      Start now
                      <ArrowRightIcon className="w-5 h-5 ml-2" />
                    </Link>
                  </div>
                  <p className="mt-4 text-sm opacity-80">
                    No uploads • 100% local • Unlimited size
                  </p>
                </div>
              )}

              {/* Additional resources */}
              <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 shadow-xl ring-1 ring-gray-200 dark:ring-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">More helpful guides</h3>
                <ul className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="/blog"
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                      All blog posts
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/compress-video"
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                      Video compression guide
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/convert-video"
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                      Video conversion guide
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/trim-video"
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                      How to trim videos
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Newsletter placeholder */}
              <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 p-8 shadow-xl ring-1 ring-gray-200 dark:ring-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Stay updated</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Get new guides and tool updates directly in your inbox.
                </p>
                <div className="mt-6">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                    <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700">
                      Subscribe
                    </button>
                  </div>
                  <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                    No spam, unsubscribe anytime.
                  </p>
                </div>
              </div>
            </div>
          </aside>
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