# TASK-09: Internal Linking Strategy

**Durum:** 🟡 Aktif
**Öncelik:** 🔗 SEO Optimizasyonu

## 🎯 HEDEF
Oluşturduğumuz dinamik sayfalara (`/tools/mov-to-mp4` vb.) ana sayfadan ve footer'dan link vererek SEO otoritesini dağıtmak, site içi bağlantıları güçlendirmek.

## 📋 ALT GÖREVLER
- [x] **A.1 Dokümantasyon**
  - `tasks/TASK-07-FEATURES.md` (veya 08) dosyasını arşive kaldır.
  - `DURUM.md` dosyasını güncelle (Aktif Task: TASK-09).
  - `tasks/TASK-09-SEO-LINKS.md` dosyasını oluştur.

- [ ] **A.2 Link Bileşeni Oluşturma**
  - `components/seo/popular-conversions.tsx` bileşenini oluştur.
  - Bu bileşen `src/config/conversions.ts` dosyasındaki `validConversions` listesini import etsin.
  - **Tasarım:**
    - "Popular Conversions" başlığı altında bir Grid yapısı kur (Mobile 2, Desktop 4 sütun).
    - Her bir kutucuk (Link), şık birer "Pill" veya "Card" olsun.
    - Örn: "MOV to MP4" metni, `/tools/mov-to-mp4` adresine link versin.
    - Hepsini göstermek çok kalabalık olursa, sadece ilk 20 tanesini gösterip altına "Show more" mantığı (veya sadece en popülerleri gösterme mantığı) kurabilirsin.

- [ ] **A.3 Sayfa Entegrasyonu**
  - **Ana Sayfa (`src/app/page.tsx`):**
    - "FAQ" bölümünün hemen üzerine bu yeni `PopularConversions` bileşenini ekle.
  - **Footer (`components/layout/footer.tsx`):**
    - Footer'a "Quick Links" sütunu ekle.
    - Buraya sadece en çok aranan 5‑6 dönüşümü (hardcoded olabilir veya config'den çekebilirsin) metin linki olarak ekle. Örn: MP4 to GIF, MOV to MP4, MP3 Extractor.

- [ ] **A.4 Metadata İyileştirmesi (Opsiyonel ama Önerilir)**
  - Ana sayfanın (`src/app/page.tsx`) metadata'sına `keywords` ekle. Bu keyword'ler desteklediğimiz formatları içersin (video compressor, mov to mp4, avi converter, local convert...).

## ✅ TAMAMLANMA KRİTERLERİ
- [ ] TASK‑07/08 dosyası arşive taşındı, DURUM.md güncellendi, TASK‑09 dosyası oluşturuldu.
- [ ] `PopularConversions` bileşeni oluşturuldu ve ana sayfada doğru konumda gösteriliyor.
- [ ] Footer'da "Quick Links" sütunu eklenmiş, en popüler dönüşümlere link veriyor.
- [ ] Ana sayfa metadata'sına desteklenen formatları içeren keywords eklenmiş.
- [ ] Tüm linkler tıklandığında ilgili araç sayfasına yönlendiriyor.

## 📂 İLGİLİ DOSYALAR
- `components/seo/popular-conversions.tsx`
- `src/app/page.tsx`
- `components/layout/footer.tsx`
- `src/config/conversions.ts`
- `tasks/TASK-09-SEO-LINKS.md`
- `DURUM.md`