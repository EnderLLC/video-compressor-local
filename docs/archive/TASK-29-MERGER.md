# TASK-29: Video Merger (Joiner)

**Durum:** 🟢 Aktif
**Öncelik:** 🎬 Video Editing Tools

## 🎯 HEDEF
Kullanıcının birden fazla videoyu yükleyip, sıralayıp, tek bir dosya olarak birleştirmesini sağlamak.

## 📋 ALT GÖREVLER
- [ ] **A.1 Dokümantasyon Güncellemesi**
  - `docs/project-status.md` dosyasını güncelle (Aktif Task: TASK-29).
  - `docs/current-task.md` içeriğini `docs/archive/TASK-28-RECORDER.md` dosyasına taşıyarak arşivle.
  - `docs/current-task.md` dosyasını temizle ve TASK-29 için hazırla.
- [ ] **A.2 Merger Logic (Hook)**
  - `src/hooks/use-video-merger.ts` oluştur.
  - Girdi: `File[]` (Birden çok dosya).
  - FFmpeg Mantığı (Complex Filter): Tüm videoları 1280x720 (720p) boyutuna resize et ve birleştir.
  - Çıktı: Birleştirilmiş video dosyası.
- [ ] **A.3 UI Bileşeni**
  - `src/components/features/video-merger.tsx` oluştur.
  - Özellikler:
    - Multi-file Dropzone: Birden fazla dosya seçimine izin ver.
    - Sıralama (Reorder): Yüklenen videolar liste olarak görünsün. Yanlarında "Yukarı/Aşağı" okları olsun ki kullanıcı sırayı değiştirebilsin.
    - Merge Button: İşlemi başlatır.
- [ ] **A.4 Sayfa ve Entegrasyon**
  - `src/app/merge-video/page.tsx` oluştur.
  - Metadata: Title "Merge Videos Online - Join MP4 Files for Free".
  - Navbar, Footer ve Ana Sayfa Grid'ine "Merge Video" linklerini ekle.
  - Workspace: Birleştirilmiş dosyayı `saveFile` ile Workspace'e kaydet (Type: 'merged-video').
  - Ads: `tool` reklam slotunu ekle.
- [ ] **A.5 Test**
  - `npm run dev` ile test et.
  - 2 farklı video yükle.
  - Birleştir (Merge) de.
  - İnen videoda iki videonun arka arkaya oynadığını teyit et.

## ✅ TAMAMLANMA KRİTERLERİ
- [ ] `use-video-merger.ts` hook'u oluşturuldu ve FFmpeg ile çalışıyor.
- [ ] `video-merger.tsx` bileşeni oluşturuldu, dropzone ve sıralama doğru çalışıyor.
- [ ] `merge-video/page.tsx` sayfası oluşturuldu, metadata ve ads entegrasyonu tamam.
- [ ] Navbar ve Footer'da "Merge Video" linki eklendi.
- [ ] Test sonucu: İki video başarıyla birleştirildi, indirilebiliyor ve workspace'e kaydediliyor.

## 📂 İLGİLİ DOSYALAR
- `src/hooks/use-video-merger.ts`
- `src/components/features/video-merger.tsx`
- `src/app/merge-video/page.tsx`
- `src/config/ads.ts`
- `src/components/layout/navbar.tsx`
- `src/components/layout/footer.tsx`
- `src/context/workspace-context.tsx`