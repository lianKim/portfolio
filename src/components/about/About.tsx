import Education from '@/components/about/Education'
import Skill from '@/components/about/Skill'
import React from 'react'
import { EducationItemData } from '@/types/education'
import { SkillItemData } from '@/types/skill'
import { getEducationList, getSkillList } from '@/lib/api/aboutApi'

export default async function About() {
  const educationList = await getEducationList()
  const skillList = await getSkillList()

  return (
    <>
      <Skill data={skillList as SkillItemData[]} />
      <Education data={educationList as EducationItemData[]} />
    </>
  )
}
