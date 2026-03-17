import type { TranslationKey } from '@/shared/config/translations'

export const NAV_LINKS: { labelKey: TranslationKey; href: string }[] = [
  { labelKey: 'nav.home',     href: '/'        },
  { labelKey: 'nav.products', href: '/catalog'  },
  { labelKey: 'nav.blog',     href: '/blog'     },
  { labelKey: 'nav.contact',  href: '/contacts'  },
]
