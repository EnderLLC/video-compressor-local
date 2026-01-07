'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WorkspaceFile, addFile as dbAddFile, getRecentFiles as dbGetRecentFiles } from '@/lib/workspace-db';

interface WorkspaceContextType {
  files: WorkspaceFile[];
  saveFile: (fileBlob: Blob, meta: { name: string; type: string; tool: string }) => Promise<void>;
  refreshFiles: () => Promise<void>;
  isLoading: boolean;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
}

interface WorkspaceProviderProps {
  children: ReactNode;
}

export function WorkspaceProvider({ children }: WorkspaceProviderProps) {
  const [files, setFiles] = useState<WorkspaceFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshFiles = async () => {
    try {
      const recent = await dbGetRecentFiles();
      setFiles(recent);
    } catch (error) {
      console.error('Failed to load recent files:', error);
    }
  };

  const saveFile = async (fileBlob: Blob, meta: { name: string; type: string; tool: string }) => {
    try {
      await dbAddFile(fileBlob, meta);
      // Refresh the list after adding
      await refreshFiles();
    } catch (error) {
      console.error('Failed to save file to workspace:', error);
      throw error;
    }
  };

  // Initial load
  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      await refreshFiles();
      setIsLoading(false);
    };
    load();
  }, []);

  const value: WorkspaceContextType = {
    files,
    saveFile,
    refreshFiles,
    isLoading,
  };

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}