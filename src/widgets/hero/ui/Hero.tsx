'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLang } from '@/shared/lib/i18n'
import { useLowPerformanceMode } from '@/shared/lib/useLowPerformanceMode'

const GREEN = '#1a3d18'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const { t } = useLang()
  const lowPerformanceMode = useLowPerformanceMode()

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92svh] lg:min-h-screen flex items-stretch overflow-hidden bg-[#f5f2ec]"
    >
      {/* Left content column */}
      <div className="relative z-10 flex items-center w-full lg:w-[52%] px-6 sm:px-10 lg:px-16 pt-24 sm:pt-28 lg:pt-28 pb-14 sm:pb-16">
        <div className="max-w-md lg:max-w-lg space-y-5 sm:space-y-6">

          {/* Heading */}
          <motion.h1
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-[2.3rem] sm:text-5xl lg:text-[3.15rem] font-bold leading-[1.08] tracking-tight"
            style={{ color: GREEN }}
          >
            {t('hero.title1')}{' '}
            {t('hero.title2')}{' '}
            {t('hero.title3')}
          </motion.h1>

          {/* Description */}
          <motion.p
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-[0.95rem] sm:text-base leading-relaxed"
            style={{ color: `${GREEN}80` }}
          >
            {t('hero.desc')}
          </motion.p>

          {/* Buttons */}
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex items-center gap-6 pt-1"
          >
            <button
              onClick={() => document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 active:scale-95"
              style={{ backgroundColor: GREEN, color: '#f5f2ec' }}
            >
              {t('hero.shopNow')}
              <sup className="text-[0.55rem] ml-0.5">®</sup>
            </button>

            <button
              className="flex items-center gap-1.5 text-sm font-medium pb-px transition-all duration-200"
              style={{ color: GREEN, borderBottom: `1px solid ${GREEN}50` }}
            >
              {t('hero.quiz')}
              <span className="text-base leading-none">→</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Right image — entrance + continuous float */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="hidden lg:block absolute right-0 top-0 bottom-0 w-[48%]"
      >
        <div className="absolute inset-0 pointer-events-none flex items-end justify-center pb-14">
          <motion.div
            animate={lowPerformanceMode ? undefined : { scaleX: [1.08, 0.78, 1.08], scaleY: [1.02, 0.82, 1.02], opacity: [0.38, 0.14, 0.38] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
            className="w-[60%] h-12 rounded-full bg-[#1a3d18]/35 blur-[12px]"
            style={{ willChange: 'transform, opacity' }}
          />
          <motion.div
            animate={lowPerformanceMode ? undefined : { scaleX: [1, 0.8, 1], opacity: [0.28, 0.08, 0.28] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
            className="absolute bottom-[2px] w-[42%] h-4 rounded-full bg-[#1a3d18]/20"
            style={{ willChange: 'transform, opacity' }}
          />
        </div>

        <motion.div
          animate={lowPerformanceMode ? undefined : { y: [0, -16, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
          className="w-full h-full"
          style={{ willChange: 'transform' }}
        >
          <Image
            src="/welcome-section.png"
            alt="Daily Synbiotic"
            fill
            priority
            className="object-contain object-center"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
