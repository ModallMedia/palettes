'use client'

import React, { useEffect, useState } from 'react'
import { ColorDisplay } from './colorDisplay'
import ColorPicker from './colorPicker'

function BlendingColorsDemo() {
  const [hex1, setHex1] = useState('#EF0000')
  const [hex2, setHex2] = useState('#0000EC')

  const [hex, setHex] = useState('#780076')

  useEffect(() => {
    const fetchBlended = async () => {
      const url = `/api/v1/blend-colors?color=${encodeURIComponent(
        hex1,
      )}&color=${encodeURIComponent(hex2)}`
      const request = await fetch(url)
      const response = await request.json()
      setHex(response.blendedColor) // Ensure that 'response.blendedColor' is the correct key
    }

    fetchBlended()
  }, [hex1, hex2])

  return (
    <div className="not-prose flex w-full max-w-3xl flex-wrap justify-center gap-4 py-4 lg:max-w-5xl xl:flex-nowrap">
      <div className="w-full shrink-0 min-[350px]:w-[320px] xl:order-1">
        <ColorPicker h={1} s={100} l={46} hex={hex1} setHex={setHex1} />
      </div>
      <div className="order-3 w-full xl:order-2 xl:min-w-[275px]">
        {hex && <ColorDisplay hex={hex} />}
      </div>
      <div className="w-full shrink-0 min-[350px]:w-[320px] xl:order-3">
        <ColorPicker h={240} s={100} l={46} hex={hex2} setHex={setHex2} />
      </div>{' '}
    </div>
  )
}

export default BlendingColorsDemo
