'use client'
import React, { useEffect, useState } from 'react'
import { ColorDisplay } from './colorDisplay'
import ColorPicker from './colorPicker'
import { isColorDark } from '@/lib/color/helpers/isColorDark'
import { DynamicColorDisplay } from './dynamicColorDisplay'

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
