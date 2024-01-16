import { convertToRGB } from '@/components/utils/convertToRGB'
import {
  analogousScheme,
  complementaryScheme,
  splitComplementaryScheme,
  triadicScheme,
  tetradicScheme,
  squareScheme,
  monochromaticScheme,
} from '@/components/utils/colorSchemes'
import { hexToRgb, hslToHex, rgbToHsl } from '@/lib/color/colorConversions'

// Define a type for the color scheme generation functions
type ColorSchemeFunction = (
  h: number,
  s: number,
  l: number,
) => Array<{ h: number; s: number; l: number }>

type ColorKeys =
  | 'analogous'
  | 'complementary'
  | 'splitComplementary'
  | 'triadic'
  | 'tetradic'
  | 'square'
  | 'monochromatic'

// Define a type for the object containing all color scheme functions
type ColorSchemes = {
  [key: string]: ColorSchemeFunction
}

// Define all possible schemes with specific type
const allSchemes: ColorSchemes = {
  analogous: (h, s, l) => analogousScheme(h, s, l),
  complementary: (h, s, l) => complementaryScheme(h, s, l),
  splitComplementary: (h, s, l) => splitComplementaryScheme(h, s, l),
  triadic: (h, s, l) => triadicScheme(h, s, l),
  tetradic: (h, s, l) => tetradicScheme(h, s, l),
  square: (h, s, l) => squareScheme(h, s, l),
  monochromatic: (h, s, l) => monochromaticScheme(h, s, l),
}

export async function GET(req: Request, { params }: any) {
  const { searchParams } = new URL(req.url)

  const color = searchParams.get('color')
  const formats = searchParams.get('formats')
  const schemeQuery = searchParams.get('schemes')

  // Sanitize the input
  if (typeof color !== 'string') {
    return new Response(
      JSON.stringify({
        error: '"Invalid query parameter. Color must be a string."',
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }

  const requestedFormats = formats
    ? (formats as string)
        .split(',')
        .map((format) => format.trim().toLowerCase())
    : ['hsl', 'rgb', 'hex']

  // Default to all scheme names if 'schemes' query parameter is not provided
  const requestedSchemes = schemeQuery
    ? (schemeQuery as string)
        .split(',')
        .map((scheme) => scheme.trim().toLowerCase())
    : Object.keys(allSchemes)

  const rgb = convertToRGB(color)
  if (!rgb) {
    return new Response(JSON.stringify({ error: 'Invalid color HEX code.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)

  // Filter out any requested schemes that are not valid
  const validSchemes = requestedSchemes.filter((scheme) => scheme in allSchemes)

  // Generate the color schemes requested by the user
  const filteredSchemes = validSchemes.reduce((obj: any, key) => {
    obj[key] = allSchemes[key as keyof ColorSchemes](hsl.h, hsl.s, hsl.l)
    return obj
  }, {} as ColorSchemes)

  // Convert all scheme colors to the requested formats for the response
  const response = Object.fromEntries(
    Object.entries(filteredSchemes).map(([schemeName, schemeColors]: any) => [
      schemeName,
      schemeColors.map((hslColor: { h: number; s: number; l: number }) => {
        const colorResponse: any = {}
        if (requestedFormats.includes('hsl')) {
          colorResponse.hsl = hslColor
        }
        if (requestedFormats.includes('hex')) {
          colorResponse.hex = hslToHex(hslColor.h, hslColor.s, hslColor.l)
        }
        if (requestedFormats.includes('rgb')) {
          const hex = hslToHex(hslColor.h, hslColor.s, hslColor.l)
          colorResponse.rgb = hexToRgb(hex)
        }
        return colorResponse
      }),
    ]),
  )
  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
