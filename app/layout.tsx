import '../styles/globals.css'
import { Foldit, Space_Grotesk } from 'next/font/google'

const foldit = Foldit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-foldit',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export const metadata = {
  title: 'MAGA-6900',
  description: 'Making Crypto Great Again',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${foldit.variable} ${spaceGrotesk.variable} font-sans`}>{children}</body>
    </html>
  )
}