export const normalizeExtractedText = (text = "") => {
  return text
    .replace(/\r/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
};

export const getWordCount = (text = "") => {
  if (!text.trim()) return 0;

  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
};