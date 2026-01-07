import GifMaker from "@/components/features/gif-maker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdUnit from "@/components/ads/ad-unit";
import { AD_SLOTS } from "@/config/ads";

export const metadata = {
  title: "Video to GIF Converter - High Quality & Online",
  description: "Convert videos to animated GIFs instantly, without leaving your browser. No uploads, no privacy risks.",
};

export default function VideoToGifPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Video to GIF Converter
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Turn any video into a high‑quality animated GIF with customizable FPS and size. Everything runs locally in your browser.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <Card className="border shadow-lg">
              <CardHeader>
                <CardTitle>Create Your GIF</CardTitle>
                <CardDescription>
                  Upload a video file (MP4, MOV, AVI, etc.) and convert it to a GIF with adjustable frame rate and width.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <GifMaker />
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
                  <span><strong>Adjust settings</strong> – Choose FPS (frames per second) and output width for optimal GIF size and quality.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-indigo-500 text-white rounded-full text-center mr-3 flex-shrink-0">3</span>
                  <span><strong>Convert & download</strong> – Click “Convert to GIF”; processing happens locally via WebAssembly. Download your GIF instantly.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:w-1/3">
            <Card className="border shadow">
              <CardHeader>
                <CardTitle>Why Use Our GIF Converter?</CardTitle>
                <CardDescription>Key advantages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300">Local Processing</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                    Your video never leaves your computer. All conversion happens inside your browser using WebAssembly.
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h3 className="font-semibold text-green-800 dark:text-green-300">No Data Retention</h3>
                  <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                    We don’t store, track, or analyze your files. After you close the tab, everything is gone.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h3 className="font-semibold text-purple-800 dark:text-purple-300">Optimized Palette</h3>
                  <p className="text-sm text-purple-700 dark:text-purple-400 mt-1">
                    Uses advanced FFmpeg filters (palettegen/paletteuse) to produce high‑quality GIFs with small file sizes.
                  </p>
                </div>
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <h3 className="font-semibold text-amber-800 dark:text-amber-300">Full Control</h3>
                  <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                    Adjust FPS and width to balance between smoothness, file size, and visual fidelity.
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