# TASK-31: Reverse Video Tool

**Durum:** 🟢 Aktif
**Öncelik:** 🎬 Video Editing Tools

## 🎯 HEDEF
Videoyu (hem görüntü hem ses) tersten oynatacak şekilde yeniden işlemek.

## 📋 ALT GÖREVLER
- [x] **ADIM 1: Dokümantasyon**
  - [x] `docs/project-status.md` dosyasını güncelle (Aktif Task: TASK-31).
  - [x] `docs/current-task.md` dosyasını arşivle (`docs/archive/TASK-30-ADD-AUDIO.md`).
  - [x] `docs/current-task.md` dosyasını temizle ve TASK-31 için hazırla.
- [ ] **ADIM 2: Reverse Logic (Hook)**
  - [ ] `src/hooks/use-video-reverser.ts` oluştur.
  - **FFmpeg Mantığı:**
    - Görüntü ve sesi tersine çevir.
    - Komut: `-i input.mp4 -vf reverse -af areverse output.mp4`
    - **Bellek Uyarısı:** Reverse işlemi tüm videoyu RAM'e tamponlar. Eğer dosya çok büyükse tarayıcı çökebilir. Hook içinde dosya boyutu kontrolü (örn: >100MB ise uyarı) veya `try-catch` ile kullanıcıya "Dosya çok büyük" hatası döndürme mantığı ekle.
- [ ] **ADIM 3: UI Bileşeni**
  - [ ] `src/components/features/video-reverser.tsx` oluştur.
  - **Tasarım:**
    - Basit bir Dropzone.
    - "Mute Audio" seçeneği (Tersine çevrilmiş sesler genelde korkutucu olur, kullanıcı kapatmak isteyebilir).
    - Eğer kullanıcı Mute seçerse komuttan `-af areverse` kısmını çıkar ve `-an` (audio none) ekle.
    - Uyarı Notu: "Processing requires loading the entire video into memory. Short videos work best."
- [ ] **ADIM 4: Sayfa ve Entegrasyon**
  - [ ] `src/app/reverse-video/page.tsx` oluştur.
  - **Metadata:** Title: "Reverse Video Online - Rewind MP4 Effects".
  - **Global:** Navbar, Footer ve Ana Sayfa Grid'ine "Reverse Video" linklerini ekle.
  - **Standartlar:** Reklam (`AD_SLOTS.tool`) ve Workspace (`saveFile`) entegrasyonu.
- [ ] **ADIM 5: Test**
  - [ ] `npm run dev` ile test et.
  - [ ] Kısa bir video (5-10 sn) yükle ve tersine çevir.
  - [ ] Sonuçta hareketlerin geri geri gittiğini doğrula.

## ✅ TAMAMLANMA KRİTERLERİ
- [ ] `use-video-reverser.ts` hook'u oluşturuldu ve FFmpeg ile çalışıyor.
- [ ] `video-reverser.tsx` bileşeni oluşturuldu, mute audio seçeneği çalışıyor.
- [ ] `reverse-video/page.tsx` sayfası oluşturuldu, metadata ve ads entegrasyonu tamam.
- [ ] Navbar ve Footer'da "Reverse Video" linki eklendi.
- [ ] Test sonucu: Video başarıyla tersine çevrildi, indirilebiliyor.

## 📂 İLGİLİ DOSYALAR
- `src/hooks/use-video-reverser.ts`
- `src/components/features/video-reverser.tsx`
- `src/app/reverse-video/page.tsx`
- `src/config/ads.ts`
- `src/components/layout/navbar.tsx`
- `src/components/layout/footer.tsx`
- `src/context/workspace-context.tsx`