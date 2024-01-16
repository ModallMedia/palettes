//* Sanitize and validate HEX input
export const sanitizeHex = (hex: string) => {
  const sanitizedHex = hex.replace(/^#/, "").toUpperCase();
  // Validate hex code
  return /^[0-9A-F]{6}$/i.test(sanitizedHex) ? sanitizedHex : null;
};
