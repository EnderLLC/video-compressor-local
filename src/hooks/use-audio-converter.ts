"use client";

import { useState, useCallback, useRef } from "react";
import { useWorkspace } from "@/context/workspace-context";

export type AudioFormat = "mp3" | "wav" | "aac" | "m4a" | "ogg";

export function useAudioConverter() {
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
    if (!loaded) {
      console.log("Auto-loading FFmpeg before conversion...");
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
      const errMsg = `Audio conversion failed: ${err instanceof Error ? err.message : String(err)}`;
      setError(errMsg);
      throw new Error(errMsg);
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