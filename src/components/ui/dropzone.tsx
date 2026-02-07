"use client";

import React from "react";
import { useDropzone, Accept } from "react-dropzone";
import { cn } from "@/lib/utils";

interface VideoDropzoneProps {
  onFileSelected: (file: File) => void;
  disabled?: boolean;
  className?: string;
  text?: string;
  multiple?: boolean;
}

export function VideoDropzone({
  onFileSelected,
  disabled = false,
  className,
  text,
  multiple = false,
}: VideoDropzoneProps) {
  const accept: Accept = {
    "video/*": [],
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    disabled,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        if (multiple) {
          // If multiple, we might need to change the callback signature or call it multiple times
          // For now, let's just call it for each file if the parent expects that,
          // or we might need to update the prop signature.
          // But looking at usage, we are calling addToQueue([file]) in the parent.
          // Ideally we should pass all files at once.
          // Let's iterate for now to keep the prop signature compatible if possible,
          // OR better, let the parent handle the array.
          // The current prop is `(file: File) => void`.
          // Let's call it for each file.
          acceptedFiles.forEach(file => onFileSelected(file));
        } else {
          onFileSelected(acceptedFiles[0]);
        }
      }
    },
    multiple: multiple,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors",
        isDragActive
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 hover:border-gray-400 hover:bg-gray-50",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <input {...getInputProps()} />
      <div className="space-y-4">
        <div className="mx-auto w-12 h-12 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-full h-full"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
        </div>
        <div>
          <p className="text-lg font-medium">
            {isDragActive
              ? "Drop the video here..."
              : text || "Drag & drop a video file"}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            or click to browse (MP4, MOV, AVI, etc.)
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Only video files are accepted
          </p>
        </div>
      </div>
    </div>
  );
}