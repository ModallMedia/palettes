import { rgbToHex } from "./colorConversions";

/**
 * Blends two hex colors together by averaging their RGB components.
 */
interface RGB {
  r: number;
  g: number;
  b: number;
}

export const blendMultipleHexColors = (colors: RGB[]): string => {
  if (colors.length === 0) {
    throw new Error("No colors provided for blending.");
  }

  // Sum up all color components
  const totalRgb = colors.reduce(
    (acc, color) => {
      acc.r += color.r;
      acc.g += color.g;
      acc.b += color.b;
      return acc;
    },
    { r: 0, g: 0, b: 0 }
  );

  // Calculate the average for each color component
  const averageRgb = {
    r: Math.round(totalRgb.r / colors.length),
    g: Math.round(totalRgb.g / colors.length),
    b: Math.round(totalRgb.b / colors.length),
  };

  return rgbToHex(averageRgb.r, averageRgb.g, averageRgb.b);
};
