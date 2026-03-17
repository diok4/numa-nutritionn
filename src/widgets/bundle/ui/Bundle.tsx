'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useLowPerformanceMode } from '@/shared/lib/useLowPerformanceMode'
import { useLang } from '@/shared/lib/i18n'

export default function Bundle() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const lowPerformanceMode = useLowPerformanceMode()
  const { lang, t } = useLang()

  const TRUST = lang === 'ru'
    ? ['30 дней — возврат денег', 'Подписка со скидкой', 'Доставка по Узбекистану', 'Разработано врачами']
    : lang === 'uz'
    ? ['30 kunlik pul qaytarish', 'Obuna va tejash', 'O\'zbekiston bo\'ylab yetkazish', 'Shifokorlar tomonidan yaratilgan']
    : ['30-day money back guarantee', 'Subscribe & save', 'Delivery across Uzbekistan', 'Doctor formulated']

  return (
    <section ref={ref} className="py-14 sm:py-16 lg:py-20 bg-beige overflow-hidden">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full overflow-hidden shadow-[0_35px_80px_rgba(5,12,8,0.32)]"
        >
          <Image
            src="/products/bundle-glass-bg.png"
            alt=""
            fill
            aria-hidden={true}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#030906]/62" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020704]/82 via-[#04130a]/62 to-[#030906]/70" />
          <div className="absolute top-0 right-[20%] w-[520px] h-[520px] rounded-full bg-moss/15 blur-[120px]" />
          <div className="absolute bottom-[-120px] left-[12%] w-[420px] h-[420px] rounded-full bg-sage/10 blur-[110px]" />

          <div className="relative z-10">
            <div className="border-y border-white/20 bg-white/[0.08] backdrop-blur-[16px]">
              <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-7 lg:gap-4 px-5 sm:px-8 lg:px-10 py-8 lg:py-10">
                {/* Left */}
                <div className="flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/25 w-fit mb-6">
                    <span className="w-2 h-2 rounded-full bg-moss animate-pulse" />
                    <span className="text-[0.75rem] text-white font-semibold uppercase tracking-[0.08em]">{t('bundle.badge')}</span>
                  </div>

                  <h3 className="text-[2rem] sm:text-[2.5rem] lg:text-[3.2rem] font-black text-white leading-[1.04] mb-5">
                    <span className="inline bg-white/10 text-white px-2 py-1">{t('bundle.nameFull')}</span>
                    <br />
                    <span className="inline bg-white/14 text-white px-2 py-1">{t('bundle.nameGreen')}</span>
                  </h3>

                  <p className="text-white text-[1rem] sm:text-[1.05rem] leading-relaxed mb-6 max-w-[34rem]">{t('bundle.desc')}</p>

                  <div className="mb-7">
                    <div className="text-white/45 text-[1.35rem] sm:text-[1.5rem] line-through leading-none">
                      {lang === 'ru' ? '267 900 сум/мес' : lang === 'uz' ? '267 900 so\'m/oy' : '267,900 UZS/mo'}
                    </div>
                    <div className="text-[2.9rem] sm:text-[3.7rem] font-black text-white leading-[0.95] mt-1">
                      {lang === 'ru' ? '217 000' : lang === 'uz' ? '217 000' : '217,000'}
                      <span className="text-[1.6rem] sm:text-[2rem] ml-2 text-white">{lang === 'ru' ? 'сум' : lang === 'uz' ? 'so\'m' : 'UZS'}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={lowPerformanceMode ? undefined : { scale: 1.03, boxShadow: '0 24px 45px rgba(175,214,196,0.20)' }}
                    whileTap={{ scale: 0.97 }}
                    className="px-10 py-3.5 bg-white/12 border border-white/50 text-white rounded-full font-black text-[1.3rem] sm:text-[1.5rem] w-fit hover:bg-white/20 transition-all duration-300"
                  >
                    {t('bundle.cta')}
                  </motion.button>
                </div>

                {/* Right */}
                <div className="relative flex items-center justify-center min-h-[320px] lg:min-h-[470px]">
                  <div className="absolute w-[360px] h-[360px] rounded-full bg-sage/8 blur-[90px]" />
                  <div className="absolute w-[280px] h-[280px] rounded-full bg-moss/15 blur-[70px] right-8 bottom-16" />

                  <motion.div
                    initial={{ opacity: 0, y: 22, scale: 0.96 }}
                    animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-20 w-full max-w-[320px] sm:max-w-[360px]"
                  >
                    <Image
                      src="/products/small-1.png"
                      alt="Detox duo"
                      width={310}
                      height={397}
                      className="w-full h-auto object-contain drop-shadow-[0_30px_45px_rgba(0,0,0,0.45)] rounded-3xl"
                    />
                  </motion.div>
                </div>
              </div>

              <div className="px-5 sm:px-8 lg:px-10 pb-6">
                <div className="flex flex-wrap items-center gap-3.5">
                  {TRUST.map(item => (
                    <span key={item} className="px-4 py-2 rounded-full border border-white/28 bg-white/[0.08] text-white text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
