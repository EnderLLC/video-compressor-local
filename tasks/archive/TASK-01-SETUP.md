# TASK-01: Proje Kurulumu ve FFmpeg Entegrasyonu
**Durum:** 🟡 Aktif
**Öncelik:** 🔥 Kritik

## 🎯 HEDEF
Next.js projesini temizlemek, Shadcn UI kurulumunu yapmak ve FFmpeg motorunu hazırlamak.

## 📋 ALT GÖREVLER
- [x] **A.1 Temizlik ve UI Kurulumu**
  - Shadcn UI init (`npx shadcn@latest init` - Default style, Slate color).
  - Button, Card, Progress, Slider bileşenlerini ekle.
  - `page.tsx` içini temizle.

- [x] **A.2 FFmpeg Yapılandırması**
  - `@ffmpeg/ffmpeg` ve `@ffmpeg/util` paketlerini kur.
  - `next.config.ts` (veya js) içine şu headerları ekle:
    `Cross-Origin-Opener-Policy: same-origin`
    `Cross-Origin-Embedder-Policy: require-corp`