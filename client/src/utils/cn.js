/**
 * Combines class names conditionally.
 */
export function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}
