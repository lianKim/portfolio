import type { Education } from '@/types/about'
import EducationCard from './EducationCard'

interface EducationSectionProps {
  education: Education[]
}

export default function EducationSection({ education }: EducationSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-x-5">
      <h2 className="col-span-1 md:col-span-5 md:sticky md:top-[var(--sticky-top-offset)] text-xl font-bold">
        Education
      </h2>
      <div className="col-span-1 md:col-span-7 mt-8 md:mt-0 space-y-6">
        {education.map((edu, index) => (
          <EducationCard key={index} education={edu} />
        ))}
      </div>
    </div>
  )
}
