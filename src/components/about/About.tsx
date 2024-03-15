import Skills from '@/components/about/Skills'
import Education from '@/components/about/Education'
import React from 'react'
import { EducationItemData } from '@/types/education'
import { SkillItemData } from '@/types/skills'
import { getEducationList, getSkillLists } from '@/lib/api/aboutApi'

export default async function About() {
  const educationList = await getEducationList()
  const skillsList = await getSkillLists()

  return (
    <>
      {!!skillsList?.length && (
        <Skills dataList={skillsList as SkillItemData[][]} />
      )}
      {!!educationList?.length && (
        <Education data={educationList as EducationItemData[]} />
      )}
    </>
  )
}
