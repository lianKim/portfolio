'use client'
import { PagePropertiesData } from '@/types/workDetail'
import React from 'react'
import styles from '@/styles/WorkDetail.module.css'
import { getPeriodOfWork } from '@/lib/utils/handleString'

interface MainContentProps {
  properties: PagePropertiesData
}

export default function MainContent({ properties }: MainContentProps) {
  const { Order, Period, Name, Stack } = properties

  const order = Order?.number || 'unknown'
  const startDate = Period?.date?.start || ''
  const endDate = Period?.date?.end || ''
  const title = Name?.title?.at(0)?.plain_text || 'untitled'
  const stack = Stack?.multi_select?.map((tag) => tag.name || '') || []

  return (
    <div className={styles['main-content-container']}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.period}>{getPeriodOfWork(startDate, endDate)}</div>
      {!!stack?.length && (
        <ul className={styles.stack}>
          {stack.map((item) => (
            <li className={`font-sans ${styles['stack-item']}`} key={item}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
