import AboutHeader from '@/components/resume/AboutHeader'
import EducationSection from '@/components/resume/EducationSection'
import SkillsSection from '@/components/resume/SkillsSection'
import WorkExperienceSection from '@/components/resume/WorkExperienceSection'
import { resumeData } from '@/lib/data/resume'

export default function AboutPage() {
  return (
    <div className="py-12">
      <div className="max-w-4xl space-y-24">
        <AboutHeader data={resumeData.header} />

        <main className="space-y-32">
          <WorkExperienceSection experiences={resumeData.experiences} />
          <SkillsSection skills={resumeData.skills} />
          <EducationSection education={resumeData.education} />
        </main>
      </div>
    </div>
  )
}
