import React from 'react'
import styles from '@/styles/Work.module.css'
import { WorkItemData } from '@/types/workList'
import {
  getPeriodOfWork,
  makeNumberToTwoLetter,
} from '@/lib/utils/handleString'

interface WorkItemProps {
  data: WorkItemData
}

export default React.memo(function WorkItem({ data }: WorkItemProps) {
  const { Order, Period, Name, Description, Stack } = data
  const startDate = Period?.date?.start || ''
  const endDate = Period?.date?.end || ''
  const order = Order?.number || 'unknown'
  const title = Name?.title?.at(0)?.plain_text || 'untitled'
  const description = Description?.rich_text?.at(0)?.plain_text || 'no content'
  const skillList = Stack?.multi_select?.map((tag) => tag.name || '') || []

  return (
    <li className={styles['work-item']}>
      {/* 작업 순서 (역순) */}
      <div className={styles.order}>{makeNumberToTwoLetter(order)}</div>
      {/* 프로젝트 정보 */}
      <div className={styles.content}>
        {/* 이름 */}
        <div className={`${styles['title']}`}>{title}</div>
        {/* 작업 기간 */}
        <div className={styles.period}>
          {getPeriodOfWork(startDate, endDate)}
        </div>
        {/* 설명 */}
        <div className="font-kor">{description}</div>
        {/* 기술 스택 */}
        <div className={styles['skills']}>{skillList.join('  |  ')}</div>
      </div>
    </li>
  )
})
