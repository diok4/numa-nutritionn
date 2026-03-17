'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLang } from '@/shared/lib/i18n'
import { BLOG_POSTS } from '@/shared/config/blog-posts'

const CARD_IMAGES: Record<string, string> = {
  'gut-brain-axis': '/products/big.png',
  'vitamin-d-deficiency': '/products/product-1.png',
}

export default function BlogTeaser() {
  const { lang, t } = useLang()
  const posts = BLOG_POSTS.slice(0, 2)

  const getTitle = (slug: string) => {
    const post = posts.find(item => item.slug === slug)
    if (!post) return ''
    if (lang === 'ru') return post.titleRu
    if (lang === 'uz') return post.titleUz
    return post.titleEn
  }

  const getExcerpt = (slug: string) => {
    const post = posts.find(item => item.slug === slug)
    if (!post) return ''
    if (lang === 'ru') return post.excerptRu
    if (lang === 'uz') return post.excerptUz
    return post.excerptEn
  }

  return (
    <section className="py-12 sm:py-14 lg:py-16 bg-[#f5f2ec]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between gap-3 mb-5 sm:mb-6">
          <h2 className="text-[1.8rem] sm:text-[2.2rem] font-extrabold text-[#1c3a13]">
            {lang === 'ru' ? 'Из блога' : lang === 'uz' ? 'Blogdan' : 'From the Blog'}
          </h2>
          <Link href="/blog" className="text-sm font-semibold text-[#1c3a13] border-b border-[#1c3a13]/40 hover:border-[#1c3a13]">
            {t('blog.readMore')} →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {posts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <article className="bg-white rounded-3xl border border-[#1c3a13]/12 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-52 sm:h-56 bg-[#e9e6df]">
                  <Image
                    src={CARD_IMAGES[post.slug] ?? '/products/product-2.png'}
                    alt={getTitle(post.slug)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[0.7rem] uppercase tracking-[0.11em] font-semibold text-[#1c3a13]/55">{post.category}</p>
                  <h3 className="mt-2 text-[1.2rem] font-bold text-[#1c3a13] leading-tight line-clamp-2">
                    {getTitle(post.slug)}
                  </h3>
                  <p className="mt-2 text-sm text-[#1c3a13]/65 line-clamp-2">
                    {getExcerpt(post.slug)}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
