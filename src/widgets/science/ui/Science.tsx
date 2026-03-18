'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useLang } from '@/shared/lib/i18n'

import img1 from '../../../../assets/img1.png'
import img3 from '../../../../assets/img3.png'
import img9 from '../../../../assets/img9.png'
import img12 from '../../../../assets/img12.png'

export default function Science() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const { lang, t } = useLang()

  return (
    <section
      id="science"
      ref={sectionRef}
      className="py-14 sm:py-20 lg:py-24 bg-[#fbfbf2] overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* Top Section: Text + Main Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-6 sm:mb-8">
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-8 sm:space-y-10 lg:pr-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-[2.4rem] sm:text-5xl lg:text-[3.6rem] font-normal text-[#1d807d] leading-[1.05] tracking-tight">
                {lang === 'ru' ? 'Ежедневная база для питания и здоровья ЖКТ' :
                 lang === 'uz' ? 'Oshqozon-ichak trakti salomatligi va ovqatlanish uchun kundalik baza' :
                 'Daily Base for GI Health and Nutrition'}
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#1d807d]/75 text-[1.1rem] sm:text-[1.2rem] lg:text-[1.3rem] leading-[1.5] max-w-[580px] font-normal"
            >
              {lang === 'ru' ? 'Мы создали продукты, которые легко вписываются в ваш ритм жизни, обеспечивая организм необходимыми пребиотиками, пробиотиками и метаболиками в точных дозировках.' :
               lang === 'uz' ? 'Biz hayot maromingizga oson mos tushadigan, organizmni zarur prebiotiklar, probiotiklar va metaboliklar bilan aniq dozalarda ta\'minlaydigan mahsulotlarni yaratdik.' :
               'We created products that fit easily into your rhythm of life, providing the body with necessary prebiotics, probiotics, and metabolics in precise dosages.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center px-12 py-4 sm:py-5 rounded-full
                           bg-[#1d807d] text-white text-[1.15rem] sm:text-[1.25rem] font-medium
                           hover:bg-[#166361] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {lang === 'ru' ? 'Перейти в каталог' : lang === 'uz' ? 'Katalogga o\'tish' : 'Go to Catalog'}
              </Link>
            </motion.div>
          </div>

          {/* Right Main Image + Bottom Grid */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <Image
                src={img12}
                alt="Science main"
                className="w-full h-auto object-cover aspect-[4/3] lg:aspect-[16/10]"
              />
            </motion.div>

            {/* Bottom Section: Three Images Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {[img3, img1, img9].map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="relative rounded-[1.5rem] overflow-hidden shadow-xl"
                >
                  <Image
                    src={img}
                    alt={`Science grid ${i}`}
                    className="w-full h-40 sm:h-48 lg:h-56 object-cover hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
