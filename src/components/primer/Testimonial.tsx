import Image, { type ImageProps } from 'next/image'

import { Container } from '@/components/primer/Container'
import { GridPattern } from '@/components/primer/GridPattern'
import { StarRating } from '@/components/primer/StarRating'

export function Testimonial({
  id,
  author,
  children,
}: {
  id: string
  author: { name: string; role: string; image: ImageProps['src'] }
  children: React.ReactNode
}) {
  return (
    <aside
      id={id}
      aria-label={`Testimonial from ${author.name}`}
      className="relative bg-zinc-100 py-16 sm:py-32"
    >
      <div className="text-zinc-900/10">
        <GridPattern x="50%" patternTransform="translate(0 80)" />
      </div>
      <Container size="xs" className="relative">
        <figure>
          <div className="flex text-zinc-900 sm:justify-center">
            <StarRating />
          </div>
          <blockquote className="font-display mt-10 text-4xl font-medium tracking-tight text-zinc-900 sm:text-center">
            {children}
          </blockquote>
          <figcaption className="mt-10 flex items-center sm:justify-center">
            <div className="overflow-hidden rounded-full bg-zinc-200">
              <Image
                className="h-12 w-12 object-cover"
                src={author.image}
                alt=""
                width={48}
                height={48}
              />
            </div>
            <div className="ml-4">
              <div className="text-base font-medium leading-6 tracking-tight text-zinc-900">
                {author.name}
              </div>
              <div className="mt-1 text-sm text-zinc-600">{author.role}</div>
            </div>
          </figcaption>
        </figure>
      </Container>
    </aside>
  )
}
