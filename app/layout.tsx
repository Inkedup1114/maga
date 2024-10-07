
import '../styles/globals.css'
import localFont from 'next/font/local'

const sixtyfour = localFont({
  src: [
    {
      path: '../public/fonts/Sixtyfour-Variable.ttf',
      style: 'normal',
    }
  ],
  variable: '--font-sixtyfour',
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
    <html lang="en" className={sixtyfour.variable}>
      <body>{children}</body>
    </html>
  )
}
