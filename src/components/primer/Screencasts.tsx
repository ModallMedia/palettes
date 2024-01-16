/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'

import { Container } from '@/components/primer/Container'
import { SectionHeading } from '@/components/primer/SectionHeading'
import duotoneImage from '@/images/screencasts/duotone.svg'
import gridsImage from '@/images/screencasts/grids.svg'
import setupImage from '@/images/screencasts/setup.svg'
import strokesImage from '@/images/screencasts/strokes.svg'
import {
  ArrowPathIcon,
  ArrowPathRoundedSquareIcon,
  BuildingOfficeIcon,
  ChartPieIcon,
  CogIcon,
  GifIcon,
  GlobeAmericasIcon,
  ShoppingCartIcon,
  SunIcon,
} from '@heroicons/react/24/solid'

const videos = [
  {
    title: 'Sunset Serenity',
    description:
      'Explore the warm, soothing hues of the Sunset Serenity palette, perfect for creating a calm and welcoming atmosphere.',
    image: setupImage,
    Icon: SunIcon,
    runtime: { minutes: 16, seconds: 54 },
  },
  {
    title: 'Urban Elegance',
    description:
      'Discover the Urban Elegance palette, embodying the chic and sophisticated tones of modern city life.',
    image: gridsImage,
    Icon: BuildingOfficeIcon,
    runtime: { minutes: 9, seconds: 12 },
  },
  {
    title: 'Nature’s Whisper',
    description:
      'Dive into Nature’s Whisper palette, featuring earthy greens and browns that evoke a sense of tranquility and connection to the natural world.',
    image: strokesImage,
    Icon: GlobeAmericasIcon,
    runtime: { minutes: 23, seconds: 25 },
  },
  {
    title: 'Ocean Depths',
    description:
      'Immerse yourself in the deep, rich blues of the Ocean Depths palette, inspired by the mysterious and serene underwater world.',
    image: duotoneImage,
    Icon: ArrowPathIcon,
    runtime: { minutes: 28, seconds: 44 },
  },
]

export function Screencasts() {
  return (
    <section
      id="color-insights"
      aria-labelledby="color-insights-title"
      className="scroll-mt-14 py-16 sm:scroll-mt-32 sm:py-20 lg:py-32"
    >
      <Container>
        <SectionHeading number="1" id="color-insights-title">
          Color Insights
        </SectionHeading>
        <p className="font-display mt-8 text-4xl font-bold tracking-tight text-zinc-900">
          Dive into the world of colors with in-depth insights and stories.
        </p>
        <p className="mt-4 text-lg tracking-tight text-zinc-700">
          Discover the inspiration and theory behind each hand-picked palette in
          'palettes', enhancing your understanding and appreciation of color.
        </p>
      </Container>

      <Container size="lg" className="mt-16">
        <ol
          role="list"
          className="grid grid-cols-1 gap-x-8 gap-y-10 [counter-reset:video] sm:grid-cols-2 lg:grid-cols-4"
        >
          {videos.map((video) => (
            <li key={video.title} className="[counter-increment:video]">
              <div
                className="relative flex h-44 items-center justify-center rounded-2xl px-6 shadow-lg max-sm:aspect-video"
                style={{
                  backgroundImage:
                    'conic-gradient(from -49.8deg at 50% 50%, #E0E0E0 0deg, #FFFFFF 59.07deg, #E0E0E0 185.61deg, #FFFFFF 284.23deg, #FFFFFF 329.41deg, #E0E0E0 360deg)',
                }}
              >
                <div className="flex overflow-hidden rounded">
                  <Image src={video.image} alt="" unoptimized />
                </div>
                <div className="absolute bottom-2 left-2 flex items-center rounded-lg bg-black/30 px-1.5 py-0.5 text-sm text-white [@supports(backdrop-filter:blur(0))]:bg-black/20 [@supports(backdrop-filter:blur(0))]:backdrop-blur">
                  <video.Icon className="h-4 w-4" />
                </div>
              </div>
              <h3 className="mt-8 text-base font-medium tracking-tight text-zinc-900 before:mb-2 before:block before:font-mono before:text-sm before:text-zinc-500 before:content-[counter(video,decimal-leading-zero)]">
                {video.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-600">{video.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
