'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import dynamic    from 'next/dynamic'
import { useLowPerformanceMode } from '@/shared/lib/useLowPerformanceMode'
import { useLang } from '@/shared/lib/i18n'

const CapsuleScene = dynamic(() => import('./CapsuleScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-24 h-24 rounded-full border-2 border-moss/30 border-t-moss animate-spin" />
    </div>
  ),
})

const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.14, duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  }),
}

const STATS = [
  { value: '50B',  labelKey: 'AFU per dose'              },
  { value: '24',   labelKey: 'Clinically studied strains' },
  { value: '4.6×', labelKey: 'Healthy bacteria increase'  },
]

const BADGES = ['Vegan', 'Gluten Free', 'Non-GMO', 'Clinically Tested']

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const lowPerformanceMode = useLowPerformanceMode()
  const { t } = useLang()

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-cream"
    >
      {/* Background blobs — NUMA green */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4  right-0  w-[480px] h-[480px] bg-moss/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 left-0  w-[380px] h-[380px] bg-moss/8  rounded-full blur-[70px]" />
        <div className="absolute top-1/2  left-1/3 w-[280px] h-[280px] bg-sage/20  rounded-full blur-[60px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center">

          {/* LEFT */}
          <div className="space-y-8">

            <motion.div
              custom={0} initial="hidden" animate="visible" variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-moss/12 border border-moss/25"
            >
              <span className="w-2 h-2 rounded-full bg-moss animate-pulse" />
              <span className="text-xs font-semibold text-moss uppercase tracking-widest">
                {t('hero.badge')}
              </span>
            </motion.div>

            <motion.h1
              custom={1} initial="hidden" animate="visible" variants={fadeUp}
              className="text-5xl sm:text-6xl lg:text-[4.5rem] font-extrabold text-forest leading-[1.04] tracking-tight"
            >
              {t('hero.title1')}
              <br />
              <span className="text-moss">{t('hero.title2')}</span>
              <br />
              {t('hero.title3')}
            </motion.h1>

            <motion.p
              custom={2} initial="hidden" animate="visible" variants={fadeUp}
              className="text-lg text-forest/60 leading-relaxed max-w-[26rem]"
            >
              {t('hero.desc')}
            </motion.p>

            <motion.div
              custom={3} initial="hidden" animate="visible" variants={fadeUp}
              className="flex items-center gap-10"
            >
              {STATS.map(({ value, labelKey }) => (
                <div key={labelKey} className="flex flex-col items-center">
                  <span className="text-2xl font-extrabold text-forest">{value}</span>
                  <span className="text-[0.68rem] text-forest/50 mt-0.5 text-center leading-snug max-w-[6rem]">
                    {labelKey}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.div
              custom={4} initial="hidden" animate="visible" variants={fadeUp}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() =>
                  document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="group flex items-center gap-2 px-8 py-4 bg-moss text-forest rounded-full
                           font-bold text-[0.95rem] hover:bg-mint transition-all duration-300
                           hover:scale-105 hover:shadow-2xl hover:shadow-moss/30 active:scale-95"
              >
                {t('hero.shopNow')}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

              <button
                className="px-8 py-4 border-2 border-forest/20 text-forest rounded-full font-bold
                           text-[0.95rem] hover:border-moss hover:bg-moss/8
                           transition-all duration-300 active:scale-95"
              >
                {t('hero.quiz')}
              </button>
            </motion.div>

            <motion.div
              custom={5} initial="hidden" animate="visible" variants={fadeUp}
              className="flex flex-wrap items-center gap-5 pt-1"
            >
              {BADGES.map(badge => (
                <div key={badge} className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-moss flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-medium text-forest/60">{badge}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT – 3D Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1,  scale: 1    }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="relative flex items-center justify-center h-[480px] lg:h-[580px]"
          >
            <div className="w-full h-full">
              {lowPerformanceMode ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-[280px] h-[280px] rounded-full bg-gradient-to-br from-moss/30 via-mint/20 to-sage/30 blur-2xl" />
                </div>
              ) : (
                <CapsuleScene />
              )}
            </div>

            <motion.div
              animate={lowPerformanceMode ? undefined : { y: [-6, 6, -6] }}
              transition={lowPerformanceMode ? undefined : { duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-8 right-2 lg:right-0 bg-white/90 backdrop-blur-md
                         rounded-2xl p-4 shadow-lg border border-forest/8 max-w-[150px]"
            >
              <p className="text-[0.65rem] text-forest/50 font-medium">{t('hero.survival')}</p>
              <p className="text-[1.6rem] font-extrabold text-forest leading-none mt-0.5">100%</p>
              <p className="text-[0.65rem] text-moss mt-1">{t('hero.reaches')}</p>
            </motion.div>

            <motion.div
              animate={lowPerformanceMode ? undefined : { y: [6, -6, 6] }}
              transition={lowPerformanceMode ? undefined : { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-16 left-0 lg:-left-6 bg-white/90 backdrop-blur-md
                         rounded-2xl p-4 shadow-lg border border-forest/8 max-w-[170px]"
            >
              <p className="text-[0.65rem] text-forest/50 font-medium">Daily Synbiotic</p>
              <p className="text-base font-extrabold text-forest mt-0.5">50B AFU</p>
              <div className="flex gap-1 mt-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <div
                    key={i}
                    className="w-1.5 rounded-full bg-moss"
                    style={{ height: 10 + i * 3, opacity: 0.35 + i * 0.13 }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[0.6rem] text-forest/35 uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={lowPerformanceMode ? undefined : { y: [0, 9, 0] }}
          transition={lowPerformanceMode ? undefined : { duration: 1.6, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-moss/50 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  )
}
