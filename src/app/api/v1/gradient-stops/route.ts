import {
  hexToRgb,
  hslToHex,
  hslToRgb,
  rgbToHex,
  rgbToHsl,
} from '@/lib/color/colorConversions'
import { sanitizeHex } from '@/lib/color/sanitizeHex'
import { generateGradients } from '@/lib/color/generateGradient'
import { handleInputColor } from '@/lib/color/handleInputColor'

function generateGradientWithInputColor(
  rgb: { r: number; g: number; b: number },
  count = 24,
): {
  gradient: string[]
  inputIndex: number
} {
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)

  // Normalize s and l to be fractions of 1
  hsl.s /= 100
  hsl.l /= 100
  console.log(hsl)

  // Prepare the gradient array and find the position for the input color
  let gradient: string[] = []
  let inputIndex: number = 0

  for (let i = 0; i < count; i++) {
    // Calculate the lightness for this step
    const lightnessStep = i / count
    // Convert HSL to Hex
    const stepHex = hslToHex(hsl.h, hsl.s * 100, lightnessStep * 100)
    gradient.push(stepHex)

    // Check if this is the position for the input color
    if (hsl.l >= lightnessStep && hsl.l < lightnessStep + 1 / count) {
      inputIndex = i
    }
  }
  return { gradient, inputIndex }
}

export async function GET(req: Request, { params }: any) {
  let inputRgb
  try {
    inputRgb = handleInputColor(req.url)
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: error }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  if (Array.isArray(inputRgb)) {
    return new Response(
      JSON.stringify({ error: 'Please provide only one color.' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
  const { searchParams } = new URL(req.url)

  let requestedAmount: number | undefined
  const count = searchParams.get('count')
  if (typeof count === 'string') {
    requestedAmount = +count
  }
  const opacity_gradient = generateGradients(inputRgb, requestedAmount)
  const { gradient, inputIndex } = generateGradientWithInputColor(
    inputRgb,
    requestedAmount,
  )
  gradient[inputIndex] = rgbToHex(inputRgb.r, inputRgb.g, inputRgb.b)
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
