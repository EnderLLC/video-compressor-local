"use client";

import { cn } from "@/lib/utils";
import { AD_CLIENT_ID } from "@/config/ads";
import { useEffect } from "react";

export type AdFormat = "auto" | "rectangle" | "vertical" | "leaderboard";

interface AdUnitProps {
  slotId: string;
  format?: AdFormat;
  label?: string;
  className?: string;
}

export default function AdUnit({
  slotId,
  format = "auto",
  label = "Advertisement Space",
  className,
}: AdUnitProps) {
  // Determine dimensions based on format
  const getDimensions = () => {
    switch (format) {
      case "rectangle":
        return "w-full aspect-[4/3] max-w-md mx-auto";
      case "vertical":
        return "w-full aspect-[3/4] max-w-xs mx-auto";
      case "leaderboard":
        return "w-full aspect-[16/2] max-w-4xl mx-auto";
      case "auto":
      default:
        return "w-full aspect-video max-w-2xl mx-auto";
    }
  };

  const dimensions = getDimensions();

  // Map our format to Google AdSense ad format
  const getAdFormat = (): string => {
    switch (format) {
      case "rectangle":
        return "rectangle";
      case "vertical":
        return "vertical";
      case "leaderboard":
        return "leaderboard";
      case "auto":
      default:
        return "auto";
    }
  };

  const adFormat = getAdFormat();

  // If environment variable says show real ads, we would inject actual ad script.
  const showRealAds = process.env.NEXT_PUBLIC_SHOW_ADS === "true";

  useEffect(() => {
    if (showRealAds && typeof window !== "undefined") {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error("AdSense push error:", err);
      }
    }
  }, [showRealAds]);

  return (
    <div
      className={cn(
        "relative my-8 overflow-hidden rounded-lg",
        dimensions,
        className
      )}
      data-slot-id={slotId}
      data-format={format}
    >
      {showRealAds ? (
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={AD_CLIENT_ID}
          data-ad-slot={slotId}
          data-ad-format={adFormat}
          data-full-width-responsive="true"
        ></ins>
      ) : (
        /* Placeholder design */
        <div
          className={cn(
            "flex h-full w-full flex-col items-center justify-center p-4 border border-dashed border-gray-400 bg-gradient-to-br from-gray-50 to-gray-100",
            dimensions
          )}
        >
          <div className="mb-2 text-4xl text-gray-400">📢</div>
          <h3 className="mb-1 text-lg font-medium text-gray-600">{label}</h3>
          <p className="max-w-sm text-center text-sm text-gray-500">
            This space is reserved for advertisements. It helps us keep the
            service free.
          </p>
          <div className="mt-4 flex items-center space-x-2 text-xs text-gray-400">
            <div className="h-2 w-2 rounded-full bg-gray-300" />
            <div className="h-2 w-2 rounded-full bg-gray-300" />
            <div className="h-2 w-2 rounded-full bg-gray-300" />
          </div>
        </div>
      )}
      {/* Responsive hint */}
      <div className="absolute bottom-2 right-2 text-[10px] text-gray-400">
        {format}
      </div>
    </div>
  );
}