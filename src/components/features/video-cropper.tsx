"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Cropper from "react-easy-crop";
import { VideoDropzone } from "@/components/ui/dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useVideoCropper } from "@/hooks/use-video-cropper";
import AdPlaceholder from "@/components/ui/ad-placeholder";
import type { Area, Point } from "react-easy-crop";

const ASPECT_RATIOS = [
  { label: "Free", value: undefined },
  { label: "16:9", value: 16 / 9 },
  { label: "4:3", value: 4 / 3 },
  { label: "1:1 (Square)", value: 1 },
  { label: "9:16 (TikTok)", value: 9 / 16 },
];

export default function VideoCropper() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [aspectRatio, setAspectRatio] = useState<number | undefined>(undefined);
  const [videoDimensions, setVideoDimensions] = useState({ width: 0, height: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);

  const {
    loadFFmpeg,
    cropVideo,
    loaded,
    loading,
    progress,
    error,
    isProcessing,
    outputUrl,
    reset,
  } = useVideoCropper();

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    reset();
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setAspectRatio(undefined);
  };

  const handleVideoLoad = useCallback(() => {
    if (videoRef.current) {
      const { videoWidth, videoHeight } = videoRef.current;
      setVideoDimensions({ width: videoWidth, height: videoHeight });
    }
  }, []);

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    if (!selectedFile || !croppedAreaPixels) {
      alert("Please select a crop area first.");
      return;
    }
    if (!loaded) {
      await loadFFmpeg();
    }
    try {
      const { x, y, width, height } = croppedAreaPixels;
      await cropVideo(selectedFile, Math.round(x), Math.round(y), Math.round(width), Math.round(height));
    } catch (err) {
      // error already set in hook
      console.error(err);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = selectedFile ? `cropped-${selectedFile.name}` : "cropped-video.mp4";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setVideoUrl(null);
    reset();
  };

  return (
    <div className="w-full max-w-3xl">
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
            <CardTitle>Video Cropper</CardTitle>
            <CardDescription>
              Select a region to crop. Choose an aspect ratio for popular platforms.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Aspect Ratio Buttons */}
            <div className="flex flex-wrap gap-2">
              {ASPECT_RATIOS.map((ratio) => (
                <Button
                  key={ratio.label}
                  variant={aspectRatio === ratio.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAspectRatio(ratio.value)}
                  disabled={isProcessing}
                >
                  {ratio.label}
                </Button>
              ))}
            </div>

            {/* Video Cropper Area */}
            <div className="relative w-full h-96 bg-gray-900 rounded-lg overflow-hidden">
              {videoUrl && (
                <>
                  <Cropper
                    video={videoUrl}
                    crop={crop}
                    zoom={zoom}
                    aspect={aspectRatio}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                    objectFit="contain"
                    style={{
                      containerStyle: { width: "100%", height: "100%", position: "relative" },
                      mediaStyle: { maxWidth: "100%", maxHeight: "100%" },
                    }}
                  />
                  <video
                    ref={videoRef}
                    src={videoUrl}
                    onLoadedMetadata={handleVideoLoad}
                    className="hidden"
                  />
                </>
              )}
            </div>

            {/* Zoom Slider */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Zoom</label>
              <input
                type="range"
                min="1"
                max="3"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                disabled={isProcessing}
                className="w-full"
              />
            </div>

            {/* Crop Info */}
            {croppedAreaPixels && (
              <div className="text-sm text-gray-600">
                Selected region: x={Math.round(croppedAreaPixels.x)}, y={Math.round(croppedAreaPixels.y)}, width={Math.round(croppedAreaPixels.width)}, height={Math.round(croppedAreaPixels.height)}
              </div>
            )}

            {/* Crop Button & Status */}
            <div className="flex items-center gap-4">
              <Button
                onClick={handleCrop}
                disabled={!selectedFile || !croppedAreaPixels || isProcessing || (loading && !loaded)}
                className="min-w-32"
              >
                {isProcessing ? "Cropping..." : loading ? "Loading FFmpeg..." : "Crop Video"}
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
                <p className="font-semibold text-green-800">Cropping successful!</p>
                <p className="text-sm text-green-700 mb-4">
                  Your video has been cropped and is ready to download.
                </p>
                <div className="flex gap-4">
                  <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700">
                    Download Video
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    Crop Another
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