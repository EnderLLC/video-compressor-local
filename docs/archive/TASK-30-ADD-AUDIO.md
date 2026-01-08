# TASK-30: Add Audio to Video (Muxer)

**Durum:** 🟢 Aktif
**Öncelik:** 🎬 Video Editing Tools

## 🎯 HEDEF
Kullanıcının bir Video dosyası ve bir Ses dosyası yükleyip, bunları tek bir MP4 dosyasında birleştirmesini sağlamak.

## 📋 ALT GÖREVLER
- [ ] **A.1 Dokümantasyon Güncellemesi**
  - `docs/project-status.md` dosyasını güncelle (Aktif Task: TASK-30).
  - `docs/current-task.md` içeriğini `docs/archive/TASK-29-MERGER.md` dosyasına taşıyarak arşivle.
  - `docs/current-task.md` dosyasını temizle ve TASK-30 için hazırla.
- [ ] **A.2 Muxer Logic (Hook)**
  - `src/hooks/use-audio-muxer.ts` oluştur.
  - Girdi: `videoFile` ve `audioFile`.
  - FFmpeg Mantığı: `-i video.mp4 -i audio.mp3 -c:v copy -map 0:v:0 -map 1:a:0 -shortest output.mp4`
  - *Açıklama:* Videoyu yeniden encode etmeden sadece sesi değiştir. Ses videodan kısaysa `-shortest` ile kes.
  - Çıktı: Ses eklenmiş video dosyası.
- [ ] **A.3 UI Bileşeni**
  - `src/components/features/add-audio.tsx` oluştur.
  - Özellikler:
    - **Adım 1:** "Upload Video" alanı.
    - **Adım 2:** "Upload Audio" alanı (MP3, WAV, AAC kabul et).
    - **Ayarlar (Opsiyonel):** "Keep Original Audio" (Mix) vs "Replace Audio". Başlangıç için sadece "Replace" yap.
    - **Buton:** "Add Audio to Video".
- [ ] **A.4 Sayfa ve Entegrasyon**
  - `src/app/add-audio/page.tsx` oluştur.
  - Metadata: Title "Add Audio to Video Online - Merge MP3 with MP4".
  - Navbar, Footer ve Ana Sayfa Grid'ine "Add Audio" linklerini ekle.
  - Workspace: İşlenmiş dosyayı `saveFile` ile Workspace'e kaydet (Type: 'audio-added-video').
  - Ads: `tool` reklam slotunu ekle.
- [ ] **A.5 Test**
  - `npm run dev` ile test et.
  - Bir video ve bir MP3 yükle.
  - Sonucu indir ve sesin değiştiğini doğrula.

## ✅ TAMAMLANMA KRİTERLERİ
- [ ] `use-audio-muxer.ts` hook'u oluşturuldu ve FFmpeg ile çalışıyor.
- [ ] `add-audio.tsx` bileşeni oluşturuldu, video ve audio upload doğru çalışıyor.
- [ ] `add-audio/page.tsx` sayfası oluşturuldu, metadata ve ads entegrasyonu tamam.
- [ ] Navbar ve Footer'da "Add Audio" linki eklendi.
- [ ] Test sonucu: Video'ya ses başarıyla eklendi, indirilebiliyor.

## 📂 İLGİLİ DOSYALAR
- `src/hooks/use-audio-muxer.ts`
- `src/components/features/add-audio.tsx`
- `src/app/add-audio/page.tsx`
- `src/config/ads.ts`
- `src/components/layout/navbar.tsx`
- `src/components/layout/footer.tsx`
- `src/context/workspace-context.tsx`