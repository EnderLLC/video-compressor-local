export const MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024; // 2GB

export interface ValidationResult {
    valid: boolean;
    error?: string;
}

export function validateFileForProcessing(file: File): ValidationResult {
    if (file.size > MAX_FILE_SIZE) {
        return {
            valid: false,
            error: `Dosya boyutu çok büyük (${(file.size / (1024 * 1024 * 1024)).toFixed(2)} GB). Tarayıcıda işlem yapabilmek için maksimum 2GB önerilir.`
        };
    }

    // Empty file check
    if (file.size === 0) {
        return {
            valid: false,
            error: "Dosya boş (0 byte)."
        };
    }

    return { valid: true };
}
