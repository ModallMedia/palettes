'use client'
import { isColorDark } from '@/lib/color/helpers/isColorDark'
import { CheckCircleIcon, CheckIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { CopyHexButton } from './colorLabels'

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
  // Calculate the base width percentage when not hovered
  // If we have 5 items, each takes up 20% (1/5 = 0.2 or 20%)
  const normalWidth = (1 / amount) * 100

  // Calculate the expanded width percentage when hovered
  // We subtract 1 from amount to redistribute space among remaining items
  // If we have 5 items, on hover each would take up 25% (1/4 = 0.25 or 25%)
  // Calculate expanded width and ensure it's at least 15%
  const expandedWidth = Math.max((1 / (amount - 1)) * 100, 25)

  // Format the width to 2 decimal places and add % symbol
  const widthStyle = `${(hovered ? expandedWidth : normalWidth).toFixed(2)}%`

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative duration-200 ease-in-out"
      style={{
        backgroundColor: color,
        width: widthStyle,
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-0 *:!text-base *:*:*:!text-sm group-hover:opacity-100">
        <CopyHexButton isDark={isDark} hex={color} />
      </div>
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
  colors: any[]
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
          const isDark = color.hsl.l > 50

          return (
            <StretchyColor
              color={color.hex}
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
