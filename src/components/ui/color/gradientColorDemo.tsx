'use client'
import React, { useEffect, useState } from 'react'
import { ColorDisplay } from './colorDisplay'
import ColorPicker from './colorPicker'
import { DynamicColorDisplay } from './dynamicColorDisplay'

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
export function GradientColorDemo() {
  const [hex, setHex] = useState('#F8D7B1')
  const [count, setCount] = useState(10)
  const [response, setResponse] = useState<any>(null)
  console.log(hex)
  useEffect(() => {
    const makeReq = async () => {
      const request = await fetch(
        `/api/v1/gradient-stops?color=${encodeURIComponent(
          hex,
        )}&count=${count}`,
      )
      const response = await request.json()
      setResponse(response)
    }
    makeReq()
  }, [hex, count])

  console.log(response)
  return (
    <div className="flex max-w-3xl flex-col lg:max-w-5xl">
      <div className="not-prose flex w-full max-w-3xl gap-4 border-t border-zinc-900/5 pt-10 max-sm:flex-col max-sm:justify-center first:max-sm:mx-auto lg:max-w-5xl ">
        <ColorPicker hex={hex} setHex={setHex} />
        <ColorDisplay hex={hex} />
      </div>
      <div className="flex flex-col">
        <label className="mt-6 text-lg font-semibold text-zinc-800 dark:text-zinc-200">
          Count
        </label>
        <input
          type="range"
          min={5}
          max={25}
          step={1}
          className="mt-2 h-3 w-full cursor-pointer appearance-none rounded-lg bg-zinc-200 dark:bg-zinc-700"
          value={count}
          onChange={(e) => setCount(+e.target.value)}
        />
        <div className="flex h-min w-full flex-nowrap justify-between">
          {['5', '10', '15', '20', '25'].map((count) => {
            return (
              <p
                key={count}
                className="not-prose my-2 font-medium text-zinc-700 dark:text-zinc-300"
              >
                {count}
              </p>
            )
          })}
        </div>
      </div>
      <div className="not-prose mb-2 grid grid-cols-1 flex-wrap gap-4 gap-y-4 pt-4">
        {response !== null && (
          <>
            {Object.keys(response).map((schemeName: any) => {
              const schemeColors = response[schemeName]
              const description =
                descriptions[schemeName as keyof typeof descriptions]
              return (
                <DynamicColorDisplay
                  key={schemeName}
                  colors={schemeColors.map(({ hex }: { hex: string }) => hex)}
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
