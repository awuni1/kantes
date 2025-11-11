import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'KANTES - From Idea to Construction Drawings in One Prompt',
  description: 'AI-powered platform that lets architects describe buildings in plain English and instantly generates code-compliant, editable 3D BIM models.',
  icons: {
    icon: '/assets/kantes-logo.png',
    apple: '/assets/kantes-logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
