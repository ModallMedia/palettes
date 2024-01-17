import { forwardRef } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { motion, useScroll, useTransform } from 'framer-motion'

import { Button } from '@/components/Button'
import { Logo } from '@/components/Logo'
import {
  MobileNavigation,
  useIsInsideMobileNavigation,
} from '@/components/MobileNavigation'
import { useMobileNavigationStore } from '@/components/MobileNavigation'
import { MobileSearch, Search } from '@/components/Search'
import { ThemeToggle } from '@/components/ThemeToggle'

function TopLevelNavItem({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
      >
        {children}
      </Link>
    </li>
  )
}

export const Header = forwardRef<
  React.ElementRef<'div'>,
  { className?: string; isFull?: boolean }
>(function Header({ className, isFull = false }, ref) {
  let { isOpen: mobileNavIsOpen } = useMobileNavigationStore()
  let isInsideMobileNavigation = useIsInsideMobileNavigation()

  let { scrollY } = useScroll()
  let bgOpacityLight = useTransform(scrollY, [0, 72], [0.5, 0.9])
  let bgOpacityDark = useTransform(scrollY, [0, 72], [0.2, 0.8])

  return (
    <motion.div
      ref={ref}
      className={clsx(
        className,
        'fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-12 px-4 transition sm:px-6 lg:left-72 lg:z-30 lg:px-8 xl:left-80',
        !isInsideMobileNavigation &&
          'backdrop-blur-sm lg:left-72 xl:left-80 dark:backdrop-blur',
        isInsideMobileNavigation
          ? 'bg-white dark:bg-zinc-900'
          : 'bg-white/[var(--bg-opacity-light)] dark:bg-zinc-900/[var(--bg-opacity-dark)]',
        isFull &&
          'point-events-auto !z-[999] lg:pointer-events-auto lg:!left-0 lg:!z-[999] xl:!left-0',
      )}
      style={
        {
          '--bg-opacity-light': bgOpacityLight,
          '--bg-opacity-dark': bgOpacityDark,
        } as React.CSSProperties
      }
    >
      <div
        className={clsx(
          'absolute inset-x-0 top-full h-px transition',
          (isInsideMobileNavigation || !mobileNavIsOpen) &&
            'bg-zinc-900/7.5 dark:bg-white/7.5',
        )}
      />
      {isFull && (
        <Link
          href="/"
          aria-label="Home"
          className="flex flex-nowrap items-center gap-2 text-2xl font-light max-lg:hidden"
        >
          <Logo className="h-6" />
          Palettes.
        </Link>
      )}
      <div className={isFull ? 'max-lg:hidden lg:mr-auto' : 'max-lg:hidden'}>
        <Search />
      </div>
      <div className="flex items-center gap-5 lg:hidden">
        <MobileNavigation />
        <Link href="/" aria-label="Home">
          <Logo className="h-6" />
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <nav className="hidden md:block">
          <ul role="list" className="flex items-center gap-8">
            <TopLevelNavItem href="/">API Documentation</TopLevelNavItem>
            <TopLevelNavItem href="/book">Palettes Book</TopLevelNavItem>
            <TopLevelNavItem href="/generator">Generator</TopLevelNavItem>
          </ul>
        </nav>
        <div className="hidden md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15" />
        <div className="flex gap-4">
          <MobileSearch />
          <ThemeToggle />
        </div>
        <div className="hidden min-[416px]:contents">
          <Button
            target="_blank"
            href="https://github.com/ModallMedia/palettes"
            variant="secondary"
            className="flex aspect-square items-center justify-center !px-1.5"
          >
            <div>
              <svg
                viewBox="0 0 420 413"
                className="h-6 w-6"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M188.419 0.987316C130.69 7.05732 77.2847 37.5153 42.1967 84.3803C-5.25527 147.76 -13.3733 233.368 21.3357 304.365C31.9187 326.011 43.1177 341.953 59.8857 359.238C76.0557 375.908 92.4067 388.299 112.077 398.791C123.934 405.116 143.218 412.88 147.067 412.88C151.277 412.88 155.448 410.432 156.8 407.168C158.401 403.302 157.916 363.287 156.271 363.596C155.64 363.715 150.24 364.351 144.271 365.011C124.94 367.147 108.679 362.763 97.0077 352.27C92.9277 348.602 90.7427 345.272 85.9127 335.369C79.1157 321.427 73.8337 314.158 67.1527 309.546C54.9887 301.151 52.8497 297.048 59.4937 294.855C70.7817 291.13 87.5807 300.532 97.6207 316.195C103.478 325.333 109.627 331.119 117.705 335.095C124.025 338.205 124.941 338.375 134.9 338.29C143.419 338.217 146.641 337.741 151.846 335.79L158.273 333.38L159.568 327.653C160.976 321.424 164.793 313.23 168.634 308.189L171.066 304.998L167.743 304.461C145.039 300.788 134.433 297.741 121.919 291.294C97.9337 278.937 83.7887 258.278 78.2207 227.471C75.7107 213.585 75.9707 188.693 78.7317 178.584C81.4877 168.491 85.6457 159.873 92.1717 150.731L97.4187 143.38L95.7367 136.88C92.4007 123.985 94.0587 100.446 99.0797 89.4253C100.341 86.6583 100.415 86.6393 107.266 87.2763C119.247 88.3893 135.071 94.7493 150.304 104.574L157.188 109.014L169.804 106.483C199.178 100.59 228.406 101.088 257.635 107.978C262.797 109.195 262.906 109.172 268.135 105.704C283.298 95.6473 301.139 88.3443 313.325 87.2073C320.872 86.5023 320.662 86.2713 324.007 98.9283C326.9 109.873 327.155 127.224 324.567 137.007L322.814 143.635L327.796 150.218C338.161 163.912 342.778 177.671 343.622 197.38C344.837 225.769 338.072 251.461 324.612 269.57C318.784 277.412 308.772 285.693 298.928 290.814C286.276 297.397 274.336 300.879 252.199 304.441L248.979 304.959L252.604 310.005C254.598 312.78 257.388 318.05 258.804 321.715C261.374 328.366 261.38 328.46 261.903 367.38C262.191 388.83 262.817 407.184 263.294 408.167C264.453 410.555 269.128 412.88 272.771 412.88C276.62 412.88 295.904 405.116 307.761 398.791C318.909 392.845 331.838 384.268 342.003 376.074C350.809 368.977 368.628 350.815 375.062 342.38C425.862 275.782 434.154 188.026 396.602 114.425C360.618 43.8983 286.818 -0.886683 208.063 0.0133167C201.659 0.0863167 192.819 0.525316 188.419 0.987316Z"
                />
              </svg>
            </div>
          </Button>
        </div>
      </div>
    </motion.div>
  )
})
