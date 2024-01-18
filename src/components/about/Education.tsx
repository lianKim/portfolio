'use client'
import React, { useMemo } from 'react'
import styles from '@/styles/About.module.css'
import { EducationItemData } from '@/types/education'
import { getPeriodOfWork } from '@/app/work/utils'

interface EducationProps {
  data: EducationItemData[]
}

export default function Education({ data }: EducationProps) {
  const educationList = useMemo(
    () =>
      data.map((item: EducationItemData) => {
        const title = item.properties?.Name.title?.at(0)?.plain_text
        const startDate = item.properties?.Period.date?.start || ''
        const endDate = item.properties?.Period.date?.end
        const period = getPeriodOfWork(startDate, endDate)

        return { title, period }
      }),
    [data],
  )

  return (
    <div className={styles['grid-container']}>
      <h3 className="sub-title">Education</h3>
      <ol className={`${styles.content} ${styles.education}`}>
        {educationList.map((education) => (
          <li className={styles['education-item']} key={education.period}>
            <span className={`${styles['education-title']} font-kor`}>
              {education.title}
            </span>
            <span className={styles['education-duration']}>
              {education.period}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
