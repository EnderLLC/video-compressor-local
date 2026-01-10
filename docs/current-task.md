# TASK-40: Webcam Recorder

**Durum:** 🟢 Aktif
**Öncelik:** 🎥 Kullanıcı Etkileşimi

## 🎯 HEDEF
Kullanıcının kamerasını kullanarak video kaydı almasını sağlamak.

## 📋 ALT GÖREVLER
- [x] **ADIM 1: Dokümantasyon**
  - [x] `docs/project-status.md` dosyasını güncelle (Aktif Task: TASK-40).
  - [x] `docs/current-task.md` dosyasını arşivle (`docs/archive/TASK-39-WATERMARK.md`).
  - [x] `docs/current-task.md` dosyasını temizle ve TASK-40 için hazırla.
- [x] **ADIM 2: Webcam Logic (Hook)**
  - [x] `src/hooks/use-webcam-recorder.ts` oluştur.
  - **Mantık:** `use-screen-recorder.ts` kancasına çok benzer olacak.
  - **API:** `navigator.mediaDevices.getUserMedia({ video: true, audio: true })`.
  - **Fonksiyonlar:**
    - `startCamera()`: Sadece önizlemeyi açar (Kayıt başlamaz).
    - `startRecording()`: Kaydı başlatır.
    - `stopRecording()`: Kaydı bitirir.
    - `stopCamera()`: Kamera ışığını kapatır (Stream'i durdurur).
- [x] **ADIM 3: UI Bileşeni**
  - [x] `src/components/features/webcam-recorder.tsx` oluştur.
  - **Tasarım:**
    - **Video Alanı:** Canlı kamera görüntüsü (Mirror effect yani aynalanmış olması doğaldır: `transform: scaleX(-1)` css'i ile yapılabilir).
    - **Kontroller:**
      - "Turn On Camera" butonu (Başlangıçta).
      - "Record" (Kırmızı yuvarlak buton).
      - "Stop" (Kare buton).
    - **Sonuç:** Kayıt bitince videoyu oynat ve "Download WebM" butonu göster.
- [x] **ADIM 4: Sayfa ve Entegrasyon**
  - [x] `src/app/webcam-recorder/page.tsx` oluştur.
  - **Metadata:** Title: "Online Webcam Recorder - Record Video from Camera Free".
  - **Global:** Navbar ve Footer'a "Webcam Recorder" linkini ekle.
  - **Grid:** `src/app/page.tsx` içindeki `TOOLS` array'ine "Webcam Recorder" ekle (Icon: `Video` veya `Camera`).
  - **Workspace:** Kaydı `saveFile` ile 'webcam-recording' tipiyle kaydet.
- [x] **ADIM 5: Test ve Doğrulama**
  - [x] `npm run dev` ile test et.
  - [x] Kamerayı aç (Tarayıcı izin isteyecek).
  - [x] Kendine el salla ve kaydet.
  - [x] İndirip izle.

## ✅ TAMAMLANMA KRİTERLERİ
- [x] `use-webcam-recorder.ts` hook'u oluşturuldu ve kamera erişimi, kayıt işlevleri çalışıyor.
- [x] `webcam-recorder.tsx` bileşeni oluşturuldu, kamera önizlemesi, kayıt kontrolleri ve indirme butonu doğru çalışıyor.
- [x] `webcam-recorder/page.tsx` sayfası oluşturuldu, metadata ve ads entegrasyonu tamam.
- [x] Navbar, Footer ve Ana Sayfa Grid'inde "Webcam Recorder" linki eklendi.
- [x] Test sonucu: Kameradan kayıt alınabiliyor, WebM dosyası indirilebiliyor.

## 📂 İLGİLİ DOSYALAR
- `src/hooks/use-webcam-recorder.ts`
- `src/components/features/webcam-recorder.tsx`
- `src/app/webcam-recorder/page.tsx`
- `src/config/ads.ts`
- `src/components/layout/navbar.tsx`
- `src/components/layout/footer.tsx`
- `src/context/workspace-context.tsx`