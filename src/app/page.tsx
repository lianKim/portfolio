import dynamic from 'next/dynamic'
import Loading from './loading'

const About = dynamic(async () => await import('@/components/about/About'))
const Project = dynamic(
  async () => await import('@/components/project/Project'),
)
const BusinessCardAnimation = dynamic(
  async () => await import('@/components/landing/BusinessCardAnimation'),
  {
    ssr: false,
    loading: () => <Loading />,
  },
)

export default function Home() {
  return (
    <>
      <BusinessCardAnimation />
      <About />
      <Project />
    </>
  )
}
