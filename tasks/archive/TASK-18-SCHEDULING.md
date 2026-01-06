# TASK-18: Scheduled Content System

**Durum:** 🟡 Aktif
**Öncelik:** 📅 Content Scheduling

## 🎯 HEDEF
`date` alanı gelecekte olan makalelerin canlı sitede (Production) görünmesini engellemek, ancak zamanı gelince otomatik yayınlanmasını sağlamak.

## 📋 ALT GÖREVLER
- [x] **A.1 Dokümantasyon**
  - `tasks/TASK-17-CONTENT.md` dosyasını arşive kaldır.
  - `DURUM.md` dosyasını güncelle (Aktif Task: TASK-18).
  - `tasks/TASK-18-SCHEDULING.md` dosyasını oluştur.

- [ ] **A.2 Yardımcı Fonksiyon (Utility)**
  - `src/lib/blog-utils.ts` (veya benzeri) oluştur.
  - `getAllPosts()` adında bir fonksiyon yaz.
  - Bu fonksiyon:
    - `BLOG_POSTS` listesini alsın.
    - Eğer `process.env.NODE_ENV === 'development'` ise HEPSİNİ döndürsün (Sen çalışırken gör diye).
    - Eğer 'production' ise, sadece `new Date(post.date) <= new Date()` olanları döndürsün.
    - Listeyi tarihe göre (Yeniden eskiye) sıralasın.

- [ ] **A.3 Sayfa Entegrasyonları**
  - **Blog Listesi (`src/app/blog/page.tsx`):** Artık direkt config'den değil, bu yeni `getAllPosts()` fonksiyonundan veriyi çeksin.
  - **Blog Detay (`src/app/blog/[slug]/page.tsx`):**
    - `generateStaticParams`: Sadece yayınlanmış (`getAllPosts`) postlar için sayfa üretsin.
    - Sayfa bileşeni içinde: Eğer post bulunamazsa (veya tarihi ilerideyse ve production ise) `notFound()` fonksiyonunu çağır.
  - **Sitemap (`src/app/sitemap.ts`):** Sitemap sadece yayınlanmış (`getAllPosts`) postları içersin.

- [ ] **A.4 Test Verisi**
  - `src/config/blog-posts.ts` dosyasına "Gelecek Zamanlı" bir makale ekle.
    - Tarih: Bugünden 1 hafta sonrası (Örn: "2026-02-01").
    - Başlık: "Test Future Post".

- [ ] **A.5 Test**
  - `npm run dev` ile çalıştır.
    - Dev modunda olduğun için "Test Future Post" makalesini GÖRMELİSİN.
  - Kodda geçici olarak `getAllPosts` içindeki dev mod kontrolünü kapatıp test et (veya production build alıp bak):
    - "Test Future Post" makalesi GİZLENMELİ.
  - Test bitince kodu eski haline getir (Dev modda görünsün, Prod modda gizlensin).

## ✅ TAMAMLANMA KRİTERLERİ
- [ ] TASK‑17 dokümantasyonu arşive taşındı, DURUM.md güncellendi, TASK‑18 dosyası oluşturuldu.
- [ ] `src/lib/blog-utils.ts` dosyası oluşturuldu, `getAllPosts()` fonksiyonu çalışıyor.
- [ ] Blog listesi, detay ve sitemap entegrasyonları tamamlandı.
- [ ] Gelecek tarihli test makalesi eklendi.
- [ ] Dev modunda test makalesi görünüyor, production modunda gizleniyor.

## 📂 İLGİLİ DOSYALAR
- `tasks/TASK-17-CONTENT.md` (arşiv)
- `DURUM.md`
- `tasks/TASK-18-SCHEDULING.md`
- `src/lib/blog-utils.ts`
- `src/config/blog-posts.ts`
- `src/app/blog/page.tsx`
- `src/app/blog/[slug]/page.tsx`
- `src/app/sitemap.ts`
- `package.json`