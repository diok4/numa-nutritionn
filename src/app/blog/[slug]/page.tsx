import { BlogArticlePage } from '@/pages/blog-article'

export default async function BlogArticleRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <BlogArticlePage slug={slug} />
}
