'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLang } from '@/shared/lib/i18n'
import { BLOG_POSTS } from '@/shared/config/blog-posts'
import img4 from '../../../../assets/img4.png'

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
    <section className="py-10 sm:py-12 lg:py-14 bg-[#f5f2ec]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between gap-3 mb-5 sm:mb-6">
          <h2 className="text-[1.5rem] sm:text-[1.9rem] font-extrabold text-[#1f8b85]">
            {lang === 'ru' ? 'Из блога' : lang === 'uz' ? 'Blogdan' : 'From the Blog'}
          </h2>
          <Link href="/blog" className="text-sm font-semibold text-[#1f8b85] border-b border-[#1f8b85]/40 hover:border-[#1f8b85]">
            {t('blog.readMore')} →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {posts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <article className="relative rounded-[2.2rem] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="relative aspect-square bg-[#c3ebe8]">
                  <Image
                    src={img4}
                    alt={getTitle(post.slug)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#58b7b2]/52 group-hover:bg-[#58b7b2]/47 transition-colors duration-300" />
                </div>

                <div className="absolute inset-0 p-5 sm:p-8 flex flex-col items-center justify-center text-center">
                  <h3 className="text-white text-[1.5rem] sm:text-[1.95rem] font-light leading-[1.08]">
                    {getTitle(post.slug)}
                  </h3>
                  <p className="mt-2.5 text-white/90 text-[0.9rem] sm:text-[1.03rem] leading-[1.3] max-w-[24rem] line-clamp-2">
                    {getExcerpt(post.slug)}
                  </p>

                  <span className="mt-4 inline-flex items-center rounded-full bg-white px-5 py-2 text-[1rem] sm:text-[1.08rem] leading-none font-medium text-[#1f8b85]">
                    {lang === 'ru' ? 'Подробнее' : lang === 'uz' ? 'Batafsil' : 'Read More'}
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
