'use client'

import { useRef, useEffect, useState } from 'react'
import Image                           from 'next/image'
import { motion, useInView }           from 'framer-motion'
import gsap                            from 'gsap'
import { ScrollTrigger }               from 'gsap/ScrollTrigger'
import { useLowPerformanceMode }       from '@/shared/lib/useLowPerformanceMode'
import { useLang }                     from '@/shared/lib/i18n'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

function Counter({
  from = 0,
  to,
  suffix = '',
  decimals = 1,
  duration = 1.8,
}: {
  from?: number
  to: number
  suffix?: string
  decimals?: number
  duration?: number
}) {
  const [val, setVal] = useState(from)
  const ref           = useRef<HTMLSpanElement>(null)
  const inView        = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start: number | undefined
    const animate = (ts: number) => {
      if (start === undefined) start = ts
      const p    = Math.min((ts - start) / (duration * 1000), 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setVal(from + (to - from) * ease)
      if (p < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [inView, from, to, duration])

  return <span ref={ref}>{val.toFixed(decimals)}{suffix}</span>
}

const COLLAGE_ITEMS = [
  { src: '/products/big.png',     alt: 'NUMA product hero image' },
  { src: '/products/small-1.png', alt: 'NUMA product thumbnail 1' },
  { src: '/products/small-2.png', alt: 'NUMA product thumbnail 2' },
  { src: '/products/small-3.png', alt: 'NUMA product thumbnail 3' },
] as const

export default function Science() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' })
  const lowPerformanceMode = useLowPerformanceMode()
  const { lang, t } = useLang()
  const [collage, setCollage] = useState([...COLLAGE_ITEMS])

  useEffect(() => {
    if (typeof window === 'undefined' || lowPerformanceMode) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.science-reveal',
        { y: 40, autoAlpha: 0 },
        {
          y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.14, ease: 'power2.out',
          scrollTrigger: { trigger: '#science', start: 'top 72%', once: true },
        }
      )
    })
    return () => ctx.revert()
  }, [lowPerformanceMode])

  const STATS = [
    { to: 4.6, suffix: 'x', label: lang === 'ru' ? 'Рост здоровых бактерий'      : lang === 'uz' ? 'Foydali bakteriyalar o\'sishi' : 'Increase in healthy bacteria', from: 1, decimals: 1 },
    { to: 100, suffix: '%', label: lang === 'ru' ? 'Доставка в толстую кишку'    : lang === 'uz' ? 'Yo\'g\'on ichakka yetkazish'  : 'Delivery rate to the colon',   from: 0, decimals: 0 },
    { to:  50, suffix: 'B', label: lang === 'ru' ? 'КОЕ гарантировано'           : lang === 'uz' ? 'KOU kafolatlangan'            : 'AFU guaranteed at shelf life', from: 0, decimals: 0 },
    { to:  24, suffix: '',  label: lang === 'ru' ? 'Клинически изученных штаммов': lang === 'uz' ? 'Klinik o\'rganilgan shtammlar': 'Clinically studied strains',   from: 0, decimals: 0 },
  ]

  const FEATURES = lang === 'ru'
    ? ['Кислотостойкая внешняя капсула', 'Внутренняя капсула с медленным высвобождением', 'Включён пребиотический субстрат', 'Протестировано независимой лабораторией']
    : lang === 'uz'
    ? ['Kislotaga chidamli tashqi kapsul', 'Sekin chiqaradigan ichki kapsul', 'Prebiotik substrat kiritilgan', 'Mustaqil laboratoriya tomonidan sinovdan o\'tkazilgan']
    : ['Acid-resistant outer capsule', 'Time-release inner capsule', 'Prebiotic fiber substrate included', 'Third-party tested for potency']

  const swapWithMain = (index: number) => {
    if (index <= 0) return
    setCollage(prev => {
      const next = [...prev]
      ;[next[0], next[index]] = [next[index], next[0]]
      return next
    })
  }

  return (
    <section id="science" ref={sectionRef} className="py-14 sm:py-16 lg:py-20 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

          {/* LEFT — text */}
          <div className="space-y-7 sm:space-y-8">
            <div className="science-reveal">
              <h2 className="text-[2rem] sm:text-4xl lg:text-[3rem] font-extrabold text-forest leading-tight">
                {lang === 'ru' ? 'Большинство пробиотиков не выживают при пищеварении —' :
                 lang === 'uz' ? 'Ko\'pgina probiotiklar hazm qilishda omon qolmaydi —' :
                 'Most probiotics don\'t survive digestion —'}
                <br />
                <span className="text-moss">
                  {lang === 'ru' ? 'наши выживают.' : lang === 'uz' ? 'biznikila qoladi.' : 'ours do.'}
                </span>
              </h2>
            </div>

            <p className="text-forest/62 text-[0.98rem] sm:text-lg leading-relaxed science-reveal">
              {t('science.desc')}
            </p>

            <div className="grid grid-cols-2 gap-3.5 science-reveal">
              {STATS.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="p-4 sm:p-5 rounded-2xl border border-forest/10 bg-beige/65 hover:bg-beige transition-colors"
                >
                  <div className="text-[1.55rem] sm:text-[1.8rem] font-extrabold text-forest">
                    <Counter from={s.from} to={s.to} suffix={s.suffix} decimals={s.decimals} />
                  </div>
                  <div className="text-forest/55 text-xs mt-1 leading-snug">{s.label}</div>
                </motion.div>
              ))}
            </div>

            <ul className="space-y-3 science-reveal">
              {FEATURES.map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-moss flex items-center justify-center flex-shrink-0">
                    <svg className="w-2.5 h-2.5 text-cream" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-forest/70 text-sm">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — collage */}
          <motion.div
            initial={{ opacity: 0, x: 45 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.35 }}
            className="science-reveal relative"
          >
            <div className="relative rounded-3xl border border-forest/10 bg-white/95 p-3.5 sm:p-4 shadow-[0_16px_40px_rgba(10,10,10,0.08)]">
              <motion.div
                key={collage[0].src}
                initial={{ opacity: 0.55, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="relative overflow-hidden rounded-2xl bg-beige"
              >
                <Image
                  src={collage[0].src}
                  alt={collage[0].alt}
                  width={789}
                  height={908}
                  className="w-full h-auto max-h-[460px] object-cover"
                />
              </motion.div>

                <div className="mt-3 grid grid-cols-3 gap-2.5">
                {collage.slice(1).map((img, i) => (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => swapWithMain(i + 1)}
                    className="group relative overflow-hidden rounded-xl border border-forest/10 bg-beige hover:border-moss/45 transition-colors"
                    aria-label={`Preview image ${i + 1}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={393}
                      height={704}
                      className="h-28 sm:h-32 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
