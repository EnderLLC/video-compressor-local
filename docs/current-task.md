# TASK-32: Loop Video Tool (Repeater)

**Durum:** 🟢 Aktif
**Öncelik:** 🎬 Video Editing Tools

## 🎯 HEDEF
Kullanıcının yüklediği videoyu, seçilen sayı kadar arka arkaya ekleyip (Loop) uzatmak.

## 📋 ALT GÖREVLER
- [x] **ADIM 1: Dokümantasyon**
  - [x] `docs/project-status.md` dosyasını güncelle (Aktif Task: TASK-32).
  - [x] `docs/current-task.md` dosyasını arşivle (`docs/archive/TASK-31-REVERSE.md`).
  - [x] `docs/current-task.md` dosyasını temizle ve TASK-32 için hazırla.
- [ ] **ADIM 2: Loop Logic (Hook)**
  - [ ] `src/hooks/use-video-looper.ts` oluştur.
  - **FFmpeg Mantığı:**
    - Parametre: `loopCount` (Örn: 2, 3, 5, 10).
    - Komut: `-stream_loop {loopCount - 1} -i input.mp4 -c copy output.mp4`
    - *Not:* FFmpeg'de `stream_loop` kaç kere "ekleneceğini" belirtir. Yani videonun toplam 3 kere oynaması için loop değerinin 2 olması gerekir. (Logic: `param = userSelection - 1`).
    - `-c copy` kullandığımız için işlem çok hızlı olmalı.
- [ ] **ADIM 3: UI Bileşeni**
  - [ ] `src/components/features/video-looper.tsx` oluştur.
  - **Tasarım:**
    - Dropzone.
    - **Loop Ayarı:** "Repeat Times" -> [2x, 3x, 4x, 5x, 10x, Infinite(Gif? - Şimdilik sayısal kalsın)].
    - Bilgi Notu: "Uses stream copy for lightning-fast processing."
- [ ] **ADIM 4: Sayfa ve Entegrasyon**
  - [ ] `src/app/loop-video/page.tsx` oluştur.
  - **Metadata:** Title: "Loop Video Online - Repeat MP4 Automatically".
  - **Global:** Navbar, Footer ve Ana Sayfa Grid'ine "Loop Video" linklerini ekle. (Bir önceki taskta atlanan Grid eklemesini burada telafi etmeyi unutma).
  - **Reklam & Workspace:** Standart entegrasyon (`AD_SLOTS.tool`, `saveFile`).
- [ ] **ADIM 5: Test**
  - [ ] `npm run dev` ile test et.
  - [ ] 2 saniyelik bir video yükle, 5x seç.
  - [ ] Çıkan videonun 10 saniye olduğunu ve kalite kaybı olmadığını doğrula.

## ✅ TAMAMLANMA KRİTERLERİ
- [ ] `use-video-looper.ts` hook'u oluşturuldu ve FFmpeg ile çalışıyor.
- [ ] `video-looper.tsx` bileşeni oluşturuldu, loop count seçimi çalışıyor.
- [ ] `loop-video/page.tsx` sayfası oluşturuldu, metadata ve ads entegrasyonu tamam.
- [ ] Navbar, Footer ve Ana Sayfa Grid'inde "Loop Video" linki eklendi.
- [ ] Test sonucu: Video başarıyla loop'landı, süre doğru, kalite kaybı yok.

## 📂 İLGİLİ DOSYALAR
- `src/hooks/use-video-looper.ts`
- `src/components/features/video-looper.tsx`
- `src/app/loop-video/page.tsx`
- `src/config/ads.ts`
- `src/components/layout/navbar.tsx`
- `src/components/layout/footer.tsx`
- `src/context/workspace-context.tsx`