'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/widgets/navbar'
import { useLang } from '@/shared/lib/i18n'
import { useCart } from '@/shared/lib/cart'

function formatPrice(price: number, lang: string) {
  return price.toLocaleString('ru-RU') + ' ' + (lang === 'en' ? 'UZS' : lang === 'uz' ? 'so\'m' : 'сум')
}

export default function CartPage() {
  const { lang } = useLang()
  const { cart, hydrated, total, setQty, removeItem, clearCart } = useCart()

  const title = lang === 'ru' ? 'Корзина' : lang === 'uz' ? 'Savat' : 'Cart'
  const subtitle = lang === 'ru'
    ? 'Проверьте товары перед оплатой'
    : lang === 'uz'
    ? 'To\'lovdan oldin mahsulotlarni tekshiring'
    : 'Review your items before checkout'
  const toCatalog = lang === 'ru' ? 'К каталогу' : lang === 'uz' ? 'Katalogga' : 'To catalog'
  const emptyLabel = lang === 'ru' ? 'Корзина пуста' : lang === 'uz' ? 'Savat bo\'sh' : 'Cart is empty'
  const emptyHint = lang === 'ru'
    ? 'Добавьте товары из каталога и возвращайтесь к оформлению.'
    : lang === 'uz'
    ? 'Katalogdan mahsulot qo\'shing va rasmiylashtirishga qayting.'
    : 'Add products from catalog and come back for checkout.'
  const totalLabel = lang === 'ru' ? 'Итого' : lang === 'uz' ? 'Jami' : 'Total'
  const clearLabel = lang === 'ru' ? 'Очистить корзину' : lang === 'uz' ? 'Savatni tozalash' : 'Clear cart'
  const checkoutLabel = lang === 'ru' ? 'Перейти к оплате' : lang === 'uz' ? 'To\'lovga o\'tish' : 'Proceed to checkout'
  const removeLabel = lang === 'ru' ? 'Удалить' : lang === 'uz' ? 'O\'chirish' : 'Remove'

  return (
    <div className="min-h-screen bg-[#2c4a2a]">
      <Navbar />

      <main className="pt-28 sm:pt-32 pb-14 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-sm">
            <Link href="/catalog" className="text-[#1a3d18]/50 hover:text-[#1a3d18] text-sm inline-block mb-4">
              ← {toCatalog}
            </Link>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1a3d18]">{title}</h1>
            <p className="text-[#1a3d18]/60 mt-2">{subtitle}</p>
          </div>

          {!hydrated ? (
            <div className="bg-white rounded-3xl mt-5 p-8 text-[#1a3d18]/60">Loading...</div>
          ) : cart.length === 0 ? (
            <div className="bg-white rounded-3xl mt-5 p-8 sm:p-10 text-center">
              <h2 className="text-xl font-bold text-[#1a3d18]">{emptyLabel}</h2>
              <p className="text-[#1a3d18]/60 mt-2">{emptyHint}</p>
              <Link
                href="/catalog"
                className="inline-flex mt-6 px-6 py-3 rounded-full bg-[#1a3d18] text-white font-semibold hover:bg-[#1a3d18]/85"
              >
                {toCatalog}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5 mt-5">
              <div className="space-y-3">
                {cart.map(({ product, qty }) => (
                  <article key={product.id} className="bg-white rounded-2xl p-4 sm:p-5">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-14 h-14 rounded-xl flex-shrink-0 bg-[#f5f2ec] flex items-center justify-center"
                      >
                        <Image
                          src={product.id % 2 === 0 ? '/products/product-2.png' : '/products/product-1.png'}
                          alt="" width={40} height={56}
                          className="h-12 w-auto object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-[#1a3d18] truncate">
                          {lang === 'ru' ? product.nameRu : lang === 'uz' ? product.nameUz : product.nameEn}
                        </h3>
                        <p className="text-sm text-[#1a3d18]/60">{formatPrice(product.price, lang)}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 gap-3">
                      <div className="inline-flex items-center rounded-full border border-[#1a3d18]/20 overflow-hidden">
                        <button onClick={() => setQty(product.id, qty - 1)} className="px-3 py-1.5 text-[#1a3d18]/80 hover:bg-[#1a3d18]/8">−</button>
                        <span className="px-3 py-1.5 text-[#1a3d18] font-semibold min-w-[2.2rem] text-center">{qty}</span>
                        <button onClick={() => setQty(product.id, qty + 1)} className="px-3 py-1.5 text-[#1a3d18]/80 hover:bg-[#1a3d18]/8">+</button>
                      </div>
                      <button onClick={() => removeItem(product.id)} className="text-sm text-[#1a3d18]/50 hover:text-[#1a3d18]">
                        {removeLabel}
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <aside className="h-fit lg:sticky lg:top-28 bg-white rounded-2xl p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="text-[#1a3d18]/60">{totalLabel}</span>
                  <span className="text-2xl font-extrabold text-[#1a3d18]">{formatPrice(total, lang)}</span>
                </div>
                <Link
                  href="/checkout"
                  className="w-full mt-5 inline-flex justify-center px-6 py-3.5 rounded-full bg-[#1a3d18] text-white font-bold hover:bg-[#1a3d18]/85 transition-colors"
                >
                  {checkoutLabel}
                </Link>
                <button
                  onClick={clearCart}
                  className="w-full mt-3 px-6 py-3 rounded-full border border-[#1a3d18]/20 text-[#1a3d18]/70 hover:text-[#1a3d18] hover:bg-[#1a3d18]/6"
                >
                  {clearLabel}
                </button>
              </aside>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
