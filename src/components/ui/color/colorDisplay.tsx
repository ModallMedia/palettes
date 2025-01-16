import { isColorDark } from '@/lib/color/helpers/isColorDark'
import { ColorLabels } from './colorLabels'
import { Color } from './colorPicker'
import clsx from 'clsx'

export const ColorDisplay = ({ color }: { color: Color }) => {
  const isDark = color.l > 50
  return (
    <div
      style={
        {
          backgroundColor: `hsl(${color.h}, ${color.s}%, ${color.l}%)`,
          '--tw-ring-color': `hsl(${color.h}, ${color.s}%, ${
            isDark ? color.l - 10 : color.l + 10
          }%, 30%)`,
          '--tw-shadow-color': `hsl(${color.h}, ${color.s}%, ${
            isDark ? color.l - 20 : color.l + 20
          }%, 30%)`,
          '--tw-shadow': 'var(--tw-shadow-colored)',
        } as any
      }
      className={clsx(
        'flex h-[304px] w-full grow items-end rounded-2xl p-4 shadow-2xl shadow-zinc-300 ring-2 ring-inset',
        // isDark ? 'ring-black/10' : 'ring-white/10',
      )}
    >
      <ColorLabels
        className="flex w-1/2 flex-col items-start justify-start text-left"
        hex={color.hex.replace('#', '')}
        isDark={isDark}
      />
    </div>
  )
}
