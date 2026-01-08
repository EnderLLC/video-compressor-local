"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useVideoMerger } from "@/hooks/use-video-merger";
import AdPlaceholder from "@/components/ui/ad-placeholder";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown, X } from "lucide-react";

export default function VideoMerger() {
  const [files, setFiles] = useState<File[]>([]);
  const {
    loadFFmpeg,
    mergeVideos,
    loaded,
    loading,
    progress,
    error,
    isProcessing,
    outputUrl,
    reset,
  } = useVideoMerger();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Filter out non-video files maybe
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "video/*": [] },
    onDrop,
    multiple: true,
    disabled: isProcessing,
  });

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    setFiles((prev) => {
      const newFiles = [...prev];
      [newFiles[index - 1], newFiles[index]] = [newFiles[index], newFiles[index - 1]];
      return newFiles;
    });
  };

  const moveDown = (index: number) => {
    if (index === files.length - 1) return;
    setFiles((prev) => {
      const newFiles = [...prev];
      [newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]];
      return newFiles;
    });
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      alert("Please select at least two videos to merge.");
      return;
    }
    if (!loaded) {
      await loadFFmpeg();
    }
    try {
      await mergeVideos(files);
    } catch (err) {
      // error already set in hook
      console.error(err);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = files.length === 1 ? `merged-${files[0].name}` : "merged-video.mp4";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    reset();
    setFiles([]);
  };

  return (
    <div className="w-full max-w-2xl">
      {files.length === 0 ? (
        <>
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
                  {isDragActive
                    ? "Drop the videos here..."
                    : "Drag & drop multiple video files"}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  or click to browse (MP4, MOV, AVI, etc.)
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Select at least two videos to merge
                </p>
              </div>
            </div>
          </div>
          <AdPlaceholder className="mt-6" />
        </>
      ) : (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Merge Videos</CardTitle>
            <CardDescription>
              Reorder the videos (top to bottom) and click Merge to join them into a single file.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* File List */}
            <div className="space-y-4">
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold text-gray-500">{index + 1}.</span>
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => moveDown(index)}
                      disabled={index === files.length - 1}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeFile(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Merge Button */}
            <div className="flex items-center gap-4">
              <Button
                onClick={handleMerge}
                disabled={files.length < 2 || isProcessing || (loading && !loaded)}
                className="min-w-32"
              >
                {isProcessing ? "Merging..." : loading ? "Loading FFmpeg..." : "Merge Videos"}
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
                <p className="font-semibold text-green-800">Merge successful!</p>
                <p className="text-sm text-green-700 mb-4">
                  Your videos have been merged and are ready to download.
                </p>
                <div className="flex gap-4">
                  <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700">
                    Download Merged Video
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    Merge More Videos
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