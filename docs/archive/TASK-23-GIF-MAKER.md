# TASK-23: Video to GIF Converter

**Durum:** 🟢 Aktif
**Öncelik:** 📈 SEO Tool Expansion

## 🎯 HEDEF
Kullanıcının videolarını yüksek kaliteli animasyonlu GIF'lere çevirmesini sağlamak. FFmpeg.wasm ile optimize edilmiş palettegen/paletteuse filtrelerini kullanarak dosya boyutunu küçük, kaliteyi yüksek tutmak.

## 📋 ALT GÖREVLER
- [ ] **A.1 Dokümantasyon**
  - `tasks/TASK-22-SCHEDULING.md` dosyasını arşive kaldır.
  - `DURUM.md` dosyasını güncelle (Aktif Task: TASK-23).
  - `tasks/TASK-23-GIF-MAKER.md` dosyasını oluştur.

- [ ] **A.2 GIF Converter Mantığı (Hook)**
  - `hooks/use-gif-converter.ts` oluştur.
  - **FFmpeg Stratejisi:**
    - GIF kalitesi için "palettegen" ve "paletteuse" filtrelerini kullanmak en iyisidir ama karmaşık olabilir.
    - Başlangıç için şu optimize edilmiş filtreyi kullan:
      `-vf "fps=10,scale=480:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse"`
      *(Açıklama: FPS'i 10'a düşür, genişliği 480px yap, renk paleti oluştur ve uygula. Bu, dosya boyutunu şişirmeden iyi görüntü verir).*
  - **Seçenekler:** Kullanıcıya "FPS" (10, 15, 24) ve "Size" (320px, 480px, Original) seçtirt.

- [ ] **A.3 UI Bileşeni**
  - `components/features/gif-maker.tsx` oluştur.
  - **Tasarım:** Converter bileşenine benzesin ama çıktı formatı seçimi olmasın (Zaten GIF).
  - **Ayarlar:**
    - FPS Slider veya Select.
    - Genişlik (Width) Select.
    - "Convert to GIF" butonu.

- [ ] **A.4 Sayfa ve Entegrasyon**
  - `src/app/video-to-gif/page.tsx` oluştur.
  - **Metadata:** Title: "Video to GIF Converter - High Quality & Online".
  - **Global:** Navbar, Ana Sayfa Grid ve Footer'a "Video to GIF" linklerini ekle.
  - **Blog Config:** `src/config/blog-posts.ts` içine şimdilik dummy bir kayıt eklemeden geç (Sonra yazarız).
  - **Ads Config:** `src/config/ads.ts` içindeki `tool` slot ID'sini bu sayfadaki reklam birimine de bağla.

- [ ] **A.5 Test ve Doğrulama**
  - `npm run dev` ile test et.
  - Bir video yükle, GIF'e çevir.
  - Çıkan GIF'i tarayıcıda açıp oynadığını doğrula.

## ✅ TAMAMLANMA KRİTERLERİ
- [ ] TASK‑22 dokümantasyonu arşive taşındı, DURUM.md güncellendi, TASK‑23 dosyası oluşturuldu.
- [ ] `use-gif-converter.ts` hook'u oluşturuldu ve FFmpeg filter'ları doğru çalışıyor.
- [ ] `gif-maker.tsx` bileşeni oluşturuldu, FPS ve genişlik seçenekleri çalışıyor.
- [ ] `/video-to-gif` sayfası oluşturuldu, metadata ve reklam entegrasyonu tamamlandı.
- [ ] Navbar ve footer linkleri eklendi.
- [ ] Video yüklenip GIF'e dönüştürülebiliyor, çıktı tarayıcıda oynatılabiliyor.

## 📂 İLGİLİ DOSYALAR
- `tasks/TASK-22-SCHEDULING.md` (arşiv)
- `DURUM.md`
- `tasks/TASK-23-GIF-MAKER.md`
- `src/hooks/use-gif-converter.ts`
- `src/components/features/gif-maker.tsx`
- `src/app/video-to-gif/page.tsx`
- `src/config/ads.ts`
- `src/config/blog-posts.ts`
- `src/components/layout/navbar.tsx`
- `src/components/layout/footer.tsx`
- `src/components/ads/ad-unit.tsx`
- `package.json`