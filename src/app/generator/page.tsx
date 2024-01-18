'use client'

import { Inter } from 'next/font/google'
import colorCodes from '@/components/data/colors.json'
import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRightIcon,
  ArrowUturnLeftIcon,
  EyeDropperIcon,
  LockClosedIcon,
  LockOpenIcon,
  PlusIcon,
  SwatchIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid'
import useColorData from '@/components/data/color/useColorData'
import useRandomNumberOnSpacePress from '@/components/data/color/useRandomNumberOnSpacePress'
import ColorPicker from '@/components/ui/color/colorPicker'
import { isColorDark } from '@/lib/color/helpers/isColorDark'
import { ColorLabels } from '@/components/ui/color/colorLabels'
const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

const LockColor = ({
  isDark,
  hex,
  onLockToggle,
  isLocked,
}: {
  isDark: boolean
  hex: string
  onLockToggle: () => void
  isLocked: boolean
}) => {
  return (
    <button
      onKeyDown={(e) => {
        if (e.code === 'Space') {
          e.preventDefault()
        }
      }}
      onClick={onLockToggle}
      className={
        !isDark
          ? `mx-auto rounded-md p-1 hover:bg-white/10 focus:border-0 focus:ring-0 active:ring-0 group-hover:opacity-100 ${
              isLocked ? 'opacity-100' : 'md:opacity-0'
            }`
          : `mx-auto rounded-md p-1 hover:bg-black/10 focus:border-0 focus:ring-0 active:ring-0 group-hover:opacity-100 ${
              isLocked ? 'opacity-100' : 'md:opacity-0'
            }`
      }
    >
      {isLocked ? (
        <LockClosedIcon
          className={`h-6 w-6 ${isDark ? 'text-zinc-800' : 'text-zinc-200'} `}
        />
      ) : (
        <LockOpenIcon
          className={`h-6 w-6 ${isDark ? 'text-zinc-800' : 'text-zinc-200'} `}
        />
      )}
    </button>
  )
}

function getRandomSubarray<T>(arr: T[], count: number = arr.length): T[] {
  let shuffled = [...arr] // Make a copy of the array
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)) // Random index from 0 to i
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]] // Swap elements
  }
  return shuffled.slice(0, count) // Get the subarray of required size
}

const RemoveColorButton = ({
  hex,
  isDark,
  onRemove,
}: {
  hex: string
  isDark: boolean
  onRemove: (hex: string) => void
}) => {
  return (
    <button
      onKeyDown={(e) => {
        if (e.code === 'Space') {
          e.preventDefault()
        }
      }}
      onClick={() => onRemove(hex)}
      className={
        !isDark
          ? `mx-auto rounded-md p-1 duration-75 hover:bg-white/10 focus:border-0 focus:ring-0 active:ring-0 group-hover:opacity-100 md:opacity-0`
          : `mx-auto rounded-md p-1 duration-75 hover:bg-black/10 focus:border-0 focus:ring-0 active:ring-0 group-hover:opacity-100 md:opacity-0`
      }
    >
      <XMarkIcon
        className={`h-6 w-6 ${isDark ? 'text-zinc-800' : 'text-zinc-200'} `}
      />
    </button>
  )
}
const PickColorButton = ({
  hex: hexDefault,
  isDark,
  onClick,
}: {
  hex: string
  isDark: boolean
  onClick: (color: string, oldHex: string) => void
}) => {
  const [hex, setHex] = useState('#' + hexDefault)
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onKeyDown={(e) => {
          if (e.code === 'Space') {
            e.preventDefault()
          }
        }}
        onClick={() => setOpen(true)}
        className={
          !isDark
            ? `mx-auto rounded-md p-1 duration-75 hover:bg-white/10 focus:border-0 focus:ring-0 active:ring-0 group-hover:opacity-100 md:opacity-0`
            : `mx-auto rounded-md p-1 duration-75 hover:bg-black/10 focus:border-0 focus:ring-0 active:ring-0 group-hover:opacity-100 md:opacity-0`
        }
      >
        <EyeDropperIcon
          className={`h-6 w-6 ${isDark ? 'text-zinc-800' : 'text-zinc-200'} `}
        />
      </button>
      <div
        className={
          open
            ? 'fixed left-0 top-0 z-40 flex h-screen w-screen items-center justify-center'
            : 'fixed left-0 top-0 hidden h-screen w-screen items-center justify-center'
        }
      >
        <button
          aria-label="close-color-picker"
          className="absolute inset-0"
          onClick={() => setOpen(false)}
        />
        <ColorPicker hex={hex} setHex={setHex} />
      </div>
    </>
  )
}

