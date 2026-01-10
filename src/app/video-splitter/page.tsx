import VideoSplitter from "@/components/features/video-splitter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdUnit from "@/components/ads/ad-unit";
import { AD_SLOTS } from "@/config/ads";

export const metadata = {
  title: "Video Splitter Online - Cut Video into Parts for Stories",
  description: "Split long videos into equal‑length segments (15s, 30s, 60s) for Instagram Stories, WhatsApp Status, TikTok Shorts. Works locally, no uploads, privacy first.",
};

export default function VideoSplitterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Video Splitter (Story Cutter)
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Automatically cut a long video into equal‑length segments—perfect for Instagram Stories, WhatsApp Status, TikTok Shorts, or any social‑media format.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <Card className="border shadow-lg">
              <CardHeader>
                <CardTitle>Split Your Video</CardTitle>
                <CardDescription>
                  Upload a video, choose the segment length (15, 30, 60 seconds, or any custom duration), and split it into separate files. Processing happens entirely in your browser via WebAssembly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VideoSplitter />
                <AdUnit slotId={AD_SLOTS.tool} format="rectangle" className="mt-8" />
              </CardContent>
            </Card>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Why Split Videos Locally?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300">No Upload, No Waiting</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                    The video stays on your device. Splitting is performed by FFmpeg running inside your browser—no network transfer, no server delays.
                  </p>
                </div>
                <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
                  <h3 className="font-semibold text-green-800 dark:text-green-300">Stream‑Copy Fast</h3>
                  <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                    Uses FFmpeg’s <code className="text-xs">-c copy</code> mode: segments are cut without re‑encoding, preserving original quality and completing in seconds.
                  </p>
                </div>
                <div className="p-4 border rounded-lg bg-purple-50 dark:bg-purple-900/20">
                  <h3 className="font-semibold text-purple-800 dark:text-purple-300">Total Privacy</h3>
                  <p className="text-sm text-purple-700 dark:text-purple-400 mt-1">
                    Your video never leaves your computer. The resulting segments are created locally and downloaded directly to your disk.
                  </p>
                </div>
                <div className="p-4 border rounded-lg bg-amber-50 dark:bg-amber-900/20">
                  <h3 className="font-semibold text-amber-800 dark:text-amber-300">Perfect for Social Media</h3>
                  <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                    Pre‑configured durations match Instagram Stories (15s), WhatsApp Status (30s), and TikTok/YouTube Shorts (60s). Custom length also available.
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
                    <h4 className="font-semibold">Choose Segment Length</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Pick 15s for Stories, 30s for Status, 60s for Shorts, or enter any custom duration.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full p-2">
                    <span className="font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Split</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Click “Split Video”. FFmpeg will cut the video into equal‑length pieces without re‑encoding.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full p-2">
                    <span className="font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Download Segments</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Each segment appears as a separate downloadable file. Click “Download Part” to save them individually.</p>
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
                    <span className="font-bold text-sm text-gray-800 dark:text-gray-200">📱</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Instagram Stories</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Split a 60‑second video into four 15‑second Story‑ready clips.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-2">
                    <span className="font-bold text-sm text-gray-800 dark:text-gray-200">✂️</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">WhatsApp Status</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Create 30‑second segments that fit perfectly into WhatsApp’s Status limit.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-2">
                    <span className="font-bold text-sm text-gray-800 dark:text-gray-200">🎬</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">TikTok / YouTube Shorts</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Cut long videos into 60‑second clips ready for short‑form platforms.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-2">
                    <span className="font-bold text-sm text-gray-800 dark:text-gray-200">📅</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Daily Vlogs</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Split a 10‑minute vlog into daily 1‑minute snippets for scheduled posting.</p>
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