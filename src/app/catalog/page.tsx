'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '@/shared/lib/i18n'

type Category = 'all' | 'gut' | 'vitamins' | 'energy' | 'sleep' | 'immunity'

interface Product {
  id: number
  nameRu: string
  nameUz: string
  nameEn: string
  descRu: string
  descUz: string
  descEn: string
  price: number        // UZS
  category: Category
  badge: string
  bg: [string, string]
  accent: string
  label: string
  meta: string
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    nameRu: 'Daily Synbiotic',
    nameUz: 'Kunlik Sinbiotik',
    nameEn: 'Daily Synbiotic',
    descRu: '50 млрд КОЕ пробиотик + пребиотическая формула для комплексной поддержки микробиома.',
    descUz: '50 milliard KOU probiotik + prebiotik formula mikrobiomni keng qo\'llab-quvvatlash uchun.',
    descEn: '50B AFU probiotic + prebiotic formula for comprehensive microbiome support.',
    price: 149000, category: 'gut', badge: 'Хит продаж', bg: ['#0A0A0A', '#1a1a1a'], accent: '#D4F7E8', label: 'SYNBIOTIC', meta: '24 штамма',
  },
  {
    id: 2,
    nameRu: 'Daily Multivitamin',
    nameUz: 'Kunlik Multivitamin',
    nameEn: 'Daily Multivitamin',
    descRu: '25+ основных витаминов и минералов из натуральных цельных продуктов.',
    descUz: '25+ asosiy vitamin va minerallar tabiiy butun oziq-ovqat manbalaridan.',
    descEn: '25+ essential vitamins and minerals derived from real whole-food sources.',
    price: 119000, category: 'vitamins', badge: 'Новинка', bg: ['#0d2a1a', '#1a4d2e'], accent: '#D4F7E8', label: 'MULTI', meta: '25+ нутриентов',
  },
  {
    id: 3,
    nameRu: 'Energy + Focus',
    nameUz: 'Energiya + Diqqat',
    nameEn: 'Energy + Focus',
    descRu: 'Ноотропные адаптогены для устойчивой умственной ясности без упадка сил.',
    descUz: 'Uzoq muddatli aqliy aniqlik uchun nootropik adaptogenlar.',
    descEn: 'Nootropic adaptogens for sustained mental clarity without the crash.',
    price: 139000, category: 'energy', badge: 'Популярный', bg: ['#1a0a0a', '#3a1515'], accent: '#FFD4D4', label: 'FOCUS', meta: '12 адаптогенов',
  },
  {
    id: 4,
    nameRu: 'Sleep + Restore',
    nameUz: 'Uyqu + Tiklanish',
    nameEn: 'Sleep + Restore',
    descRu: 'Магний, L-Теанин и успокаивающие растения для спокойного сна.',
    descUz: 'Magnesiy, L-Teanin va tinchlantiruvchi botanikalar tinch uyqu uchun.',
    descEn: 'Magnesium, L-Theanine and calming botanicals for restful sleep.',
    price: 129000, category: 'sleep', badge: 'Любимый', bg: ['#0a0a1a', '#151530'], accent: '#D4D4F7', label: 'SLEEP', meta: '8 растений',
  },
  {
    id: 5,
    nameRu: 'Vitamin D3 + K2',
    nameUz: 'D3 + K2 Vitamini',
    nameEn: 'Vitamin D3 + K2',
    descRu: 'Оптимальное усвоение кальция и здоровье костей. 5000 МЕ D3 + 100 мкг K2.',
    descUz: '5000 IU D3 + 100 mkg K2. Kaltsiy so\'rilishini optimallashtiradi va suyak sog\'lig\'ini ta\'minlaydi.',
    descEn: 'Optimal calcium absorption and bone health. 5000 IU D3 + 100 mcg K2.',
    price: 89000, category: 'vitamins', badge: 'Выбор врачей', bg: ['#1a1200', '#3a2900'], accent: '#FFF3D4', label: 'D3+K2', meta: '5000 МЕ',
  },
  {
    id: 6,
    nameRu: 'Omega-3 Рыбий жир',
    nameUz: 'Omega-3 Baliq Yog\'i',
    nameEn: 'Omega-3 Fish Oil',
    descRu: 'Очищенный рыбий жир высокой концентрации для здоровья сердца и мозга.',
    descUz: 'Yurak va miya salomatligi uchun yuqori kontsentratsiyali tozalangan baliq yog\'i.',
    descEn: 'High-concentration purified fish oil for heart and brain health.',
    price: 99000, category: 'vitamins', badge: 'Чистый', bg: ['#001a1a', '#003030'], accent: '#D4F0F7', label: 'OMEGA-3', meta: '2000 мг EPA+DHA',
  },
  {
    id: 7,
    nameRu: 'Магний Глицинат',
    nameUz: 'Magniy Glitsinat',
    nameEn: 'Magnesium Glycinate',
    descRu: 'Высокобиодоступная форма магния для снятия стресса и улучшения сна.',
    descUz: 'Stressni kamaytirish va uyquni yaxshilash uchun yuqori bioelektivlik shakli magniy.',
    descEn: 'Highly bioavailable magnesium form for stress relief and better sleep.',
    price: 79000, category: 'sleep', badge: 'Антистресс', bg: ['#0a001a', '#1a0030'], accent: '#E8D4F7', label: 'MAG', meta: '400 мг',
  },
  {
    id: 8,
    nameRu: 'Vitamin C + Цинк',
    nameUz: 'C Vitamini + Rux',
    nameEn: 'Vitamin C + Zinc',
    descRu: 'Мощная иммунная поддержка. 1000 мг витамина C с биофлавоноидами + 15 мг цинка.',
    descUz: '1000 mg C vitamini bioflavonoidlar bilan + 15 mg rux. Kuchli immunitet qo\'llab-quvvatlash.',
    descEn: 'Powerful immune support. 1000mg Vitamin C with bioflavonoids + 15mg Zinc.',
    price: 69000, category: 'immunity', badge: 'Иммунитет', bg: ['#1a0a00', '#3a1f00'], accent: '#FFE8D4', label: 'C+ZINC', meta: '1000 мг C',
  },
  {
    id: 9,
    nameRu: 'B-Комплекс',
    nameUz: 'B-Kompleks',
    nameEn: 'B-Complex',
    descRu: 'Полный комплекс витаминов группы B для энергии, нервной системы и обмена веществ.',
    descUz: 'Energiya, asab tizimi va moddalar almashinuvi uchun to\'liq B vitamini kompleksi.',
    descEn: 'Complete B-vitamin complex for energy, nervous system and metabolism.',
    price: 79000, category: 'energy', badge: 'Энергия', bg: ['#001a0a', '#003a1a'], accent: '#D4F7E0', label: 'B-COMPLEX', meta: '8 форм',
  },
  {
    id: 10,
    nameRu: 'Коллаген Пептиды',
    nameUz: 'Kollagen Peptidlar',
    nameEn: 'Collagen Peptides',
    descRu: 'Гидролизованный коллаген I и III типа для кожи, волос, суставов и кишечника.',
    descUz: 'Teri, soch, bo\'g\'imlar va ichak uchun I va III turdagi gidrolizlangan kollagen.',
    descEn: 'Hydrolyzed Type I & III collagen for skin, hair, joints and gut health.',
    price: 169000, category: 'vitamins', badge: 'Красота', bg: ['#1a000a', '#3a001a'], accent: '#F7D4E8', label: 'COLLAGEN', meta: '20 г/порция',
  },
  {
    id: 11,
    nameRu: 'Ашваганда KSM-66',
    nameUz: 'Ashwagandha KSM-66',
    nameEn: 'Ashwagandha KSM-66',
    descRu: 'Клинически изученный адаптоген для снижения кортизола и повышения выносливости.',
    descUz: 'Kortizolni kamaytirish va chidamlilikni oshirish uchun klinik jihatdan o\'rganilgan adaptogen.',
    descEn: 'Clinically studied adaptogen for cortisol reduction and endurance enhancement.',
    price: 99000, category: 'energy', badge: 'Адаптоген', bg: ['#1a1000', '#3a2500'], accent: '#F7ECD4', label: 'ASHWA', meta: 'KSM-66®',
  },
  {
    id: 12,
    nameRu: 'CoQ10 Убихинол',
    nameUz: 'CoQ10 Ubihinol',
    nameEn: 'CoQ10 Ubiquinol',
    descRu: 'Активная форма CoQ10 для здоровья митохондрий, сердца и клеточной энергии.',
    descUz: 'Mitoxondriya, yurak sog\'lig\'i va hujayra energiyasi uchun faol CoQ10 shakli.',
    descEn: 'Active form of CoQ10 for mitochondrial health, heart and cellular energy.',
    price: 189000, category: 'gut', badge: 'Премиум', bg: ['#0a0a00', '#1a1a00'], accent: '#F7F7D4', label: 'CoQ10', meta: '200 мг',
  },
]

