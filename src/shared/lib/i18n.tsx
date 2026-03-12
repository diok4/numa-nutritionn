'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react'
import { translations, Lang, TranslationKey } from '@/shared/config/translations'

interface I18nCtx {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: TranslationKey) => string
}

const I18nContext = createContext<I18nCtx>({
  lang: 'ru',
  setLang: () => {},
  t: (key) => key,
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ru')

  useEffect(() => {
    const saved = (localStorage.getItem('numa-lang') as Lang) || 'ru'
    setLangState(saved)
  }, [])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    localStorage.setItem('numa-lang', l)
  }, [])

  const t = useCallback(
    (key: TranslationKey): string => {
      const entry = translations[key]
      if (!entry) return key
      return (entry as Record<Lang, string>)[lang] ?? key
    },
    [lang]
  )

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export const useLang = () => useContext(I18nContext)
