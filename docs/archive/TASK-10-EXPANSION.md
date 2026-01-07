# TASK-10: Global Navigation & Content Explosion

**Durum:** 🟡 Aktif
**Öncelik:** 🔗 SEO & Site Architecture

## 🎯 HEDEF
Footer ve linkleri tüm siteye yaymak ve desteklenen formatları artırarak sitemap'i 100+ sayfaya çıkarmak.

## 📋 ALT GÖREVLER
- [x] **A.1 Dokümantasyon**
  - `tasks/TASK-09-SEO-LINKS.md` dosyasını arşive kaldır.
  - `DURUM.md` dosyasını güncelle (Aktif Task: TASK-10).
  - `tasks/TASK-10-EXPANSION.md` dosyasını oluştur.

- [ ] **A.2 Layout Düzenlemesi (Global Footer)**
  - `src/app/page.tsx` içinden `<Footer />` bileşenini kaldır.
  - `src/app/layout.tsx` dosyasını aç ve `<Footer />` bileşenini `children`'ın altına ekle.
  - **Sonuç:** Artık Footer (ve içindeki Quick Links) `/compress-video` dahil tüm sayfalarda görünecek.

- [ ] **A.3 Cross-Linking (Tüm Sayfalarda Linkler)**
  - `src/app/tools/[slug]/page.tsx` (Dinamik Sayfa) dosyasını aç.
  - Sayfanın en altına (Converter bileşeninden sonra), `<PopularConversions />` bileşenini ekle.
  - **Tasarım:** Bu bileşeni "More Tools" veya "Other Conversions" başlığıyla sun.

- [ ] **A.4 Format Patlaması (Sitemap Explosion)**
  - `src/config/conversions.ts` dosyasını aç.
  - `SUPPORTED_FORMATS` veya ilgili listeye şu formatları da ekle:
    - Video: `webm`, `wmv`, `flv`, `ogv`, `3gp`
    - Audio: `wav`, `ogg`, `m4a`, `wma`
  - `validConversions` mantığını kontrol et. Yeni eklenen formatların da kombinasyonlarını (Örn: `webm` -> `mp4`, `wav` -> `mp3`) içerdiğinden emin ol.
  - **Not:** `VideoConverter` bileşeninde `webm` vb. seçildiğinde FFmpeg komutunun patlamaması için varsayılan bir "fallback" komutu olduğundan emin ol (Genelde çoğu format için standart parametreler çalışır, ama kontrol et).

## ✅ TAMAMLANMA KRİTERLERİ
- [ ] TASK‑09 dosyası arşive taşındı, DURUM.md güncellendi, TASK‑10 dosyası oluşturuldu.
- [ ] Footer tüm sayfalarda (layout.tsx aracılığıyla) görünüyor.
- [ ] `/tools/mov-to-mp4` gibi dinamik sayfalarda en altta "Popular Conversions" ızgarası mevcut.
- [ ] `src/config/conversions.ts`'e yeni formatlar eklendi ve `validConversions` bu formatları içeriyor.
- [ ] `/sitemap.xml` sayfa sayısı artmış (webm, flv vb. sayfalar dahil).

## 📂 İLGİLİ DOSYALAR
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/tools/[slug]/page.tsx`
- `src/config/conversions.ts`
- `components/seo/popular-conversions.tsx`
- `components/layout/footer.tsx`
- `tasks/TASK-10-EXPANSION.md`
- `DURUM.md`