'use client'

import React, { useEffect, useState } from 'react'
import { ColorDisplay } from './colorDisplay'
import ColorPicker, { Color, hexToHsl, sanitizeHex } from './colorPicker'
import { useDebounce } from 'use-debounce'

export function useBlendColors(color1: Color, color2: Color) {
  const [output, setOutput] = useState<Color | null>(null)

  // Debounce both color values
  const [debouncedColor1] = useDebounce(color1, 100)
  const [debouncedColor2] = useDebounce(color2, 100)

  useEffect(() => {
    const fetchBlended = async () => {
      try {
        const url = `/api/v1/blend-colors?color=${encodeURIComponent(
          debouncedColor1.hex,
        )}&color=${encodeURIComponent(debouncedColor2.hex)}`

        const request = await fetch(url)
        const response = await request.json()
        const blended_hex = response.blendedColor
        const hsl = hexToHsl({ hex: blended_hex })

        setOutput({
          ...hsl,
          hex: sanitizeHex(blended_hex),
        })
      } catch (error) {
        console.error('Error blending colors:', error)
        // You might want to set an error state here
      }
    }

    if (debouncedColor1?.hex && debouncedColor2?.hex) {
      fetchBlended()
    }
  }, [debouncedColor1, debouncedColor2])

  return output
}

function BlendingColorsDemo() {
  const [color, setColor] = useState<Color>(() => {
    const hex = '#0000EC'
    const hsl = hexToHsl({ hex: hex })
    return { ...hsl, hex: sanitizeHex(hex) }
  })
  const [color2, setColor2] = useState<Color>(() => {
    const hex = '#780076'
    const hsl = hexToHsl({ hex: hex })
    return { ...hsl, hex: sanitizeHex(hex) }
  })
  const output = useBlendColors(color, color2)

  return (
    <div className="not-prose flex w-full max-w-3xl flex-col flex-wrap items-center justify-center gap-4 py-4 xl:max-w-5xl xl:flex-row">
      <ColorPicker color={color} setColor={setColor} />
      <div className="w-full max-w-[305px] xl:max-w-none xl:flex-1">
        {output && <ColorDisplay color={output} />}
      </div>
      <ColorPicker color={color2} setColor={setColor2} />
    </div>
  )
}

export default BlendingColorsDemo
