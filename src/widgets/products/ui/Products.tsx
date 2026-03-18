'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useLang } from '@/shared/lib/i18n'
import productImage from '../../../../assets/img13.png'

const PRODUCTS = [
  {
    id:       1,
    name:     'Daily Synbiotic',
    priceUZS: 149000,
    badge:    'bestseller',
    code:     'DS-01',
  },
  {
    id:       2,
    name:     'Daily Multivitamin',
    priceUZS: 119000,
    badge:    'new',
    code:     'DM-02',
  },
  {
    id:       3,
    name:     'Energy + Focus',
    priceUZS: 139000,
    badge:    'new',
    code:     'AM-02',
  },
  {
    id:       4,
    name:     'Sleep + Restore',
    priceUZS: 129000,
    badge:    'new',
    code:     'PM-02',
  },
]

const PRODUCT_IMAGES = [productImage, productImage, productImage, productImage] as const

function ProductCard({
  product,
  index,
  imageSrc,
  shopLabel,
  formattedPrice,
}: {
  product: (typeof PRODUCTS)[0]
  index: number
  imageSrc: (typeof PRODUCT_IMAGES)[number]
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
      className="group relative min-h-[380px] sm:min-h-[420px] lg:min-h-[460px] rounded-2xl bg-[#4abcb8]
                 border border-[#66d6d2]/45 overflow-hidden flex flex-col
                 shadow-[0_14px_30px_rgba(5,64,62,0.20)]"
    >
      {/* Badge */}
      <div className="absolute top-4 left-4 z-10">
        {product.badge === 'bestseller' ? (
          <span className="text-[0.62rem] sm:text-[0.68rem] font-semibold text-[#223816] bg-[#d7ea5a] px-3 py-1 rounded-full uppercase tracking-wider">
            Bestseller
          </span>
        ) : (
          <span className="text-[0.62rem] sm:text-[0.68rem] font-semibold text-[#edf7eb] bg-[#6a7f6a] px-3 py-1 rounded-full uppercase tracking-wider">
            New
          </span>
        )}
      </div>
      <div className="absolute top-4 right-4 z-10">
        <span className="text-[0.62rem] sm:text-[0.68rem] leading-none font-medium text-[#ecfffd] border border-[#d6f8f5] px-3 py-1 rounded-full">
          {product.code}
        </span>
      </div>

      <div className="flex flex-col flex-1 px-4 sm:px-6 pt-14 sm:pt-16 pb-8 sm:pb-10 relative z-10">
        {/* Name */}
        <h3 className="text-center text-[1.5rem] sm:text-[1.8rem] font-medium text-white leading-tight tracking-tight mb-8 sm:mb-10">
          {product.name}
        </h3>

        {/* Image */}
        <div className="flex-1 flex items-center justify-center py-4">
          <Image
            src={imageSrc}
            alt={product.name}
            width={240}
            height={400}
            className="w-[140px] sm:w-[160px] h-auto object-contain scale-[1.35] sm:scale-[1.45]
                       drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)]
                       group-hover:scale-[1.4] sm:group-hover:scale-[1.5] group-hover:-translate-y-2 transition-transform duration-500 ease-out"
          />
        </div>

        {/* Button container */}
        <div className="mt-auto text-center pt-8 relative z-20">
          <motion.div whileTap={{ scale: 0.96 }} className="inline-block">
            <Link
              href="/catalog"
              aria-label={shopLabel}
              className="inline-flex items-center justify-center px-10 py-3.5 sm:py-4 rounded-full
                         bg-[#163312] text-white text-[1.05rem] sm:text-[1.15rem] font-normal
                         hover:bg-[#0f240c] transition-all duration-300 shadow-lg"
            >
              {shopLabel}
            </Link>
          </motion.div>

          <p className="mt-5 text-[#d9f3f1]/90 text-[0.8rem] sm:text-[0.85rem] font-light tracking-wide italic leading-none">
            {formattedPrice}
          </p>
        </div>
      </div>
    </motion.article>
  )
}

export default function Products() {
  const { lang, t } = useLang()

  const formatPrice = (p: number) =>
    p.toLocaleString('ru-RU') + ' ' + (lang === 'en' ? 'UZS' : lang === 'uz' ? 'so\'m' : 'сум')

  return (
    <section
      id="products"
      className="py-7 sm:py-8 lg:py-10 bg-[#1d807d]"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-5">
        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 lg:gap-4">
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

        <div className="mt-5 flex justify-center">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 text-[#f3fffd] text-[0.9rem] font-semibold
                       border-b border-[#f3fffd]/60 hover:border-[#f3fffd] pb-px transition-colors"
          >
            {t('products.viewAll')} →
          </Link>
        </div>
      </div>
    </section>
  )
}
