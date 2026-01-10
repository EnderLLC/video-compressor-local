"use client";

import { useState, useRef } from "react";
import { VideoDropzone } from "@/components/ui/dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useVideoWatermark, WatermarkPosition } from "@/hooks/use-video-watermark";
import AdPlaceholder from "@/components/ui/ad-placeholder";

export default function VideoWatermark() {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [position, setPosition] = useState<WatermarkPosition>("bottom-right");
  const [size, setSize] = useState<number>(0.2); // 20%
  const [padding, setPadding] = useState<number>(20);

  const videoRef = useRef<HTMLVideoElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const {
    loadFFmpeg,
    addWatermark,
    loaded,
    loading,
    progress,
    error,
    isProcessing,
    outputUrl,
    reset,
  } = useVideoWatermark();

  const handleVideoSelected = (file: File) => {
    setSelectedVideo(file);
    reset();
  };

  const handleImageSelected = (file: File) => {
    setSelectedImage(file);
    reset();
  };

  const handleAddWatermark = async () => {
    if (!selectedVideo || !selectedImage) {
      alert("Please select both a video file and an image/logo file.");
      return;
    }
    if (!loaded) {
      await loadFFmpeg();
    }
    try {
      await addWatermark(selectedVideo, selectedImage, position, size, padding);
    } catch (err) {
      // error already set in hook
      console.error(err);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = selectedVideo
      ? `watermarked-${selectedVideo.name}`
      : "watermarked-video.mp4";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    setSelectedVideo(null);
    setSelectedImage(null);
    reset();
  };

  const positionOptions: { label: string; value: WatermarkPosition; icon: string }[] = [
    { label: "Top Left", value: "top-left", icon: "↖" },
    { label: "Top Right", value: "top-right", icon: "↗" },
    { label: "Bottom Left", value: "bottom-left", icon: "↙" },
    { label: "Bottom Right", value: "bottom-right", icon: "↘" },
    { label: "Center", value: "center", icon: "○" },
  ];

  return (
    <div className="w-full max-w-lg">
      {!selectedVideo || !selectedImage ? (
        <>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Step 1: Select Video</h3>
              <VideoDropzone
                onFileSelected={handleVideoSelected}
                disabled={isProcessing}
              />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Step 2: Select Logo/Image</h3>
              <div className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors hover:border-gray-400 hover:bg-gray-50"
                onClick={() => {
                  if (isProcessing) return;
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/png,image/jpeg,image/webp";
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) handleImageSelected(file);
                  };
                  input.click();
                }}
              >
                <div className="space-y-4">
                  <div className="mx-auto w-12 h-12 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-medium">Drag & drop an image file</p>
                    <p className="text-sm text-gray-500 mt-2">or click to browse (PNG, JPG, WebP)</p>
                    <p className="text-xs text-gray-400 mt-2">Only image files are accepted</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <AdPlaceholder className="mt-6" />
        </>
      ) : (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Add Watermark</CardTitle>
            <CardDescription>
              Place your logo on the video with custom position and size.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Preview Section */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Preview</p>
              <div className="relative">
                <video
                  ref={videoRef}
                  src={URL.createObjectURL(selectedVideo)}
                  controls
                  className="w-full rounded-lg border"
                />
                {selectedImage && (
                  <div className="absolute top-2 right-2 bg-white/80 p-2 rounded">
                    <img
                      ref={imageRef}
                      src={URL.createObjectURL(selectedImage)}
                      alt="Logo"
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                )}
              </div>
              <div className="flex text-xs text-gray-500 gap-4">
                <span>Video: {selectedVideo.name}</span>
                <span>Logo: {selectedImage.name}</span>
              </div>
            </div>

            {/* Position Selection */}
            <div className="space-y-4">
              <p className="text-sm font-medium">Logo Position</p>
              <div className="grid grid-cols-3 gap-2">
                {positionOptions.map((opt) => (
                  <Button
                    key={opt.value}
                    type="button"
                    variant={position === opt.value ? "default" : "outline"}
                    onClick={() => setPosition(opt.value)}
                    disabled={isProcessing}
                    className="flex flex-col items-center justify-center h-20"
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    <span className="text-xs mt-1">{opt.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Size Slider */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-sm font-medium">Logo Size</p>
                <span className="text-sm font-semibold">{Math.round(size * 100)}% of video width</span>
              </div>
              <Slider
                min={0.1}
                max={0.5}
                step={0.05}
                value={[size]}
                onValueChange={(vals) => setSize(vals[0])}
                disabled={isProcessing}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>10%</span>
                <span>30%</span>
                <span>50%</span>
              </div>
            </div>

            {/* Padding Input */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Edge Padding (pixels)</p>
              <div className="flex items-center gap-4">
                <Slider
                  min={0}
                  max={100}
                  step={5}
                  value={[padding]}
                  onValueChange={(vals) => setPadding(vals[0])}
                  disabled={isProcessing}
                  className="flex-1"
                />
                <span className="w-16 text-center font-semibold">{padding} px</span>
              </div>
            </div>

            {/* Action Buttons & Status */}
            <div className="flex items-center gap-4">
              <Button
                onClick={handleAddWatermark}
                disabled={!selectedVideo || !selectedImage || isProcessing || (loading && !loaded)}
                className="min-w-32"
              >
                {isProcessing ? "Adding Watermark..." : loading ? "Loading FFmpeg..." : "Add Watermark"}
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
            {outputUrl && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="font-semibold text-green-800">
                  Watermark added successfully!
                </p>
                <p className="text-sm text-green-700 mb-4">
                  Your video with logo is ready to download.
                </p>
                <div className="flex gap-4">
                  <Button
                    onClick={handleDownload}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Download Watermarked Video
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