import ExperienceCard from './ExperienceCard'
import type { Experience } from '@/types/about'

interface WorkExperienceSectionProps {
  experiences: Experience[]
}

export default function WorkExperienceSection({ experiences }: WorkExperienceSectionProps) {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold">Work Experience</h2>
      {experiences.map((experience, index) => (
        <ExperienceCard key={index} experience={experience} />
      ))}
    </div>
  )
}