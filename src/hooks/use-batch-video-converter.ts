"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { useWorkspace } from "@/context/workspace-context";
import { validateFileForProcessing } from "@/lib/file-validation";
import { getFriendlyErrorMessage } from "@/lib/error-utils";

export type BatchItemStatus = "idle" | "processing" | "completed" | "error";

export interface BatchItem {
    id: string;
    file: File;
    status: BatchItemStatus;
    progress: number;
    outputUrl?: string;
    error?: string;
    outputFormat: string;
}

type Format = "mp4" | "mov" | "mkv" | "avi" | "webm" | "wmv" | "flv" | "ogv" | "3gp" | "mp3" | "wav" | "ogg" | "m4a" | "wma" | "gif";

export function useBatchVideoConverter() {
    const [queue, setQueue] = useState<BatchItem[]>([]);
    const [isProcessingBatch, setIsProcessingBatch] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const ffmpegRef = useRef<FFmpeg | null>(null);
    const { saveFile } = useWorkspace();
    const processingRef = useRef(false); // Ref to track processing state across renders

    const loadFFmpeg = useCallback(async () => {
        if (ffmpegRef.current) return;

        try {
            const ffmpeg = new FFmpeg();
            ffmpegRef.current = ffmpeg;

            ffmpeg.on("log", ({ message }) => {
                console.log("FFmpeg log:", message);
            });

            await ffmpeg.load({
                coreURL: "/ffmpeg/ffmpeg-core.js",
                wasmURL: "/ffmpeg/ffmpeg-core.wasm",
            });
            setLoaded(true);
        } catch (err) {
            console.error("Failed to load FFmpeg:", err);
            throw err;
        }
    }, []);

    const addToQueue = useCallback((files: File[], format: Format) => {
        const newItems: BatchItem[] = files.map((file) => ({
            id: Math.random().toString(36).substring(7),
            file,
            status: "idle",
            progress: 0,
            outputFormat: format,
        }));
        setQueue((prev) => [...prev, ...newItems]);
    }, []);

    const removeFromQueue = useCallback((id: string) => {
        setQueue((prev) => prev.filter((item) => item.id !== id));
    }, []);

    const clearQueue = useCallback(() => {
        if (processingRef.current) return;
        setQueue([]);
    }, []);

    const updateItem = useCallback((id: string, updates: Partial<BatchItem>) => {
        setQueue((prev) =>
            prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
        );
    }, []);

    const processItem = useCallback(async (item: BatchItem) => {
        if (!ffmpegRef.current) await loadFFmpeg();
        const ffmpeg = ffmpegRef.current!;

        updateItem(item.id, { status: "processing", progress: 0, error: undefined });

        try {
            // Validation
            const validation = validateFileForProcessing(item.file);
            if (!validation.valid) {
                throw new Error(validation.error || "Invalid file");
            }

            const inputData = new Uint8Array(await item.file.arrayBuffer());
            const inputName = `input_${item.id}`;
            // Basic extension check for input
            const inputExt = item.file.name.split('.').pop() || "mp4";
            const virtualInputName = `${inputName}.${inputExt}`;

            await ffmpeg.writeFile(virtualInputName, inputData);

            const outputFileName = `output_${item.id}.${item.outputFormat}`;

            // Determine command based on format (simplified version of single converter logic)
            let command: string[] = [];
            const format = item.outputFormat as Format;

            // Re-use logic from use-video-converter or define simplified here
            // For now, using a simplified mapping
            switch (format) {
                case "mp4": command = ["-c:v", "libx264", "-c:a", "aac"]; break;
                case "mov": command = ["-c:v", "libx264", "-c:a", "aac"]; break;
                case "avi": command = ["-c:v", "libx264", "-c:a", "mp3"]; break;
                case "mp3": command = ["-vn", "-acodec", "libmp3lame"]; break;
                case "gif": command = ["-vf", "fps=10,scale=320:-1:flags=lanczos", "-c:v", "gif"]; break;
                default: command = ["-c:v", "libx264", "-c:a", "aac"];
            }

            ffmpeg.on("progress", ({ progress }) => {
                updateItem(item.id, { progress: Math.round(progress * 100) });
            });

            await ffmpeg.exec(["-i", virtualInputName, ...command, outputFileName]);

            const outputData = await ffmpeg.readFile(outputFileName);
            const outputBlob = new Blob([outputData as any], { type: `video/${item.outputFormat}` }); // simplified mime
            const url = URL.createObjectURL(outputBlob);

            // Save to workspace
            await saveFile(outputBlob, {
                name: `converted_${item.file.name.replace(/\.[^/.]+$/, "")}.${item.outputFormat}`,
                type: ['mp3', 'wav'].includes(item.outputFormat) ? 'audio' : 'video',
                tool: 'batch-converter'
            });

            updateItem(item.id, { status: "completed", outputUrl: url, progress: 100 });

            // Cleanup
            await ffmpeg.deleteFile(virtualInputName);
            await ffmpeg.deleteFile(outputFileName);

        } catch (err) {
            console.error(`Error processing item ${item.id}:`, err);
            updateItem(item.id, { status: "error", error: getFriendlyErrorMessage(err) });
        }
    }, [loadFFmpeg, saveFile, updateItem]);

    const processQueue = useCallback(async () => {
        if (processingRef.current) return;
        processingRef.current = true;
        setIsProcessingBatch(true);

        // Filter idle items
        // Note: We need to get the latest queue state inside the loop or use a ref-updater pattern
        // However, since we are iterating, we can loop through the queue state at start
        // A better approach for React state is to recursively find the next idle item

        // We will iterate through the queue derived from current state
        // IMPORTANT: This basic loop assumes queue doesn't change drastically during processing
        // For a robust queue, we should probably fetch the next "idle" item one by one.

        const processNext = async () => {
            // Find first idle item
            // We use a functional update to get the latest queue to find the next item
            let nextItem: BatchItem | undefined;
            setQueue(prev => {
                nextItem = prev.find(i => i.status === "idle");
                return prev;
            });

            if (nextItem) {
                await processItem(nextItem);
                await processNext(); // Recursive call to process next
            } else {
                processingRef.current = false;
                setIsProcessingBatch(false);
            }
        };

        await processNext();

    }, [processItem]);

    return {
        queue,
        addToQueue,
        removeFromQueue,
        clearQueue,
        processQueue,
        isProcessingBatch,
        loaded
    };
}
