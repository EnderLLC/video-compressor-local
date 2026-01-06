import type { Metadata } from "next";
import { notFound } from "next/navigation";
import VideoConverter from "@/components/features/video-converter";
import PopularConversions from "@/components/seo/popular-conversions";
import { parseSlug } from "@/config/conversions";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const conversion = parseSlug(slug);
  if (!conversion) {
    return {
      title: "Conversion Not Found",
      description: "The requested conversion is not available.",
    };
  }

  const { from, to } = conversion;
  const fromUpper = from.toUpperCase();
  const toUpper = to.toUpperCase();

  return {
    title: `Convert ${fromUpper} to ${toUpper} Online - Free & Local`,
    description: `Fastest way to convert ${fromUpper} files to ${toUpper} directly in your browser. Private, free and no upload required.`,
    openGraph: {
      title: `Convert ${fromUpper} to ${toUpper} Online - Free & Local`,
      description: `Fastest way to convert ${fromUpper} files to ${toUpper} directly in your browser. Private, free and no upload required.`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Convert ${fromUpper} to ${toUpper} Online - Free & Local`,
      description: `Fastest way to convert ${fromUpper} files to ${toUpper} directly in your browser. Private, free and no upload required.`,
    },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const conversion = parseSlug(slug);
  if (!conversion) {
    notFound();
  }

  const { from, to } = conversion;

  // SEO text snippets per conversion
  const seoSnippets: Record<string, string> = {
    "mov-to-mp4": "MOV is a popular format for Apple devices, but MP4 is more widely compatible. Convert your MOV videos to MP4 to play them on any device, share online, or reduce file size without losing quality.",
    "mp4-to-mov": "MP4 is a universal video container, but MOV offers better editing support on macOS. Convert MP4 to MOV for seamless integration with Final Cut Pro, iMovie, or other Apple editing software.",
    "mp4-to-gif": "Turn your MP4 video clips into animated GIFs perfect for memes, reaction images, or lightweight web sharing. Our converter preserves the visual quality while optimizing file size.",
    "avi-to-mp4": "AVI is an older format with large file sizes and limited compatibility. Convert AVI to MP4 for better compression, wider device support, and smoother streaming.",
    "mkv-to-mp4": "MKV is great for storing high‑quality video with multiple audio/subtitle tracks, but not all players support it. Convert MKV to MP4 for universal playback on phones, tablets, and TVs.",
    "mp4-to-mp3": "Extract audio from your MP4 videos and save it as an MP3 file. Perfect for creating podcast clips, music samples, or audio‑only versions of your content.",
    // Add more as needed
  };

  const seoText = seoSnippets[slug] || `Convert ${from.toUpperCase()} files to ${to.toUpperCase()} quickly and securely right in your browser. No data leaves your computer—your privacy is guaranteed.`;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Convert <span className="text-blue-600">{from.toUpperCase()}</span> to <span className="text-blue-600">{to.toUpperCase()}</span> Online
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Free, local, browser‑based conversion—no uploads, no registration, no limits.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <VideoConverter
              defaultInputFormat={from}
              defaultOutputFormat={to}
            />
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">About This Conversion</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {seoText}
            </p>
            <h3 className="text-xl font-bold mt-6 mb-2">Why Convert {from.toUpperCase()} to {to.toUpperCase()}?</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
              <li><strong>Compatibility:</strong> {to.toUpperCase()} works on more devices and platforms.</li>
              <li><strong>File Size:</strong> Often results in smaller files without noticeable quality loss.</li>
              <li><strong>Editing:</strong> {to.toUpperCase()} is easier to edit with most video software.</li>
              <li><strong>Sharing:</strong> Upload to social media, email, or cloud storage with fewer issues.</li>
            </ul>
            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <h4 className="font-bold text-blue-800 dark:text-blue-300">🔒 Privacy First</h4>
              <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                All processing happens locally in your browser. Your files never leave your computer.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-gray dark:prose-invert max-w-none">
        <h2>How to Convert {from.toUpperCase()} to {to.toUpperCase()}</h2>
        <ol>
          <li>Drag & drop your {from.toUpperCase()} file into the area above.</li>
          <li>Verify that the target format is set to {to.toUpperCase()} (it should be pre‑selected).</li>
          <li>Click &ldquo;Convert Video&rdquo; and wait a few seconds while FFmpeg processes the file.</li>
          <li>Download your converted {to.toUpperCase()} file—ready to use.</li>
        </ol>
        <h2>Frequently Asked Questions</h2>
        <h3>Is this conversion free?</h3>
        <p>Yes, 100% free. No hidden fees, no trial limits.</p>
        <h3>Are my files uploaded to a server?</h3>
        <p>No. The entire conversion runs inside your browser using WebAssembly. Your data stays on your machine.</p>
        <h3>What are the supported file sizes?</h3>
        <p>You can convert files up to several gigabytes, as long as your browser has enough memory. For best performance, we recommend files under 1 GB.</p>
        <h3>Can I convert multiple files at once?</h3>
        <p>Currently, the tool processes one file at a time. You can queue files by converting them sequentially.</p>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6 text-center">More Tools</h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Explore other popular conversions available on our site.
        </p>
        <PopularConversions />
      </div>
    </div>
  );
}