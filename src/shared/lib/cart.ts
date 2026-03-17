'use client'

import { useCallback, useEffect, useMemo, useSyncExternalStore } from 'react'

export interface CartProduct {
  id: number
  nameRu: string
  nameUz: string
  nameEn: string
  price: number
  bg: [string, string]
}

export interface CartItem {
  product: CartProduct
  qty: number
}

const CART_STORAGE_KEY = 'numa-cart-v1'

let cartState: CartItem[] = []
let hydratedState = false
let initialized = false
let storageBound = false
const listeners = new Set<() => void>()

function notify() {
  listeners.forEach(listener => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== 'object') return false
  const item = value as Partial<CartItem>
  if (!item.product || typeof item.product !== 'object') return false
  if (typeof item.qty !== 'number' || item.qty <= 0) return false

  const product = item.product as Partial<CartProduct>
  return (
    typeof product.id === 'number' &&
    typeof product.nameRu === 'string' &&
    typeof product.nameUz === 'string' &&
    typeof product.nameEn === 'string' &&
    typeof product.price === 'number' &&
    Array.isArray(product.bg) &&
    product.bg.length === 2 &&
    typeof product.bg[0] === 'string' &&
    typeof product.bg[1] === 'string'
  )
}

function readCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isCartItem)
  } catch {
    return []
  }
}

function writeCartToStorage(nextCart: CartItem[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(nextCart))
}

function setCart(nextCart: CartItem[]) {
  cartState = nextCart
  hydratedState = true
  writeCartToStorage(nextCart)
  notify()
}

function ensureInitialized() {
  if (typeof window === 'undefined' || initialized) return

  cartState = readCartFromStorage()
  hydratedState = true
  initialized = true

  if (!storageBound) {
    window.addEventListener('storage', event => {
      if (event.key !== CART_STORAGE_KEY) return
      cartState = readCartFromStorage()
      hydratedState = true
      notify()
    })
    storageBound = true
  }

  notify()
}

function getCartSnapshot() {
  return cartState
}

function getHydratedSnapshot() {
  return hydratedState
}

export function useCart() {
  useEffect(() => {
    ensureInitialized()
  }, [])

  const cart = useSyncExternalStore(subscribe, getCartSnapshot, () => [])
  const hydrated = useSyncExternalStore(subscribe, getHydratedSnapshot, () => false)

  const addItem = useCallback((product: CartProduct) => {
    ensureInitialized()
    const existing = cartState.find(item => item.product.id === product.id)
    if (existing) {
      setCart(
        cartState.map(item =>
          item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      )
      return
    }
    setCart([...cartState, { product, qty: 1 }])
  }, [])

  const removeItem = useCallback((id: number) => {
    ensureInitialized()
    setCart(cartState.filter(item => item.product.id !== id))
  }, [])

  const setQty = useCallback((id: number, qty: number) => {
    ensureInitialized()
    if (qty <= 0) {
      setCart(cartState.filter(item => item.product.id !== id))
      return
    }
    setCart(cartState.map(item => (item.product.id === id ? { ...item, qty } : item)))
  }, [])

  const clearCart = useCallback(() => {
    ensureInitialized()
    setCart([])
  }, [])

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.product.price * item.qty, 0),
    [cart]
  )
  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart]
  )

  return {
    cart,
    hydrated,
    total,
    cartCount,
    addItem,
    removeItem,
    setQty,
    clearCart,
  }
}