const GradientSwatch = ({
  hex,
  parentIndex,
  isDark,
  onSelectColor,
}: {
  hex: string
  isDark: boolean
  parentIndex: number
  onSelectColor: (color: string, oldHex: string) => void
}) => {
  const [open, setOpen] = useState(false)
  const [gradient, setGradient] = useState<any>([])
  useEffect(() => {
    const colorReq = async () => {
      const req = await fetch(`/api/v1/gradient-stops?color=${hex}&count=25`)
      const resp = await req.json()

      setGradient(resp)
    }
    if (open) {
      colorReq()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  console.log(open)

  console.log(gradient)

  // Define a function that determines the appropriate button classes based on isDark
  const buttonClass = (isSelected: boolean, dark: boolean) =>
    `p-1 h-fit m-auto active:ring-0 relative z-30 focus:ring-0 focus:border-0 group-hover:opacity-100 hover:opacity-100 md:opacity-0 duration-75 rounded-md ${
      isSelected ? (!dark ? 'bg-white/10' : 'bg-black/10') : ''
    } ${
      !dark
        ? ' text-zinc-200 hover:bg-white/10'
        : ' text-zinc-800 hover:bg-black/10'
    }`
  return (
    <>
      <button
        onKeyDown={(e) => {
          if (e.code === 'Space') {
            e.preventDefault()
          }
        }}
        onClick={() => setOpen(true)}
        className={
          !isDark
            ? `mx-auto rounded-md p-1 duration-75 hover:bg-white/10 focus:border-0 focus:ring-0 active:ring-0 group-hover:opacity-100 md:opacity-0`
            : `mx-auto rounded-md p-1 duration-75 hover:bg-black/10 focus:border-0 focus:ring-0 active:ring-0 group-hover:opacity-100 md:opacity-0`
        }
      >
        <SwatchIcon
          className={`h-6 w-6 ${isDark ? 'text-zinc-800' : 'text-zinc-200'} `}
        />
      </button>
      {open && (
        <div className="absolute inset-0 flex flex-col max-md:overflow-y-scroll">
          {gradient.from_light_to_dark &&
            gradient['gradient'].map((gradient: any, idx: number) => {
              const isDark = isColorDark(gradient.hex)

              return (
                <div
                  className={
                    idx === 0
                      ? parentIndex === 0
                        ? 'group/swatch relative z-20 flex h-full w-full items-center justify-center  p-1 pt-[56px]'
                        : 'group/swatch relative z-20 flex h-full w-full items-center justify-center  p-1 md:pt-[56px]'
                      : 'group/swatch relative z-20 flex h-full w-full items-center  justify-center p-1'
                  }
                  style={{ backgroundColor: gradient.hex }}
                  key={idx}
                >
                  {idx === 0 ? (
                    <button
                      onClick={() => setOpen(false)}
                      className={buttonClass(false, isDark)}
                    >
                      <ArrowUturnLeftIcon className="h-6 w-6" />
                    </button>
                  ) : (
                    <>
                      {gradient.isParam && (
                        <div
                          className={
                            !isDark
                              ? 'h-6 w-6 rounded-full bg-zinc-200'
                              : 'h-6 w-6 rounded-full bg-zinc-800'
                          }
                        />
                      )}

                      <button
                        onClick={() => {
                          onSelectColor(gradient.hex, hex) // Call the callback with the selected color
                          setOpen(false) // Close the gradient display
                        }}
                        className={
                          !isDark
                            ? 'h-fit w-fit rounded-md p-1 text-center text-sm text-zinc-200 hover:bg-white/10 group-hover/swatch:opacity-100 md:opacity-0'
                            : 'h-fit w-fit rounded-md p-1 text-center text-sm text-zinc-800 hover:bg-black/10 group-hover/swatch:opacity-100 md:opacity-0'
                        }
                      >
                        {gradient.hex.toUpperCase().replace('#', '')}{' '}
                      </button>
                    </>
                  )}
                </div>
              )
            })}
        </div>
      )}
    </>
  )
}

const PalettesLogo = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 4997 1036"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4993.99 279.76C5004.53 233.656 4975.7 187.737 4929.6 177.196L4235.69 18.5443C4189.58 8.00348 4143.67 36.8329 4133.12 82.9366L3975.67 771.631C3965.12 817.735 3993.95 863.654 4040.06 874.195L4733.97 1032.85C4780.07 1043.39 4825.99 1014.56 4836.53 968.455L4993.99 279.76Z"
        fill="#264653"
      />
      <path
        d="M3842.88 85.6152C3842.8 38.3219 3804.4 0.0481958 3757.11 0.128361L3045.29 1.33493C2998 1.41509 2959.72 39.8189 2959.8 87.1121L2961 793.577C2961.08 840.87 2999.48 879.144 3046.78 879.063L3758.59 877.857C3805.89 877.777 3844.16 839.373 3844.08 792.08L3842.88 85.6152Z"
        fill="#2A9D8F"
      />
      <path
        d="M2847.41 87.3026C2847.33 40.0093 2808.93 1.73558 2761.63 1.81574L2055.17 3.01324C2007.88 3.0934 1969.6 41.4972 1969.68 88.7904L1970.88 795.255C1970.96 842.548 2009.36 880.822 2056.66 880.742L2763.12 879.544C2810.41 879.464 2848.69 841.06 2848.61 793.767L2847.41 87.3026Z"
        fill="#E9C46A"
      />
      <path
        d="M1857.29 88.9809C1857.21 41.6877 1818.81 3.41396 1771.51 3.49413L1070.4 4.68255C1023.11 4.76272 984.833 43.1665 984.913 90.4597L986.111 796.924C986.191 844.217 1024.59 882.491 1071.89 882.411L1773 881.223C1820.29 881.142 1858.57 842.739 1858.49 795.445L1857.29 88.9809Z"
        fill="#F4A261"
      />
      <path
        d="M872.521 90.6501C872.441 43.3568 834.037 5.08312 786.744 5.16329L85.6316 6.35171C38.3383 6.43188 0.0644922 44.8356 0.144657 92.1289L1.34215 798.593C1.42232 845.887 39.8261 884.16 87.1193 884.08L788.232 882.892C835.525 882.812 873.799 844.408 873.719 797.115L872.521 90.6501Z"
        fill="#E76F51"
      />
    </svg>
  )
}

// Define the LockedColor type for better type checking
type LockedColor = {
  hex: string
  position: number
}

export default function Pallettes() {
  const [paletteSize, setPaletteSize] = useState<number>(5)
  const [randomNumber] = useRandomNumberOnSpacePress(0, colorCodes.length - 1)
  const [currentPalette, setCurrentPalette] = useState<string[]>([])
  const [lockedColors, setLockedColors] = useState<{
    [key: string]: LockedColor
  }>({})

  const handleLockToggle = (hex: string, position: number) => {
    setLockedColors((prevLockedColors) => {
      // If the color is already locked, unlock it by removing it from the object
      if (prevLockedColors[hex]) {
        const newLockedColors = { ...prevLockedColors }
        delete newLockedColors[hex]
        return newLockedColors
      } else {
        // If the color is not locked, add it to the object with its position
        return {
          ...prevLockedColors,
          [hex]: { hex, position },
        }
      }
    })
  }

  // Function to remove a color from the palette
  const removeColorFromPalette = (hex: string) => {
    setLockedColors((prevLockedColors) => {
      const newLockedColors = { ...prevLockedColors }
      delete newLockedColors[hex]
      return newLockedColors
    })

    // Assuming you have a state for your palette:
    setCurrentPalette((prevPalette) =>
      prevPalette.filter((color) => color !== hex),
    )
    // Adjust paletteSize if necessary
    setPaletteSize((prevSize) => prevSize - 1)
  }

  const addNewItemToPalette = (position: number) => {
    // Find a color that's not currently being used in the palette
    const unusedColors = colorCodes[randomNumber].filter(
      (color) => !currentPalette.includes(color),
    )

    // Get a random color from the unused colors
    const newColor =
      unusedColors[Math.floor(Math.random() * unusedColors.length)]

    // Insert the new color at the specified position
    const newPalette = [
      ...currentPalette.slice(0, position),
      newColor,
      ...currentPalette.slice(position),
    ]

    // Update locked colors' positions if they are affected by the insertion
    const updatedLockedColors = { ...lockedColors }
    Object.keys(updatedLockedColors).forEach((hex) => {
      if (updatedLockedColors[hex].position >= position) {
        updatedLockedColors[hex].position += 1
      }
    })

    // Update state
    setCurrentPalette(newPalette)
    setLockedColors(updatedLockedColors)
    setPaletteSize(newPalette.length) // Increment the palette size
  }

  // First, we need to create an array from your currentPalette, enriched with the lock information:
  const enrichedPalette = useMemo(() => {
    return currentPalette
      .map((hex, index) => ({
        hex,
        position: index,
        isLocked: lockedColors.hasOwnProperty(hex),
      }))
      .sort((a, b) => {
        if (a.isLocked && b.isLocked) {
          return lockedColors[a.hex].position - lockedColors[b.hex].position
        } else if (a.isLocked) {
          return lockedColors[a.hex].position - b.position
        } else if (b.isLocked) {
          return a.position - lockedColors[b.hex].position
        } else {
          return a.position - b.position
        }
      })
  }, [currentPalette, lockedColors])

  useEffect(() => {
    // This effect runs once on mount and whenever randomNumber or paletteSize changes.
    const fullPalette = colorCodes[randomNumber]
    let newPalette = new Array(paletteSize).fill(null)

    // Assign locked colors to their respective positions if within bounds.
    Object.entries(lockedColors).forEach(([hex, { position }]) => {
      if (position < paletteSize) {
        newPalette[position] = hex
      }
    })

    // Get all the colors that are not locked.
    const availableColors = fullPalette.filter(
      (hex) =>
        !Object.values(lockedColors).find(
          (lockedColor) => lockedColor.hex === hex,
        ),
    )

    // Fill in the rest of the newPalette with random colors.
    getRandomSubarray(availableColors, paletteSize).forEach((color) => {
      const indexToFill = newPalette.findIndex((slot) => slot === null)
      if (indexToFill !== -1) {
        newPalette[indexToFill] = color
      }
    })

    setCurrentPalette(newPalette.filter((color) => color !== null)) // Filter out any nulls that could remain.

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [randomNumber])

  const replaceColorInPalette = (newColor: string, oldColor: string) => {
    const sanitizedColor = newColor.toUpperCase().replaceAll('#', '')

    setCurrentPalette((prevPalette) => {
      // First, find the index of the color to be replaced
      const index = prevPalette.findIndex((val) => val === oldColor)
      console.log(index)
      if (index === -1) {
        // If the color is not found, return the previous palette without changes
        return prevPalette
      }

      // Create a copy of the current palette to avoid directly mutating the state
      let newPalette = [...prevPalette]
      // Use splice to replace the item at the found index with the new color
      newPalette.splice(index, 1, sanitizedColor)

      // Return the updated palette
      return newPalette
    })
    // Also replace the color in lockedColors if it was locked
    setLockedColors((prevLockedColors) => {
      if (prevLockedColors[oldColor]) {
        // Copy the old locked color's details
        const lockedColorDetails = prevLockedColors[oldColor]

        // Create a new lockedColors object without the oldColor
        const { [oldColor]: _, ...restLockedColors } = prevLockedColors

        // Return the new lockedColors with the newColor added
        return {
          ...restLockedColors,
          [sanitizedColor]: { ...lockedColorDetails, hex: newColor },
        }
      }
      return prevLockedColors
    })
  }

  console.log(currentPalette, lockedColors)

  return (
    <main className={`flex min-h-screen flex-col ${inter.className}`}>
      <div className="relative flex h-full w-full grow flex-col md:flex-row">
        {enrichedPalette.map(({ hex, position, isLocked }, index: number) => {
          const isDark = isColorDark(`#${hex}`)

          // const [gradient, setGradient] = useState(false);
          return (
            <div
              key={hex} // Use the hex value for a unique key
              className="group relative flex w-full  grow flex-col justify-end gap-4 p-1 py-8 duration-150 md:h-screen xl:p-4"
              style={{ backgroundColor: `#${hex}` }}
            >
              {index !== enrichedPalette.length - 1 &&
                enrichedPalette.length !== 10 && (
                  <div className="group/new group absolute right-0 z-10 flex h-full w-full items-center justify-center max-md:bottom-0 max-md:h-1/2 max-md:translate-y-1/2 md:top-0 md:w-1/4 md:translate-x-1/2">
                    <button
                      onKeyDown={(e) => {
                        if (e.code === 'Space') {
                          e.preventDefault()
                        }
                      }}
                      onClick={() => addNewItemToPalette(index + 1)}
                      className={`group/button relative z-30 mx-auto rounded-lg bg-white p-2 duration-75 hover:bg-zinc-50 focus:border-0 focus:ring-0 active:ring-0 group-hover/new:opacity-100 md:opacity-0`}
                    >
                      <PlusIcon
                        className={`h-6 w-6 text-zinc-800 duration-150 group-hover/button:rotate-90`}
                      />
                    </button>
                  </div>
                )}
              {enrichedPalette.length !== 3 && (
                <RemoveColorButton
                  isDark={isDark}
                  hex={hex}
                  onRemove={removeColorFromPalette}
                />
              )}
              <PickColorButton
                onClick={replaceColorInPalette}
                hex={hex}
                isDark={isDark}
              />
              <GradientSwatch
                parentIndex={index}
                onSelectColor={replaceColorInPalette}
                hex={hex}
                isDark={isDark}
              />
              <LockColor
                isDark={isDark}
                hex={hex}
                onLockToggle={() => handleLockToggle(hex, position)}
                isLocked={lockedColors[hex] ? true : false}
              />
              <ColorLabels isDark={isDark} hex={hex} />
            </div>
          )
        })}
      </div>
    </main>
  )
}
