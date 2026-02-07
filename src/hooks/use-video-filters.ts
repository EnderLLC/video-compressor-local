"use client";

import { useState, useCallback, useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { useWorkspace } from "@/context/workspace-context";
import { validateFileForProcessing } from "@/lib/file-validation";
import { getFriendlyErrorMessage } from "@/lib/error-utils";

export interface FilterValues {
    brightness: number; // -1.0 to 1.0 (default 0)
    contrast: number;   // -2.0 to 2.0 (default 1.0)
    saturation: number; // 0.0 to 3.0 (default 1.0)
    gamma: number;      // 0.1 to 10.0 (default 1.0)
}

export const DEFAULT_FILTERS: FilterValues = {
    brightness: 0,
    contrast: 1,
    saturation: 1,
    gamma: 1,
};

export function useVideoFilters() {
    const ffmpegRef = useRef<FFmpeg | null>(null);
    const [loaded, setLoaded] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [outputUrl, setOutputUrl] = useState<string | null>(null);
    const { saveFile } = useWorkspace();

    const loadFFmpeg = useCallback(async () => {
        if (ffmpegRef.current) return;
        try {
            const ffmpeg = new FFmpeg();
            ffmpegRef.current = ffmpeg;
            ffmpeg.on("log", ({ message }) => console.log(message));
            ffmpeg.on("progress", ({ progress }) => setProgress(Math.round(progress * 100)));

            await ffmpeg.load({
                coreURL: "/ffmpeg/ffmpeg-core.js",
                wasmURL: "/ffmpeg/ffmpeg-core.wasm",
            });
            setLoaded(true);
        } catch (err) {
            console.error("FFmpeg load failed:", err);
            throw err;
        }
    }, []);

    const applyFilters = useCallback(async (file: File, filters: FilterValues) => {
        if (!ffmpegRef.current) await loadFFmpeg();
        const ffmpeg = ffmpegRef.current!;

        setIsProcessing(true);
        setError(null);
        setProgress(0);
        setOutputUrl(null);

        try {
            // Validation
            const validation = validateFileForProcessing(file);
            if (!validation.valid) throw new Error(validation.error || "Invalid file");

            const inputData = new Uint8Array(await file.arrayBuffer());
            const inputName = "input.mp4"; // Simplify input name
            const outputName = "output.mp4";

            await ffmpeg.writeFile(inputName, inputData);

            // Build filter string
            // eq=brightness=0.06:contrast=1.5:saturation=1.5:gamma=1.0
            const filterString = `eq=brightness=${filters.brightness}:contrast=${filters.contrast}:saturation=${filters.saturation}:gamma=${filters.gamma}`;

            await ffmpeg.exec([
                "-i", inputName,
                "-vf", filterString,
                "-c:v", "libx264",
                "-c:a", "copy", // Copy audio without re-encoding if possible, or re-encode if needed. 
                // Note: formatting filters often requires re-encoding video. 
                // Audio usually doesn't need re-encoding unless format changes.
                outputName
            ]);

            const outputData = await ffmpeg.readFile(outputName);
            const outputBlob = new Blob([outputData as any], { type: "video/mp4" });
            const url = URL.createObjectURL(outputBlob);

            setOutputUrl(url);

            await saveFile(outputBlob, {
                name: `adjusted_${file.name}`,
                type: "video",
                tool: "video-adjuster"
            });

            // Cleanup
            await ffmpeg.deleteFile(inputName);
            await ffmpeg.deleteFile(outputName);

        } catch (err) {
            setError(getFriendlyErrorMessage(err));
            console.error(err);
        } finally {
            setIsProcessing(false);
        }
    }, [loadFFmpeg, saveFile]);

    return {
        loadFFmpeg,
        applyFilters,
        loaded,
        isProcessing,
        progress,
        error,
        outputUrl
    };
}
