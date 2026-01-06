# TASK-21: Manual Ad Units Implementation

**Durum:** 🟢 Aktif
**Öncelik:** 📈 Monetization

## 🎯 HEDEF
Gri placeholder kutularını, Google'ın gerçek reklam birimleriyle (Slot ID'leri tanımlanmış şekilde) değiştirmek. Reklam yapılandırmasını merkezi bir dosyada (ads.ts) tanımlayarak slot ID'lerini hardcoded olarak eklemek.

## 📋 ALT GÖREVLER
- [ ] **A.1 Dokümantasyon**
  - `tasks/TASK-20-FINAL.md` dosyasını arşive kaldır.
  - `DURUM.md` dosyasını güncelle (Aktif Task: TASK-21).
  - `tasks/TASK-21-REAL-ADS.md` dosyasını oluştur.

- [ ] **A.2 Ad Configuration (HARDCODED)**
  - `src/config/ads.ts` dosyasını oluştur.
  - Aşağıdaki kodları **AYNEN** yapıştır:
    ```typescript
    export const AD_CLIENT_ID = "ca-pub-4791649357996475";

    export const AD_SLOTS = {
      homepage: "7847980014", // LMT_Homepage_Square
      sidebar: "2608273386",  // LMT_Sidebar_Vertical
      tool: "4180375355",     // LMT_Tool_Horizontal
    };
    ```

- [ ] **A.3 Ad‑Unit Component Güncellemesi**
  - `src/components/ads/ad-unit.tsx` dosyasını aç.
  - `slotId` prop'unun değerini `AD_SLOTS`'tan alacak şekilde güncelle (örneğin `slotId={AD_SLOTS.homepage}`).
  - `process.env.NEXT_PUBLIC_SHOW_ADS` değişkenini kontrol et; eğer `true` ise gerçek reklam kodunu göster, değilse placeholder göster.

- [ ] **A.4 Reklam Yerleşimlerini Güncelle**
  - Ana sayfa (`src/app/page.tsx`) – `homepage` slot ID'sini kullan.
  - Blog detay sidebar (`src/app/blog/[slug]/page.tsx`) – `sidebar` slot ID'sini kullan.
  - Tool sayfaları (`src/app/tools/[slug]/page.tsx`) – `tool` slot ID'sini kullan.

- [ ] **A.5 Test**
  - `npm run dev` (Port 3002) ile çalıştır.
  - Geliştirme konsolunda reklam kodlarının hatasız yüklendiğini doğrula.
  - Placeholder'ların gerçek reklam birimleriyle değiştiğini görsel olarak kontrol et.

## ✅ TAMAMLANMA KRİTERLERİ
- [ ] TASK‑20 dokümantasyonu arşive taşındı, DURUM.md güncellendi, TASK‑21 dosyası oluşturuldu.
- [ ] `src/config/ads.ts` dosyası oluşturuldu ve doğru slot ID'leri içeriyor.
- [ ] `ad-unit.tsx` componenti slot ID'leri config'den alacak şekilde güncellendi.
- [ ] Ana sayfa, blog detay ve tool sayfalarında reklam slot'ları doğru ID'lerle yerleştirildi.
- [ ] Geliştirme sunucusunda reklam kodları hatasız çalışıyor, placeholder'lar görünmüyor (SHOW_ADS=true ise).

## 📂 İLGİLİ DOSYALAR
- `tasks/TASK-20-FINAL.md` (arşiv)
- `DURUM.md`
- `tasks/TASK-21-REAL-ADS.md`
- `src/config/ads.ts`
- `src/components/ads/ad-unit.tsx`
- `src/app/page.tsx`
- `src/app/blog/[slug]/page.tsx`
- `src/app/tools/[slug]/page.tsx`
- `package.json`