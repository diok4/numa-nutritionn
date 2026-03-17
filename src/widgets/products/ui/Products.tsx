'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useLang } from '@/shared/lib/i18n'

const PRODUCTS = [
  {
    id:       1,
    name:     'Daily Synbiotic',
    priceUZS: 149000,
    badge:    'bestseller',
  },
  {
    id:       2,
    name:     'Daily Multivitamin',
    priceUZS: 119000,
    badge:    'new',
  },
  {
    id:       3,
    name:     'Energy + Focus',
    priceUZS: 139000,
    badge:    'new',
  },
  {
    id:       4,
    name:     'Sleep + Restore',
    priceUZS: 129000,
    badge:    'new',
  },
]

const PRODUCT_IMAGES = ['/products/product-1.png', '/products/product-2.png'] as const

function ProductCard({
  product,
  index,
  imageSrc,
  shopLabel,
  formattedPrice,
}: {
  product: (typeof PRODUCTS)[0]
  index: number
  imageSrc: string
  shopLabel: string
  formattedPrice: string
}) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
      className="group relative rounded-2xl bg-[#4C6F43] overflow-hidden flex flex-col"
    >
      {/* Badge */}
      <div className="absolute top-4 left-4 z-10">
        {product.badge === 'bestseller' ? (
          <span className="text-[0.72rem] font-semibold text-[#1a3d18] bg-[#b8d96a] px-3 py-1 rounded-full">
            Bestseller
          </span>
        ) : (
          <span className="text-[0.72rem] font-semibold text-[#d8ecc8] bg-[#2e4a2c]/80 border border-[#5a7a52] px-3 py-1 rounded-full">
            New
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 px-4 sm:px-5 pt-12 pb-5">
        {/* Name */}
        <h3 className="text-center text-[1.3rem] sm:text-[1.45rem] font-medium text-white leading-tight mb-4">
          {product.name}
        </h3>

        {/* Image */}
        <div className="flex-1 flex items-center justify-center py-3">
          <Image
            src={imageSrc}
            alt={product.name}
            width={200}
            height={320}
            className="w-[124px] sm:w-[140px] h-auto object-contain drop-shadow-[0_16px_24px_rgba(0,0,0,0.34)]
                       group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-300"
          />
        </div>

        {/* Button */}
        <div className="mt-4 text-center">
          <motion.div whileTap={{ scale: 0.97 }} className="inline-block">
            <Link
              href="/catalog"
              aria-label={shopLabel}
              className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full
                         bg-[#1c3b1a] text-white text-[0.9rem] font-medium
                         group-hover:bg-white group-hover:text-[#1c3b1a]
                         transition-colors duration-250"
            >
              {shopLabel}
              <span className="opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200">→</span>
            </Link>
          </motion.div>

          <p className="mt-4 text-[#c0d8b4]/70 text-[0.82rem]">
            {formattedPrice}
          </p>
        </div>
      </div>
    </motion.article>
  )
}

export default function Products() {
  const headerRef = useRef<HTMLDivElement>(null)
  const inView    = useInView(headerRef, { once: true, margin: '-80px' })
  const { lang, t } = useLang()

  const formatPrice = (p: number) =>
    p.toLocaleString('ru-RU') + ' ' + (lang === 'en' ? 'UZS' : lang === 'uz' ? 'so\'m' : 'сум')

  return (
    <section
      id="products"
      className="py-12 sm:py-14 lg:py-16 bg-[#1a3d18]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section header — 3-column layout */}
        <div
          ref={headerRef}
          className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_auto] gap-5 lg:gap-8 items-end mb-9 sm:mb-10"
        >
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-[2rem] sm:text-[2.6rem] lg:text-[3.1rem] font-bold text-white leading-[1.08]"
          >
            {t('products.title1')}
            <br />
            {t('products.title2')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[#c8dfc0]/80 text-sm sm:text-base max-w-sm leading-relaxed lg:pt-2"
          >
            {t('products.desc')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:self-end"
          >
            <Link
              href="/catalog"
              className="inline-flex items-center gap-1.5 text-white text-[0.9rem] font-semibold
                         border-b border-white/50 hover:border-white pb-px transition-colors"
            >
              {t('products.viewAll')} →
            </Link>
          </motion.div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {PRODUCTS.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              imageSrc={PRODUCT_IMAGES[i % PRODUCT_IMAGES.length]}
              shopLabel={t('products.shop')}
              formattedPrice={formatPrice(product.priceUZS)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
