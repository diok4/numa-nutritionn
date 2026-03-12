import { Navbar }    from '@/widgets/navbar'
import { Hero }      from '@/widgets/hero'
import { Products }  from '@/widgets/products'
import { Science }   from '@/widgets/science'
import { Education } from '@/widgets/education'
import { Bundle }    from '@/widgets/bundle'
import { Footer }    from '@/widgets/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-beige">
      <Navbar />
      <Hero />
      <Products />
      <Science />
      <Education />
      <Bundle />
      <Footer />
    </main>
  )
}
