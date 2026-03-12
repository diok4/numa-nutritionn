'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const FOOTER_COLS: Record<string, string[]> = {
  Products: ['Daily Synbiotic', 'Daily Multivitamin', 'Energy + Focus', 'Sleep + Restore', 'Bundles'],
  About:    ['Our Story', 'The Science', 'Sustainability', 'Careers', 'Press'],
  Help:     ['FAQ', 'Shipping & Returns', 'Contact Us', 'Subscription', 'Store Locator'],
  Legal:    ['Privacy Policy', 'Terms of Service', 'Accessibility', 'Cookie Policy'],
}

const SOCIAL = [
  { name: 'Instagram', symbol: 'IG' },
  { name: 'Twitter',   symbol: 'TW' },
  { name: 'TikTok',    symbol: 'TK' },
  { name: 'YouTube',   symbol: 'YT' },
]

export default function Footer() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const [email,      setEmail]      = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer ref={ref} className="bg-forest text-sage pt-20 pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Brand statement */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1 }}
          className="pb-16 border-b border-sage/10 mb-14"
        >
          <h2 className="text-[1.85rem] sm:text-[2.4rem] lg:text-[3.2rem] xl:text-[3.8rem]
                         font-black text-sage leading-tight max-w-4xl">
            Pioneering microbiome science
            <br />
            for{' '}
            <span className="text-mint">human</span> and{' '}
            <span className="text-mint">planetary</span> health.
          </h2>
        </motion.div>

        {/* Newsletter + nav */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.15 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 rounded-full bg-sage flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-forest" />
              </div>
              <span className="text-[1.2rem] font-black">Numa</span>
            </div>

            <p className="text-sage/45 text-sm leading-relaxed mb-6 max-w-xs">
              Join 100,000+ people using Numa to transform their gut health and
              overall wellbeing.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              {!subscribed ? (
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="flex-1 px-4 py-3 rounded-xl bg-sage/8 border border-sage/18
                               text-sage placeholder-sage/28 text-sm
                               focus:outline-none focus:border-sage/38 transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 bg-sage text-forest rounded-xl font-bold text-sm
                               hover:bg-white transition-colors whitespace-nowrap active:scale-95"
                  >
                    Join
                  </button>
                </>
              ) : (
                <motion.p
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-sage/65 text-sm py-3"
                >
                  ✓ You&apos;re in! Welcome to the Numa community.
                </motion.p>
              )}
            </form>

            <div className="flex gap-3 mt-6">
              {SOCIAL.map(s => (
                <motion.button
                  key={s.name}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  aria-label={s.name}
                  className="w-10 h-10 rounded-full bg-sage/8 border border-sage/18
                             flex items-center justify-center hover:bg-sage/18 transition-colors
                             text-[0.6rem] font-bold text-sage/55"
                >
                  {s.symbol}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Nav columns */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(FOOTER_COLS).map(([cat, links], i) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.25 + i * 0.08 }}
              >
                <h4 className="text-sage text-sm font-bold mb-4">{cat}</h4>
                <ul className="space-y-2.5">
                  {links.map(link => (
                    <li key={link}>
                      <a href="#"
                         className="text-sage/38 text-sm hover:text-sage/78 transition-colors duration-200">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="pt-8 border-t border-sage/10 flex flex-col sm:flex-row
                     items-center justify-between gap-4 text-sage/28 text-xs"
        >
          <span>© 2026 Numa Nutrition, Inc. All rights reserved.</span>

          <div className="flex items-center gap-5">
            {['Privacy', 'Terms', 'Cookies'].map(item => (
              <a key={item} href="#" className="hover:text-sage/58 transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
            <span>Carbon neutral shipping</span>
          </div>
        </motion.div>

      </div>
    </footer>
  )
}
