"use client";

import { useState, useRef } from "react";
import { VideoDropzone } from "@/components/ui/dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useVideoRotator, RotationType } from "@/hooks/use-video-rotator";
import AdPlaceholder from "@/components/ui/ad-placeholder";

const ROTATION_OPTIONS: { label: string; type: RotationType; description: string }[] = [
  { label: "↺ Rotate Left (90° CCW)", type: "rotate-left", description: "Rotate video 90 degrees counter‑clockwise" },
  { label: "↻ Rotate Right (90° CW)", type: "rotate-right", description: "Rotate video 90 degrees clockwise" },
  { label: "⟳ Rotate 180°", type: "rotate-180", description: "Flip video upside down" },
  { label: "⇄ Flip Horizontal", type: "flip-horizontal", description: "Mirror video left‑right" },
  { label: "⇅ Flip Vertical", type: "flip-vertical", description: "Flip video top‑bottom" },
];

export default function VideoRotator() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedRotation, setSelectedRotation] = useState<RotationType | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const {
    loadFFmpeg,
    rotateFlipVideo,
    loaded,
    loading,
    progress,
    error,
    isProcessing,
    outputUrl,
    reset,
  } = useVideoRotator();

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    setSelectedRotation(null);
    reset(); // Clear previous results
  };

  const handleProcess = async () => {
    if (!selectedFile || !selectedRotation) {
      alert("Please select a rotation/flip operation.");
      return;
    }
    if (!loaded) {
      await loadFFmpeg();
    }
    try {
      await rotateFlipVideo(selectedFile, selectedRotation);
    } catch (err) {
      // error already set in hook
      console.error(err);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = selectedFile ? `rotated-${selectedFile.name}` : "rotated-video.mp4";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setSelectedRotation(null);
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
            <CardTitle>Rotate & Flip Video</CardTitle>
            <CardDescription>
              Fix sideways videos or apply mirror effects locally in your browser.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Video Preview */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Original Video</p>
              <video
                ref={videoRef}
                src={URL.createObjectURL(selectedFile)}
                controls
                className="w-full rounded-lg border"
              />
            </div>

            {/* Rotation/Flip Buttons */}
            <div className="space-y-4">
              <p className="text-sm font-medium">Select Transformation</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ROTATION_OPTIONS.map((opt) => (
                  <Button
                    key={opt.type}
                    variant={selectedRotation === opt.type ? "default" : "outline"}
                    onClick={() => setSelectedRotation(opt.type)}
                    disabled={isProcessing}
                    className="justify-start h-auto py-3"
                  >
                    <div className="text-left">
                      <div className="font-medium">{opt.label}</div>
                      <div className="text-xs text-muted-foreground mt-1">{opt.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Selected Operation Info */}
            {selectedRotation && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Selected:</span>{" "}
                  {ROTATION_OPTIONS.find(o => o.type === selectedRotation)?.label}
                </p>
              </div>
            )}

            {/* Process Button & Status */}
            <div className="flex items-center gap-4">
              <Button
                onClick={handleProcess}
                disabled={!selectedFile || !selectedRotation || isProcessing || (loading && !loaded)}
                className="min-w-32"
              >
                {isProcessing ? "Processing..." : loading ? "Loading FFmpeg..." : "Process Video"}
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
                <p className="font-semibold text-green-800">Transformation successful!</p>
                <p className="text-sm text-green-700 mb-4">
                  Your video has been rotated/flipped and is ready to download.
                </p>
                <div className="flex gap-4">
                  <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700">
                    Download Video
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    Process Another
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