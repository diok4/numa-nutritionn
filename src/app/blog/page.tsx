'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLang } from '@/shared/lib/i18n'
import { BLOG_POSTS } from '@/shared/config/blog-posts'

const CATEGORIES = ['Все / All', 'Наука', 'Витамины', 'Здоровье', 'Сон', 'Красота', 'Энергия', 'Советы']

export default function BlogPage() {
  const { lang, t } = useLang()
  const [activeCategory, setActiveCategory] = useState('Все / All')

  const filtered = activeCategory === 'Все / All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(p => p.category === activeCategory)

  const getTitle   = (p: typeof BLOG_POSTS[0]) => lang === 'ru' ? p.titleRu   : lang === 'uz' ? p.titleUz   : p.titleEn
  const getExcerpt = (p: typeof BLOG_POSTS[0]) => lang === 'ru' ? p.excerptRu : lang === 'uz' ? p.excerptUz : p.excerptEn

  const formatDate = (d: string) => {
    const date = new Date(d)
    if (lang === 'en') return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    if (lang === 'uz') return date.toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' })
    return date.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <div className="min-h-screen bg-beige">
      {/* Header */}
      <div className="bg-forest pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="text-sage/50 text-sm hover:text-sage/80 transition-colors mb-4 inline-block">
            ← {t('common.backHome')}
          </Link>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-sage">{t('blog.title')}</h1>
          <p className="text-sage/55 mt-2 text-lg max-w-2xl">{t('blog.subtitle')}</p>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mt-8">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-moss text-forest'
                    : 'bg-sage/10 text-sage/60 hover:bg-sage/20 hover:text-sage'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <Link href={`/blog/${post.slug}`} className="block group">
                <div className="bg-cream rounded-3xl overflow-hidden shadow-sm hover:shadow-xl
                               transition-all duration-300 hover:-translate-y-1 border border-forest/5">
                  {/* Cover */}
                  <div
                    className="h-48 flex items-center justify-center relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${post.gradient[0]}, ${post.gradient[1]})` }}
                  >
                    <div className="absolute inset-0 opacity-30"
                         style={{ background: `radial-gradient(circle at 30% 50%, ${post.accentColor}44, transparent 60%)` }} />
                    <div className="relative z-10 text-center px-6">
                      <span
                        className="inline-block px-3 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-widest mb-3"
                        style={{ background: `${post.accentColor}28`, color: post.accentColor }}
                      >
                        {post.category}
                      </span>
                      <p className="font-extrabold text-lg leading-tight" style={{ color: post.accentColor }}>
                        {getTitle(post)}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs text-forest/40">{formatDate(post.date)}</span>
                      <span className="w-1 h-1 rounded-full bg-forest/20" />
                      <span className="text-xs text-forest/40">{post.readTime} {t('blog.minRead')}</span>
                    </div>
                    <p className="text-forest/60 text-sm leading-relaxed line-clamp-3">
                      {getExcerpt(post)}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-moss text-sm font-semibold
                                   group-hover:gap-2 transition-all">
                      {t('blog.readMore')}
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
