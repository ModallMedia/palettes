/**
 * Ensures the value is within the 0-360 range for hue.
 */
const wrapHue = (hue: number): number => ((hue % 360) + 360) % 360;

/**
 * Ensures the value is within the 0-100 range for saturation and lightness.
 */
const wrapPercentage = (value: number): number =>
  Math.max(0, Math.min(100, value));

/**
 * Rounds the value to 2 decimal places.
 */
const roundToTwo = (num: number): number => Math.round(num * 100) / 100;

/**
 * Applies wrapping and rounding to the provided HSL object.
 */
const formatColor = (h: number, s: number, l: number) => ({
  h: wrapHue(h),
  s: roundToTwo(wrapPercentage(s)),
  l: roundToTwo(wrapPercentage(l)),
});

// When using the wrapPercentage function, apply it to the `s` and `l` values:
const analogousScheme = (
  h: number,
  s: number,
  l: number
): Array<{ h: number; s: number; l: number }> => {
  return [
    { h: wrapHue(h + 30), s: wrapPercentage(s), l: wrapPercentage(l) },
    { h: wrapHue(h - 30), s: wrapPercentage(s), l: wrapPercentage(l) },
  ]
    .map((color) => ({
      h: color.h,
      s: roundToTwo(color.s),
      l: roundToTwo(color.l),
    }))
    .concat({ h, s, l });
};

// Monochromatic color scheme function
function monochromaticScheme(
  h: number,
  s: number,
  l: number,
  count: number = 4
): Array<{ h: number; s: number; l: number }> {
  return Array.from({ length: count }, (_, i) => ({
    h,
    s,
    l: +(l + (i * (1 - l)) / (count - 1)).toFixed(2), // Generating lighter variations
  }));
}

/**
 * Calculates complementary color scheme.
 */
const complementaryScheme = (
  h: number,
  s: number,
  l: number
): Array<{ h: number; s: number; l: number }> => {
  const newHue = wrapHue(h + 180);
  return [
    { h: newHue, s, l },
    { h, s, l },
  ];
};

/**
 * Calculates split complementary color scheme.
 */
const splitComplementaryScheme = (
  h: number,
  s: number,
  l: number
): Array<{ h: number; s: number; l: number }> => [
  { h: h + 150, s, l },
  { h, s, l },
  { h: h - 150, s, l },
];

/**
 * Calculates triadic color scheme.
 */
const triadicScheme = (
  h: number,
  s: number,
  l: number
): Array<{ h: number; s: number; l: number }> =>
  [formatColor(h + 120, s, l), formatColor(h - 120, s, l)].concat({ h, s, l });

/**
 * Calculates tetradic color scheme.
 */
const tetradicScheme = (
  h: number,
  s: number,
  l: number
): Array<{ h: number; s: number; l: number }> =>
  [
    formatColor(h + 60, s, l),
    formatColor(h + 180, s, l),
    formatColor(h - 60, s, l),
  ].concat({ h, s, l });

/**
 * Calculates square color scheme.
 */
const squareScheme = (
  h: number,
  s: number,
  l: number
): Array<{ h: number; s: number; l: number }> =>
  [
    formatColor(h + 90, s, l),
    formatColor(h + 180, s, l),
    formatColor(h + 270, s, l),
  ].concat({ h, s, l });

export {
  analogousScheme,
  complementaryScheme,
  splitComplementaryScheme,
  triadicScheme,
  tetradicScheme,
  monochromaticScheme,
  squareScheme,
};
