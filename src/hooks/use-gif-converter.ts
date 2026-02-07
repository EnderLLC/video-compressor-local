"use client";

import { useState, useCallback, useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { useWorkspace } from "@/context/workspace-context";
import { validateFileForProcessing } from "@/lib/file-validation";
import { getFriendlyErrorMessage } from "@/lib/error-utils";

interface GifOptions {
  fps?: number;
  width?: number;
}

export function useGifConverter() {
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

  const buildGifFilter = useCallback((fps: number, width: number | null): string[] => {
    // If width is 0 or null, keep original size
    const scale = width && width > 0 ? `scale=${width}:-2:flags=lanczos` : "";
    const filters = [];
    if (fps) filters.push(`fps=${fps}`);
    if (scale) filters.push(scale);
    filters.push("split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse");
    return ["-vf", filters.join(",")];
  }, []);

  const convertToGif = useCallback(async (file: File, options: GifOptions = {}) => {
    // 1. Validation
    const validation = validateFileForProcessing(file);
    if (!validation.valid) {
      setError(validation.error || "Geçersiz dosya.");
      return;
    }

    const { fps = 10, width = 480 } = options;

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

      const filterArgs = buildGifFilter(fps, width);
      const outputFileName = "output.gif";

      // Build command: input, filter, output
      const command = ["-i", "input.mp4", ...filterArgs, outputFileName];

      // Run conversion command
      await ffmpeg.exec(command);

      // Read output file
      const outputData = await ffmpeg.readFile(outputFileName) as any;
      const outputBlob = new Blob([outputData], { type: "image/gif" });
      const url = URL.createObjectURL(outputBlob);
      setOutputUrl(url);
      setProgress(100);
      // Save to workspace
      try {
        await saveFile(outputBlob, {
          name: `converted_${file.name.replace(/\.[^/.]+$/, "")}.gif`,
          type: "gif",
          tool: "gif-converter",
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
  }, [loaded, loadFFmpeg, buildGifFilter, saveFile]);

  const reset = useCallback(() => {
    setError(null);
    setProgress(0);
    setOutputUrl(null);
    setIsProcessing(false);
  }, []);

  return {
    loadFFmpeg,
    convertToGif,
    loaded,
    loading,
    progress,
    error,
    isProcessing,
    outputUrl,
    reset,
  };
}