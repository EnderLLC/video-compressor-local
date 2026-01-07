"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdPlaceholder from "@/components/ui/ad-placeholder";
import { useScreenRecorder } from "@/hooks/use-screen-recorder";
import { useWorkspace } from "@/context/workspace-context";

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export default function ScreenRecorder() {
  const {
    isRecording,
    recordingTime,
    recordedBlob,
    error,
    startRecording,
    stopRecording,
    resetRecording,
  } = useScreenRecorder();
  const { saveFile } = useWorkspace();
  const [saved, setSaved] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  // Create download URL when recordedBlob changes
  useEffect(() => {
    if (recordedBlob) {
      const url = URL.createObjectURL(recordedBlob);
      setDownloadUrl(url);
      // Auto-save to workspace
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const name = `screen-recording-${timestamp}.webm`;
      saveFile(recordedBlob, {
        name,
        type: "video/webm",
        tool: "screen-recording",
      }).catch((err) => console.error("Failed to save to workspace:", err));
      setSaved(true);
    } else {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
      setDownloadUrl(null);
      setSaved(false);
    }
    return () => {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
    };
  }, [recordedBlob]);

  const handleStart = async () => {
    await startRecording();
  };

  const handleStop = () => {
    stopRecording();
  };

  const handleReset = () => {
    resetRecording();
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `screen-recording-${formatTime(recordingTime)}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleConvertToMP4 = () => {
    // Navigate to convert-video page with the blob?
    // For now, just redirect
    window.location.href = "/convert-video";
  };

  return (
    <div className="w-full max-w-3xl">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Screen Recorder</CardTitle>
          <CardDescription>
            Record your screen, window, or tab directly in your browser. No extensions required.
            Recordings are saved locally and can be downloaded as WebM video.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Recording Controls */}
          <div className="space-y-4">
            {!isRecording && !recordedBlob && (
              <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                <p className="mb-4 text-lg font-medium">Ready to record your screen?</p>
                <Button
                  onClick={handleStart}
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-xl"
                >
                  Start Recording
                </Button>
                <p className="mt-4 text-sm text-gray-500">
                  You'll be prompted to select a screen, window, or tab to share.
                </p>
              </div>
            )}

            {isRecording && (
              <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse"></div>
                    <span className="text-xl font-bold text-red-700">Recording...</span>
                  </div>
                  <div className="text-3xl font-mono font-bold text-red-800">
                    {formatTime(recordingTime)}
                  </div>
                </div>
                <p className="mt-4 text-red-700">
                  Recording in progress. Click "Stop Recording" when you're done.
                </p>
                <div className="mt-6 flex gap-4">
                  <Button
                    onClick={handleStop}
                    variant="outline"
                    className="border-red-300 text-red-700 hover:bg-red-100"
                  >
                    Stop Recording
                  </Button>
                </div>
              </div>
            )}

            {recordedBlob && !isRecording && (
              <div className="space-y-6">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="font-semibold text-green-800">Recording complete!</p>
                  <p className="text-sm text-green-700">
                    Your screen recording ({formatTime(recordingTime)}) is ready.
                    {saved && " It has been saved to your workspace."}
                  </p>
                </div>

                {/* Video Preview */}
                <div>
                  <h3 className="font-medium mb-2">Preview</h3>
                  <video
                    src={downloadUrl || undefined}
                    controls
                    className="w-full rounded-lg border"
                  />
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-4">
                  <Button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-700">
                    Download WebM
                  </Button>
                  <Button variant="outline" onClick={handleConvertToMP4}>
                    Convert to MP4
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    Record Again
                  </Button>
                </div>

                <div className="text-sm text-gray-500">
                  <p>
                    The recording is in WebM format. To convert to MP4 or other formats, use the
                    "Convert to MP4" button (opens the video converter tool).
                  </p>
                </div>
              </div>
            )}

            {/* Error Alert */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                <p className="font-semibold">Error</p>
                <p className="text-sm">{error}</p>
                <Button variant="outline" onClick={handleReset} className="mt-2">
                  Try Again
                </Button>
              </div>
            )}
          </div>

          {/* Ad Slot */}
          <AdPlaceholder className="mt-6" />
        </CardContent>
      </Card>
    </div>
  );
}