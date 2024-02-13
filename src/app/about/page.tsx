import dynamic from 'next/dynamic'
import React from 'react'

const About = dynamic(async () => await import('@/components/about/About'), {
  ssr: false,
})

export default function AboutPage() {
  return (
    <div className="page-wrapper">
      <About />
    </div>
  )
}
