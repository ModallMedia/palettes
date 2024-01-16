'use client'
import React, { useEffect, useState } from 'react'
import { ColorDisplay } from './colorDisplay'
import ColorPicker from './colorPicker'
import { isColorDark } from '@/lib/color/helpers/isColorDark'

// a function that converts a hex code with or without the # to an hsl object

function hexToHsl(hex: string) {}

const ColorContainer = ({
  hex,
  hsl,
  className,
}: {
  hex: string
  hsl?: { h: number; s: number; l: number }
  className: string
}) => {
  const isDark = isColorDark(hex)

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('#' + hex.toUpperCase())
      // You can display some sort of confirmation to the user if you like
      console.log('Color copied to clipboard:', hex)
    } catch (err) {
      console.error('Failed to copy color to clipboard', err)
    }
  }

  return (
    <div
      className={className + ' flex grow items-end p-4'}
      style={{
        background: hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : hex,
      }}
    >
      <button
        aria-label="copy-hex-code"
        onClick={handleCopyToClipboard}
        className={
          isDark
            ? `rounded-md p-1 text-sm font-medium text-zinc-900  duration-75 hover:bg-black/10 group-hover:opacity-100 lg:px-2`
            : `rounded-md p-1 text-sm font-medium text-zinc-100  duration-75 hover:bg-white/10 group-hover:opacity-100 lg:px-2`
        }
      >
        {hex.toUpperCase()}
      </button>
    </div>
  )
}
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
      <div className="flex w-full gap-4 py-4">
        <ColorPicker hex={hex} setHex={setHex} />
        <ColorDisplay hex={hex} />
      </div>
      <div className="not-prose mb-2 flex flex-wrap gap-y-4 border-t border-zinc-950/5 pt-4">
        {response !== null && (
          <>
            {Object.keys(response).map((schemeName) => {
              const schemeColors = response[schemeName]
              const columnClass = `grid grid-cols-${
                schemeColors.length + 1
              } w-full`

              return (
                <div
                  className="flex w-1/2 flex-col gap-4 odd:pr-2 even:pl-2"
                  key={schemeName}
                >
                  <h2 className="col-span-full w-full font-bold capitalize ">
                    {schemeName.toLowerCase() === 'splitcomplementary'
                      ? 'Split Complementary'
                      : schemeName}
                  </h2>
                  <div className="flex w-full flex-row">
                    {schemeColors.map((color: any, index: number) => (
                      <ColorContainer
                        key={index}
                        className={'p-4 first:rounded-l-2xl last:rounded-r-2xl'}
                        hex={color.hex}
                        hsl={color.hsl}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}
