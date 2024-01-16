import Image, { type ImageProps } from 'next/image'
import clsx from 'clsx'

import { Container } from '@/components/primer/Container'
import {
  Expandable,
  ExpandableButton,
  ExpandableItems,
} from '@/components/primer/Expandable'
import avatarImage3 from '@/images/avatars/avatar-3.png'
import avatarImage4 from '@/images/avatars/avatar-4.png'
import avatarImage5 from '@/images/avatars/avatar-5.png'
import avatarImage6 from '@/images/avatars/avatar-6.png'
import avatarImage7 from '@/images/avatars/avatar-7.png'
import avatarImage8 from '@/images/avatars/avatar-8.png'
import avatarImage9 from '@/images/avatars/avatar-9.png'
import avatarImage10 from '@/images/avatars/avatar-10.png'
import avatarImage11 from '@/images/avatars/avatar-11.png'
const testimonials = [
  [
    {
      content:
        'The color palettes in this book have transformed the way I approach my design projects. Each palette is a source of endless inspiration.',
      author: {
        name: 'Antonio Littel',
        role: 'Graphic Designer',
        image: avatarImage3,
      },
    },
    {
      content:
        'As someone who struggles with color choices, this book has been a game-changer. The palettes are beautifully curated and easy to apply.',
      author: {
        name: 'Lynn Nolan',
        role: 'Interior Decorator',
        image: avatarImage4,
      },
    },
    {
      content:
        'I never knew how impactful the right color palette could be until I got this book. It’s a must-have for any creative professional.',
      author: {
        name: 'Krista Prosacco',
        role: 'Creative Director',
        image: avatarImage9,
      },
    },
  ],
  //
  //
  //
  //
  [
    {
      content:
        "This book is not just about colors; it's about bringing life to my artwork. Each palette tells a story, adding depth to my projects.",
      author: {
        name: 'Cameron Considine',
        role: 'Artist & Illustrator',
        image: avatarImage7,
      },
    },
    {
      content:
        "I'm amazed at how this book simplifies complex color theories into practical, usable palettes. It's my go-to resource now.",
      author: {
        name: 'Regina Wisoky',
        role: 'Freelance Designer',
        image: avatarImage11,
      },
    },
    {
      content:
        'As a photographer, finding the right color balance is crucial. This book has been an invaluable tool in my editing process.',
      author: {
        name: 'Vernon Cummerata',
        role: 'Photographer',
        image: avatarImage8,
      },
    },
  ],
  [
    {
      content:
        "The insights behind each palette have deeply influenced my approach to branding projects. It's incredible how much thought is packed into this book.",
      author: {
        name: 'Steven Hackett',
        role: 'Brand Strategist',
        image: avatarImage5,
      },
    },
    {
      content:
        "I gifted this book to my team, and it's been a wonderful source of collaboration and inspiration in our design work.",
      author: {
        name: 'Carla Schoen',
        role: 'Team Lead, Graphic Design',
        image: avatarImage10,
      },
    },
    {
      content:
        'The combination of color theory and practical examples makes this book an essential resource for anyone in the creative field.',
      author: {
        name: 'Leah Kiehn',
        role: 'Art Director',
        image: avatarImage6,
      },
    },
  ],
]

function Testimonial({
  author,
  children,
}: {
  author: { name: string; role: string; image: ImageProps['src'] }
  children: React.ReactNode
}) {
  return (
    <figure className="rounded-4xl p-8 shadow-md ring-1 ring-zinc-900/5">
      <blockquote>
        <p className="text-lg tracking-tight text-zinc-900 before:content-['“'] after:content-['”']">
          {children}
        </p>
      </blockquote>
      <figcaption className="mt-6 flex items-center">
        <div className="overflow-hidden rounded-full bg-zinc-50">
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
  )
}

export function Testimonials() {
  return (
    <section className="py-8 sm:py-10 lg:py-16">
      <Container className="text-center">
        <h2 className="font-display text-4xl font-bold tracking-tight text-zinc-900">
          Some kind words from early customers...
        </h2>
        <p className="mt-4 text-lg tracking-tight text-zinc-600">
          I worked with a small group of early access customers to make sure all
          of the content in the book was exactly what they needed. Hears what
          they had to say about the finished product.
        </p>
      </Container>
      <Expandable className="group mt-16">
        <ul
          role="list"
          className="mx-auto grid max-w-2xl grid-cols-1 gap-8 px-4 lg:max-w-7xl lg:grid-cols-3 lg:px-8"
        >
          {testimonials
            .map((column) => column[0])
            .map((testimonial, testimonialIndex) => (
              <li key={testimonialIndex} className="lg:hidden">
                <Testimonial author={testimonial.author}>
                  {testimonial.content}
                </Testimonial>
              </li>
            ))}
          {testimonials.map((column, columnIndex) => (
            <li
              key={columnIndex}
              className="hidden group-data-[expanded]:list-item lg:list-item"
            >
              <ul role="list">
                <ExpandableItems>
                  {column.map((testimonial, testimonialIndex) => (
                    <li
                      key={testimonialIndex}
                      className={clsx(
                        testimonialIndex === 0 && 'hidden lg:list-item',
                        testimonialIndex === 1 && 'lg:mt-8',
                        testimonialIndex > 1 && 'mt-8',
                      )}
                    >
                      <Testimonial author={testimonial.author}>
                        {testimonial.content}
                      </Testimonial>
                    </li>
                  ))}
                </ExpandableItems>
              </ul>
            </li>
          ))}
        </ul>
        <ExpandableButton>Read more testimonials</ExpandableButton>
      </Expandable>
    </section>
  )
}
