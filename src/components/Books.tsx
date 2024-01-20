import Link from 'next/link'
import { GridPattern } from './GridPattern'
import { Heading } from './Heading'
import { ChatBubbleIcon } from './icons/ChatBubbleIcon'
import { EnvelopeIcon } from './icons/EnvelopeIcon'
import { UserIcon } from './icons/UserIcon'
import { UsersIcon } from './icons/UsersIcon'

interface Resource {
  href: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  pattern: Omit<
    React.ComponentPropsWithoutRef<typeof GridPattern>,
    'width' | 'height' | 'x'
  >
}

const Icon = (props: React.ComponentPropsWithoutRef<'svg'>) => {
  return (
    <svg {...props} viewBox="0 0 596 179">
      <rect
        width="179.64"
        height="178.551"
        rx="89.2757"
        transform="matrix(1 0 0 -1 415.633 178.551)"
        fill="#264653"
        stroke="#264653"
      />
      <rect
        width="179.64"
        height="178.551"
        rx="89.2757"
        transform="matrix(-1 0 0 1 490.004 0)"
        fill="#2A9D8F"
        stroke="#2A9D8F"
      />
      <rect
        width="178.551"
        height="178.551"
        rx="89.2757"
        transform="matrix(-1 0 0 1 384.734 0)"
        fill="#E9C46A"
        stroke="#E9C46A"
      />
      <rect
        width="177.463"
        height="178.551"
        rx="88.7313"
        transform="matrix(-1 0 0 1 280.555 0)"
        fill="#F4A261"
        stroke="#F4A261"
      />
      <rect
        width="177.463"
        height="178.551"
        rx="88.7313"
        transform="matrix(-1 0 0 1 177.465 0)"
        fill="#E76F51"
        stroke="#E76F51"
      />
    </svg>
  )
}

const resources: Array<Resource> = [
  {
    href: '/book',
    name: 'Palettes.',
    description: 'Purchase our book, built using these free APIs!',
    icon: Icon,
    pattern: {
      y: 16,
      squares: [
        [0, 1],
        [1, 3],
      ],
    },
  },
  // {
  //   href: '/conversations',
  //   name: 'Conversations',
  //   description:
  //     'Learn about the conversation model and how to create, retrieve, update, delete, and list conversations.',
  //   icon: ChatBubbleIcon,
  //   pattern: {
  //     y: -6,
  //     squares: [
  //       [-1, 2],
  //       [1, 3],
  //     ],
  //   },
  // },
  // {
  //   href: '/messages',
  //   name: 'Messages',
  //   description:
  //     'Learn about the message model and how to create, retrieve, update, delete, and list messages.',
  //   icon: EnvelopeIcon,
  //   pattern: {
  //     y: 32,
  //     squares: [
  //       [0, 2],
  //       [1, 4],
  //     ],
  //   },
  // },
  // {
  //   href: '/groups',
  //   name: 'Groups',
  //   description:
  //     'Learn about the group model and how to create, retrieve, update, delete, and list groups.',
  //   icon: UsersIcon,
  //   pattern: {
  //     y: 22,
  //     squares: [[0, 1]],
  //   },
  // },
]
export function Books() {
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="products">
        Products
      </Heading>
      <div className="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 sm:grid-cols-2 xl:grid-cols-4 dark:border-white/5">
        {resources.map((resource, index) => (
          <Link
            href={resource.href}
            key={index}
            target="_blank"
            className="relative flex aspect-[240/280] w-full cursor-pointer flex-row transition-transform duration-500 ease-in-out"
          >
            <div className="flex h-full flex-row overflow-hidden rounded-l-lg border-b border-l border-zinc-100 xl:h-[280px] dark:border-zinc-700">
              <div className=" h-full w-6 bg-gradient-to-r from-zinc-100 to-white dark:from-zinc-700 dark:to-zinc-900" />
              <div className=" h-full w-1 bg-gradient-to-l from-zinc-100 to-white dark:from-zinc-700 dark:to-zinc-900" />
              <div className=" h-full w-1 bg-gradient-to-r from-zinc-100 to-white dark:from-zinc-700 dark:to-zinc-900" />
            </div>
            <div className="flex w-full flex-col rounded-r-md bg-gradient-to-r from-white to-zinc-100  p-6 xl:h-[280px] dark:from-zinc-900 dark:to-zinc-700">
              <p className="font-bold text-zinc-900 dark:text-white">
                {resource.name}
              </p>
              <p className="text-xs text-zinc-700 dark:text-zinc-200">
                {resource.description}
              </p>
              <div className="flex w-full grow items-end justify-start">
                <resource.icon className="mt-auto h-8 fill-zinc-600 stroke-zinc-100" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
