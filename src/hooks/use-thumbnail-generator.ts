"use client";

import { useState, useCallback, useRef } from "react";
import { useWorkspace } from "@/context/workspace-context";

type ThumbnailFormat = "jpg" | "png";

export function useThumbnailGenerator() {
  const ffmpegRef = useRef<any>(null);
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

  const getOutputExtension = useCallback((format: ThumbnailFormat): string => {
    return format;
  }, []);

  const getMimeType = useCallback((format: ThumbnailFormat): string => {
    return format === "jpg" ? "image/jpeg" : "image/png";
  }, []);

  const generateThumbnail = useCallback(async (file: File, timestamp: number, format: ThumbnailFormat) => {
    if (!loaded) {
      console.log("Auto-loading FFmpeg before thumbnail generation...");
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
      const inputExt = file.name.split(".").pop()?.toLowerCase() || "mp4";
      const inputFileName = `input.${inputExt}`;
      await ffmpeg.writeFile(inputFileName, inputData);

      const outputExt = getOutputExtension(format);
      const outputFileName = `output.${outputExt}`;

      // Build FFmpeg command for frame extraction
      // -ss before -i for fast seek
      const command = [
        "-ss", timestamp.toString(),
        "-i", inputFileName,
        "-frames:v", "1",
      ];
      // Add quality parameter for JPEG
      if (format === "jpg") {
        command.push("-q:v", "2");
      }
      command.push(outputFileName);

      // Run extraction command
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
          name: `thumbnail_${file.name.replace(/\.[^/.]+$/, "")}_${timestamp}s.${outputExt}`,
          type: "image",
          tool: "thumbnail-generator",
        });
      } catch (err) {
        console.warn("Failed to save file to workspace:", err);
      }
      return url;
    } catch (err) {
      const errMsg = `Thumbnail generation failed: ${err instanceof Error ? err.message : String(err)}`;
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setIsProcessing(false);
    }
  }, [loaded, loadFFmpeg, getOutputExtension, getMimeType, saveFile]);

  const reset = useCallback(() => {
    setError(null);
    setProgress(0);
    setOutputUrl(null);
    setIsProcessing(false);
  }, []);

  return {
    loadFFmpeg,
    generateThumbnail,
    loaded,
    loading,
    progress,
    error,
    isProcessing,
    outputUrl,
    reset,
  };
}