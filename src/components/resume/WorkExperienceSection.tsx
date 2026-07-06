import type { Experience } from '@/types/resume'
import ExperienceCard from './ExperienceCard'

interface WorkExperienceSectionProps {
  experiences: Experience[]
}

export default function WorkExperienceSection({
  experiences,
}: WorkExperienceSectionProps) {
  return (
    <div>
      <h2 className="section-label">/ Work Experience</h2>
      <div className="space-y-20  mt-10 md:mt-6">
        {experiences.map((experience) => (
          <ExperienceCard key={experience.company} experience={experience} />
        ))}
      </div>
    </div>
  )
}
