'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '@/shared/lib/i18n'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/* ─── Cards config ─────────────────────────────────────────── */
const CARDS = [
  {
    type:   'photo',
    src:    '/products/small-1.png',
    shape:  'rounded-[2.2rem]',
    width:  232,
    height: 320,
    cls:    'w-[232px] h-[320px] sm:w-[250px] sm:h-[340px]',
  },
  {
    type:   'photo',
    src:    '/products/product-1.png',
    shape:  'rounded-[2.2rem]',
    width:  270,
    height: 360,
    cls:    'w-[270px] h-[360px] sm:w-[290px] sm:h-[390px]',
  },
  {
    type:   'video',
    src:    '/products/big.png',
    shape:  'rounded-[2.2rem]',
    width:  260,
    height: 360,
    cls:    'w-[260px] h-[360px] sm:w-[280px] sm:h-[390px]',
  },
  {
    type:   'oval',
    src:    '/products/small-2.png',
    shape:  'rounded-full',
    width:  270,
    height: 320,
    cls:    'w-[270px] h-[320px] sm:w-[290px] sm:h-[350px]',
  },
  {
    type:   'photo',
    src:    '/products/product-2.png',
    shape:  'rounded-[2.2rem]',
    width:  250,
    height: 320,
    cls:    'w-[250px] h-[320px] sm:w-[270px] sm:h-[350px]',
  },
  {
    type:   'photo',
    src:    '/products/small-3.png',
    shape:  'rounded-[2.2rem]',
    width:  230,
    height: 360,
    cls:    'w-[230px] h-[360px] sm:w-[250px] sm:h-[390px]',
  },
]

export default function Stories() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const { t } = useLang()

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      const getMaxShift = () => Math.max(0, track.scrollWidth - window.innerWidth + 80)
      const shiftFactor = 1.22

      gsap.set(track, { x: 0 })
      gsap.to(track, {
        x: () => -getMaxShift() * shiftFactor,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.4,
          invalidateOnRefresh: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="relative bg-[#f5f2ec]">
      <div className="h-[88svh] lg:h-screen overflow-hidden flex flex-col justify-center">

        {/* Heading */}
        <div className="px-4 sm:px-8 lg:px-14 pt-12 pb-8">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[2.1rem] sm:text-[2.9rem] lg:text-[3.4rem] font-bold text-[#1a3a18] leading-[1.1] max-w-2xl"
          >
            {t('stories.title')}
          </motion.h2>
        </div>

        {/* Horizontal scrolling strip */}
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex items-end gap-4 px-4 sm:px-8 lg:px-14 pb-8 sm:pb-10 will-change-transform"
          >
            {CARDS.map((card, i) => (
              <div
                key={i}
                className={`${card.cls} flex-shrink-0 relative overflow-hidden ${card.shape} bg-[#ddd8cf]`}
              >
                {/* Photo / video card */}
                <>
                  <Image
                    src={card.src}
                    alt=""
                    fill
                    className="object-cover"
                  />
                  {card.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-end p-4 items-start justify-end">
                      <div className="w-10 h-10 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#1a3a18] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
