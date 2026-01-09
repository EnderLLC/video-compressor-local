import AudioConverter from "@/components/features/audio-converter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdUnit from "@/components/ads/ad-unit";
import { AD_SLOTS } from "@/config/ads";

export const metadata = {
  title: "Audio Converter Online - Extract MP3 from Video",
  description: "Extract audio from video or convert sound files (MP3, WAV, AAC, M4A, OGG) instantly in your browser. No uploads, privacy first.",
};

export default function AudioConverterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Audio Converter
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Extract audio from video or convert sound files between formats—all locally, with zero data leaving your device.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <Card className="border shadow-lg">
              <CardHeader>
                <CardTitle>Convert Your Audio</CardTitle>
                <CardDescription>
                  Upload a video or audio file and choose your target format. Processing happens entirely in your browser via WebAssembly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AudioConverter />
                <AdUnit slotId={AD_SLOTS.tool} format="rectangle" className="mt-8" />
              </CardContent>
            </Card>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Supported Formats</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { format: "MP3", desc: "Standard audio format, compressed", icon: "🎵" },
                  { format: "WAV", desc: "Uncompressed PCM, high quality", icon: "🎼" },
                  { format: "AAC", desc: "Advanced Audio Coding, efficient", icon: "🔊" },
                  { format: "M4A", desc: "Apple audio format (AAC)", icon: "🍎" },
                  { format: "OGG", desc: "Open source Vorbis format", icon: "🔄" },
                  { format: "From Video", desc: "Extract audio from MP4, MOV, AVI, etc.", icon: "📹" },
                ].map((item) => (
                  <div key={item.format} className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{item.format}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
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
                <CardTitle>Why Convert Audio Locally?</CardTitle>
                <CardDescription>Key advantages of browser‑based audio conversion</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300">No Upload Waiting</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                    Traditional converters upload your file to a server. Ours processes directly on your machine—no internet transfer.
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h3 className="font-semibold text-green-800 dark:text-green-300">Full Privacy</h3>
                  <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                    Your audio/video never touches our (or anyone else’s) servers. It stays inside your browser tab from start to finish.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h3 className="font-semibold text-purple-800 dark:text-purple-300">No Limits</h3>
                  <p className="text-sm text-purple-700 dark:text-purple-400 mt-1">
                    Convert files of any size—1GB, 5GB, 10GB—because your own hardware does the work.
                  </p>
                </div>
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <h3 className="font-semibold text-amber-800 dark:text-amber-300">Instant Results</h3>
                  <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                    No queues, no waiting for other users. Conversion starts the moment you click the button.
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