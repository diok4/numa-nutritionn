'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useLang } from '@/shared/lib/i18n'
import logoImage from '../../../../assets/imglogo.png'

export default function Footer() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const [email,      setEmail]      = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const { lang } = useLang()

  const menuTitle = lang === 'ru' ? 'МЕНЮ' : lang === 'uz' ? 'MENYU' : 'MENU'
  const socialsTitle = lang === 'ru' ? 'МЫ В СОЦСЕТЯХ' : lang === 'uz' ? 'IJTIMOIY TARMOQLAR' : 'SOCIALS'

  const navLinks = [
    { label: lang === 'ru' ? 'Главная' : lang === 'uz' ? 'Bosh sahifa' : 'Home', href: '/' },
    { label: lang === 'ru' ? 'О компании' : lang === 'uz' ? 'Kompaniya haqida' : 'About', href: '#science' },
    { label: lang === 'ru' ? 'Продукты' : lang === 'uz' ? 'Mahsulotlar' : 'Products', href: '/catalog' },
    { label: lang === 'ru' ? 'Блог' : lang === 'uz' ? 'Blog' : 'Blog', href: '/blog' },
    { label: lang === 'ru' ? 'Контакты' : lang === 'uz' ? 'Kontaktlar' : 'Contacts', href: '/contacts' },
  ]

  const slogan = lang === 'ru'
    ? 'Здоровье начинается с правильного выбора. Мы создаём качественные продукты для вашего баланса, энергии и силы каждый день.'
    : lang === 'uz'
    ? 'Salomatlik to\'g\'ri tanlovdan boshlanadi. Biz har kunlik muvozanat, energiya va quvvat uchun sifatli mahsulotlar yaratamiz.'
    : 'Health begins with the right choices. We create quality products for your daily balance, energy, and strength.'

  const contactsLabel = lang === 'ru' ? 'Контакты' : lang === 'uz' ? 'Kontaktlar' : 'Contacts'
  const emailLabel = lang === 'ru' ? 'Email' : 'Email'
  const phoneLabel = lang === 'ru' ? 'Телефон' : lang === 'uz' ? 'Telefon' : 'Phone'
  const addressLabel = lang === 'ru' ? 'Адрес' : lang === 'uz' ? 'Manzil' : 'Address'
  const disclaimer = lang === 'ru'
    ? 'Подписываясь, вы соглашаетесь получать электронные письма от NUMA'
    : lang === 'uz'
    ? 'Obuna bo\'lish orqali siz NUMA dan email xabarlar olishga rozilik bildirasiz'
    : 'By subscribing, you agree to receive email updates from NUMA'
  const inputPlaceholder = lang === 'ru' ? 'Введите Email' : lang === 'uz' ? 'Email kiriting' : 'Enter Email'
  const subscribedText = lang === 'ru' ? 'Спасибо! Вы подписаны.' : lang === 'uz' ? 'Rahmat! Siz obuna bo\'ldingiz.' : 'Thanks! You are subscribed.'
  const copy = lang === 'ru'
    ? '© 2026 Numa Nutrition. Все права защищены.'
    : lang === 'uz'
    ? '© 2026 Numa Nutrition. Barcha huquqlar himoyalangan.'
    : '© 2026 Numa Nutrition. All rights reserved.'

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer ref={ref} className="bg-[#efefee] text-[#1f8b85] pt-10 sm:pt-12 lg:pt-14 pb-7 overflow-hidden">
      <div className="mx-auto max-w-[1660px] px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_0.45fr_0.45fr] gap-7 lg:gap-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={logoImage}
              alt="Numa Nutrition"
              width={260}
              height={74}
              className="w-[132px] sm:w-[156px] lg:w-[188px] h-auto"
            />

            <h2 className="mt-4 sm:mt-5 max-w-[820px] text-[1.45rem] sm:text-[1.95rem] lg:text-[2.55rem] leading-[1.17] font-light tracking-[-0.01em]">
              {slogan}
            </h2>

            <div className="mt-5 sm:mt-6 text-[1.06rem] sm:text-[1.15rem] lg:text-[1.28rem] leading-[1.48] text-[#1f8b85]/88 font-light">
              <p>{contactsLabel}</p>
              <p>{emailLabel}: info@numanutrition.com</p>
              <p>{phoneLabel}: +998 90 123 45 67</p>
              <p>{addressLabel}: Ташкент, Uzbekistan</p>
            </div>

            <p className="mt-2.5 text-[0.9rem] sm:text-[0.98rem] lg:text-[1.08rem] text-[#1f8b85]/45 leading-[1.35] font-light">
              {disclaimer}
            </p>

            <form onSubmit={handleSubscribe} className="mt-2.5 max-w-[560px]">
              {!subscribed ? (
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={inputPlaceholder}
                    required
                    className="w-full rounded-[0.75rem] border-2 border-[#1f8b85] bg-transparent
                               py-2 pl-4.5 pr-14 text-[1.1rem] sm:text-[1.18rem] lg:text-[1.32rem] text-[#1f8b85]
                               placeholder:text-[#1f8b85]/78 font-light focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 grid place-items-center
                               text-[#1f8b85] hover:text-[#176b67] transition-colors"
                  >
                    <span className="text-[1.35rem] leading-none">→</span>
                  </button>
                </div>
              ) : (
                <p className="text-[1rem] text-[#1f8b85]">{subscribedText}</p>
              )}
            </form>

            <p className="mt-2.5 text-[1.06rem] sm:text-[1.14rem] lg:text-[1.24rem] text-[#1f8b85] font-light">
              {copy}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:justify-self-center"
          >
            <p className="text-[0.86rem] sm:text-[0.92rem] lg:text-[0.98rem] font-semibold text-[#1f8b85]/55 uppercase tracking-[0.02em]">
              {menuTitle}
            </p>
            <ul className="mt-3 space-y-2.5 sm:space-y-3">
              {navLinks.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[1.02rem] sm:text-[1.1rem] lg:text-[1.2rem] text-[#1f8b85]/86 font-light hover:text-[#1f8b85] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="lg:justify-self-center"
          >
            <p className="text-[0.86rem] sm:text-[0.92rem] lg:text-[0.98rem] font-semibold text-[#1f8b85]/55 uppercase tracking-[0.02em]">
              {socialsTitle}
            </p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2.5 lg:flex-col lg:gap-y-3">
              {['Instagram', 'Telegram', 'Facebook'].map(item => (
                <a
                  key={item}
                  href="#"
                  className="text-[1.02rem] sm:text-[1.1rem] lg:text-[1.2rem] text-[#1f8b85]/86 font-light hover:text-[#1f8b85] transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
