'use client';

import React, { useState } from 'react';
import { useWorkspace } from '@/context/workspace-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, X, History } from 'lucide-react';
import { cn } from '@/lib/utils';

export function RecentFilesDrawer() {
  const { files, isLoading } = useWorkspace();
  const [isOpen, setIsOpen] = useState(false);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDownload = (file: { blob: Blob; name: string }) => {
    const url = URL.createObjectURL(file.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* Floating History Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full shadow-2xl',
          'bg-primary text-primary-foreground hover:bg-primary/90',
          'flex items-center justify-center p-0'
        )}
        aria-label="Open recent files"
      >
        <History className="h-6 w-6" />
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Side Panel */}
      <div
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <History className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Recent Files</h2>
              <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
                {files.length} file{files.length !== 1 ? 's' : ''}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <p className="text-muted-foreground">Loading...</p>
              </div>
            ) : files.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-center text-muted-foreground">
                <History className="h-10 w-10 mb-3 opacity-50" />
                <p>No recent files yet.</p>
                <p className="text-sm">Convert or compress a video to see it here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {files.map((file) => (
                  <Card key={file.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate" title={file.name}>
                            {file.name}
                          </h3>
                          <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                            <span className="capitalize">{file.tool.replace('-', ' ')}</span>
                            <span>•</span>
                            <span>{file.type.toUpperCase()}</span>
                            <span>•</span>
                            <span>{formatFileSize(file.blob.size)}</span>
                            <span>•</span>
                            <span>{formatDate(file.createdAt)}</span>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDownload(file)}
                          className="shrink-0 ml-2"
                          title="Download"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t p-4 text-center text-sm text-muted-foreground">
            Files are stored locally in your browser. Maximum 10 recent files.
          </div>
        </div>
      </div>
    </>
  );
}