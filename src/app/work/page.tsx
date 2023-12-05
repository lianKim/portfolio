import WorkItem from '@/components/work/WorkItem'
import React from 'react'
import styles from '@/styles/Work.module.css'
import { getWorkList } from './api'

export default async function Work() {
  const workList = await getWorkList()

  return (
    <section className="section">
      <ol className={`${styles.works} container`}>
        {workList.map((work) => {
          if (!('properties' in work)) {
            throw new Error('No Properties Error')
          }

          const { properties, id } = work as any

          return (
            <WorkItem
              key={properties.Order.number}
              data={properties}
              pageId={id}
            />
          )
        })}
      </ol>
    </section>
  )
}
