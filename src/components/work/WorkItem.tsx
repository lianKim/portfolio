import React from 'react'
import styles from '@/styles/Work.module.css'
import Image, { StaticImageData } from 'next/image'

interface WorkItemProps {
  order: string
  imgSrc: StaticImageData
  duration: string
  title: string
  description: string
  skillList: string[]
}

export default function WorkItem({
  order,
  imgSrc,
  duration,
  title,
  description,
  skillList,
}: WorkItemProps) {
  return (
    <li className={styles['work-item']}>
      <div className={styles.order}>{`(${order})`}</div>
      <div className={styles.content}>
        <div className={styles.duration}>{duration}</div>
        <div className={`${styles['title']} font-sans`}>{title}</div>
        <div className={`${styles.description} font-kor`}>{description}</div>
        <div className={`${styles['skill-stack']} font-sans`}>
          {skillList.join(' / ')}
        </div>
        <div className={styles['preview-image']}>
          <Image src={imgSrc} alt={`${title} preview`} />
        </div>
      </div>
    </li>
  )
}
