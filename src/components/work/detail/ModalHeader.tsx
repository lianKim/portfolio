'use client'
import React, { useMemo } from 'react'
import styles from '@/styles/WorkDetail.module.css'
import { WorkItemPropData } from '@/types/works'
import {
  getPeriodData,
  getTitleData,
  getUrlData,
} from '@/lib/utils/handleNotionData'

interface ModalHeaderProps {
  properties: WorkItemPropData
}

export default function ModalHeader({ properties }: ModalHeaderProps) {
  const { Name, Period, Website, GitHub, Notion, Figma } = properties
  const title = getTitleData(Name)
  const period = getPeriodData(Period)
  const linkList = useMemo(
    () =>
      [
        {
          name: 'Website',
          url: getUrlData(Website),
        },
        {
          name: 'GitHub',
          url: getUrlData(GitHub),
        },
        {
          name: 'Notion',
          url: getUrlData(Notion),
        },
        {
          name: 'Figma',
          url: getUrlData(Figma),
        },
      ].filter((link) => !!link.url),
    [Website, GitHub, Notion, Figma],
  )

  return (
    <header className={styles.header}>
      <div className={styles['header-project-info']}>
        <span>{title}</span>
        <span className={styles['header-period']}>{period}</span>
      </div>
      <ul className={styles['header-links']}>
        {linkList.map((link) => (
          <li key={link.name}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </header>
  )
}
