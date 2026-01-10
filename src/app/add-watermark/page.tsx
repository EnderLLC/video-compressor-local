import VideoWatermark from "@/components/features/video-watermark";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdUnit from "@/components/ads/ad-unit";
import { AD_SLOTS } from "@/config/ads";

export const metadata = {
  title: "Add Logo to Video Online - Watermark Video Free",
  description: "Add a logo or watermark to your video with custom position, size, and padding. Works locally in your browser, no uploads, privacy first.",
};

export default function AddWatermarkPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Video Watermark (Logo Overlay)
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Place your logo, brand, or any image onto a video with precise positioning, sizing, and edge padding. All processing happens locally—your files never leave your computer.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <Card className="border shadow-lg">
              <CardHeader>
                <CardTitle>Add Watermark to Your Video</CardTitle>
                <CardDescription>
                  Upload a video and an image (PNG, JPG, WebP), choose where to place it, adjust its size, and apply the watermark in seconds. Powered by FFmpeg running entirely in your browser.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VideoWatermark />
                <AdUnit slotId={AD_SLOTS.tool} format="rectangle" className="mt-8" />
              </CardContent>
            </Card>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Why Watermark Videos Locally?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300">Privacy & Security</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                    Your video and logo stay on your device. No uploads, no cloud processing, no risk of your content being stored or accessed by third parties.
                  </p>
                </div>
                <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
                  <h3 className="font-semibold text-green-800 dark:text-green-300">Professional Branding</h3>
                  <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                    Add your logo, website URL, or copyright text to protect your content and increase brand recognition across social media and video platforms.
                  </p>
                </div>
                <div className="p-4 border rounded-lg bg-purple-50 dark:bg-purple-900/20">
                  <h3 className="font-semibold text-purple-800 dark:text-purple-300">Full Control</h3>
                  <p className="text-sm text-purple-700 dark:text-purple-400 mt-1">
                    Choose exact position (corners, center), adjust size as a percentage of video width, and set edge padding to fine‑tune the placement.
                  </p>
                </div>
                <div className="p-4 border rounded-lg bg-amber-50 dark:bg-amber-900/20">
                  <h3 className="font-semibold text-amber-800 dark:text-amber-300">Fast & Lossless</h3>
                  <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                    Uses FFmpeg’s efficient overlay filter, preserving original video quality. Audio stream is copied without re‑encoding for fastest processing.
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
                    <h4 className="font-semibold">Upload Video & Logo</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Drag & drop a video file (MP4, MOV, etc.) and an image file (PNG, JPG, WebP).</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full p-2">
                    <span className="font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Choose Position & Size</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Select where the logo should appear (top‑left, bottom‑right, center, etc.) and set its size as a percentage of video width.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full p-2">
                    <span className="font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Adjust Padding (Optional)</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Fine‑tune the distance from the edges with a pixel‑based padding slider.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full p-2">
                    <span className="font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Apply & Download</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Click “Add Watermark”. FFmpeg overlays the logo onto the video and delivers the final file for download—all inside your browser.</p>
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
                    <span className="font-bold text-sm text-gray-800 dark:text-gray-200">🏢</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Brand Protection</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Add your company logo to promotional videos, tutorials, or product demos before sharing them online.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-2">
                    <span className="font-bold text-sm text-gray-800 dark:text-gray-200">📱</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Social Media Content</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Place a subtle logo in the corner of Instagram Reels, TikTok clips, or YouTube Shorts to maintain brand visibility.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-2">
                    <span className="font-bold text-sm text-gray-800 dark:text-gray-200">🎓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Educational Videos</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Watermark lecture recordings or tutorial videos with your channel logo to prevent unauthorized redistribution.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-2">
                    <span className="font-bold text-sm text-gray-800 dark:text-gray-200">📅</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Personal Projects</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Add a custom watermark to family videos, travel vlogs, or hobby clips before uploading to cloud storage or sharing with friends.</p>
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