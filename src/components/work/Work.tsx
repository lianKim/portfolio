import { getWorkList } from '@/lib/api/workApi'
import WorkItem from '@/components/work/WorkItem'
import styles from '@/styles/Work.module.css'
import Link from 'next/link'

export default async function Work() {
  const workList = await getWorkList()

  return (
    <section className="section">
      <h3 className="sub-title">Work</h3>
      <ol className={`${styles.works} container`}>
        {workList.map((work) => {
          if (!('properties' in work)) {
            throw new Error('No Properties Error')
          }

          const { properties } = work as any

          return (
            <Link
              href={`/work/${properties.Order.number}`}
              // as={`/work/${properties.Order.number}`}
              // prefetch={true}
              key={properties.Order.number}
            >
              <WorkItem data={properties} />
            </Link>
          )
        })}
      </ol>
    </section>
  )
}
