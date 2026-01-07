# Guide: Adding a New Video Tool

This guide walks through the process of adding a new video‑processing tool to the Local Media Tools project. The steps follow the established architecture and ensure consistency with existing tools.

## Prerequisites

- Familiarity with React hooks and FFmpeg.wasm.
- The new tool must be feasible with client‑side FFmpeg.wasm (no server‑side dependencies).

## Step 1 – Create a Custom Hook

Create a new file in `src/hooks/use‑<tool‑name>.ts`. Use an existing hook (e.g., `use‑video‑trimmer.ts`) as a template.

### Hook Responsibilities
- Manage FFmpeg.wasm loading (reuse the shared FFmpeg instance).
- Expose processing state: `progress`, `status`, `error`, `result`.
- Implement the core FFmpeg command chain for the new operation.
- Optionally integrate with the workspace (save processed files).

### Example Skeleton

```typescript
import { useState, useCallback } from 'react';
import { ffmpeg } from '@/lib/ffmpeg'; // hypothetical shared instance
import { useWorkspace } from '@/context/workspace-context';

export function useNewTool() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'idle' | 'processing' | 'done' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Blob | null>(null);
  const { saveFile } = useWorkspace();

  const process = useCallback(async (inputFile: File, options: any) => {
    setStatus('processing');
    setProgress(0);
    try {
      // Load FFmpeg if needed
      if (!ffmpeg.isLoaded()) {
        await ffmpeg.load();
      }

      // Write input file to FFmpeg virtual filesystem
      ffmpeg.writeFile('input', await inputFile.arrayBuffer());

      // Run FFmpeg commands
      await ffmpeg.exec([
        '-i', 'input',
        // ... tool‑specific arguments
        'output'
      ]);

      // Read output
      const data = ffmpeg.readFile('output');
      const blob = new Blob([data], { type: 'video/mp4' });

      setResult(blob);
      setStatus('done');
      setProgress(100);

      // Optionally save to workspace
      await saveFile(blob, {
        name: `processed_${inputFile.name}`,
        type: 'video/mp4',
        tool: 'new‑tool',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setStatus('error');
    }
  }, [saveFile]);

  const reset = useCallback(() => {
    setProgress(0);
    setStatus('idle');
    setError(null);
    setResult(null);
  }, []);

  return {
    progress,
    status,
    error,
    result,
    process,
    reset,
  };
}
```

## Step 2 – Create the UI Component

Create `src/components/features/<tool‑name>.tsx`. Use an existing component (e.g., `video‑trimmer.tsx`) as a starting point.

### Component Structure
- Import the custom hook.
- Provide a `Dropzone` for file input.
- Add tool‑specific controls (sliders, checkboxes, etc.).
- Display progress, errors, and a download button for the result.
- Follow the same styling pattern (Shadcn/ui components, Tailwind utilities).

### Example Outline

```tsx
'use client';

import { useState } from 'react';
import Dropzone from '@/components/ui/dropzone';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNewTool } from '@/hooks/use‑new‑tool';

export default function NewToolComponent() {
  const [file, setFile] = useState<File | null>(null);
  const { progress, status, error, result, process, reset } = useNewTool();

  const handleProcess = async () => {
    if (!file) return;
    await process(file, { /* options */ });
  };

  return (
    <div className="max-w‑4xl mx‑auto">
      <h1 className="text‑3xl font‑bold mb‑6">New Tool</h1>
      <Dropzone onFileSelect={setFile} accept="video/*" />
      {/* Tool‑specific controls here */}
      <Button onClick={handleProcess} disabled={!file || status === 'processing'}>
        {status === 'processing' ? 'Processing…' : 'Start'}
      </Button>
      {status === 'processing' && <Progress value={progress} className="mt‑4" />}
      {error && <div className="text‑red‑600 mt‑4">{error}</div>}
      {result && (
        <div className="mt‑6">
          <a
            href={URL.createObjectURL(result)}
            download="result.mp4"
            className="inline‑block bg‑green‑600 text‑white px‑4 py‑2 rounded"
          >
            Download Result
          </a>
        </div>
      )}
    </div>
  );
}
```

## Step 3 – Create a Page

Create a new route under `src/app/<tool‑name>/page.tsx`. Follow the pattern of existing tool pages.

### Page Responsibilities
- Set page‑specific SEO metadata (title, description).
- Import and render the feature component.
- Optionally add ad units, FAQ section, or related‑tools links.

### Example

```tsx
import type { Metadata } from 'next';
import NewToolComponent from '@/components/features/new‑tool';

export const metadata: Metadata = {
  title: 'New Tool – Local Media Tools',
  description: 'Description of what the tool does.',
};

export default function NewToolPage() {
  return (
    <div className="container mx‑auto px‑4 py‑8">
      <NewToolComponent />
      {/* Optional: AdUnit, FAQ, etc. */}
    </div>
  );
}
```

## Step 4 – Update Navigation & Configuration

### 4.1 Add to Navigation Bar
Edit `src/components/layout/navbar.tsx` and add a new entry in the `toolLinks` array.

```tsx
const toolLinks = [
  // ... existing links
  { href: '/new‑tool', label: 'New Tool' },
];
```

### 4.2 Add to Popular Conversions
Update `src/config/conversions.ts` if the tool should appear in the “Popular Conversions” section.

### 4.3 (Optional) Add to Sitemap
The sitemap (`src/app/sitemap.ts`) automatically includes all app‑router pages. No manual change needed.

### 4.4 (Optional) Add to Workspace Tool List
If the tool should save files to the workspace, ensure the `tool` string used in the hook matches the tool identifier expected by the workspace database.

## Step 5 – Test

1. Run the development server (`npm run dev`).
2. Navigate to `http://localhost:3002/new‑tool`.
3. Upload a test video and verify the processing works.
4. Check that the result can be downloaded and (if implemented) appears in the Recent Files drawer.
5. Verify there are no TypeScript errors (`npm run lint`).

## Best Practices

- **Reuse FFmpeg loading**: Do not load FFmpeg multiple times; use a shared instance.
- **Error handling**: Always catch FFmpeg errors and display user‑friendly messages.
- **Accessibility**: Ensure UI controls are keyboard‑navigable and screen‑reader friendly.
- **Mobile responsiveness**: Test the tool on different screen sizes.
- **Performance**: Consider large file sizes; provide progress feedback and allow cancellation.

## Example Implementations

- **Video Trimmer**: `src/hooks/use‑video‑trimmer.ts`, `src/components/features/video‑trimmer.tsx`
- **GIF Maker**: `src/hooks/use‑gif‑converter.ts`, `src/components/features/gif‑maker.tsx`
- **Audio Remover**: `src/hooks/use‑audio‑manager.ts`, `src/components/features/audio‑remover.tsx`

These files serve as practical references for the hook‑component‑page pattern.

---

*This guide is part of the project’s Developer Wiki. For an architectural overview, see [tech‑stack.md](../architecture/tech-stack.md).*