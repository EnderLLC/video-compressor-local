// Supported video/audio formats for conversion
export const SUPPORTED_FORMATS = ['mp4', 'mov', 'avi', 'mkv', 'webm', 'wmv', 'flv', 'ogv', '3gp', 'mp3', 'wav', 'ogg', 'm4a', 'wma', 'gif'] as const;

export type Format = typeof SUPPORTED_FORMATS[number];

// Define which conversions are valid (excluding nonsensical ones)
// Rules:
// - mp3, wav, ogg, m4a, wma are audio only, can be extracted from any video format
// - gif is animated image, can be created from any video format
// - Video-to-video conversions are allowed between all video formats
// - Audio-to-audio conversions allowed between different audio formats
// - Audio-to-video conversions are excluded (mp3 -> mp4, etc.)
// - Same format conversions are excluded (already same)
export const VALID_CONVERSIONS: { from: Format; to: Format }[] = (() => {
  const conversions: { from: Format; to: Format }[] = [];
  const videoFormats: Format[] = ['mp4', 'mov', 'avi', 'mkv', 'webm', 'wmv', 'flv', 'ogv', '3gp'];
  const audioFormats: Format[] = ['mp3', 'wav', 'ogg', 'm4a', 'wma'];
  const imageFormats: Format[] = ['gif'];

  // Video to video
  for (const from of videoFormats) {
    for (const to of videoFormats) {
      if (from !== to) {
        conversions.push({ from, to });
      }
    }
  }

  // Video to audio (extract audio)
  for (const from of videoFormats) {
    for (const to of audioFormats) {
      conversions.push({ from, to });
    }
  }

  // Video to gif
  for (const from of videoFormats) {
    for (const to of imageFormats) {
      conversions.push({ from, to });
    }
  }

  // Audio to audio (convert between audio formats)
  for (const from of audioFormats) {
    for (const to of audioFormats) {
      if (from !== to) {
        conversions.push({ from, to });
      }
    }
  }

  // Audio to video? Exclude (not meaningful)
  // Audio to gif? Exclude.
  // Gif to anything? Exclude (gif is output only)
  // (If you want gif -> mp4 later, you can add)
  return conversions;
})();

// Helper to check if a conversion is valid
export function isValidConversion(from: Format, to: Format): boolean {
  return VALID_CONVERSIONS.some(c => c.from === from && c.to === to);
}

// Helper to parse slug like "mov-to-mp4"
export function parseSlug(slug: string): { from: Format; to: Format } | null {
  const match = slug.match(/^([a-z0-9]+)-to-([a-z0-9]+)$/);
  if (!match) return null;
  const [, from, to] = match;
  if (!SUPPORTED_FORMATS.includes(from as Format) || !SUPPORTED_FORMATS.includes(to as Format)) {
    return null;
  }
  if (!isValidConversion(from as Format, to as Format)) {
    return null;
  }
  return { from: from as Format, to: to as Format };
}

// Generate all possible slugs for sitemap
export function getAllSlugs(): string[] {
  return VALID_CONVERSIONS.map(({ from, to }) => `${from}-to-${to}`);
}