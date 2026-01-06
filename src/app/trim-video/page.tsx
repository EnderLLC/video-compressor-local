import VideoTrimmer from "@/components/features/video-trimmer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Trim Video Online - Cut MP4/MOV Fast & Free",
  description: "Cut video segments instantly without losing privacy. Your files never leave your browser.",
};

export default function TrimVideoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Video Trimmer
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Cut precise segments from your videos securely, right in your browser. No uploads, no privacy risks.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <Card className="border shadow-lg">
              <CardHeader>
                <CardTitle>Trim Your Video</CardTitle>
                <CardDescription>
                  Upload a video file (MP4, MOV, AVI, etc.) and specify start/end times to extract a segment.
                  Processing happens locally via WebAssembly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VideoTrimmer />
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
                  <span><strong>Set start & end times</strong> – Enter the exact seconds where you want the cut to begin and end.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-indigo-500 text-white rounded-full text-center mr-3 flex-shrink-0">3</span>
                  <span><strong>Trim & Download</strong> – Click Trim; FFmpeg loads (once) and cuts the segment locally. No re‑encoding, instant result.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:w-1/3">
            <Card className="border shadow">
              <CardHeader>
                <CardTitle>Why Use Local Trimmer</CardTitle>
                <CardDescription>Key advantages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300">Stream Copy – No Quality Loss</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                    Uses FFmpeg’s stream‑copy mode. The video is not re‑encoded, so quality stays identical and processing takes seconds.
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h3 className="font-semibold text-green-800 dark:text-green-300">Privacy Guaranteed</h3>
                  <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                    Your video never leaves your computer. All processing happens inside your browser using WebAssembly.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h3 className="font-semibold text-purple-800 dark:text-purple-300">Unlimited Size</h3>
                  <p className="text-sm text-purple-700 dark:text-purple-400 mt-1">
                    Trim 1GB, 5GB or even 10GB videos. No artificial limits because everything runs on your hardware.
                  </p>
                </div>
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <h3 className="font-semibold text-amber-800 dark:text-amber-300">Frame‑Accurate</h3>
                  <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                    Cuts exactly at the specified time points, preserving audio‑video sync. Works with MP4, MOV, AVI, MKV, and more.
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