import { Navbar }    from '@/widgets/navbar'
import { Hero }      from '@/widgets/hero'
import { Products }  from '@/widgets/products'
import { Stories }   from '@/widgets/stories'
import { Science }   from '@/widgets/science'
import { More }      from '@/widgets/more'
import { Transformations } from '@/widgets/transformations'
import { BlogTeaser } from '@/widgets/blog-teaser'
import { Footer }    from '@/widgets/footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-beige overflow-x-hidden">
      <Navbar />
      <Hero />
      <Products />
      <Science />
      <Stories />
      <More />
      <Transformations />
      <BlogTeaser />
      <Footer />
    </main>
  )
}
