import { getProjectList } from '@/lib/api/projectApi'
import ProjectList from './ProjectList'
import { ProjectItemPropData } from '@/types/projects'

export default async function Project() {
  const projectList = await getProjectList()

  return (
    <>
      {!!projectList?.length && (
        <ProjectList dataList={projectList as ProjectItemPropData[]} />
      )}
    </>
  )
}
