# TASK-17: SEO Content Injection (Growth & SEO)

**Durum:** 🟡 Aktif
**Öncelik:** 🚀 SEO & Trafik Kazanımı

## 🎯 HEDEF
`src/config/blog-posts.ts` dosyasına 4 adet yüksek kaliteli, SEO uyumlu ve ilgili araçlara yönlendiren makale eklemek. Google'ı doyurmak ve AdSense onayı almak için içerik girmek.

## 📋 ALT GÖREVLER
- [x] **A.1 Dokümantasyon**
  - `tasks/TASK-16-BLOG.md` dosyasını arşive kaldır.
  - `DURUM.md` dosyasını güncelle (Aktif Task: TASK-17 - Faz: Growth & SEO).
  - `tasks/TASK-17-CONTENT.md` dosyasını oluştur.

- [ ] **A.2 İçerik Üretimi (Blog Posts Update)**
  - `src/config/blog-posts.ts` dosyasını aç.
  - Mevcut "WhatsApp" makalesinin yanına şu 4 makaleyi ekle (Toplam 5 olacak):

    **Makale 1 (Trimmer Odaklı):**
    - **Title:** "How to Trim Video Online Without Watermark (Fast & Free)"
    - **Slug:** `how-to-trim-video-online-no-watermark`
    - **Related Tool:** `trim-video` (Trimmer sayfasının slug'ı neyse o).
    - **Content:** Kullanıcının neden online kesmek isteyeceğini, filigran sorunu olmadığını ve bizim aracın "Local Processing" sayesinde ne kadar hızlı olduğunu anlatan HTML içeriği.

    **Makale 2 (Cropper Odaklı):**
    - **Title:** "Resize Videos for TikTok & Instagram Reels (9:16 Aspect Ratio)"
    - **Slug:** `resize-video-for-tiktok-instagram-9-16`
    - **Related Tool:** `crop-video`
    - **Content:** Sosyal medya için boyutların önemini, 9:16 oranını ve aracımızla görsel olarak nasıl kırpılacağını anlat.

    **Makale 3 (Audio Remover Odaklı):**
    - **Title:** "How to Remove Audio from Video on iPhone, Android & PC"
    - **Slug:** `how-to-remove-audio-from-video`
    - **Related Tool:** `remove-audio`
    - **Content:** Videolardaki arka plan gürültüsünü silmek veya telifli müziği kaldırmak için en kolay yolun bu olduğunu anlat.

    **Makale 4 (Rotator Odaklı):**
    - **Title:** "Fix Sideways Video: How to Rotate MP4 90 Degrees Permanently"
    - **Slug:** `how-to-rotate-video-90-degrees`
    - **Related Tool:** `rotate-video`
    - **Content:** Telefonla yanlış çekilen videoları düzeltmek için programsız çözüm.

  - **Önemli Not:** İçerikler "Lorem Ipsum" OLMASIN. İngilizce, okunaklı, "Privacy First" vurgusu yapan gerçekçi metinler olsun. Her makale en az 300 kelime olsun.

- [ ] **A.3 Kontrol ve Doğrulama**
  - `npm run dev` (Port 3002'yi unutma!) ile kontrol et.
  - `/blog` sayfasında 5 makale listeleniyor mu?
  - Her birine tıklayınca doğru aracı ("Related Tool") sidebar'da gösteriyor mu?

## ✅ TAMAMLANMA KRİTERLERİ
- [ ] TASK‑16 dokümantasyonu arşive taşındı, DURUM.md güncellendi, TASK‑17 dosyası oluşturuldu.
- [ ] `src/config/blog-posts.ts` dosyasına 4 yeni makale eklendi (toplam 5).
- [ ] Her makalenin içeriği gerçek, SEO uyumlu, en az 300 kelime ve "Privacy First" vurgulu.
- [ ] `npm run dev` ile sitenin hala çalıştığı doğrulandı.
- [ ] `/blog` sayfasında 5 makale listeleniyor ve her birinin related tool'u sidebar'da doğru görüntüleniyor.

## 📂 İLGİLİ DOSYALAR
- `tasks/TASK-16-BLOG.md` (arşiv)
- `DURUM.md`
- `tasks/TASK-17-CONTENT.md`
- `src/config/blog-posts.ts`
- `src/app/blog/page.tsx`
- `src/app/blog/[slug]/page.tsx`
- `package.json` (dev script)