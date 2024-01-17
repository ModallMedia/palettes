'use client'
import { isColorDark } from '@/lib/color/helpers/isColorDark'
import { CheckCircleIcon, CheckIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'

const StretchyColor = ({
  color,
  isDark,
  amount,
}: {
  color: string
  isDark: boolean
  amount: number
}) => {
  const [hovered, setHovered] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('#' + color.toUpperCase())
      // You can display some sort of confirmation to the user if you like
      setCopied(true)
      console.log('Color copied to clipboard:', color)
    } catch (err) {
      console.error('Failed to copy color to clipboard', err)
    }
  }

  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 1000)
    }
  }, [copied])

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => handleCopyToClipboard()}
      className="group relative duration-75"
      style={{
        backgroundColor: '#' + color,
        width: hovered
          ? `${((1 / (amount - 1)) * 100).toFixed(2)}%`
          : `${((1 / amount) * 100).toFixed(2)}%`,
      }}
    >
      <p
        className={
          !isDark
            ? 'absolute inset-0 flex cursor-pointer items-center justify-center overflow-hidden rounded-md p-1 text-sm font-bold text-transparent duration-75  hover:text-zinc-100 focus:border-0 focus:ring-0 active:ring-0 group-hover:opacity-100 lg:text-base '
            : 'absolute inset-0 flex cursor-pointer items-center justify-center overflow-hidden rounded-md p-1 text-sm font-bold text-transparent duration-75  hover:text-zinc-900 focus:border-0 focus:ring-0 active:ring-0 group-hover:opacity-100 lg:text-base '
        }
      >
        <span
          className={
            isDark
              ? 'flex h-fit  w-fit items-center justify-center gap-1 rounded-md p-2 uppercase duration-75 group-hover:bg-black/10 lg:px-2'
              : 'flex h-fit w-fit  items-center justify-center gap-1 rounded-md p-2 uppercase duration-75 group-hover:bg-white/10 lg:px-2'
          }
        >
          {copied ? <CheckIcon className="h-5 w-5" /> : color}
        </span>
      </p>
    </div>
  )
}

export function DynamicColorDisplay({
  colors,
  title,
  description,
}: {
  title: string
  description?: string
  colors: string[]
}) {
  return (
    <div className="not-prose flex w-full flex-col gap-2">
      <h3 className="text-xl font-bold capitalize text-zinc-900 dark:text-zinc-100">
        {title}
      </h3>
      {description && (
        <p className="font-medium text-zinc-700 dark:text-zinc-200">
          {description}
        </p>
      )}
      <div className="flex h-full min-h-[80px] w-full overflow-hidden rounded-xl">
        {colors.map((color, index) => {
          const hashRemoved = color.replace('#', '')
          const isDark = isColorDark(color)

          return (
            <StretchyColor
              color={hashRemoved}
              amount={colors.length}
              isDark={isDark}
              key={index}
            />
          )
        })}
      </div>
    </div>
  )
}
