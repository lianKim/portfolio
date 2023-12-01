import Contact from '@/components/about/Contact'
import Education from '@/components/about/Education'
import Skill from '@/components/about/Skill'
import React from 'react'

export default function About() {
  return (
    <section className="section">
      <div className="container">
        <Contact />
        <Skill />
        <Education />
      </div>
    </section>
  )
}
