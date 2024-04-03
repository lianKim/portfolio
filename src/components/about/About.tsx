import Skills from '@/components/about/Skills'
import Education from '@/components/about/Education'
import React from 'react'
import { EducationItemData, SkillItemData } from '@/types/about'
import { getEducationList, getSkillLists } from '@/lib/api/aboutApi'

export default async function About() {
  const educationList = await getEducationList()
  const skillsList = await getSkillLists()

  return (
    <>
      {!!skillsList?.length && (
        <Skills dataList={skillsList as SkillItemData[][]} />
      )}
      {!!(educationList as EducationItemData[])?.length && (
        <Education data={educationList as EducationItemData[]} />
      )}
    </>
  )
}
