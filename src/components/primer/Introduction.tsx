import Link from 'next/link'

import { CheckIcon } from '@/components/primer/CheckIcon'
import { Container } from '@/components/primer/Container'

export function Introduction() {
  return (
    <section
      id="introduction"
      aria-label="Introduction"
      className="pb-16 pt-20 sm:pb-20 md:pt-36 lg:py-32"
    >
      <Container className="text-lg tracking-tight text-zinc-700">
        <p className="font-display text-4xl font-bold tracking-tight text-zinc-900">
          “palettes” is more than just a color palette book.
        </p>
        <p className="mt-4">
          it{`'`}s a journey through the beauty of simplicity in design.
        </p>
        <p className="mt-4">
          Each of the 87 hand-picked color palettes featured in this book is
          presented in an aesthetically pleasing format, showcasing a unique
          color name, its corresponding hex code, and the RGB value.
        </p>
        <p className="mt-4">
          Designed to inspire your next big project or to provide a relaxing
          escape after a long day, {`"`}palettes{`"`} serves as a perfect coffee
          table book for designers, artists, and color enthusiasts alike.
        </p>
        <p className="mt-4">
          Embracing the concept that there{`'`}s beauty in simplicity, this book
          is a testament to how colors can speak volumes and transform
          perceptions.
        </p>
        <ul role="list" className="mt-8 space-y-3">
          {[
            'Explore 87 unique and inspiring color palettes',
            'Each palette includes a color name, hex code, and RGB value',
            'A perfect blend of art and utility for your next project',
            'Ideal for designers, artists, and anyone who loves colors',
            'Beautifully designed to adorn your coffee table or workspace',
          ].map((feature) => (
            <li key={feature} className="flex">
              <CheckIcon className="h-8 w-8 flex-none fill-emerald-500" />
              <span className="ml-4">{feature}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8">
          Whether you{`'`}re a professional looking for inspiration or simply
          someone who appreciates the subtle elegance of color,{`"`}palettes
          {`"`} is the perfect addition to your collection.
        </p>
        <p className="mt-10">
          <Link
            href="https://www.amazon.ca/Palettes-Simplicity-Mr-Ryan-Mogk/dp/B0BNYWZKJ9/"
            className="text-base font-medium text-emerald-600 hover:text-emerald-800"
          >
            Order a Copy Today <span aria-hidden="true">&rarr;</span>
          </Link>
        </p>
      </Container>
    </section>
  )
}
