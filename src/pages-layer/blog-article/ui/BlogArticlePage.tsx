'use client'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { useLang } from '@/shared/lib/i18n'
import { BLOG_POSTS } from '@/shared/config/blog-posts'
import { Navbar } from '@/widgets/navbar'

function renderMarkdown(text: string) {
  const lines = text.split('\n')
  const result: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('## ')) {
      result.push(
        <h2 key={i} className="text-2xl font-extrabold text-forest mt-10 mb-4">
          {line.slice(3)}
        </h2>
      )
    } else if (line.startsWith('### ')) {
      result.push(
        <h3 key={i} className="text-xl font-bold text-forest mt-6 mb-3">
          {line.slice(4)}
        </h3>
      )
    } else if (line.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2))
        i++
      }
      result.push(
        <ul key={i} className="space-y-2 mb-4 pl-0">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-forest/70">
              <span className="w-5 h-5 rounded-full bg-moss/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-moss" />
              </span>
              <span dangerouslySetInnerHTML={{ __html: parseBold(item) }} />
            </li>
          ))}
        </ul>
      )
      continue
    } else if (/^\d+\./.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\./.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s*/, ''))
        i++
      }
      result.push(
        <ol key={i} className="space-y-2 mb-4 pl-0 list-none">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-forest/70">
              <span className="w-6 h-6 rounded-full bg-moss text-forest text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {j + 1}
              </span>
              <span dangerouslySetInnerHTML={{ __html: parseBold(item) }} />
            </li>
          ))}
        </ol>
      )
      continue
    } else if (line.startsWith('| ')) {
      // Skip table lines
    } else if (line.trim() === '') {
      // skip empty lines
    } else {
      result.push(
        <p key={i} className="text-forest/65 leading-relaxed mb-4"
           dangerouslySetInnerHTML={{ __html: parseBold(line) }} />
      )
    }
    i++
  }

  return result
}

function parseBold(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-forest">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
}

export default function BlogArticlePage({ slug }: { slug: string }) {
  const { lang, t } = useLang()

  const post = BLOG_POSTS.find(p => p.slug === slug)
  if (!post) notFound()

  const title   = lang === 'ru' ? post.titleRu   : lang === 'uz' ? post.titleUz   : post.titleEn
  const body    = lang === 'ru' ? post.bodyRu    : lang === 'uz' ? post.bodyUz    : post.bodyEn
  const excerpt = lang === 'ru' ? post.excerptRu : lang === 'uz' ? post.excerptUz : post.excerptEn

  const formatDate = (d: string) => {
    const date = new Date(d)
    if (lang === 'en') return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    if (lang === 'uz') return date.toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' })
    return date.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const related = BLOG_POSTS.filter(p => p.slug !== slug && p.category === post.category).slice(0, 3)

  return (
    <div className="min-h-screen bg-[#12311a]">
      <Navbar />
      <div className="pt-24 sm:pt-28 pb-8 sm:pb-10 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute -top-28 right-0 h-64 w-64 rounded-full bg-[#3d7a51]/30 blur-3xl" />
        <div className="absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-[#5da474]/18 blur-3xl" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div
            className="rounded-[2rem] overflow-hidden border border-white/20"
            style={{ background: `linear-gradient(135deg, ${post.gradient[0]}, ${post.gradient[1]})` }}
          >
            <div className="relative px-5 sm:px-8 lg:px-10 py-7 sm:py-9 lg:py-10">
              <div
                className="absolute inset-0 opacity-25"
                style={{ background: `radial-gradient(circle at 18% 20%, ${post.accentColor}66, transparent 55%)` }}
              />
              <div className="relative z-10">
                <Link href="/blog" className="text-sm font-medium hover:opacity-100 transition-opacity mb-5 inline-flex items-center gap-1 text-white/80">
                  ← {t('blog.backToBlog')}
                </Link>
                <span
                  className="inline-block px-3 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-widest mb-4"
                  style={{ background: `${post.accentColor}28`, color: post.accentColor }}
                >
                  {post.category}
                </span>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[1.9rem] sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-5 text-white"
                >
                  {title}
                </motion.h1>
                <p className="text-base sm:text-lg leading-relaxed mb-6 text-white/84">
                  {excerpt}
                </p>
                <div className="flex items-center gap-3.5 text-sm text-white/70">
                  <span>{formatDate(post.date)}</span>
                  <span>•</span>
                  <span>{post.readTime} {t('blog.minRead')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-12 sm:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[2rem] p-6 sm:p-9 lg:p-12 shadow-[0_18px_36px_rgba(8,20,12,0.13)] border border-white/30"
        >
          <div className="prose prose-lg max-w-none">
            {renderMarkdown(body)}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 sm:mt-8 p-6 sm:p-8 bg-[#0f2615] rounded-[2rem] text-center border border-white/12"
        >
          <h3 className="text-2xl font-extrabold text-white mb-3">
            {lang === 'ru' ? 'Попробуйте NUMA Nutrition' :
             lang === 'uz' ? 'NUMA Nutrition\'ni sinab ko\'ring' :
             'Try NUMA Nutrition'}
          </h3>
          <p className="text-white/75 mb-6 max-w-md mx-auto">
            {lang === 'ru' ? 'Премиальные витамины и добавки с доставкой по Узбекистану' :
             lang === 'uz' ? 'O\'zbekiston bo\'ylab yetkazib berish bilan premium vitaminlar' :
             'Premium vitamins and supplements delivered across Uzbekistan'}
          </p>
          <Link
            href="/catalog"
            className="inline-block px-8 py-3.5 bg-white text-[#1a3d18] rounded-full font-bold
                       hover:bg-white/90 transition-all hover:scale-105 active:scale-95"
          >
            {t('nav.catalog')} →
          </Link>
        </motion.div>

        {related.length > 0 && (
          <div className="mt-10 sm:mt-12">
            <h2 className="text-2xl font-extrabold text-white mb-5 sm:mb-6">
              {lang === 'ru' ? 'Похожие статьи' : lang === 'uz' ? 'O\'xshash maqolalar' : 'Related Articles'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
              {related.map((p) => {
                const relTitle = lang === 'ru' ? p.titleRu : lang === 'uz' ? p.titleUz : p.titleEn
                return (
                  <Link key={p.slug} href={`/blog/${p.slug}`}
                        className="group bg-white rounded-2xl overflow-hidden border border-white/25 shadow-[0_8px_22px_rgba(8,20,12,0.12)] hover:shadow-[0_14px_30px_rgba(8,20,12,0.16)] transition-all hover:-translate-y-1">
                    <div className="h-28"
                         style={{ background: `linear-gradient(135deg, ${p.gradient[0]}, ${p.gradient[1]})` }} />
                    <div className="p-4">
                      <p className="text-sm font-bold text-[#1a3d18] group-hover:text-[#255f2a] transition-colors line-clamp-2">
                        {relTitle}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
