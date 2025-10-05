import AboutHeader from '@/components/resume/AboutHeader'
import WorkExperienceSection from '@/components/resume/WorkExperienceSection'
import { resumeData } from '@/lib/data/resume'

export default function AboutPage() {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto space-y-24">
        <AboutHeader data={resumeData.header} />

        <main className="space-y-32">
          <WorkExperienceSection experiences={resumeData.experiences} />
        </main>
      </div>
    </div>
  )
}
