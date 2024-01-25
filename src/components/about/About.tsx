import Contact from '@/components/about/Contact'
import Education from '@/components/about/Education'
import Skill from '@/components/about/Skill'
import React from 'react'

import { ContactItemData } from '@/types/contact'
import { EducationItemData } from '@/types/education'
import { SkillItemData } from '@/types/skill'
import {
  getContactList,
  getEducationList,
  getSkillList,
} from '@/lib/api/aboutApi'

export default async function About() {
  const contactList = await getContactList()
  const educationList = await getEducationList()
  const skillList = await getSkillList()

  return (
    <section className="section">
      <div className="container">
        <Skill data={skillList as SkillItemData[]} />
        <Education data={educationList as EducationItemData[]} />
      </div>
    </section>
  )
}
