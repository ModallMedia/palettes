import colorData from '@/components/data/color_names.json'
import { calculateDistance } from '@/lib/color/calculateDistance'
import { handleInputColor } from '@/lib/color/handleInputColor'

export async function GET(req: Request) {
  let inputRgb
  try {
    inputRgb = handleInputColor(req.url)
  } catch (error) {
    // console.log(error)
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

  let minDistance = Number.MAX_VALUE
  let closestColor = { hex: '', label: '' }

  for (const color of colorData) {
    const distance = calculateDistance(inputRgb, color.rgb)
    if (distance < minDistance) {
      minDistance = distance
      closestColor = { hex: color.hex, label: color.label }
    }
  }
  return new Response(
    JSON.stringify({
      name: closestColor.label,
      hex: closestColor.hex.toUpperCase(),
      rgb: inputRgb,
      closest_color: closestColor,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    },
  )
}
