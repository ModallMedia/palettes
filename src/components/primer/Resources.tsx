import Image from 'next/image'

import { Container } from '@/components/primer/Container'
import { SectionHeading } from '@/components/primer/SectionHeading'
import abstractBackgroundImage from '@/images/resources/abstract-background.png'
import discordImage from '@/images/resources/discord.svg'
import figmaImage from '@/images/resources/figma.svg'
import videoPlayerImage from '@/images/resources/video-player.svg'
import { Button } from './Button'

const resources = [
  {
    title: 'Color Name API',
    link: '/color-name',
    description:
      'A free to use simple API to get a name for a color from an input value.',
    image: function FigmaImage() {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-50">
          <Image src={figmaImage} alt="" unoptimized />
        </div>
      )
    },
  },
  {
    title: 'Color Blending API',
    link: '/blending-colors',
    description:
      'A free to use simple API to blend two or more colors seamlessly, simulating paint mixing.',
    image: function VideoPlayerImage() {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-50">
          <Image src={videoPlayerImage} alt="" unoptimized />
        </div>
      )
    },
  },
  {
    title: 'Color Harmony API',
    link: '/color-harmony',
    description:
      'A free to use simple API to discover harmonious color schemes based on a single color input.',
    image: function DiscordImage() {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-50">
          <Image src={discordImage} alt="" unoptimized />
        </div>
      )
    },
  },
]

export function Resources() {
  return (
    <section
      id="color-tools"
      aria-labelledby="color-tools-title"
      className="scroll-mt-14 py-16 sm:scroll-mt-32 sm:py-20 lg:py-32"
    >
      <Container>
        <SectionHeading number="2" id="color-api-resources-title">
          Color API Resources
        </SectionHeading>
        <p className="font-display mt-8 text-4xl font-bold tracking-tight text-zinc-900">
          Enhance Your Projects with our free to use Advanced Color APIs.
        </p>
        <p className="mt-4 text-lg tracking-tight text-zinc-700">
          Explore our free-to-use APIs for advanced color functionalities in
          your digital projects. These APIs are what we used to create Palettes.
        </p>
      </Container>
      <Container size="lg" className="mt-16">
        <ol
          role="list"
          className="-mx-3 grid grid-cols-1 gap-y-10 lg:grid-cols-3 lg:text-center xl:-mx-12 xl:divide-x xl:divide-zinc-400/20"
        >
          {resources.map((resource) => (
            <li
              key={resource.title}
              className="grid auto-rows-min grid-cols-1 items-center gap-8 px-3 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-1 xl:px-12"
            >
              <div className="relative h-48 overflow-hidden rounded-2xl shadow-lg sm:h-60 lg:h-40">
                <resource.image />
              </div>
              <div>
                <h3 className="text-base font-medium tracking-tight text-zinc-900">
                  {resource.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-600">
                  {resource.description}
                </p>
              </div>
              <Button target="_blank" href={resource.link} color="slate">
                View Documentation
              </Button>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
