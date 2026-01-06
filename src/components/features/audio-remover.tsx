"use client";

import { useState } from "react";
import { VideoDropzone } from "@/components/ui/dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAudioManager } from "@/hooks/use-audio-manager";
import AdPlaceholder from "@/components/ui/ad-placeholder";

export default function AudioRemover() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const {
    loadFFmpeg,
    removeAudio,
    loaded,
    loading,
    progress,
    error,
    isProcessing,
    outputUrl,
    reset,
  } = useAudioManager();

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    reset(); // Clear previous results
  };

  const handleRemoveAudio = async () => {
    if (!selectedFile) return;
    if (!loaded) {
      await loadFFmpeg();
    }
    try {
      await removeAudio(selectedFile);
    } catch (err) {
      // error already set in hook
      console.error(err);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = selectedFile ? `no-audio-${selectedFile.name}` : "video-no-audio.mp4";
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
            <CardTitle>Remove Audio</CardTitle>
            <CardDescription>
              Remove the audio track from your video locally in your browser.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Button
                onClick={handleRemoveAudio}
                disabled={!selectedFile || isProcessing || (loading && !loaded)}
                className="min-w-32"
              >
                {isProcessing ? "Processing..." : loading ? "Loading FFmpeg..." : "Remove Audio"}
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
                <p className="font-semibold text-green-800">Audio removed successfully!</p>
                <p className="text-sm text-green-700 mb-4">
                  Your video now has no audio track and is ready to download.
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