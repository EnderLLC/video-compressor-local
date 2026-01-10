"use client";

import { useState } from "react";
import { VideoDropzone } from "@/components/ui/dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useVideoResizer } from "@/hooks/use-video-resizer";
import AdPlaceholder from "@/components/ui/ad-placeholder";

const ASPECT_RATIOS = [
  { value: "16:9", label: "YouTube (16:9)", desc: "Landscape video, standard widescreen" },
  { value: "9:16", label: "TikTok / Reels (9:16)", desc: "Vertical video, mobile first" },
  { value: "1:1", label: "Instagram Square (1:1)", desc: "Square format for posts" },
  { value: "4:5", label: "Portrait (4:5)", desc: "Portrait for Instagram posts" },
] as const;

const BACKGROUND_COLORS = [
  { value: "black", label: "Black", colorClass: "bg-black" },
  { value: "white", label: "White", colorClass: "bg-white border" },
] as const;

export default function VideoResizer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedRatio, setSelectedRatio] = useState<string>("16:9");
  const [selectedColor, setSelectedColor] = useState<string>("black");
  const {
    loadFFmpeg,
    resizeVideo,
    loaded,
    loading,
    progress,
    error,
    isProcessing,
    outputUrl,
    reset,
  } = useVideoResizer();

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    reset(); // Clear previous results
  };

  const handleResize = async () => {
    if (!selectedFile) return;
    if (!loaded) {
      await loadFFmpeg();
    }
    try {
      await resizeVideo(selectedFile, selectedRatio, selectedColor);
    } catch (err) {
      // error already set in hook
      console.error(err);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = selectedFile ? `resized-${selectedFile.name}` : "resized-video.mp4";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    setSelectedFile(null);
    reset();
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
            <CardTitle>Video Resizer</CardTitle>
            <CardDescription>
              Change aspect ratio for Instagram, TikTok, YouTube, and more.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Aspect Ratio Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Target Aspect Ratio
              </label>
              <div className="grid grid-cols-2 gap-3">
                {ASPECT_RATIOS.map((ratio) => (
                  <button
                    key={ratio.value}
                    type="button"
                    onClick={() => setSelectedRatio(ratio.value)}
                    disabled={isProcessing || loading}
                    className={`p-3 text-left rounded-lg border ${
                      selectedRatio === ratio.value
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                        : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                    } transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <div className="font-medium">{ratio.label}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {ratio.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Background Color Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Fill Color for Empty Space
              </label>
              <div className="flex gap-3">
                {BACKGROUND_COLORS.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setSelectedColor(color.value)}
                    disabled={isProcessing || loading}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                      selectedColor === color.value
                        ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800"
                        : "border-gray-300 dark:border-gray-600"
                    } transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <div className={`w-5 h-5 rounded-full ${color.colorClass}`} />
                    <span>{color.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Resize Button & Status */}
            <div className="flex items-center gap-4">
              <Button
                onClick={handleResize}
                disabled={!selectedFile || isProcessing || (loading && !loaded)}
                className="min-w-32"
              >
                {isProcessing ? "Resizing..." : loading ? "Loading FFmpeg..." : "Resize Video"}
              </Button>
              {loaded && !isProcessing && (
                <span className="text-green-600 font-semibold">✓ FFmpeg ready</span>
              )}
              <Button variant="outline" onClick={handleReset} disabled={isProcessing}>
                Start Over
              </Button>
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
                <p className="font-semibold text-green-800">Resizing successful!</p>
                <p className="text-sm text-green-700 mb-4">
                  Your video has been resized to {selectedRatio} with {selectedColor} background and is ready to download.
                </p>
                <div className="flex gap-4">
                  <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700">
                    Download Video
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    Resize Another
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