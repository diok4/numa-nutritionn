'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView }           from 'framer-motion'
import gsap                            from 'gsap'
import { ScrollTrigger }               from 'gsap/ScrollTrigger'

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

function CapsuleDiagram() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref as React.RefObject<Element>, { once: true })

  const DOTS = [
    [140, 162], [160, 172], [150, 152], [135, 184], [163, 158],
    [143, 204], [155, 218], [138, 233], [162, 195], [150, 175],
  ]

  return (
    <div ref={ref} className="relative w-full max-w-xs mx-auto">
      <svg viewBox="0 0 300 420" fill="none" className="w-full h-auto">

        <motion.ellipse cx="150" cy="210" rx="95" ry="145"
          fill="#DCEFE6" opacity="0"
          animate={inView ? { opacity: 0.07 } : {}}
          transition={{ duration: 1.2 }}
        />

        <motion.rect
          x="82" y="80" width="136" height="260" rx="68"
          stroke="#7BBFA0" strokeWidth="1.8" fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.6, ease: 'easeOut', delay: 0.1 }}
        />
        <motion.rect
          x="82" y="80" width="136" height="260" rx="68"
          fill="#DCEFE6" opacity="0"
          animate={inView ? { opacity: 0.06 } : {}}
          transition={{ duration: 1.2, delay: 0.5 }}
        />

        <motion.line
          x1="82" y1="210" x2="218" y2="210"
          stroke="#7BBFA0" strokeWidth="1.2" strokeDasharray="5 4"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.9 }}
          style={{ transformOrigin: '150px 210px' }}
        />

        <motion.rect
          x="106" y="120" width="88" height="180" rx="44"
          stroke="#DCEFE6" strokeWidth="1.8" fill="none"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.6 }}
          style={{ transformOrigin: '150px 210px' }}
        />
        <motion.rect
          x="106" y="120" width="88" height="180" rx="44"
          fill="#3B6F57" opacity="0"
          animate={inView ? { opacity: 0.25 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        />

        {DOTS.map(([cx, cy], i) => (
          <motion.circle
            key={i} cx={cx} cy={cy} r={4 + (i % 3)}
            fill="#7BBFA0"
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 0.8 } : {}}
            transition={{ duration: 0.4, delay: 1.1 + i * 0.07 }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
        ))}

        <motion.g
          initial={{ opacity: 0, x: -10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.7 }}
        >
          <line x1="82" y1="128" x2="38" y2="108" stroke="#DCEFE6" strokeWidth="0.8" opacity="0.4" />
          <text x="34" y="103" textAnchor="end" fill="#DCEFE6" fontSize="10" fontWeight="600" opacity="0.85">Outer</text>
          <text x="34" y="116" textAnchor="end" fill="#DCEFE6" fontSize="10" fontWeight="600" opacity="0.85">Capsule</text>
        </motion.g>

        <motion.g
          initial={{ opacity: 0, x: 10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.9 }}
        >
          <line x1="218" y1="155" x2="258" y2="135" stroke="#DCEFE6" strokeWidth="0.8" opacity="0.4" />
          <text x="262" y="130" fill="#DCEFE6" fontSize="10" fontWeight="600" opacity="0.85">Inner</text>
          <text x="262" y="143" fill="#DCEFE6" fontSize="10" fontWeight="600" opacity="0.85">Capsule</text>
        </motion.g>

        <motion.g
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 2.1 }}
        >
          <line x1="150" y1="340" x2="150" y2="370" stroke="#7BBFA0" strokeWidth="0.8" opacity="0.4" />
          <text x="150" y="385" textAnchor="middle" fill="#7BBFA0" fontSize="11" fontWeight="700" opacity="0.9">
            50B AFU Probiotics
          </text>
        </motion.g>

        {[0, 1, 2].map(i => (
          <motion.circle key={`p-${i}`} cx={150} cy={60} r={4} fill="#DCEFE6"
            animate={inView ? { cy: [60, 80, 82], opacity: [0, 1, 0] } : {}}
            transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.75, ease: 'easeIn' }}
          />
        ))}
      </svg>
    </div>
  )
}

export default function Science() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' })

  useEffect(() => {
    if (typeof window === 'undefined') return
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
  }, [])

  const STATS = [
    { to: 4.6, suffix: 'x', label: 'Increase in healthy bacteria', from: 1, decimals: 1 },
    { to: 100, suffix: '%', label: 'Delivery rate to the colon',   from: 0, decimals: 0 },
    { to:  50, suffix: 'B', label: 'AFU guaranteed at shelf life', from: 0, decimals: 0 },
    { to:  24, suffix: '',  label: 'Clinically studied strains',   from: 0, decimals: 0 },
  ]

  const FEATURES = [
    'Acid-resistant outer capsule',
    'Time-release inner capsule',
    'Prebiotic fiber substrate included',
    'Third-party tested for potency',
  ]

  return (
    <section id="science" ref={sectionRef} className="py-24 lg:py-36 bg-forest overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — text */}
          <div className="space-y-10">
            <div className="science-reveal">
              <span className="text-sage/55 text-sm font-semibold uppercase tracking-widest">
                The Science
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-sage leading-tight mt-4">
                Most probiotics
                <br />
                don&apos;t survive
                <br />
                digestion —
                <br />
                <span className="text-mint">ours do.</span>
              </h2>
            </div>

            <p className="text-sage/55 text-lg leading-relaxed science-reveal">
              Our nested capsule technology shields probiotic strains through stomach
              acid and bile salts, delivering 100% of the formula to your colon —
              where it actually works. No refrigeration required.
            </p>

            <div className="grid grid-cols-2 gap-4 science-reveal">
              {STATS.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="p-5 rounded-2xl border border-sage/10 bg-sage/5 hover:bg-sage/10 transition-colors"
                >
                  <div className="text-[1.8rem] font-black text-sage">
                    <Counter from={s.from} to={s.to} suffix={s.suffix} decimals={s.decimals} />
                  </div>
                  <div className="text-sage/45 text-xs mt-1 leading-snug">{s.label}</div>
                </motion.div>
              ))}
            </div>

            <ul className="space-y-3 science-reveal">
              {FEATURES.map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-moss flex items-center justify-center flex-shrink-0">
                    <svg className="w-2.5 h-2.5 text-sage" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-sage/65 text-sm">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — diagram */}
          <motion.div
            initial={{ opacity: 0, x: 45 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.35 }}
            className="relative flex items-center justify-center min-h-[420px]"
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 rounded-full bg-sage/6 blur-3xl" />
            </div>
            <CapsuleDiagram />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
