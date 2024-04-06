'use client'
import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'
import SectionContainer from '../@common/SectionContainer'
import { TimelineItemData } from '@/types/about'
import {
  getDateData,
  getTextData,
  getTitleData,
} from '@/lib/utils/handleNotionData'

const TimelineChart = dynamic(
  async () => await import('@/components/about/TimelineChart'),
  {
    ssr: false,
  },
)

interface TimelineProps {
  data: TimelineItemData[]
}

export default function Timeline({ data }: TimelineProps) {
  const timelineList = useMemo(
    () =>
      data
        .map((item: TimelineItemData) => {
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
    <SectionContainer title="Timeline">
      {timelineList.length > 0 && <TimelineChart dataList={timelineList} />}
    </SectionContainer>
  )
}
