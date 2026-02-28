# Local Media Tools – Video Compressor

**Tarayıcı tabanlı, sunucusuz, gizlilik odaklı video işleme araçları koleksiyonu.**  
Tüm işlemler kullanıcının bilgisayarında (FFmpeg.wasm) gerçekleşir; hiçbir video sunucuya yüklenmez.

## 🚀 Hızlı Başlangıç

```bash
# Projeyi klonlayın
git clone <repo-url>
cd video-compressor-local

# Bağımlılıkları kurun
npm install

# Geliştirme sunucusunu başlatın (Port 3002)
npm run dev
```

Ardından tarayıcınızda [http://localhost:3002](http://localhost:3002) açın.

## 📚 Dokümantasyon Haritası

Projenin tamamı AI asistanları (Claude, GPT, vs.) tarafından anında anlaşılabilecek şekilde yapılandırılmıştır.

| Klasör | Açıklama |
|--------|----------|
| [`docs/architecture/`](docs/architecture/) | Mimari kararlar, teknoloji yığını, özellikler. |
| [`docs/guides/`](docs/guides/) | Geliştirici rehberleri (yeni araç ekleme, deployment). |
| [`docs/archive/`](docs/archive/) | Tamamlanmış tüm task dosyaları (TASK‑01 … TASK‑25). |
| [`docs/project-status.md`](docs/project-status.md) | Güncel proje durumu, tamamlanan ve bekleyen işler. |

**AI Context:** Eğer bir AI asistanıysan, projeyi anlamak için önce şu dosyaları oku:
1. [`docs/architecture/tech-stack.md`](docs/architecture/tech-stack.md) – Kullanılan teknolojiler ve klasör yapısı.
2. [`docs/architecture/features.md`](docs/architecture/features.md) – Mevcut araçlar, hook’lar ve çalışma prensipleri.

## 🛠️ Mevcut Araçlar

- **Video Sıkıştırma** – Dosya boyutunu küçült, bitrate ayarla.
- **Video Dönüştürücü** – MP4, WebM, MOV, AVI arasında dönüşüm.
- **Video Kırpma** – Başlangıç/bitiş saniyeleri ile kes.
- **Video Kırpıcı** (Crop) – Görüntüyü interaktif olarak kırp.
- **Video Döndürme & Çevirme** – 90°, 180°, 270° döndür, yatay/dikey çevir.
- **GIF Yapıcı** – Videodan GIF oluştur.
- **Ses Kaldırma** – Videodan sesi tamamen çıkar.
- **Ses Yükseltme** – Ses seviyesini artır.

Tüm araçlar **workspace** (IndexedDB) ile entegredir; işlenen dosyalar otomatik olarak “Son Dosyalar” çekmecesine kaydedilir.

## 🧩 Teknoloji Yığını

- **Next.js 16** (App Router) – Sunucu bileşenleri, dinamik routing.
- **TypeScript** – Tip güvenliği.
- **Tailwind CSS** – Utility‑first stil.
- **Shadcn/ui** – Radix tabanlı UI bileşenleri.
- **FFmpeg.wasm** – Tarayıcıda video işleme.
- **IndexedDB (idb)** – Yerel depolama.
- **PWA** – Manifest, kurulum desteği.

Detaylı teknoloji açıklamaları için [`docs/architecture/tech-stack.md`](docs/architecture/tech-stack.md) dosyasına bakın.

## 📁 Proje Yapısı

```
src/app/                    # Sayfalar (App Router)
src/components/features/    # Araç‑özel UI bileşenleri
src/components/ui/          # Paylaşılan Shadcn bileşenleri
src/hooks/                  # Video işleme hook’ları
src/lib/                    # Yardımcı fonksiyonlar, IndexedDB wrapper
src/config/                 # Sabit yapılandırmalar (reklamlar, blog yazıları)
src/context/                # React context’leri (Workspace)
```

## 🤖 Geliştirici Rehberleri

Yeni bir video aracı eklemek için adım adım kılavuz:  
[`docs/guides/new-tool-guide.md`](docs/guides/new-tool-guide.md)

## 📈 Proje Durumu

Güncel tamamlanan task’ler, aktif işler ve ilerleme çetelesi:  
[`docs/project-status.md`](docs/project-status.md)

---

*Bu dosya projenin ana giriş kapısıdır. Detaylı dokümantasyon için `docs/` klasörünü inceleyin.*
