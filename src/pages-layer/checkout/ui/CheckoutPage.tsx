'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/widgets/navbar'
import { useLang } from '@/shared/lib/i18n'
import { useCart } from '@/shared/lib/cart'

type PaymentMethod = 'visa' | 'mastercard' | 'crypto'

const CITIES = [
  'Ташкент',
  'Самарканд',
  'Бухара',
  'Андижан',
  'Наманган',
  'Фергана',
  'Нукус',
] as const

function formatPrice(price: number, lang: string) {
  return price.toLocaleString('ru-RU') + ' ' + (lang === 'en' ? 'UZS' : lang === 'uz' ? 'so\'m' : 'сум')
}

export default function CheckoutPage() {
  const { lang } = useLang()
  const { cart, total, clearCart } = useCart()

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('visa')
  const [paying, setPaying] = useState(false)
  const [orderDone, setOrderDone] = useState(false)
  const [paidTotal, setPaidTotal] = useState(0)
  const [form, setForm] = useState({
    name: '',
    phoneLocal: '',
    city: '',
    address: '',
  })

  const title = lang === 'ru' ? 'Оплата' : lang === 'uz' ? 'To\'lov' : 'Checkout'
  const subtitle = lang === 'ru'
    ? 'Фейковый checkout для демонстрации'
    : lang === 'uz'
    ? 'Namoyish uchun fake checkout'
    : 'Fake checkout flow for demo'
  const backToCart = lang === 'ru' ? 'К корзине' : lang === 'uz' ? 'Savatga' : 'Back to cart'
  const backToCatalog = lang === 'ru' ? 'К каталогу' : lang === 'uz' ? 'Katalogga' : 'Back to catalog'
  const orderSummary = lang === 'ru' ? 'Ваш заказ' : lang === 'uz' ? 'Buyurtmangiz' : 'Your order'
  const paymentLabel = lang === 'ru' ? 'Способ оплаты' : lang === 'uz' ? 'To\'lov usuli' : 'Payment method'
  const cityLabel = lang === 'ru' ? 'Город' : lang === 'uz' ? 'Shahar' : 'City'
  const cityPlaceholder = lang === 'ru' ? 'Выберите город' : lang === 'uz' ? 'Shaharni tanlang' : 'Select city'
  const paymentHint = paymentMethod === 'crypto'
    ? (lang === 'ru' ? 'Крипто: тестовая транзакция USDT (имитация).' : lang === 'uz' ? 'Kripto: USDT test tranzaksiya (imitatsiya).' : 'Crypto: test USDT transaction (simulated).')
    : (lang === 'ru' ? 'Тестовая оплата картой, списаний не будет.' : lang === 'uz' ? 'Test karta to\'lovi, mablag\' yechilmaydi.' : 'Test card payment, no real charge.')
  const payLabel = lang === 'ru' ? 'Оплатить' : lang === 'uz' ? 'To\'lash' : 'Pay now'
  const processingLabel = lang === 'ru' ? 'Обработка...' : lang === 'uz' ? 'Qayta ishlanmoqda...' : 'Processing...'
  const successLabel = lang === 'ru' ? 'Заказ оформлен' : lang === 'uz' ? 'Buyurtma qabul qilindi' : 'Order confirmed'
  const successHint = lang === 'ru'
    ? 'Это тестовая оплата. Данные никуда не отправляются.'
    : lang === 'uz'
    ? 'Bu test to\'lov. Ma\'lumotlar yuborilmaydi.'
    : 'This is fake payment. No real transaction is made.'

  const paymentOptions: { key: PaymentMethod; label: string }[] = [
    { key: 'visa', label: 'Visa' },
    { key: 'mastercard', label: 'Mastercard' },
    { key: 'crypto', label: lang === 'ru' ? 'Крипта' : lang === 'uz' ? 'Kripto' : 'Crypto' },
  ]

  const renderPaymentIcon = (method: PaymentMethod) => {
    if (method === 'visa') {
      return (
        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-[#0A3E91] text-white text-[0.62rem] font-bold tracking-wide">
          VISA
        </span>
      )
    }

    if (method === 'mastercard') {
      return (
        <span className="inline-flex items-center">
          <span className="w-3.5 h-3.5 rounded-full bg-[#EA001B]/90" />
          <span className="-ml-1.5 w-3.5 h-3.5 rounded-full bg-[#FF9F1C]/90" />
        </span>
      )
    }

    return (
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-[#111827] text-white">
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none">
          <path d="M12 2l7 5v10l-7 5-7-5V7l7-5z" stroke="currentColor" strokeWidth="2" />
          <path d="M8 12h8" stroke="currentColor" strokeWidth="2" />
        </svg>
      </span>
    )
  }

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault()
    setPaying(true)
    await new Promise(resolve => setTimeout(resolve, 1600))
    setPaidTotal(total)
    setPaying(false)
    setOrderDone(true)
    clearCart()
  }

  if (cart.length === 0 && !orderDone) {
    return (
      <div className="min-h-screen bg-[#2c4a2a]">
        <Navbar />
        <main className="pt-28 sm:pt-32 pb-14 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 text-center shadow-sm">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1a3d18]">
              {lang === 'ru' ? 'Корзина пуста' : lang === 'uz' ? 'Savat bo\'sh' : 'Cart is empty'}
            </h1>
            <p className="text-[#1a3d18]/60 mt-2">
              {lang === 'ru'
                ? 'Добавьте товары из каталога, чтобы перейти к оплате.'
                : lang === 'uz'
                ? 'To\'lovga o\'tish uchun katalogdan mahsulot qo\'shing.'
                : 'Add products from catalog before checkout.'}
            </p>
            <Link href="/catalog" className="inline-flex mt-6 px-6 py-3 rounded-full bg-[#1a3d18] text-white font-semibold hover:bg-[#1a3d18]/85">
              {backToCatalog}
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#2c4a2a]">
      <Navbar />

      <main className="pt-28 sm:pt-32 pb-14 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-sm mb-5">
            <Link href="/cart" className="text-[#1a3d18]/50 hover:text-[#1a3d18] text-sm inline-block mb-4">
              ← {backToCart}
            </Link>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1a3d18]">{title}</h1>
            <p className="text-[#1a3d18]/60 mt-2">{subtitle}</p>
          </div>

          {orderDone ? (
            <div className="max-w-xl mx-auto bg-white rounded-3xl p-7 sm:p-10 text-center shadow-sm">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 180 }}
                className="w-16 h-16 bg-[#1a3d18] rounded-full flex items-center justify-center mx-auto mb-5"
              >
                <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h2 className="text-2xl font-extrabold text-[#1a3d18]">{successLabel}</h2>
              <p className="text-[#1a3d18]/70 mt-2">{formatPrice(paidTotal, lang)}</p>
              <p className="text-[#1a3d18]/50 mt-1">{paymentMethod.toUpperCase()}</p>
              <p className="text-[#1a3d18]/55 mt-4">{successHint}</p>
              <Link href="/catalog" className="inline-flex mt-7 px-7 py-3 rounded-full bg-[#1a3d18] text-white font-semibold hover:bg-[#1a3d18]/85">
                {backToCatalog}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
              <form onSubmit={handlePay} className="bg-white rounded-3xl p-5 sm:p-6 space-y-5 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-[#1a3d18]/60 mb-1 block">
                      {lang === 'ru' ? 'Имя и фамилия' : lang === 'uz' ? 'Ism va familiya' : 'Full Name'}
                    </label>
                    <input
                      required value={form.name}
                      onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-[#f5f2ec] border border-[#1a3d18]/15 text-[#1a3d18] placeholder:text-[#1a3d18]/35 focus:outline-none focus:border-[#1a3d18]/40"
                      placeholder={lang === 'ru' ? 'Иванов Иван' : lang === 'uz' ? 'Aliyev Aziz' : 'John Doe'}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#1a3d18]/60 mb-1 block">
                      {lang === 'ru' ? 'Телефон' : lang === 'uz' ? 'Telefon' : 'Phone'}
                    </label>
                    <div className="flex rounded-xl bg-[#f5f2ec] border border-[#1a3d18]/15 overflow-hidden focus-within:border-[#1a3d18]/40">
                      <span className="px-3.5 py-3 text-[#1a3d18]/65 border-r border-[#1a3d18]/10 font-medium">+998</span>
                      <input
                        required
                        value={form.phoneLocal}
                        onChange={e => {
                          const digits = e.target.value.replace(/\D/g, '').slice(0, 9)
                          setForm(prev => ({ ...prev, phoneLocal: digits }))
                        }}
                        className="w-full px-3 py-3 bg-transparent text-[#1a3d18] placeholder:text-[#1a3d18]/35 focus:outline-none"
                        placeholder={lang === 'ru' ? '90 000 00 00' : '90 000 00 00'}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#1a3d18]/60 mb-1 block">
                      {cityLabel}
                    </label>
                    <select
                      required
                      value={form.city}
                      onChange={e => setForm(prev => ({ ...prev, city: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-[#f5f2ec] border border-[#1a3d18]/15 text-[#1a3d18]
                                 focus:outline-none focus:border-[#1a3d18]/40"
                    >
                      <option value="" disabled>{cityPlaceholder}</option>
                      {CITIES.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-[#1a3d18]/60 mb-1 block">
                      {lang === 'ru' ? 'Адрес доставки' : lang === 'uz' ? 'Yetkazib berish manzili' : 'Delivery Address'}
                    </label>
                    <input
                      required value={form.address}
                      onChange={e => setForm(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-[#f5f2ec] border border-[#1a3d18]/15 text-[#1a3d18] placeholder:text-[#1a3d18]/35 focus:outline-none focus:border-[#1a3d18]/40"
                      placeholder={lang === 'ru' ? 'ул. Амира Темура, д. 1, кв. 1' : lang === 'uz' ? 'Amir Temur ko\'chasi, 1-uy' : 'Amir Temur st., 1'}
                    />
                  </div>
                </div>

                <button
                  type="submit" disabled={paying}
                  className="w-full py-3.5 rounded-full bg-[#1a3d18] text-white font-bold hover:bg-[#1a3d18]/85
                             transition-colors disabled:opacity-65 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {paying ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      {processingLabel}
                    </>
                  ) : `${payLabel} — ${formatPrice(total, lang)}`}
                </button>
              </form>

              <aside className="h-fit lg:sticky lg:top-28 bg-white rounded-3xl p-5 sm:p-6 shadow-sm">
                <div>
                  <label className="text-xs font-semibold text-[#1a3d18]/60 mb-2 block">{paymentLabel}</label>
                  <div className="space-y-2">
                    {paymentOptions.map(method => (
                      <button
                        key={method.key}
                        type="button"
                        onClick={() => setPaymentMethod(method.key)}
                        className={`w-full rounded-xl border px-3.5 py-3 transition-colors ${
                          paymentMethod === method.key
                            ? 'bg-[#1a3d18]/10 border-[#1a3d18] text-[#1a3d18]'
                            : 'bg-[#f5f2ec] border-[#1a3d18]/15 text-[#1a3d18]/70 hover:text-[#1a3d18]'
                        }`}
                      >
                        <span className="flex items-center justify-between gap-3">
                          <span className="font-semibold text-sm">{method.label}</span>
                          {renderPaymentIcon(method.key)}
                        </span>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-[#1a3d18]/55 mt-2.5">{paymentHint}</p>
                </div>

                <div className="border-t border-[#1a3d18]/10 mt-5 pt-5 text-xs uppercase tracking-[0.14em] text-[#1a3d18]/50">{orderSummary}</div>
                <div className="space-y-3 mt-3">
                  {cart.map(({ product, qty }) => (
                    <div key={product.id} className="flex items-start justify-between gap-3">
                      <div className="text-sm text-[#1a3d18]/80">
                        {lang === 'ru' ? product.nameRu : lang === 'uz' ? product.nameUz : product.nameEn} × {qty}
                      </div>
                      <div className="text-sm font-semibold text-[#1a3d18]">
                        {formatPrice(product.price * qty, lang)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#1a3d18]/10 mt-4 pt-4 flex items-center justify-between">
                  <span className="text-[#1a3d18]/60">{lang === 'ru' ? 'Итого' : lang === 'uz' ? 'Jami' : 'Total'}</span>
                  <span className="text-2xl font-extrabold text-[#1a3d18]">{formatPrice(total, lang)}</span>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
