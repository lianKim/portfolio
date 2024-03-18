'use client'
import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'
import SectionContainer from '../@common/SectionContainer'
import { EducationItemData } from '@/types/about'

const EducationTimeline = dynamic(
  async () => await import('@/components/about/EducationTimeline'),
  {
    ssr: false,
  },
)

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
    <SectionContainer title="Education">
      <EducationTimeline dataList={educationList} />
    </SectionContainer>
  )
}
