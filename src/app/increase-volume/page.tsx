import VolumeBooster from "@/components/features/volume-booster";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Increase Video Volume - Online Booster",
  description: "Boost or reduce audio volume of any video file instantly, completely privately. Your files never leave your browser.",
};

export default function IncreaseVolumePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Increase Video Volume
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Adjust the audio volume of your videos securely, right in your browser. No uploads, no privacy risks.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <Card className="border shadow-lg">
              <CardHeader>
                <CardTitle>Volume Booster</CardTitle>
                <CardDescription>
                  Upload a video file (MP4, MOV, AVI, etc.) and adjust its audio volume. Processing happens locally via WebAssembly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VolumeBooster />
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
                  <span><strong>Choose volume level</strong> – Select a multiplier (e.g., 200% for double volume, 50% for quieter).</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-indigo-500 text-white rounded-full text-center mr-3 flex-shrink-0">3</span>
                  <span><strong>Boost & Download</strong> – Click Boost; FFmpeg loads (once) and processes the audio locally. Video stream is copied untouched.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:w-1/3">
            <Card className="border shadow">
              <CardHeader>
                <CardTitle>Why Use Local Volume Booster</CardTitle>
                <CardDescription>Key advantages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300">Video Stream Copy – No Quality Loss</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                    The video stream is copied without re‑encoding, preserving original quality. Only audio is processed.
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
                    Boost volume of 1GB, 5GB or even 10GB videos. No artificial limits because everything runs on your hardware.
                  </p>
                </div>
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <h3 className="font-semibold text-amber-800 dark:text-amber-300">Fine‑Grained Control</h3>
                  <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                    Choose from 50% (quieter) up to 400% (4× louder). Works with MP4, MOV, AVI, MKV, and more.
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