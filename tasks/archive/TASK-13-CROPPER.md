# TASK-13: Video Cropper (UI Intense)

**Durum:** 🟡 Aktif
**Öncelik:** 🎬 Beşinci Büyük Araç

## 🎯 HEDEF
Kullanıcının videonun belirli bir bölgesini (Örn: TikTok için 9:16 alan) seçip kırpmasını sağlamak.

## 📋 ALT GÖREVLER
- [x] **A.1 Dokümantasyon**
  - `tasks/TASK-12-AUDIO-TOOLS.md` dosyasını arşive kaldır.
  - `DURUM.md` dosyasını güncelle (Aktif Task: TASK-13).
  - `tasks/TASK-13-CROPPER.md` dosyasını oluştur.

- [ ] **A.2 Cropper Mantığı (Hook)**
  - `hooks/use-video-cropper.ts` hook'unu oluştur.
  - **FFmpeg Komutu:** `-i input.mp4 -filter:v "crop=w:h:x:y" -c:a copy output.mp4`
    - **Not:** Videoyu re-encode etmek zorundayız (filtre kullandığımız için), bu yüzden `-c copy` kullanamayız. Varsayılan olarak `libx264` (veya tarayıcı uyumlu bir codec) kullan. İşlem biraz uzun sürebilir, UI'da progress bar önemli.

- [ ] **A.3 UI Bileşeni (Zor Kısım)**
  - `components/features/video-cropper.tsx` oluştur.
  - **Yapı:**
    1. Dosya yükleme (Dropzone).
    2. Video yüklendikten sonra `react-easy-crop` bileşenini göster.
    3. Kullanıcıya hazır Aspect Ratio butonları sun: "Free", "16:9", "4:3", "1:1" (Instagram), "9:16" (TikTok/Shorts).
    4. "Crop Video" butonu.

- [ ] **A.4 Sayfa ve Entegrasyon**
  - `src/app/crop-video/page.tsx` oluştur.
  - **Metadata:** Title: "Crop Video Online - Resize for TikTok, Instagram & YouTube".
  - **Global:** Navbar, Ana Sayfa Grid ve Footer'a "Video Cropper" linklerini ekle.

## ✅ TAMAMLANMA KRİTERLERİ
- [ ] TASK‑12 dokümantasyonu arşive taşındı, DURUM.md güncellendi, TASK‑13 dosyası oluşturuldu.
- [ ] `use-video-cropper.ts` hook'u oluşturuldu, crop fonksiyonu FFmpeg komutuyla çalışıyor.
- [ ] `video-cropper.tsx` bileşeni oluşturuldu, react-easy-crop entegre edildi, aspect ratio seçenekleri çalışıyor.
- [ ] `/crop-video` sayfası oluşturuldu, metadata doğru şekilde ayarlandı.
- [ ] Navbar, ana sayfa grid ve footer'da video cropper linki eklendi.
- [ ] `npm run dev` ile proje başlatılıp, video yükleme, crop alanı seçme ve kırpma işlemi test edilebiliyor.

## 📂 İLGİLİ DOSYALAR
- `tasks/TASK-12-AUDIO-TOOLS.md` (arşiv)
- `DURUM.md`
- `tasks/TASK-13-CROPPER.md`
- `hooks/use-video-cropper.ts`
- `components/features/video-cropper.tsx`
- `src/app/crop-video/page.tsx`
- `src/components/layout/navbar.tsx`
- `src/app/page.tsx`
- `src/components/layout/footer.tsx`