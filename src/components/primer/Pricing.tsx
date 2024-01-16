import clsx from 'clsx'

import { Button } from '@/components/primer/Button'
import { CheckIcon } from '@/components/primer/CheckIcon'
import { Container } from '@/components/primer/Container'
import { GridPattern } from '@/components/primer/GridPattern'
import { SectionHeading } from '@/components/primer/SectionHeading'

function Plan({
  name,
  description,
  price,
  features,
  href,
  featured = false,
}: {
  name: string
  description: string
  price: string
  features: Array<string>
  href: string
  featured?: boolean
}) {
  return (
    <div
      className={clsx(
        'sm:rounded-5xl relative px-4 py-16 sm:px-10 md:py-12 lg:px-12',
        featured && 'bg-emerald-600 sm:shadow-lg',
      )}
    >
      {featured && (
        <div className="absolute inset-0 text-white/10 [mask-image:linear-gradient(white,transparent)]">
          <GridPattern x="50%" y="50%" />
        </div>
      )}
      <div className="relative flex flex-col">
        <h3
          className={clsx(
            'mt-7 text-lg font-semibold tracking-tight',
            featured ? 'text-white' : 'text-zinc-900',
          )}
        >
          {name}
        </h3>
        <p
          className={clsx(
            'mt-2 text-lg tracking-tight',
            featured ? 'text-white' : 'text-zinc-600',
          )}
        >
          {description}
        </p>
        <p className="font-display order-first flex font-bold">
          <span
            className={clsx(
              'text-[1.75rem] leading-tight',
              featured ? 'text-emerald-200' : 'text-zinc-500',
            )}
          >
            $
          </span>
          <span
            className={clsx(
              'ml-1 mt-1 text-7xl tracking-tight',
              featured ? 'text-white' : 'text-zinc-900',
            )}
          >
            {price}
          </span>
          <span className={featured ? 'text-emerald-200' : 'text-zinc-500'}>
            CAD
          </span>
        </p>
        <div className="order-last mt-8">
          <ul
            role="list"
            className={clsx(
              '-my-2 divide-y text-base tracking-tight',
              featured
                ? 'divide-white/10 text-white'
                : 'divide-zinc-200 text-zinc-900',
            )}
          >
            {features.map((feature) => (
              <li key={feature} className="flex py-2">
                <CheckIcon
                  className={clsx(
                    'h-8 w-8 flex-none',
                    featured ? 'fill-white' : 'fill-zinc-600',
                  )}
                />
                <span className="ml-4">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <Button
          href={href}
          color={featured ? 'white' : 'slate'}
          className="mt-8"
          aria-label={`Get started with the ${name} plan for $${price}`}
        >
          Get started
        </Button>
      </div>
    </div>
  )
}

export function Pricing() {
  return (
    <section
      id="book-options"
      aria-labelledby="book-options-title"
      className="scroll-mt-14 pb-8 pt-16 sm:scroll-mt-32 sm:pb-10 sm:pt-20 lg:pb-16 lg:pt-32"
    >
      <Container>
        <SectionHeading number="3" id="book-options-title">
          Book Options
        </SectionHeading>
        <p className="font-display mt-8 text-5xl font-extrabold tracking-tight text-zinc-900 sm:text-6xl">
          Pick your cover
        </p>
        <p className="mt-4 max-w-xl text-lg tracking-tight text-zinc-600">
          Choose between a paperback or hardcover version of the book.
        </p>
      </Container>
      <div className="mx-auto mt-16 max-w-5xl lg:px-6">
        <div className="md:rounded-6xl grid bg-zinc-50 sm:px-6 sm:pb-16 md:grid-cols-2 md:px-8 md:pt-16 lg:p-20">
          <Plan
            name="Paperback"
            description="The paperback version of the book, perfect for reading on the go."
            price="49.99"
            href="https://www.amazon.ca/Palettes-Simplicity-Mr-Ryan-Mogk/dp/B0BNYWZKJ9/"
            features={[]}
          />
          <Plan
            featured
            name="Hardcover"
            description="Our favorite version of the book, with a beautiful hardcover."
            price="59.99"
            href="https://www.amazon.ca/Palettes-Simplicity-Mr-Ryan-Mogk/dp/B0BNYWZKJ9/"
            features={[]}
          />
        </div>
      </div>
    </section>
  )
}
