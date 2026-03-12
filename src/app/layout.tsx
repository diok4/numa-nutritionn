import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { LangProvider } from '@/shared/lib/i18n'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NUMA Nutrition — Витамины и добавки',
  description:
    'Премиальные витамины и биодобавки для взрослых. Каталог продуктов NUMA Nutrition с научно обоснованными формулами. Доставка по Узбекистану.',
  keywords: 'витамины, добавки, пробиотики, NUMA Nutrition, здоровье, Узбекистан, витамин D, Omega-3',
  openGraph: {
    title: 'NUMA Nutrition — Витамины и добавки',
    description: 'Премиальные витамины и биодобавки. Доставка по Узбекистану.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={jakarta.variable}>
      <body>
        <LangProvider>
          {children}
        </LangProvider>
      </body>
    </html>
  )
}
