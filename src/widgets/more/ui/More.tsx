'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLang } from '@/shared/lib/i18n'

import img6 from '../../../../assets/img6.png'

export default function More() {
  const { lang } = useLang()

  const title = lang === 'ru'
    ? 'Вы больше, чем просто человек.'
    : lang === 'uz'
    ? 'Siz oddiy insondan ko\'proqsiz.'
    : 'You are more than just human.'

  const desc = lang === 'ru'
    ? 'В вашем теле живут триллионы микроорганизмов. Забота о них — это забота о вашем иммунитете, коже и настроении. Позвольте вашему телу работать на максимуме.'
    : lang === 'uz'
    ? 'Tanangizda trillionlab mikroorganizmlar yashaydi. Ularga g\'amxo\'rlik qilish immunitetingiz, teringiz va kayfiyatingizga g\'amxo\'rlik qilishdir. Tanangizga maksimal darajada ishlashga yordam bering.'
    : 'Trillions of microorganisms live in your body. Caring for them means caring for your immunity, skin, and mood. Let your body operate at its best.'

  const cta = lang === 'ru'
    ? 'Узнать больше'
    : lang === 'uz'
    ? 'Batafsil'
    : 'Learn More'

  return (
    <section className="bg-[#f2f3ed] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1420px] px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="max-w-[560px] space-y-6 lg:space-y-8">
              <h2 className="text-[#1f8b85] text-[1.85rem] sm:text-[2.4rem] lg:text-[3.2rem] leading-[1.12] font-light tracking-[-0.01em]">
                {title}
              </h2>

              <p className="text-[#1f8b85]/85 text-[1rem] sm:text-[1.08rem] lg:text-[1.24rem] leading-[1.5] font-light max-w-[620px]">
                {desc}
              </p>

              <Link
                href="/catalog"
                className="inline-flex items-center gap-3 rounded-full bg-[#1f8b85] hover:bg-[#18756f] transition-colors px-7 py-2"
              >
                <span className="text-white text-[1.28rem] sm:text-[1.38rem] font-light leading-none">{cta}</span>
                <span className="h-10 w-10 shrink-0 rounded-full bg-[#47c7c0] text-white grid place-items-center">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M8 5l8 7-8 7" />
                  </svg>
                </span>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 22, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="ml-auto max-w-[560px] lg:max-w-[640px] overflow-hidden rounded-[1.6rem] sm:rounded-[2.1rem]">
              <Image
                src={img6}
                alt="Numa product bottle"
                className="w-full h-auto object-cover"
                priority={false}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
