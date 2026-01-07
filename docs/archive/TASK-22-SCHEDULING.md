# TASK-22: Content Scheduling Engine

**Durum:** 🟢 Aktif
**Öncelik:** 📈 Content Management

## 🎯 HEDEF
Blog makalelerinin `date` alanına bakarak, tarihi bugünden ileri olanları Production ortamında gizlemek (404 döndürmek ve listeden çıkarmak). Development ortamında ise görünür kılmak.

## 📋 ALT GÖREVLER
- [ ] **A.1 Dokümantasyon**
  - `tasks/TASK-21-REAL-ADS.md` dosyasını arşive kaldır.
  - `DURUM.md` dosyasını güncelle (Aktif Task: TASK-22).
  - `tasks/TASK-22-SCHEDULING.md` dosyasını oluştur.

- [ ] **A.2 Yardımcı Fonksiyon (Logic Core)**
  - `src/lib/blog-utils.ts` dosyasını güncelle (yoksa oluştur).
  - Şu fonksiyonları ekle/güncelle:
    - `getAllPosts()`:
      - Eğer `process.env.NODE_ENV === 'development'` ise: Tüm postları döndür.
      - Eğer `production` ise: Sadece `new Date(post.date) <= new Date()` olanları filtrele.
      - Tarihe göre (Yeniden eskiye) sırala.
    - `getPostBySlug(slug)`:
      - Postu bul.
      - Eğer `production` ortamındaysak VE postun tarihi gelecekteyse `null` döndür (Böylece sayfa 404 verir).

- [ ] **A.3 Sayfa Entegrasyonları**
  - **Blog Listesi (`src/app/blog/page.tsx`):** `BLOG_POSTS` yerine `getAllPosts()` kullan.
  - **Blog Detay (`src/app/blog/[slug]/page.tsx`):**
    - `generateStaticParams`: Sadece `getAllPosts()` (yani yayınlanmışlar) üzerinde dönsün.
    - Sayfa içinde: `getPostBySlug` null dönerse `notFound()` çağır.
  - **Sitemap (`src/app/sitemap.ts`):**
    - Sadece `getAllPosts()` (yayınlanmışlar) listesini Google'a bildir. Gelecek postların URL'ini sızdırma.

- [ ] **A.4 Gelecek Tarihli Test Postu**
  - `src/config/blog-posts.ts` dosyasına bir tane "Future Post" ekle.
  - Tarihini 1 yıl sonraya ayarla (Örn: "2027-01-01").
  - Başlık: "Scheduled Content Test".

- [ ] **A.5 Test**
  - `npm run dev` ile test et.
    - Geliştirici modunda olduğun için postu **GÖRMELİSİN**.
  - Sonra `src/lib/blog-utils.ts` içinde geçici olarak `NODE_ENV` kontrolünü kaldırıp (sürekli prod gibi davranmasını sağlayıp) test et:
    - Post **GİZLENMELİ**.
  - Test bitince kodu eski haline getir ve "Future Post"u silmeyip sadece yorum satırına al (ileride örnek olsun diye).

## ✅ TAMAMLANMA KRİTERLERİ
- [ ] TASK‑21 dokümantasyonu arşive taşındı, DURUM.md güncellendi, TASK‑22 dosyası oluşturuldu.
- [ ] `blog-utils.ts` dosyası schedule‑aware fonksiyonları içeriyor.
- [ ] Blog listesi, detay ve sitemap sadece yayınlanmış postları gösteriyor (production'da).
- [ ] Geliştirme ortamında gelecek tarihli post görünür.
- [ ] Geçici prod simülasyonunda gelecek tarihli post gizlenir.
- [ ] Gelecek tarihli test postu `blog-posts.ts`'e eklendi ve yorum satırına alındı.

## 📂 İLGİLİ DOSYALAR
- `tasks/TASK-21-REAL-ADS.md` (arşiv)
- `DURUM.md`
- `tasks/TASK-22-SCHEDULING.md`
- `src/lib/blog-utils.ts`
- `src/config/blog-posts.ts`
- `src/app/blog/page.tsx`
- `src/app/blog/[slug]/page.tsx`
- `src/app/sitemap.ts`
- `package.json`