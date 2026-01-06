"use client";

import { useState, useRef, useEffect } from "react";
import { VideoDropzone } from "@/components/ui/dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useVideoTrimmer } from "@/hooks/use-video-trimmer";
import AdPlaceholder from "@/components/ui/ad-placeholder";

export default function VideoTrimmer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [startTime, setStartTime] = useState<string>("0");
  const [endTime, setEndTime] = useState<string>("10");
  const [duration, setDuration] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const {
    loadFFmpeg,
    trimVideo,
    loaded,
    loading,
    progress,
    error,
    isProcessing,
    outputUrl,
    reset,
  } = useVideoTrimmer();

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    reset(); // Clear previous results
    // Reset times
    setStartTime("0");
    setEndTime("10");
  };

  // When a new file is selected, extract its duration
  useEffect(() => {
    if (!selectedFile) return;

    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = () => {
      setDuration(video.duration);
      setEndTime(Math.min(video.duration, 10).toFixed(1));
    };
    video.src = URL.createObjectURL(selectedFile);
  }, [selectedFile]);

  const handleTrim = async () => {
    if (!selectedFile) return;
    const start = parseFloat(startTime);
    const end = parseFloat(endTime);
    if (isNaN(start) || isNaN(end) || start < 0 || end <= start) {
      alert("Please enter valid start and end times (start >= 0, end > start).");
      return;
    }
    if (!loaded) {
      await loadFFmpeg();
    }
    try {
      await trimVideo(selectedFile, start, end);
    } catch (err) {
      // error already set in hook
      console.error(err);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = selectedFile ? `trimmed-${selectedFile.name}` : "trimmed-video.mp4";
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
            <CardTitle>Video Trimmer</CardTitle>
            <CardDescription>
              Cut a segment from your video locally in your browser.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Video Preview */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Preview</p>
              <video
                ref={videoRef}
                src={URL.createObjectURL(selectedFile)}
                controls
                className="w-full rounded-lg border"
              />
              {duration > 0 && (
                <p className="text-xs text-gray-500">Duration: {duration.toFixed(1)} seconds</p>
              )}
            </div>

            {/* Time Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Start Time (seconds)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max={duration}
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  disabled={isProcessing}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">End Time (seconds)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max={duration}
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  disabled={isProcessing}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Segment length: {(parseFloat(endTime) - parseFloat(startTime)).toFixed(1)} seconds
            </p>

            {/* Trim Button & Status */}
            <div className="flex items-center gap-4">
              <Button
                onClick={handleTrim}
                disabled={!selectedFile || isProcessing || (loading && !loaded)}
                className="min-w-32"
              >
                {isProcessing ? "Trimming..." : loading ? "Loading FFmpeg..." : "Trim Video"}
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
                <p className="font-semibold text-green-800">Trimming successful!</p>
                <p className="text-sm text-green-700 mb-4">
                  Your video segment has been cut and is ready to download.
                </p>
                <div className="flex gap-4">
                  <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700">
                    Download Video
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    Trim Another
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