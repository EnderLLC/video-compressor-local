"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useVideoLooper } from "@/hooks/use-video-looper";
import { useWorkspace } from "@/context/workspace-context";
import AdPlaceholder from "@/components/ui/ad-placeholder";
import { cn } from "@/lib/utils";
import { X, Zap } from "lucide-react";

export default function VideoLooper() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loopCount, setLoopCount] = useState(2); // default 2x
  const {
    loadFFmpeg,
    loopVideo,
    loaded,
    loading,
    progress,
    error,
    isProcessing,
    outputUrl,
    reset,
  } = useVideoLooper();
  const { saveFile } = useWorkspace();
  const [saved, setSaved] = useState(false);

  // Auto‑save to workspace when processing completes
  useEffect(() => {
    if (!outputUrl || !videoFile) return;
    const autoSave = async () => {
      try {
        const response = await fetch(outputUrl);
        const blob = await response.blob();
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const name = videoFile.name.replace(/\.[^/.]+$/, "") || "video";
        await saveFile(blob, {
          name: `looped-${loopCount}x-${name}-${timestamp}.mp4`,
          type: "video/mp4",
          tool: "looped-video",
        });
        setSaved(true);
      } catch (err) {
        console.error("Failed to auto‑save to workspace:", err);
      }
    };
    autoSave();
  }, [outputUrl, videoFile, saveFile, loopCount]);

  const onDropVideo = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setVideoFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "video/*": [] },
    onDrop: onDropVideo,
    multiple: false,
    disabled: isProcessing,
  });

  const removeVideo = () => {
    setVideoFile(null);
  };

  const handleLoop = async () => {
    if (!videoFile) {
      alert("Please select a video file.");
      return;
    }
    if (!loaded) {
      await loadFFmpeg();
    }
    try {
      await loopVideo(videoFile, loopCount);
    } catch (err) {
      // error already set in hook
      console.error(err);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = videoFile ? `looped-${loopCount}x-${videoFile.name}` : "looped-video.mp4";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    reset();
    setVideoFile(null);
    setSaved(false);
  };

  const loopOptions = [
    { label: "2×", value: 2 },
    { label: "3×", value: 3 },
    { label: "4×", value: 4 },
    { label: "5×", value: 5 },
    { label: "10×", value: 10 },
  ];

  return (
    <div className="w-full max-w-2xl">
      {!videoFile ? (
        <>
          {/* Upload Zone */}
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors",
              isDragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400 hover:bg-gray-50",
              isProcessing && "opacity-50 cursor-not-allowed"
            )}
          >
            <input {...getInputProps()} />
            <div className="space-y-6">
              <div className="mx-auto w-16 h-16 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-full h-full"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xl font-medium">
                  {isDragActive ? "Drop the video here..." : "Upload Video to Loop"}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  MP4, MOV, AVI, etc. Loop will repeat the video without re‑encoding.
                </p>
              </div>
              {/* Speed note */}
              <div className="inline-flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-sm">
                <Zap className="h-5 w-5" />
                <span>Uses stream copy for lightning‑fast processing. No quality loss.</span>
              </div>
            </div>
          </div>
          <AdPlaceholder className="mt-6" />
        </>
      ) : (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Loop Video</CardTitle>
            <CardDescription>
              Repeat your video multiple times in a single file.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* File List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold text-gray-500">1.</span>
                  <div>
                    <p className="font-medium">Video: {videoFile.name}</p>
                    <p className="text-sm text-gray-500">
                      {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={removeVideo}
                  disabled={isProcessing}
                  className="text-red-600 hover:text-red-800"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Loop Count Selection */}
            <div className="space-y-3">
              <p className="text-sm font-medium">Repeat Times</p>
              <div className="flex flex-wrap gap-2">
                {loopOptions.map((option) => (
                  <Button
                    key={option.value}
                    type="button"
                    variant={loopCount === option.value ? "default" : "outline"}
                    onClick={() => setLoopCount(option.value)}
                    disabled={isProcessing}
                    className="min-w-16"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                The video will be repeated {loopCount} times total.
                {loopCount === 1 && " (No change)"}
              </p>
            </div>

            {/* Loop Button */}
            <div className="flex items-center gap-4">
              <Button
                onClick={handleLoop}
                disabled={!videoFile || isProcessing || (loading && !loaded)}
                className="min-w-32"
              >
                {isProcessing ? "Looping..." : loading ? "Loading FFmpeg..." : "Loop Video"}
              </Button>
              {loaded && !isProcessing && (
                <span className="text-green-600 font-semibold">✓ FFmpeg ready</span>
              )}
              <Button variant="outline" onClick={handleReset} disabled={isProcessing}>
                Clear All
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
                <p className="font-semibold text-green-800">Video looped successfully!</p>
                <p className="text-sm text-green-700 mb-4">
                  Your video now plays {loopCount} times in a row.
                  {saved && " It has been automatically saved to your workspace."}
                </p>
                <div className="flex gap-4">
                  <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700">
                    Download Looped Video
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    Loop Another Video
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