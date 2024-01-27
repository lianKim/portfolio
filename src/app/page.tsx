import About from '@/components/about/About'
import BusinessCardAnimation from '@/components/landing/BusinessCardAnimation'
import Work from '@/components/work/Work'

export default function Home() {
  return (
    <main className="main">
      <BusinessCardAnimation />
      <About />
      <Work />
    </main>
  )
}
