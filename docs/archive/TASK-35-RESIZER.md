# TASK-35: Video Resizer (Aspect Ratio Changer)

**Durum:** 🟢 Aktif
**Öncelik:** 🎬 Video Tools

## 🎯 HEDEF
Videonun en boy oranını değiştirmek (Örn: 16:9 -> 9:16) ve boşlukları renkle doldurmak.

## 📋 ALT GÖREVLER
- [ ] **ADIM 1: Dokümantasyon**
  - [ ] `docs/project-status.md` dosyasını güncelle (Aktif Task: TASK-35).
  - [ ] `docs/current-task.md` dosyasını arşivle (`docs/archive/TASK-34-AUDIO-CONVERT.md`).
  - [ ] `docs/current-task.md` dosyasını temizle ve TASK-35 için hazırla.
- [ ] **ADIM 2: Resizer Logic (Hook)**
  - [ ] `src/hooks/use-video-resizer.ts` oluştur.
  - **Parametreler:** `targetRatio` (string: "16:9", "9:16", "1:1", "4:5"), `backgroundColor` (string: "black", "white").
  - **FFmpeg Mantığı (Pad Filter):**
    - Hedef çözünürlüğü belirle (Örn: 9:16 için 720x1280, 1:1 için 1080x1080 vb. - Genelde 1080p baz alınır).
    - Komut: Videoyu orantılı olarak scale et, sonra `pad` filtresi ile tuvale ortala.
    - Örnek (Yatay videoyu Dikey yapma):
      `scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=black`
    - *Açıklama:* Önce videoyu 1080x1920 içine sığacak kadar küçült (`decrease`), sonra 1080x1920'ye tamamla (`pad`), videoyu ortala (`(ow-iw)/2`) ve boşlukları siyah yap.
  - **Çıktı:** Yeniden boyutlandırılmış video dosyası.
- [ ] **ADIM 3: UI Bileşeni**
  - [ ] `src/components/features/video-resizer.tsx` oluştur.
  - **Tasarım:**
    - Dropzone.
    - **Aspect Ratio Seçimi:** Butonlar veya Select (Instagram 1:1, TikTok 9:16, YouTube 16:9, Portrait 4:5).
    - **Background Color:** Basit renk paleti (Siyah, Beyaz).
    - "Resize Video" butonu.
- [ ] **ADIM 4: Sayfa ve Entegrasyon**
  - [ ] `src/app/resize-video/page.tsx` oluştur.
  - **Metadata:** Title: "Resize Video for Instagram, TikTok & YouTube Online".
  - **Global:** Navbar ve Footer'a "Resize Video" linkini ekle.
  - **Grid:** `src/app/page.tsx` içindeki `TOOLS` array'ine "Video Resizer" ekle (Icon: `MonitorPlay` veya `Scaling`).
- [ ] **ADIM 5: Test**
  - [ ] `npm run dev` ile test et.
  - [ ] Yatay bir video yükle, "9:16 (TikTok)" ve "Black" seç.
  - [ ] Çıkan videonun dikey olduğunu ve videonun ortada durup alt‑üstün siyah olduğunu doğrula.

## ✅ TAMAMLANMA KRİTERLERİ
- [ ] `use-video-resizer.ts` hook'u oluşturuldu ve FFmpeg pad filtresiyle çalışıyor.
- [ ] `video-resizer.tsx` bileşeni oluşturuldu, aspect ratio ve background color seçimi doğru çalışıyor.
- [ ] `resize-video/page.tsx` sayfası oluşturuldu, metadata ve ads entegrasyonu tamam.
- [ ] Navbar, Footer ve Ana Sayfa Grid'inde "Resize Video" linki eklendi.
- [ ] Test sonucu: Yatay video başarıyla dikey formata dönüştürüldü, boşluklar siyah dolgu.

## 📂 İLGİLİ DOSYALAR
- `src/hooks/use-video-resizer.ts`
- `src/components/features/video-resizer.tsx`
- `src/app/resize-video/page.tsx`
- `src/config/ads.ts`
- `src/components/layout/navbar.tsx`
- `src/components/layout/footer.tsx`
- `src/context/workspace-context.tsx`