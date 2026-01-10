import ThumbnailGenerator from "@/components/features/thumbnail-generator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdUnit from "@/components/ads/ad-unit";
import { AD_SLOTS } from "@/config/ads";

export const metadata = {
  title: "Video Thumbnail Generator - Extract Frames from Video",
  description: "Capture high‑quality still frames (JPG/PNG) from any video at any timestamp. Works locally, no uploads, privacy first.",
};

export default function ThumbnailGeneratorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Video Thumbnail Generator
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Extract perfect still frames from your videos—choose any moment, save as JPG or PNG, all processed directly in your browser.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <Card className="border shadow-lg">
              <CardHeader>
                <CardTitle>Capture a Frame</CardTitle>
                <CardDescription>
                  Upload a video, scrub to the exact moment you want, and capture a high‑quality thumbnail. Processing happens entirely in your browser via WebAssembly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ThumbnailGenerator />
                <AdUnit slotId={AD_SLOTS.tool} format="rectangle" className="mt-8" />
              </CardContent>
            </Card>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Why Extract Frames Locally?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300">Frame‑Perfect Accuracy</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                    Slider lets you pick the exact millisecond. The captured frame matches the video pixel‑for‑pixel.
                  </p>
                </div>
                <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
                  <h3 className="font-semibold text-green-800 dark:text-green-300">No Quality Loss</h3>
                  <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                    FFmpeg extracts the original video frame without re‑encoding, preserving the full quality of the source.
                  </p>
                </div>
                <div className="p-4 border rounded-lg bg-purple-50 dark:bg-purple-900/20">
                  <h3 className="font-semibold text-purple-800 dark:text-purple-300">Total Privacy</h3>
                  <p className="text-sm text-purple-700 dark:text-purple-400 mt-1">
                    Your video never leaves your device. The thumbnail is generated inside your browser and saved directly to your computer.
                  </p>
                </div>
                <div className="p-4 border rounded-lg bg-amber-50 dark:bg-amber-900/20">
                  <h3 className="font-semibold text-amber-800 dark:text-amber-300">Works with Any Video</h3>
                  <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                    Supports MP4, MOV, AVI, MKV, WebM, and dozens of other formats. No file‑size limits.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/3">
            <Card className="border shadow">
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full p-2">
                    <span className="font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Upload</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Drag & drop any video file (MP4, MOV, AVI, MKV, etc.).</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full p-2">
                    <span className="font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Scrub to the Moment</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Use the slider or play the video to find the exact frame you want to capture.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full p-2">
                    <span className="font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Choose Format</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Pick between JPG (high quality, smaller) or PNG (lossless, larger).</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full p-2">
                    <span className="font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Capture & Download</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Click “Capture Frame”. The thumbnail appears instantly—download with one click.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow mt-8">
              <CardHeader>
                <CardTitle>Common Uses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-2">
                    <span className="font-bold text-sm text-gray-800 dark:text-gray-200">📸</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">YouTube Thumbnails</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Grab a compelling frame from your video to use as a custom thumbnail.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-2">
                    <span className="font-bold text-sm text-gray-800 dark:text-gray-200">📱</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Social Media Previews</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Extract a frame for Instagram, Twitter, or Facebook post previews.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-2">
                    <span className="font-bold text-sm text-gray-800 dark:text-gray-200">🎬</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Storyboarding</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Capture key scenes to create visual storyboards or shot lists.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-2">
                    <span className="font-bold text-sm text-gray-800 dark:text-gray-200">🖼️</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Video Analysis</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Freeze a specific moment for technical analysis or troubleshooting.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}