"use client";

import { useState } from "react";
import { VideoDropzone } from "@/components/ui/dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useVideoConverter } from "@/hooks/use-video-converter";
import AdPlaceholder from "@/components/ui/ad-placeholder";

const FORMATS = [
  { value: "mp4", label: "MP4 (H.264 + AAC)", mime: "video/mp4" },
  { value: "mov", label: "MOV (QuickTime)", mime: "video/quicktime" },
  { value: "mkv", label: "MKV (Matroska)", mime: "video/x-matroska" },
  { value: "avi", label: "AVI (Legacy)", mime: "video/x-msvideo" },
  { value: "mp3", label: "MP3 (Audio Only)", mime: "audio/mpeg" },
  { value: "gif", label: "GIF (Animated)", mime: "image/gif" },
] as const;

type Format = (typeof FORMATS)[number]["value"];

export default function VideoConverter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<Format>("mp4");
  const {
    loadFFmpeg,
    convertVideo,
    loaded,
    loading,
    progress,
    error,
    isProcessing,
    outputUrl,
    reset,
  } = useVideoConverter();

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
      await convertVideo(selectedFile, selectedFormat);
    } catch (err) {
      // error already set in hook
      console.error(err);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    const extension = FORMATS.find(f => f.value === selectedFormat)?.value || "converted";
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
            <CardTitle>Video Converter</CardTitle>
            <CardDescription>
              Convert your video to various formats locally in your browser.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Format Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Target Format
              </label>
              <select
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value as Format)}
                disabled={isProcessing || loading}
              >
                {FORMATS.map((format) => (
                  <option key={format.value} value={format.value}>
                    {format.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {selectedFormat === "mp3" ? "Audio will be extracted, video track removed." :
                 selectedFormat === "gif" ? "Video will be converted to animated GIF (low resolution)." :
                 "Video and audio will be re‑encoded for the chosen container."}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button
                onClick={handleConvert}
                disabled={!selectedFile || isProcessing || (loading && !loaded)}
                className="min-w-32"
              >
                {isProcessing ? "Converting..." : loading ? "Loading FFmpeg..." : "Convert Video"}
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
                  Your video has been converted to {selectedFormat.toUpperCase()} and is ready to download.
                </p>
                <div className="flex gap-4">
                  <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700">
                    Download {selectedFormat.toUpperCase()}
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