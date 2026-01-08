import VideoLooper from "@/components/features/video-looper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdUnit from "@/components/ads/ad-unit";
import { AD_SLOTS } from "@/config/ads";

export const metadata = {
  title: "Loop Video Online - Repeat MP4 Automatically",
  description: "Repeat your video multiple times in a single file. Loop without re‑encoding, preserving original quality. Entirely in your browser—no uploads, no privacy risks.",
};

export default function LoopVideoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Loop Video
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Repeat your video 2×, 3×, 5×, or up to 10× in a single file. Uses stream copy for lightning‑fast processing—no quality loss, no re‑encoding.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <Card className="border shadow-lg">
              <CardHeader>
                <CardTitle>Loop Your Video</CardTitle>
                <CardDescription>
                  Upload a video file and choose how many times to repeat it. Processing is nearly instant because we copy the stream without re‑encoding.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VideoLooper />
                <AdUnit slotId={AD_SLOTS.tool} format="rectangle" className="mt-8" />
              </CardContent>
            </Card>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-indigo-500 text-white rounded-full text-center mr-3 flex-shrink-0">1</span>
                  <span><strong>Select a video</strong> – Drag & drop or click to browse. Supports MP4, MOV, AVI, etc. The video is not uploaded to any server—everything stays in your browser.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-indigo-500 text-white rounded-full text-center mr-3 flex-shrink-0">2</span>
                  <span><strong>Choose repeat count</strong> – Pick how many times you want the video to repeat (2×, 3×, 4×, 5×, 10×). The total length will be original duration multiplied by the repeat count.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-indigo-500 text-white rounded-full text-center mr-3 flex-shrink-0">3</span>
                  <span><strong>Loop video</strong> – Click the button; FFmpeg loads (once) and uses stream‑loop to duplicate the video without re‑encoding. Processing is extremely fast.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-indigo-500 text-white rounded-full text-center mr-3 flex-shrink-0">4</span>
                  <span><strong>Download & save</strong> – Get your looped video instantly. The result is automatically saved to your workspace for future access.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:w-1/3">
            <Card className="border shadow">
              <CardHeader>
                <CardTitle>Why Loop With Us?</CardTitle>
                <CardDescription>Key advantages of our tool</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300">Zero Re‑encoding</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                    We use FFmpeg’s stream‑loop copy, which duplicates the video without touching the pixels. Quality stays exactly the same.
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h3 className="font-semibold text-green-800 dark:text-green-300">Lightning Fast</h3>
                  <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                    Because there’s no encoding step, looping a 2‑minute video takes less than a second.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h3 className="font-semibold text-purple-800 dark:text-purple-300">Privacy First</h3>
                  <p className="text-sm text-purple-700 dark:text-purple-400 mt-1">
                    Your video never leaves your computer. All processing happens inside your browser using WebAssembly.
                  </p>
                </div>
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <h3 className="font-semibold text-amber-800 dark:text-amber-300">Workspace Integration</h3>
                  <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                    Every looped video is automatically saved to your personal workspace for easy access later.
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