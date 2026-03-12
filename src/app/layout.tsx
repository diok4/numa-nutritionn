import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Numa Nutrition — Microbiome Health',
  description:
    'Premium supplements backed by science. Transform your gut health with Numa Nutrition\'s precision synbiotic formulas.',
  keywords: 'probiotics, prebiotics, synbiotic, gut health, microbiome, nutrition supplements',
  openGraph: {
    title: 'Numa Nutrition — Microbiome Health',
    description: 'Premium supplements backed by science.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}
      </body>
    </html>
  )
}
