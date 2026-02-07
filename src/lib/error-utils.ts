export function getFriendlyErrorMessage(error: unknown): string {
    const message = error instanceof Error ? error.message : String(error);

    // FFmpeg / WebAssembly Specific Errors
    if (message.includes("SharedArrayBuffer")) {
        return "Tarayıcınız 'SharedArrayBuffer' özelliğini desteklemiyor veya güvenlik ayarları bunu engelliyor. Lütfen Chrome, Edge veya Firefox'un güncel bir sürümünü kullanın.";
    }

    if (message.includes("OOM") || message.includes("memory") || message.includes("allocation failed")) {
        return "Bellek yetersiz (Out of Memory). İşlem sırasında tarayıcı belleği doldu. Lütfen daha küçük bir dosya deneyin veya diğer sekmeleri kapatın.";
    }

    if (message.includes("ReferenceError: ffmpeg is not defined")) {
        return "Video işleme motoru (FFmpeg) yüklenemedi. Lütfen sayfayı yenileyip tekrar deneyin.";
    }

    return message;
}
