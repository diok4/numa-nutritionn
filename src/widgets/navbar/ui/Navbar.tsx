'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { NAV_LINKS } from '@/shared/config/nav'
import { scrollTo } from '@/shared/lib/scroll'
import { useLang } from '@/shared/lib/i18n'
import { useCart } from '@/shared/lib/cart'
import type { Lang } from '@/shared/config/translations'
import logoImage from '../../../../assets/imglogo.png'

const LANGS: { code: Lang; label: string }[] = [
  { code: 'ru', label: 'RU' },
  { code: 'uz', label: 'UZ' },
  { code: 'en', label: 'EN' },
]

const BRAND = {
  name: 'NUMA Nutrition',
  logoSrc: logoImage,
}

const BRAND_DROPDOWN_ITEMS = [
  { label: 'NUMA Nutrition', href: '/catalog', swatch: 'linear-gradient(180deg, #008e12 0%, #00830f 100%)' },
  { label: 'Numa Kids', href: '/catalog', swatch: 'linear-gradient(180deg, #69b812 0%, #5ea10f 100%)' },
  { label: 'Naboviy Tabobat', href: '/catalog', swatch: 'linear-gradient(180deg, #17b700 0%, #11a200 100%)' },
  { label: 'Bettery Restaurant', href: '/catalog', swatch: 'linear-gradient(180deg, #e7e4de 0%, #d7d5ce 100%)' },
  { label: 'Bettery Ration', href: '/catalog', swatch: 'linear-gradient(180deg, #2f6b28 0%, #2a5f24 100%)' },
] as const

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [langOpen,  setLangOpen]  = useState(false)
  const [brandMenuOpen, setBrandMenuOpen] = useState(false)
  const brandMenuCloseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { lang, setLang, t } = useLang()
  const { cartCount } = useCart()
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

  useEffect(() => {
    return () => {
      if (brandMenuCloseTimeout.current) clearTimeout(brandMenuCloseTimeout.current)
    }
  }, [])

  const openBrandMenu = () => {
    if (brandMenuCloseTimeout.current) clearTimeout(brandMenuCloseTimeout.current)
    setBrandMenuOpen(true)
  }

  const closeBrandMenu = () => {
    if (brandMenuCloseTimeout.current) clearTimeout(brandMenuCloseTimeout.current)
    brandMenuCloseTimeout.current = setTimeout(() => {
      setBrandMenuOpen(false)
    }, 130)
  }

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    if (href.startsWith('#')) {
      if (pathname !== '/') window.location.href = '/' + href
      else scrollTo(href)
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-2.5 border-b border-[#1a3d18]/18 shadow-[0_8px_18px_rgba(10,25,12,0.10)]'
            : 'py-3 border-b border-[#1a3d18]/18 shadow-[0_4px_12px_rgba(10,25,12,0.08)]'
        } bg-[#f5f2ec]/95 backdrop-blur-2xl`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">

          {/* Logo */}
          <div
            className="relative"
            onMouseEnter={openBrandMenu}
            onMouseLeave={closeBrandMenu}
            onFocusCapture={openBrandMenu}
            onBlurCapture={(event) => {
              const next = event.relatedTarget as Node | null
              if (!event.currentTarget.contains(next)) closeBrandMenu()
            }}
          >
            <Link href="/" aria-label={BRAND.name} className="group block">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <Image
                  src={BRAND.logoSrc}
                  alt={BRAND.name}
                  width={220} height={64} priority
                  className="h-9 sm:h-10 w-auto transition-transform duration-300 group-hover:scale-[1.015]"
                />
              </motion.div>
            </Link>
            <AnimatePresence>
              {brandMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.985 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 top-[calc(100%+0.6rem)] z-[70] hidden md:block w-[400px] max-w-[calc(100vw-1rem)]"
                >
                  <div
                    className="relative h-[500px] overflow-hidden rounded-[2.35rem] border border-white/28 p-4 shadow-[0_22px_60px_rgba(7,20,12,0.5)] backdrop-blur-[8px]"
                    style={{
                      background:
                        'radial-gradient(110% 88% at 24% 20%, rgba(114, 132, 123, 0.45) 0%, rgba(22, 66, 42, 0.28) 38%, rgba(8, 52, 26, 0.74) 100%), linear-gradient(132deg, rgba(12, 56, 31, 0.94) 0%, rgba(9, 74, 30, 0.9) 44%, rgba(6, 53, 24, 0.94) 100%)',
                    }}
                  >
                    <div
                      className="pointer-events-none absolute inset-0 opacity-45"
                      style={{
                        background:
                          'linear-gradient(106deg, transparent 0%, rgba(145, 184, 163, 0.22) 15%, transparent 29%, rgba(145, 184, 163, 0.17) 43%, transparent 57%, rgba(145, 184, 163, 0.17) 72%, transparent 100%)',
                      }}
                    />
                    <div className="relative h-full flex flex-col">
                      <div className="space-y-2">
                        {BRAND_DROPDOWN_ITEMS.map(item => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setBrandMenuOpen(false)}
                            className="group/item flex items-center gap-4 rounded-[1.2rem] px-2 py-1 transition-colors hover:bg-white/5"
                          >
                            <span className="grid h-[64px] w-[64px] place-items-center rounded-[1.2rem] border border-white/26 bg-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.26)]">
                              <span
                                className="h-[40px] w-[40px] rounded-[0.7rem] shadow-[0_10px_18px_rgba(0,0,0,0.22)]"
                                style={{ background: item.swatch }}
                              />
                            </span>
                            <span className="text-[1.45rem] font-semibold leading-[1.05] tracking-[-0.02em] text-white/95 group-hover/item:text-white">
                              {item.label}
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-auto border-t border-[#3e6b48]/80 pt-4 flex justify-end">
                        <Link
                          href="/catalog"
                          onClick={() => setBrandMenuOpen(false)}
                          className="text-[1.55rem] font-semibold leading-none text-white/85 hover:text-white border-b border-white/55 hover:border-white transition-colors pb-1"
                        >
                          Shop All Products →
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop nav */}
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
                    className="relative text-sm font-medium text-[#1a3d18]/65 hover:text-[#1a3d18] transition-colors group"
                  >
                    {t(link.labelKey)}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#1a3d18] group-hover:w-full transition-all duration-300 rounded-full" />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="relative text-sm font-medium text-[#1a3d18]/65 hover:text-[#1a3d18] transition-colors group"
                  >
                    {t(link.labelKey)}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#1a3d18] group-hover:w-full transition-all duration-300 rounded-full" />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          {/* Right: lang + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setLangOpen(v => !v)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/60 border border-[#1a3d18]/12
                           text-xs font-bold text-[#1a3d18]/70 hover:text-[#1a3d18] hover:border-[#1a3d18]/25
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
                    className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden min-w-[80px]"
                  >
                    {LANGS.map(({ code, label }) => (
                      <button
                        key={code}
                        onClick={() => { setLang(code); setLangOpen(false) }}
                        className={`w-full px-4 py-2.5 text-xs font-bold text-left hover:bg-gray-50
                                   transition-colors ${lang === code ? 'text-[#1a6b3f]' : 'text-gray-600'}`}
                      >
                        {label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.65 }}>
              <Link
                href="/cart"
                aria-label={t('nav.cart')}
                className="relative w-11 h-11 bg-[#1a3d18] text-white rounded-full flex items-center justify-center
                           hover:bg-[#1a3d18]/85 transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 2.2a1 1 0 00.74 1.68H17m0 0a2 2 0 110 4 2 2 0 010-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[1.2rem] h-5 px-1 rounded-full bg-white text-[#1a3d18] text-[0.62rem] font-black flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </motion.div>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setLangOpen(v => !v)}
              className="px-2.5 py-1.5 rounded-full bg-white/60 border border-[#1a3d18]/12
                         text-[0.65rem] font-bold text-[#1a3d18]/70"
            >
              {lang.toUpperCase()}
            </button>
            <Link
              href="/cart"
              aria-label={t('nav.cart')}
              className="relative w-9 h-9 rounded-full bg-[#1a3d18] text-white flex items-center justify-center"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 2.2a1 1 0 00.74 1.68H17m0 0a2 2 0 110 4 2 2 0 010-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[1rem] h-4 px-1 rounded-full bg-white text-[#1a3d18] text-[0.55rem] font-black flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1   }}
                  exit={{   opacity: 0, scale: 0.9  }}
                  className="absolute top-16 right-4 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                >
                  {LANGS.map(({ code, label }) => (
                    <button
                      key={code}
                      onClick={() => { setLang(code); setLangOpen(false) }}
                      className={`block w-full px-5 py-3 text-xs font-bold text-left hover:bg-gray-50
                                 transition-colors ${lang === code ? 'text-[#1a6b3f]' : 'text-gray-600'}`}
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
                  className="block w-6 h-[2px] bg-[#1a3d18] rounded-full origin-center"
                />
              ))}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#f5f2ec] flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.labelKey}
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}
                  transition={{ delay: i * 0.07, duration: 0.35 }}
                >
                  {link.href.startsWith('#') ? (
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-4xl font-extrabold text-[#1a3d18] hover:text-[#1a6b3f] transition-colors"
                    >
                      {t(link.labelKey)}
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-4xl font-extrabold text-[#1a3d18] hover:text-[#1a6b3f] transition-colors"
                    >
                      {t(link.labelKey)}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href="/cart"
                  onClick={() => setMenuOpen(false)}
                  className="mt-4 px-10 py-4 bg-[#1a3d18] text-white rounded-full text-xl font-bold
                             hover:bg-[#1a3d18]/85 transition-colors block"
                >
                  {t('nav.cart')}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
