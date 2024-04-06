import Skills from '@/components/about/Skills'
import Timeline from '@/components/about/Timeline'
import React from 'react'
import { TimelineItemData, SkillItemData } from '@/types/about'
import { getTimelineList, getSkillLists } from '@/lib/api/aboutApi'

export default async function About() {
  const timelineList = await getTimelineList()
  const skillsList = await getSkillLists()

  return (
    <>
      <Skills dataList={skillsList as SkillItemData[][]} />
      <Timeline data={timelineList as TimelineItemData[]} />
    </>
  )
}
