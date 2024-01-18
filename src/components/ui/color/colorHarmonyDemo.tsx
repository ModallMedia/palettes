'use client'
import React, { useEffect, useState } from 'react'
import { ColorDisplay } from './colorDisplay'
import ColorPicker from './colorPicker'
import { DynamicColorDisplay } from './dynamicColorDisplay'

export function ColorHarmonyDemo() {
  const [hex, setHex] = useState('#F8D7B1')
  const [response, setResponse] = useState<any>(null)
  console.log(hex)
  useEffect(() => {
    const makeReq = async () => {
      const request = await fetch(
        `/api/v1/color-harmony?color=${encodeURIComponent(hex)}`,
      )
      const response = await request.json()
      setResponse(response)
    }
    makeReq()
  }, [hex])

  console.log(response)
  return (
    <div className="flex max-w-3xl flex-col lg:max-w-5xl">
      <div className="not-prose flex w-full max-w-3xl gap-4 border-t border-zinc-900/5 pt-10 max-sm:flex-col max-sm:justify-center first:max-sm:mx-auto lg:max-w-5xl ">
        <ColorPicker hex={hex} setHex={setHex} />
        <ColorDisplay hex={hex} />
      </div>
      <div className="not-prose mb-2 grid grid-cols-1 flex-wrap gap-4 gap-y-4 pt-4 md:grid-cols-2">
        {response !== null && (
          <>
            {Object.keys(response).map((schemeName) => {
              const schemeColors = response[schemeName]
              return (
                <DynamicColorDisplay
                  key={schemeName}
                  colors={schemeColors.map(({ hex }: { hex: string }) => hex)}
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
