"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAudioMuxer } from "@/hooks/use-audio-muxer";
import { useWorkspace } from "@/context/workspace-context";
import AdPlaceholder from "@/components/ui/ad-placeholder";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export default function AddAudio() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const {
    loadFFmpeg,
    addAudio,
    loaded,
    loading,
    progress,
    error,
    isProcessing,
    outputUrl,
    reset,
  } = useAudioMuxer();
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
          name: `audio-added-${name}-${timestamp}.mp4`,
          type: "video/mp4",
          tool: "audio-added-video",
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

  const onDropAudio = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setAudioFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps, isDragActive: isDragActiveVideo } = useDropzone({
    accept: { "video/*": [] },
    onDrop: onDropVideo,
    multiple: false,
    disabled: isProcessing,
  });

  const { getRootProps: getAudioRootProps, getInputProps: getAudioInputProps, isDragActive: isDragActiveAudio } = useDropzone({
    accept: { "audio/*": [] },
    onDrop: onDropAudio,
    multiple: false,
    disabled: isProcessing,
  });

  const removeVideo = () => {
    setVideoFile(null);
  };

  const removeAudio = () => {
    setAudioFile(null);
  };

  const handleAddAudio = async () => {
    if (!videoFile || !audioFile) {
      alert("Please select both a video file and an audio file.");
      return;
    }
    if (!loaded) {
      await loadFFmpeg();
    }
    try {
      await addAudio(videoFile, audioFile);
    } catch (err) {
      // error already set in hook
      console.error(err);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = videoFile ? `audio-added-${videoFile.name}` : "audio-added-video.mp4";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    reset();
    setVideoFile(null);
    setAudioFile(null);
    setSaved(false);
  };

  return (
    <div className="w-full max-w-2xl">
      {(!videoFile || !audioFile) ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Video Upload */}
            <div
              {...getVideoRootProps()}
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
                isDragActiveVideo
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-50",
                isProcessing && "opacity-50 cursor-not-allowed"
              )}
            >
              <input {...getVideoInputProps()} />
              <div className="space-y-4">
                <div className="mx-auto w-12 h-12 text-gray-400">
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
                  <p className="text-lg font-medium">
                    {isDragActiveVideo ? "Drop the video here..." : "Upload Video"}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    MP4, MOV, AVI, etc.
                  </p>
                </div>
              </div>
            </div>

            {/* Audio Upload */}
            <div
              {...getAudioRootProps()}
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
                isDragActiveAudio
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-50",
                isProcessing && "opacity-50 cursor-not-allowed"
              )}
            >
              <input {...getAudioInputProps()} />
              <div className="space-y-4">
                <div className="mx-auto w-12 h-12 text-gray-400">
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
                      d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-medium">
                    {isDragActiveAudio ? "Drop the audio here..." : "Upload Audio"}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    MP3, WAV, AAC, etc.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <AdPlaceholder className="mt-6" />
        </>
      ) : (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Add Audio to Video</CardTitle>
            <CardDescription>
              Replace the video's audio track with the uploaded audio file.
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
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold text-gray-500">2.</span>
                  <div>
                    <p className="font-medium">Audio: {audioFile.name}</p>
                    <p className="text-sm text-gray-500">
                      {(audioFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={removeAudio}
                  disabled={isProcessing}
                  className="text-red-600 hover:text-red-800"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add Audio Button */}
            <div className="flex items-center gap-4">
              <Button
                onClick={handleAddAudio}
                disabled={!videoFile || !audioFile || isProcessing || (loading && !loaded)}
                className="min-w-32"
              >
                {isProcessing ? "Adding Audio..." : loading ? "Loading FFmpeg..." : "Add Audio to Video"}
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
                <p className="font-semibold text-green-800">Audio added successfully!</p>
                <p className="text-sm text-green-700 mb-4">
                  Your video now has the new audio track and is ready to download.
                  {saved && " It has been automatically saved to your workspace."}
                </p>
                <div className="flex gap-4">
                  <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700">
                    Download Video with New Audio
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    Add Audio to Another Video
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