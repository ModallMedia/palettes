import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

export default function useColorData(hex: string) {
  const [colorData, setColorData] = useState<null | {
    name: string
    hex: string
    rgb: { r: number; g: number; b: number }
    closest_color: { hex: string; label: string }
  }>(null)

  // Debounce the hex value with a 300ms delay
  const [debouncedHex] = useDebounce(hex, 100)
  console.log(colorData)
  useEffect(() => {
    const fetchedColor = async () => {
      console.log('fetching')
      const request = await fetch(`/api/v1/color-name?color=${debouncedHex}`)
      const response = await request.json()
      console.log(response)
      setColorData(response)
    }
    fetchedColor()
  }, [debouncedHex]) // Use debouncedHex instead of hex in the dependency array

  return colorData
}
