import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SaaS Boilerplate',
  description: 'A modern SaaS boilerplate built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
