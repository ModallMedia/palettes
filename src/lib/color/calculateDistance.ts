//* Calculate the Euclidean distance between two RGB colors
export const calculateDistance = (
  color1: { r: number; g: number; b: number },
  color2: { r: number; g: number; b: number }
) => {
  return Math.sqrt(
    Math.pow(color2.r - color1.r, 2) +
      Math.pow(color2.g - color1.g, 2) +
      Math.pow(color2.b - color1.b, 2)
  );
};
