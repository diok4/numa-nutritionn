'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLowPerformanceMode } from '@/shared/lib/useLowPerformanceMode'

function Bottle({
  color,
  label,
  delay,
  phase = 0,
  animateBottle,
}: {
  color: string
  label: string
  delay: number
  phase?: number
  animateBottle: boolean
}) {
  return (
    <motion.div
      animate={animateBottle ? { y: [phase * 10 - 10, phase * 10 + 10, phase * 10 - 10] } : undefined}
      transition={animateBottle ? { duration: 5 + delay * 0.5, repeat: Infinity, ease: 'easeInOut', delay } : undefined}
      className="relative w-28 h-44"
    >
      <div
        className="absolute inset-x-3 bottom-0 top-6 rounded-2xl"
        style={{
          background: `linear-gradient(180deg, ${color}88 0%, ${color}44 100%)`,
          border:     `1px solid ${color}55`,
        }}
      />
      <div className="absolute inset-x-7 top-2 h-6 rounded-t-lg" style={{ background: `${color}55` }} />
      <div className="absolute inset-x-5 top-0 h-4 rounded-t-xl" style={{ background: `${color}cc` }} />
      <div
        className="absolute inset-x-5 top-10 bottom-4 rounded-xl flex flex-col items-center justify-center gap-1"
        style={{ background: `${color}1a` }}
      >
        <span className="text-[8px] font-black" style={{ color }}>NUMA</span>
        <div className="w-8 h-px" style={{ background: `${color}44` }} />
        <span className="text-[7px] font-semibold tracking-widest" style={{ color: `${color}99` }}>
          {label}
        </span>
      </div>
      <div className="absolute left-5 top-8 w-1.5 bottom-5 rounded-full opacity-20" style={{ background: color }} />
      <div className="absolute inset-0 rounded-2xl blur-2xl opacity-15" style={{ background: color }} />
    </motion.div>
  )
}

export default function Bundle() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const lowPerformanceMode = useLowPerformanceMode()

  const INCLUSIONS = [
    'Daily Synbiotic — 50B AFU, 24 strains',
    'Daily Multivitamin — 25+ nutrients',
    'Free shipping & free returns',
    'Cancel anytime',
  ]

  const TRUST = [
    '30-day money back guarantee',
    'Subscribe & save',
    'Free US shipping',
    'Doctor formulated',
  ]

  return (
    <section ref={ref} className="py-24 lg:py-36 bg-beige overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="text-moss text-sm font-semibold uppercase tracking-widest">
            Best Value
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-forest mt-3">
            The Complete System
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.05, delay: 0.18 }}
          className="relative rounded-[2.4rem] overflow-hidden bg-forest"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 left-1/4  w-[420px] h-[420px] bg-moss/25  rounded-full blur-[80px]" />
            <div className="absolute bottom-0 right-1/4 w-[340px] h-[340px] bg-sage/8 rounded-full blur-[80px]" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2">

            {/* Left — copy */}
            <div className="p-10 lg:p-16 flex flex-col justify-center">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                              bg-sage/10 border border-sage/18 w-fit mb-8">
                <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                <span className="text-[0.65rem] text-sage font-bold uppercase tracking-widest">
                  Save 20% — Bundle Offer
                </span>
              </div>

              <h3 className="text-[2.4rem] lg:text-[3rem] font-black text-sage leading-tight mb-5">
                Daily Essentials
                <br />
                <span className="text-mint">Duo</span>
              </h3>

              <p className="text-sage/55 text-lg leading-relaxed mb-8 max-w-sm">
                Our two best-selling formulas combined. Daily Synbiotic + Daily
                Multivitamin for complete daily nutrition and gut health.
              </p>

              <ul className="space-y-3 mb-10">
                {INCLUSIONS.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -18 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.55 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-moss flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-sage" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-sage/65 text-sm">{item}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="mb-8">
                <div className="text-sage/35 text-sm line-through">$84.98/mo</div>
                <div className="text-[3rem] font-black text-sage leading-none">
                  $67<span className="text-[1.6rem]">.98</span>
                </div>
                <div className="text-sage/45 text-sm mt-1">/month · save $17</div>
              </div>

              <motion.button
                whileHover={lowPerformanceMode ? undefined : { scale: 1.04, boxShadow: '0 20px 40px rgba(220,239,230,0.18)' }}
                whileTap={{ scale: 0.96 }}
                className="px-10 py-4 bg-sage text-forest rounded-full font-bold text-[0.95rem] w-fit
                           hover:bg-white transition-all duration-300 active:scale-95"
              >
                Get the Bundle →
              </motion.button>
            </div>

            {/* Right — bottles */}
            <div className="relative flex items-center justify-center min-h-[380px] p-10 lg:p-16">
              <div className="absolute w-48 h-48 rounded-full bg-sage/8 blur-3xl" />
              <div className="relative z-10 -mr-8">
                <Bottle color="#DCEFE6" label="SYNBIOTIC" delay={0} phase={-1} animateBottle={!lowPerformanceMode} />
              </div>
              <div className="relative z-20 text-3xl font-black text-sage/20 px-2">+</div>
              <div className="relative z-10 -ml-8">
                <Bottle color="#7BBFA0" label="MULTI" delay={0.6} phase={1} animateBottle={!lowPerformanceMode} />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6 lg:gap-10"
        >
          {TRUST.map(item => (
            <span key={item} className="text-forest/45 text-sm font-medium">
              ✓ {item}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
