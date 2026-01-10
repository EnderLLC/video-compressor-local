"use client";

import { useState, useCallback, useRef } from "react";

export type WatermarkPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";

export function useVideoWatermark() {
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

  const addWatermark = useCallback(async (
    videoFile: File,
    imageFile: File,
    position: WatermarkPosition,
    size: number, // between 0 and 1, e.g., 0.15 for 15%
    padding: number = 20,
  ) => {
    if (!loaded) {
      console.log("Auto-loading FFmpeg before watermarking...");
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
      // Write input files to virtual filesystem
      const videoData = new Uint8Array(await videoFile.arrayBuffer());
      const imageData = new Uint8Array(await imageFile.arrayBuffer());
      await ffmpeg.writeFile("video.mp4", videoData);
      await ffmpeg.writeFile("logo.png", imageData);

      // Determine overlay coordinates based on position
      let overlayX = "";
      let overlayY = "";

      switch (position) {
        case "top-left":
          overlayX = `${padding}`;
          overlayY = `${padding}`;
          break;
        case "top-right":
          overlayX = `W-w-${padding}`;
          overlayY = `${padding}`;
          break;
        case "bottom-left":
          overlayX = `${padding}`;
          overlayY = `H-h-${padding}`;
          break;
        case "bottom-right":
          overlayX = `W-w-${padding}`;
          overlayY = `H-h-${padding}`;
          break;
        case "center":
          overlayX = `(W-w)/2`;
          overlayY = `(H-h)/2`;
          break;
      }

      // Build filter complex: scale logo relative to video width, then overlay
      // Using scale2ref to scale logo based on video dimensions
      const filterComplex = `[1:v][0:v]scale2ref=w=iw*${size}:h=ow/mdar[logo][video];[video][logo]overlay=${overlayX}:${overlayY}`;

      const args = [
        "-i", "video.mp4",
        "-i", "logo.png",
        "-filter_complex", filterComplex,
        "-map", "[video]",
        "-c:v", "libx264",
        "-preset", "ultrafast",
        "-c:a", "copy",
        "output.mp4",
      ];

      await ffmpeg.exec(args);

      // Read output file
      const outputData = await ffmpeg.readFile("output.mp4") as any;
      const outputBlob = new Blob([outputData], { type: "video/mp4" });
      const url = URL.createObjectURL(outputBlob);
      setOutputUrl(url);
      setProgress(100);
      return url;
    } catch (err) {
      const errMsg = `Watermarking failed: ${err instanceof Error ? err.message : String(err)}`;
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
    addWatermark,
    loaded,
    loading,
    progress,
    error,
    isProcessing,
    outputUrl,
    reset,
  };
}