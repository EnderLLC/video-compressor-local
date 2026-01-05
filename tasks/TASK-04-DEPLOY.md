# TASK-04: Production Build & Deployment Prep

**Durum:** 🟡 Aktif
**Öncelik:** 🔥 Kritik

## 🎯 HEDEF
Projeyi canlı ortama (Production) hazırlamak. Build hatası olmadığından emin olmak ve Git repusu oluşturmak.

## 📋 ALT GÖREVLER
- [ ] **A.1 Build Testi (Smoke Test)**
  - `npm run build` komutunu çalıştır.
  - Eğer TypeScript veya ESLint hatası çıkarsa bunları **Otomatik Olarak Düzelt**. (Genelde `any` tipi veya unused variable hataları çıkar).
  - Build klasörünün (`.next`) başarıyla oluştuğunu teyit et.

- [ ] **A.2 Deployment Config Kontrolü**
  - `next.config.ts` (veya .mjs) dosyasını son kez kontrol et.
  - `headers()` fonksiyonunun `Cross-Origin-Opener-Policy` ve `Cross-Origin-Embedder-Policy` döndürdüğünden %100 emin ol. (Bu olmadan Vercel'de çalışmaz).

- [ ] **A.3 Git Başlatma**
  - `.gitignore` dosyasını kontrol et (`node_modules`, `.next`, `.env` ekli mi?).
  - `git init` komutunu çalıştır.
  - `git add .` ve `git commit -m "Initial commit - Video Compressor MVP"` komutlarını çalıştır.

## ✅ TAMAMLANMA KRİTERLERİ
- [ ] `npm run build` hatasız tamamlandı.
- [ ] Git commitlendi ve proje push'lanmaya hazır.