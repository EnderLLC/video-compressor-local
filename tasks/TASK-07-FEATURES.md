# TASK-07: Architecture Refactor & Video Converter Module

**Durum:** 🟡 Aktif
**Öncelik:** 🚀 Özellik Genişletme

## 🎯 HEDEF
Siteyi tek sayfalık uygulamadan çoklu araç (Multi‑tool) yapısına dönüştürmek. Mevcut sıkıştırma mantığını modülerleştirip yeni bir "Video Converter" özelliği eklemek, ana sayfayı araç hub'ı olarak yeniden tasarlamak.

## 📋 ALT GÖREVLER
- [x] **A.1 Dokümantasyon**
  - `tasks/TASK-06-MONETIZATION.md` dosyasını `tasks/archive/` klasörüne taşı.
  - `DURUM.md` dosyasını güncelle (Aktif Task: TASK-07).
  - `tasks/TASK-07-FEATURES.md` dosyasını oluştur.

- [ ] **A.2 Modülerleştirme (Refactoring)**
  - `components/features/video-compressor.tsx` oluştur: Mevcut sıkıştırma UI ve mantığını (Dropzone, Progress, Download) buraya taşı.
  - `src/app/compress-video/page.tsx` oluştur: Yukarıdaki bileşeni kullanarak sıkıştırma sayfası.
  - `useVideoProcessor` hook'unu farklı FFmpeg komutlarını destekleyecek şekilde gerekirse güncelle (veya olduğu gibi kullan).

- [ ] **A.3 Yeni Özellik – Video Converter**
  - `components/features/video-converter.tsx` oluştur:
    - **UI:** Compressor ile benzer olsun ama ek olarak bir **"Select Format"** (Combobox/Select) içersin.
    - **Seçenekler:** MP4, MOV, MKV, AVI, MP3 (Audio Extract), GIF.
    - **Mantık:** Seçilen formata göre FFmpeg komutunu değiştirsin.
      - MP4 için: `-c:v libx264 -c:a aac`
      - MP3 için: `-vn -acodec libmp3lame`
      - GIF için: `-vf "fps=10,scale=320:-1:flags=lanczos"`
  - `src/app/convert-video/page.tsx` oluştur: Bu bileşeni kullan.

- [ ] **A.4 Ana Sayfa (Hub) Tasarımı**
  - `src/app/page.tsx` dosyasını "Tools Hub" olacak şekilde yeniden tasarla.
  - **Hero:** "All‑in‑One Local Media Tools" başlığı.
  - **Grid:** Mevcut araçları kartlar halinde listele:
    1. **Video Compressor:** "Reduce file size securely." → Link: `/compress‑video`
    2. **Video Converter:** "Convert to MP4, GIF, MP3." → Link: `/convert‑video`
  - Kartlar şık, ikonlu ve tıklanabilir olsun (Tailwind UI tarzı).

- [ ] **A.5 Shared Layout (Navbar)**
  - Navbar'a (veya Header'a) "Tools" menüsü ekle, bu iki araca hızlı geçiş sağla.

- [ ] **A.6 Test ve Doğrulama**
  - `npm run dev` ile sunucuyu başlat (veya mevcut dev sunucusunu yeniden yükle).
  - Ana sayfadan araçlara gidilebildiğini kontrol et.
  - Converter'ın (örneğin MP4 → GIF) çalıştığını test et.

## ✅ TAMAMLANMA KRİTERLERİ
- [ ] TASK‑06 dosyası arşive taşındı, DURUM.md güncellendi, TASK‑07 dosyası oluşturuldu.
- [ ] Video sıkıştırma bileşeni ayrıldı ve `/compress‑video` sayfasında çalışıyor.
- [ ] Video converter bileşeni oluşturuldu ve `/convert‑video` sayfasında çalışıyor.
- [ ] Ana sayfa araç hub'ı olarak yeniden tasarlandı, kartlar doğru linklere yönlendiriyor.
- [ ] Navbar'da Tools menüsü eklenmiş ve çalışıyor.
- [ ] Tüm sayfalar hatasız çalışıyor, FFmpeg komutları doğru formata göre değişiyor.

## 📂 İLGİLİ DOSYALAR
- `components/features/video-compressor.tsx`
- `src/app/compress‑video/page.tsx`
- `components/features/video-converter.tsx`
- `src/app/convert‑video/page.tsx`
- `src/app/page.tsx`
- `src/app/layout.tsx` (navbar güncellemesi)
- `hooks/use‑video‑process.ts` (gerekirse)
- `package.json`
- `next.config.ts`