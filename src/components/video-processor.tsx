"use client";

import { useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";

export default function VideoProcessor() {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLog((prev) => [...prev, `${new Date().toISOString().slice(11, 19)}: ${msg}`]);
  };

  const loadFFmpeg = async () => {
    if (loaded || loading) return;
    setLoading(true);
    addLog("Starting FFmpeg load...");

    const ffmpeg = new FFmpeg();
    try {
      const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd";
      ffmpeg.on("log", ({ message }) => {
        addLog(`FFmpeg log: ${message}`);
      });

      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
      });

      setLoaded(true);
      addLog("FFmpeg loaded successfully!");
    } catch (error) {
      addLog(`Error loading FFmpeg: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-lg p-6 space-y-4">
      <h2 className="text-2xl font-bold">Video Processor Test</h2>
      <p className="text-gray-600">
        This component tests FFmpeg integration. Click the button to load FFmpeg (WASM) and see logs.
      </p>

      <div className="flex items-center gap-4">
        <button
          onClick={loadFFmpeg}
          disabled={loading || loaded}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Loading..." : loaded ? "Loaded" : "Load FFmpeg"}
        </button>
        {loaded && <span className="text-green-600 font-semibold">✓ FFmpeg ready</span>}
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Logs</h3>
        <div className="bg-black text-green-400 font-mono text-sm p-4 rounded max-h-60 overflow-y-auto">
          {log.length === 0 ? (
            <p className="text-gray-400">No logs yet. Click the button to start.</p>
          ) : (
            log.map((entry, idx) => (
              <div key={idx} className="border-b border-gray-800 py-1">
                {entry}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="text-sm text-gray-500">
        <p>
          This test uses @ffmpeg/ffmpeg and @ffmpeg/util packages. The core is loaded from unpkg.
          Ensure your browser supports WebAssembly and SharedArrayBuffer.
        </p>
      </div>
    </div>
  );
}