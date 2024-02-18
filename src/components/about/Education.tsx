'use client'
import React, { useMemo } from 'react'
import { EducationItemData } from '@/types/education'
import EducationTimeline from './EducationTimeline'
import SectionTitle from '../@common/SectionTitle'

interface EducationProps {
  data: EducationItemData[]
}

export default function Education({ data }: EducationProps) {
  const educationList = useMemo(
    () =>
      data.map((item: EducationItemData) => {
        const title = item.properties?.Name.title?.at(0)?.plain_text || ''
        const startDate = item.properties?.Period.date?.start || ''
        const endDate = item.properties?.Period.date?.end || ''

        return {
          x: title,
          y: [new Date(startDate).getTime(), new Date(endDate).getTime()],
        }
      }),
    [data],
  )

  return (
    <section className="section">
      <SectionTitle title="Education" />
      <EducationTimeline dataList={educationList} />
    </section>
  )
}