const CATEGORIES: { key: Category; labelKey: string }[] = [
  { key: 'all',      labelKey: 'catalog.all'      },
  { key: 'gut',      labelKey: 'catalog.gut'      },
  { key: 'vitamins', labelKey: 'catalog.vitamins' },
  { key: 'energy',   labelKey: 'catalog.energy'   },
  { key: 'sleep',    labelKey: 'catalog.sleep'    },
  { key: 'immunity', labelKey: 'catalog.immunity' },
]

function formatPrice(price: number, lang: string) {
  return price.toLocaleString('ru-RU') + ' ' + (lang === 'en' ? 'UZS' : lang === 'uz' ? 'so\'m' : 'сум')
}

interface CartItem { product: Product; qty: number }

export default function CatalogPage() {
  const { lang, t } = useLang()
  const [category,  setCategory]  = useState<Category>('all')
  const [cart,      setCart]      = useState<CartItem[]>([])
  const [cartOpen,  setCartOpen]  = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [orderDone, setOrderDone] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', address: '', city: '', card: '', expiry: '', cvv: '' })
  const [paying, setPaying] = useState(false)

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id)
      if (existing) return prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { product, qty: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((id: number) => {
    setCart(prev => prev.filter(i => i.product.id !== id))
  }, [])

  const inCart = (id: number) => cart.some(i => i.product.id === id)

  const total = cart.reduce((sum, i) => sum + i.product.price * i.qty, 0)
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)

  const filtered = category === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === category)

  const getName = (p: Product) => lang === 'ru' ? p.nameRu : lang === 'uz' ? p.nameUz : p.nameEn
  const getDesc = (p: Product) => lang === 'ru' ? p.descRu : lang === 'uz' ? p.descUz : p.descEn

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault()
    setPaying(true)
    await new Promise(r => setTimeout(r, 2000))
    setPaying(false)
    setOrderDone(true)
  }

  return (
    <div className="min-h-screen bg-beige">
      {/* Header */}
      <div className="bg-forest pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-sage/50 text-sm hover:text-sage/80 transition-colors mb-4 inline-block">
                ← {t('common.backHome')}
              </Link>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-sage">{t('catalog.title')}</h1>
              <p className="text-sage/55 mt-2 text-lg">{t('catalog.subtitle')}</p>
            </div>
            {/* Cart button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 px-5 py-3 bg-moss text-forest rounded-full
                         font-bold text-sm hover:bg-mint transition-all hover:scale-105 active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {t('catalog.cart')}
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-forest text-moss rounded-full
                                 text-[0.6rem] font-black flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mt-8">
            {CATEGORIES.map(({ key, labelKey }) => (
              <button
                key={key}
                onClick={() => setCategory(key)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  category === key
                    ? 'bg-moss text-forest'
                    : 'bg-sage/10 text-sage/60 hover:bg-sage/20 hover:text-sage'
                }`}
              >
                {t(labelKey as Parameters<typeof t>[0])}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0  }}
                exit={{    opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative rounded-[1.6rem] overflow-hidden cursor-pointer"
                style={{
                  background: `linear-gradient(145deg, ${product.bg[0]}, ${product.bg[1]})`,
                  boxShadow:  `0 4px 24px ${product.bg[0]}88`,
                }}
              >
                <div
                  className="pointer-events-none absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-20"
                  style={{ background: product.accent }}
                />
                <div className="relative z-10 p-6 flex flex-col h-full min-h-[320px]">
                  {/* Badge + meta */}
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className="text-[0.62rem] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                      style={{ background: `${product.accent}28`, color: product.accent }}
                    >
                      {product.badge}
                    </span>
                    <span
                      className="text-[0.62rem] font-medium px-2.5 py-1 rounded-full"
                      style={{ background: `${product.accent}18`, color: product.accent }}
                    >
                      {product.meta}
                    </span>
                  </div>

                  {/* Bottle illustration */}
                  <div className="flex-1 flex items-center justify-center py-4">
                    <div className="relative w-24 h-36">
                      <div className="absolute inset-x-3 bottom-0 top-6 rounded-2xl"
                           style={{ background: `linear-gradient(180deg,${product.accent}55 0%,${product.accent}22 100%)`, border: `1px solid ${product.accent}44` }} />
                      <div className="absolute inset-x-7 top-2 h-6 rounded-t-lg" style={{ background: `${product.accent}44` }} />
                      <div className="absolute inset-x-5 top-0 h-4 rounded-t-xl" style={{ background: `${product.accent}cc` }} />
                      <div className="absolute inset-x-5 top-10 bottom-3 rounded-xl flex flex-col items-center justify-center gap-1"
                           style={{ background: `${product.accent}18` }}>
                        <span className="text-[8px] font-black" style={{ color: product.accent }}>NUMA</span>
                        <div className="w-7 h-px" style={{ background: `${product.accent}55` }} />
                        <span className="text-[6px] font-semibold tracking-widest" style={{ color: `${product.accent}99` }}>
                          {product.label}
                        </span>
                      </div>
                      <div className="absolute left-4 top-7 w-1.5 bottom-4 rounded-full opacity-20" style={{ background: product.accent }} />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-2">
                    <h3 className="text-[1.05rem] font-extrabold" style={{ color: product.accent }}>
                      {getName(product)}
                    </h3>
                    <p className="text-[0.7rem] leading-relaxed opacity-55" style={{ color: product.accent }}>
                      {getDesc(product)}
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <div className="text-[1.25rem] font-extrabold" style={{ color: product.accent }}>
                          {formatPrice(product.price, lang)}
                        </div>
                        <div className="text-[0.65rem] opacity-50" style={{ color: product.accent }}>
                          {t('catalog.perMonth')}
                        </div>
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        className="px-4 py-2 rounded-full text-[0.75rem] font-bold transition-all active:scale-95"
                        style={{
                          background: inCart(product.id) ? `${product.accent}44` : product.accent,
                          color: inCart(product.id) ? product.accent : product.bg[0],
                          border: `1px solid ${product.accent}55`,
                        }}
                      >
                        {inCart(product.id) ? t('catalog.inCart') : t('catalog.addToCart')}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Cart Sidebar ── */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-cream z-50 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-beige">
                <h2 className="text-xl font-extrabold text-forest">{t('catalog.cart')}</h2>
                <button onClick={() => setCartOpen(false)} className="text-forest/40 hover:text-forest transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-forest/40 text-center py-12">{t('catalog.cartEmpty')}</p>
                ) : (
                  cart.map(({ product, qty }) => (
                    <div key={product.id}
                         className="flex items-center gap-4 p-4 rounded-2xl bg-beige border border-forest/6">
                      <div className="w-12 h-12 rounded-xl flex-shrink-0"
                           style={{ background: `linear-gradient(135deg,${product.bg[0]},${product.bg[1]})` }} />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-forest text-sm truncate">{getName(product)}</div>
                        <div className="text-forest/50 text-xs">{formatPrice(product.price * qty, lang)}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-forest">×{qty}</span>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-forest/30 hover:text-red-500 transition-colors text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-beige space-y-4">
                  <div className="flex items-center justify-between text-lg font-extrabold text-forest">
                    <span>{t('catalog.total')}</span>
                    <span>{formatPrice(total, lang)}</span>
                  </div>
                  <button
                    onClick={() => { setCartOpen(false); setCheckoutOpen(true) }}
                    className="w-full py-4 bg-moss text-forest rounded-2xl font-bold text-base
                               hover:bg-mint transition-all hover:scale-[1.02] active:scale-95"
                  >
                    {t('catalog.checkout')} →
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Checkout Modal ── */}
      <AnimatePresence>
        {checkoutOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !orderDone && setCheckoutOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 32 }}
              animate={{ opacity: 1, scale: 1,    y: 0  }}
              exit={{   opacity: 0, scale: 0.92,  y: 32 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-xl mx-auto bg-cream z-50
                         rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              {orderDone ? (
                <div className="p-10 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    className="w-20 h-20 bg-moss rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <svg className="w-10 h-10 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h2 className="text-2xl font-extrabold text-forest mb-3">{t('checkout.success')}</h2>
                  <p className="text-forest/50 mb-8 text-sm">{formatPrice(total, lang)}</p>
                  <button
                    onClick={() => { setCheckoutOpen(false); setOrderDone(false); setCart([]) }}
                    className="px-8 py-3 bg-moss text-forest rounded-full font-bold hover:bg-mint transition-all"
                  >
                    {t('checkout.back')}
                  </button>
                </div>
              ) : (
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-extrabold text-forest">{t('checkout.title')}</h2>
                    <button onClick={() => setCheckoutOpen(false)} className="text-forest/40 hover:text-forest">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Order summary */}
                  <div className="bg-beige rounded-2xl p-4 mb-6 space-y-2">
                    <div className="text-xs font-bold text-forest/50 uppercase tracking-widest mb-3">
                      {t('checkout.orderSummary')}
                    </div>
                    {cart.map(({ product, qty }) => (
                      <div key={product.id} className="flex justify-between text-sm">
                        <span className="text-forest/70">{getName(product)} × {qty}</span>
                        <span className="font-semibold text-forest">{formatPrice(product.price * qty, lang)}</span>
                      </div>
                    ))}
                    <div className="border-t border-forest/10 pt-2 flex justify-between font-extrabold text-forest">
                      <span>{t('catalog.total')}</span>
                      <span>{formatPrice(total, lang)}</span>
                    </div>
                  </div>

                  <form onSubmit={handlePay} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2">
                        <label className="text-xs font-semibold text-forest/50 mb-1 block">{t('checkout.name')}</label>
                        <input required value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))}
                          className="w-full px-4 py-3 rounded-xl bg-beige border border-forest/10 text-forest text-sm
                                     focus:outline-none focus:border-moss transition-colors"
                          placeholder="Иванов Иван" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-forest/50 mb-1 block">{t('checkout.phone')}</label>
                        <input required value={form.phone} onChange={e => setForm(p => ({...p, phone: e.target.value}))}
                          className="w-full px-4 py-3 rounded-xl bg-beige border border-forest/10 text-forest text-sm
                                     focus:outline-none focus:border-moss transition-colors"
                          placeholder="+998 90 000 00 00" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-forest/50 mb-1 block">{t('checkout.city')}</label>
                        <input required value={form.city} onChange={e => setForm(p => ({...p, city: e.target.value}))}
                          className="w-full px-4 py-3 rounded-xl bg-beige border border-forest/10 text-forest text-sm
                                     focus:outline-none focus:border-moss transition-colors"
                          placeholder="Ташкент" />
                      </div>
                      <div className="col-span-2">
                        <label className="text-xs font-semibold text-forest/50 mb-1 block">{t('checkout.address')}</label>
                        <input required value={form.address} onChange={e => setForm(p => ({...p, address: e.target.value}))}
                          className="w-full px-4 py-3 rounded-xl bg-beige border border-forest/10 text-forest text-sm
                                     focus:outline-none focus:border-moss transition-colors"
                          placeholder="ул. Амира Темура, д. 1, кв. 1" />
                      </div>
                    </div>

                    <div className="border-t border-beige pt-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-4 bg-blue-600 rounded-sm" />
                        <div className="w-6 h-4 bg-red-500 rounded-sm" />
                        <span className="text-xs text-forest/40 font-medium">Тестовая оплата</span>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-semibold text-forest/50 mb-1 block">{t('checkout.card')}</label>
                          <input required value={form.card} onChange={e => setForm(p => ({...p, card: e.target.value}))}
                            className="w-full px-4 py-3 rounded-xl bg-beige border border-forest/10 text-forest text-sm
                                       focus:outline-none focus:border-moss transition-colors"
                            placeholder="0000 0000 0000 0000" maxLength={19} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-semibold text-forest/50 mb-1 block">{t('checkout.expiry')}</label>
                            <input required value={form.expiry} onChange={e => setForm(p => ({...p, expiry: e.target.value}))}
                              className="w-full px-4 py-3 rounded-xl bg-beige border border-forest/10 text-forest text-sm
                                         focus:outline-none focus:border-moss transition-colors"
                              placeholder="MM/YY" maxLength={5} />
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-forest/50 mb-1 block">{t('checkout.cvv')}</label>
                            <input required value={form.cvv} onChange={e => setForm(p => ({...p, cvv: e.target.value}))}
                              className="w-full px-4 py-3 rounded-xl bg-beige border border-forest/10 text-forest text-sm
                                         focus:outline-none focus:border-moss transition-colors"
                              placeholder="CVV" maxLength={3} type="password" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={paying}
                      className="w-full py-4 bg-moss text-forest rounded-2xl font-bold text-base
                                 hover:bg-mint transition-all hover:scale-[1.02] active:scale-95
                                 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {paying ? (
                        <>
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                          </svg>
                          Обработка...
                        </>
                      ) : (
                        <>{t('checkout.pay')} — {formatPrice(total, lang)}</>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
