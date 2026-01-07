# TASK-27: Video Speed Controller

**Durum:** 🟢 Aktif
**Öncelik:** 🎬 Video Editing Tools

## 🎯 HEDEF
Kullanıcının videolarını hızlandırmasını (Time-lapse) veya yavaşlatmasını (Slow Motion) sağlamak.

## 📋 ALT GÖREVLER
- [ ] **A.1 Speed Logic (Hook)**
  - `src/hooks/use-video-speed.ts` oluştur.
  - FFmpeg mantığı: `setpts=${1/speed}*PTS` ve `atempo=${speed}` filtreleri.
  - Ses senkronu için atemo zincirleme (0.5-2.0 aralığı).
- [ ] **A.2 UI Bileşeni**
  - `src/components/features/video-speed-controller.tsx` oluştur.
  - Hız seçimi slider veya butonlar, "Mute Audio" checkbox.
- [ ] **A.3 Sayfa Entegrasyonu**
  - `src/app/video-speed/page.tsx` oluştur.
  - Metadata: Title "Change Video Speed Online - Slow Motion & Fast Forward".
  - Navbar ve Footer'a link ekle.
  - Ads config slot ID kullan.
- [ ] **A.4 Test**
  - `npm run dev` ile test et.
  - Bir videoyu 2x hızına alıp süresinin yarıya düştüğünü teyit et.

## ✅ TAMAMLANMA KRİTERLERİ
- [ ] `use-video-speed.ts` hook'u oluşturuldu ve FFmpeg filtreleri doğru çalışıyor.
- [ ] `video-speed-controller.tsx` bileşeni oluşturuldu, hız seçimi ve mute audio özelliği mevcut.
- [ ] `video-speed/page.tsx` sayfası oluşturuldu, metadata ve ads entegrasyonu tamam.
- [ ] Navbar ve Footer'da "Video Speed" linki eklendi.
- [ ] Test sonucu: Hız değişikliği başarıyla uygulanıyor, video süresi doğru şekilde değişiyor.

## 📂 İLGİLİ DOSYALAR
- `src/hooks/use-video-speed.ts`
- `src/components/features/video-speed-controller.tsx`
- `src/app/video-speed/page.tsx`
- `src/config/ads.ts`
- `src/components/layout/navbar.tsx`
- `src/components/layout/footer.tsx`