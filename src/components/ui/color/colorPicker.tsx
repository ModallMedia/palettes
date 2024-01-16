import { hexToHsl, hslToHex } from '@/lib/color/colorConversions'
import React, { useEffect, useRef, useState } from 'react'

const DraggableColorCanvas = ({
  hue,
  saturation,
  setSaturation,
  lightness,
  setLightness,
}: {
  hue: number
  setHue: React.Dispatch<React.SetStateAction<number>>
  saturation: number
  setSaturation: React.Dispatch<React.SetStateAction<number>>
  lightness: number
  setLightness: React.Dispatch<React.SetStateAction<number>>
}) => {
  const [dragging, setDragging] = useState(false)
  const colorAreaRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent) => {
    if (colorAreaRef.current) {
      const rect = colorAreaRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const xClamped = Math.max(0, Math.min(x, rect.width))
      const yClamped = Math.max(0, Math.min(y, rect.height))
      const newSaturation = (xClamped / rect.width) * 100
      const newLightness = 100 - (yClamped / rect.height) * 100
      setSaturation(newSaturation)
      setLightness(newLightness)
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true)
    updateColor(e)
    // Attach the mousemove listener to the window only when dragging starts
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseUp = () => {
    if (dragging) {
      setDragging(false)
      // Detach the mousemove listener from the window once dragging stops
    }
    // Always remove the mouseup listener when it's triggered
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
  }

  const updateColor = (e: React.MouseEvent<HTMLDivElement>) => {
    if (colorAreaRef.current) {
      const rect = colorAreaRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const xClamped = Math.max(0, Math.min(x, rect.width))
      const yClamped = Math.max(0, Math.min(y, rect.height))
      const newSaturation = Math.round((xClamped / rect.width) * 100)
      const newLightness = 100 - Math.round((yClamped / rect.height) * 100)
      setSaturation(newSaturation)
      setLightness(newLightness)
    }
  }

  return (
    <div
      className="h-48 w-full rounded-lg border border-zinc-200 dark:border-zinc-700"
      style={{
        background: `linear-gradient(to top, #000, transparent, #fff), linear-gradient(to left, hsl(${hue}, 100%, 50%), #bbb)`,
        position: 'relative',
        cursor: 'crosshair',
      }}
      ref={colorAreaRef}
      onMouseDown={handleMouseDown}
    >
      <div
        className="color-selector ring-1 ring-zinc-200"
        style={{
          position: 'absolute',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
          border: '4px solid white',
          transform: 'translate(-50%, -50%)',
          left: `${saturation}%`,
          top: `${100 - lightness}%`,
          cursor: 'grab',
        }}
      ></div>
    </div>
  )
}

const ColorPicker = ({
  setHex,
  hex,
  h,
  s,
  l,
}: {
  hex: string
  setHex: React.Dispatch<React.SetStateAction<string>>
  h?: number
  s?: number
  l?: number
}) => {
  const [hue, setHue] = useState(h || 32)
  const [saturation, setSaturation] = useState(s || 84)
  const [lightness, setLightness] = useState(l || 83)
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHue(e.target.valueAsNumber)
  }
  // Generate a unique identifier for the style tag to avoid collisions
  // Generate a unique identifier for the style tag to avoid collisions
  const styleId = 'slider-thumb-style'

  useEffect(() => {
    if (hex) {
      const hex = hslToHex(hue, saturation, lightness)
      setHex(hex)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hue, saturation, lightness])

  return (
    <>
      <style
        id={styleId}
        dangerouslySetInnerHTML={{
          __html: `
          input[type='range']::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px; 
            height: 20px;
            background: transparent;
            border: 4px solid #FFFFFF;
            box-shadow: 0 0 0 1px #e4e4e7; /* Create the ring effect */
            cursor: pointer;
            border-radius: 50%;
            position: relative;
            z-index: 2; /* Make sure it's above the track */
          }

          input[type='range']::-moz-range-thumb {
            width: 20px;
            height: 20px;
            cursor: pointer;
            border-radius: 50%;
            background: transparent;
            border: 4px solid #FFFFFF;
            box-shadow: 0 0 0 1px #e4e4e7; /* Create the ring effect */

          }

          input[type='range']::-ms-thumb {
            width: 20px;
            height: 20px;
            background: transparent;
            cursor: pointer;
            border-radius: 50%;
            border: 4px solid #FFFFFF;
            box-shadow: 0 0 0 1px #e4e4e7; /* Create the ring effect */
          }


          .dark input[type='range']::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px; 
            height: 20px;
            background: transparent;
            border: 4px solid #09090b;
            box-shadow: 0 0 0 1px #3f3f46; /* Create the ring effect */
            cursor: pointer;
            border-radius: 50%;
            position: relative;
            z-index: 2; /* Make sure it's above the track */
          }

          .dark input[type='range']::-moz-range-thumb {
            width: 20px;
            height: 20px;
            cursor: pointer;
            border-radius: 50%;
            background: transparent;
            border: 4px solid #09090b;
            box-shadow: 0 0 0 1px #3f3f46; /* Create the ring effect */

          }

          .dark input[type='range']::-ms-thumb {
            width: 20px;
            height: 20px;
            background: transparent;
            cursor: pointer;
            border-radius: 50%;
            border: 4px solid #09090b;
            box-shadow: 0 0 0 1px #3f3f46; /* Create the ring effect */
          }
  `,
        }}
      />

      <div className="pointer-events-auto z-30 flex w-full max-w-xs select-none flex-col items-center gap-2 rounded-2xl border  border-zinc-200 bg-white p-4 shadow-md  dark:border-zinc-700 dark:bg-zinc-900">
        <DraggableColorCanvas
          hue={hue}
          setHue={setHue}
          saturation={saturation}
          setSaturation={setSaturation}
          lightness={lightness}
          setLightness={setLightness}
        />

        <input
          type="range"
          min="0"
          max="360"
          value={hue}
          className="[--range-thumb-bg]:white h-3 w-full cursor-pointer appearance-none rounded-lg border border-zinc-200 bg-white text-white placeholder:text-white  dark:border-zinc-700 dark:bg-gray-700 "
          style={{
            background: `linear-gradient(to right, 
            hsl(0, 100%, 50%), 
            hsl(60, 100%, 50%), 
            hsl(120, 100%, 50%), 
            hsl(180, 100%, 50%), 
            hsl(240, 100%, 50%), 
            hsl(300, 100%, 50%), 
            hsl(360, 100%, 50%))`,
          }}
          onChange={handleSliderChange}
        />

        <div className="relative h-fit w-full">
          <input
            className="flex w-full items-center justify-between rounded-lg border border-zinc-200 p-2  text-sm font-medium uppercase text-zinc-700 focus:ring-emerald-600 dark:border-zinc-700 dark:text-zinc-200"
            value={hex}
            onChange={(e) => {
              setHex(e.target.value)
              if (hex.length === 7) {
                const [h, s, l] = hexToHsl(e.target.value)
                setHue(h)
                setSaturation(s)
                setLightness(l)
              }
            }}
          />
          <div className="absolute right-0 top-0 flex h-full w-[42px] items-center justify-center px-2">
            <div
              className="h-6 w-6 rounded-md border border-zinc-200 dark:border-zinc-800"
              style={{
                backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ColorPicker
