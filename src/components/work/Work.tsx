import { getWorkList } from '@/lib/api/workApi'
import WorkList from './WorkList'
import { WorkItemPropData } from '@/types/works'

export default async function Work() {
  const workList = await getWorkList()

  return (
    <>
      {!!workList?.length && (
        <WorkList dataList={workList as WorkItemPropData[]} />
      )}
    </>
  )
}
