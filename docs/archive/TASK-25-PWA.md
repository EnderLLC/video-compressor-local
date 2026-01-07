# TASK-25: PWA Module (Manifest & Installability)

**Durum:** 🟢 Aktif
**Öncelik:** 📱 Mobile & Desktop Installability

## 🎯 HEDEF
Sitenin mobil cihazlarda ve masaüstünde "Uygulama Olarak Yükle" (Add to Home Screen) özelliğini aktif etmek. Progressive Web App (PWA) altyapısını Next.js Metadata API ile kurmak, manifest ve service worker ile kullanıcıların uygulamayı ana ekrana ekleyebilmesini sağlamak.

## 📋 ALT GÖREVLER
- [x] **A.1 Dokümantasyon**
  - `tasks/TASK-24-WORKSPACE.md` dosyasını arşive kaldır.
  - `DURUM.md` dosyasını güncelle (Aktif Task: TASK-25).
  - `tasks/TASK-25-PWA.md` dosyasını oluştur.

- [ ] **A.2 Manifest Dosyası (Next.js Native Way)**
  - `src/app/manifest.ts` dosyasını oluştur.
  - Next.js Metadata API kullanarak şu konfigürasyonu döndür:
    - **Name:** Local Media Tools
    - **Short Name:** LMT
    - **Description:** Free online video tools: Compress, Convert, Trim, Crop & GIF.
    - **Start URL:** /
    - **Display:** standalone (Bu çok önemli, tarayıcı barını gizler).
    - **Background Color:** #ffffff
    - **Theme Color:** #000000
    - **Icons:**
      - `/icons/icon-192.png` (192x192)
      - `/icons/icon-512.png` (512x512)

- [ ] **A.3 Meta Etiketler (iOS Support)**
  - `src/app/layout.tsx` dosyasını aç.
  - `metadata` objesine şunları ekle (veya varsa güncelle):
    - `appleWebApp`: { capable: true, title: "LMT", statusBarStyle: "black-translucent" }
    - `formatDetection`: { telephone: false }

- [ ] **A.4 İkon Hazırlığı (Placeholder)**
  - `public/icons` klasörünü oluştur.
  - **MANUEL ADIM:** Kullanıcı **favicon.io** veya benzeri bir yerden 192x192 ve 512x512 boyutunda iki adet PNG oluşturup bu klasöre atmalı (`icon-192.png`, `icon-512.png`).

- [ ] **A.5 Test ve Doğrulama**
  - `npm run dev` ile test et.
  - Tarayıcıda `http://localhost:3002/manifest.webmanifest` adresine girince JSON çıktısı görüyor musun?
  - Eğer görüyorsan altyapı tamamdır.

## ✅ TAMAMLANMA KRİTERLERİ
- [ ] TASK‑24 dokümantasyonu arşive taşındı, DURUM.md güncellendi, TASK‑25 dosyası oluşturuldu.
- [ ] `src/app/manifest.ts` dosyası oluşturuldu ve Next.js Metadata API ile doğru konfigürasyon döndürüyor.
- [ ] `src/app/layout.tsx`'de iOS için gerekli meta etiketler (`appleWebApp`, `formatDetection`) eklendi.
- [ ] `public/icons` klasörü oluşturuldu ve kullanıcıya manuel ikon yüklemesi için not bırakıldı.
- [ ] Test sonucu: `http://localhost:3002/manifest.webmanifest` adresinden JSON manifest çıktısı alınabiliyor.
- [ ] Tarayıcıda "Add to Home Screen" prompt'u görüntülenebiliyor (simülasyon).

## 📂 İLGİLİ DOSYALAR
- `tasks/TASK-24-WORKSPACE.md` (arşiv)
- `DURUM.md`
- `tasks/TASK-25-PWA.md`
- `src/app/manifest.ts`
- `src/app/layout.tsx`
- `public/icons/` (klasör)
- `public/icons/icon-192.png` (manuel)
- `public/icons/icon-512.png` (manuel)
- `next.config.ts`
- `package.json`