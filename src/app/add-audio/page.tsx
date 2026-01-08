import AddAudio from "@/components/features/add-audio";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdUnit from "@/components/ads/ad-unit";
import { AD_SLOTS } from "@/config/ads";

export const metadata = {
  title: "Add Audio to Video Online - Merge MP3 with MP4",
  description: "Replace or add audio to your video files instantly, right in your browser. No uploads, no privacy risks.",
};

export default function AddAudioPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Add Audio to Video
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Replace the audio track of any video with a custom sound file. Everything happens locally—your files never leave your browser.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <Card className="border shadow-lg">
              <CardHeader>
                <CardTitle>Add Your Audio</CardTitle>
                <CardDescription>
                  Upload a video file and an audio file (MP3, WAV, AAC, etc.) to replace the original audio.
                  Processing happens locally via WebAssembly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AddAudio />
                <AdUnit slotId={AD_SLOTS.tool} format="rectangle" className="mt-8" />
              </CardContent>
            </Card>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-indigo-500 text-white rounded-full text-center mr-3 flex-shrink-0">1</span>
                  <span><strong>Select a video</strong> – Drag & drop or click to browse. Supports MP4, MOV, AVI, etc.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-indigo-500 text-white rounded-full text-center mr-3 flex-shrink-0">2</span>
                  <span><strong>Select an audio file</strong> – Choose an MP3, WAV, AAC or other audio file to use as the new soundtrack.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-indigo-500 text-white rounded-full text-center mr-3 flex-shrink-0">3</span>
                  <span><strong>Add audio</strong> – Click the button; FFmpeg loads (once) and replaces the audio track while keeping the video stream untouched.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-indigo-500 text-white rounded-full text-center mr-3 flex-shrink-0">4</span>
                  <span><strong>Download & save</strong> – Get your video with the new audio instantly. The result is automatically saved to your workspace.</span>
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
                    Your video and audio files never leave your computer. All processing happens inside your browser using WebAssembly.
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
                    Process large videos (1GB, 5GB or even 10GB). No artificial limits because everything runs on your hardware.
                  </p>
                </div>
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <h3 className="font-semibold text-amber-800 dark:text-amber-300">Workspace Integration</h3>
                  <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                    Every processed video is automatically saved to your personal workspace for easy access later.
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