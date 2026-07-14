import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants/site'
import { WorkList } from '@/components/work/WorkList'
import { getAllWorks } from '@/lib/server/works'
import { toAbsoluteUrl } from '@/lib/utils/format'

export const metadata: Metadata = {
  title: 'Work',
  description: `프론트엔드 개발자 ${SITE_CONFIG.author.name}의 설계 기록. 프로젝트에서 무엇을 검토하고 어떻게 설계했는지 정리한 케이스 스터디입니다.`,
  alternates: {
    canonical: toAbsoluteUrl('/work'),
  },
  openGraph: {
    title: `Work | ${SITE_CONFIG.author.name}`,
    description: `프론트엔드 개발자 ${SITE_CONFIG.author.name}의 설계 기록. 프로젝트에서 무엇을 검토하고 어떻게 설계했는지 정리한 케이스 스터디입니다.`,
    url: '/work',
  },
}

export default function WorkPage() {
  // 서버에서 기록 데이터 가져오기
  const works = getAllWorks()

  return (
    <div className="relative w-full pt-20 pb-12">
      <div className="section-grid">
        <h2 className="section-left section-label">/ Works</h2>
        <div className="section-right section-content">
          <WorkList works={works} />
        </div>
      </div>
    </div>
  )
}
