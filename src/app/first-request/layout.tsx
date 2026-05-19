import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Making Your First Request',
  description:
    'every API endpoint accepts color(s) via query params. The API endpoints are designed to send and receive color inputs in a variety of formats.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
