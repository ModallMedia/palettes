import useColorData from '@/components/hooks/color/useColorData'

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

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('#' + hex.toUpperCase())
      // You can display some sort of confirmation to the user if you like
      console.log('Color copied to clipboard:', hex)
    } catch (err) {
      console.error('Failed to copy color to clipboard', err)
    }
  }

  return (
    <div
      className={className || 'flex flex-col justify-center gap-2 text-center'}
    >
      <button
        aria-label="copy-hex-code"
        onClick={handleCopyToClipboard}
        className={
          isDark
            ? `rounded-md p-1 text-sm font-bold text-zinc-900 duration-75 hover:bg-black/10 focus:border-0 focus:ring-0 active:ring-0 group-hover:opacity-100 lg:px-2 lg:text-base xl:text-lg 2xl:text-2xl`
            : `rounded-md p-1 text-sm font-bold text-zinc-100 duration-75 hover:bg-white/10 focus:border-0 focus:ring-0 active:ring-0 group-hover:opacity-100 lg:px-2 lg:text-base xl:text-lg 2xl:text-2xl`
        }
      >
        {hex.toUpperCase()}
      </button>
      {colorData ? (
        <p
          className={` h-8 p-1 text-xs font-medium lg:px-2 ${
            isDark ? 'text-zinc-800' : 'text-zinc-200'
          }`}
        >
          {colorData.name}
        </p>
      ) : (
        <div className="h-[32px] w-full" />
      )}
    </div>
  )
}
