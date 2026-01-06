import VideoRotator from "@/components/features/video-rotator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Rotate & Flip Video Online - Fix Sideways Videos Free",
  description: "Rotate or flip videos 90°, 180°, horizontally or vertically. Fix sideways videos instantly. All processing happens locally in your browser.",
};

export default function RotateVideoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Rotate & Flip Video
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Fix sideways videos or apply mirror effects with one click. All processing happens securely in your browser—your files never leave your computer.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <Card className="border shadow-lg">
              <CardHeader>
                <CardTitle>Rotate or Flip Your Video</CardTitle>
                <CardDescription>
                  Upload a video file (MP4, MOV, AVI, etc.) and choose the transformation you need. Processing happens locally via WebAssembly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VideoRotator />
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
                  <span><strong>Choose transformation</strong> – Pick rotate left/right, 180° flip, horizontal or vertical mirror.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-indigo-500 text-white rounded-full text-center mr-3 flex-shrink-0">3</span>
                  <span><strong>Process & Download</strong> – Click Process; FFmpeg loads (once) and applies the transformation locally. The result is re‑encoded for compatibility.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:w-1/3">
            <Card className="border shadow">
              <CardHeader>
                <CardTitle>Why Use Local Rotator</CardTitle>
                <CardDescription>Key advantages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300">Fix Sideways Videos</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                    Recorded with your phone sideways? Rotate 90° or 180° to correct the orientation in seconds.
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h3 className="font-semibold text-green-800 dark:text-green-300">Privacy Guaranteed</h3>
                  <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                    Your video never leaves your computer. All processing happens inside your browser using WebAssembly.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h3 className="font-semibold text-purple-800 dark:text-purple-300">Mirror Effects</h3>
                  <p className="text-sm text-purple-700 dark:text-purple-400 mt-1">
                    Create horizontal or vertical flips for creative projects, tutorials, or social‑media content.
                  </p>
                </div>
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <h3 className="font-semibold text-amber-800 dark:text-amber-300">Re‑encoding for Compatibility</h3>
                  <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                    The transformed video is re‑encoded with libx264 (ultrafast preset) to ensure playback on any device.
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