import useColorData from '@/components/hooks/color/useColorData'
import { CheckIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useState } from 'react'

export const CopyHexButton = ({
  hex,
  isDark,
  className,
}: {
  hex: string
  className?: string
  isDark: boolean
}) => {
  const [copied, setCopied] = useState(false)
  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('#' + hex.toUpperCase())
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 1000)
      // You can display some sort of confirmation to the user if you like
      console.log('Color copied to clipboard:', hex)
    } catch (err) {
      console.error('Failed to copy color to clipboard', err)
    }
  }
  return (
    <button
      aria-label="copy-hex-code"
      onClick={handleCopyToClipboard}
      className={clsx(
        'relative -mx-1 rounded-full p-1 text-sm font-bold duration-75 focus:border-0 focus:ring-0 active:ring-0 group-hover:opacity-100 lg:-mx-3 lg:px-3 lg:text-base xl:text-lg 2xl:text-2xl',
        isDark
          ? `text-zinc-900 hover:bg-black/5`
          : `text-zinc-100 hover:bg-white/5`,
        className,
      )}
    >
      <span
        className={clsx(
          copied
            ? '-translate-y-4 opacity-0'
            : 'translate-y-0 opacity-100 delay-100',
          'duration-100',
        )}
      >
        {hex.toUpperCase()}
      </span>
      <span className="absolute inset-0 flex items-center justify-center">
        <span
          className={clsx(
            copied
              ? 'translate-y-0 opacity-100 delay-100'
              : 'translate-y-2 opacity-0',
            'duration-100 lg:text-sm xl:text-base 2xl:text-xl',
          )}
        >
          Copied!
        </span>
      </span>
    </button>
  )
}

export const ColorLabels = ({
  hex,
  isDark,
  className = '',
}: {
  hex: string
  isDark: boolean
  className?: string
}) => {
  const colorData = useColorData(hex)

  return (
    <div
      className={clsx(
        'flex w-full flex-col justify-center gap-0 p-1 text-center lg:px-3',
        className,
      )}
    >
      <CopyHexButton isDark={isDark} hex={hex} />

      <p
        className={clsx(
          ' h-8 text-xs font-medium',
          isDark ? 'text-zinc-800' : 'text-zinc-200',
        )}
      >
        {colorData?.name || ''}
      </p>
    </div>
  )
}
