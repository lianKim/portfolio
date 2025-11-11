import SkillCategory from './SkillCategory'
import type { SkillCategory as SkillCategoryType } from '@/types/about'

interface SkillsSectionProps {
  skills: SkillCategoryType[]
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-x-5">
      <h2 className="col-span-1 md:col-span-5 md:sticky md:top-[var(--sticky-top-offset)] text-xl font-bold">
        Skills
      </h2>
      <div className="col-span-1 md:col-span-7 mt-8 md:mt-0 space-y-6">
        {skills.map((skillCategory, index) => (
          <SkillCategory key={index} skillCategory={skillCategory} />
        ))}
      </div>
    </div>
  )
}
