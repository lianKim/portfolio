import Contact from '@/components/about/Contact'
import Education from '@/components/about/Education'
import Skill from '@/components/about/Skill'
import React from 'react'
import { getContactList, getEducationList } from './api'
import { ContactItemData } from '@/types/contact'
import { EducationItemData } from '@/types/education'

export default async function About() {
  const contactList = await getContactList()
  const educationList = await getEducationList()

  return (
    <section className="section">
      <div className="container">
        <Contact data={contactList as ContactItemData[]} />
        <Skill />
        <Education data={educationList as EducationItemData[]} />
      </div>
    </section>
  )
}
