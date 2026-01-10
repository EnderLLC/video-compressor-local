import VideoResizer from "@/components/features/video-resizer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdUnit from "@/components/ads/ad-unit";
import { AD_SLOTS } from "@/config/ads";

export const metadata = {
  title: "Resize Video for Instagram, TikTok & YouTube Online",
  description: "Change video aspect ratio instantly—convert 16:9 to 9:16, 1:1, 4:5. Fill empty space with black or white background. No uploads, privacy first.",
};

export default function ResizeVideoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Video Resizer
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Change aspect ratio for Instagram, TikTok, YouTube, and more—all locally, with zero data leaving your device.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <Card className="border shadow-lg">
              <CardHeader>
                <CardTitle>Resize Your Video</CardTitle>
                <CardDescription>
                  Upload a video, choose your target aspect ratio and fill color. Processing happens entirely in your browser via WebAssembly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VideoResizer />
                <AdUnit slotId={AD_SLOTS.tool} format="rectangle" className="mt-8" />
              </CardContent>
            </Card>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Supported Aspect Ratios</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { ratio: "16:9", platform: "YouTube, Widescreen", icon: "📺", desc: "Standard landscape format" },
                  { ratio: "9:16", platform: "TikTok, Reels", icon: "📱", desc: "Vertical mobile format" },
                  { ratio: "1:1", platform: "Instagram Posts", icon: "⬛", desc: "Square format" },
                  { ratio: "4:5", platform: "Instagram Portrait", icon: "🖼️", desc: "Portrait posts" },
                ].map((item) => (
                  <div key={item.ratio} className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{item.ratio}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.platform}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-1/3">
            <Card className="border shadow">
              <CardHeader>
                <CardTitle>Why Resize Videos Locally?</CardTitle>
                <CardDescription>Key advantages of browser‑based video resizing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300">No Upload Waiting</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                    Traditional video tools upload your file to a server. Ours processes directly on your machine—no internet transfer.
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h3 className="font-semibold text-green-800 dark:text-green-300">Full Privacy</h3>
                  <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                    Your video never touches our (or anyone else’s) servers. It stays inside your browser tab from start to finish.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h3 className="font-semibold text-purple-800 dark:text-purple-300">No Limits</h3>
                  <p className="text-sm text-purple-700 dark:text-purple-400 mt-1">
                    Resize files of any size—1GB, 5GB, 10GB—because your own hardware does the work.
                  </p>
                </div>
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <h3 className="font-semibold text-amber-800 dark:text-amber-300">Instant Results</h3>
                  <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                    No queues, no waiting for other users. Resizing starts the moment you click the button.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow mt-8">
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full p-2">
                    <span className="font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Upload</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Drag & drop any video file (MP4, MOV, AVI, etc.).</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full p-2">
                    <span className="font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Choose Ratio & Color</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Select the target aspect ratio and background fill color.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full p-2">
                    <span className="font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Resize</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Click "Resize Video". Processing happens locally via FFmpeg.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full p-2">
                    <span className="font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Download</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Get your resized video instantly—no watermarks, no subscriptions.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}