"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSlideshow } from "@/hooks/use-slideshow";
import { useWorkspace } from "@/context/workspace-context";
import AdPlaceholder from "@/components/ui/ad-placeholder";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown, X, Image as ImageIcon } from "lucide-react";

export default function SlideshowMaker() {
  const [files, setFiles] = useState<File[]>([]);
  const [durationPerSlide, setDurationPerSlide] = useState<number>(3); // seconds
  const {
    loadFFmpeg,
    createSlideshow,
    loaded,
    loading,
    progress,
    error,
    isProcessing,
    outputUrl,
    reset,
  } = useSlideshow();
  const { saveFile } = useWorkspace();
  const [saved, setSaved] = useState(false);

  // Auto‑save to workspace when processing completes
  useEffect(() => {
    if (!outputUrl || files.length === 0) return;
    const autoSave = async () => {
      try {
        const response = await fetch(outputUrl);
        const blob = await response.blob();
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const name = files[0]?.name.replace(/\.[^/.]+$/, "") || "slideshow";
        await saveFile(blob, {
          name: `slideshow-${name}-${timestamp}.mp4`,
          type: "video/mp4",
          tool: "slideshow",
        });
        setSaved(true);
      } catch (err) {
        console.error("Failed to auto‑save to workspace:", err);
      }
    };
    autoSave();
  }, [outputUrl, files, saveFile]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Filter out non-image files
    const imageFiles = acceptedFiles.filter(file => file.type.startsWith("image/"));
    setFiles((prev) => [...prev, ...imageFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
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

  const handleCreateSlideshow = async () => {
    if (files.length === 0) {
      alert("Please upload at least one image.");
      return;
    }
    if (!loaded) {
      await loadFFmpeg();
    }
    try {
      await createSlideshow(files, durationPerSlide);
    } catch (err) {
      // error already set in hook
      console.error(err);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = files.length === 1 ? `slideshow-${files[0].name}.mp4` : "slideshow-video.mp4";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    reset();
    setFiles([]);
    setSaved(false);
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
                <ImageIcon className="w-full h-full" />
              </div>
              <div>
                <p className="text-lg font-medium">
                  {isDragActive
                    ? "Drop the images here..."
                    : "Drag & drop multiple image files"}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  or click to browse (JPG, PNG, GIF, etc.)
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Select at least one image to create a slideshow video
                </p>
              </div>
            </div>
          </div>
          <AdPlaceholder className="mt-6" />
        </>
      ) : (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Create Slideshow Video</CardTitle>
            <CardDescription>
              Reorder the images (top to bottom) and set the duration per slide.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Duration per slide setting */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Duration per image (seconds)
              </label>
              <div className="flex items-center gap-4">
                <select
                  value={durationPerSlide}
                  onChange={(e) => setDurationPerSlide(Number(e.target.value))}
                  className="border rounded-lg px-4 py-2 w-24"
                  disabled={isProcessing}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((sec) => (
                    <option key={sec} value={sec}>
                      {sec} sec
                    </option>
                  ))}
                </select>
                <span className="text-sm text-gray-500">
                  Each image will be shown for {durationPerSlide} seconds in the video.
                </span>
              </div>
            </div>

            {/* File List */}
            <div className="space-y-4">
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold text-gray-500">{index + 1}.</span>
                    <div className="flex items-center gap-4">
                      {file.type.startsWith("image/") && (
                        <div className="w-12 h-12 flex-shrink-0 border rounded overflow-hidden">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-gray-500">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => moveUp(index)}
                      disabled={index === 0 || isProcessing}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => moveDown(index)}
                      disabled={index === files.length - 1 || isProcessing}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeFile(index)}
                      disabled={isProcessing}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Create Slideshow Button */}
            <div className="flex items-center gap-4">
              <Button
                onClick={handleCreateSlideshow}
                disabled={files.length === 0 || isProcessing || (loading && !loaded)}
                className="min-w-32"
              >
                {isProcessing ? "Creating..." : loading ? "Loading FFmpeg..." : "Create Slideshow Video"}
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
                <p className="font-semibold text-green-800">Slideshow created successfully!</p>
                <p className="text-sm text-green-700 mb-4">
                  Your images have been turned into a video slideshow and are ready to download.
                  {saved && " It has been automatically saved to your workspace."}
                </p>
                <div className="flex gap-4">
                  <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700">
                    Download Slideshow Video
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    Create Another Slideshow
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