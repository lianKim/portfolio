import WorkItem from '@/components/work/WorkItem'
import React from 'react'
import styles from '@/styles/Work.module.css'
import { WORK_LIST } from '@/data/workList'

export default function Work() {
  return (
    <section className="section">
      <ol className={`${styles.works} container`}>
        {WORK_LIST.map((data) => {
          const { order, imgSrc, duration, title, description, skillList } =
            data
          return (
            <WorkItem
              key={order}
              order={order}
              imgSrc={imgSrc}
              duration={duration}
              title={title}
              description={description}
              skillList={skillList}
            />
          )
        })}
      </ol>
    </section>
  )
}
