import EducationCard from './EducationCard'
import type { Education } from '@/types/about'

interface EducationSectionProps {
  education: Education[]
}

export default function EducationSection({ education }: EducationSectionProps) {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold">Education</h2>
      {education.map((edu, index) => (
        <EducationCard key={index} education={edu} />
      ))}
    </div>
  )
}
