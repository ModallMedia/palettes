import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'

const guides = [
  {
    released: true,
    href: '/color-name',
    name: 'Color Name',
    description: 'Find the name of the nearest color from a given value.',
  },
  {
    released: true,
    href: '/blending-colors',
    name: 'Color Blending',
    description:
      'Blend two or more colors seamlessly, simulating paint mixing.',
  },
  {
    released: true,
    href: '/color-harmony',
    name: 'Color Harmony',
    description:
      'Discover harmonious color schemes based on a single color input.',
  },
  {
    released: true,
    href: '/gradient-stops',
    name: 'Create Gradient',
    description:
      'Generate smooth color gradients for design and web development.',
  },
  // {
  //   released: false,
  //   href: '/palettes/docs/retrieve-color-names',
  //   name: 'Color Name',
  //   description: 'Find the name of the nearest color from a given value.',
  // },
  // {
  //   released: false,
  //   href: '/palettes/docs/color-information',
  //   name: 'Color Information',
  //   description:
  //     'Get detailed information about colors, including complementary colors, triads, and tints.',
  // },
  // {
  //   released: false,
  //   href: '/palettes/docs/gradient-builder',
  //   name: 'Gradient Builder',
  //   description:
  //     'Craft smooth gradients between two colors along with the number of steps.',
  // },
  // {
  //   released: false,
  //   href: '/palettes/docs/contrast-scoring',
  //   name: 'Contrast Scoring',
  //   description:
  //     'Evaluate text readability over a color, with a score and recommendations for optimal background color.',
  // },
  // {
  //   released: false,
  //   href: '/palettes/docs/color-converting',
  //   name: 'Color Converting',
  //   description:
  //     'Submit a color and receive its equivalent across different color formats.',
  // },
]

export function Guides() {
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="available-endpoints">
        Available Endpoints
      </Heading>
      <div className="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 sm:grid-cols-2 xl:grid-cols-4 dark:border-white/5">
        {guides.map((guide) => (
          <div key={guide.href}>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
              {guide.name}
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 ">
              {guide.description}
            </p>
            <p className="mt-4">
              {guide.released ? (
                <Button href={guide.href} variant="text" arrow="right">
                  Read more
                </Button>
              ) : (
                <>Coming Soon...</>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
