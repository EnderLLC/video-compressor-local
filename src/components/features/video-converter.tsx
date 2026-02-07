"use client";

import { useState } from "react";
import { VideoDropzone } from "@/components/ui/dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useVideoConverter } from "@/hooks/use-video-converter";
import { useBatchVideoConverter } from "@/hooks/use-batch-video-converter";
import { VideoQueueList } from "./video-queue-list";
import AdPlaceholder from "@/components/ui/ad-placeholder";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useSettings } from "@/hooks/use-settings";
import { useEffect } from "react";

const FORMATS = [
  { value: "mp4", label: "MP4 (H.264 + AAC)", mime: "video/mp4" },
  { value: "mov", label: "MOV (QuickTime)", mime: "video/quicktime" },
  { value: "mkv", label: "MKV (Matroska)", mime: "video/x-matroska" },
  { value: "avi", label: "AVI (Legacy)", mime: "video/x-msvideo" },
  { value: "webm", label: "WebM (VP9)", mime: "video/webm" },
  { value: "wmv", label: "WMV (Windows Media)", mime: "video/x-ms-wmv" },
  { value: "flv", label: "FLV (Flash Video)", mime: "video/x-flv" },
  { value: "ogv", label: "OGV (Ogg Video)", mime: "video/ogg" },
  { value: "3gp", label: "3GP (Mobile)", mime: "video/3gpp" },
  { value: "mp3", label: "MP3 (Audio Only)", mime: "audio/mpeg" },
  // ... other formats if needed
  { value: "wav", label: "WAV (Uncompressed)", mime: "audio/wav" },
  { value: "ogg", label: "OGG (Vorbis)", mime: "audio/ogg" },
  { value: "m4a", label: "M4A (AAC Audio)", mime: "audio/mp4" },
  { value: "wma", label: "WMA (Windows Media Audio)", mime: "audio/x-ms-wma" },
  { value: "gif", label: "GIF (Animated)", mime: "image/gif" },
] as const;

type Format = (typeof FORMATS)[number]["value"];

interface VideoConverterProps {
  defaultInputFormat?: Format;
  defaultOutputFormat?: Format;
}

export default function VideoConverter({
  defaultInputFormat,
  defaultOutputFormat,
}: VideoConverterProps) {
  const [isBatchMode, setIsBatchMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Settings sync
  const { settings, loaded: settingsLoaded } = useSettings();
  const [selectedFormat, setSelectedFormat] = useState<Format>(defaultOutputFormat || "mp4");

  // Update effect when settings load
  useEffect(() => {
    if (settingsLoaded && !defaultOutputFormat) {
      setSelectedFormat(settings.defaultFormat as Format);
    }
  }, [settingsLoaded, settings.defaultFormat, defaultOutputFormat]);

  // Single file hooks
  const {
    loadFFmpeg,
    convertVideo,
    loaded,
    loading,
    progress,
    error,
    isProcessing,
    outputUrl,
    reset,
  } = useVideoConverter();

  // Batch file hooks
  const {
    queue,
    addToQueue,
    removeFromQueue,
    clearQueue,
    processQueue,
    isProcessingBatch,
    loaded: batchLoaded
  } = useBatchVideoConverter();

  const handleFileSelected = (file: File) => {
    if (isBatchMode) {
      addToQueue([file], selectedFormat);
    } else {
      setSelectedFile(file);
      reset();
    }
  };

  const handleConvert = async () => {
    if (!selectedFile) return;
    if (!loaded) {
      await loadFFmpeg();
    }
    try {
      await convertVideo(selectedFile, selectedFormat);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    const extension = FORMATS.find(f => f.value === selectedFormat)?.value || "converted";
    a.download = selectedFile ? `converted-${selectedFile.name.replace(/\.[^/.]+$/, "")}.${extension}` : `converted.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="w-full max-w-lg">
      <div className="flex items-center space-x-2 mb-4">
        <Switch id="batch-mode" checked={isBatchMode} onCheckedChange={setIsBatchMode} />
        <Label htmlFor="batch-mode">Batch Mode</Label>
      </div>

      {!selectedFile && !isBatchMode ? (
        <>
          <VideoDropzone
            onFileSelected={handleFileSelected}
            disabled={isProcessing}
          />
          <AdPlaceholder className="mt-6" />
        </>
      ) : isBatchMode ? (
        // Batch Mode UI
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Batch Converter</CardTitle>
            <CardDescription>Convert multiple videos sequentially.</CardDescription>
          </CardHeader>
          <CardContent>
            <VideoDropzone
              onFileSelected={(file) => addToQueue([file], selectedFormat)}
              disabled={isProcessingBatch}
              className="h-32"
              text="Add more files"
            />

            <div className="mt-4 space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Target Format (Applied to new items)
              </label>
              <select
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value as Format)}
                disabled={isProcessingBatch}
              >
                {FORMATS.map((format) => (
                  <option key={format.value} value={format.value}>
                    {format.label}
                  </option>
                ))}
              </select>
            </div>

            <VideoQueueList
              queue={queue}
              onRemove={removeFromQueue}
              onClear={clearQueue}
              onProcess={processQueue}
              isProcessing={isProcessingBatch}
            />
          </CardContent>
        </Card>
      ) : (
        // Single File UI
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Video Converter</CardTitle>
            <CardDescription>
              Convert your video to various formats locally in your browser.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Format Selection */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Target Format
                </label>
                {defaultInputFormat && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Source: {defaultInputFormat.toUpperCase()}
                  </span>
                )}
              </div>
              <select
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value as Format)}
                disabled={isProcessing || loading}
              >
                {FORMATS.map((format) => (
                  <option key={format.value} value={format.value}>
                    {format.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {selectedFormat === "mp3" ? "Audio will be extracted, video track removed." :
                  selectedFormat === "gif" ? "Video will be converted to animated GIF (low resolution)." :
                    "Video and audio will be re‑encoded for the chosen container."}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button
                onClick={handleConvert}
                disabled={!selectedFile || isProcessing || (loading && !loaded)}
                className="min-w-32"
              >
                {isProcessing ? "Converting..." : loading ? "Loading FFmpeg..." : "Convert Video"}
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
                <p className="font-semibold text-green-800">Conversion successful!</p>
                <p className="text-sm text-green-700 mb-4">
                  Your video has been converted to {selectedFormat.toUpperCase()} and is ready to download.
                </p>
                <div className="flex gap-4">
                  <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700">
                    Download {selectedFormat.toUpperCase()}
                  </Button>
                  <Button variant="outline" onClick={reset}>
                    Convert Another
                  </Button>
                </div>
                <AdPlaceholder className="mt-4" />
              </div>
            )}
            <Button variant="ghost" size="sm" onClick={() => setSelectedFile(null)} className="w-full mt-2">
              Cancel
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}