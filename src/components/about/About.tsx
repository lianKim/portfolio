import Skill from '@/components/about/Skill'
import Education from '@/components/about/Education'
import React from 'react'
import { EducationItemData } from '@/types/education'
import { SkillItemData } from '@/types/skill'
import { getEducationList, getSkillList } from '@/lib/api/aboutApi'

export default async function About() {
  const educationList = await getEducationList()
  const skillList = await getSkillList()

  return (
    <>
      {!!skillList?.length && <Skill data={skillList as SkillItemData[]} />}
      {!!educationList?.length && (
        <Education data={educationList as EducationItemData[]} />
      )}
    </>
  )
}
