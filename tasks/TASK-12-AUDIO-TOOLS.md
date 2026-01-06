# TASK-12: Audio Manager Pack (Mute & Boost)

**Durum:** 🟡 Aktif
**Öncelik:** 🔊 Dördüncü Büyük Araç

## 🎯 HEDEF
Siteye "Remove Audio" (Sesi Sil) ve "Volume Booster" (Sesi Yükselt) araçlarını eklemek.

## 📋 ALT GÖREVLER
- [x] **A.1 Dokümantasyon**
  - `tasks/TASK-11-TRIMMER.md` dosyasını arşive kaldır.
  - `DURUM.md` dosyasını güncelle (Aktif Task: TASK-12).
  - `tasks/TASK-12-AUDIO-TOOLS.md` dosyasını oluştur.

- [ ] **A.2 Audio Manager Mantığı (Hook)**
  - `hooks/use-audio-manager.ts` hook'unu oluştur.
  - **Mute (Remove Audio):** `-i input.mp4 -c copy -an output.mp4` (stream copy, saniyesinde biter).
  - **Boost (Volume Up):** `-i input.mp4 -filter:a "volume=2.0" -c:v copy output.mp4` (video kopyalanır, sadece ses işlenir).

- [ ] **A.3 UI Bileşenleri**
  - `components/features/audio-remover.tsx` oluştur: Basit dropzone + "Remove Audio" butonu.
  - `components/features/volume-booster.tsx` oluştur: Dropzone + Ses seviyesi seçimi (Slider veya Select: %150, %200, %50 gibi).

- [ ] **A.4 Sayfalar ve Routing**
  - `src/app/remove-audio/page.tsx` oluştur: "Remove Audio from Video - Online & Free" başlığı.
  - `src/app/increase-volume/page.tsx` oluştur: "Increase Video Volume - Online Booster" başlığı.

- [ ] **A.5 Global Entegrasyon**
  - **Navbar:** "Audio Tools" dropdown menü VEYA "More Tools" altına bu linkleri ekle.
  - **Ana Sayfa Grid:** Bu iki yeni aracı ana sayfadaki kartlara ekle.
  - **Footer:** Quick Links kısmına "Remove Audio" ve "Volume Booster" linklerini ekle.

## ✅ TAMAMLANMA KRİTERLERİ
- [ ] TASK‑11 dokümantasyonu arşive taşındı, DURUM.md güncellendi, TASK‑12 dosyası oluşturuldu.
- [ ] `use-audio-manager.ts` hook'u oluşturuldu, mute ve boost fonksiyonları FFmpeg komutlarıyla çalışıyor.
- [ ] `audio-remover.tsx` bileşeni oluşturuldu, dropzone ve remove audio butonu çalışıyor.
- [ ] `volume-booster.tsx` bileşeni oluşturuldu, ses seviyesi seçimi ve boost butonu çalışıyor.
- [ ] `/remove-audio` sayfası oluşturuldu, metadata doğru şekilde ayarlandı.
- [ ] `/increase-volume` sayfası oluşturuldu, metadata doğru şekilde ayarlandı.
- [ ] Navbar, ana sayfa grid ve footer'da audio araçları linkleri eklendi.
- [ ] `npm run dev` ile proje başlatılıp, ses kaldırma ve ses yükseltme işlemleri test edilebiliyor.

## 📂 İLGİLİ DOSYALAR
- `tasks/TASK-11-TRIMMER.md` (arşiv)
- `DURUM.md`
- `tasks/TASK-12-AUDIO-TOOLS.md`
- `hooks/use-audio-manager.ts`
- `components/features/audio-remover.tsx`
- `components/features/volume-booster.tsx`
- `src/app/remove-audio/page.tsx`
- `src/app/increase-volume/page.tsx`
- `src/components/layout/navbar.tsx`
- `src/app/page.tsx`
- `src/components/layout/footer.tsx`