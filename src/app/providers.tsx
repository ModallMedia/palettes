'use client'

import { useEffect } from 'react'
import { ThemeProvider, useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'

function ThemeWatcher() {
  let { resolvedTheme, setTheme } = useTheme()
  let pathname = usePathname()

  useEffect(() => {
    // Check if the pathname includes "/book"
    if (pathname.includes('/book')) {
      setTheme('light')
    } else {
      let media = window.matchMedia('(prefers-color-scheme: dark)')

      function onMediaChange() {
        let systemTheme = media.matches ? 'dark' : 'light'
        if (resolvedTheme === systemTheme) {
          setTheme('system')
        }
      }

      onMediaChange()
      media.addEventListener('change', onMediaChange)

      return () => {
        media.removeEventListener('change', onMediaChange)
      }
    }
  }, [resolvedTheme, setTheme, pathname])

  return null
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <ThemeWatcher />
      {children}
    </ThemeProvider>
  )
}
