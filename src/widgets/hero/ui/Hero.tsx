'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { useLang } from '@/shared/lib/i18n'
import { useLowPerformanceMode } from '@/shared/lib/useLowPerformanceMode'
import threeBottlesImage from '../../../../assets/img14.png'

const GREEN = '#1f4a25'

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
  const reducedMotion = useReducedMotion()
  const canAnimate = !lowPerformanceMode && !reducedMotion

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92svh] lg:min-h-screen flex items-stretch overflow-hidden bg-[#efefea]"
    >
      {/* Left content column */}
      <div className="relative z-10 flex items-center w-full lg:w-[56%] px-6 sm:px-10 lg:px-12 xl:px-16 pt-24 sm:pt-28 lg:pt-28 pb-14 sm:pb-16">
        <div className="max-w-[940px] space-y-6 sm:space-y-7">

          {/* Heading */}
          <motion.h1
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-[2rem] sm:text-[2.55rem] lg:text-[3.75rem] font-medium leading-[1.06] tracking-[-0.02em]"
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
            className="max-w-[560px] text-[0.96rem] sm:text-[1.06rem] lg:text-[1.5rem] leading-[1.42]"
            style={{ color: '#2d4f30' }}
          >
            {t('hero.desc')}
          </motion.p>

          {/* Buttons */}
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex items-center gap-5 pt-1"
          >
            <button
              onClick={() => document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 rounded-full font-medium text-[0.95rem] transition-all duration-200 active:scale-95"
              style={{ backgroundColor: '#174915', color: '#f3f3ee' }}
            >
              {t('hero.shopNow')}
            </button>

            <button
              className="flex items-center gap-1.5 text-[0.95rem] font-normal pb-0.5 transition-all duration-200"
              style={{ color: '#365c39', borderBottom: '1px solid #365c39' }}
            >
              {t('hero.quiz')}
              <span className="text-base leading-none">→</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Right image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="hidden lg:flex absolute right-0 top-0 bottom-0 w-[43%] items-center justify-center pr-8 xl:pr-12"
      >
        <div className="relative w-[min(410px,64%)] aspect-[335/465]">
          <motion.div
            aria-hidden
            animate={canAnimate ? { opacity: [0.2, 0.32, 0.2], scaleX: [0.98, 1.04, 0.98] } : undefined}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-2 left-1/2 h-10 w-[76%] -translate-x-1/2 rounded-full bg-[#0e2a19]/48 blur-2xl"
          />

          <motion.div
            animate={canAnimate ? { y: [0, -7, 0] } : undefined}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative h-full w-full"
            style={{ willChange: canAnimate ? 'transform' : 'auto' }}
          >
            <Image
              src={threeBottlesImage}
              alt="Daily Synbiotic"
              fill
              priority
              className="object-contain object-center drop-shadow-[0_30px_50px_rgba(10,28,18,0.26)]"
              sizes="(min-width: 1280px) 36vw, (min-width: 1024px) 40vw, 100vw"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
