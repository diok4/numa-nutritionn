'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const PRODUCTS = [
  {
    id:          1,
    name:        'Daily Synbiotic',
    tagline:     'Complete gut health',
    description: '50B AFU probiotic + prebiotic formula for comprehensive microbiome support.',
    price:       '$49.99',
    period:      '/month',
    badge:       'Best Seller',
    meta:        '24 strains',
    bg:          ['#0F3D2E', '#2a6048'],
    accent:      '#DCEFE6',
    label:       'SYNBIOTIC',
  },
  {
    id:          2,
    name:        'Daily Multivitamin',
    tagline:     'Complete daily nutrition',
    description: '25+ essential vitamins and minerals derived from real whole-food sources.',
    price:       '$34.99',
    period:      '/month',
    badge:       'New',
    meta:        '25+ nutrients',
    bg:          ['#3B6F57', '#5B8F76'],
    accent:      '#F5F3EE',
    label:       'MULTI',
  },
  {
    id:          3,
    name:        'Energy + Focus',
    tagline:     'Cognitive performance',
    description: 'Nootropic adaptogens for sustained mental clarity without the crash.',
    price:       '$44.99',
    period:      '/month',
    badge:       'Popular',
    meta:        '12 adaptogens',
    bg:          ['#1a5c42', '#2d7a5a'],
    accent:      '#DCEFE6',
    label:       'FOCUS',
  },
  {
    id:          4,
    name:        'Sleep + Restore',
    tagline:     'Deep recovery formula',
    description: 'Magnesium, L-Theanine and calming botanicals for restful sleep.',
    price:       '$39.99',
    period:      '/month',
    badge:       'Fan Fav',
    meta:        '8 botanicals',
    bg:          ['#0a2b1e', '#1a4a35'],
    accent:      '#DCEFE6',
    label:       'SLEEP',
  },
]

function BottleIllustration({
  accent,
  label,
  index,
}: {
  accent: string
  label: string
  index: number
}) {
  return (
    <motion.div
      animate={{ y: [-10, 10, -10] }}
      transition={{ duration: 4.5 + index * 0.6, repeat: Infinity, ease: 'easeInOut' }}
      className="relative w-28 h-40 mx-auto"
    >
      <div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-3 rounded-full blur-md opacity-30"
        style={{ background: accent }}
      />
      <div
        className="absolute inset-x-3 bottom-0 top-6 rounded-2xl"
        style={{ background: `linear-gradient(180deg, ${accent}55 0%, ${accent}22 100%)`,
                 border: `1px solid ${accent}44` }}
      />
      <div className="absolute inset-x-7 top-2 h-6 rounded-t-lg" style={{ background: `${accent}44` }} />
      <div className="absolute inset-x-5 top-0 h-4 rounded-t-xl" style={{ background: `${accent}cc` }} />
      <div
        className="absolute inset-x-5 top-12 bottom-4 rounded-xl flex flex-col items-center justify-center gap-1"
        style={{ background: `${accent}18` }}
      >
        <span className="text-[9px] font-black" style={{ color: accent }}>NUMA</span>
        <div className="w-8 h-px" style={{ background: `${accent}55` }} />
        <span className="text-[7px] font-semibold tracking-widest" style={{ color: `${accent}99` }}>
          {label}
        </span>
      </div>
      <div className="absolute left-5 top-8 w-1.5 bottom-5 rounded-full opacity-25" style={{ background: accent }} />
      <div className="absolute inset-0 rounded-2xl blur-2xl opacity-20 group-hover:opacity-35 transition-opacity duration-500"
           style={{ background: accent }} />
    </motion.div>
  )
}

function ProductCard({
  product,
  index,
}: {
  product: (typeof PRODUCTS)[0]
  index: number
}) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 56 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="group relative rounded-[1.6rem] overflow-hidden cursor-pointer"
      style={{
        background: `linear-gradient(145deg, ${product.bg[0]}, ${product.bg[1]})`,
        boxShadow:  `0 4px 30px ${product.bg[0]}55`,
      }}
    >
      <div
        className="pointer-events-none absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-20"
        style={{ background: product.accent }}
      />

      <div className="relative z-10 p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <span
            className="text-[0.65rem] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
            style={{ background: `${product.accent}28`, color: product.accent }}
          >
            {product.badge}
          </span>
          <span
            className="text-[0.65rem] font-medium px-2.5 py-1 rounded-full"
            style={{ background: `${product.accent}18`, color: product.accent }}
          >
            {product.meta}
          </span>
        </div>

        <div className="flex-1 flex items-center justify-center py-6">
          <BottleIllustration accent={product.accent} label={product.label} index={index} />
        </div>

        <div className="space-y-2">
          <div>
            <h3 className="text-[1.15rem] font-black" style={{ color: product.accent }}>
              {product.name}
            </h3>
            <p className="text-[0.78rem] font-medium opacity-65" style={{ color: product.accent }}>
              {product.tagline}
            </p>
          </div>

          <p className="text-[0.72rem] leading-relaxed opacity-55" style={{ color: product.accent }}>
            {product.description}
          </p>

          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-[1.55rem] font-black" style={{ color: product.accent }}>
                {product.price}
              </span>
              <span className="text-xs opacity-55 ml-1" style={{ color: product.accent }}>
                {product.period}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 rounded-full text-sm font-bold transition-all"
              style={{ background: product.accent, color: product.bg[0] }}
            >
              Shop →
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Products() {
  const headerRef = useRef<HTMLDivElement>(null)
  const inView    = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section id="products" className="py-24 lg:py-36 bg-beige">
      <div className="max-w-7xl mx-auto px-6">

        <div ref={headerRef} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-moss text-sm font-semibold uppercase tracking-widest"
          >
            The Collection
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-forest mt-3 leading-tight"
          >
            Whole body health
            <br />
            starts in the gut.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-forest/60 text-lg max-w-xl mx-auto"
          >
            Every formula is crafted with precision-selected ingredients,
            third-party tested, and backed by clinical research.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="text-center mt-12"
        >
          <button className="group inline-flex items-center gap-2 text-forest font-semibold hover:text-moss transition-colors">
            View all products
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
