import { getWorkList } from '@/lib/api/workApi'
import WorkItem from '@/components/work/WorkItem'
import styles from '@/styles/Work.module.css'

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

          const { properties, id } = work as any

          return (
            <WorkItem
              data={properties}
              pageId={id}
              key={properties.Order.number}
            />
          )
        })}
      </ol>
    </section>
  )
}
