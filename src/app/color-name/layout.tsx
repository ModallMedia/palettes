import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Color Name API',
  description:
    'This API endpoint allows you to get the name of a color based on its hex code.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
