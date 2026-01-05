"use client";

import { useState, useEffect } from "react";
import { VideoDropzone } from "@/components/ui/dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useVideoProcessor } from "@/hooks/use-video-process";
import FAQSection from "@/components/home/faq-section";
import AdPlaceholder from "@/components/ui/ad-placeholder";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const {
    loadFFmpeg,
    compressVideo,
    loaded,
    loading,
    progress,
    error,
    isProcessing,
    outputUrl,
    reset,
  } = useVideoProcessor();

  // Automatically load FFmpeg when component mounts? We'll load on demand.
  useEffect(() => {
    // Optionally load FFmpeg early for better UX
    // loadFFmpeg();
  }, []);

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    reset(); // Clear previous results
  };

  const handleCompress = async () => {
    if (!selectedFile) return;
    if (!loaded) {
      await loadFFmpeg();
    }
    try {
      await compressVideo(selectedFile);
    } catch (err) {
      // error already set in hook
      console.error(err);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = selectedFile ? `compressed-${selectedFile.name}` : "compressed-video.mp4";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <AdPlaceholder className="mb-6" />
      <h1 className="text-4xl font-bold mb-2">Video Compressor</h1>
      <p className="text-lg text-gray-600 mb-8">
        Upload a video file, compress it with FFmpeg in your browser, and download the result.
      </p>

      <div className="grid gap-8">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Video</CardTitle>
            <CardDescription>
              Drag & drop a video file or click to browse. Only video files are accepted.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <VideoDropzone
              onFileSelected={handleFileSelected}
              disabled={isProcessing}
            />
            {selectedFile && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="font-medium">Selected file:</p>
                <p className="text-sm text-gray-600">
                  {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Compression Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Compression</CardTitle>
            <CardDescription>
              Compress the video using FFmpeg with optimized settings for browser performance.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Button
                onClick={handleCompress}
                disabled={!selectedFile || isProcessing || (loading && !loaded)}
                className="min-w-32"
              >
                {isProcessing ? "Processing..." : loading ? "Loading FFmpeg..." : "Compress Video"}
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
                <p className="font-semibold text-green-800">Compression successful!</p>
                <p className="text-sm text-green-700 mb-4">
                  Your video has been compressed and is ready to download.
                </p>
                <div className="flex gap-4">
                  <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700">
                    Download Video
                  </Button>
                  <Button variant="outline" onClick={reset}>
                    Process Another
                  </Button>
                </div>
                <AdPlaceholder className="mt-4" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Panel */}
        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
            <CardDescription>
              This tool uses FFmpeg compiled to WebAssembly (WASM) to process videos directly in your browser.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul className="list-disc pl-5 space-y-1">
              <li>No data is sent to a server; everything runs locally.</li>
              <li>Compression settings: H.264 codec, CRF 28, ultrafast preset.</li>
              <li>Supported formats: MP4, MOV, AVI, MKV, etc.</li>
              <li>Processing speed depends on your computer and video size.</li>
            </ul>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <FAQSection />

        <AdPlaceholder className="my-6" />
      </div>
    </div>
  );
}
