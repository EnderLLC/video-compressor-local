"use client";

import { useState, useRef, useEffect } from "react";
import { VideoDropzone } from "@/components/ui/dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useVideoSplitter } from "@/hooks/use-video-splitter";
import AdPlaceholder from "@/components/ui/ad-placeholder";

export default function VideoSplitter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [segmentTime, setSegmentTime] = useState<number>(15); // default 15 seconds
  const [duration, setDuration] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const {
    loadFFmpeg,
    splitVideo,
    loaded,
    loading,
    progress,
    error,
    isProcessing,
    outputUrls,
    reset,
  } = useVideoSplitter();

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    reset(); // Clear previous results
  };

  // Extract video duration when a new file is selected
  useEffect(() => {
    if (!selectedFile) return;

    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = () => {
      setDuration(video.duration);
    };
    video.src = URL.createObjectURL(selectedFile);
  }, [selectedFile]);

  const handleSplit = async () => {
    if (!selectedFile) return;
    if (segmentTime <= 0) {
      alert("Please enter a valid segment time (positive number).");
      return;
    }
    if (!loaded) {
      await loadFFmpeg();
    }
    try {
      await splitVideo(selectedFile, segmentTime);
    } catch (err) {
      // error already set in hook
      console.error(err);
    }
  };

  const handleDownload = (url: string, index: number) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = selectedFile
      ? `part-${index + 1}-${selectedFile.name}`
      : `split-part-${index + 1}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    setSelectedFile(null);
    reset();
  };

  const segmentOptions = [
    { label: "Instagram Story (15s)", value: 15 },
    { label: "WhatsApp Status (30s)", value: 30 },
    { label: "Shorts/TikTok (60s)", value: 60 },
  ];

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
            <CardTitle>Video Splitter</CardTitle>
            <CardDescription>
              Split your video into equal‑length segments locally in your browser.
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
                <p className="text-xs text-gray-500">
                  Duration: {duration.toFixed(1)} seconds •{' '}
                  {Math.ceil(duration / segmentTime)} segments of {segmentTime}s each
                </p>
              )}
            </div>

            {/* Segment Time Selection */}
            <div className="space-y-4">
              <p className="text-sm font-medium">Segment Duration</p>
              <div className="flex flex-wrap gap-2">
                {segmentOptions.map((opt) => (
                  <Button
                    key={opt.value}
                    type="button"
                    variant={segmentTime === opt.value ? "default" : "outline"}
                    onClick={() => setSegmentTime(opt.value)}
                    disabled={isProcessing}
                  >
                    {opt.label}
                  </Button>
                ))}
                <div className="flex items-center gap-2">
                  <span className="text-sm whitespace-nowrap">Custom:</span>
                  <input
                    type="number"
                    min="1"
                    max={duration}
                    step="1"
                    value={segmentTime}
                    onChange={(e) => setSegmentTime(Number(e.target.value))}
                    disabled={isProcessing}
                    className="w-24 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                  />
                  <span className="text-sm">seconds</span>
                </div>
              </div>
            </div>

            {/* Split Button & Status */}
            <div className="flex items-center gap-4">
              <Button
                onClick={handleSplit}
                disabled={!selectedFile || isProcessing || (loading && !loaded)}
                className="min-w-32"
              >
                {isProcessing ? "Splitting..." : loading ? "Loading FFmpeg..." : "Split Video"}
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

            {/* Results Section */}
            {outputUrls.length > 0 && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="font-semibold text-green-800">
                  Splitting successful! ({outputUrls.length} segment{outputUrls.length > 1 ? 's' : ''})
                </p>
                <p className="text-sm text-green-700 mb-4">
                  Each segment is ready to download individually.
                </p>
                <div className="space-y-3">
                  {outputUrls.map((url, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-white rounded border">
                      <span className="font-medium">Part {idx + 1}</span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleDownload(url, idx)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Download Part {idx + 1}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const video = window.open(url, '_blank');
                            if (video) video.focus();
                          }}
                        >
                          Preview
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 mt-6">
                  <Button variant="outline" onClick={handleReset}>
                    Split Another Video
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