import type { TranslationKey } from '@/shared/config/translations'

export const NAV_LINKS: { labelKey: TranslationKey; href: string }[] = [
  { labelKey: 'nav.catalog',  href: '/catalog'     },
  { labelKey: 'nav.science',  href: '#science'     },
  { labelKey: 'nav.blog',     href: '/blog'        },
  { labelKey: 'nav.learn',    href: '#education'   },
]
