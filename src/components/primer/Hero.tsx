import Image from 'next/image'

import { Button } from '@/components/primer/Button'
import { GridPattern } from '@/components/primer/GridPattern'
import { StarRating } from '@/components/primer/StarRating'
import coverImage from '@/images/cover.png'

function Testimonial() {
  return (
    <figure className="relative mx-auto max-w-md text-center lg:mx-0 lg:text-left">
      <div className="flex justify-center text-emerald-600 lg:justify-start">
        <StarRating />
      </div>
      <blockquote className="mt-2">
        <p className="font-display text-xl font-medium text-zinc-900">
          {`"`}This book is a great addition to my coffee table! So simple &
          people always ask about it.{`"`}
        </p>
      </blockquote>
      <figcaption className="mt-2 text-sm text-zinc-500">
        <strong className="font-semibold text-emerald-600 before:content-['—_']">
          Stacey Solomon
        </strong>
        , Founder at Retail Park
      </figcaption>
    </figure>
  )
}

export function Hero() {
  return (
    <header className="overflow-hidden bg-zinc-100 lg:bg-transparent lg:px-5">
      <div className="mx-auto grid max-w-6xl grid-cols-1 grid-rows-[auto_1fr] gap-y-16 pt-16 md:pt-20 lg:grid-cols-12 lg:gap-y-20 lg:px-3 lg:pb-36 lg:pt-20 xl:py-32">
        <div className="relative flex items-end lg:col-span-5 lg:row-span-2">
          <div className="rounded-br-6xl absolute -bottom-12 -top-20 left-0 right-1/2 z-10 bg-emerald-600 text-white/10 md:bottom-8 lg:-inset-y-32 lg:left-[-100vw] lg:right-full lg:-mr-40">
            <GridPattern
              x="100%"
              y="100%"
              patternTransform="translate(112 64)"
            />
          </div>
          <div className="relative z-10 mx-auto flex w-64 rounded-xl bg-zinc-600 shadow-xl md:w-80 lg:w-auto">
            <Image className="w-full" src={coverImage} alt="" priority />
          </div>
        </div>
        <div className="relative px-4 sm:px-6 lg:col-span-7 lg:pb-14 lg:pl-16 lg:pr-0 xl:pl-20">
          <div className="hidden lg:absolute lg:-top-32 lg:bottom-0 lg:left-[-100vw] lg:right-[-100vw] lg:block lg:bg-zinc-100" />
          <Testimonial />
        </div>
        <div className="bg-white pt-16 lg:col-span-7 lg:bg-transparent lg:pl-16 lg:pt-0 xl:pl-20">
          <div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-0">
            <h1 className="font-display text-5xl font-extrabold text-zinc-900 sm:text-6xl">
              Palettes.
            </h1>
            <p className="mt-4 text-3xl text-zinc-600">
              This book features 87 hand-picked color palettes to help inspire
              your next big project or to alleviate stress after a long days
              work. <br />
              Nothing more, nothing less.
            </p>
            <div className="mt-8 flex gap-4">
              <Button
                href="https://www.amazon.ca/Palettes-Simplicity-Mr-Ryan-Mogk/dp/B0BNYWZKJ9/"
                color="blue"
              >
                Order Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
