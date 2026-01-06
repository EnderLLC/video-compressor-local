import VideoCropper from "@/components/features/video-cropper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Crop Video Online - Resize for TikTok, Instagram & YouTube",
  description: "Crop videos to any aspect ratio (1:1, 9:16, 16:9) instantly without losing privacy. Your files never leave your browser.",
};

export default function CropVideoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Video Cropper
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Crop videos to perfect dimensions for TikTok, Instagram, YouTube, and more. All processing happens securely in your browser.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <Card className="border shadow-lg">
              <CardHeader>
                <CardTitle>Crop Your Video</CardTitle>
                <CardDescription>
                  Upload a video file (MP4, MOV, AVI, etc.) and drag the cropping rectangle to select the region you want to keep.
                  Processing happens locally via WebAssembly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VideoCropper />
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
                  <span><strong>Adjust crop area</strong> – Drag the rectangle to select the region. Use aspect‑ratio buttons for popular platforms (1:1, 9:16, 16:9, etc.).</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-indigo-500 text-white rounded-full text-center mr-3 flex-shrink-0">3</span>
                  <span><strong>Crop & Download</strong> – Click Crop; FFmpeg loads (once) and crops the video locally. The result is re‑encoded for compatibility.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:w-1/3">
            <Card className="border shadow">
              <CardHeader>
                <CardTitle>Why Use Local Cropper</CardTitle>
                <CardDescription>Key advantages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300">Precise Visual Cropping</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                    Interactive cropping UI lets you visually select the exact region you want to keep, pixel‑perfect.
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h3 className="font-semibold text-green-800 dark:text-green-300">Privacy Guaranteed</h3>
                  <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                    Your video never leaves your computer. All processing happens inside your browser using WebAssembly.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h3 className="font-semibold text-purple-800 dark:text-purple-300">Platform‑Optimized Ratios</h3>
                  <p className="text-sm text-purple-700 dark:text-purple-400 mt-1">
                    One‑click aspect ratios for Instagram (1:1), TikTok (9:16), YouTube (16:9), and more. No manual calculations.
                  </p>
                </div>
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <h3 className="font-semibold text-amber-800 dark:text-amber-300">Re‑encoding for Compatibility</h3>
                  <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                    The cropped video is re‑encoded with libx264 (ultrafast preset) to ensure playback on any device.
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