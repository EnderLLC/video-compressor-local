# TASK-28: Screen Recorder

**Durum:** 🟢 Aktif
**Öncelik:** 🎥 Screen Capture Tools

## 🎯 HEDEF
Hiçbir eklenti yüklemeden, tarayıcı API'leri ile ekran, pencere veya sekme kaydı almak.

## 📋 ALT GÖREVLER
- [ ] **A.1 Dokümantasyon Güncellemesi**
  - `docs/project-status.md` dosyasını güncelle (Aktif Task: TASK-28).
  - `docs/current-task.md` içeriğini `docs/archive/TASK-27-SPEED.md` dosyasına taşıyarak arşivle.
  - `docs/current-task.md` dosyasını temizle ve TASK-28 için hazırla.
- [ ] **A.2 Recorder Logic (Hook)**
  - `src/hooks/use-screen-recorder.ts` oluştur.
  - MediaRecorder API kullan.
  - Fonksiyonlar: `startRecording()`, `stopRecording()`, `isRecording`, `recordingTime`.
  - Çıktı: `.webm` formatında Blob.
- [ ] **A.3 UI Bileşeni**
  - `src/components/features/screen-recorder.tsx` oluştur.
  - Büyük, kırmızı "Start Recording" butonu.
  - Kayıt sırasında: "Recording... 00:15" sayacı ve "Stop" butonu.
  - Kayıt bitince: Önizleme (Video Player), "Download WebM" butonu, "Convert to MP4" butonu.
- [ ] **A.4 Sayfa ve Entegrasyon**
  - `src/app/screen-recorder/page.tsx` oluştur.
  - Metadata: Title "Free Online Screen Recorder - No Watermark & Unlimited".
  - Navbar, Footer ve Ana Sayfa Grid'ine "Screen Recorder" linklerini ekle.
  - Workspace: Kayıt bitince oluşan dosyayı `saveFile` ile Workspace'e kaydet (Type: 'screen-recording').
  - Ads: `tool` reklam slotunu ekle.
- [ ] **A.5 Test**
  - `npm run dev` ile test et.
  - "Start Recording"e bas, bir pencere seç.
  - Birkaç saniye kaydet ve durdur.
  - Videoyu indirip izle.

## ✅ TAMAMLANMA KRİTERLERİ
- [ ] `use-screen-recorder.ts` hook'u oluşturuldu ve MediaRecorder API ile çalışıyor.
- [ ] `screen-recorder.tsx` bileşeni oluşturuldu, butonlar ve sayaç doğru çalışıyor.
- [ ] `screen-recorder/page.tsx` sayfası oluşturuldu, metadata ve ads entegrasyonu tamam.
- [ ] Navbar ve Footer'da "Screen Recorder" linki eklendi.
- [ ] Test sonucu: Ekran kaydı başarıyla alınıyor, indirilebiliyor ve workspace'e kaydediliyor.

## 📂 İLGİLİ DOSYALAR
- `src/hooks/use-screen-recorder.ts`
- `src/components/features/screen-recorder.tsx`
- `src/app/screen-recorder/page.tsx`
- `src/config/ads.ts`
- `src/components/layout/navbar.tsx`
- `src/components/layout/footer.tsx`
- `src/context/workspace-context.tsx`