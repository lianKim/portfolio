import type { Experience } from '@/types/about'
import ExperienceCard from './ExperienceCard'
import { Separator } from '../ui/separator'

interface WorkExperienceSectionProps {
  experiences: Experience[]
}

export default function WorkExperienceSection({
  experiences,
}: WorkExperienceSectionProps) {
  // return (
  //   <div className="grid grid-cols-1 md:grid-cols-12 gap-x-5">
  //     <h2 className="text-xl font-bold mb-8 col-span-5">Work Experience</h2>
  //     <div className="space-y-14 col-span-7">
  //       {experiences.map((experience, index) => (
  //         <>
  //           <ExperienceCard key={index} experience={experience} />
  //           {index !== experiences.length - 1 && <Separator />}
  //         </>
  //       ))}
  //     </div>
  //   </div>
  // )

  return (
    <div>
      <h2 className="text-xl font-bold mb-8">Work Experience</h2>
      <div className="space-y-20">
        {experiences.map((experience, index) => (
          <ExperienceCard key={index} experience={experience} />
        ))}
      </div>
    </div>
  )
}
