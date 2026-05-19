import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Palettes • The Color Palette & Naming API Documentation',
  description:
    'Welcome to Palettes, the ultimate tool for all your color manipulation and palette generation needs. The API provides a comprehensive suite of functions for designers, developers, and color enthusiasts.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
