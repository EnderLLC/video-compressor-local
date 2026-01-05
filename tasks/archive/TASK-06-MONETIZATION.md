# TASK-06: Monetization

**Durum:** 🟡 Aktif
**Öncelik:** 💰 Gelir

## 🎯 HEDEF
Siteyi para kazanmaya (monetization) ve resmiyete hazırlamak için gerekli yasal sayfaları eklemek, Google Analytics altyapısını kurmak, SEO temellerini atmak.

## 📋 ALT GÖREVLER
- [x] **A.1 Dokümantasyon**
  - `tasks/TASK-05-DESIGN.md` dosyasını `tasks/archive/` klasörüne taşı.
  - `DURUM.md` dosyasını güncelle (Aktif Task: TASK-06).
  - `tasks/TASK-06-MONETIZATION.md` dosyasını oluştur.

- [ ] **A.2 Yasal Sayfalar (AdSense ve Güven İçin Zorunlu)**
  - `src/app/privacy/page.tsx` oluştur: Tailwind Typography (`prose` class) kullanarak standart SaaS gizlilik politikası metni.
  - `src/app/terms/page.tsx` oluştur: Benzer şekilde kullanım koşulları metni.
  - İçerikte şu özel düzenlemeleri yap:
    - **Company/Site Name:** Local Media Tools
    - **Domain:** https://local-media-tools.com
    - **Data Handling:** "We process all videos locally in your browser via WebAssembly. Your files are NEVER uploaded to our servers." (bold)
    - **Cookies:** "We use cookies for analytics (Google Analytics) and advertisements (Google AdSense)."
  - Footer bileşenini güncelle: "Privacy Policy" ve "Terms of Service" linklerini en alta (Copyright yanına) ekle.

- [ ] **A.3 Google Analytics Altyapısı**
  - `src/app/layout.tsx` dosyasına Google Analytics (GA4) scriptini ekle (`next/script` kullanarak).
  - Tracking ID'yi `process.env.NEXT_PUBLIC_GA_ID` ortam değişkeninden çek.
  - Proje köküne `.env.local` dosyası ekle (veya varsa düzenle) ve içine `NEXT_PUBLIC_GA_ID=` (boş bırak) ekle.

- [ ] **A.4 SEO Temelleri (Sitemap & Robots)**
  - `src/app/sitemap.ts` oluştur: Ana sayfa (`/`) ve statik sayfalar (`/privacy`, `/terms`) için otomatik sitemap üret. Base URL: `https://www.local-media-tools.com`
  - `src/app/robots.ts` oluştur: Tüm user-agent'lara izin ver ve sitemap adresini göster.

- [ ] **A.5 Test ve Doğrulama**
  - `npm run dev` ile sunucuyu başlat (veya mevcut dev sunucusunu yeniden yükle).
  - Footer linklerinin çalıştığını teyit et.
  - Privacy ve Terms sayfalarının erişilebilir olduğunu kontrol et.
  - Google Analytics scriptinin hatasız yüklendiğini doğrula.

## ✅ TAMAMLANMA KRİTERLERİ
- [ ] TASK-05 dosyası arşive taşındı, DURUM.md güncellendi, TASK-06 dosyası oluşturuldu.
- [ ] Privacy ve Terms sayfaları oluşturuldu, içerikleri özel düzenlemeleri içeriyor.
- [ ] Footer'da Privacy Policy ve Terms of Service linkleri görünüyor ve çalışıyor.
- [ ] Google Analytics scripti layout.tsx'e eklendi, environment variable kullanılıyor.
- [ ] .env.local dosyası oluşturuldu (NEXT_PUBLIC_GA_ID boş).
- [ ] Sitemap ve Robots dosyaları oluşturuldu, doğru URL'leri içeriyor.
- [ ] Site çalışıyor, hiçbir sayfa hatası yok.

## 📂 İLGİLİ DOSYALAR
- `src/app/privacy/page.tsx`
- `src/app/terms/page.tsx`
- `src/app/layout.tsx`
- `src/components/home/footer.tsx` (veya ilgili footer bileşeni)
- `.env.local`
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `package.json`
- `next.config.ts`