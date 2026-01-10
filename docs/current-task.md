# TASK-36: Video Thumbnail Generator (Frame Extractor)

**Durum:** 🟢 Aktif
**Öncelik:** 🎬 Video Tools

## 🎯 HEDEF
Videonun içinden seçilen belirli bir kareyi yüksek kalitede resim (JPG/PNG) olarak kaydetmek.

## 📋 ALT GÖREVLER
- [ ] **ADIM 1: Dokümantasyon**
  - [ ] `docs/project-status.md` dosyasını güncelle (Aktif Task: TASK-36).
  - [ ] `docs/current-task.md` dosyasını arşivle (`docs/archive/TASK-35-RESIZER.md`).
  - [ ] `docs/current-task.md` dosyasını temizle ve TASK-36 için hazırla.
- [ ] **ADIM 2: Thumbnail Logic (Hook)**
  - [ ] `src/hooks/use-thumbnail-generator.ts` oluştur.
  - **Fonksiyon:** `generateThumbnail(file, timestamp, format)`
  - **FFmpeg Mantığı:**
    - Parametre: `timestamp` (Saniye cinsinden, örn: 12.5).
    - Komut: `-ss {timestamp} -i input.mp4 -frames:v 1 -q:v 2 output.{format}`
    - *Not:* `-ss` parametresi inputtan ÖNCE gelmeli ki hızlı seek (arama) yapsın. `-q:v 2` en yüksek JPG kalitesidir.
- [ ] **ADIM 3: UI Bileşeni**
  - [ ] `src/components/features/thumbnail-generator.tsx` oluştur.
  - **Tasarım:**
    - **Video Player:** Yüklenen videoyu göster. Altında standart kontroller olsun.
    - **Slider (Scrubber):** Videonun içinde hassas gezinmek için bir Range Slider.
    - **Kontroller:**
      - "Current Time": Şu anki saniyeyi göster (Örn: 00:14.5).
      - "Format": JPG / PNG seçimi.
      - "Capture Frame" butonu.
    - **Sonuç:** Yakalanan kareyi ekranda göster ve "Download" butonu koy.
- [ ] **ADIM 4: Sayfa ve Entegrasyon**
  - [ ] `src/app/thumbnail-generator/page.tsx` oluştur.
  - **Metadata:** Title: "Video Thumbnail Generator - Extract Frames from Video".
  - **Global:** Navbar ve Footer'a "Thumbnail Generator" linkini ekle.
  - **Grid:** `src/app/page.tsx` içindeki `TOOLS` array'ine "Thumbnail Generator" ekle (Icon: `Image` veya `Camera`).
  - **Workspace:** Oluşan resmi `saveFile` ile kaydet (Type: 'image').
- [ ] **ADIM 5: Test**
  - [ ] `npm run dev` ile test et.
  - [ ] Bir video yükle.
  - [ ] 5. saniyeye gel.
  - [ ] "Capture" de.
  - [ ] İnen resmin, videodaki o an ile birebir aynı ve net olduğunu doğrula.

## ✅ TAMAMLANMA KRİTERLERİ
- [ ] `use-thumbnail-generator.ts` hook'u oluşturuldu ve FFmpeg ile çalışıyor.
- [ ] `thumbnail-generator.tsx` bileşeni oluşturuldu, video player, scrubber ve capture kontrolleri doğru çalışıyor.
- [ ] `thumbnail-generator/page.tsx` sayfası oluşturuldu, metadata ve ads entegrasyonu tamam.
- [ ] Navbar, Footer ve Ana Sayfa Grid'inde "Thumbnail Generator" linki eklendi.
- [ ] Test sonucu: Video karesi başarıyla yakalandı, yüksek kalitede resim olarak kaydedildi.

## 📂 İLGİLİ DOSYALAR
- `src/hooks/use-thumbnail-generator.ts`
- `src/components/features/thumbnail-generator.tsx`
- `src/app/thumbnail-generator/page.tsx`
- `src/config/ads.ts`
- `src/components/layout/navbar.tsx`
- `src/components/layout/footer.tsx`
- `src/context/workspace-context.tsx`