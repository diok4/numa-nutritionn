'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '@/shared/lib/i18n'
import { useCart, type CartProduct } from '@/shared/lib/cart'
import { Navbar } from '@/widgets/navbar'
import img6 from '../../../../assets/img6.png'
import img13 from '../../../../assets/img13.png'

type Category = 'all' | 'gut' | 'vitamins' | 'energy' | 'sleep' | 'immunity'

interface Product extends CartProduct {
  descRu: string
  descUz: string
  descEn: string
  category: Category
  badge: string
  accent: string
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
    price: 149000,
    category: 'gut',
    badge: 'Хит продаж',
    bg: ['#0A0A0A', '#1A1A1A'],
    accent: '#D4F7E8',
    meta: '24 штамма',
  },
  {
    id: 2,
    nameRu: 'Daily Multivitamin',
    nameUz: 'Kunlik Multivitamin',
    nameEn: 'Daily Multivitamin',
    descRu: '25+ основных витаминов и минералов из натуральных цельных продуктов.',
    descUz: '25+ asosiy vitamin va minerallar tabiiy butun oziq-ovqat manbalaridan.',
    descEn: '25+ essential vitamins and minerals derived from real whole-food sources.',
    price: 119000,
    category: 'vitamins',
    badge: 'Новинка',
    bg: ['#0D2A1A', '#1A4D2E'],
    accent: '#D4F7E8',
    meta: '25+ нутриентов',
  },
  {
    id: 3,
    nameRu: 'Energy + Focus',
    nameUz: 'Energiya + Diqqat',
    nameEn: 'Energy + Focus',
    descRu: 'Ноотропные адаптогены для устойчивой умственной ясности без упадка сил.',
    descUz: 'Uzoq muddatli aqliy aniqlik uchun nootropik adaptogenlar.',
    descEn: 'Nootropic adaptogens for sustained mental clarity without the crash.',
    price: 139000,
    category: 'energy',
    badge: 'Популярный',
    bg: ['#112B1C', '#1B5134'],
    accent: '#E3F8EC',
    meta: '12 адаптогенов',
  },
  {
    id: 4,
    nameRu: 'Sleep + Restore',
    nameUz: 'Uyqu + Tiklanish',
    nameEn: 'Sleep + Restore',
    descRu: 'Магний, L-Теанин и успокаивающие растения для спокойного сна.',
    descUz: 'Magnesiy, L-Teanin va tinchlantiruvchi botanikalar tinch uyqu uchun.',
    descEn: 'Magnesium, L-Theanine and calming botanicals for restful sleep.',
    price: 129000,
    category: 'sleep',
    badge: 'Любимый',
    bg: ['#102319', '#20442F'],
    accent: '#DCF5E8',
    meta: '8 растений',
  },
  {
    id: 5,
    nameRu: 'Vitamin C + Цинк',
    nameUz: 'C Vitamini + Rux',
    nameEn: 'Vitamin C + Zinc',
    descRu: 'Мощная иммунная поддержка. 1000 мг витамина C с биофлавоноидами + 15 мг цинка.',
    descUz: '1000 mg C vitamini bioflavonoidlar bilan + 15 mg rux. Kuchli immunitet qo\'llab-quvvatlash.',
    descEn: 'Powerful immune support. 1000mg Vitamin C with bioflavonoids + 15mg Zinc.',
    price: 69000,
    category: 'immunity',
    badge: 'Иммунитет',
    bg: ['#0F2317', '#1C4A30'],
    accent: '#E0F8EA',
    meta: '1000 мг C',
  },
  {
    id: 6,
    nameRu: 'Omega-3 Рыбий жир',
    nameUz: 'Omega-3 Baliq Yog\'i',
    nameEn: 'Omega-3 Fish Oil',
    descRu: 'Очищенный рыбий жир высокой концентрации для здоровья сердца и мозга.',
    descUz: 'Yurak va miya salomatligi uchun yuqori kontsentratsiyali tozalangan baliq yog\'i.',
    descEn: 'High-concentration purified fish oil for heart and brain health.',
    price: 99000,
    category: 'vitamins',
    badge: 'Чистый',
    bg: ['#0E2416', '#215438'],
    accent: '#D8F6E7',
    meta: '2000 мг EPA+DHA',
  },
  {
    id: 7,
    nameRu: 'Magnesium Glycinate',
    nameUz: 'Magniy Glitsinati',
    nameEn: 'Magnesium Glycinate',
    descRu: 'Высокобиодоступная форма магния для нервной системы, восстановления и сна.',
    descUz: 'Asab tizimi, tiklanish va uyqu uchun yuqori biofoydali magniy shakli.',
    descEn: 'Highly bioavailable magnesium form for nervous system, recovery, and sleep quality.',
    price: 109000,
    category: 'sleep',
    badge: 'Баланс',
    bg: ['#102419', '#1F4C31'],
    accent: '#DDF6E8',
    meta: '400 мг',
  },
  {
    id: 8,
    nameRu: 'B-Complex Active',
    nameUz: 'B-Kompleks Active',
    nameEn: 'B-Complex Active',
    descRu: 'Комплекс витаминов группы B для энергии, концентрации и метаболической поддержки.',
    descUz: 'Energiya, diqqat va metabolik qo\'llab-quvvatlash uchun B guruhi vitaminlari kompleksi.',
    descEn: 'Active B-vitamin complex for energy metabolism, focus, and daily performance.',
    price: 89000,
    category: 'energy',
    badge: 'Фокус',
    bg: ['#0E2518', '#214F34'],
    accent: '#DCF4E6',
    meta: '8 витаминов B',
  },
  {
    id: 9,
    nameRu: 'Probiotic Kids',
    nameUz: 'Probiotic Kids',
    nameEn: 'Probiotic Kids',
    descRu: 'Мягкая синбиотическая формула для ежедневной поддержки детского микробиома.',
    descUz: 'Bolalar mikrobiomini har kuni qo\'llab-quvvatlash uchun yumshoq sinbiotik formula.',
    descEn: 'Gentle synbiotic formula for daily support of children\'s microbiome balance.',
    price: 99000,
    category: 'gut',
    badge: 'Семейный',
    bg: ['#10261A', '#22593A'],
    accent: '#E0F9EC',
    meta: '12 штаммов',
  },
  {
    id: 10,
    nameRu: 'Immunity Guard',
    nameUz: 'Immunitet Guard',
    nameEn: 'Immunity Guard',
    descRu: 'Витамин C, цинк и растительные экстракты для сезонной иммунной защиты.',
    descUz: 'Mavsumiy immun himoya uchun C vitamini, rux va o\'simlik ekstraktlari.',
    descEn: 'Vitamin C, Zinc and plant extracts for reliable seasonal immune support.',
    price: 79000,
    category: 'immunity',
    badge: 'Защита',
    bg: ['#0F2417', '#1D4A30'],
    accent: '#DDF7EA',
    meta: 'C + Zn',
  },
  {
    id: 11,
    nameRu: 'Daily Fiber+',
    nameUz: 'Daily Fiber+',
    nameEn: 'Daily Fiber+',
    descRu: 'Растворимая клетчатка и пребиотический комплекс для комфортного пищеварения.',
    descUz: 'Qulay hazm qilish uchun eruvchan tolalar va prebiotik kompleks.',
    descEn: 'Soluble fiber and prebiotic blend for comfortable digestion and gut regularity.',
    price: 74000,
    category: 'gut',
    badge: 'Комфорт',
    bg: ['#112A1C', '#255F3D'],
    accent: '#D9F5E6',
    meta: 'Пребиотик',
  },
]

