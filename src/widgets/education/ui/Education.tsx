'use client'

import { useRef, useEffect }                          from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import gsap                                           from 'gsap'
import { ScrollTrigger }                              from 'gsap/ScrollTrigger'
import { useLowPerformanceMode }                      from '@/shared/lib/useLowPerformanceMode'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

function HumanSilhouette({ lowPerformanceMode }: { lowPerformanceMode: boolean }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref as React.RefObject<Element>, { once: true })

  const BACTERIA_DOTS = [
    [100, 148], [90, 163], [110, 163], [96, 179], [105, 177],
    [100, 193], [88, 154], [112, 154], [100, 167],
  ]

  const LABELS = [
    { text: 'Gut-Brain Axis', dir: 'left',  top: '22%' },
    { text: 'Immune System', dir: 'right', top: '40%' },
    { text: 'Microbiome',    dir: 'left',  top: '55%' },
  ]

  return (
    <div ref={ref} className="relative flex items-center justify-center h-full">

      <motion.div
        animate={lowPerformanceMode ? undefined : { scale: [1, 1.06, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={lowPerformanceMode ? undefined : { duration: 3.5, repeat: Infinity }}
        className="absolute w-80 h-80 rounded-full bg-moss/20 blur-3xl"
      />
      <motion.div
        animate={lowPerformanceMode ? undefined : { scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={lowPerformanceMode ? undefined : { duration: 4.5, repeat: Infinity, delay: 0.8 }}
        className="absolute w-52 h-52 rounded-full bg-sage/15 blur-2xl"
      />

      <svg viewBox="0 0 200 400" fill="none" className="relative z-10 w-44 h-auto">

        <motion.circle cx="100" cy="40" r="28" fill="#3B6F57" opacity="0"
          animate={inView ? { opacity: 0.55 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        />

        <motion.rect x="90" y="66" width="20" height="18" rx="4" fill="#3B6F57" opacity="0"
          animate={inView ? { opacity: 0.55 } : {}}
          transition={{ duration: 0.4, delay: 0.35 }}
        />

        <motion.path d="M62 84 L138 84 L148 218 L52 218 Z" fill="#3B6F57" opacity="0"
          animate={inView ? { opacity: 0.45 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        />

        {[
          'M62 88 L26 158 L32 162 L68 96',
          'M138 88 L174 158 L168 162 L132 96',
        ].map((d, i) => (
          <motion.path key={i} d={d} fill="#3B6F57" opacity="0"
            animate={inView ? { opacity: 0.45 } : {}}
            transition={{ duration: 0.5, delay: 0.55 }}
          />
        ))}

        {[
          'M72 216 L56 338 L72 340 L94 218',
          'M128 216 L144 338 L128 340 L106 218',
        ].map((d, i) => (
          <motion.path key={i} d={d} fill="#3B6F57" opacity="0"
            animate={inView ? { opacity: 0.45 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
          />
        ))}

        <motion.ellipse cx="100" cy="162" rx="34" ry="40" fill="#DCEFE6"
          animate={inView ? (lowPerformanceMode ? { opacity: 0.45 } : { opacity: [0, 0.55, 0.25, 0.55] }) : { opacity: 0 }}
          transition={lowPerformanceMode ? { duration: 0.6 } : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {BACTERIA_DOTS.map(([cx, cy], i) => (
          <motion.circle key={i} cx={cx} cy={cy} r={3 + (i % 3)}
            fill="#0F3D2E"
            animate={inView
              ? (lowPerformanceMode ? { opacity: 0.65, scale: 1 } : { opacity: [0.35, 0.9, 0.35], scale: [1, 1.35, 1] })
              : { opacity: 0 }}
            transition={lowPerformanceMode ? { duration: 0.45, delay: i * 0.05 } : { duration: 2 + (i % 3) * 0.6, repeat: Infinity, delay: i * 0.18 }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
        ))}

        <motion.line x1="100" y1="130" x2="100" y2="50"
          stroke="#DCEFE6" strokeWidth="1" strokeDasharray="5 4" opacity="0.4"
          animate={lowPerformanceMode ? undefined : { strokeDashoffset: [0, -50] }}
          transition={lowPerformanceMode ? undefined : { duration: 2.2, repeat: Infinity, ease: 'linear' }}
        />
      </svg>

      {LABELS.map(({ text, dir, top }, i) => (
        <motion.div
          key={text}
          initial={{ opacity: 0, x: dir === 'left' ? -20 : 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.2 + i * 0.18 }}
          className={`absolute ${dir === 'left' ? 'left-0' : 'right-0'} px-3 py-1.5 rounded-full bg-forest/75 backdrop-blur-sm border border-sage/15`}
          style={{ top }}
        >
          <span className="text-[0.65rem] text-sage/80 font-semibold">{text}</span>
        </motion.div>
      ))}
    </div>
  )
}

const FACTS = [
  {
    icon:  '🧬',
    title: '38 Trillion Microbes',
    body:  'You carry more microbial cells than human cells. Your microbiome is essentially another organ.',
  },
  {
    icon:  '🧠',
    title: 'The Gut-Brain Axis',
    body:  '95% of your serotonin is produced in the gut. Your microbiome directly influences mood and cognition.',
  },
  {
    icon:  '🛡️',
    title: '70% of Immunity',
    body:  'The majority of your immune system lives in your gut. A balanced microbiome is your first line of defense.',
  },
]

export default function Education() {
  const sectionRef          = useRef<HTMLElement>(null)
  const isInView            = useInView(sectionRef, { once: true, margin: '-80px' })
  const lowPerformanceMode  = useLowPerformanceMode()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const y                   = useTransform(scrollYProgress, [0, 1], lowPerformanceMode ? [0, 0] : [40, -40])

  useEffect(() => {
    if (typeof window === 'undefined' || lowPerformanceMode) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.fact-card',
        { y: 36, autoAlpha: 0 },
        {
          y: 0, autoAlpha: 1, stagger: 0.18, duration: 0.85, ease: 'power2.out',
          scrollTrigger: { trigger: '.facts-grid', start: 'top 80%', once: true },
        }
      )
    })
    return () => ctx.revert()
  }, [lowPerformanceMode])

  return (
    <section id="education" ref={sectionRef} className="py-24 lg:py-36 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85 }}
          className="text-center mb-16"
        >
          <span className="text-moss text-sm font-semibold uppercase tracking-widest">
            The Human Microbiome
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-forest mt-3 leading-tight">
            You are more
            <br />
            than human.
          </h2>
          <p className="text-forest/55 text-lg mt-4 max-w-xl mx-auto">
            Your body is home to trillions of microorganisms that profoundly influence
            your health, mood, immunity, and even your DNA expression.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">

          {/* Left — facts */}
          <div className="space-y-5 facts-grid">
            {FACTS.map((fact, i) => (
              <div
                key={i}
                className="fact-card p-6 rounded-2xl bg-white border border-forest/6 shadow-sm
                           hover:shadow-md hover:border-moss/20 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl select-none">{fact.icon}</span>
                  <div>
                    <h3 className="text-[1.05rem] font-bold text-forest group-hover:text-moss transition-colors">
                      {fact.title}
                    </h3>
                    <p className="text-forest/55 text-sm mt-1 leading-relaxed">{fact.body}</p>
                  </div>
                </div>
              </div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="p-6 rounded-2xl bg-forest text-sage"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[2rem] font-black">1,000+</div>
                  <div className="text-sage/60 text-sm mt-0.5">Species in your gut microbiome</div>
                </div>
                <div className="w-16 h-16 rounded-full border-2 border-sage/25 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-sage/15 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-sage/35" />
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sage/55 text-sm leading-relaxed">
                Numa&apos;s synbiotic formula feeds and replenishes these diverse communities
                with precision-selected strains and prebiotic fibres.
              </p>
            </motion.div>
          </div>

          {/* Right — silhouette */}
          <motion.div style={lowPerformanceMode ? undefined : { y }} className="h-[520px] relative">
            <HumanSilhouette lowPerformanceMode={lowPerformanceMode} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 rounded-3xl bg-forest/5 border border-forest/8"
        >
          {[
            { v: '15+',  l: 'Years of research'           },
            { v: '40K+', l: 'Clinical study participants'  },
            { v: '500+', l: 'Published studies'            },
            { v: '99%',  l: 'Customer satisfaction'        },
          ].map(({ v, l }) => (
            <div key={l} className="text-center">
              <div className="text-[1.9rem] font-black text-forest">{v}</div>
              <div className="text-forest/45 text-sm mt-1">{l}</div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
