"use client";

import { useState, useCallback, useRef } from "react";

export function useAudioManager() {
  const ffmpegRef = useRef<any>(null);
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
        const { FFmpeg } = await import("@ffmpeg/ffmpeg");
        const { toBlobURL } = await import("@ffmpeg/util");

        if (!ffmpegRef.current) {
          ffmpegRef.current = new FFmpeg();
        }
        const ffmpeg = ffmpegRef.current;

        const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd";
        ffmpeg.on("log", ({ message }: { message: string }) => {
          console.log("FFmpeg log:", message);
        });
        ffmpeg.on("progress", ({ progress: p }: { progress: number }) => {
          setProgress(Math.round(p * 100));
        });

        await ffmpeg.load({
          coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
          wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
        });

        setLoaded(true);
        setLoading(false);
        loadPromiseRef.current = null;
      } catch (err) {
        setError(`Failed to load FFmpeg: ${err instanceof Error ? err.message : String(err)}`);
        setLoading(false);
        loadPromiseRef.current = null;
        throw err;
      }
    })();

    loadPromiseRef.current = loadPromise;
    return loadPromise;
  }, [loaded]);

  const removeAudio = useCallback(async (file: File) => {
    // Ensure FFmpeg is loaded; if not, load it automatically
    if (!loaded) {
      console.log("Auto-loading FFmpeg before removing audio...");
      await loadFFmpeg();
    }
    const ffmpeg = ffmpegRef.current;
    if (!ffmpeg) {
      throw new Error("FFmpeg instance not available.");
    }
    setIsProcessing(true);
    setError(null);
    setProgress(0);
    setOutputUrl(null);

    try {
      // Write input file to virtual filesystem
      const inputData = new Uint8Array(await file.arrayBuffer());
      await ffmpeg.writeFile("input.mp4", inputData);

      // Run mute command: copy video stream, remove audio stream
      await ffmpeg.exec([
        "-i", "input.mp4",
        "-c", "copy",
        "-an",
        "output.mp4",
      ]);

      // Read output file
      const outputData = await ffmpeg.readFile("output.mp4") as any;
      const outputBlob = new Blob([outputData], { type: "video/mp4" });
      const url = URL.createObjectURL(outputBlob);
      setOutputUrl(url);
      setProgress(100);
      return url;
    } catch (err) {
      const errMsg = `Remove audio failed: ${err instanceof Error ? err.message : String(err)}`;
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setIsProcessing(false);
    }
  }, [loaded, loadFFmpeg]);

  const boostVolume = useCallback(async (file: File, volumeMultiplier: number = 2.0) => {
    // Ensure FFmpeg is loaded; if not, load it automatically
    if (!loaded) {
      console.log("Auto-loading FFmpeg before boosting volume...");
      await loadFFmpeg();
    }
    const ffmpeg = ffmpegRef.current;
    if (!ffmpeg) {
      throw new Error("FFmpeg instance not available.");
    }
    setIsProcessing(true);
    setError(null);
    setProgress(0);
    setOutputUrl(null);

    try {
      // Write input file to virtual filesystem
      const inputData = new Uint8Array(await file.arrayBuffer());
      await ffmpeg.writeFile("input.mp4", inputData);

      // Run volume boost command: copy video stream, apply audio filter
      await ffmpeg.exec([
        "-i", "input.mp4",
        "-filter:a", `volume=${volumeMultiplier}`,
        "-c:v", "copy",
        "output.mp4",
      ]);

      // Read output file
      const outputData = await ffmpeg.readFile("output.mp4") as any;
      const outputBlob = new Blob([outputData], { type: "video/mp4" });
      const url = URL.createObjectURL(outputBlob);
      setOutputUrl(url);
      setProgress(100);
      return url;
    } catch (err) {
      const errMsg = `Volume boost failed: ${err instanceof Error ? err.message : String(err)}`;
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setIsProcessing(false);
    }
  }, [loaded, loadFFmpeg]);

  const reset = useCallback(() => {
    setError(null);
    setProgress(0);
    setOutputUrl(null);
    setIsProcessing(false);
  }, []);

  return {
    loadFFmpeg,
    removeAudio,
    boostVolume,
    loaded,
    loading,
    progress,
    error,
    isProcessing,
    outputUrl,
    reset,
  };
}