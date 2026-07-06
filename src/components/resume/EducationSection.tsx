import type { Education } from '@/types/resume'
import EducationCard from './EducationCard'

interface EducationSectionProps {
  education: Education[]
}

export default function EducationSection({ education }: EducationSectionProps) {
  return (
    <div className="section-grid">
      <h2 className="section-left section-title">/ Education</h2>
      <div className="section-right section-content space-y-6">
        {education.map((edu) => (
          <EducationCard key={edu.company} education={edu} />
        ))}
      </div>
    </div>
  )
}
