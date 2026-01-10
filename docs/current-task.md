# TASK-38: Audio Merger (MP3 Joiner)

**Durum:** 🟢 Aktif
**Öncelik:** 🎵 Audio Tools

## 🎯 HEDEF
Birden fazla ses dosyasını (MP3, WAV, vb.) arka arkaya ekleyip tek bir dosya haline getirmek.

## 📋 ALT GÖREVLER
- [ ] **ADIM 1: Dokümantasyon**
  - [ ] `docs/project-status.md` dosyasını güncelle (Aktif Task: TASK-38).
  - [ ] `docs/current-task.md` dosyasını arşivle (`docs/archive/TASK-37-SPLITTER.md`).
  - [ ] `docs/current-task.md` dosyasını temizle ve TASK-38 için hazırla.
- [ ] **ADIM 2: Audio Merger Logic (Hook)**
  - [ ] `src/hooks/use-audio-merger.ts` oluştur.
  - **Girdi:** `File[]` (Ses dosyaları).
  - **FFmpeg Mantığı (Concat Filter):**
    - Dosyaları `input0.mp3`, `input1.mp3` diye sanal diske yaz.
    - Komut oluştur: `-i input0.mp3 -i input1.mp3 ...`
    - Filter Complex: `[0:a][1:a]...concat=n={sayı}:v=0:a=1[out]`
    - Map: `-map "[out]"`
    - *Not:* Video Merger'daki gibi "scale" (boyutlandırma) derdi olmadığı için bu işlem çok daha basittir. Sadece ses (audio) streamlerini birleştiriyoruz.
- [ ] **ADIM 3: UI Bileşeni**
  - [ ] `src/components/features/audio-merger.tsx` oluştur.
  - **Tasarım:**
    - `video-merger.tsx` bileşenini kopyalayıp uyarlayabilirsin.
    - **Dropzone:** Sadece ses dosyalarını kabul etsin (`audio/*`).
    - **Sıralama Listesi:** Kullanıcı Intro'yu başa, Outro'yu sona alabilmeli (Yukarı/Aşağı okları).
    - "Merge Audio" butonu.
- [ ] **ADIM 4: Sayfa ve Entegrasyon**
  - [ ] `src/app/audio-joiner/page.tsx` oluştur (URL: `audio-joiner` daha SEO dostudur).
  - **Metadata:** Title: "Audio Joiner Online - Merge MP3 Files for Free".
  - **Global:** Navbar ve Footer'a "Audio Joiner" linkini ekle.
  - **Grid:** `src/app/page.tsx` içindeki `TOOLS` array'ine "Audio Joiner" ekle (Icon: `Music` veya `ListMusic`).
- [ ] **ADIM 5: Test ve Doğrulama**
  - [ ] `npm run dev` ile test et.
  - [ ] 2 farklı MP3 yükle.
  - [ ] Birleştir ve inen dosyayı dinle (İkisi arka arkaya çalmalı).

## ✅ TAMAMLANMA KRİTERLERİ
- [ ] `use-audio-merger.ts` hook'u oluşturuldu ve FFmpeg ile çalışıyor.
- [ ] `audio-merger.tsx` bileşeni oluşturuldu, dropzone, sıralama ve merge butonu doğru çalışıyor.
- [ ] `audio-joiner/page.tsx` sayfası oluşturuldu, metadata ve ads entegrasyonu tamam.
- [ ] Navbar, Footer ve Ana Sayfa Grid'inde "Audio Joiner" linki eklendi.
- [ ] Test sonucu: Ses dosyaları başarıyla birleştirildi, birleşik dosya indirilebildi.

## 📂 İLGİLİ DOSYALAR
- `src/hooks/use-audio-merger.ts`
- `src/components/features/audio-merger.tsx`
- `src/app/audio-joiner/page.tsx`
- `src/config/ads.ts`
- `src/components/layout/navbar.tsx`
- `src/components/layout/footer.tsx`
- `src/context/workspace-context.tsx`