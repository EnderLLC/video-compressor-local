import { BatchItem } from "@/hooks/use-batch-video-converter";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { X, CheckCircle, AlertCircle, Loader2, Play } from "lucide-react";

interface VideoQueueListProps {
    queue: BatchItem[];
    onRemove: (id: string) => void;
    onClear: () => void;
    onProcess: () => void;
    isProcessing: boolean;
}

export function VideoQueueList({ queue, onRemove, onClear, onProcess, isProcessing }: VideoQueueListProps) {
    if (queue.length === 0) return null;

    return (
        <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Queue ({queue.length})
                </h3>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={onClear} disabled={isProcessing}>
                        Clear All
                    </Button>
                    <Button size="sm" onClick={onProcess} disabled={isProcessing || queue.every(i => i.status === 'completed')}>
                        {isProcessing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Play className="w-4 h-4 mr-2" />}
                        {isProcessing ? "Processing..." : "Start Batch"}
                    </Button>
                </div>
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                {queue.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col gap-2 p-3 bg-white dark:bg-gray-800 border rounded-lg shadow-sm"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                                    {item.status === 'completed' ? <CheckCircle className="w-5 h-5 text-green-500" /> :
                                        item.status === 'error' ? <AlertCircle className="w-5 h-5 text-red-500" /> :
                                            item.status === 'processing' ? <Loader2 className="w-5 h-5 text-blue-500 animate-spin" /> :
                                                <span className="text-xs font-bold text-gray-500">{item.outputFormat.toUpperCase()}</span>}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                        {item.file.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {(item.file.size / (1024 * 1024)).toFixed(2)} MB • {item.status}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {item.outputUrl && (
                                    <a
                                        href={item.outputUrl}
                                        download={`converted_${item.file.name.replace(/\.[^/.]+$/, "")}.${item.outputFormat}`}
                                        className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded hover:bg-green-200 dark:bg-green-900 dark:text-green-200"
                                    >
                                        Download
                                    </a>
                                )}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-gray-400 hover:text-red-500"
                                    onClick={() => onRemove(item.id)}
                                    disabled={isProcessing && item.status === 'processing'}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        {item.status === 'processing' && (
                            <Progress value={item.progress} className="h-1.5" />
                        )}
                        {item.status === 'error' && item.error && (
                            <p className="text-xs text-red-500">{item.error}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
