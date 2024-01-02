'use client'
import React from 'react'
import styles from '@/styles/Work.module.css'
import Image from 'next/image'
import ThumbnailDefault from '@images/work/thumbnail_default.png'
import { getPeriodOfWork, makeNumberToTwoLetter } from '@/app/work/utils'
import { WorkItemData } from '@/types/workList'

interface WorkItemProps {
  data: WorkItemData
}

export default React.memo(function WorkItem({ data }: WorkItemProps) {
  const { Order, Period, Name, Description, Stack, Thumbnail } = data
  const startDate = Period?.date?.start || ''
  const endDate = Period?.date?.end || ''
  const order = Order?.number || 'unknown'
  const title = Name?.title?.at(0)?.plain_text || 'untitled'
  const description = Description?.rich_text?.at(0)?.plain_text || 'no content'
  const skillList = Stack?.multi_select?.map((tag) => tag.name || '') || []
  const thumbnail = Thumbnail?.files?.at(0)?.file?.url || ThumbnailDefault

  return (
    <li className={styles['work-item']}>
      {/* 작업 순서 (역순) */}
      <div className={styles.order}>{`(${makeNumberToTwoLetter(order)})`}</div>
      <div className={styles.content}>
        {/* 작업 기간 */}
        <div className={styles.period}>
          {getPeriodOfWork(startDate, endDate)}
        </div>
        {/* 이름 */}
        <div className={`${styles['title']} font-sans`}>{title}</div>
        {/* 설명 */}
        <div className={`${styles.description} font-kor`}>{description}</div>
        {/* 기술 스택 */}
        <div className={`${styles['skill-stack']} font-sans`}>
          {skillList.join(' / ') || 'unknown'}
        </div>
        {/* 썸네일 */}
        <div className={styles['preview-image']}>
          <Image
            src={thumbnail}
            alt={`${title} thumbnail image`}
            width={400}
            height={220}
            priority
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      </div>
    </li>
  )
})
