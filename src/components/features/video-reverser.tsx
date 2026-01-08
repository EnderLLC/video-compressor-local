"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useVideoReverser } from "@/hooks/use-video-reverser";
import { useWorkspace } from "@/context/workspace-context";
import AdPlaceholder from "@/components/ui/ad-placeholder";
import { cn } from "@/lib/utils";
import { X, AlertTriangle } from "lucide-react";

export default function VideoReverser() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [muteAudio, setMuteAudio] = useState(false);
  const {
    loadFFmpeg,
    reverseVideo,
    loaded,
    loading,
    progress,
    error,
    isProcessing,
    outputUrl,
    reset,
  } = useVideoReverser();
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
          name: `reversed-${name}-${timestamp}.mp4`,
          type: "video/mp4",
          tool: "reversed-video",
        });
        setSaved(true);
      } catch (err) {
        console.error("Failed to auto‑save to workspace:", err);
      }
    };
    autoSave();
  }, [outputUrl, videoFile, saveFile]);

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

  const handleReverse = async () => {
    if (!videoFile) {
      alert("Please select a video file.");
      return;
    }
    if (!loaded) {
      await loadFFmpeg();
    }
    try {
      await reverseVideo(videoFile, muteAudio);
    } catch (err) {
      // error already set in hook
      console.error(err);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = videoFile ? `reversed-${videoFile.name}` : "reversed-video.mp4";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    reset();
    setVideoFile(null);
    setSaved(false);
  };

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
                  {isDragActive ? "Drop the video here..." : "Upload Video to Reverse"}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  MP4, MOV, AVI, etc. Reverse will load the entire video into memory.
                </p>
              </div>
              {/* Memory warning */}
              <div className="inline-flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm">
                <AlertTriangle className="h-5 w-5" />
                <span>Processing requires loading the entire video into memory. Short videos work best.</span>
              </div>
            </div>
          </div>
          <AdPlaceholder className="mt-6" />
        </>
      ) : (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Reverse Video</CardTitle>
            <CardDescription>
              Create a backwards version of your video. Movements will play in reverse.
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

            {/* Mute Audio Option */}
            <div className="flex items-center space-x-2 p-4 border rounded-lg bg-gray-50">
              <input
                type="checkbox"
                id="mute-audio"
                checked={muteAudio}
                onChange={(e) => setMuteAudio(e.target.checked)}
                disabled={isProcessing}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="mute-audio"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Mute Audio (reversed audio can sound creepy)
              </label>
            </div>

            {/* Reverse Button */}
            <div className="flex items-center gap-4">
              <Button
                onClick={handleReverse}
                disabled={!videoFile || isProcessing || (loading && !loaded)}
                className="min-w-32"
              >
                {isProcessing ? "Reversing..." : loading ? "Loading FFmpeg..." : "Reverse Video"}
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
                <p className="font-semibold text-green-800">Video reversed successfully!</p>
                <p className="text-sm text-green-700 mb-4">
                  Your video now plays backwards and is ready to download.
                  {saved && " It has been automatically saved to your workspace."}
                </p>
                <div className="flex gap-4">
                  <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700">
                    Download Reversed Video
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    Reverse Another Video
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