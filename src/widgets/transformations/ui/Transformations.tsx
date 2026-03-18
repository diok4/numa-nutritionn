'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLang } from '@/shared/lib/i18n'

import img2 from '../../../../assets/img2.png'
import img5 from '../../../../assets/img5.png'

export default function Transformations() {
  const { lang } = useLang()
  const [activeSlide, setActiveSlide] = useState(0)

  const topTitle = lang === 'ru'
    ? 'Более 1 000 000 трансформаций здоровья (и это только начало).'
    : lang === 'uz'
    ? '1 000 000 dan ortiq sog\'liq transformatsiyasi (va bu faqat boshlanishi).'
    : 'Over 1,000,000 health transformations (and this is only the beginning).'

  const topDesc = lang === 'ru'
    ? 'Реальные люди, чей путь к здоровью начался с NUMA.'
    : lang === 'uz'
    ? 'Sog\'lom hayot sari yo\'li NUMA bilan boshlangan haqiqiy insonlar.'
    : 'Real people whose wellness journey started with NUMA.'

  const storiesTitle = lang === 'ru'
    ? 'Истории учёных, новаторов и таких же людей, как вы.'
    : lang === 'uz'
    ? 'Olimlar, novatorlar va siz kabi insonlar hikoyalari.'
    : 'Stories from scientists, innovators, and people like you.'

  const storiesFeedTitle = lang === 'ru'
    ? 'Истории ученых, инноваторов и таких же пользователей, как вы.'
    : lang === 'uz'
    ? 'Olimlar, innovatorlar va siz kabi foydalanuvchilar hikoyalari.'
    : 'Stories from scientists, innovators, and users like you.'

  const slides = [
    { image: img2, alt: 'Health transformation story 1' },
    { image: img5, alt: 'Health transformation story 2' },
  ]

  const cards = [img5, img5, img2, img5, img2]

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [slides.length])

  const goPrev = () => setActiveSlide(prev => (prev - 1 + slides.length) % slides.length)
  const goNext = () => setActiveSlide(prev => (prev + 1) % slides.length)

  return (
    <section className="bg-[#1f8b85] py-10 sm:py-14 lg:py-16 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-[980px] text-center"
        >
          <h2 className="text-white text-[1.55rem] sm:text-[2rem] lg:text-[2.55rem] leading-[1.15] font-light">
            {storiesTitle}
          </h2>
          <p className="mt-4 text-white text-[1.45rem] sm:text-[1.9rem] lg:text-[2.25rem] leading-[1.14] font-light">
            {topTitle}
          </p>
          <p className="mt-3 text-white/75 text-[0.92rem] sm:text-[1rem] lg:text-[1.08rem] font-light">
            {topDesc}
          </p>
        </motion.div>

        <div className="mt-7 sm:mt-9">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-[1rem] sm:rounded-[1.35rem] lg:rounded-[1.6rem]"
          >
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0.3, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="relative h-[230px] sm:h-[360px] lg:h-[520px]"
            >
              <Image
                src={slides[activeSlide].image}
                alt={slides[activeSlide].alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1200px) 92vw, 1400px"
              />
            </motion.div>

            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous slide"
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-9 w-9 sm:h-11 sm:w-11 rounded-full
                         bg-white/75 text-[#1f8b85] hover:bg-white transition-colors grid place-items-center"
            >
              <span className="text-lg sm:text-xl leading-none">‹</span>
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next slide"
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 h-9 w-9 sm:h-11 sm:w-11 rounded-full
                         bg-white/75 text-[#1f8b85] hover:bg-white transition-colors grid place-items-center"
            >
              <span className="text-lg sm:text-xl leading-none">›</span>
            </button>

            <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    activeSlide === idx ? 'w-7 bg-white' : 'w-2.5 bg-white/65'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-10 max-w-[760px] text-white text-[1.85rem] sm:text-[2.3rem] lg:text-[3rem] leading-[1.12] font-light"
        >
          {storiesFeedTitle}
        </motion.h3>

        <div className="mt-6 sm:mt-8 flex gap-4 sm:gap-5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {cards.map((img, index) => (
            <motion.div
              key={`${index}-${img.src}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[260px] sm:h-[330px] lg:h-[380px] w-[170px] sm:w-[220px] lg:w-[250px] shrink-0 overflow-hidden rounded-[1rem] sm:rounded-[1.2rem]"
            >
              <Image
                src={img}
                alt={`Story card ${index + 1}`}
                fill
                className="object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
