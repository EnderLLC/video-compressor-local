"use client";

import { useState, useRef, useEffect } from "react";
import { VideoDropzone } from "@/components/ui/dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useThumbnailGenerator } from "@/hooks/use-thumbnail-generator";
import AdPlaceholder from "@/components/ui/ad-placeholder";

const FORMATS = [
  { value: "jpg", label: "JPG", desc: "High quality JPEG, smaller file size" },
  { value: "png", label: "PNG", desc: "Lossless PNG, larger file size" },
] as const;

export default function ThumbnailGenerator() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [selectedFormat, setSelectedFormat] = useState<"jpg" | "png">("jpg");
  const videoRef = useRef<HTMLVideoElement>(null);
  const {
    loadFFmpeg,
    generateThumbnail,
    loaded,
    loading,
    progress,
    error,
    isProcessing,
    outputUrl,
    reset,
  } = useThumbnailGenerator();

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    reset(); // Clear previous results
    setCurrentTime(0);
    setDuration(0);
  };

  const handleVideoLoaded = () => {
    if (videoRef.current) {
      const vid = videoRef.current;
      setDuration(vid.duration || 0);
    }
  };

  const handleSliderChange = (value: number[]) => {
    const newTime = value[0];
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 10);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}.${ms}`;
  };

  const handleCapture = async () => {
    if (!selectedFile) return;
    if (!loaded) {
      await loadFFmpeg();
    }
    try {
      await generateThumbnail(selectedFile, currentTime, selectedFormat);
    } catch (err) {
      // error already set in hook
      console.error(err);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = selectedFile
      ? `thumbnail_${selectedFile.name.replace(/\.[^/.]+$/, "")}_${currentTime.toFixed(1)}s.${selectedFormat}`
      : `thumbnail.${selectedFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setCurrentTime(0);
    setDuration(0);
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
            <CardTitle>Video Thumbnail Generator</CardTitle>
            <CardDescription>
              Extract a high‑quality still frame from your video.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Video Player */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Video Preview
              </label>
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  src={URL.createObjectURL(selectedFile)}
                  controls
                  onLoadedMetadata={handleVideoLoaded}
                  onTimeUpdate={handleTimeUpdate}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Scrubber Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Select Frame
                </label>
                <span className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  {formatTime(currentTime)}
                </span>
              </div>
              <Slider
                min={0}
                max={duration || 100}
                step={0.1}
                value={[currentTime]}
                onValueChange={handleSliderChange}
                disabled={isProcessing || loading}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>00:00.0</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Format Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Output Format
              </label>
              <div className="grid grid-cols-2 gap-3">
                {FORMATS.map((fmt) => (
                  <button
                    key={fmt.value}
                    type="button"
                    onClick={() => setSelectedFormat(fmt.value as "jpg" | "png")}
                    disabled={isProcessing || loading}
                    className={`p-3 text-left rounded-lg border ${
                      selectedFormat === fmt.value
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                        : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                    } transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <div className="font-medium">{fmt.label}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {fmt.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Capture Button & Status */}
            <div className="flex items-center gap-4">
              <Button
                onClick={handleCapture}
                disabled={!selectedFile || isProcessing || (loading && !loaded)}
                className="min-w-32"
              >
                {isProcessing ? "Capturing..." : loading ? "Loading FFmpeg..." : "Capture Frame"}
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

            {/* Result Section */}
            {outputUrl && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="font-semibold text-green-800">Frame captured successfully!</p>
                <p className="text-sm text-green-700 mb-4">
                  Your thumbnail at {formatTime(currentTime)} has been saved as {selectedFormat.toUpperCase()}.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <img
                      src={outputUrl}
                      alt="Captured thumbnail"
                      className="w-full h-auto max-h-64 object-contain rounded-lg border border-gray-300"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700">
                      Download Image
                    </Button>
                    <Button variant="outline" onClick={handleReset}>
                      Capture Another
                    </Button>
                  </div>
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