import { convertToRGB } from '@/components/utils/convertToRGB'
import { blendMultipleHexColors } from '@/lib/color/blendColors'
import { handleInputColor } from '@/lib/color/handleInputColor'

export async function GET(req: Request, { params }: any) {
  let colors
  try {
    colors = handleInputColor(req.url, true)
    // console.log(colors)
  } catch (error) {
    // console.log(error)
    return new Response(JSON.stringify({ error: error }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (!Array.isArray(colors)) {
    return new Response(
      JSON.stringify({ error: 'Please provide only one color.' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
  // Blend all RGB colors together
  const blendedColor = blendMultipleHexColors(colors)

  return new Response(
    JSON.stringify({ blendedColor, originalColors: colors }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    },
  )
}
