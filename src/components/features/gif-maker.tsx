"use client";

import { useState } from "react";
import { VideoDropzone } from "@/components/ui/dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdPlaceholder from "@/components/ui/ad-placeholder";
import { useGifConverter } from "@/hooks/use-gif-converter";

const FPS_OPTIONS = [
  { value: 10, label: "10 FPS (Recommended)" },
  { value: 15, label: "15 FPS (Smooth)" },
  { value: 24, label: "24 FPS (Cinematic)" },
];

const WIDTH_OPTIONS = [
  { value: 320, label: "320px (Small)" },
  { value: 480, label: "480px (Medium)" },
  { value: 0, label: "Original Size" },
];

export default function GifMaker() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFps, setSelectedFps] = useState<number>(10);
  const [selectedWidth, setSelectedWidth] = useState<number>(480);
  const {
    loadFFmpeg,
    convertToGif,
    loaded,
    loading,
    progress,
    error,
    isProcessing,
    outputUrl,
    reset,
  } = useGifConverter();

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    reset(); // Clear previous results
  };

  const handleConvert = async () => {
    if (!selectedFile) return;
    if (!loaded) {
      await loadFFmpeg();
    }
    try {
      await convertToGif(selectedFile, { fps: selectedFps, width: selectedWidth });
    } catch (err) {
      // error already set in hook
      console.error(err);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    const extension = "gif";
    a.download = selectedFile ? `converted-${selectedFile.name.replace(/\.[^/.]+$/, "")}.${extension}` : `converted.${extension}`;
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
            <CardTitle>Video to GIF Converter</CardTitle>
            <CardDescription>
              Convert your video to a high-quality animated GIF with customizable FPS and size.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* FPS Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Frames per Second (FPS)
              </label>
              <select
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                value={selectedFps}
                onChange={(e) => setSelectedFps(Number(e.target.value))}
                disabled={isProcessing || loading}
              >
                {FPS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Lower FPS reduces file size but may make animation choppy.
              </p>
            </div>

            {/* Width Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Output Width
              </label>
              <select
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                value={selectedWidth}
                onChange={(e) => setSelectedWidth(Number(e.target.value))}
                disabled={isProcessing || loading}
              >
                {WIDTH_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Width in pixels; height will be scaled proportionally. Choose "Original Size" to keep original dimensions.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button
                onClick={handleConvert}
                disabled={!selectedFile || isProcessing || (loading && !loaded)}
                className="min-w-32"
              >
                {isProcessing ? "Converting..." : loading ? "Loading FFmpeg..." : "Convert to GIF"}
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
                <p className="font-semibold text-green-800">Conversion successful!</p>
                <p className="text-sm text-green-700 mb-4">
                  Your video has been converted to GIF ({selectedFps} FPS, {selectedWidth === 0 ? 'Original' : selectedWidth + 'px'}) and is ready to download.
                </p>
                <div className="flex gap-4">
                  <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700">
                    Download GIF
                  </Button>
                  <Button variant="outline" onClick={reset}>
                    Convert Another
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