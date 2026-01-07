# Technology Stack

## Core Framework
- **Next.js 16** (App Router) – Server-side rendering, static generation, and API routes.
- **TypeScript** – Type-safe development.
- **Tailwind CSS** – Utility-first CSS framework with `@tailwindcss/postcss` v4.
- **Shadcn/ui** – Component library built on Radix UI, using `class-variance-authority`, `clsx`, `tailwind-merge`.

## Client‑Side Video Processing
- **FFmpeg.wasm** (`@ffmpeg/ffmpeg` + `@ffmpeg/util`) – WebAssembly port of FFmpeg for browser‑side video manipulation.
- **Cross‑Origin Headers** – `Cross‑Origin‑Opener‑Policy: same‑origin` and `Cross‑Origin‑Embedder‑Policy: require‑corp` configured in `next.config.ts` to enable FFmpeg.wasm threading.

## Local Storage & State
- **IndexedDB** (via `idb` library) – Persistent client‑side storage for workspace files, recent files, and job history.
- **React Context** – Global state management (e.g., `WorkspaceContext`).
- **React Hooks** – Custom hooks for each video‑processing tool (`use‑video‑compressor`, `use‑video‑trimmer`, etc.).

## Progressive Web App (PWA)
- **Web App Manifest** (`src/app/manifest.ts`) – Defines installability, theme colors, and display mode.
- **Service Worker** (optional) – Planned for offline caching.

## Development & Tooling
- **ESLint** – Code linting with Next.js configuration.
- **PostCSS** – CSS processing.
- **npm scripts**:
  - `npm run dev` – Starts development server on **port 3002**.
  - `npm run build` – Production build.
  - `npm start` – Production server.

## Project Structure (Simplified)

```
src/
├── app/                    # App Router pages
│   ├── page.tsx           # Homepage
│   ├── compress‑video/
│   ├── convert‑video/
│   ├── trim‑video/
│   ├── crop‑video/
│   ├── rotate‑video/
│   ├── video‑to‑gif/
│   ├── increase‑volume/
│   ├── remove‑audio/
│   ├── blog/
│   └── tools/[slug]/
├── components/
│   ├── features/          # Tool‑specific UI components
│   ├── layout/            # Navbar, Footer, RecentFilesDrawer
│   ├── ui/                # Reusable Shadcn‑based components
│   └── ads/               # Ad‑related components
├── hooks/                 # Custom React hooks for video processing
├── lib/                   # Utilities, blog helpers, IndexedDB wrapper
├── config/                # Static configuration (ads, blog posts, conversions)
└── context/               # React context providers
```

## Deployment
- **Vercel** – Primary deployment platform.
- **Static Export** – Possible via `next export` (client‑side only).

## Browser Support
- Modern browsers with WebAssembly and IndexedDB support (Chrome, Firefox, Edge, Safari).
- No server‑side processing; all operations run in the user’s browser.

---

*This document is part of the project’s Developer Wiki. See the [README.md](../../README.md) for an overview.*