import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants/site'
import { ProjectList } from '@/components/projects/ProjectList'
import { getAllProjects } from '@/lib/server/projects'
import { toAbsoluteUrl } from '@/lib/utils/format'

export const metadata: Metadata = {
  title: 'Projects',
  description: `프론트엔드 개발자 ${SITE_CONFIG.author.name}의 프로젝트 기록. 각 프로젝트에서 무엇을 검토하고 어떻게 설계했는지, 무엇을 신경 썼는지 정리했습니다.`,
  alternates: {
    canonical: toAbsoluteUrl('/projects'),
  },
  openGraph: {
    title: `Projects | ${SITE_CONFIG.author.name}`,
    description: `프론트엔드 개발자 ${SITE_CONFIG.author.name}의 프로젝트 기록. 각 프로젝트에서 무엇을 검토하고 어떻게 설계했는지, 무엇을 신경 썼는지 정리했습니다.`,
    url: '/projects',
  },
}

export default function ProjectsPage() {
  // 서버에서 프로젝트 기록 데이터 가져오기
  const projects = getAllProjects()

  return (
    <div className="relative w-full pt-20 pb-12">
      <div className="section-grid">
        <h2 className="section-left section-label">/ Projects</h2>
        <div className="section-right section-content">
          <ProjectList projects={projects} />
        </div>
      </div>
    </div>
  )
}
