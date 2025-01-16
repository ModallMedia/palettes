'use client'
import React, { useEffect, useState } from 'react'
import { ColorDisplay } from './colorDisplay'
import ColorPicker, { Color, hexToHsl, sanitizeHex } from './colorPicker'
import { DynamicColorDisplay } from './dynamicColorDisplay'
import { useDebounce } from 'use-debounce'

export default function useColorHarmony(hex: string) {
  const [harmonyData, setHarmonyData] = useState<any | null>(null)
  const [debouncedHex] = useDebounce(hex, 50)

  useEffect(() => {
    const fetchHarmony = async () => {
      try {
        const request = await fetch(
          `/api/v1/color-harmony?color=${encodeURIComponent(debouncedHex)}`,
        )
        const response = await request.json()
        setHarmonyData(response)
      } catch (error) {
        console.error('Error fetching color harmony:', error)
      }
    }

    if (debouncedHex) {
      fetchHarmony()
    }
  }, [debouncedHex])

  return harmonyData
}

export function ColorHarmonyDemo() {
  const [color, setColor] = useState<Color>(() => {
    const hex = '#F8D6AF'
    const hsl = hexToHsl({ hex: hex })
    return { ...hsl, hex: sanitizeHex(hex) }
  })
  const response = useColorHarmony(color.hex)

  console.log({ response })
  return (
    <div className="flex max-w-3xl flex-col lg:max-w-5xl">
      <div className="not-prose flex w-full max-w-3xl gap-4 border-t border-zinc-900/5 pt-10 max-sm:flex-col max-sm:justify-center first:max-sm:mx-auto lg:max-w-5xl ">
        <ColorPicker color={color} setColor={setColor} />
        <ColorDisplay color={color} />
      </div>
      <div className="not-prose mb-2 grid grid-cols-1 flex-wrap gap-4 gap-y-4 pt-4 md:grid-cols-2">
        {response !== null && (
          <>
            {Object.keys(response).map((schemeName) => {
              const schemeColors = response[schemeName]
              return (
                <DynamicColorDisplay
                  key={schemeName}
                  colors={schemeColors}
                  title={
                    schemeName.toLowerCase() === 'splitcomplementary'
                      ? 'Split Complementary'
                      : schemeName
                  }
                />
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}
