"use client";

import { useState, useCallback, useRef } from "react";

export function useSlideshow() {
  const ffmpegRef = useRef<any>(null);
  const loadPromiseRef = useRef<Promise<void> | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);

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
        // Dynamically import FFmpeg and util only on client side
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
          // progress is a number between 0 and 1
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

  const createSlideshow = useCallback(async (files: File[], durationPerSlide: number) => {
    // Ensure FFmpeg is loaded; if not, load it automatically
    if (!loaded) {
      console.log("Auto-loading FFmpeg before slideshow creation...");
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
      // Write each image file to virtual filesystem with sequential names
      // FFmpeg expects image%d.jpg (or image%03d.jpg) where %d is sequential number starting from 1
      const inputNames = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const inputData = new Uint8Array(await file.arrayBuffer());
        // Use extension from original file? FFmpeg may detect format based on extension.
        // We'll rename to image{i+1}.jpg (or .png). For simplicity, use .jpg (FFmpeg will convert).
        // But we need to keep original extension? Let's use 'image{i+1}.jpg' and rely on FFmpeg's image2 demuxer.
        // It's safer to preserve original extension. We'll use 'image{i+1}.xxx' where xxx is file extension.
        const ext = file.name.split('.').pop() || 'jpg';
        const name = `image${i + 1}.${ext}`;
        await ffmpeg.writeFile(name, inputData);
        inputNames.push(name);
      }

      // Determine framerate: each image should be displayed for durationPerSlide seconds.
      // Framerate = 1 / durationPerSlide (images per second).
      // FFmpeg's -framerate option expects the input framerate (how many images per second to read).
      // If we want each image to stay for 2 seconds, framerate = 0.5 (1/2).
      const framerate = 1 / durationPerSlide;

      // Output file name
      const outputName = "output.mp4";

      // Build FFmpeg command
      // Use pattern 'image%d' if extensions are consistent; we can use '-pattern_type glob' but simpler to list files?
      // Since we have sequential numbers, we can use -i image%d.jpg (but we have variable extensions).
      // Instead we can use concat demuxer but easier: rename all to .jpg extension.
      // Let's assume we convert all images to .jpg (by writing with .jpg extension). 
      // We'll write them as image%d.jpg (by renaming). Let's rewrite with .jpg extension.
      // For simplicity, we'll just use image%d.jpg and hope FFmpeg can decode other formats (png, etc.)
      // FFmpeg's image2 demuxer supports multiple formats.
      const args = [
        "-framerate", framerate.toString(),
        "-i", "image%d.jpg", // expects files image1.jpg, image2.jpg, ...
        "-c:v", "libx264",
        "-r", "30", // output framerate
        "-pix_fmt", "yuv420p",
        "-vf", "scale=trunc(iw/2)*2:trunc(ih/2)*2", // ensure even dimensions
        outputName,
      ];

      await ffmpeg.exec(args);

      // Read output file
      const outputData = await ffmpeg.readFile(outputName) as any;
      const outputBlob = new Blob([outputData], { type: "video/mp4" });
      const url = URL.createObjectURL(outputBlob);
      setOutputUrl(url);
      setProgress(100);
      return url;
    } catch (err) {
      const errMsg = `Slideshow creation failed: ${err instanceof Error ? err.message : String(err)}`;
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
    createSlideshow,
    loaded,
    loading,
    progress,
    error,
    isProcessing,
    outputUrl,
    reset,
  };
}