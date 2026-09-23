export function parseYouTubeUrl(url: string): { id: string; isShort: boolean } | null {
  const clean = url.trim();
  if (!clean) return null;

  // Direct 11 character ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(clean)) {
    return { id: clean, isShort: false };
  }

  // Shorts: youtube.com/shorts/ID
  const shortsMatch = clean.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch) {
    return { id: shortsMatch[1], isShort: true };
  }

  // youtu.be/ID
  const youtuBeMatch = clean.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (youtuBeMatch) {
    return { id: youtuBeMatch[1], isShort: false };
  }

  // watch?v=ID
  const watchMatch = clean.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) {
    return { id: watchMatch[1], isShort: false };
  }

  // embed/ID
  const embedMatch = clean.match(/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) {
    return { id: embedMatch[1], isShort: false };
  }

  return null;
}
