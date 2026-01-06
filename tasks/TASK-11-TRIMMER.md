# TASK-11: Video Trimmer & Port Config

**Durum:** 🟡 Aktif
**Öncelik:** ⚙️ Üçüncü Büyük Araç

## 🎯 HEDEF
"Medya İmparatorluğu"nun 3. büyük aracı olan Video Trimmer'ı eklemek ve port çakışmasını kalıcı olarak çözmek.

## 📋 ALT GÖREVLER
- [x] **A.1 Port Yapılandırması (ÖNEMLİ & KALICI ÇÖZÜM)**
  - `package.json` dosyasındaki `dev` komutunu `"next dev -p 3002"` olarak güncelle.
  - **Neden:** Geliştirme ortamında 3000 portu dolu olduğu için, projenin varsayılan olarak 3002'de başlamasını zorunlu kılıyoruz.

- [ ] **A.2 Dokümantasyon**
  - `tasks/TASK-10-EXPANSION.md` dosyasını arşive kaldır.
  - `DURUM.md` dosyasını güncelle (Aktif Task: TASK-11).
  - `tasks/TASK-11-TRIMMER.md` dosyasını oluştur.

- [ ] **A.3 Video Trimmer Mantığı (Hook)**
  - `hooks/use-video-trimmer.ts` hook'unu oluştur.
  - **Mantık:** Kullanıcıdan `startTime` ve `endTime` (saniye cinsinden) alacak.
  - **FFmpeg Komutu:** Kesme işlemi için en hızlı yöntem olan "Stream Copy" kullanmalıyız (Re-encode yapmadan).
    - Komut şablonu: `-ss {startTime} -to {endTime} -i {inputFile} -c copy {outputFile}`
    - Bu yöntem saniyeler sürer, kalite kaybı olmaz.

- [ ] **A.4 Video Trimmer UI**
  - `components/features/video-trimmer.tsx` bileşenini oluştur.
  - **Gereksinimler:**
    - Video yüklendiğinde video oynatıcı (preview) görünsün.
    - Altında basitçe "Start Time" ve "End Time" girebileceği inputlar (veya yapabiliyorsan dual-range slider) olsun.
    - "Trim Video" butonu ve İndirme alanı olsun.

- [ ] **A.5 Sayfa ve Entegrasyon**
  - `src/app/trim-video/page.tsx` sayfasını oluştur.
  - **Metadata:** Title: "Trim Video Online - Cut MP4/MOV Fast & Free".
  - **Entegrasyon:**
    - Navbar'a "Video Trimmer" linkini ekle.
    - Ana Sayfa (`src/app/page.tsx`) grid'ine "Video Trimmer" kartını ekle.
    - Footer'daki "Quick Links" kısmına ekle.

## ✅ TAMAMLANMA KRİTERLERİ
- [ ] Port yapılandırması güncellendi, dev server 3002'de başlıyor.
- [ ] TASK‑10 dokümantasyonu arşive taşındı, DURUM.md güncellendi, TASK‑11 dosyası oluşturuldu.
- [ ] `use-video-trimmer.ts` hook'u oluşturuldu, start/end time ile FFmpeg stream‑copy komutu çalışıyor.
- [ ] `video-trimmer.tsx` bileşeni oluşturuldu, video preview ve zaman inputları ile trim butonu çalışıyor.
- [ ] `/trim-video` sayfası oluşturuldu, metadata doğru şekilde ayarlandı.
- [ ] Navbar, ana sayfa grid ve footer'da Video Trimmer linkleri eklendi.
- [ ] `npm run dev` komutu ile proje 3002 portunda başlatılıp, `/trim-video` sayfasında bir video yüklenip 5 saniyelik kesme işlemi test edilebiliyor.

## 📂 İLGİLİ DOSYALAR
- `package.json`
- `tasks/TASK-10-EXPANSION.md` (arşiv)
- `DURUM.md`
- `tasks/TASK-11-TRIMMER.md`
- `hooks/use-video-trimmer.ts`
- `components/features/video-trimmer.tsx`
- `src/app/trim-video/page.tsx`
- `src/components/layout/navbar.tsx`
- `src/app/page.tsx`
- `src/components/layout/footer.tsx`