# TASK-03: UI Polish, SEO & Ad Placeholders

**Durum:** 🟡 Aktif
**Öncelik:** ⚡ Yüksek

## 🎯 HEDEF
Uygulamayı "Market-Ready" hale getirmek. Google SEO standartlarına uygun metadataları girmek, içerik alanları oluşturmak ve reklam alanlarını (placeholder) hazırlamak.

## 📋 ALT GÖREVLER
- [x] **A.1 Metadata & SEO**
  - `src/app/layout.tsx` içinde dinamik metadata tanımla.
  - **Title:** "Free Video Compressor - Compress MP4/MOV Locally (No Upload)"
  - **Description:** "The fastest local video compressor. Reduce file size of MP4, MOV, AVI videos in your browser without uploading to any server. 100% Private & Free."
  - **Favicon:** (Opsiyonel) Eğer yoksa varsayılan Next.js ikonunu kullanabilirsin şimdilik.

- [x] **A.2 İçerik ve SSS (FAQ) Alanları**
  - Shadcn `Accordion` bileşenini kur (`npx shadcn@latest add accordion`).
  - `components/home/faq-section.tsx` oluştur.
  - İçine şu sorulardan oluşan şık bir SSS ekle (İngilizce):
    1. "Is my video uploaded to a server?" (Cevap: Hayır, browserda işlenir, %100 gizli.)
    2. "Is there a file size limit?" (Cevap: Hayır, sunucu kotası yok.)
    3. "Which formats are supported?" (Cevap: MP4, MOV, AVI, MKV...)

- [x] **A.3 Reklam Alanları (AdPlaceholder)**
  - `components/ui/ad-placeholder.tsx` bileşeni oluştur.
    - Tasarım: Gri arka plan (`bg-gray-100`), border, ortada "Advertisement" yazısı.
    - Boyutlar: Responsive (Mobilde kare, Desktopta yatay dikdörtgen).
  - Bu bileşeni `page.tsx` içinde şu noktalara yerleştir:
    1. **Header Üstü:** Sayfanın en tepesine.
    2. **Sonuç Alanı:** Download butonunun hemen altına.
    3. **Footer Üstü:** SSS alanının altına.

## ✅ TAMAMLANMA KRİTERLERİ
- [ ] Tarayıcı sekmesinde yeni Title görünüyor.
- [ ] Sayfa altında tıklanabilir SSS (Accordion) çalışıyor.
- [ ] 3 adet reklam kutusu (Placeholder) yerleşimde düzgün duruyor.