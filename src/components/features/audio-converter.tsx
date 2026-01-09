"use client";

import { useState } from "react";
import { useDropzone, Accept } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAudioConverter, AudioFormat } from "@/hooks/use-audio-converter";
import AdPlaceholder from "@/components/ui/ad-placeholder";
import { cn } from "@/lib/utils";

const FORMATS = [
  { value: "mp3", label: "MP3 (Standard Audio)", mime: "audio/mpeg" },
  { value: "wav", label: "WAV (Uncompressed)", mime: "audio/wav" },
  { value: "aac", label: "AAC (Advanced Audio Coding)", mime: "audio/aac" },
  { value: "m4a", label: "M4A (Apple Audio)", mime: "audio/mp4" },
  { value: "ogg", label: "OGG (Vorbis)", mime: "audio/ogg" },
] as const;

export default function AudioConverter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<AudioFormat>("mp3");
  const {
    loadFFmpeg,
    convertAudio,
    loaded,
    loading,
    progress,
    error,
    isProcessing,
    outputUrl,
    reset,
  } = useAudioConverter();

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    reset(); // Clear previous results
  };

  const handleConvert = async () => {
    if (!selectedFile) return;
    if (!loaded) {
      await loadFFmpeg();
    }
    try {
      await convertAudio(selectedFile, selectedFormat);
    } catch (err) {
      // error already set in hook
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

  const handleReset = () => {
    setSelectedFile(null);
    reset();
  };

  const accept: Accept = {
    "audio/*": [],
    "video/*": [],
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    disabled: isProcessing,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        handleFileSelected(acceptedFiles[0]);
      }
    },
    multiple: false,
  });

  return (
    <div className="w-full max-w-lg">
      {!selectedFile ? (
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
                    ? "Drop the file here..."
                    : "Drag & drop a video or audio file"}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  or click to browse (MP4, MP3, WAV, AAC, etc.)
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Video and audio files are accepted
                </p>
              </div>
            </div>
          </div>
          <AdPlaceholder className="mt-6" />
        </>
      ) : (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Audio Converter</CardTitle>
            <CardDescription>
              Extract audio from video or convert sound files locally in your browser.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Format Selection */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Target Format
                </label>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  Source: {selectedFile?.type.includes('video') ? 'Video' : 'Audio'}
                </span>
              </div>
              <select
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value as AudioFormat)}
                disabled={isProcessing || loading}
              >
                {FORMATS.map((format) => (
                  <option key={format.value} value={format.value}>
                    {format.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {selectedFormat === "mp3" ? "Standard MP3 audio format." :
                 selectedFormat === "wav" ? "Uncompressed PCM audio, high quality." :
                 selectedFormat === "aac" ? "Advanced Audio Coding, efficient." :
                 selectedFormat === "m4a" ? "Apple audio format, AAC encoded." :
                 "Ogg Vorbis open format."}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button
                onClick={handleConvert}
                disabled={!selectedFile || isProcessing || (loading && !loaded)}
                className="min-w-32"
              >
                {isProcessing ? "Converting..." : loading ? "Loading FFmpeg..." : "Convert Audio"}
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
                  Your {selectedFile?.type.includes('video') ? 'video' : 'audio'} has been converted to {selectedFormat.toUpperCase()} and is ready to download.
                </p>
                <div className="flex gap-4">
                  <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700">
                    Download {selectedFormat.toUpperCase()}
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    Convert Another
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