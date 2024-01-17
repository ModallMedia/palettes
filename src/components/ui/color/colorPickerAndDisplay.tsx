'use client'
import React, { useState } from 'react'
import { ColorDisplay } from './colorDisplay'
import ColorPicker from './colorPicker'

function ColorPickerAndDisplay() {
  const [hex, setHex] = useState('#F8D7B1')

  return (
    <div className="not-prose flex w-full max-w-3xl gap-4 border-t border-zinc-900/5 pt-10 max-sm:flex-col max-sm:justify-center first:max-sm:mx-auto lg:max-w-5xl ">
      <ColorPicker hex={hex} setHex={setHex} />
      <ColorDisplay hex={hex} />
    </div>
  )
}

export default ColorPickerAndDisplay
