'use client'
import { PagePropertiesData } from '@/types/workDetail'
import React from 'react'
import styles from '@/styles/WorkDetail.module.css'
import { getPeriodOfWork } from '@/lib/utils/handleString'

interface MainContentProps {
  properties: PagePropertiesData
}

export default function MainContent({ properties }: MainContentProps) {
  const { Period, Name, 'Design Type': DesignType, Member } = properties

  const startDate = Period?.date?.start || ''
  const endDate = Period?.date?.end || ''
  const title = Name?.title?.at(0)?.plain_text || 'untitled'
  const designType = DesignType?.select?.name || ''
  const member = Member?.rich_text?.map((obj) => obj.plain_text).join(' ')

  return (
    <div className={styles['title-content']}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles['project-info']}>
        <span>{member}</span>
        <span className={styles.divider}> | </span>
        <span>{designType}</span>
        <span className={styles.divider}> | </span>
        <span>{getPeriodOfWork(startDate, endDate)}</span>
      </div>
    </div>
  )
}
