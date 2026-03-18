'use client'

import type { ReactNode } from 'react'
import { useLang } from '@/shared/lib/i18n'

export default function Contacts() {
  const { lang } = useLang()

  const copy = {
    section: lang === 'ru' ? 'Контакты' : lang === 'uz' ? 'Aloqa' : 'Contact',
    title: lang === 'ru' ? 'Свяжитесь с нами' : lang === 'uz' ? 'Biz bilan bog\'laning' : 'Get in touch',
    subtitle: lang === 'ru' ? 'Мы всегда готовы помочь' : lang === 'uz' ? 'Biz har doim yordam berishga tayyormiz' : 'We are always here to help',
    phone: lang === 'ru' ? 'Телефон' : lang === 'uz' ? 'Telefon' : 'Phone',
    email: 'Email',
    address: lang === 'ru' ? 'Адрес' : lang === 'uz' ? 'Manzil' : 'Address',
    hours: lang === 'ru' ? 'Время работы' : lang === 'uz' ? 'Ish vaqti' : 'Working hours',
    formTitle: lang === 'ru' ? 'Отправить сообщение' : lang === 'uz' ? 'Xabar yuborish' : 'Send a message',
    namePh: lang === 'ru' ? 'Ваше имя' : lang === 'uz' ? 'Ismingiz' : 'Your name',
    emailPh: 'Email',
    msgPh: lang === 'ru' ? 'Сообщение' : lang === 'uz' ? 'Xabar' : 'Message',
    send: lang === 'ru' ? 'Отправить сообщение' : lang === 'uz' ? 'Xabar yuborish' : 'Send message',
    mapTitle: lang === 'ru' ? 'Мы на карте' : lang === 'uz' ? 'Biz xaritada' : 'Find us on map',
  }

  return (
    <section id="contact" className="py-12 sm:py-14 lg:py-16 bg-[#e8efee]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8 sm:mb-10">
          <p className="text-[#1f8b85]/70 text-sm font-semibold tracking-wide">— {copy.section}</p>
          <h2 className="mt-3 text-[2.2rem] sm:text-5xl font-extrabold text-[#1f8b85] leading-[1.05]">{copy.title}</h2>
          <p className="mt-3 text-[#1f8b85]/65 text-base sm:text-lg">{copy.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <ContactCard
            label={copy.phone}
            value="+998 55 516-77-77"
            icon={<PhoneIcon />}
          />
          <ContactCard
            label={copy.email}
            value="info@numafamily.uz"
            icon={<MailIcon />}
          />
          <ContactCard
            label={copy.address}
            value={lang === 'ru' ? '31 Эльбек кўчаси, Ташкент 100047, Узбекистан' : lang === 'uz' ? '31 Elbek ko\'chasi, Toshkent 100047, O\'zbekiston' : '31 Elbek street, Tashkent 100047, Uzbekistan'}
            icon={<PinIcon />}
          />
          <ContactCard
            label={copy.hours}
            value={lang === 'ru' ? 'Пн-Сб: 9:00 - 18:00' : lang === 'uz' ? 'Du-Sha: 9:00 - 18:00' : 'Mon-Sat: 9:00 - 18:00'}
            icon={<ClockIcon />}
          />
        </div>

        <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-4 sm:gap-5">
          <div className="rounded-3xl border border-[#1f8b85]/12 bg-white p-5 sm:p-6">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#1f8b85] leading-tight">
              NUMA
              <br />
              Nutrition
            </h3>
            <p className="mt-4 text-[#1f8b85]/70 leading-relaxed">
              {lang === 'ru'
                ? 'Поддержка клиентов, консультации по продуктам и партнёрские запросы.'
                : lang === 'uz'
                ? 'Mijozlarni qo\'llab-quvvatlash, mahsulot bo\'yicha maslahat va hamkorlik so\'rovlari.'
                : 'Customer support, product consultations, and partnership requests.'}
            </p>
          </div>

          <form className="rounded-3xl border border-[#1f8b85]/12 bg-white p-5 sm:p-6">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#1f8b85] mb-5">{copy.formTitle}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder={copy.namePh}
                className="h-12 rounded-2xl px-4 border border-[#1f8b85]/14 bg-[#f5f2ec] text-[#1f8b85] placeholder:text-[#1f8b85]/45 focus:outline-none focus:border-[#1f8b85]/35"
              />
              <input
                type="email"
                placeholder={copy.emailPh}
                className="h-12 rounded-2xl px-4 border border-[#1f8b85]/14 bg-[#f5f2ec] text-[#1f8b85] placeholder:text-[#1f8b85]/45 focus:outline-none focus:border-[#1f8b85]/35"
              />
            </div>
            <textarea
              rows={5}
              placeholder={copy.msgPh}
              className="mt-3 w-full rounded-2xl px-4 py-3 border border-[#1f8b85]/14 bg-[#f5f2ec] text-[#1f8b85] placeholder:text-[#1f8b85]/45 focus:outline-none focus:border-[#1f8b85]/35 resize-none"
            />
            <button
              type="button"
              className="mt-4 h-12 w-full rounded-full bg-[#1f8b85] text-white font-semibold hover:bg-[#176b67] transition-colors"
            >
              {copy.send}
            </button>
          </form>
        </div>

        <div className="mt-4 sm:mt-5 rounded-3xl border border-[#1f8b85]/12 bg-white p-3 sm:p-4">
          <p className="px-1 pb-3 text-sm font-semibold text-[#1f8b85]/70">{copy.mapTitle}</p>
          <div className="overflow-hidden rounded-2xl border border-[#1f8b85]/12">
            <iframe
              title="Yandex Map"
              src="https://yandex.uz/map-widget/v1/?ll=69.286531%2C41.315806&mode=search&text=%D0%A2%D0%B0%D1%88%D0%BA%D0%B5%D0%BD%D1%82%2C%20%D0%AD%D0%BB%D1%8C%D0%B1%D0%B5%D0%BA%20%D0%BA%D1%9E%D1%87%D0%B0%D1%81%D0%B8%2031&z=15"
              width="100%"
              height="380"
              loading="lazy"
              allowFullScreen
              className="block"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactCard({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
  return (
    <div className="rounded-3xl border border-[#1f8b85]/12 bg-white p-5 sm:p-6">
      <div className="w-10 h-10 rounded-xl bg-[#1f8b85]/10 text-[#1f8b85] flex items-center justify-center">{icon}</div>
      <p className="mt-4 text-sm uppercase tracking-wide text-[#1f8b85]/55 font-semibold">{label}</p>
      <p className="mt-2 text-[1.08rem] text-[#1f8b85] leading-snug">{value}</p>
    </div>
  )
}

function PhoneIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9}>
      <path d="M22 16.92v2a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3.09 4.18 2 2 0 0 1 5.07 2h2a2 2 0 0 1 2 1.72c.12.9.34 1.77.65 2.6a2 2 0 0 1-.45 2.11L8.1 9.6a16 16 0 0 0 6.3 6.3l1.17-1.17a2 2 0 0 1 2.11-.45c.83.31 1.7.53 2.6.65A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9}>
      <path d="M12 21s-7-5.9-7-11a7 7 0 1 1 14 0c0 5.1-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.7" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}
