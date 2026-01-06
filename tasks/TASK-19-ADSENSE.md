# TASK-19: AdSense Readiness (Consent & Ad Slots)

**Durum:** 🟡 Aktif
**Öncelik:** 📈 Monetization

## 🎯 HEDEF
Siteyi AdSense başvurusuna %100 hazır hale getirmek. Cookie consent banner (GDPR/CCPA uyumu) ve Ad placeholder bileşenleri ekleyip reklam slot'larını stratejik yerlere yerleştirmek.

## 📋 ALT GÖREVLER
- [x] **A.1 Dokümantasyon**
  - `tasks/TASK-18-SCHEDULING.md` dosyasını arşive kaldır.
  - `DURUM.md` dosyasını güncelle (Aktif Task: TASK-19).
  - `tasks/TASK-19-ADSENSE.md` dosyasını oluştur.

- [ ] **A.2 Cookie Consent Banner (Yasal Zorunluluk)**
  - `components/ui/cookie-banner.tsx` oluştur.
  - **Tasarım:** Ekranın en altında sabit (fixed), siyah transparan şerit.
  - **İçerik:** "We use cookies to improve your experience and for ads." yazısı. "Accept" ve "Decline" butonları.
  - **Mantık:**
    - Kullanıcı "Accept" derse `localStorage`'a kaydet (`cookie_consent=true`) ve banner'ı gizle.
    - Sayfa yenilenince tekrar çıkmasın.
    - `src/app/layout.tsx` içine ekle.
    - (Opsiyonel) Eğer Google Analytics kodun varsa, sadece "Accept" denirse çalışacak şekilde şartlı hale getir (GDPR için artı puandır ama zorunlu değil, şimdilik banner olsun yeter).

- [ ] **A.3 Ad Placeholder Bileşeni**
  - `components/ads/ad-unit.tsx` oluştur.
  - **Props:** `slotId` (string), `format` (auto, rectangle, vertical), `label` (opsiyonel, örn: "Advertisement").
  - **Görünüm:**
    - `process.env.NEXT_PUBLIC_SHOW_ADS` 'true' ise gerçek reklam kodunu (ileride) gösterecek.
    - Şu anlık: Gri, çizgili, ortasında "Advertisement Space" yazan şık bir kutu göster.
    - Boyutları responsive olsun (Mobilde kare, masaüstünde yatay vb.).

- [ ] **A.4 Reklam Yerleşimi (Placement)**
  - **Ana Sayfa:** Araçlar grid'inin üstüne veya altına bir `AdUnit` ekle.
  - **Sidebar (Blog Detay):** `src/app/blog/[slug]/page.tsx` içindeki sidebar'a, "Related Tool"un altına bir `AdUnit` ekle.
  - **Tool Sayfaları:** Dönüştürme/İndirme butonlarının altına (kullanıcı beklerken görsün diye) bir `AdUnit` ekle.

- [ ] **A.5 Test**
  - `npm run dev` ile (Port 3002!) çalıştır.
  - Sayfayı açınca altta Cookie Banner çıkıyor mu? "Accept" deyince gidiyor mu?
  - Sayfalarda "Advertisement Space" kutularını görüyor musun?

## ✅ TAMAMLANMA KRİTERLERİ
- [ ] TASK‑18 dokümantasyonu arşive taşındı, DURUM.md güncellendi, TASK‑19 dosyası oluşturuldu.
- [ ] Cookie banner componenti oluşturuldu ve layout'a eklendi.
- [ ] Ad unit componenti oluşturuldu, responsive ve placeholder görünümü doğru.
- [ ] Ana sayfa, blog detay ve tool sayfalarında ad slot'ları yerleştirildi.
- [ ] Dev modunda banner ve ad placeholder'ları görünüyor, cookie consent localStorage'da kaydediliyor.

## 📂 İLGİLİ DOSYALAR
- `tasks/TASK-18-SCHEDULING.md` (arşiv)
- `DURUM.md`
- `tasks/TASK-19-ADSENSE.md`
- `components/ui/cookie-banner.tsx`
- `components/ads/ad-unit.tsx`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/blog/[slug]/page.tsx`
- `src/app/tools/[slug]/page.tsx`
- `package.json`