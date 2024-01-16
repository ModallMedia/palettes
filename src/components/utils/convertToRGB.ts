import { hslToRgb } from '@/lib/color/colorConversions'

/**
 * A utility function to convert various color formats to RGB.
 */
export function convertToRGB(
  color: string,
): { r: number; g: number; b: number } | null {
  // Normalize the hex color by removing the '#' if present
  color = color.replace(/^#/, '')

  // HEX format (with or without '#')
  const hexMatch = color.match(/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
  if (hexMatch) {
    return {
      r: parseInt(hexMatch[1], 16),
      g: parseInt(hexMatch[2], 16),
      b: parseInt(hexMatch[3], 16),
    }
  }

  // RGB format
  const rgbMatch = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i)
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1]),
      g: parseInt(rgbMatch[2]),
      b: parseInt(rgbMatch[3]),
    }
  }

  // HSL format
  const hslMatch = color.match(/^hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)$/i)
  if (hslMatch) {
    return hslToRgb(
      parseInt(hslMatch[1]),
      parseInt(hslMatch[2]),
      parseInt(hslMatch[3]),
    )
  }

  // If none of the above formats match, return null.
  return null
}
