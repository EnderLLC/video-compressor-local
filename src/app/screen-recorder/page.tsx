import ScreenRecorder from "@/components/features/screen-recorder";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdUnit from "@/components/ads/ad-unit";
import { AD_SLOTS } from "@/config/ads";

export const metadata = {
  title: "Free Online Screen Recorder - No Watermark & Unlimited",
  description: "Record your screen, window, or tab directly in your browser. No extensions, no watermarks, unlimited recording time. Works with audio and saves locally.",
};

export default function ScreenRecorderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Browser Screen Recorder
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Capture your screen, application window, or browser tab with audio. No software to install, no watermarks, and your recordings never leave your device.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <Card className="border shadow-lg">
              <CardHeader>
                <CardTitle>Record Your Screen</CardTitle>
                <CardDescription>
                  Click “Start Recording”, choose what to share (full screen, a window, or a tab), and capture anything you see.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScreenRecorder />
                <AdUnit slotId={AD_SLOTS.tool} format="rectangle" className="mt-8" />
              </CardContent>
            </Card>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-indigo-500 text-white rounded-full text-center mr-3 flex-shrink-0">1</span>
                  <span><strong>Start recording</strong> – Click the big red button. Your browser will ask which screen, window, or tab you want to share.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-indigo-500 text-white rounded-full text-center mr-3 flex-shrink-0">2</span>
                  <span><strong>Capture your content</strong> – Everything within the selected area is recorded, including system audio (if you choose to share audio).</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-indigo-500 text-white rounded-full text-center mr-3 flex-shrink-0">3</span>
                  <span><strong>Stop & save</strong> – Click “Stop Recording”. The video is instantly available for preview, download (WebM), and is automatically saved to your Workspace.</span>
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
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300">No Installation</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                    Works directly in Chrome, Edge, Firefox, and Safari using the built‑in MediaRecorder API. No extensions or desktop software needed.
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h3 className="font-semibold text-green-800 dark:text-green-300">Privacy First</h3>
                  <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                    All processing happens locally in your browser. Recordings are never uploaded to a server, and no third‑party can access your content.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h3 className="font-semibold text-purple-800 dark:text-purple-300">Workspace Integration</h3>
                  <p className="text-sm text-purple-700 dark:text-purple-400 mt-1">
                    Every recording is automatically saved to your personal Workspace, where you can manage, rename, or delete it later.
                  </p>
                </div>
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <h3 className="font-semibold text-amber-800 dark:text-amber-300">Unlimited Recording</h3>
                  <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                    Record as long as you need – there's no time limit, file‑size cap, or watermark added to your videos.
                  </p>
                </div>
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <h3 className="font-semibold text-red-800 dark:text-red-300">Audio Support</h3>
                  <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                    Capture system audio or microphone input (depending on browser permissions) together with your screen.
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