import { Navbar } from '@/widgets/navbar'
import { Contacts } from '@/widgets/contacts'
import { Footer } from '@/widgets/footer'

export default function ContactsPage() {
  return (
    <main className="min-h-screen bg-beige overflow-x-hidden">
      <Navbar />
      <div className="pt-16 sm:pt-20">
        <Contacts />
      </div>
      <Footer />
    </main>
  )
}
