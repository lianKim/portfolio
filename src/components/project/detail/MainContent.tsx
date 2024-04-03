'use client'
import { ProjectItemPropData } from '@/types/projects'
import React from 'react'
import styles from '@/styles/ProjectDetail.module.css'
import {
  getPeriodData,
  getSelectData,
  getTextData,
  getTitleData,
} from '@/lib/utils/handleNotionData'

interface MainContentProps {
  properties: ProjectItemPropData
}

export default function MainContent({ properties }: MainContentProps) {
  const { Period, Name, 'Design Type': DesignType, Member } = properties
  const period = getPeriodData(Period)
  const title = getTitleData(Name)
  const designType = getSelectData(DesignType)
  const member = getTextData(Member)

  return (
    <div className={styles['title-content']}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles['project-info']}>
        <span>{member}</span>
        <span className={styles.divider}> | </span>
        <span>{designType}</span>
        <span className={styles.divider}> | </span>
        <span className={styles.period}>{period}</span>
      </div>
    </div>
  )
}
