'use client'
import React, { useState } from 'react'
import { ColorDisplay } from './colorDisplay'
import ColorPicker, { Color, hexToHsl, sanitizeHex } from './colorPicker'

function ColorPickerAndDisplay() {
  // Initialize from controlled prop or a default
  const [color, setColor] = useState<Color>(() => {
    const hex = '#F8D6AF'
    const hsl = hexToHsl({ hex: hex })
    return { ...hsl, hex: sanitizeHex(hex) }
  })

  return (
    <div className="not-prose flex w-full max-w-3xl gap-4 border-t border-zinc-900/5 pt-10 max-sm:flex-col max-sm:justify-center first:max-sm:mx-auto lg:max-w-5xl ">
      <ColorPicker color={color} setColor={setColor} />
      <ColorDisplay color={color} />
    </div>
  )
}

export default ColorPickerAndDisplay
