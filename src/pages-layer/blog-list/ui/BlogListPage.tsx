'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLang } from '@/shared/lib/i18n'
import { BLOG_POSTS } from '@/shared/config/blog-posts'
import { Navbar } from '@/widgets/navbar'
import img1 from '../../../../assets/img1.png'
import img2 from '../../../../assets/img2.png'
import img3 from '../../../../assets/img3.png'
import img4 from '../../../../assets/img4.png'
import img5 from '../../../../assets/img5.png'
import img6 from '../../../../assets/img6.png'
import img7 from '../../../../assets/img7.png'
import img8 from '../../../../assets/img8.png'

const CATEGORIES = ['Все / All', 'Наука', 'Витамины', 'Здоровье', 'Сон', 'Красота', 'Энергия', 'Советы']
const BLOG_IMAGES = {
  'gut-brain-axis': img1,
  'vitamin-d-deficiency': img2,
  'probiotics-vs-prebiotics': img3,
  'omega-3-heart-health': img4,
  'magnesium-stress-sleep': img5,
  'collagen-after-30': img6,
  'how-to-take-vitamins': img7,
  'ashwagandha-adaptogen': img8,
} as const

const getBlogImage = (slug: string) => BLOG_IMAGES[slug as keyof typeof BLOG_IMAGES] ?? img4

export default function BlogListPage() {
  const { lang, t } = useLang()
  const [activeCategory, setActiveCategory] = useState('Все / All')

  const filtered = activeCategory === 'Все / All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(p => p.category === activeCategory)
  const featured = filtered[0]
  const restPosts = filtered.slice(1)

  const getTitle   = (p: typeof BLOG_POSTS[0]) => lang === 'ru' ? p.titleRu   : lang === 'uz' ? p.titleUz   : p.titleEn
  const getExcerpt = (p: typeof BLOG_POSTS[0]) => lang === 'ru' ? p.excerptRu : lang === 'uz' ? p.excerptUz : p.excerptEn

  const formatDate = (d: string) => {
    const date = new Date(d)
    if (lang === 'en') return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    if (lang === 'uz') return date.toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' })
    return date.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <div className="min-h-screen bg-[#e8efee]">
      <Navbar />
      <div className="relative overflow-hidden pt-24 sm:pt-28 pb-12 sm:pb-14 px-4 sm:px-6">
        <div className="absolute -top-32 -right-20 h-72 w-72 rounded-full bg-[#53b2ad]/25 blur-3xl" />
        <div className="absolute -bottom-24 -left-12 h-64 w-64 rounded-full bg-[#6fc7c2]/20 blur-3xl" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="rounded-[2rem] border border-[#1f8b85]/15 bg-white/85 backdrop-blur-md p-5 sm:p-8">
            <Link href="/" className="text-[#1f8b85]/70 text-sm hover:text-[#1f8b85] transition-colors mb-5 inline-block">
              ← {t('common.backHome')}
            </Link>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1f8b85] tracking-tight">
              {t('blog.title')}
            </h1>
            <p className="text-[#1f8b85]/75 mt-3 text-sm sm:text-base max-w-2xl leading-relaxed">
              {t('blog.subtitle')}
            </p>
            <div className="mt-8 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                    className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                    activeCategory === cat
                      ? 'bg-[#1f8b85] text-white border-[#1f8b85]'
                      : 'bg-[#1f8b85]/8 border-[#1f8b85]/20 text-[#1f8b85]/80 hover:bg-[#1f8b85]/14'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-14 sm:pb-16">
        {featured ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-6 sm:mb-8"
          >
            <Link href={`/blog/${featured.slug}`} className="group block">
              <article className="rounded-[2rem] overflow-hidden border border-white/20 bg-white/95 shadow-[0_16px_45px_rgba(0,0,0,0.14)]">
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
                  <div
                    className="min-h-[240px] sm:min-h-[300px] p-6 sm:p-8 lg:p-10 relative overflow-hidden"
                  >
                    <Image
                      src={getBlogImage(featured.slug)}
                      alt={getTitle(featured)}
                      fill
                      className="object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(145deg, rgba(8,22,14,0.38), rgba(8,22,14,0.58))' }}
                    />
                    <div className="relative z-10 max-w-xl">
                      <span
                        className="inline-block px-3 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-widest mb-4"
                        style={{ background: `${featured.accentColor}30`, color: featured.accentColor }}
                      >
                        {featured.category}
                      </span>
                      <h2 className="font-extrabold text-2xl sm:text-3xl lg:text-[2.2rem] leading-tight" style={{ color: featured.accentColor }}>
                        {getTitle(featured)}
                      </h2>
                    </div>
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col justify-between">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs text-[#1f8b85]/50">{formatDate(featured.date)}</span>
                      <span className="w-1 h-1 rounded-full bg-[#1f8b85]/25" />
                      <span className="text-xs text-[#1f8b85]/50">{featured.readTime} {t('blog.minRead')}</span>
                    </div>
                    <p className="text-[#1f8b85]/70 text-sm sm:text-base leading-relaxed line-clamp-4">
                      {getExcerpt(featured)}
                    </p>
                    <div className="mt-6 flex items-center gap-1 text-[#1f8b85] text-sm font-bold group-hover:gap-2 transition-all">
                      {t('blog.readMore')}
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div></article>
            </Link>
          </motion.div>
        ) : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {restPosts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link href={`/blog/${post.slug}`} className="block group h-full">
                <article className="h-full bg-white rounded-3xl overflow-hidden border border-white/30 shadow-[0_8px_24px_rgba(8,20,12,0.12)] hover:shadow-[0_16px_32px_rgba(8,20,12,0.16)] transition-all duration-300 hover:-translate-y-1">
                  <div
                    className="h-40 sm:h-44 relative overflow-hidden p-5 flex items-end"
                  >
                    <Image
                      src={getBlogImage(post.slug)}
                      alt={getTitle(post)}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(160deg, rgba(8,22,14,0.22), rgba(8,22,14,0.6))' }}
                    />
                    <span
                      className="relative z-10 inline-block px-2.5 py-1 rounded-full text-[0.62rem] font-bold uppercase tracking-widest"
                      style={{ background: `${post.accentColor}2e`, color: post.accentColor }}
                    >
                      {post.category}
                    </span>
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="font-extrabold text-[1.05rem] sm:text-[1.15rem] text-[#1f8b85] leading-snug line-clamp-2">
                      {getTitle(post)}
                    </h3>
                    <div className="flex items-center gap-2.5 mt-3 mb-3">
                      <span className="text-xs text-[#1f8b85]/50">{formatDate(post.date)}</span>
                      <span className="w-1 h-1 rounded-full bg-[#1f8b85]/25" />
                      <span className="text-xs text-[#1f8b85]/50">{post.readTime} {t('blog.minRead')}</span>
                    </div>
                    <p className="text-[#1f8b85]/65 text-sm leading-relaxed line-clamp-3">
                      {getExcerpt(post)}
                    </p>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
