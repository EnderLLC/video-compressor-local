# TASK-24: Workspace & Recent Files (IndexedDB)

**Durum:** 🟢 Aktif
**Öncelik:** 📈 Professional Workspace

## 🎯 HEDEF
Kullanıcının işlediği (Convert/Compress/GIF yaptığı) dosyaları tarayıcıda (`IndexedDB`) saklamak ve bir sidebar içinde "Geçmiş İşlemler" olarak listelemek. Kullanıcı sayfayı yenilediğinde bile dosyaların kaybolmamasını sağlamak, böylece profesyonel bir çalışma alanı deneyimi sunmak.

## 📋 ALT GÖREVLER
- [ ] **A.1 Dokümantasyon**
  - `tasks/TASK-23-GIF-MAKER.md` dosyasını arşive kaldır.
  - `DURUM.md` dosyasını güncelle (Aktif Task: TASK-24).
  - `tasks/TASK-24-WORKSPACE.md` dosyasını oluştur.
  - Gerekli kütüphaneyi kur: `npm install idb` (Hafif IndexedDB wrapper).

- [ ] **A.2 Workspace Mantığı (Context & DB)**
  - `src/lib/workspace-db.ts` oluştur:
    - `idb` kullanarak `lmt-workspace` adında bir veritabanı aç (Version 1).
    - `files` adında bir object store oluştur.
    - `addFile(fileBlob, meta)`: Dosyayı kaydet. Meta şunları içersin: `id` (uuid), `name`, `type` (gif/mp4), `createdAt`, `tool`.
    - `getRecentFiles()`: Tarihe göre sıralı son 10 dosyayı getir.
    - **Auto-Cleanup:** Yeni dosya eklerken toplam sayı 10'u geçerse en eskisini sil.
  - `src/context/workspace-context.tsx` oluştur:
    - React Context API ile `files` state'ini ve `saveFile` fonksiyonunu uygula.
    - Uygulama ilk açıldığında `getRecentFiles` ile listeyi doldur.

- [ ] **A.3 UI Bileşeni (Recent Files Sidebar)**
  - `components/layout/recent-files-drawer.tsx` oluştur.
  - **Tasarım:**
    - Ekranın sağ altında yüzen (fixed) yuvarlak bir "History 📂" butonu olsun.
    - Tıklayınca sağdan bir panel (Sheet veya basit div overlay) açılsın.
    - İçeride dosya listesi:
      - Dosya adı, Boyutu, Tarihi.
      - **Action:** "Download" butonu (Blob'dan URL oluşturup indir).

- [ ] **A.4 Entegrasyon (GIF & Converter)**
  - `src/app/layout.tsx`: `WorkspaceProvider` ile `<body>` içini sarmala ve `RecentFilesDrawer` bileşenini ekle.
  - **Hook Entegrasyonu:**
    - `hooks/use-gif-converter.ts` dosyasını güncelle: İşlem `success` olduğunda `saveFile` fonksiyonunu çağırıp oluşan GIF'i kaydet.
    - `hooks/use-video-converter.ts` dosyasını güncelle: Aynı şekilde dönüştürülen videoyu kaydet.

- [ ] **A.5 Test ve Doğrulama**
  - `npm run dev` ile test et.
  - Bir GIF oluştur.
  - Sağ alttaki "History" butonuna bas.
  - Dosyanın orada listelendiğini ve sayfayı yenilesen bile (Refresh) gitmediğini doğrula.

## ✅ TAMAMLANMA KRİTERLERİ
- [ ] TASK‑23 dokümantasyonu arşive taşındı, DURUM.md güncellendi, TASK‑24 dosyası oluşturuldu.
- [ ] `idb` kütüphanesi kuruldu.
- [ ] `workspace-db.ts` IndexedDB işlemleri doğru çalışıyor (ekleme, listeleme, otomatik temizleme).
- [ ] `workspace-context.tsx` context'i oluşturuldu ve provider düzgün çalışıyor.
- [ ] `recent-files-drawer.tsx` bileşeni oluşturuldu, buton ve panel doğru çalışıyor.
- [ ] `layout.tsx`'e WorkspaceProvider ve RecentFilesDrawer entegre edildi.
- [ ] `use-gif-converter.ts` ve `use-video-converter.ts` hook'ları güncellendi, başarılı işlemler IndexedDB'ye kaydediliyor.
- [ ] Test sonucu: Yeni işlenen dosya History panelinde listeleniyor ve sayfa yenilemede kaybolmuyor.

## 📂 İLGİLİ DOSYALAR
- `tasks/TASK-23-GIF-MAKER.md` (arşiv)
- `DURUM.md`
- `tasks/TASK-24-WORKSPACE.md`
- `src/lib/workspace-db.ts`
- `src/context/workspace-context.tsx`
- `src/components/layout/recent-files-drawer.tsx`
- `src/app/layout.tsx`
- `src/hooks/use-gif-converter.ts`
- `src/hooks/use-video-converter.ts`
- `package.json`