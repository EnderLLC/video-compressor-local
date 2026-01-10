"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface UseWebcamRecorderReturn {
  cameraActive: boolean;
  cameraStream: MediaStream | null;
  isRecording: boolean;
  recordingTime: number; // seconds
  recordedBlob: Blob | null;
  error: string | null;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  resetRecording: () => void;
}

export function useWebcamRecorder(): UseWebcamRecorderReturn {
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      // Request camera with audio
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      mediaStreamRef.current = stream;
      setCameraStream(stream);
      setCameraActive(true);
    } catch (err) {
      const errMsg = `Failed to start camera: ${err instanceof Error ? err.message : String(err)}`;
      setError(errMsg);
      setCameraActive(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    setCameraStream(null);
    setCameraActive(false);
    // If recording is active, stop it first
    if (isRecording) {
      stopRecording();
    }
  }, [isRecording]);

  const startRecording = useCallback(async () => {
    try {
      setError(null);
      // Ensure camera is active
      if (!mediaStreamRef.current) {
        await startCamera();
      }
      const stream = mediaStreamRef.current;
      if (!stream) {
        throw new Error("Camera stream not available");
      }

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        setRecordedBlob(blob);
        setIsRecording(false);
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        setRecordingTime(0);
        // Do not stop camera tracks here; keep camera active for preview
      };

      recorder.onerror = (event) => {
        setError(`Recording error: ${event}`);
      };

      // Start recording
      recorder.start(1000); // collect data every second
      setIsRecording(true);
      setRecordedBlob(null);
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      const errMsg = `Failed to start recording: ${err instanceof Error ? err.message : String(err)}`;
      setError(errMsg);
      setIsRecording(false);
    }
  }, [startCamera]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [isRecording]);

  const resetRecording = useCallback(() => {
    if (isRecording) {
      stopRecording();
    }
    setRecordedBlob(null);
    setRecordingTime(0);
    setError(null);
    chunksRef.current = [];
    // Keep camera active
  }, [isRecording, stopRecording]);

  return {
    cameraActive,
    cameraStream,
    isRecording,
    recordingTime,
    recordedBlob,
    error,
    startCamera,
    stopCamera,
    startRecording,
    stopRecording,
    resetRecording,
  };
}