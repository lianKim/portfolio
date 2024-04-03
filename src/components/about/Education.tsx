'use client'
import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'
import SectionContainer from '../@common/SectionContainer'
import { EducationItemData } from '@/types/about'
import {
  getDateData,
  getTextData,
  getTitleData,
} from '@/lib/utils/handleNotionData'

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
      data
        .map((item: EducationItemData) => {
          const { Name, Period, Note } = item.properties
          const title = getTitleData(Name)
          const note = getTextData(Note)
          const [startDate, endDate] = getDateData(Period)

          return {
            x: title ? title + '|' + note : '',
            y:
              startDate && endDate
                ? [new Date(startDate).getTime(), new Date(endDate).getTime()]
                : [],
          }
        })
        .filter((item) => !!item?.x && !!item.y.length),
    [data],
  )

  return (
    <SectionContainer title="Education">
      {educationList.length > 0 && (
        <EducationTimeline dataList={educationList} />
      )}
    </SectionContainer>
  )
}
