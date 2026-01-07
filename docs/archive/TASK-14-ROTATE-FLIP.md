# TASK-14: Rotate & Flip Tools

**Durum:** 🟡 Aktif
**Öncelik:** 🎬 Altıncı Büyük Araç

## 🎯 HEDEF
Kullanıcının yan dönmüş videolarını düzeltmesi (Rotate) veya ayna efekti vermesi (Flip).

## 📋 ALT GÖREVLER
- [x] **A.1 Dokümantasyon**
  - `tasks/TASK-13-CROPPER.md` dosyasını arşive kaldır.
  - `DURUM.md` dosyasını güncelle (Aktif Task: TASK-14).
  - `tasks/TASK-14-ROTATE-FLIP.md` dosyasını oluştur.

- [ ] **A.2 Rotator Mantığı (Hook)**
  - `hooks/use-video-rotator.ts` hook'unu oluştur.
  - **FFmpeg Komutu:** `-i input.mp4 -vf "transpose=1" -c:a copy output.mp4` (90° saat yönü)
    - **Not:** Rotate işlemi re-encode gerektirir. `transpose` filtreleri:
      - 90° Saat Yönü: `transpose=1`
      - 90° Saat Tersi: `transpose=2`
      - 180°: `transpose=1,transpose=1`
      - Yatay Flip (Mirror): `hflip`
      - Dikey Flip: `vflip`

- [ ] **A.3 UI Bileşeni**
  - `components/features/video-rotator.tsx` oluştur.
  - **Yapı:**
    1. Dosya yükleme (Dropzone).
    2. Video yüklendikten sonra altta buton grubu:
        - [Geri Dönüş İkonu] Rotate Left
        - [İleri Dönüş İkonu] Rotate Right
        - [Yatay Oklar] Flip Horizontal
        - [Dikey Oklar] Flip Vertical
    3. Kullanıcı butona bastığında seçimi state'te tut (Örn: `rotation: 90`).
    4. "Process Video" butonuyla işlemi başlat.

- [ ] **A.4 Sayfa ve Entegrasyon**
  - `src/app/rotate-video/page.tsx` oluştur.
  - **Metadata:** Title: "Rotate & Flip Video Online - Fix Sideways Videos Free".
  - **Global:** Navbar, Ana Sayfa Grid ve Footer'a "Rotate & Flip" linklerini ekle.

## ✅ TAMAMLANMA KRİTERLERİ
- [ ] TASK‑13 dokümantasyonu arşive taşındı, DURUM.md güncellendi, TASK‑14 dosyası oluşturuldu.
- [ ] `use-video-rotator.ts` hook'u oluşturuldu, rotate/flip fonksiyonları FFmpeg komutuyla çalışıyor.
- [ ] `video-rotator.tsx` bileşeni oluşturuldu, butonlar çalışıyor, state doğru şekilde güncelleniyor.
- [ ] `/rotate-video` sayfası oluşturuldu, metadata doğru şekilde ayarlandı.
- [ ] Navbar, ana sayfa grid ve footer'da rotate & flip linki eklendi.
- [ ] `npm run dev` ile proje başlatılıp, video yükleme, rotate/flip işlemleri test edilebiliyor.

## 📂 İLGİLİ DOSYALAR
- `tasks/TASK-13-CROPPER.md` (arşiv)
- `DURUM.md`
- `tasks/TASK-14-ROTATE-FLIP.md`
- `hooks/use-video-rotator.ts`
- `components/features/video-rotator.tsx`
- `src/app/rotate-video/page.tsx`
- `src/components/layout/navbar.tsx`
- `src/app/page.tsx`
- `src/components/layout/footer.tsx`