import Contact from '@/components/about/Contact'
import Education from '@/components/about/Education'
import Skill from '@/components/about/Skill'
import React from 'react'
import { getContactList } from './api'
import { ContactItemData } from '@/types/contact'

export default async function About() {
  const contactList = await getContactList()

  return (
    <section className="section">
      <div className="container">
        <Contact data={contactList as ContactItemData[]} />
        <Skill />
        <Education />
      </div>
    </section>
  )
}
