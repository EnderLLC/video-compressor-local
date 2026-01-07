# Feature Overview

## Video Processing Tools

Each tool follows a consistent pattern:
- A **React hook** (`use‑*`) that encapsulates FFmpeg.wasm logic and state.
- A **UI component** (`src/components/features/*.tsx`) that provides the tool‑specific interface.
- A **dedicated page** (`src/app/*/page.tsx`) that wraps the component with layout and SEO.

| Tool | Hook | Component | Page | Description |
|------|------|-----------|------|-------------|
| Video Compressor | `use‑video‑process` | `video‑compressor.tsx` | `/compress‑video` | Reduces video file size by adjusting bitrate, resolution, and codec. |
| Video Converter | `use‑video‑converter` | `video‑converter.tsx` | `/convert‑video` | Converts between MP4, WebM, MOV, AVI, etc. |
| Video Trimmer | `use‑video‑trimmer` | `video‑trimmer.tsx` | `/trim‑video` | Cuts a segment from a video using start/end timestamps. |
| Video Cropper | `use‑video‑cropper` | `video‑cropper.tsx` | `/crop‑video` | Crops video dimensions interactively with `react‑easy‑crop`. |
| Video Rotator & Flip | `use‑video‑rotator` | `video‑rotator.tsx` | `/rotate‑video` | Rotates (90°, 180°, 270°) and flips (horizontal/vertical). |
| GIF Maker | `use‑gif‑converter` | `gif‑maker.tsx` | `/video‑to‑gif` | Converts a video (or segment) to an animated GIF. |
| Audio Remover | `use‑audio‑manager` | `audio‑remover.tsx` | `/remove‑audio` | Strips audio track from video (mute). |
| Volume Booster | `use‑audio‑manager` | `volume‑booster.tsx` | `/increase‑volume` | Amplifies audio volume by a configurable factor. |

## Common Infrastructure

### FFmpeg.wasm Integration
- All hooks load the same FFmpeg.wasm instance (`@ffmpeg/ffmpeg`).
- Cross‑origin headers are configured in `next.config.ts` to enable WebAssembly threading.
- Processing runs entirely in the browser; no server‑side processing.

### Dropzone & File Handling
- Shared `Dropzone` component (`src/components/ui/dropzone.tsx`) for consistent file upload.
- Supports drag‑and‑drop, click‑to‑select, and mobile file picker.
- Validates file type and size before processing.

### Progress & State Management
- Each hook exposes `progress` (0–100), `status` (`idle`/`processing`/`done`/`error`), and `result` (output blob).
- UI components display a progress bar (`src/components/ui/progress.tsx`) and status messages.

### Workspace (Recent Files)
- **IndexedDB** database (`lmt‑workspace`) stores up to 10 most recently processed files.
- **WorkspaceContext** (`src/context/workspace‑context.tsx`) provides global access to recent files.
- **RecentFilesDrawer** (`src/components/layout/recent‑files‑drawer.tsx`) displays a sidebar with thumbnails and download options.
- Automatic cleanup: when the 11th file is added, the oldest file is deleted.

**Key functions:**
- `addFile(blob, meta)` – saves a processed file with metadata (tool name, timestamp).
- `getRecentFiles()` – retrieves the 10 newest files.
- `deleteFile(id)` – removes a specific file.
- `clearWorkspace()` – empties the entire workspace (debugging).

### Content Scheduling Engine
- A lightweight scheduling system that rotates featured content (blog posts, tool highlights) based on time of day.
- Implemented in `src/config/blog‑posts.ts` and `src/lib/blog‑utils.ts`.
- Uses `getScheduledPosts()` to return a subset of posts that are “active” for the current hour.
- Ensures fresh content without manual intervention.

### SEO & Monetization
- **Dynamic meta tags** per page (title, description, Open Graph).
- **Automated sitemap** (`src/app/sitemap.ts`) with 151+ pages (tools, blog articles).
- **Ad placeholder components** (`AdUnit`, `AdPlaceholder`) ready for AdSense integration.
- **Affiliate links** placed strategically in tool descriptions.

## Development Features

### Blog System
- Static blog posts defined in `src/config/blog‑posts.ts`.
- Dynamic routing: `src/app/blog/[slug]/page.tsx` renders individual articles.
- SEO‑friendly URLs, reading‑time estimation, and category tags.

### Responsive Design
- Mobile‑first Tailwind CSS layouts.
- Shadcn/ui components (Accordion, Card, Button, Slider) ensure consistent styling.

### PWA Ready
- Web App Manifest (`src/app/manifest.ts`) defines installability.
- Service‑worker support can be added for offline caching.

---

*This document is part of the project’s Developer Wiki. See the [README.md](../../README.md) for an overview.*