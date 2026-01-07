"use client";

import { useState } from "react";
import { VideoDropzone } from "@/components/ui/dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useVideoSpeed } from "@/hooks/use-video-speed";
import AdPlaceholder from "@/components/ui/ad-placeholder";

const SPEED_PRESETS = [
  { label: "0.5x (Slow Motion)", value: 0.5 },
  { label: "0.75x (Slower)", value: 0.75 },
  { label: "1x (Normal)", value: 1 },
  { label: "1.25x (Slightly Faster)", value: 1.25 },
  { label: "1.5x (Fast)", value: 1.5 },
  { label: "2x (Double Speed)", value: 2 },
];

export default function VideoSpeedController() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [speed, setSpeed] = useState<number>(1);
  const [muteAudio, setMuteAudio] = useState<boolean>(false);
  const {
    loadFFmpeg,
    speedVideo,
    loaded,
    loading,
    progress,
    error,
    isProcessing,
    outputUrl,
    reset,
  } = useVideoSpeed();

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    reset(); // Clear previous results
  };

  const handleSpeedChange = async () => {
    if (!selectedFile) return;
    if (!loaded) {
      await loadFFmpeg();
    }
    try {
      await speedVideo(selectedFile, speed, muteAudio);
    } catch (err) {
      // error already set in hook
      console.error(err);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = selectedFile ? `speed-${speed}x-${selectedFile.name}` : "speed-video.mp4";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="w-full max-w-lg">
      {!selectedFile ? (
        <>
          <VideoDropzone
            onFileSelected={handleFileSelected}
            disabled={isProcessing}
          />
          <AdPlaceholder className="mt-6" />
        </>
      ) : (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Change Video Speed</CardTitle>
            <CardDescription>
              Adjust playback speed and optionally mute audio. Processing happens locally in your browser.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Speed Selection */}
            <div className="space-y-4">
              <div>
                <label htmlFor="speed-slider" className="block mb-2 font-medium">
                  Speed Factor: <span className="font-bold">{speed}x</span>
                </label>
                <Slider
                  id="speed-slider"
                  min={0.25}
                  max={4}
                  step={0.05}
                  value={[speed]}
                  onValueChange={(value) => setSpeed(value[0])}
                  disabled={isProcessing || loading}
                  className="w-full"
                />
                <div className="flex flex-wrap gap-2 mt-4">
                  {SPEED_PRESETS.map((preset) => (
                    <Button
                      key={preset.value}
                      variant={speed === preset.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSpeed(preset.value)}
                      disabled={isProcessing || loading}
                    >
                      {preset.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Mute Audio Checkbox */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="mute-audio"
                  checked={muteAudio}
                  onChange={(e) => setMuteAudio(e.target.checked)}
                  disabled={isProcessing || loading}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="mute-audio" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Mute audio (useful for extreme speed changes)
                </label>
              </div>

              {/* Note about audio */}
              {!muteAudio && (speed < 0.5 || speed > 2) && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm">
                  <p className="font-semibold">Note</p>
                  <p>
                    Audio speed adjustment is limited to 0.5x–2.0x range. For speeds outside this range, audio will be muted automatically.
                  </p>
                </div>
              )}
            </div>

            {/* Action Button */}
            <div className="flex items-center gap-4">
              <Button
                onClick={handleSpeedChange}
                disabled={!selectedFile || isProcessing || (loading && !loaded)}
                className="min-w-32"
              >
                {isProcessing ? "Processing..." : loading ? "Loading FFmpeg..." : "Apply Speed Change"}
              </Button>
              {loaded && !isProcessing && (
                <span className="text-green-600 font-semibold">✓ FFmpeg ready</span>
              )}
            </div>

            {/* Progress Bar */}
            {(isProcessing || loading) && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
            )}

            {/* Error Alert */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                <p className="font-semibold">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Download Section */}
            {outputUrl && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="font-semibold text-green-800">Speed change successful!</p>
                <p className="text-sm text-green-700 mb-4">
                  Your video has been {speed > 1 ? "sped up" : "slowed down"} to {speed}x and is ready to download.
                </p>
                <div className="flex gap-4">
                  <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700">
                    Download Video
                  </Button>
                  <Button variant="outline" onClick={reset}>
                    Process Another
                  </Button>
                </div>
                <AdPlaceholder className="mt-4" />
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}