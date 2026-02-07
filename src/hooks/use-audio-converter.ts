"use client";

import { useState, useCallback, useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { useWorkspace } from "@/context/workspace-context";
import { validateFileForProcessing } from "@/lib/file-validation";
import { getFriendlyErrorMessage } from "@/lib/error-utils";

export type AudioFormat = "mp3" | "wav" | "aac" | "ogg" | "m4a" | "wma" | "flac";

export function useAudioConverter() {
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const loadPromiseRef = useRef<Promise<void> | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const { saveFile } = useWorkspace();

  const loadFFmpeg = useCallback(async () => {
    // If already loaded, nothing to do
    if (loaded) return;
    // If a load is already in progress, return its promise
    if (loadPromiseRef.current) {
      return loadPromiseRef.current;
    }

    setLoading(true);
    setError(null);
    const loadPromise = (async () => {
      try {
        if (!ffmpegRef.current) {
          ffmpegRef.current = new FFmpeg();
        }
        const ffmpeg = ffmpegRef.current;

        ffmpeg.on("log", ({ message }: { message: string }) => {
          console.log("FFmpeg log:", message);
        });
        ffmpeg.on("progress", ({ progress: p }: { progress: number }) => {
          setProgress(Math.round(p * 100));
        });

        await ffmpeg.load({
          coreURL: "/ffmpeg/ffmpeg-core.js",
          wasmURL: "/ffmpeg/ffmpeg-core.wasm",
        });

        setLoaded(true);
        setLoading(false);
        loadPromiseRef.current = null;
      } catch (err) {
        setError(getFriendlyErrorMessage(err));
        setLoading(false);
        loadPromiseRef.current = null;
        throw err;
      }
    })();

    loadPromiseRef.current = loadPromise;
    return loadPromise;
  }, [loaded]);

  const getCodecForFormat = useCallback((format: AudioFormat): string => {
    switch (format) {
      case "mp3":
        return "libmp3lame";
      case "wav":
        return "pcm_s16le";
      case "aac":
        return "aac";
      case "m4a":
        return "aac";
      case "ogg":
        return "libvorbis";
      default:
        return "libmp3lame";
    }
  }, []);

  const getOutputExtension = useCallback((format: AudioFormat): string => {
    return format;
  }, []);

  const getMimeType = useCallback((format: AudioFormat): string => {
    switch (format) {
      case "mp3":
        return "audio/mpeg";
      case "wav":
        return "audio/wav";
      case "aac":
        return "audio/aac";
      case "m4a":
        return "audio/mp4";
      case "ogg":
        return "audio/ogg";
      default:
        return "audio/mpeg";
    }
  }, []);

  const convertAudio = useCallback(async (file: File, targetFormat: AudioFormat) => {
    // 1. Validation
    const validation = validateFileForProcessing(file);
    if (!validation.valid) {
      setError(validation.error || "Geçersiz dosya.");
      return;
    }

    if (!loaded) {
      console.log("Auto-loading FFmpeg before conversion...");
      try {
        await loadFFmpeg();
      } catch (err) {
        return;
      }
    }
    const ffmpeg = ffmpegRef.current;
    if (!ffmpeg) {
      setError(getFriendlyErrorMessage(new Error("FFmpeg instance not available.")));
      return;
    }
    setIsProcessing(true);
    setError(null);
    setProgress(0);
    setOutputUrl(null);

    try {
      // Write input file to virtual filesystem
      const inputData = new Uint8Array(await file.arrayBuffer());
      // Determine input extension for FFmpeg (not critical)
      const inputExt = file.name.split('.').pop()?.toLowerCase() || 'mp4';
      const inputFileName = `input.${inputExt}`;
      await ffmpeg.writeFile(inputFileName, inputData);

      const outputExt = getOutputExtension(targetFormat);
      const outputFileName = `output.${outputExt}`;
      const codec = getCodecForFormat(targetFormat);
      // Command: -i input.file -vn -acodec {codec} output.{format}
      const command = ["-i", inputFileName, "-vn", "-acodec", codec, outputFileName];

      // Run conversion command
      await ffmpeg.exec(command);

      // Read output file
      const outputData = await ffmpeg.readFile(outputFileName) as any;
      const outputBlob = new Blob([outputData], { type: getMimeType(targetFormat) });
      const url = URL.createObjectURL(outputBlob);
      setOutputUrl(url);
      setProgress(100);
      // Save to workspace
      try {
        await saveFile(outputBlob, {
          name: `converted_${file.name.replace(/\.[^/.]+$/, "")}.${outputExt}`,
          type: 'audio',
          tool: 'audio-converter',
        });
      } catch (err) {
        console.warn("Failed to save file to workspace:", err);
      }
      return url;
    } catch (err) {
      const friendlyMsg = getFriendlyErrorMessage(err);
      setError(friendlyMsg);
    } finally {
      setIsProcessing(false);
    }
  }, [loaded, loadFFmpeg, getCodecForFormat, getOutputExtension, getMimeType, saveFile]);

  const reset = useCallback(() => {
    setError(null);
    setProgress(0);
    setOutputUrl(null);
    setIsProcessing(false);
  }, []);

  return {
    loadFFmpeg,
    convertAudio,
    loaded,
    loading,
    progress,
    error,
    isProcessing,
    outputUrl,
    reset,
  };
}