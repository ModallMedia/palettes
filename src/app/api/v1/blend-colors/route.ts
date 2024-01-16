import { convertToRGB } from '@/components/utils/convertToRGB'
import { blendMultipleHexColors } from '@/lib/color/blendColors'

export async function GET(req: Request, { params }: any) {
  const { searchParams } = new URL(req.url)
  const colors = searchParams.getAll('colors')

  console.log({ colors }, searchParams)

  // Ensure colors is an array
  if (!Array.isArray(colors)) {
    return new Response(JSON.stringify({ error: 'Invalid query params.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (colors.length < 2) {
    return new Response(
      JSON.stringify({ error: 'Please provide at least 2 colors.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    )
  }

  // Validate and convert each color to RGB
  const rgbColors = colors.map((color) => {
    if (typeof color !== 'string') {
      throw new Error('Invalid color value.')
    }
    const rgb = convertToRGB(color)
    if (!rgb) {
      throw new Error(`Invalid color format: ${color}`)
    }
    return rgb
  })

  // Blend all RGB colors together
  const blendedColor = blendMultipleHexColors(rgbColors)

  return new Response(
    JSON.stringify({ blendedColor, originalColors: colors }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    },
  )
}
