'use client'

import { useEffect, useState } from 'react'

function detectLowPerformanceMode() {
  if (typeof window === 'undefined') return true

  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { effectiveType?: string } }
  const isMobile        = window.matchMedia('(max-width: 1024px)').matches
  const prefersReduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const lowMemory       = typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 4
  const lowCpu          = typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 4
  const slowConnection  = nav.connection?.effectiveType === '2g' || nav.connection?.effectiveType === 'slow-2g'

  return isMobile || prefersReduced || lowMemory || lowCpu || !!slowConnection
}

export function useLowPerformanceMode() {
  // Start with true (SSR-safe — no 3D on first paint)
  const [low, setLow] = useState(true)

  useEffect(() => {
    const mqMobile  = window.matchMedia('(max-width: 1024px)')
    const mqReduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update    = () => setLow(detectLowPerformanceMode())

    update()
    mqMobile.addEventListener('change', update)
    mqReduced.addEventListener('change', update)

    return () => {
      mqMobile.removeEventListener('change', update)
      mqReduced.removeEventListener('change', update)
    }
  }, [])

  return low
}
