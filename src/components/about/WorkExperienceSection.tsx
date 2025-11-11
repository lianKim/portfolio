import type { Experience } from '@/types/about'
import ExperienceCard from './ExperienceCard'

interface WorkExperienceSectionProps {
  experiences: Experience[]
}

export default function WorkExperienceSection({
  experiences,
}: WorkExperienceSectionProps) {
  return (
    <div>
      <h2 className="text-[1.8rem] font-thin mb-8">Work Experience</h2>
      <div className="space-y-20">
        {experiences.map((experience, index) => (
          <ExperienceCard key={index} experience={experience} />
        ))}
      </div>
    </div>
  )
}
