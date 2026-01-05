# TASK-05: Design Overhaul

**Durum:** 🟡 Aktif
**Öncelik:** 🎨 Tasarım

## 🎯 HEDEF
Siteyi profesyonel bir SaaS ürününe dönüştürmek için tasarım dosyalarını (`tailwind-ui/` klasöründeki `hero-section.txt`, `feature-section.txt`, `footer.txt`) kullanarak sayfayı yeniden yapılandırmak. Mevcut sıkıştırma fonksiyonelliğini koruyarak modern, şık bir kullanıcı arayüzü oluşturmak.

## 📋 ALT GÖREVLER
- [x] **A.1 Hazırlık ve Kurulum**
  - `tasks/TASK-04-DEPLOY.md` dosyasını `tasks/archive/` klasörüne taşı.
  - `DURUM.md` dosyasını güncelle (Aktif Task: TASK-05).
  - `tasks/TASK-05-DESIGN.md` dosyasını oluştur.
  - Tasarım dosyalarında kullanılan kütüphaneleri kur: `npm install @headlessui/react @heroicons/react`.

- [ ] **A.2 Sayfa Entegrasyonu (Surgical Merge)**
  - `src/app/page.tsx` dosyasını tamamen yeniden yaz.
  - Hero bölümünü `hero-section.txt` baz alarak entegre et:
    - Navbar'ı sadeleştir (sadece Logo ve GitHub linki).
    - Dropzone ve AdPlaceholder bileşenlerini hero içine yerleştir.
    - Durum yönetimi: kullanıcı dosya yüklediğinde Compression Progress ve Download bileşenlerine dönüş.
  - Feature bölümünü `feature-section.txt` baz alarak entegre et:
    - Grid'i `lg:grid-cols-3` olarak güncelle.
    - İçeriği güncelle (Privacy First, Lightning Fast, Unlimited Size).
  - Footer bölümünü `footer.txt` baz alarak entegre et:
    - Linkleri temizle.
    - Footer'ın hemen üzerine mevcut `FAQ` (Accordion) bileşenini ekle.

- [ ] **A.3 Test ve Doğrulama**
  - `npm run dev` ile sunucuyu başlat.
  - Tasarımın bozulmadığından (özellikle mobilde) emin ol.
  - Sıkıştırma fonksiyonunun hala çalıştığını test et.

## ✅ TAMAMLANMA KRİTERLERİ
- [ ] Hero, Feature ve Footer bölümleri tasarım dosyalarına uygun şekilde entegre edildi.
- [ ] Dropzone ve sıkıştırma işlevselliği korundu.
- [ ] Mobil uyumluluk bozulmadı.
- [ ] Sayfa derleniyor ve hata vermiyor.
- [ ] Tasarım kütüphaneleri (`@headlessui/react`, `@heroicons/react`) kuruldu.

## 📂 İLGİLİ DOSYALAR
- `src/app/page.tsx`
- `src/components/ui/dropzone.tsx`
- `src/components/ui/ad-placeholder.tsx`
- `src/components/home/faq-section.tsx`
- `tailwind-ui/hero-section.txt`
- `tailwind-ui/feature-section.txt`
- `tailwind-ui/footer.txt`
- `package.json`