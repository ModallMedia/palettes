import { convertToRGB } from '@/components/utils/convertToRGB'

export function handleInputColor(
  url: string,
  multiple = false,
): { r: number; g: number; b: number } | { r: number; g: number; b: number }[] {
  const { searchParams } = new URL(url)
  if (multiple) {
    const colors = searchParams.getAll('color')
    // Ensure colors is an array and has at least 2 items
    if (!Array.isArray(colors) || colors.length < 2) {
      throw new Error('Please provide at least 2 colors.')
    }
    return colors.map((colorString) => {
      const inputRgb = convertToRGB(colorString)
      if (!inputRgb) {
        throw new Error(`Invalid color format: ${colorString}`)
      }
      return inputRgb
    })
  } else {
    const color = searchParams.get('color')
    if (typeof color !== 'string') {
      throw new Error('Invalid color value.')
    }
    const inputRgb = convertToRGB(color)
    if (!inputRgb) {
      throw new Error(`Invalid color format: ${color}`)
    }
    return inputRgb
  }
}
