import dynamic from 'next/dynamic'

const About = dynamic(async () => await import('@/components/about/About'), {
  ssr: false,
})

const Work = dynamic(async () => await import('@/components/work/Work'), {
  ssr: false,
})

const BusinessCardAnimation = dynamic(
  async () => await import('@/components/landing/BusinessCardAnimation'),
  { ssr: false },
)

export default function Home() {
  return (
    <>
      <BusinessCardAnimation />
      <About />
      <Work />
    </>
  )
}
