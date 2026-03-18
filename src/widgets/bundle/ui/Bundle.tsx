'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useLang } from '@/shared/lib/i18n'

import img7 from '../../../../assets/img7.png'
import imageBg from '../../../../assets/image.png'

export default function Bundle() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { lang } = useLang()

  return (
    <section ref={ref} id="science-capsule" className="py-14 sm:py-20 lg:py-24 bg-white overflow-hidden relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#6f89a8]">
        <Image
          src={imageBg}
          alt="Science background"
          fill
          className="object-cover object-center opacity-100"
        />
        <div className="absolute inset-0 bg-[#0a1510]/22" />
      </div>

      <div className="relative z-10 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto w-full max-w-[1430px] min-h-[430px] lg:min-h-[550px] rounded-[2rem] sm:rounded-[2.25rem] overflow-hidden
                     bg-white/[0.09] backdrop-blur-[10px]
                     flex flex-col lg:flex-row relative"
        >
          {/* Left Text Content */}
          <div className="flex-1 px-8 py-10 sm:px-10 sm:py-12 lg:px-[76px] lg:py-[64px] flex flex-col justify-center relative z-10">
            <div className="max-w-[620px] mb-auto">
              <h2 className="text-[1.8rem] sm:text-[2.2rem] lg:text-[3.05rem] font-extralight text-white/95 leading-[1.2] mb-10">
                {lang === 'ru' ? (
                  <>
                    Большинство пробиотиков не <br />
                    выживают при пищеварении. <br />
                    <span className="font-light opacity-90">DS-01® — выживает</span>
                  </>
                ) : (
                  <>
                    Most probiotics don't <br />
                    survive digestion. <br />
                    <span className="font-light opacity-90">DS-01® survives</span>
                  </>
                )}
              </h2>
            </div>

            {/* Stats Card */}
            <div className="mt-8">
              <div className="inline-flex min-w-[360px] sm:min-w-[420px] items-center justify-between gap-8 sm:gap-12 px-6 py-6 sm:px-10 sm:py-8 rounded-[1.9rem] bg-white/[0.06] backdrop-blur-[8px]">
                <div className="text-white/80 text-[1rem] sm:text-[1.12rem] leading-[1.45] max-w-[220px]">
                  {lang === 'ru' ? '10x эффективнее обычных аналогов.' : '10x more effective than common analogues.'}
                </div>
                <div className="text-5xl sm:text-[4rem] font-light text-white tracking-tight">
                  10x
                </div>
              </div>
            </div>
          </div>

          {/* Center Capsule Showcase */}
          <div className="flex-[1.1] relative flex items-center justify-center p-8 lg:p-0">
            {/* Outer Capsule Label */}
            <div className="absolute top-[18%] left-[2%] z-20 max-w-[210px] hidden xl:block">
              <div className="text-[0.65rem] font-bold text-white uppercase tracking-[0.2em] mb-3">
                Outer Capsule
              </div>
              <p className="text-[0.75rem] text-white/70 leading-[1.45] font-light">
                Shields probiotics from stomach acid in the digestive tract, while delivering prebiotics to stimulate the growth of beneficial bacteria.
              </p>
              {/* Dotted Line */}
              <div className="absolute top-[10%] left-[105%] w-[130px] h-[1px] border-t border-dashed border-white/30 pointer-events-none" />
            </div>

            {/* Inner Capsule Label */}
            <div className="absolute bottom-[13%] right-[4%] z-20 max-w-[200px] hidden xl:block">
              {/* Dotted Line */}
              <div className="absolute bottom-[20%] right-[105%] w-[125px] h-[1px] border-t border-dashed border-white/30 pointer-events-none" />
              <div className="text-[0.65rem] font-bold text-white uppercase tracking-[0.2em] mb-3">
                Inner Capsule
              </div>
              <p className="text-[0.75rem] text-white/70 leading-[1.45] font-light">
                Delivers 24 live strains of probiotics to the colon, where they're needed most.
              </p>
            </div>

            {/* Capsule Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[260px] sm:w-[320px] lg:w-[370px] flex items-center justify-center"
            >
              <Image
                src={img7}
                alt="Science Capsule"
                className="w-full h-auto drop-shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
              />
              {/* Complex Glow Effects removed/refined to match clean mockup */}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
