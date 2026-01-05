import VideoCompressor from "@/components/features/video-compressor";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Video Compressor - Local Media Tools",
  description: "Compress videos instantly without losing privacy. Your files never leave your browser.",
};

export default function CompressVideoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Video Compressor
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Reduce video file size securely, right in your browser. No uploads, no privacy risks.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <Card className="border shadow-lg">
              <CardHeader>
                <CardTitle>Compress Your Video</CardTitle>
                <CardDescription>
                  Upload a video file (MP4, MOV, AVI, etc.) and compress it with a single click.
                  Processing happens locally via WebAssembly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VideoCompressor />
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
                  <span><strong>Compress</strong> – Click the button; FFmpeg loads (once) and processes the video locally.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-indigo-500 text-white rounded-full text-center mr-3 flex-shrink-0">3</span>
                  <span><strong>Download</strong> – Get your compressed video instantly. No limits, no watermarks.</span>
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
                  <h3 className="font-semibold text-purple-800 dark:text-purple-300">Unlimited Size</h3>
                  <p className="text-sm text-purple-700 dark:text-purple-400 mt-1">
                    Compress 1GB, 5GB or even 10GB videos. No artificial limits because everything runs on your hardware.
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