'use client'
import React from 'react'
import styles from '@/styles/WorkDetail.module.css'
import { PagePropertiesData } from '@/types/workDetail'
import { getPeriodOfWork } from '@/lib/utils/handleString'

interface ModalHeaderProps {
  properties: PagePropertiesData
}

export default function ModalHeader({ properties }: ModalHeaderProps) {
  const { Name, Period, Website, GitHub, Notion } = properties

  const title = Name?.title?.at(0)?.plain_text || 'untitled'
  const startDate = Period?.date?.start || ''
  const endDate = Period?.date?.end || ''

  return (
    <header className={styles.header}>
      <div>
        <span>{title}</span>
        <span className={styles['header-period']}>
          {getPeriodOfWork(startDate, endDate)}
        </span>
      </div>
      <ul className={styles['header-links']}>
        {Website?.url && (
          <li>
            <a href={Website.url} target="_blank" rel="noopener noreferrer">
              Website
            </a>
          </li>
        )}
        {GitHub?.url && (
          <li>
            <a href={GitHub.url} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
        )}
        {Notion?.url && (
          <li>
            <a href={Notion.url} target="_blank" rel="noopener noreferrer">
              Notion
            </a>
          </li>
        )}
      </ul>
    </header>
  )
}
