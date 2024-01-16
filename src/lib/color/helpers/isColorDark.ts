export const isColorDark = (hex: string): boolean => {

  try {
  const rgbArray = hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g)!
    .map((x) => parseInt(x, 16));
  const [r, g, b] = rgbArray;
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 128 ? true : false;
} catch (err){
  return false
}
};
