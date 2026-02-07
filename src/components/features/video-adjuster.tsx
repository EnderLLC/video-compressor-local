"use client";

import { useState } from "react";
import { VideoDropzone } from "@/components/ui/dropzone";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useVideoFilters, DEFAULT_FILTERS, FilterValues } from "@/hooks/use-video-filters";
import AdPlaceholder from "@/components/ui/ad-placeholder";
import { Loader2, RotateCcw } from "lucide-react";

export default function VideoAdjuster() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [filters, setFilters] = useState<FilterValues>(DEFAULT_FILTERS);

    const {
        loadFFmpeg,
        applyFilters,
        loaded,
        isProcessing,
        progress,
        error,
        outputUrl
    } = useVideoFilters();

    const handleFileSelected = (file: File) => {
        setSelectedFile(file);
        setFilters(DEFAULT_FILTERS); // Reset filters for new file
    };

    const handleApply = async () => {
        if (!selectedFile) return;
        if (!loaded) await loadFFmpeg();
        await applyFilters(selectedFile, filters);
    };

    const handleDownload = () => {
        if (!outputUrl) return;
        const a = document.createElement("a");
        a.href = outputUrl;
        a.download = `adjusted-${selectedFile?.name || "video.mp4"}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const updateFilter = (key: keyof FilterValues, value: number) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {!selectedFile ? (
                <>
                    <VideoDropzone
                        onFileSelected={handleFileSelected}
                        disabled={isProcessing}
                        text="Drag & drop to adjust brightness, contrast, etc."
                    />
                    <AdPlaceholder className="mt-6" />
                </>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>Adjust Video</CardTitle>
                        <CardDescription>
                            Tweak brightness, contrast, saturation, and gamma.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">

                        {/* Brightness */}
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <label className="text-sm font-medium">Brightness ({filters.brightness})</label>
                                <span className="text-xs text-gray-500">-1.0 to 1.0</span>
                            </div>
                            <Slider
                                min={-1} max={1} step={0.05}
                                value={[filters.brightness]}
                                onValueChange={(vals) => updateFilter('brightness', vals[0])}
                            />
                        </div>

                        {/* Contrast */}
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <label className="text-sm font-medium">Contrast ({filters.contrast})</label>
                                <span className="text-xs text-gray-500">-2.0 to 2.0</span>
                            </div>
                            <Slider
                                min={-2} max={2} step={0.1}
                                value={[filters.contrast]}
                                onValueChange={(vals) => updateFilter('contrast', vals[0])}
                            />
                        </div>

                        {/* Saturation */}
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <label className="text-sm font-medium">Saturation ({filters.saturation})</label>
                                <span className="text-xs text-gray-500">0.0 to 3.0</span>
                            </div>
                            <Slider
                                min={0} max={3} step={0.1}
                                value={[filters.saturation]}
                                onValueChange={(vals) => updateFilter('saturation', vals[0])}
                            />
                        </div>

                        {/* Gamma */}
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <label className="text-sm font-medium">Gamma ({filters.gamma})</label>
                                <span className="text-xs text-gray-500">0.1 to 10.0</span>
                            </div>
                            <Slider
                                min={0.1} max={10} step={0.1}
                                value={[filters.gamma]}
                                onValueChange={(vals) => updateFilter('gamma', vals[0])}
                            />
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button
                                onClick={handleApply}
                                disabled={isProcessing}
                                className="flex-1"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Processing {progress}%
                                    </>
                                ) : "Apply Filters"}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setFilters(DEFAULT_FILTERS)}
                                disabled={isProcessing}
                                title="Reset to defaults"
                            >
                                <RotateCcw className="h-4 w-4" />
                            </Button>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 text-red-700 text-sm rounded-md">
                                {error}
                            </div>
                        )}

                        {outputUrl && (
                            <div className="space-y-4 pt-4 border-t">
                                <div className="p-4 bg-green-50 text-green-700 rounded-md text-center">
                                    Success! Your video is ready.
                                </div>
                                <div className="flex gap-2">
                                    <Button onClick={handleDownload} className="flex-1 bg-green-600 hover:bg-green-700">
                                        Download Video
                                    </Button>
                                    <Button variant="outline" onClick={() => setSelectedFile(null)}>
                                        Adjust Another
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
