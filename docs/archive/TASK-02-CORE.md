# TASK-02: Core Video Processing (Sürükle-Bırak & Sıkıştırma)

**Durum:** 🟡 Aktif
**Öncelik:** 🔥 Kritik

## 🎯 HEDEF
Kullanıcının video yükleyebileceği bir Dropzone alanı oluşturmak ve seçilen videoyu FFmpeg.wasm kullanarak işleyip indilebilir hale getirmek.

## 📋 ALT GÖREVLER
- [x] **A.1 Dropzone Bileşeni**
  - `react-dropzone` paketini kur.
  - `components/ui/dropzone.tsx` bileşenini oluştur.
  - Tasarım: Kesik çizgili (dashed) kenarlık, sürükleme anında renk değişimi (hover state), ortada ikon.

- [x] **A.2 Video Processor Hook & Logic**
  - `hooks/use-video-process.tsx` (veya benzeri) bir custom hook yaz.
  - Bu hook: FFmpeg'i yüklesin, dosyayı sanal dosya sistemine yazsın (`ffmpeg.writeFile`), sıkıştırma komutunu çalıştırsın (`-c:v libx264 -crf 28` gibi temel bir ayarla) ve çıktıyı Blob URL olarak döndürsün.

- [x] **A.3 Ana Sayfa Entegrasyonu**
  - `page.tsx`'i güncelle. Dropzone'u ve işlem durumunu (Progress bar) göster.
  - İşlem bitince "Videoyu İndir" butonu çıkar.

## ✅ TAMAMLANMA KRİTERLERİ
- [x] Dosya sürükleyince algılanıyor.
- [x] "Sıkıştır" deyince hata almadan işlem başlıyor.
- [x] İşlem bitince dosya bilgisayara indirilebiliyor.