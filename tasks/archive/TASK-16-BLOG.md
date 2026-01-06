# TASK-16: SEO Blog Infrastructure

**Durum:** 🟡 Aktif
**Öncelik:** 📈 SEO & Content

## 🎯 HEDEF
Siteye hafif, hızlı ve SEO odaklı bir Blog bölümü eklemek.

## 📋 ALT GÖREVLER
- [x] **A.1 Dokümantasyon**
  - `tasks/TASK-15-LAUNCH.md` dosyasını arşive kaldır.
  - `DURUM.md` dosyasını güncelle (Aktif Task: TASK-16).
  - `tasks/TASK-16-BLOG.md` dosyasını oluştur.

- [ ] **A.2 Blog Veri Yapısı (Local CMS)**
  - `src/config/blog-posts.ts` dosyası oluştur.
  - İçinde `BLOG_POSTS` array'i olsun. Her post şunları içersin:
    - `slug`: (örn: 'how-to-compress-video-for-whatsapp')
    - `title`: Makale başlığı.
    - `excerpt`: Kısa özet (Meta description için).
    - `date`: Yayın tarihi.
    - `content`: HTML veya Markdown string (Şimdilik dummy content koyabilirsin veya "Tailwind Typography" uyumlu uzun bir HTML string).
    - `relatedTool`: Hangi aracımızla ilgili? (Örn: 'compress-video'). Bu önemli, makale içinden araca link vereceğiz.

- [ ] **A.3 Blog Listeleme Sayfası**
  - `src/app/blog/page.tsx` oluştur.
  - "Latest Guides & Tutorials" başlığı altında `BLOG_POSTS` listesini kartlar halinde göster.
  - Navbar'a ve Footer'a "Blog" linkini ekle.

- [ ] **A.4 Blog Detay Sayfası (Dinamik)**
  - `src/app/blog/[slug]/page.tsx` oluştur.
  - Seçilen blog postu bul ve göster.
  - **Kritik:** Makalenin sağına veya altına "Sticky Sidebar" ile **ilgili aracı** (CTA olarak) ekle.
    - Örnek: Makale "WhatsApp Video Küçültme" ise, yanında "Compress Video Now" butonu ve dropzone'u olsun.
  - **Metadata:** Makale başlığı ve özetini SEO başlığı olarak ayarla.

- [ ] **A.5 İlk İçeriği Ekle (Seed Data)**
  - `blog-posts.ts` içine şu anlık 1 tane gerçekçi, İngilizce, SEO uyumlu makale taslağı ekle:
    - Başlık: "How to Compress Large Videos for WhatsApp (2025 Guide)"
    - İçerik: "WhatsApp has a 16MB limit..." diye başlayan, kullanıcıya neden sıkıştırması gerektiğini anlatan ve bizim aracı öneren 300-400 kelimelik bir yazı.

## ✅ TAMAMLANMA KRİTERLERİ
- [ ] TASK‑15 dokümantasyonu arşive taşındı, DURUM.md güncellendi, TASK‑16 dosyası oluşturuldu.
- [ ] `src/config/blog-posts.ts` dosyası oluşturuldu, `BLOG_POSTS` array'i tanımlandı.
- [ ] `src/app/blog/page.tsx` oluşturuldu, blog listeleme sayfası çalışıyor.
- [ ] Navbar ve Footer'da "Blog" linki eklendi.
- [ ] `src/app/blog/[slug]/page.tsx` oluşturuldu, blog detay sayfası çalışıyor, sticky sidebar ile ilgili araç gösteriliyor.
- [ ] İlk blog post seed data olarak eklendi.
- [ ] `npm run dev` ile proje başlatılıp, `/blog` sayfasına girilebiliyor, makaleler görüntülenebiliyor, ilgili araca yönlendirme yapılabiliyor.

## 📂 İLGİLİ DOSYALAR
- `tasks/TASK-15-LAUNCH.md` (arşiv)
- `DURUM.md`
- `tasks/TASK-16-BLOG.md`
- `src/config/blog-posts.ts`
- `src/app/blog/page.tsx`
- `src/app/blog/[slug]/page.tsx`
- `src/components/layout/navbar.tsx`
- `src/components/layout/footer.tsx`