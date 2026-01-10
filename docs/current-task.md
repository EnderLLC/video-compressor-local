# TASK-37: Video Splitter (Story Cutter)

**Durum:** 🟢 Aktif
**Öncelik:** 🎬 Video Tools

## 🎯 HEDEF
Uzun bir videoyu otomatik olarak eşit parçalara bölmek (Örn: 15'er saniyelik Story parçaları).

## 📋 ALT GÖREVLER
- [ ] **ADIM 1: Dokümantasyon**
  - [ ] `docs/project-status.md` dosyasını güncelle (Aktif Task: TASK-37).
  - [ ] `docs/current-task.md` dosyasını arşivle (`docs/archive/TASK-36-THUMBNAIL.md`).
  - [ ] `docs/current-task.md` dosyasını temizle ve TASK-37 için hazırla.
- [ ] **ADIM 2: Splitter Logic (Hook)**
  - [ ] `src/hooks/use-video-splitter.ts` oluştur.
  - **Parametre:** `segmentTime` (saniye cinsinden, örn: 15, 30, 60).
  - **FFmpeg Mantığı:**
    - Komut: `-i input.mp4 -c copy -map 0 -segment_time {segmentTime} -f segment -reset_timestamps 1 output%03d.mp4`
    - *Açıklama:* `-c copy` (hızlı kesim), `-f segment` (bölme modu), `output%03d.mp4` (output001.mp4, output002.mp4 diye isimlendir).
    - **Kritik Nokta:** FFmpeg WASM çalıştığında birden fazla dosya üretecek. Komut bittikten sonra sanal dosya sistemini (`FS.readdir('.')`) tarayıp `output` ile başlayan dosyaları bulmalı ve bunları `Blob[]` listesi olarak döndürmelisin.
- [ ] **ADIM 3: UI Bileşeni**
  - [ ] `src/components/features/video-splitter.tsx` oluştur.
  - **Tasarım:**
    - Dropzone.
    - **Süre Seçimi:** Butonlar (Instagram Story - 15s, WhatsApp Status - 30s, Shorts/TikTok - 60s, Custom).
    - "Split Video" butonu.
    - **Sonuç Ekranı:** Oluşan parçaların listesi. Her parçanın yanında "Download Part 1", "Download Part 2" butonları.
    - (Opsiyonel ama iyi olur): "Download All (ZIP)" butonu şimdilik zor olabilir (JSZip gerekir), o yüzden "Hepsini Tek Tek İndir" listesi yeterli.
- [ ] **ADIM 4: Sayfa ve Entegrasyon**
  - [ ] `src/app/video-splitter/page.tsx` oluştur.
  - **Metadata:** Title: "Video Splitter Online - Cut Video into Parts for Stories".
  - **Global:** Navbar ve Footer'a "Video Splitter" linkini ekle.
  - **Grid:** `src/app/page.tsx` içindeki `TOOLS` array'ine "Video Splitter" ekle (Icon: `Scissors` veya `SquareSplitVertical`).
  - **Workspace:** Parçaları kaydetmek Workspace'i şişirebilir, şimdilik sadece UI'da gösterip indirtelim. (Veya sadece ilk parçayı kaydet).
- [ ] **ADIM 5: Test ve Doğrulama**
  - [ ] `npm run dev` ile test et.
  - [ ] 1 dakikalık bir video yükle, "30s" seç.
  - [ ] Çıktı olarak 2 tane dosya oluştuğunu ve indirilebildiğini doğrula.

## ✅ TAMAMLANMA KRİTERLERİ
- [ ] `use-video-splitter.ts` hook'u oluşturuldu ve FFmpeg ile çalışıyor.
- [ ] `video-splitter.tsx` bileşeni oluşturuldu, dropzone, süre seçimi ve split butonu doğru çalışıyor.
- [ ] `video-splitter/page.tsx` sayfası oluşturuldu, metadata ve ads entegrasyonu tamam.
- [ ] Navbar, Footer ve Ana Sayfa Grid'inde "Video Splitter" linki eklendi.
- [ ] Test sonucu: Video başarıyla parçalara ayrıldı, her parça indirilebildi.

## 📂 İLGİLİ DOSYALAR
- `src/hooks/use-video-splitter.ts`
- `src/components/features/video-splitter.tsx`
- `src/app/video-splitter/page.tsx`
- `src/config/ads.ts`
- `src/components/layout/navbar.tsx`
- `src/components/layout/footer.tsx`
- `src/context/workspace-context.tsx`