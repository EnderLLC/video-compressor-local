"use client";

import { useState, useCallback, useRef } from "react";
import { useWorkspace } from "@/context/workspace-context";

export function useAudioMerger() {
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

  const mergeAudio = useCallback(async (files: File[]) => {
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
      const errMsg = `Audio merge failed: ${err instanceof Error ? err.message : String(err)}`;
      setError(errMsg);
      throw new Error(errMsg);
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