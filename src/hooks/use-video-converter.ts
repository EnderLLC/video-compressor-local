"use client";

import { useState, useCallback, useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { useWorkspace } from "@/context/workspace-context";
import { validateFileForProcessing } from "@/lib/file-validation";
import { getFriendlyErrorMessage } from "@/lib/error-utils";

type Format = "mp4" | "mov" | "mkv" | "avi" | "webm" | "wmv" | "flv" | "ogv" | "3gp" | "mp3" | "wav" | "ogg" | "m4a" | "wma" | "gif";

export function useVideoConverter() {
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
    if (loaded) return;
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

        // Load from local files in public/ffmpeg
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

  const getCommandForFormat = useCallback((format: Format): string[] => {
    switch (format) {
      case "mp4":
        return ["-c:v", "libx264", "-c:a", "aac"];
      case "mov":
        return ["-c:v", "libx264", "-c:a", "aac"];
      case "mkv":
        return ["-c:v", "libx264", "-c:a", "aac"];
      case "avi":
        return ["-c:v", "libx264", "-c:a", "mp3"];
      case "webm":
        return ["-c:v", "libvpx-vp9", "-c:a", "libopus"];
      case "wmv":
        return ["-c:v", "wmv2", "-c:a", "wmav2"];
      case "flv":
        return ["-c:v", "flv", "-c:a", "mp3"];
      case "ogv":
        return ["-c:v", "libtheora", "-c:a", "libvorbis"];
      case "3gp":
        return ["-c:v", "mpeg4", "-c:a", "aac"];
      case "mp3":
        return ["-vn", "-acodec", "libmp3lame"];
      case "wav":
        return ["-vn", "-acodec", "pcm_s16le"];
      case "ogg":
        return ["-vn", "-acodec", "libvorbis"];
      case "m4a":
        return ["-vn", "-acodec", "aac"];
      case "wma":
        return ["-vn", "-acodec", "wmav2"];
      case "gif":
        return ["-vf", "fps=10,scale=320:-1:flags=lanczos", "-c:v", "gif"];
      default:
        return ["-c:v", "libx264", "-c:a", "aac"];
    }
  }, []);

  const getOutputExtension = useCallback((format: Format): string => {
    return format;
  }, []);

  const getMimeType = useCallback((format: Format): string => {
    switch (format) {
      case "mp4": return "video/mp4";
      case "mov": return "video/quicktime";
      case "mkv": return "video/x-matroska";
      case "avi": return "video/x-msvideo";
      case "webm": return "video/webm";
      case "wmv": return "video/x-ms-wmv";
      case "flv": return "video/x-flv";
      case "ogv": return "video/ogg";
      case "3gp": return "video/3gpp";
      case "mp3": return "audio/mpeg";
      case "wav": return "audio/wav";
      case "ogg": return "audio/ogg";
      case "m4a": return "audio/mp4";
      case "wma": return "audio/x-ms-wma";
      case "gif": return "image/gif";
      default: return "video/mp4";
    }
  }, []);

  const convertVideo = useCallback(async (file: File, format: Format) => {
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
      await ffmpeg.writeFile("input.mp4", inputData);

      const outputExt = getOutputExtension(format);
      const outputFileName = `output.${outputExt}`;
      const command = ["-i", "input.mp4", ...getCommandForFormat(format), outputFileName];

      // Run conversion command
      await ffmpeg.exec(command);

      // Read output file
      const outputData = await ffmpeg.readFile(outputFileName) as any;
      const outputBlob = new Blob([outputData], { type: getMimeType(format) });
      const url = URL.createObjectURL(outputBlob);
      setOutputUrl(url);
      setProgress(100);
      // Save to workspace
      try {
        await saveFile(outputBlob, {
          name: `converted_${file.name.replace(/\.[^/.]+$/, "")}.${getOutputExtension(format)}`,
          type: format === 'gif' ? 'gif' : (['mp3', 'wav', 'ogg', 'm4a', 'wma'].includes(format) ? 'audio' : 'video'),
          tool: `video-converter`,
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
  }, [loaded, loadFFmpeg, getCommandForFormat, getOutputExtension, getMimeType, saveFile]);

  const reset = useCallback(() => {
    setError(null);
    setProgress(0);
    setOutputUrl(null);
    setIsProcessing(false);
  }, []);

  return {
    loadFFmpeg,
    convertVideo,
    loaded,
    loading,
    progress,
    error,
    isProcessing,
    outputUrl,
    reset,
  };
}