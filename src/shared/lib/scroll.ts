export function scrollTo(href: string) {
  if (!href.startsWith('#')) return
  const el = document.querySelector(href)
  el?.scrollIntoView({ behavior: 'smooth' })
}
