# TASK-15: Google Search Console Launch (Growth & SEO)

**Durum:** 🟡 Aktif
**Öncelik:** 🚀 SEO & Trafik Kazanımı

## 🎯 HEDEF
Siteyi Google Search Console'a ekleyip indekslenmesini sağlamak, robots.txt ve sitemap kontrolü yapmak, alternatif doğrulama yöntemlerini hazırlamak.

## 📋 ALT GÖREVLER
- [x] **A.1 Dokümantasyon**
  - `tasks/TASK-14-ROTATE-FLIP.md` dosyasını arşive kaldır.
  - `DURUM.md` dosyasını güncelle (Aktif Task: TASK-15 - Faz: Growth & SEO).
  - `tasks/TASK-15-LAUNCH.md` dosyasını oluştur.

- [ ] **A.2 Robots.txt Kontrolü (Son Kez)**
  - `src/app/robots.ts` dosyasını kontrol et.
  - Sitemap adresinin `https://www.local-media-tools.com/sitemap.xml` olduğundan emin ol.
  - Tüm User-Agent'lara izin verildiğinden (`Allow: /`) emin ol.

- [ ] **A.3 Meta Tag Hazırlığı (Alternatif Doğrulama)**
  - `src/app/layout.tsx` dosyasına, Google'ın sahiplik doğrulaması için `google-site-verification` meta etiketini ekleyebileceğimiz bir alan (comment satırı olarak) ekle veya `process.env.GOOGLE_SITE_VERIFICATION` varsa ekleyen bir kod parçası koy.

- [ ] **A.4 Manuel Adımlar (Kullanıcı Yapacak)**
  - **Google Search Console**:
    1. [Google Search Console](https://search.google.com/search-console) hesabına giriş yap.
    2. "Özellik ekle" butonuyla `https://www.local-media-tools.com` alan adını ekle.
    3. Doğrulama yöntemi olarak **DNS kaydı** seç (TXT kaydı).
    4. Cloudflare DNS'e gidip Google'un verdiği TXT kaydını ekle.
    5. Doğrulama tamamlanana kadar bekleyin (birkaç dakika).
  - **Cloudflare Ayarları**:
    1. Cloudflare dashboard'da `local-media-tools.com` domain'ini seç.
    2. DNS > Kayıtlar'a gidip yeni bir TXT kaydı ekle.
    3. Google'un verdiği TXT değerini yapıştır.
    4. TTL otomatik olarak bırak, proxy kapalı.
    5. Kaydet ve doğrulamayı tetikle.
  - **Sitemap Gönderimi**:
    1. GSC'de "Site Haritaları" bölümüne gidin.
    2. Yeni site haritası URL'si olarak `https://www.local-media-tools.com/sitemap.xml` ekleyin.
    3. Gönder ve indeksleme sürecini izle.

## ✅ TAMAMLANMA KRİTERLERİ
- [ ] TASK‑14 dokümantasyonu arşive taşındı, DURUM.md güncellendi, TASK‑15 dosyası oluşturuldu.
- [ ] `robots.ts` dosyası kontrol edildi, sitemap URL'si doğru, tüm user-agent'lara izin veriliyor.
- [ ] `layout.tsx` dosyasında google-site-verification meta etiketi için hazırlık yapıldı (comment veya conditional render).
- [ ] Manuel adımların tamamlanması için kullanıcıya yönergeler sunuldu.
- [ ] `npm run dev` ile sitenin hala çalıştığı doğrulandı.

## 📂 İLGİLİ DOSYALAR
- `tasks/TASK-14-ROTATE-FLIP.md` (arşiv)
- `DURUM.md`
- `tasks/TASK-15-LAUNCH.md`
- `src/app/robots.ts`
- `src/app/layout.tsx`
- `src/app/sitemap.ts`
- `package.json` (dev script)