import { isColorDark } from '@/lib/color/helpers/isColorDark'
import { ColorLabels } from './colorLabels'

export const ColorDisplay = ({ hex }: { hex: string }) => {
  const isDark = isColorDark(hex)
  return (
    <div
      style={{ backgroundColor: hex }}
      className="flex h-[296px] w-full grow items-end rounded-2xl border border-zinc-200 bg-red-500 p-4 shadow-md dark:border-zinc-700"
    >
      <ColorLabels
        className="flex w-1/2 flex-col items-start justify-start text-left"
        hex={hex.replace('#', '')}
        isDark={isDark}
      />
    </div>
  )
}
