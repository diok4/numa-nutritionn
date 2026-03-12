'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS } from '@/shared/config/nav'
import { scrollTo } from '@/shared/lib/scroll'
import { useLang } from '@/shared/lib/i18n'
import type { Lang } from '@/shared/config/translations'

const LANGS: { code: Lang; label: string }[] = [
  { code: 'ru', label: 'RU' },
  { code: 'uz', label: 'UZ' },
  { code: 'en', label: 'EN' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen,  setLangOpen]  = useState(false)
  const { lang, setLang, t } = useLang()
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    if (href.startsWith('#')) {
      if (pathname !== '/') {
        window.location.href = '/' + href
      } else {
        scrollTo(href)
      }
    }
  }

  return (
    <>
      {/* ── Desktop / main bar ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-cream/90 backdrop-blur-2xl border-b border-forest/10 shadow-sm'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">

          {/* Logo */}
          <Link href="/">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              <div className="relative w-8 h-8 rounded-full bg-forest flex items-center justify-center overflow-hidden">
                <div className="w-3 h-3 rounded-full bg-moss group-hover:scale-125 transition-transform duration-300" />
              </div>
              <span className="text-[1.2rem] font-extrabold tracking-tight text-forest select-none">
                NUMA
              </span>
            </motion.div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.labelKey}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 * i + 0.3 }}
              >
                {link.href.startsWith('#') ? (
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="relative text-sm font-medium text-forest/65 hover:text-forest transition-colors duration-200 group"
                  >
                    {t(link.labelKey)}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-moss group-hover:w-full transition-all duration-300 rounded-full" />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="relative text-sm font-medium text-forest/65 hover:text-forest transition-colors duration-200 group"
                  >
                    {t(link.labelKey)}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-moss group-hover:w-full transition-all duration-300 rounded-full" />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          {/* Right side: lang switcher + CTA */}
          <div className="hidden md:flex items-center gap-3">

            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(v => !v)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-beige border border-forest/10
                           text-xs font-bold text-forest/70 hover:text-forest hover:border-moss/40
                           transition-all duration-200"
              >
                {lang.toUpperCase()}
                <svg className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`}
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0,  scale: 1    }}
                    exit={{   opacity: 0, y: -8, scale: 0.95  }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 bg-cream rounded-xl shadow-xl
                               border border-forest/8 overflow-hidden min-w-[80px]"
                  >
                    {LANGS.map(({ code, label }) => (
                      <button
                        key={code}
                        onClick={() => { setLang(code); setLangOpen(false) }}
                        className={`w-full px-4 py-2.5 text-xs font-bold text-left hover:bg-beige
                                   transition-colors ${lang === code ? 'text-moss' : 'text-forest/60'}`}
                      >
                        {label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1    }}
              transition={{ delay: 0.65 }}
            >
              <Link
                href="/catalog"
                className="px-5 py-2.5 bg-moss text-forest rounded-full text-sm font-bold
                           hover:bg-mint transition-all duration-300 hover:scale-105
                           hover:shadow-xl hover:shadow-moss/25 active:scale-95"
              >
                {t('nav.getStarted')}
              </Link>
            </motion.div>
          </div>

          {/* Mobile: lang + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setLangOpen(v => !v)}
              className="px-2.5 py-1.5 rounded-full bg-beige border border-forest/10
                         text-[0.65rem] font-bold text-forest/70"
            >
              {lang.toUpperCase()}
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1   }}
                  exit={{   opacity: 0, scale: 0.9  }}
                  className="absolute top-16 right-4 bg-cream rounded-xl shadow-xl
                             border border-forest/8 overflow-hidden z-50"
                >
                  {LANGS.map(({ code, label }) => (
                    <button
                      key={code}
                      onClick={() => { setLang(code); setLangOpen(false) }}
                      className={`block w-full px-5 py-3 text-xs font-bold text-left hover:bg-beige
                                 transition-colors ${lang === code ? 'text-moss' : 'text-forest/60'}`}
                    >
                      {label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            <button
              className="flex flex-col gap-[5px] p-2 z-10"
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
            className="fixed inset-0 z-40 bg-cream flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.labelKey}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y:  0 }}
                  exit={{    opacity: 0, y: 16 }}
                  transition={{ delay: i * 0.07, duration: 0.35 }}
                >
                  {link.href.startsWith('#') ? (
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-4xl font-extrabold text-forest hover:text-moss transition-colors"
                    >
                      {t(link.labelKey)}
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-4xl font-extrabold text-forest hover:text-moss transition-colors"
                    >
                      {t(link.labelKey)}
                    </Link>
                  )}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y:  0 }}
                exit={{    opacity: 0, y: 16 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href="/catalog"
                  onClick={() => setMenuOpen(false)}
                  className="mt-4 px-10 py-4 bg-moss text-forest rounded-full text-xl font-bold
                             hover:bg-mint transition-colors block"
                >
                  {t('nav.getStarted')}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
