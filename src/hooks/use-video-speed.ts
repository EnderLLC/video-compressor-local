"use client";

import { useState, useCallback, useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { validateFileForProcessing } from "@/lib/file-validation";
import { getFriendlyErrorMessage } from "@/lib/error-utils";

export function useVideoSpeed() {
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const loadPromiseRef = useRef<Promise<void> | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);

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

  /**
   * Generate audio filter string for given speed factor.
   * atempo filter only supports values between 0.5 and 2.0.
   * For speeds outside this range, we chain multiple atempo filters.
   * Returns empty string if muteAudio is true.
   */
  const getAudioFilter = useCallback((speed: number, muteAudio: boolean): string => {
    if (muteAudio) return "";
    if (speed === 1) return "";

    let remaining = speed;
    const filters: string[] = [];
    while (remaining < 0.5 || remaining > 2.0) {
      if (remaining < 0.5) {
        filters.push("atempo=0.5");
        remaining *= 2;
      } else if (remaining > 2.0) {
        filters.push("atempo=2.0");
        remaining /= 2;
      }
    }
    if (remaining !== 1) {
      filters.push(`atempo=${remaining.toFixed(2)}`);
    }
    return filters.length > 0 ? `-af ${filters.join(",")}` : "";
  }, []);

  const speedVideo = useCallback(async (file: File, speed: number, muteAudio: boolean = false) => {
    // 1. Validation
    const validation = validateFileForProcessing(file);
    if (!validation.valid) {
      setError(validation.error || "Geçersiz dosya.");
      return;
    }

    // Ensure FFmpeg is loaded; if not, load it automatically
    if (!loaded) {
      console.log("Auto-loading FFmpeg before speed change...");
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

      // Build FFmpeg command
      const videoFilter = `setpts=${1 / speed}*PTS`;
      const audioFilter = getAudioFilter(speed, muteAudio);
      const args = [
        "-i", "input.mp4",
        "-vf", videoFilter,
      ];
      if (audioFilter) {
        args.push(...audioFilter.split(" "));
      } else if (muteAudio) {
        args.push("-an");
      }
      args.push("-c:v", "libx264", "-preset", "ultrafast", "output.mp4");

      await ffmpeg.exec(args);

      // Read output file
      const outputData = await ffmpeg.readFile("output.mp4") as any;
      const outputBlob = new Blob([outputData], { type: "video/mp4" });
      const url = URL.createObjectURL(outputBlob);
      setOutputUrl(url);
      setProgress(100);
      return url;
    } catch (err) {
      const friendlyMsg = getFriendlyErrorMessage(err);
      setError(friendlyMsg);
    } finally {
      setIsProcessing(false);
    }
  }, [loaded, loadFFmpeg, getAudioFilter]);

  const reset = useCallback(() => {
    setError(null);
    setProgress(0);
    setOutputUrl(null);
    setIsProcessing(false);
  }, []);

  return {
    loadFFmpeg,
    speedVideo,
    loaded,
    loading,
    progress,
    error,
    isProcessing,
    outputUrl,
    reset,
  };
}