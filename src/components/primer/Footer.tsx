import { GridPattern } from '@/components/primer/GridPattern'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="relative pb-20 pt-5 sm:pb-32 sm:pt-14">
      <div className="absolute inset-x-0 top-0 h-32 text-zinc-900/10 [mask-image:linear-gradient(white,transparent)]">
        <GridPattern x="50%" />
      </div>
      <div className="relative text-center text-sm text-zinc-600">
        <p>
          &copy; Palettes Copyright {new Date().getFullYear()}. All rights
          reserved.
        </p>
        <Link
          className="text-sm text-zinc-600 underline"
          target="_blank"
          href="https://modallmedia.com"
        >
          Powered by Modall Media
        </Link>
      </div>
    </footer>
  )
}
