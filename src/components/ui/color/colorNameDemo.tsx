import { isColorDark } from '@/lib/color/helpers/isColorDark'

const examples = [
  {
    hex: '#17F55C',
    label: 'Lush Lime',
    rgb: { r: 23, g: 245, b: 92 },
  },
  {
    hex: '#572182',
    label: 'Royal Indigo',
    rgb: { r: 87, g: 33, b: 130 },
  },
  {
    hex: '#90D35F',
    label: 'Meadow Grass',
    rgb: { r: 144, g: 211, b: 95 },
  },
  {
    hex: '#B75FCA',
    label: 'Majestic Magenta',
    rgb: { r: 183, g: 95, b: 202 },
  },
  {
    hex: '#DD9D93',
    label: 'Dusty Mauve',
    rgb: { r: 221, g: 157, b: 147 },
  },
  {
    hex: '#E7C075',
    label: 'Champagne Shimmer',
    rgb: { r: 231, g: 192, b: 117 },
  },
  {
    hex: '#FBF91E',
    label: 'Sunshine Yellow',
    rgb: { r: 251, g: 249, b: 30 },
  },
  {
    hex: '#7C17A8',
    label: 'Violet Haze',
    rgb: { r: 124, g: 23, b: 168 },
  },
]

export const ColorNameCard = ({
  hex,
  isDark,
  label,
}: {
  hex: string
  isDark: boolean
  label: string
}) => {
  return (
    <div
      style={{ backgroundColor: hex }}
      className="not-prose flex w-full flex-col items-center justify-center rounded-2xl border border-zinc-200 p-2 py-8 shadow-md"
    >
      <p
        className={
          isDark
            ? 'text-lg font-bold  text-zinc-800'
            : 'text-lg font-bold  text-zinc-200'
        }
      >
        {hex}
      </p>
      <p
        className={
          isDark
            ? 'text-sm font-medium  text-zinc-800'
            : 'text-sm font-medium  text-zinc-200'
        }
      >
        {label}
      </p>
    </div>
  )
}

function ColorNameDemo() {
  return (
    <div className="grid w-full max-w-5xl grid-cols-4 gap-4">
      <h2 className="col-span-full">
        Color Name Examples Available From The API
      </h2>
      {examples.map(({ hex, label }) => {
        const isDark = isColorDark(hex)
        return (
          <ColorNameCard key={hex} hex={hex} isDark={isDark} label={label} />
        )
      })}
    </div>
  )
}

export default ColorNameDemo
