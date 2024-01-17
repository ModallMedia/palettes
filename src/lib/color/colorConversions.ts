//* Convert HEX to RGB
export const hexToRgb = (
  hex: string,
): { r: number; g: number; b: number } | null => {
  // Validate hex code
  if (!/^[0-9A-F]{6}$/i.test(hex)) return null

  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)

  return { r, g, b }
}

export function rgbToHex(r: number, g: number, b: number): string {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
      })
      .join('')
  )
}

// Converts an RGB color value to HSL. Conversion formula adapted from http://en.wikipedia.org/wiki/HSL_color_space.
// Assumes r, g, and b are contained in the set [0, 255] and returns h, s, and l in the set [0, 1].
export function rgbToHsl(
  r: number,
  g: number,
  b: number,
): { h: number; s: number; l: number } {
  ;(r /= 255), (g /= 255), (b /= 255)
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b)
  let h: number = 0 // Initialized to 0 to ensure it's never undefined
  let s: number,
    l = (max + min) / 2

  if (max === min) {
    s = 0 // Achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    if (max === r) {
      h = (g - b) / d + (g < b ? 6 : 0)
    } else if (max === g) {
      h = (b - r) / d + 2
    } else if (max === b) {
      h = (r - g) / d + 4
    }
    h /= 6
  }

  return { h: h * 360, s: s * 100, l: l * 100 }
}

// Converts an HSL color value to RGB. Conversion formula adapted from http://en.wikipedia.org/wiki/HSL_color_space.
// Assumes h, s, and l are contained in the set [0, 1] and returns r, g, and b in the set [0, 255].
export function hslToRgb(
  h: number,
  s: number,
  l: number,
): { r: number; g: number; b: number } {
  let r, g, b

  if (s === 0) {
    r = g = b = l // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  }
}

export function hslToHex(h: number, s: number, l: number): string {
  s /= 100
  l /= 100

  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => l - a * Math.max(Math.min(k(n) - 3, 9 - k(n), 1), -1)
  let r = Math.round(255 * f(0))
  let g = Math.round(255 * f(8))
  let b = Math.round(255 * f(4))

  const toHex = (x: number) => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export function hexToHsl(hex: string): [number, number, number] {
  // Ensure the hex string is formatted properly
  hex = hex.startsWith('#') ? hex : `#${hex}`

  // Convert hex to RGB
  let r = parseInt(hex.slice(1, 3), 16)
  let g = parseInt(hex.slice(3, 5), 16)
  let b = parseInt(hex.slice(5, 7), 16)

  // Then convert RGB to HSL
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0 // Initialize h to 0
  let s: number
  let l = (max + min) / 2

  if (max === min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
    h *= 360 // Convert to degrees on the color circle
  }

  // Convert s and l to percentages
  s *= 100
  l *= 100

  return [Math.round(h), Math.round(s), Math.round(l)]
}

/**
 * Convert RGB to HSB.
 */
export const rgbToHsb = (
  r: number,
  g: number,
  blue: number,
): { h: number; s: number; b: number } => {
  r /= 255
  g /= 255
  blue /= 255
  const max = Math.max(r, g, blue),
    min = Math.min(r, g, blue)
  const d = max - min
  const s = max === 0 ? 0 : d / max
  const b = max
  let h = 0
  switch (max) {
    case min:
      h = 0
      break
    case r:
      h = (g - b) / d + (g < b ? 6 : 0)
      break
    case g:
      h = (b - r) / d + 2
      break
    case b:
      h = (r - g) / d + 4
      break
  }
  h /= 6
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    b: Math.round(b * 100),
  }
}

/**
 * Convert RGB to CMYK.
 */
export const rgbToCmyk = (
  r: number,
  g: number,
  b: number,
): { c: number; m: number; y: number; k: number } => {
  const c = 1 - r / 255
  const m = 1 - g / 255
  const y = 1 - b / 255
  const k = Math.min(c, Math.min(m, y))
  return {
    c: (c - k) / (1 - k),
    m: (m - k) / (1 - k),
    y: (y - k) / (1 - k),
    k,
  }
}

// RGB to XYZ conversion constants
const RGB_TO_XYZ_MATRIX = {
  rX: 0.4124564,
  rY: 0.2126729,
  rZ: 0.0193339,
  gX: 0.3575761,
  gY: 0.7151522,
  gZ: 0.119192,
  bX: 0.1804375,
  bY: 0.072175,
  bZ: 0.9503041,
}

/**
 * Converts an RGB color value to XYZ using the sRGB color space.
 * The RGB values must be in the range [0, 255].
 * The returned XYZ values are in the D65/2° standard illuminant.
 */
export const rgbToXyz = (
  r: number,
  g: number,
  b: number,
): { x: number; y: number; z: number } => {
  // Convert RGB to the [0, 1] range
  r = r / 255
  g = g / 255
  b = b / 255

  // Assume sRGB
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92

  // Apply the RGB to XYZ transformation matrix
  const x =
    r * RGB_TO_XYZ_MATRIX.rX +
    g * RGB_TO_XYZ_MATRIX.gX +
    b * RGB_TO_XYZ_MATRIX.bX
  const y =
    r * RGB_TO_XYZ_MATRIX.rY +
    g * RGB_TO_XYZ_MATRIX.gY +
    b * RGB_TO_XYZ_MATRIX.bY
  const z =
    r * RGB_TO_XYZ_MATRIX.rZ +
    g * RGB_TO_XYZ_MATRIX.gZ +
    b * RGB_TO_XYZ_MATRIX.bZ

  // Scale the values based on a reference white point
  return {
    x: x * 100,
    y: y * 100,
    z: z * 100,
  }
}

/**
 * Convert RGB to LAB.
 */
export const rgbToLab = (
  r: number,
  g: number,
  blue: number,
): { l: number; a: number; b: number } => {
  // First, convert values to XYZ color space
  const { x, y, z } = rgbToXyz(r, g, blue)
  // Then, convert XYZ to LAB
  let l = 116 * y - 16
  const a = 500 * (x - y)
  const b = 200 * (y - z)
  l = l / 100
  return { l, a, b }
}

export function parseRGB(rgbString: string): [number, number, number] | null {
  const match = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
  if (!match) return null
  return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])]
}

export function parseHSL(hslString: string): [number, number, number] | null {
  const match = hslString.match(
    /hsl\((\d+(\.\d+)?),\s*(\d+(\.\d+)?)%,\s*(\d+(\.\d+)?)%\)/,
  )
  if (!match) return null
  return [
    parseFloat(match[1]),
    parseFloat(match[3]) / 100,
    parseFloat(match[5]) / 100,
  ] // H, S, L are normalized to 0-1
}