const CATEGORIES: { key: Category; labelKey: string }[] = [
  { key: 'all', labelKey: 'catalog.all' },
  { key: 'gut', labelKey: 'catalog.gut' },
  { key: 'vitamins', labelKey: 'catalog.vitamins' },
  { key: 'energy', labelKey: 'catalog.energy' },
  { key: 'sleep', labelKey: 'catalog.sleep' },
  { key: 'immunity', labelKey: 'catalog.immunity' },
]

function formatPrice(price: number, lang: string) {
  return price.toLocaleString('ru-RU') + ' ' + (lang === 'en' ? 'UZS' : lang === 'uz' ? 'so\'m' : 'сум')
}

export default function CatalogPage() {
  const { lang, t } = useLang()
  const [category, setCategory] = useState<Category>('all')
  const { cart, addItem, removeItem } = useCart()

  const filtered = category === 'all' ? PRODUCTS : PRODUCTS.filter(product => product.category === category)
  const getName = (product: Product) => (lang === 'ru' ? product.nameRu : lang === 'uz' ? product.nameUz : product.nameEn)
  const getDesc = (product: Product) => (lang === 'ru' ? product.descRu : lang === 'uz' ? product.descUz : product.descEn)
  const getProductImage = (id: number) => (id % 2 === 0 ? img6 : img13)
  const getQtyInCart = (id: number) => cart.find(item => item.product.id === id)?.qty ?? 0
  const addedLabel = lang === 'ru' ? 'Добавлено' : lang === 'uz' ? 'Qo‘shildi' : 'Added'

  return (
    <div className="min-h-screen bg-[#e8efee]">
      <Navbar />


      <section className="pt-28 sm:pt-32 pb-10 sm:pb-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-10 shadow-sm">
            <div>
              <div>
                <Link href="/" className="text-[#1f8b85]/50 text-sm hover:text-[#1f8b85] transition-colors mb-4 inline-block">
                  ← {t('common.backHome')}
                </Link>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1f8b85]">{t('catalog.title')}</h1>
                <p className="text-[#1f8b85]/60 mt-2 text-base sm:text-lg">{t('catalog.subtitle')}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-8">
              {CATEGORIES.map(({ key, labelKey }) => (
                <button
                  key={key}
                  onClick={() => setCategory(key)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    category === key
                      ? 'bg-[#1f8b85] text-white'
                      : 'bg-[#1f8b85]/8 border border-[#1f8b85]/15 text-[#1f8b85]/70 hover:bg-[#1f8b85]/15 hover:text-[#1f8b85]'
                  }`}
                >
                  {t(labelKey as Parameters<typeof t>[0])}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((product, index) => (
                <motion.article
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.32, delay: index * 0.04 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm"
                >
                  <div className="p-5 sm:p-6 flex flex-col min-h-[340px]">
                    <div className="flex items-start justify-between mb-4 gap-2">
                      <span className="text-[0.68rem] font-bold uppercase tracking-[0.1em] px-3 py-1.5 rounded-full bg-[#1f8b85]/10 text-[#1f8b85]">
                        {product.badge}
                      </span>
                      <span className="text-[0.66rem] px-2.5 py-1 rounded-full bg-[#1f8b85]/8 text-[#1f8b85]/70">
                        {product.meta}
                      </span>
                    </div>

                    <div className="flex-1 flex items-center justify-center py-2">
                      <Image
                        src={getProductImage(product.id)}
                        alt={getName(product)}
                        width={170} height={230}
                        className="w-auto h-[180px] sm:h-[200px] object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="space-y-2.5 mt-4">
                      <h3 className="text-[1.05rem] sm:text-[1.15rem] font-extrabold text-[#1f8b85]">
                        {getName(product)}
                      </h3>
                      <p className="text-[0.76rem] leading-relaxed text-[#1f8b85]/60">
                        {getDesc(product)}
                      </p>

                      <div className="flex items-center justify-between pt-2 gap-3">
                        <div>
                          <div className="text-[1.15rem] font-extrabold text-[#1f8b85]">
                            {formatPrice(product.price, lang)}
                          </div>
                        </div>
                        {(() => {
                          const qty = getQtyInCart(product.id)
                          return (
                            <button
                              onClick={() => (qty > 0 ? removeItem(product.id) : addItem(product))}
                              className={`px-4 py-2 rounded-full text-[0.78rem] font-bold border transition-all active:scale-95 ${
                                qty > 0
                                  ? 'bg-white text-[#1f8b85] border-[#1f8b85]/20 hover:bg-[#f5f2ec]'
                                  : 'bg-[#1f8b85] text-white border-[#1f8b85] hover:bg-[#1f8b85]/85'
                              }`}
                            >
                              {qty > 0 ? `✓ ${addedLabel}` : t('catalog.addToCart')}
                            </button>
                          )
                        })()}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
