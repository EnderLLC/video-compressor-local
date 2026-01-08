"use client";

import { useState, useCallback, useRef } from "react";

export function useVideoMerger() {
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

  const mergeVideos = useCallback(async (files: File[]) => {
    // Ensure FFmpeg is loaded; if not, load it automatically
    if (!loaded) {
      console.log("Auto-loading FFmpeg before merging...");
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
      // Write each input file to virtual filesystem
      const inputNames = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const inputData = new Uint8Array(await file.arrayBuffer());
        const name = `input${i}.mp4`;
        await ffmpeg.writeFile(name, inputData);
        inputNames.push(name);
      }

      // Build complex filter for scaling and concatenation
      // Scale each video to 1280x720, pad to maintain aspect ratio
      const scaleFilters = [];
      const concatVideoStreams = [];
      const concatAudioStreams = [];

      for (let i = 0; i < inputNames.length; i++) {
        // Video scaling and padding
        scaleFilters.push(`[${i}:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2[v${i}]`);
        concatVideoStreams.push(`[v${i}]`);
        // Audio (if present) - just pass through
        concatAudioStreams.push(`[${i}:a]`);
      }

      const filterComplex = [
        ...scaleFilters,
        `${concatVideoStreams.join('')}${concatAudioStreams.join('')}concat=n=${inputNames.length}:v=1:a=1[v][a]`
      ].join('; ');

      // Prepare output file name
      const outputName = "output.mp4";

      // Build FFmpeg command
      const inputArgs = inputNames.flatMap(name => ["-i", name]);
      const args = [
        ...inputArgs,
        "-filter_complex", filterComplex,
        "-map", "[v]",
        "-map", "[a]",
        "-c:v", "libx264",
        "-preset", "ultrafast",
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
      const errMsg = `Merge failed: ${err instanceof Error ? err.message : String(err)}`;
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
    mergeVideos,
    loaded,
    loading,
    progress,
    error,
    isProcessing,
    outputUrl,
    reset,
  };
}