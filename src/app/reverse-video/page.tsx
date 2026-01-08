import VideoReverser from "@/components/features/video-reverser";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdUnit from "@/components/ads/ad-unit";
import { AD_SLOTS } from "@/config/ads";

export const metadata = {
  title: "Reverse Video Online - Rewind MP4 Effects",
  description: "Create backwards videos instantly. Reverse both video and audio with one click, entirely in your browser. No uploads, no privacy risks.",
};

export default function ReverseVideoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Reverse Video
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Turn any video backwards—movements play in reverse, audio can be muted or reversed. Everything happens locally—your files never leave your browser.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <Card className="border shadow-lg">
              <CardHeader>
                <CardTitle>Reverse Your Video</CardTitle>
                <CardDescription>
                  Upload a video file and choose whether to keep reversed audio or mute it. Processing loads the entire video into memory, so shorter videos work best.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VideoReverser />
                <AdUnit slotId={AD_SLOTS.tool} format="rectangle" className="mt-8" />
              </CardContent>
            </Card>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-indigo-500 text-white rounded-full text-center mr-3 flex-shrink-0">1</span>
                  <span><strong>Select a video</strong> – Drag & drop or click to browse. Supports MP4, MOV, AVI, etc. Keep in mind that the entire video is loaded into memory for processing.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-indigo-500 text-white rounded-full text-center mr-3 flex-shrink-0">2</span>
                  <span><strong>Choose audio option</strong> – Reverse audio (default) or mute it (reversed audio can sound eerie). The choice affects the final output.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-indigo-500 text-white rounded-full text-center mr-3 flex-shrink-0">3</span>
                  <span><strong>Reverse video</strong> – Click the button; FFmpeg loads (once) and applies reverse filter to both video and audio streams.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-indigo-500 text-white rounded-full text-center mr-3 flex-shrink-0">4</span>
                  <span><strong>Download & save</strong> – Get your reversed video instantly. The result is automatically saved to your workspace for future access.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:w-1/3">
            <Card className="border shadow">
              <CardHeader>
                <CardTitle>Privacy First</CardTitle>
                <CardDescription>Why we’re different</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300">Zero Server Upload</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                    Your video never leaves your computer. All processing happens inside your browser using WebAssembly.
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h3 className="font-semibold text-green-800 dark:text-green-300">No Data Retention</h3>
                  <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                    We don’t store, track, or analyze your files. After you close the tab, everything is gone.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h3 className="font-semibold text-purple-800 dark:text-purple-300">Memory‑Aware Processing</h3>
                  <p className="text-sm text-purple-700 dark:text-purple-400 mt-1">
                    We warn you if the video is too large for safe reversal, helping you avoid browser crashes.
                  </p>
                </div>
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <h3 className="font-semibold text-amber-800 dark:text-amber-300">Workspace Integration</h3>
                  <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                    Every reversed video is automatically saved to your personal workspace for easy access later.
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