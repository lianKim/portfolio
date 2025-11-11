import EducationSection from '@/components/about/EducationSection'
import Introduction from '@/components/about/Introduction'
import SkillsSection from '@/components/about/SkillsSection'
import WorkExperienceSection from '@/components/about/WorkExperienceSection'
import { aboutData } from '@/lib/data/about'

export default function AboutPage() {
  return (
    <div className="py-12 whitespace-pre-line break-keep">
      {/* <div className="max-w-4xl space-y-24"> */}
      <div className="space-y-24">
        <Introduction data={aboutData.introduction} />

        <main className="space-y-32">
          <WorkExperienceSection experiences={aboutData.experiences} />
          <SkillsSection skills={aboutData.skills} />
          <EducationSection education={aboutData.education} />
        </main>
      </div>
    </div>
  )
}
