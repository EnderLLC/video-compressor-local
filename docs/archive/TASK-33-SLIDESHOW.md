# TASK-33: Images to Video (Slideshow Maker)

**Durum:** 🟢 Aktif
**Öncelik:** 🎬 Video Editing Tools

## 🎯 HEDEF
Kullanıcının birden fazla resim yükleyip, bunları videoya dönüştürmesini sağlamak.

## 📋 ALT GÖREVLER
- [x] **ADIM 1: Dokümantasyon**
  - [x] `docs/project-status.md` dosyasını güncelle (Aktif Task: TASK-33).
  - [x] `docs/current-task.md` dosyasını arşivle (`docs/archive/TASK-32-LOOP.md`).
  - [x] `docs/current-task.md` dosyasını temizle ve TASK-33 için hazırla.
- [ ] **ADIM 2: KRİTİK BAKIM - Ana Sayfa Grid Refactor**
  - [ ] `src/app/page.tsx` dosyasını aç.
  - [ ] Şu anki hardcoded veya karışık grid yapısını temizle.
  - [ ] **Data-Driven Yapı:** Sayfanın üst kısmında `TOOLS` adında bir array oluştur. Tüm araçların (Compress, Convert, Trim, Audio, Crop, Rotate, GIF, Speed, Recorder, Merger, Add Audio, Reverse, Loop, ve şimdi ekleyeceğimiz Slideshow) verilerini (title, description, icon, href, color) burada tanımla.
  - [ ] Grid içinde bu array'i `map` ile dön.
  - [ ] **Eksikleri Ekle:** Reverse ve Loop araçlarının kartlarının göründüğünden emin ol.
- [ ] **ADIM 3: Slideshow Logic (Hook)**
  - [ ] `src/hooks/use-slideshow.ts` oluştur.
  - **Girdi:** `File[]` (Resimler).
  - **Parametre:** `durationPerSlide` (Saniye, örn: 2, 3, 5).
  - **FFmpeg Mantığı:**
    - Resimleri belirli bir kare hızında (framerate) okuyarak videoya çevir.
    - Komut (Basitleştirilmiş): `-framerate 1/{duration} -i image%d.jpg -c:v libx264 -r 30 -pix_fmt yuv420p output.mp4`
    - *Not:* FFmpeg.wasm dosya sistemine resimleri `img001.jpg`, `img002.jpg` gibi sıralı yazman gerekecek. Hook içinde önce dosyaları sanal dosya sistemine yaz, sonra komutu çalıştır.
- [ ] **ADIM 4: UI Bileşeni**
  - [ ] `src/components/features/slideshow-maker.tsx` oluştur.
  - **Tasarım:**
    - Multi-file Dropzone (Sadece resim).
    - Resim Sıralama Listesi (Video Merger'daki gibi yukarı/aşağı taşıma).
    - "Duration per Image" ayarı (Input veya Select).
    - "Create Video" butonu.
- [ ] **ADIM 5: Sayfa ve Entegrasyon**
  - [ ] `src/app/slideshow/page.tsx` oluştur.
  - **Metadata:** Title: "Images to Video Online - Create Slideshow from Photos".
  - **Global:** Navbar ve Footer'a "Slideshow" linkini ekle.
  - **Grid:** `src/app/page.tsx` içindeki yeni `TOOLS` array'ine Slideshow aracını ekle.
- [ ] **Bitiş:**
  - [ ] `npm run dev` ile test et.
  - [ ] Ana sayfada TÜM araçların (Reverse, Loop, Slideshow dahil) düzgün sıralandığını gör.
  - [ ] 3 resim yükle, videoya çevir ve oynat.

## ✅ TAMAMLANMA KRİTERLERİ
- [ ] `use-slideshow.ts` hook'u oluşturuldu ve FFmpeg ile çalışıyor.
- [ ] `slideshow-maker.tsx` bileşeni oluşturuldu, image ordering ve duration seçimi çalışıyor.
- [ ] `slideshow/page.tsx` sayfası oluşturuldu, metadata ve ads entegrasyonu tamam.
- [ ] Navbar, Footer ve Ana Sayfa Grid'inde "Slideshow" linki eklendi.
- [ ] Test sonucu: Başarıyla slideshow video oluşturuldu, süre doğru, kalite kaybı yok.

## 📂 İLGİLİ DOSYALAR
- `src/hooks/use-slideshow.ts`
- `src/components/features/slideshow-maker.tsx`
- `src/app/slideshow/page.tsx`
- `src/config/ads.ts`
- `src/components/layout/navbar.tsx`
- `src/components/layout/footer.tsx`
- `src/context/workspace-context.tsx`