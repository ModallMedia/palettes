import { hexToRgb, rgbToHex } from './colorConversions'

function calculateGradientSteps(
  rgb: { r: number; g: number; b: number },
  count: number,
  toLight: boolean,
  midpointIncluded: boolean = false,
): { opacity: string; hex: string }[] {
  if (count < 2) {
    throw new Error('At least two steps are required for a gradient.')
  }

  const gradient: { opacity: string; hex: string }[] = []

  const { r, g, b } = rgb
  const stepCount = midpointIncluded ? count - 1 : count
  const stepSize = 1 / stepCount

  for (let i = 0; i < count; i++) {
    const scale = toLight
      ? (midpointIncluded ? stepCount - i : i) * stepSize
      : i * stepSize
    const endValue = toLight ? 255 : 0

    const newR = Math.round(r + scale * (endValue - r))
    const newG = Math.round(g + scale * (endValue - g))
    const newB = Math.round(b + scale * (endValue - b))

    const opacityPercentage = toLight
      ? 100 - Math.round(scale * 100)
      : Math.round(scale * 100)
    const clampedOpacity = Math.max(0, Math.min(100, opacityPercentage))
    const opacity = `${clampedOpacity}%`

    gradient.push({
      opacity,
      hex: rgbToHex(newR, newG, newB),
    })
  }

  return gradient
}

export function generateGradients(
  inputRgb: { r: number; g: number; b: number },
  count: number = 10,
): {
  to_light: { opacity: string; hex: string }[]
  to_dark: { opacity: string; hex: string }[]
  from_light_to_dark: { opacity: string; hex: string }[]
} {
  let newCount = count
  if (count % 2 !== 0) {
    newCount++
  }
  const inputHex = rgbToHex(inputRgb.r, inputRgb.g, inputRgb.b)

  try {
    // Since we need a midpoint, we pass true for midpointIncluded
    const lightHalf = calculateGradientSteps(inputRgb, newCount / 2, true, true)
    const darkHalf = calculateGradientSteps(inputRgb, newCount / 2, false, true)

    // We need to remove the baseColor from the start of darkHalf
    const filteredDarkHalf = darkHalf.filter(({ hex }) => hex !== inputHex)

    const combinedGradient = [...lightHalf, ...filteredDarkHalf]

    return {
      to_light: calculateGradientSteps(inputRgb, count, true).reverse(),
      to_dark: calculateGradientSteps(inputRgb, count, false),
      from_light_to_dark: combinedGradient,
    }
  } catch (err) {
    throw new Error('Generating gradient failed')
  }
}
