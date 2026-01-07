import VideoSpeedController from "@/components/features/video-speed-controller";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdUnit from "@/components/ads/ad-unit";
import { AD_SLOTS } from "@/config/ads";

export const metadata = {
  title: "Change Video Speed Online - Slow Motion & Fast Forward",
  description: "Speed up or slow down videos instantly in your browser. No uploads, no privacy risks. Create slow‑motion or fast‑forward clips with one click.",
};

export default function VideoSpeedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Video Speed Controller
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Change video playback speed (slow‑motion, fast‑forward) securely, right in your browser. Your files never leave your device.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <Card className="border shadow-lg">
              <CardHeader>
                <CardTitle>Adjust Video Speed</CardTitle>
                <CardDescription>
                  Upload a video, choose a speed factor (0.25x – 4x), and apply the change. Processing happens locally via WebAssembly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VideoSpeedController />
                <AdUnit slotId={AD_SLOTS.tool} format="rectangle" className="mt-8" />
              </CardContent>
            </Card>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-indigo-500 text-white rounded-full text-center mr-3 flex-shrink-0">1</span>
                  <span><strong>Select a video</strong> – Drag & drop or click to browse. Files stay in your browser.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-indigo-500 text-white rounded-full text-center mr-3 flex-shrink-0">2</span>
                  <span><strong>Choose speed</strong> – Use the slider or preset buttons to set the desired playback speed (0.25x – 4x).</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-indigo-500 text-white rounded-full text-center mr-3 flex-shrink-0">3</span>
                  <span><strong>Apply & download</strong> – Click “Apply Speed Change”; FFmpeg processes the video locally and delivers the result.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:w-1/3">
            <Card className="border shadow">
              <CardHeader>
                <CardTitle>Why Use This Tool</CardTitle>
                <CardDescription>Key benefits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300">Perfect for Social Media</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                    Create engaging slow‑motion clips for TikTok, Instagram Reels, or YouTube Shorts without complicated software.
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h3 className="font-semibold text-green-800 dark:text-green-300">Audio‑Aware Processing</h3>
                  <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                    The tool automatically adjusts audio pitch (within 0.5x–2.0x range) or lets you mute audio for extreme speed changes.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h3 className="font-semibold text-purple-800 dark:text-purple-300">Privacy Guaranteed</h3>
                  <p className="text-sm text-purple-700 dark:text-purple-400 mt-1">
                    Your video is processed entirely in your browser using FFmpeg.wasm. No server upload, no data retention.
                  </p>
                </div>
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <h3 className="font-semibold text-amber-800 dark:text-amber-300">No Limits</h3>
                  <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                    Speed up or slow down videos of any length or size. Works with MP4, MOV, AVI, WebM, and more.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}