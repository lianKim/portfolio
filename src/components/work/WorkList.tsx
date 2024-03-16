import React from 'react'
import SectionContainer from '../@common/SectionContainer'
import styles from '@/styles/Work.module.css'
import Link from 'next/link'
import { WorkItemData } from '@/types/workList'
import { makeNumberToTwoLetter } from '@/lib/utils/handleString'
import Image from 'next/image'
import { BLUR_DATA_URL_BASE64 } from '@/lib/utils/handleImage'

interface WorkListProps {
  dataList: WorkItemData[]
}

interface WorkItemProps {
  data: WorkItemData
}

export default function WorkList({ dataList }: WorkListProps) {
  return (
    <SectionContainer title="Works">
      <ol className={`${styles.works} container`}>
        {dataList.map((work) => {
          if (!('properties' in work)) {
            throw new Error('No Properties Error')
          }

          const { properties } = work as any

          return (
            <Link
              href={`/work/${properties.Order.number}`}
              prefetch
              key={properties.Order.number}
            >
              <WorkItem data={properties} />
            </Link>
          )
        })}
      </ol>
    </SectionContainer>
  )
}

function WorkItem({ data }: WorkItemProps) {
  const { Order, Period, Name, Description, Stack, Thumbnail } = data
  const startDate = Period?.date?.start || ''
  const endDate = Period?.date?.end || ''
  const order = Order?.number || 'unknown'
  const title = Name?.title?.at(0)?.plain_text || 'untitled'
  const description = Description?.rich_text?.at(0)?.plain_text || 'no content'
  const skillList = Stack?.multi_select?.map((tag) => tag.name || '') || []
  const thumbnail = Thumbnail?.files?.at(0)?.file?.url || ''

  return (
    <li className={styles['work-item']}>
      {/* 작업 순서 (역순) */}
      <div className={styles.order}>{makeNumberToTwoLetter(order)}</div>
      {/* 썸네일 */}
      <div className={styles['thumb-container']}>
        <Image
          src={thumbnail}
          alt={`${title} thumbnail`}
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL_BASE64}
          width="640"
          height="480"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
      {/* 프로젝트 정보 */}
      <div className={styles.content}>
        {/* 기술 스택 */}
        <div className={styles['tech-stack']}>{skillList.join('  |  ')}</div>
        {/* 이름 */}
        <div className={`${styles['title']}`}>{title}</div>
        {/* 설명 */}
        <div className={`${styles.desc} font-kor`}>{description}</div>
      </div>
    </li>
  )
}
