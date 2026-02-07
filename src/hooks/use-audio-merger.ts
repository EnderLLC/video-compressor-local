"use client";

import { useState, useCallback, useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { useWorkspace } from "@/context/workspace-context";
import { validateFileForProcessing } from "@/lib/file-validation";
import { getFriendlyErrorMessage } from "@/lib/error-utils";

export function useAudioMerger() {
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
          // progress is a number between 0 and 1
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

  const mergeAudio = useCallback(async (files: File[]) => {
    // 1. Validation
    for (const file of files) {
      const validation = validateFileForProcessing(file);
      if (!validation.valid) {
        setError(validation.error || "Geçersiz dosya: " + file.name);
        return;
      }
    }

    // Ensure FFmpeg is loaded; if not, load it automatically
    if (!loaded) {
      console.log("Auto-loading FFmpeg before merging...");
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
      // Write each input file to virtual filesystem
      const inputNames = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const inputData = new Uint8Array(await file.arrayBuffer());
        // Use original extension for proper detection
        const ext = file.name.split('.').pop()?.toLowerCase() || 'mp3';
        const name = `input${i}.${ext}`;
        await ffmpeg.writeFile(name, inputData);
        inputNames.push(name);
      }

      // Build filter complex for audio concatenation
      const audioStreams = inputNames.map((_, idx) => `[${idx}:a]`);
      const filterComplex = `${audioStreams.join('')}concat=n=${inputNames.length}:v=0:a=1[out]`;

      // Prepare output file name (MP3 by default)
      const outputName = "output.mp3";

      // Build FFmpeg command
      const inputArgs = inputNames.flatMap(name => ["-i", name]);
      const args = [
        ...inputArgs,
        "-filter_complex", filterComplex,
        "-map", "[out]",
        "-c:a", "libmp3lame",
        "-q:a", "2",
        outputName,
      ];

      await ffmpeg.exec(args);

      // Read output file
      const outputData = await ffmpeg.readFile(outputName) as any;
      const outputBlob = new Blob([outputData], { type: "audio/mpeg" });
      const url = URL.createObjectURL(outputBlob);
      setOutputUrl(url);
      setProgress(100);

      // Save to workspace
      try {
        await saveFile(outputBlob, {
          name: `merged_audio_${Date.now()}.mp3`,
          type: 'audio',
          tool: 'audio-merger',
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
  }, [loaded, loadFFmpeg, saveFile]);

  const reset = useCallback(() => {
    setError(null);
    setProgress(0);
    setOutputUrl(null);
    setIsProcessing(false);
  }, []);

  return {
    loadFFmpeg,
    mergeAudio,
    loaded,
    loading,
    progress,
    error,
    isProcessing,
    outputUrl,
    reset,
  };
}