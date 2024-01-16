import {
  hexToRgb,
  hslToRgb,
  rgbToHex,
  rgbToHsl,
} from '@/lib/color/colorConversions'
import { sanitizeHex } from '@/lib/color/sanitizeHex'
import { generateGradients } from '@/lib/color/generateGradient'
function generateGradientWithInputColor(
  hexColor: string,
  count = 24,
): {
  gradient: string[]
  inputIndex: number
} {
  // Convert the hex color to HSL
  const rgb = hexToRgb(hexColor)
  if (!rgb) {
    throw new Error('hex to rgb failed')
  }
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)

  // Prepare the gradient array and find the position for the input color
  let gradient: string[] = []
  let inputIndex: number = 0

  for (let i = 0; i < count; i++) {
    // Calculate the lightness for this step
    const lightnessStep = i / count

    // Convert HSL back to RGB then to Hex
    const stepRgb = hslToRgb(hsl.h, hsl.s, lightnessStep)
    const stepHex = rgbToHex(stepRgb.r, stepRgb.g, stepRgb.b)
    gradient.push(stepHex)

    // Check if this is the position for the input color
    if (hsl.l >= lightnessStep && hsl.l < lightnessStep + 1 / count) {
      inputIndex = i
    }
  }

  return { gradient, inputIndex }
}

export async function GET(req: Request, { params }: any) {
  const { searchParams } = new URL(req.url)

  const hex = searchParams.get('hex')

  console.log(hex)
  // Sanitize the input
  if (typeof hex !== 'string') {
    return new Response(
      JSON.stringify({
        error: '"Invalid color HEX code."',
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
  // Sanitize the input
  const sanitizedHex = sanitizeHex(hex as string)
  if (!sanitizedHex || !hex) {
    return new Response(
      JSON.stringify({
        error: '"Invalid color HEX code."',
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
  let requestedAmount: number | undefined
  const count = searchParams.get('count')
  if (typeof count === 'string') {
    requestedAmount = +count
  }
  const opacity_gradient = generateGradients(hex, requestedAmount)
  const { gradient, inputIndex } = generateGradientWithInputColor(
    hex,
    requestedAmount,
  )
  gradient[inputIndex] = '#' + sanitizedHex
  return new Response(
    JSON.stringify({
      ...opacity_gradient,
      gradient: gradient
        .map((hex, index) => {
          return { hex: hex, isParam: index === inputIndex }
        })
        .reverse(),
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    },
  )
}
