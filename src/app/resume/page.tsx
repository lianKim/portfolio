import {
  generatePersonSchema,
  generateProfilePageSchema,
  serializeJsonLd,
} from '@/lib/utils/seo'

import EducationSection from '@/components/resume/EducationSection'
import Introduction from '@/components/resume/Introduction'
import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants/site'
import SkillsSection from '@/components/resume/SkillsSection'
import WorkExperienceSection from '@/components/resume/WorkExperienceSection'
import { resumeData } from '@/lib/data/resume'
import { toAbsoluteUrl } from '@/lib/utils/format'

export const metadata: Metadata = {
  title: 'Resume',
  description: `프론트엔드 개발자 ${SITE_CONFIG.author.name}의 이력서입니다. React, TypeScript 기반의 웹 애플리케이션 개발 경험을 확인하세요.`,
  alternates: {
    canonical: toAbsoluteUrl('/resume'),
  },
  openGraph: {
    title: `Resume | ${SITE_CONFIG.author.name}`,
    description: `프론트엔드 개발자 ${SITE_CONFIG.author.name}의 이력서입니다. React, TypeScript 기반의 웹 애플리케이션 개발 경험을 확인하세요.`,
    url: '/resume',
  },
}

export default function ResumePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [generatePersonSchema(), generateProfilePageSchema()],
  }

  return (
    <>
      {/* JSON-LD 구조화된 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <div className="pt-20 pb-40 whitespace-pre-line break-keep">
        {/* <div className="max-w-4xl space-y-24"> */}
        <div className="space-y-24">
          <main className="space-y-32">
            <Introduction data={resumeData.introduction} />
            <WorkExperienceSection experiences={resumeData.experiences} />
            <SkillsSection skills={resumeData.skills} />
            <EducationSection education={resumeData.education} />
          </main>
        </div>
      </div>
    </>
  )
}
