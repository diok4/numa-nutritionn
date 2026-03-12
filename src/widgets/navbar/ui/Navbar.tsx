'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS } from '@/shared/config/nav'
import { scrollTo } from '@/shared/lib/scroll'

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      {/* ── Desktop / main bar ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-beige/80 backdrop-blur-2xl border-b border-forest/10 shadow-sm'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2.5 group"
          >
            <div className="relative w-8 h-8 rounded-full bg-forest flex items-center justify-center overflow-hidden">
              <div className="w-3 h-3 rounded-full bg-sage group-hover:scale-125 transition-transform duration-300" />
            </div>
            <span className="text-[1.2rem] font-black tracking-tight text-forest select-none">
              Numa
            </span>
          </motion.button>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1,  y:  0 }}
                transition={{ delay: 0.12 * i + 0.3 }}
                onClick={() => scrollTo(link.href)}
                className="relative text-sm font-medium text-forest/65 hover:text-forest transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-forest group-hover:w-full transition-all duration-300 rounded-full" />
              </motion.button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1,  scale: 1    }}
              transition={{ delay: 0.65 }}
              onClick={() => scrollTo('#products')}
              className="px-5 py-2.5 bg-forest text-sage rounded-full text-sm font-bold
                         hover:bg-moss transition-all duration-300 hover:scale-105
                         hover:shadow-xl hover:shadow-forest/20 active:scale-95"
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 z-10"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                animate={{
                  rotate:  i === 0 ? (menuOpen ?  45 : 0) : i === 2 ? (menuOpen ? -45 : 0) : 0,
                  y:       i === 0 ? (menuOpen ?   7 : 0) : i === 2 ? (menuOpen ?  -7 : 0) : 0,
                  opacity: i === 1 ? (menuOpen ?   0 : 1) : 1,
                }}
                transition={{ duration: 0.25 }}
                className="block w-6 h-[2px] bg-forest rounded-full origin-center"
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile full-screen overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-beige flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-10">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y:  0 }}
                  exit={{    opacity: 0, y: 16 }}
                  transition={{ delay: i * 0.07, duration: 0.35 }}
                  onClick={() => { scrollTo(link.href); setMenuOpen(false) }}
                  className="text-4xl font-black text-forest hover:text-moss transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}

              <motion.button
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y:  0 }}
                exit={{    opacity: 0, y: 16 }}
                transition={{ delay: 0.3 }}
                onClick={() => { scrollTo('#products'); setMenuOpen(false) }}
                className="mt-4 px-10 py-4 bg-forest text-sage rounded-full text-xl font-bold
                           hover:bg-moss transition-colors"
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
