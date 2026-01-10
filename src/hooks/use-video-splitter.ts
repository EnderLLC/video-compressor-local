"use client";

import { useState, useCallback, useRef } from "react";

export function useVideoSplitter() {
  const ffmpegRef = useRef<any>(null);
  const loadPromiseRef = useRef<Promise<void> | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [outputUrls, setOutputUrls] = useState<string[]>([]);

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

  const splitVideo = useCallback(async (file: File, segmentTime: number) => {
    // Ensure FFmpeg is loaded; if not, load it automatically
    if (!loaded) {
      console.log("Auto-loading FFmpeg before splitting...");
      await loadFFmpeg();
    }
    const ffmpeg = ffmpegRef.current;
    if (!ffmpeg) {
      throw new Error("FFmpeg instance not available.");
    }
    setIsProcessing(true);
    setError(null);
    setProgress(0);
    setOutputUrls([]);

    try {
      // Write input file to virtual filesystem
      const inputData = new Uint8Array(await file.arrayBuffer());
      await ffmpeg.writeFile("input.mp4", inputData);

      // Run segment splitting command with stream copy (fast)
      // -segment_time specifies each segment's duration in seconds
      // -f segment enables segment muxer
      // -reset_timestamps 1 resets timestamps for each segment
      // output%03d.mp4 generates files like output001.mp4, output002.mp4, ...
      await ffmpeg.exec([
        "-i", "input.mp4",
        "-c", "copy",
        "-map", "0",
        "-segment_time", segmentTime.toString(),
        "-f", "segment",
        "-reset_timestamps", "1",
        "output%03d.mp4",
      ]);

      // Scan virtual filesystem for output files
      // The FFmpeg.wasm API provides `readDir` to list files
      const files = await ffmpeg.readDir(".");
      const outputFiles = files.filter((f: string) => f.startsWith("output") && f.endsWith(".mp4"));
      outputFiles.sort(); // ensure order

      // Read each output file and create blob URLs
      const urls: string[] = [];
      for (const fileName of outputFiles) {
        const outputData = await ffmpeg.readFile(fileName) as any;
        const outputBlob = new Blob([outputData], { type: "video/mp4" });
        const url = URL.createObjectURL(outputBlob);
        urls.push(url);
      }

      setOutputUrls(urls);
      setProgress(100);
      return urls;
    } catch (err) {
      const errMsg = `Video splitting failed: ${err instanceof Error ? err.message : String(err)}`;
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setIsProcessing(false);
    }
  }, [loaded, loadFFmpeg]);

  const reset = useCallback(() => {
    setError(null);
    setProgress(0);
    setOutputUrls([]);
    setIsProcessing(false);
  }, []);

  return {
    loadFFmpeg,
    splitVideo,
    loaded,
    loading,
    progress,
    error,
    isProcessing,
    outputUrls,
    reset,
  };
}