import colorData from '@/components/data/color_names.json'
import { calculateDistance } from '@/lib/color/calculateDistance'
import { convertToRGB } from '@/components/utils/convertToRGB'

export async function GET(req: Request, { params }: any) {
  const { searchParams } = new URL(req.url)
  const hex = searchParams.get('hex')

  // Sanitize the input
  if (typeof hex !== 'string') {
    return new Response(JSON.stringify({ error: 'Invalid color HEX code.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let minDistance = Number.MAX_VALUE
  let closestColor = { hex: '', label: '' }
  // Convert HEX to RGB once
  const inputRgb = convertToRGB(hex)
  console.log(hex, inputRgb)
  if (!inputRgb) {
    return new Response(JSON.stringify({ error: 'Invalid color HEX code.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Find the closest color
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
      hex: ('#' + hex).toUpperCase(),
      rgb: inputRgb,
      closest_color: closestColor,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    },
  )
}
