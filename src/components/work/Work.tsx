import { getWorkList } from '@/lib/api/workApi'
import WorkItem from '@/components/work/WorkItem'
import styles from '@/styles/Work.module.css'
import Link from 'next/link'
import SectionTitle from '../@common/SectionTitle'
import WorkList from './WorkList'
import { WorkItemData } from '@/types/workList'

export default async function Work() {
  const workList = await getWorkList()

  // return (
  //   <>
  //     {!!workList?.length && (
  //       <section className="section">
  //         <SectionTitle title="Works" />
  //         <ol className={`${styles.works} container`}>
  //           {workList.map((work) => {
  //             if (!('properties' in work)) {
  //               throw new Error('No Properties Error')
  //             }

  //             const { properties } = work as any

  //             return (
  //               <Link
  //                 href={`/work/${properties.Order.number}`}
  //                 key={properties.Order.number}
  //               >
  //                 <WorkItem data={properties} />
  //               </Link>
  //             )
  //           })}
  //         </ol>
  //       </section>
  //     )}
  //   </>
  // )

  return (
    <>
      {!!workList?.length && <WorkList dataList={workList as WorkItemData[]} />}
    </>
  )
}
