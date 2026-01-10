# TASK-39: Watermark (Logo Overlay)

**Durum:** 🟢 Aktif
**Öncelik:** 🛡️ Content Security & Branding

## 🎯 HEDEF
Videonun üzerine resim (Logo/PNG) eklemek ve konumlandırmak.

## 📋 ALT GÖREVLER
- [x] **ADIM 1: Dokümantasyon**
  - [x] `docs/project-status.md` dosyasını güncelle (Aktif Task: TASK-39).
  - [x] `docs/current-task.md` dosyasını arşivle (`docs/archive/TASK-38-AUDIO-MERGER.md`).
  - [x] `docs/current-task.md` dosyasını temizle ve TASK-39 için hazırla.
- [ ] **ADIM 2: Watermark Logic (Hook)**
  - [ ] `src/hooks/use-video-watermark.ts` oluştur.
  - **Girdi:** `videoFile`, `imageFile`.
  - **Parametreler:**
    - `position`: "top-left", "top-right", "bottom-left", "bottom-right", "center".
    - `size`: Yüzde cinsinden büyüklük (Örn: 0.15 = %15 video genişliği).
    - `padding`: Kenar boşluğu (piksel, varsayılan 20).
  - **FFmpeg Mantığı (Filter Complex):**
    - Adım 1 (Scale): Logoyu videonun genişliğine göre boyutlandır.
      `[1:v]scale=iw*{size}:-1[logo]` (Burada `iw` logoyu değil videoyu referans almalı ama FFmpeg'de `scale2ref` kullanmak daha güvenlidir).
      **Önerilen Komut (Scale2Ref):**
      `[1:v][0:v]scale2ref=w=oh*mdar:h=ih*{size}[logo][video];[video][logo]overlay={x}:{y}`
      *(Basitleştirme: Scale2Ref karışık olabilir. Alternatif olarak, logoyu sabit bir genişliğe (örn: 150px) scale edip koyabiliriz ama responsive olmaz. En iyisi `scale2ref` kullanmayı dene, olmazsa basit scale kullan).*
    - Adım 2 (Overlay Koordinatları):
      - TL: `x=padding:y=padding`
      - TR: `x=W-w-padding:y=padding`
      - BL: `x=padding:y=H-h-padding`
      - BR: `x=W-w-padding:y=H-h-padding`
      - Center: `x=(W-w)/2:y=(H-h)/2`
- [ ] **ADIM 3: UI Bileşeni**
  - [ ] `src/components/features/video-watermark.tsx` oluştur.
  - **Tasarım:**
    - **Dropzone 1:** Video Yükle.
    - **Dropzone 2:** Logo Yükle (PNG/JPG).
    - **Position Seçimi:** Görsel bir ızgara (Grid) şeklinde 5 nokta (Köşeler ve orta) seçtir.
    - **Size Slider:** "Logo Size" (%10 - %50 arası).
    - "Add Watermark" butonu.
- [ ] **ADIM 4: Sayfa ve Entegrasyon**
  - [ ] `src/app/add-watermark/page.tsx` oluştur.
  - **Metadata:** Title: "Add Logo to Video Online - Watermark Video Free".
  - **Global:** Navbar ve Footer'a "Add Watermark" linkini ekle.
  - **Grid:** `src/app/page.tsx` içindeki `TOOLS` array'ine "Add Watermark" ekle (Icon: `Stamp` veya `ShieldCheck`).
- [ ] **ADIM 5: Test ve Doğrulama**
  - [ ] `npm run dev` ile test et.
  - [ ] Bir video ve bir logo yükle.
  - [ ] "Bottom-Right" ve "%20" seç.
  - [ ] Logonun sağ altta düzgün durduğunu doğrula.

## ✅ TAMAMLANMA KRİTERLERİ
- [ ] `use-video-watermark.ts` hook'u oluşturuldu ve FFmpeg ile çalışıyor.
- [ ] `video-watermark.tsx` bileşeni oluşturuldu, dropzone'lar, position seçimi, size slider ve buton doğru çalışıyor.
- [ ] `add-watermark/page.tsx` sayfası oluşturuldu, metadata ve ads entegrasyonu tamam.
- [ ] Navbar, Footer ve Ana Sayfa Grid'inde "Add Watermark" linki eklendi.
- [ ] Test sonucu: Logo videonun belirtilen konumunda ve boyutunda görünüyor, işlenmiş video indirilebiliyor.

## 📂 İLGİLİ DOSYALAR
- `src/hooks/use-video-watermark.ts`
- `src/components/features/video-watermark.tsx`
- `src/app/add-watermark/page.tsx`
- `src/config/ads.ts`
- `src/components/layout/navbar.tsx`
- `src/components/layout/footer.tsx`
- `src/context/workspace-context.tsx`