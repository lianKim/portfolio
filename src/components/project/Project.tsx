import { getProjectList } from '@/lib/api/projectApi'
import ProjectList from './ProjectList'
import { ProjectItemData } from '@/types/projects'

export default async function Project() {
  const projectList = await getProjectList()

  return (
    <>
      {!!(projectList as ProjectItemData[])?.length && (
        <ProjectList dataList={projectList as ProjectItemData[]} />
      )}
    </>
  )
}
