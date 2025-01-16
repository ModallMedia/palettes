'use client'
import React, { useEffect, useState } from 'react'
import { ColorDisplay } from './colorDisplay'
import ColorPicker, { Color, hexToHsl, sanitizeHex } from './colorPicker'
import { DynamicColorDisplay } from './dynamicColorDisplay'
import { useDebounce } from 'use-debounce'
import { Slider } from '../slider'

const descriptions = {
  to_light:
    'This gradient returns a solid hex code that simulates if the color you selected were to overlay white and have the opacity incrementally set to 0%',
  to_dark:
    'This gradient returns a solid hex code that simulates if the color you selected were to overlay black and have the opacity incrementally set to 0%',
  from_light_to_dark:
    'This gradient returns a solid hex code that simulates if the color you selected were to overlay black & white and have the opacity incrementally set to 0% in both directions',
  gradient:
    'This gradient returns tones of the color you selected that are incrementally lighter and darker. This gradient uses the HSL color space to generate the tones by adjusting the lightness.',
}

export default function useGradientStops(hex: string, count: number) {
  const [gradientData, setGradientData] = useState<any>(null)

  // Using 100ms delay as specified
  const [debouncedHex] = useDebounce(hex, 100)

  useEffect(() => {
    const fetchGradientStops = async () => {
      try {
        const request = await fetch(
          `/api/v1/gradient-stops?color=${encodeURIComponent(
            debouncedHex,
          )}&count=${count}`,
        )
        const response = await request.json()
        setGradientData(response)
      } catch (error) {
        console.error('Error fetching gradient stops:', error)
      }
    }

    if (debouncedHex && count > 0) {
      fetchGradientStops()
    }
  }, [debouncedHex, count])

  return gradientData
}

export function GradientColorDemo() {
  const [color, setColor] = useState<Color>(() => {
    const hex = '#F8D6AF'
    const hsl = hexToHsl({ hex: hex })
    return { ...hsl, hex: sanitizeHex(hex) }
  })

  const [count, setCount] = useState(10)
  const gradientStops = useGradientStops(color.hex, count)
  console.log(gradientStops)

  return (
    <div className="flex max-w-3xl flex-col lg:max-w-5xl">
      <div className="not-prose flex w-full max-w-3xl gap-4 border-t border-zinc-900/5 pt-10 max-sm:flex-col max-sm:justify-center first:max-sm:mx-auto lg:max-w-5xl ">
        <ColorPicker color={color} setColor={setColor} />
        <ColorDisplay color={color} />
      </div>
      <div className="my-8 flex flex-col space-y-4">
        <label className="text-lg font-semibold">Count</label>

        <Slider
          {...{ track_cn: color.hex as any }}
          min={5}
          max={25}
          step={1}
          value={[count]}
          onValueChange={([value]) => setCount(value)}
          className="w-full"
        />

        <div className="flex justify-between">
          {['5', '10', '15', '20', '25'].map((mark) => (
            <span
              key={mark}
              className="text-muted-foreground text-sm font-medium"
            >
              {mark}
            </span>
          ))}
        </div>
      </div>

      <div className="not-prose mb-2 grid grid-cols-1 flex-wrap gap-4 gap-y-4 pt-4">
        {gradientStops && (
          <>
            {Object.keys(gradientStops).map((schemeName: any) => {
              const schemeColors = gradientStops[schemeName]
              const description =
                descriptions[schemeName as keyof typeof descriptions]

              const scheme_colors_enhanced = schemeColors.map((e: any) => ({
                ...e,
                hsl: hexToHsl({ hex: e.hex }),
              }))

              return (
                <DynamicColorDisplay
                  key={schemeName}
                  colors={scheme_colors_enhanced}
                  title={schemeName.replaceAll('_', ' ')}
                  description={description}
                />
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}
