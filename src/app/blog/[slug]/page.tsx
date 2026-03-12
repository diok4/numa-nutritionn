'use client'

import { use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { useLang } from '@/shared/lib/i18n'
import { BLOG_POSTS } from '@/shared/config/blog-posts'

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

export default function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
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
    <div className="min-h-screen bg-beige">
      {/* Hero */}
      <div
        className="pt-28 pb-16 px-4 sm:px-6 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${post.gradient[0]}, ${post.gradient[1]})` }}
      >
        <div className="absolute inset-0 opacity-20"
             style={{ background: `radial-gradient(circle at 20% 50%, ${post.accentColor}55, transparent 50%)` }} />
        <div className="max-w-3xl mx-auto relative z-10">
          <Link href="/blog" className="text-sm font-medium hover:opacity-80 transition-opacity mb-6 inline-flex items-center gap-1"
                style={{ color: post.accentColor }}>
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
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-6"
            style={{ color: post.accentColor }}
          >
            {title}
          </motion.h1>
          <p className="text-lg leading-relaxed mb-6 opacity-70" style={{ color: post.accentColor }}>
            {excerpt}
          </p>
          <div className="flex items-center gap-4 text-sm opacity-55" style={{ color: post.accentColor }}>
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.readTime} {t('blog.minRead')}</span>
          </div>
        </div>
      </div>

      {/* Article body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-cream rounded-3xl p-8 sm:p-12 shadow-sm border border-forest/5"
        >
          <div className="prose prose-lg max-w-none">
            {renderMarkdown(body)}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-8 bg-forest rounded-3xl text-center"
        >
          <h3 className="text-2xl font-extrabold text-sage mb-3">
            {lang === 'ru' ? 'Попробуйте NUMA Nutrition' :
             lang === 'uz' ? 'NUMA Nutrition\'ni sinab ko\'ring' :
             'Try NUMA Nutrition'}
          </h3>
          <p className="text-sage/55 mb-6 max-w-md mx-auto">
            {lang === 'ru' ? 'Премиальные витамины и добавки с доставкой по Узбекистану' :
             lang === 'uz' ? 'O\'zbekiston bo\'ylab yetkazib berish bilan premium vitaminlar' :
             'Premium vitamins and supplements delivered across Uzbekistan'}
          </p>
          <Link
            href="/catalog"
            className="inline-block px-8 py-4 bg-moss text-forest rounded-full font-bold
                       hover:bg-mint transition-all hover:scale-105 active:scale-95"
          >
            {t('nav.catalog')} →
          </Link>
        </motion.div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-extrabold text-forest mb-6">
              {lang === 'ru' ? 'Похожие статьи' : lang === 'uz' ? 'O\'xshash maqolalar' : 'Related Articles'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((p) => {
                const relTitle = lang === 'ru' ? p.titleRu : lang === 'uz' ? p.titleUz : p.titleEn
                return (
                  <Link key={p.slug} href={`/blog/${p.slug}`}
                        className="group bg-cream rounded-2xl overflow-hidden hover:shadow-md transition-all">
                    <div className="h-28"
                         style={{ background: `linear-gradient(135deg, ${p.gradient[0]}, ${p.gradient[1]})` }} />
                    <div className="p-4">
                      <p className="text-sm font-bold text-forest group-hover:text-moss transition-colors line-clamp-2">
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
