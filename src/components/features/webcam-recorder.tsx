"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdPlaceholder from "@/components/ui/ad-placeholder";
import { useWebcamRecorder } from "@/hooks/use-webcam-recorder";
import { useWorkspace } from "@/context/workspace-context";

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export default function WebcamRecorder() {
  const {
    cameraActive,
    cameraStream,
    isRecording,
    recordingTime,
    recordedBlob,
    error,
    startCamera,
    stopCamera,
    startRecording,
    stopRecording,
    resetRecording,
  } = useWebcamRecorder();
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
      const name = `webcam-recording-${timestamp}.webm`;
      saveFile(recordedBlob, {
        name,
        type: "video/webm",
        tool: "webcam-recording",
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

  const handleStartCamera = async () => {
    await startCamera();
  };

  const handleStopCamera = () => {
    stopCamera();
  };

  const handleStartRecording = async () => {
    await startRecording();
  };

  const handleStopRecording = () => {
    stopRecording();
  };

  const handleReset = () => {
    resetRecording();
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `webcam-recording-${formatTime(recordingTime)}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleConvertToMP4 = () => {
    window.location.href = "/convert-video";
  };

  return (
    <div className="w-full max-w-3xl">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Webcam Recorder</CardTitle>
          <CardDescription>
            Record video from your camera directly in your browser. No extensions required.
            Recordings are saved locally and can be downloaded as WebM video.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Camera Preview */}
          {cameraActive && (
            <div className="space-y-4">
              <h3 className="font-medium">Camera Preview</h3>
              <div className="relative border rounded-lg overflow-hidden bg-black">
                <video
                  ref={(video) => {
                    if (video && cameraStream) {
                      video.srcObject = cameraStream;
                    }
                  }}
                  autoPlay
                  muted
                  className="w-full h-auto max-h-[400px] object-contain transform scale-x(-1)" // Mirror effect
                />
                {isRecording && (
                  <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="font-bold">REC</span>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleStopCamera}>
                  Turn Off Camera
                </Button>
                {!isRecording && (
                  <Button onClick={handleStartRecording} className="bg-red-600 hover:bg-red-700">
                    Start Recording
                  </Button>
                )}
                {isRecording && (
                  <Button variant="outline" onClick={handleStopRecording}>
                    Stop Recording
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Recording Controls */}
          <div className="space-y-4">
            {!cameraActive && !recordedBlob && (
              <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                <p className="mb-4 text-lg font-medium">Ready to record from your webcam?</p>
                <Button
                  onClick={handleStartCamera}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-xl"
                >
                  Turn On Camera
                </Button>
                <p className="mt-4 text-sm text-gray-500">
                  You'll be prompted to allow camera access.
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
                    onClick={handleStopRecording}
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
                    Your webcam recording ({formatTime(recordingTime)}) is ready.
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