# TASK-34: Audio Converter & Extractor

**Durum:** ✅ Tamamlandı
**Öncelik:** 🎬 Audio Tools

## 🎯 HEDEF
Kullanıcının video veya ses dosyalarından ses ayıklamasını (MP4 -> MP3) veya ses formatlarını dönüştürmesini (WAV -> MP3) sağlamak.

## 📋 ALT GÖREVLER
- [x] **ADIM 1: Dokümantasyon**
  - [x] `docs/project-status.md` dosyasını güncelle (Aktif Task: TASK-34).
  - [x] `docs/current-task.md` dosyasını arşivle (`docs/archive/TASK-33-SLIDESHOW.md`).
  - [x] `docs/current-task.md` dosyasını temizle ve TASK-34 için hazırla.
- [x] **ADIM 2: Audio Logic (Hook)**
  - [x] `src/hooks/use-audio-converter.ts` oluştur.
  - **Girdi:** Video veya Ses dosyası (`File`).
  - **Parametre:** `targetFormat` (mp3, wav, aac, m4a, ogg).
  - **FFmpeg Mantığı:**
    - Komut: `-i input.file -vn -acodec {codec} output.{format}`
    - **Codec Eşleşmeleri:**
      - mp3 -> `libmp3lame` (Standart) veya `mp3`
      - aac -> `aac`
      - wav -> `pcm_s16le`
      - ogg -> `libvorbis`
      - m4a -> `aac`
    - *İpucu:* `-vn` parametresi "Video None" demektir, videoyu atar ve sadece sesi işler.
  - **Çıktı:** Dönüştürülmüş ses dosyası.
- [x] **ADIM 3: UI Bileşeni**
  - [x] `src/components/features/audio-converter.tsx` oluştur.
  - **Tasarım:**
    - Dropzone (Video VE Ses dosyalarını kabul etmeli: `accept: {'audio/*': [], 'video/*': []}`).
    - **Format Seçimi:** Güzel bir Select veya Radio Group (MP3, WAV, AAC, M4A, OGG). Varsayılan: MP3.
    - "Convert" butonu.
- [x] **ADIM 4: Sayfa ve Entegrasyon**
  - [x] `src/app/audio-converter/page.tsx` oluştur.
  - **Metadata:** Title: "Audio Converter Online - Extract MP3 from Video".
  - **Global:** Navbar ve Footer'a "Audio Converter" linkini ekle.
  - **Grid (Kolay Yöntem):** `src/app/page.tsx` içindeki `TOOLS` array'ine yeni aracı ekle:
    - Title: "Audio Converter"
    - Desc: "Extract audio from video or convert sound files."
    - Icon: `Music` (Lucide-react'tan).
    - Color: "bg-pink-500" (veya uygun bir renk).
- [x] **ADIM 5: Test**
  - [x] `npm run dev` ile test et.
  - [x] Bir MP4 video yükle, MP3 seç ve dönüştür.
  - [x] İnen dosyanın sadece ses çaldığını teyit et.

## ✅ TAMAMLANMA KRİTERLERİ
- [x] `use-audio-converter.ts` hook'u oluşturuldu ve FFmpeg ile çalışıyor.
- [x] `audio-converter.tsx` bileşeni oluşturuldu, format seçimi ve dropzone doğru çalışıyor.
- [x] `audio-converter/page.tsx` sayfası oluşturuldu, metadata ve ads entegrasyonu tamam.
- [x] Navbar, Footer ve Ana Sayfa Grid'inde "Audio Converter" linki eklendi.
- [x] Test sonucu: Video'dan MP3 başarıyla ayıklandı, sadece ses içeriyor.

## 📂 İLGİLİ DOSYALAR
- `src/hooks/use-audio-converter.ts`
- `src/components/features/audio-converter.tsx`
- `src/app/audio-converter/page.tsx`
- `src/config/ads.ts`
- `src/components/layout/navbar.tsx`
- `src/components/layout/footer.tsx`
- `src/context/workspace-context.tsx`

---

*Archived on 2026-01-09*